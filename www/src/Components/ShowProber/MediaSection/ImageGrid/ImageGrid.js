import {map,useRef} from "vanilla";
import css from "./ImageGrid.module.css";
import ImageBox from "./ImageBox/ImageBox";


export default function ImageGrid(props){
    const {parent,ref=useRef("grid"),title="",images}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.grid}"></div>`);
    const grid=parent.querySelector(`#${ref}`);

    grid.innerHTML=`
        <div class="${css.row0}">${title}</div>
        <div class="${css.row1}"></div>
    `;

    const row1=grid.querySelector(`.${css.row1}`);
    if(images&&images.length&&images.forEach){
        images.forEach(image=>{
            ImageBox({parent:row1,image});
        });
    }
    else{
        grid.remove();
    }
}