import {useRef} from "vanilla";
import css from "./CreditsCard.module.css";
import CastsCard from "./CastsCard/CastsCard";


export default function CreditsCard(props){
    const {parent,credits,ref=useRef("creditscard")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.creditscard}"></div>`);
    const creditscard=parent.querySelector(`#${ref}`);

    const crews=credits.crew;
    CastsCard({parent:creditscard,casts:credits.cast});
    
    //console.log(crews);
}