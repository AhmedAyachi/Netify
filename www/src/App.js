import {useRef} from "vanilla";
import {Router} from "vanilla-router";
import css from "./App.module.css";
import {EntryAnimation,OfflineAlert,Navigator} from "components";
import {Home,Find,WatchList,Profile,Setting,ShowDetails,GenreShows} from "routes";
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
        {component:Home,path:"",
            onLoad:()=>{
                const {isguest,sessiontoken,user}=store;
                if(isguest||(sessiontoken&&user.id)){
                    onRouteLoaded();
                }
            }
        },
        ...[
            {component:Find,path:"#find"},
            {component:WatchList,path:"#watchlist"},
            {component:Profile,path:"#profile"},
            {component:Setting,path:"#profile#:setname"},
            {component:ShowDetails,path:"#shows#:typeid"},
            {component:GenreShows,path:"#genres#:id"}
        ].map(route=>({...route,
            restricted:()=>{
                const {isguest,sessiontoken,user}=store;
                return isguest||(sessiontoken&&user.id);
            },
            onLoad:onRouteLoaded,
        })),
    ]);

    window.addEventListener("offline",()=>{
        OfflineAlert({parent:app,ref:refs.offlinealert});
    });
    window.addEventListener("online",()=>{
        const offlinealert=app.querySelector(`#${refs.offlinealert}`);
        fadeOut(offlinealert,0.5);
        setTimeout(()=>{
            offlinealert.remove();
            location.refresh();
        },600);
    });
}

const onRouteLoaded=()=>{
    const {elements}=store;
    if(elements.navigator){
        const navigator=document.querySelector(`#app>#${elements.navigator.id}`);
        if(!navigator){
            window.app.appendChild(elements.navigator);
        }
    }
    else{
        elements.navigator=Navigator(); 
    }
}

