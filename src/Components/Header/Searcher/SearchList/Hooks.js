import {File} from "estate";
import {WarnAlert} from "components";


export function useSearch(onFulfilled=()=>{}){
    const cordova=window.cordova;
    try{
        if(cordova&&cordova.platformId!=="browser"&&cordova.file){
            const file=new File({name:"search.json"});
            file.onRead(content=>{
                const history=content?JSON.parse(content):[];
                onFulfilled(history);
            });
        }
        else{
            const search=localStorage.getItem("search");
            const history=search?JSON.parse(search):[];
            onFulfilled(history);
        }
    }
    catch{(error)=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useSearch(title,then)},
        });
    }};
}

export function saveSearch(search=""){
    try{
        if(cordova&&cordova.platformId!=="browser"&&cordova.file){
            const file=new File({name:"search.json"});
            file.write(JSON.stringify(search));
        }
        else{
            localStorage.setItem("search",JSON.stringify(search));
        }
    }
    catch{(error)=>{
        WarnAlert({
            message:error.message,
            proceed:"Try again",
            onProceed:()=>{useSearch(title,then)},
        });
    }};
}