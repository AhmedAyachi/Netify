import {useRef} from "vanilla";
import css from "./FullViewer.module.css";
import {fadeIn,fadeOut} from "afile";
import {loadinganim} from "assets";


export default function FullViewer(props){
    const {parent=app,ref=useRef("fullviewer"),url,isIframe=false}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.fullviewer}" style="${styles.fullviewer}"></div>`);
    const fullviewer=parent.querySelector(`#${ref}`);
    const state={
        fadeOutduration:0.5,
    };

    fullviewer.innerHTML=`
        <div class="${css.quitbtn}">Back to app</div>
        <div class="${css.view}">
            ${isIframe?`
                <img alt="Loading" class="${css.loading}" src="${loadinganim}"/>
                <iframe
                    class="${css.target}"
                    frameborder="0"
                    allow="autoplay"
                    allowfullscreen
                    src="${url}?autoplay=1"
                ></iframe> 
            `:`
                <img class="${css.target}" alt="" src="${url}"/>
            `}
        </div>
    `;

    const quitbtn=fullviewer.querySelector(`.${css.quitbtn}`);
    fadeOut(quitbtn,"block",3);
    StatusBar.hide();


    quitbtn.onclick=()=>{
        const {fadeOutduration}=state;
        fadeOut(fullviewer,fadeOutduration);
        screen.orientation.lock("portrait-primary");
        StatusBar.mount();
        setTimeout(()=>{
            fullviewer.remove();
        },fadeOutduration*1000+100);
    }
    
    if(isIframe){
        const iframe=fullviewer.querySelector(`.${css.view} iframe`);
        const loading=fullviewer.querySelector(`.${css.loading}`);
        iframe.onload=()=>{loading.remove()};
    }
    fullviewer.onclick=()=>{onScreenClicked(quitbtn)};

    if(cordova.platformId!=="browser"){
        screen.orientation.unlock();
    }
    fadeIn(fullviewer,"flex",state.fadeOutduration);
}

const styles={
    fullviewer:`
        display:none;
    `,
};

const onScreenClicked=(quitbtn)=>{
    if(quitbtn&&quitbtn.style.display==="none"){
        fadeIn(quitbtn);
        setTimeout(()=>{
            fadeOut(quitbtn);
        },3500);
    }
}