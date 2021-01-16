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
            <img alt="" class="${css.avatar}" src="${avatar_path?`https://secure.gravatar.com/avatar${avatar_path}s=64`:""}"/>
            <p class="${css.name}">${data.author}</p>
        </div>
        <div class="${css.col1}">
            <div class="${css.row0}">${data.content||""}</div>
            ${data.created_at?`
                <div class="${css.row1}">${getFormatedDate(getDate(data.created_at))} ${getTime(data.created_at)}</div>
            `:""}
        </div>
    `;
}

const getDate=(str="")=>str.substring(0,str.indexOf("T"));
const getTime=(str="")=>str.substring(str.indexOf("T")+1,str.indexOf("."));