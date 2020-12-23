import {useRef} from "vanilla";
import css from "./FullView.module.css";
import {fadeIn,fadeOut} from "afile";


export default function FullView(props){
    const {parent,ref=useRef("fullview"),target}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.fullview}" style="${styles.fullview}"></div>`);
    const fullview=parent.querySelector(`#${ref}`);
    const state={
        fadeOutduration:0.8,
    };

    fullview.innerHTML=`
        <div class="${css.quitbtn}">Quit fullscreen mode</div>
        <div class="${css.view}" style="${styles.view(target.path)}"></div>
    `;

    const quitbtn=fullview.querySelector(`.${css.quitbtn}`);
    quitbtn.onclick=()=>{
        const {fadeOutduration}=state;
        fadeOut(fullview,fadeOutduration);
        screen.orientation.lock("portrait-primary");
        setTimeout(()=>{
            fullview.remove();
        },fadeOutduration*1000+100);
    }
    if(cordova.platformId!=="browser"){
        screen.orientation.unlock();
    }
    fadeIn(fullview,"flex",1);
}

const styles={
    fullview:`
        display:none;
    `,
    view:(path)=>`
        background-image:url('${path}');
    `,
};