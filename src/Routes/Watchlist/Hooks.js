import {apikey,File,Show,useSendMessage}from "estate";
import {shuffle} from "afile";
import {WarnAlert} from "components";


export function useWatchList(onFulfilled,onRejected){
    try{
        if(store.sessiontoken){
            const {sessiontoken,user}=store;
            const fetchs=shuffle(["movies","tv"]).map(type=>fetch(`https://api.themoviedb.org/3/account/${user.id}/watchlist/${type}?api_key=${apikey}&session_id=${sessiontoken}&sort_by=created_at.desc`));
            Promise.all(fetchs).
            then(responses=>responses.map(response=>response.json())).
            then(async (promises)=>{
                const shows=[];
                for(let i=0;i<promises.length;i++){
                    const {results,total_pages}=await promises[i];
                    results&&shows.push(...results);
                }
                return shows;
            }).
            then(data=>{
                const shows=data.map(show=>new Show(show));
                onFulfilled&&onFulfilled(shows);
            });
        }
        else if(store.isguest){
            const {cordova}=window;
            if(cordova&&cordova.file&&cordova.platformId!=="browser"){
                const file=new File({name:"watchlist.json"});
                file.onRead(content=>{
                    const shows=content?JSON.parse(content):[];
                    onFulfilled&&onFulfilled(shows);
                });
            }
            else{
                const content=localStorage.getItem("watchlist");
                const shows=content?JSON.parse(content):[];
                onFulfilled&&onFulfilled(shows);
            }
        }
    }
    catch(error){
        onRejected&&onRejected(error);
        useSendMessage({key:"Error",text:error.message});
        WarnAlert({
            message:"Error occured",
            proceed:"Try again",
            onProceed:()=>{useWatchList(onFulfilled,onRejected)},
            onCancel:location.refresh,
        });
    };
};
