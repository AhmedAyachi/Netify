import {map,useRef} from "vanilla";
import css from "./Login.module.css";
import {netflixlogo,googlelogo,tmdb1} from "assets";
import {InputField,ShowsBackground,SkipAlert} from "components";
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
            <img class="${css.tmdblogo}" alt="" src="${tmdb1}"/>
        <div>
        <details class="${css.details}">
            <summary>About</summary>
            <ul>
                <li>Made by Ahmed Ayachi</li>
                <li>Email: aayachi032@gmail.com</li>
                <li>API: <span class="${css.tmdblink}">The Movie Database</span></li>
            </ul>
        </details>
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
            /*const inputvalues=refs.inputfields.map(ref=>login.querySelector(`#${ref} input`).value);*/
            if(false){
                setUsertoken();
                appcontent.innerHTML="";
                Home({parent:app.querySelector("#content")});
            }
        }
    }

    login.querySelector(`.${css.tmdblink}`).onclick=()=>{

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