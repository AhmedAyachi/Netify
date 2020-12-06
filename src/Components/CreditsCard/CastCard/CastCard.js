import {useRef} from "vanilla";
import css from "./CastCard.module.css";
import {defaultcover} from "assets";


export default function CastCard(props){
    const {parent,cast,ref=useRef("catscard")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.castcard}"></div>`);
    const catscard=parent.querySelector(`#${ref}`);

    const {name,character,profile_path}=cast;
    catscard.innerHTML=`
        <div class="${css.col0}">
            <img 
                alt=""
                class="${css.photo}"
                src="${profile_path?`https://image.tmdb.org/t/p/w138_and_h175_face/${profile_path}`:defaultcover}"
            />
        </div>
        <div class="${css.col1}">
            <p class="${css.name}">${name}</p>
            <p class="${css.character}" title="${character}">${character}</p>
        </div>
    `;
}