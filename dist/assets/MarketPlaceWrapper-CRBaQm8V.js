import{L as i}from"./Loader-DR0R9oEF.js";import{g as c}from"./cart-QHhiBhPv.js";import{E as n}from"./event-bus-DYoA24Gz.js";import{_ as u,c as l,a as h,b as e,r as s,o as p}from"./index-BlMJxPGQ.js";const d={props:["userId","account_id"],data(){return{path:"",loaderStatus:!1,cartDetails:{}}},components:{Loader:i},async created(){this.isCartPath=this.$route.path==="/market-place/cart",await this.getCartList(),this.emitter.on("fetchCartList",async()=>{await this.getCartList()})},watch:{async $route(){this.isCartPath=this.$route.path==="/market-place/cart",this.$route.path==="/market-place"&&await this.getCartList()}},methods:{navigateToCart(){this.$router.push("/market-place/cart")},checkIsResourcesExist(){this.$route.params.id&&![1,2,3].includes(+this.$route.params.id)&&this.navigateToMarketplace()},async getCartList(){this.loaderStatus=!0,this.cartDetails=await c(this.userId),this.loaderStatus=!1},navigateToMarketplace(){this.$router.push("/market-place"),this.emitter.emit("fetchCartList")}},beforeDestroy(){n.$off("fetchCartList")}},m={class:"content-wrappper"},_={class:"col-xs-12 pl-0 pr-0"};function f(C,g,t,k,a,v){const r=s("router-view"),o=s("loader");return p(),l("div",m,[h("div",_,[e(r,{cartDetails:a.cartDetails,accountId:t.account_id,userId:t.userId},null,8,["cartDetails","accountId","userId"])]),e(o,{loadingStatus:a.loaderStatus},null,8,["loadingStatus"])])}const D=u(d,[["render",f],["__scopeId","data-v-7e8fb47b"]]);export{D as default};
