import {map,useRef} from "vanilla";
import css from "./ShowSlide.module.css";
import Overviewer from "./Overviewer/Overviewer";
import Videoview from "./Videoview/Videoview";
import {check2,check2reversed,plusbtn,checked} from "assets";
import {addToWatchlist,removeFromWatchList} from "actions";


export default function ShowSlide(props){
    const {parent,ref=useRef("showslide"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showslide}" style="${styles.showslide(show.backdrop_path)}"></div>`);
    const showslide=parent.querySelector(`#${ref}`);
    const showStore=store.show,state={
        inWatchList:Boolean(showStore.watchlist&&showStore.watchlist.find(show=>show.id===props.show.id)),
        touchX:null,
        colindex:0,
        swipelength:2,
    };

    showslide.innerHTML=`
        <img alt="Add to watchlist" class="${css.watchlistbtn}" src="${state.inWatchList?checked:plusbtn}"/>
        <div class="${css.row0}"></div>
    `;
    const row0=showslide.querySelector(`.${css.row0}`);
    Overviewer({parent:row0,show});
    Videoview({parent:row0});
    Videoview({parent:row0});
    

    row0.addEventListener("touchstart",(event)=>{
        const {pageX}=event.touches[0];
        state.touchX=pageX;
    });

    row0.addEventListener("touchend",(event)=>{
        const {pageX}=event.changedTouches[0],touchLength=state.touchX-pageX;
        const {colindex,swipelength}=state;
        if(touchLength>10&&colindex<swipelength){
            state.colindex++;
        }
        else if(touchLength<-10&&colindex){
            state.colindex--;
        }
        row0.scrollLeft=Math.floor(state.colindex*row0.clientWidth);
    })



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
