import {useRef} from "vanilla";
import css from "./DetailSection.module.css";


export default function DetailSection(props){
    const {parent,ref=useRef("detailsection"),details}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.detailsection}"></div>`);
    const detailsection=parent.querySelector(`#${ref}`);

    detailsection.innerHTML=`
        <p style="color:white;">Details</p>
    `;
} 