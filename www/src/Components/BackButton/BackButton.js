import {useRef} from "vanilla";
import css from "./BackButton.module.css";
import {arrowpoint} from "assets";


export default function BackButton(props={}){
    const {parent=window.appcontent,ref=useRef("backbutton")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.backbutton}"></div>`);
    const backbutton=parent.querySelector(`#${ref}`);

    backbutton.innerHTML=`
        <img alt="<" class="${css.backbtn}" src="${arrowpoint}"/>
    `;

    backbutton.onclick=back;
}

export const back=()=>{
    const current=location.hash.slice(1);
    console.log(current);
    if(current){
        const next="#"+current.substring(0,current.indexOf("#"));
        history.replace(next);
    }
    else{
        navigator.app.exitApp();
    }
}