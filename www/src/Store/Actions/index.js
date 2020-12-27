
export {
    setShows,addShows,loadShows,setSearchValues,addSearchValue,setSearchedShows,loadShowsByTitle,deleteSearchValue,setSearchValue,
    setWatchlist,addToWatchlist,removeFromWatchList,loadDayTrending
} from "./ShowActions";

export {loadSearch,loadWatchList} from "./FileActions";


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
