import{apikey,Show} from "estate";
import {WarnAlert} from "components";


export const useTitle=(title="",then)=>{
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
        if(then){
            then(shows);
        }
    }).
    catch(error=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useTitle(title,then)},
        });
    });
}