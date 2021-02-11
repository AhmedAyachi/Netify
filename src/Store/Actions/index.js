

export {setSearchValue} from "./ShowActions";

export const setSessionToken=(value="")=>{
    store.sessiontoken=value;
    localStorage.setItem("sessiontoken",value);
}
export const setIsguest=(value=true)=>{
    store.isguest=value;
    localStorage.setItem("isguest",Boolean(value));
}

export const setDataSaver=(value=true)=>{
    store.prefs.datasaver=value;
    store.show.discover=null;
    localStorage.setItem("prefs",JSON.stringify(store.prefs));
}

export const setHQDownload=(value=true)=>{
    store.prefs.highqualitydownload=value;
    localStorage.setItem("prefs",JSON.stringify(store.prefs));
}

export const setMobileNetworkSaver=(value=true)=>{
    store.prefs.mobilenetworksaver=value;
    localStorage.setItem("prefs",JSON.stringify(store.prefs));
}
