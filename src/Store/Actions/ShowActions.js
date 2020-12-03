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
    value=value.trim();
    const showState=store.show;
    if(!showState.searchvalues.includes(value)){
        showState.searchvalues.unshift(value);
    }
    if(!showState.search.includes(value)){
        showState.search.unshift(value);
    }
}

export const deleteSearchValue=(value)=>{
    value=value.trim();
    const showState=store.show;
    const index=showState.searchvalues.indexOf(value);
    showState.searchvalues.splice(index,1);
}

export const loadShows=(collection=1,then)=>{
    setLoading(true);
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
        const shows=data.map(show=>new Show(show));
        setShows(shows);
        setLoading(false);
        if(then){
            then(shows);
        }
    }).
    catch(error=>console.error(error));
};

export const loadShowsByTitle=(title="",then)=>{
    setLoading(true);
    title=title.trim().replace(/" "/g,"+");
    const fetchs=["movie","tv"].map(type=>fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${apikey}&query=${title}`))
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
        const shows=data.map(show=>new Show(show));
        setLoading(false);
        if(then){
            then(shows);
        }
    });
}