import {apikey,Show,onRouteError} from "estate";


export async function useShowsByGenres(genres,onFulfilled,onRejected){
    const {length}=genres,discover={genres};
    let i=0;
    try{
        useDayTrending(trends=>{
            discover.trends=trends;
            !function setGenreShows(){
                const genre=genres[i];
                useShowsByGenre({id:genre.id},(shows)=>{
                    genre.shows=shows;
                    if(i>=(length-1)){
                        store.show.discover=discover;
                        onFulfilled&&onFulfilled(discover);
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
        onRejected&&onRejected(error);
        onRouteError({error},()=>{useShowsByGenres(genres,onFulfilled,onRejected)});
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

export const useShowsByGenre=({id,page=1},onFulfilled=()=>{})=>{
    const fetchs=["movie","tv"].map(type=>id!=="p"?
        fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${apikey}&page=${page}&language=en&with_genres=${id}&without_genres=16&&vote_average.gte=6`):
        fetch(`https://api.themoviedb.org/3/${type}/popular?api_key=${apikey}&page=${page}&language=en&without_genres=16`)
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
        const shows=data.filter(show=>show.vote_count>50).map(show=>new Show(show));
        onFulfilled&&onFulfilled(shows);
    });
};