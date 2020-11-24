import {apikey} from "estate";


export const useDetails=(id,then)=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`).
    then(response=>response.json()).
    then(data=>{
        then(data);
    });
}

export const useCredits=(id,then)=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`).
    then(response=>response.json()).
    then(data=>{
        then(data);
    });
}