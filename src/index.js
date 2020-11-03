import "./index.css";
import App from "./App";


function onDeviceReady(){
    //StatusBar.styleLightContent();
    StatusBar.styleBlackOpaque();
    App({
        parent:document.getElementById("root"),
    });   
};
document.store={
    name:"Ahmed Ayachi",
};
document.addEventListener("deviceready",onDeviceReady,false);