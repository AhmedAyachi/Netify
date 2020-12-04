import {useRef} from "vanilla";
import css from "./Shows.module.css";
import {Header,ShowsList} from "components";


export default function Shows(props){
    const {parent,state}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.shows} activeroute"></div>`);
    const shows=parent.querySelector(`.${css.shows}`);
    const refs={
        searcher:useRef("searcher"),
    }

    Header({parent:shows,searcherRef:refs.searcher});
    ShowsList({parent:shows,searcherRef:refs.searcher});
    
}