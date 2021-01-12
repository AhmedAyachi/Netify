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

    const showStore=store.show,state=showslide.state={
        inWatchList:Boolean(showStore.watchlist&&showStore.watchlist.find(show=>show.id===props.show.id)),
    };

    showslide.innerHTML=`
        <img alt="Add to watchlist" class="${css.watchlistbtn}" src="${state.inWatchList?checked:plusbtn}"/>
        <div class="${css.shadow}"></div>
        <div class="${css.row0}">
            <div class="${css.row1}"></div>
        </div>
    `;
    Overviewer({parent:showslide.querySelector(`.${css.row1}`),show});
    
    H.useVideos(show,(videos)=>{setVideos(showslide,videos)});
    const addtowlbtn=showslide.querySelector(`.${css.watchlistbtn}`);
    addtowlbtn.active=state.inWatchList;
    addtowlbtn.onclick=()=>{addToList(addtowlbtn,state,show)};

    return showslide;
}

const styles={
    showslide:(backdropath)=>`
        background-image:url('${backdropath}');
    `,
    swiper:`
        position:relative;
        bottom:0;
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

const setVideos=(showslide,videos)=>{
    if(videos&&videos.length){
        const row1=showslide.querySelector(`.${css.row1}`);
        videos.forEach(video=>{
            Videoview({parent:row1,video});
        });
        Swiper({
            parent:showslide.querySelector(`.${css.row0}`),
            length:videos.length+1,
            style:styles.swiper,
            target:row1,
            onSwipe:({index,length})=>{
                showslide.style.backgroundPosition=`${(index/length)*100}% center`;
            }
        });
    }
    else{
        Swiper({parent:showslide.querySelector(`.${css.row0}`),length:1,style:styles.swiper});
    }
}