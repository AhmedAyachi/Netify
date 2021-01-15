import {Show,File,apikey} from "estate";
import {WarnAlert} from "components";


export const addToWatchlist=(show,onFulfilled=()=>{},onRejected=()=>{})=>{
    try{
        if(store.isguest){
            if(cordova.platformId!=="browser"){
                const file=new File({name:"watchlist.json"});
                file.onRead(content=>{
                    const watchlist=content?JSON.parse(content):[];
                    if(Array.isArray(watchlist)){
                        const {id,type,title,backdrop_path,poster_path,vote_average}=show;
                        watchlist.push({id,type,title,backdrop_path,poster_path,vote_average});
                        file.write(JSON.stringify(watchlist),onFulfilled);
                    }
                });
            }
            else{
                const content=JSON.parse(localStorage.getItem("watchlist"));
                const watchlist=Array.isArray(content)?content:[];
                const {id,type,title,backdrop_path,poster_path,vote_average}=show;
                watchlist.push({id,type,title,backdrop_path,poster_path,vote_average});
                localStorage.setItem("watchlist",JSON.stringify(watchlist));
                onFulfilled();
            }
        }
        else if(store.sessiontoken){
            
        }
    }
    catch(error){
        onRejected(error);
    }
}

export const removeFromWatchList=(show)=>{
    const showStore=store.show;
    let index=null;
    const exists=Boolean(showStore.watchlist.find((wlshow,i)=>{
        if(wlshow.id===show.id){
            index=i;
            return true;
        }
        else{
            return false;
        }
    }));
    if(exists){
        showStore.watchlist.splice(index,1);
        saveWatchlist();
    }
}

export const setSearchValue=(value=null)=>{
    const showStore=store.show;
    if(showStore.searchvalue!==value){
        showStore.searchvalue=value;
    }
}