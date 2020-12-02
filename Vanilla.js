

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

export const useStore=(Reducer={})=>{
    const store=window.store=new function Store(){
        Object.assign(this,Reducer);
        this.get=()=>{
            console.log("store");
        };
        return this;
    };
    return store;
}

export const Router=(target,routes=[{component:"",path:""}])=>{
    const history=window.history;
    let data=null;
    window.location.hash="";
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
    history.pushState=(hash="",state={})=>{
        if(hash.includes(".#")){
            hash=hash.replace(".#",`${window.location.hash}#`);
        }
        data={
            state,
            location:{
                hash,
                url:`${window.location.origin}/${hash}`,
            },
        };
        window.location.hash=hash;
    }
    
    function pushRoute(path=""){
        const route=routes.find(route=>route.path===path);
        target.innerHTML="";
        if(route.component){
            route.component({parent:target,...data});
        }
        data=null;
    }
}