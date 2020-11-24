import {map,useRef} from "vanilla";
import css from "./Searcher.module.css";
import {filtericon} from "assets";
import {ShowCard} from "components";
import {Show} from "estate";
import {addSearchValue,setSearched,loadShowsByTitle} from "actions";


export default function Searcher(props){
    const {parent,refs,ref=refs.searcher||useRef("searcher")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searcher}"></div>`);
    const searcher=parent.querySelector(`#${ref}`);

    searcher.innerHTML=`
        <input list="values" placeholder="Search for a movie" type="text"/>
        <img alt="" src="${filtericon}"/>
        <datalist id="values"></datalist>
    `;
    const input=searcher.querySelector("input");
    const datalist=searcher.querySelector("datalist");
 
    input.onkeyup=()=>{
        const values=store.show.searchvalues;
        datalist.innerHTML=`
            ${map(values,value=>`<option value="${value}"/>`)}
        `;
    }
    input.onchange=()=>{
        const showslist=document.getElementById(refs.showslist);
        const showslistRow1=showslist.querySelector("#row1");
        const value=input.value.toLowerCase().trim();
        showslistRow1.innerHTML="";
        if(value){
            addSearchValue(value);
            const loading=showslist.querySelector("#loading");
            loading.style.display="block";
            loadShowsByTitle(value,(shows)=>{
                if(shows.length){
                    shows.forEach(show=>{
                        ShowCard({parent:showslistRow1,show});
                    });
                }
                else{
                    showslistRow1.innerHTML=`<p style="${styles.noresults}">No results</p>`;
                }
                loading.style.display="none";
                setSearched(shows);
            })
        }
        else{
            const shows=store.show.shows;
            if(shows&&shows.length){
                shows.forEach(show=>{
                    ShowCard({parent:showslistRow1,show});
                });
            }
        }
    };

}

const styles={
    noresults:`
        color:#cf0909;
        font-weight:bold;
    `,
}