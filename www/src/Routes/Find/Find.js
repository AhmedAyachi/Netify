import {} from "vanilla";
import css from "./Find.module.css";
import {Header} from "components";
import {liquid0} from "assets";


export default function Find(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="find" class="${css.find}" style="${styles.find}"></div>`);
    const find=parent.querySelector(`#find.${css.find}`);

    find.innerHTML=`
        <div class="${css.row0}"></div>
        <div class="${css.row1}">
            <img alt="" class="${css.searchicon}" src="${liquid0}"/>
        </div>
    `;
    Header({
        parent:find.querySelector(`.${css.row0}`),
        onFilter:(params)=>{alert(JSON.stringify(params))},
    });
}

const styles={
    find:`
        padding-top:${cordova.platformId!=="browser"?"2.5rem":"0"};
    `,
};