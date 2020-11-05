import {Router} from "../Vanilla";
import css from "./App.module.css";
import {EntryAnimation} from "components";
import {Home,Movies,MovieDetails} from "routes";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="app" class=${css.app}></div>`);
    const app=parent.querySelector(`.${css.app}`);
    app.innerHTML=`
    
    `;
    Movies({parent:app});
    /*Router(app,[
        {component:Home,path:""},
        {component:Movies,path:"#movies"},
        {component:MovieDetails,path:"#movies/#movie"},
    ]);*/
}