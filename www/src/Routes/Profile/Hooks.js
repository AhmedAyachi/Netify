import {netifygroupid,bottoken} from "estate";


export const useSendMessage=({key,text=""},onFulfilled)=>{
    const message=`${key} from ${store.user.name},\n${text}.`;
    fetch(`https://api.telegram.org/bot${bottoken}/sendMessage?chat_id=-${netifygroupid}&text=${encodeURIComponent(message)}`,{
        method:"POST",
        redirect:"follow",
    }).
    then(response=>response.json()).
    finally(()=>{
        onFulfilled&&onFulfilled();
    });
}