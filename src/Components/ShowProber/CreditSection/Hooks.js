import {apikey} from "estate";
import {WarnAlert} from "components";


export const useCredits=({id,type},then=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apikey}`).
    then(response=>response.json()).
    then(then).
    catch((error)=>{
        WarnAlert({
            parent:app,
            message:error.message,
            onProceed:()=>{useCredits({id,type},then)},
        });
    });
}