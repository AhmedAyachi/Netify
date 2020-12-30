
export {
    setShows,addShows,setSearchValues,addSearchValue,setSearchedShows,deleteSearchValue,setSearchValue,
    setWatchlist,addToWatchlist,removeFromWatchList,
} from "./ShowActions";

export {loadWatchList} from "./FileActions";


export const setLoading=(value=true)=>{
    store.loading=Boolean(value);
}
export const setUsertoken=(value="")=>{
    store.usertoken=value;
    localStorage.setItem("usertoken",value);
}
export const setIsguest=(value=true)=>{
    store.isguest=value;
    localStorage.setItem("isguest",Boolean(value));
}
