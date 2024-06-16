import{_ as v,$ as c,c as h,a as e,n as t,b as g,l as o,r as u,o as f,p as m,f as _}from"./index-BlMJxPGQ.js";import{m as y}from"./marketPlaceTools-GTlmHJkh.js";import{_ as w}from"./chevron_left_white-D3IwzB1n.js";import{_ as n}from"./chevron_down_new-ByXOiGKT.js";import"./cloneDeep-ldw2ZiUo.js";import"./_baseAssignValue-BD6sbZ4C.js";import"./OpusSelect-BRceMwA4.js";import"./OpusCheckbox-DmKgoiup.js";import"./AddRemoveCartPopup-CqkASo7c.js";import"./event-bus-DYoA24Gz.js";import"./DocumentsMoreInfo-CaOFYwEb.js";import"./Loader-DR0R9oEF.js";import"./moment-Cl4UOzQZ.js";import"./constants-DZfa7LnM.js";import"./cart-QHhiBhPv.js";import"./tool_available-BYBTocPu.js";import"./trash-D7-advNl.js";import"./goto_arrow-zLb6UYwr.js";import"./documentsMixin-Bh1uCigM.js";import"./documents-CP6oEKge.js";import"./marketo-zx_g1DXt.js";import"./marketPlaceResources-hux66PHi.js";const b="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-1.svg",x="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-2.svg",k="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesignChart.svg",D="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-3.svg",I="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-4.svg",C="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-5.svg",T="/static/images/tools/inclusiveDesignGuideTool/inclusiveDesign-6.svg",A={components:{MarketPlaceTools:y},data(){return{showCard:{inclusiveDesign:!1,accessibilityPrinciples:!1,age:!1,healthLiteracy:!1,culture:!1,gender:!1},userId:""}},created(){const i=JSON.parse(localStorage.getItem("userId"));this.userId=i},mounted(){Object.keys(this.showCard).forEach(i=>{c(`#${i}`).on("show.bs.collapse",()=>{this.showCard[i]=!0}),c(`#${i}`).on("hide.bs.collapse",()=>{this.showCard[i]=!1})})},methods:{navigateBack(){this.$router.push("/tools")}}},a=i=>(m("data-v-8225e90f"),i=i(),_(),i),P={class:"content-wrappper"},j={class:"row welcome-banner mr-0"},q={class:"col-xs-12 p-0"},G={class:"col-xs-12 p-0 d-flex align-items-cemter mb-10"},L=a(()=>e("div",{class:"welcome-common-header pl-25 fw-300"}," Inclusive Design Guide ",-1)),S=a(()=>e("div",{class:"col-xs-12 pl-40"},[e("div",{class:"col-xs-12 col-md-10 col-lg-10 pl-0 font-18 fw-700 mb-5"}," Empower users in their product user journey "),e("div",{class:"col-xs-12 pl-0 col-md-10 col-lg-7 font-14"}," This quick guide can help you create effective products for all types of users while considering educational level, race, gender, physical ability, and more. ")],-1)),B={class:"col-xs-12 pt-20 mt-20 pl-25"},W={class:"panel-group",id:"plans-accordion1"},E={class:"panel wrapper-panel"},N={class:"panel-heading"},z={class:"panel-title cursor-pointer collapsed warning-title-heading","data-toggle":"collapse","data-parent":"#plans-accordion1","data-target":"#inclusiveDesign"},F={class:"d-flex align-items-center justify-content-between"},Q=a(()=>e("span",{class:"text-h3"},"What is inclusive design?",-1)),H=o('<div id="inclusiveDesign" class="panel-collapse collapse" data-v-8225e90f><div class="panel-body d-flex xs-direction-column" data-v-8225e90f><div class="d-flex flex-direction-column card-content pl-25" data-v-8225e90f><p data-v-8225e90f>Inclusive design considers ways to design user interfaces to ensure that they encompass the most complete set of potential user characteristics and circumstances. Design requirements can sometimes be based only on the most common, or average, attributes of the target users in an attempt to satisfy a large percentage of the population. Products can be made more inclusive through principles of accessibility, typically associated with accommodating common physical and cognitive disabilities. However, even designs that accommodate a wide swath of “average” users and those with known disabilities could still leave some intended users with unique characteristics and circumstances less likely or able to have a safe, effective, and satisfying user experience. Not only could entire groups of people be excluded from using a product, even a so called “average” user could be excluded from certain interactions due to their unique characteristics relative to specific scenarios.</p><p data-v-8225e90f>Inclusive design aims to understand those unique combinations of capabilities, perspectives, and circumstances that often cannot be captured in averages or common descriptions of user populations. When incorporated into a design, the goal is to enable the most potential users to equally recognize, understand, navigate, and work successfully with your design. The following are some key factors to consider when striving to make a more usable, accessible, and inclusive product.</p></div><div class="image-section" data-v-8225e90f><img src="'+b+'" alt="interactive-design-1" data-v-8225e90f></div></div></div>',1),M=a(()=>e("div",{class:"col-xs-12 pl-25"},[e("h2",{class:"text-h3"},"What to consider when designing inclusively")],-1)),O={class:"col-xs-12 mt-10 pl-25"},R={class:"panel-group",id:"plans-accordion2"},U={class:"panel wrapper-panel"},V={class:"panel-heading"},J={class:"panel-title cursor-pointer collapsed warning-title-heading","data-toggle":"collapse","data-parent":"#plans-accordion2","data-target":"#accessibilityPrinciples"},K={class:"d-flex align-items-center justify-content-between"},X=a(()=>e("span",{class:"text-h4"},"Accessibility principles",-1)),Y=o('<div id="accessibilityPrinciples" class="panel-collapse collapse" data-v-8225e90f><div class="panel-body d-flex xs-direction-column" data-v-8225e90f><div class="d-flex flex-direction-column card-content pl-25" data-v-8225e90f><p data-v-8225e90f>Accessibility is essential for ensuring that people with disabilities can access and use a system. It focuses on specific design accommodations and mitigations for those disabilities. The United States government provides design guidelines under the Americans with Disabilities Act (ADA) covering many aspects of facilities and fixtures that can be made to accommodate disabilities. For graphical user interfaces, the World Wide Web Consortium (W3C) provide guidelines that are widely regarded as the standard for web accessibility. Because accessibility focuses on disabilities, it subsequently encourages research and development on the specific needs of people with disabilities and optimizes solutions to meet those needs.</p><p data-v-8225e90f>Consider a user with a dexterity-related disability that is considered a comorbidity of their disease condition, attempting to administer their medication. If the medication is only administered via a pre-filled syringe, the user might not be physically capable of self-administering. The manufacturer will need to consider whether a different type of device (e.g., autoinjector) could be provided that is easier to manipulate with this condition, or if the medication could be taken in a different way (e.g., orally) to accommodate those individuals. That said, selecting an appropriate device (e.g., autoinjector) isn’t the only opportunity to create an inclusive product. Consider further opportunities to meet these users’ needs, such as ensuring the device is sufficiently light weight and limiting the activation button’s force such that even a user with limited hand strength can hold and interact with the device safely, confidently, and comfortably.</p></div><div class="image-section" data-v-8225e90f><img src="'+x+'" alt="interactive-design-1" data-v-8225e90f></div></div><div class="panel-body d-flex xs-direction-column" data-v-8225e90f><div class="tips-container" data-v-8225e90f><div class="warning-card emergo-lightgreen-bg" data-v-8225e90f><h3 class="warning-tip-text" data-v-8225e90f>Quick tips:</h3><div class="ml-20" data-v-8225e90f><ul data-v-8225e90f><li data-v-8225e90f>For users with physical impairments, consider ways to make products light weight and easy to hold. This might include larger grip areas and wrist straps.</li><li data-v-8225e90f>In general, try to avoid requiring interactions that require very fine motor skills and large forces, especially from the fingers.</li><li data-v-8225e90f>Consider providing alternate ways to use the device or alternate treatment options.</li><li data-v-8225e90f>For users with visual impairment (Level AAA under accessibility guidelines), legibility requires a contrast ratio of 7:1 for normal text and 4.5:1 for large text.</li><li data-v-8225e90f>Provide captions, audio descriptions, or text transcript for media.</li><li data-v-8225e90f>Allow for screen adjustments, determine the positions and ways in which a device is mounted and used, and ensure the display can be easily and correctly read.</li></ul></div></div></div><div class="image-section" data-v-8225e90f><img src="'+k+'" alt="interactive-design-1" data-v-8225e90f></div></div></div>',1),Z={class:"col-xs-12 mt-15 pl-25"},$={class:"panel-group",id:"plans-accordion3"},ee={class:"panel wrapper-panel"},ie={class:"panel-heading"},ae={class:"panel-title cursor-pointer collapsed warning-title-heading","data-toggle":"collapse","data-parent":"#plans-accordion3","data-target":"#age"},se={class:"d-flex align-items-center justify-content-between"},te=a(()=>e("span",{class:"text-h4"},"Advanced age",-1)),ne=o('<div id="age" class="panel-collapse collapse" data-v-8225e90f><div class="panel-body d-flex xs-direction-column" data-v-8225e90f><div class="d-flex flex-direction-column card-content pl-25" data-v-8225e90f><p data-v-8225e90f>The conditions and circumstances of aging elderly populations vary widely, and like any user group, should be researched in detail when designing products for them. However, there are certain trends and natural processes that can be considered at a baseline level. As elderly further age, there can be natural declines in physical strength, dexterity, eyesight, hearing, and cognitive ability, all of which can inhibit effective interactions with a user interface. From a societal standpoint, the increased use of technology in healthcare might force older patients to use products they are unfamiliar with or in ways they are novel to them. Given that smartphone apps, connected devices, or wearables might be designed by people one to several generations younger than the end users, this could result in designs that bias towards a younger person’s (e.g., a “digital native’s”) technological understanding and comfort level. Care must be taken to ensure that designer’s do not overestimate an elderly user’s capabilities or familiarity with technology.</p></div><div class="image-section" data-v-8225e90f><img src="'+D+'" alt="interactive-design-1" data-v-8225e90f></div></div><div class="panel-body d-flex xs-direction-column" data-v-8225e90f><div class="tips-container" data-v-8225e90f><div class="warning-card emergo-lightgreen-bg" data-v-8225e90f><h3 class="warning-tip-text" data-v-8225e90f>Quick tips:</h3><div class="ml-20" data-v-8225e90f><ul data-v-8225e90f><li data-v-8225e90f>Consider limiting the number of complex actions a user needs to take in order to better accommodate potential declines in memory and physical capability.</li><li data-v-8225e90f>Limit a screen’s information density to both reduce the user’s cognitive load and limit the strain associated with visual searching and targeting.</li><li data-v-8225e90f>Incorporate visual, tactile, and/or audible feedback to enhance user confidence during interactions with a device.</li><li data-v-8225e90f>Packaging design should provide cues to help users recognize how to open the package, and the package should be easy to open.</li><li data-v-8225e90f>Allow text to be enlarged on screen without the use of any special assistive technology.</li></ul></div></div></div></div></div>',1),oe={class:"col-xs-12 mt-15 pl-25"},le={class:"panel-group",id:"plans-accordion4"},de={class:"panel wrapper-panel"},ce={class:"panel-heading"},re={class:"panel-title cursor-pointer collapsed warning-title-heading","data-toggle":"collapse","data-parent":"#plans-accordion4","data-target":"#healthLiteracy"},pe={class:"d-flex align-items-center justify-content-between"},ve=a(()=>e("span",{class:"text-h4"},"Health literacy",-1)),he=o('<div id="healthLiteracy" class="panel-collapse collapse" data-v-8225e90f><div class="d-flex xs-direction-column health-content-container" data-v-8225e90f><div class="panel-body d-flex xs-direction-column flex-direction-column" data-v-8225e90f><div class="d-flex flex-direction-column card-content pl-25" data-v-8225e90f><p data-v-8225e90f>The range of medical competency varies from patient to patient. In design, consider limiting the use of medical jargon and accommodating multiple reading levels by firstly aiming to be as precise and concise as possible, then utilizing the FDA suggested reading level for instructions and medical device labeling of no greater than an 8th grade reading level, and possibly 4th to 5th grade reading level for medical information.</p></div><div class="tips-container-health" data-v-8225e90f><div class="warning-card emergo-lightgreen-bg" data-v-8225e90f><h3 class="warning-tip-text" data-v-8225e90f>Quick tips:</h3><div class="ml-20" data-v-8225e90f><ul data-v-8225e90f><li data-v-8225e90f>Avoid use of jargon</li><li data-v-8225e90f>Provide context-sensitive help</li><li data-v-8225e90f>Make instructions easy to locate and identify</li><li data-v-8225e90f>Provide feedback for interactions (i.e., confirming entries)</li></ul></div></div></div></div><div class="image-section" data-v-8225e90f><img src="'+I+'" alt="interactive-design-1" data-v-8225e90f></div></div></div>',1),ge={class:"col-xs-12 mt-15 pl-25"},ue={class:"panel-group",id:"plans-accordion5"},fe={class:"panel wrapper-panel"},me={class:"panel-heading"},_e={class:"panel-title cursor-pointer collapsed warning-title-heading","data-toggle":"collapse","data-parent":"#plans-accordion5","data-target":"#culture"},ye={class:"d-flex align-items-center justify-content-between"},we=a(()=>e("span",{class:"text-h4"},"Culture",-1)),be=o('<div id="culture" class="panel-collapse collapse" data-v-8225e90f><div class="panel-body d-flex xs-direction-column" data-v-8225e90f><div class="d-flex flex-direction-column card-content pl-25" data-v-8225e90f><p data-v-8225e90f>In considering your device’s audience, consider the numerous languages and backgrounds these users come from and are familiar with. Include the ability to change languages while still maintaining a well formatted and balanced user interface once that language changes.</p><div class="tips-container-health" data-v-8225e90f><div class="warning-card emergo-lightgreen-bg" style="margin-left:0px;" data-v-8225e90f><h3 class="warning-tip-text" data-v-8225e90f>Quick tips:</h3><div class="ml-20" data-v-8225e90f><ul data-v-8225e90f><li data-v-8225e90f>Ensure that there is representation of all types of people by including racially diverse images</li><li data-v-8225e90f>Provide access to language options</li><li data-v-8225e90f>Ensure name entry fields do not exclude users with very short or long names (e.g., allow one-character name entries)</li><li data-v-8225e90f>Include diverse individuals at every stage of the design process to ensure that you are considering all ideas and perspectives</li></ul></div></div></div></div><div class="image-section" data-v-8225e90f><img src="'+C+'" alt="interactive-design-5" data-v-8225e90f></div></div></div>',1),xe={class:"col-xs-12 mt-15 pl-25"},ke={class:"panel-group",id:"plans-accordion6"},De={class:"panel wrapper-panel"},Ie={class:"panel-heading"},Ce={class:"panel-title cursor-pointer collapsed warning-title-heading","data-toggle":"collapse","data-parent":"#plans-accordion6","data-target":"#gender"},Te={class:"d-flex align-items-center justify-content-between"},Ae=a(()=>e("span",{class:"text-h4"},"Gender",-1)),Pe=o('<div id="gender" class="panel-collapse collapse" data-v-8225e90f><div class="panel-body d-flex xs-direction-column" data-v-8225e90f><div class="d-flex flex-direction-column card-content pl-25" data-v-8225e90f><p data-v-8225e90f>Gender is a social construct and is generally based on the norms, behaviors, and societal roles expected of individuals based primarily on their sex. Sex is the biological difference between male, female, and intersex people. If a user interface is providing a choice for users, ensure to understand the difference between gender verses sex, gender expression, and understand the reason this information is needed. Avoid “othering” in multiple choice questionnaires (i.e., “male,” “female,” and “other”) and allows users to self-identify.</p><div class="tips-container-health" data-v-8225e90f><div class="warning-card emergo-lightgreen-bg" style="margin-left:0px;" data-v-8225e90f><h3 class="warning-tip-text" data-v-8225e90f>Quick tips:</h3><div class="ml-20" data-v-8225e90f><ul data-v-8225e90f><li data-v-8225e90f>Use gender-inclusive and gender-neutral language</li><li data-v-8225e90f>Allow users to select their pronouns</li><li data-v-8225e90f>Avoid using gendered avatars or profile illustrations</li></ul></div></div></div></div><div class="image-section" data-v-8225e90f><img src="'+T+'" alt="interactive-design-6" data-v-8225e90f></div></div></div>',1),je={class:"col-xs-12 mt-0 mb-20 pl-25"},qe={class:"opusRecommendationLibraryCard--container"},Ge=a(()=>e("h2",{class:"text-h4"},"Explore more tips and design considerations in the OPUS Design Recommendation Library",-1));function Le(i,l,Se,Be,s,d){const r=u("MarketPlaceTools");return f(),h("div",P,[e("div",j,[e("div",q,[e("div",G,[e("img",{onClick:l[0]||(l[0]=(...p)=>d.navigateBack&&d.navigateBack(...p)),class:"cursor-pointer",src:w,alt:""}),L]),S])]),e("div",B,[e("div",W,[e("div",E,[e("div",N,[e("div",z,[e("div",F,[Q,e("img",{src:n,class:t(s.showCard.inclusiveDesign?"hide-card":"show-card")},null,2)])])]),H])])]),M,e("div",O,[e("div",R,[e("div",U,[e("div",V,[e("div",J,[e("div",K,[X,e("img",{src:n,class:t(s.showCard.accessibilityPrinciples?"hide-card":"show-card")},null,2)])])]),Y])])]),e("div",Z,[e("div",$,[e("div",ee,[e("div",ie,[e("div",ae,[e("div",se,[te,e("img",{src:n,class:t(s.showCard.age?"hide-card":"show-card")},null,2)])])]),ne])])]),e("div",oe,[e("div",le,[e("div",de,[e("div",ce,[e("div",re,[e("div",pe,[ve,e("img",{src:n,class:t(s.showCard.healthLiteracy?"hide-card":"show-card")},null,2)])])]),he])])]),e("div",ge,[e("div",ue,[e("div",fe,[e("div",me,[e("div",_e,[e("div",ye,[we,e("img",{src:n,class:t(s.showCard.culture?"hide-card":"show-card")},null,2)])])]),be])])]),e("div",xe,[e("div",ke,[e("div",De,[e("div",Ie,[e("div",Ce,[e("div",Te,[Ae,e("img",{src:n,class:t(s.showCard.gender?"hide-card":"show-card")},null,2)])])]),Pe])])]),e("div",je,[e("div",qe,[Ge,e("div",null,[g(r,{userId:s.userId,toolName:"Design Recommendation Library"},null,8,["userId"])])])])])}const ti=v(A,[["render",Le],["__scopeId","data-v-8225e90f"]]);export{ti as default};
