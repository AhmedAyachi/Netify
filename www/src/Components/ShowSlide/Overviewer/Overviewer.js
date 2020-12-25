import {useRef} from "vanilla";
import css from "./Overviewer.module.css";
import RateStars from "../../RateStars/RateStars";
import {getFormatedDate} from "estate";


export default function Overviewer(props){
    const {parent,ref=useRef("overviewer"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.overviewer}"></div>`);
    const overviewer=parent.querySelector(`#${ref}`);

    overviewer.innerHTML=`
        <div class="${css.row0}">
            <h3 class="${css.title}">${show.title}</h3>
            <ul class="${css.list}">
                <li class="${css.rating}"></li>
                ${show.tagline?`<li class="${css.tagline}">${show.tagline}</li>`:""}
                <li>${show.release_date?getFormatedDate(show.release_date):""} | ${show.genres.map(genre=>genre.name).join(", ")}</li>
                <li>${getDuration(show)}</li>
            </ul>
            <div class="${css.overview}">${show.overview}</div>
        </div>
    `;
    //RateStars({parent:overviewer.querySelector(`.${css.rating}`),rate:show.vote_average});
}


const getDuration=(show)=>{
    switch(show.type){
        case "tv":
            const seasonsnumber=show.number_of_seasons,episodesnumber=show.number_of_episodes,duration=show.episodeRuntime;
            return (
                (seasonsnumber>1?`${seasonsnumber} seasons`:"One season")+
                (episodesnumber>1?` ${episodesnumber} episodes`:"One episode")+
                (duration?` around ${getDuration({type:"movie",runtime:duration})} each`:"")
            );
        default:
            const {runtime}=show,hours=Math.floor(runtime/60),minutes=Math.round(runtime%60);
            return (hours?hours+"h ":"")+(minutes?minutes+"min":"");
    }
}