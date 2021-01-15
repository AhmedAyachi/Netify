import {File}from "estate";
import {WarnAlert} from "components";


export function useWatchList(onFulfilled=()=>{},onRejected=()=>{}){
    const store=window.store;
    try{
        if(store.isguest){
            const cordova=window.cordova;
            if(cordova&&cordova.file&&cordova.platformId!=="browser"){
                const file=new File({name:"watchlist.json"});
                file.onRead(content=>{
                    const shows=content?JSON.parse(content):[];
                    onFulfilled(shows);
                });
            }
            else{
                const content=localStorage.getItem("watchlist");
                const shows=content?JSON.parse(content):[];
                onFulfilled(shows);
            }
        }
        else if(store.sessiontoken){
 
        }
    }
    catch{(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useTitle(title,then)},
        });
        onRejected(error);
    })};
};
/*
catch(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useTitle(title,then)},
        });
    });
*/