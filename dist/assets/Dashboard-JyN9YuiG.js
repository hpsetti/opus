import{g as u,_ as m,c as i,a,F as h,m as g,k as v,b as _,r as p,o,t as f,p as b,f as k}from"./index-BlMJxPGQ.js";import{L as y}from"./Loader-DR0R9oEF.js";async function x(){let t=[];return await u.get("https://backend.opus.emergobyul.com/services/activity/tracker/count").then(s=>{s.status===200&&s.data&&(t=s.data)}).catch(s=>{console.log("launchpad activity tracker /count api error",s)}),t}const I={props:["roleId"],data(){return{loaderStatus:!1,accountsInfo:[],usersInfo:[],services:[],serviceManagerList:[{id:1,name:"Referral Details",icon:"/static/images/dashboard/admin_tools/training.svg",url:"/launchpad/ReferralOffer"},{id:2,name:"Manage Documents",icon:"/static/images/dashboard/admin_tools/training.svg",url:"/launchpad/manage-docs"},{id:3,name:"Users List",icon:"/static/images/dashboard/admin_tools/training.svg",url:"/launchpad/users"},{id:4,name:"Cetificate for HFE for Medical Technology",icon:"/static/images/dashboard/admin_tools/training.svg",url:"/launchpad/AdminCertificateList"},{id:5,name:"Instructor Led - Time slots",icon:"/static/images/dashboard/admin_tools/training.svg",url:"/launchpad/timeslots"},{id:6,name:"Block/Unblock Emails",icon:"/static/images/tools/tool_available.svg",url:"/launchpad/email-blocking"},{id:7,name:"User Interface Requirements Library",icon:"/static/images/tools/tool_available.svg",url:"/launchpad/uirl-admin-home"},{id:8,name:"Design Recommendations Library",icon:"/static/images/tools/tool_available.svg",url:"/launchpad/drl-admin-home"},{id:9,name:"Root Cause Analysis Wizard",icon:"/static/images/dashboard/admin_tools/tools.svg",url:"/launchpad/RCA-admin-home"},{id:10,name:"Activate Service",icon:"/static/images/dashboard/admin_tools/activate.svg",url:"/launchpad/activate-service"},{id:11,name:"Revoke Service",icon:"/static/images/dashboard/admin_tools/activate.svg",url:"/launchpad/revoke-service"},{id:12,name:"HFE Insights",icon:"/static/images/dashboard/admin_tools/hfe_insights.svg",url:"/launchpad/hfe-insights"},{id:13,name:"Consulting Hours",icon:"/static/images/consulting.svg",url:"/launchpad/consulting-hours"}]}},components:{Loader:y},async created(){this.roleId===5&&await this.getActivityTrackerData()},methods:{navigateToConsult(t){this.$router.push(t)},async getActivityTrackerData(){this.loaderStatus=!0,(await x()).data.forEach(s=>{s.name==="accounts"?this.accountsInfo=s:s.name==="users"&&(this.usersInfo=s)}),this.loaderStatus=!1}}},r=t=>(b("data-v-fb8beca9"),t=t(),k(),t),S={class:"content-wrappper"},C={class:"submission-container"},L={class:"pl-15"},A=r(()=>a("div",{class:"col-xs-12 pb-15 d-flex justify-content-between"},[a("span",{class:"text-h2"},"Admin Tools")],-1)),D={key:0,class:"col-xs-12 pb-15"},T=r(()=>a("div",null,[a("span",{class:"text-h4"},"Service Manager")],-1)),R={class:"mt-10 d-flex col-gap-20 flex-wrap row-gap-20 xs-flex-direction-column"},w=["onClick"],E={class:"p-0"},M={class:""},B=["src"],F={class:"text-subtitle-2"};function H(t,s,n,N,c,l){const d=p("loader");return o(),i("div",S,[a("div",C,[a("div",L,[A,n.roleId===5||n.roleId===11?(o(),i("div",D,[a("div",null,[T,a("div",R,[(o(!0),i(h,null,g(c.serviceManagerList,e=>(o(),i("div",{class:"cursor-pointer services-card d-flex col-gap-10 align-items-center",onClick:U=>l.navigateToConsult(e.url),key:e.id},[a("div",E,[a("div",M,[a("img",{src:e.icon},null,8,B)])]),a("div",null,[a("p",F,f(e.name),1)])],8,w))),128))])])])):v("",!0)])]),_(d,{loadingStatus:c.loaderStatus},null,8,["loadingStatus"])])}const j=m(I,[["render",H],["__scopeId","data-v-fb8beca9"]]);export{j as default};