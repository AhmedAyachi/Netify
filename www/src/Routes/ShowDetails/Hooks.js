import {apikey,File} from "estate";
import {FetchAlert} from "components";


export const useDetails=({id,type},onFulfilled=()=>{},onRejected=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apikey}`).
    then(response=>response.json()).
    then(details=>{
        isInWatchList({id,type},inWatchList=>{
            details.inWatchList=inWatchList;
            onFulfilled(details);
        });
    }).
    catch((error)=>{
        FetchAlert({
            parent:app,
            message:error.message,
            onConfirm:()=>{useDetails({id,type},onFulfilled)},
        });
        onRejected(error);
    });
}

const isInWatchList=({id,type},onFulfilled=()=>{})=>{
    const {store}=window;
    try{
        if(store.isguest){
            const {cordova}=window;
            if(cordova&&cordova.file&&cordova.platformId!=="browser"){
                const file=new File({name:"watchlist.json"});
                file.onRead(content=>{
                    const watchlist=content?JSON.parse(content):[];
                    const inWatchList=Boolean(watchlist.find(show=>show.id===id&&show.type===type));
                    onFulfilled(inWatchList);
                });
            }
            else if(cordova.platformId==="browser"){
                const content=localStorage.getItem("watchlist"),watchlist=content?JSON.parse(content):[];
                const inWatchList=Boolean(watchlist.find(show=>show.id===id&&show.type===type));
                onFulfilled(inWatchList);
            }
        }
    }
    catch(error){}
}