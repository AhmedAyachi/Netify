import {apikey} from "estate";


export const useDetails=({id,type},then)=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apikey}`).
    then(response=>response.json()).
    then(data=>{
        then(data);
    });
}

export const useCredits=({id,type},then)=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apikey}`).
    then(response=>response.json()).
    then(data=>{
        then(data);
    });
}