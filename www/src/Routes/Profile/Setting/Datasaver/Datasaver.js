import {} from "vanilla";
import css from "./Datasaver.module.css";
import {switchon0,switchoff0,switch0,switch0reversed} from "assets";


export default function Datasaver(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="datasaver" class="${css.datasaver}"></div>`);
    const datasaver=parent.querySelector("#datasaver"),{prefs}=store;

    datasaver.innerHTML=`
        <ul>
            <li>
                <span class="${css.status}">${prefs.datasaver?"On":"Off"}</span>
                <img class="${css.switcher}" alt="switcher" src="${prefs.datasaver?switchon0:switchoff0}"/>
            </li>
        </ul>
        <p class="${css.description}">When On, shows'posters and backdrops will be displayed in lower quality to save data.</p>
    `;

    const switcher=datasaver.querySelector(`.${css.switcher}`);
    const statusEl=datasaver.querySelector(`.${css.status}`);

    switcher.onclick=()=>{
        prefs.datasaver=!prefs.datasaver;
        switcher.setAttribute("src",prefs.datasaver?switch0:switch0reversed);
        statusEl.innerHTML=prefs.datasaver?"On":"Off"; 
    }
}