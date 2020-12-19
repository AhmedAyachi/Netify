import {map,useRef} from "vanilla";
import css from "./Navigator.module.css";
import {home1,heart0,defaultcover} from "assets";
import {fadeIn} from "afile";


export default function Navigator(props){
    const {parent,ref=useRef("navigator")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.navigator}" style="${styles.navigator}"></div>`);
    const navigator=store.elements.navigator=parent.querySelector(`#${ref}`);
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
    setTimeout(()=>{
        imgs.forEach((img,i)=>{
            img.hash=i<icons.length?icons[i].hash:"#settings";
            img.active=false;
            img.onclick=()=>{
                history.replace(img.hash);
            }
        });
        state.activeicon=imgs.find(img=>!img.hash);
        state.activeicon.active=true;
        state.activeicon.className+=` ${css.active}`;
    },2000)
    const onHashChange=()=>{
        if(state.activeicon){
            state.activeicon.className=css.icon;
            state.activeicon.active=false;
        }
        state.activeicon=imgs.find((img,i)=>img.hash&&location.hash.startsWith(img.hash))||imgs[0];
        state.activeicon.active=true;
        state.activeicon.className+=` ${css.active}`;
    }
    window.addEventListener("hashchange",onHashChange);

    navigator.unmount=()=>{
        window.removeEventListener("hashchange",onHashChange);
        navigator.remove();
    }
    
    fadeIn(navigator,"flex",2);
};

const styles={
    navigator:`
        display:none;
    `,
}

const icons=[
    {id:"tohome",alt:"Home",src:home1,hash:""},
    {id:"tofavourites",alt:"Favourites",src:heart0,hash:"#watchlist"},
];
