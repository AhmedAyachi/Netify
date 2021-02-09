import {map,useRef} from "vanilla";
import css from "./Navigator.module.css";
import {home2,zoom3,list1,defaultcover} from "assets";


export default function Navigator(props={}){
    const {parent=app,ref=useRef("navigator")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.navigator}"></div>`);
    const navigator=parent.querySelector(`#${ref}`);
    const state={
        activeicon:null,
    },{user}=store;

    navigator.innerHTML=`
        ${map(icons,icon=>`
            <img id="${icon.id}" alt="${icon.alt}" class="${css.icon}" src="${icon.src}"/>
        `)}
        <div id="toprofile" class="${css.icon}">
            <img alt="profile" src="${user.photo}" class="${css.profileimage}"/>
        </div>
    `;

    const imgs=[...navigator.querySelectorAll(`.${css.icon}`)];
    setTimeout(()=>{
        imgs.forEach((img,i)=>{
            img.hash=i<icons.length?icons[i].hash:"#profile";
            img.active=false;
            img.onclick=()=>{history.replace(img.hash)};
        });
        state.activeicon=imgs.find(img=>!img.hash);
        state.activeicon.active=true;
        state.activeicon.className+=` ${css.active}`;
    },1000);

    const onHashChange=()=>{
        const nexticon=imgs.find(img=>location.hash?img.hash&&location.hash.startsWith(img.hash):!img.hash);
        if(nexticon){
            if(state.activeicon){
                state.activeicon.className=css.icon;
                state.activeicon.active=false;
            }
            nexticon.active=true;
            nexticon.className+=` ${css.active}`;
            state.activeicon=nexticon;
        }
    }
    window.addEventListener("hashchange",onHashChange);

    navigator.unmount=()=>{
        window.removeEventListener("hashchange",onHashChange);
        navigator.remove();
    }
    
    appcontent.style.marginBottom=`${navigator.offsetHeight}px`;
    return navigator;
};

const icons=[
    {id:"tohome",alt:"Home",src:home2,hash:""},
    {id:"tosearch",alt:"Find",src:zoom3,hash:"#find"},
    {id:"towatchlist",alt:"Favourites",src:list1,hash:"#watchlist"},
];
