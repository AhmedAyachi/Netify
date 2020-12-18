import {} from "vanilla";
import css from "./ShowDetails.module.css";
import {DetailsCard,CreditsCard} from "components";
import {Show} from "estate";
import * as H from "./Hooks";
import {loadinganim} from "assets";


export default function ShowDetails(props){
    const {parent,ref="showdetails",state}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showdetails}"></div>`);
    const showdetails=parent.querySelector(`#${ref}.${css.showdetails}`);

    const {show}=state;
    showdetails.innerHTML=`
        <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
    `;
    
    const loading=showdetails.querySelector("#loading");
    H.useCreditsAndDetails(show,({details,credits})=>{
        DetailsCard({
            parent:showdetails,
            show:new Show(details),
        });
        CreditsCard({parent:showdetails,credits});
        loading.style.display="none";
    });
}

const styles={
    loading:`
        display:block;
        max-width:5rem;
        margin:5rem auto;
    `,
};
