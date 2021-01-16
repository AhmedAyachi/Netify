import {useRef} from "vanilla";
import {Router} from "vanilla-router";
import css from "./App.module.css";
import {EntryAnimation,OfflineAlert} from "components";
import {Home,ShowDetails,WatchList,Find} from "routes";
import {fadeOut} from "afile";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="app" class=${css.app}></div>`);
    const app=window.app=parent.querySelector("#app");
    const refs={
        offlinealert:useRef("offlinealert"),
    }
    app.innerHTML=`
        <div id="content" class="${css.content}"></div>
    `;
    
    const appcontent=window.appcontent=app.querySelector("#content");
    Router(appcontent,[
        {component:Home,path:""},
        {component:Find,path:"#find"},
        {component:WatchList,path:"#watchlist"},
        {component:null,path:"#settings"},
        {component:ShowDetails,path:"#:typeid"},
        {component:ShowDetails,path:"#show"},
    ]);

    window.addEventListener("offline",()=>{
        OfflineAlert({parent:app,ref:refs.offlinealert});
    });
    window.addEventListener("online",()=>{
        const offlinealert=app.querySelector(`#${refs.offlinealert}`);
        fadeOut(offlinealert,0.5);
        setTimeout(()=>{offlinealert.remove()},510);
    });
}

