import {useRef} from "vanilla";
import css from "./ShowCard.module.css";
import RateStars from "../../RateStars/RateStars";


export default function ShowCard(props){
    const {parent,ref=useRef("showcard"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showcard}"></div>`);
    const showcard=parent.querySelector(`#${ref}`);

    const {title,poster_path,vote_average}=show;
    showcard.innerHTML=`
        <div class="${css.details}">
            <div class="${css.title}">${title}</div>
            <div id="rating" class="${css.rating}"></div>
        </div>
        <img alt="" src="${poster_path}"/>
    `;
    RateStars({parent:showcard.querySelector(`#rating.${css.rating}`),rate:vote_average});

    showcard.onclick=()=>{
        history.push("#show",{show});
    }

    return showcard
}