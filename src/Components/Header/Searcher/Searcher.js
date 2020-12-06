import {map,useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import {ShowCard} from "components";
import {addSearchValue,setSearched,loadShowsByTitle} from "actions";
import SearchList from "./SearchList/SearchList";


export default function Searcher(props){
    const {parent,ref=useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);
    const refs={
        searchlist:useRef("searchlist"),
    }

    searcher.innerHTML=`
        <div id="row0" class="${css.row0}">
            <input placeholder="Search for a movie" type="text" spellcheck="false"/>
            <img class="${css.filter}" alt="" src="${filtericon}"/>
        </div>
        <div id="row1" class="${css.row1}"></div>
    `;
    const input=searcher.querySelector("input");
    const row1=searcher.querySelector(`.${css.row1}`);
    SearchList({parent:row1,ref:refs.searchlist,inputfield:input});
    
    input.onchange=()=>{
        const showslist=store.elements.showslist;
        const showslistRow1=showslist.querySelector("#row1");
        const value=input.value.toLowerCase().trim();
        showslistRow1.innerHTML="";
        store.show.searchvalue=value;
        if(value){
            addSearchValue(value);
            const loading=showslist.querySelector("#loading");
            loading.style.display="block";
            loadSearchedShows(value,showslistRow1,loading);
        }
        else{
            const shows=store.show.shows;
            if(shows&&shows.length){
                shows.forEach(show=>{
                    ShowCard({parent:showslistRow1,show});
                });
            }
        }
    };
}

const styles={
    noresults:`
        color:#cf0909;
        font-weight:bold;
    `,
}

export const loadSearchedShows=(value,showslistRow1,loading)=>{
    loadShowsByTitle(value,(shows)=>{
        if(shows.length){
            shows.forEach(show=>{
                ShowCard({parent:showslistRow1,show});
            });
        }
        else{
            showslistRow1.innerHTML=`<p style="${styles.noresults}">No results</p>`;
        }
        loading.style.display="none";
        setSearched(shows);
    })
}