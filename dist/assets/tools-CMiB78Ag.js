import{g as o}from"./index-BlMJxPGQ.js";async function i(t){let a,e="";const r={container_name:"preview",permissions:"read",storage_name:"opus-storage-java"};return t.market.length===2?e=`/hfeProjectScopeTool/pdf?market=${t.market[0]}&market=${t.market[1]}&product_type=${t.product_type}&change_type=${t.change_type}&duration=${t.duration}`:e=`/hfeProjectScopeTool/pdf?market=${t.market[0]}&product_type=${t.product_type}&change_type=${t.change_type}&duration=${t.duration}`,await o.all([o.post("https://backend.opus.emergobyul.com/services/sastoken/genratetoken",r),o.get(`https://backend.opus.emergobyul.com/services${e}`)]).then(o.spread((c,s)=>{s.status===200&&s.data&&(a=`https://opusjavaprodstorage.blob.core.windows.net${s.data.data}?${c.data.data}`)})).catch(c=>{console.log("hfeProjectScopeTool/pdf java api error",c)}),a}async function d(){let t;return await o.get("https://backend.opus.emergobyul.com/services/minTouchTargetTool/standardResolutionDetails").then(a=>{a.status===200&&a.data&&(t=a.data.data)}).catch(a=>{console.log("Error while fetching standard resolutions",a)}),t}async function l(){let t;return await o.get("https://backend.opus.emergobyul.com/services/minTouchTargetTool/standardResolutionAnalysisDetails").then(a=>{a.status===200&&a.data&&(t=a.data.data)}).catch(a=>{console.log("Error while fetching standard resolutions",a)}),t}async function u(t){let a;return await o.post("https://backend.opus.emergobyul.com/services/minTouchTargetTool/calculateSize",t).then(e=>{e.status===200&&e.data&&(a=e.data.data)}).catch(e=>{console.log("Error while fetching standard resolutions",e)}),a}async function g(t){let a;const e=`https://backend.opus.emergobyul.com/services/useErrorWizard/userDetails?userId=${t}`;return await o.get(e).then(r=>{r.status===200&&r.data&&(a=r.data.data)}).catch(r=>{console.log("Error while fetching Use Error Wizard Data",r)}),a}export{d as a,l as b,u as c,g as d,i as g};