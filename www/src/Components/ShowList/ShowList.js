import {useRef} from "vanilla";
import css from "./ShowList.module.css";
import {ShowCard,Loader} from "components";
import * as H from "./Hooks";


export default function ShowList(props){
    const {parent,ref=useRef("showlist"),genre}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showlist}"></div>`);
    const showlist=parent.querySelector(`#${ref}`);

    showlist.innerHTML=`
        <div class="${css.row0}">${genre.name}</div>
        <div class="${css.row1}">
            <div class="${css.col0}"></div>
            <div class="${css.col1}"></div>
        </div>
    `;
    const row1=showlist.querySelector(`.${css.row1}`);
    const loader=Loader({parent:row1});

    H.useShowsByGenre(genre.id,shows=>{
        loader.remove();
        setShows(shows,showlist);
    });

    return showlist;
}

const setShows=(shows,showlist)=>{
    const col0=showlist.querySelector(`.${css.col0}`),col1=showlist.querySelector(`.${css.col1}`);
    if(shows&&shows.length){
        shows.forEach(show=>{
            ShowCard({parent:col0,show});
        });
        col1.innerHTML="More";
    }
}