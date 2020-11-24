import {Show,apikey} from "estate";
import {setLoading} from "../index";

export const setShowState=(key,value)=>{
    store.show[key]=value;
}

export const setShows=(shows=[])=>{
    store.show.shows=shows;
}

export const setSearched=(shows=[])=>{
    store.show.searched=shows;
}

export const setSearchValues=(values=[])=>{
    store.show.searchvalues=values;
}

export const addSearchValue=(value)=>{
    if(!store.show.searchvalues.includes(value)){
        store.show.searchvalues.unshift(value);
    }
}

export const loadShows=(collection=1,then)=>{
    setLoading(true);
    const fetchs=[];
    const start=collection*2;
    const end=start-2;
    for(let i=start;i>end;i--){
        fetchs.push(fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en&page=${i}`));
        fetchs.push(fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&language=en&page=${i}`));
    }
    Promise.all(fetchs).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const shows=[];
        for(let i=0;i<fetchs.length;i++){
            const data=await promises[i];
            shows.push(...data.results);
        }
        return shows.map(show=>new Show(show));
    }).
    then(data=>{
        setShows(data);
        setLoading(false);
        if(then){
            then(data);
        }
    }).
    catch(error=>console.error(error));
};

export const loadShowsByTitle=(title="",then)=>{
    setLoading(true);
    title=title.trim().replace(/" "/g,"+");
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}`).
    then(response=>response.json()).
    then(data=>{
        const shows=data.results.map(show=>new Show(show));
        setLoading(false);
        if(then){
            then(shows);
        }
    });
}