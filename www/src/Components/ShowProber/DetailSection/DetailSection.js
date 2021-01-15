import {useRef} from "vanilla";
import css from "./DetailSection.module.css";
import SeasonSlide from "./SeasonSlide/SeasonSlide";
import SupportSlide from "./SupportSlide/SupportSlide";


export default function DetailSection(props){
    const {parent,ref=useRef("detailsection"),show={}}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.detailsection}"></div>`);
    const detailsection=parent.querySelector(`#${ref}`);

    detailsection.innerHTML=`
        <div class="${css.row0}">
            ${show.type==="tv"&&show.seasons?`
                <h3 class="${css.seasontext}">Seasons</h3>
                <div class="${css.seasons}"></div>
            `:""}
        </div>
        <div class="${css.row1}"></div>
    `;
    
    if(show.type==="tv"&&show.seasons){
        show.seasons.forEach(season=>{
            SeasonSlide({parent:detailsection.querySelector(`.${css.seasons}`),season});
        });
    }
    const row1=detailsection.querySelector(`.${css.row1}`);
    if(show.production_companies&&show.production_companies.length){
        SupportSlide({parent:row1,title:"Production companies",items:show.production_companies});
    }
    if(show.networks&&show.networks.length){
        SupportSlide({parent:row1,title:"Available on",items:show.networks});
    }
} 