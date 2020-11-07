import {} from "vanilla";
import css from "./MovieDetails.module.css";
import {DetailsCard,CreditsCard} from "components";
import {Movie} from "estate";
import * as H from "./Hooks";
import {loadinganim} from "assets";


export default function MovieDetails(props){
    const {parent,state}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.moviedetails}"></div>`);
    const moviedetails=parent.querySelector(`.${css.moviedetails}`);

    const {movie}=state;
    moviedetails.innerHTML=`
        <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
    `;
    
    const loading=moviedetails.querySelector("#loading");
    H.useDetails(movie.id,(details)=>{
        H.useCredits(movie.id,credits=>{
            DetailsCard({
                parent:moviedetails,
                movie:new Movie(details),
            });
            CreditsCard({parent:moviedetails,credits});
            loading.style.display="none";
        });
    });
}

const styles={
    loading:`
        display:none;        
    `,
};
