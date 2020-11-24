import {Router} from "../Vanilla";
import css from "./App.module.css";
import {EntryAnimation} from "components";
import {Home,Shows,ShowDetails} from "routes";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="app" class=${css.app}></div>`);
    const app=parent.querySelector(`.${css.app}`);
    app.innerHTML=`
        
    `;
    Router(app,[
        {component:Home,path:""},
        {component:Shows,path:"#shows"},
        {component:ShowDetails,path:"#shows#show"},
    ]);
}