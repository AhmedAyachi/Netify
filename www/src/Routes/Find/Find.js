import {} from "vanilla";
import css from "./Find.module.css";
import {Header,ShowCard,Loader} from "components";
import {applogo} from "assets";
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
            <img alt="" class="${css.applogo}" src="${applogo}"/>
        </div>
    `;
    const row1=find.querySelector(`.${css.row1}`);
    const header=Header({
        parent:find.querySelector(`.${css.row0}`),
        onFilter:(filter)=>{filterShows(filter,row1,state)},
        onSearch:(input)=>{
            const value=input.value.trim();
            setSearchValue(value);
            header.resetFilter();
            value?findShows(value,row1,state):row1.innerHTML=`<img alt="" class="${css.applogo}" src="${applogo}"/>`;
        },
    });
    const {input}=header;
    const showStore=store.show,{searchvalue}=showStore;
    if(searchvalue){
        input.value=searchvalue;
        findShows(searchvalue,row1,state);
    }
    else{
        input.focus();
    }
}

const styles={
    find:`
        padding-top:${cordova.platformId!=="browser"?"2.5rem":"0"};
    `,
};


const findShows=(value,row1,state)=>{
    const loader=Loader({parent:row1,style:"position:absolute"});
    H.useTitle(value.trim(),shows=>{
        state.shows=shows&&shows.length?shows:null;
        loader.remove();
        setShowsCards(shows,row1);
    });
}

export const filterShows=(filter,row1,state)=>{
    const {shows}=state,{type,rate,genres}=filter;
    const filtered=shows?shows.filter(show=>
        show.vote_average>=rate &&
        type.includes(show.type) &&
        genres.every(id=>show.genre_ids.includes(id))
    ):null;
    setShowsCards(filtered,row1);
}

const setShowsCards=(shows,container)=>{
    container.innerHTML="";
    if(shows&&shows.length){
        shows.forEach(show=>{
            ShowCard({parent:container,show});
        });
    }
    else{
        container.innerHTML=`<img alt="" class="${css.applogo}" src="${applogo}"/>`;
    }
}