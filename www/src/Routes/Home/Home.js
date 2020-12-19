import {} from "vanilla";
import css from "./Home.module.css";
import Login from "./Login/Login";
import Shows from "./Shows/Shows";
import {Navigator} from "components";


export default function Home(props){
    const {parent,ref="home"}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.home}" style="${styles.home}"></div>`);
    const home=parent.querySelector(`#${ref}`);
    
    if(store.sessiontoken||store.isguest){
        Shows({parent:home});
        app.style.paddingBottom="5rem";
        if(!store.elements.navigator){
            Navigator({parent:app});
        }
    }
    else{
        Login({parent:home});
    }
    
}

const styles={
    home:`
        padding-top:${/*cordova.platformId!=="browser"?"2.5rem":"0"*/"0"};
    `,
}