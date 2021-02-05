import {} from "vanilla";
import css from "./Login.module.css";
import {Home} from "routes";
import {netifylogo,tmdb1} from "assets";
import {InputField,WarnAlert,Loader} from "components";
import {setSessionToken,setIsguest} from "actions";
import Discover from "../Discover/Discover";
import {checkUsername,checkPassword} from "estate";
import {shake,encrypt} from "afile";
import * as H from "./Hooks";


export default function Login(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="login"class="${css.login}"></div>`);
    const login=parent.querySelector(`.${css.login}`),state={
        inputfields:[],
    };

    login.innerHTML=`
        <div class="${css.row0}">
            <span class="${css.skipbtn}">Skip</span>
            <img class="${css.applogo}" alt="Aflex" src="${netifylogo}" draggable="false"/>
        </div>
        <div class="${css.row1}"></div>
        <div class="${css.row2}">
            <button class="${css.signin}">Sign in</button>
            <img class="${css.tmdblogo}" alt="" src="${tmdb1}"/>
        <div>
        <details class="${css.details}">
            <summary>About</summary>
            <ul>
                <li>Made by Ahmed Ayachi</li>
                <li>Email: aayachi032@gmail.com</li>
            </ul>
        </details>
    `;
    ["username","password"].forEach((prop,i)=>{
        const inputfield=InputField({
            parent:login.querySelector(`.${css.row1}`),
            placeholder:prop,
            type:prop,
        });
        state.inputfields.push(inputfield);
        const input=inputfield.querySelector("input");
        if(i){
            input.oninput=()=>{
                input.style.color=checkPassword(input.value)?"white":"#cc0000";
            }
        }
        else{
            input.oninput=()=>{
                input.style.color=checkUsername(input.value)?"white":"#cc0000";
            }
        }
    });

    login.querySelector(`.${css.skipbtn}`).onclick=()=>{
        WarnAlert({
            parent:login,
            message:"If you skip loggin in, some additional data will be stored on the device",
            onProceed:()=>{
                setIsguest();
                appcontent.innerHTML="";
                Discover({parent:appcontent});
            },
        });  
    };

    const signinbtn=login.querySelector(`.${css.signin}`);
    signinbtn.onclick=()=>{
        const inputs=state.inputfields.map(inputfield=>inputfield.querySelector("input"));
        const userlogininfo={
            username:inputs[0].value.trim(),
            password:inputs[1].value,
        }
        if(navigator.onLine){
            const fineUsername=checkUsername(userlogininfo.username),finePassword=checkPassword(userlogininfo.password);
            if(fineUsername&&finePassword){
                appcontent.innerHTML="";
                const loader=Loader({appcontent,style:"position:fixed;inset:0;"});
                H.useSessionId(userlogininfo,(sessionid)=>{
                    alert("sessionid: "+sessionid);
                    loader.remove();
                    setSessionToken(sessionid,21);
                    Home({parent:appcontent});
                });
            }
            else{
                shake(signinbtn);
            }
        }
    }
}
