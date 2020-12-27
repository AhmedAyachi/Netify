import {useRef} from "vanilla";
import css from "./ShowAlikes.module.css";
import * as H from "./Hooks";


export default function ShowAlikes(props){
    const {parent,ref=useRef("showalikes"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showalikes}"></div>`);
    const showalikes=parent.querySelector(`#${ref}`);

    showalikes.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">/<div>
    `;

    /*H.useRecommendation(show,data=>{
        
    });*/
}