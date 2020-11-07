import {} from "vanilla";
import css from "./MovieDetails.module.css";
import {DetailsCard} from "components";
import {Movie} from "estate";
import * as H from "./Hooks";


export default function MovieDetails(props){
    const {parent,state}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.moviedetails}"></div>`);
    const moviedetails=parent.querySelector(`.${css.moviedetails}`);

    const {movie}=state;
    moviedetails.innerHTML=`
        
    `;
    H.useDetails(movie.id,(details)=>{
        DetailsCard({
            parent:moviedetails,
            movie:new Movie(details),
        });
    });
    console.log(state);
}

