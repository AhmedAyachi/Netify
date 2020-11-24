import {map,useRef} from "vanilla";
import css from "./Home.module.css";
import {netflixlogo,googlelogo} from "assets";
import {InputField} from "components";


export default function Home(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.home} activeroute"></div>`);
    const home=parent.querySelector(`.${css.home}`);

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

    ["email","password"].forEach(prop=>{
        InputField({
            parent:home.querySelector(`.${css.row1}`),
            placeholder:prop,
            ref:useRef(prop),
            type:prop,
        });
    });
       
    
    home.querySelector(`.${css.signin}`).onclick=()=>{
        history.pushState("#movies");
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