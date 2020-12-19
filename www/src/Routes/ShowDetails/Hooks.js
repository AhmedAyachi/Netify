import {apikey} from "estate";


export const useDetails=({id,type},then=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apikey}`).
    then(response=>response.json()).
    then(then).
    catch(error=>{
        alert(error);
    });
}