import {useRef} from "vanilla";
import css from "./Swiper.module.css";
import {fadeIn} from "afile";


export default function Swiper(props){
    const {parent,ref=useRef("swiper"),length}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.swiper}" style="${styles.swiper}"></div>`);
    const swiper=parent.querySelector(`#${ref}`);
    const state={
        active:null,
        index:-1,
    }

    swiper.innerHTML=`
        ${getViews(length)}
    `;
    const views=swiper.querySelectorAll(`.${css.view}`);
    state.active=views[0];
    state.active.className+=` ${css.active}`;
    state.index=0;
    

    swiper.next=()=>{
        if(state.active){
            state.active.className=css.view;
        }
        if(state.index<length-1){
            const i=state.index+1;
            state.active=views[i];
            state.active.className+=` ${css.active}`;
            state.index=i;
        }
    }

    swiper.previous=()=>{
        if(state.active){
            state.active.className=css.view;
        }
        if(state.index){
            const i=state.index-1;
            state.active=views[i];
            state.active.className+=` ${css.active}`;
            state.index=i;
        }
    }

    fadeIn(swiper,"flex");
}

const styles={
    swiper:`
        display:none;
    `,
}

const getViews=(length)=>{
    let str="";
    for(let i=0;i<length;i++){
        str+=`<div id="view_${i}" class="${css.view}"></div>`;
    }
    return str;
}