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

export function loadSearch(onFulfilled=()=>{},onRejected=()=>{}){
    const store=window.store;
    if(store){
        const cordova=window.cordova;
        if(cordova&&cordova.platformId!=="browser"&&cordova.file){
            setLoading();
            const file=new File({name:"search.json"},()=>{
                store.file.search=file;
            });
            file.onRead(content=>{
                store.show.searchvalues=content?JSON.parse(content):[];
                setLoading(false);
                onFulfilled();
            });
        }
        else{
            try{
                const searchvalues=localStorage.getItem("searchvalues");
                if(searchvalues){
                    store.show.searchvalues=JSON.parse(searchvalues);
                }
                else{
                    localStorage.setItem("searchvalues","");
                    store.show.searchvalues=[];
                }
                onFulfilled();
            }
            catch{onRejected};
        }
    }
}