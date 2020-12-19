import {useRef} from "vanilla";
import css from "./OfflineAlert.module.css";
import {cryfuldog,bear0} from "assets";
import {fadeIn} from "afile";


export default function OfflineAlert(props){
    const {parent,ref=useRef("offlinealert")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.offlinealert}" style="${styles.offlinealert}"></div>`);
    const offlinealert=parent.querySelector(`#${ref}`);

    offlinealert.innerHTML=`
        <p>Whoops!</p>
        <img alt="" src="${bear0}"/>
        <p>Please check your internet connection</p>
    `;
    fadeIn(offlinealert,"flex",1);
}

const styles={
    offlinealert:`
        display:none;
    `,
}