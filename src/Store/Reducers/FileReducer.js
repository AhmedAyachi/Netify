import {File} from "estate";

const FileReducer={
    watchlist:null,
    search:null,
}
export default FileReducer;

setTimeout(setWatchList,1000);

function setWatchList(){
    if(window.store.isguest){
        if(cordova.platformId!=="browser"&&cordova.file){
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

function setSearch(){
    if(store.isguest){
        if(cordova.platformId!=="browser"&&cordova.file){
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
                store.show.watchlist=JSON.parse(searchvalues);
            }
            else{
                localStorage.setItem("searchvalues","null");
                store.show.searchvalues=[];
            }
        }
    }
}