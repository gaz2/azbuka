import{s as l,at as _,au as m,z as o,o as d,c as f,av as S,_ as v}from"./entry.02700669.js";const x=l({__name:"IconCSS",props:{name:{type:String,required:!0},size:{type:String,default:""}},setup(r){_(e=>({"17e81e26":u.value}));const n=m(),s=r,p=o(()=>{var e;return((((e=n.nuxtIcon)==null?void 0:e.aliases)||{})[s.name]||s.name).replace(/^i-/,"")}),u=o(()=>`url('https://api.iconify.design/${p.value.replace(":","/")}.svg')`),a=o(()=>{var t,c,i;if(!s.size&&typeof((t=n.nuxtIcon)==null?void 0:t.size)=="boolean"&&!((c=n.nuxtIcon)!=null&&c.size))return;const e=s.size||((i=n.nuxtIcon)==null?void 0:i.size)||"1em";return String(Number(e))===e?`${e}px`:e});return(e,t)=>(d(),f("span",{style:S({width:a.value,height:a.value})},null,4))}});const g=v(x,[["__scopeId","data-v-2717c442"]]);export{g as default};
