import {map,useRef} from "vanilla";
import css from "./Navigator.module.css";
import {home2,zoom3,list1,defaultcover} from "assets";


export default function Navigator(props={}){
    const {parent=app,ref=useRef("navigator")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.navigator}" style="${styles.navigator}"></div>`);
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
    imgs.forEach((img,i)=>{
        img.hash=i<icons.length?icons[i].hash:"#profile";
        img.active=false;
        img.onclick=()=>{
            history.replace(img.hash);
        }
    });
    state.activeicon=imgs.find(img=>!img.hash);
    state.activeicon.active=true;
    state.activeicon.className+=` ${css.active}`;


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
    
    appcontent.style.marginBottom=navigator.style.height;
    return navigator;
};

const styles={
    navigator:`
        height:4rem;
    `,
}

const icons=[
    {id:"tohome",alt:"Home",src:home2,hash:""},
    {id:"tosearch",alt:"Find",src:zoom3,hash:"#find"},
    {id:"towatchlist",alt:"Favourites",src:list1,hash:"#watchlist"},
];
