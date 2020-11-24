import {useRef} from "vanilla";
import css from "./ShowList.module.css";
import ShowCard from "./ShowCard/ShowCard";
import {arrow,loadinganim} from "assets";
import {loadMovies} from "actions";


export default function ShowList(props){
    const {parent,refs,ref=refs.showlist||useRef("showlist")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showlist}"></div>`);
    const showlist=parent.querySelector(`#${ref}`);

    showlist.innerHTML=`
        <div class="${css.row0}">
           <img class="${css.arrows}" id="prevarrow" alt="Previous" title="Previous" style="${styles.prevarrow}" src="${arrow}"/>
           <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
           <img class="${css.arrows}" id="nextarrow" alt="Next" title="Next" src="${arrow}"/>
        </div>
        <div id="row1"></div>
    `;
    const movieState=store.movie;
    if(movieState.searchvalue){
        const searcherInput=document.querySelector(`#${refs.searcher} input`);
        searcherInput.value=movieState.searchvalue;
        const searched=movieState.searched;
        if(searched.length){
            searched.forEach(movie=>{
                ShowCard({parent:row1,movie});
            });
        };
    }
    else{
        setMovieCards(showlist,store.movie);
    }

    showlist.querySelector("#prevarrow").onclick=()=>{
        Collection.previous(showlist,store.movie);
        const searcherInput=document.querySelector(`#${refs.searcher} input`);
        if(searcherInput&&searcherInput.value){
            searcherInput.value="";
        }
    }
    showlist.querySelector("#nextarrow").onclick=()=>{
        Collection.next(showlist,store.movie);
        const searcherInput=document.querySelector(`#${refs.searcher} input`);
        if(searcherInput&&searcherInput.value){
            searcherInput.value="";
        }
    }
    
}
const styles={
    prevarrow:`
        transform:scaleX(-1);
    `,
    loading:`
        display:none;        
    `,
};

const Collection=new (function(){
    this.previous=(showlist,movieState)=>{
        if(movieState.collection>1){
            movieState.collection--;
            setMovieCards(showlist,movieState);
        }
    }
    this.next=(showlist,movieState)=>{
        if(movieState.collection<250){
            movieState.collection++;
            setMovieCards(showlist,movieState);
        }
    }
})();

const setMovieCards=(showlist,movieState)=>{
    const row1=showlist.querySelector("#row1");
    const loading=showlist.querySelector("#loading");
    loading.style.display="block";
    loadMovies(movieState.collection,(movies)=>{
        row1.innerHTML="";
        movies.forEach(movie=>{
            ShowCard({parent:row1,movie});
        });
        loading.style.display="none";
        console.log(movies);
    });
}
