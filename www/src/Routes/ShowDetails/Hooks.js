import {apikey,Show,File,onRouteError} from "estate";


export const useDetails=({id,type},onFulfilled,onRejected)=>{
    try{
        const data={details:null,recos:null};
        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apikey}`).
        then(response=>response.json()).
        then(details=>{
            data.details=new Show(details);
            setIsInWatchList({id,type},async (inWatchList)=>{
                data.details.inWatchList=inWatchList;
                const response=await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apikey}&language=en-US&page=1`);
                const {results}=await response.json();
                data.recos=(results&&results.length)?results.map(show=>new Show(show)):null;
                onFulfilled&&onFulfilled(data);
            });
        });
    }
    catch(error){
        onRejected&&onRejected(error);
        onRouteError({error},()=>{useDetails({id,type},onFulfilled,onRejected)});
    };
}

const setIsInWatchList=({id,type},onFulfilled=()=>{})=>{
    if(store.sessiontoken){
        fetch(`https://api.themoviedb.org/3/${type}/${id}/account_states?api_key=${apikey}&session_id=${store.sessiontoken}`).
        then(response=>response.json()).
        then(({watchlist})=>{
            onFulfilled&&onFulfilled(watchlist);
        });
    }
    else if(store.isguest){
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