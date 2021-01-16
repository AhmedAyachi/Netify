import {} from "vanilla";
import css from "./ShowDetails.module.css";
import {ShowSlide,ShowList,ShowProber,BackButton,Loader} from "components";
import {Show} from "estate";
import * as H from "./Hooks";


export default function ShowDetails(props){
    const {parent,ref="showdetails",typeid=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showdetails}"></div>`);
    const showdetails=parent.querySelector(`#${ref}.${css.showdetails}`);

    showdetails.innerHTML=` 
    `;
    const loader=Loader({style:"position:fixed;"});
    if(typeid){
        const showid={
            type:typeid.startsWith("m")?"movie":"tv",
            id:typeid.substring(1),
        };
        H.useDetails(showid,({details,recos})=>{
            loader.remove();
            ShowSlide({parent:showdetails,show:details});
            recos&&recos.length&&ShowList({parent:showdetails,data:{title:"Recommendations",shows:recos},style:"margin:1rem 0;"});
            ShowProber({parent:showdetails,show:details});
            BackButton();
        });
    }
}
