import {apikey} from "estate";


export const useCredits=({id,type},then=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apikey}`).
    then(response=>response.json()).
    then(then).
    catch(error=>{
        alert(error);
    });
}