
export const Router=(target=new HTMLElement(),routes=[{component:()=>{},path:""}])=>{
    const {history}=window;
    let data=null;
    let route=null;
    try{
        setRoute(window.location.hash);
        window.addEventListener("hashchange",()=>{
            try{setRoute(window.location.hash)}
            catch(error){onRouteError(error)};
        });
        route=null;
    }
    catch(error){onRouteError(error)};

    history.replace=(hash="",state={})=>{
        if(hash&&!hash.startsWith("#")){
            hash="#"+hash;
        }
        setData(hash,state);
        window.location.hash=hash; 
    }
    history.push=(hash="",state={})=>{
        if(hash&&!hash.startsWith("#")){
            hash="#"+hash;
        }
        setData(hash,state);
        window.location.hash+=hash;
    }
    window.location.refresh=()=>{
        const {hash}=window.location;
       hash?window.location.replace(`#${hash}`):window.location.reload();
    }


    function setRoute(hash=""){
        route=getRoute(hash);
        if(!(typeof(route.restricted)==="function")||route.restricted()){
            if(route&&(typeof(route.component)==="function")){
                target.innerHTML="";
                if(typeof(route.component)==="function"){
                    route.name=route.component.name;
                    route.component({parent:target,...data,...(route.data||{})});
                }
                (typeof(route.onLoad)==="function")&&route.onLoad(data,target);
                window.scrollTo(0,0);
            }
        }
        else{
            history.back();
        }
        data=null;
    }
    function setData(hash,state={}){
        data={
            ...(state||{}),
            location:{
                hash,
                url:`${window.location.origin}/${hash}`,
            },
        };
    }
    function getRoute(hash=""){
        const hashs=hash.split("#").reverse().map(hash=>hash&&("#"+hash));
        let target=null,routefound=false,i=0;
        const hashlength=hashs.length,routelength=routes.length;
        while(!routefound&&(i<hashlength)){
            let j=0;
            const hash=hashs[i];
            while(!routefound&&(j<routelength)){
                const route=routes[j];
                routefound=route.path===hash;
                if(routefound){
                    target={...route};
                }
                j++;
            }
            if(!routefound&&(i<hashlength-1)){
                const nexthash=hashs[i+1];
                j=0;
                while((j<routelength)&&!routefound){
                    const route=routes[j],{path}=route;
                    routefound=path.startsWith(nexthash+"#:");
                    if(routefound){
                        const datakey=path.substring(nexthash.length+2);
                        target={...route};
                        target.data={}
                        target.data[datakey]=hash.substring(1);
                    }
                    j++;
                }
            }
            i++;
        }
        return target;
    }
    function onRouteError(error){
        if(typeof(route.onError)==="function"){
            route.onError(error,route);
        }
        else{
            throw error;
        }
        route=null;
    }
}
/*
the while loop above with es6:
    hashs.find((hash,i)=>{
        let routefound=false;
        route=routes.find(route=>{
            routefound=route.path===hash;
            return routefound;
        });
        if((!routefound)&&(i<length-1)){
            let nexthash=hashs[i+1];
            route=routes.find(route=>{
                routefound=route.path.startsWith(nexthash+"#:");
                return routefound;
            });
        }
        return routefound;
    });
    //deprecated for higher performance
*/