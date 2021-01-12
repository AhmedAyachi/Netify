import {useRef} from "vanilla";
import css from "./GenreList.module.css";
import {ShowCard,Loader} from "components";
import * as H from "./Hooks";


export default function GenreList(props){
    const {parent,ref=useRef("genrelist"),genre}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.genrelist}"></div>`);
    const genrelist=parent.querySelector(`#${ref}`);

    genrelist.innerHTML=`
        <div class="${css.row0}">${genre.name}</div>
        <div class="${css.row1}">
            <div class="${css.col0}"></div>
            <div class="${css.col1}"></div>
        </div>
    `;
    const row1=genrelist.querySelector(`.${css.row1}`);
    const loader=Loader({parent:row1});

    H.useShowsByGenre(genre.id,shows=>{
        loader.remove();
        setShows(shows,genrelist);
    });

    return genrelist;
}

const setShows=(shows,genrelist)=>{
    const col0=genrelist.querySelector(`.${css.col0}`),col1=genrelist.querySelector(`.${css.col1}`);
    if(shows&&shows.length){
        shows.forEach(show=>{
            ShowCard({parent:col0,show});
        });
        col1.innerHTML="More";
    }
}