import {useRef} from "vanilla";
import css from "./GenreShows.module.css";
import data from "../Home/Discover/Genres.json";
import{ShowCard,BackButton,ShowGrid,Loader} from "components";
import {useShowsByGenre} from "../Home/Discover/Hooks";


export default function GenreShows(props){
    const {parent,ref=useRef("genreshows"),id}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.genreshows}" style="${styles.genreshows}"></div>`);
    const genreshows=parent.querySelector(`#${ref}`);
    const genreid=id.replace("_",","),state={
        page:1,
        genre:data.genres.find(genre=>genre.id===genreid)||{},
    }; 

    const {title,shows}=state.genre;
    genreshows.innerHTML=`
        <h3 class="${css.title}">${title}</h3>
        <div class="${css.row0}"></div>
    `;
    BackButton({style:styles.backbutton});
    const row0=genreshows.querySelector(`.${css.row0}`);
    const loader=Loader({parent:row0,style:"position:fixed;"});
    
    setTimeout(()=>{
        loader.remove();
        ShowGrid({
            parent:row0,shows,
            onMounted:(showgrid)=>{onGridMounted(showgrid,state)},
            onBottom:(showgrid)=>{onToBottomSroll(showgrid,state)},
        });
    },1000);

}

const styles={
    genreshows:`
        padding-top:${cordova.platformId!=="browser"?"2.5rem":"0"};
    `,
    backbutton:`
        position:fixed;
        background-color:#0f0f0f;
    `,
};

const onGridMounted=(showgrid,state)=>{
    const {innerHeight}=window,{offsetHeight}=document.body;
    if(offsetHeight<=innerHeight){
        onToBottomSroll(showgrid,state,()=>{onGridMounted(showgrid,state)});
    }
}

const onToBottomSroll=(showgrid,state,then)=>{
    if(state.page<500){
        const loader=Loader({parent:showgrid,style:"position:relative;margin:5px;"});
        state.page++;
        useShowsByGenre({id:state.genre.id,page:state.page},(shows)=>{
            loader.remove();
            shows&&shows.length&&shows.forEach(show=>{ShowCard({parent:showgrid,show})});
            showgrid.setScroll();
            then&&then();
        });
    }
}
