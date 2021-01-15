import {useRef} from "vanilla";
import css from "./TrendingList.module.css";
import TrendView from "./TrendView/TrendView";
import {Swiper} from "components";


export default function TrendingList(props){
    const {parent,ref=useRef("trendinglist"),shows}=props;
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

    if(shows&&shows.length){
        shows.forEach(show=>{
            TrendView({parent:row0,show});
        });
        Swiper({parent:trendinglist,length:shows.length,target:row0});
    }
    
    return trendinglist;
}
