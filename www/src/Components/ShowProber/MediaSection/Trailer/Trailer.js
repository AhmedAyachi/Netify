import {useRef} from "vanilla";
import css from "./Trailer.module.css";
import * as H from "./Hooks";
import {fadeIn} from "afile";
import {closer,loadinganim} from "assets";


export default function Trailer(props){
    const {parent,id,type,ref=useRef("trailer")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.trailer}" style="${styles.trailer}"></div>`);
    const trailer=parent.querySelector(`#${ref}`);

    trailer.innerHTML=`
        <div class="${css.blur}"></div>
        <img id="closebtn" alt="X" src="${closer}"/>
        <img id="loading" class="${css.loading}" alt="loading" src="${loadinganim}" style="${styles.loading}"/>
    `;

    const loading=trailer.querySelector("#loading");
    loading.style.display="block";
    H.useTrailer({id,type},(video)=>{
        loading.remove();
        if(video){
            trailer.insertAdjacentHTML("beforeend",`<iframe src="https://www.youtube.com/embed/${video.key}"></iframe>`);
        }
        else{
            trailer.insertAdjacentHTML("beforeend",`<p>Sorry trailer unavailable</p>`);
        }
        fadeIn(trailer,"flex",1);
    })

    trailer.querySelector("#closebtn").onclick=()=>{trailer.remove()};
}

const styles={
    trailer:`
        display:none;
    `,
    loading:`
        display:none;
    `,
}