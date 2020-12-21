import {map,useRef} from "vanilla";
import css from "./ShowSlide.module.css";
import {playbtn,check2,check2reversed,plusbtn,checked} from "assets";
import {getFormatedDate} from "estate";
import Trailer from "./Trailer/Trailer";
import RateStars from "../RateStars/RateStars";
import {addToWatchlist,removeFromWatchList} from "actions";


export default function ShowSlide(props){
    const {parent,ref=useRef("showslide"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showslide}" style="${styles.showslide(show.backdrop_path)}"></div>`);
    const showslide=parent.querySelector(`#${ref}`);
    const state={
        inWatchList:Boolean(store.show.watchlist.find(show=>show.id===props.show.id)),
    };

    showslide.innerHTML=`
        <img alt="Add to watchlist" class="${css.watchlistbtn}" src="${state.inWatchList?checked:plusbtn}"/>
        <div class="${css.row0}">
            <h3 class="${css.title}">${show.title}</h3>
            <ul class="${css.list}">
                <li class="${css.rating}"></li>
                <li>${getFormatedDate(show.release_date)} | ${show.genres.map(genre=>genre.name).join(", ")}</li>
                <li>${getDuration(show)}</li>
            </ul>
            <div class="${css.overview}">${show.overview}</div>
        </div>
    `;
    RateStars({parent:showslide.querySelector(`.${css.rating}`),rate:show.vote_average});

    const addtowlbtn=showslide.querySelector(`.${css.watchlistbtn}`);
    addtowlbtn.active=state.inWatchList;
    addtowlbtn.onclick=()=>{
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
}

const styles={
    showslide:(backdropath)=>`
        background-image:url('${backdropath}');
    `,
};

const details=show=>[
    {
        className:"genders",
        detail:show.genres.map(genre=>genre.name+" "),
    },
    {
        className:"duration",
        detail:getDuration(show),
    },
    {
        className:"overviewheader",
        detail:"Overview",
    },
]

const getDuration=(show)=>{
    switch(show.type){
        case "tv":
            const seasonsnumber=show.number_of_seasons,episodesnumber=show.number_of_episodes,duration=show.episodeRuntime;
            return (
                (seasonsnumber>1?`${seasonsnumber} seasons`:"One season")+
                (episodesnumber>1?` ${episodesnumber} episodes`:"One episode")+
                (duration?` around ${getDuration({type:"movie",runtime:duration})} each`:"")
            );
        default:
            const {runtime}=show,hours=Math.floor(runtime/60),minutes=Math.round(runtime%60);
            return (hours?hours+"h ":"")+(minutes?minutes+"min":"");
    }
}