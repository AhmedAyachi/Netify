
//localStorage.clear();
const searchvalues=localStorage.getItem("searchvalues");
if(!searchvalues){
    localStorage.setItem("searchvalues","null");
}

const watchlist=localStorage.getItem("watchlist");
if(!watchlist){
    localStorage.setItem("watchlist","null");
}

const ShowReducer={
    searched:[],
    searchvalues:JSON.parse(searchvalues)||[],
    searchvalue:null,
    shows:[],
    filter:null,
    collection:1,
    watchlist:JSON.parse(watchlist)||[],
}
export default ShowReducer;
