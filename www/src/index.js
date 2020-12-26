import {useStore} from "vanilla";
import "./index.css";
import App from "./App";
import Reducer from "./Store";


document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady(){
    if(cordova.platformId!=="browser"){
        if(screen.height>=screen.width){
            screen.orientation.lock("portrait-primary");
        }
        else{
            screen.orientation.lock("landscape");
        }
    }
    StatusBar.mount=()=>{
        if(cordova.platformId!=="browser"){
            StatusBar.show();
            StatusBar.overlaysWebView(true);
            StatusBar.backgroundColorByHexString("#00000000");
        }
    }
    StatusBar.mount();
    useStore(Reducer);
    App({
        parent:document.getElementById("root"),
    });
};

document.addEventListener("backbutton",()=>{
    if(!location.hash){
        navigator.app.exitApp();
    }
},false);