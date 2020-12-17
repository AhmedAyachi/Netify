import {useRef} from "vanilla";
import css from "./ShowRow.module.css";
import {RateStars} from "components";


export default function ShowRow(props){
    const {parent,ref=useRef("showrow"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showrow}"></div>`);
    const showrow=parent.querySelector(`#${ref}`);

    showrow.innerHTML=`
        <p>${show.title}</p>
    `;
    RateStars({parent:showrow,rate:show.vote_average});

    showrow.onclick=()=>{
        history.push("#show",{show});
    }
}