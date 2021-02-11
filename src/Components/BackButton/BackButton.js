import {useRef} from "vanilla";
import css from "./BackButton.module.css";
import {arrowpoint} from "assets";


export default function BackButton(props={}){
    const {parent=window.appcontent,ref=useRef("backbutton"),style}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.backbutton}" style="${style}"></div>`);
    const backbutton=parent.querySelector(`#${ref}`);

    backbutton.innerHTML=`
        <img alt="<" class="${css.backbtn}" src="${arrowpoint}"/>
    `;

    backbutton.onclick=back;
}

export const back=()=>{
    if(location.hash){
        history.back();
    }
    else{
        navigator.app.exitApp();
    }
}