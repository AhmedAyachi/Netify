import {map,useRef} from "vanilla";
import css from "./DetailsCard.module.css";
import {playbtn} from "assets";
import {fadeIn} from "afile";
import Trailer from "./Trailer/Trailer";


export default function DetailsCard(props){
    const {parent,movie,ref=useRef("detailscard")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.detailscard}"></div>`);
    const detailscard=parent.querySelector(`#${ref}`);


    detailscard.innerHTML=`
        ${movie.backdrop_path?`<img alt="backdrop" class="${css.backdrop}" src="${movie.backdrop_path}"/>`:""}
        <div class="${css.col0}">
            <img class="${css.poster}" alt="" src="${movie.poster_path}"/>
        </div>
        <div class="${css.col1}">
            <span class="${css.title}">
                ${movie.title}
                <span style="white-space:nowrap">${movie.release_date}</span>
            </span>
            <img
                class="${css.trailerplayer}"
                alt="see trailer"
                src="${playbtn}"
            />
            ${map(details(movie),([detail,type])=>`
                <span class="${css[type]}">${detail}</span>
            `)}
            <div class="${css.overview}">${movie.overview}</div>
        </div>
    `;
    const playbutton=detailscard.querySelector(`.${css.trailerplayer}`);
    playbutton.onclick=()=>{
        Trailer({parent:detailscard,id:movie.id});
    }
}

const details=movie=>[
    [movie.genres.map(genre=>genre.name+" "),"genders"],
    [`${movie.title!==movie.original_title?`${movie.original_title} .`:""} ${getDuration(movie.runtime)}`,"duration"],
    ["Overview","overviewheader"],
]
const getDuration=runtime=>{
    const hours= Math.floor(runtime/60);
    const minutes=runtime%60;
    return (hours?hours+"h ":"")+(minutes?minutes+"min":"");
}