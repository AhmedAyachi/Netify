import {setLoading} from "actions";
import {apikey} from "estate";


export const useVideos=({id,type},then=()=>{})=>{
    setLoading();
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apikey}&language=en-US`).
    then(response=>response.json()).
    then(data=>data.results).
    then(videos=>{
        setLoading(false);
        then(videos);
    }).
    catch(error=>{alert(error)});
}

export const useImages=({id,type},then=()=>{})=>{
    setLoading();
    fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apikey}&language=en`).
    then(response=>response.json()).
    then(images=>{
        setLoading(false);
        then(images);
    }).
    catch(error=>{alert(error)});
}