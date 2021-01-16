import {apikey} from "estate";


export async function useSocial({id,type},onFulfilled=()=>{}){
    try{
        const response=await fetch(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${apikey}&language=en-US&page=1`);
        const data=await response.json();
        onFulfilled(data.results);
    }
    catch(error){
        console.log(error.message);
    }
}