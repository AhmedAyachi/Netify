import {useRef} from "vanilla";
import css from "./ShowViewer.module.css";
import {RateStars} from "components";


export default function ShowViewer(props){
    const {parent,ref=useRef("showviewer"),show={}}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showviewer}"></div>`);
    const showviewer=parent.querySelector(`#${ref}`);

    showviewer.innerHTML=`
        <div class="${css.background}" style="${styles.background(show.backdrop_path)}"></div>
        <div class="${css.row0}">
            <div class="${css.col0}">
                <img alt="" class="${css.poster}" src="${show.poster_path}"/>
            </div>
            <div class="${css.col1}">
                <p class="${css.title}">${show.title}</p>
            </div>
        </div>
    `;
    RateStars({parent:showviewer.querySelector(`.${css.col1}`),rate:show.vote_average});
    
    showviewer.querySelector(`.${css.poster}`).onclick=()=>{
        history.push("#show",{show});
    }
}

const styles={
    background:(backdrop_path)=>`
        background-image:url('${backdrop_path}');
    `,
}