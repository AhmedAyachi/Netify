import {} from "vanilla";
import css from "./Setting.module.css";
import Datasaver from "./Datasaver/Datasaver";
import {BackButton} from "components";
import {capitalize} from "afile";


export default function Setting(props){
    const {parent,setname}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="setting" class="${css.setting}"></div>`);
    const setting=parent.querySelector("#setting");

    setting.innerHTML=`
        <div class="${css.row0}">
            <span class="${css.title}">${capitalize(setname)}</span>
        </div>
        <div class="${css.row1}"></div>
    `;
    const row0=setting.querySelector(`.${css.row0}`),row1=setting.querySelector(`.${css.row1}`);
    BackButton({parent:row0,style:styles.backbutton});
   
    setContent[setname]({parent:row1});
}

const styles={
    backbutton:`
        position:relative;
        inset:0;
        margin:0 10px;
    `,
}

const setContent=new function(){
    this.datasaver=Datasaver;
    return this;
}();