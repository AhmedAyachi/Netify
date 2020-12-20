import {map,useRef} from "vanilla";
import css from "./ShowSlide.module.css";
import {playbtn,check2,check2reversed,plusbtn,checked} from "assets";
import Trailer from "./Trailer/Trailer";
import RateStars from "../RateStars/RateStars";
import {addToWatchlist,removeFromWatchList} from "actions";


export default function ShowSlide(props){
    const {parent,ref=useRef("showslide"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showslide}"></div>`);
    const showslide=parent.querySelector(`#${ref}`);

    showslide.innerHTML=`
        ${show.backdrop_path?`<img alt="backdrop" class="${css.backdrop}" src="${show.backdrop_path}"/>`:""}
        <img alt="Add to watchlist" class="${css.watchlistbtn}" src="${plusbtn}"/>
        <div class="${css.col0}">
            <img class="${css.poster}" alt="" src="${show.poster_path}"/>
        </div>
        <div class="${css.col1}">
            <span class="${css.title}">
                ${show.title}
                <span style="white-space:nowrap">(${show.release_date})</span>
            </span>
            <img
                class="${css.trailerplayer}"
                alt="see trailer"
                src="${playbtn}"
            />
            ${map(details(show),({detail,className})=>`
                <span class="${css[className]}">${detail}</span>
            `)}
            <div class="${css.overviewbody}">${show.overview}</div>
        </div>
    `;
    RateStars({parent:showslide.querySelector(`.${css.col0}`),rate:show.vote_average});

    const playbutton=showslide.querySelector(`.${css.trailerplayer}`);
    playbutton.onclick=()=>{
        Trailer({parent:showslide,id:show.id,type:show.type});
    }

    const inWatchList=Boolean(store.show.watchlist.find(show=>show.id===props.show.id));
    const addtowlbtn=showslide.querySelector(`.${css.watchlistbtn}`);
    addtowlbtn.active=inWatchList;
    addtowlbtn.setAttribute("src",addtowlbtn.active?checked:plusbtn);
    addtowlbtn.onclick=()=>{
        addtowlbtn.active=!addtowlbtn.active;
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