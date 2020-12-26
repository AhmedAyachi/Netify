import {map,useRef} from "vanilla";
import css from "./ShowSlide.module.css";
import Overviewer from "./Overviewer/Overviewer";
import Videoview from "./Videoview/Videoview";
import Swiper from "./Swiper/Swiper";
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
    const refs={
        swiper:useRef("swiper"),
    }

    showslide.innerHTML=`
        <img alt="Add to watchlist" class="${css.watchlistbtn}" src="${state.inWatchList?checked:plusbtn}"/>
        <div class="${css.row0}"></div>
        <div class="${css.row1}"></div>
    `;
    const row1=showslide.querySelector(`.${css.row1}`);
    Overviewer({parent:row1,show});
    

    H.useVideos(show,(videos)=>{
        if(videos&&videos.length){
            state.swipelength=videos.length;

            videos.forEach(video=>{
                Videoview({parent:row1,video});
            });
            Swiper({parent:showslide,ref:refs.swiper,length:state.swipelength+1});
            const swiper=showslide.querySelector(`#${refs.swiper}`);
            row1.addEventListener("touchstart",(event)=>{
                const {pageX}=event.touches[0];
                state.touchX=pageX;
            },{passive:true});
            row1.addEventListener("touchend",(event)=>{
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
                row1.scrollLeft=Math.floor(state.colindex*row1.clientWidth);
            },{passive:true});
        }
        else{
            Swiper({parent:showslide,ref:refs.swiper,length:1});
        }
    });



    const addtowlbtn=showslide.querySelector(`.${css.watchlistbtn}`);
    addtowlbtn.active=state.inWatchList;
    addtowlbtn.onclick=()=>{addToList(addtowlbtn,state,show)};
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
