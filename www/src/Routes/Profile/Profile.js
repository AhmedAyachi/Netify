import {map,useRef} from "vanilla";
import css from "./Profile.module.css";
import {PopupTextArea} from "components";
import {message0,warn0,datasaver0,photomedia0,sleep0} from "assets";


export default function Profile(props){
    const {parent,ref=useRef("profile")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.profile}"></div>`);
    const profile=parent.querySelector(`#${ref}`),{user}=store;

    profile.innerHTML=`
        <div class="${css.row0}">
            <div class="${css.profileimage}" style="${styles.profileimage(user.photo)}"></div>
            <p class="${css.username}">${user.name}</p>
        </div>
        <div class="${css.row1}">
            ${map(lists,({title,items})=>`
                <ul id="${title}">
                    <li class="${css.listitle}">${title}</li>
                    ${map(items,({name,icon,key})=>`
                        <li ${key?`key="${key}"`:""} class="${css.set}">
                            <div class="${css.seticon}">
                                <img alt="" src="${icon}"/>
                            </div>
                            <span class="${css.setname}">${name}</span>
                        </li>
                    `)}
                </ul>
            `)}
        </div>
    `;

    const prefsets=profile.querySelectorAll(`.${css.row1} #preferences .${css.set}[key]`);
    prefsets.forEach(setEl=>{
        const key=setEl.getAttribute("key");
        setEl.onclick=()=>{
            history.push(`#${key}`);
        }
    });

    const repsets=profile.querySelectorAll(`.${css.row1} #account .${css.set}[key]`);
    repsets.forEach(setEl=>{
        const key=setEl.getAttribute("key");
        setEl.onclick=()=>{
            PopupTextArea({parent:appcontent,title:key,placeholder:"Write your message here..."});
        }
    });
}

const styles={
    profileimage:(image)=>`
        background-image:url('${image}');
    `,
    seticon:(icon)=>`
        background-image:url('${icon}');
    `,
}

const lists=[
    {
        title:"preferences",
        items:[
            {name:"Data Saver",icon:datasaver0,key:"datasaver"},
            {name:"Photo & Media",icon:photomedia0,key:"photomedia"},
        ],
    },
    {
        title:"account",
        items:[
            {name:"Log Out",icon:sleep0},
            {name:"Report Technical Problem",icon:warn0,key:"Report"},
            {name:"Send Feedback",icon:message0,key:"Feedback"},
        ],
    },
];
