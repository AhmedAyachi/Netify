import {Show,apikey} from "estate";
import {setLoading} from "./index";
import {FetchAlert,WarnAlert} from "components";
import {shuffle} from "afile";


export const setShowStore=(key,value)=>{
    store.show[key]=value;
}

export const setShows=(shows=[])=>{
    store.show.shows=shows;
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
    catch(()=>{
        setLoading(false);
        FetchAlert({
            parent:app,
            onConfirm:()=>{loadShows(collection,then)},
        });
    });
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
    }).
    catch(()=>{
        setLoading(false);
        FetchAlert({
            parent:app,
            onConfirm:()=>{loadShowsByTitle(title,then)},
        });
    });
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