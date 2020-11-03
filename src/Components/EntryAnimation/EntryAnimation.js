import {useRef} from "vanilla";
import css from "./EntryAnimation.module.css";
import {netflixlogo,netflixentry} from "assets";
import {fadeIn,fadeOut} from "afile";


export default function EntryAnimation(props){
    const {parent,ref=useRef("entryanimation"),onFadeOut}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.entryanimation}"></div>`);
    const entryanimation=parent.querySelector(`#${ref}`);

    StatusBar.hide();
    entryanimation.innerHTML=`
        <img alt="" src="${netflixlogo}"/>
    `;
    animate(entryanimation,onFadeOut);
}

const animate=(entryanimation,onFadeOut)=>{
    const fadeInDuration=0.25;
    const image=entryanimation.querySelector("img");
    fadeIn(entryanimation,"flex",fadeInDuration);
    setTimeout(()=>{
        const animduration=10;
        fadeOut(image);
        setTimeout(()=>{
            image.setAttribute("src",netflixentry);
            fadeIn(image);
        },200);
        setTimeout(()=>{
            const fadeOutDuration=0.4;
            fadeOut(entryanimation,fadeOutDuration);
            setTimeout(()=>{
                if(onFadeOut){
                    onFadeOut(entryanimation);
                }
                entryanimation.remove();
                StatusBar.show();
            },fadeOutDuration*1000);
        },animduration*1000+500);
    },fadeInDuration*1000+500);  
}