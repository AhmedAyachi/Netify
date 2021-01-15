import {apikey,Show} from "estate";
import {WarnAlert} from "components";
import {shuffle} from "afile";


export const useShows=(collection=1,then)=>{
    const fetchs=["movie","tv"].map(type=>fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${apikey}&language=en&page=${collection}`));
    Promise.all(fetchs).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const shows=[];
        for(let i=0;i<fetchs.length;i++){
            const data=await promises[i];
            shows.push(...data.results);
        }
        return shows;
    }).
    then(data=>{
        const shows=shuffle(data.map(show=>new Show(show)));
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
};