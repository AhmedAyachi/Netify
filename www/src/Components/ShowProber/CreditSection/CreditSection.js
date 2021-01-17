import {useRef} from "vanilla";
import css from "./CreditSection.module.css";
import CastSlide from "./CastSlide/CastSlide";
import {Loader} from "components";
import * as H from "./Hooks";


export default function CreditSection(props){
    const {parent,ref=useRef("creditsection"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.creditsection}"></div>`);
    const creditsection=parent.querySelector(`#${ref}`);

    creditsection.innerHTML=`
    `;
    const loader=Loader({parent:creditsection,style:"position:relative;"});

    H.useCredits(show,credits=>{
        loader.remove();
        const casts=credits.cast,crews=credits.crew;
        const hascast=casts&&casts.length,hascrew=crews&&crews.length,hascreator=show.created_by&&show.created_by.length;
        if(hascast){
            CastSlide({parent:creditsection,title:"Cast",casts});
        }
        if(hascrew){
            CastSlide({parent:creditsection,title:"Crew",casts:crews});
        }
        if(hascreator){
            CastSlide({parent:creditsection,title:"Created by",casts:show.created_by});
        }
        if(!(hascast||hascrew||hascreator)){
            creditsection.innerHTML=`<span class="${css.nocredits}">No credits yet</span>`;
        }
        creditsection.scrollIntoView({block:"start",behavior:"smooth"});
    });
    return creditsection;
}
