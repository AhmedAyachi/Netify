import {map,useRef} from "vanilla";
import css from "./PopupTextArea.module.css";
import {checked} from "assets";
import {fadeIn,fadeOut,shake} from "afile";


export default function PopupTextArea(props){
    const {parent,ref=useRef("popuptextarea"),minlength=150,title="",message="",onSend=null}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.popuptextarea}" style="${styles.popuptextarea}"></div>`);
    const popuptextarea=parent.querySelector(`#${ref}`),state={
        length:message.length,
        required:minlength,
        fineinput:message.length>=minlength,
    };

    popuptextarea.innerHTML=`
        <div class="${css.row0}">
            <h3 class="${css.title}">${title}</h3>
            <div class="${css.textarea}" contenteditable></div>
        </div>
        <div class="${css.row1}">
            <span class="${css.counter}">${state.fineinput?`
                <img alt="" src="${checked}"/>`:`
                ${state.length}/${state.required}
            `}</span>
            <span class="${css.actionbtns}">
                ${map(["cancel","send"],action=>`
                    <span id="${action}">${action}</span>
                `)}
            </span>
        </div>
    `;
    
    const textarea=popuptextarea.querySelector(`.${css.textarea}`);
    const counter=popuptextarea.querySelector(`.${css.counter}`);
    textarea.oninput=()=>{
        state.length=textarea.innerText.trim().length;
        if(state.length<state.required){
            state.fineinput=false;
            counter.innerHTML=`${state.length}/${state.required}`;
        }
        else if(!state.fineinput){
            state.fineinput=true;
            counter.innerHTML=`<img alt="" src="${checked}"/>`;
        }
    }
    const cancelbtn=popuptextarea.querySelector(`.${css.actionbtns} #cancel`);
    cancelbtn.onclick=()=>{popuptextarea.unmount()};

    if(onSend){
        const sendbtn=popuptextarea.querySelector(`.${css.actionbtns} #send`);
        sendbtn.onclick=()=>{
            if(state.fineinput){
                const message=textarea.innerText;
                onSend(message,sendbtn,popuptextarea);
            }
            else{
                shake(counter);
            }
        };
    }


    popuptextarea.unmount=()=>{
        fadeOut(popuptextarea,0.5);
        setTimeout(()=>{popuptextarea.remove()},650);
    }
    fadeIn(popuptextarea,"block",1);
    setTimeout(()=>{textarea&&textarea.focus()},1150);
    return popuptextarea;
}

const styles={
    popuptextarea:`
        display:none;
    `,
}