import {ShowReducer} from "./Reducers";

//localStorage.clear();
const usertoken=localStorage.getItem("usertoken");
if(!usertoken){
    localStorage.setItem("usertoken","");
}
const isguest=localStorage.getItem("isguest");
if(!isguest){
    localStorage.setItem("isguest",null);
}

const Reducer={
    show:ShowReducer,
    loading:false,
    elements:{},
    usertoken,
    isguest:JSON.parse(isguest),
    number:0,
}

export default Reducer;
