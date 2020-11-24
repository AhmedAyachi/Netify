import {ShowReducer} from "./Reducers";


const Reducer={
    show:ShowReducer,
    loading:false,
}

export default Reducer;

export const setLoading=(value=true)=>{
    store.loading=value;
}
