import {map} from "vanilla";
import css from "./About.module.css";
import {netifylogo} from "assets";


export default function About(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="aboutapp" class="${css.about}">/<div>`);
    const about=parent.querySelector(`#aboutapp.${css.about}`);

    about.innerHTML=`
        <img class="${css.applogo}" alt="Netify" src="${netifylogo}"/>
        ${map(["v1.0.0","Made by Ahmed Ayachi","Email: aayachi032@gmail.com"],text=>`
            <p class="${css.infotext}">${text}</p>
        `)}
    `;
}