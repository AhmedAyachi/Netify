import {map,useRef} from "vanilla";
import css from "./Item.module.css";
import FullView from "./FullView/FullView";
import {donwload0,fullscreen0} from "assets";
import {Folder} from "estate";


export default function Item(props){
    const {parent,ref=useRef("item"),view}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.item}"></div>`);
    const item=parent.querySelector(`#${ref}`);

    item.innerHTML=`
        <div class="${css.row0}">
            ${map(icons,icon=>`
                <img id="${icon.ref}" class="${css.icon}" alt="${icon.alt}" src="${icon.src}"/>
            `)}
        </div>
        <img alt="" class="${css.view}" src="${view.path}"/>
    `;

    const expandbtn=item.querySelector(`#expand.${css.icon}`);
    expandbtn.onclick=()=>{
        console.log("expand"),
        FullView({parent:app,target:view});
    }

    const downloadbtn=item.querySelector(`#download.${css.icon}`);
    downloadbtn.onclick=()=>{
        const imagesfolder=new Folder("Images");
        imagesfolder.add(view.key,(image)=>{
            alert("image saved successfully");
        });
        alert("downloading");
    }
    //item.style FullView() Fullview()
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