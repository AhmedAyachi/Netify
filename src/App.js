import {useRef} from "vanilla";
import {Router} from "vanilla-router";
import css from "./App.module.css";
import {EntryAnimation,OfflineAlert} from "components";
import {Home,ShowDetails,Watchlist} from "routes";
import {fadeOut} from "afile";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="app" class=${css.app}></div>`);
    const app=window.app=parent.querySelector(`.${css.app}`);
    const refs={
        offlinealert:useRef("offlinealert"),
    }
    app.innerHTML=`
        <div id="content"></div>
    `;
    
    Router(app.querySelector("#content"),[
        {component:Home,path:""},
        {component:ShowDetails,path:"#show"},
        {component:Watchlist,path:"#watchlist"},
    ]);
    
    window.addEventListener("offline",()=>{
        OfflineAlert({parent:app,ref:refs.offlinealert});
    });
    window.addEventListener("online",()=>{
        const offlinealert=app.querySelector(`#${refs.offlinealert}`);
        fadeOut(offlinealert,0.5);
        setTimeout(offlinealert.remove,510);
    });
}