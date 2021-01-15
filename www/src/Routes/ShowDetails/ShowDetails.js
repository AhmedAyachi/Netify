import {} from "vanilla";
import css from "./ShowDetails.module.css";
import {ShowSlide,ShowProber,ShowAlikes,BackButton,Loader} from "components";
import {Show} from "estate";
import * as H from "./Hooks";


export default function ShowDetails(props){
    const {parent,ref="showdetails",show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showdetails}"></div>`);
    const showdetails=parent.querySelector(`#${ref}.${css.showdetails}`);

    showdetails.innerHTML=`
        
    `;
    const loader=Loader({style:"position:fixed;"});
    if(show){
        H.useDetails(show,(details)=>{
            loader.remove();
            const show=new Show(details);
            ShowSlide({parent:showdetails,show});
            ShowAlikes({parent:showdetails,show});
            ShowProber({parent:showdetails,show});
            BackButton();
        });
    }
}
