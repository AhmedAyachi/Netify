import {useRef} from "vanilla";
import css from "./Swiper.module.css";
import {fadeIn} from "afile";


export default function Swiper(props){
    const {parent,ref=useRef("swiper"),target,onSwipe,style=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.swiper}" style="${style};${styles.swiper}"></div>`);
    const swiper=parent.querySelector(`#${ref}`);
    const state={
        touchX:null,
        views:null,
        index:0,
        length:props.length||1,
        active:null,
    }

    swiper.innerHTML=`
        ${getViews(state.length||1)}
    `;

    state.views=swiper.querySelectorAll(`.${css.view}`);
    state.active=state.views[0];
    state.active.className+=` ${css.active}`;

    state.views.forEach((view,i)=>{
        view.onclick=()=>{
            if(state.active){
                state.active.className=css.view;
                state.active=null;
            }
            state.active=view;
            state.index=i;
            target.scrollLeft=Math.floor(state.index*target.clientWidth);
            onSwipe&&onSwipe({index:state.index,length:state.length});
            view.className+=` ${css.active}`;
        }
    });
    target&&setTarget(target,state,onSwipe);

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

const next=(state)=>{
    if(state.index<state.length-1){
        const {views}=state;
        if(state.active){
            state.active.className=css.view;
            state.active=null;
        }
        const i=state.index+1;
        state.active=views[i];
        state.index=i;
        state.active.className+=` ${css.active}`;
    }
}

const previous=(state)=>{
    if(state.index){
        const {views}=state;
        if(state.active){
            state.active.className=css.view;
            state.active=null;
        }
        const i=state.index-1;
        state.active=views[i];
        state.index=i;
        state.active.className+=` ${css.active}`;
    }
}

const setTarget=(target,state,onSwipe)=>{
    const onTouchStart=(event)=>{
        const {pageX}=event.touches[0];
        state.touchX=pageX;
    }
    target.addEventListener("touchstart",onTouchStart,{passive:true});

    const onTouchEnd=(event)=>{
        const {pageX}=event.changedTouches[0],touchLength=state.touchX-pageX;
        if(touchLength>25){
            next(state)
        }
        else if(touchLength<-25){
            previous(state)
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