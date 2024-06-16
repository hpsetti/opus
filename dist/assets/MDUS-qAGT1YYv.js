import{_ as x,o as c,c as n,a as e,n as g,t as l,$ as b,Q as h,k as B,F as k,m as S,b as m,r as y,B as N,O as R,e as w,w as p,p as W,f as I,d as z,I as F,l as V}from"./index-BlMJxPGQ.js";import{L as U}from"./Loader-DR0R9oEF.js";import{_ as E}from"./circle_check-30p5k3cY.js";import{_ as H}from"./chevron_down_new-ByXOiGKT.js";import{_ as G}from"./download_icon_white-BHO_3GTH.js";import{_ as L}from"./vue-html2pdf.esm-Cvk6D9-2.js";import{_ as Y}from"./signin-opus-logo-BJgDGwd2.js";import{p as K}from"./marketo-zx_g1DXt.js";import{_ as Q}from"./chevron_left_white-D3IwzB1n.js";const J={props:{thick:{type:Boolean,required:!1,default:!1},disabled:{type:Boolean,default:!1},value:{type:Number},option:{type:Object,required:!0},size:{type:String,default:"medium",validator(o){return["large","medium","small"].includes(o)}},checked:{type:Boolean,default:!1}},methods:{onchange(){this.disabled||this.$emit("input",this.option.value)}}},$=["value","checked","disabled"];function X(o,i,s,_,a,t){return c(),n("label",{class:g(["radio d-flex",{disabled:s.disabled}])},[e("input",{type:"radio",class:"radio__input",value:s.option.value,onChange:i[0]||(i[0]=(...d)=>t.onchange&&t.onchange(...d)),checked:this.checked||s.option.value===this.value,disabled:s.disabled},null,40,$),e("div",{class:g(["radio__radio",[{disabled:s.disabled,thick:s.thick},s.size?s.size:""]])},null,2),e("div",{class:g(["radio__text",s.disabled?"disabled":s.size])},l(s.option.name),3)],2)}const M=x(J,[["render",X],["__scopeId","data-v-e2e59eea"]]),Z={name:"SurveyCard",props:{label:{required:!0,type:String},categories:{required:!0},questions:{required:!0},answers:{required:!0},scoreData:{required:!0},calculateScore:{required:!0}},components:{BaseRadio:M},mounted(){b(`#${this.label}`).on("show.bs.collapse",()=>{this.showCard=!0}),b(`#${this.label}`).on("hide.bs.collapse",()=>{this.showCard=!1})},data(){return{scoreKeys:["bad","poor","fair","good","great"],showCard:!0,options:{sdisagree:{name:"Strongly Disagree",value:-2},disagree:{name:"Disagree",value:-1},neutral:{name:"Neutral",value:0},agree:{name:"Agree",value:1},sagree:{name:"Strongly Agree",value:2},dna:{name:"Does not Apply",value:-3}},score:null}},computed:{numAnswered(){return Object.keys(this.answers).length},scoreColor(){return{color:this.score&&this.score.key?this.scoreData[this.score.key].color:"#000"}},cardTopBorder(){let o="#00518A",i="0%";const s="#D3D6D9",_=this.questions.count,a=Object.keys(this.answers).length;return!this.showCard&&a===_&&(o=this.scoreColor.color),a!==0&&(i=`${a/_*100}%`),{"background-color":s,"background-image":`linear-gradient(${o}, ${o})`,"background-size":i,height:"4px"}}},watch:{answers:{handler(){this.$emit("update:answers",this.answers),this.score=this.calculateScore(Object.values(this.answers),this.label)},deep:!0},numAnswered:{handler(o,i){o!==i&&o===this.questions.count&&b(`#${this.label}`).collapse("hide")}}},methods:{isAnswered(o){return Object.keys(this.answers).includes(o.toString())}}},ee={class:"panel-heading"},se=["data-target"],te={class:"d-flex align-items-center"},oe={class:"col-xs-6 category d-flex justify-content-start align-items-center"},ae={key:0,src:E},ie={class:"title"},re={class:"col-xs-6 score d-flex justify-content-end align-items-center"},ce={class:"status"},ne=["id"],le={class:"survey-panel-content"},de={class:"qno-container"},ue={class:"question"},he={class:"title"},_e={class:"options"};function me(o,i,s,_,a,t){const d=y("BaseRadio");return c(),n("div",{class:g(["panel survey-panel",s.label])},[e("div",{style:h(t.cardTopBorder)},null,4),e("div",ee,[e("div",{class:"panel-title cursor-pointer","data-toggle":"collapse","data-parent":"#plans-accordion","data-target":`#${s.label}`},[e("div",te,[e("div",oe,[!a.showCard&&t.numAnswered===s.questions.count?(c(),n("img",ae)):B("",!0),e("div",ie,l(s.categories[s.label]),1)]),e("div",re,[e("div",ce,l(t.numAnswered)+"/"+l(s.questions.count)+" completed ",1),t.numAnswered===s.questions.count?(c(),n("div",{key:0,class:"title",style:h(t.scoreColor)},l(a.score.key!=="none"?s.scoreData[a.score.key].name:""),5)):B("",!0),e("img",{src:H,class:g(a.showCard?"hide-card":"show-card")},null,2)])])],8,se)]),e("div",{id:s.label,class:"panel-collapse collapse in"},[e("div",le,[(c(!0),n(k,null,S(s.questions.count,(v,r)=>(c(),n("div",{class:"question-container d-flex justify-content-start",key:r},[e("div",de,[e("div",{class:g(["qno",{selected:t.isAnswered(r)}])},l(r+1),3)]),e("div",ue,[e("div",he,l(s.questions[r+1]),1),e("div",_e,[(c(!0),n(k,null,S(Object.keys(a.options),u=>(c(),n("div",{class:"option",key:u},[m(d,{modelValue:s.answers[r],"onUpdate:modelValue":D=>s.answers[r]=D,option:a.options[u]},null,8,["modelValue","onUpdate:modelValue","option"])]))),128))])])]))),128))])],8,ne)],2)}const ve=x(Z,[["render",me]]),T={total:25,general:{count:5,1:"I could use the device effectively to complete tasks.",2:"I am confident that I can operate the device correctly (as intended by the manufacturer).",3:"I could quickly master using the device’s main features.",4:"The device is an advancement in terms of its user-friendliness.",5:"I am confident that I can use the device safely."},safety:{count:2,1:"The device does not cause unnecessary exposure to hazards (things that cause harm).",2:"I am aware of the things I should not do with the device (things that could harm me or others)"},mitigation:{count:2,1:"The device protects me from making serious mistakes.",2:"If I make a mistake, the device will help me recover."},clarity:{count:7,1:"The device’s functional capabilities are clear.",2:"The device makes its operational status clear.",3:"The device provides effective user feedback (reacts in informative ways to what I am doing).",4:"Parts of the device are labeled to the extent that is necessary and helpful.",5:"The device effectively communicates important information.",6:"The instructions and/or training materials have all the information I need.",7:"The instructions and/or training materials are clear."},usability:{count:5,1:"The device is easy to use.",2:"The device enables me to complete tasks in an appropriate amount of time.",3:"The number of steps to use the device is acceptable.",4:"The device does not require me to memorize things.",5:"I can apply my prior knowledge, skills, and experience to learn how to use this device."},ergonomics:{count:1,1:"The device is comfortable to handle (e.g., grasp, orient, actuate)."},appeal:{count:3,1:"The device has pleasing physical characteristics (size, shape, material texture, styling, etc.)",2:"The device presents information in a pleasing way (layout, typography, graphics, colors, etc.)",3:"I would prefer to use this device over other devices with similar functions."}},fe="/static/images/icons/indicator.svg",ye="/static/images/icons/indicator_disabled.svg",ge={name:"ScoreChart",props:{scoreData:{required:!0},score:{required:!0},scoreBarWidth:{default:100}},computed:{indicatorPosition(){return{"padding-left":`${(this.scoreBarWidth-32)/2+this.scoreData[this.score.key!=="none"?this.score.key:"fair"].id*(this.scoreBarWidth+2)}px`}},setScoreBarWidth(){return{width:`${this.scoreBarWidth}px`}},setScoreNameWidth(){return{width:`${this.scoreBarWidth+2}px`}}}},pe={class:"score-chart d-flex flex-direction-column justify-content-center p-0"},we={key:0},be={class:"score-bar-chart"},ke=e("div",{class:"score-bar white"},null,-1),Se=e("div",{class:"score-bar white"},null,-1),De=e("div",{class:"score-bar white"},null,-1),Ce=e("div",{class:"score-bar white"},null,-1),xe={key:1},qe={class:"score-bar-chart"},Be=e("div",{class:"score-bar white"},null,-1),Ae=e("div",{class:"score-bar white"},null,-1),je=e("div",{class:"score-bar white"},null,-1),Oe=e("div",{class:"score-bar white"},null,-1),Te={class:""},We={class:"score-names"};function Ie(o,i,s,_,a,t){return c(),n("div",pe,[e("div",null,[s.score.key!=="none"?(c(),n("img",{key:0,style:h(t.indicatorPosition),src:fe},null,4)):(c(),n("img",{key:1,style:h(t.indicatorPosition),src:ye},null,4))]),s.score.key!=="none"?(c(),n("div",we,[e("div",be,[e("div",{style:h(t.setScoreBarWidth),class:"score-bar bad left-rounded"},null,4),ke,e("div",{style:h(t.setScoreBarWidth),class:"score-bar poor"},null,4),Se,e("div",{style:h(t.setScoreBarWidth),class:"score-bar fair"},null,4),De,e("div",{style:h(t.setScoreBarWidth),class:"score-bar good"},null,4),Ce,e("div",{style:h(t.setScoreBarWidth),class:"score-bar great right-rounded"},null,4)])])):(c(),n("div",xe,[e("div",qe,[e("div",{style:h(t.setScoreBarWidth),class:"score-bar disabled left-rounded"},null,4),Be,e("div",{style:h(t.setScoreBarWidth),class:"score-bar disabled"},null,4),Ae,e("div",{style:h(t.setScoreBarWidth),class:"score-bar disabled"},null,4),je,e("div",{style:h(t.setScoreBarWidth),class:"score-bar disabled"},null,4),Oe,e("div",{style:h(t.setScoreBarWidth),class:"score-bar disabled right-rounded"},null,4)])])),e("div",Te,[e("div",We,[e("div",{style:h(t.setScoreNameWidth),class:"score-name"},"BAD",4),e("div",{style:h(t.setScoreNameWidth),class:"score-name"},"POOR",4),e("div",{style:h(t.setScoreNameWidth),class:"score-name"},"FAIR",4),e("div",{style:h(t.setScoreNameWidth),class:"score-name"},"GOOD",4),e("div",{style:h(t.setScoreNameWidth),class:"score-name"},"GREAT",4)])])])}const P=x(ge,[["render",Ie]]),Pe={name:"ScorePopup",components:{ScoreChart:P,BaseButton:N},props:["score","result","questionnaire","scoreData","categories"],computed:{isCompleted(){return this.result.answered===this.questionnaire.total}},methods:{closePopup(){b("#score-popup").modal("hide")},startNewQuestionnaire(){this.$emit("start-new"),this.closePopup()},downloadScore(){this.$emit("download-score"),this.closePopup()},isCategoryFullyAnswered(o){return Object.keys(this.result.answers[o]).length===this.questionnaire[o].count},textCapitalize(o){const i=o.toLowerCase();return i[0].toUpperCase()+i.substr(1)}}},q=o=>(W("data-v-34cd1a27"),o=o(),I(),o),Ne={id:"score-popup",class:"modal",role:"dialog"},Re={class:"modal-dialog modal-lg"},Fe={class:"modal-content col-xs-12 p-0"},Me={class:"modal-header"},ze={class:"d-flex justify-content-between"},Ve=q(()=>e("div",{class:"title"},"Your Evaluation Score",-1)),Ue=q(()=>e("div",{class:"header-separator"},null,-1)),Ee={class:"modal-body emergo-lightgreen-bg font-18"},He={class:"score-header d-flex justify-content-between"},Ge=q(()=>e("div",{class:"section-title"},"Total Usability Score",-1)),Le={class:"completion-status"},Ye={class:"score-chart d-flex justify-content-between flex-wrap"},Ke={class:"d-flex flex-direction-column"},Qe={class:"name"},Je={class:"score-value"},$e={class:"chart"},Xe={class:"score-desc"},Ze={class:"text-bold"},es=q(()=>e("hr",null,null,-1)),ss={class:"score-range-container"},ts=q(()=>e("div",{class:"section-title"},"Score Range Per Category",-1)),os={class:"d-flex flex-wrap justify-content-between"},as={class:"score-range-name"},is={class:"score-range-status"},rs={class:"modal-footer col-xs-12 d-flex justify-content-between"},cs={class:"col-xs-3 p-0 text-left"},ns={class:"col-xs-9 p-0 d-flex justify-content-end"},ls=q(()=>e("img",{src:G,class:"preview-svg"},null,-1));function ds(o,i,s,_,a,t){const d=y("ScoreChart"),v=y("BaseButton");return c(),n("div",Ne,[e("div",Re,[e("div",Fe,[e("div",Me,[e("div",ze,[Ve,e("img",{onClick:i[0]||(i[0]=(...r)=>t.closePopup&&t.closePopup(...r)),class:"cursor-pointer",src:R,alt:"Close Score Popup"})])]),Ue,e("div",Ee,[e("div",He,[Ge,e("div",Le,l(s.result.answered)+"/"+l(s.questionnaire.total)+" complete ",1)]),e("div",Ye,[e("div",Ke,[e("div",Qe,l(t.isCompleted?s.scoreData[s.score.key].name:"---"),1),e("div",Je,l(t.isCompleted?`${s.score.value}%`:"--"),1)]),e("div",$e,[m(d,{scoreData:s.scoreData,score:s.score},null,8,["scoreData","score"])])]),e("div",Xe,[w(" Your score is between "+l(s.scoreData[s.score.key].start)+" and "+l(s.scoreData[s.score.key].end)+", which is ",1),e("span",Ze,'"'+l(t.textCapitalize(s.scoreData[s.score.key].name))+'"',1)]),es,e("div",ss,[ts,e("div",os,[(c(!0),n(k,null,S(Object.keys(s.categories),r=>(c(),n("div",{class:"score-range-item",key:r},[e("div",as,l(s.categories[r]),1),e("div",{class:g(["score-range-bar",t.isCategoryFullyAnswered(r)?s.score.categories[r].key:"none"])},null,2),e("div",is,l(t.isCategoryFullyAnswered(r)?s.scoreData[s.score.categories[r].key].name:"---"),1)]))),128))])])]),e("div",rs,[e("div",cs,[m(v,{"data-dismiss":"modal",variant:"secondary"},{default:p(()=>[w("Back")]),_:1})]),e("div",ns,[m(v,{class:"mr-15",variant:"secondary",onClick:t.startNewQuestionnaire},{default:p(()=>[w("Start New Questionnaire")]),_:1},8,["onClick"]),m(v,{"has-icon":""},{default:p(()=>[ls,e("span",{onClick:i[1]||(i[1]=(...r)=>t.downloadScore&&t.downloadScore(...r))},"Download Score")]),_:1})])])])])])}const us=x(Pe,[["render",ds],["__scopeId","data-v-34cd1a27"]]),hs={components:{VueHtml2pdf:L,ScoreChart:P,BaseRadio:M},props:["result","score","scoreData"],data(){return{questionnaire:T,categories:{general:"General",safety:"Safety",mitigation:"Mitigations",clarity:"Clarity",usability:"Usability",ergonomics:"Ergonomics",appeal:"Appeal"},options:{sdisagree:{name:"Strongly Disagree",value:-2},disagree:{name:"Disagree",value:-1},neutral:{name:"Neutral",value:0},agree:{name:"Agree",value:1},sagree:{name:"Strongly Agree",value:2},dna:{name:"Does not Apply",value:-3}}}},computed:{isComplete(){return this.result&&this.result.answered===this.questionnaire.total}},methods:{isAnswered(o,i,s){return Object.keys(this.result.answers[o]).includes(i.toString())&&this.options[s].value===this.result.answers[o][i]},async generatePDF(){await this.$refs.html2Pdf.generatePdf()},getFileName(){return`Medical Device Usability Score Report ${z().format("MMDDYY")}`}}},A=o=>(W("data-v-3c0305bb"),o=o(),I(),o),_s={slot:"pdf-content"},ms={class:"report-container"},vs={class:"report-content"},fs={key:0,class:"report-header"},ys=A(()=>e("div",{class:"title"},"Medical Device Usability Score",-1)),gs=A(()=>e("img",{src:Y,class:"logo-img"},null,-1)),ps=[ys,gs],ws={key:1,class:"score-header row emergo-lightgreen-bg m-0"},bs={class:"col-xs-12 p-0 score-container d-flex"},ks={class:"chart"},Ss={class:"score-area d-flex align-items-center justify-content-start"},Ds={class:"d-flex flex-direction-column justify-content-center answers"},Cs=A(()=>e("div",{class:"title"},"Total Answers:",-1)),xs={class:"desc"},qs={class:"d-flex flex-direction-column justify-content-center answers"},Bs=A(()=>e("div",{class:"title"},"Total Score:",-1)),As={class:"desc"},js={class:"col-xs-8 p-0 mb-15"},Os={class:"score-range-container"},Ts=A(()=>e("div",{class:"section-title"},"Score Per Category",-1)),Ws={class:"d-flex flex-wrap"},Is={class:"score-range-name"},Ps={class:"score-range-status"},Ns={class:"category-container"},Rs={class:"category-name d-flex justify-content-between"},Fs={class:"qno-container"},Ms={class:"question full-width"},zs={class:"title"},Vs={class:"options"};function Us(o,i,s,_,a,t){const d=y("ScoreChart"),v=y("BaseRadio"),r=y("VueHtml2pdf");return c(),F(r,{"show-layout":!1,"float-layout":!0,"enable-download":!0,"preview-modal":!1,filename:t.getFileName(),"pdf-quality":2,"manual-pagination":!0,"pdf-format":"a4","pdf-content-width":"800px","pdf-orientation":"portrait",ref:"html2Pdf",onHasDownloaded:i[0]||(i[0]=u=>o.$emit("hasDownloaded"))},{default:p(()=>[e("section",_s,[e("div",ms,[e("div",vs,[(c(!0),n(k,null,S(Object.keys(a.categories),(u,D)=>(c(),n("div",{key:u},[e("div",{class:g([3,4].includes(D)?"html2pdf__page-break":"")},null,2),[0,3,4].includes(D)?(c(),n("div",fs,ps)):B("",!0),t.isComplete&&D===0?(c(),n("div",ws,[e("div",bs,[e("div",ks,[m(d,{scoreData:s.scoreData,score:s.score,scoreBarWidth:75},null,8,["scoreData","score"])]),e("div",Ss,[e("div",Ds,[Cs,e("div",xs,l(s.result.answered)+"/"+l(a.questionnaire.total),1)]),e("div",qs,[Bs,e("div",As,l(s.scoreData[s.score.key].name),1)])])]),e("div",js,[e("div",Os,[Ts,e("div",Ws,[(c(!0),n(k,null,S(Object.keys(a.categories),C=>(c(),n("div",{class:"score-range-item",key:C},[e("div",Is,l(a.categories[C]),1),e("div",{class:g(["score-range-bar",s.score.categories[C].key])},null,2),e("div",Ps,l(s.scoreData[s.score.categories[C].key].name),1)]))),128))])])])])):B("",!0),e("div",Ns,[e("div",Rs,[e("span",null,l(a.categories[u]),1),t.isComplete?(c(),n("span",{key:0,class:g(s.score.categories[u].key)},l(s.scoreData[s.score.categories[u].key].name),3)):B("",!0)]),(c(!0),n(k,null,S(a.questionnaire[u].count,(C,f)=>(c(),n("div",{class:"question-container d-flex justify-content-start",key:f},[e("div",Fs,[e("div",{class:g(["qno",{selected:t.isComplete}])},l(f+1),3)]),e("div",Ms,[e("div",zs,l(a.questionnaire[u][f+1]),1),e("div",Vs,[(c(!0),n(k,null,S(Object.keys(a.options),j=>(c(),n("div",{class:"option",key:j},[m(v,{size:"small",option:a.options[j],checked:t.isComplete&&t.isAnswered(u,f,j),disabled:t.isComplete&&!t.isAnswered(u,f,j)},null,8,["option","checked","disabled"])]))),128))])])]))),128))])]))),128))])])])]),_:1},8,["filename"])}const Es=x(hs,[["render",Us],["__scopeId","data-v-3c0305bb"]]),Hs={name:"MDUS",components:{Loader:U,SurveyCard:ve,ScorePopup:us,ScoreChart:P,ScoreReport:Es,BaseButton:N},created(){this.clearAll()},data(){return{questionnaire:T,loaderStatus:!1,categories:{general:"General",safety:"Safety",mitigation:"Mitigations",clarity:"Clarity",usability:"Usability",ergonomics:"Ergonomics",appeal:"Appeal"},result:null,scoreKeys:["bad","poor","fair","good","great"],scoreData:{bad:{id:0,name:"BAD",color:"#B00505",start:0,end:19},poor:{id:1,name:"POOR",color:"#CF5F28",start:20,end:39},fair:{id:2,name:"FAIR",color:"#FFD362",start:40,end:59},good:{id:3,name:"GOOD",color:"#92C83E",start:60,end:79},great:{id:4,name:"GREAT",color:"#4C9E45",start:80,end:100},none:{id:5,name:"---",color:"#333333"}},score:{key:"none",value:-1,categories:{general:{key:"none",value:-1},safety:{key:"none",value:-1},mitigation:{key:"none",value:-1},clarity:{key:"none",value:-1},usability:{key:"none",value:-1},ergonomics:{key:"none",value:-1},appeal:{key:"none",value:-1}}},options:{sagree:{name:"Strongly Agree",value:2},agree:{name:"Agree",value:1},neutral:{name:"Neutral",value:0},disagree:{name:"Disagree",value:-1},sdisagree:{name:"Strongly Disagree",value:-2},dna:{name:"Does not Apply",value:-3}}}},computed:{isBlank(){return this.result&&this.result.answered===0},isComplete(){return this.result&&this.result.answered===this.questionnaire.total},indicatorPosition(){return{"padding-left":`${34+this.scoreData[this.score.key?this.score.key:"fair"].id*102}px`}},canShowScore(){return this.result.answered===0?!1:Object.keys(this.result.answers).some(o=>Object.keys(this.result.answers[o]).length===T[o].count)}},watch:{"result.answers":{handler(){this.processAnswers()},deep:!0}},methods:{navigateToTools(){this.$router.push("/tools")},calculateScore(o,i){let s="none";const _=o.length;if(_===0)return{key:s,value:-1,count:_};const a=o.filter(r=>r!==-3);if(a.length===0&&i!=="all"&&this.questionnaire[i].count===o.length)return{key:"bad",value:0,count:_};const t=a.reduce((r,u)=>r+u,0),d=a.length?Math.floor(t/a.length*25+50):0;let v;for(let r=0;r<this.scoreKeys.length;r+=1)if(v=this.scoreKeys[r],d>=this.scoreData[v].start&&d<=this.scoreData[v].end){s=v;break}return{key:s,value:d,count:_}},processAnswers(){const o=[],i=this.result.answered;Object.keys(this.result.answers).forEach(t=>{const d=[];Object.values(this.result.answers[t]).forEach(u=>{o.push(u),d.push(u)});const{key:v,value:r}=this.calculateScore(d,t);this.score.categories[t].key=v,this.score.categories[t].value=r});const{key:s,value:_,count:a}=this.calculateScore(o,"all");this.score.key=s,this.score.value=_,this.result.answered=a,this.isComplete&&i<this.questionnaire.total&&this.showScoreCard()},clearAll(){this.result={answered:0,answers:{general:{},safety:{},mitigation:{},clarity:{},usability:{},ergonomics:{},appeal:{}}},this.score={key:"none",value:-1,categories:{general:{key:"none",value:-1},safety:{key:"none",value:-1},mitigation:{key:"none",value:-1},clarity:{key:"none",value:-1},usability:{key:"none",value:-1},ergonomics:{key:"none",value:-1},appeal:{key:"none",value:-1}}},Object.keys(this.categories).forEach(o=>b(`#${o}`).collapse("show"))},async downloadReport(){b("#ConfirmDownloadModal").modal("hide"),this.loaderStatus=!0,await this.$refs["score-report"].generatePDF()},postDownload(){this.$notify({type:"success",title:"Success",text:"Downloaded successfully as a PDF."});const o={email:JSON.parse(localStorage.getItem("userData")).email,Last_Interest:"Human Factors Research & Design",page_urlextended:window.location.href,page_urlreferral_extended:document.referrer,form_control:"Tools",form_control_details:"Download - Design Recommendation Library"};K(o),this.loaderStatus=!1},showScoreCard(){b("#score-popup").modal("show")},showDownloadModal(){b("#ConfirmDownloadModal").modal("show")},showDownloadOptions(){return this.isComplete?this.downloadReport():this.showDownloadModal()}}},O=o=>(W("data-v-d6e67b0d"),o=o(),I(),o),Gs={class:"content-wrappper"},Ls={class:"row welcome-banner mr-0"},Ys={class:"row m-0"},Ks={class:"col-xs-12 p-0 d-flex align-items-cemter mb-10"},Qs=O(()=>e("div",{class:"welcome-common-header pl-25 fw-300"}," Medical Device Usability Score (MDUS) ",-1)),Js={class:"row m-0 d-flex pl-40 flex-direction"},$s=O(()=>e("div",{class:"pl-0 font-14"}," MDUS is a subjective assessment that enables you to rapidly evaluate your product’s user interface and identify opportunities to improve its usability and use-safety. Answer the questions yourself or ask a colleague or usability test participant to do so. ",-1)),Xs={class:"d-flex justify-end pb-10 pl-100 pt-10"},Zs={class:"d-flex flex-direction emergo-lightgreen-bg score-container"},et={class:""},st={class:"score-area full-width d-flex align-items-center justify-content-between"},tt={class:"d-flex flex-direction-column justify-content-center"},ot=O(()=>e("div",{class:"title"},"Answered:",-1)),at={class:"desc"},it={class:"d-flex flex-direction-column justify-content-center"},rt=O(()=>e("div",{class:"title"},"Score:",-1)),ct={class:"desc"},nt={class:"col-xs-12 survey-card-container"},lt={class:"modal fade",id:"ConfirmDownloadModal","data-backdrop":"static"},dt={class:"modal-dialog confirm-modal-wrapper"},ut={class:"modal-content"},ht=V('<div class="modal-header text-right" data-v-d6e67b0d><img data-dismiss="modal" class="cursor-pointer" src="'+R+'" alt="Close Download Modal" data-v-d6e67b0d></div><div class="modal-body text-center" data-v-d6e67b0d><div class="card" data-v-d6e67b0d><div class="card-body" data-v-d6e67b0d><div class="card-title" data-v-d6e67b0d><span data-v-d6e67b0d>Are you sure you would like to download before answering all the questions?</span></div><div class="card-text" data-v-d6e67b0d><span data-v-d6e67b0d>You will receive a blank questionnaire.</span></div></div></div></div>',2),_t={class:"modal-footer"},mt={class:"d-flex justify-content-center"};function vt(o,i,s,_,a,t){const d=y("BaseButton"),v=y("ScoreChart"),r=y("SurveyCard"),u=y("ScorePopup"),D=y("ScoreReport"),C=y("loader");return c(),n("div",Gs,[e("div",Ls,[e("div",Ys,[e("div",Ks,[e("img",{onClick:i[0]||(i[0]=(...f)=>t.navigateToTools&&t.navigateToTools(...f)),class:"cursor-pointer",src:Q,alt:""}),Qs])]),e("div",Js,[$s,e("div",Xs,[m(d,{size:"lg",variant:"secondary",onClick:t.clearAll,disabled:t.isBlank},{default:p(()=>[w("Clear All")]),_:1},8,["onClick","disabled"]),m(d,{size:"lg",variant:"secondary",class:"ml-15",onClick:t.showDownloadOptions,disabled:t.isBlank},{default:p(()=>[w("Download")]),_:1},8,["onClick","disabled"])])])]),e("div",Zs,[e("div",et,[m(v,{scoreData:a.scoreData,score:a.score},null,8,["scoreData","score"])]),e("div",st,[e("div",tt,[ot,e("div",at,l(a.result.answered)+"/"+l(a.questionnaire.total),1)]),e("div",it,[rt,e("div",ct,l(a.scoreData[t.isComplete?a.score.key:"none"].name),1)]),e("div",null,[m(d,{size:"lg",onClick:t.showScoreCard,disabled:!t.canShowScore},{default:p(()=>[w("View Score")]),_:1},8,["onClick","disabled"])])])]),e("div",nt,[(c(!0),n(k,null,S(Object.keys(a.categories),f=>(c(),F(r,{key:f,label:f,categories:a.categories,scoreData:a.scoreData,questions:a.questionnaire[f],answers:a.result.answers[f],calculateScore:t.calculateScore},null,8,["label","categories","scoreData","questions","answers","calculateScore"]))),128))]),m(u,{score:a.score,result:a.result,questionnaire:a.questionnaire,scoreData:a.scoreData,categories:a.categories,onDownloadScore:t.showDownloadOptions,onStartNew:i[1]||(i[1]=f=>t.clearAll())},null,8,["score","result","questionnaire","scoreData","categories","onDownloadScore"]),m(D,{result:a.result,score:a.score,scoreData:a.scoreData,ref:"score-report",onHasDownloaded:t.postDownload},null,8,["result","score","scoreData","onHasDownloaded"]),e("template",null,[e("div",lt,[e("div",dt,[e("div",ut,[ht,e("div",_t,[e("div",mt,[m(d,{variant:"secondary",class:"mr-15","data-dismiss":"modal"},{default:p(()=>[w("No, Cancel")]),_:1}),m(d,{onClick:t.downloadReport},{default:p(()=>[w("Yes, Download")]),_:1},8,["onClick"])])])])])])]),m(C,{loadingStatus:a.loaderStatus},null,8,["loadingStatus"])])}const Ct=x(Hs,[["render",vt],["__scopeId","data-v-d6e67b0d"]]);export{Ct as default};