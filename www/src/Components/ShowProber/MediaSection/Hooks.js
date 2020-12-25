import {setLoading} from "actions";
import {apikey} from "estate";
import {FetchAlert} from "components";


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
    catch((error)=>{
        FetchAlert({
            parent:app,
            message:error.message,
            onConfirm:()=>{useImages({id,type},then)},
        });
    });
}

//w533_and_h300_bestv2