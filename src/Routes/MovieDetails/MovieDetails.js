import {} from "vanilla";
import css from "./MovieDetails.module.css";


export default function MovieDetails(props){
    const {parent,state}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.moviedetails}"></div>`);
    const moviedetails=parent.querySelector(`.${css.moviedetails}`);

    const {movie}=state;
    moviedetails.innerHTML=`
        <p>${movie.title}</p>
    `;
    console.log(state);
}