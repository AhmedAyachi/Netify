import {File}from "estate";
import {WarnAlert} from "components";


export function useWatchList(onFulfilled=()=>{},onRejected=()=>{}){
    const store=window.store;
    if(store&&store.isguest){
        try{
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
        catch{onRejected};
    }
};