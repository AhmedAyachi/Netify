import {useRef} from "vanilla";
import css from "./Videoview.module.css";
import {play1,play2} from "assets";
import {capitalize} from "afile";


export default function Videoview(props){
    const {parent,ref=useRef("videoview"),video}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.videoview}"></div>`);
    const videoview=parent.querySelector(`#${ref}`);

    videoview.innerHTML=`
        <div class="${css.row0}">
            <img alt="Play" class="${css.playbtn}" src="${play1}"/>
            <ul class="${css.list}">
                <li>${video.name}</li>
            </ul>
        </div>
        <div class="${css.row1}">
            <div class="${css.time}">3:25</div>
            <div class="${css.bar}"></div>
        </div>
    `;
    console.log(video);
}