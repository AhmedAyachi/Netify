import {} from "vanilla";
import css from "./Discover.module.css";
import {TrendingList,ShowList,Navigator,Loader} from "components";
import data from "./Genres.json";
import * as H from "./Hooks";
import {shuffle} from "afile";
import {setNavigator} from "estate";


export default function Discover(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="discover" class="${css.discover}"></div>`);
    const discover=parent.querySelector(`.${css.discover}`);
    
    discover.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            <div class="${css.row2}"></div>
            <div class="${css.row3}"></div>
        </div>
    `;
    const loader=Loader({style:"position:fixed;"});

    const content=store.show.discover;
    if(content){
        setTimeout(()=>{
            loader.remove();
            setDiscover(discover,content);
        },1100+Math.random()*500);
    }else{
        H.useShowsByGenres(data.genres,({trends,genres})=>{
            loader.remove();
            setDiscover(discover,{trends,genres});
        });
    }
    
}

const setDiscover=(discover,{trends,genres})=>{
    const row3=discover.querySelector(`.${css.row3}`);
    trends=shuffle(trends);
    genres.forEach(genre=>{
        genre.shows=shuffle(genre.shows);
    });
    TrendingList({parent:discover.querySelector(`.${css.row0}`),shows:trends});
    discover.querySelector(`.${css.row2}`).innerHTML="Discover";
    genres.forEach(genre=>{
        ShowList({parent:row3,data:genre,withMore:true});
    });
    setNavigator();
}
