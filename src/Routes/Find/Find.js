import {} from "vanilla";
import css from "./Find.module.css";
import {Header,ShowCard,Loader} from "components";
import {netifylogo} from "assets";
import {clean} from "afile";
import {setSearchValue} from "actions";
import * as H from "./Hooks";


export default function Find(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="find" class="${css.find}" style="${styles.find}"></div>`);
    const find=parent.querySelector(`#find.${css.find}`);
    const state=find.state={
        shows:null,
    },showStore=store.show,{searchvalue}=showStore;

    find.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            ${!searchvalue?`<img alt="" class="${css.applogo}" src="${netifylogo}"/>`:""}
        </div>
    `;
    const row1=find.querySelector(`.${css.row1}`);
    const header=Header({
        parent:find.querySelector(`.${css.row0}`),
        onFilter:(filter)=>{state.shows&&state.shows.length&&filterShows(filter,row1,state)},
        onSearch:(value)=>{
            value=clean(value);
            setSearchValue(value);
            header.resetFilter();
            if(value){
                findShows(value,row1,state);
            }
            else{
                state.shows=null;
                row1.innerHTML=`<img alt="" class="${css.applogo}" src="${netifylogo}"/>`;
            }
        },
    });
    const {input}=header;
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
    const loader=Loader({parent:row1,style:"position:fixed;inset:0;"});
    H.useTitle(value.trim(),shows=>{
        if(shows&&shows.length){
            state.shows=shows
            loader.remove();
            setShowsCards(shows,row1);
        }
        else{
            state.shows=null;
            row1.innerHTML=`<span class="${css.noshows}">No shows found</span>`;
        }
        
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
        container.innerHTML=`<img alt="" class="${css.applogo}" src="${netifylogo}"/>`;
    }
}