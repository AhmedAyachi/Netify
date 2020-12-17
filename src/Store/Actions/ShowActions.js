import {Show,apikey} from "estate";
import {setLoading} from "./index";
import {shuffle} from "afile";

export const setShowStore=(key,value)=>{
    store.show[key]=value;
}

export const setShows=(shows=[])=>{
    store.show.shows=shows;
}

export const setWatchlist=(list=[])=>{
    const showStore=store.show;
    showStore.watchlist=list;
    localStorage.setItem("watchlist",JSON.stringify(showStore.watchlist));
}

export const addToWatchlist=(show)=>{
    const showStore=store.show;
    showStore.watchlist.unshift(show);
    
    store.files.watchlist.write(JSON.stringify(showStore.watchlist),()=>{
        alert("show added to watchlist");
    },()=>{
        alert("show not added to watchlist");
    });
}

export const setSearchedShows=(shows=[])=>{
    store.show.searched=shows;
}

export const setSearchValues=(values=[])=>{
    store.show.searchvalues=values;
}

export const setSearchValue=(value=null)=>{
    const showStore=store.show;
    if(showStore.searchvalue!==value){
        showStore.searchvalue=value;
    }
}

export const addSearchValue=(value)=>{
    value=value.trim();
    const showStore=store.show;
    if(!showStore.searchvalues.includes(value)){
        showStore.searchvalues.unshift(value);
        localStorage.setItem("searchvalues",JSON.stringify(showStore.searchvalues));
    }
}

export const deleteSearchValue=(value)=>{
    value=value.trim();
    const showStore=store.show;
    const index=showStore.searchvalues.indexOf(value);
    showStore.searchvalues.splice(index,1);
    localStorage.setItem("searchvalues",JSON.stringify(showStore.searchvalues));
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
        const shows=shuffle(data.map(show=>new Show(show)));
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