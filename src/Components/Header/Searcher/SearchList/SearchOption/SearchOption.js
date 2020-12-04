import {useRef} from "vanilla";
import css from "./SearchOption.module.css";
import {closer} from "assets";
import {deleteSearchValue} from "actions";
import {loadSearchedShows} from "../../Searcher";


export default function SearchOption(props){
    const {parent,ref=useRef("searchoption"),value="",inputfield}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchoption}"></div>`);
    const searchoption=parent.querySelector(`#${ref}`);

    searchoption.innerHTML=`
        <input value="${value}" readonly/>
        <img alt="delete" src="${closer}"/>
    `;

    searchoption.querySelector("img").onclick=()=>{
        searchoption.remove();
        deleteSearchValue(value);
    };
    searchoption.querySelector("input").onclick=()=>{
        inputfield.value=value;
        const showslist=store.elements.showslist;
        const showslistRow1=showslist.querySelector("#row1");
        showslistRow1.innerHTML="";
        const loading=showslist.querySelector("#loading");
        loading.style.display="block";
        loadSearchedShows(value,showslistRow1,loading);
    };
}