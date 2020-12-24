import {map,useRef} from "vanilla";
import css from "./ImageBox.module.css";
import FullView from "./FullView/FullView";
import {Downloader} from "components";
import {donwload0,fullscreen0} from "assets";


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
        Downloader({
            parent:imagebox,
            url:image.path,
            name:image.key,
        });
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