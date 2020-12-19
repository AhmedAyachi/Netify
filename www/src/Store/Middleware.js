import {loadMovies} from "./Actions";


const Middleware=store=>toreducer=>action=>{
    switch(action.type){
        case "setMovies":
            loadMovies(action.data)(toreducer);
            break;
        default:
            toreducer(action);
            break;
    }
}
export default Middleware;