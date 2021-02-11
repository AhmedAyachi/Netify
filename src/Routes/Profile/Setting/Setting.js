import {} from "vanilla";
import css from "./Setting.module.css";
import Datasaver from "./Datasaver/Datasaver";
import Photomedia from "./Photomedia/Photomedia";
import About from "./About/About";
import {BackButton} from "components";


export default function Setting(props){
    const {parent,setname}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="setting" class="${css.setting}"></div>`);
    const setting=parent.querySelector("#setting");
    const state={content:getContent[setname]};

    setting.innerHTML=`
        <div class="${css.row0}">
            <span class="${css.title}">${state.content.title}</span>
        </div>
        <div class="${css.row1}"></div>
    `;
    const row0=setting.querySelector(`.${css.row0}`),row1=setting.querySelector(`.${css.row1}`);
    BackButton({parent:row0,style:styles.backbutton});
   
    state.content.component({parent:row1});
}

const styles={
    backbutton:`
        position:relative;
        inset:0;
        margin:0 10px;
    `,
}

const getContent=new function(){
    this.datasaver={
        title:"Data Saver",
        component:Datasaver,
    };
    this.photomedia={
        title:"Photo & Media",
        component:Photomedia,
    };
    this.about={
        title:"About",
        component:About,
    }
    return this;
}();