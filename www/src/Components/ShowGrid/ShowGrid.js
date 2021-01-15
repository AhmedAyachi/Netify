import {useRef} from "vanilla";
import css from "./ShowGrid.module.css";
import {Loader,ShowCard} from "components";
import * as H from "./Hooks";


export default function ShowGrid(props){
    const {parent,ref=useRef("showgrid")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showgrid}"></div>`);
    const showgrid=store.elements.showgrid=parent.querySelector(`#${ref}`);
    const state={
        collection:1,
        shows:[],
        bottom:false,
    },refs={
        loader:useRef("loader"),
    }

    showgrid.innerHTML=`
        <div class="${css.row0}">Discover</div>
        <div class="${css.row1}"></div>
    `;
    const row1=showgrid.querySelector(`.${css.row1}`);
    setShowsCards(row1,state);

    const onReachBottom=()=>{
        const {scrollY,innerHeight}=window,{offsetHeight}=document.body;
        if((scrollY+innerHeight>=offsetHeight*0.95)){
            window.removeEventListener("scroll",onReachBottom);
            setShowsCards(row1,state,onReachBottom);
        };
    }
    window.addEventListener("scroll",onReachBottom);

    showgrid.setShows=(shows=state.shows)=>{
        if(shows&&shows.length){
            row1.innerHTML="";
            shows.forEach(show=>{ShowCard({parent:row1,show})});
        }
    };
    showgrid.swipe=(value=true)=>{
       window.removeEventListener("scroll",onReachBottom);
       if(value){
           window.addEventListener("scroll",onReachBottom);
       }
    }
    showgrid.load=()=>{
        row1.innerHTML="";
        Loader({parent:row1,ref:refs.loader});
    }
    showgrid.unload=()=>{
        const loader=row1.querySelector(`#${refs.loader}`);
        loader&&loader.remove();
    }
}

const setShowsCards=(container,state,onReachBottom)=>{
    const loader=Loader({parent:container});
    setTimeout(()=>{
        H.useShows(state.collection,shows=>{
        loader.remove();
        if(shows&&shows.length){
            state.collection++;
            state.shows.push(...shows);
            shows.forEach(show=>{
                ShowCard({parent:container,show});
            });
            window.addEventListener("scroll",onReachBottom);
        }
        else{
            container.innerHTML=`
                <p class="${css.noshowmsg}">No shows found in this collection</p>
            `;
        }
    });
    },1000);
}