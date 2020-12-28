import {File}from "estate";


export function useWatchList(onFulfilled=()=>{},onRejected=()=>{}){
    const store=window.store;
    if(store&&store.isguest){
        const cordova=window.cordova;
        if(cordova&&cordova.file&&cordova.platformId!=="browser"){
            setLoading();
            const file=new File({name:"watchlist.json"});
            file.onRead(content=>{
                const shows=content?JSON.parse(content):[];
                setLoading(false);
                onFulfilled(shows);
            },onRejected);
        }
        else{
            try{
                const content=localStorage.getItem("watchlist");
                const shows=content?JSON.parse(content):[];
                onFulfilled(shows);
            }
            catch{onRejected};
        }
    }
};