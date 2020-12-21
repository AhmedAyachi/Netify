import {map,useRef} from "vanilla";
import css from "./SupportSlide.module.css";


export default function SupportSlide(props){
    const {parent,ref=useRef("supportslide"),title="",items}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.supportslide}"></div>`);
    const supportslide=parent.querySelector(`#${ref}`);

    supportslide.innerHTML=`
        <h1 class="${css.title}">${title}</h1>
        <div class="${css.logos}">
            ${map(items,(item)=>item.logo_path?`
                <img alt="" class="${css.logo}" src="${item.logo_path}"/>`:`
                <span class="${css.name}">${item.name}</span>
            `)}
        </div>
    `;
}