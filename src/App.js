import {Router,useRef} from "../Vanilla";
import css from "./App.module.css";
import {EntryAnimation,OfflineAlert} from "components";
import {Home,Shows,ShowDetails} from "routes";
import {fadeOut} from "afile";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="app" class=${css.app}></div>`);
    const app=parent.querySelector(`.${css.app}`);
    const refs={
        offlinealert:useRef("offlinealert"),
    } 

    app.innerHTML=`
        
    `;
    Router(app,[
        {component:Home,path:""},
        {component:Shows,path:"#shows"},
        {component:ShowDetails,path:"#shows#show"},
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