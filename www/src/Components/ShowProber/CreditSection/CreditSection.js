import {useRef} from "vanilla";
import css from "./CreditSection.module.css";
import CastSlide from "./CastSlide/CastSlide";


export default function CreditSection(props){
    const {parent,credits,ref=useRef("creditsection")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.creditsection}"></div>`);
    const creditsection=parent.querySelector(`#${ref}`);

    const crews=credits.crew;
    CastSlide({parent:creditsection,casts:credits.cast});
    
    //console.log(crews);
}