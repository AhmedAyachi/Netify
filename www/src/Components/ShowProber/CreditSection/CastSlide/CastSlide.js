import {useRef} from "vanilla";
import css from "./CastSlide.module.css";
import CastCard from "./CastCard/CastCard";


export default function CastSlide(props){
    const {parent,ref=useRef("castslide"),title="Cast",casts}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.castslide}"></div>`);
    const castslide=parent.querySelector(`#${ref}`);

    castslide.innerHTML=`
        <div id="row0" class="${css.row0}">
            <h1 class="${css.title}">${title}</h1>
        </div>
        <div id="row1" class="${css.row1}"></div>
    `;
    casts.forEach(cast=>{
        CastCard({parent:castslide.querySelector(`#row1.${css.row1}`),cast});
    });
}