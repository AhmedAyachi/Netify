import {useRef} from "vanilla";
import css from "./Shows.module.css";
import {Header,MovieList} from "components";


export default function Shows(props){
    const {parent,state}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.shows} activeroute"></div>`);
    const shows=parent.querySelector(`.${css.shows}`);

    const refs={
        showlist:useRef("showlist"),
        searcher:useRef("searcher"),
    }
    Header({parent:shows,refs});
    MovieList({parent:shows,refs});
    
}