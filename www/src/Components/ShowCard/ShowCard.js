import {useRef} from "vanilla";
import css from "./ShowCard.module.css";
import {RateStars} from "components";


export default function ShowCard(props){
    const {parent,ref=useRef("showcard"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showcard}"></div>`);
    const showcard=parent.querySelector(`#${ref}`);

    const {title,poster_path,vote_average}=show;
    showcard.innerHTML=`
        <div class="${css.background}">
            <img alt="" src="${poster_path}"/>
        </div>
        <div class="${css.foreground}">
            <div class="${css.title}">${title}</div>
        </div>
    `;
    const foreground=showcard.querySelector(`.${css.foreground}`);
    RateStars({parent:foreground,rate:vote_average});

    showcard.onclick=()=>{
        history.replace(`#${show.type}${show.id}`,{show});
    }

    return showcard
}