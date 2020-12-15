
export {
    setShows,loadShows,setSearchValues,addSearchValue,setSearchedShows,loadShowsByTitle,deleteSearchValue,setSearchValue,
    addToWatchlist,setWatchlist,
} from "./ShowActions";


export const setLoading=(value=true)=>{
    store.loading=value;
}
export const setUsertoken=(value="")=>{
    store.usertoken=value;
    localStorage.setItem("usertoken",value);
}
export const setIsguest=(value=true)=>{
    store.isguest=value;
    localStorage.setItem("isguest",Boolean(value));
}
