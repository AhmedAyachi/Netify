import {map,useRef} from "vanilla";
import css from "./Grid.module.css";
import Item from "./Item/Item";


export default function Grid(props){
    const {parent,ref=useRef("grid"),title="",items}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.grid}"></div>`);
    const grid=parent.querySelector(`#${ref}`);

    grid.innerHTML=`
        <div class="${css.row0}">${title}</div>
        <div class="${css.row1}"></div>
    `;

    const row1=grid.querySelector(`.${css.row1}`);
    if(items&&items.length&&items.forEach){
        items.forEach(item=>{
            Item({parent:row1,view:item});
        });
    }
    else{
        grid.remove();
    }
}