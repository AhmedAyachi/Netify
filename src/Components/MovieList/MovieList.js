import {useRef} from "vanilla";
import css from "./MovieList.module.css";
import MovieCard from "./MovieCard/MovieCard";
import {moneyhiestcover,mrrobotcover,spidercover,arrow,loadinganim} from "assets";
import {loadMovies,setMovies} from "actions";


let collection=1;
export default function MovieList(props){
    const {parent,ref=useRef("movielist")}=props;
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

    setMovieCards(movielist);
    
    movielist.querySelector("#prevarrow").onclick=()=>{
        Collection.previous(movielist);
    }
    movielist.querySelector("#nextarrow").onclick=()=>{
        Collection.next(movielist);
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

const setMovieCards=(movielist)=>{
    const row1=movielist.querySelector("#row1");
    const loading=movielist.querySelector("#loading");
    loading.style.display="block";
    loadMovies(collection,(movies)=>{
        row1.innerHTML="";
        movies.forEach(movie=>{
            MovieCard({parent:row1,movie});
        });
        loading.style.display="none";
    });
}


const Collection=new (function(){
    this.previous=(movielist)=>{
        if(collection>1){
            collection--;
            setMovieCards(movielist);
        }
    }
    this.next=(movielist)=>{
        if(collection<250){
            collection++;
            setMovieCards(movielist);
        }
    }
})();

const getMovies=()=>[
    {
        id:"1254825",
        title:"Money hiest",
        vote_average:8,
        poster_path:moneyhiestcover,
    },
    {
        id:"1254825",
        title:"Mr Robot",
        vote_average:10,
        poster_path:mrrobotcover,
    },
    {
        id:"1254825",
        title:"Spiderman Home Coming",
        vote_average:10,
        poster_path:spidercover,
    },
];