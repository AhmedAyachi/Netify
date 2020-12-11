
const searchvalues=JSON.parse(localStorage.getItem("searchvalues"));
if(!searchvalues){
    localStorage.setItem("searchvalues","null");
}

const ShowReducer={
    searched:[],
    searchvalues:searchvalues||[],
    searchvalue:null,
    shows:[],
    filter:null,
    collection:1,
}
export default ShowReducer;
