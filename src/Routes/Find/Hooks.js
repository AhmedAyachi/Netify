import{apikey,Show,onRouteError} from "estate";


export const useTitle=(title="",onFulfilled)=>{
    title=title.trim().replace(/" "/g,"+");
    const fetchs=["movie","tv"].map(type=>fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${apikey}&query=${title}`));
    Promise.all(fetchs).
    then(responses=>responses.map(response=>response.json())).
    then(async function(promises){
        const shows=[];
        for(let i=0;i<promises.length;i++){
            const data=await promises[i];
            shows.push(...data.results);
        }
        return shows;
    }).
    then(data=>{
        const shows=data.filter(show=>show.vote_count>50).map(show=>new Show(show));
        onFulfilled&&onFulfilled(shows);
    }).
    catch(error=>{
        onRouteError({error},()=>{useTitle(title,onFulfilled)});
    });
}