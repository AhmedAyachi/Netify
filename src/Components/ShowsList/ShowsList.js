import {useRef} from "vanilla";
import css from "./ShowsList.module.css";
import ShowCard from "./ShowCard/ShowCard";
import {arrow,loadinganim} from "assets";
import {loadShows} from "actions";
import {shuffle} from "afile";


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
        <div id="row1"></div>
    `;

    const row1=showslist.querySelector("#row1"),showStore=store.show;
    if(showStore.searchvalue){
        const searcherInput=document.querySelector(`#${searcherRef} input`);
        searcherInput.value=showStore.searchvalue;
        setShows(row1,showStore.searched);
        console.log(store);
    }
    else{
        setShowCards(showslist,store.show);
    }

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

    showslist.setShows=(shows=showStore.shows)=>{setShows(row1,shows)};
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
        if(showStore.collection>1){
            showStore.collection--;
            setShowCards(showslist,showStore);
        }
    }
    this.next=(showslist,showStore)=>{
        if(showStore.collection<250){
            showStore.collection++;
            setShowCards(showslist,showStore);
        }
    }
})();

const setShowCards=(showslist,showStore)=>{
    const row1=showslist.querySelector("#row1");
    const loading=showslist.querySelector("#loading");
    loading.style.display="block";
    loadShows(showStore.collection,(shows)=>{
        row1.innerHTML="";
        shuffle(shows).forEach(show=>{
            ShowCard({parent:row1,show});
        });
        loading.style.display="none";
    });
}

const setShows=(row1,shows)=>{
    row1.innerHTML="";
    if(shows&&shows.length){
        shows.forEach(show=>{
            ShowCard({parent:row1,show});
        });
    }
    else{
        row1.innerHTML=`
            <p class="${css.noshowmsg}">No shows found</p>
        `;
    }
}