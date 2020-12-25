import {setLoading} from "actions";
import {apikey} from "estate";
import {FetchAlert} from "components";

export const useVideos=({id,type},then=()=>{})=>{
    setLoading();
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apikey}&language=en-US`).
    then(response=>response.json()).
    then(data=>data.results).
    then(videos=>{
        setLoading(false);
        then(videos);
    }).
    catch((error)=>{
        FetchAlert({
            parent:app,
            message:error.message,
            onConfirm:()=>{useVideos({id,type},then)},
        });
    });
}