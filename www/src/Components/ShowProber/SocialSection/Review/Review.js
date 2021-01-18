import {useRef} from "vanilla";
import css from "./Review.module.css";
import {getFormatedDate} from "estate";


export default function Review(props){
    const {parent,ref=useRef("review"),data}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.review}"></div>`);
    const review=parent.querySelector(`#${ref}`);

    const {avatar_path}=data.author_details;
    review.innerHTML=`
        <div class="${css.col0}">
            ${avatar_path?`
                <img alt="" class="${css.avatar}" src="https://secure.gravatar.com/avatar${avatar_path}s=64"/>`:`
                <div class="${css.avatar}" style="${styles.avatar()}">${data.author[0].toUpperCase()}</div>
            `}
            <p class="${css.name}">${data.author}</p>
        </div>
        <div class="${css.col1}">
            <div class="${css.content}">${data.content||""}</div>
            ${data.created_at?`
                <div class="${css.datetime}">${getFormatedDate(getDate(data.created_at))} ${getTime(data.created_at)}</div>
            `:""}
        </div>
    `;
}

const colors=["ff00b3","006eff","00ff9d","9dff00","fbff00","ff9900"];
const styles={
    avatar:()=>`
        width:3em;
        height:3em;
        background-color:#${colors[Math.floor(Math.random()*colors.length)]};
    `,
}

const getDate=(str="")=>str.substring(0,str.indexOf("T"));
const getTime=(str="")=>str.substring(str.indexOf("T")+1,str.indexOf("."));