import{g as o}from"./index-BlMJxPGQ.js";async function r(e){let t={};return await o.post("https://backend.opus.emergobyul.com/services/login",e).then(a=>{a.status&&a.headers.authorization&&(document.cookie=`Authorization = ${a.headers.authorization}; path=/;`),t=a.data}).catch(a=>{console.log("login JAVA api error",a)}),t}async function i(e){let t="";return await o.get(`https://backend.opus.emergobyul.com/services/confirm_email/${e}`).then(a=>{a.status===200&&a.data&&(t=a.data)}).catch(a=>{console.log("confirm_email java api error",a)}),t}async function s(){let e=!1;return await o.get("https://backend.opus.emergobyul.com/services/token/refresh").then(t=>{t.data.status_code===200&&t.headers.authorization&&(document.cookie=`Authorization = ${t.headers.authorization}; path=/;`,e=!0)}).catch(t=>{console.log("getRefreshToken java api err",t)}),e}async function n(){const e=JSON.parse(localStorage.getItem("userId"));let t="";return await o.get(`https://backend.opus.emergobyul.com/services/rbac/service/accounts/userId/${e}`).then(a=>{a&&a.data.status_code===200&&(t=a.data)}).catch(a=>{console.log("getSwitchAccounts java api error",a)}),t}async function u(){let e={};return await o.get("https://backend.opus.emergobyul.com/services/Logout").then(t=>{t.data&&(e=t.data)}).catch(t=>{console.log("get Logout Logs java api error",t)}),e}export{n as a,s as b,i as c,u as g,r as l};