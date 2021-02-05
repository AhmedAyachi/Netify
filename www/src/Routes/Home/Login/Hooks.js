import {apikey} from "estate";
import {WarnAlert} from "components";


export const useSessionId=({username,password},onFulfilled)=>{
    fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apikey}`).
    then(response=>response.json()).
    then(async ({request_token})=>{
        const headers=new Headers();
        headers.append("Content-Type","application/x-www-form-urlencoded");
        const urlencoded=new URLSearchParams();
        urlencoded.append("username",username);
        urlencoded.append("password",password);
        urlencoded.append("request_token",request_token);
        const options={
            method:"POST",
            headers:headers,
            body:urlencoded,
            redirect:"follow",
        };
        const response=await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apikey}`,options);
        const data=await response.json();
        return data;
    }).
    then(async ({request_token})=>{
        const headers=new Headers();
        headers.append("Content-Type","application/x-www-form-urlencoded");
        const urlencoded=new URLSearchParams();
        urlencoded.append("request_token",request_token);
        const options={
            method:"POST",
            headers:headers,
            body:urlencoded,
            redirect:"follow",
        };
        const response=await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apikey}`,options);
        const data=await response.json();
        onFulfilled&&onFulfilled(data.session_id);
    }).
    catch(error=>{
        WarnAlert({
            message:error.message,
            onProceed:()=>{useSessionId({username,password},onFulfilled)},
            onCancel:()=>{
                location.reload();
            }
        })
    });
}