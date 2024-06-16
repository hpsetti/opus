import{r as v,m as f,a as g}from"./index-CWzxsAm4.js";import{g as x,_ as L,B as $,c as r,a,i as w,j as c,v as u,n as h,k as n,b as p,w as k,r as D,o as i,e as q,p as S,f as V}from"./index-BlMJxPGQ.js";import{L as I}from"./Loader-DR0R9oEF.js";import{p as U}from"./marketo-zx_g1DXt.js";import{u as B}from"./index-tvgxpbll.js";function F(s){return/^$|^[a-zA-Z0-9]+/.test(s)}function C(s){return/^$|^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(s)}function A(s){return/^([a-zA-Z0-9_\-\+\.]+)@([a-zA-Z-0-9-]+)((\.([a-zA-Z0-9-]){2,63}){1,3})$/.test(s)}const M={full_name:{required:v,minLength:f(2),maxLength:g(250)},business_email_address:{required:v,isValidMail:A},phone_number:{isPhoneValidOrEmpty:C},company:{minLength:f(2),isAlphaNumOrEmpty:F},detail_description:{minLength:f(3)}};async function P(s){let t=!1;return await x.post("https://backend.opus.emergobyul.com/services/user/contactus",s).then(m=>{m&&m.data.status_code===200&&m.data.message==="success"&&(t=!0)}).catch(m=>{console.log("contact us java api error",m)}),t}const E={props:["account_id","userId","roleId"],data(){return{userData:{},formData:{full_name:"",business_email_address:"",phone_number:"",company:"",detail_description:"",account_id:"",created_date:""},loaderStatus:!1,formDataLengthLimit:{full_name:65,company:65,business_email_address:65,detail_description:2e3},marketoActivities:{"ask-a-question":"Ask a Question","request-a-demo":"Demo Request","hf-validation":"HF Validation Calculator","hfe-project-scope":"HF Project Scope"}}},components:{Loader:I,BaseButton:$},setup(){return{v$:B()}},validations:{formData:M},methods:{resolveUserDataLength(s){this.formData[s]&&(this.formData[s]=this.formData[s].substr(0,this.formDataLengthLimit[s]))},async submitForm(){if(this.v$.$touch(),!this.v$.$invalid){this.formData.account_id=this.account_id,this.formData.created_date=new Date,this.loaderStatus=!0;const s=await P(this.formData);if(this.loaderStatus=!1,s){const t=this.$route.params.referrer?this.marketoActivities[this.$route.params.referrer]:"Contact Us",m={first_name:this.userData.first_name,last_name:this.userData.last_name,unstandardized_name:this.formData.full_name,email:this.userData.email,alternative_email:this.formData.business_email_address,phone:this.formData.phone_number,company:this.formData.company,unstandardized_country:this.userData.country,Last_Interest:"Human Factors Research & Design",page_urlextended:window.location.href,page_urlreferral_extended:document.referrer,o_psinquiry_type:"Sales",form_control:"Contact",form_control_details:t,customer_comments:this.formData.detail_description};U(m),this.formReset(),this.$notify({type:"success",title:"Success",text:"Form submitted successfully!"}),window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"contact_us_form_submission"})}else this.$notify({type:"error",title:"Error",text:"Please try again later!"})}},formReset(){this.v$.$reset(),this.formData={full_name:"",business_email_address:"",phone_number:"",company:"",numberof_employees:"",location:"",business_unit:"",detail_description:"",account_id:"",created_date:""}}},mounted(){this.userData=localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):{},this.formData.business_email_address=this.userData.email}},d=s=>(S("data-v-e8093e80"),s=s(),V(),s),z={class:"content-wrappper"},N={class:"row m-0"},O={class:"col-md-12"},j={class:"row mb-25 mt-20"},H={class:"col-md-5"},R=d(()=>a("label",null,"Full Name",-1)),Z=d(()=>a("span",{class:"required-asterisk"},"*",-1)),T=["maxLength"],J={key:0,class:"error_text"},Q={key:0},G={key:1},K={key:2},W={class:"row mb-25"},X={class:"col-md-5"},Y=d(()=>a("label",null,"Business Email",-1)),ee=d(()=>a("span",{class:"required-asterisk"},"*",-1)),te=["maxLength"],ae={key:0,class:"error_text"},se={key:0},oe={key:1},re={class:"row mb-25"},ie={class:"col-md-5"},ne=d(()=>a("label",null,"Phone (include country code)",-1)),me={key:0,class:"error_text"},de={key:0},le={class:"row mb-25"},_e={class:"col-md-5"},ce=d(()=>a("label",null,"Company",-1)),ue=["maxLength"],he={key:0,class:"error_text"},fe={key:0},ve={key:1},pe={class:"row mb-25"},De={class:"col-md-10 form-group"},ye=d(()=>a("label",null,"How may we help you? (Please provide as much detail as possible)",-1)),be=["maxlength"],ge={key:0,class:"error_text"},xe={key:0},Le={class:"row mb-25"},$e={class:"col-md-10 txt-rt"};function we(s,t,m,e,_,l){const y=D("BaseButton"),b=D("loader");return i(),r("div",z,[a("div",N,[a("div",O,[a("form",{onSubmit:t[9]||(t[9]=w((...o)=>l.submitForm&&l.submitForm(...o),["prevent"]))},[a("div",j,[a("div",H,[R,Z,c(a("input",{class:h(["form-control",{field_error:e.v$.formData.full_name.$error}]),type:"text",maxLength:_.formDataLengthLimit.full_name,"onUpdate:modelValue":t[0]||(t[0]=o=>e.v$.formData.full_name.$model=o),onInput:t[1]||(t[1]=o=>l.resolveUserDataLength("full_name"))},null,42,T),[[u,e.v$.formData.full_name.$model,void 0,{trim:!0}]]),e.v$.formData.full_name.$error?(i(),r("div",J,[e.v$.formData.full_name.required?n("",!0):(i(),r("div",Q," Full Name is required ")),e.v$.formData.full_name.required&&!e.v$.formData.full_name.minLength?(i(),r("div",G," Minimum 2 characters required ")):n("",!0),e.v$.formData.full_name.maxLength?n("",!0):(i(),r("div",K," Maximum 250 characters required "))])):n("",!0)])]),a("div",W,[a("div",X,[Y,ee,c(a("input",{class:h(["form-control",{field_error:e.v$.formData.business_email_address.$error}]),type:"text",maxLength:_.formDataLengthLimit.business_email_address,"onUpdate:modelValue":t[2]||(t[2]=o=>e.v$.formData.business_email_address.$model=o),onInput:t[3]||(t[3]=o=>l.resolveUserDataLength("business_email_address"))},null,42,te),[[u,e.v$.formData.business_email_address.$model,void 0,{trim:!0}]]),e.v$.formData.business_email_address.$error?(i(),r("div",ae,[e.v$.formData.business_email_address.required?n("",!0):(i(),r("div",se," Business Email is required ")),e.v$.formData.business_email_address.required&&!e.v$.formData.business_email_address.isValidMail?(i(),r("div",oe," Please enter valid email ")):n("",!0)])):n("",!0)])]),a("div",re,[a("div",ie,[ne,c(a("input",{class:h(["form-control",{field_error:e.v$.formData.phone_number.$error}]),type:"text","onUpdate:modelValue":t[4]||(t[4]=o=>e.v$.formData.phone_number.$model=o)},null,2),[[u,e.v$.formData.phone_number.$model,void 0,{trim:!0}]]),e.v$.formData.phone_number.$error?(i(),r("div",me,[e.v$.formData.phone_number.isPhoneValidOrEmpty?n("",!0):(i(),r("div",de," Please enter valid Phone "))])):n("",!0)])]),a("div",le,[a("div",_e,[ce,c(a("input",{class:h(["form-control",{field_error:e.v$.formData.company.$error}]),maxLength:_.formDataLengthLimit.company,type:"text","onUpdate:modelValue":t[5]||(t[5]=o=>e.v$.formData.company.$model=o),onInput:t[6]||(t[6]=o=>l.resolveUserDataLength("company"))},null,42,ue),[[u,e.v$.formData.company.$model,void 0,{trim:!0}]]),e.v$.formData.company.$error?(i(),r("div",he,[e.v$.formData.company.minLength?n("",!0):(i(),r("div",fe," Minimum 2 characters required ")),e.v$.formData.company.isAlphaNumOrEmpty?n("",!0):(i(),r("div",ve," First character should be alphanumeric "))])):n("",!0)])]),a("div",pe,[a("div",De,[ye,c(a("textarea",{type:"text",class:h(["form-control",{field_error:e.v$.formData.detail_description.$error}]),rows:"6",maxlength:_.formDataLengthLimit.detail_description,"onUpdate:modelValue":t[7]||(t[7]=o=>e.v$.formData.detail_description.$model=o),onInput:t[8]||(t[8]=o=>l.resolveUserDataLength("detail_description"))},null,42,be),[[u,e.v$.formData.detail_description.$model,void 0,{trim:!0}]]),e.v$.formData.detail_description.$error?(i(),r("div",ge,[e.v$.formData.detail_description.minLength?n("",!0):(i(),r("div",xe," Minimum 3 characters required "))])):n("",!0)])]),a("div",Le,[a("div",$e,[p(y,{type:"submit"},{default:k(()=>[q("Submit")]),_:1})])])],32)])]),p(b,{loadingStatus:_.loaderStatus},null,8,["loadingStatus"])])}const Ue=L(E,[["render",we],["__scopeId","data-v-e8093e80"]]);export{Ue as default};
