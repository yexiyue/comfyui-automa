(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[473],{76861:function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"minus-circle",theme:"outlined"}},63376:function(e,r,a){"use strict";Object.defineProperty(r,"Z",{enumerable:!0,get:function(){return o}});var t=function(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=i(r);if(a&&a.has(e))return a.get(e);var t={},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in e)if("default"!==n&&Object.prototype.hasOwnProperty.call(e,n)){var s=l?Object.getOwnPropertyDescriptor(e,n):null;s&&(s.get||s.set)?Object.defineProperty(t,n,s):t[n]=e[n]}return t.default=e,a&&a.set(e,t),t}(a(13920)),l=s(a(76861)),n=s(a(28306));function s(e){return e&&e.__esModule?e:{default:e}}function i(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,a=new WeakMap;return(i=function(e){return e?a:r})(e)}var o=t.forwardRef(function(e,r){var a,s;return t.createElement(n.default,(a=function(e){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{},t=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.forEach(function(r){var t;t=a[r],r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t})}return e}({},e),s=s={ref:r,icon:l.default},Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(s)):(function(e,r){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a.push.apply(a,t)}return a})(Object(s)).forEach(function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(s,e))}),a))})},93825:function(e,r,a){"use strict";var t=a(72596).default;Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var l=t(a(13920)),n=a(71121);r.default=e=>{let{className:r,direction:a,index:t,marginDirection:s,children:i,split:o,wrap:c,style:d}=e,{horizontalSize:u,verticalSize:f,latestIndex:m,supportFlexGap:p}=l.useContext(n.SpaceContext),b={};return(!p&&("vertical"===a?t<m&&(b={marginBottom:u/(o?2:1)}):b=Object.assign(Object.assign({},t<m&&{[s]:u/(o?2:1)}),c&&{paddingBottom:f})),null==i)?null:l.createElement(l.Fragment,null,l.createElement("div",{className:r,style:Object.assign(Object.assign({},b),d)},i),t<m&&o&&l.createElement("span",{className:`${r}-split`,style:b},o))}},71121:function(e,r,a){"use strict";var t=a(55934).default;Object.defineProperty(r,"__esModule",{value:!0}),r.SpaceContextProvider=r.SpaceContext=void 0;var l=t(a(13920));let n=l.default.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1});r.SpaceContext=n;let s=n.Provider;r.SpaceContextProvider=s},20647:function(e,r,a){"use strict";var t=a(72596).default,l=a(55934).default;Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"SpaceContext",{enumerable:!0,get:function(){return f.SpaceContext}}),r.default=void 0;var n=l(a(73762)),s=l(a(72051)),i=t(a(13920)),o=l(a(57070)),c=a(57086),d=l(a(38545)),u=l(a(93825)),f=a(71121),m=l(a(83659)),p=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&0>r.indexOf(t)&&(a[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)0>r.indexOf(t[l])&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(a[t[l]]=e[t[l]]);return a};let b={small:8,middle:16,large:24},v=i.forwardRef((e,r)=>{var a,t;let{getPrefixCls:l,space:d,direction:v}=i.useContext(c.ConfigContext),{size:g=(null==d?void 0:d.size)||"small",align:h,className:y,rootClassName:x,children:w,direction:j="horizontal",prefixCls:O,split:P,style:C,wrap:k=!1,classNames:J,styles:N}=e,I=p(e,["size","align","className","rootClassName","children","direction","prefixCls","split","style","wrap","classNames","styles"]),z=(0,o.default)(),[S,E]=i.useMemo(()=>(Array.isArray(g)?g:[g,g]).map(e=>"string"==typeof e?b[e]:e||0),[g]),M=(0,s.default)(w,{keepEmpty:!0}),D=void 0===h&&"horizontal"===j?"center":h,Z=l("space",O),[G,_]=(0,m.default)(Z),B=(0,n.default)(Z,null==d?void 0:d.className,_,`${Z}-${j}`,{[`${Z}-rtl`]:"rtl"===v,[`${Z}-align-${D}`]:D},y,x),W=(0,n.default)(`${Z}-item`,null!==(a=null==J?void 0:J.item)&&void 0!==a?a:null===(t=null==d?void 0:d.classNames)||void 0===t?void 0:t.item),A="rtl"===v?"marginLeft":"marginRight",L=0,$=M.map((e,r)=>{var a,t;null!=e&&(L=r);let l=e&&e.key||`${W}-${r}`;return i.createElement(u.default,{className:W,key:l,direction:j,index:r,marginDirection:A,split:P,wrap:k,style:null!==(a=null==N?void 0:N.item)&&void 0!==a?a:null===(t=null==d?void 0:d.styles)||void 0===t?void 0:t.item},e)}),V=i.useMemo(()=>({horizontalSize:S,verticalSize:E,latestIndex:L,supportFlexGap:z}),[S,E,L,z]);if(0===M.length)return null;let F={};return k&&(F.flexWrap="wrap",z||(F.marginBottom=-E)),z&&(F.columnGap=S,F.rowGap=E),G(i.createElement("div",Object.assign({ref:r,className:B,style:Object.assign(Object.assign(Object.assign({},F),null==d?void 0:d.style),C)},I),i.createElement(f.SpaceContextProvider,{value:V},$)))});v.Compact=d.default,r.default=v},64851:function(e,r,a){Promise.resolve().then(a.bind(a,14264))},58075:function(e,r,a){"use strict";a.d(r,{R:function(){return t},s:function(){return l}});let t=async e=>{let{queryKey:r}=e;try{let e=await fetch("".concat("http://localhost:4060").concat(r[0]));if(!e.ok)throw Error("Something went wrong ".concat(r[0]));return await e.json()}catch(e){throw Error(e)}},l=(e,r)=>async a=>{try{let t=await fetch("".concat("http://localhost:4060").concat(e),{method:r,headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!t.ok)throw Error("Something went wrong ".concat(r," ").concat(e));return await t.json()}catch(e){throw Error(e)}}},14264:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return z}});var t=a(33584),l=a(58075),n=a(43070),s=a(63376),i=a(58e3),o=a(42008),c=a(54921),d=a(57912),u=a(10),f=a(78502),m=a(27272),p=a(26907),b=a(65325),v=a(46008),g=a(19816),h=a.n(g),y=a(67930),x=a(20581),w=a(93527),j=a(20647),O=a(77722),P=a(28938),C=a(23137),k=a.n(C),J=a(47991),N=a(13920);let{TextArea:I}=x.default;function z(e){let{params:r}=e,{data:a,isLoading:g}=(0,m.a)({queryKey:["/default/".concat(r.id)],select:e=>e.data}),[C,z]=(0,N.useState)("");(0,N.useEffect)(()=>{if(a){if(a.cover){z(a.cover);let e=a.cover.split("/");a.cover=[{uid:-1,name:e[e.length-1],status:"done",url:a.cover}]}Z.setFieldsValue(a)}},[a]);let[S,E]=P.ZP.useMessage(),M=(0,p.NL)(),{mutate:D}=(0,b.D)({mutationFn:(0,l.s)("/default/".concat(r.id),"put")}),[Z]=y.Z.useForm(),[G,_]=(0,N.useState)(!1),[B,W]=(0,N.useState)(""),[A,L]=(0,N.useState)(""),$=async e=>{if(e.url)W(e.url);else{let r=URL.createObjectURL(e.originFileObj);W(r)}_(!0),L(e.name||e.url.substring(e.url.lastIndexOf("/")+1))};(0,J.useRouter)();let V=async()=>{var e,r,a,t;let l=await Z.validateFields();l.cover=(null===(t=l.cover)||void 0===t?void 0:null===(a=t[0])||void 0===a?void 0:null===(r=a.response)||void 0===r?void 0:null===(e=r.url)||void 0===e?void 0:e[0])||C||"",D(l,{onError(e){S.error(e.message,1)},onSuccess(){M.invalidateQueries({queryKey:["/default"]}),S.success("保存成功",1)}})};return(0,t.jsxs)(t.Fragment,{children:[E,g&&(0,t.jsx)(o.Z,{className:"fixed top-0 left-0 right-0 bottom-0 m-auto",label:"加載中..."}),(0,t.jsxs)(c.w,{children:[(0,t.jsx)(d.u,{children:(0,t.jsx)(v.Z,{items:[{title:(0,t.jsx)(k(),{href:"/",children:(0,t.jsx)(n.Z,{})})},{title:(0,t.jsx)("span",{children:"设置"})}]})}),(0,t.jsx)(u.G,{children:(0,t.jsxs)("div",{className:"mx-auto mt-5 w-1/2 min-w-[550px]",children:[(0,t.jsxs)(y.Z,{name:"template",labelCol:{span:4},wrapperCol:{span:24},form:Z,children:[(0,t.jsx)(y.Z.Item,{name:"name",label:"数据集名称",rules:[{required:!0}],children:(0,t.jsx)(x.default,{})}),(0,t.jsx)(y.Z.Item,{name:"description",label:"数据集描述",rules:[{required:!0}],children:(0,t.jsx)(I,{rows:3})}),(0,t.jsx)(y.Z.Item,{label:"数据集封面",name:"cover",valuePropName:"fileList",getValueFromEvent:e=>Array.isArray(e)?e:null==e?void 0:e.fileList,children:(0,t.jsx)(O.default,{action:"".concat("http://localhost:4060","/upload"),onPreview:$,accept:".png,.jpg,.jpeg,.webp",maxCount:1,listType:"picture-card",children:(0,t.jsxs)("div",{children:[(0,t.jsx)(i.Z,{}),(0,t.jsx)("div",{style:{marginTop:8},children:"Upload"})]})})}),(0,t.jsx)(y.Z.List,{name:"meta",initialValue:[],children:(e,r)=>{let{add:a,remove:l}=r;return(0,t.jsxs)(t.Fragment,{children:[e.map(e=>{let{key:r,name:a,...n}=e;return(0,t.jsxs)(j.default,{style:{display:"flex",marginBottom:8},align:"baseline",children:[(0,t.jsx)(y.Z.Item,{...n,name:[a,"name"],rules:[{required:!0,message:"名称"}],children:(0,t.jsx)(x.default,{placeholder:"名称"})}),(0,t.jsx)(y.Z.Item,{...n,name:[a,"value"],rules:[{required:!0,message:"值"}],children:(0,t.jsx)(x.default,{placeholder:"值"})}),(0,t.jsx)(s.Z,{onClick:()=>l(a)})]},r)}),(0,t.jsx)(y.Z.Item,{children:(0,t.jsx)(h(),{type:"dashed",onClick:()=>a(),block:!0,icon:(0,t.jsx)(i.Z,{}),children:"添加元信息"})})]})}}),(0,t.jsx)("div",{className:"mt-6",children:(0,t.jsx)(f.A,{color:"primary",className:"w-full",variant:"shadow",onClick:V,children:"保存"})})]}),(0,t.jsx)(w.Z,{open:G,title:A,footer:null,onCancel:()=>{W(""),_(!1),L("")},children:(0,t.jsx)("img",{alt:"example",style:{width:"100%"},src:B})})]})})]})]})}},78502:function(e,r,a){"use strict";a.d(r,{A:function(){return C}});var[t,l]=(0,a(31129).k)({name:"ButtonGroupContext",strict:!1}),n=a(40697),s=a(13920),i=a(72315),o=a(3037),c=a(71986),d=a(98110),u=a(14436),f=a(99437),m=a(89154),p=(0,f.tv)({base:["z-0","group","relative","inline-flex","items-center","justify-center","box-border","appearance-none","outline-none","select-none","whitespace-nowrap","min-w-max","font-normal","subpixel-antialiased","overflow-hidden","tap-highlight-transparent",...m.Dh],variants:{variant:{solid:"",bordered:"border-medium bg-transparent",light:"bg-transparent",flat:"",faded:"border-medium",shadow:"",ghost:"border-medium bg-transparent"},size:{sm:"px-unit-3 min-w-unit-16 h-unit-8 text-tiny gap-unit-2 rounded-small",md:"px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium",lg:"px-unit-6 min-w-unit-24 h-unit-12 text-medium gap-unit-3 rounded-large"},color:{default:"",primary:"",secondary:"",success:"",warning:"",danger:""},radius:{none:"rounded-none",sm:"rounded-small",md:"rounded-medium",lg:"rounded-large",full:"rounded-full"},fullWidth:{true:"w-full"},isDisabled:{true:"opacity-disabled pointer-events-none"},isInGroup:{true:"[&:not(:first-child):not(:last-child)]:rounded-none"},isIconOnly:{true:"px-unit-0 !gap-unit-0",false:"[&>svg]:max-w-[theme(spacing.unit-8)]"},disableAnimation:{true:"!transition-none",false:"data-[pressed=true]:scale-[0.97] transition-transform-colors motion-reduce:transition-none"}},defaultVariants:{size:"md",variant:"solid",color:"default",fullWidth:!1,isDisabled:!1,isInGroup:!1,disableAnimation:!1},compoundVariants:[{variant:"solid",color:"default",class:u.J.solid.default},{variant:"solid",color:"primary",class:u.J.solid.primary},{variant:"solid",color:"secondary",class:u.J.solid.secondary},{variant:"solid",color:"success",class:u.J.solid.success},{variant:"solid",color:"warning",class:u.J.solid.warning},{variant:"solid",color:"danger",class:u.J.solid.danger},{variant:"shadow",color:"default",class:u.J.shadow.default},{variant:"shadow",color:"primary",class:u.J.shadow.primary},{variant:"shadow",color:"secondary",class:u.J.shadow.secondary},{variant:"shadow",color:"success",class:u.J.shadow.success},{variant:"shadow",color:"warning",class:u.J.shadow.warning},{variant:"shadow",color:"danger",class:u.J.shadow.danger},{variant:"bordered",color:"default",class:u.J.bordered.default},{variant:"bordered",color:"primary",class:u.J.bordered.primary},{variant:"bordered",color:"secondary",class:u.J.bordered.secondary},{variant:"bordered",color:"success",class:u.J.bordered.success},{variant:"bordered",color:"warning",class:u.J.bordered.warning},{variant:"bordered",color:"danger",class:u.J.bordered.danger},{variant:"flat",color:"default",class:u.J.flat.default},{variant:"flat",color:"primary",class:u.J.flat.primary},{variant:"flat",color:"secondary",class:u.J.flat.secondary},{variant:"flat",color:"success",class:u.J.flat.success},{variant:"flat",color:"warning",class:u.J.flat.warning},{variant:"flat",color:"danger",class:u.J.flat.danger},{variant:"faded",color:"default",class:u.J.faded.default},{variant:"faded",color:"primary",class:u.J.faded.primary},{variant:"faded",color:"secondary",class:u.J.faded.secondary},{variant:"faded",color:"success",class:u.J.faded.success},{variant:"faded",color:"warning",class:u.J.faded.warning},{variant:"faded",color:"danger",class:u.J.faded.danger},{variant:"light",color:"default",class:[u.J.light.default,"data-[hover=true]:bg-default/40"]},{variant:"light",color:"primary",class:[u.J.light.primary,"data-[hover=true]:bg-primary/20"]},{variant:"light",color:"secondary",class:[u.J.light.secondary,"data-[hover=true]:bg-secondary/20"]},{variant:"light",color:"success",class:[u.J.light.success,"data-[hover=true]:bg-success/20"]},{variant:"light",color:"warning",class:[u.J.light.warning,"data-[hover=true]:bg-warning/20"]},{variant:"light",color:"danger",class:[u.J.light.danger,"data-[hover=true]:bg-danger/20"]},{variant:"ghost",color:"default",class:u.J.ghost.default},{variant:"ghost",color:"primary",class:u.J.ghost.primary},{variant:"ghost",color:"secondary",class:u.J.ghost.secondary},{variant:"ghost",color:"success",class:u.J.ghost.success},{variant:"ghost",color:"warning",class:u.J.ghost.warning},{variant:"ghost",color:"danger",class:u.J.ghost.danger},{isInGroup:!0,size:"sm",class:"rounded-none first:rounded-l-small last:rounded-r-small"},{isInGroup:!0,size:"md",class:"rounded-none first:rounded-l-medium last:rounded-r-medium"},{isInGroup:!0,size:"lg",class:"rounded-none first:rounded-l-large last:rounded-r-large"},{isInGroup:!0,isRounded:!0,class:"rounded-none first:rounded-l-full last:rounded-r-full"},{isInGroup:!0,variant:["bordered","ghost"],class:"[&:not(:first-child)]:ml-[calc(theme(borderWidth.medium)*-1)]"},{isIconOnly:!0,size:"sm",class:"min-w-unit-8 w-unit-8 h-unit-8"},{isIconOnly:!0,size:"md",class:"min-w-unit-10 w-unit-10 h-unit-10"},{isIconOnly:!0,size:"lg",class:"min-w-unit-12 w-unit-12 h-unit-12"}]});(0,f.tv)({base:"inline-flex items-center justify-center h-auto",variants:{fullWidth:{true:"w-full"}},defaultVariants:{fullWidth:!1}});var b=a(97107),v=a(22553),g=a(36115),h=a(53800),y=(0,f.tv)({slots:{base:"relative inline-flex flex-col gap-2 items-center justify-center",wrapper:"relative flex",circle1:["absolute","w-full","h-full","rounded-full","animate-spinner-ease-spin","border-2","border-solid","border-t-transparent","border-l-transparent","border-r-transparent"],circle2:["absolute","w-full","h-full","rounded-full","opacity-75","animate-spinner-linear-spin","border-2","border-dotted","border-t-transparent","border-l-transparent","border-r-transparent"],label:"text-foreground dark:text-foreground-dark font-regular"},variants:{size:{sm:{wrapper:"w-5 h-5",circle1:"border-2",circle2:"border-2",label:"text-small"},md:{wrapper:"w-8 h-8",circle1:"border-3",circle2:"border-3",label:"text-medium"},lg:{wrapper:"w-10 h-10",circle1:"border-3",circle2:"border-3",label:"text-large"}},color:{current:{circle1:"border-b-current",circle2:"border-b-current"},white:{circle1:"border-b-white",circle2:"border-b-white"},default:{circle1:"border-b-default",circle2:"border-b-default"},primary:{circle1:"border-b-primary",circle2:"border-b-primary"},secondary:{circle1:"border-b-secondary",circle2:"border-b-secondary"},success:{circle1:"border-b-success",circle2:"border-b-success"},warning:{circle1:"border-b-warning",circle2:"border-b-warning"},danger:{circle1:"border-b-danger",circle2:"border-b-danger"}},labelColor:{foreground:{label:"text-foreground"},primary:{label:"text-primary"},secondary:{label:"text-secondary"},success:{label:"text-success"},warning:{label:"text-warning"},danger:{label:"text-danger"}}},defaultVariants:{size:"md",color:"primary",labelColor:"foreground"}}),x=a(29179),w=a(33584),j=(0,h.Gp)((e,r)=>{let{slots:a,classNames:t,label:l,getSpinnerProps:n}=function(e){let[r,a]=(0,h.oe)(e,y.variantKeys),{children:t,className:l,classNames:n,label:i,...o}=r,c=(0,s.useMemo)(()=>y({...a}),[...Object.values(a)]),d=(0,x.W)(null==n?void 0:n.base,l),u=i||t,f=(0,s.useMemo)(()=>u&&"string"==typeof u?u:o["aria-label"]?"":"Loading",[t,u,o["aria-label"]]),m=(0,s.useCallback)(()=>({"aria-label":f,className:c.base({class:d}),...o}),[f,c,d,o]);return{label:u,slots:c,classNames:n,getSpinnerProps:m}}({...e});return(0,w.jsxs)("div",{ref:r,...n(),children:[(0,w.jsxs)("div",{className:a.wrapper({class:null==t?void 0:t.wrapper}),children:[(0,w.jsx)("i",{className:a.circle1({class:null==t?void 0:t.circle1})}),(0,w.jsx)("i",{className:a.circle2({class:null==t?void 0:t.circle2})})]}),l&&(0,w.jsx)("span",{className:a.label(),children:l})]})});j.displayName="NextUI.Spinner";var O=a(68247),P=(0,h.Gp)((e,r)=>{let{Component:a,domRef:t,children:u,styles:f,ripples:m,spinnerSize:h,spinner:y=(0,w.jsx)(j,{color:"current",size:h}),spinnerPlacement:x,startContent:P,endContent:C,isLoading:k,disableRipple:J,getButtonProps:N}=function(e){var r,a,t,u,f,m,h,y;let x=l(),w=!!x,{ref:j,as:O,children:P,startContent:C,endContent:k,autoFocus:J,className:N,spinner:I,fullWidth:z=null!=(r=null==x?void 0:x.fullWidth)&&r,size:S=null!=(a=null==x?void 0:x.size)?a:"md",color:E=null!=(t=null==x?void 0:x.color)?t:"default",variant:M=null!=(u=null==x?void 0:x.variant)?u:"solid",disableAnimation:D=null!=(f=null==x?void 0:x.disableAnimation)&&f,radius:Z=null==x?void 0:x.radius,disableRipple:G=null!=(m=null==x?void 0:x.disableRipple)&&m,isDisabled:_=null!=(h=null==x?void 0:x.isDisabled)&&h,isIconOnly:B=null!=(y=null==x?void 0:x.isIconOnly)&&y,isLoading:W=!1,spinnerPlacement:A="start",onPress:L,onClick:$,...V}=e,F=O||"button",R="string"==typeof F,T=(0,c.gy)(j),{isFocusVisible:U,isFocused:q,focusProps:K}=(0,i.Fx)({autoFocus:J}),H=_||W,Q=(0,s.useMemo)(()=>p({size:S,color:E,variant:M,radius:Z,fullWidth:z,isDisabled:H,isInGroup:w,disableAnimation:D,isIconOnly:B,className:N}),[S,E,M,Z,z,H,w,B,D,N]),{onClick:X,ripples:Y}=(0,g.i)(),ee=(0,s.useCallback)(e=>{G||H||D||!T.current||X(e)},[G,H,D,T,X]),{buttonProps:er,isPressed:ea}=(0,b.j)({elementType:O,isDisabled:H,onPress:L,onClick:(0,o.tS)($,ee),...V},T),{isHovered:et,hoverProps:el}=(0,v.XI)({isDisabled:H}),en=(0,s.useCallback)((e={})=>({"data-disabled":(0,n.PB)(H),"data-focus":(0,n.PB)(q),"data-pressed":(0,n.PB)(ea),"data-focus-visible":(0,n.PB)(U),"data-hover":(0,n.PB)(et),"data-loading":(0,n.PB)(W),...(0,o.dG)(er,K,el,(0,d.z)(V,{enabled:R}),(0,d.z)(e))}),[W,H,q,ea,R,U,et,er,K,el,V]),es=e=>(0,s.isValidElement)(e)?(0,s.cloneElement)(e,{"aria-hidden":!0,focusable:!1,tabIndex:-1}):null,ei=es(C),eo=es(k),ec=(0,s.useMemo)(()=>({sm:"sm",md:"sm",lg:"md"})[S],[S]);return{Component:F,children:P,domRef:T,ripples:Y,spinner:I,styles:Q,startContent:ei,endContent:eo,isLoading:W,spinnerPlacement:A,spinnerSize:ec,disableRipple:G,getButtonProps:en}}({...e,ref:r});return(0,w.jsxs)(a,{ref:t,className:f,...N(),children:[P,k&&"start"===x&&y,u,k&&"end"===x&&y,C,!J&&(0,w.jsx)(O.L,{ripples:m})]})});P.displayName="NextUI.Button";var C=P},42008:function(e,r,a){"use strict";a.d(r,{Z:function(){return b}});var t=a(53800),l=(0,a(99437).tv)({slots:{base:"flex flex-col justify-center gap-1 max-w-fit items-center",label:"",svgWrapper:"relative block",svg:"z-0 relative overflow-hidden",track:"h-full stroke-default-300/50",indicator:"h-full stroke-current",value:"absolute font-normal inset-0 flex items-center justify-center"},variants:{color:{default:{svg:"text-default-400"},primary:{svg:"text-primary"},secondary:{svg:"text-secondary"},success:{svg:"text-success"},warning:{svg:"text-warning"},danger:{svg:"text-danger"}},size:{sm:{svg:"w-8 h-8",label:"text-small",value:"text-[0.5rem]"},md:{svg:"w-10 h-10",label:"text-small",value:"text-[0.55rem]"},lg:{svg:"w-12 h-12",label:"text-medium",value:"text-[0.6rem]"}},isIndeterminate:{true:{svg:"animate-spinner-ease-spin"}},isDisabled:{true:{base:"opacity-disabled cursor-not-allowed"}},disableAnimation:{true:{},false:{indicator:"transition-all !duration-500"}}},defaultVariants:{color:"primary",size:"md",isDisabled:!1,disableAnimation:!1},compoundVariants:[{disableAnimation:!0,isIndeterminate:!1,class:{svg:"!transition-none motion-reduce:transition-none"}}]}),n=a(71986),s=a(29179),i=a(40697),o=a(3037),c=a(13920),d=a(10516),u=a(34283),f=a(16275),m=a(33584),p=(0,t.Gp)((e,r)=>{let{Component:a,slots:p,classNames:b,label:v,showValueLabel:g,getProgressBarProps:h,getLabelProps:y,getSvgProps:x,getIndicatorProps:w,getTrackProps:j}=function(e){var r;let[a,m]=(0,t.oe)(e,l.variantKeys),{ref:p,as:b,id:v,className:g,classNames:h,label:y,valueLabel:x,value:w,minValue:j=0,maxValue:O=100,strokeWidth:P,showValueLabel:C=!1,formatOptions:k={style:"percent"},...J}=a,N=(0,n.gy)(p),I=(0,s.W)(null==h?void 0:h.base,g),[,z]=function(e={}){let{rerender:r=!1,delay:a=0}=e,t=(0,c.useRef)(!1),[l,n]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{t.current=!0;let e=null;return r&&(a>0?e=setTimeout(()=>{n(!0)},a):n(!0)),()=>{t.current=!1,r&&n(!1),e&&clearTimeout(e)}},[r]),[(0,c.useCallback)(()=>t.current,[]),l]}({rerender:!0,delay:100}),S=(null==(r=e.isIndeterminate)||r)&&void 0===w,{progressBarProps:E,labelProps:M}=function(e){let{value:r=0,minValue:a=0,maxValue:t=100,valueLabel:l,isIndeterminate:n,formatOptions:s={style:"percent"}}=e,i=(0,o.zL)(e,{labelable:!0}),{labelProps:c,fieldProps:m}=(0,u.N)({...e,labelElementType:"span"}),p=((r=(0,d.uZ)(r,a,t))-a)/(t-a),b=(0,f.Ux)(s);if(!n&&!l){let e="percent"===s.style?p:r;l=b.format(e)}return{progressBarProps:(0,o.dG)(i,{...m,"aria-valuenow":n?void 0:r,"aria-valuemin":a,"aria-valuemax":t,"aria-valuetext":n?void 0:l,role:"progressbar"}),labelProps:c}}({id:v,label:y,value:w,minValue:j,maxValue:O,valueLabel:x,formatOptions:k,isIndeterminate:S,"aria-labelledby":e["aria-labelledby"],"aria-label":e["aria-label"]}),D=(0,c.useMemo)(()=>l({...m,isIndeterminate:S}),[S,...Object.values(m)]),Z=!!e.disableAnimation||z,G=P||"sm"===e.size?2:3,_=16-G,B=2*_*Math.PI,W=(0,c.useMemo)(()=>Z?S?.25:w?function(e,r=100){return Math.min(Math.max(e,0),r)}((w-j)/(O-j),1):0:0,[Z,w,j,O,S]),A=B-W*B,L=(0,c.useCallback)((r={})=>({ref:N,"data-indeterminate":(0,i.PB)(S),"data-disabled":(0,i.PB)(e.isDisabled),className:D.base({class:I}),...(0,o.dG)(E,J,r)}),[N,D,S,e.isDisabled,I,E,J]),$=(0,c.useCallback)((e={})=>({className:D.label({class:null==h?void 0:h.label}),...(0,o.dG)(M,e)}),[D,h,M]),V=(0,c.useCallback)((e={})=>({viewBox:"0 0 32 32",fill:"none",strokeWidth:G,className:D.svg({class:null==h?void 0:h.svg}),...e}),[G,D,h]),F=(0,c.useCallback)((e={})=>({cx:16,cy:16,r:_,role:"presentation",strokeDasharray:`${B} ${B}`,strokeDashoffset:A,transform:"rotate(-90 16 16)",strokeLinecap:"round",className:D.indicator({class:null==h?void 0:h.indicator}),...e}),[D,h,A,B,_]),R=(0,c.useCallback)((e={})=>({cx:16,cy:16,r:_,role:"presentation",strokeDasharray:`${B} ${B}`,strokeDashoffset:0,transform:"rotate(-90 16 16)",strokeLinecap:"round",className:D.track({class:null==h?void 0:h.track}),...e}),[D,h,B,_]);return{Component:b||"div",domRef:N,slots:D,classNames:h,label:y,showValueLabel:C,getProgressBarProps:L,getLabelProps:$,getSvgProps:V,getIndicatorProps:F,getTrackProps:R}}({ref:r,...e}),O=h();return(0,m.jsxs)(a,{...O,children:[(0,m.jsxs)("div",{className:p.svgWrapper({class:null==b?void 0:b.svgWrapper}),children:[(0,m.jsxs)("svg",{...x(),children:[(0,m.jsx)("circle",{...j()}),(0,m.jsx)("circle",{...w()})]}),g&&(0,m.jsx)("span",{className:p.value({class:null==b?void 0:b.value}),children:O["aria-valuetext"]})]}),v&&(0,m.jsx)("span",{...y(),children:v})]})});p.displayName="NextUI.CircularProgress";var b=p}},function(e){e.O(0,[135,326,635,377,170,171,11,551,869,239,945,722,940,577,56,744],function(){return e(e.s=64851)}),_N_E=e.O()}]);