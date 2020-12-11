import {Router,useRef} from "../Vanilla";
import css from "./App.module.css";
import {EntryAnimation,OfflineAlert,Navigator} from "components";
import {Home,Shows,ShowDetails} from "routes";
import {fadeIn,fadeOut} from "afile";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="app" class=${css.app}></div>`);
    const app=parent.querySelector(`.${css.app}`);
    const refs={
        offlinealert:useRef("offlinealert"),
        navigator:useRef("navigator"),
    }
    const state={
        navigator:null,
    }

    app.innerHTML=`
        <div id="row0"></div>
    `;

    Router(app.querySelector("#row0"),[
        {component:Home,path:""},
        {component:Shows,path:"#shows"},
        {component:ShowDetails,path:"#shows#show"},
    ]);

    window.addEventListener("hashchange",()=>{
        const location=window.location;
        if(location.hash){
            if(!state.navigator){
                app.style.paddingBottom="5.5rem";
                Navigator({parent:app,ref:refs.navigator,style:styles.navigator});
                state.navigator=app.querySelector(`:scope>#${refs.navigator}`);
                fadeIn(state.navigator,"flex",1);
            }
        }
        else{
            if(state.navigator){
                state.navigator.remove();
                state.navigator=null;
            }
            app.style.removeProperty("padding-bottom");
        }
    })
    
    window.addEventListener("offline",()=>{
        OfflineAlert({parent:app,ref:refs.offlinealert});
    });
    window.addEventListener("online",()=>{
        const offlinealert=app.querySelector(`#${refs.offlinealert}`);
        fadeOut(offlinealert,0.5);
        setTimeout(offlinealert.remove,510);
    });
}

const styles={
    navigator:`display:none;`,
};