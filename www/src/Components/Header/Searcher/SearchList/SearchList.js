import {useRef} from "vanilla";
import css from "./SearchList.module.css";
import SearchOption from "./SearchOption/SearchOption";
import {fadeIn,fadeOut} from "afile";


export default function SearchList(props){
    const {parent,ref=useRef("searchlist"),inputfield,filterRef}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchlist}" style="${styles.searchlist}"></div>`);
    const searchlist=parent.querySelector(`#${ref}`);
    
    const showState=store.show;
    inputfield.onfocus=()=>{
        searchlist.innerHTML="";
        showState.searchvalues.forEach(value=>{
            SearchOption({parent:searchlist,value,inputfield});
        }); 
        const filter=parent.querySelector(`#${filterRef}`);
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
        const values=showState.searchvalues.filter(value=>value.includes(inputfield.value.trim()));
        searchlist.innerHTML="";
        values.forEach(value=>{
            SearchOption({parent:searchlist,value,inputfield});
        });
    }
}

const styles={
    searchlist:`
        display:none;
    `,
};