import {apikey} from "estate";
import {FetchAlert} from "components";


export const useDetails=({id,type},then=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apikey}`).
    then(response=>response.json()).
    then(then).
    catch((error)=>{
        FetchAlert({
            parent:app,
            message:error.message,
            onConfirm:()=>{useDetails({id,type},then)},
        });
    });
}