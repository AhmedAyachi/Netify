import {useRef} from "vanilla";
import css from "./RateStars.module.css";
import {fullstar,emptystar,halfstar,quarterstar,quarterhalfstar} from "assets";


export default function RateStars(props){
    const {parent,ref=useRef("ratestars"),style,editable=false,onChange}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.ratestars}" style="${style}"></div>`);
    const ratestars=parent.querySelector(`#${ref}`);
    const state=ratestars.state={
        rate:(Math.abs(props.rate)||1)*5,
    };

    ratestars.innerHTML=`
        ${getRateStars(state.rate)}
    `;
    if(editable){
        const stars=ratestars.querySelectorAll("img");
        stars.forEach((star,index)=>{
            star.setAttribute("src",emptystar);
            Object.assign(star,{active:false,value:index+1});
            star.onclick=()=>{
                setRateStars(star,index,stars,state);
                onChange&&onChange(state);
            };
        });
    }
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

const setRateStars=(star,index,stars,state)=>{
    if(state.rate!==star.value){
        state.rate=star.value;
        for(let i=0;i<=index;i++){
            if(!stars[i].active){
                stars[i].active=true;
                stars[i].setAttribute("src",fullstar);
            }
        }
        for(let i=stars.length-1;i>index;i--){
            if(stars[i].active){
                stars[i].active=false;
                stars[i].setAttribute("src",emptystar);
            }
        }
    }
    else{
        state.rate=0;
        for(let i=0;i<=index;i++){
            if(stars[i].active){
                stars[i].active=false;
                stars[i].setAttribute("src",emptystar);
            }
        }
    }
}