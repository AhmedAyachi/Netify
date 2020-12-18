import {useRef} from "vanilla";
import css from "./Header.module.css";
import {netflixlogo,img27} from "assets";
import Searcher from "./Searcher/Searcher";


export default function Header(props){
    const {parent,ref=useRef("header")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.header}"></div>`);
    const header=parent.querySelector(`#${ref}`);

    header.innerHTML=`
        <div class="${css.background}" style="${styles.background}"></div>
        <div class="${css.row0}">
            <img class="${css.logo}" alt="Netlix" src="${netflixlogo}"/>
        </div>
    `;
    const row0=header.querySelector(`.${css.row0}`);
    Searcher({parent:row0,ref:props.searcherRef});
    row0.insertAdjacentHTML("beforeend",`
        
    `);
}

const styles={
    background:`
        background-image:url('${img27}');
    `,
}