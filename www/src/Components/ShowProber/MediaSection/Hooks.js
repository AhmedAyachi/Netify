import {useRef} from "vanilla";
import {apikey} from "estate";
import {WarnAlert} from "components";


export const useImages=({id,type},onFulfilled=()=>{})=>{
    fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apikey}&language=en`).
    then(response=>response.json()).
    then(data=>{
        const images=[];
        ["poster","backdrop"].forEach(type=>{
            const items=data[`${type}s`];
            if(items&&items.length&&items.forEach){
                const {datasaver}=store.prefs;
                items.forEach(item=>{
                    item.type=type;
                    item.path=`https://image.tmdb.org/t/p/w${datasaver?"533_and_h300_bestv2":"1920_and_h800_multi_faces"}/${item.file_path}`;
                    item.key=useRef(item.file_path.replace(/\//g,"").subsring(4));
                });
                images.push(...items);
            };
        });
        onFulfilled(images);
    }).
    catch((error)=>{
        WarnAlert({
            parent:app,
            message:error.message,
            onProceed:()=>{useImages({id,type},then)},
        });
    });
}
