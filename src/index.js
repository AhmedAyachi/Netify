import {useStore} from "vanilla";
import "./index.css";
import App from "./App";
import Reducer from "./Store";


function onDeviceReady(){
    StatusBar.overlaysWebView(true);
    StatusBar.backgroundColorByHexString("#00000000");
    useStore(Reducer);
    document.addEventListener("online",()=>{
        alert("you're online: "+navigator.connection.type);
    });
    document.addEventListener("offline",()=>{
        alert("Sorry no internet connection");
    });
    App({
        parent:document.getElementById("root"),
    });
};
document.addEventListener("deviceready",onDeviceReady,false);