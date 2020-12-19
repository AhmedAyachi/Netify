import {useRef} from "vanilla";
import css from "./SearchOption.module.css";
import {closer} from "assets";
import {setSearchValue,deleteSearchValue} from "actions";
import {loadSearchedShows} from "../../Searcher";
import {fadeOut} from "afile";


export default function SearchOption(props){
    const {parent,ref=useRef("searchoption"),value="",inputfield}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchoption}"></div>`);
    const searchoption=parent.querySelector(`#${ref}`);

    searchoption.innerHTML=`
        <input value="${value}" readonly spellcheck="false"/>
        <img alt="delete" src="${closer}"/>
    `;

    searchoption.querySelector("img").onclick=()=>{
        searchoption.remove();
        deleteSearchValue(value);
    };
    searchoption.querySelector("input").onclick=()=>{
        if(inputfield.value.trim()!==value){
            setSearchValue(value);
            inputfield.value=value;
            loadSearchedShows(value,store);
        }
        fadeOut(parent);
    };
}