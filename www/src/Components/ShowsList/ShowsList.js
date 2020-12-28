import {useRef} from "vanilla";
import css from "./ShowsList.module.css";
import ShowCard from "./ShowCard/ShowCard";
import {Loader} from "components";
import {getFilteredShows} from "../Header/Searcher/Filter/Filter";
import {loadShows,setSearchValue} from "actions";


export default function ShowsList(props){
    const {parent,ref=useRef("showslist"),searcherRef}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showslist}"></div>`);
    const showslist=store.elements.showslist=parent.querySelector(`#${ref}`);
    const state={
        shows:null,
    },refs={
        loader:useRef("loader"),
    }

    showslist.innerHTML=`
        <div class="${css.row0}">Discover</div>
        <div class="${css.row1}"></div>
    `;

    const row1=showslist.querySelector(`.${css.row1}`),showStore=store.show;
    /*if(showStore.searchvalue){
        const searcherInput=document.querySelector(`#${searcherRef} input`);
        searcherInput.value=showStore.searchvalue;
        setShowsCards(row1,showStore.searched);
    }
    else*/ if(showStore.shows.length){
        setShowsCards(row1,showStore.shows);
    }
    else{
        loadShowCards(showslist,showStore,refs);
    }


    const onReachBottom=()=>{
        const {scrollY,innerHeight}=window,{offsetHeight}=document.body;
        const loader=showslist.querySelector(`#${refs.loader}`);
        if(!loader&&!showStore.searchvalue&&(scrollY+innerHeight>=offsetHeight*0.95)){
            Loader({parent:showslist,ref:refs.loader});
            Collection.next(showslist,showStore,refs);
        };
    }
    window.addEventListener("scroll",onReachBottom);
    window.addEventListener("hashchange",()=>{
        window.removeEventListener("scroll",onReachBottom);
    },{once:true});


    showslist.setShows=(shows=showStore.shows)=>{
        row1.innerHTML="";
        setShowsCards(row1,shows);
    };
}

const Collection=new (function(){
    /*this.previous=(showslist,showStore)=>{
        setSearchValue("");
        if(showStore.collection>1){
            showStore.collection--;
            loadShowCards(showslist,showStore);
        }
    }*/
    this.next=(showslist,showStore,refs)=>{
        setSearchValue("");
        if(showStore.collection<250){
            showStore.collection++;
            loadShowCards(showslist,showStore,refs);
        }
    }
})();

const loadShowCards=(showslist,showStore,refs)=>{
    const row1=showslist.querySelector(`.${css.row1}`);
    showslist.querySelector(`.${css.row}`)
    loadShows(showStore.collection,(shows)=>{
        const loader=showslist.querySelector(`#${refs.loader}`);
        loader&&loader.remove();
        setShowsCards(row1,shows);
    });
}

const setShowsCards=(container,shows)=>{
    if(shows&&shows.length){
        shows.forEach(show=>{
            ShowCard({parent:container,show});
        });
    }
    else{
        container.innerHTML=`
            <p class="${css.noshowmsg}">No shows found in this collection</p>
        `;
    }
}