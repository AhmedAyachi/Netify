import {Show,apikey} from "estate";
import {WarnAlert} from "components";


export const setShowStore=(key,value)=>{
    store.show[key]=value;
}

export const setShows=(value=[])=>{
    store.show.shows=value;
}

export const addShows=(shows=[])=>{
    const showStore=store.show;
    if(showStore.shows&&Array.isArray(shows)){
        showStore.shows.push(...shows);
    }
}

function saveWatchlist(){
    const showStore=store.show,fileStore=store.file;
    if(fileStore.watchlist){
        fileStore.watchlist.write(JSON.stringify(showStore.watchlist));
    }
    else{
        localStorage.setItem("watchlist",JSON.stringify(showStore.watchlist));
    }
}

export const setWatchlist=(list=[])=>{
    const showStore=store.show;
    showStore.watchlist=list;
    saveWatchlist();
}

export const addToWatchlist=(show)=>{
    const showStore=store.show;
    showStore.watchlist.unshift(show);
    saveWatchlist();
}

export const removeFromWatchList=(show)=>{
    const showStore=store.show;
    let index=null;
    const exists=Boolean(showStore.watchlist.find((wlshow,i)=>{
        if(wlshow.id===show.id){
            index=i;
            return true;
        }
        else{
            return false;
        }
    }));
    if(exists){
        showStore.watchlist.splice(index,1);
        saveWatchlist();
    }
}

export const setSearchedShows=(shows=[])=>{
    store.show.searched=shows;
}

function saveSearchedValues(){
    const showStore=store.show,fileStore=store.file;
    if(fileStore.search){
        fileStore.search.write(JSON.stringify(showStore.searchvalues));
    }
    else{
        localStorage.setItem("searchvalues",JSON.stringify(showStore.searchvalues));
    }
}

export const setSearchValues=(values=[])=>{
    const showStore=store.show;
    showStore.searchvalues=values;
    saveSearchedValues();
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
        saveSearchedValues();
    }
}

export const deleteSearchValue=(value)=>{
    value=value.trim();
    const showStore=store.show;
    const index=showStore.searchvalues.indexOf(value);
    showStore.searchvalues.splice(index,1);
    saveSearchedValues();
}





export const loadDayTrending=(then=()=>{})=>{
    Promise.all(["tv","movie"].map(type=>fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${apikey}&language=en-US`))).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const tvs=(await promises[0]).results||[],movies=(await promises[1]).results||[];
        const shows=[...tvs.map(tv=>new Show(tv)),...movies.map(movie=>new Show(movie))];
        store.show.trendings=shows;
        then(shows);
    }).
    catch(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{loadDayTrending(then)},
        });
    })
}