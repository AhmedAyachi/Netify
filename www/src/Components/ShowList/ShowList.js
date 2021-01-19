import {useRef} from "vanilla";
import css from "./ShowList.module.css";
import {ShowCard} from "components";


export default function ShowList(props){
    const {parent,ref=useRef("showlist"),data,withMore=false,style=""}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showlist}" style="${style}"></div>`);
    const showlist=parent.querySelector(`#${ref}`);

    showlist.innerHTML=`
        <div class="${css.row0}">${data.title}</div>
        <div class="${css.row1}">
            <div class="${css.col0}"></div>
            ${withMore?`<div class="${css.col1}"></div>`:""}
        </div>
    `;
    const col0=showlist.querySelector(`.${css.col0}`),{shows}=data;
    if(shows&&shows.length){
        shows.forEach(show=>{ShowCard({parent:col0,show})});
        if(withMore){
            const col1=showlist.querySelector(`.${css.col1}`);
            col1.innerHTML="More";
            col1.onclick=()=>{
                history.push(`#genres#${data.id.replace(",","_")}`);
            }
        }
    }

    return showlist;
}