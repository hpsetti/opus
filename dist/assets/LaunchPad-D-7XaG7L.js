import{_ as c,a2 as a,I as i,r as d,o as n}from"./index-BlMJxPGQ.js";const I={props:["userId","roleId"],data(){return{serviceId:""}},components:{},methods:{async getServiceId(){(JSON.parse(localStorage.getItem("services"))?JSON.parse(localStorage.getItem("services")):await a()).forEach(e=>{e.name==="Smart Builder"&&(this.serviceId=e.id)})}},created(){this.getServiceId(),this.roleId!==5&&this.roleId!==11&&this.$router.push("/home")}};function l(s,e,r,u,t,v){const o=d("router-view");return n(),i(o,{userId:r.userId,roleId:r.roleId,serviceId:t.serviceId},null,8,["userId","roleId","serviceId"])}const p=c(I,[["render",l]]);export{p as default};
