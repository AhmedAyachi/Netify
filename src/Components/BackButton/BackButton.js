import {useRef} from "vanilla";
import css from "./BackButton.module.css";


export default function BackButton(props){
    const {parent,ref=useRef("backbutton")}=props;
    parent.insertAdjacentHTML("beforeend",`<div od="${ref}" class="${css.backbutton}"></div>`);
    const backbutton=parent.querySelector(`#${ref}`);

    backbutton.innerHTML=`
        <img/>
    `;
}