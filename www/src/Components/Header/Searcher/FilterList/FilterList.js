import {map,useRef} from "vanilla";
import css from "./FilterList.module.css";
import {RateStars} from "components";
import genresdata from "./Genres.json";


export default function FilterList(props){
    const {parent,ref=useRef("filterlist"),onFilter,header}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.filterlist}" style="${styles.filterlist}"></div>`);
    const filterlist=parent.querySelector(`#${ref}`);
    const state=filterlist.state={
        showselection:null,
        params:{
            type:"tvmovie",
            rate:0,
            genres:[],
        },
    };

    filterlist.innerHTML=`
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
                <div class="${css.col5}">${getGenresTable()}</div>
            </li>
        </ul>
    `;
    const ratestars=RateStars({
        parent:filterlist.querySelector(`#rate .${css.col3}`),
        style:styles.ratestars,
        editable:true,
        rate:3/5,
        onChange:({rate})=>{state.params.rate=rate},
    });


    filterlist.querySelectorAll("#show label[for]").forEach((label)=>{
        Object.assign(label,{active:false,value:label.id});
        label.onclick=()=>{optShowType(label,state)};
    });
    filterlist.querySelectorAll(`table.${css.categories} td`).forEach((td,i)=>{
        Object.assign(td,{active:false,value:genresdata.genres[i]});
        td.onclick=()=>{optGenre(td,state)};
    })
    filterlist.querySelectorAll("label,img,td").forEach(element=>{
        element.addEventListener("click",()=>{
            onFilter&&onFilter(state.params);
        });
    });
    header.resetFilter=()=>{
        state.params={type:"tvmovie",rate:0,genres:[]};
        filterlist.querySelectorAll(`.${css.active}`).forEach(element=>{
            element.active=false;
            element.className="";
        });
        ratestars.reset();
    }

    return filterlist;
}

const styles={
    filterlist:`
        display:none;
    `,
    ratestars:`
        display:inline-block;
    `,
}

const getGenresTable=()=>{
    const genres=genresdata.genres;
    const colsnumber=window.innerWidth>566.929?4:3;
    const rowsnumber=genres.length/colsnumber;
    let str=`<table class="${css.categories}">`;
    for(let i=0;i<rowsnumber;i++){
        str+=`<tr>${map(genres,(genre,j)=>(i*colsnumber)<=j&&j<(colsnumber*(i+1))?`<td>${genre.name}</td>`:"")}</tr>`;
    }
    str+="</table>"
    return str;
}

const optShowType=(label,state)=>{
    const {showselection}=state;
    if(showselection&&showselection.value!==label.value){
        showselection.active=false;
        showselection.className="";
    }
    label.active=!label.active;
    if(label.active){
        label.className=css.active;
        state.showselection=label;
        state.params.type=label.value;
    }
    else{
        label.className="";
        state.showselection=null;
        state.params.type="tvmovie";  
    }
}

const optGenre=(td,state)=>{
    const {genres}=state.params;
    td.active=!td.active;
    if(td.active){
        genres.push(td.value.id);
        td.className=css.active;
    }
    else{
        genres.splice(genres.indexOf(td.value.id),1);
        td.className="";
    }
}
