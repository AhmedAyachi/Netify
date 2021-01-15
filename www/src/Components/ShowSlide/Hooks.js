import {apikey,File} from "estate";
import {FetchAlert} from "components";


export const useVideos=({id,type},then=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apikey}&language=en-US`).
    then(response=>response.json()).
    then(data=>data.results).
    then(videos=>{
        then(videos);
    }).
    catch((error)=>{
        FetchAlert({
            parent:app,
            message:error.message,
            onConfirm:()=>{useVideos({id,type},then)},
        });
    });
}
export const addToWatchlist=(show,onFulfilled=()=>{},onRejected=()=>{})=>{
    try{
        if(store.isguest){
            if(cordova&&cordova.file&&cordova.platformId!=="browser"){
                const file=new File({name:"watchlist.json"});
                file.onRead(content=>{
                    const watchlist=content?JSON.parse(content):[];
                    if(Array.isArray(watchlist)&&!watchlist.find(({id,type})=>show.id===id&&show.type===type)){
                        const {id,type,title,backdrop_path,poster_path,vote_average}=show;
                        watchlist.unshift({id,type,title,backdrop_path,poster_path,vote_average});
                        file.write(JSON.stringify(watchlist),onFulfilled);
                    }
                });
            }
            else if(cordova.platformId==="browser"){
                const content=JSON.parse(localStorage.getItem("watchlist"));
                const watchlist=Array.isArray(content)?content:[];
                if(Array.isArray(watchlist)&&!watchlist.find(({id,type})=>show.id===id&&show.type===type)){
                    const {id,type,title,backdrop_path,poster_path,vote_average}=show;
                    watchlist.unshift({id,type,title,backdrop_path,poster_path,vote_average});
                    localStorage.setItem("watchlist",JSON.stringify(watchlist));
                    onFulfilled();
                }
            }
        }
        else if(store.sessiontoken){
            
        }
    }
    catch(error){
        alert(error.message);
        onRejected(error);
    }
}

export const removeFromWatchList=({id,type},onFulfilled=()=>{},onRejected=()=>{})=>{
    try{
        if(store.isguest){
            if(cordova&&cordova.file&&cordova.platformId!=="browser"){
                const file=new File({name:"watchlist.json"});
                file.onRead(content=>{
                    const watchlist=content?JSON.parse(content):[];
                    let index=-1;
                    watchlist.forEach((show,i)=>{
                        if(show.id===id&&show.type===type){
                            index=i;
                        }
                    });
                    if(Array.isArray(watchlist)&&(index>-1)){
                        watchlist.splice(index,1);
                        file.write(JSON.stringify(watchlist),onFulfilled);
                    }
                });
            }
            else if(cordova.platformId==="browser"){
                const content=JSON.parse(localStorage.getItem("watchlist"));
                const watchlist=Array.isArray(content)?content:[];
                let index=-1;
                watchlist.forEach((show,i)=>{
                    if(show.id===id&&show.type===type){
                        index=i;
                    }
                });
                if(Array.isArray(watchlist)&&(index>-1)){
                    watchlist.splice(index,1);
                    localStorage.setItem("watchlist",JSON.stringify(watchlist));
                    onFulfilled();
                }
            }
        }
        else if(store.sessiontoken){
            
        } 
    }
    catch(error){
        alert(error.message);
        onRejected(error);
    }
}
