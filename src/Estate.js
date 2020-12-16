import {defaultcover} from "assets";

export const apikey="aae71d5d8af4086bbd44a5c4602200a5";
export const guestsessionid="658c6fe570030590b466e8161795e685";

export const bottoken="1488125893:AAE0f-kShsXSVQUqnZWKzQ9IoqgT_tJ9wwo";
export const netlixgroupid="465525889";

export class Show{
    constructor(props){
        Object.assign(this,{...props,
            title:props.title||props.name,
            original_title:props.original_title||props.original_name,
            type:props.release_date?"movie":"tv",
            release_date:props.release_date||props.first_air_date,
            poster_path:props.poster_path?`https://image.tmdb.org/t/p/w500/${props.poster_path}`:defaultcover,
        });
        if(props.backdrop_path){
            this.backdrop_path=`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${this.backdrop_path}`;   
        }
        this.keywords=this.title+this.original_title+this.overview;
    }
}

export class File{
    constructor(name="text.txt",location=cordova.file.cacheDirectory,resolve=()=>{},reject=()=>{}){
        this.name=name;
        this.location=location;
        this.path=location+name;
        this.created=false;
        window.resolveLocalFileSystemURL(location,(dataDirectory)=>{
            dataDirectory.getFile(name,{create:true},(file)=>{
                this.created=true;
                resolve(file);
            },reject);
        });
    };
    write(content="",resolve=()=>{},reject=()=>{}){
        window.resolveLocalFileSystemURL(this.path,(file)=>{
            file.createWriter(fileWriter=>{
                fileWriter.onwriteend=resolve;
                fileWriter.onerror=reject;
                fileWriter.write(new Blob([content]),{type:"text/plain"});
            });
        });
    };
    append(content="",resolve=()=>{},reject=()=>{}){
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
    onRead(resolve=()=>{},reject=()=>{}){
        window.resolveLocalFileSystemURL(this.path,(file)=>{
            file.file(file=>{
                const reader=new FileReader();
                reader.onloadend=function(){
                    resolve(this.result);
                }
                reader.readAsText(file);
            },reject);
        });
    };
    remove(resolve=()=>{},reject=()=>{}){
        window.resolveLocalFileSystemURL(this.path,(file)=>{
            file.remove(resolve,reject);
        });
    };
}