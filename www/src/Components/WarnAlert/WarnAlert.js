import {map,useRef} from "vanilla";
import css from "./WarnAlert.module.css";
import {fadeIn} from "afile";
import {capitalize} from "afile";


export default function WarnAlert(props){
    const {parent=app,ref=useRef("warnalert"),message="This may cause unwelcome behaviour",onCancel,onProceed}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.warnalert}"></div>`);
    const warnalert=parent.querySelector(`#${ref}`);

    warnalert.innerHTML=`
        <div class="${css.alertbackdrop}"></div>
        <div class="${css.row0}">${message}</div>
        <div class="${css.row1}">
            ${map(["cancel","proceed"],msg=>`
                <button id="${msg}btn" class="${css.button}">${capitalize(props[msg]||msg)}</button> 
            `)}
        </div>
    `
    
    fadeIn(warnalert,"block",0.4);
    warnalert.querySelector("#cancelbtn").onclick=()=>{
        warnalert.remove();
        if(onCancel){
            onCancel();
        }
    }
    warnalert.querySelector("#proceedbtn").onclick=()=>{
        warnalert.remove();
        if(onProceed){
            onProceed();
        }
    }
}