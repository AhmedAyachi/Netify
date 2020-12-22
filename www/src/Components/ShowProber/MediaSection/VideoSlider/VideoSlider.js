import {useRef} from "vanilla";
import {playbtn} from "assets";
import css from "./VideoSlider.module.css";


export default function VideoSlider(props){
    const {parent,ref=useRef("videoslider"),index,videos,video=videos[index],forwards=false}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.videoslider}" style="${styles.videoslider(video.backdropkey,forwards)}"></div>`);
    const videoslider=parent.querySelector(`#${ref}`);
    const state={
        touchX:0,
        fadeDelay:1,
    };

    videoslider.innerHTML=`
        <div class="${css.backdrop}"></div>
        <div class="${css.row0}">
            <img alt="Play" class="${css.playbtn}" src="${playbtn}"/>
        </div>
    `;

    const row0=videoslider.querySelector(`.${css.row0}`);
    const onTouchStart=(event)=>{
        const {pageX}=event.touches[0];
        state.touchX=pageX;
    }
    row0.addEventListener("touchstart",onTouchStart,{passive:true});


    const onTouchEnd=(event)=>{
        let i=index,forwards;
        if(cordova.platformId!=="browser"){
            const {pageX}=event.changedTouches[0],{length}=videos;
            if(i&&state.touchX<pageX){
                i--;
                forwards=false;
            }
            else if(i<length-1&&pageX<state.touchX){
                i++;
                forwards=true;
            }   
        }
        else{
            i++;
            forwards=true;
            if(i>=videos.length){
                i=0;
            }
        }
        if(i!==index){
            videoslider.removeEventListeners();
            videoslider.style.animation=`${forwards?css.toLeft:css.toRight} 0.85s 1 ease-in forwards`;
            setTimeout(()=>{
                VideoSlider({parent,index:i,videos,forwards:!forwards});
                videoslider.remove();
            },850);
        }
    }
    row0.addEventListener("touchend",onTouchEnd,{passive:true});

    videoslider.removeEventListeners=()=>{
        row0.removeEventListener("touchstart",onTouchStart);
        row0.removeEventListener("touchend",onTouchEnd);
    }
}

const styles={
    videoslider:(backdropkey,forwards)=>`
        display:inline-block;
        animation:${forwards?css.fromLeft:css.fromRight}  0.85s 1 ease-out forwards;
        background-image:url('https://image.tmdb.org/t/p/w533_and_h300_bestv2/${backdropkey}');
    `,
}