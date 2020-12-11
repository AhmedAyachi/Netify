import {useRef} from "vanilla";
import css from "./CastsCard.module.css";
import CastCard from "./CastCard/CastCard";


export default function CastsCard(props){
    const {parent,ref=useRef("castscard"),casts}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.castscard}"></div>`);
    const castscard=parent.querySelector(`#${ref}`);

    castscard.innerHTML=`
        <div id="row0" class="${css.row0}">
            <h1 class="${css.title}">Cast</h1>
        </div>
        <div id="row1" class="${css.row1}"></div>
    `;
    casts.forEach(cast=>{
        CastCard({parent:castscard.querySelector(`#row1.${css.row1}`),cast});
    });
}