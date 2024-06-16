import{_ as $,B as V,r as n,o as g,c as v,a as e,t as E,b as a,w as y,e as p,p as A,f as I,O as P,$ as m,Z as j,j as D,v as k,s as N,n as C,q as B,F as Y,m as X,k as F}from"./index-BlMJxPGQ.js";import{o as q,_ as K}from"./edit_icon_new-D9iwJqyt.js";import{L as U}from"./Loader-DR0R9oEF.js";import"./event-bus-DYoA24Gz.js";import{u as G,a as W,b as z,g as Z,d as J}from"./hfeInsightsAdmin-BGEeDCMR.js";import{i as M}from"./index.es-Cl9EeDOg.js";import{c as H}from"./cloneDeep-ldw2ZiUo.js";import{O}from"./OpusEditor-Cn6yaL1S.js";import{_ as Q}from"./delete-Czt7tnOC.js";import{_ as R}from"./more-horizontal-YxyMY0P_.js";import{_ as ee}from"./delete_icon-WtjTFUCM.js";import{_ as te}from"./back_arrow-DlGi0Dam.js";import"./_baseAssignValue-BD6sbZ4C.js";const se={props:["rec"],components:{BaseButton:V}},L=s=>(A("data-v-8cab6320"),s=s(),I(),s),oe={id:"delete_hfe",class:"modal",role:"dialog"},le={class:"modal-dialog"},ie={class:"modal-content"},ae=L(()=>e("div",{class:"modal-header"},[e("div",{class:"d-flex justify-content-between float-right"},[e("img",{"data-dismiss":"modal",class:"cursor-pointer",src:P,alt:""})])],-1)),ne={class:"modal-body"},de={class:"center center-block w-80"},re=L(()=>e("span",{class:"text-h4 pr-20 pl-20"},"Are you sure you want to delete HFE Insight(s)",-1)),ce={class:"text-subtitle-1 pt-20 pb-20"},he=L(()=>e("p",{class:"text-regular-large pt-20"}," Deleting will remove this permanently from the database. ",-1)),_e={class:"d-flex justify-content-center p-0 mt-20 col-gap-10 mb-20"};function ue(s,t,r,w,o,l){const u=n("BaseButton");return g(),v("div",null,[e("div",oe,[e("div",le,[e("div",ie,[ae,e("div",ne,[e("div",de,[re,e("div",ce,E(r.rec.recommendation_title),1),he]),e("div",_e,[a(u,{"data-dismiss":"modal",variant:"secondary"},{default:y(()=>[p("Cancel")]),_:1}),a(u,{variant:"error",onClick:t[0]||(t[0]=x=>s.$emit("delete"))},{default:y(()=>[p("Yes, Delete")]),_:1})])])])])])])}const me=$(se,[["render",ue],["__scopeId","data-v-8cab6320"]]),pe={components:{Loader:U,DatePicker:M,BaseButton:V,OpusEditor:O},props:["editDetails"],data(){return{allCategoryList:[],tagsList:[],UTCFormat:"DD-MMM-YYYY",maxlength:1e4,loaderStatus:!1,selectedAddCategory:null,categoryName:null,getSubCategoryById:null,UpdateNewCategoryNew:null,getAllSubCategories:[],formDetails:{authors_name:"",authors_work_title:"",date_created:"",hfe_insight_headline:"",id:null,insight_content:"",website_link:""},selectedFile:null,errorTxt:""}},async created(){m("#edit-hfe").on("shown.bs.modal",()=>{this.formDetails=H(this.editDetails)})},watch:{editDetails:{handler(s){s&&(this.formDetails=H(s))},immediate:!0}},computed:{canSave(){return this.formDetails.hfe_insight_headline&&this.formDetails.insight_content&&this.formDetails.date_created&&this.errorTxt===""&&this.formDetails.insight_content.length<this.maxlength}},methods:{getDateFormat:j,formatDMYToYMD(s){const[t,r,w]=s.split("-");return`${w}-${t}-${r}`},closeAddNewContentPopUp(){m("#edit-hfe").modal("hide"),this.editDetails&&(this.formDetails=H(this.editDetails))},setDefaultValues(){this.formDetails={authors_name:"",authors_work_title:"",date_created:"",hfe_insight_headline:"",id:null,insight_content:"",website_link:""},m("#edit-hfe").modal("hide")},async updateHfe(){this.loaderStatus=!0,this.formDetails.active=!0,this.formDetails.hfe_viewing_order=this.formDetails.viewing_order;const s={hfe_insight_list:[this.formDetails]},t=H(s),r=await G(t);r?r.data==="HfeHeadline already Exist"?(this.$notify({type:"warning",title:"Warning",text:r.data}),this.categoryName=""):(this.$notify({type:"success",title:"Success",text:r.data}),this.setDefaultValues(),m("#add-new-rec").modal("hide")):this.$notify({type:"error",title:"Error",text:r.data}),this.setDefaultValues(),this.emitter.emit("getHfeData"),this.loaderStatus=!1}}},h=s=>(A("data-v-e042097c"),s=s(),I(),s),fe={id:"edit-hfe",class:"modal fade",role:"dialog"},ge={class:"modal-dialog modal-lg"},ve={class:"modal-content p-10"},ye={class:"modal-header"},we={class:"col-xs-12 p-0 flex-between"},xe=h(()=>e("div",{class:"top-header"},"Edit HFE Insight",-1)),De=h(()=>e("hr",{class:"mr-15 ml-15 my-0"},null,-1)),be={class:"modal-body"},ke={class:"row mb-20"},Se={class:"col-xs-12 mb-10"},$e=h(()=>e("label",null,"HFE Insight Headline",-1)),Ce=h(()=>e("span",{class:"text-required"}," *",-1)),He={class:"form-group"},Ee={class:"col-xs-12 mb-10"},Ve=h(()=>e("label",null,"Author’s full name",-1)),Ae={class:"form-group"},Ie={class:"col-xs-12 mb-10"},Pe=h(()=>e("label",null,"Author’s work title",-1)),Ue={class:"form-group"},Le={class:"col-xs-4 mb-10"},Be=h(()=>e("label",null,"Select date",-1)),Fe=h(()=>e("span",{class:"text-required"}," *",-1)),je={class:"form-group"},Me={class:"col-xs-12 mb-10"},Oe=h(()=>e("p",{class:"text-button-label"},"Insight content",-1)),Te=h(()=>e("label",null,"Insight content",-1)),Ne=h(()=>e("span",{class:"text-required"}," *",-1)),Ye={class:"col-xs-12 p-0"},Xe=h(()=>e("hr",null,null,-1)),qe={class:"d-flex justify-content-end col-gap-20"};function Ke(s,t,r,w,o,l){const u=n("date-picker"),x=n("OpusEditor"),f=n("BaseButton"),S=n("loader");return g(),v("div",fe,[e("div",ge,[e("div",ve,[e("div",ye,[e("div",we,[xe,e("div",null,[e("img",{src:P,alt:"",class:"cursor-pointer",onClick:t[0]||(t[0]=(...i)=>l.closeAddNewContentPopUp&&l.closeAddNewContentPopUp(...i))})])])]),De,e("div",be,[e("div",ke,[e("div",Se,[$e,Ce,e("div",He,[D(e("input",{"onUpdate:modelValue":t[1]||(t[1]=i=>o.formDetails.hfe_insight_headline=i),type:"text",class:"form-control common-input",placeholder:"Enter headline text",maxlength:"256"},null,512),[[k,o.formDetails.hfe_insight_headline]])])]),e("div",Ee,[Ve,e("div",Ae,[D(e("input",{"onUpdate:modelValue":t[2]||(t[2]=i=>o.formDetails.authors_name=i),type:"text",class:"form-control common-input",maxlength:"256",placeholder:"Enter Author’s full name"},null,512),[[k,o.formDetails.authors_name]])])]),e("div",Ie,[Pe,e("div",Ue,[D(e("input",{"onUpdate:modelValue":t[3]||(t[3]=i=>o.formDetails.authors_work_title=i),type:"text",class:"form-control common-input",maxlength:"256",placeholder:"Enter Author’s work title"},null,512),[[k,o.formDetails.authors_work_title]])])]),e("div",Le,[Be,Fe,e("div",je,[a(u,{modelValue:o.formDetails.date_created,"onUpdate:modelValue":t[4]||(t[4]=i=>o.formDetails.date_created=i),type:"date",lang:"en",valueType:"YYYY-MM-DDTHH:mm",format:o.UTCFormat,placeholder:"XX-XX-XXXX"},null,8,["modelValue","format"])])]),e("div",Me,[Oe,Te,Ne,e("div",Ye,[a(x,{id:"add-hfe-content",modelValue:o.formDetails.insight_content,"onUpdate:modelValue":t[5]||(t[5]=i=>o.formDetails.insight_content=i),maxlength:o.maxlength},null,8,["modelValue","maxlength"])])])]),Xe,e("div",qe,[a(f,{variant:"secondary",onClick:l.closeAddNewContentPopUp},{default:y(()=>[p("Cancel")]),_:1},8,["onClick"]),a(f,{onClick:l.updateHfe,disabled:!l.canSave},{default:y(()=>[p("Save")]),_:1},8,["onClick","disabled"])])])])]),a(S,{loadingStatus:o.loaderStatus},null,8,["loadingStatus"])])}const Ge=$(pe,[["render",Ke],["__scopeId","data-v-e042097c"]]),We={components:{Loader:U,BaseButton:V,OpusEditor:O,DatePicker:M},data(){return{allCategoryList:[],tagsList:[],loaderStatus:!1,UTCFormat:"DD-MMM-YYYY",selectedAddCategory:null,categoryName:null,getSubCategoryById:null,UpdateNewCategoryNew:null,getAllSubCategories:[],maxlength:1e4,formDetails:{active:!0,authors_name:"",authors_work_title:"",date_created:"",hfe_insight_headline:"",id:0,insight_content:"",website_link:""},errorTxt:""}},computed:{canSave(){return this.formDetails.hfe_insight_headline&&this.formDetails.insight_content&&this.formDetails.date_created&&this.errorTxt===""&&this.formDetails.insight_content.length<this.maxlength}},methods:{closeAddNewContentPopUp(){this.setDefaultValues(),m("#add-hfe").modal("hide")},setDefaultValues(){this.formDetails={authors_name:"",authors_work_title:"",date_created:"",hfe_insight_headline:"",id:null,insight_content:"",website_link:""},m("#add-hfe").modal("hide")},formatDMYToYMD(s){const[t,r,w]=s.split("-");return`${w}-${t}-${r}`},async addHfe(){this.loaderStatus=!0,this.formDetails.active=!0;const s=await W(this.formDetails);s?s.data==="HfeHeadline already Exist"?(this.$notify({type:"warning",title:"Warning",text:s.data}),this.categoryName=""):(this.$notify({type:"success",title:"Success",text:s.data}),this.setDefaultValues(),m("#add-new-rec").modal("hide")):this.$notify({type:"error",title:"Error",text:s.data}),this.setDefaultValues(),this.emitter.emit("getHfeData"),this.loaderStatus=!1}}},_=s=>(A("data-v-a0a2dc34"),s=s(),I(),s),ze={id:"add-hfe",class:"modal fade",role:"dialog"},Ze={class:"modal-dialog modal-lg"},Je={class:"modal-content p-10"},Qe={class:"modal-header"},Re={class:"col-xs-12 p-0 flex-between"},et=_(()=>e("div",{class:"top-header"},"Add HFE Insight",-1)),tt=_(()=>e("hr",{class:"mr-15 ml-15 my-0"},null,-1)),st={class:"modal-body"},ot={class:"row mb-20"},lt={class:"col-xs-12 mb-10"},it=_(()=>e("label",null,"HFE Insight Headline",-1)),at=_(()=>e("span",{class:"text-required"}," *",-1)),nt={class:"form-group"},dt={class:"col-xs-12 mb-10"},rt=_(()=>e("label",null,"Author’s full name",-1)),ct={class:"form-group"},ht={class:"col-xs-12 mb-10"},_t=_(()=>e("label",null,"Author’s work title",-1)),ut={class:"form-group"},mt={class:"col-xs-4 mb-10"},pt=_(()=>e("label",null,"Select date",-1)),ft=_(()=>e("span",{class:"text-required"}," *",-1)),gt={class:"form-group"},vt={class:"col-xs-12 mb-10"},yt=_(()=>e("p",{class:"text-button-label"},"Insight content",-1)),wt=_(()=>e("label",null,"Insight content",-1)),xt=_(()=>e("span",{class:"text-required"}," *",-1)),Dt={class:"col-xs-12 p-0"},bt=_(()=>e("hr",null,null,-1)),kt={class:"d-flex justify-content-end col-gap-20"};function St(s,t,r,w,o,l){const u=n("date-picker"),x=n("OpusEditor"),f=n("BaseButton"),S=n("loader");return g(),v("div",ze,[e("div",Ze,[e("div",Je,[e("div",Qe,[e("div",Re,[et,e("div",null,[e("img",{src:P,alt:"",class:"cursor-pointer",onClick:t[0]||(t[0]=(...i)=>l.closeAddNewContentPopUp&&l.closeAddNewContentPopUp(...i))})])])]),tt,e("div",st,[e("div",ot,[e("div",lt,[it,at,e("div",nt,[D(e("input",{"onUpdate:modelValue":t[1]||(t[1]=i=>o.formDetails.hfe_insight_headline=i),type:"text",class:"form-control common-input",placeholder:"Enter headline text",maxlength:"256"},null,512),[[k,o.formDetails.hfe_insight_headline]])])]),e("div",dt,[rt,e("div",ct,[D(e("input",{"onUpdate:modelValue":t[2]||(t[2]=i=>o.formDetails.authors_name=i),type:"text",class:"form-control common-input",maxlength:"256",placeholder:"Enter Author’s full name (Optional)"},null,512),[[k,o.formDetails.authors_name]])])]),e("div",ht,[_t,e("div",ut,[D(e("input",{"onUpdate:modelValue":t[3]||(t[3]=i=>o.formDetails.authors_work_title=i),type:"text",class:"form-control common-input",maxlength:"256",placeholder:"Enter Author’s work title (Optional)"},null,512),[[k,o.formDetails.authors_work_title]])])]),e("div",mt,[pt,ft,e("div",gt,[a(u,{modelValue:o.formDetails.date_created,"onUpdate:modelValue":t[4]||(t[4]=i=>o.formDetails.date_created=i),type:"date",lang:"en",valueType:"YYYY-MM-DDTHH:mm",format:o.UTCFormat,placeholder:"XX-XX-XXXX"},null,8,["modelValue","format"])])]),e("div",vt,[yt,wt,xt,e("div",Dt,[a(x,{id:"add-hfe-content",modelValue:o.formDetails.insight_content,"onUpdate:modelValue":t[5]||(t[5]=i=>o.formDetails.insight_content=i),maxlength:o.maxlength},null,8,["modelValue","maxlength"])])])]),bt,e("div",kt,[a(f,{variant:"secondary",onClick:l.closeAddNewContentPopUp},{default:y(()=>[p("Cancel")]),_:1},8,["onClick"]),a(f,{onClick:l.addHfe,disabled:!l.canSave},{default:y(()=>[p("Save")]),_:1},8,["onClick","disabled"])])])])]),a(S,{loadingStatus:o.loaderStatus},null,8,["loadingStatus"])])}const $t=$(We,[["render",St],["__scopeId","data-v-a0a2dc34"]]),Ct="/static/images/icons/plus_white.svg",Ht={components:{Loader:U,DeleteHFEModal:me,EditHFEModal:Ge,AddHFEModal:$t,BaseButton:V,Multiselect:N},async created(){this.emitter.on("getHfeData",async()=>{await this.getHfeInsightsData()}),await this.getHfeInsightsData(),this.setSortBy("hfe_insight_headline")},data(){return{insights:[],changeClass:!1,selectedItem:{},editDetails:null,filteredList:[],selectedProjects:[],selectedProject:[],loaderStatus:!1,isSelectAll:!1,sortingType:"name",sortingOrder:"asc",sortIcon:"asc",availableViewingOrder:[],viewingOrder:[],isViewingOrderUnique:!1,newList:[],sortOptions:{hfe_insight_headline:1,date_created:-1,viewing_order:-1}}},methods:{getDateFormat:j,openAddPopup(){this.openAddNewContentPopup()},async addHfe(){this.loaderStatus=!0,this.filteredList.active=!0;const s=await z(this.filteredList);s?s.data==="HfeHeadline already Exist"?(this.$notify({type:"warning",title:"Warning",text:s.data}),this.categoryName=""):this.$notify({type:"success",title:"Success",text:s.data}):this.$notify({type:"error",title:"Error",text:s.data}),this.emitter.emit("getHfeData"),await this.getHfeInsightsData(),this.isViewingOrderUnique=!1,this.loaderStatus=!1},openAddNewContentPopup(){m("#add-hfe").modal({backdrop:"static",keyboard:!1})},onSelectAll(){this.isSelectAll=this.selectedProjects.length===this.filteredList.length},deSelectAll(){this.selectedProjects=[],this.isSelectAll=!1},setAllSelected(){this.isSelectAll?this.selectedProjects=this.filteredList.map(s=>s.id):this.selectedProjects=[]},async getHfeInsightsData(){this.loaderStatus=!0;const s=await Z();s&&(this.filteredList=s),this.availableViewingOrder=this.filteredList.map(t=>t.viewing_order),this.loaderStatus=!1},setViewingorder(){this.$nextTick(()=>{this.newList=this.filteredList.map(s=>s.viewing_order),this.newList.length===new Set(this.newList).size?this.isViewingOrderUnique=!0:this.isViewingOrderUnique=!1})},deleteHfeInsight(s=!1,t){s?this.selectedProject=[]:this.selectedProject=t,m("#delete_hfe").modal({backdrop:"static",keyboard:!1})},async deleteHfe(){const s=this.selectedProjects.length?this.selectedProjects:[this.selectedProject];this.loaderStatus=!0;const t=await J(s);t.message==="success"?this.$notify({type:"success",title:"Success",text:t.data}):this.$notify({type:"error",title:"Error",text:t.data}),m("#delete_hfe").modal("hide"),await this.getHfeInsightsData(),this.deSelectAll(),this.loaderStatus=!1},openEditPopup(s){this.editDetails=s,this.openEditContentPopup()},openEditContentPopup(){m("#edit-hfe").modal({backdrop:"static",keyboard:!1})},menuDropdown(s){this.changeClass=!1,s.screenY>window.innerHeight-150?this.changeClass=!0:this.changeClass=!1},getSortKey(s){let t="";return t+=this.sortOptions[s]>0?"asc":"desc",t+=this.sortingType===s?" active":" ",t},setSortBy(s){this.sortingType=s,this.sortOptions[s]*=-1;const t=this.sortOptions[s]>0?"desc":"asc";this.sortIcon=t,this.filteredList=q(this.filteredList,s,t)}}},c=s=>(A("data-v-434778d2"),s=s(),I(),s),Et={class:"col-md-12 col-lg-12 col-sm-12 pl-20 pr-20 xs-pr-0 mt-20"},Vt={class:"d-flex justify-content-end"},At=c(()=>e("img",{class:"back-img gap-nve-5",src:Q,alt:""},null,-1)),It=c(()=>e("span",null,"Delete",-1)),Pt=[At,It],Ut=c(()=>e("img",{src:Ct,alt:"Add Category",class:"preview-svg"},null,-1)),Lt=c(()=>e("span",null,"Add Insight",-1)),Bt={class:"text-subtitle-2"},Ft={key:0,class:"pagination-wrapper pt-20"},jt={class:"projects-table"},Mt={class:"pl-5 pr-10"},Ot={class:"select-box"},Tt={class:"checkbox"},Nt=c(()=>e("span",{class:"cr"},[e("i",{class:"cr-icon glyphicon glyphicon-ok"})],-1)),Yt={class:"pl-5 pr-10 select-checkbox"},Xt={class:"select-box"},qt={class:"checkbox"},Kt=["value"],Gt=c(()=>e("span",{class:"cr"},[e("i",{class:"cr-icon glyphicon glyphicon-ok"})],-1)),Wt={class:"table-data-fixed-width"},zt={class:"table-data-fixed-width"},Zt={class:"d-flex align-items-center justify-content-between"},Jt={class:"dropdown pr-20 pl-20"},Qt=c(()=>e("img",{src:R,"data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},null,-1)),Rt={class:"dropdown-menu dropdown-menu-right pb-10 pt-10"},es=["onClick"],ts=c(()=>e("img",{src:K,class:"preview-svg"},null,-1)),ss=c(()=>e("span",{class:"ml-10 project-menu-action"},"Edit",-1)),os=[ts,ss],ls=["onClick"],is=c(()=>e("img",{src:ee,class:"preview-svg"},null,-1)),as=c(()=>e("span",{class:"ml-10 project-menu-action delete"},"Delete",-1)),ns=[is,as],ds={key:1,class:"norecords_wrapper"},rs=c(()=>e("div",{class:"mt-50 no-records-found"},"No insights found!",-1)),cs=[rs],hs=c(()=>e("span",null,"Update Order",-1));function _s(s,t,r,w,o,l){const u=n("BaseButton"),x=n("multiselect"),f=n("AddHFEModal"),S=n("EditHFEModal"),i=n("DeleteHFEModal"),T=n("loader");return g(),v("div",Et,[e("div",Vt,[e("p",{class:C(["item-action delete pr-20 pt-10 cursor-pointer",o.selectedProjects.length?"":"disabled"]),onClick:t[0]||(t[0]=d=>l.deleteHfeInsight(!0))},Pt,2),a(u,{variant:"primary","has-icon":"",onClick:l.openAddPopup,disabled:o.filteredList.length>9},{default:y(()=>[Ut,Lt]),_:1},8,["onClick","disabled"])]),e("span",Bt,E(o.filteredList.length)+" items",1),o.filteredList.length>0?(g(),v("div",Ft,[e("table",jt,[e("thead",null,[e("tr",null,[e("th",Mt,[e("div",Ot,[e("div",Tt,[e("label",null,[D(e("input",{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=d=>o.isSelectAll=d),onChange:t[2]||(t[2]=d=>l.setAllSelected())},null,544),[[B,o.isSelectAll]]),Nt])])])]),e("th",{onClick:t[3]||(t[3]=d=>l.setSortBy("hfe_insight_headline"))},[p(" Training name "),e("span",{class:C(["sort-key",l.getSortKey("hfe_insight_headline")])},null,2)]),e("th",{onClick:t[4]||(t[4]=d=>l.setSortBy("date_created"))},[p(" Date "),e("span",{class:C(["sort-key",l.getSortKey("date_created")])},null,2)]),e("th",{onClick:t[5]||(t[5]=d=>l.setSortBy("viewing_order"))},[p(" Viewing order "),e("span",{class:C(["sort-key",l.getSortKey("viewing_order")])},null,2)])])]),e("tbody",null,[(g(!0),v(Y,null,X(o.filteredList,d=>(g(),v("tr",{key:d.id},[e("td",Yt,[e("div",Xt,[e("div",qt,[e("label",null,[D(e("input",{type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=b=>o.selectedProjects=b),value:d.id,onChange:t[7]||(t[7]=b=>l.onSelectAll())},null,40,Kt),[[B,o.selectedProjects]]),Gt])])])]),e("td",null,E(d.hfe_insight_headline),1),e("td",Wt,E(l.getDateFormat(d.date_created)),1),e("td",zt,[e("div",Zt,[a(x,{class:"table-data-fixed-px multiselect-single-dropdown",modelValue:d.viewing_order,"onUpdate:modelValue":b=>d.viewing_order=b,multiple:!1,options:o.availableViewingOrder,"close-on-select":!0,"show-labels":!1,"allow-empty":!1,searchable:!1,onSelect:l.setViewingorder},null,8,["modelValue","onUpdate:modelValue","options","onSelect"]),e("div",Jt,[Qt,e("div",Rt,[e("div",{class:"project-menu-action-container p-15",onClick:b=>l.openEditPopup(d)},os,8,es),e("div",{class:"project-menu-action-container p-15",onClick:b=>l.deleteHfeInsight(!1,d.id)},ns,8,ls)])])])])]))),128))])])])):F("",!0),o.filteredList.length===0?(g(),v("div",ds,cs)):F("",!0),a(u,{class:"mt-10 float-right",variant:"primary","has-icon":"",onClick:l.addHfe,disabled:!o.isViewingOrderUnique},{default:y(()=>[hs]),_:1},8,["onClick","disabled"]),a(f),a(S,{editDetails:o.editDetails},null,8,["editDetails"]),a(i,{rec:o.selectedItem,onDelete:t[8]||(t[8]=d=>l.deleteHfe(o.selectedItem.id))},null,8,["rec"]),a(T,{loadingStatus:o.loaderStatus},null,8,["loadingStatus"])])}const us=$(Ht,[["render",_s],["__scopeId","data-v-434778d2"]]),ms={name:"AdminHFEHome",components:{HFEGrid:us},data(){return{allCategoryList:[],getAvailableTags:[]}},methods:{navigateToLaunchPad(){this.$router.push("/launchpad")}}},ps={class:"content-wrappper"},fs={class:"row m-0"},gs={class:"mt-20 pr-20 pl-20"},vs={class:"col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 p-0"},ys=e("div",{class:"text-h3"},"HFE Insights",-1);function ws(s,t,r,w,o,l){const u=n("router-link"),x=n("HFEGrid");return g(),v("div",ps,[e("div",fs,[e("div",gs,[e("div",vs,[e("img",{onClick:t[0]||(t[0]=(...f)=>l.navigateToLaunchPad&&l.navigateToLaunchPad(...f)),class:"back-img cursor-pointer",src:te,alt:""}),a(u,{class:"text-subtitle-2 blue-1",to:"/launchpad"},{default:y(()=>[p("Launchpad")]),_:1})]),ys]),a(x)])])}const Us=$(ms,[["render",ws]]);export{Us as default};
