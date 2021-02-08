import {useRef} from "vanilla";
import css from "./SearchList.module.css";
import SearchOption from "./SearchOption/SearchOption";
import {fadeIn,fadeOut,clean} from "afile";
import * as H from "./Hooks";


export default function SearchList(props){
    const {parent,ref=useRef("searchlist"),inputfield,filterlist,onSearch}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchlist}" style="${styles.searchlist}"></div>`);
    const searchlist=parent.querySelector(`#${ref}`);
    const state={
        search:null,
    }
    
    searchlist.innerHTML=`
    `;

    H.useSearch((history)=>{
        state.search=history;
        state.search&&state.search.forEach(value=>{
            SearchOption({parent:searchlist,value,inputfield,onSearch});
        });
    });

    inputfield.onfocus=()=>{
        searchlist.innerHTML="";
        state.search&&state.search.forEach(value=>{
            SearchOption({parent:searchlist,value,inputfield,onSearch});
        }); 
        if(filterlist.style.display==="none"){
            fadeIn(searchlist);
        }
        else{
            fadeOut(filterlist);
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
            SearchOption({parent:searchlist,value,inputfield,onSearch});
        });
    }

    searchlist.add=(value)=>{
        value=value.trim();
        if(value&&!state.search.includes(value)){
            state.search.unshift(value);
            H.saveSearch(state.search||"");
        }
    }
    searchlist.delete=(value)=>{
        if(value){
            value=value.trim();
            const index=state.search.indexOf(value);
            state.search.splice(index,1);
            H.saveSearch(state.search||"");
        }
    }

    return searchlist;
}

const styles={
    searchlist:`
        display:none;
    `,
};