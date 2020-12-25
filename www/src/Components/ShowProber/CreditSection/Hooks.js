import {apikey} from "estate";
import {FetchAlert} from "components";


export const useCredits=({id,type},then=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apikey}`).
    then(response=>response.json()).
    then(then).
    catch((error)=>{
        FetchAlert({
            parent:app,
            message:error.message,
            onConfirm:()=>{useCredits({id,type},then)},
        });
    });
}