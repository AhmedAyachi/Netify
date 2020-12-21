import {useRef} from "vanilla";
import css from "./CreditSection.module.css";
import CastSlide from "./CastSlide/CastSlide";
import {loadinganim} from "assets";
import * as H from "./Hooks";


export default function CreditSection(props){
    const {parent,ref=useRef("creditsection"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.creditsection}"></div>`);
    const creditsection=parent.querySelector(`#${ref}`);

    creditsection.innerHTML=`
        <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
    `;
    H.useCredits(show,credits=>{
        const crews=credits.crew;
        creditsection.querySelector("#loading").remove();
        CastSlide({parent:creditsection,title:"Cast",casts:credits.cast});
        if(show.created_by&&show.created_by.length){
            CastSlide({parent:creditsection,title:"Created by",casts:show.created_by});
        }
    });
    
    //console.log(crews);
}

const styles={
    loading:`
        display:block;
        max-width:3rem;
        margin:1rem auto;
    `,
};