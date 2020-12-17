import {map} from "vanilla";
import css from "./WatchList.module.css";
import {ShowCard,ShowViewer} from "components";
import {squares0,list0} from "assets";


export default function WatchList(props){
    const {parent,ref="watchlist"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.watchlist}"></div>`);
    const watchlist=parent.querySelector(`#${ref}`);

    watchlist.innerHTML=`
        <div class="${css.row0}">
            <h3 class="${css.title}">Watchlist</h3>
            <div class="${css.icons}">
                <img alt="" class="${css.icon}" src="${squares0}"/>
            </div>
        </div>
        <div class="${css.row1}"></div>
    `;

    const row1=watchlist.querySelector(`.${css.row1}`);
    const watchlistshows=store.show.watchlist;
    ShowViewer({parent:row1,show:watchlistshows[0]});
    watchlistshows.forEach((show,i)=>{
        i&&ShowCard({parent:row1,show});
    });
}