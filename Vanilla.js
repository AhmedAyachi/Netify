
export const map=(array=[],treatment)=>{
    let str="";
    const maped=[...array];
    for(let i=0;i<maped.length;i++){
       str+=treatment(maped[i],i,array); 
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
        let strReducer=null;
        if(Reducer&&typeof(Reducer)==="object"){
            Object.assign(this,Reducer);
            strReducer=JSON.stringify(Reducer);
        }
        else{
            strReducer="{}";
        }
        Object.assign(this,{
            reset:()=>{
                Object.assign(this,JSON.parse(strReducer));
            },
            store:this,
        });
    };
    return store;
}