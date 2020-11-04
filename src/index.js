import {useStore} from "vanilla";
import "./index.css";
import App from "./App";


function onDeviceReady(){
    StatusBar.styleBlackOpaque();
    useStore();
    App({
        parent:document.getElementById("root"),
    }); 
};
document.addEventListener("deviceready",onDeviceReady,false);