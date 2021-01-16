import {useRef} from "vanilla";
import css from "./MediaSection.module.css";
import {Loader} from "components";
import ImageGrid from "./ImageGrid/ImageGrid";
import * as H from "./Hooks";


export default function MediaSection(props){
    const {parent,ref=useRef("mediasection"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.mediasection}"></div>`);
    const mediasection=parent.querySelector(`#${ref}`);

    mediasection.innerHTML=`
        <div class="${css.row0}"></div>
    `;
    const loader=Loader({parent:mediasection,style:"position:relative;"});
    
    H.useImages(show,images=>{
        const row0=mediasection.querySelector(`.${css.row0}`);
        loader.remove();
        ImageGrid({parent:row0,title:"Posters",images});
        mediasection.scrollIntoView({block:"start",behavior:"smooth"});
    });
    return mediasection;
}

//https://www.themoviedb.org/video/play?key=yzXglr5bc3w