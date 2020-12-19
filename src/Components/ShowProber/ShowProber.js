import {map,useRef} from "vanilla";
import css from "./ShowProber.module.css";
import CreditsCard from "./CreditsCard/CreditsCard";
import {capitalize} from "afile";


export default function ShowProber(props){
    const {parent,ref=useRef("showprober"),credits}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showprober}"></div>`);
    const showprober=parent.querySelector(`#${ref}`);

    showprober.innerHTML=`
        <div class="${css.row0}">
            ${map(["details","media","social"],sectiontitle=>`
                <span class="${css.sectiontitle}">${capitalize(sectiontitle)}</span>
            `)}
        </div>
        <div class="${css.row1}"></div>
    `;
    const row1=showprober.querySelector(`.${css.row1}`);
    if(credits){
        CreditsCard({parent:row1,credits});
    }
}