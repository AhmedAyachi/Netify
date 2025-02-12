import {useRef} from "vanilla";
import css from "./Loader.module.css";
import {loadinganim} from "assets";


export default function Loader(props={}){
    const {parent=appcontent,ref=useRef("loader"),style=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.loader}" style="${style}"></div>`);
    const loader=parent.querySelector(`#${ref}`);

    loader.innerHTML=`
        <img alt="loading" class="${css.loading}" src="${loadinganim}"/>
    `;

    return loader;
}