import {useRef} from "vanilla";
import css from "./Downloader.module.css";
import {loadinganim} from "assets";
import {fadeIn,fadeOut} from "afile";
import {Folder} from "estate";


export default function Downloader(props){
    const {parent,ref=useRef("downloader"),url,location=cordova.file.externalRootDirectory+"Netify/",name,onError}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.downloader}" style="${styles.downloader}"></div>`);
    const downloader=parent.querySelector(`#${ref}`);

    downloader.innerHTML=`
        <div class="${css.background}"></div>
        <div class="${css.row0}">
            <img alt="Downloading" class="${css.anim}" src="${loadinganim}"/>
            <div class="${css.bar}">
                <div class="${css.progress}"></div>
            </div>
            <div class="${css.error}"></div>
        </div>
    `;

    if(name&&url&&cordova.file.externalRootDirectory){
        const progress=downloader.querySelector(`.${css.progress}`);
        const netify=new Folder({name:"Netify",location:cordova.file.externalRootDirectory},(folder)=>{
            const transfer=new FileTransfer();
            transfer.onprogress=(event)=>{
                progress.style.width=`${(event.loaded/event.total)*100}%`;
            }
            transfer.download(url,`${folder.nativeURL}/${name}`,()=>{
                downloader.unmount();
            },(error)=>{
                const errorEl=downloader.querySelector(`.${css.error}`);
                errorEl.innerText="Download error occurred";
                if(onError){
                    onError(error,errorEl);
                }
                downloader.unmount();
            });
            fadeIn(downloader);
        });   
    }
    else{
        downloader.unmount();
    }

    downloader.unmount=()=>{
        fadeOut(downloader,1000);
        setTimeout(()=>{
            downloader.remove();
        },1350);
    }
}

const styles={
    downloader:`
        display:none;
    `,
}

/*imagebox.insertAdjacentHTML("beforeend",`<img alt="Dowloading" class="${css.loading}" src="${loadinganim}"/>`);
        const loading=imagebox.querySelector(`.${css.loading}`);
        const imgEl=imagebox.querySelector(`.${css.image}`);
        imgEl.className+=` ${css.downloading}`;
        const images=new Folder({
            name:"Netify",
            location:cordova.file.externalRootDirectory,
        },(folder)=>{
            const transfer=new FileTransfer();
            transfer.onprogress=(event)=>{
                event.total
            }
            transfer.download(image.path,`${folder.nativeURL}/${image.key}`,(file)=>{
                loading.remove();
                imgEl.className=css.image;
            });
        });*/