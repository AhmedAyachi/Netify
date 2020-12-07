import {useRef} from "vanilla";
import css from "./RateStars.module.css";
import {fullstar,emptystar,halfstar,quarterstar,quarterhalfstar} from "assets";


export default function RateStars(props){
    const {parent,rate=6,ref=useRef("ratestars"),style}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.ratestars}" style="${style}"></div>`);
    const ratestars=parent.querySelector(`#${ref}`);

    ratestars.innerHTML=`
        ${getRateStars(Math.abs(rate/2))}
    `;
}

const getRateStars=(rate=3)=>{
    const rating=[];
    const length=Math.floor(rate);
    for(let i=0;i<length;i++){
        rating.push(`<img id="star_${i}" src="${fullstar}"/>`);
    }
    const fraction=rate-length;
    if(fraction){
        if(fraction<=0.25){
            rating.push(`<img id="star_${length}" src="${quarterstar}"/>`);
        }
        else if(fraction<=0.5){
            rating.push(`<img id="star_${length}" src="${halfstar}"/>`);
        }
        else{
            rating.push(`<img id="star_${length}" src="${quarterhalfstar}"/>`);
        }
    }
    return rating.join("");
}