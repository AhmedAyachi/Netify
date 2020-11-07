import {useRef} from "vanilla";
import css from "./MovieList.module.css";
import MovieCard from "./MovieCard/MovieCard";
import {arrow,loadinganim} from "assets";
import {loadMovies} from "actions";


export default function MovieList(props){
    const {parent,state={},ref=useRef("movielist")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.movielist}"></div>`);
    const movielist=parent.querySelector(`#${ref}`);

    movielist.innerHTML=`
        <div class="${css.row0}">
           <img class="${css.arrows}" id="prevarrow" alt="Previous" title="Previous" style="${styles.prevarrow}" src="${arrow}"/>
           <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
           <img class="${css.arrows}" id="nextarrow" alt="Next" title="Next" src="${arrow}"/>
        </div>
        <div id="row1"></div>
    `;
    
    setMovieCards(movielist,store.movie);
    movielist.querySelector("#prevarrow").onclick=()=>{
        Collection.previous(movielist,store.movie);
    }
    movielist.querySelector("#nextarrow").onclick=()=>{
        Collection.next(movielist,store.movie);
    }
    
}
const styles={
    prevarrow:`
        transform:scaleX(-1);
    `,
    loading:`
        display:none;        
    `,
};

const Collection=new (function(){
    this.previous=(movielist,movieState)=>{
        if(movieState.collection>1){
            movieState.collection--;
            setMovieCards(movielist,movieState);
        }
    }
    this.next=(movielist,movieState)=>{
        if(movieState.collection<250){
            movieState.collection++;
            setMovieCards(movielist,movieState);
        }
    }
})();

const setMovieCards=(movielist,movieState)=>{
    const row1=movielist.querySelector("#row1");
    const loading=movielist.querySelector("#loading");
    loading.style.display="block";
    loadMovies(movieState.collection,(movies)=>{
        row1.innerHTML="";
        movies.forEach(movie=>{
            MovieCard({parent:row1,movie});
        });
        loading.style.display="none";
    });
}
