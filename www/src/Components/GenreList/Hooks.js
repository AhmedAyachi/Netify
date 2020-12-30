import {apikey,Show} from "estate";
import {WarnAlert} from "components";
import {shuffle} from "afile";


export const useShowsByGenre=(id,then=()=>{})=>{
    Promise.all(["movie","tv"].map(type=>
        fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${apikey}&language=en&with_genres=${id}&without_genres=16&&vote_average.gte=6`)
    )).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const shows=[];
        for(let i=0;i<2;i++){
            const data=(await promises[i]).results||[];
            shows.push(...data);
        }
        return shows;
    }).
    then(data=>{
        const shows=shuffle(data.map(show=>new Show(show)));
        then&&then(shows);
    }).
    catch(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useShowsByGenre(id,then)},
        });
    });
};

export const usePopular=(then)=>{
    Promise.all(["movie","tv"].map(type=>
        fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${apikey}&language=en`)
    )).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const shows=[];
        for(let i=0;i<2;i++){
            const data=(await promises[i]).results||[];
            shows.push(...data);
        }
        return shows;
    }).
    then(data=>{
        const shows=shuffle(data.map(show=>new Show(show)));
        then&&then(shows);
    }).
    catch(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useShowsByGenre(id,then)},
        });
    });   
}