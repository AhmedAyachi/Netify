import {File} from "estate";

const FilesReducer={
    watchlist:null,
}
export default FilesReducer;


setTimeout(setWatchList,1000);

function setWatchList(){
    if(cordova.file){
        const file=new File({name:"watchlist.json"},()=>{
            store.files.watchlist=file;
        });
        file.onRead(content=>{
            store.show.watchlist=content?JSON.parse(content):[];
        });
    }
};