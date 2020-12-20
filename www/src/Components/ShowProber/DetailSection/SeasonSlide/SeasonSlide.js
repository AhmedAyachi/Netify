import {useRef} from "vanilla";
import css from "./SeasonSlide.module.css";
import {capitalize} from "afile";
import {getFormatedDate} from "estate";


export default function SeasonSlide(props){
    const {parent,ref=useRef("seasonslide"),season}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.seasonslide}"></div>`);
    const seasonslide=parent.querySelector(`#${ref}`);

    seasonslide.innerHTML=`
        <div class="${css.col0}">
            <h3 class="${css.name}">${capitalize(season.name)}</h3>
            <img alt="" class="${css.poster}" src="${season.poster_path}"/>
        </div>
        <div class="${css.col1}">
            <ul class="${css.infolist}">
               <li>Premiered on ${getFormatedDate(season.air_date)}</li>
               <li>${season.episode_count>1?`${season.episode_count} episodes`:"One episode"}</li>
               <li class="${css.overview}">Overview</li>
               <li class="${css.overviewbody}">${season.overview||"No overview available at the moment"}</li>
            </ul>
        </div> 
    `;
}
