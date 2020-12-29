import {useRef} from "vanilla";
import css from "./Shows.module.css";
import {Header,ShowsList,Navigator,UpButton} from "components";
import {loadSearch,loadWatchList} from "actions";


export default function Shows(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.shows}" style="${styles.shows}"></div>`);
    const shows=parent.querySelector(`.${css.shows}`);
    const refs={
        searcher:useRef("searcher"),
    }

    Header({parent:shows,searcherRef:refs.searcher});
    ShowsList({parent:shows,searcherRef:refs.searcher});
    UpButton();
    
    if(!store.elements.navigator){
        Navigator({parent:app});
    }
}

const styles={
    shows:`
        padding-top:${cordova.platformId!=="browser"?"2rem":"0"};
    `,
}