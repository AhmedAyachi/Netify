import {Router} from "vanilla";
import css from "./App.module.css";
import {EntryAnimation} from "components";
import {Home,Movies} from "routes";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="app" class=${css.app}></div>`);
    const app=parent.querySelector(`.${css.app}`);
    app.innerHTML=`
    
    `;
    EntryAnimation({
        parent:app,
        onFadeOut:()=>{
            Router([
                {component:Home,path:""},
                {component:Movies,path:"#movies"},
            ]);
        },
    });
}