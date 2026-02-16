(()=>{var e={};e.id=826,e.ids=[826],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},8099:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>r.a,__next_app__:()=>x,originalPathname:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>c}),a(1903),a(1506),a(5866);var l=a(3191),s=a(8716),i=a(7922),r=a.n(i),n=a(5231),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);a.d(t,o);let c=["",{children:["feed",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,1903)),"C:\\Users\\User\\Downloads\\Create Design System Layout-test\\src\\app\\feed\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,1506)),"C:\\Users\\User\\Downloads\\Create Design System Layout-test\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],d=["C:\\Users\\User\\Downloads\\Create Design System Layout-test\\src\\app\\feed\\page.tsx"],p="/feed/page",x={require:a,loadChunk:()=>Promise.resolve()},m=new l.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/feed/page",pathname:"/feed",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},5367:(e,t,a)=>{Promise.resolve().then(a.bind(a,5972))},9015:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,2994,23)),Promise.resolve().then(a.t.bind(a,6114,23)),Promise.resolve().then(a.t.bind(a,9727,23)),Promise.resolve().then(a.t.bind(a,9671,23)),Promise.resolve().then(a.t.bind(a,1868,23)),Promise.resolve().then(a.t.bind(a,4759,23))},6246:()=>{},5972:(e,t,a)=>{"use strict";a.d(t,{default:()=>K});var l=a(326),s=a(7577),i=a(1291);function r(){return function(e){let[t,a]=(0,s.useState)(!1),[l,i]=(0,s.useState)(!1);return!!l&&t}(0)}var n=a(7427),o=a(9436);let c=(0,a(6557).Z)("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);function d(e){let[t,a]=(0,s.useState)(!1),{src:i,alt:r,style:n,className:o,...c}=e;return t?l.jsx("div",{className:`inline-block bg-gray-100 text-center align-middle ${o??""}`,style:n,children:l.jsx("div",{className:"flex items-center justify-center w-full h-full",children:l.jsx("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==",alt:"Error loading image",...c,"data-original-url":i})})}):l.jsx("img",{src:i,alt:r,className:o,style:n,...c,onError:()=>{a(!0)}})}function p({children:e}){return l.jsx(l.Fragment,{children:e})}function x({children:e}){return l.jsx(l.Fragment,{children:e})}function m({children:e,enabled:t=!0}){let[a,i]=(0,s.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes glitch-skew {
            0% {
              transform: skew(0deg, 0deg);
            }
            10% {
              transform: skew(-2deg, 1deg);
            }
            20% {
              transform: skew(1deg, -1deg);
            }
            30% {
              transform: skew(-1deg, 2deg);
            }
            40% {
              transform: skew(2deg, -1deg);
            }
            50% {
              transform: skew(-1deg, 1deg);
            }
            60% {
              transform: skew(1deg, -2deg);
            }
            70% {
              transform: skew(-2deg, 1deg);
            }
            80% {
              transform: skew(1deg, 1deg);
            }
            90% {
              transform: skew(-1deg, -1deg);
            }
            100% {
              transform: skew(0deg, 0deg);
            }
          }

          @keyframes glitch-rgb {
            0% {
              filter: hue-rotate(0deg) saturate(100%);
            }
            14% {
              filter: hue-rotate(180deg) saturate(150%);
            }
            28% {
              filter: hue-rotate(-90deg) saturate(200%);
            }
            42% {
              filter: hue-rotate(90deg) saturate(150%);
            }
            56% {
              filter: hue-rotate(-180deg) saturate(100%);
            }
            70% {
              filter: hue-rotate(45deg) saturate(175%);
            }
            84% {
              filter: hue-rotate(-45deg) saturate(125%);
            }
            100% {
              filter: hue-rotate(0deg) saturate(100%);
            }
          }

          .glitch-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .glitch-wrapper.active {
            animation: glitch-skew 0.2s ease-in-out;
          }

          .glitch-wrapper.active .glitch-content {
            animation: glitch-rgb 0.2s steps(4, end);
          }

          .glitch-wrapper::before,
          .glitch-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
          }

          .glitch-wrapper.active::before {
            opacity: 0.7;
            background: rgba(255, 0, 255, 0.3);
            mix-blend-mode: screen;
            animation: glitch-flicker-1 0.2s steps(3, end);
          }

          .glitch-wrapper.active::after {
            opacity: 0.7;
            background: rgba(0, 255, 255, 0.3);
            mix-blend-mode: screen;
            animation: glitch-flicker-2 0.2s steps(3, end);
          }

          @keyframes glitch-flicker-1 {
            0% {
              clip-path: inset(40% 0 61% 0);
              transform: translate(-3px, 3px);
            }
            20% {
              clip-path: inset(92% 0 1% 0);
              transform: translate(3px, -3px);
            }
            40% {
              clip-path: inset(43% 0 1% 0);
              transform: translate(-3px, 3px);
            }
            60% {
              clip-path: inset(25% 0 58% 0);
              transform: translate(3px, -3px);
            }
            80% {
              clip-path: inset(54% 0 7% 0);
              transform: translate(-3px, 3px);
            }
            100% {
              clip-path: inset(58% 0 43% 0);
              transform: translate(0);
            }
          }

          @keyframes glitch-flicker-2 {
            0% {
              clip-path: inset(65% 0 15% 0);
              transform: translate(3px, -3px);
            }
            20% {
              clip-path: inset(45% 0 40% 0);
              transform: translate(-3px, 3px);
            }
            40% {
              clip-path: inset(14% 0 80% 0);
              transform: translate(3px, -3px);
            }
            60% {
              clip-path: inset(80% 0 5% 0);
              transform: translate(-3px, 3px);
            }
            80% {
              clip-path: inset(12% 0 70% 0);
              transform: translate(3px, -3px);
            }
            100% {
              clip-path: inset(26% 0 60% 0);
              transform: translate(0);
            }
          }

          .glitch-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `}}),l.jsx("div",{className:`glitch-wrapper ${a?"active":""}`,children:l.jsx("div",{className:"glitch-content",children:e})})]})}function h({children:e,enabled:t=!0}){let[a,i]=(0,s.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes blur-pulse {
            0% {
              filter: blur(0px);
            }
            50% {
              filter: blur(12px);
            }
            100% {
              filter: blur(0px);
            }
          }

          @keyframes blur-focus {
            0% {
              filter: blur(0px) brightness(100%);
            }
            25% {
              filter: blur(8px) brightness(80%);
            }
            50% {
              filter: blur(16px) brightness(60%);
            }
            75% {
              filter: blur(8px) brightness(80%);
            }
            100% {
              filter: blur(0px) brightness(100%);
            }
          }

          .blur-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .blur-wrapper.active .blur-content {
            animation: blur-focus 1s ease-in-out;
          }

          .blur-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `}}),l.jsx("div",{className:`blur-wrapper ${a?"active":""}`,children:l.jsx("div",{className:"blur-content",children:e})})]})}function f({children:e,enabled:t=!0}){let[a,i]=(0,s.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes chromatic-split {
            0% {
              filter: contrast(100%) saturate(100%);
            }
            20% {
              filter: contrast(130%) saturate(180%);
            }
            40% {
              filter: contrast(110%) saturate(150%);
            }
            60% {
              filter: contrast(140%) saturate(200%);
            }
            80% {
              filter: contrast(120%) saturate(160%);
            }
            100% {
              filter: contrast(100%) saturate(100%);
            }
          }

          .chromatic-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .chromatic-wrapper::before,
          .chromatic-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
            mix-blend-mode: screen;
          }

          .chromatic-wrapper.active::before {
            opacity: 0.6;
            background: linear-gradient(90deg, rgba(255, 0, 0, 0.5) 0%, transparent 50%, rgba(0, 0, 255, 0.5) 100%);
            animation: chromatic-shift-1 0.7s ease-in-out;
          }

          .chromatic-wrapper.active::after {
            opacity: 0.6;
            background: linear-gradient(180deg, rgba(0, 255, 0, 0.5) 0%, transparent 50%, rgba(255, 0, 255, 0.5) 100%);
            animation: chromatic-shift-2 0.7s ease-in-out;
          }

          @keyframes chromatic-shift-1 {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(-4px, 0);
            }
            50% {
              transform: translate(4px, 0);
            }
            75% {
              transform: translate(-2px, 0);
            }
            100% {
              transform: translate(0, 0);
            }
          }

          @keyframes chromatic-shift-2 {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(0, -4px);
            }
            50% {
              transform: translate(0, 4px);
            }
            75% {
              transform: translate(0, -2px);
            }
            100% {
              transform: translate(0, 0);
            }
          }

          .chromatic-wrapper.active .chromatic-content {
            animation: chromatic-split 0.7s ease-in-out;
          }

          .chromatic-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `}}),l.jsx("div",{className:`chromatic-wrapper ${a?"active":""}`,children:l.jsx("div",{className:"chromatic-content",children:e})})]})}function g({children:e,enabled:t=!0}){let[a,i]=(0,s.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes shake-violent {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-8px, 2px) rotate(-2deg); }
            20% { transform: translate(8px, -3px) rotate(2deg); }
            30% { transform: translate(-6px, 4px) rotate(-1deg); }
            40% { transform: translate(7px, -2px) rotate(1deg); }
            50% { transform: translate(-9px, 3px) rotate(-2deg); }
            60% { transform: translate(6px, -4px) rotate(2deg); }
            70% { transform: translate(-7px, 2px) rotate(-1deg); }
            80% { transform: translate(5px, -3px) rotate(1deg); }
            90% { transform: translate(-4px, 4px) rotate(-1deg); }
          }

          @keyframes shake-intensity {
            0%, 100% { 
              transform: translate(0, 0) rotate(0deg) scale(1);
              filter: blur(0px);
            }
            10% { 
              transform: translate(-6px, 3px) rotate(-1.5deg) scale(1.02);
              filter: blur(1px);
            }
            20% { 
              transform: translate(7px, -4px) rotate(1.5deg) scale(0.98);
              filter: blur(2px);
            }
            30% { 
              transform: translate(-5px, 2px) rotate(-1deg) scale(1.01);
              filter: blur(1px);
            }
            40% { 
              transform: translate(6px, -3px) rotate(1deg) scale(0.99);
              filter: blur(1.5px);
            }
            50% { 
              transform: translate(-7px, 4px) rotate(-1.5deg) scale(1.02);
              filter: blur(2px);
            }
            60% { 
              transform: translate(5px, -2px) rotate(1.5deg) scale(0.98);
              filter: blur(1px);
            }
            70% { 
              transform: translate(-6px, 3px) rotate(-1deg) scale(1.01);
              filter: blur(1.5px);
            }
            80% { 
              transform: translate(4px, -3px) rotate(1deg) scale(0.99);
              filter: blur(1px);
            }
            90% { 
              transform: translate(-3px, 2px) rotate(-0.5deg) scale(1.01);
              filter: blur(0.5px);
            }
          }

          .shake-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .shake-wrapper.active .shake-content {
            animation: shake-intensity 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
          }

          .shake-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `}}),l.jsx("div",{className:`shake-wrapper ${a?"active":""}`,children:l.jsx("div",{className:"shake-content",children:e})})]})}function u({children:e,enabled:t=!0}){let[a,i]=(0,s.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes distort-wave {
            0% {
              transform: scaleX(1) scaleY(1) skewX(0deg) skewY(0deg);
              filter: hue-rotate(0deg);
            }
            20% {
              transform: scaleX(1.15) scaleY(0.85) skewX(5deg) skewY(2deg);
              filter: hue-rotate(30deg);
            }
            40% {
              transform: scaleX(0.85) scaleY(1.15) skewX(-5deg) skewY(-2deg);
              filter: hue-rotate(-30deg);
            }
            60% {
              transform: scaleX(1.1) scaleY(0.9) skewX(3deg) skewY(3deg);
              filter: hue-rotate(45deg);
            }
            80% {
              transform: scaleX(0.9) scaleY(1.1) skewX(-3deg) skewY(-3deg);
              filter: hue-rotate(-45deg);
            }
            100% {
              transform: scaleX(1) scaleY(1) skewX(0deg) skewY(0deg);
              filter: hue-rotate(0deg);
            }
          }

          @keyframes distort-ripple {
            0% {
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            }
            10% {
              clip-path: polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%);
            }
            20% {
              clip-path: polygon(5% 0%, 95% 5%, 100% 100%, 0% 95%);
            }
            30% {
              clip-path: polygon(0% 10%, 100% 5%, 95% 95%, 5% 100%);
            }
            40% {
              clip-path: polygon(10% 0%, 100% 10%, 90% 100%, 0% 90%);
            }
            50% {
              clip-path: polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%);
            }
            60% {
              clip-path: polygon(5% 10%, 100% 5%, 95% 90%, 0% 95%);
            }
            70% {
              clip-path: polygon(0% 5%, 90% 10%, 100% 95%, 10% 100%);
            }
            80% {
              clip-path: polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%);
            }
            90% {
              clip-path: polygon(0% 2%, 98% 0%, 100% 98%, 2% 100%);
            }
            100% {
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            }
          }

          .distort-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .distort-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
            background: linear-gradient(45deg, rgba(255, 0, 150, 0.3), rgba(0, 255, 255, 0.3));
            mix-blend-mode: overlay;
          }

          .distort-wrapper.active::before {
            opacity: 1;
            animation: distort-ripple 0.9s ease-in-out;
          }

          .distort-wrapper.active .distort-content {
            animation: distort-wave 0.9s ease-in-out;
          }

          .distort-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `}}),l.jsx("div",{className:`distort-wrapper ${a?"active":""}`,children:l.jsx("div",{className:"distort-content",children:e})})]})}function b({children:e,glitchEnabled:t=!1,blurEnabled:a=!1,chromaticEnabled:s=!1,shakeEnabled:i=!1,distortEnabled:r=!1}){let n=e;return t&&(n=l.jsx(m,{enabled:!0,children:n})),a&&(n=l.jsx(h,{enabled:!0,children:n})),s&&(n=l.jsx(f,{enabled:!0,children:n})),i&&(n=l.jsx(g,{enabled:!0,children:n})),r&&(n=l.jsx(u,{enabled:!0,children:n})),l.jsx(l.Fragment,{children:n})}function v({image1:e,image2:t,image1Fit:a,image2Fit:s,efx:i}){let r=i||{},n=!!e,o=!!t,c=n&&!o,p=!n&&o;return(0,l.jsxs)(l.Fragment,{children:[(n||!o)&&l.jsx(x,{layer:1,children:l.jsx("div",{className:"absolute",style:{left:"772px",top:c?"138px":"139px",width:c?"660px":"322.5px",height:c?"691px":"428.147px",overflow:"hidden",borderRadius:"3px"},"data-name":"Male Designer 1",children:l.jsx(b,{glitchEnabled:!!r.glitch,blurEnabled:!!r.blur,chromaticEnabled:!!r.chromatic,shakeEnabled:!!r.shake,distortEnabled:!!r.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx(d,{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]",style:{objectFit:a||"cover"},src:e||"/__placeholder__.png"})})})})}),(o||!n)&&l.jsx(x,{layer:2,children:l.jsx("div",{className:"absolute",style:{left:p?"772px":"1109.5px",top:p?"138px":"283px",width:p?"660px":"322.5px",height:p?"691px":"428.147px"},"data-name":"Female Designer 1",children:l.jsx(b,{glitchEnabled:!!r.glitch,blurEnabled:!!r.blur,chromaticEnabled:!!r.chromatic,shakeEnabled:!!r.shake,distortEnabled:!!r.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx(d,{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]",style:{objectFit:s||"cover"},src:t||"/__placeholder__.png"})})})})})]})}function y({topLabel:e,introParagraph:t,paragraphHeaders:a,bodyCopies:s,image1:i,image2:r,image1Fit:n,image2Fit:o,isAnimating:c,fontFamily:d,topLabelFontSize:x,topLabelFontWeight:m,textPrimary:h,efx:f}){let g=t||"";if(e&&g){let t=e.trim().toUpperCase();if(g.replace(/<[^>]*>/g,"").trim().toUpperCase().startsWith(t)){let t=RegExp(`^(<[^>]*>)*${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(<[^>]*>)*`,"i");g=g.replace(t,"").trim()}}let u=e=>e.replace(/<a\b([^>]*?)>/gi,(e,t)=>{let a=t,l=(a=/target\s*=/i.test(a)?a.replace(/target\s*=\s*(['"])(.*?)\1/i,'target="_blank"'):`${a} target="_blank"`).match(/rel\s*=\s*(['"])(.*?)\1/i);if(l){let e=l[2].split(/\s+/).filter(Boolean);e.some(e=>"noopener"===e.toLowerCase())||e.push("noopener"),e.some(e=>"noreferrer"===e.toLowerCase())||e.push("noreferrer");let t=e.join(" ");a=a.replace(l[0],`rel="${t}"`)}else a=`${a} rel="noopener noreferrer"`;return`<a${a}>`}),b=s?.filter(e=>!e.afterHeaderId||!a||0===a.length||!a.some(t=>t.id===e.afterHeaderId))||[];return(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"bg-[#1a1a1a] absolute inset-0","data-name":"Content – Style 1 Background"}),e&&l.jsx("div",{className:"absolute left-[80px] top-[80px]",style:{maxWidth:"600px",overflow:"hidden"},children:l.jsx("div",{className:"leading-[normal] not-italic relative",style:{fontFamily:d+",sans-serif",fontWeight:m||"700",fontSize:x||"11px",color:h||"#f1f0eb",letterSpacing:"1.65px",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:e})}),l.jsx(p,{layer:1,children:l.jsx("div",{className:"absolute left-[80px] top-[138px] w-[661px]",children:l.jsx("div",{className:"flex flex-col gap-[35px] text-[#f1f0eb] not-italic whitespace-pre-wrap",children:l.jsx("div",{className:"font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] text-[24px]",dangerouslySetInnerHTML:{__html:g}})})})}),l.jsx(p,{layer:2,children:l.jsx("div",{className:"absolute left-[80px] top-[138px] w-[661px]",children:(0,l.jsxs)("div",{className:"flex flex-col gap-[35px] text-[#f1f0eb] not-italic whitespace-pre-wrap",children:[l.jsx("div",{className:"font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] text-[24px]",style:{opacity:0,pointerEvents:"none"},children:t||""}),l.jsx("div",{className:"font-['Inter:Regular',sans-serif] font-normal w-[661px]",children:b.map(e=>l.jsx("div",{children:e.text&&(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"leading-[normal] mb-0 text-[18px]",style:{lineHeight:"25px"},dangerouslySetInnerHTML:{__html:u(e.text)}}),l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",children:"\xa0"})]})},e.id))})]})})}),l.jsx(p,{layer:3,children:l.jsx("div",{className:"absolute left-[80px] top-[138px] w-[661px]",children:(0,l.jsxs)("div",{className:"flex flex-col gap-[35px] text-[#f1f0eb] not-italic whitespace-pre-wrap",children:[l.jsx("div",{style:{opacity:0,pointerEvents:"none"},children:l.jsx("div",{className:"font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] text-[24px]",children:t||""})}),(0,l.jsxs)("div",{className:"font-['Inter:Regular',sans-serif] font-normal w-[661px]",children:[b.map(e=>l.jsx("div",{children:e.text&&(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"leading-[normal] mb-0 text-[18px] rich-preview-content",style:{lineHeight:"25px",opacity:0,pointerEvents:"none"},dangerouslySetInnerHTML:{__html:u(e.text)}}),l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",style:{opacity:0,pointerEvents:"none"},children:"\xa0"})]})},e.id)),a?.map((e,t)=>{let a=s?.find(t=>t.afterHeaderId===e.id),i=!!e.text,r=!!a?.text;return l.jsx("div",{children:(i||r)&&l.jsxs(l.Fragment,{children:[l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",style:{lineHeight:"25px"},children:"\xa0"}),i&&l.jsx("h3",{className:"font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[22px]",children:e.text}),r&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"leading-[normal] mb-0 text-[18px] rich-preview-content",style:{lineHeight:"25px"},dangerouslySetInnerHTML:{__html:u(a.text)}}),l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",style:{height:"18px"},children:"\xa0"})]})]})},e.id)})]})]})})}),l.jsx(v,{image1:i,image2:r,image1Fit:n,image2Fit:o,efx:f}),l.jsx("style",{children:`
        .rich-preview-content a {
          color: #11ff49;
          text-decoration: underline;
          cursor: pointer;
        }
        .rich-preview-content a:hover {
          opacity: 0.8;
        }
      `})]})}function j({text:e,isAnimating:t,fontFamily:a,fontSize:i,fontWeight:r,color:n,lineHeight:o,letterSpacing:c}){let[d,p]=(0,s.useState)((e||"").split("")),[x,m]=(0,s.useState)(-1),[h,f]=(0,s.useState)(new Set);return(0,l.jsxs)("span",{style:{display:"inline",lineHeight:o||"normal"},children:[(()=>{let e=[],t=[];return d.forEach((s,o)=>{if(" "===s)t.length>0&&(e.push(l.jsx("span",{style:{display:"inline-block",whiteSpace:"nowrap"},children:t},`word-${o}`)),t=[]),e.push(l.jsx("span",{style:{display:"inline-block",width:"0.3em",marginRight:c},children:"\xa0"},`space-${o}`));else if("\n"===s)t.length>0&&(e.push(l.jsx("span",{style:{display:"inline-block",whiteSpace:"nowrap"},children:t},`word-${o}`)),t=[]),e.push(l.jsx("br",{},`br-${o}`));else{let e=0,d="none";x===o?(d="flipBoardVerticalFadeIn 0.2s ease-out forwards",e=1):h.has(o)&&(e=1),t.push((0,l.jsxs)("span",{style:{display:"inline-block",position:"relative",textAlign:"center",marginRight:c},children:[l.jsx("span",{style:{display:"inline-block",fontFamily:a+",sans-serif",fontSize:i,fontWeight:r,color:n,width:"100%",textAlign:"center",position:"absolute",left:0,top:0,zIndex:0,transform:"scaleY(1.5)",opacity:x===o?.4:0,filter:"blur(3px) drop-shadow(0 0 15px currentColor)",mixBlendMode:"screen",transition:"opacity 0.3s ease-out"},children:s}),l.jsx("span",{style:{display:"inline-block",fontFamily:a+",sans-serif",fontSize:i,fontWeight:r,color:n,transformStyle:"preserve-3d",perspective:"1000px",animation:"none"!==d?"flipBoardTrail 0.32s ease-out 0.5s forwards":"none",opacity:0,width:"100%",textAlign:"center",position:"absolute",left:0,top:0,zIndex:0,filter:"blur(4px) drop-shadow(0 0 20px currentColor) brightness(2)",mixBlendMode:"screen"},children:s}),l.jsx("span",{style:{display:"inline-block",fontFamily:a+",sans-serif",fontSize:i,fontWeight:r,color:n,transformStyle:"preserve-3d",perspective:"1000px",animation:d,opacity:e,textAlign:"center",position:"relative",zIndex:1},children:s})]},`container-${o}`))}}),t.length>0&&e.push(l.jsx("span",{style:{display:"inline-block",whiteSpace:"nowrap"},children:t},"word-final")),e})(),l.jsx("style",{children:`
        @keyframes flipBoardVerticalFadeIn {
          0% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
          10% {
            transform: rotateX(-90deg);
            opacity: 0.2;
          }
          30% {
            transform: rotateX(-60deg);
            opacity: 0.5;
          }
          50% {
            transform: rotateX(-30deg);
            opacity: 0.7;
          }
          70% {
            transform: rotateX(-10deg);
            opacity: 0.85;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes flipBoardTrail {
          0% {
            transform: rotateX(-90deg) scale(1.5, 2.5);
            opacity: 0;
            filter: blur(8px) drop-shadow(0 0 35px currentColor) brightness(3);
          }
          10% {
            transform: rotateX(-70deg) scale(1.4, 2.2);
            opacity: 0.7;
            filter: blur(7px) drop-shadow(0 0 32px currentColor) brightness(2.8);
          }
          30% {
            transform: rotateX(-40deg) scale(1.3, 2.0);
            opacity: 0.85;
            filter: blur(6px) drop-shadow(0 0 30px currentColor) brightness(2.5);
          }
          50% {
            transform: rotateX(0deg) scale(1.2, 1.8);
            opacity: 0.9;
            filter: blur(5px) drop-shadow(0 0 28px currentColor) brightness(2.2);
          }
          70% {
            transform: rotateX(10deg) scale(1.15, 1.5);
            opacity: 0.75;
            filter: blur(4px) drop-shadow(0 0 24px currentColor) brightness(1.8);
          }
          85% {
            transform: rotateX(5deg) scale(1.1, 1.3);
            opacity: 0.5;
            filter: blur(3px) drop-shadow(0 0 18px currentColor) brightness(1.4);
          }
          100% {
            transform: rotateX(0deg) scale(1, 1);
            opacity: 0;
            filter: blur(0px) drop-shadow(0 0 0px currentColor) brightness(1);
          }
        }
      `})]})}function w({paragraphHeaders:e,bodyCopies:t,topLabel:a}){let s=t?.[0]?.text||"",i=e=>e.replace(/style="[^"]*"/gi,""),r=i(s);if(a&&s){let e=a.trim().toUpperCase();if(s.replace(/<[^>]*>/g,"").trim().toUpperCase().startsWith(e)){let e=RegExp(`^(<[^>]*>)*${a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(<[^>]*>)*`,"i");r=i(s.replace(e,"").trim())}}let n=!!r&&!t?.[0]?.afterHeaderId;return l.jsx("div",{className:"absolute left-[80px] top-[138px] w-[661px] h-[635px]",style:{zIndex:20},children:(0,l.jsxs)("div",{className:"font-['Inter',sans-serif] font-normal leading-[normal] text-[#f1f0eb] w-[661px] whitespace-pre-wrap rich-preview-content",children:[n&&(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"leading-[normal] mb-0 text-[18px]",style:{lineHeight:"25px"},dangerouslySetInnerHTML:{__html:r}}),l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",children:"\xa0"})]}),e?.map(e=>{let a=t?.find(t=>t.afterHeaderId===e.id),s=i(a?.text||""),r=!!e.text,n=!!a?.text;return l.jsx("div",{children:(r||n)&&l.jsxs(l.Fragment,{children:[l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",style:{lineHeight:"25px"},children:"\xa0"}),r&&l.jsx("h3",{className:"font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[22px]",children:e.text}),n&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"mb-0 text-[18px]",style:{lineHeight:"25px"},dangerouslySetInnerHTML:{__html:s}}),l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",children:"\xa0"})]})]})},e.id)})]})})}function N({image:e,imageFit:t,efx:a}){let s=a||{};return e?l.jsx("div",{className:"grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0",children:l.jsx("div",{className:"col-1 h-[250px] ml-0 mt-0 relative row-1 w-[250px] overflow-hidden rounded-[8px]",style:{zIndex:5,pointerEvents:"none"},children:l.jsx(b,{glitchEnabled:!!s.glitch,blurEnabled:!!s.blur,chromaticEnabled:!!s.chromatic,shakeEnabled:!!s.shake,distortEnabled:!!s.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx("img",{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]",style:{objectFit:t||"cover"},src:e})})})})}):null}function k({image:e,imageFit:t,efx:a}){let s=a||{};return e?l.jsx("div",{className:"grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0",children:l.jsx("div",{className:"col-1 h-[250px] ml-0 mt-0 relative row-1 w-[250px] overflow-hidden rounded-[8px]",style:{zIndex:5,pointerEvents:"none"},children:l.jsx(b,{glitchEnabled:!!s.glitch,blurEnabled:!!s.blur,chromaticEnabled:!!s.chromatic,shakeEnabled:!!s.shake,distortEnabled:!!s.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx("img",{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]",style:{objectFit:t||"cover"},src:e})})})})}):null}function I({image1:e,image2:t,image1Fit:a,image2Fit:s,efx:i}){return(0,l.jsxs)(l.Fragment,{children:[e&&l.jsx(x,{layer:1,children:l.jsx("div",{className:"absolute left-[836px] top-[285.914px] w-[250px] h-[250px]",children:l.jsx(N,{image:e,imageFit:a,efx:i})})}),t&&l.jsx(x,{layer:2,children:l.jsx("div",{className:"absolute left-[1116px] top-[285.914px] w-[250px] h-[250px]",children:l.jsx(k,{image:t,imageFit:s,efx:i})})})]})}function C({topLabel:e,paragraphHeaders:t,bodyCopies:a,image1:i,image2:r,image1Fit:n,image2Fit:o,isAnimating:c,fontFamily:d,topLabelFontSize:x,topLabelFontWeight:m,textPrimary:h,efx:f}){let[g,u]=(0,s.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"bg-[#1a1a1a] absolute inset-0","data-name":"Content – Style 2 Background - V4"}),e&&l.jsx("div",{className:"absolute left-[80px] top-[80px]",style:{maxWidth:"600px",overflow:"hidden"},children:l.jsx("div",{className:"leading-[normal] not-italic relative",style:{fontFamily:d+",sans-serif",fontWeight:m||"700",fontSize:x||"11px",color:h||"#f1f0eb",letterSpacing:"1.65px",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:l.jsx(j,{text:e,isAnimating:g,fontFamily:d||"Inter",fontSize:x||"11px",fontWeight:m||"700",color:h||"#f1f0eb",lineHeight:"normal"})})}),l.jsx(p,{children:l.jsx(w,{paragraphHeaders:t,bodyCopies:a,topLabel:e})}),l.jsx(I,{image1:i,image2:r,image1Fit:n,image2Fit:o,efx:f}),l.jsx("style",{children:`
        .rich-preview-content a {
          color: #11ff49;
          text-decoration: underline;
          cursor: pointer;
        }
        .rich-preview-content a:hover {
          opacity: 0.8;
        }
      `})]})}function A({topLabel:e,paragraphHeaders:t,bodyCopies:a,image1:s,image2:i,image1Fit:r,image2Fit:n,isAnimating:o,fontFamily:c,topLabelFontSize:d,topLabelFontWeight:p,textPrimary:x,efx:m}){let h=a?.[0]?.text||"",f=!1,g=e=>e.replace(/style="([^"]*)"/gi,(e,t)=>{let a=t.match(/color\s*:\s*([^;]+)\s*;?/i),l=t.match(/font-size\s*:\s*([^;]+)\s*;?/i);if(!a&&!l)return"";let s=[a?`color: ${a[1].trim()};`:"",l?`font-size: ${l[1].trim()};`:""].filter(Boolean).join(" ");return`style="${s}"`}),u=e=>e.replace(/<a\b([^>]*?)>/gi,(e,t)=>{let a=t,l=(a=/target\s*=/i.test(a)?a.replace(/target\s*=\s*(['"])(.*?)\1/i,'target="_blank"'):`${a} target="_blank"`).match(/rel\s*=\s*(['"])(.*?)\1/i);if(l){let e=l[2].split(/\s+/).filter(Boolean);e.some(e=>"noopener"===e.toLowerCase())||e.push("noopener"),e.some(e=>"noreferrer"===e.toLowerCase())||e.push("noreferrer");let t=e.join(" ");a=a.replace(l[0],`rel="${t}"`)}else a=`${a} rel="noopener noreferrer"`;return`<a${a}>`}),v=g(h);if(e&&h){let t=e.trim();h.replace(/<[^>]+>/g,"").trim().toUpperCase().startsWith(t.toUpperCase())&&(f=!0)}let y=!!v&&!a?.[0]?.afterHeaderId,j=y&&!f||!!a?.some((e,a)=>{let l=!!t?.some(t=>t.id===e.afterHeaderId);return 0!==a&&(!e.afterHeaderId||!l)});return(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"bg-[#1a1a1a] absolute inset-0","data-name":"Content – Style 3 Background"}),e&&l.jsx("div",{className:"absolute left-[80px] top-[80px]",style:{maxWidth:"600px",overflow:"visible",zIndex:30},children:l.jsx("div",{style:{backgroundColor:"#1A1A1A",padding:"8px 12px",display:"inline-block"},children:l.jsx("div",{className:"leading-[normal] not-italic relative",style:{fontFamily:c+",sans-serif",fontWeight:p||"700",fontSize:d||"11px",color:x||"#f1f0eb",letterSpacing:"1.65px",textTransform:"uppercase",whiteSpace:"nowrap"},children:e})})}),(0,l.jsxs)("div",{className:"absolute left-[80px] top-[138px] w-[661px]",style:{zIndex:20},children:[y&&!f&&l.jsx("div",{className:"text-[18px] leading-[25px] text-[#f1f0eb] mb-[35px] whitespace-pre-wrap",dangerouslySetInnerHTML:{__html:u(v)}}),t?.map((e,t)=>{let s=a?.find(t=>t.afterHeaderId===e.id),i=!!e.text,r=!!s?.text,n=i&&(t>0||j);return l.jsx("div",{className:"mb-[35px]",children:(i||r)&&l.jsxs(l.Fragment,{children:[n&&l.jsxs(l.Fragment,{children:[l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",style:{lineHeight:"25px"},children:"\xa0"}),l.jsx("p",{className:"leading-[normal] mb-0 text-[18px]",style:{lineHeight:"25px"},children:"\xa0"})]}),i&&l.jsx("h3",{className:"text-[22px] leading-[32px] font-semibold text-[#11ff49] mb-[4px] font-['Inter']","data-updated":"true",children:e.text}),r&&l.jsx("div",{className:"text-[18px] leading-[25px] text-[#f1f0eb] whitespace-pre-wrap",dangerouslySetInnerHTML:{__html:u(g(s.text))}})]})},e.id)})]}),s&&l.jsx("div",{className:"absolute left-[80px] top-[261px] w-[322.5px] h-[428.147px]",style:{zIndex:5},children:l.jsx(b,{glitchEnabled:!!m?.glitch,blurEnabled:!!m?.blur,chromaticEnabled:!!m?.chromatic,shakeEnabled:!!m?.shake,distortEnabled:!!m?.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx("img",{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]",style:{objectFit:r||"cover"},src:s})})})}),i&&l.jsx("div",{className:"absolute left-[calc(50%+16px)] top-[80px] w-[660px] h-[691px]",style:{overflow:"hidden",borderRadius:"3px",zIndex:5},children:l.jsx(b,{glitchEnabled:!!m?.glitch,blurEnabled:!!m?.blur,chromaticEnabled:!!m?.chromatic,shakeEnabled:!!m?.shake,distortEnabled:!!m?.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx("img",{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]",style:{objectFit:n||"cover"},src:i})})})})]})}function F({topLabel:e,image1:t,image2:a,image1Fit:s="cover",image2Fit:i="cover",caption1Title:r="ARTWORK TITLE",caption1Subtitle:n="Brief description",caption2Title:o="ARTWORK TITLE",caption2Subtitle:c="Brief description",showCaption1:m=!0,showCaption2:h=!0,isAnimating:f,fontFamily:g,topLabelFontSize:u,topLabelFontWeight:v,textPrimary:y,efx:j}){return(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"bg-[#1a1a1a] absolute inset-0","data-name":"Content – Style 4 Background"}),e&&l.jsx("div",{className:"absolute left-[80px] top-[80px]",style:{maxWidth:"600px",overflow:"hidden"},children:l.jsx("div",{className:"leading-[normal] not-italic relative",style:{fontFamily:g+",sans-serif",fontWeight:v||"700",fontSize:u||"11px",color:y||"#f1f0eb",letterSpacing:"1.65px",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:e})}),l.jsx(x,{layer:1,children:l.jsx("div",{className:"absolute left-[80px] top-[211px] w-[660px] h-[429px]",style:{overflow:"hidden",borderRadius:"3px"},"data-name":"Left Image",children:l.jsx(b,{glitchEnabled:!!j?.glitch,blurEnabled:!!j?.blur,chromaticEnabled:!!j?.chromatic,shakeEnabled:!!j?.shake,distortEnabled:!!j?.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx(d,{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full",style:{objectFit:s},src:t||"/__placeholder__.png"})})})})}),m&&l.jsx(p,{layer:1,children:(0,l.jsxs)("div",{className:"absolute left-[80px] top-[650px] w-[660px]",children:[l.jsx("div",{className:"font-['Inter'] font-bold text-[14px] text-[#f1f0eb]",children:r}),l.jsx("div",{className:"font-['Inter'] font-normal text-[14px] text-[#9e9e9d]",children:n})]})}),l.jsx(x,{layer:2,children:l.jsx("div",{className:"absolute top-[211px] w-[660px] h-[429px]",style:{left:"772px",overflow:"hidden",borderRadius:"3px"},"data-name":"Right Image",children:l.jsx(b,{glitchEnabled:!!j?.glitch,blurEnabled:!!j?.blur,chromaticEnabled:!!j?.chromatic,shakeEnabled:!!j?.shake,distortEnabled:!!j?.distort,children:l.jsx("div",{className:"relative w-full h-full",children:l.jsx(d,{alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full",style:{objectFit:i},src:a||"/__placeholder__.png"})})})})}),h&&l.jsx(p,{layer:2,children:(0,l.jsxs)("div",{className:"absolute top-[650px] w-[660px]",style:{left:"772px"},children:[l.jsx("div",{className:"font-['Inter'] font-bold text-[14px] text-[#f1f0eb]",children:o}),l.jsx("div",{className:"font-['Inter'] font-normal text-[14px] text-[#9e9e9d]",children:c})]})})]})}function S({title:e,topLabel:t,coverImage:a,imageFit:i="cover",author:c,headline:d,description:p,iconCount1:x,iconCount2:m,textPrimary:h="#f1f0eb",textAccent:f="#11ff49",fontFamily:g="Inter",efx:u}){let[v,y]=(0,s.useState)(null),[w,N]=(0,s.useState)(null),[k,I]=(0,s.useState)(0),[C,A]=(0,s.useState)(!1);return r()?l.jsx("div",{className:"w-full h-full flex flex-col p-4 bg-[#1a1a1a] text-white",children:l.jsx("div",{children:"Mobile view not fully implemented in standalone component copy"})}):(0,l.jsxs)("div",{className:"w-full h-full relative",style:{backgroundColor:"#1a1a1a"},children:[(0,l.jsxs)("div",{className:a?"":"flex flex-col px-[80px] pt-[80px]",children:[l.jsx("div",{className:`content-stretch flex items-start py-[10px] ${a?"absolute h-[280px] max-h-[280px] left-[80px] top-[80px] w-[600px] max-w-[600px]":"w-[80%] mb-[80px]"}`,children:l.jsx("div",{className:"flex-[1_0_0] min-h-px min-w-px not-italic relative whitespace-pre-wrap leading-[normal]",style:{fontFamily:`'${g}',sans-serif`,fontWeight:"300",fontSize:"60px",color:h},children:l.jsx(j,{text:e.replace(/\\n/g,"\n"),isAnimating:C,fontFamily:g,fontSize:"60px",fontWeight:"300",color:h,lineHeight:"normal"})})}),(0,l.jsxs)("div",{className:`content-stretch flex flex-col gap-[40px] items-start ${a?"absolute h-[370px] max-h-[370px] justify-end left-[80px] top-[401px] w-[600px] max-w-[600px]":"w-[80%] justify-start"}`,children:[l.jsx("p",{className:"h-[18px] leading-[normal] not-italic relative shrink-0 w-full whitespace-pre-wrap",style:{fontFamily:`'${g}',sans-serif`,fontWeight:"400",fontSize:"14px",color:h},children:c}),l.jsx("div",{className:"leading-[normal] not-italic relative shrink-0 w-full",style:{fontFamily:`'${g}',sans-serif`,fontWeight:"400",fontSize:"0px",color:h},children:(0,l.jsxs)("div",{className:"whitespace-pre-wrap",children:[d&&l.jsx("p",{className:"mb-[25px]",style:{fontSize:"23px",fontWeight:"500",color:f,lineHeight:"normal"},children:d}),l.jsx("p",{className:"mb-0",style:{fontSize:"19px",fontWeight:"300",lineHeight:"25px",color:h,marginBottom:"50px"},children:p})]})}),(0,l.jsxs)("div",{className:"flex items-center gap-[20px]",style:{color:h,pointerEvents:"auto"},children:[(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[6px]",onMouseEnter:()=>y("heart"),onMouseLeave:()=>{y(null),N(null)},onMouseDown:()=>N("heart"),onMouseUp:()=>N(null),children:[l.jsx(n.Z,{size:30,strokeWidth:1.5,color:"heart"===v||"heart"===w?f:h,fill:"heart"===w?f:"none"}),l.jsx("div",{style:{fontSize:"14px",color:h},children:x})]}),(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[6px]",style:{marginLeft:"20px"},onMouseEnter:()=>y("plane"),onMouseLeave:()=>{y(null),N(null)},onMouseDown:()=>N("plane"),onMouseUp:()=>N(null),children:[l.jsx(o.Z,{size:30,strokeWidth:1.5,color:"plane"===v||"plane"===w?f:h,fill:"plane"===w?f:"none"}),l.jsx("div",{style:{fontSize:"14px",color:h},children:m})]})]})]})]}),a&&l.jsx("div",{className:"absolute left-[calc(50%+16px)] top-[80px] w-[660px] h-[691px] overflow-hidden rounded-[8px]",children:l.jsx(b,{glitchEnabled:!!u?.glitch,blurEnabled:!!u?.blur,chromaticEnabled:!!u?.chromatic,shakeEnabled:!!u?.shake,distortEnabled:!!u?.distort,children:l.jsx("img",{src:"string"==typeof a?a.replace(/^\/src\/assets\//,"/assets/").replace(/^https?:\/\/(?:localhost|127\.0\.0\.1):3001\//,"/"):a,alt:"",className:"w-full h-full",style:{objectFit:i},onError:e=>{e.currentTarget.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="}})})})]})}let L=[{id:1,name:"Guitar",creator:"Gibson Guitars",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"},{id:2,name:"Drums",creator:"Pearl Drums",image:"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop"},{id:3,name:"Microphone",creator:"Shure Audio",image:"https://images.unsplash.com/photo-1572584642822-6f8de0243c93?w=400&h=400&fit=crop"},{id:4,name:"Keyboard",creator:"Roland Music",image:"https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=400&h=400&fit=crop"},{id:5,name:"Headphones",creator:"Audio-Technica",image:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop"},{id:6,name:"Amplifier",creator:"Fender",image:"https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop"},{id:7,name:"Turntable",creator:"Technics",image:"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop"},{id:8,name:"Speaker",creator:"JBL Audio",image:"https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop"}];function E({products:e,onEdit:t}){let[a,i]=(0,s.useState)(!1);return(0,l.jsxs)("div",{className:"w-full bg-[#1A1A1A] text-white flex flex-col items-center overflow-hidden font-sans select-none relative",children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:`
        :root {
          --card-w: 280px;
          --overlap: 60px;
          --z-depth: 120px;
        }

        @media (max-width: 640px) {
          :root {
            --card-w: 200px;
            --overlap: 40px;
            --z-depth: 80px;
          }
        }

        @property --is-focused {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }

        .scroll-container {
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          perspective: 2000px;
          perspective-origin: center;
          -webkit-overflow-scrolling: touch;
          padding-inline: calc(50vw - (var(--card-w) / 2));
        }
        
        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .card-wrapper {
          flex: 0 0 var(--card-w);
          scroll-snap-align: center;
          scroll-snap-stop: always;
          view-timeline: --item-visible inline;
        }

        .product-card {
          animation: flow linear both, center-detect linear both;
          animation-timeline: --item-visible;
          animation-range: cover 20% cover 80%;
          transform-style: preserve-3d;
          will-change: transform, filter, opacity;
          transition: box-shadow 0.2s ease;
        }
        
        @keyframes flow {
          0% { 
            transform: scale(0.8) rotateY(-45deg) translateX(var(--overlap)); 
            opacity: 0.4;
            filter: brightness(0.4) blur(1px);
            z-index: 1;
          }
          40% { border-color: #F1F0EB; }
          45%, 55% { 
            transform: scale(1.15) rotateY(0deg) translateZ(var(--z-depth)) translateX(0); 
            opacity: 1;
            filter: brightness(1) blur(0px);
            z-index: 100;
            border-color: #F1F0EB;
          }
          60% { border-color: #F1F0EB; }
          100% { 
            transform: scale(0.8) rotateY(45deg) translateX(calc(var(--overlap) * -1)); 
            opacity: 0.4;
            filter: brightness(0.4) blur(1px);
            z-index: 1;
          }
        }

        @keyframes center-detect {
          0%, 44%, 56%, 100% { --is-focused: 0; }
          45%, 55% { --is-focused: 1; }
        }

        .is-pressed .product-card {
          border-color: color-mix(in srgb, #11FF49 calc(var(--is-focused) * 100%), #F1F0EB) !important;
          box-shadow: 0 0 calc(var(--is-focused) * 35px) rgba(17, 255, 73, 0.5), 0 20px 60px rgba(0,0,0,0.9);
          transition: none !important;
        }

        .product-label {
          animation: label-flow linear both;
          animation-timeline: --item-visible;
          animation-range: contain 40% contain 60%;
        }

        @keyframes label-flow {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }

        .reflection {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
        }
      `}}),l.jsx("div",{className:`scroll-container flex items-center w-full h-[350px] sm:h-[650px] overflow-x-auto gap-2 ${a?"is-pressed":""}`,children:L.map(e=>l.jsx("div",{className:"card-wrapper flex items-center justify-center relative",children:(0,l.jsxs)("div",{className:"product-card relative w-full aspect-square rounded-[3px] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden",children:[l.jsx("img",{src:e.image,alt:e.name,className:"absolute inset-0 w-full h-full object-cover"}),(0,l.jsxs)("div",{className:"absolute left-[18px] right-[18px] z-10 pointer-events-none",style:{bottom:"15px"},children:[l.jsx("p",{className:"font-['Inter:Regular',sans-serif] font-normal leading-normal not-italic text-[#f1f0eb]",style:{fontSize:"20px",textTransform:"uppercase",marginBottom:"0px"},children:e.name}),l.jsx("p",{className:"font-['Inter:Regular',sans-serif] font-normal leading-normal not-italic text-[#f1f0eb]",style:{fontSize:"15px"},children:e.creator})]}),l.jsx("div",{className:"reflection absolute top-[105%] left-0 right-0 h-[40%] opacity-20 pointer-events-none scale-y-[-1]",children:l.jsx("img",{src:e.image,alt:"",className:"w-full h-full object-cover"})})]})},e.id))}),l.jsx("div",{className:`absolute inset-0 pointer-events-none transition-opacity duration-150 ${a?"opacity-100":"opacity-0"}`,style:{background:"radial-gradient(circle at center, rgba(17,255,73,0.08) 0%, transparent 70%)"}})]})}var T=a(1890),z=a(9183);let H=[{id:"1",title:"The Evolution of Music Distribution",category:"INDUSTRY INSIGHTS",readTime:"8 min read",icon:(0,l.jsxs)("svg",{viewBox:"0 0 400 280",className:"w-full h-full",children:[l.jsx("rect",{width:"400",height:"280",fill:"#1a1a1a"}),l.jsx("circle",{cx:"200",cy:"140",r:"80",fill:"none",stroke:"#11ff49",strokeWidth:"3"}),l.jsx("circle",{cx:"200",cy:"140",r:"60",fill:"none",stroke:"#11ff49",strokeWidth:"2",opacity:"0.6"}),l.jsx("circle",{cx:"200",cy:"140",r:"40",fill:"none",stroke:"#11ff49",strokeWidth:"2",opacity:"0.4"}),l.jsx("path",{d:"M200 60 L200 220 M120 140 L280 140",stroke:"#a79755",strokeWidth:"2"}),l.jsx("circle",{cx:"200",cy:"140",r:"8",fill:"#11ff49"})]})},{id:"2",title:"Live Performances in the Digital Age",category:"CREATOR SPOTLIGHT",readTime:"6 min read",icon:(0,l.jsxs)("svg",{viewBox:"0 0 400 280",className:"w-full h-full",children:[l.jsx("rect",{width:"400",height:"280",fill:"#1a1a1a"}),l.jsx("rect",{x:"80",y:"60",width:"240",height:"160",rx:"8",fill:"none",stroke:"#11ff49",strokeWidth:"3"}),l.jsx("path",{d:"M100 180 L140 120 L180 150 L220 100 L260 140 L300 90",fill:"none",stroke:"#a79755",strokeWidth:"4",strokeLinecap:"round"}),l.jsx("circle",{cx:"200",cy:"140",r:"30",fill:"#11ff49",opacity:"0.2"}),l.jsx("path",{d:"M190 130 L190 150 L210 140 Z",fill:"#11ff49"})]})},{id:"3",title:"Inside the Modern Recording Studio",category:"TECHNOLOGY",readTime:"10 min read",icon:(0,l.jsxs)("svg",{viewBox:"0 0 400 280",className:"w-full h-full",children:[l.jsx("rect",{width:"400",height:"280",fill:"#1a1a1a"}),l.jsx("rect",{x:"60",y:"80",width:"100",height:"120",rx:"6",fill:"#2a2a2a",stroke:"#11ff49",strokeWidth:"2"}),l.jsx("rect",{x:"180",y:"60",width:"100",height:"140",rx:"6",fill:"#2a2a2a",stroke:"#11ff49",strokeWidth:"2"}),l.jsx("rect",{x:"300",y:"100",width:"40",height:"100",rx:"4",fill:"#2a2a2a",stroke:"#a79755",strokeWidth:"2"}),l.jsx("rect",{x:"70",y:"90",width:"80",height:"8",fill:"#11ff49"}),l.jsx("rect",{x:"70",y:"110",width:"60",height:"8",fill:"#11ff49",opacity:"0.6"}),l.jsx("rect",{x:"70",y:"130",width:"70",height:"8",fill:"#11ff49",opacity:"0.4"})]})}];function M(){let e=(0,s.useRef)(null),t=r(),a=a=>{if(e.current){let l=t?191:350;e.current.scrollBy({left:"left"===a?-l:l,behavior:"smooth"})}};return t?l.jsx("div",{className:"relative w-full",style:{backgroundColor:"#1a1a1a",paddingTop:"20px",paddingBottom:"20px"},children:(0,l.jsxs)("div",{style:{width:"100%",paddingLeft:"19px",paddingRight:"19px"},children:[(0,l.jsxs)("div",{className:"relative",children:[l.jsx("div",{ref:e,className:"flex gap-[12px] overflow-x-auto pb-[20px]",style:{scrollbarWidth:"none",msOverflowStyle:"none"},children:H.map(e=>(0,l.jsxs)("div",{className:"flex-shrink-0 group",style:{width:"179px"},children:[(0,l.jsxs)("div",{className:"w-full rounded-[3px] overflow-hidden mb-[16px] relative bg-[#1a1a1a] border transition-all duration-500",style:{height:"179px",borderColor:"#2a2a2a"},children:[l.jsx("div",{className:"w-full h-full transition-transform duration-500 group-active:scale-110",children:e.icon}),l.jsx("div",{className:"absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center",style:{backgroundColor:"rgba(17, 255, 73, 0.1)"},children:l.jsx("span",{className:"text-[11px] font-semibold px-[16px] py-[8px] rounded-full",style:{backgroundColor:"#11ff49",color:"#1a1a1a"},children:"Read"})})]}),(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{className:"flex items-center gap-[8px] mb-[8px]",children:[l.jsx("span",{className:"text-[9px] font-bold tracking-wider uppercase",style:{color:"#a79755"},children:e.category}),l.jsx("span",{className:"text-[9px]",style:{color:"#9e9e9d"},children:"•"}),l.jsx("span",{className:"text-[9px]",style:{color:"#9e9e9d"},children:e.readTime})]}),l.jsx("h3",{className:"text-[14px] font-bold transition-colors",style:{color:"#f1f0eb"},children:e.title})]})]},e.id))}),l.jsx("button",{onClick:()=>a("left"),className:"absolute left-[-10px] top-[90px] -translate-y-1/2 z-10 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all active:scale-95",style:{backgroundColor:"#2a2a2a",border:"1px solid #3a3a3a"},children:l.jsx(T.Z,{size:16,color:"#f1f0eb"})}),l.jsx("button",{onClick:()=>a("right"),className:"absolute right-[-10px] top-[90px] -translate-y-1/2 z-10 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all active:scale-95",style:{backgroundColor:"#2a2a2a",border:"1px solid #3a3a3a"},children:l.jsx(z.Z,{size:16,color:"#f1f0eb"})})]}),l.jsx("div",{className:"mt-[40px] flex justify-center",children:l.jsx("button",{className:"px-[32px] py-[12px] rounded-[8px] text-[13px] font-semibold transition-all active:opacity-60",style:{backgroundColor:"#2a2a2a",border:"1px solid #3a3a3a",color:"#f1f0eb"},children:"Browse All"})})]})}):(0,l.jsxs)("div",{className:"w-full py-[60px] md:py-[80px] px-[20px] md:px-[40px]",style:{backgroundColor:"#0d0d0d"},children:[(0,l.jsxs)("div",{className:"relative max-w-[1400px] mx-auto",children:[l.jsx("div",{ref:e,className:"flex md:grid md:grid-cols-3 gap-[24px] md:gap-[32px] overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-[20px]",style:{scrollbarWidth:"none",msOverflowStyle:"none"},children:H.map(e=>(0,l.jsxs)("div",{className:"flex-shrink-0 w-[280px] md:w-auto group cursor-pointer snap-start",children:[(0,l.jsxs)("div",{className:"w-full h-[280px] rounded-[3px] overflow-hidden mb-[20px] relative bg-[#1a1a1a] border transition-all duration-500",style:{borderColor:"#2a2a2a"},children:[l.jsx("div",{className:"w-full h-full transition-transform duration-500 group-hover:scale-110",children:e.icon}),l.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",style:{backgroundColor:"rgba(17, 255, 73, 0.1)"},children:l.jsx("span",{className:"text-[14px] font-semibold px-[24px] py-[12px] rounded-full",style:{backgroundColor:"#11ff49",color:"#1a1a1a"},children:"Read Article"})})]}),(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{className:"flex items-center gap-[12px] mb-[12px]",children:[l.jsx("span",{className:"text-[11px] font-bold tracking-wider uppercase",style:{color:"#a79755"},children:e.category}),l.jsx("span",{className:"text-[11px]",style:{color:"#9e9e9d"},children:"•"}),l.jsx("span",{className:"text-[11px]",style:{color:"#9e9e9d"},children:e.readTime})]}),l.jsx("h3",{className:"text-[22px] font-bold transition-colors group-hover:text-[#11ff49]",style:{color:"#f1f0eb"},children:e.title})]})]},e.id))}),l.jsx("button",{onClick:()=>a("left"),className:"hidden md:flex absolute left-[-15px] top-[140px] -translate-y-1/2 z-10 w-[36px] h-[36px] rounded-full items-center justify-center transition-all hover:scale-110",style:{backgroundColor:"#2a2a2a",border:"1px solid #3a3a3a"},children:l.jsx(T.Z,{size:18,color:"#f1f0eb"})}),l.jsx("button",{onClick:()=>a("right"),className:"hidden md:flex absolute right-[-15px] top-[140px] -translate-y-1/2 z-10 w-[36px] h-[36px] rounded-full items-center justify-center transition-all hover:scale-110",style:{backgroundColor:"#2a2a2a",border:"1px solid #3a3a3a"},children:l.jsx(z.Z,{size:18,color:"#f1f0eb"})})]}),l.jsx("div",{className:"mt-[60px] flex justify-center",children:l.jsx("button",{className:"px-[40px] py-[16px] rounded-[8px] text-[16px] font-semibold transition-all hover:opacity-80",style:{backgroundColor:"#2a2a2a",border:"1px solid #3a3a3a",color:"#f1f0eb"},children:"Browse All Articles"})}),l.jsx("style",{children:`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `})]})}var _=a(8660);function B({src:e,alt:t="",className:a="",style:s={},objectFit:i="cover"}){var r;let n;if(!e||"string"!=typeof e)return null;e.startsWith("/src/assets/")&&(e=e.replace("/src/assets/","/assets/"));try{let t=new URL(e);("localhost"===t.hostname||"127.0.0.1"===t.hostname)&&"3001"===t.port&&(e=t.pathname+(t.search||""))}catch{}let o={...s,objectFit:i};return(n=e).includes("youtube.com")||n.includes("youtu.be")?l.jsx("iframe",{src:`https://www.youtube.com/embed/${(e=>{let t=e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);return t&&11===t[2].length?t[2]:null})(e)}`,className:a,style:{...o,border:"none"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):(r=e).startsWith("data:video")||[".mp4",".webm",".ogg"].some(e=>r.toLowerCase().includes(e))?l.jsx("video",{src:e,className:a,style:o,controls:!0,loop:!0,muted:!0,autoPlay:!0}):l.jsx("img",{src:e,alt:t,className:"w-full h-full object-cover rounded-[3px]",style:o,onError:e=>{e.currentTarget.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="}})}function R({coverImage:e,imageFit:t}){return l.jsx("div",{className:"-translate-x-1/2 absolute bottom-[0.32px] h-[750.677px] left-[calc(75%-313.5px)] w-[717px]",children:l.jsx("div",{className:"absolute h-[750.677px] left-[-4.35px] top-0 w-[721.345px]",children:l.jsx("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:l.jsx(B,{src:e||_.Z,alt:"",className:"absolute h-[89.08%] left-0 max-w-none top-[10.96%] w-full",objectFit:t||"cover"})})})})}function W({category:e,title:t,coverImage:a,imageFit:i,backgroundColor:r,backgroundImage:n,backgroundImageFit:o,backgroundText:c,backgroundTextColor:d,backgroundTextStyle:p,showHeroImage:x,showBackgroundText:m,showBackgroundColor:h}){let f=d||"#f1f0eb",g="stroke"===p?{WebkitTextStroke:`2px ${f}`,WebkitTextFillColor:"transparent",color:"transparent"}:{color:f},u=(0,s.useRef)(null),[b,v]=(0,s.useState)(860);return(0,l.jsxs)("div",{className:"bg-[#1a1a1a] relative",style:{width:"1512px",height:"851px"},"data-name":"Cover Thumbnail – Feature Article Colour",children:[!1!==h&&l.jsx("div",{className:"absolute h-[851px] left-0 top-0 w-[1512px]",style:{backgroundColor:r||"#fb00b8"}}),n&&l.jsx("div",{className:"absolute h-[851px] left-0 top-0 w-[1512px] overflow-hidden",children:l.jsx(B,{src:n,alt:"",className:"absolute inset-0 w-full h-full",objectFit:o||"cover"})}),!1!==m&&l.jsx("div",{className:"-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[750px] justify-center left-[763.5px] not-italic text-center top-[calc(50%-0.5px)] w-[1351px]",style:{lineHeight:"0",overflow:"hidden",fontFamily:"'Humane 2.0', sans-serif"},children:l.jsx("p",{ref:u,className:"leading-[normal] whitespace-nowrap",style:{...g,fontSize:`${b}px`},dangerouslySetInnerHTML:{__html:c||"FIGHTING!"}})}),!1!==x&&l.jsx(R,{coverImage:a,imageFit:i}),(0,l.jsxs)("div",{className:"absolute left-[80px] top-[650px] z-20 flex flex-col gap-[10px] items-start",children:[(0,l.jsxs)("div",{className:"relative inline-block",children:[l.jsx("div",{className:"absolute inset-0 bg-[#1a1a1a] opacity-65",style:{marginLeft:"-9px",marginRight:"-9px",marginTop:"-8px",marginBottom:"-8px"}}),l.jsx("p",{className:"relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#11ff49] text-[13px] tracking-[1.3px] uppercase",dangerouslySetInnerHTML:{__html:e||"CATEGORY TYPE"}})]}),(0,l.jsxs)("div",{className:"relative inline-block",children:[l.jsx("div",{className:"absolute inset-0 bg-[#1a1a1a] opacity-65",style:{marginLeft:"-9px",marginRight:"-9px",marginTop:"-6px",marginBottom:"-6px"}}),l.jsx("p",{className:"relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#f1f0eb] text-[30px] uppercase",dangerouslySetInnerHTML:{__html:t||"ENTER HEADLINE HERE"}})]})]})]})}let P={p2e417780:"M14.9914 6.41977C12.4922 3.498 8.32468 2.71205 5.19337 5.38752C2.06205 8.06298 1.62121 12.5362 4.08025 15.7005C6.12477 18.3314 12.3122 23.8801 14.3401 25.676C14.567 25.877 14.6804 25.9774 14.8128 26.0169C14.9283 26.0514 15.0546 26.0514 15.1701 26.0169C15.3024 25.9774 15.4159 25.877 15.6428 25.676C17.6707 23.8801 23.8581 18.3314 25.9026 15.7005C28.3617 12.5362 27.9746 8.03484 24.7895 5.38752C21.6044 2.7402 17.4906 3.498 14.9914 6.41977Z",p3e23b940:"M13.1244 16.8751L26.2494 3.75006M13.2839 17.2851L16.569 25.7326C16.8584 26.4768 17.0031 26.8489 17.2116 26.9576C17.3924 27.0517 17.6077 27.0519 17.7885 26.9579C17.9972 26.8495 18.1423 26.4776 18.4326 25.7337L26.6705 4.62406C26.9326 3.95259 27.0636 3.61685 26.9919 3.40231C26.9297 3.216 26.7835 3.06979 26.5972 3.00755C26.3826 2.93588 26.0469 3.0669 25.3754 3.32894L4.26572 11.5669C3.52188 11.8571 3.14996 12.0023 3.04157 12.2109C2.94761 12.3918 2.94774 12.6071 3.04191 12.7878C3.15054 12.9963 3.52263 13.141 4.26682 13.4304L12.7143 16.7156C12.8654 16.7743 12.9409 16.8037 13.0045 16.8491C13.0609 16.8893 13.1102 16.9386 13.1504 16.995C13.1958 17.0586 13.2251 17.1341 13.2839 17.2851Z"};var D=a(7055);function $({coverImage:e,imageFit:t}){return l.jsx("div",{className:"-translate-x-1/2 absolute bottom-[0.32px] h-[750.677px] left-[calc(50%-0.5px)] w-[717px]",children:l.jsx("div",{className:"absolute h-[750.677px] left-[-4.35px] top-0 w-[721.345px]",children:l.jsx(B,{src:e||D.Z,alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full",objectFit:t||"contain"})})})}function U({category:e,title:t,coverImage:a,imageFit:i,backgroundColor:r,backgroundImage:n,backgroundImageFit:o,backgroundText:c,backgroundTextColor:d,backgroundTextStyle:p,iconCount1:x,iconCount2:m,showHeroImage:h,showBackgroundText:f,showBackgroundColor:g}){let u=d||"#f1f0eb",b="fill"===p?{color:u}:{WebkitTextStroke:`2px ${u}`,WebkitTextFillColor:"transparent",color:"transparent"},v=(0,s.useRef)(null),[y,j]=(0,s.useState)(815),[w,N]=(0,s.useState)(null),[k,I]=(0,s.useState)(null);return(0,l.jsxs)("div",{className:"relative",style:{width:"1512px",height:"851px",backgroundColor:!1!==g&&r||"#1a1a1a"},"data-name":"Cover Thumbnail – Feature Article BW",children:[n&&l.jsx("div",{className:"absolute h-[851px] left-0 top-0 w-[1512px] overflow-hidden",children:l.jsx(B,{src:n,alt:"",className:"absolute inset-0 w-full h-full",objectFit:o||"cover"})}),!1!==f&&l.jsx("div",{className:"-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[750px] justify-center left-[763.5px] not-italic text-center top-[calc(50%-0.5px)] w-[1351px]",style:{lineHeight:"0",overflow:"hidden",fontFamily:"'Humane 2.0', sans-serif"},children:l.jsx("p",{ref:v,className:"leading-[normal] whitespace-nowrap",style:{...b,fontSize:`${y}px`},dangerouslySetInnerHTML:{__html:c||"BUTTERFLY"}})}),!1!==h&&l.jsx($,{coverImage:a,imageFit:i}),(0,l.jsxs)("div",{className:"absolute left-[80px] top-[650px] z-20 flex flex-col gap-[10px] items-start",children:[(0,l.jsxs)("div",{className:"relative inline-block",children:[l.jsx("div",{className:"absolute inset-0 bg-[#11ff49] opacity-70",style:{marginLeft:"-9px",marginRight:"-9px",marginTop:"-8px",marginBottom:"-8px"}}),l.jsx("p",{className:"relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#1a1a1a] text-[13px] tracking-[1.3px] uppercase",dangerouslySetInnerHTML:{__html:e||"CATEGORY TYPE"}})]}),(0,l.jsxs)("div",{className:"relative inline-block",children:[l.jsx("div",{className:"absolute inset-0 bg-[#11ff49] opacity-70",style:{marginLeft:"-9px",marginRight:"-9px",marginTop:"-6px",marginBottom:"-6px"}}),l.jsx("p",{className:"relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#1a1a1a] text-[30px] uppercase",dangerouslySetInnerHTML:{__html:t||"ENTER HEADLINE HERE"}})]}),(0,l.jsxs)("div",{className:"flex items-center gap-[22px]",style:{color:"#f1f0eb"},children:[(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[6px]",onMouseEnter:()=>N("heart"),onMouseLeave:()=>{N(null),I(null)},onMouseDown:()=>I("heart"),onMouseUp:()=>I(null),children:[l.jsx("svg",{className:"block size-[30px]",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 30 30",children:l.jsx("g",{id:"heart",children:l.jsx("path",{clipRule:"evenodd",d:P.p2e417780,fillRule:"evenodd",stroke:"heart"===w||"heart"===k?"#11ff49":"#f1f0eb",fill:"heart"===k?"#11ff49":"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5"})})}),l.jsx("div",{className:"text-[14px] leading-[normal]",children:x||"112"})]}),(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[6px]",onMouseEnter:()=>N("plane"),onMouseLeave:()=>{N(null),I(null)},onMouseDown:()=>I("plane"),onMouseUp:()=>I(null),children:[l.jsx("svg",{className:"block size-[30px]",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 30 30",children:l.jsx("g",{id:"send-01",children:l.jsx("path",{d:P.p3e23b940,stroke:"plane"===w||"plane"===k?"#11ff49":"#f1f0eb",fill:"plane"===k?"#11ff49":"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5"})})}),l.jsx("div",{className:"text-[14px] leading-[normal]",children:m||"23"})]})]})]})]})}var Z=a(2020);function G({category:e,title:t,coverImage:a,imageFit:i,backgroundColor:r,backgroundImage:n,backgroundImageFit:o,iconCount1:c,iconCount2:d,showHeroImage:p,showBackgroundColor:x}){let[m,h]=(0,s.useState)(null),[f,g]=(0,s.useState)(null);return(0,l.jsxs)("div",{className:"relative",style:{width:"1512px",height:"851px",backgroundColor:!1!==x&&r||"#1a1a1a"},"data-name":"Cover Thumbnail – Creator Spotlight",children:[n&&l.jsx("div",{className:"absolute h-[851px] left-0 top-0 w-[1512px] overflow-hidden z-0",children:l.jsx(B,{src:n,alt:"",className:"absolute inset-0 w-full h-full",objectFit:o||"cover"})}),!1!==p&&(0,l.jsxs)("div",{className:"absolute h-[851px] left-0 pointer-events-none top-0 w-[1512px]",children:[l.jsx("div",{className:"absolute inset-0 overflow-hidden",children:l.jsx(B,{src:a||Z.Z,alt:"",className:"absolute h-[191.15%] left-[-2.78%] max-w-none top-[-91.15%] w-[106.04%]",objectFit:i||"cover"})}),l.jsx("div",{"aria-hidden":"true",className:"absolute border-[#f1f0eb] border-[1.099px] border-solid inset-0"})]}),(0,l.jsxs)("div",{className:"absolute left-[80px] top-[655px] z-20 flex flex-col gap-[10px] items-start",children:[(0,l.jsxs)("div",{className:"relative inline-block",children:[l.jsx("div",{className:"absolute inset-0 bg-[#1a1a1a] opacity-65",style:{marginLeft:"-9px",marginRight:"-9px",marginTop:"-8px",marginBottom:"-8px"}}),l.jsx("p",{className:"relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#11ff49] text-[13px] tracking-[1.3px] uppercase",dangerouslySetInnerHTML:{__html:e||"CATEGORY TYPE"}})]}),(0,l.jsxs)("div",{className:"relative inline-block",children:[l.jsx("div",{className:"absolute inset-0 bg-[#1a1a1a] opacity-65",style:{marginLeft:"-9px",marginRight:"-9px",marginTop:"-6px",marginBottom:"-6px"}}),l.jsx("p",{className:"relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#f1f0eb] text-[30px] uppercase",dangerouslySetInnerHTML:{__html:t||"ENTER HEADLINE HERE"}})]}),(0,l.jsxs)("div",{className:"flex items-center gap-[22px]",style:{color:"#f1f0eb"},children:[(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[6px]",onMouseEnter:()=>h("heart"),onMouseLeave:()=>{h(null),g(null)},onMouseDown:()=>g("heart"),onMouseUp:()=>g(null),children:[l.jsx("svg",{className:"block size-[30px]",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 30 30",children:l.jsx("g",{id:"heart",children:l.jsx("path",{clipRule:"evenodd",d:P.p2e417780,fillRule:"evenodd",stroke:"heart"===m||"heart"===f?"#11ff49":"#f1f0eb",fill:"heart"===f?"#11ff49":"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5"})})}),l.jsx("div",{className:"text-[14px] leading-[normal]",children:c||"112"})]}),(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[6px]",onMouseEnter:()=>h("plane"),onMouseLeave:()=>{h(null),g(null)},onMouseDown:()=>g("plane"),onMouseUp:()=>g(null),children:[l.jsx("svg",{className:"block size-[30px]",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 30 30",children:l.jsx("g",{id:"send-01",children:l.jsx("path",{d:P.p3e23b940,stroke:"plane"===m||"plane"===f?"#11ff49":"#f1f0eb",fill:"plane"===f?"#11ff49":"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5"})})}),l.jsx("div",{className:"text-[14px] leading-[normal]",children:d||"23"})]})]})]})]})}let X={p1155e7c0:"M29.3762 33.987C30.7481 32.6292 32.9828 30.4087 34.3547 29.065L61.2275 2.46098C62.5994 1.1032 62.1468 0 60.2233 0H3.5076C1.56994 0 0 1.56994 0 3.5076V59.5444C0 61.4679 1.11734 61.9347 2.48927 60.5769L29.362 33.987H29.3762Z",p171a7300:"M253 39.1211V3.5076C253 1.58408 251.43 0 249.492 0H217.372C215.449 0 214.982 1.11734 216.34 2.47512L250.511 36.646C251.869 38.0037 252.986 39.1211 252.986 39.1211H253Z",p1785da80:"M3.83291 61.5811C2.3054 62.755 2.6307 63.7167 4.55423 63.7167H61.2699C63.1934 63.7167 63.6602 62.5994 62.3024 61.2416L39.5878 38.5271C38.23 37.1693 35.8539 37.0137 34.3264 38.1876L3.83291 61.5811Z",p17b4ae80:"M215.703 3.52175C214.473 2.03667 213.455 2.4044 213.455 4.34207V60.2233C213.455 62.1468 215.025 63.7309 216.962 63.7309H249.082C251.006 63.7309 252.59 62.1609 252.59 60.2233V51.1855C252.59 49.262 251.586 46.4757 250.341 44.9907L215.703 3.52175Z",p22332200:"M102.498 1.59822C101.65 -0.127292 100.264 -0.127292 99.4292 1.59822L70.6471 60.5769C69.7985 62.3024 70.6895 63.7309 72.613 63.7309H129.329C131.252 63.7309 132.143 62.3165 131.295 60.5769L102.498 1.59822Z",p228bc080:"M173.244 28.7963C171.901 30.1682 169.68 30.1682 168.337 28.7963L141.393 1.37193C140.05 -8.83972e-08 138.932 0.452594 138.932 2.37612V60.2233C138.932 62.1468 140.502 63.7309 142.44 63.7309H199.155C201.079 63.7309 202.663 62.161 202.663 60.2233V2.37612C202.663 0.452594 201.56 -8.83972e-08 200.202 1.37193L173.259 28.7963H173.244Z"};function Y({category:e,title:t,coverImage1:a,imageFit1:i,coverImage2:r,imageFit2:n,backgroundColor:o,backgroundImage:c,backgroundImageFit:d,iconCount1:p,iconCount2:x,showHeroImage:m,showBackgroundColor:h}){let[f,g]=(0,s.useState)(!1),[u,b]=(0,s.useState)(!1),v=!!a,y=!!r,j=v?a:r,w=v?i:n;return(0,l.jsxs)("div",{className:"bg-[#1a1a1a] relative size-full","data-name":"Cover Thumbnail – Announcement 2",style:{backgroundColor:!1!==h&&o||"#1a1a1a"},children:[c&&l.jsx("div",{className:"absolute h-full left-0 top-0 w-full overflow-hidden z-0",children:l.jsx(B,{src:c,alt:"",className:"absolute inset-0 w-full h-full",objectFit:d||"cover"})}),l.jsx("p",{className:"absolute font-['Inter:Light',sans-serif] font-light leading-[normal] left-[80px] not-italic text-[#11ff49] text-[13px] top-[643px] tracking-[1.3px] uppercase",dangerouslySetInnerHTML:{__html:e||"ANNOUNCEMENT:"}}),l.jsx("div",{className:"absolute left-[80px] top-[673px] z-[9]",children:(0,l.jsxs)("div",{className:"relative inline-block",children:[l.jsx("div",{className:"absolute inset-0 bg-[#1a1a1a] opacity-65",style:{marginLeft:"-9px",marginRight:"-9px",marginTop:"-8px",marginBottom:"-8px"}}),l.jsx("p",{className:"relative font-['Inter:Light',sans-serif] font-light leading-[normal] not-italic text-[#f1f0eb] text-[30px]",dangerouslySetInnerHTML:{__html:t||"Hello Soneium!"}})]})}),!1!==m&&(0,l.jsxs)(l.Fragment,{children:[a&&r&&l.jsx("div",{className:"absolute h-[45px] left-[733px] top-[349.5px] w-[45.001px]",children:l.jsx("div",{className:"absolute inset-[-2.08%_-2.08%_0_-2.08%]",children:l.jsx("svg",{className:"block size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 46.8713 45.9356",children:(0,l.jsxs)("g",{id:"Group 48096531",children:[l.jsx("line",{id:"Line 97",stroke:"var(--stroke-0, white)",strokeLinecap:"round",strokeWidth:"1.87174",x1:"0.935872",x2:"44.6121",y1:"44.6121",y2:"0.935872"}),l.jsx("line",{id:"Line 98",stroke:"var(--stroke-0, white)",strokeLinecap:"round",strokeWidth:"1.87174",transform:"matrix(-0.707107 -0.707107 -0.707107 0.707107 45.9354 45.9356)",x1:"0.935872",x2:"62.7034",y1:"-0.935872",y2:"-0.935872"})]})})})}),v&&!y||!v&&y?l.jsx("div",{className:"absolute left-1/2 size-[400px] top-[171px] -translate-x-1/2",children:j?l.jsx(B,{src:j,alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full",objectFit:w||"cover"}):null}):(0,l.jsxs)(l.Fragment,{children:[l.jsx("div",{className:"absolute contents left-[287px] top-[171px]",children:l.jsx("div",{className:"absolute left-[287px] size-[400px] top-[171px]",children:a?l.jsx(B,{src:a,alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full",objectFit:i||"cover"}):null})}),(0,l.jsxs)("div",{className:"absolute contents left-[calc(50%+69px)] top-[171px]",children:[l.jsx("div",{className:"absolute left-[calc(50%+69px)] size-[400px] top-[171px]"}),l.jsx("div",{className:"absolute contents left-[calc(50%+143px)] top-[347px]",children:r?l.jsx("div",{className:"absolute left-[calc(50%+69px)] size-[400px] top-[171px]",children:l.jsx(B,{src:r,alt:"",className:"absolute inset-0 max-w-none pointer-events-none size-full",objectFit:n||"cover"})}):l.jsx("div",{className:"absolute h-[63.717px] left-[calc(50%+143px)] top-[347px] w-[253px]","data-name":"KAMi Logo",children:(0,l.jsxs)("svg",{className:"block size-full",fill:"none",preserveAspectRatio:"none",viewBox:"0 0 253 63.7167",children:[(0,l.jsxs)("g",{clipPath:"url(#clip0_103_185)",id:"KAMi Logo",children:[l.jsx("path",{d:X.p22332200,fill:"var(--fill-0, #F1F0EB)",id:"Vector"}),l.jsx("path",{d:X.p228bc080,fill:"var(--fill-0, #F1F0EB)",id:"Vector_2"}),l.jsx("path",{d:X.p1155e7c0,fill:"var(--fill-0, #F1F0EB)",id:"Vector_3"}),l.jsx("path",{d:X.p1785da80,fill:"var(--fill-0, #F1F0EB)",id:"Vector_4"}),l.jsx("path",{d:X.p171a7300,fill:"var(--fill-0, #F1F0EB)",id:"Vector_5"}),l.jsx("path",{d:X.p17b4ae80,fill:"var(--fill-0, #F1F0EB)",id:"Vector_6"})]}),l.jsx("defs",{children:l.jsx("clipPath",{id:"clip0_103_185",children:l.jsx("rect",{fill:"white",height:"63.7167",width:"253"})})})]})})})]})]})]})]})}function O({data:e}){let t=(0,s.useRef)(null),[a,i]=(0,s.useState)(.28);return l.jsx("div",{ref:t,className:"absolute inset-0 overflow-hidden flex items-center justify-center",children:l.jsx("div",{style:{width:"1512px",height:"851px",transform:`scale(${a})`,transformOrigin:"center center",flexShrink:0},children:2===e.selectedStyle?l.jsx(U,{category:e.category,title:e.title,coverImage:e.heroImage,imageFit:e.imageFit,backgroundColor:e.backgroundColor,backgroundImage:e.backgroundImage,backgroundImageFit:e.backgroundImageFit,backgroundText:e.backgroundText,backgroundTextColor:e.backgroundTextColor,backgroundTextStyle:e.backgroundTextStyle,iconCount1:"",iconCount2:"",showHeroImage:e.showHeroImage,showBackgroundText:e.showBackgroundText,showBackgroundColor:e.showBackgroundColor}):3===e.selectedStyle?l.jsx(G,{category:e.category,title:e.title,coverImage:e.heroImage,imageFit:e.imageFit,backgroundColor:e.backgroundColor,backgroundImage:e.backgroundImage,backgroundImageFit:e.backgroundImageFit,iconCount1:"",iconCount2:"",showHeroImage:e.showHeroImage,showBackgroundColor:e.showBackgroundColor}):4===e.selectedStyle?l.jsx(Y,{category:e.category,title:e.title,coverImage1:e.heroImage,imageFit1:e.imageFit,coverImage2:e.heroImage2,imageFit2:e.imageFit2||"cover",backgroundColor:e.backgroundColor,backgroundImage:e.backgroundImage,backgroundImageFit:e.backgroundImageFit,iconCount1:"",iconCount2:"",showHeroImage:e.showHeroImage,showBackgroundColor:e.showBackgroundColor}):l.jsx(W,{category:e.category,title:e.title,coverImage:e.heroImage,imageFit:e.imageFit,backgroundColor:e.backgroundColor,backgroundImage:e.backgroundImage,backgroundImageFit:e.backgroundImageFit,backgroundText:e.backgroundText,backgroundTextColor:e.backgroundTextColor,backgroundTextStyle:e.backgroundTextStyle,iconCount1:"",iconCount2:"",showHeroImage:e.showHeroImage,showBackgroundText:e.showBackgroundText,showBackgroundColor:e.showBackgroundColor})})})}function V({page:e,meta:t,onCopyLink:a}){let i=()=>{let t=`${window.location.origin}${window.location.pathname}#article-${e.id}`;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>{a?.()}).catch(()=>{a?.()});else{let e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select();try{document.execCommand("copy"),a?.()}finally{document.body.removeChild(e)}}},[c,d]=(0,s.useState)(1),[p,x]=(0,s.useState)(null),m=r(),h=(0,s.useRef)(null),f=(0,s.useRef)({}),[g,u]=(0,s.useState)({}),v=(Array.isArray(e.pages)&&e.pages.length>0?e.pages:e.content?[e.content]:[]).filter(e=>e?.pageNumber!=="cover").map(e=>e?.fields?.topLabel===void 0&&e?.styleType==="content"?{...e,fields:{...e.fields,topLabel:""}}:e),w=`${e.id}-cover`,N=!!(e.coverData||e.coverImage),k=`${e.id}-products`;e.id;let I=!1!==e.hasFeaturedProducts,L=(0,s.useMemo)(()=>v.map(e=>e.id).join("|"),[v]),T=(0,s.useMemo)(()=>L?L.split("|"):[],[L]);(0,s.useMemo)(()=>{let e=[];return N&&e.push(w),T.forEach(t=>e.push(t)),I&&e.push(k),e},[w,N,T,k,I]);let z={background:e.styles?.background||"#1a1a1a",textPrimary:e.styles?.textPrimary||"#f1f0eb",textAccent:e.styles?.textAccent||"#11ff49",textGold:e.styles?.textGold||"#a79755",fontFamily:e.styles?.fontFamily||"Inter",topLabelFontSize:e.styles?.topLabelFontSize||e.styles?.topLabelSize||"12px",topLabelFontWeight:e.styles?.topLabelFontWeight||e.styles?.topLabelWeight||"400"},H=m?0:44,[M,_]=(0,s.useState)(!1),B=(e,t)=>{if("intro"===e.styleType){let t=!e.images.coverImage;return l.jsx("div",{className:"w-full h-full relative flex items-center",style:{backgroundColor:z.background},children:l.jsx("div",{className:"relative",style:{width:"1512px",height:t?"auto":"851px",minHeight:t?"851px":void 0},children:1===e.selectedStyle&&l.jsx(S,{title:e.fields.title||"",topLabel:e.fields.showTopLabel&&e.fields.topLabel||"",coverImage:e.images.coverImage||null,imageFit:e.imageFits.coverImageFit||"cover",author:e.fields.author||"",headline:e.fields.headline||"",description:e.fields.description||"",iconCount1:e.fields.iconCount1||"",iconCount2:e.fields.iconCount2||"",textPrimary:z.textPrimary,textAccent:z.textAccent,fontFamily:z.fontFamily,efx:e.efx})})})}return null};if(!v.length)return l.jsx("div",{className:"w-full rounded-[12px] border",style:{borderColor:"#2a2a2a",backgroundColor:"#0d0d0d",padding:"24px",color:"#9e9e9d"},children:"Article content not available"});let R=e=>{if("intro"===e.styleType)return B(e,0);if("content"===e.styleType){if(1===e.selectedStyle)return l.jsx(y,{topLabel:e.fields.topLabel,introParagraph:e.fields.bodyCopies?.[0]?.text,paragraphHeaders:e.fields.paragraphHeaders,bodyCopies:e.fields.bodyCopies?.slice(1),image1:e.images.image1,image2:e.images.image2,image1Fit:e.imageFits.image1Fit,image2Fit:e.imageFits.image2Fit,isAnimating:!1,fontFamily:z.fontFamily,topLabelFontSize:z.topLabelFontSize,topLabelFontWeight:z.topLabelFontWeight,textPrimary:z.textPrimary,efx:e.efx});if(2===e.selectedStyle)return l.jsx(C,{topLabel:e.fields.topLabel,paragraphHeaders:e.fields.paragraphHeaders,bodyCopies:e.fields.bodyCopies,image1:e.images.image1,image2:e.images.image2,image1Fit:e.imageFits.image1Fit,image2Fit:e.imageFits.image2Fit,isAnimating:!1,fontFamily:z.fontFamily,topLabelFontSize:z.topLabelFontSize,topLabelFontWeight:z.topLabelFontWeight,textPrimary:z.textPrimary,efx:e.efx});if(3===e.selectedStyle)return l.jsx(A,{topLabel:e.fields.topLabel,paragraphHeaders:e.fields.paragraphHeaders,bodyCopies:e.fields.bodyCopies,image1:e.images.image1,image2:e.images.image2,image1Fit:e.imageFits.image1Fit,image2Fit:e.imageFits.image2Fit,isAnimating:!1,fontFamily:z.fontFamily,topLabelFontSize:z.topLabelFontSize,topLabelFontWeight:z.topLabelFontWeight,textPrimary:z.textPrimary,efx:e.efx});if(4===e.selectedStyle)return l.jsx(F,{topLabel:e.fields.topLabel,image1:e.images.image1,image2:e.images.image2,image1Fit:e.imageFits.image1Fit,image2Fit:e.imageFits.image2Fit,caption1Title:e.fields.caption1Title,caption1Subtitle:e.fields.caption1Subtitle,caption2Title:e.fields.caption2Title,caption2Subtitle:e.fields.caption2Subtitle,showCaption1:e.fields.showCaption1,showCaption2:e.fields.showCaption2,isAnimating:!1,fontFamily:z.fontFamily,topLabelFontSize:z.topLabelFontSize,topLabelFontWeight:z.topLabelFontWeight,textPrimary:z.textPrimary,efx:e.efx})}return l.jsx("div",{className:"w-full h-full flex items-center justify-center",style:{color:z.textPrimary},children:"Unsupported page style"})},W=e=>e.replace(/<a\b([^>]*?)>/gi,(e,t)=>{let a=t,l=(a=/target\s*=/i.test(a)?a.replace(/target\s*=\s*(['"])(.*?)\1/i,'target="_blank"'):`${a} target="_blank"`).match(/rel\s*=\s*(['"])(.*?)\1/i);if(l){let e=l[2].split(/\s+/).filter(Boolean);e.some(e=>"noopener"===e.toLowerCase())||e.push("noopener"),e.some(e=>"noreferrer"===e.toLowerCase())||e.push("noreferrer");let t=e.join(" ");a=a.replace(l[0],`rel="${t}"`)}else a=`${a} rel="noopener noreferrer"`;let s=a.match(/style\s*=\s*(['"])(.*?)\1/i),i="color: #11ff49; text-decoration: underline;";if(s){let e=s[2].replace(/color\s*:\s*[^;]+;?/gi,"").replace(/text-decoration\s*:\s*[^;]+;?/gi,"").trim(),t=`${e}${e&&!e.endsWith(";")?";":""} ${i}`.trim();a=a.replace(s[0],`style="${t}"`)}else a=`${a} style="${i}"`;return`<a${a}>`}),P=(e,t)=>{let a=t?.filter(e=>!e.afterHeaderId)||[];return(0,l.jsxs)("div",{className:"flex flex-col gap-[12px]",children:[a.map((e,t)=>l.jsx("div",{className:"text-[15px] leading-[24px] rich-preview-content",style:{color:z.textPrimary,whiteSpace:"pre-wrap"},dangerouslySetInnerHTML:{__html:W(e.text||"")}},`standalone-${t}`)),e?.map((e,s)=>{let i=t?.find(t=>t.afterHeaderId===e.id),r=s>0||a.length>0;return l.jsxs("div",{className:`flex flex-col gap-[8px] ${r?"mt-[12px]":""}`,children:[e.text&&l.jsx("div",{className:"text-[16px] font-semibold tracking-wider leading-[18px]",style:{color:z.textAccent},children:e.text}),i?.text&&l.jsx("div",{className:"text-[15px] leading-[24px] rich-preview-content",style:{color:z.textPrimary,whiteSpace:"pre-wrap"},dangerouslySetInnerHTML:{__html:W(i.text)}})]},e.id)})]})},D=t=>{if("intro"===t.styleType){let a=t.images?.coverImage||null,s=t.fields?.showTopLabel?t.fields?.topLabel:e.coverData?.category;return(0,l.jsxs)("div",{className:"flex flex-col gap-[14px] relative",style:{padding:"18px 16px 10px",backgroundColor:z.background},children:[(0,l.jsxs)("div",{className:"absolute right-[16px] top-[18px] flex items-center gap-[16px]",children:[(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[4px]",children:[l.jsx(n.Z,{size:18,strokeWidth:1.5,color:z.textPrimary}),l.jsx("div",{style:{fontSize:"12px",color:z.textPrimary},children:t.fields?.iconCount1||"112"})]}),(0,l.jsxs)("div",{className:"flex flex-col items-center gap-[4px] cursor-pointer",role:"button",tabIndex:0,onClick:i,onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),i())},title:"Copy article link","aria-label":"Copy article link",children:[l.jsx(o.Z,{size:18,strokeWidth:1.5,color:z.textPrimary}),l.jsx("div",{style:{fontSize:"12px",color:z.textPrimary},children:t.fields?.iconCount2||"24"})]})]}),s&&l.jsx("div",{className:"text-[11px] font-semibold tracking-wider",style:{color:z.textGold},children:s}),l.jsx("div",{className:"text-[34px] font-light leading-[40px]",style:{color:z.textPrimary},children:l.jsx(j,{text:t.fields?.title||e.coverData?.title||e.name||"Untitled",isAnimating:M,fontFamily:z.fontFamily,fontSize:"34px",fontWeight:"300",color:z.textPrimary,lineHeight:"40px"})}),t.fields?.author&&l.jsx("div",{className:"text-[12px] font-semibold",style:{color:z.textPrimary},children:t.fields.author}),a&&l.jsx("div",{className:"w-full overflow-hidden mb-[30px]",style:{borderRadius:"6px",backgroundColor:"#1a1a1a",border:"1px solid #2a2a2a"},children:l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:a,alt:"",className:"w-full h-auto block",style:{objectFit:t.imageFits?.coverImageFit||e.coverData?.imageFit||"cover"}})})}),t.fields?.headline&&l.jsx("div",{className:"text-[16px] font-semibold leading-[22px] mb-[30px]",style:{color:z.textAccent},children:t.fields.headline}),t.fields?.description&&l.jsx("div",{className:"text-[14px] leading-[22px]",style:{color:z.textPrimary,whiteSpace:"pre-wrap"},dangerouslySetInnerHTML:{__html:t.fields.description}})]})}if("content"===t.styleType){if(1===t.selectedStyle)return(0,l.jsxs)("div",{className:"flex flex-col gap-[16px]",style:{padding:"12px 16px 18px",backgroundColor:z.background},children:[t.fields?.topLabel&&l.jsx("div",{className:"text-[11px] font-semibold tracking-wider",style:{color:z.textGold},children:t.fields.topLabel}),t.fields?.bodyCopies?.[0]?.text&&l.jsx("div",{className:"text-[22px] font-light leading-[30px]",style:{color:z.textPrimary,whiteSpace:"pre-wrap",fontFamily:"Inter, sans-serif"},dangerouslySetInnerHTML:{__html:t.fields.bodyCopies[0].text}}),P(t.fields?.paragraphHeaders,t.fields?.bodyCopies?.slice(1)),t.images?.image1&&l.jsx("div",{className:"w-full",children:l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image1,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image1Fit||"cover"}})})}),t.images?.image2&&l.jsx("div",{className:"w-full",children:l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image2,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image2Fit||"cover"}})})})]});if(2===t.selectedStyle)return(0,l.jsxs)("div",{className:"flex flex-col gap-[16px]",style:{padding:"12px 16px 18px",backgroundColor:z.background},children:[t.fields?.topLabel&&l.jsx("div",{className:"text-[11px] font-semibold tracking-wider",style:{color:z.textGold},children:t.fields.topLabel}),P(t.fields?.paragraphHeaders,t.fields?.bodyCopies),t.images?.image1&&l.jsx("div",{className:"w-1/2 mx-auto",children:l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image1,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image1Fit||"cover"}})})}),t.images?.image2&&l.jsx("div",{className:"w-1/2 mx-auto",children:l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image2,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image2Fit||"cover"}})})})]});if(3===t.selectedStyle)return(0,l.jsxs)("div",{className:"flex flex-col gap-[16px]",style:{padding:"12px 16px 18px",backgroundColor:z.background},children:[t.fields?.topLabel&&l.jsx("div",{className:"text-[11px] font-semibold tracking-wider",style:{color:z.textGold},children:t.fields.topLabel}),P(t.fields?.paragraphHeaders,t.fields?.bodyCopies),t.images?.image1&&l.jsx("div",{className:"w-full",children:l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image1,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image1Fit||"cover"}})})}),t.images?.image2&&l.jsx("div",{className:"w-full",children:l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image2,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image2Fit||"cover"}})})})]});if(4===t.selectedStyle)return(0,l.jsxs)("div",{className:"flex flex-col gap-[16px]",style:{padding:"12px 16px 18px",backgroundColor:z.background},children:[t.fields?.topLabel&&l.jsx("div",{className:"text-[11px] font-semibold tracking-wider",style:{color:z.textGold},children:t.fields.topLabel}),t.images?.image1&&(0,l.jsxs)("div",{className:"w-full flex flex-col gap-[6px]",children:[l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image1,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image1Fit||"cover"}})}),(t.fields?.caption1Title||t.fields?.caption1Subtitle)&&(0,l.jsxs)("div",{className:"text-[12px]",style:{color:z.textPrimary,whiteSpace:"pre-wrap"},children:[l.jsx("div",{className:"font-semibold",children:t.fields?.caption1Title}),l.jsx("div",{className:"opacity-80",children:t.fields?.caption1Subtitle})]})]}),t.images?.image2&&(0,l.jsxs)("div",{className:"w-full flex flex-col gap-[6px]",children:[l.jsx(b,{glitchEnabled:!!t.efx?.glitch,blurEnabled:!!t.efx?.blur,chromaticEnabled:!!t.efx?.chromatic,shakeEnabled:!!t.efx?.shake,distortEnabled:!!t.efx?.distort,children:l.jsx("img",{src:t.images.image2,alt:"",className:"w-full h-auto block rounded-[6px]",style:{objectFit:t.imageFits?.image2Fit||"cover"}})}),(t.fields?.caption2Title||t.fields?.caption2Subtitle)&&(0,l.jsxs)("div",{className:"text-[12px]",style:{color:z.textPrimary,whiteSpace:"pre-wrap"},children:[l.jsx("div",{className:"font-semibold",children:t.fields?.caption2Title}),l.jsx("div",{className:"opacity-80",children:t.fields?.caption2Subtitle})]})]})]})}return null};return m?(0,l.jsxs)("div",{ref:h,className:"w-full",style:{backgroundColor:z.background},children:[N&&l.jsx("div",{className:"w-full",style:{padding:"16px 16px 8px"},children:e.coverData?l.jsx("div",{className:"w-full relative overflow-hidden",style:{aspectRatio:"1512 / 851",backgroundColor:"#1a1a1a",borderRadius:"6px",border:"1px solid #2a2a2a"},children:l.jsx(O,{data:e.coverData})}):e.coverImage?l.jsx("div",{className:"w-full overflow-hidden",style:{borderRadius:"6px",backgroundColor:"#1a1a1a",border:"1px solid #2a2a2a"},children:l.jsx("img",{src:e.coverImage,alt:"",className:"w-full h-auto block",style:{objectFit:e.coverData?.imageFit||"cover"}})}):null}),v.map(e=>l.jsx("div",{children:D(e)},`mobile-${e.id}`)),I&&l.jsx("div",{className:"w-full",style:{backgroundColor:z.background,paddingBottom:"8px"},children:l.jsx(E,{})})]}):l.jsx("div",{className:"w-full rounded-[14px] border",style:{backgroundColor:"#0d0d0d",borderColor:"#2a2a2a",padding:"20px"},children:l.jsx("div",{ref:h,className:"w-full",style:{backgroundColor:z.background,overflow:"hidden",marginTop:t?"20px":"0px",borderRadius:"12px"},children:(0,l.jsxs)("div",{className:"flex flex-col gap-0",children:[N&&l.jsx("div",{style:{width:`${1512*c}px`,height:`${(g[w]||851)*c}px`},children:l.jsx("div",{ref:e=>{f.current[w]=e},className:"relative",style:{width:"1512px",height:`${g[w]||851}px`,transform:`scale(${c})`,transformOrigin:"top left"},children:l.jsx("div",{className:"w-full h-full relative",style:{backgroundColor:"#1a1a1a"},children:e.coverData?l.jsx(O,{data:e.coverData}):e.coverImage?l.jsx("img",{src:e.coverImage,alt:"",className:"w-full h-full object-cover"}):null})})}),N&&t?l.jsx("div",{className:"flex items-center gap-[12px]",style:{marginTop:"12px"},children:l.jsx("span",{className:"text-[11px] font-bold tracking-wider",style:{color:"#a79755"},children:t.category})}):null,v.map((e,t)=>l.jsx("div",{style:{width:`${1512*c}px`,height:`${(g[e.id]||851)*c}px`,marginTop:H&&(N||t>0)?-H:0},children:l.jsx("div",{ref:t=>{f.current[e.id]=t},className:"relative",style:{width:"1512px",height:`${g[e.id]||851}px`,transform:`scale(${c})`,transformOrigin:"top left"},children:R(e)})},e.id)),I&&l.jsx("div",{style:{width:`${1512*c}px`,height:`${(g[k]||851)*c}px`,marginTop:H&&(N||v.length>0)?-H:0},children:l.jsx("div",{ref:e=>{f.current[k]=e},className:"relative",style:{width:"1512px",height:`${g[k]||851}px`,transform:`scale(${c})`,transformOrigin:"top left"},children:l.jsx("div",{className:"w-full flex items-start justify-center",style:{backgroundColor:z.background,paddingTop:m?"0px":"50px",paddingBottom:m?"0px":"20px"},children:l.jsx(E,{})})})})]})})})}function K({onBackToLanding:e,savedPages:t}){let a=r(),n=t.filter(e=>e.isPublished).sort((e,t)=>new Date(t.savedAt).getTime()-new Date(e.savedAt).getTime()),[d,p]=(0,s.useState)(5),x=(0,s.useRef)(null),m=(0,s.useRef)(null),[h,f]=(0,s.useState)(null);(0,s.useRef)(!1);let g=e=>{m.current&&window.clearTimeout(m.current),f(e),m.current=window.setTimeout(()=>{f(null)},1800)},u=e=>{let t=`${window.location.origin}${window.location.pathname}#article-${e}`;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>{g("Link copied to clipboard")}).catch(()=>{g("Link copied to clipboard")});else{let e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select();try{document.execCommand("copy"),g("Link copied to clipboard")}finally{document.body.removeChild(e)}}},b=e=>{let t=new Date(e);return Number.isNaN(t.getTime())?"Unknown date":t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:t.getFullYear()!==new Date().getFullYear()?"numeric":void 0})};return(0,l.jsxs)("div",{className:"min-h-screen",style:{backgroundColor:"#1a1a1a",fontFamily:"'Inter', sans-serif"},children:[l.jsx("div",{className:"border-b",style:{backgroundColor:"#0d0d0d",borderColor:"#2a2a2a"},children:(0,l.jsxs)("div",{style:{padding:a?"20px":"30px 60px"},children:[l.jsx("div",{className:"flex mb-[24px]",style:{flexDirection:a?"column":"row",alignItems:a?"stretch":"center",justifyContent:a?"flex-start":"space-between",gap:a?"16px":void 0}}),l.jsx("div",{className:"flex",style:{flexDirection:a?"column":"row",alignItems:a?"stretch":"center",justifyContent:a?"flex-start":"space-between",gap:a?"16px":void 0},children:(0,l.jsxs)("div",{children:[l.jsx("h1",{className:"font-bold mb-[8px]",style:{color:"#f1f0eb",letterSpacing:"-0.02em",fontSize:"36px"},children:"Feed"}),(0,l.jsxs)("p",{className:"text-[15px]",style:{color:"#9e9e9d"},children:[n.length," published ",1===n.length?"article":"articles"]})]})})]})}),l.jsx("div",{style:{padding:a?"24px 20px":"36px 60px"},children:0===n.length?(0,l.jsxs)("div",{className:"flex flex-col items-center justify-center rounded-[12px] border-2 border-dashed text-center",style:{borderColor:"#3a3a3a",backgroundColor:"#0d0d0d",padding:a?"60px 16px":"100px 0"},children:[l.jsx("h3",{className:"text-[20px] font-bold mb-[8px]",style:{color:"#9e9e9d"},children:"No published articles yet"}),l.jsx("p",{className:"text-[14px]",style:{color:"#6e6e6d"},children:"Publish a draft to see it in the feed"})]}):(0,l.jsxs)("div",{className:"flex flex-col",style:{width:a?"100%":"80%",margin:"0 auto"},children:[n.slice(0,d).map((e,t)=>{let s=e.coverData?.title||e.name||"Untitled",r=e.coverData?.category||"PUBLISHED";return(0,l.jsxs)(i.E.div,{id:`article-${e.id}`,initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-100px"},transition:{duration:.8,ease:"easeInOut"},children:[t>0&&l.jsx("div",{style:{height:"1px",backgroundColor:"#6e6e6e",margin:a?"24px 0":"40px 0",width:"100%"}}),l.jsx(V,{page:e,meta:{title:s,category:r,savedAt:b(e.savedAt)},onCopyLink:()=>g("Link copied to clipboard")}),l.jsx("div",{className:"flex justify-center w-full mt-6 mb-2",children:(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[l.jsx("button",{onClick:()=>u(e.id),className:"flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-full hover:bg-[#2a2a2a]",style:{color:"#6e6e6e",border:"1px solid #6e6e6e"},title:"Copy article link","aria-label":"Copy article link",children:l.jsx(o.Z,{size:16})}),(0,l.jsxs)("button",{onClick:()=>{let t=document.getElementById(`article-${e.id}`);t?.scrollIntoView({behavior:"smooth"})},className:"flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-full hover:bg-[#2a2a2a]",style:{color:"#6e6e6e",border:"1px solid #6e6e6e"},children:[l.jsx(c,{size:16}),"Back to top of article"]})]})})]},e.id)}),d<n.length&&l.jsx("div",{ref:x,style:{height:"20px",width:"100%"}})]})}),l.jsx("div",{className:"w-full",style:{padding:a?"20px":"36px 60px",paddingBottom:a?"20px":"0",borderTop:"1px solid #2a2a2a",marginTop:"40px",backgroundColor:"#1a1a1a"},children:l.jsx("div",{style:{maxWidth:"1512px",margin:"0 auto"},children:l.jsx(M,{})})}),h&&l.jsx("div",{className:"fixed z-50",style:{left:"50%",bottom:a?"16px":"24px",transform:"translateX(-50%)"},children:l.jsx("div",{className:"rounded-full px-4 py-2 text-sm",style:{backgroundColor:"rgba(42, 42, 42, 0.95)",border:"1px solid #3a3a3a",color:"#f1f0eb",boxShadow:"0 2px 10px rgba(0,0,0,0.4)"},children:h})})]})}},1903:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>i});var l=a(9510);let s=(0,a(8570).createProxy)(String.raw`C:\Users\User\Downloads\Create Design System Layout-test\src\feedexternal\Feed.tsx#default`);function i(){return l.jsx(s,{})}},1506:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n,metadata:()=>r});var l=a(9510),s=a(7366),i=a.n(s);a(7633);let r={title:"KAMI Dashboard",description:"Customizable CRM Dashboard for creator IP protection"};function n({children:e}){return l.jsx("html",{lang:"en",children:l.jsx("body",{className:i().className,children:e})})}},7055:(e,t,a)=>{"use strict";a.d(t,{Z:()=>l});let l={src:"/_next/static/media/34c2e0eace15e343a1c923bac054f892ff3c7f6f.560796ed.png",height:1024,width:1024,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAXVBMVEVMaXHR29t5fIGdnqDf4uSWl5iChITQ1tZcW1v////i4+aFg4MdGhp5hYWIg4KCTzdJQT2kpqhCQkVdNCFqbG+Ea2Cnp6eSlZhLPjlzbWtGJhixqqfHyMlsb3SJjZMfPuaGAAAAGHRSTlMAHLD6MJpEEPwCu4LAKur76/bs/uX7pleyyzC6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQUlEQVR4nB3FRxKAIBAAwSGDCbMshv8/09K+NAnbWBIkWnH8ujr23z7WMnnAnXm7dlBDWUSMIui5xFsHCKuJz8ELTugCk2KDT7gAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8}},8660:(e,t,a)=>{"use strict";a.d(t,{Z:()=>l});let l={src:"/_next/static/media/931ef8e14bd8f3516acd9bea1676dbd4b8d4987d.728030da.png",height:1024,width:1024,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAaVBMVEVMaXFcdIFMqtbGknOGdWiziXmKbVyui23F1t6ch3JEMSdTZW1jRS41aZI+XIWanJN0hYXBlng5ksEkWoc0YIa0jG2xm4rGsJxXh5d+cl/eso3YnXogSH8wea5WfJSacliUiHhMbIEsX5WEF1Q9AAAAHXRSTlMAyzlspCHnAw98GjrH3Yr59+v+9Gq/p4L7W6SgxrqbP3YAAAAJcEhZcwAACxMAAAsTAQCanBgAAABCSURBVHicHcpHFoAgEMDQqMCIDXvHdv9D+iCrvwhgK5UTUreJkKWb04DtWV1bAtPbD2YHfTTfqTNBGH1dxDnxl0V+VecCrWqY6BMAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8}},2020:(e,t,a)=>{"use strict";a.d(t,{Z:()=>l});let l={src:"/_next/static/media/c5ce4e47ab90e08210a558deb1f6e4cba2392c2a.bc31e263.png",height:1263,width:1280,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAmVBMVEWxkLHdmar27sKmwZ/p6uKZVEl2VZisjn36+vrI262WsYussbLp4cDi4uLr9dTly5nQ7bnf8sC9cILf1NOEREaNeWWaZ06GZYvI2c6HkrCxyN10ZYicXldGTIbRXWvLYE3pzsW5iJPacZfglKahoHbIuJ7N1sHI8NTftY+k4pGYmIp4lKm1g4l0eomOg4OhemzklnvGa2Pif2RzTgUoAAAAJHRSTlMBD11w/P2D/Rf5tZ39hLj9/Ysr+/79rfIvdf3b6aOARfud1lQKPICFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAASklEQVR4nAXBhQGAMBAEsEPKU9zd3W3/4UgAU/bj/EwBfaHgyBJokz0S7SW4wdchHBVIszNs9NQQLZdd8ldBAKK7eTuoqlewVul/wYoFejPW+yUAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8}},7633:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),l=t.X(0,[480,213],()=>a(8099));module.exports=l})();