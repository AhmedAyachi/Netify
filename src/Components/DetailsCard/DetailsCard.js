import {map,useRef} from "vanilla";
import css from "./DetailsCard.module.css";
import {playbtn,check2,check2reversed,plusbtn} from "assets";
import Trailer from "./Trailer/Trailer";
import RateStars from "../RateStars/RateStars";


export default function DetailsCard(props){
    const {parent,show,ref=useRef("detailscard")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.detailscard}"></div>`);
    const detailscard=parent.querySelector(`#${ref}`);

    detailscard.innerHTML=`
        ${show.backdrop_path?`<img alt="backdrop" class="${css.backdrop}" src="${show.backdrop_path}"/>`:""}
        <img alt="Add to watchlist" class="${css.watchlistbtn}" src="${plusbtn}"/>
        <div id="col0" class="${css.col0}">
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
            <div class="${css.overview}">${show.overview}</div>
        </div>
    `;
    RateStars({parent:detailscard.querySelector("#col0"),rate:show.vote_average});

    const playbutton=detailscard.querySelector(`.${css.trailerplayer}`);
    playbutton.onclick=()=>{
        Trailer({parent:detailscard,id:show.id,type:show.type});
    }
    const addtowlbtn=detailscard.querySelector(`.${css.watchlistbtn}`);
    addtowlbtn.active=false;
    addtowlbtn.onclick=()=>{
        addtowlbtn.active=!addtowlbtn.active;
        addtowlbtn.setAttribute("src",addtowlbtn.active?check2:check2reversed);
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
const getDuration=show=>{
    switch(show.type){
        case "tv":
            const seasonsnumber=show.seasons.length-1;
            return seasonsnumber>1?`${seasonsnumber} seasons`:"One season";
        default:
            const {runtime}=show;
            const hours= Math.floor(runtime/60);
            const minutes=runtime%60;
            return (hours?hours+"h ":"")+(minutes?minutes+"min":"");
    }
}