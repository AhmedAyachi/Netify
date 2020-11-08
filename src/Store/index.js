import {MovieReducer} from "./Reducers";


const Reducer={
    movie:MovieReducer,
    loading:false,
}

export default Reducer;

export const setLoading=(value=true)=>{
    store.loading=value;
}
