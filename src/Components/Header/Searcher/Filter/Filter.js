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
                <div class="${css.col0}">
                    <label>Show :</label>
                </div>
                <div class="${css.col1}">
                    <label for="show">Movie</label>
                    <label for="show">Tv Show</label>
                </div>
            </li>
            <li id="rate">
                <div class="${css.col2}">Rate :</div>
                <div class="${css.col3}"></div>
            </li>
            <li class="${css.category}">
                <div class="${css.col4}">Categories :</div>
                <div class="${css.col5}">${getCategoriesTable(categories)}</div>
            </li>
        </ul>
    `;
    RateStars({
        parent:filter.querySelector(`#rate .${css.col3}`),
        style:styles.ratestars,
        editable:true,
    });
    filter.querySelectorAll("#show label[for]").forEach((label)=>{
        label.active=false;
        label.onclick=()=>{
            label.active=!label.active;
            label.style.color=label.active?"#cc0000":"white";
            label.style.textDecoration=label.active?"underline":"none";
        }
    });
    filter.querySelectorAll(`table.${css.categories} td`).forEach((td)=>{
        td.active=false;
        td.onclick=()=>{
            td.active=!td.active;
            td.style.color=td.active?"#cc0000":"white";
            td.style.textDecoration=td.active?"underline":"none";
        }
    })

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
        str+=`<tr>${map(categories,(category,j)=>(i*3)<=j&&j<(3*(i+1))?`<td>${category}</td>`:"")}</tr>`;
    }
    str+="</table>"
    return str;
}