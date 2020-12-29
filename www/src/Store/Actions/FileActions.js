import {File} from "estate";
import {setLoading} from "./index";


export function loadWatchList(onFulfilled=()=>{},onRejected=()=>{}){
    const store=window.store;
    if(store&&store.isguest){
        const cordova=window.cordova;
        if(cordova&&cordova.file&&cordova.platformId!=="browser"){
            setLoading();
            const file=new File({name:"watchlist.json"},()=>{
                store.file.watchlist=file;
            });
            file.onRead(content=>{
                store.show.watchlist=content?JSON.parse(content):[];
                setLoading(false);
                onFulfilled();
            });
        }
        else{
            try{
                const watchlist=localStorage.getItem("watchlist");
                if(watchlist){
                    store.show.watchlist=JSON.parse(watchlist);
                }
                else{
                    localStorage.setItem("watchlist","");
                    store.show.watchlist=[];
                }
                onFulfilled();
            }
            catch{onRejected};
        }
    }
};