import {} from "vanilla";
import css from "./Watchlist.module.css";
import {ShowCard} from "components";
import {File} from "estate";
import data from "./watchlist.json";


export default function Watchlist(props){
    const {parent,ref="watchlist"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.watchlist}"></div>`);
    const watchlist=parent.querySelector(`#${ref}`);

    watchlist.innerHTML=`
    `;
    
    const file=new File("watchlist.json");
    /*store.show.watchlist.forEach(show=>{
        ShowCard({parent:watchlist,show});
    })*/

}