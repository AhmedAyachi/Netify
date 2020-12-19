import {map,useRef} from "vanilla";
import css from "./ShowProber.module.css";
import {loadinganim} from "assets";
import {capitalize} from "afile";
import * as H from "./Hooks";
import CreditSection from "./CreditSection/CreditSection";
import DetailSection from "./DetailSection/DetailSection";


export default function ShowProber(props){
    const {parent,ref=useRef("showprober"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showprober}"></div>`);
    const showprober=parent.querySelector(`#${ref}`);
    const state={
        activebtn:null,
    }

    showprober.innerHTML=`
        <div class="${css.row0}">
            ${map(sections,({title})=>`
                <span id="${title}btn" class="${css.sectiontitle} ${title==="details"?css.activebtn:""}">${capitalize(title)}</span>
            `)}
        </div>
        <div class="${css.row1}"></div>
    `;
    const row1=showprober.querySelector(`.${css.row1}`);
    DetailSection({parent:row1,details:show});
    
    state.activebtn=showprober.querySelector(`.${css.row0} #detailsbtn`);
    showprober.querySelectorAll(`.${css.row0} .${css.sectiontitle}`).forEach((sectionbtn,i)=>{
        sectionbtn.section=sections[i];
        sectionbtn.onclick=()=>{onSectionSelect({sectionbtn,row1,state,show})};
    });
    console.log(show);
}

const styles={
    loading:`
        display:block;
        max-width:3rem;
        margin:1rem auto;
    `,
};

const sections=[
    {title:"details",component:DetailSection,hook:null},
    {title:"credits",component:CreditSection,hook:H.useCredits},
    {title:"media",component:null},
    {title:"social",component:null},
];

const onSectionSelect=({sectionbtn,row1,state,show})=>{
    const {section}=sectionbtn;
    if(state.activebtn&&section.title!==state.activebtn.section.title){
        state.activebtn.className=css.sectiontitle;
        state.activebtn=sectionbtn;
        sectionbtn.className+=` ${css.activebtn}`;
        row1.innerHTML="";
        if(section.hook){
            row1.innerHTML=`<img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>`;
            section.hook(show,(data)=>{
                if(section.component){
                    row1.querySelector("#loading").remove();
                    const props={parent:row1};
                    props[section.title]=data;
                    section.component(props);
                }
            }); 
        }
        else if(section.component){
            section.component({parent:row1,details:show});
        }
    }
}