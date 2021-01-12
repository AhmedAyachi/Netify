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
        forwards:true,
    }

    trendinglist.innerHTML=`
        <h3 class="${css.title}">Day Trending</h3>
        <div class="${css.row0}"></div>
    `;
    const row0=trendinglist.querySelector(`.${css.row0}`);
    const loader=Loader({parent:row0,style:"position:absolute;"});

    H.loadDayTrending(shows=>{
        loader.remove();
        if(shows&&shows.length){
            state.swipelength=shows.length-1||0;
            shuffle(shows).forEach(show=>{
                TrendView({parent:row0,show});
            });
            Swiper({parent:trendinglist,length:shows.length,target:row0});
        }

    });
    
    return trendinglist;
}
