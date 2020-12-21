import {useRef} from "vanilla";
import css from "./CreditSection.module.css";
import CastSlide from "./CastSlide/CastSlide";
import * as H from "./Hooks";


export default function CreditSection(props){
    const {parent,ref=useRef("creditsection"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.creditsection}"></div>`);
    const creditsection=parent.querySelector(`#${ref}`);

    creditsection.innerHTML=`
        <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
    `;
    H.useCredits(show,credits=>{
        CastSlide({parent:creditsection,casts:credits.cast});
    });
    const crews=credits.crew;

    if(show.created_by&&show.created_by.length){
        CastSlide({parent:creditsection,casts:show.created_by});
    }
    
    //console.log(crews);
}