import {useRef} from "vanilla";
import CastCard from "./CastCard/CastCard";
import css from "./CreditsCard.module.css";



export default function CreditsCard(props){
    const {parent,credits,ref=useRef("creditscard")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.creditscard}"></div>`);
    const creditscard=parent.querySelector(`#${ref}`);

    const crews=credits.crew;
    
    credits.cast.forEach(cast=>{
        CastCard({parent:creditscard,cast});
    });
    //console.log(crews);
}