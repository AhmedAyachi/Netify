import {Show,apikey} from "estate";
import {WarnAlert} from "components";


export const loadDayTrending=(then=()=>{})=>{
    Promise.all(["tv","movie"].map(type=>fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${apikey}&language=en-US`))).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const tvs=(await promises[0]).results||[],movies=(await promises[1]).results||[];
        const shows=[...tvs,...movies].filter(show=>show.vote_average>=8.25).map(show=>new Show(show)).slice(0,10);
        then(shows);
    }).
    catch(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{loadDayTrending(then)},
        });
    })
}