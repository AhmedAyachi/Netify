import {} from "vanilla";
import css from "./Movies.module.css";
import {Header} from "components";


export default function Movies(props){
    const {parent,state}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.movies} activeroute"></div>`);
    const movies=parent.querySelector(`.${css.movies}`);

    Header({parent:movies});
    movies.insertAdjacentHTML("beforeend",`
        
    `);
}