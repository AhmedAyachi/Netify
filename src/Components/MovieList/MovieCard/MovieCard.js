import {useRef} from "vanilla";
import css from "./MovieCard.module.css";
import {playbtn1,fullstar} from "assets";


export default function MovieCard(props){
    const {parent,ref=useRef("moviecard"),movie}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.moviecard}"></div>`);
    const moviecard=parent.querySelector(`#${ref}`);

    const {title,poster_path,vote_average,id}=movie;
    moviecard.innerHTML=`
        <div class="${css.details}">
            <div class="${css.title}">${title}</div>
            <div class="${css.rating}">${getRateStars(vote_average/2)}</div>
            <img class="${css.playbtn}" alt="" src="${playbtn1}"/>
        </div>
        <img alt="" src="${poster_path}"/>
    `;

    moviecard.onclick=()=>{
        history.pushState("#movies/#movie",{movie});
    }
    
}

const getRateStars=(rate=3)=>{
    const rating=[];
    const length=Math.round(rate);
    for(let i=0;i<length;i++){
        rating.push(`<img id="star_${i}" src="${fullstar}"/>`);
    }
    return rating.join();
}