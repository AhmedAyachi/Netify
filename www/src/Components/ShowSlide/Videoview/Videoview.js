import {useRef} from "vanilla";
import css from "./Videoview.module.css";
import {play1,play2} from "assets";
import {FullViewer} from "components";


export default function Videoview(props){
    const {parent,ref=useRef("videoview"),video}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.videoview}"></div>`);
    const videoview=parent.querySelector(`#${ref}`);

    videoview.innerHTML=`
        <img alt="Play" class="${css.playbtn}" src="${play1}"/>
        <h1 class="${css.title}">${video.name}</h1>
    `;
    
    const playbtn=videoview.querySelector(`.${css.playbtn}`);
    playbtn.onclick=()=>{
        FullViewer({isIframe:true,url:`https://www.youtube.com/embed/${video.key}`});
    };
}