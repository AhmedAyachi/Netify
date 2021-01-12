import {apikey,Show} from "estate";
import {WarnAlert} from "components";
import {shuffle} from "afile";


export const useShowsByGenre=(id,then=()=>{})=>{
    const fetchs=["movie","tv"].map(type=>id?
        fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${apikey}&language=en&with_genres=${id}&without_genres=16&&vote_average.gte=6`):
        fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${apikey}&without_genres=16&language=en`)
    );
    Promise.all(fetchs).
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