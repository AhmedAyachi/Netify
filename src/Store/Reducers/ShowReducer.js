
const searchvalues=JSON.parse(localStorage.getItem("searchvalues"));
if(!searchvalues){
    localStorage.setItem("searchvalues","null");
}

const ShowReducer={
    searched:[],
    searchvalues:searchvalues||[],
    shows:[],
    collection:1,
}
export default ShowReducer;
