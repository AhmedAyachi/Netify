import {apikey} from "estate";


export const useDeleteSession=(onFulfilled,onRejected)=>{
    const headers=new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    const urlencoded=new URLSearchParams();
    urlencoded.append("session_id",store.sessiontoken);
    const options={
        method:"DELETE",
        headers:headers,
        body:urlencoded,
        redirect:"follow",
    };
    fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${apikey}`,options).
    then(response=>response.json()).
    then(({success})=>{
        if(success){
            onFulfilled&&onFulfilled();
        }
    }).
    catch(error=>{
        onRejected&&onRejected(error);
        useSendMessage({key:"Error",text:error.message});
        WarnAlert({
            message:"Error occured",
            proceed:"Try again",
            onProceed:()=>{useDeleteSession(onFulfilled,onRejected)},
            onCancel:location.refresh,
        });
    });
}