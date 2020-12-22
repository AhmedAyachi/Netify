import {useRef} from "vanilla";
import css from "./MediaSection.module.css";
import {loadinganim} from "assets";
import VideoSlider from "./VideoSlider/VideoSlider";
import * as H from "./Hooks";


export default function MediaSection(props){
    const {parent,ref=useRef("mediasection"),show}=props;
    parent.insertAdjacentHTML("beforeend",`<div id="${ref}" class="${css.mediasection}"></div>`);
    const mediasection=parent.querySelector(`#${ref}`);

    mediasection.innerHTML=`
        <div class="${css.row0}">
            <img id="loading" alt="Loading" style="${styles.loading}" src="${loadinganim}"/>
        </div>
        <div class="${css.row1}"></div>
    `;

    
    H.useImages(show,images=>{
        const {backdrops,posters}=images;
        H.useVideos(show,videos=>{
            const row0=mediasection.querySelector(`.${css.row0}`);
            row0.querySelector("#loading").remove();
            const videoslength=videos.length;
            if(videos&&videoslength&&videos.reverse){
                videos.forEach((video,i)=>{
                    const backdrop=backdrops[i];
                    video.backdropkey=backdrop?backdrop.file_path:null;
                });
                VideoSlider({parent:row0,index:0,videos});
            }
        });
        /*const row1=mediasection.querySelector(`.${css.row1}`);
        if(backdrops&&backdrops.length){
            const videos=backdrops.map(backdrop=>({backdrop:backdrop.file_path}));
            const backdrop=backdrops[0];
            
        }*/
    });
}

const styles={
    loading:`
        display:block;
        max-width:3rem;
        margin:1rem auto;
    `,
};

//https://www.themoviedb.org/video/play?key=yzXglr5bc3w