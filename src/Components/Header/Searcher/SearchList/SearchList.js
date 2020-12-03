import {map,useRef} from "vanilla";
import css from "./SearchList.module.css";
import SearchOption from "./SearchOption/SearchOption";


export default function SearchList(props){
    const {parent,ref=useRef("searchlist"),input}=props;
    input.onfocus=()=>{
        parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchlist}"></div>`);
        const searchlist=parent.querySelector(`#${ref}`);
        searchlist.innerHTML="";
        store.show.searchvalues.forEach(value=>{
            SearchOption({parent:searchlist,value});
        });
    }
    input.onblur=()=>{
        parent.querySelector(`#${ref}`).remove();
    };
    input.onkeyup=()=>{
        const searchlist=parent.querySelector(`#${ref}`);
        const showState=store.show;
        const values=showState.searchvalues.filter(value=>value.includes(input.value.trim()));
        searchlist.innerHTML="";
        values.forEach(value=>{
            SearchOption({parent:searchlist,value});
        });
    }
}

const styles={
    searchlist:`
        display:none;
    `,
};