import {Movie,apikey} from "estate";
import {setLoading} from "../index";

export const setMovieState=(key,value)=>{
    store.movie[key]=value;
}

export const setMovies=(movies=[])=>{
    store.movie.movies=movies;
}

export const setTvShows=(tvshows=[])=>{
    store.movie.tvshows=tvshows;
}

export const setSearched=(movies=[])=>{
    store.movie.searched=movies;
}

export const setSearchValues=(values=[])=>{
    store.movie.searchvalues=values;
}

export const addSearchValue=(value)=>{
    if(!store.movie.searchvalues.includes(value)){
        store.movie.searchvalues.unshift(value);
    }
}

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

export const loadMoviesByTitle=(title="",then)=>{
    setLoading(true);
    title=title.trim().replace(/" "/g,"+");
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}`).
    then(response=>response.json()).
    then(data=>{
        const movies=data.results.map(movie=>new Movie(movie));
        setLoading(false);
        if(then){
            then(movies);
        }
    });
}

export const loadTvShows=(collection=1,then)=>{
    setLoading(true);
    const fetchs=[];
    const start=collection*2;
    const end=start-2;
    for(let i=start;i>end;i--){
        fetchs.push(fetch(`https://api.themoviedb.org/3/discover/tvshow?api_key=${apikey}&language=en&page=${i}`));
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