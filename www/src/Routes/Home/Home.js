import {} from "vanilla";
import css from "./Home.module.css";
import Login from "./Login/Login";
import Shows from "./Shows/Shows";


export default function Home(props){
    const {parent,ref="home"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.home}"></div>`);
    const home=parent.querySelector(`#${ref}`);
    
    if(store.sessiontoken||store.isguest){
        Shows({parent:home});
    }
    else{
        Login({parent:home});
    }
}
