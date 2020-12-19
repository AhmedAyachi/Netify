import {map} from "vanilla";
import css from "./WatchList.module.css";
import {ShowCard,ShowRow,ShowView} from "components";
import {squares0,list0,popcorn1} from "assets";


export default function WatchList(props){
    const {parent,ref="watchlist"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.watchlist}"></div>`);
    const watchlist=parent.querySelector(`#${ref}`);

    const showStore=store.show;
    watchlist.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}" style="${styles.row1}">
            <div class="${css.row2}">
                <h3 class="${css.title}">Watchlist</h3>
                <img alt="" class="${css.displayer}" src="${showStore.listdisplay?squares0:list0}"/>
            </div>
            <div class="${css.row3}"></div>
        </div>
    `;

    const shows=showStore.watchlist;
    if(shows.length){
        ShowView({parent:watchlist.querySelector(`.${css.row0}`),show:shows[0]});
    }
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

const styles={
    row1:`
        margin-top:${cordova.platformId!=="browser"?"1.5rem":"0"};
    `,
}

const setList=(shows,parent,display,)=>{
    if(shows.length>1){
        if(display){
            shows.forEach((show,i)=>{i&&ShowRow({parent,show})}); 
        }
        else{
            shows.forEach((show,i)=>{i&&ShowCard({parent,show})});
        }
    }
    else{
        parent.innerHTML=`<img class="${css.emptylistsign}" alt="" src="${popcorn1}"/>`;
    }
}