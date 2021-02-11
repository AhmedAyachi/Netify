import {useRef} from "vanilla";
import {Router} from "vanilla-router";
import css from "./App.module.css";
import {EntryAnimation,OfflineAlert} from "components";
import {Home,Find,WatchList,Profile,Setting,ShowDetails,GenreShows} from "routes";
import {setNavigator,onRouteError} from "estate";
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
    EntryAnimation({parent:app});
    
    const appcontent=window.appcontent=app.querySelector("#content");
    Router(appcontent,[
        ...[{component:Home,path:""},
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
                return isguest||(sessiontoken&&user&&user.id);
            },
            onLoad:setNavigator,
        }))].map(route=>({...route,
            onError:(error,route)=>{
                onRouteError({error,route},location.refresh);
            }
        }))
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

