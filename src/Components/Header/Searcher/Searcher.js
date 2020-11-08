import {map,useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import {MovieCard} from "components";
import {Movie} from "estate";
import {addSearchValue,setSearched,loadMoviesByTitle} from "actions";


export default function Searcher(props){
    const {parent,refs,ref=refs.searcher||useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);

    searcher.innerHTML=`
        <input list="values" placeholder="Search for a movie" type="text"/>
        <img alt="" src="${filtericon}"/>
        <datalist id="values"></datalist>
    `;
    const input=searcher.querySelector("input");
    const datalist=searcher.querySelector("datalist");
 
    input.onkeyup=()=>{
        const values=store.movie.searchvalues;
        datalist.innerHTML=`
            ${map(values,value=>`<option value="${value}"/>`)}
        `;
    }
    input.onchange=()=>{
        const movielist=document.getElementById(refs.movielist);
        const movielistRow1=movielist.querySelector("#row1");
        const value=input.value.toLowerCase().trim();
        movielistRow1.innerHTML="";
        addSearchValue(value);
        if(value){
            const loading=movielist.querySelector("#loading");
            loading.style.display="block";
            loadMoviesByTitle(value,(movies)=>{
                if(movies.length){
                    movies.forEach(movie=>{
                        MovieCard({parent:movielistRow1,movie});
                    });
                }
                else{
                    movielistRow1.innerHTML=`<p style="${styles.noresults}">No results</p>`;
                }
                loading.style.display="none";
                setSearched(movies);
            })
        }
        else{
            const movies=store.movie.movies;
            if(movies&&movies.length){
                movies.forEach(movie=>{
                    MovieCard({parent:movielistRow1,movie});
                });
            }
        }
    };

}

const styles={
    noresults:`
        color:#cf0909;
        font-weight:bold;
    `,
}