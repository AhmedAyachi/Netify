import {File} from "estate";

const FileReducer={
    watchlist:null,
}
export default FileReducer;


setTimeout(setWatchList,1000);

function setWatchList(){
    if(cordova.file){
        const file=new File({name:"watchlist.json"},()=>{
            store.file.watchlist=file;
        });
        file.onRead(content=>{
            store.show.watchlist=content?JSON.parse(content):[];
        });
    }
};