import {useRef} from "vanilla";
import css from "./CreditSection.module.css";
import CastsCard from "./CastsCard/CastsCard";


export default function CreditSection(props){
    const {parent,credits,ref=useRef("creditsection")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.creditsection}"></div>`);
    const creditsection=parent.querySelector(`#${ref}`);

    const crews=credits.crew;
    CastsCard({parent:creditsection,casts:credits.cast});
    
    //console.log(crews);
}