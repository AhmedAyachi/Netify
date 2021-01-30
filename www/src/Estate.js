import {defaultcover,applogo} from "assets";


export const apikey="aae71d5d8af4086bbd44a5c4602200a5";
export const guestsessionid="658c6fe570030590b466e8161795e685";

export const bottoken="1488125893:AAE0f-kShsXSVQUqnZWKzQ9IoqgT_tJ9wwo";
export const netifygroupid="465525889";


export class User{
    constructor(props={}){
        Object.assign(this,{...props,
            photo:props.photopath||applogo,
            name:props.name,
            username:props.name,
        });
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
        Object.assign(this,{...props,
            title:props.title||props.name,
            original_title:props.original_title||props.original_name,
            vote_average:props.vote_average?props.vote_average/10:0,
            type:props.release_date?"movie":"tv",
            release_date:props.release_date||props.first_air_date,
            poster_path:props.poster_path?`https://image.tmdb.org/t/p/w500/${props.poster_path}`:defaultcover,
            seasons:props.seasons?props.seasons.reverse():null,
            episodeRuntime:props.episode_run_time&&props.episode_run_time.length?props.episode_run_time.reduce((f,n)=>f+n)/props.episode_run_time.length:null,
        });
        //if(props.backdrop_path){
        this.backdrop_path=props.backdrop_path?`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${props.backdrop_path}`:defaultcover;  
        //}
        this.keywords=this.title+this.original_title+this.overview;
        if(this.production_companies){
            this.production_companies.forEach(company=>{
                if(company.logo_path){
                    company.logo_path=`https://image.tmdb.org/t/p/w500/${company.logo_path}`;
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