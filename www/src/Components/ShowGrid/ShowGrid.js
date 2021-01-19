import {useRef} from "vanilla";
import css from "./ShowGrid.module.css";
import {Loader,ShowCard} from "components";


export default function ShowGrid(props){
    const {parent,ref=useRef("showgrid"),shows,onBottom}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showgrid}"></div>`);
    const showgrid=store.elements.showgrid=parent.querySelector(`#${ref}`);

    showgrid.innerHTML=`
    `;
    
    if(shows&&shows.length){
        shows.forEach(show=>{ShowCard({parent:showgrid,show})});
    }

    const onReachBottom=()=>{
        const {scrollY,innerHeight}=window,{offsetHeight}=document.body;
        if((scrollY+innerHeight>=offsetHeight*0.95)){
            const loader=Loader({parent:showgrid,style:"position:relative;margin:5px;"});
            window.removeEventListener("scroll",onReachBottom);
            onBottom&&onBottom({showgrid,loader});
        };
    }
    window.addEventListener("scroll",onReachBottom);

    showgrid.setShows=(shows)=>{
        if(shows&&shows.length){
            showgrid.innerHTML="";
            shows.forEach(show=>{ShowCard({parent:showgrid,show})});
        }
    };
    showgrid.setScroll=(value=true)=>{
       window.removeEventListener("scroll",onReachBottom);
       if(value){
           window.addEventListener("scroll",onReachBottom);
       }
    }
    return showgrid;
}
