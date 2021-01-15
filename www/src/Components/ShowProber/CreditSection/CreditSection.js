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
        if(casts&&casts.length){
            CastSlide({parent:creditsection,title:"Cast",casts});
        }
        if(crews&&crews.length){
            CastSlide({parent:creditsection,title:"Crew",casts:crews});
        }
        if(show.created_by&&show.created_by.length){
            CastSlide({parent:creditsection,title:"Created by",casts:show.created_by});
        }
    });
}
