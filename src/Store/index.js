import {ShowReducer,FileReducer} from "./Reducers";

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
    file:FileReducer,
    loading:false,
    elements:{},
    usertoken,
    isguest:JSON.parse(isguest),
}

export default Reducer;
