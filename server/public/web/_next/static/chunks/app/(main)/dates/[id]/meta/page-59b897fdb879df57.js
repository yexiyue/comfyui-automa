(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[911],{95429:function(e,a,s){Promise.resolve().then(s.bind(s,63597))},63597:function(e,a,s){"use strict";s.r(a),s.d(a,{default:function(){return D}});var r=s(33584),l=s(43070),t=s(42008),n=s(54921),o=s(57912),i=s(10),c=s(53800),d=s(3037),u=s(22553),b=s(72315),m=s(14436),v=s(99437),f=s(89154),h=(0,v.tv)({slots:{base:["relative","max-w-fit","inline-flex","items-center","justify-between","box-border"],content:"flex-1 text-inherit font-normal",dot:["w-2","h-2","ml-1","rounded-full"],avatar:"flex-shrink-0",closeButton:["z-10","appearance-none","outline-none","select-none","transition-opacity","opacity-70","hover:opacity-100","cursor-pointer","active:opacity-disabled","tap-highlight-transparent"]},variants:{variant:{solid:{},bordered:{base:"border-medium bg-transparent"},light:{base:"bg-transparent"},flat:{},faded:{base:"border-medium"},shadow:{},dot:{base:"border-medium border-default text-foreground bg-transparent"}},color:{default:{dot:"bg-default-400"},primary:{dot:"bg-primary"},secondary:{dot:"bg-secondary"},success:{dot:"bg-success"},warning:{dot:"bg-warning"},danger:{dot:"bg-danger"}},size:{sm:{base:"px-1 h-6 text-small",content:"px-1",closeButton:"text-medium",avatar:"w-4 h-4"},md:{base:"px-1 h-7 text-small",content:"px-2",closeButton:"text-large",avatar:"w-5 h-5"},lg:{base:"px-2 h-8 text-medium",content:"px-2",closeButton:"text-xl",avatar:"w-6 h-6"}},radius:{none:{base:"rounded-none"},sm:{base:"rounded-small"},md:{base:"rounded-medium"},lg:{base:"rounded-large"},full:{base:"rounded-full"}},isOneChar:{true:{},false:{}},isCloseable:{true:{},false:{}},hasStartContent:{true:{}},hasEndContent:{true:{}},isDisabled:{true:{base:"opacity-disabled pointer-events-none"}},isCloseButtonFocusVisible:{true:{closeButton:[...f.jR,"ring-1","rounded-full"]}}},defaultVariants:{variant:"solid",color:"default",size:"md",radius:"full",isDisabled:!1},compoundVariants:[{variant:"solid",color:"default",class:{base:m.J.solid.default}},{variant:"solid",color:"primary",class:{base:m.J.solid.primary}},{variant:"solid",color:"secondary",class:{base:m.J.solid.secondary}},{variant:"solid",color:"success",class:{base:m.J.solid.success}},{variant:"solid",color:"warning",class:{base:m.J.solid.warning}},{variant:"solid",color:"danger",class:{base:m.J.solid.danger}},{variant:"shadow",color:"default",class:{base:m.J.shadow.default}},{variant:"shadow",color:"primary",class:{base:m.J.shadow.primary}},{variant:"shadow",color:"secondary",class:{base:m.J.shadow.secondary}},{variant:"shadow",color:"success",class:{base:m.J.shadow.success}},{variant:"shadow",color:"warning",class:{base:m.J.shadow.warning}},{variant:"shadow",color:"danger",class:{base:m.J.shadow.danger}},{variant:"bordered",color:"default",class:{base:m.J.bordered.default}},{variant:"bordered",color:"primary",class:{base:m.J.bordered.primary}},{variant:"bordered",color:"secondary",class:{base:m.J.bordered.secondary}},{variant:"bordered",color:"success",class:{base:m.J.bordered.success}},{variant:"bordered",color:"warning",class:{base:m.J.bordered.warning}},{variant:"bordered",color:"danger",class:{base:m.J.bordered.danger}},{variant:"flat",color:"default",class:{base:m.J.flat.default}},{variant:"flat",color:"primary",class:{base:m.J.flat.primary}},{variant:"flat",color:"secondary",class:{base:m.J.flat.secondary}},{variant:"flat",color:"success",class:{base:m.J.flat.success}},{variant:"flat",color:"warning",class:{base:m.J.flat.warning}},{variant:"flat",color:"danger",class:{base:m.J.flat.danger}},{variant:"faded",color:"default",class:{base:m.J.faded.default}},{variant:"faded",color:"primary",class:{base:m.J.faded.primary}},{variant:"faded",color:"secondary",class:{base:m.J.faded.secondary}},{variant:"faded",color:"success",class:{base:m.J.faded.success}},{variant:"faded",color:"warning",class:{base:m.J.faded.warning}},{variant:"faded",color:"danger",class:{base:m.J.faded.danger}},{variant:"light",color:"default",class:{base:m.J.light.default}},{variant:"light",color:"primary",class:{base:m.J.light.primary}},{variant:"light",color:"secondary",class:{base:m.J.light.secondary}},{variant:"light",color:"success",class:{base:m.J.light.success}},{variant:"light",color:"warning",class:{base:m.J.light.warning}},{variant:"light",color:"danger",class:{base:m.J.light.danger}},{isOneChar:!0,size:"sm",class:{base:"w-5 h-5 min-w-unit-5 min-h-5"}},{isOneChar:!0,size:"md",class:{base:"w-6 h-6 min-w-unit-6 min-h-6"}},{isOneChar:!0,size:"lg",class:{base:"w-7 h-7 min-w-unit-7 min-h-7"}},{isOneChar:!0,isCloseable:!1,class:{base:"px-0 justify-center",content:"px-0 flex-none"}},{isOneChar:!0,isCloseable:!0,class:{base:"w-auto"}},{hasStartContent:!0,size:"sm",class:{content:"pl-0.5"}},{hasStartContent:!0,size:["md","lg"],class:{content:"pl-1"}},{hasEndContent:!0,size:"sm",class:{content:"pr-0.5"}},{hasEndContent:!0,size:["md","lg"],class:{content:"pr-1"}}]}),p=s(71986),g=s(29179),x=s(13920),y=s(60858),w=(0,c.Gp)((e,a)=>{let{Component:s,children:l,slots:t,classNames:n,isDot:o,isCloseable:i,startContent:m,endContent:v,getCloseButtonProps:f,getChipProps:w}=function(e){let[a,s]=(0,c.oe)(e,h.variantKeys),{ref:r,as:l,children:t,avatar:n,startContent:o,endContent:i,onClose:m,classNames:v,className:f,...y}=a,w=(0,p.gy)(r),j=(0,g.W)(null==v?void 0:v.base,f),J=!!m,C="dot"===e.variant,{focusProps:k,isFocusVisible:N}=(0,b.Fx)(),z=(0,x.useMemo)(()=>"string"==typeof t&&(null==t?void 0:t.length)===1,[t]),D=(0,x.useMemo)(()=>!!n||!!o,[n,o]),B=(0,x.useMemo)(()=>!!i||J,[i,J]),M=(0,x.useMemo)(()=>h({...s,hasStartContent:D,hasEndContent:B,isOneChar:z,isCloseable:J,isCloseButtonFocusVisible:N}),[...Object.values(s),N,D,B,z,J]),{pressProps:P}=(0,u.r7)({isDisabled:!!(null==e?void 0:e.isDisabled),onPress:m}),E=e=>(0,x.isValidElement)(e)?(0,x.cloneElement)(e,{className:(0,g.W)("max-h-[80%]",e.props.className)}):null;return{Component:l||"div",children:t,slots:M,classNames:v,isDot:C,isCloseable:J,startContent:((0,x.isValidElement)(n)?(0,x.cloneElement)(n,{className:M.avatar({class:null==v?void 0:v.avatar})}):null)||E(o),endContent:E(i),getCloseButtonProps:()=>({role:"button",tabIndex:0,className:M.closeButton({class:null==v?void 0:v.closeButton}),...(0,d.dG)(P,k)}),getChipProps:()=>({ref:w,className:M.base({class:j}),...y})}}({...e,ref:a}),j=(0,x.useMemo)(()=>o&&!m?(0,r.jsx)("span",{className:t.dot({class:null==n?void 0:n.dot})}):m,[t,m,o]),J=(0,x.useMemo)(()=>i?(0,r.jsx)("span",{...f(),children:v||(0,r.jsx)(y.f,{})}):v,[v,i,f]);return(0,r.jsxs)(s,{...w(),children:[j,(0,r.jsx)("span",{className:t.content({class:null==n?void 0:n.content}),children:l}),J]})});w.displayName="NextUI.Chip";var j=s(27272),J=s(46008),C=s(70298),k=s.n(C),N=s(23137),z=s.n(N);function D(e){var a;let{params:s}=e,{data:c,isLoading:d}=(0,j.a)({queryKey:["/default/".concat(s.id)],select:e=>e.data});return(0,r.jsxs)(r.Fragment,{children:[d&&(0,r.jsx)(t.Z,{className:"fixed top-0 left-0 right-0 bottom-0 m-auto",label:"加載中..."}),(0,r.jsxs)(n.w,{children:[(0,r.jsx)(o.u,{children:(0,r.jsx)(J.Z,{items:[{title:(0,r.jsx)(z(),{href:"/",children:(0,r.jsx)(l.Z,{})})},{title:(0,r.jsx)("span",{children:"元信息"})}]})}),(0,r.jsx)(i.G,{children:(0,r.jsx)("div",{className:"bg-no-repeat bg-current bg-cover h-[calc(100vh-100px)] flex justify-center items-center",style:{backgroundImage:"url(".concat(null==c?void 0:c.cover,")")},children:(0,r.jsxs)("div",{className:"flex mt-6 gap-2 flex-col bg-[#00000050] rounded-2xl w-1/3 p-5 items-center backdrop-blur-sm",children:[(0,r.jsx)("p",{children:(0,r.jsxs)(w,{color:"primary",children:["数据集名称：",null==c?void 0:c.name]})}),(0,r.jsx)("p",{children:(0,r.jsxs)(w,{color:"secondary",children:["数据集描述：",null==c?void 0:c.description]})}),(0,r.jsx)("p",{children:(0,r.jsxs)(w,{color:"success",children:["创建时间：",k()(null==c?void 0:c.create_time).format("YYYY年MM月DD日 HH:mm:ss")]})}),null==c?void 0:null===(a=c.meta)||void 0===a?void 0:a.map(e=>(0,r.jsx)("p",{children:(0,r.jsxs)(w,{color:"warning",children:[e.name,"：",e.value]})}))]})})})]})]})}},42008:function(e,a,s){"use strict";s.d(a,{Z:function(){return f}});var r=s(53800),l=(0,s(99437).tv)({slots:{base:"flex flex-col justify-center gap-1 max-w-fit items-center",label:"",svgWrapper:"relative block",svg:"z-0 relative overflow-hidden",track:"h-full stroke-default-300/50",indicator:"h-full stroke-current",value:"absolute font-normal inset-0 flex items-center justify-center"},variants:{color:{default:{svg:"text-default-400"},primary:{svg:"text-primary"},secondary:{svg:"text-secondary"},success:{svg:"text-success"},warning:{svg:"text-warning"},danger:{svg:"text-danger"}},size:{sm:{svg:"w-8 h-8",label:"text-small",value:"text-[0.5rem]"},md:{svg:"w-10 h-10",label:"text-small",value:"text-[0.55rem]"},lg:{svg:"w-12 h-12",label:"text-medium",value:"text-[0.6rem]"}},isIndeterminate:{true:{svg:"animate-spinner-ease-spin"}},isDisabled:{true:{base:"opacity-disabled cursor-not-allowed"}},disableAnimation:{true:{},false:{indicator:"transition-all !duration-500"}}},defaultVariants:{color:"primary",size:"md",isDisabled:!1,disableAnimation:!1},compoundVariants:[{disableAnimation:!0,isIndeterminate:!1,class:{svg:"!transition-none motion-reduce:transition-none"}}]}),t=s(71986),n=s(29179),o=s(40697),i=s(3037),c=s(13920),d=s(10516),u=s(34283),b=s(16275),m=s(33584),v=(0,r.Gp)((e,a)=>{let{Component:s,slots:v,classNames:f,label:h,showValueLabel:p,getProgressBarProps:g,getLabelProps:x,getSvgProps:y,getIndicatorProps:w,getTrackProps:j}=function(e){var a;let[s,m]=(0,r.oe)(e,l.variantKeys),{ref:v,as:f,id:h,className:p,classNames:g,label:x,valueLabel:y,value:w,minValue:j=0,maxValue:J=100,strokeWidth:C,showValueLabel:k=!1,formatOptions:N={style:"percent"},...z}=s,D=(0,t.gy)(v),B=(0,n.W)(null==g?void 0:g.base,p),[,M]=function(e={}){let{rerender:a=!1,delay:s=0}=e,r=(0,c.useRef)(!1),[l,t]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{r.current=!0;let e=null;return a&&(s>0?e=setTimeout(()=>{t(!0)},s):t(!0)),()=>{r.current=!1,a&&t(!1),e&&clearTimeout(e)}},[a]),[(0,c.useCallback)(()=>r.current,[]),l]}({rerender:!0,delay:100}),P=(null==(a=e.isIndeterminate)||a)&&void 0===w,{progressBarProps:E,labelProps:O}=function(e){let{value:a=0,minValue:s=0,maxValue:r=100,valueLabel:l,isIndeterminate:t,formatOptions:n={style:"percent"}}=e,o=(0,i.zL)(e,{labelable:!0}),{labelProps:c,fieldProps:m}=(0,u.N)({...e,labelElementType:"span"}),v=((a=(0,d.uZ)(a,s,r))-s)/(r-s),f=(0,b.Ux)(n);if(!t&&!l){let e="percent"===n.style?v:a;l=f.format(e)}return{progressBarProps:(0,i.dG)(o,{...m,"aria-valuenow":t?void 0:a,"aria-valuemin":s,"aria-valuemax":r,"aria-valuetext":t?void 0:l,role:"progressbar"}),labelProps:c}}({id:h,label:x,value:w,minValue:j,maxValue:J,valueLabel:y,formatOptions:N,isIndeterminate:P,"aria-labelledby":e["aria-labelledby"],"aria-label":e["aria-label"]}),V=(0,c.useMemo)(()=>l({...m,isIndeterminate:P}),[P,...Object.values(m)]),I=!!e.disableAnimation||M,G=C||"sm"===e.size?2:3,W=16-G,_=2*W*Math.PI,A=(0,c.useMemo)(()=>I?P?.25:w?function(e,a=100){return Math.min(Math.max(e,0),a)}((w-j)/(J-j),1):0:0,[I,w,j,J,P]),Z=_-A*_,F=(0,c.useCallback)((a={})=>({ref:D,"data-indeterminate":(0,o.PB)(P),"data-disabled":(0,o.PB)(e.isDisabled),className:V.base({class:B}),...(0,i.dG)(E,z,a)}),[D,V,P,e.isDisabled,B,E,z]),L=(0,c.useCallback)((e={})=>({className:V.label({class:null==g?void 0:g.label}),...(0,i.dG)(O,e)}),[V,g,O]),S=(0,c.useCallback)((e={})=>({viewBox:"0 0 32 32",fill:"none",strokeWidth:G,className:V.svg({class:null==g?void 0:g.svg}),...e}),[G,V,g]),Y=(0,c.useCallback)((e={})=>({cx:16,cy:16,r:W,role:"presentation",strokeDasharray:`${_} ${_}`,strokeDashoffset:Z,transform:"rotate(-90 16 16)",strokeLinecap:"round",className:V.indicator({class:null==g?void 0:g.indicator}),...e}),[V,g,Z,_,W]),$=(0,c.useCallback)((e={})=>({cx:16,cy:16,r:W,role:"presentation",strokeDasharray:`${_} ${_}`,strokeDashoffset:0,transform:"rotate(-90 16 16)",strokeLinecap:"round",className:V.track({class:null==g?void 0:g.track}),...e}),[V,g,_,W]);return{Component:f||"div",domRef:D,slots:V,classNames:g,label:x,showValueLabel:k,getProgressBarProps:F,getLabelProps:L,getSvgProps:S,getIndicatorProps:Y,getTrackProps:$}}({ref:a,...e}),J=g();return(0,m.jsxs)(s,{...J,children:[(0,m.jsxs)("div",{className:v.svgWrapper({class:null==f?void 0:f.svgWrapper}),children:[(0,m.jsxs)("svg",{...y(),children:[(0,m.jsx)("circle",{...j()}),(0,m.jsx)("circle",{...w()})]}),p&&(0,m.jsx)("span",{className:v.value({class:null==f?void 0:f.value}),children:J["aria-valuetext"]})]}),h&&(0,m.jsx)("span",{...x(),children:h})]})});v.displayName="NextUI.CircularProgress";var f=v},60858:function(e,a,s){"use strict";s.d(a,{f:function(){return l}});var r=s(33584),l=e=>(0,r.jsx)("svg",{"aria-hidden":"true",focusable:"false",height:"1em",role:"presentation",viewBox:"0 0 24 24",width:"1em",...e,children:(0,r.jsx)("path",{d:"M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z",fill:"currentColor"})})}},function(e){e.O(0,[485,135,326,635,377,170,171,551,239,577,56,744],function(){return e(e.s=95429)}),_N_E=e.O()}]);