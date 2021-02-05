import {} from "vanilla";
import {useRef} from "vanilla";
import css from "./InputField.module.css"
import {capitalize} from "afile";
import {openeye,closeeye} from "assets";


export default function InputField(props){
    const {parent,ref=useRef("inputfield")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.inputfield}"></div>`);
    const inputfield=parent.querySelector(`#${ref}`);

    inputfield.innerHTML=`
        <input type="${props.type}" placeholder="${capitalize(props.placeholder)}"/>
        ${props.type==="password"?`
            <img id="eye" alt="toggle" src="${closeeye}"/>
        `:""}
    `;
    const eyeimg=inputfield.querySelector("#eye");
    const input=inputfield.querySelector("input");
    if(eyeimg){
        eyeimg.onclick=()=>{
            if(input.type==="password"){
                eyeimg.setAttribute("src",openeye);
                input.type="text";
            }
            else{
                eyeimg.setAttribute("src",closeeye);
                input.type="password";
            }
        }
    }
    return inputfield;
}