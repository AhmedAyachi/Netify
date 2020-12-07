import {map,useRef} from "vanilla";
import css from "./Filter.module.css";
import {RateStars} from "components";


export default function Filter(props){
    const {parent,ref=useRef("filter")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.filter}" style="${styles.filter}"></div>`);
    const filter=parent.querySelector(`#${ref}`);

    filter.innerHTML=`
        <ul class="${css.list}">
            <li id="show">
                <label>Show :</label>
                <label for="show">Movie</label>
                <label for="show">Tv Show</label>
            </li>
            <li id="rate">Rate :</li>
            <li id="category" style="flex-direction:column;">
                <div id="row0">Categories</div>
                <div id="row1">
                    ${getCategoriesTable(categories)}
                </div>
            </li>
        </ul>
    `;
    RateStars({parent:filter.querySelector("#rate"),rate:10,style:styles.ratestars});
    filter.querySelectorAll("#show label[for]").forEach((label,index,labels)=>{
        label.value=false;
        label.onclick=()=>{
            label.value=!label.value;
            label.style.color=label.value?"#cc0000":"white";
            label.style.borderBottom=label.value?"2px solid #cc0000":"none";
        }
    });
}

const styles={
    filter:`
        display:none;
    `,
    ratestars:`
        display:inline-block;
    `,
}

const categories=["Action","Adventure","Comedy","Crime","Drama","Fantasy","Historical","Horror","Mystery","Fiction","Thriller","Cartoon"];

const getCategoriesTable=()=>{
    let str=`<table class="${css.categories}">`;
    for(let i=0;i<4;i++){
        str+="<tr>"
        str+=map(categories,(category,j)=>(i*3)<=j&&j<(3*(i+1))?`<td>${category}</td>`:"");
        str+="</tr>"
    }
    str+="</table>"
    return str;
}