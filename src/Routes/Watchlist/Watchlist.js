import {map} from "vanilla";
import css from "./WatchList.module.css";
import {ShowCard,ShowViewer} from "components";
import {squares0,list0} from "assets";


export default function WatchList(props){
    const {parent,ref="watchlist"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.watchlist}"></div>`);
    const watchlist=parent.querySelector(`#${ref}`);

    watchlist.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            <div class="${css.row2}">
                <h3 class="${css.title}">Watchlist</h3>
                <img alt="" class="${css.displayer}" src="${list0}"/>
            </div>
            <div class="${css.row3}"></div>
        </div>
    `;

    const watchlistshows=store.show.watchlist;
    ShowViewer({parent:watchlist.querySelector(`.${css.row0}`),show:watchlistshows[0]});
    watchlistshows.forEach((show,i)=>{
        i&&ShowCard({parent:watchlist.querySelector(`.${css.row3}`),show});
    });

    const displayer=watchlist.querySelector(`.${css.displayer}`);
    displayer.listmode=false;
    displayer.onclick=()=>{
        displayer.listmode=!displayer.listmode;
        displayer.setAttribute("src",displayer.listmode?squares0:list0);
    }
};
