import {useRef} from "vanilla";
import css from "./TrendView.module.css";


export default function TrendView(props){
    const {parent,ref=useRef("trendview"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.trendview}"></div>`);
    const trendview=parent.querySelector(`#${ref}`);

    trendview.innerHTML=`
        <div class="${css.background}" style="${styles.background(show.backdrop_path)}"></div>
        <div class="${css.row0}">
            <h3 class="${css.title}">${show.title}</h3>
        </div>
    `;
    trendview.onclick=()=>{
        history.push("#show",{show});
    }

    return trendview;
}

const styles={
    background:(backdrop_path)=>`
        background-image:url('${backdrop_path}');
    `,
}