import {useRef} from "vanilla";
import css from "./SearchList.module.css";
import SearchOption from "./SearchOption/SearchOption";
import {fadeIn,fadeOut} from "afile";


export default function SearchList(props){
    const {parent,ref=useRef("searchlist"),inputfield}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchlist}" style="${styles.searchlist}"></div>`);
    const searchlist=parent.querySelector(`#${ref}`);
    
    const showState=store.show;
    inputfield.onfocus=()=>{
        searchlist.innerHTML="";
        showState.searchvalues.forEach(value=>{
            SearchOption({parent:searchlist,value,inputfield});
        }); 
        fadeIn(searchlist);
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