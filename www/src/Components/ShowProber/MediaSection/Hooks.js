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
    then(data=>{
        const images=[];
        ["poster","backdrop"].forEach(type=>{
            const items=data[`${type}s`];
            if(items&&items.length&&items.forEach){
                items.forEach(item=>{
                    item.type=type;
                    item.path=`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${item.file_path}`;
                    item.key=item.file_path.replace(/\//g,"");
                });
                images.push(...items);
            };
        });
        setLoading(false);
        then(images);
    }).
    catch(error=>{alert(error)});
}

//w533_and_h300_bestv2