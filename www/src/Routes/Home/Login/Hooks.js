import {apikey,onRouteError} from "estate";


export const useSessionId=({username,password},onFulfilled,onRejected)=>{
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
    then(async (data)=>{
        const {success,request_token}=data;
        if(success){
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
        }
        else{
            onRejected&&onRejected();
            onRouteError({error:{message:JSON.stringify(data)}},()=>{useSessionId({username,password},onFulfilled,onRejected)});
        }
    }).
    catch(error=>{
        onRejected&&onRejected();
        onRouteError({error},()=>{useSessionId({username,password},onFulfilled,onRejected)});
    });
}