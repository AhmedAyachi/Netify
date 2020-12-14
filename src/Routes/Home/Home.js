import {useRef} from "vanilla";
import css from "./Home.module.css";
import Login from "./Login/Login";
import Shows from "./Shows/Shows";
import {Navigator} from "components";


export default function Home(props){
    const {parent,ref=useRef("home")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}"  class="${css.home} activeroute"></div>`);
    const home=parent.querySelector(`#${ref}`);
    
    if(store.usertoken||store.isguest){
        Shows({parent:home});
        const {elements}=store;
        app.style.paddingBottom="5rem";
        if(!elements.navigator){
            elements.navigator=Navigator({parent:app});
        }
    }
    else{
        Login({parent:home});
    }
    
}