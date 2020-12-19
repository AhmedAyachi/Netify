import {map,useRef} from "vanilla";
import css from "./ShowProber.module.css";
import {loadinganim} from "assets";
import CreditSection from "./CreditSection/CreditSection";
import {capitalize} from "afile";
import * as H from "./Hooks";


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

    state.activebtn=showprober.querySelector(`.${css.row0} #detailsbtn`);
    const row1=showprober.querySelector(`.${css.row1}`);

    ;
    showprober.querySelectorAll(`.${css.row0} .${css.sectiontitle}`).forEach((sectionbtn,i)=>{
        const section=sections[i];
        sectionbtn.target=section.title;
        sectionbtn.onclick=()=>{
            if(state.activebtn&&sectionbtn.target!==state.activebtn.target){
                state.activebtn.className=css.sectiontitle;
                state.activebtn=sectionbtn;
                sectionbtn.className+=` ${css.activebtn}`;
                row1.innerHTML="";
                if(section.hook){
                    row1.innerHTML=`<img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>`;
                    section.hook(show,(data)=>{
                        if(section.component){
                            showdetails.querySelector("#loading").remove();
                            section.component({parent:row1,credits:data});
                        }
                    }); 
                }
            }
        }
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
    {title:"details",component:null,hook:null},
    {title:"credits",component:CreditSection,hook:H.useCredits},
    {title:"media",component:null},
    {title:"social",component:null},
];