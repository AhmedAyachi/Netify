import {File} from "estate";
import {setLoading} from "./index";


export function loadWatchList(resolve=()=>{},reject=()=>{}){
    setLoading();
    const store=window.store;
    if(store&&store.isguest){
        const cordova=window.cordova;
        if(cordova&&cordova.file&&cordova.platformId!=="browser"){
            const file=new File({name:"watchlist.json"},()=>{
                store.file.watchlist=file;
            },reject);
            file.onRead(content=>{
                store.show.watchlist=content?JSON.parse(content):[];
                resolve();
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
                resolve();
            }
            catch{reject};
        }
    }
    setLoading(false);
};

export function loadSearch(){
    setLoading();
    const store=window.store;
    if(store){
        const cordova=window.cordova;
        if(cordova&&cordova.platformId!=="browser"&&cordova.file){
            const file=new File({name:"search.json"},()=>{
                store.file.search=file;
            });
            file.onRead(content=>{
                store.show.searchvalues=content?JSON.parse(content):[];
            });
        }
        else{
            const searchvalues=localStorage.getItem("searchvalues");
            if(searchvalues){
                store.show.searchvalues=JSON.parse(searchvalues);
            }
            else{
                localStorage.setItem("searchvalues","");
                store.show.searchvalues=[];
            }
        }
    }
    setLoading(false);
}