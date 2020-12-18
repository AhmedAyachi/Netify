import {useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import {addSearchValue,setSearchedShows,loadShowsByTitle,setSearchValue} from "actions";
import SearchList from "./SearchList/SearchList";
import Filter,{getFilteredShows} from "./Filter/Filter";
import {toggle} from "afile";


export default function Searcher(props){
    const {parent,ref=useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);
    const refs={
        searchlist:useRef("searchlist"),
        filter:useRef("filter"),
    };

    searcher.innerHTML=`
        <div id="row0" class="${css.row0}">
            <input placeholder="Search for a movie or a tv show" type="text" spellcheck="false"/>
            <img class="${css.filter}" alt="" src="${filtericon}"/>
        </div>
        <div id="row1" class="${css.row1}"></div>
    `;
    const input=searcher.querySelector("input");
    const row1=searcher.querySelector(`.${css.row1}`);
    SearchList({parent:row1,ref:refs.searchlist,inputfield:input,filterRef:refs.filter});
    Filter({parent:row1,ref:refs.filter});
    
    const filter=row1.querySelector(`#${refs.filter}`);
    const searchlist=row1.querySelector(`#${refs.searchlist}`);
    input.onchange=()=>{handleOnChange(input,store)};
    searcher.querySelector(`.${css.filter}`).onclick=function(){
        if(searchlist.style.display==="none"){
            toggle(filter);
        }
        else{
            setTimeout(()=>{toggle(filter)},200);
        }
    }
}

const styles={
    noresults:`
        color:#cf0909;
        font-weight:bold;
    `,
}

export const loadSearchedShows=(value,store)=>{
    const {showslist}=store.elements;
    const loading=showslist.querySelector("#loading");
    loading.style.display="block";
    loadShowsByTitle(value,(shows)=>{
        setSearchedShows(shows);
        showslist.setShows(getFilteredShows(store.show));
        loading.style.display="none";
    });
}

const handleOnChange=(input,store)=>{
    const showslist=store.elements.showslist;
    const value=input.value.toLowerCase().trim();
    setSearchValue(value);
    if(value){
        addSearchValue(value);
        loadSearchedShows(value,store);
    }
    else{
        showslist.setShows(getFilteredShows(store.show));
    }
}