import {apikey} from "estate";


export const useCreditsAndDetails=({id,type},then)=>{
    Promise.all([
        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apikey}`),
        fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apikey}`),
    ]).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const details= await promises[0];
        const credits= await promises[1];
        return {details,credits};
    }).
    then(data=>{
        then(data);
    }).
    catch(error=>alert(error));
}