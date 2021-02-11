
export const fadeIn=(element,display="block",time=0.2)=>{
    if(element!==null){
        const style=element.style;
        style.display=display;
        style.animation=`fadeIn ${time}s 1 linear forwards`;
        style.opacity="1";
    }/*
    @keyframes fadeIn{
        from {opacity:0}
        to {opacity:1}
    }
*/}

export const fadeOut=(element,time=0.2)=>{
    if(element!==null){
        const style=element.style;
        style.opacity="0";
        style.animation=`fadeOut ${time}s 1 linear forwards`;
        setTimeout(()=>{
            style.display="none";
            style.animation="";
        },time*1000);
    }/*
    @keyframes fadeOut{
        from {opacity:1}
        to {opacity:0}
    }
*/}

export const toggle=(element,display="block",time=0.2)=>{
    if(element.style.display==="none"){fadeIn(element,display,time)}
    else{fadeOut(element,time)}
}

export const shake=(element,duration=0.25)=>{
    const {style}=element;
    style.animation=`shake ${duration}s linear 1 none`;
    setTimeout(()=>{style.animation=""},duration*1000+10);
    /*
    @keyframes shake{
        0%{transform:rotate(0deg);}
        25%{transform:rotate(10deg);}
        50%{transform:rotate(-10deg);}
        75%{transform:rotate(10deg);}
        100%{transform:rotate(0deg);}
    }
    */
}

export const randomColor=(colors)=>colors?colors[Math.floor(Math.random()*colors.length)]:`rgb(
    ${Math.floor(Math.random()*255)},
    ${Math.floor(Math.random()*255)},
    ${Math.floor(Math.random()*255)}
)`;

export const replaceAt=(index=0,replaceValue="",targetString="")=>targetString.substr(0,index-1)+replaceValue+targetString.substr(index+1,targetString.length);

export const capitalize=(str="")=>str?replaceAt(0,str[0].toUpperCase(),str.toLowerCase()):"";

export const specialchars="+=}°)]@ç^_\\`-|(['{\"#~&²£$¤*µ%ù§!/:.;?,<>";

export const clean=(str="")=>{
    const {length}=str;
    let cleaned="";
    for(let i=0;i<length;i++){
        const char=str[i];
        cleaned+=specialchars.includes(char)?"":char;
    }
    return cleaned;
}

export const shuffle=(array=[])=>array.sort(()=>Math.random()-0.5);

export const reverse=(str="")=>{
    let reversed="";
    for(let i=str.length-1;i>-1;i--){
        reversed+=str[i];
    }
    return reversed;
}

export function randomString(length){
    let str="";
    let charindex;
    for(let i=0;i<length;i++){
        switch(Math.floor(Math.random()*3)){
            case 0:
                charindex=65+Math.floor(Math.random()*26);
                break;
            case 1:
                charindex=97+Math.floor(Math.random()*26);
                break;
            default:
                charindex=48+Math.floor(Math.random()*9);
                break;
        }
        str+=String.fromCharCode(charindex);
    }
    return str;
}
