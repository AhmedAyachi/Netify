

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
    let str=startwith,charindex;
    for(let i=0;i<10;i++){
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