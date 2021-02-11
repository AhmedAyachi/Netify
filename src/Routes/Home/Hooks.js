import {apikey,User} from "estate";
import {WarnAlert} from "components";
import {onLogOut} from "estate";


export const useUserAccount=(onFulfilled)=>{
    const {sessiontoken}=store;
    fetch(`https://api.themoviedb.org/3/account?api_key=${apikey}&session_id=${sessiontoken}`).
    then(response=>response.json()).
    then(data=>{
        if(data.id){
            store.user=new User(data);
            onFulfilled&&onFulfilled(store.user);
        }
        else{
            onRejected();
        }
    }).
    catch(onRejected);
}

const onRejected=()=>{
    WarnAlert({
        message:"logging in failed, you are about to be redirected to the login page",
        onProceed:onLogOut,
        onCancel:onLogOut,
    });
    setTimeout(onLogOut,2000);
}