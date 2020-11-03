import {} from "vanilla";
import css from "./App.module.css";
import {Home} from "routes";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div class=${css.app}></div>`);
    const app=parent.querySelector("."+css.app);
    app.innerHTML=`
    
    `;
    Home({parent:app});
}