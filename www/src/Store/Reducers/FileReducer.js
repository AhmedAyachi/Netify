import {File} from "estate";

const FileReducer={
    watchlist:null,
    search:null,
}
export default FileReducer;

setTimeout(()=>{
    setWatchList();
    setSearch();
},1000);

function setWatchList(){
    const store=window.store;
    if(store&&store.isguest){
        const cordova=window.cordova;
        if(cordova&&cordova.file&&cordova.platformId!=="browser"){
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
    const store=window.store;
    if(store&&store.isguest){
        const cordova=window.cordova;
        if(cordova&&cordova.platformId!=="browser"&&cordova.file){
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
                store.show.searchvalues=JSON.parse(searchvalues);
            }
            else{
                console.log("setItemsearchvalues");
                localStorage.setItem("searchvalues","");
                store.show.searchvalues=[];
            }
        }
    }
}