import {map,useRef} from "vanilla";
import css from "./DetailSection.module.css";
import SeasonSlide from "./SeasonSlide/SeasonSlide";


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
        <div class="${css.row1}">
            ${details.production_companies&&details.production_companies.length?`
                <h1>Prodcution Companies</h1>
                <div class="${css.row2}">
                    ${map(details.production_companies,(company)=>company.logo_path?`
                        <img alt="" class="${css.companylogo}" src="${company.logo_path}"/>`:`
                        <span class="${css.companyname}">${company.name}</span>
                    `)}
                </div>
            `:""}
        </div>
    `;
    
    if(details.type==="tv"&&details.seasons){
        details.seasons.forEach(season=>{
            SeasonSlide({parent:detailsection.querySelector(`.${css.seasons}`),season});
        });
    }
} 