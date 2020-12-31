import {} from "vanilla";
import css from "./Find.module.css";
import {Header,ShowCard,Loader} from "components";
import {liquid0} from "assets";
import {setSearchValue} from "actions";
import * as H from "./Hooks";


export default function Find(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="find" class="${css.find}" style="${styles.find}"></div>`);
    const find=parent.querySelector(`#find.${css.find}`);
    const state=find.state={
        shows:null,
    }

    find.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            <img alt="" class="${css.searchicon}" src="${liquid0}"/>
        </div>
    `;
    const header=Header({
        parent:find.querySelector(`.${css.row0}`),
        onFilter:(filter)=>{filterShows(filter,find)},
        onSearch:(input)=>{
            setSearchValue(input.value);
            header.resetFilter();
            findShows(input.value,find);
        },
    });
    const showStore=store.show,{searchvalue}=showStore;
    if(searchvalue){
        header.input.value=searchvalue;
        findShows(searchvalue,find);
    }
}

const styles={
    find:`
        padding-top:${cordova.platformId!=="browser"?"2.5rem":"0"};
    `,
};


const findShows=(value,find)=>{
    const row1=find.querySelector(`.${css.row1}`);
    row1.innerHTML="";
    const loader=Loader({parent:row1});
    H.useTitle(value.trim(),shows=>{
        find.state.shows=shows&&shows.length?shows:null;
        loader.remove();
        setShowsCards(shows,row1);
    });
}

export const filterShows=(filter,find)=>{
    const row1=find.querySelector(`.${css.row1}`);
    row1.innerHTML="";
    const {shows}=find.state,{type,rate,genres}=filter;
    const filtered=shows?shows.filter(show=>
        show.vote_average>=rate &&
        type.includes(show.type) &&
        genres.every(id=>show.genre_ids.includes(id))
    ):null;
    setShowsCards(filtered,row1);
}

const setShowsCards=(shows,container)=>{
    if(shows&&shows.length){
        shows.forEach(show=>{
            ShowCard({parent:container,show});
        });
    }
    else{
        container.innerHTML=`<img alt="" class="${css.searchicon}" src="${liquid0}"/>`;
    }
}