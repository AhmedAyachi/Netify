import {useRef} from "vanilla";
import css from "./Shows.module.css";
import {Header,ShowsList,Navigator} from "components";
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
    
    if(!store.elements.navigator){
        Navigator({parent:app});
    }

    const showStore=store.show;
    if(!showStore.searchvalues){
        loadSearch();
    }
    if(!showStore.watchlist){
        loadWatchList();
    }
}

const styles={
    shows:`
        padding-top:${cordova.platformId!=="browser"?"2rem":"0"};
    `,
}