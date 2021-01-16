import {apikey,Show} from "estate";
import {WarnAlert} from "components";
import {shuffle} from "afile";
import data from "./Genres.json";


export async function useShowsByGenres(onFulfilled=()=>{}){
    const {genres}=data,{length}=genres,discover={genres};
    let i=0;
    try{
        useDayTrending(trends=>{
            discover.trends=trends;
            !function setGenreShows(){
                const genre=genres[i];
                useShowsByGenre(genre.id,(shows)=>{
                    genre.shows=shows;
                    if(i>=length-1){
                        store.show.discover=discover;
                        onFulfilled(discover);
                    }
                    else{
                        i++;
                        setGenreShows();
                    }
                });
            }();
        });
    }
    catch(error){
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useShowsByGenre(id,onFulfilled)},
        });
    };
}

export const useDayTrending=(onFulfilled=()=>{})=>{
    Promise.all(["tv","movie"].map(type=>fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${apikey}&language=en-US`))).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const tvs=(await promises[0]).results||[],movies=(await promises[1]).results||[];
        const shows=[...tvs,...movies].filter(show=>show.vote_average>=8.25).map(show=>new Show(show)).slice(0,10);
        onFulfilled(shows);
    });
}

const useShowsByGenre=(id,onFulfilled=()=>{})=>{
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
        onFulfilled&&onFulfilled(shows);
    });
};