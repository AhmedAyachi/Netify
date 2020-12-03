import {useRef} from "vanilla";
import css from "./SearchList.module.css";


export default function SearchList(props){
    const {parent,ref=useRef("searchlist")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.searchlist}" style="${styles.searchlist}"></div>`);
    const searchlist=parent.querySelector(`#${ref}`);

    searchlist.innerHTML=`
        ${map(store.show.searchvalues,value=>`
            <p>${value}</p>
        `)}
    `;
}

const styles={
    searchlist:`
        display:none;
    `,
};