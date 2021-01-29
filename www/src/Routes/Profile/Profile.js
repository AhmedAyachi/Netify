import {map,useRef} from "vanilla";
import css from "./Profile.module.css";
import {capitalize} from "afile";
import {datasaver0,photomedia0,door0} from "assets";


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
                <ul>
                    <li class="${css.listitle}">${title}</li>
                    ${map(items,({name,icon,key})=>`
                        <li ${key?`key="${key}"`:""} class="${css.set}">
                            <div class="${css.seticon}">
                                <img alt="" src="${icon}"/>
                            </div>
                            <!--<img alt="" class="${css.seticon}" src="${icon}"/>-->
                            <span class="${css.setname}">${capitalize(name)}</span>
                        </li>
                    `)}
                </ul>
            `)}
        </div>
    `;

    const sets=profile.querySelectorAll(`.${css.row1} .${css.set}[key]`);
    sets.forEach(setEl=>{
        const key=setEl.getAttribute("key");
        setEl.onclick=()=>{
            history.replace(`#profile#${key}`);
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
            {name:"data saver",icon:datasaver0,key:"datasaver"},
            {name:"Photo & media",icon:photomedia0,key:"photomedia"},
        ],
    },
    {
        title:"Account",
        items:[
            {name:"Log out",icon:door0},
        ],
    },
];
