import {useRef} from "vanilla";
import css from "./FetchAlert.module.css";
import {fadeIn,fadeOut} from "afile";


export default function FetchAlert(props){
    const {parent,ref=useRef("fetchalert"),event="OK",message="Could not fetch due to slow internet connection",onConfirm}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.fetchalert}" style="${styles.fetchalert}"></div>`);
    const fetchalert=parent.querySelector(`#${ref}`);

    fetchalert.innerHTML=`
        <div class="${css.background}"></div>
        <div class="${css.row0}">${message}</div>
        <div class="${css.row1}">
            <button class="${css.eventbtn}">${event}</button>
        </div>
    `;

    const eventbtn=fetchalert.querySelector(`.${css.eventbtn}`);
    eventbtn.onclick=()=>{
        if(onConfirm){
            onConfirm();
        }
        fetchalert.unmount();
    }


    fetchalert.unmount=()=>{
        fadeOut(fetchalert,1000);
        setTimeout(()=>{
            fetchalert.remove();
        },1150);
    }
    fadeIn(fetchalert);
}

const styles={
    fetchalert:`
        display:none;
    `,
}