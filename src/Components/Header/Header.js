import {useRef} from "vanilla";
import css from "./Header.module.css";
import {netflixlogo} from "assets";
import Searcher from "./Searcher/Searcher";


export default function Header(props){
    const {parent,ref=useRef("header")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.header}"></div>`);
    const header=parent.querySelector(`#${ref}`);

    header.innerHTML=`
        <img class="${css.logo}" alt="Netlix" src="${netflixlogo}"/>
    `;
    Searcher({parent:header,ref:props.searcherRef});
}