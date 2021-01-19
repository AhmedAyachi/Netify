import {} from "vanilla";
import css from "./ShowDetails.module.css";
import {ShowSlide,ShowList,ShowProber,BackButton,Loader} from "components";
import * as H from "./Hooks";


export default function ShowDetails(props){
    const {parent,ref="showdetails",typeid=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showdetails}"></div>`);
    const showdetails=parent.querySelector(`#${ref}.${css.showdetails}`);

    showdetails.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}"></div>
    `;
    const loader=Loader({style:"position:fixed;"});
    const row0=showdetails.querySelector(`.${css.row0}`),row1=showdetails.querySelector(`.${css.row1}`);

    if(typeid){
        const showid={
            type:typeid.startsWith("m")?"movie":"tv",
            id:parseInt(typeid.substring(1)),
        };
        H.useDetails(showid,({details,recos})=>{
            loader.remove();
            ShowSlide({parent:row0,style:"height:90%;",show:details});
            recos&&recos.length&&ShowList({
                parent:row0,
                data:{title:"Recommendations",shows:recos},
                style:`
                    max-width:100%;
                    margin-top:1rem;
                    margin-bottom:5rem;
                `,
            });
            ShowProber({parent:row1,show:details});
            BackButton();
        });
    }
}
