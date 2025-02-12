import {} from "vanilla";
import css from "./Photomedia.module.css";
import {setHQDownload} from "actions";


export default function Photomedia(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="photomedia" class="${css.photomedia}"></div>`);
    const photomedia=parent.querySelector("#photomedia"),{prefs}=store;

    photomedia.innerHTML=`
        <ul>
            <li>
                <span class="${css.prefname}">Download quality</span>
                <span class="${css.quality}">${prefs.highqualitydownload?"High":"Low"}</span>
            </li>
        </ul>
        <p class="${css.description}">For posters and backdrops download quality.</p>
    `;

    const qualityEl=photomedia.querySelector(`.${css.quality}`);
    qualityEl.onclick=()=>{
        setHQDownload(!prefs.highqualitydownload);
        qualityEl.innerHTML=prefs.highqualitydownload?"High":"Low";
    }

}