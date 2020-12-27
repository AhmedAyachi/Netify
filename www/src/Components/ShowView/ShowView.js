import {useRef} from "vanilla";
import css from "./ShowView.module.css";
import {RateStars} from "components";


export default function ShowView(props){
    const {parent,ref=useRef("showview"),show={}}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showview}" style="${styles.showview(show.backdrop_path)}"></div>`);
    const showview=parent.querySelector(`#${ref}`);

    showview.innerHTML=`
        <div class="${css.row0}">
            <div class="${css.col0}">
                <img alt="" class="${css.poster}" src="${show.poster_path}"/>
            </div>
            <div class="${css.col1}">
                <p class="${css.title}">${show.title}</p>
            </div>
        </div>
    `;
    RateStars({parent:showview.querySelector(`.${css.col1}`),rate:show.vote_average});
    
    showview.querySelector(`.${css.poster}`).onclick=()=>{
        history.push("#show",{show});
    }
}

const styles={
    showview:(backdrop_path)=>`
        background-image:url('${backdrop_path}');
    `,
}