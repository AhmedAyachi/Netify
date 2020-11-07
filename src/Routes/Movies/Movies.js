import {useRef} from "vanilla";
import css from "./Movies.module.css";
import {Header,MovieList} from "components";


export default function Movies(props){
    const {parent,state}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.movies} activeroute"></div>`);
    const movies=parent.querySelector(`.${css.movies}`);

    const refs={
        movielist:useRef("movielist"),
        searcher:useRef("searcher"),
    }
    Header({parent:movies,refs});
    MovieList({parent:movies,refs});
    
}