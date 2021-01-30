import {ShowReducer} from "./Reducers";
import {User} from "estate";

//localStorage.clear();
const sessiontoken=localStorage.getItem("sessiontoken");
if(!sessiontoken){
    localStorage.setItem("sessiontoken","");
}
const isguest=localStorage.getItem("isguest");
if(!isguest){
    localStorage.setItem("isguest","false");
}

const Reducer={
    sessiontoken,
    isguest:JSON.parse(isguest),
    show:ShowReducer,
    elements:{},
    user:new User({name:"Ahmed Ayachi"}),
    prefs:{
        datasaver:false,
        highqualitydownload:true,
    },
}

export default Reducer;
