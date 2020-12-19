import {useRef} from "vanilla";
import css from "./ShowProber.module.css";
import CreditsCard from "./CreditsCard/CreditsCard";


export default function ShowProber(props){
    const {parent,ref=useRef("showprober"),show,credits}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showprober}"></div>`);
    const showprober=parent.querySelector(`#${ref}`);

    showprober.innerHTML=`
        <div class="${css.row0}">
        </div>
        <div class="${css.row1}"></div>
    `;
}