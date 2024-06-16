import{_ as f,s as k,o as i,I as r,w as y,a as p,j as v,a1 as O,i as n,c as h,t as I,k as c,F as u,aj as S,r as d}from"./index-BlMJxPGQ.js";import{c as B}from"./cloneDeep-ldw2ZiUo.js";import{O as w}from"./OpusCheckbox-DmKgoiup.js";import{_ as b}from"./chevron_down_new-ByXOiGKT.js";const M={name:"OpusSelect",inheritAttrs:!1,components:{Multiselect:k,OpusCheckbox:w},props:{size:{type:String,default:"sm",validator:e=>["sm","lg"].includes(e)},showOptions:{type:Boolean,default:!1},allowEmpty:{type:Boolean,default:!1}},data(){return{items:[],height:{sm:36,lg:44},selectedItems:[]}},computed:{maxHeight(){return this.height[this.size]*5},closeOnSelect(){return!this.hasMultiple},hasMultiple(){return this.$attrs.multiple===""},isOptionSimple(){return!this.$attrs.trackBy||this.$attrs.trackBy===""},searchable(){return this.$attrs.searchable===""||this.$attrs.searchable===!0}},created(){this.hasMultiple?this.$attrs.value&&Array.isArray(this.$attrs.value)&&this.selectedItems.push(...this.$attrs.value):this.selectedItems=B(this.$attrs.value)},methods:{onSelect(e){if(this.hasMultiple){const t=this.selectedItems.findIndex(s=>this.isOptionSimple?s===e:s===e[this.$attrs.trackBy]);t===-1?this.selectedItems.push(this.isOptionSimple?e:e[this.$attrs.trackBy]):this.selectedItems.splice(t,1)}else this.selectedItems=e},onRemove(e){if(this.hasMultiple){const t=this.selectedItems.findIndex(s=>this.isOptionSimple?s===e:s===e[this.$attrs.trackBy]);t!==-1&&this.selectedItems.splice(t,1)}else this.selectedItems=null}}},C={slot:"caret","slot-scope":"{ toggle }"},x={key:0,class:"multiselect__single"};function H(e,t,s,$,a,l){const m=d("OpusCheckbox"),g=d("multiselect");return i(),r(g,S({class:["opus-multiselect",[s.size]],showLabels:!1,"close-on-select":l.closeOnSelect,maxHeight:l.maxHeight,optionHeight:a.height[s.size],onSelect:t[3]||(t[3]=o=>l.onSelect(o)),onRemove:t[4]||(t[4]=o=>l.onRemove(o)),searchable:l.searchable},e.$attrs,{"allow-empty":s.allowEmpty}),{default:y(()=>[p("template",C,[v(p("img",{onMousedown:t[0]||(t[0]=n(o=>e.toggle(),["prevent","stop"])),class:"icon",src:b},null,544),[[O,!e.$attrs.loading]])]),l.hasMultiple?(i(),h(u,{key:0},[e.values.length&&!s.showOptions?(i(),h("span",x,I(e.values.length===a.items.length?"All":e.values.length)+" selected",1)):c("",!0)],64)):c("",!0),l.hasMultiple?(i(),h(u,{key:1},[l.isOptionSimple?(i(),r(m,{key:0,checked:a.selectedItems.includes(e.props.option),text:e.props.option,onClick:t[1]||(t[1]=n(()=>{},["prevent"]))},null,8,["checked","text"])):(i(),r(m,{key:1,checked:a.selectedItems.includes(e.props.option[e.$attrs.trackBy]),text:e.props.option[e.$attrs.label],onClick:t[2]||(t[2]=n(()=>{},["prevent"]))},null,8,["checked","text"]))],64)):c("",!0)]),_:1},16,["class","close-on-select","maxHeight","optionHeight","searchable","allow-empty"])}const R=f(M,[["render",H]]);export{R as O};
