import {useRef} from "vanilla";
import css from "./TrendingList.module.css";
import TrendView from "./TrendView/TrendView";
import {Loader,Swiper} from "components";
import {shuffle} from "afile";
import * as H from "./Hooks";


export default function TrendingList(props){
    const {parent,ref=useRef("trendinglist")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.trendinglist}"></div>`);
    const trendinglist=parent.querySelector(`#${ref}`);
    const state={
        touchX:null,
        colindex:0,
        forwards:true,
        swipelength:5,
    }

    trendinglist.innerHTML=`
        <h3 class="${css.title}">Day Trending</h3>
        <div class="${css.row0}"></div>
    `;
    const row0=trendinglist.querySelector(`.${css.row0}`);
    const loader=Loader({parent:row0,style:"position:absolute;"});

    H.loadDayTrending(shows=>{
        loader.remove();
        const swiper=Swiper({parent:trendinglist,length:shows.length});
        if(shows&&shows.length){
            state.swipelength=shows.length-1||0;
            shuffle(shows).forEach(show=>{
                TrendView({parent:row0,show});
            });
            handleSwipe(row0,swiper,state);
        }

    });
    
    return trendinglist;
}




const handleSwipe=(container,swiper,state)=>{
    const onTouchStart=(event)=>{
        const {pageX}=event.touches[0];
        state.touchX=pageX;
    }
    container.addEventListener("touchstart",onTouchStart,{passive:true});

    const onTouchEnd=(event)=>{
        const {pageX}=event.changedTouches[0],touchLength=state.touchX-pageX;
        const {colindex,swipelength}=state;
        if(touchLength>25&&colindex<swipelength){
            state.colindex++;
            swiper.next();
        }
        else if(touchLength<-25&&colindex){
            state.colindex--;
            swiper.previous();
        }
        container.scrollLeft=Math.floor(state.colindex*container.clientWidth);
    }
    container.addEventListener("touchend",onTouchEnd,{passive:true});

    window.addEventListener("hashchange",()=>{
        container.removeEventListener("touchstart",onTouchStart);
        container.removeEventListener("touchend",onTouchEnd);
    },{once:true});
}