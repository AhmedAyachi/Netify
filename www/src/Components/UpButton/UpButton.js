import {useRef} from "vanilla";
import css from "./UpButton.module.css";
import {arrowpoint} from "assets";
import {fadeIn} from "afile";


export default function UpButton(props={}){
    const {parent=appcontent,ref=useRef("upbutton")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.upbutton}"></div>`);
    const upbutton=parent.querySelector(`#${ref}`);

    upbutton.innerHTML=`
        <img alt="^" class="${css.up}" src="${arrowpoint}"/>    
    `;
    window.addEventListener("scroll",function onScroll(){
        const {scrollY,innerHeight}=window,{offsetHeight}=document.body;
        if(scrollY+innerHeight>=offsetHeight/2){
            fadeIn(upbutton,"flex",1);
            window.removeEventListener("scroll",onScroll);
        }
    });

    upbutton.onclick=()=>{
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }
}