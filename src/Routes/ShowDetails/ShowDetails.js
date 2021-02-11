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
    const row0=showdetails.querySelector(`.${css.row0}`),row1=showdetails.querySelector(`.${css.row1}`);

    if(typeid){
        const showref={
            type:getType(typeid),
            id:parseInt(typeid.substring(1)),
        };
        if(showref.type&&showref.id){
            const loader=Loader({style:"position:fixed;"});
            H.useDetails(showref,({details,recos})=>{
                loader.remove();
                ShowSlide({parent:row0,style:"height:90%;",show:details});
                recos&&recos.length&&ShowList({
                    parent:row0,
                    data:{title:"Recommendations",shows:recos},
                    style:styles.recolist,
                });
                ShowProber({parent:row1,show:details});
                BackButton();
            });
        }
        else{
            history.back();
        }
    }
}

const styles={
    recolist:`
        max-width:100%;
        margin-top:1rem;
        margin-bottom:5rem;
    `,
}

const getType=(typeid)=>{
    let type=typeid[0];
    switch(type){
        case "m":type="movie";break;
        case "t":type="tv";break;
        default:type=null;
    }
    return type;
}
