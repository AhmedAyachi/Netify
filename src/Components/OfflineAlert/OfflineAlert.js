import {useRef} from "vanilla";
import css from "./OfflineAlert.module.css";


export default function OfflineAlert(props){
    const {parent,ref=useRef("offlinealert")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.offlinealert}"></div>`);
    const offlinealert=parent.querySelector(`#${ref}`);

    offlinealert.innerHTML=`
        
    `;
}