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

export const replaceAt=(index=0,replaceValue="",targetString="")=>targetString.substr(0,index-1)+replaceValue+targetString.substr(index+1,targetString.length);

export const capitalize=(str)=>str?replaceAt(0,str[0].toUpperCase(),str.toLowerCase()):"";