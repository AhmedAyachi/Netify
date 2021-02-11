import {useRef} from "vanilla";
import css from "./RateStars.module.css";
import {fullstar,emptystar,halfstar,quarterstar,quarterhalfstar} from "assets";


export default function RateStars(props){
    const {parent,rate,ref=useRef("ratestars"),style,editable=false,onChange}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.ratestars}" style="${style}"></div>`);
    const ratestars=parent.querySelector(`#${ref}`);
    const state=ratestars.state={
        rate:editable?0.9:(rate&&rate<=1?Math.abs(rate):0.9),
    };

    ratestars.innerHTML=`
        ${getRateStars(state.rate)}
    `;
    if(editable){
        const stars=ratestars.querySelectorAll("img");
        stars.forEach((star,index)=>{
            star.setAttribute("src",emptystar);
            Object.assign(star,{active:false,index});
            star.onclick=()=>{
                setRateStars(star,stars,state);
                onChange&&onChange(state);
            };
        });
        ratestars.reset=()=>{
            stars.forEach(star=>{
                star.setAttribute("src",emptystar);
                star.active=false;
            });
            state.rate=0;
        }
        ratestars.setRate=(rate)=>{
            setRateStars(stars[Math.floor(rate*4)],stars,state);
        }
    }

    return ratestars;
}

const getRateStars=(rate=3/5)=>{
    const rating=[],outOf5=rate*5;
    const integer=Math.floor(outOf5);
    for(let i=0;i<integer;i++){
        rating.push(`<img id="star_${i}" src="${fullstar}"/>`);
    }
    const fraction=outOf5-integer;
    if(fraction){
        if(fraction<=0.25){
            rating.push(`<img id="star_${integer}" src="${quarterstar}"/>`);
        }
        else if(fraction<=0.5){
            rating.push(`<img id="star_${integer}" src="${halfstar}"/>`);
        }
        else{
            rating.push(`<img id="star_${integer}" src="${quarterhalfstar}"/>`);
        }
    }
    return rating.join("");
}

const setRateStars=(star,stars,state)=>{
    const index=star?star.index:-1,value=index+1;
    if(state.rate*5!==value){
        state.rate=value/stars.length;
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