import {useRef} from "vanilla";
import css from "./MovieList.module.css";
import MovieCard from "./MovieCard/MovieCard";
import { moneyhiestcover, mrrobotcover } from "../../Assets";


export default function MovieList(props){
    const {parent,ref=useRef("movielist"),movies=getMovies()}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.movielist}"></div>`);
    const movielist=parent.querySelector(`#${ref}`);

    movielist.innerHTML=`
    `;
    movies.forEach(movie=>{
        MovieCard({parent:movielist,movie});
    })
    
}

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
];