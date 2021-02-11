import {apikey,File} from "estate";
import {WarnAlert} from "components";


export const useVideos=({id,type},then=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apikey}&language=en-US`).
    then(response=>response.json()).
    then(data=>data.results).
    then(videos=>{
        then(videos);
    }).
    catch((error)=>{
        WarnAlert({
            message:error.message,
            onProceed:()=>{useVideos({id,type},then)},
        });
    });
}
export const addToWatchlist=(show,onFulfilled=()=>{},onRejected)=>{
    try{
        if(store.sessiontoken){
            const headers=new Headers();
            headers.append("Content-Type","application/json");
            const raw=JSON.stringify({media_id:show.id,media_type:show.type,watchlist:true});
            const options={
                method:"POST",
                headers:headers,
                body:raw,
                redirect:"follow",
            }
            fetch(`https://api.themoviedb.org/3/account/${store.user.id}/watchlist?api_key=${apikey}&session_id=${store.sessiontoken}`,options).
            then(response=>response.json()).
            then(({success})=>{
                success?onFulfilled():onRejected(data);
            });
        }
        else if(store.isguest){
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
    }
    catch(error){
        WarnAlert({
            message:error.message,
        });
        onRejected&&onRejected(error);
    }
}

export const removeFromWatchList=({id,type},onFulfilled=()=>{},onRejected=()=>{})=>{
    try{
        if(store.sessiontoken){
            const headers=new Headers();
            headers.append("Content-Type","application/json");
            const raw=JSON.stringify({media_id:id,media_type:type,watchlist:false});
            const options={
                method:"POST",
                headers:headers,
                body:raw,
                redirect:"follow",
            }
            fetch(`https://api.themoviedb.org/3/account/${store.user.id}/watchlist?api_key=${apikey}&session_id=${store.sessiontoken}`,options).
            then(response=>response.json()).
            then(data=>{
                data.success?onFulfilled():onRejected(data);
            });
        }
        else if(store.isguest){
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
    }
    catch(error){
        alert(error.message);
        onRejected(error);
    }
}
