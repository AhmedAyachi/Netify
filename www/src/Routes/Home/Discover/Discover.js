import {} from "vanilla";
import css from "./Discover.module.css";
import {TrendingList,ShowList,Navigator,Loader} from "components";
import * as H from "./Hooks";


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
    const row3=discover.querySelector(`.${css.row3}`);
    H.useShowsByGenres(({trends,genres})=>{
        loader.remove();
        TrendingList({parent:discover.querySelector(`.${css.row0}`),shows:trends});
        discover.querySelector(`.${css.row2}`).innerHTML="Discover";
        genres.forEach(genre=>{
            ShowList({parent:row3,genre});
        });
        if(!store.elements.navigator){
            store.elements.navigator=Navigator();
        }
    });
}
