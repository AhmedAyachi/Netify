import {} from "vanilla";
import css from "./Watchlist.module.css";
import {ShowCard} from "components";


export default function Watchlist(props){
    const {parent,ref="watchlist"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.watchlist}"></div>`);
    const watchlist=parent.querySelector(`#${ref}`);

    watchlist.innerHTML=`
        <h1>Watchlist:</h1>
    `;

    store.show.watchlist.forEach(show=>{
        ShowCard({parent:watchlist,show});
    })
}