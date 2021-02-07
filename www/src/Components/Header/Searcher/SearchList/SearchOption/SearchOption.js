import {useRef} from "vanilla";
import css from "./SearchOption.module.css";
import {closer} from "assets";
import {fadeOut} from "afile";


export default function SearchOption(props){
    const {parent,ref=useRef("searchoption"),value="",inputfield,onSearch}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchoption}"></div>`);
    const searchoption=parent.querySelector(`#${ref}`);

    searchoption.innerHTML=`
        <div class="${css.input}"></div>
        <img class="${css.image}" alt="delete" src="${closer}"/>
    `;

    searchoption.querySelector("img").onclick=()=>{
        searchoption.remove();
        parent.delete(value);
    };
    const input=searchoption.querySelector(`.${css.input}`);input.innerText=value;
    input.onclick=()=>{
        if(inputfield.value.trim()!==value){
            inputfield.value=value;
            onSearch&&onSearch(value,inputfield);
        }
        fadeOut(parent);
    };
}