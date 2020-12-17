import {File} from "estate";

const FileReducer={
    watchlist:null,
}
export default FileReducer;

setTimeout(setWatchList,1000);

function setWatchList(){
    if(store.isguest){
        if(cordova.platformId!=="browser"){
            const file=new File({name:"watchlist.json"},()=>{
                store.file.watchlist=file;
            });
            file.onRead(content=>{
                store.show.watchlist=content?JSON.parse(content):[];
            });
        }
        else{
            const watchlist=localStorage.getItem("watchlist");
            if(watchlist){
                store.show.watchlist=JSON.parse(watchlist);
            }
            else{
                localStorage.setItem("watchlist","");
                store.show.watchlist=[];
            }
        }
    }
};