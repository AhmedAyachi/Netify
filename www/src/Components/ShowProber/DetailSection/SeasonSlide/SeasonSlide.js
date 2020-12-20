import {useRef} from "vanilla";
import css from "./SeasonSlide.module.css";
import {capitalize} from "afile";


export default function SeasonSlide(props){
    const {parent,ref=useRef("seasonslide"),season}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.seasonslide}"></div>`);
    const seasonslide=parent.querySelector(`#${ref}`);

    seasonslide.innerHTML=`
        <div class="${css.row0}">
            <div class="${css.col0}">
                <h3 class="${css.name}">${capitalize(season.name)}</h3>
                <img alt="" class="${css.poster}" src="${season.poster_path}"/>
            </div>
            <div class="${css.col1}">
                <ul class="${css.infolist}">
                   <li>Air date: ${season.air_date}</li>
                   <li>Number of episodes: ${season.episode_count}</li>
                </ul>
            </div> 
        </div>
        <div class="${css.row1}">
            ${season.overview||"No overview available at the moment"}
        </div>
    `;
} 