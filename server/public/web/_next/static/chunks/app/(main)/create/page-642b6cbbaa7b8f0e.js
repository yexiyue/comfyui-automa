(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[50],{91677:function(e,l,t){Promise.resolve().then(t.bind(t,9244))},9244:function(e,l,t){"use strict";t.r(l);var s=t(11403),a=t(55989),r=t(50946),n=t(99409),i=t(28353),o=t(34195),c=t(94553),u=t(42078),m=t(86144),d=t(95322),p=t(18722),h=t(61616),x=t.n(h),j=t(86631),f=t(76554);let{TextArea:v}=u.default;l.default=()=>{let e=(0,a.o)(e=>e.templates),l=(0,f.useMemo)(()=>e.map(e=>({label:e.name,value:e.id})),[e]),[t]=c.Z.useForm(),[h,b]=(0,f.useState)(!1),[w,Z]=(0,f.useState)(""),[g,y]=(0,f.useState)(""),_=async e=>{let l=URL.createObjectURL(e.originFileObj);Z(l),b(!0),y(e.name||e.url.substring(e.url.lastIndexOf("/")+1))};(0,j.useRouter)();let C=async()=>{let e=await t.validateFields();e.cover?e.cover=e.cover[0].response.url[0]:e.cover="/web/default.png",console.log(e)};return(0,s.jsxs)("div",{children:[(0,s.jsx)(o.Z,{items:[{title:(0,s.jsx)(x(),{href:"/",children:(0,s.jsx)(r.Z,{})})},{title:(0,s.jsx)("span",{children:"添加数据集"})}]}),(0,s.jsxs)("div",{className:"mx-auto mt-5 w-1/2 min-w-[550px]",children:[(0,s.jsxs)(c.Z,{name:"template",labelCol:{span:4},wrapperCol:{span:20},form:t,children:[(0,s.jsx)(c.Z.Item,{name:"name",label:"数据集名称",rules:[{required:!0}],children:(0,s.jsx)(u.default,{})}),(0,s.jsx)(c.Z.Item,{name:"description",label:"数据集描述",rules:[{required:!0}],children:(0,s.jsx)(v,{rows:3})}),(0,s.jsx)(c.Z.Item,{label:"数据集封面",name:"cover",valuePropName:"fileList",getValueFromEvent:e=>Array.isArray(e)?e:null==e?void 0:e.fileList,children:(0,s.jsx)(p.Z,{action:"http://127.0.0.1:4060/upload",onPreview:_,accept:".png,.jpg,.jpeg,.webp",maxCount:1,listType:"picture-card",children:(0,s.jsxs)("div",{children:[(0,s.jsx)(n.Z,{}),(0,s.jsx)("div",{style:{marginTop:8},children:"Upload"})]})})}),(0,s.jsx)(c.Z.Item,{name:"template_id",label:"模版",rules:[{required:!0}],children:(0,s.jsx)(d.Z,{placeholder:"请选择模版",options:l,allowClear:!0})}),(0,s.jsx)("div",{className:"mt-6",children:(0,s.jsx)(i.A,{color:"primary",className:"w-full",variant:"shadow",onClick:C,children:"添加数据集"})})]}),(0,s.jsx)(m.Z,{open:h,title:g,footer:null,onCancel:()=>{Z(""),b(!1),y("")},children:(0,s.jsx)("img",{alt:"example",style:{width:"100%"},src:w})})]})]})}},55989:function(e,l,t){"use strict";t.d(l,{o:function(){return n}});var s=t(50949),a=t(37471),r=t(27555);let n=(0,s.Ue)((0,a.tJ)((0,r.n)(e=>({theme:"light",templates:[],setTheme:l=>{e(e=>{e.theme=l})},setTemplates:l=>{e(e=>{e.templates=l})}})),{name:"comfyui_automa_store",skipHydration:!0}))}},function(e){e.O(0,[336,937,354,500,474,58,442,744],function(){return e(e.s=91677)}),_N_E=e.O()}]);