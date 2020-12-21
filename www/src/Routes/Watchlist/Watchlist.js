import {map} from "vanilla";
import css from "./WatchList.module.css";
import {ShowCard,ShowRow,ShowView} from "components";
import {squares0,list0,popcorn1,loadinganim} from "assets";
import {loadWatchList} from "actions";


export default function WatchList(props){
    const {parent,ref="watchlist"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.watchlist}"></div>`);
    const watchlist=parent.querySelector(`#${ref}`);

    const showStore=store.show;
    watchlist.innerHTML=`
        ${!showStore.watchlist?`<img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>`:""}
        <div class="${css.row0}"></div>
        <div class="${css.row1}" style="${styles.row1}">
            <div class="${css.row2}">
                <h3 class="${css.title}">Watchlist</h3>
                <img alt="" class="${css.displayer}" src="${showStore.listdisplay?squares0:list0}"/>
            </div>
            <div class="${css.row3}"></div>
        </div>
    `;


    if(showStore.watchlist){
        setWatchList(watchlist,showStore); 
    }
    else{
        loadWatchList(()=>{
            setWatchList(watchlist,showStore,loading);
            watchlist.querySelector("#loading").remove();
        },(error)=>{alert(error)});
    }
    
    const displayer=watchlist.querySelector(`.${css.displayer}`);
    displayer.onclick=()=>{
        showStore.listdisplay=!showStore.listdisplay;
        displayer.setAttribute("src",showStore.listdisplay?squares0:list0);
        setList(showStore.watchlist,watchlist,showStore.listdisplay);
    }
};

const styles={
    row1:`
        margin-top:${cordova.platformId!=="browser"?"1.5rem":"0"};
    `,
    loading:`
        display:block;
        max-width:5rem;
        margin:5rem auto;
    `,
}

const setList=(shows,watchlist,listdisplay)=>{
    const row3=watchlist.querySelector(`.${css.row3}`);
    row3.innerHTML="";
    if(shows&&shows.length>1){
        if(listdisplay){
            shows.forEach((show,i)=>{i&&ShowRow({parent:row3,show})}); 
        }
        else{
            shows.forEach((show,i)=>{i&&ShowCard({parent:row3,show})});
        }
    }
    else{
        row3.innerHTML=`<img class="${css.emptylistsign}" alt="" src="${popcorn1}"/>`;
    }
}

const setWatchList=(watchlist,showStore)=>{
    const shows=showStore.watchlist;
    if(shows&&shows.length){
        ShowView({parent:watchlist.querySelector(`.${css.row0}`),show:shows[0]});
    }
    setList(shows,watchlist,showStore.listdisplay);
}
