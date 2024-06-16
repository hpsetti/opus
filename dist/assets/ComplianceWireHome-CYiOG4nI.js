import{L}from"./Loader-DR0R9oEF.js";import{_ as y,B as k,d as m,r as u,o,c as n,a as e,t as r,n as v,k as _,b as d,w as C,p as w,f as T,V as q,$,e as I,F as D,m as M,l as H,O as z}from"./index-BlMJxPGQ.js";import{c as E}from"./constants-DZfa7LnM.js";import{d as Z}from"./documentsMixin-Bh1uCigM.js";import{_ as O,a as P}from"./calender-CCkx0mDr.js";import{_ as B}from"./clock-Bt2qCWrf.js";import{_ as N}from"./trash-D7-advNl.js";import{p as G}from"./marketo-zx_g1DXt.js";import{a as K,g as Q}from"./cart-QHhiBhPv.js";import{E as X}from"./event-bus-DYoA24Gz.js";import{_ as tt}from"./info-modal-training-icon-Dm7yAfS1.js";import{_ as et}from"./play-ATQZXid4.js";import{T as st,g as V}from"./complianceWire-CYgeEq9M.js";import{A as it}from"./AddRemoveCartPopup-CqkASo7c.js";import{s as at}from"./shared-uD02DoJF.js";import{_ as ot}from"./caret_up-B2jHJbJA.js";import{_ as nt}from"./purchased_resources-Dm7E7KcS.js";import{_ as rt}from"./single_document-D27k7af0.js";import{g as lt,a as ct}from"./instructorLedTraining-DE_vpi5U.js";import{g as dt}from"./lmsTraining-BNcLeb-5.js";import{_ as _t}from"./basket-GdfS_fz3.js";import"./documents-CP6oEKge.js";const ut={mixins:[Z],props:{trainingDetails:{type:Object,default:()=>{}},type:{type:String,default:""},userId:{type:Number}},data(){return{statusMap:{"Not Started":"Enrolled",Incomplete:"In progress"},loaderStatus:!1,notEnrolled:"Not Enrolled",cartInfo:{},cartStatus:E,selectedTrainingInfo:null}},computed:{isILT(){return this.trainingDetails.plan_type==="Instructor Led"},isPreRecCourse(){return this.trainingDetails.plan_type==="Instructor Led"&&this.trainingDetails.type==="Pre-recorded course"},btnVariant(){return this.selectedTrainingInfo.cart_status.purchase_status==="ADD_TO_CART"?"primary":this.selectedTrainingInfo.cart_status.purchase_status==="REMOVE_FROM_CART"?"secondary":""},slotMoreOptions(){const t=this.selectedTrainingInfo;return t<=1?"":t===2?" + 1 more option":` + ${t-1} more options`}},components:{Loader:L,BaseButton:k},watch:{trainingDetails:{handler(t){t&&(this.selectedTrainingInfo=this.trainingDetails)},immediate:!0}},methods:{getImageUrl(t){return t?`https://opusjavaprodstorage.blob.core.windows.net${t}`:null},formatedDate(t){if(t){const[a,i]=t;return m(`${a}-${i}`).format("MMM YYYY")}return""},formatToLocalDate(t){return t?m.utc(`${t}`).local().format("ddd MMM DD , YYYY"):""},dateConvert(t){const a=m.utc(`${t.slot_start_time}`).format("MMM DD"),i=m.utc(`${t.slot_end_time}`).format("MMM DD"),c=m.utc(`${t.slot_end_time}`).format("YYYY");return`${a}-${i}, ${c}`},timeConvert(t){const a=m.utc(`${t.slot_start_time}`).format("hh A"),i=m.utc(`${t.slot_end_time}`).format("hh A");return`${a} to ${i} ET`},getDateList(t){return this.dateConvert(t[0])},getTimeList(t){return this.timeConvert(t[0])},setSelectedTraining(){const{plan_type:t}=this.trainingDetails,a=this.trainingDetails;if(t==="ComplianceWire Training"){const i=a.title.replace(/®/g,"").replace(/ /g,"-").toLowerCase();localStorage.setItem("scheduleTrainingId",JSON.stringify(a.course_id)),localStorage.setItem("schedulePlanId",JSON.stringify(a.plan_id));const c=a.plan_id;this.$router.push({path:`/compliancewire-marketplace/details/${i}`,query:{planId:c,userId:this.userId}})}},async addRemoveCart(t){const{purchase_status:a}=t.cart_status;if(a==="REMOVE_FROM_CART"){const i={type:"remove",body:"Are you sure you want to remove this item?"};this.$emit("setCartInfo",{cartInfo:i,item:this.trainingDetails})}else a==="ADD_TO_CART"&&(this.$emit("onShowTimeSlots",this.trainingDetails),window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:"add_to_cart_button_click",add_to_cart_type:t.plan_type,add_to_cart_title:t.title}))}}},S=t=>(w("data-v-1ddea423"),t=t(),T(),t),pt={class:"col-xs-12 col-sm-8 col-md-7 p-0 d-flex col-gap-20 align-items-center xs-flex-column"},mt=["src"],ht={class:"d-flex flex-direction-column col-xs-12 p-0"},gt={class:"fw-300 text-primary mb-5 d-flex justify-content-between xs-flex-column"},ft={class:"fw-700 font-18 text-primary mb-10 d-flex justify-content-between xs-flex-column"},vt={class:"d-flex col-gap-30 xs-flex-column"},yt=S(()=>e("div",{class:"d-flex align-items-center"},[e("img",{class:"pr-10",src:O,alt:""}),e("span",{class:"font-14 fw-300"},"Online")],-1)),It={class:"d-flex align-items-center"},wt=S(()=>e("img",{class:"preview-svg",src:B,alt:""},null,-1)),Tt={class:"time-text"},xt={class:"d-flex align-items-center"},Ct=S(()=>e("img",{class:"pr-10",src:P,alt:""},null,-1)),Dt={key:0},Lt={key:1},St={class:"col-xs-12 col-sm-4 col-md-5 p-0 d-flex flex-direction-column justify-content-center"},bt={key:0,class:"col-xs-12 pl-0 pr-0 justify-end col-gap-20"},kt={class:"col-xs-12 d-flex pl-0 pr-0 justify-end mb-10 col-gap-20"},$t=S(()=>e("span",{class:"font-18 fw-700"},"Price",-1)),Mt={class:"font-18 price-text"},Rt={class:"col-xs-12 p-0 d-flex col-gap-20 xs-flex-column justify-content-end align-items-center pl-0 cursor-pointer price"},At={key:1},Et={key:0,src:N,alt:"",class:"preview-svg"};function Ot(t,a,i,c,s,l){const p=u("BaseButton"),h=u("loader");return s.selectedTrainingInfo?(o(),n("div",{key:0,class:v(["details-wrapper col-xs-12 p-10 mb-10 d-flex xs-flex-column",{"cart-item":i.type==="cart"||!s.selectedTrainingInfo.enrolled&&s.selectedTrainingInfo.cart_status.purchase_status==="REMOVE_FROM_CART","gray-out":i.trainingDetails&&s.selectedTrainingInfo.disable_as_bundle_added_to_cart,"cursor-pointer":s.selectedTrainingInfo.enrolled}])},[e("div",pt,[e("img",{class:"training-img",src:l.getImageUrl(i.trainingDetails.blob_course_icon_url),alt:""},null,8,mt),e("div",ht,[e("div",gt,[e("div",null,r(i.trainingDetails.plan_type),1)]),e("div",ft,[e("div",{class:v({"flex-50":s.selectedTrainingInfo.enrolled&&i.trainingDetails.is_trainings&&i.trainingDetails.type!=="Certificate"})},r(i.trainingDetails.title),3)]),e("div",vt,[yt,e("div",It,[wt,e("span",Tt,r(s.selectedTrainingInfo.duration_hours)+" "+r(s.selectedTrainingInfo.duration_hours>1?"hours":"hour"),1)]),e("div",xt,[Ct,s.selectedTrainingInfo.enrolled?(o(),n("div",Lt,"More dates coming soon")):(o(),n("div",Dt,r(l.getDateList(s.selectedTrainingInfo.all_available_time_slots))+" "+r(l.getTimeList(s.selectedTrainingInfo.all_available_time_slots)),1))])])])]),e("div",St,[i.trainingDetails.plan_type==="ComplianceWire Training"||!s.selectedTrainingInfo.enrolled?(o(),n("div",bt,[e("div",null,[e("div",kt,[$t,e("span",Mt,"$"+r(i.trainingDetails.price),1)])])])):_("",!0),e("div",Rt,[!s.selectedTrainingInfo.enrolled||i.trainingDetails.plan_type==="ComplianceWire Training"?(o(),n("span",{key:0,class:"cursor-pointer font-18 fw-600",onClick:a[0]||(a[0]=g=>l.setSelectedTraining())},"View Details")):_("",!0),s.selectedTrainingInfo.enrolled?_("",!0):(o(),n("div",At,[d(p,{class:"br-20 d-flex align-items-center col-gap-10",variant:l.btnVariant,"has-icon":s.selectedTrainingInfo.cart_status.purchase_status==="REMOVE_FROM_CART",onClick:a[1]||(a[1]=g=>l.addRemoveCart(s.selectedTrainingInfo,i.trainingDetails.plan_id))},{default:C(()=>[s.selectedTrainingInfo.cart_status.purchase_status==="REMOVE_FROM_CART"?(o(),n("img",Et)):_("",!0),e("span",null,r(s.cartStatus[s.selectedTrainingInfo.cart_status.purchase_status]),1)]),_:1},8,["variant","has-icon"])]))])]),d(h,{loadingStatus:s.loaderStatus},null,8,["loadingStatus"])],2)):_("",!0)}const Pt=y(ut,[["render",Ot],["__scopeId","data-v-1ddea423"]]),Bt={props:["trainingInfo"],data(){return{displayData:null,videoUrl:null}},watch:{async trainingInfo(){this.displayData=this.trainingInfo;const a=await q({container_name:"preview",permissions:"read",storage_name:"opus-storage-java"});this.videoUrl=`https://opusjavaprodstorage.blob.core.windows.net${this.displayData.preview_url}${a}`;const i=document.getElementById("lms-preview-video");i.setAttribute("src",this.videoUrl),i.load()}},methods:{reset(){document.getElementById("lms-preview-video").pause(),$("#preview_video").modal("hide")},videoPlayed(){const t={email:JSON.parse(localStorage.getItem("userData")).email,Last_Interest:"Human Factors Research & Design",page_url:window.location.href,page_url_referral:document.referrer,form_control:"Video Play",form_control_details:"Trainings",asset_title:this.trainingInfo.title};G(t)}}},Nt={id:"preview_video",class:"modal",role:"dialog"},Vt={class:"modal-dialog modal-lg request-modal"},Ft={key:0,class:"modal-content col-xs-12 p-20"},Yt={class:"modal-header"},jt={class:"col-xs-12 p-0"},Wt={class:"modal-body col-xs-12 text-start"},Jt={class:"col-xs-12 p-0"},Ut={class:"col-xs-12 p-0 training-title mb-5"},qt={class:"video-carosal mt-10"},Ht=["src"];function zt(t,a,i,c,s,l){return o(),n("div",null,[e("div",Nt,[e("div",Vt,[s.displayData?(o(),n("div",Ft,[e("div",Yt,[e("div",jt,[e("button",{type:"button",class:"close",onClick:a[0]||(a[0]=p=>l.reset())}," × ")])]),e("div",Wt,[e("div",Jt,[e("div",Ut,"Preview of "+r(s.displayData.title),1),e("div",qt,[e("video",{id:"lms-preview-video",class:"video-js video-content opus-intro-video",disablepictureinpicture:"",controls:"",controlslist:"nodownload",onPlay:a[1]||(a[1]=(...p)=>l.videoPlayed&&l.videoPlayed(...p))},[e("source",{src:s.videoUrl,type:"video/mp4"},null,8,Ht),I(" Your browser does not support HTML5 video. ")],32)])])])])):_("",!0)])])])}const Zt=y(Bt,[["render",zt],["__scopeId","data-v-548c1338"]]),Gt={props:["trainingInfo","userId","accountId","loader"],data(){return{displayData:null,paramId:"",cartStatus:E,loaderStatus:!1}},components:{Loader:L,BaseButton:k},watch:{trainingInfo(){this.displayData=this.trainingInfo},loader(){this.loaderStatus=this.loader}},filters:{getPurchaseStatus(t){switch(t){case"yes":return"Included In Trial";default:return"Price"}}},methods:{addToAccount(){this.paramId=this.displayData.course_id,this.$router.push({path:`/market-place/add-service/${this.paramId}`})},async addRemoveCart(t,a){if(t.purchase_status==="ADD_TO_CART"){this.loaderStatus=!0;const i={user_id:this.userId,plan_id:a};this.displayData.plan_type==="eLearning"&&(i.plan_id=a);const c=await K(i);if(this.loaderStatus=!1,c.data&&c.data.status_code===200){const s={type:"add",body:""};this.$emit("setCartInfo",{cartInfo:s,item:this.trainingInfo}),this.emitter.emit("cart-items-updated")}}else if(t.purchase_status==="REMOVE_FROM_CART"){const i={type:"remove",body:"Are you sure you want to remove this item?"};this.$emit("setCartInfo",{cartInfo:i,item:this.trainingInfo})}},reset(){$("#modal_video").modal("hide")}}},R=t=>(w("data-v-fa8f17e1"),t=t(),T(),t),Kt={id:"modal_video",class:"modal",role:"dialog"},Qt={class:"modal-dialog modal-lg request-modal"},Xt={key:0,class:"modal-content col-xs-12 p-20"},te=R(()=>e("div",{class:"modal-header"},[e("div",{class:"col-xs-12 p-0 text-start header d-flex align-items-center col-gap-26"},[e("img",{src:tt,class:"lms-training-icon"}),e("span",null,"Training")])],-1)),ee={class:"modal-body col-xs-12 text-start"},se={class:"col-xs-12 p-0 training-type mb-5"},ie={class:"col-xs-8 p-0"},ae={class:"col-xs-12 p-0 training-title mb-5"},oe={class:"col-xs-11 p-0 font-14 mb-10"},ne={key:0,class:"col-xs-4 p-0"},re={class:"col-xs-12 course-contents p-0"},le={class:"col-xs-12 p-0 mt-10"},ce={key:1,class:"col-xs-12 p-0 mt-15"},de={class:"col-xs-12 p-0 mt-15"},_e={class:"col-xs-12 p-0 pt-10"},ue={key:0},pe={key:1},me={class:"col-xs-12 pr-0 purchase-info-main mt-10"},he={class:"col-xs-10 purchase-info p-0 font-18 font-bold pr-10"},ge={class:"col-xs-2 font-18 font-bold text-right p-0 pr-10"},fe={class:"col-xs-12 p-0"},ve={class:"footer col-xs-12 flex-wrapper align-items-center xs-flex-column col-gap-20 p-0"},ye={key:0},Ie=["href"],we=R(()=>e("img",{class:"play-icon",src:et,alt:""},null,-1)),Te=R(()=>e("span",null,"Play",-1)),xe=[we,Te],Ce={key:2},De={key:0,src:N,alt:""};function Le(t,a,i,c,s,l){const p=u("loader"),h=u("BaseButton");return o(),n("div",null,[e("div",Kt,[e("div",Qt,[s.displayData?(o(),n("div",Xt,[te,e("div",ee,[e("div",se,r(s.displayData.training_type),1),e("div",ie,[e("div",ae,r(s.displayData.title),1),e("div",oe,r(s.displayData.description),1)]),s.displayData.training_type!=="Consulting"?(o(),n("div",ne,[e("div",re,r(s.displayData.training_type==="Certificate"?"Courses":"Contents"),1),e("div",le,[e("ul",null,[(o(!0),n(D,null,M(s.displayData.content_list,(g,x)=>(o(),n("li",{class:"font-14",key:x},r(g),1))),128))])])])):_("",!0),s.displayData.training_type!=="Consulting"?(o(),n("div",ce,[e("div",de,r(s.displayData.course_count)+" "+r(s.displayData.course_count>1?"courses":"course"),1),e("div",_e,[s.displayData.training_type==="Certificate"?(o(),n("div",ue,r(s.displayData.duration_minutes/60)+" hours",1)):(o(),n("div",pe,r(s.displayData.duration_minutes)+" minutes",1))]),e("div",me,[e("div",he,r(s.displayData.included|t.getPurchaseStatus),1),e("div",ge,"$"+r(s.displayData.price),1)])])):_("",!0),e("div",fe,[d(p,{loadingStatus:s.loaderStatus},null,8,["loadingStatus"])])]),e("div",ve,[d(h,{"data-dismiss":"modal",variant:"secondary"},{default:C(()=>[I(" Cancel ")]),_:1}),i.trainingInfo.training_type==="Certificate"&&i.trainingInfo.enrolled?(o(),n("div",ye)):s.displayData.enrolled?(o(),n("a",{key:1,href:s.displayData.deep_link,target:"_blank"},xe,8,Ie)):(o(),n("div",Ce,[d(h,{class:v(["br-20",{primary:s.displayData.cart_status.purchase_status==="ADD_TO_CART",secondary:s.displayData.cart_status.purchase_status==="REMOVE_FROM_CART"}]),"has-icon":s.displayData.cart_status.purchase_status==="REMOVE_FROM_CART",onClick:a[0]||(a[0]=g=>l.addRemoveCart(s.displayData.cart_status,s.displayData.plan_id))},{default:C(()=>[s.displayData.cart_status.purchase_status==="REMOVE_FROM_CART"?(o(),n("img",De)):_("",!0),I(" "+r(s.cartStatus[i.trainingInfo.cart_status.purchase_status]),1)]),_:1},8,["has-icon","class"])]))])])):_("",!0)])])])}const Se=y(Gt,[["render",Le],["__scopeId","data-v-fa8f17e1"]]),be={props:{userId:{type:[Number,String],required:!0}},mixins:[at],data(){return{tabs:{eLearning:"eLearning","Instructor Led":"Instructor Led Courses"},trainingsInfo:{},selectedListItems:[],selectedTraining:{},videoInfo:{},loaderStatus:!1,cartInfo:{},filteredIlt:{},operations:{type:"select",listView:!0,courseDetails:null,timeSlotsList:null},tabCount:{all:0,eLearning:0,"Instructor Led":0},activeTabName:"all",sortingType:"name",orderBy:{name:"asc",type:"asc"}}},components:{AddRemoveCartPopup:it,Loader:L,InfoModal:Se,PreviewModal:Zt,TrainingDetails:Pt,TrainingSignUpModal:st},async created(){await this.getList(),this.emitter.on("fetchCartList",async()=>{await this.getList()})},watch:{activeTabName(){this.setListForSelectedTab()}},methods:{async getList(){this.loaderStatus=!0,this.trainingsInfo=await V(this.userId),this.trainingDetails=this.trainingsInfo.filter(t=>t.course_status==="Not Enrolled"),this.setListForSelectedTab(),this.loaderStatus=!1},showTimeSlots(t){this.operations={...this.operations,courseDetails:t},$("#compliance-signup-modal").modal({backdrop:"static",keyboard:!1})},setListForSelectedTab(){this.selectedListItems=this.trainingDetails||[],this.sortItems()},navigateToMarketPlace(){this.$router.push("/market-place")},setSorting(t){this.sortingType=t||"name",this.orderBy[this.sortingType]=this.orderBy[this.sortingType]==="asc"?"desc":"asc",this.sortItems()},sortItems(){const t=JSON.parse(JSON.stringify(this.selectedListItems));t.sort((a,i)=>this.sortList(a,i)),this.selectedListItems=t},sortList(t,a){return this.sortingType==="name"?this.orderBy.name==="asc"?t.plan_name.toLowerCase()>a.plan_name.toLowerCase()?1:-1:t.plan_name.toLowerCase()>a.plan_name.toLowerCase()?-1:1:this.orderBy.type==="asc"?t.plan_type.toLowerCase()>a.plan_type.toLowerCase()?1:-1:t.plan_type.toLowerCase()>a.plan_type.toLowerCase()?-1:1}}},F=t=>(w("data-v-86c5f066"),t=t(),T(),t),ke={class:"row mr-0"},$e=F(()=>e("div",{class:"col-xs-12 mr-0"},[e("div",{class:"col-xs-12 p-0 d-flex align-items-center mb-20 mt-10"},[e("span",{class:"font-32 pl-15"},"Marketplace")])],-1)),Me={class:"col-xs-12"},Re={key:0,class:"col-xs-12 d-flex dashed-border mx-20 mb-20 mt-10"},Ae=F(()=>e("span",{class:"text-primary cursor-pointer pr-10"}," Name ",-1)),Ee={key:1,class:"col-xs-12 mt-20 mb-20"},Oe=H('<div class="col-xs-12 col-sm-10 col-md-8 d-flex col-gap-10 align-items-start" data-v-86c5f066><img src="'+nt+'" alt="" data-v-86c5f066><div class="col-xs-12 d-flex flex-direction-column row-gap-10" data-v-86c5f066><span class="fw-400 purchased-text" data-v-86c5f066>You currently have full access to all available resources</span><span class="fw-300 font-18" data-v-86c5f066>We will notify you of any new resources as they become available for purchase</span></div></div>',1),Pe=[Oe];function Be(t,a,i,c,s,l){const p=u("training-details"),h=u("loader"),g=u("preview-modal"),x=u("info-modal"),b=u("add-remove-cart-popup"),W=u("training-sign-up-modal");return o(),n("div",ke,[$e,e("div",Me,[s.selectedListItems.length?(o(),n(D,{key:0},[s.selectedListItems.length>1?(o(),n("div",Re,[e("div",{class:"col-xs-6 p-0 xs-flex-column d-flex align-items-center",onClick:a[0]||(a[0]=f=>l.setSorting("name"))},[Ae,e("img",{class:v([{desc:s.orderBy.name==="desc"},"sorting-icon cursor-pointer"]),src:ot,alt:""},null,2)])])):_("",!0),(o(!0),n(D,null,M(s.selectedListItems,(f,J)=>(o(),n("div",{class:"col-xs-12 pl-20 mt-20",key:J},[d(p,{userId:i.userId,trainingDetails:f,onSetSelectedTrainingItem:t.setSelectedTrainingItem,onOnShowTimeSlots:l.showTimeSlots,onSetCartInfo:a[1]||(a[1]=U=>t.setCartInfo(U,"trainings"))},null,8,["userId","trainingDetails","onSetSelectedTrainingItem","onOnShowTimeSlots"])]))),128))],64)):_("",!0),!s.selectedListItems.length&&!s.loaderStatus?(o(),n("div",Ee,Pe)):_("",!0)]),d(h,{loadingStatus:s.loaderStatus},null,8,["loadingStatus"]),d(g,{trainingInfo:s.videoInfo},null,8,["trainingInfo"]),d(x,{loader:s.loaderStatus,trainingInfo:s.selectedTraining,userId:i.userId,onSetCartInfo:a[2]||(a[2]=f=>t.setCartInfo(f,"trainings"))},null,8,["loader","trainingInfo","userId"]),d(b,{onCloseAddRemoveCart:t.closeAddRemoveCart,cartInfo:s.cartInfo,onRemoveFromCart:a[3]||(a[3]=f=>t.removeFromCart("trainings"))},null,8,["onCloseAddRemoveCart","cartInfo"]),d(W,{onSetCartInfo:a[4]||(a[4]=f=>t.setCartInfo(f,"trainings")),operations:s.operations,userId:i.userId},null,8,["operations","userId"])])}const Ne=y(be,[["render",Be],["__scopeId","data-v-86c5f066"]]),Ve={name:"PurchasedTraining",props:["account_id","userId","training"],components:{},data(){return{statusMap:{"Not Started":"Enrolled",Incomplete:"In progress"},trainingTypeClass:{eLearning:"eLearning","Instructor Led":"instructorLed"}}},computed:{isPrerec(){return this.training.plan_type==="Instructor Led"&&this.training.training_type==="Pre-recorded course"},isILT(){return this.training.plan_type==="Instructor Led"},expiryDays(){return this.isPrerec?this.training.expiry_days:-1}},methods:{formatToLocalDate(t){return t?m.utc(`${t}`).local().format("ddd MMM DD , YYYY"):""},getImageUrl(t){let a="";return t.plan_type==="ComplianceWire Training"&&(a=t.blob_course_icon_url),a?`https://opusjavaprodstorage.blob.core.windows.net${a}`:null},dateConvert(t){const a=m.utc(`${t.slot_start_time}`).format("MMM DD"),i=m.utc(`${t.slot_end_time}`).format("MMM DD"),c=m.utc(`${t.slot_end_time}`).format("YYYY"),s=m.utc(`${t.slot_start_time}`).format("hh A"),l=m.utc(`${t.slot_end_time}`).format("hh A");return`${a}-${i}, ${c} ${s} to ${l} ET`},getTimeSlotFromTraining(t){return t.booked_time_slot?this.dateConvert(t.booked_time_slot):t.upcoming?t.upcoming.slot_start_time:"More dates coming soon"},getTrainingType(t){return t.plan_type?t.plan_type:t.training_type==="Course"?"eLearning":t.training_type==="Certificate"?"Certificate":"Course"},playTraining(t){t.deep_link&&window.open(t.deep_link,"_blank")},viewIlt(t,a){const i=this.training.title.replace(/®/g,"").replace(/ /g,"-").toLowerCase();localStorage.setItem("scheduleTrainingId",JSON.stringify(t)),localStorage.setItem("schedulePlanId",JSON.stringify(t)),this.$router.push({path:`/compliancewire-marketplace/details/${i}`,query:{planId:a}})}}},A=t=>(w("data-v-4cf6d0e6"),t=t(),T(),t),Fe={class:"training-container col-xs-12 p-10"},Ye={class:"col-xs-12 col-sm-12 col-md-7 p-0 d-flex align-items-center"},je=["src"],We={class:"text-primary fw-300 mb-5"},Je={class:"text-primary font-bold mb-5"},Ue={class:"text-light-black mb-5"},qe={class:"font-14 fw-300 d-flex align-items-center col-gap-30"},He={class:"d-flex align-items-center"},ze=A(()=>e("img",{class:"preview-svg",src:O,alt:""},null,-1)),Ze={class:"d-flex align-items-center"},Ge=A(()=>e("img",{class:"preview-svg",src:B,alt:""},null,-1)),Ke={class:"font-14 fw-300"},Qe={class:"font-14 fw-300 d-flex align-items-center"},Xe=A(()=>e("img",{class:"preview-svg",src:P,alt:""},null,-1)),ts={class:"col-xs-12 col-sm-12 col-md-2 pt-10 pb-10 d-flex align-items-end justify-content-end flex-grow"};function es(t,a,i,c,s,l){return o(),n("div",Fe,[e("div",Ye,[e("img",{class:v(["training-img",s.trainingTypeClass[i.training.plan_type]]),src:l.getImageUrl(i.training),alt:""},null,10,je),e("div",{class:v([s.trainingTypeClass[i.training.plan_type],"d-flex col-xs-12 col-sm-12 flex-direction-column training-title"])},[e("div",We,r(l.isPrerec?i.training.training_type:i.training.plan_type),1),e("div",Je,[e("span",null,r(i.training.title),1)]),e("div",Ue,[e("div",qe,[e("div",He,[ze,e("span",null,r(i.training.training_location),1)]),e("div",Ze,[Ge,e("span",Ke,r(i.training.duration_hours)+" Hours ",1)]),e("div",Qe,[Xe,I(" "+r(l.getTimeSlotFromTraining(i.training)),1)])])])],2)]),e("template",null,[e("div",ts,[e("div",null,[e("span",{onClick:a[0]||(a[0]=p=>l.viewIlt(i.training.course_id,i.training.plan_id)),class:"text-button-label blue-3 cursor-pointer"},"View Details")])])])])}const ss=y(Ve,[["render",es],["__scopeId","data-v-4cf6d0e6"]]),is={name:"PurchasedTrainings",components:{ComplianceWirePurchasedList:ss},props:{account_id:{type:[String,Number],default:""},userId:{type:[String,Number],default:""},ilt:{type:Array,default:()=>[]}},data(){return{activeCourseList:[],sortingType:"name",orderBy:{name:"asc",status:"asc"}}},watch:{ilt(){this.setActiveCourseList()}},mounted(){this.setActiveCourseList()},methods:{setSorting(t){this.sortingType=t||"name",this.orderBy[this.sortingType]=this.orderBy[this.sortingType]==="asc"?"desc":"asc",this.setActiveCourseList()},async setActiveCourseList(){let t=[];t=(await V(this.userId)).filter(i=>i.course_status!=="Not Enrolled"),t=JSON.parse(JSON.stringify(t)),t.sort((i,c)=>this.sortList(i,c)),this.activeCourseList=t},sortList(t,a){if(this.sortingType==="name")return t.title.toLowerCase()===a.title.toLowerCase()?0:this.orderBy.name==="asc"?t.title.toLowerCase()>a.title.toLowerCase()?1:-1:t.title.toLowerCase()>a.title.toLowerCase()?-1:1;const i={"Not Enrolled":0,Enrolled:1,"Not Started":2,Incomplete:3,Complete:4,"":5};return i[t.course_status]===i[a.course_status]?0:this.orderBy.status==="asc"?i[t.course_status]>i[a.course_status]?1:-1:i[t.course_status]<i[a.course_status]?1:-1},navigateToMarketPlace(){this.$router.push("/market-place")}}},Y=t=>(w("data-v-bf8d8f31"),t=t(),T(),t),as={class:"col-xs-12"},os={key:0,class:"col-xs-12 p-0"},ns={key:1,class:"col-xs-12 d-flex col-gap-20 align-items-center mt-30"},rs=Y(()=>e("img",{src:rt,alt:""},null,-1)),ls=Y(()=>e("div",null,[e("div",{class:"not-purchased no-data-color"},"Start building your library!"),e("div",{class:"mt-5"},[e("span",{class:"no-data-color"},"Check out offered courses below to purchase more courses ")])],-1)),cs=[rs,ls];function ds(t,a,i,c,s,l){const p=u("compliance-wire-purchased-list");return o(),n("div",as,[s.activeCourseList.length?(o(),n("div",os,[(o(!0),n(D,null,M(s.activeCourseList,h=>(o(),n("div",{key:h.plan_id,class:"col-xs-12 p-0 purchased-training-wrapper"},[d(p,{training:h,userId:i.userId,account_id:i.account_id},null,8,["training","userId","account_id"])]))),128))])):_("",!0),s.activeCourseList.length?_("",!0):(o(),n("div",ns,cs))])}const _s=y(is,[["render",ds],["__scopeId","data-v-bf8d8f31"]]),us={props:["userId","account_id"],data(){return{loaderStatus:!1,availableTrainings:[],purchasedELearnings:[],cartDetails:{},ilts:{purchased:[],available:[]}}},components:{Loader:L,ComplianceWireMarketplaceList:Ne,PurchasedList:_s,BaseButton:k},async created(){this.loaderStatus=!0,await this.getELearnings(),await this.getiltLatestActivity(),this.isCartPath=this.$route.path==="/market-place/cart",await this.getCartList(),this.emitter.on("fetchCartList",async()=>{await this.getCartList()}),this.loaderStatus=!1},watch:{$route(){this.isCartPath=this.$route.path==="/market-place/cart"}},methods:{async getELearnings(){const t=await dt();this.eLearningProgress=t.lms_course_progress,this.purchasedELearnings=t.lms_user_course_list.filter(a=>a.course_status!=="Not Enrolled")},async getiltLatestActivity(){const t=await lt(this.userId),a=[...t.online_ilt,...t.pre_recorded_il_t];this.ilts.purchased=a.filter(i=>i.enrolled),this.ilts.available=a.filter(i=>!i.enrolled),this.iltProgress=await ct()},navigateToCart(){this.$router.push("/market-place/cart")},checkIsResourcesExist(){this.$route.params.id&&![1,2,3].includes(+this.$route.params.id)&&this.navigateToMarketplace()},async getCartList(){this.loaderStatus=!0,this.cartDetails=await Q(this.userId),this.loaderStatus=!1},navigateToMarketplace(){this.$router.push("/market-place")}},beforeDestroy(){X.$off("fetchCartList")}},j=t=>(w("data-v-8e0bcd9f"),t=t(),T(),t),ps={class:"content-wrappper row mr-0"},ms={key:0,class:"col-xs-12 pl-30 pr-30 cart-section d-flex justify-content-between"},hs={class:"d-flex col-gap-30"},gs={class:"p-relative"},fs=j(()=>e("img",{src:_t,alt:""},null,-1)),vs={class:"cart-count"},ys={class:"cart-items"},Is={key:0,class:"d-flex col-gap-30 align-items-center"},ws={class:"d-flex cart-items"},Ts={class:"pl-10"},xs={key:1,class:"d-flex col-gap-30 align-items-center"},Cs={class:"cart-items"},Ds=j(()=>e("div",{class:"col-xs-12 p-0 d-flex align-items-center mb-10"},[e("div",{class:"welcome-common-header fw-300"},"Welcome to Marketplace")],-1)),Ls=[Ds],Ss={class:"col-xs-12 col-md-12 mt-30 pl-5"},bs={class:"col-xs-12 col-md-12 mt-30 pl-5"};function ks(t,a,i,c,s,l){const p=u("BaseButton"),h=u("purchased-list"),g=u("compliance-wire-marketplace-list"),x=u("loader");return o(),n("div",ps,[!s.loaderStatus&&s.cartDetails.cart_items&&s.cartDetails.cart_items.length?(o(),n("div",ms,[e("div",hs,[e("div",gs,[fs,e("span",vs,r(s.cartDetails.total_items),1)]),e("div",ys,r(s.cartDetails.total_items)+" Item(s)",1)]),t.isCartPath?(o(),n("div",Is,[e("div",ws,[I(" Total "),e("span",Ts,"$"+r(s.cartDetails.total_price),1)]),e("img",{onClick:a[0]||(a[0]=(...b)=>l.navigateToMarketplace&&l.navigateToMarketplace(...b)),class:"img-20 cursor-pointer",src:z,alt:""})])):(o(),n("div",xs,[e("div",Cs,"$"+r(s.cartDetails.total_price),1),d(p,{onClick:l.navigateToCart},{default:C(()=>[I("View Cart")]),_:1},8,["onClick"])]))])):_("",!0),e("div",{class:v(["col-xs-12 welcome-banner mr-0",{"pt-100":s.cartDetails.cart_items&&s.cartDetails.cart_items.length}])},Ls,2),e("div",Ss,[d(h,{ilt:s.ilts.purchased,userId:i.userId,account_id:i.account_id},null,8,["ilt","userId","account_id"])]),e("div",bs,[d(g,{userId:i.userId},null,8,["userId"])]),d(x,{loadingStatus:s.loaderStatus},null,8,["loadingStatus"])])}const Qs=y(us,[["render",ks],["__scopeId","data-v-8e0bcd9f"]]);export{Qs as default};