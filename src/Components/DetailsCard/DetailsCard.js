import {map,useRef} from "vanilla";
import css from "./DetailsCard.module.css";
import {playbtn} from "assets";
import Trailer from "./Trailer/Trailer";


export default function DetailsCard(props){
    const {parent,show,ref=useRef("detailscard")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.detailscard}"></div>`);
    const detailscard=parent.querySelector(`#${ref}`);


    detailscard.innerHTML=`
        ${show.backdrop_path?`<img alt="backdrop" class="${css.backdrop}" src="${show.backdrop_path}"/>`:""}
        <div class="${css.col0}">
            <img class="${css.poster}" alt="" src="${show.poster_path}"/>
        </div>
        <div class="${css.col1}">
            <span class="${css.title}">
                ${show.title}
                <span style="white-space:nowrap">${show.release_date}</span>
            </span>
            <img
                class="${css.trailerplayer}"
                alt="see trailer"
                src="${playbtn}"
            />
            ${map(details(show),([detail,type])=>`
                <span class="${css[type]}">${detail}</span>
            `)}
            <div class="${css.overview}">${show.overview}</div>
        </div>
    `;
    const playbutton=detailscard.querySelector(`.${css.trailerplayer}`);
    playbutton.onclick=()=>{
        Trailer({parent:detailscard,id:show.id,type:show.type});
    }
}

const details=show=>[
    [show.genres.map(genre=>genre.name+" "),"genders"],
    [`${show.title!==show.original_title?`${show.original_title} .`:""} ${getDuration(show.runtime)}`,"duration"],
    ["Overview","overviewheader"],
]
const getDuration=runtime=>{
    const hours= Math.floor(runtime/60);
    const minutes=runtime%60;
    return (hours?hours+"h ":"")+(minutes?minutes+"min":"");
}