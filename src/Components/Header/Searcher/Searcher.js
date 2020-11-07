import {useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import {MovieCard} from "components";


export default function Searcher(props){
    const {parent,movielistRef,ref=useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);

    searcher.innerHTML=`
        <input placeholder="Search for a movie" type="text"/>
        <img alt="" src="${filtericon}"/>
    `;
    const input=searcher.querySelector("input");
    
    input.onkeyup=()=>{
        const value=input.value.toLowerCase();
        const movies=store.movie.movies.filter(movie=>movie.title.toLowerCase().includes(value));
        const movielistRow1=document.getElementById(movielistRef).querySelector("#row1");
        movielistRow1.innerHTML="";
        if(movies.length){
            movies.forEach(movie=>{
                MovieCard({parent:movielistRow1,movie});
            });
        }
        else{
            movielistRow1.innerHTML=`<p style="${styles.noresults}">No results</p>`;
        }
    }

}

const styles={
    noresults:`
        color:#cf0909;
        font-weight:bold;
    `,
}