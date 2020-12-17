import {ShowReducer,FileReducer} from "./Reducers";

//localStorage.clear();
const sessiontoken=localStorage.getItem("sessiontoken");
if(!sessiontoken){
    localStorage.setItem("sessiontoken","");
}
const isguest=localStorage.getItem("isguest");
if(!isguest){
    localStorage.setItem("isguest","");
}

const Reducer={
    show:ShowReducer,
    file:FileReducer,
    loading:false,
    elements:{},
    sessiontoken,
    isguest:JSON.parse(isguest),
}

export default Reducer;
