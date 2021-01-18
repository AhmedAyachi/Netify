export const specialchars="+=}°)]@ç^_\\`-|(['{\"#~&²£$¤*µ%ù§!/:.;?,<>";

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

export const wave=(element,duration=2)=>{
    const {style}=element;
    style.animation=`wave ${duration}s linear 1 none`;
    setTimeout(()=>{style.animation=""},duration*1000+10);
    /*
    @keyframes wave{
        from {background-color:#57abff};
        to {background-color:transparent};
    }
*/}

export const randomColor=(colors)=>colors?colors[Math.floor(Math.random()*colors.length)]:`rgb(
    ${Math.floor(Math.random()*255)},
    ${Math.floor(Math.random()*255)},
    ${Math.floor(Math.random()*255)}
)`;

export const replaceAt=(index=0,replaceValue="",targetString="")=>targetString.substr(0,index-1)+replaceValue+targetString.substr(index+1,targetString.length);

export const capitalize=(str)=>str?replaceAt(0,str[0].toUpperCase(),str.toLowerCase()):"";

export const checkFullName=(str)=>{
    return Boolean(
        str!=="" &&
        str.length>6 &&
        str.includes(" ") &&
        str.indexOf(" ")===str.lastIndexOf(" ") &&
        str.match(/^[a-zA-Z\\ ]+$/)
    )
}

export const emailCheck=(str)=>{
    str=str.trim();
    const p_number=str.split(".").length-1;
    const p_lastindex= str.lastIndexOf("."),at_index=str.indexOf("@");
    return Boolean(
        str!=="" &&
        p_lastindex>at_index &&
        0<p_number&&p_number<4 &&
        str.length-p_lastindex>2 &&
        str.match(/^[a-z0-9@.]+$/) &&
        (str.match(/@/g)||[]).length===1&&at_index>5 &&
        str.slice(at_index+1,at_index+5).match(/^[a-z]+$/)
    )
}

export const passwordCheck=(str)=>{
    return Boolean(
        str!=="" &&
        str.length>7 &&
        str.match(/[a-z]/) &&
        str.match(/[A-Z]/) &&
        str.match(/[\d]/)
    )
}

export const phoneNumberCheck=(country,number)=>{
    country=country.toLowerCase().trim();
    number=number.trim();
    if(number!==""&&Number(number)){
        switch(country){
            case "tunisia":return number.length===8; 
            default:return false;
        }
    }
    else{return false}
}

export const usernameCheck=(str)=>{
    return Boolean(
        str!=="" &&
        str.length>6 &&
        str.match(/^[a-zA-Z0-9_]+$/) &&
        str.slice(0,5).match(/^[a-zA-Z]+$/)
    );
}

export function validKeyCode(keycode,codes){
    const letters=codes.includes("letters")&&(64<keycode&&keycode<91);
    const numbers=codes.includes("numbers")&&(95<keycode&&keycode<106);
    const arrows=codes.includes("arrows")&&(36<keycode&&keycode<41);
    return letters||numbers||arrows||codes.includes(keycode);
}

export const useDispatchAll=(dispatch)=>(actions)=>actions.forEach((action)=>{dispatch(action)});

export const getMax=(array=[],start=0,end=array.length)=>{
    let maxv=array[start];
    let maxi=start;
    start++;
    for(let i=start;i<end;i++){
        const max=Math.max(maxv,array[i]);
        if(maxv!==max){
            maxv=max;
            maxi=i;
        }
    }
    return {value:maxv,index:maxi};
}

export const order=(array=[],target)=>{
    const maped=array.map(target);
    const ordered=[...array];
    const length=maped.length;
    for(let i=0;i<length;i++){
        const m=max(maped,i,length);
        const saverm=maped[i];const savero=ordered[i];
        maped[i]=m.value;ordered[i]=ordered[m.index];
        maped[m.index]=saverm;ordered[m.index]=savero;
    }
    return ordered;
}

export const remove=(trueValue,array=[])=>array.filter((item,index)=>!trueValue(item,index));

export const replaceAll=(target="",searchValue="",replaceValue="")=>{
    let str="";
    for(let i=0;i<target.length;i++){
        const char=target[i];
        str+=char===searchValue?replaceValue:char;
    }
    return str;
}

export const factorial=(n=0)=>n?n*factorial(n-1):1;

export const getInBetween=(startChar="",endChar="",from="")=>{
    const length=from.length;
    let i=0,startIndex=-1,endIndex=0;
    while(startIndex<0&&i<length){
        if(from[i]===startChar){
            startIndex=i;
        }
        i++;
    }
    while(!endIndex&&i<length){
        if(from[i]===endChar){
            endIndex=i;
        }
        i++;
    }
    return startIndex>-1?from.slice(startIndex+1,endIndex||length):"";
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

export const encrypt=(str="",base=23)=>{
    const reversed=reverse(str.trim());
    let length=reversed.length;
    const slicesnumber=length%base||base,slices=[];
    for(let i=0;i<slicesnumber;i++){
        slices.push(randomString(base)+reversed.slice(length*i/slicesnumber,length*(i+1)/slicesnumber));
    }
    let sliced=slices.join(""),encoded="";
    length=sliced.length;
    for(let i=0;i<length;i++){
        encoded+=String.fromCharCode(sliced.charCodeAt(i)+3);
    }
    const encrypted=encodeURIComponent(randomString(slicesnumber*base)+encoded);
    return encrypted;
}

export const decrypt=(code="",base=23)=>{
    let str=decodeURIComponent(code);
    let length=str.length;
    const slicesnumber=length%base||base,slices=[];
    str=str.slice(slicesnumber*base);
    length=str.length;
    let decoded="";
    for(let i=0;i<length;i++){
        decoded+=String.fromCharCode(str.charCodeAt(i)-3);
    }
    for(let i=0;i<slicesnumber;i++){
        slices.push(decoded.slice(length*i/slicesnumber,length*(i+1)/slicesnumber).slice(base));
    }
    return reverse(slices.join(""));
}
