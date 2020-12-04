import {ShowReducer} from "./Reducers";


const Reducer={
    show:ShowReducer,
    loading:false,
    elements:{},
}

export default Reducer;

export const setLoading=(value=true)=>{
    store.loading=value;
}
