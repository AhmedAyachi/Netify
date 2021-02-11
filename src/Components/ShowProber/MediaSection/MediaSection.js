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
    const loader=Loader({parent:mediasection,style:"position:relative;"}),row0=mediasection.querySelector(`.${css.row0}`);;
    
    H.useImages(show,images=>{
        loader.remove();
        if(images&&images.length){
            ImageGrid({parent:row0,title:"Posters",images});
            mediasection.scrollIntoView({block:"start",behavior:"smooth"});
        }
        else{
            row0.innerHTML=`<span class="${css.nomedia}">No media found</span>`;
        }
    });
    return mediasection;
}
