import {useRef} from "vanilla";
import css from "./Filter.module.css";
import {RateStars} from "components";


export default function Filter(props){
    const {parent,ref=useRef("filter")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.filter}" style="${styles.filter}"></div>`);
    const filter=parent.querySelector(`#${ref}`);

    filter.innerHTML=`
    `;
    RateStars({parent:filter,rate:3.5});
}

const styles={
    filter:`
        display:none;
    `,
}