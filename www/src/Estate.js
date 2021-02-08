import {Navigator} from "components";
import {defaultcover,applogo} from "assets";


export const apikey="aae71d5d8af4086bbd44a5c4602200a5";
export const guestsessionid="658c6fe570030590b466e8161795e685";

export const bottoken="1488125893:AAE0f-kShsXSVQUqnZWKzQ9IoqgT_tJ9wwo";
export const netifygroupid="465525889";


export class User{
    constructor(props={}){
        const {avatar}=props;
        let photo=null;
        try{
            if(avatar.tmdb.avatar_path){
                photo=`https://image.tmdb.org/t/p/w500/${avatar.tmdb.avatar_path}`; 
            }
            else if(avatar.gravatar.hash){
                photo=`https://secure.gravatar.com/avatar/${avatar.tmdb.avatar_path}.jpg?s=64`;
            }
            else{
                photo=applogo;  
            }
        }
        catch{
            photo=applogo;
        }
        Object.assign(this,{...props,photo});
    }
}

const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
export const getFormatedDate=(date="")=>{
    let formated="";
    if(date){
        const slices=date.split("-");
        formated=months[+slices[1]-1]+" "+slices[2]+","+" "+slices[0];
    }
    return formated;
}

export class Show{
    constructor(props){
        const {datasaver}=store.prefs;
        Object.assign(this,{...props,
            title:props.title||props.name,
            original_title:props.original_title||props.original_name,
            vote_average:props.vote_average?props.vote_average/10:0,
            type:props.release_date?"movie":"tv",
            release_date:props.release_date||props.first_air_date,
            poster_path:props.poster_path?`https://image.tmdb.org/t/p/w${datasaver?"154":"500"}/${props.poster_path}`:defaultcover,
            seasons:props.seasons?props.seasons.reverse():null,
            episodeRuntime:props.episode_run_time&&props.episode_run_time.length?props.episode_run_time.reduce((f,n)=>f+n)/props.episode_run_time.length:null,
        });
        this.backdrop_path=props.backdrop_path?`https://image.tmdb.org/t/p/w${datasaver?"300":"1920_and_h800_multi_faces"}/${props.backdrop_path}`:defaultcover;  
        if(this.production_companies){
            this.production_companies.forEach(company=>{
                if(company.logo_path){
                    company.logo_path=`https://image.tmdb.org/t/p/w${datasaver?"154":"500"}/${company.logo_path}`;
                }
            });
        }
        if(this.networks){
            this.networks.forEach(network=>{
                if(network.logo_path){
                    network.logo_path=`https://image.tmdb.org/t/p/w500/${network.logo_path}`;
                }
            });
        }
        if(this.type==="tv"&&this.seasons){
            this.seasons.forEach(season=>{
                if(season.poster_path){
                    season.poster_path=`https://image.tmdb.org/t/p/w500/${season.poster_path}`;
                }
            });
        }
    }
}

export class File{
    constructor({name="Newtext.txt",location=cordova.file.dataDirectory},resolve=()=>{},reject=(error)=>{alert(error)}){
        this.name=name;
        this.location=location;
        this.path=location+name;
        this.created=false;
        window.resolveLocalFileSystemURL(location,(folder)=>{
            folder.getFile(name,{create:true},(file)=>{  
                resolve(file);
            },reject);
        });
    };
    write(content="",resolve=()=>{},reject=(error)=>{alert(error)}){
        window.resolveLocalFileSystemURL(this.path,(file)=>{
            file.createWriter(fileWriter=>{
                fileWriter.onwriteend=resolve;
                fileWriter.onerror=reject;
                fileWriter.write(new Blob([content]),{type:"text/plain"});
            });
        });
    };
    append(content="",resolve=()=>{},reject=(error)=>{alert(error)}){
        window.resolveLocalFileSystemURL(this.path,(file)=>{
            file.createWriter(fileWriter=>{
                fileWriter.onwriteend=resolve;
                fileWriter.onerror=reject;
                try{
                    fileWriter.seek(fileWriter.length);
                }
                catch{}
                fileWriter.write(new Blob([content]),{type:"text/plain"});
            });
        });
    };
    onRead(onFulfilled=()=>{},onRejected=alert){
        window.resolveLocalFileSystemURL(this.path,(file)=>{
            file.file(file=>{
                const reader=new FileReader();
                reader.onloadend=function(){
                    onFulfilled(this.result);
                }
                reader.readAsText(file);
            },onRejected);
        });
    };
    remove(resolve=()=>{},reject=(error)=>{alert(error)}){
        window.resolveLocalFileSystemURL(this.path,(file)=>{
            file.remove(resolve,reject);
        });
    };
}

export class Folder{
    constructor({name="Newfolder",location=cordova.file.dataDirectory},onFulfilled=()=>{},onRejected=alert){
        this.name=name;
        this.location=location;
        this.path=location+name;
        this.created=false;
        window.resolveLocalFileSystemURL(location,(folder)=>{
            folder.getDirectory(name,{create:true},onFulfilled,onRejected);
        });
    };
    get nativeURL(){
        return this.path;
    }
    onOpened(onFulfilled=()=>{},onRejected=alert){
        window.resolveLocalFileSystemURL(this.path,onFulfilled,onRejected);
    }
    add(filename="",onFulfilled=()=>{},onRejected=alert){
        window.resolveLocalFileSystemURL(this.path,(folder)=>{
            folder.getFile(filename,{create:true},onFulfilled,onRejected);
        });
    };
    remove(onFulfilled=()=>{},onRejected=alert){
        window.resolveLocalFileSystemURL(this.path,(folder)=>{
            folder.remove(onFulfilled,onRejected);
        });
    };
    removeFile(filename="",onFulfilled=()=>{},onRejected=alert){
        window.resolveLocalFileSystemURL(this.path,(folder)=>{
            folder.getFile(filename,{create:true},(file)=>{
                file.remove();
                onFulfilled(file);
            },onRejected);
        });
    };
    clear(onFulfilled=()=>{},onRejected=alert){
        window.resolveLocalFileSystemURL(this.path,(folder)=>{
            const reader=folder.createReader();
            reader.readEntries((entries)=>{
                if(entries.length){
                    entries.forEach(entry=>{
                        entry.remove();
                    });
                }
                onFulfilled(entries,folder);
            },onRejected);
        });
    }
}


export const checkUsername=(username)=>username&&!username.includes(" ");

export const checkPassword=(password)=>password.length>3;

export const onLogOut=()=>{
    const {navigator}=store.elements;
    if(navigator){
        store.elements.navigator.unmount();
        delete store.elements.navigator;
    }
    store.reset();
    store.sessiontoken="";
    store.isguest=false;
    store.user=null;
    localStorage.clear();
    location.hash?history.replace(""):location.reload();
}

export const setNavigator=()=>{
    const {elements}=store;
    if(elements.navigator){
        const navigator=document.querySelector(`#app>#${elements.navigator.id}`);
        if(!navigator){
            window.app.appendChild(elements.navigator);
        }
    }
    else{
        elements.navigator=Navigator(); 
    }
}

