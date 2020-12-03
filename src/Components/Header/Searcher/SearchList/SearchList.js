import {map,useRef} from "vanilla";
import css from "./SearchList.module.css";


export default function SearchList(props){
    const {parent,ref=useRef("searchlist"),input}=props;
    input.onfocus=()=>{
        parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchlist}"></div>`);
        const searchlist=parent.querySelector(`#${ref}`);
        searchlist.innerHTML=`
        ${map(store.show.searchvalues,value=>`
            <p>${value}</p>
        `)}
    `;
    }
    input.onblur=()=>{parent.querySelector(`#${ref}`).remove()};
    input.onkeyup=()=>{
        const searchlist=parent.querySelector(`#${ref}`);
        const values=store.show.searchvalues.filter(value=>value.includes(input.value.trim()));
        searchlist.innerHTML=`
            ${map(values,value=>`
                <p>${value}</p>`
            )}
        `;
    }
}

const styles={
    searchlist:`
        display:none;
    `,
};