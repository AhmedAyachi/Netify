import {ShowReducer} from "./Reducers";


const Reducer={
    show:ShowReducer,
    loading:false,
    elements:{},
    signedin:false,
    skiped:false,
}

export default Reducer;

export const setLoading=(value=true)=>{
    store.loading=value;
}
