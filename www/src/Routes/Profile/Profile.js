import {map,useRef} from "vanilla";
import css from "./Profile.module.css";
import {PopupTextArea,Loader,WarnAlert} from "components";
import {message0,warn0,datasaver0,photomedia0,sleep0} from "assets";
import {onLogOut,useSendMessage} from "estate";
import * as H from "./Hooks";


export default function Profile(props){
    const {parent,ref=useRef("profile")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.profile}"></div>`);
    const profile=parent.querySelector(`#${ref}`),{user}=store;

    profile.innerHTML=`
        <div class="${css.row0}">
            <div class="${css.profileimage}" style="${styles.profileimage(user.photo)}"></div>
            <p class="${css.username}">${user.name||user.username}</p>
        </div>
        <div class="${css.row1}">
            ${map(lists,({title,items})=>`
                <ul id="${title}">
                    <li class="${css.listitle}">${title}</li>
                    ${map(items,({name,icon,ref,key})=>`
                        <li ${ref?`id="${ref}"`:""} ${key?`key="${key}"`:""} class="${css.set}">
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
        setEl.onclick=()=>{history.push(`#${key}`)};
    });
    const repsets=profile.querySelectorAll(`.${css.row1} #account .${css.set}[key=send]`);
    repsets.forEach(setEl=>{
        const ref=setEl.id;
        setEl.onclick=()=>{setTextArea(ref)};
    });
    
    const logoutbtn=profile.querySelector(`.${css.row1} #account #logout`);
    logoutbtn.onclick=()=>{
        WarnAlert({
            message:"You're about to be logged out",
            onProceed:()=>{
                if(store.sessiontoken){
                    store.elements.navigator.unmount();
                    const loader=Loader({parent:appcontent,style:styles.loader});
                    H.useDeleteSession(()=>{
                        loader.remove();
                        onLogOut();
                    });
                }
                else{
                    onLogOut();
                }
            },
        })
    }

}

const styles={
    profileimage:(image)=>`
        background-image:url('${image}');
    `,
    seticon:(icon)=>`
        background-image:url('${icon}');
    `,
    loader:`
        position:fixed;
        inset:0;
        width:100vw;
        height:100vh;
        background-color:rgba(0,0,0,0.75);
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
            {name:"Log Out",icon:sleep0,ref:"logout"},
            {name:"Report Technical Problem",icon:warn0,ref:"report",key:"send",},
            {name:"Send Feedback",icon:message0,ref:"feedback",key:"send"},
        ],
    },
];

const setTextArea=(key)=>{
    PopupTextArea({
        parent:appcontent,
        title:key,
        onSend:(message,sendbtn,component)=>{
            const btnscontainer=sendbtn.parentNode;
            btnscontainer.innerHTML="";
            Loader({parent:btnscontainer,style:styles.loader});
            useSendMessage({key,text:message},()=>{
                component.unmount();
            });
        }
    });
}

