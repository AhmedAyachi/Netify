import {useRef} from "vanilla";
import css from "./Header.module.css";
import Searcher from "./Searcher/Searcher";


export default function Header(props){
    const {parent,ref=useRef("header"),onSearch,onFilter}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.header}"></div>`);
    const header=parent.querySelector(`#${ref}`);

    header.innerHTML=`  
    `;
    Searcher({parent:header,ref:props.searcherRef,onSearch,onFilter});

    return header;
}
