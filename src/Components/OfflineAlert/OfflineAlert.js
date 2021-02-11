import {useRef} from "vanilla";
import css from "./OfflineAlert.module.css";
import {cryfuldog,netifylogo} from "assets";
import {fadeIn} from "afile";


export default function OfflineAlert(props){
    const {parent,ref=useRef("offlinealert")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.offlinealert}" style="${styles.offlinealert}"></div>`);
    const offlinealert=parent.querySelector(`#${ref}`);

    offlinealert.innerHTML=`
        <p>Please check your internet connection</p>
        <img alt="" src="${netifylogo}"/>
    `;
    fadeIn(offlinealert,"flex",1);
}

const styles={
    offlinealert:`
        display:none;
    `,
}