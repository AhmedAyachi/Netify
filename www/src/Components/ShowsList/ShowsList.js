import {useRef} from "vanilla";
import css from "./ShowsList.module.css";
import ShowCard from "./ShowCard/ShowCard";
import {arrow,loadinganim} from "assets";
import {getFilteredShows} from "../Header/Searcher/Filter/Filter";
import {loadShows,setSearchValue} from "actions";


export default function ShowsList(props){
    const {parent,ref=useRef("showslist"),searcherRef}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showslist}"></div>`);
    const showslist=store.elements.showslist=parent.querySelector(`#${ref}`);

    showslist.innerHTML=`
        <div class="${css.row0}">
           <img class="${css.arrows}" id="prevarrow" alt="Previous" title="Previous" style="${styles.prevarrow}" src="${arrow}"/>
           <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
           <img class="${css.arrows}" id="nextarrow" alt="Next" title="Next" src="${arrow}"/>
        </div>
        <div class="${css.row1}"></div>
    `;

    const row1=showslist.querySelector(`.${css.row1}`),showStore=store.show;
    if(showStore.searchvalue){
        const searcherInput=document.querySelector(`#${searcherRef} input`);
        searcherInput.value=showStore.searchvalue;
        setShowsCards(row1,showStore.searched);
    }
    else if(showStore.shows.length){
        setShowsCards(row1,showStore.shows);
    }
    else{
        loadShowCards(showslist,showStore);
    }

    window.addEventListener("scroll",()=>{
        const {scrollY,innerHeight}=window,{offsetHeight}=document.body;
        if(scrollY+innerHeight>=offsetHeight*0.95){
            setShowsCards(row1,showStore.shows);
        };
    });


    showslist.querySelector("#prevarrow").onclick=()=>{
        Collection.previous(showslist,store.show);
        const searcherInput=document.querySelector(`#${searcherRef} input`);
        if(searcherInput&&searcherInput.value){
            searcherInput.value="";
        }
    }
    showslist.querySelector("#nextarrow").onclick=()=>{
        Collection.next(showslist,store.show);
        const searcherInput=document.querySelector(`#${searcherRef} input`);
        if(searcherInput&&searcherInput.value){
            searcherInput.value="";
        }
    }

    showslist.setShows=(shows=showStore.shows)=>{setShowsCards(row1,shows)};
}
const styles={
    prevarrow:`
        transform:scaleX(-1);
    `,
    loading:`
        display:none;        
    `,
};

const Collection=new (function(){
    this.previous=(showslist,showStore)=>{
        setSearchValue("");
        if(showStore.collection>1){
            showStore.collection--;
            loadShowCards(showslist,showStore);
        }
    }
    this.next=(showslist,showStore)=>{
        setSearchValue("");
        if(showStore.collection<250){
            showStore.collection++;
            loadShowCards(showslist,showStore);
        }
    }
})();

const loadShowCards=(showslist,showStore)=>{
    const row1=showslist.querySelector(`.${css.row1}`);
    const loading=showslist.querySelector("#loading");
    loading.style.display="block";
    loadShows(showStore.collection,()=>{
        setShowsCards(row1,getFilteredShows(showStore));
        loading.style.display="none";
    });
}

const setShowsCards=(row1,shows)=>{
    if(shows&&shows.length){
        shows.forEach(show=>{
            ShowCard({parent:row1,show});
        });
    }
    else{
        row1.innerHTML=`
            <p class="${css.noshowmsg}">No shows found in this collection</p>
        `;
    }
}