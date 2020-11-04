import {map} from "vanilla";
import css from "./Home.module.css";
import {netflixlogo,googlelogo} from "assets";
import {capitalize} from "afile";


export default function Home(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div class="${css.home} activeroute"></div>`);
    const home=parent.querySelector(`.${css.home}`);

    home.innerHTML=`
        <div class="${css.row0}" style="${styles.row0}">
            <img class="${css.applogo}" alt="Aflex" src="${netflixlogo}"/>
            ${map(["email","password"],prop=>`
                <input id="${prop}" class="${css.inputfield}" type="text" placeholder="${capitalize(prop)}"/>
            `)}
            <button class="${css.signin}">Sign in</button>
            <div class="${css.logos}">
                ${map(logos,logo=>`
                    <img class="${css.logo}" alt="${logo.of}" src="${logo.src}" style="${logo.style}"/>
                `)}
            </div>
        </div>
        
    `;

    home.querySelector(`.${css.signin}`).onclick=()=>{
        history.push("#movies");
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