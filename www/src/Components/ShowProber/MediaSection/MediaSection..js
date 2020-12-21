import {useRef} from "vanilla";
import css from "./MediaSection.module.css";


export default function MediaSection(props){
    const {parent,ref=useRef("mediasection"),media}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.mediasection}"></div>`);
    const mediasection=parent.querySelector(`#${ref}`);

    mediasection.innerHTML=`
        
    `;
}