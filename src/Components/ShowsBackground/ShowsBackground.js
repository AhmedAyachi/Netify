import {map,useRef} from "vanilla";
import {lucifer1,johnwick1} from "assets";
import css from "./ShowsBackground.module.css";
import {fadeIn} from "afile";

export default function ShowsBackground(props){
    const {parent,ref=useRef("showsbackground")}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.showsbackground}" style="${styles.showsbackground}"></div>`);
    const showsbackground=parent.querySelector(`#${ref}`);

    showsbackground.innerHTML=`
        ${map(backgroundimages,image=>`
            <img class="${css.poster}" alt="" src="${image.src}"/>
        `)}
    `;
    fadeIn(showsbackground,"flex",1.25);
};

const styles={
    showsbackground:`
        display:none;
    `,
}

const backgroundimages=[
    {src:lucifer1},
    {src:johnwick1},
];