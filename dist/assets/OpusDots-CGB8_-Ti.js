import{_ as r,o as e,c as s,F as o,m as u,n as i}from"./index-BlMJxPGQ.js";const c={name:"OpusDots",props:{count:{type:Number,required:!0},position:{type:Number,required:!0},variant:{type:String,default:"blue",validator:a=>["blue","white"].includes(a)}}},l={class:"opus-dots"};function d(a,p,t,_,m,f){return e(),s("div",l,[(e(!0),s(o,null,u(t.count,n=>(e(),s("span",{key:n,class:i(["opus-dot",{active:t.position===n,[`${t.variant}`]:t.variant}])},null,2))),128))])}const b=r(c,[["render",d]]);export{b as O};