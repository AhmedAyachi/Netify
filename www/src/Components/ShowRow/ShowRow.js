import {useRef} from "vanilla";
import css from "./ShowRow.module.css";
import {RateStars} from "components";


export default function ShowRow(props){
    const {parent,ref=useRef("showrow"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showrow}"></div>`);
    const showrow=parent.querySelector(`#${ref}`);

    showrow.innerHTML=`
        <div class="${css.col0}">
            <p>${show.title}</p>
        </div>
        <div class="${css.col1}"></div>
    `;
    RateStars({parent:showrow.querySelector(`.${css.col1}`),rate:show.vote_average});

    showrow.onclick=()=>{
        history.push("#show",{show});
    }

    return showrow;
}