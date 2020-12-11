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

    const row1=showslist.querySelector("#row1"),showState=store.show;
    if(showState.searchvalue){
        const searcherInput=document.querySelector(`#${searcherRef} input`);
        searcherInput.value=showState.searchvalue;
        const searched=showState.searched;
        if(searched.length){
            searched.forEach(show=>{
                ShowCard({parent:row1,show});
            });
        };
    }
    else{
        setShowCards(showslist,store.show);
    }

    showslist.querySelector("#prevarrow").onclick=()=>{
        Collection.previous(showslist,store.show);
        const searcherInput=document.querySelector(`#${refs.searcher} input`);
        if(searcherInput&&searcherInput.value){
            searcherInput.value="";
        }
    }
    showslist.querySelector("#nextarrow").onclick=()=>{
        Collection.next(showslist,store.show);
        const searcherInput=document.querySelector(`#${refs.searcher} input`);
        if(searcherInput&&searcherInput.value){
            searcherInput.value="";
        }
    }

    showslist.setShows=(shows=showState.shows)=>{
        row1.innerHTML="";
        if(shows&&shows.length){
            shows.forEach(show=>{
                ShowCard({parent:row1,show});
            });
        }
        else{
            
        }
    }
    
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
    this.previous=(showslist,showState)=>{
        if(showState.collection>1){
            showState.collection--;
            setShowCards(showslist,showState);
        }
    }
    this.next=(showslist,showState)=>{
        if(showState.collection<250){
            showState.collection++;
            setShowCards(showslist,showState);
        }
    }
})();

const setShowCards=(showslist,showState)=>{
    const row1=showslist.querySelector("#row1");
    const loading=showslist.querySelector("#loading");
    loading.style.display="block";
    loadShows(showState.collection,(shows)=>{
        row1.innerHTML="";
        shuffle(shows).forEach(show=>{
            ShowCard({parent:row1,show});
        });
        loading.style.display="none";
    });
}
