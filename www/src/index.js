import {useStore} from "vanilla";
import "./index.css";
import App from "./App";
import Reducer from "./Store";
import {back} from "./Components/BackButton/BackButton";


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
    window.location.hash="";
    App({
        parent:document.getElementById("root"),
    });
};

document.addEventListener("backbutton",back,false);