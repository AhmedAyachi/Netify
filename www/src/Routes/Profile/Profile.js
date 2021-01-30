import {map,useRef} from "vanilla";
import css from "./Profile.module.css";
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
                            <!--<img alt="" class="${css.seticon}" src="${icon}"/>-->
                            <span class="${css.setname}">${name}</span>
                        </li>
                    `)}
                </ul>
            `)}
        </div>
    `;

    const sets=profile.querySelectorAll(`.${css.row1} #Preferences .${css.set}[key]`);
    sets.forEach(setEl=>{
        const key=setEl.getAttribute("key");
        setEl.onclick=()=>{
            history.push(`#${key}`);
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
        title:"Preferences",
        items:[
            {name:"Data Saver",icon:datasaver0,key:"datasaver"},
            {name:"Photo & Media",icon:photomedia0,key:"photomedia"},
        ],
    },
    {
        title:"Account",
        items:[
            {name:"Log Out",icon:sleep0},
            {name:"Report Technical Problem",icon:warn0},
            {name:"Send Feedback",icon:message0},
        ],
    },
];
