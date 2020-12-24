import {map,useRef} from "vanilla";
import css from "./ImageBox.module.css";
import FullView from "./FullView/FullView";
import {donwload0,fullscreen0} from "assets";
import {Folder} from "estate";


export default function ImageBox(props){
    const {parent,ref=useRef("item"),image}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.imagebox}"></div>`);
    const imagebox=parent.querySelector(`#${ref}`);

    imagebox.innerHTML=`
        <div class="${css.row0}">
            ${map(icons,icon=>`
                <img id="${icon.ref}" class="${css.icon}" alt="${icon.alt}" src="${icon.src}"/>
            `)}
        </div>
        <img alt="Could not display image" class="${css.image}" src="${image.path}"/>
    `;

    const expandbtn=imagebox.querySelector(`#expand.${css.icon}`);
    expandbtn.onclick=()=>{
        console.log("expand"),
        FullView({parent:app,target:image});
    }

    const downloadbtn=imagebox.querySelector(`#download.${css.icon}`);
    downloadbtn.onclick=()=>{
        const documents=new Folder({name:"Documents",location:cordova.file.applicationDirectory},(folder)=>{
            /*new FileTransfer().download(image.path,`${folder.nativeURL}/${image.key}`,(file)=>{
                alert("image downloaded");
                window.Base64ImageSaverPlugin.saveImageDataToLibrary();
                folder.createReader().readEntries(entries=>{
                    alert(folder.nativeURL);
                    entries.forEach(entry=>{
                        imagebox.insertAdjacentText("afterend",`${entry.name}\n`);
                    });
                })
            });*/
        });
        //documents.clear();
        //const imagesfolder=new Folder({name:"Images"});
    }
}

const icons=[
    {
        src:donwload0,
        alt:"Download",
        ref:"download",
    },
    {
        src:fullscreen0,
        alt:"Expand",
        ref:"expand",
    },
];