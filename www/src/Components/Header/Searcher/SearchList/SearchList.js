import {useRef} from "vanilla";
import css from "./SearchList.module.css";
import SearchOption from "./SearchOption/SearchOption";
import {fadeIn,fadeOut} from "afile";
import * as H from "./Hooks";


export default function SearchList(props){
    const {parent,ref=useRef("searchlist"),inputfield,filter}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchlist}" style="${styles.searchlist}"></div>`);
    const searchlist=parent.querySelector(`#${ref}`);
    const state={
        search:null,
    }
    
    H.useSearch((history)=>{state.search=history});

    inputfield.onfocus=()=>{
        searchlist.innerHTML="";
        state.search&&state.search.forEach(value=>{
            SearchOption({parent:searchlist,value,inputfield});
        }); 
        if(filter.style.display==="none"){
            fadeIn(searchlist);
        }
        else{
            fadeOut(filter);
            setTimeout(()=>{fadeIn(searchlist)},200);
        }
    }
    inputfield.onblur=()=>{
        fadeOut(searchlist);
    };
    inputfield.onkeyup=()=>{
        const {search}=state;
        const values=search&&search.filter(value=>value.includes(inputfield.value.trim()));
        searchlist.innerHTML="";
        values.forEach(value=>{
            SearchOption({parent:searchlist,value,inputfield});
        });
    }

    searchlist.add=(value)=>{
        if(value&&!state.search.includes(value)){
            value=value.trim();
            state.search.unshift(value);
        }
    }
    searchlist.delete=(value)=>{
        if(value){
            value=value.trim();
            const index=state.search.indexOf(value);
            state.search.splice(index,1);
        }
    }

    return searchlist;
}

const styles={
    searchlist:`
        display:none;
    `,
};