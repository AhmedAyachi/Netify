import {setLoading} from "actions";
import {apikey} from "estate";


export const useTrailer=({id,type},then)=>{
    setLoading();
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apikey}&language=en-US`).
    then(response=>response.json()).
    then(data=>data.results).
    then(videos=>{
        setLoading(false);
        const video=videos.find(video=>video.type==="Trailer");
        console.log(videos);
        then(video);
    });
}