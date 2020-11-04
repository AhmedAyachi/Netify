import App from "./src/App";


export const map=(array=[],treatment)=>{
    let str="";
    const maped=[...array];
    for(let i=0;i<maped.length;i++){
       str+=treatment(maped[i],i,array); 
    }
    return str;
}

export const useCode=(length=10)=>{
    let str="",charindex;
    for(let i=0;i<length;i++){
        switch(Math.floor(Math.random()*3)){
            case 0:
                charindex=65+Math.floor(Math.random()*26);
                break;
            case 1:
                charindex=97+Math.floor(Math.random()*26);
                break;
            case 2:
                charindex=48+Math.floor(Math.random()*9);
                break;
        }
        str+=String.fromCharCode(charindex);
    }
    return str;
}

export const useRef=(startwith="")=>{
    let str=startwith+"_",charindex;
    for(let i=0;i<20;i++){
        switch(Math.floor(Math.random()*2)){
            case 0:
                charindex=65+Math.floor(Math.random()*26);
                break;
            case 1:
                charindex=97+Math.floor(Math.random()*26);
                break;
        }
        str+=String.fromCharCode(charindex);
    }
    return str;
}

export const useStore=(initializer={})=>{
    window.store=new function Store(){
        Object.keys(initializer).forEach(key=>{
            this[key]=initializer[key];
        })
        this.get=()=>{
            console.log("store");
        };
        return this;
    };
}

export const Router=(routes=[{component:"",path:""}])=>{
    const app=document.getElementById("app");
    let data=null;
    pushRoute();
    window.onhashchange=()=>{
        const hash=window.location.hash;
        try{
            pushRoute(hash);
        }
        catch(error){
            console.log(error);
        }
    }
    window.history.push=(hash="",state={})=>{
        data=state;
        window.location.hash=hash;
    }
    
    function pushRoute(path=""){
        const route=routes.find(route=>route.path===path);
        app.innerHTML="";
        if(route.component){
            route.component({
                parent:app,
                state:data,
            });
        }
        data=null;
    }
}