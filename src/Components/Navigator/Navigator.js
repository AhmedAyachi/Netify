import {map,useRef} from "vanilla";
import css from "./Navigator.module.css";
import {home1,heart0} from "assets";


export default function Navigator(props){
    const {parent,ref=useRef("navigator"),style}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.navigator}" style="${style}"></div>`);
    const navigator=parent.querySelector(`#${ref}`);

    navigator.innerHTML=`
        ${map(icons,icon=>`
            <img alt="${icon.alt}" class="${css.icon}" src="${icon.src}"/>
        `)}
        <div class="${css.icon} ${css.usericon}"></div>
    `;

}

const icons=[
    {alt:"shows",src:home1},
    {alt:"favourite",src:heart0},
];