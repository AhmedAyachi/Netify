import {useRef} from "vanilla";
import css from "./ShowGrid.module.css";
import {ShowCard} from "components";


export default function ShowGrid(props){
    const {parent,ref=useRef("showgrid"),shows,onMounted,onBottom}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showgrid}"></div>`);
    const showgrid=store.elements.showgrid=parent.querySelector(`#${ref}`);

    showgrid.innerHTML=`
    `;
    if(shows&&shows.length){
        shows.forEach(show=>{ShowCard({parent:showgrid,show})});
    }
    onMounted&&onMounted(showgrid);

    if(onBottom){
        const onReachBottom=()=>{
            const {scrollY,innerHeight}=window,{offsetHeight}=document.body;
            if((scrollY+innerHeight)>=offsetHeight*0.95){
                window.removeEventListener("scroll",onReachBottom);
                onBottom(showgrid);
            };
        }
        window.addEventListener("scroll",onReachBottom);
    
        showgrid.setScroll=(value=true)=>{
            window.removeEventListener("scroll",onReachBottom);
            value&&window.addEventListener("scroll",onReachBottom);
        }
    }
    
    showgrid.setShows=(shows)=>{
        showgrid.innerHTML="";
        shows&&shows.lengthshows.forEach(show=>{ShowCard({parent:showgrid,show})});
    };
    return showgrid;
}
