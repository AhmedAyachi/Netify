import {useRef} from "vanilla";
import css from "./PopupTextArea.module.css";
import {fadeIn} from "afile";


export default function PopupTextArea(props){
    const {parent,ref=useRef("popuptextarea"),title="",placeholder="",message=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.popuptextarea}" style="${styles.popuptextarea}"></div>`);
    const popuptextarea=parent.querySelector(`#${ref}`),state={
        length:message.length,
    };

    popuptextarea.innerHTML=`
        <div class="${css.row0}">
            <h3 class="${css.title}">${title}</h3>
            <div class="${css.textarea}" placeholder="${placeholder||""}" contenteditable></div>
        </div>
        <div class="${css.row1}">
            <span class="${css.counter}" style="${styles.counter(state.length)}">${state.length}/100</span>
            <span>Send</span>
        </div>
    `;
    
    const textarea=popuptextarea.querySelector(`.${css.textarea}`);
    const counter=popuptextarea.querySelector(`.${css.counter}`);
    textarea.oninput=()=>{
        state.length=textarea.innerText.trim().length;
        counter.innerHTML=`${state.length}/100`;
        counter.setAttribute("style",styles.counter(state.length));
    }

    fadeIn(popuptextarea,"block",1);
    setTimeout(()=>{
        textarea&&textarea.focus();
    },1100);
    
}

const styles={
    popuptextarea:`
        display:none;
    `,
    counter:(length)=>`
        color:#${length<100?"cc0000":"019226"};
    `,
}