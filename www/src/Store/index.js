import {ShowReducer} from "./Reducers";
import {User} from "estate";

//localStorage.clear();
const Reducer={
    sessiontoken:"",
    isguest:false,
    show:ShowReducer,
    elements:{},
    user:new User({name:"Ahmed Ayachi"}),
    prefs:{
        datasaver:false,
        mobilenetworksaver:false,
        highqualitydownload:true,
    },
}

try{
    const sessiontoken=JSON.parse(localStorage.getItem("sessiontoken"));
    if(sessiontoken&&typeof(sessiontoken)==="string"){
        Reducer.sessiontoken=sessiontoken;
    }
    else{
        localStorage.setItem("sessiontoken","");
    }
}
catch{
    localStorage.setItem("sessiontoken","");
}

try{
    const isguest=JSON.parse(localStorage.getItem("isguest"));
    if(typeof(isguest)==="boolean"){
        Reducer.isguest=isguest;
    }
    else{
        localStorage.setItem("isguest","false");
    }
}
catch{
    localStorage.setItem("isguest","false"); 
}


try{
    const prefs=JSON.parse(localStorage.getItem("prefs"));
    if(prefs&&(typeof(prefs)==="object")){
        const connectiontype=navigator.connection.type;
        Reducer.prefs.datasaver=connectiontype.trim().endsWith("g")?(prefs.mobilenetworksaver||prefs.datasaver):prefs.datasaver;
        Reducer.prefs.mobilenetworksaver=prefs.mobilenetworksaver;
        Reducer.prefs.highqualitydownload=prefs.highqualitydownload;
    }
    else{
        localStorage.setItem("prefs",JSON.stringify(Reducer.prefs));
    }
}
catch{
    localStorage.setItem("prefs",JSON.stringify(Reducer.prefs));
}

export default Reducer;
