import {map,useRef} from "vanilla";
import css from "./Navigator.module.css";
import {home1,heart0,defaultcover} from "assets";


export default function Navigator(props){
    const {parent,ref=useRef("navigator"),style}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.navigator}" style="${style}"></div>`);
    const navigator=parent.querySelector(`#${ref}`);
    const state={
        activeicon:null,
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
    state.activeicon=imgs.find(img=>img.hash==="shows");
    
    const onHashChange=()=>{
        if(state.activeicon){
            state.activeicon.className=css.icon;
            state.activeicon.active=false;
        }
        state.activeicon=imgs.find(img=>location.hash.startsWith(`#${img.hash}`));
        state.activeicon.active=true;
        state.activeicon.className+=` ${css.active}`;
    }
    window.addEventListener("hashchange",onHashChange);

    navigator.unmount=()=>{
        window.removeEventListener("hashchange",onHashChange);
        navigator.remove();
    }

    return navigator;
};

const icons=[
    {id:"toshows",alt:"shows",src:home1,hash:"shows"},
    {id:"tofavourites",alt:"favourites",src:heart0,hash:"favourites"},
];
