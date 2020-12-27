import {useRef} from "vanilla";
import css from "./TrendView.module.css";


export default function TrendView(props){
    const {parent,ref=useRef("trendview"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.trendview}" style="${styles.trendview(show.backdrop_path)}"></div>`);
    const trendview=parent.querySelector(`#${ref}`);

    trendview.innerHTML=`
    `;
}

const styles={
    trendview:(backdrop_path)=>`
        background-image:url('${backdrop_path}');
    `,
}