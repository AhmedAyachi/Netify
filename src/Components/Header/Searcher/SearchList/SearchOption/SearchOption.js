import {useRef} from "vanilla";
import css from "./SearchOption.module.css";
import {closer} from "assets";
import {deleteSearchValue} from "actions";


export default function SearchOption(props){
    const {parent,ref=useRef("searchoption"),value=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchoption}"></div>`);
    const searchoption=parent.querySelector(`#${ref}`);

    searchoption.innerHTML=`
        <input value="${value}" readonly/>
        <img alt="delete" src="${closer}"/>
    `;

    const img=searchoption.querySelector("img");
    img.onclick=()=>{
        searchoption.remove();
        deleteSearchValue(value);
    };
}