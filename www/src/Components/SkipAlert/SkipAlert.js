import {map,useRef} from "vanilla";
import css from "./SkipAlert.module.css";
import {fadeIn} from "afile";
import {setIsguest} from "actions";
import {capitalize} from "afile";
import {Home} from "routes";


export default function SkipAlert(props){
    const {parent,ref=useRef("skipalert")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.skipalert}"></div>`);
    const skipalert=parent.querySelector(`#${ref}`);

    skipalert.innerHTML=`
        <div class="${css.alertbackdrop}"></div>
        <div class="${css.row0}">If you skip loggin in, data will be stored on the device</div>
        <div class="${css.row1}">
            ${map(["cancel","proceed"],msg=>`
                <button id="${msg}btn" class="${css.button}">${capitalize(msg)}</button> 
            `)}
        </div>
    `
    
    fadeIn(skipalert,"block",0.4);
    skipalert.querySelector("#cancelbtn").onclick=()=>{
        skipalert.remove();
    }
    skipalert.querySelector("#proceedbtn").onclick=()=>{
        setIsguest();
        const appcontent=app.querySelector("#content");
        appcontent.innerHTML="";
        Home({parent:appcontent});
    }
}