import {map,useRef} from "vanilla";
import css from "./ShowProber.module.css";
import {capitalize} from "afile";
import DetailSection from "./DetailSection/DetailSection";
import CreditSection from "./CreditSection/CreditSection";
import MediaSection from "./MediaSection/MediaSection";
import SocialSection from "./SocialSection/SocialSection";


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
    DetailSection({parent:row1,show});
    
    state.activebtn=showprober.querySelector(`.${css.row0} #detailsbtn`);
    showprober.querySelectorAll(`.${css.row0} .${css.sectiontitle}`).forEach((sectionbtn,i)=>{
        sectionbtn.section=sections[i];
        sectionbtn.onclick=()=>{onSectionSelect(sectionbtn,row1,state,show)};
    });
}

const sections=[
    {title:"details",component:DetailSection},
    {title:"credits",component:CreditSection},
    {title:"media",component:MediaSection},
    {title:"social",component:SocialSection},
];

const onSectionSelect=(sectionbtn,row1,state,show)=>{
    const {section}=sectionbtn;
    if(state.activebtn&&section.title!==state.activebtn.section.title){
        state.activebtn.className=css.sectiontitle;
        state.activebtn=sectionbtn;
        sectionbtn.className+=` ${css.activebtn}`;
        row1.innerHTML="";
        if(section.component){
            section.component({parent:row1,show});
        }
    }
}