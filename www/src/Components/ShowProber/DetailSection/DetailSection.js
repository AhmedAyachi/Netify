import {map,useRef} from "vanilla";
import css from "./DetailSection.module.css";
import SeasonSlide from "./SeasonSlide/SeasonSlide";
import SupportSlide from "./SupportSlide/SupportSlide";


export default function DetailSection(props){
    const {parent,ref=useRef("detailsection"),details={}}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.detailsection}"></div>`);
    const detailsection=parent.querySelector(`#${ref}`);

    detailsection.innerHTML=`
        <div class="${css.row0}">
            ${details.type==="tv"&&details.seasons?`
                <h3 class="${css.seasontext}">Seasons</h3>
                <div class="${css.seasons}"></div>
            `:""}
        </div>
        <div class="${css.row1}"></div>
    `;
    
    if(details.type==="tv"&&details.seasons){
        details.seasons.forEach(season=>{
            SeasonSlide({parent:detailsection.querySelector(`.${css.seasons}`),season});
        });
    }
    const row1=detailsection.querySelector(`.${css.row1}`);
    if(details.production_companies&&details.production_companies.length){
        SupportSlide({parent:row1,title:"Production companies",items:details.production_companies});
    }
    if(details.networks&&details.networks.length){
        SupportSlide({parent:row1,title:"Networks",items:details.networks});
    }
} 