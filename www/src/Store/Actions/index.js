
export {setSearchValue} from "./ShowActions";


export const setSessionToken=(value="")=>{
    store.usertoken=value;
    localStorage.setItem("usertoken",value);
}
export const setIsguest=(value=true)=>{
    store.isguest=value;
    localStorage.setItem("isguest",Boolean(value));
}

export const setDataSaver=(value=true)=>{
    localStorage.setItem("prefs",JSON.stringify(store.prefs));
    store.show.discover=null;
    store.prefs.datasaver=value;
}

export const setHQDownload=(value=true)=>{
    localStorage.setItem("prefs",JSON.stringify(store.prefs));
    store.prefs.highqualitydownload=value;
}
