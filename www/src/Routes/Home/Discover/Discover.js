import {} from "vanilla";
import css from "./Discover.module.css";
import {TrendingList,GenreList,Navigator} from "components";
import data from "./Genres.json";


export default function Discover(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="discover" class="${css.discover}"></div>`);
    const discover=parent.querySelector(`.${css.discover}`);
    
    discover.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            <div class="${css.row2}">Discover</div>
            <div class="${css.row3}"></div>
        </div>
    `;

    TrendingList({parent:discover.querySelector(`.${css.row0}`)});

    const row3=discover.querySelector(`.${css.row3}`);
    data.genres.forEach(genre=>{
        GenreList({parent:row3,genre});
    });

    if(!store.elements.navigator){
        Navigator({parent:app});
    }
}
