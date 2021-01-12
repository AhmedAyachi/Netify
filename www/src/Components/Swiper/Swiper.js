import {useRef} from "vanilla";
import css from "./Swiper.module.css";
import {fadeIn} from "afile";


export default function Swiper(props){
    const {parent,ref=useRef("swiper"),target,onSwipe,style=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.swiper}" style="${style};${styles.swiper}"></div>`);
    const swiper=parent.querySelector(`#${ref}`);
    const state={
        touchX:null,
        index:0,
        length:props.length||1,
        active:null,
    }

    swiper.innerHTML=`
        ${getViews(state.length||1)}
    `;

    const views=swiper.querySelectorAll(`.${css.view}`);
    state.active=views[0];
    state.active.className+=` ${css.active}`;

    swiper.next=()=>{next(state,views)};
    swiper.previous=()=>{previous(state,views)};

    if(target){
        const onTouchStart=(event)=>{
            const {pageX}=event.touches[0];
            state.touchX=pageX;
        }
        target.addEventListener("touchstart",onTouchStart,{passive:true});

        const onTouchEnd=(event)=>{
            const {pageX}=event.changedTouches[0],touchLength=state.touchX-pageX;
            if(touchLength>25){
                swiper.next();
            }
            else if(touchLength<-25){
                swiper.previous();
            }
            onSwipe&&onSwipe({index:state.index,length:state.length});
            target.scrollLeft=Math.floor(state.index*target.clientWidth);
        }
        target.addEventListener("touchend",onTouchEnd,{passive:true});

        window.addEventListener("hashchange",()=>{
            target.removeEventListener("touchstart",onTouchStart);
            target.removeEventListener("touchend",onTouchEnd);
        },{once:true});
    }

    fadeIn(swiper,"flex");
    return swiper;
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

const next=(state,views)=>{
    if(state.index<state.length-1){
        if(state.active){
            state.active.className=css.view;
        }
        const i=state.index+1;
        state.active=views[i];
        state.active.className+=` ${css.active}`;
        state.index=i;
    }
}

const previous=(state,views)=>{
    if(state.index){
        if(state.active){
            state.active.className=css.view;
        }
        const i=state.index-1;
        state.active=views[i];
        state.active.className+=` ${css.active}`;
        state.index=i;
    }
}