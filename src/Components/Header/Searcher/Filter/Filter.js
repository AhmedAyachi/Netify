import {map,useRef} from "vanilla";
import css from "./Filter.module.css";
import {RateStars,ShowCard} from "components";


export default function Filter(props){
    const {parent,ref=useRef("filter")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.filter}" style="${styles.filter}"></div>`);
    const filter=parent.querySelector(`#${ref}`);
    const state=filter.state={
        showselection:null,
        rate:0,
        categories:[],
    }

    filter.innerHTML=`
        <ul class="${css.list}">
            <li id="show">
                <div class="${css.col0}">
                    <label>Show :</label>
                </div>
                <div class="${css.col1}">
                    <label id="movie" for="show">Movie</label>
                    <label id="tv" for="show">Tv Show</label>
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
        state,
    });


    filter.querySelectorAll("#show label[for]").forEach((label)=>{
        Object.assign(label,{
            active:false,
            value:label.id,
        });
        label.onclick=()=>{
            const showselection=state.showselection;
            if(showselection&&showselection.value!==label.value){
                showselection.active=false;
                Object.assign(showselection.style,{
                    color:"white",
                    textDecoration:"none",
                });
            }
            state.showselection=label;
            label.active=!label.active;
            label.style.color=label.active?"#cc0000":"white";
            label.style.textDecoration=label.active?"underline":"none";
        }
    });
    filter.querySelectorAll(`table.${css.categories} td`).forEach((td,i)=>{
        td.active=false;
        td.value=categories[i];
        td.onclick=()=>{
            td.active=!td.active;
            if(td.active){
                state.categories.push(td.value);
            }
            else{
                state.categories.splice(state.categories.indexOf(td.value),1);
            }
            td.style.color=td.active?"#cc0000":"white";
            td.style.textDecoration=td.active?"underline":"none";
        }
    })
    filter.querySelectorAll("label,img,td").forEach(element=>{
        element.addEventListener("click",()=>{
            const {elements:{showslist},show:{shows}}=store;
            const showslistRow1=showslist.querySelector("#row1");
            showslistRow1.innerHTML="";
            shows.filter(show=>show.vote_average>=state.rate).forEach(show=>{
                ShowCard({parent:showslistRow1,show});
            });
        });
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
        str+=`<tr>${map(categories,(category,j)=>(i*3)<=j&&j<(3*(i+1))?`<td>${category}</td>`:"")}</tr>`;
    }
    str+="</table>"
    return str;
}