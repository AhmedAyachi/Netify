import {useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import {MovieCard} from "components";
import {apikey,Movie} from "estate";
import {setSearchValue,setSearched} from "actions";


export default function Searcher(props){
    const {parent,refs,ref=refs.searcher||useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);

    searcher.innerHTML=`
        <input placeholder="Search for a movie" type="text"/>
        <img alt="" src="${filtericon}"/>
    `;
    const input=searcher.querySelector("input");
    
    input.onchange=()=>{
        const movielist=document.getElementById(refs.movielist);
        const movielistRow1=movielist.querySelector("#row1");
        const value=input.value.toLowerCase();
        const movies=store.movie.movies.filter(movie=>movie.title.toLowerCase().includes(value));
        movielistRow1.innerHTML="";
        setSearchValue(value);
        if(movies&&movies.length){
            movies.forEach(movie=>{
                MovieCard({parent:movielistRow1,movie});
            });
        }
        else{
            const loading=movielist.querySelector("#loading");
            loading.style.display="block";
            loadResults(value,(data)=>{
                const movies=data.results.map(movie=>new Movie(movie));
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
                console.log(store.movie);
            })
        }
    };

}

const styles={
    noresults:`
        color:#cf0909;
        font-weight:bold;
    `,
}

const loadResults=(title="",then)=>{
    title=title.trim().replace(/" "/g,"+");
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}`).
    then(response=>response.json()).
    then(data=>{
        then(data);
    });
}