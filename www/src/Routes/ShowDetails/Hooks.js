import {apikey,Show,File} from "estate";
import {FetchAlert} from "components";


export const useDetails=({id,type},onFulfilled=()=>{},onRejected=()=>{})=>{
    const data={details:null,recos:null};
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apikey}`).
    then(response=>response.json()).
    then(details=>{
        data.details=new Show(details);
        isInWatchList({id,type},inWatchList=>{
            data.details.inWatchList=inWatchList;
        });
    }).
    then(async ()=>{
        const response=await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apikey}&language=en-US&page=1`);
        const result=await response.json();
        data.recos=result.results.map(show=>new Show(show));
        onFulfilled(data);
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