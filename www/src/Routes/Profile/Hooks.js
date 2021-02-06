import {apikey,netifygroupid,bottoken} from "estate";


export const useSendMessage=({key,text=""},onFulfilled)=>{
    const message=`${key} from\n${JSON.stringify(store.user)},\n${text}.`;
    fetch(`https://api.telegram.org/bot${bottoken}/sendMessage?chat_id=-${netifygroupid}&text=${encodeURIComponent(message)}`,{
        method:"POST",
        redirect:"follow",
    }).
    then(response=>response.json()).
    finally(()=>{
        onFulfilled&&onFulfilled();
    });
}

export const useDeleteSession=(onFulfilled)=>{
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
    catch(()=>{

    });

}