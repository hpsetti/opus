import{_ as b,o as l,c as i,a as m,e as u,t as r,k as c,n as h,F as d,m as y}from"./index-BlMJxPGQ.js";const f={props:{value:{type:String,default:"all"},tabs:{type:Object,default:()=>{}},isUrlWithQuery:{type:Boolean,default:!1},tabCount:{type:Object,default:()=>{}},showTabCount:{type:Boolean,default:!0},allTabsLabel:{type:String,default:"View All"}},created(){var t;const e=(t=this.$route.query)==null?void 0:t.name;e&&this.isUrlWithQuery&&this.setTabNameFromQuery(e)},watch:{$route(e){var t;(t=e.query)!=null&&t.name&&this.isUrlWithQuery&&this.setTabNameFromQuery(e.query.name)}},methods:{setTab(e){this.isUrlWithQuery&&this.value!==e?this.$router.push({query:{name:e},params:{savePosition:!0}}):this.value!==e&&this.$emit("input",e)},setTabNameFromQuery(e){let t="";Object.keys(this.tabs).includes(e)?t=e:t="all",this.$emit("input",t)}}},T={class:"horizontal-tabs d-flex p-0 mt-10"},_={key:0},C=["onClick"],p={key:0};function v(e,t,a,Q,k,n){return l(),i("ul",T,[m("li",{onClick:t[0]||(t[0]=o=>n.setTab("all")),class:h(["cursor-pointer",{active:a.value==="all"}])},[u(r(a.allTabsLabel)+" ",1),a.showTabCount?(l(),i("span",_,"("+r(a.tabCount.all||0)+")",1)):c("",!0)],2),(l(!0),i(d,null,y(a.tabs,(o,s)=>(l(),i("li",{onClick:N=>n.setTab(s),class:h(["cursor-pointer",{active:a.value===s}]),key:s+"_"+(a.tabCount[s]||0)},[u(r(o)+" ",1),a.showTabCount?(l(),i("span",p,"("+r(a.tabCount[s]||0)+")",1)):c("",!0)],10,C))),128))])}const x=b(f,[["render",v]]);export{x as T};