import {useStore} from "vanilla";
import "./index.css";
import App from "./App";
import Reducer from "./Store";


function onDeviceReady(){
    StatusBar.styleBlackOpaque();
    useStore(Reducer);
    App({
        parent:document.getElementById("root"),
    });
};
document.addEventListener("deviceready",onDeviceReady,false);