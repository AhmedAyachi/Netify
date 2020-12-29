import {useRef} from "vanilla";
import css from "./Header.module.css";
import {loadinganim} from "assets";
import Searcher from "./Searcher/Searcher";
import TrendView from "./TrendView/TrendView";
import {Swiper} from "components";


export default function Header(props){
    const {parent,ref=useRef("header")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.header}"></div>`);
    const header=parent.querySelector(`#${ref}`);

    header.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            <img alt="" class="${css.loading}" src="${loadinganim}"/> 
        </div>
    `;
    Searcher({parent:header.querySelector(`.${css.row0}`),ref:props.searcherRef});
    const row1=header.querySelector(`.${css.row1}`);
    Swiper({parent:row1,length:20});

    //TrendView({parent:row1});
    return header;
}


/*const setTrendingView=(row1,trendings,showStore)=>{
    row1.querySelector(`.${css.loading}`).remove();
    if(trendings&&trendings.length){
        const {length}=trendings,{trendindex}=showStore; 
        trendings.forEach(show=>{
            TrendView({parent:row1,show});
        });
        row1.scrollLeft=Math.floor(showStore.trendindex*row1.clientWidth);
        const sliding=setInterval(()=>{
            showStore.trendindex++;
            if(showStore.trendindex>length){
                showStore.trendindex=0;
            }
            row1.scrollLeft=Math.floor(showStore.trendindex*row1.clientWidth);
        },10000);
        window.addEventListener("hashchange",()=>{
            clearInterval(sliding);
        })
    }
}*/