import {} from "vanilla";
import css from "./Datasaver.module.css";
import {switchon0,switchoff0,switch0,switch0reversed} from "assets";
import {setDataSaver,setMobileNetworkSaver} from "actions";


export default function Datasaver(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="datasaver" class="${css.datasaver}"></div>`);
    const datasaver=parent.querySelector("#datasaver"),{prefs}=store;

    datasaver.innerHTML=`
        <ul>
            <li id="status">
                <div class="${css.row0}">
                    <span class="${css.pref}">${prefs.datasaver?"On":"Off"}</span>
                    <img class="${css.switcher}" alt="switcher" src="${prefs.datasaver?switchon0:switchoff0}"/>
                </div>
                <p class="${css.row1}">When On, shows' posters and backdrops will be displayed in lower quality to save data.</p>
            </li>
            <li id="onmnstatus">
                <div class="${css.row0}">
                    <span class="${css.pref}">On mobile network</span>
                    <span class="${css.status}">${prefs.mobilenetworksaver?"On":"Off"}</span>
                </div>
                <p class="${css.row1}">When On, data saver will be automatically On when using mobile network.</p>
            </li>
        </ul>
    `;

    const switcher=datasaver.querySelector(`#status .${css.switcher}`);
    switcher.onclick=()=>{
        const statusEl=datasaver.querySelector(`#status .${css.pref}`);
        setDataSaver(!prefs.datasaver);
        switcher.setAttribute("src",prefs.datasaver?switch0:switch0reversed);
        statusEl.innerHTML=prefs.datasaver?"On":"Off"; 
    }

    const onmnstatusbtn=datasaver.querySelector(`#onmnstatus .${css.status}`);
    onmnstatusbtn.onclick=()=>{
        setMobileNetworkSaver(!prefs.mobilenetworksaver);
        onmnstatusbtn.innerHTML=prefs.mobilenetworksaver?"On":"Off";
        const connectiontype=navigator.connection.type,statusEl=datasaver.querySelector(`#status .${css.pref}`);;
        if(prefs.mobilenetworksaver&&(!prefs.datasaver)&&connectiontype.trim().endsWith("g")){
            prefs.datasaver=true;
            switcher.setAttribute("src",switch0);
            statusEl.innerHTML="On";
        }
    }
}