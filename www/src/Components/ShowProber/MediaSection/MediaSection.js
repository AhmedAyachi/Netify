import {useRef} from "vanilla";
import css from "./MediaSection.module.css";
import {loadinganim} from "assets";
import ImageGrid from "./ImageGrid/ImageGrid";
import * as H from "./Hooks";


export default function MediaSection(props){
    const {parent,ref=useRef("mediasection"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.mediasection}"></div>`);
    const mediasection=parent.querySelector(`#${ref}`);

    mediasection.innerHTML=`
        <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
        <div class="${css.row0}"></div>
    `;

    
    H.useImages(show,images=>{
        const row0=mediasection.querySelector(`.${css.row0}`);
        mediasection.querySelector("#loading").remove();
        ImageGrid({parent:row0,title:"Posters",images});
    });
}

const styles={
    loading:`
        display:block;
        max-width:3rem;
        margin:1rem auto;
    `,
};

//https://www.themoviedb.org/video/play?key=yzXglr5bc3w