import {} from "vanilla";
import css from "./Home.module.css";
import Login from "./Login/Login";
import Discover from "./Discover/Discover";
import * as H from "./Hooks";


export default function Home(props){
    const {parent,ref="home"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.home}"></div>`);
    const home=parent.querySelector(`#${ref}`);
    
    if(store.sessiontoken){
        (store.user&&store.user.id)?Discover({parent:home}):H.useUserAccount(()=>{Discover({parent:home})});
    }
    else if(store.isguest){
        Discover({parent:home});
    }
    else{
        Login({parent:home});
    }
}
