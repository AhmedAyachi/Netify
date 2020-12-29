import {useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import * as H from "./Hooks";
import SearchList from "./SearchList/SearchList";
import Filter,{getFilteredShows} from "./Filter/Filter";
import {toggle} from "afile";
import {File} from "estate";


export default function Searcher(props){
    const {parent,ref=useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);
    const refs={
        searchlist:useRef("searchlist"),
        filter:useRef("filter"),
        searchfile:new File("search.txt"),
    };

    searcher.innerHTML=`
        <div id="row0" class="${css.row0}">
            <input placeholder="Search for a movie or a tv show" type="text" spellcheck="false"/>
            <img class="${css.filtericon}" alt="" src="${filtericon}"/>
        </div>
        <div id="row1" class="${css.row1}"></div>
    `;
    const input=searcher.querySelector("input");
    const row1=searcher.querySelector(`.${css.row1}`);
    const filter=Filter({parent:row1});
    const searchlist=SearchList({parent:row1,inputfield:input,filter});
    
    
    input.onchange=()=>{handleOnChange(input,searchlist)};
    searcher.querySelector(`.${css.filtericon}`).onclick=function(){
        if(searchlist.style.display==="none"){
            toggle(filter);
        }
        else{
            setTimeout(()=>{toggle(filter)},200);
        }
    }


    return searcher;
}

export const handleOnChange=(input,searchlist)=>{
    const showslist=store.elements.showslist;
    const value=input.value.toLowerCase().trim();
    if(value){
        searchlist.add(value);
        showslist.load();
        H.useTitle(value,(shows)=>{
            showslist.unload();
            showslist.swipe(false);
            showslist.setShows(shows);
        });
    }
    else{
        showslist.swipe();
        showslist.setShows();
    }
}