

//localStorage.clear();
const searchvalues=localStorage.getItem("searchvalues");
if(!searchvalues){
    localStorage.setItem("searchvalues","null");
}
const ShowReducer={
    searched:[],
    searchvalues:JSON.parse(searchvalues)||[],
    searchvalue:null,
    shows:[],
    filter:null,
    collection:1,
    watchlist:[],
}
export default ShowReducer;
