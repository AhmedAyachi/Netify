import {useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import * as H from "./Hooks";
import SearchList from "./SearchList/SearchList";
import FilterList,{getFilteredShows} from "./FilterList/FilterList";
import {toggle} from "afile";
import {File} from "estate";


export default function Searcher(props){
    const {parent,ref=useRef("searcher"),onSearch,onFilter}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);

    searcher.innerHTML=`
        <div id="row0" class="${css.row0}">
            <input placeholder="Search for a movie or a tv show" type="text" spellcheck="false"/>
            <img class="${css.filtericon}" alt="" src="${filtericon}"/>
        </div>
        <div id="row1" class="${css.row1}"></div>
    `;
    const input=searcher.querySelector("input");
    const row1=searcher.querySelector(`.${css.row1}`);
    const filterlist=FilterList({parent:row1,onFilter});
    const searchlist=SearchList({parent:row1,inputfield:input,filterlist,onSearch});
    
    
    input.onchange=()=>{
        const value=input.value.toLowerCase().trim();
        if(value){
            searchlist.add(value);
            onSearch&&onSearch(input);
        }
    };

    searcher.querySelector(`.${css.filtericon}`).onclick=()=>{
        if(searchlist.style.display==="none"){
            toggle(filterlist);
        }
        else{
            setTimeout(()=>{toggle(filterlist)},200);
        }
    }


    return searcher;
}
