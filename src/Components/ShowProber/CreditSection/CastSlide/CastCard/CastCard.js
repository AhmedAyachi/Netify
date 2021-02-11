import {useRef} from "vanilla";
import css from "./CastCard.module.css";
import {defaultcover} from "assets";


export default function CastCard(props){
    const {parent,cast,ref=useRef("catscard")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.castcard}"></div>`);
    const catscard=parent.querySelector(`#${ref}`);

    const {name,character,job,profile_path}=cast;
    catscard.innerHTML=`
        <div class="${css.row0}">
            <img 
                alt=""
                class="${css.photo}"
                src="${profile_path?`https://image.tmdb.org/t/p/w138_and_h175_face/${profile_path}`:defaultcover}"
                draggable="false"
            />
        </div>
        <div class="${css.row1}">
            <ul class="${css.details}">
                <li class="${css.name}">${name}</li>
                ${character?`<li class="${css.detail}" title="${character}">${character}</li>`:""}
                ${job?`<li class="${css.detail}" title="${job}">${job}</li>`:""}
            </ul>
        </div>
    `;
}