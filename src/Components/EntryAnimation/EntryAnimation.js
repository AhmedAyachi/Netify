import {useRef} from "vanilla";
import css from "./EntryAnimation.module.css";
import {applogo,netflixentry} from "assets";
import {fadeIn,fadeOut} from "afile";


export default function EntryAnimation(props){
    const {parent,ref=useRef("entryanimation"),onFadeOut}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.entryanimation}" style="display:none;"></div>`);
    const entryanimation=parent.querySelector(`#${ref}`),state={
        fadeoutin:1500,
        fadeoutduration:0.5,
    };

    entryanimation.innerHTML=`
        <img alt="" src="${applogo}"/>
    `;

    fadeIn(entryanimation,"flex");
    setTimeout(()=>{
        fadeOut(entryanimation,state.fadeoutduration);
        setTimeout(()=>{
            entryanimation.remove();
            onFadeOut&&onFadeOut(entryanimation);
        },state.fadeoutduration*1000+150);
    },state.fadeoutin);
    return entryanimation;
}
