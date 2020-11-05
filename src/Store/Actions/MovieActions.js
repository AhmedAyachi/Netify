import {Movie,apikey} from "estate";

export const setMovieState=(key,value)=>{
    store.movie[key]=value;
}

export const setMovies=(movies=null)=>{
    store.movie.movies=movies;
}

export const setLoaded=(movies=null)=>{
    store.movie.loaded=movies;
    //store.movie.collections.push(movies);
}

export const setLoading=(value)=>{
   store.movie.loading=value;
}

//export const getCollection=(index=0)=>store.movie.collections[index];

export const loadMovies=(collection=1,then)=>{
    setLoading(true);
    const fetchs=[];
    const start=collection*2;
    const end=start-2;
    for(let i=start;i>end;i--){
        fetchs.push(fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en&page=${i}`));
    }
    Promise.all(fetchs).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const movies=[];
        for(let i=0;i<2;i++){
            const data=await promises[i];
            movies.push(...data.results);
        }
        return movies.map(movie=>new Movie(movie));
    }).
    then(data=>{
        setMovies(data);
        setLoading(false);
        if(then){
            then(data);
        }
    }).
    catch(error=>console.error(error));
};