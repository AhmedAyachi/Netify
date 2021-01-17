import {useRef} from "vanilla";
import css from "./SocialSection.module.css";
import {Loader} from "components";
import Review from "./Review/Review";
import * as H from "./Hooks";


export default function SocialSection(props){
    const {parent,ref=useRef("socialsection"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.socialsection}"></div>`);
    const socialsection=parent.querySelector(`#${ref}`);

    socialsection.innerHTML=`
        <div class="${css.row0}">
            <div class="${css.row1}"></div>
            <div class="${css.row2}"></div>
        </div>
    `;
    const loader=Loader({parent:socialsection,style:"position:static;"});

    const row1=socialsection.querySelector(`.${css.row1}`),row2=socialsection.querySelector(`.${css.row2}`);
    H.useSocial(show,reviews=>{
        loader.remove();
        if(reviews&&reviews.length){
            row1.innerHTML="Reviews";
            reviews.forEach(review=>{
                Review({parent:row2,data:review});
            });
        }
        else{
            row1.innerHTML=`<span class="${css.noreviews}">No reviews yet</span>`;
        }
    });
    
    return socialsection;
}