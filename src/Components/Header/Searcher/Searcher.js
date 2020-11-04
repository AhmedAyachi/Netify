import {useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";


export default function Searcher(props){
    const {parent,ref=useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);

    searcher.innerHTML=`
        <input placeholder="Search for a movie" type="text"/>
        <img alt="" src="${filtericon}"/>
    `;
    const input=searcher.querySelector("input");
    

}