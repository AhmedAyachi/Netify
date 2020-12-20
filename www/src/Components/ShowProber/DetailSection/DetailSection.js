import {map,useRef} from "vanilla";
import css from "./DetailSection.module.css";
import SeasonSlide from "./SeasonSlide/SeasonSlide";


export default function DetailSection(props){
    const {parent,ref=useRef("detailsection"),details}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.detailsection}"></div>`);
    const detailsection=parent.querySelector(`#${ref}`);

    detailsection.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            ${details&&details.production_companies&&details.production_companies.length?`
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
    
    if(details&&details.type==="tv"&&details.seasons){
        details.seasons.forEach(season=>{
            SeasonSlide({parent:detailsection.querySelector(`.${css.row0}`),season});
        });
    }
} 