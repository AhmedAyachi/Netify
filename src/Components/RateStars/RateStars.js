import {useRef} from "vanilla";
import css from "./RateStars.module.css";
import {fullstar} from "assets";


export default function RateStars(props){
    const {parent,rate=6,ref=useRef("ratestars")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.ratestars}"></div>`);
    const ratestars=parent.querySelector(`#${ref}`);

    ratestars.innerHTML=`
        ${getRateStars(rate/2)}
    `;
}

const getRateStars=(rate=3)=>{
    const rating=[];
    const length=Math.round(rate);
    for(let i=0;i<length;i++){
        rating.push(`<img id="star_${i}" src="${fullstar}"/>`);
    }
    return rating.join("");
}