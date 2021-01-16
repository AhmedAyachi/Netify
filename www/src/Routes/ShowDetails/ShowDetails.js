import {} from "vanilla";
import css from "./ShowDetails.module.css";
import {ShowSlide,ShowList,ShowProber,BackButton,Loader} from "components";
import {Show} from "estate";
import * as H from "./Hooks";


export default function ShowDetails(props){
    const {parent,ref="showdetails",show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showdetails}"></div>`);
    const showdetails=parent.querySelector(`#${ref}.${css.showdetails}`);

    console.log(props);
    showdetails.innerHTML=` 
    `;
    const loader=Loader({style:"position:fixed;"});
    if(show){
        H.useDetails(show,({details,recos})=>{
            loader.remove();
            ShowSlide({parent:showdetails,show:details});
            recos&&recos.length&&ShowList({parent:showdetails,data:{title:"Recommendations",shows:recos},style:"margin:1rem 0;"});
            ShowProber({parent:showdetails,show:details});
            BackButton();
        });
    }
}
