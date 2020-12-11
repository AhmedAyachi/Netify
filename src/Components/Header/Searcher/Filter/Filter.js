import {map,useRef} from "vanilla";
import css from "./Filter.module.css";
import {RateStars,ShowCard} from "components";
import genresdata from "./Genres.json";


export default function Filter(props){
    const {parent,ref=useRef("filter")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.filter}" style="${styles.filter}"></div>`);
    const filter=parent.querySelector(`#${ref}`);
    const state=filter.state={
        showselection:null,
        filterparams:{
            type:"tvmovie",
            rate:0,
            genres:[],
        },
    };
    store.show.filter=state.filterparams;

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
                <div class="${css.col4}">Genres :</div>
                <div class="${css.col5}">${getCategoriesTable()}</div>
            </li>
        </ul>
    `;
    RateStars({
        parent:filter.querySelector(`#rate .${css.col3}`),
        style:styles.ratestars,
        editable:true,
        state:state.filter,
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
            state.filterparams.type=label.active?label.value:"tvmovie";
        }
    });
    filter.querySelectorAll(`table.${css.categories} td`).forEach((td,i)=>{
        td.active=false;
        td.value=genresdata.genres[i];
        const {filterparams:{genres}}=state;
        td.onclick=()=>{
            td.active=!td.active;
            if(td.active){
                genres.push(td.value.id);
                Object.assign(td.style,{color:"#cc0000",textDecoration:"underline"});
            }
            else{
                genres.splice(genres.indexOf(td.value.id),1);
                Object.assign(td.style,{color:"white",textDecoration:"none"});
            }
        }
    })
    filter.querySelectorAll("label,img,td").forEach(element=>{
        element.addEventListener("click",()=>{
            const {elements:{showslist},show:{shows}}=store;
            const {filterparams}=state;
            const showslistRow1=showslist.querySelector("#row1");
            showslistRow1.innerHTML="";
            shows.filter(show=>
                show.vote_average>=filterparams.rate &&
                filterparams.type.includes(show.type) &&
                show.genre_ids.filter(id=>filterparams.genres.includes(id)).length
                ).forEach(show=>{
                    ShowCard({parent:showslistRow1,show});
                }
            );
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

const getCategoriesTable=()=>{
    const genres=genresdata.genres;
    const colsnumber=window.innerWidth>944.88200880403?4:3;
    const rowsnumber=genres.length/colsnumber;
    let str=`<table class="${css.categories}">`;
    for(let i=0;i<rowsnumber;i++){
        str+=`<tr>${map(genres,(genre,j)=>(i*colsnumber)<=j&&j<(colsnumber*(i+1))?`<td>${genre.name}</td>`:"")}</tr>`;
    }
    str+="</table>"
    return str;
}