import {useRef} from "vanilla";
import css from "./ShowSlide.module.css";
import Overviewer from "./Overviewer/Overviewer";
import Videoview from "./Videoview/Videoview";
import {Swiper} from "components";
import {check2,check2reversed,plusbtn,checked} from "assets";
import {addToWatchlist,removeFromWatchList} from "actions";
import * as H from "./Hooks";


export default function ShowSlide(props){
    const {parent,ref=useRef("showslide"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showslide}" style="${styles.showslide(show.backdrop_path)}"></div>`);
    const showslide=parent.querySelector(`#${ref}`);

    const showStore=store.show,state={
        inWatchList:Boolean(showStore.watchlist&&showStore.watchlist.find(show=>show.id===props.show.id)),
        touchX:null,
        colindex:0,
        swipelength:5,
    };

    showslide.innerHTML=`
        <img alt="Add to watchlist" class="${css.watchlistbtn}" src="${state.inWatchList?checked:plusbtn}"/>
        <div class="${css.shadow}"></div>
        <div class="${css.row0}"></div>
    `;
    Overviewer({parent:showslide.querySelector(`.${css.row0}`),show});
    
    H.useVideos(show,(videos)=>{setVideos(showslide,videos,state)});
    const addtowlbtn=showslide.querySelector(`.${css.watchlistbtn}`);
    addtowlbtn.active=state.inWatchList;
    addtowlbtn.onclick=()=>{addToList(addtowlbtn,state,show)};

    return showslide;
}

const styles={
    showslide:(backdropath)=>`
        background-image:url('${backdropath}');
    `,
};

const addToList=(addtowlbtn,state,show)=>{
    addtowlbtn.active=!addtowlbtn.active;
    state.inWatchList=!state.inWatchList;
    if(addtowlbtn.active){
        addtowlbtn.setAttribute("src",check2);
        addToWatchlist(show);
    }
    else{
        addtowlbtn.setAttribute("src",check2reversed);
        removeFromWatchList(show);
    }
}

const setVideos=(showslide,videos,state)=>{
    if(videos&&videos.length){
        const row0=showslide.querySelector(`.${css.row0}`);
        state.swipelength=videos.length;
        videos.forEach(video=>{
            Videoview({parent:row0,video});
        });
        const swiper=Swiper({parent:showslide,length:state.swipelength+1});

        const onTouchStart=(event)=>{
            const {pageX}=event.touches[0];
            state.touchX=pageX;
        }
        row0.addEventListener("touchstart",onTouchStart,{passive:true});

        const onTouchEnd=(event)=>{
            const {pageX}=event.changedTouches[0],touchLength=state.touchX-pageX;
            const {colindex,swipelength}=state;
            if(touchLength>25&&colindex<swipelength){
                state.colindex++;
                swiper.next();
            }
            else if(touchLength<-25&&colindex){
                state.colindex--;
                swiper.previous();
            }
            showslide.style.backgroundPosition=`${(state.colindex/state.swipelength)*100}% center`;
            row0.scrollLeft=Math.floor(state.colindex*row0.clientWidth);
        }
        row0.addEventListener("touchend",onTouchEnd,{passive:true});

        window.addEventListener("hashchange",()=>{
            row0.removeEventListener("touchstart",onTouchStart);
            row0.removeEventListener("touchend",onTouchEnd);
        },{once:true});
    }
    else{
        Swiper({parent:showslide,length:1});
    }
}