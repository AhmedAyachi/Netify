import {map,useRef} from "vanilla";
import css from "./Navigator.module.css";
import {home1,heart0,defaultcover} from "assets";


export default function Navigator(props){
    const {parent,ref=useRef("navigator"),style}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.navigator}" style="${style}"></div>`);
    const navigator=parent.querySelector(`#${ref}`);
    const state={
        active:null,
    }

    navigator.innerHTML=`
        ${map(icons,icon=>`
            <img id="${icon.id}" alt="${icon.alt}" class="${css.icon}" src="${icon.src}"/>
        `)}
        <div id="settings" class="${css.icon}">
            <img alt="settings" src="${defaultcover}" class="${css.usericon}"/>
        </div>
    `;

    const imgs=[...navigator.querySelectorAll(`.${css.icon}`)];
    imgs.forEach((img,i)=>{
        img.hash=i<icons.length?icons[i].hash:"settings";
        img.active=false;
        img.onclick=()=>{
            history.pushState(`#${img.hash}`);
        }
    });
    window.addEventListener("hashchange",()=>{
        if(state.active){
            state.active.className=css.icon;
            state.active.active=false;
        }
        state.active=imgs.find(img=>location.hash.includes(img.hash));
        state.active.active=true;
        state.active.className+=` ${css.active}`;
    });
    state.active=imgs.find(img=>img.hash==="shows");
    state.active.className+=` ${css.active}`;

}

const icons=[
    {id:"toshows",alt:"shows",src:home1,hash:"shows"},
    {id:"tofavourites",alt:"favourites",src:heart0,hash:"favourites"},
];