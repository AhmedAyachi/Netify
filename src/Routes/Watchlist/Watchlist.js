import {map} from "vanilla";
import css from "./WatchList.module.css";
import {ShowCard,ShowRow,ShowViewer} from "components";
import {squares0,list0} from "assets";


export default function WatchList(props){
    const {parent,ref="watchlist"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.watchlist}"></div>`);
    const watchlist=parent.querySelector(`#${ref}`);

    watchlist.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            <div class="${css.row2}">
                <h3 class="${css.title}">Watchlist</h3>
                <img alt="" class="${css.displayer}" src="${squares0}"/>
            </div>
            <div class="${css.row3}"></div>
        </div>
    `;

    const showStore=store.show;
    const shows=showStore.watchlist;
    shows.length&&ShowViewer({parent:watchlist.querySelector(`.${css.row0}`),show:shows[0]});
    const row3=watchlist.querySelector(`.${css.row3}`);
    setList(shows,row3,showStore.listdisplay);

    const displayer=watchlist.querySelector(`.${css.displayer}`);
    displayer.onclick=()=>{
        showStore.listdisplay=!showStore.listdisplay;
        displayer.setAttribute("src",showStore.listdisplay?squares0:list0);
        row3.innerHTML="";
        setList(shows,row3,showStore.listdisplay);
    }
};

const setList=(shows,parent,display,)=>{
    if(display){
        shows.forEach((show,i)=>{
            i&&ShowRow({parent,show});
        }); 
    }
    else{
        shows.forEach((show,i)=>{
            i&&ShowCard({parent,show});
        });
    }
}
