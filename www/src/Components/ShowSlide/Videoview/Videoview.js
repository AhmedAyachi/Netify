import {useRef} from "vanilla";
import css from "./Videoview.module.css";


export default function Videoview(props){
    const {parent,ref=useRef("videoview"),url}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.videoview}"></div>`);
    const videoview=parent.querySelector(`#${ref}`);

    videoview.innerHTML=`
        
    `;
}