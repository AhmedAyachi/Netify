import css from "./App.module.css";


export default function App(props){
    const {parent}=props;
    parent.insertAdjacentHTML("beforeend",`<div class=${css.app}></div>`);
    const app=parent.querySelector("."+css.app);
    app.innerHTML=`

    `;
}