import {useRef} from "vanilla";
import css from "./Trailer.module.css";
import {fadeIn} from "afile";
import {closer} from "assets";
import {apikey} from "estate";


export default function Trailer(props){
    const {parent,id,ref=useRef("trailer")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.trailer}" style="${styles.trailer}"></div>`);
    const trailer=parent.querySelector(`#${ref}`);

    trailer.innerHTML=`
        <div class="${css.blur}"></div>
        <img id="closebtn" alt="X" src="${closer}"/>
        <iframe src=""></iframe>
    `;

    const iframe=trailer.querySelector("iframe");
    useTrailer(id,(video)=>{
        iframe.setAttribute("src",`https://www.youtube.com/embed/${video.key}`);
        fadeIn(trailer,"flex",1);
    })

    trailer.querySelector("#closebtn").onclick=()=>{trailer.remove()};

     
}

const styles={
    trailer:`
        display:none;
    `,
}

const useTrailer=(id,then)=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=en-US`).
    then(response=>response.json()).
    then(data=>data.results).
    then(videos=>{
        const video=videos.find(video=>video.type==="Trailer");
        then(video);
    });
}