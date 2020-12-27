import {Show,apikey} from "estate";
import {WarnAlert} from "components";


export const useRecommendation=({id,type},then)=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apikey}&language=en-US&page=1`).
    then(response=>response.json()).
    then(data=>{
        const shows=data.results.map(show=>new Show(show));
        if(then){
            then(shows);
        }
    }).
    catch(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{loadDayTrending(then)},
        });
    });
}