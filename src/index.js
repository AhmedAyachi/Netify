import {useStore} from "vanilla";
import "./index.css";
import App from "./App";
import Reducer from "./Store";


function onDeviceReady(){
    StatusBar.overlaysWebView(true);
    StatusBar.backgroundColorByHexString("#00000000");
    useStore(Reducer);
    App({
        parent:document.getElementById("root"),
    });
};
document.addEventListener("deviceready",onDeviceReady,false);
document.addEventListener("backbutton",()=>{
    if(!location.hash){
        navigator.app.exitApp();
    }
},false);