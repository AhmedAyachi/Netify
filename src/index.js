import "./index.css";
import App from "./App";


function onDeviceReady() {
    App({
        parent:document.getElementById("root"),
    });   
};

document.addEventListener("deviceready",onDeviceReady,false);
window.addEventListener("load",onDeviceReady,false);