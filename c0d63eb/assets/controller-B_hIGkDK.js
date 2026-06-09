var gd=Object.defineProperty;var _d=(n,t,e)=>t in n?gd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var pn=(n,t,e)=>_d(n,typeof t!="symbol"?t+"":t,e);import{t as Ac}from"./index-DuKMVkXH.js";const wc=28;function Nt(n){return`${Math.round(n)} mm`}function xd(n){const t=Lt(n);return`${n.name} · ${Nt(t.w)} × ${Nt(t.h)}`}function vd(n){return n==="upright"?"vertical":n==="shelf"?"horizontal":"front"}function mo(n){return n.dimensions}function Md(n){const t=mo(n);return n.orientation==="vertical"?{x:n.x,y:n.y,w:t.thickness,h:t.height}:n.orientation==="horizontal"?{x:n.x,y:n.y,w:t.width,h:t.thickness}:{x:n.x,y:n.y,w:t.width,h:t.height}}function Rc(n,t){const e=mo(n);n.orientation==="vertical"?n.dimensions={width:e.width,height:Math.round(t.h),thickness:e.thickness}:n.orientation==="horizontal"?n.dimensions={width:Math.round(t.w),height:e.height,thickness:e.thickness}:n.dimensions={width:Math.round(t.w),height:Math.round(t.h),thickness:e.thickness},n.x=Math.round(t.x),n.y=Math.round(t.y)}function sn(n){return n.boards.find(t=>t.id===n.selectedId)??null}function rn(n){const t=new Set(n.selectedIds);return n.selectedId!==null&&t.add(n.selectedId),n.boards.filter(e=>t.has(e.id))}function Cc(n){return n.measurements.find(t=>t.id===n.selectedMeasurementId)??null}function si(n,t,e){return{x:(t-n.panX)/n.scale,y:(e-n.panY)/n.scale}}function xe(n,t,e){return{x:t*n.scale+n.panX,y:e*n.scale+n.panY}}function yi(n){return dr(Lt(n))}function dr(n){return{left:n.x,right:n.x+n.w,top:n.y,bottom:n.y+n.h,centerX:n.x+n.w/2,centerY:n.y+n.h/2}}function al(n){return n.kind==="back"?0:n.kind==="front"?2:1}function go(n){return n.map((t,e)=>({board:t,index:e})).sort((t,e)=>al(t.board)-al(e.board)||t.index-e.index).map(({board:t})=>t)}function Ic(n,t){const e=go(n.boards);for(let i=e.length-1;i>=0;i-=1){const s=e[i];if(!(s.kind==="front"&&!n.showFrontPanels)&&Sd(s,t))return s}return null}function Sd(n,t){const e=Lt(n),i=e.w<32||e.h<32?14:0;return t.x>=e.x-i&&t.x<=e.x+e.w+i&&t.y>=e.y-i&&t.y<=e.y+e.h+i}function zn(n){if(!n.length)return null;const t=n.map(Lt),e=Math.min(...t.map(a=>a.x)),i=Math.min(...t.map(a=>a.y)),s=Math.max(...t.map(a=>a.x+a.w)),r=Math.max(...t.map(a=>a.y+a.h));return{left:e,top:i,right:s,bottom:r,w:s-e,h:r-i}}function Lt(n){return Md(n)}function xn(n,t){return n.orientation==="vertical"?n.dimensions.width:n.orientation==="horizontal"?n.dimensions.height:t}function ol(n,t){return n.dimensions.thickness}function Ei(n,t,e){const i=e==="x"?n.gridOriginX:n.gridOriginY;return i+Math.round((t-i)/n.grid)*n.grid}function Pc(n,t){return n.boards.filter(e=>e.group===t)}function yd(n){let t=1;const e=new Set;n.forEach(i=>{if(e.has(i.id))return;const s=[i];for(e.add(i.id),i.group=t;s.length;){const r=s.shift();r&&n.forEach(a=>{e.has(a.id)||!Cd(r,a)||(a.group=t,e.add(a.id),s.push(a))})}t+=1})}function Lc(n,t){const e=zn(n);if(!e)return null;const i=n.filter(d=>!bi(d)),s=i.find(d=>{const f=Lt(d);return Math.abs(f.x-e.left)<=.5&&f.h>t*2}),r=i.find(d=>{const f=Lt(d);return Math.abs(f.x+f.w-e.right)<=.5&&f.h>t*2}),a=i.find(d=>{const f=Lt(d);return Math.abs(f.y-e.top)<=.5&&f.w>t*2}),o=i.find(d=>{const f=Lt(d);return Math.abs(f.y+f.h-e.bottom)<=.5&&f.w>t*2}),c=Math.max(0,e.w-(s?Lt(s).w:0)-(r?Lt(r).w:0)),l=Math.max(0,e.h-(a?Lt(a).h:0)-(o?Lt(o).h:0));return{innerW:c,innerH:l,hasFrame:!!(s||r||a||o)}}function Ed(n,t,e,i,s=new Set([t.id])){if(!n.snap)return{x:e,y:i,label:"Snap off",guides:[]};const r=wc/n.scale,a={x:Ei(n,e,"x"),y:Ei(n,i,"y")};let o=`Grid ${n.grid} mm`,c=r,l=r;const d=[],f=[],u={...t,x:e,y:i},m=yi(u);n.boards.forEach(S=>{if(s.has(S.id))return;const g=yi(S),p=[[m.left,g.left,"left aligned",null,null],[m.right,g.right,"right aligned",null,null],[m.centerX,g.centerX,"center aligned",null,null],[m.left,g.right,"touching right edge","left","right"],[m.right,g.left,"touching left edge","right","left"]],E=[[m.top,g.top,"top aligned",null,null],[m.bottom,g.bottom,"bottom aligned",null,null],[m.centerY,g.centerY,"middle aligned",null,null],[m.top,g.bottom,"flush below","top","bottom"],[m.bottom,g.top,"flush above","bottom","top"]];p.forEach(([b,w,L,T,P])=>{const M=w-b;Math.abs(M)<c&&(a.x=e+M,c=Math.abs(M),o=L,f[0]=T&&P?{edge:T,target:S,targetEdge:P}:null,d[0]={orientation:"vertical",position:w,label:L})}),E.forEach(([b,w,L,T,P])=>{const M=w-b;Math.abs(M)<l&&(a.y=i+M,l=Math.abs(M),o=L,f[1]=T&&P?{edge:T,target:S,targetEdge:P}:null,d[1]={orientation:"horizontal",position:w,label:L})})}),kc(n,s).forEach(({anchor:S,board:g,position:p})=>{if(S.axis==="x"){const b=p-m.centerX;Math.abs(b)<c&&(a.x=e+b,c=Math.abs(b),o=`${g.name} layout anchor`,f[0]=null,d[0]={orientation:"vertical",position:p,label:o});return}const E=p-m.centerY;Math.abs(E)<l&&(a.y=i+E,l=Math.abs(E),o=`${g.name} layout anchor`,f[1]=null,d[1]={orientation:"horizontal",position:p,label:o})});const x={...Lt(t),x:a.x,y:a.y};return f.forEach((S,g)=>{!S||!d[g]||(d[g].linkPoint=Gc(t,x,S.edge,S.target,S.targetEdge))}),{...a,label:o,guides:d.filter(Boolean)}}function Dc(n,t,e){const s=xe(n,e.x,e.y),r=Lt(t),a=xe(n,r.x,r.y),o=r.w*n.scale,c=r.h*n.scale,l={nw:{x:a.x,y:a.y},n:{x:a.x+o/2,y:a.y},ne:{x:a.x+o,y:a.y},w:{x:a.x,y:a.y+c/2},e:{x:a.x+o,y:a.y+c/2},sw:{x:a.x,y:a.y+c},s:{x:a.x+o/2,y:a.y+c},se:{x:a.x+o,y:a.y+c}};return Uc(t).reduce((d,f)=>{const u=l[f],m=Math.abs(s.x-u.x),x=Math.abs(s.y-u.y);if(m>18||x>18)return d;const S=m*m+x*x;return S<d.distance?{handle:f,distance:S}:d},{handle:null,distance:Number.POSITIVE_INFINITY}).handle}function bd(n,t,e,i,s,r){const a=r.x-s.x,o=r.y-s.y,c={...i};return e.includes("e")&&(c.w=i.w+a),e.includes("s")&&(c.h=i.h+o),e.includes("w")&&(c.x=i.x+a,c.w=i.w-a),e.includes("n")&&(c.y=i.y+o,c.h=i.h-o),t.orientation==="vertical"&&(c.x=i.x,c.w=i.w),t.orientation==="horizontal"&&(c.y=i.y,c.h=i.h),Td(n,t,zc(c,n.thickness),Ad(e))}function Uc(n){return n.orientation==="vertical"?["n","s"]:n.orientation==="horizontal"?["w","e"]:["nw","n","ne","w","e","sw","s","se"]}function Nc(n,t){const e=Math.max(10,12/n.scale),i=Math.max(10,16/n.scale);let s=null,r=Number.POSITIVE_INFINITY;return n.boards.forEach(a=>{const o=Lt(a),c=yi(a);[{edge:"left",distance:Math.abs(t.x-c.left),offset:t.y-o.y},{edge:"right",distance:Math.abs(t.x-c.right),offset:t.y-o.y},{edge:"top",distance:Math.abs(t.y-c.top),offset:t.x-o.x},{edge:"bottom",distance:Math.abs(t.y-c.bottom),offset:t.x-o.x}].forEach(d=>{const f=(d.edge==="left"||d.edge==="right")&&t.y>=o.y-e&&t.y<=o.y+o.h+e,u=(d.edge==="top"||d.edge==="bottom")&&t.x>=o.x-e&&t.x<=o.x+o.w+e;if(!(!(f||u)||d.distance>e)&&d.distance<r){const m=d.edge==="left"||d.edge==="right"?o.h/2:o.w/2,x=Math.abs(d.offset-m)<=i?m:d.offset;s={kind:"board-edge",boardId:a.id,edge:d.edge,offset:x},r=d.distance}})}),s??{kind:"grid",x:Ei(n,t.x,"x"),y:Ei(n,t.y,"y")}}function vi(n,t){if(t.kind==="grid")return{x:t.x,y:t.y};const e=n.boards.find(r=>r.id===t.boardId);if(!e)return null;const i=Lt(e),s=yi(e);return t.edge==="left"||t.edge==="right"?{x:t.edge==="left"?s.left:s.right,y:i.y+ll(t.offset,0,i.h)}:{x:i.x+ll(t.offset,0,i.w),y:t.edge==="top"?s.top:s.bottom}}function Fc(n,t){return Math.abs(n.x-t.x)>=Math.abs(n.y-t.y)?"horizontal":"vertical"}function Oc(n){return 46+n*14}function _o(n,t){return n.displayOffset??Oc(t)}function xo(n,t,e){const i=vi(n,t.a),s=vi(n,t.b);if(!i||!s)return null;const r=_o(t,e);if(t.axis==="horizontal"){const o=Math.min(i.y,s.y)-r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:i.x,y:o},lineEnd:{x:s.x,y:o},labelPoint:{x:(i.x+s.x)/2,y:o-13/n.scale}}}const a=Math.max(i.x,s.x)+r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:a,y:i.y},lineEnd:{x:a,y:s.y},labelPoint:{x:a-16/n.scale,y:(i.y+s.y)/2}}}function vo(n,t){const e=Math.max(8,10/n.scale),i=42/n.scale,s=18/n.scale;for(let r=n.measurements.length-1;r>=0;r-=1){const a=n.measurements[r],o=xo(n,a,r);if(!o)continue;const c=Math.min(o.lineStart.x,o.lineEnd.x)-e,l=Math.max(o.lineStart.x,o.lineEnd.x)+e,d=Math.min(o.lineStart.y,o.lineEnd.y)-e,f=Math.max(o.lineStart.y,o.lineEnd.y)+e,u=t.x>=c&&t.x<=l&&t.y>=d&&t.y<=f,m=Math.abs(t.x-o.labelPoint.x)<=i&&Math.abs(t.y-o.labelPoint.y)<=s;if(u||m)return a}return null}function Bc(n){const t=[];for(let e=0;e<n.length;e+=1)for(let i=e+1;i<n.length;i+=1){const s=n[e],r=n[i];if(bi(s)||bi(r))continue;const a=Lt(s),o=Lt(r),c=Math.max(a.x,o.x),l=Math.max(a.y,o.y),d=Math.min(a.x+a.w,o.x+o.w),f=Math.min(a.y+a.h,o.y+o.h);d-c>.5&&f-l>.5&&t.push({x:c,y:l,w:d-c,h:f-l,boardIds:[s.id,r.id]})}return t}function Td(n,t,e,i){if(!n.snap)return{rect:e,label:"Snap off",guides:[]};const s=wc/n.scale,r={...e};let a=`Grid ${n.grid} mm`;const o=[];return i.forEach(c=>{let l=s,d=a,f=null;const u=ma(dr(r),c);let x=Ei(n,u,c==="left"||c==="right"?"x":"y")-u;Math.abs(x)<=s&&(d=`Grid ${n.grid} mm`),n.boards.forEach(S=>{if(S.id===t.id)return;const g=yi(S);wd(g,c).forEach(([p,E,b])=>{const w=p-u;if(Math.abs(w)<l){l=Math.abs(w),x=w,d=E;const L=Rd(r,c,w,n.thickness),T=b?Gc(t,L,c,S,b):void 0;f={orientation:c==="left"||c==="right"?"vertical":"horizontal",position:p,label:E,linkPoint:T}}})}),kc(n,new Set([t.id])).forEach(({anchor:S,board:g,position:p})=>{const E=c==="left"||c==="right";if(E&&S.axis!=="x"||!E&&S.axis!=="y")return;const b=p-u;Math.abs(b)<l&&(l=Math.abs(b),x=b,d=`${g.name} layout anchor`,f={orientation:E?"vertical":"horizontal",position:p,label:d})}),Hc(r,c,x,n.thickness),a=d,f&&o.push(f)}),{rect:r,label:a,guides:o}}function kc(n,t){return n.layoutAnchors.flatMap(e=>{if(t.has(e.boardId))return[];const i=n.boards.find(a=>a.id===e.boardId);if(!i)return[];const s=Lt(i),r=e.axis==="x"?s.w:s.h;return e.offset<0||e.offset>r?[]:[{anchor:e,board:i,position:(e.axis==="x"?s.x:s.y)+e.offset}]})}function Ad(n){const t=[];return n.includes("n")&&t.push("top"),n.includes("s")&&t.push("bottom"),n.includes("w")&&t.push("left"),n.includes("e")&&t.push("right"),t}function zc(n,t){const e={...n},i=Math.max(8,t);return e.w<i&&(e.x+=e.w-i,e.w=i),e.h<i&&(e.y+=e.h-i,e.h=i),e}function ma(n,t){return t==="left"?n.left:t==="right"?n.right:t==="top"?n.top:n.bottom}function wd(n,t){return t==="left"||t==="right"?[[n.left,"left edge",t==="right"?"left":null],[n.right,"right edge",t==="left"?"right":null],[n.centerX,"vertical center",null]]:[[n.top,"top edge",t==="bottom"?"top":null],[n.bottom,"bottom edge",t==="top"?"bottom":null],[n.centerY,"horizontal center",null]]}function Rd(n,t,e,i){const s={...n};return Hc(s,t,e,i),s}function Gc(n,t,e,i,s){if(bi(n)||bi(i))return;const r=dr(t),a=Lt(i),o=dr(a),c=ma(r,e),l=ma(o,s);if(Math.abs(c-l)>.5)return;if(e==="left"||e==="right"){const u=Math.max(t.y,a.y),m=Math.min(t.y+t.h,a.y+a.h);return u>m+.5?void 0:{x:c,y:(u+m)/2}}const d=Math.max(t.x,a.x),f=Math.min(t.x+t.w,a.x+a.w);if(!(d>f+.5))return{x:(d+f)/2,y:c}}function Hc(n,t,e,i){t==="left"&&(n.x+=e,n.w-=e),t==="right"&&(n.w+=e),t==="top"&&(n.y+=e,n.h-=e),t==="bottom"&&(n.h+=e);const s=zc(n,i);n.x=s.x,n.y=s.y,n.w=s.w,n.h=s.h}function ll(n,t,e){return Math.max(t,Math.min(e,n))}function Cd(n,t){if(bi(n)||bi(t))return!1;if(Id(n,t))return!0;const e=yi(n),i=yi(t),s=Math.abs(e.right-i.left)<=.5||Math.abs(i.right-e.left)<=.5,r=Math.abs(e.bottom-i.top)<=.5||Math.abs(i.bottom-e.top)<=.5;return s&&cl(e.top,e.bottom,i.top,i.bottom)||r&&cl(e.left,e.right,i.left,i.right)}function bi(n){return n.kind==="back"||n.kind==="front"}function cl(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function Id(n,t){const e=Lt(n),i=Lt(t);return e.x<i.x+i.w-.5&&e.x+e.w>i.x+.5&&e.y<i.y+i.h-.5&&e.y+e.h>i.y+.5}const Ir=["#5c8d89","#d19041","#725d9f","#538052","#bb5d50","#3f75a3"];function Cs(n){return Ac(n)}class Pd{constructor(t,e){pn(this,"ctx");this.canvas=t,this.state=e;const i=t.getContext("2d");if(!i)throw new Error("Canvas rendering is not available.");this.ctx=i}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.canvas.width=Math.max(1,Math.round(t.width*e)),this.canvas.height=Math.max(1,Math.round(t.height*e)),this.ctx.setTransform(e,0,0,e,0,0),this.draw()}draw(){const t=this.canvas.getBoundingClientRect();this.ctx.clearRect(0,0,t.width,t.height),this.drawGrid(t.width,t.height),go(this.state.boards).forEach(e=>this.drawBoard(e)),this.drawLayoutAnchors(),this.drawOverlaps(),this.drawSelectionBox(),this.drawSnapGuides(t.width,t.height),this.drawMeasurements(),this.drawDimensions(),this.drawResizeHandles(),this.drawOriginAxis(t.width,t.height)}drawGrid(t,e){const i=this.scaledGridPx();this.ctx.save(),this.ctx.strokeStyle="#e1e8e2",this.ctx.lineWidth=1;const s=xe(this.state,this.state.gridOriginX,this.state.gridOriginY),r=(s.x%i+i)%i,a=(s.y%i+i)%i;for(let o=r;o<t;o+=i)this.line(o,0,o,e);for(let o=a;o<e;o+=i)this.line(0,o,t,o);this.ctx.restore()}scaledGridPx(){const t=this.state.grid*this.state.scale,e=12;if(t>=e)return t;const i=this.niceGridMultiplier(e/Math.max(.1,t));return t*i}niceGridMultiplier(t){const i=10**Math.floor(Math.log10(t)),s=t/i;return s<=2?2*i:s<=5?5*i:10*i}drawOriginAxis(t,e){const i=xe(this.state,0,0),s=42,r=s+18;if(i.x<-r||i.x>t+r||i.y<-r||i.y>e+r)return;const a=Math.max(1,Math.min(t-1,i.x)),o=Math.max(1,Math.min(e-1,i.y)),c=a<12;this.ctx.save(),this.ctx.strokeStyle="#1f6659",this.ctx.fillStyle="#1f6659",this.ctx.lineWidth=2,this.ctx.font="11px system-ui",this.ctx.textBaseline="middle",this.drawArrow(a,o,a+s,o),this.drawArrow(a,o,a,o-s),this.ctx.beginPath(),this.ctx.arc(a,o,3,0,Math.PI*2),this.ctx.fill(),this.ctx.textAlign="left",this.ctx.fillText("X",a+s+7,o),this.ctx.fillText("0,0",a+6,o+13),this.ctx.textAlign=c?"left":"center",this.ctx.fillText("Y",a+(c?7:0),o-s-10),this.ctx.restore()}drawBoard(t){var m;const e=Lt(t),i=xe(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale,a=this.state.selectedIds.includes(t.id)||t.id===this.state.selectedId,o=t.id===this.state.selectedId,c=t.id===((m=this.state.resizing)==null?void 0:m.id),l=Ir[(t.group-1)%Ir.length]??Ir[0],d=this.materialFor(t),f=this.boardOpacity(t,a||c);this.ctx.save(),this.ctx.globalAlpha=f,this.ctx.fillStyle=t.kind==="back"?this.withAlpha(d.color,.36):d.color,this.ctx.strokeStyle=o?"#1f6659":a?"#2f78b7":l,this.ctx.lineWidth=t.kind==="back"?1.5:o?3:a?2.5:2,this.ctx.fillRect(i.x,i.y,s,r),this.ctx.strokeRect(i.x,i.y,s,r),this.drawLaminateEdges(t,i.x,i.y,s,r),this.ctx.strokeStyle="rgba(99, 72, 37, 0.28)",this.ctx.lineWidth=1;const u=Math.max(10,28*this.state.scale);if(e.w>=e.h)for(let x=i.y+u;x<i.y+r;x+=u)this.line(i.x+4,x,i.x+s-4,x);else for(let x=i.x+u;x<i.x+s;x+=u)this.line(x,i.y+4,x,i.y+r-4);this.ctx.fillStyle="#27302b",this.ctx.font="12px system-ui",this.ctx.textBaseline="top",this.ctx.fillText(t.name,i.x+7,i.y+6),this.ctx.restore()}boardOpacity(t,e){return t.kind!=="front"?1:e?.5:this.state.showFrontPanels?1:.3}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}withAlpha(t,e){const i=/^#([0-9a-f]{6})$/i.exec(t);if(!i)return t;const s=i[1],r=parseInt(s.slice(0,2),16),a=parseInt(s.slice(2,4),16),o=parseInt(s.slice(4,6),16);return`rgba(${r}, ${a}, ${o}, ${e})`}drawLaminateEdges(t,e,i,s,r){const a=[[t.laminate.left,e,i,e,i+r],[t.laminate.right,e+s,i,e+s,i+r],[t.laminate.top||t.laminate.back,e,i,e+s,i],[t.laminate.bottom||t.laminate.front,e,i+r,e+s,i+r]];a.some(([o])=>o)&&(this.ctx.save(),this.ctx.strokeStyle="#d58b28",this.ctx.lineCap="round",this.ctx.lineWidth=Math.max(3,5*this.state.scale),a.forEach(([o,c,l,d,f])=>{o&&this.line(c,l,d,f)}),this.ctx.restore())}drawOverlaps(){const t=Bc(this.state.boards);t.length&&(this.ctx.save(),t.forEach(e=>{const i=xe(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale;this.ctx.fillStyle="rgba(184, 72, 59, 0.22)",this.ctx.fillRect(i.x,i.y,s,r),this.ctx.strokeStyle="rgba(184, 72, 59, 0.9)",this.ctx.lineWidth=1.5,this.ctx.strokeRect(i.x,i.y,s,r),this.ctx.beginPath();for(let a=i.x-r;a<i.x+s+r;a+=8)this.ctx.moveTo(a,i.y+r),this.ctx.lineTo(a+r,i.y);this.ctx.stroke()}),this.ctx.restore())}drawLayoutAnchors(){if(!this.state.layoutAnchors.length)return;const t=new Set(this.state.selectedIds);this.state.selectedId!==null&&t.add(this.state.selectedId),this.ctx.save(),this.state.layoutAnchors.forEach(e=>{const i=this.state.boards.find(d=>d.id===e.boardId);if(!i)return;const s=t.has(i.id),r=s?"#1f6659":"rgba(31, 102, 89, 0.52)";if(this.ctx.strokeStyle=r,this.ctx.fillStyle=s?"#ffffff":"#e7f3f0",this.ctx.lineWidth=s?2:1.4,this.ctx.setLineDash(s?[5,4]:[3,5]),e.axis==="x"){const d=Lt(i),f=d.x+e.offset;if(e.offset<0||e.offset>d.w)return;const u=xe(this.state,f,d.y),m=xe(this.state,f,d.y+d.h);this.line(u.x,u.y,m.x,m.y),this.drawLayoutAnchorDot(u.x,(u.y+m.y)/2,r);return}const a=Lt(i),o=a.y+e.offset;if(e.offset<0||e.offset>a.h)return;const c=xe(this.state,a.x,o),l=xe(this.state,a.x+a.w,o);this.line(c.x,c.y,l.x,l.y),this.drawLayoutAnchorDot((c.x+l.x)/2,c.y,r)}),this.ctx.restore()}drawSelectionBox(){const t=this.state.selectionBox;if(!t)return;const e=xe(this.state,t.start.x,t.start.y),i=xe(this.state,t.current.x,t.current.y),s=Math.min(e.x,i.x),r=Math.min(e.y,i.y),a=Math.abs(e.x-i.x),o=Math.abs(e.y-i.y);this.ctx.save(),this.ctx.fillStyle="rgba(47, 120, 183, 0.12)",this.ctx.strokeStyle="#2f78b7",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,4]),this.ctx.fillRect(s,r,a,o),this.ctx.strokeRect(s,r,a,o),this.ctx.restore()}drawSnapGuides(t,e){this.state.snapGuides.length&&(this.ctx.save(),this.ctx.strokeStyle="#2398b6",this.ctx.fillStyle="#1b728a",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,5]),this.ctx.font="12px system-ui",this.state.snapGuides.forEach(i=>{if(i.orientation==="vertical"){const s=xe(this.state,i.position,0);this.line(s.x,0,s.x,e),this.drawGuideLabel(i.label,s.x+8,e-18,t,e)}else{const s=xe(this.state,0,i.position);this.line(0,s.y,t,s.y),this.drawGuideLabel(i.label,t-12,s.y-8,t,e,"right")}}),this.ctx.restore())}drawMeasurements(){if(this.state.measurements.forEach((t,e)=>{const i=xo(this.state,t,e);if(!i)return;const s=t.id===this.state.selectedMeasurementId,r=s?"#b8483b":"#4152a3";this.drawMeasurementLine(i.a,i.b,i.lineStart,i.lineEnd,t.axis,r,t.name,s),this.drawAnchorDot(i.a.x,i.a.y,s?"#fff7f5":"#ffffff",r),this.drawAnchorDot(i.b.x,i.b.y,s?"#fff7f5":"#ffffff",r)}),this.state.pendingMeasurementAnchor){const t=vi(this.state,this.state.pendingMeasurementAnchor);t&&this.drawAnchorDot(t.x,t.y,"#4152a3")}if(this.state.pendingMeasurementAnchor&&this.state.previewMeasurementAnchor){const t=vi(this.state,this.state.pendingMeasurementAnchor),e=vi(this.state,this.state.previewMeasurementAnchor);if(!t||!e)return;this.ctx.save(),this.ctx.globalAlpha=.82,this.drawMeasurement(t,e,Fc(t,e),46+this.state.measurements.length*14,"#2398b6"),this.ctx.restore(),this.drawAnchorDot(t.x,t.y,"#4152a3"),this.drawAnchorDot(e.x,e.y,"#2398b6")}}measurementLabel(t,e){const i=t.trim();return i?`${i} ${e}`:e}drawMeasurement(t,e,i,s,r,a=""){if(i==="horizontal"){const c=Math.min(t.y,e.y)-s;this.drawDimensionLine(t.x,c,e.x,c,this.measurementLabel(a,Nt(Math.abs(e.x-t.x))),0,r),this.drawExtension(t.x,t.y,t.x,c,r),this.drawExtension(e.x,e.y,e.x,c,r);return}const o=Math.max(t.x,e.x)+s;this.drawDimensionLine(o,t.y,o,e.y,this.measurementLabel(a,Nt(Math.abs(e.y-t.y))),0,r),this.drawExtension(t.x,t.y,o,t.y,r),this.drawExtension(e.x,e.y,o,e.y,r)}drawMeasurementLine(t,e,i,s,r,a,o,c){const l=Nt(Math.abs(r==="horizontal"?e.x-t.x:e.y-t.y));this.drawDimensionLine(i.x,i.y,s.x,s.y,this.measurementLabel(o,l),0,a,c?2.4:1.5),this.drawExtension(t.x,t.y,i.x,i.y,a),this.drawExtension(e.x,e.y,s.x,s.y,a)}drawDimensions(){if(!this.state.showDimensions)return;const t=sn(this.state),e=rn(this.state),i=e.length>1?e:t?Pc(this.state,t.group):this.state.boards,s=zn(i);if(!s)return;this.drawDimensionLine(s.left,s.top,s.right,s.top,`${Cs("metrics.outer")} ${Nt(s.w)}`,-28,"#255e55"),this.drawDimensionLine(s.right,s.top,s.right,s.bottom,`${Cs("metrics.outer")} ${Nt(s.h)}`,30,"#255e55");const r=Lc(i,this.state.thickness);if(r!=null&&r.hasFrame&&(this.drawDimensionLine(s.left+this.state.thickness,s.bottom,s.right-this.state.thickness,s.bottom,`${Cs("metrics.inner")} ${Nt(r.innerW)}`,28,"#a45f1b"),this.drawDimensionLine(s.left,s.top+this.state.thickness,s.left,s.bottom-this.state.thickness,`${Cs("metrics.inner")} ${Nt(r.innerH)}`,-30,"#a45f1b")),t&&e.length<=1){const a=Lt(t);this.drawDimensionLine(a.x,a.y+a.h,a.x+a.w,a.y+a.h,Nt(a.w),18,"#6e4d83"),this.drawDimensionLine(a.x+a.w,a.y,a.x+a.w,a.y+a.h,Nt(a.h),18,"#6e4d83")}}drawResizeHandles(){if(rn(this.state).length>1)return;const t=sn(this.state);if(!t)return;const e=Lt(t),i=xe(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale,a={nw:[i.x,i.y],n:[i.x+s/2,i.y],ne:[i.x+s,i.y],w:[i.x,i.y+r/2],e:[i.x+s,i.y+r/2],sw:[i.x,i.y+r],s:[i.x+s/2,i.y+r],se:[i.x+s,i.y+r]},o=Uc(t).map(d=>a[d]);this.ctx.save(),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle="#1f6659",this.ctx.lineWidth=1.5;const c=10,l=c/2;o.forEach(([d,f])=>{this.ctx.fillRect(d-l,f-l,c,c),this.ctx.strokeRect(d-l,f-l,c,c)}),this.ctx.restore()}drawGuideLabel(t,e,i,s,r,a="left"){const c=this.ctx.measureText(t).width,l=10,d=a==="right"?Math.max(l+c,Math.min(s-l,e)):Math.max(l,Math.min(s-l-c,e)),f=Math.max(18,Math.min(r-10,i));this.ctx.save(),this.ctx.setLineDash([]),this.ctx.textAlign=a,this.ctx.textBaseline="alphabetic",this.ctx.fillText(t,d,f),this.ctx.restore()}drawDimensionLine(t,e,i,s,r,a=0,o="#2c6159",c=1.5){const l=xe(this.state,t,e),d=xe(this.state,i,s),f=Math.abs(e-s)<.01;this.ctx.save(),this.ctx.strokeStyle=o,this.ctx.fillStyle=o,this.ctx.lineWidth=c,this.ctx.font="12px system-ui",this.ctx.textAlign="center",this.ctx.textBaseline="middle",f?(l.y+=a,d.y+=a,this.line(l.x,l.y,d.x,d.y),this.line(l.x,l.y-5,l.x,l.y+5),this.line(d.x,d.y-5,d.x,d.y+5),this.ctx.fillText(r,(l.x+d.x)/2,l.y-13)):(l.x+=a,d.x+=a,this.line(l.x,l.y,d.x,d.y),this.line(l.x-5,l.y,l.x+5,l.y),this.line(d.x-5,d.y,d.x+5,d.y),this.ctx.translate(l.x-16,(l.y+d.y)/2),this.ctx.rotate(-Math.PI/2),this.ctx.fillText(r,0,0)),this.ctx.restore()}line(t,e,i,s){this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(i,s),this.ctx.stroke()}drawArrow(t,e,i,s){const r=Math.atan2(s-e,i-t),a=7;this.line(t,e,i,s),this.ctx.beginPath(),this.ctx.moveTo(i,s),this.ctx.lineTo(i-a*Math.cos(r-Math.PI/6),s-a*Math.sin(r-Math.PI/6)),this.ctx.lineTo(i-a*Math.cos(r+Math.PI/6),s-a*Math.sin(r+Math.PI/6)),this.ctx.closePath(),this.ctx.fill()}drawExtension(t,e,i,s,r){const a=xe(this.state,t,e),o=xe(this.state,i,s);this.ctx.save(),this.ctx.strokeStyle=r,this.ctx.lineWidth=1,this.ctx.setLineDash([4,4]),this.line(a.x,a.y,o.x,o.y),this.ctx.restore()}drawAnchorDot(t,e,i="#ffffff",s="#4152a3"){const r=xe(this.state,t,e);this.ctx.save(),this.ctx.fillStyle=i,this.ctx.strokeStyle=s,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(r.x,r.y,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}drawLayoutAnchorDot(t,e,i){this.ctx.save(),this.ctx.setLineDash([]),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle=i,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(t,e,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mo="184",On={ROTATE:0,DOLLY:1,PAN:2},ni={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ld=0,hl=1,Dd=2,rr=1,Ud=2,us=3,ri=0,We=1,Un=2,Bn=0,Yi=1,dl=2,ul=3,fl=4,Nd=5,mi=100,Fd=101,Od=102,Bd=103,kd=104,zd=200,Gd=201,Hd=202,Vd=203,ga=204,_a=205,Wd=206,Xd=207,Yd=208,qd=209,$d=210,jd=211,Kd=212,Zd=213,Jd=214,xa=0,va=1,Ma=2,ji=3,Sa=4,ya=5,Ea=6,ba=7,Vc=0,Qd=1,tu=2,Sn=0,Wc=1,Xc=2,Yc=3,qc=4,$c=5,jc=6,Kc=7,Zc=300,Ti=301,Ki=302,Pr=303,Lr=304,Mr=306,Ta=1e3,Nn=1001,Aa=1002,Ue=1003,eu=1004,Is=1005,ke=1006,Dr=1007,_i=1008,Ze=1009,Jc=1010,Qc=1011,_s=1012,So=1013,bn=1014,vn=1015,Gn=1016,yo=1017,Eo=1018,xs=1020,th=35902,eh=35899,nh=1021,ih=1022,dn=1023,Hn=1026,xi=1027,sh=1028,bo=1029,Ai=1030,To=1031,Ao=1033,ar=33776,or=33777,lr=33778,cr=33779,wa=35840,Ra=35841,Ca=35842,Ia=35843,Pa=36196,La=37492,Da=37496,Ua=37488,Na=37489,ur=37490,Fa=37491,Oa=37808,Ba=37809,ka=37810,za=37811,Ga=37812,Ha=37813,Va=37814,Wa=37815,Xa=37816,Ya=37817,qa=37818,$a=37819,ja=37820,Ka=37821,Za=36492,Ja=36494,Qa=36495,to=36283,eo=36284,fr=36285,no=36286,nu=3200,io=0,iu=1,ei="",Ke="srgb",pr="srgb-linear",mr="linear",ie="srgb",Ci=7680,pl=519,su=512,ru=513,au=514,wo=515,ou=516,lu=517,Ro=518,cu=519,ml=35044,gl="300 es",Mn=2e3,vs=2001;function hu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function gr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function du(){const n=gr("canvas");return n.style.display="block",n}const _l={};function xl(...n){const t="THREE."+n.shift();console.log(t,...n)}function rh(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ct(...n){n=rh(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function te(...n){n=rh(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function so(...n){const t=n.join(" ");t in _l||(_l[t]=!0,Ct(...n))}function uu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const fu={[xa]:va,[Ma]:Ea,[Sa]:ba,[ji]:ya,[va]:xa,[Ea]:Ma,[ba]:Sa,[ya]:ji};class li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ms=Math.PI/180,ro=180/Math.PI;function ys(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function qt(n,t,e){return Math.max(t,Math.min(e,n))}function pu(n,t){return(n%t+t)%t}function Ur(n,t,e){return(1-e)*n+e*t}function is(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function He(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const mu={DEG2RAD:ms},qo=class qo{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};qo.prototype.isVector2=!0;let Gt=qo;class ai{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],d=i[s+2],f=i[s+3],u=r[a+0],m=r[a+1],x=r[a+2],S=r[a+3];if(f!==S||c!==u||l!==m||d!==x){let g=c*u+l*m+d*x+f*S;g<0&&(u=-u,m=-m,x=-x,S=-S,g=-g);let p=1-o;if(g<.9995){const E=Math.acos(g),b=Math.sin(E);p=Math.sin(p*E)/b,o=Math.sin(o*E)/b,c=c*p+u*o,l=l*p+m*o,d=d*p+x*o,f=f*p+S*o}else{c=c*p+u*o,l=l*p+m*o,d=d*p+x*o,f=f*p+S*o;const E=1/Math.sqrt(c*c+l*l+d*d+f*f);c*=E,l*=E,d*=E,f*=E}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],d=i[s+3],f=r[a],u=r[a+1],m=r[a+2],x=r[a+3];return t[e]=o*x+d*f+c*m-l*u,t[e+1]=c*x+d*u+l*f-o*m,t[e+2]=l*x+d*m+o*u-c*f,t[e+3]=d*x-o*f-c*u-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(s/2),f=o(r/2),u=c(i/2),m=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=u*d*f+l*m*x,this._y=l*m*f-u*d*x,this._z=l*d*x+u*m*f,this._w=l*d*f-u*m*x;break;case"YXZ":this._x=u*d*f+l*m*x,this._y=l*m*f-u*d*x,this._z=l*d*x-u*m*f,this._w=l*d*f+u*m*x;break;case"ZXY":this._x=u*d*f-l*m*x,this._y=l*m*f+u*d*x,this._z=l*d*x+u*m*f,this._w=l*d*f-u*m*x;break;case"ZYX":this._x=u*d*f-l*m*x,this._y=l*m*f+u*d*x,this._z=l*d*x-u*m*f,this._w=l*d*f+u*m*x;break;case"YZX":this._x=u*d*f+l*m*x,this._y=l*m*f+u*d*x,this._z=l*d*x-u*m*f,this._w=l*d*f-u*m*x;break;case"XZY":this._x=u*d*f-l*m*x,this._y=l*m*f-u*d*x,this._z=l*d*x+u*m*f,this._w=l*d*f+u*m*x;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],d=e[6],f=e[10],u=i+o+f;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(d-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,d=e._w;return this._x=i*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-i*l,this._z=r*d+a*l+i*c-s*o,this._w=a*d-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const $o=class $o{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),d=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+c*l+a*f-o*d,this.y=i+c*d+o*l-r*f,this.z=s+c*f+r*d-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Nr.copy(this).projectOnVector(t),this.sub(Nr)}reflect(t){return this.sub(Nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$o.prototype.isVector3=!0;let F=$o;const Nr=new F,vl=new ai,jo=class jo{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],f=i[7],u=i[2],m=i[5],x=i[8],S=s[0],g=s[3],p=s[6],E=s[1],b=s[4],w=s[7],L=s[2],T=s[5],P=s[8];return r[0]=a*S+o*E+c*L,r[3]=a*g+o*b+c*T,r[6]=a*p+o*w+c*P,r[1]=l*S+d*E+f*L,r[4]=l*g+d*b+f*T,r[7]=l*p+d*w+f*P,r[2]=u*S+m*E+x*L,r[5]=u*g+m*b+x*T,r[8]=u*p+m*w+x*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8];return e*a*d-e*o*l-i*r*d+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],f=d*a-o*l,u=o*c-d*r,m=l*r-a*c,x=e*f+i*u+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return t[0]=f*S,t[1]=(s*l-d*i)*S,t[2]=(o*i-s*a)*S,t[3]=u*S,t[4]=(d*e-s*c)*S,t[5]=(s*r-o*e)*S,t[6]=m*S,t[7]=(i*c-l*e)*S,t[8]=(a*e-i*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Fr.makeScale(t,e)),this}rotate(t){return this.premultiply(Fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};jo.prototype.isMatrix3=!0;let Bt=jo;const Fr=new Bt,Ml=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sl=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gu(){const n={enabled:!0,workingColorSpace:pr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ie&&(s.r=kn(s.r),s.g=kn(s.g),s.b=kn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ie&&(s.r=qi(s.r),s.g=qi(s.g),s.b=qi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return so("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return so("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[pr]:{primaries:t,whitePoint:i,transfer:mr,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:i,transfer:ie,toXYZ:Ml,fromXYZ:Sl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),n}const Kt=gu();function kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ii;class _u{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ii===void 0&&(Ii=gr("canvas")),Ii.width=t.width,Ii.height=t.height;const s=Ii.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ii}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=gr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(kn(e[i]/255)*255):e[i]=kn(e[i]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xu=0;class Co{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=ys(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Or(s[a].image)):r.push(Or(s[a]))}else r=Or(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Or(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?_u.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}let vu=0;const Br=new F;class Ge extends li{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,i=Nn,s=Nn,r=ke,a=_i,o=dn,c=Ze,l=Ge.DEFAULT_ANISOTROPY,d=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=ys(),this.name="",this.source=new Co(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Br).x}get height(){return this.source.getSize(Br).y}get depth(){return this.source.getSize(Br).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ta:t.x=t.x-Math.floor(t.x);break;case Nn:t.x=t.x<0?0:1;break;case Aa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ta:t.y=t.y-Math.floor(t.y);break;case Nn:t.y=t.y<0?0:1;break;case Aa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Zc;Ge.DEFAULT_ANISOTROPY=1;const Ko=class Ko{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],d=c[4],f=c[8],u=c[1],m=c[5],x=c[9],S=c[2],g=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(f-S)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+S)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,w=(m+1)/2,L=(p+1)/2,T=(d+u)/4,P=(f+S)/4,M=(x+g)/4;return b>w&&b>L?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=T/i,r=P/i):w>L?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=T/s,r=M/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=P/r,s=M/r),this.set(i,s,r,e),this}let E=Math.sqrt((g-x)*(g-x)+(f-S)*(f-S)+(u-d)*(u-d));return Math.abs(E)<.001&&(E=1),this.x=(g-x)/E,this.y=(f-S)/E,this.z=(u-d)/E,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ko.prototype.isVector4=!0;let Se=Ko;class Mu extends li{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ke,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Ge(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Co(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yn extends Mu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ah extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Su extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vr=class vr{constructor(t,e,i,s,r,a,o,c,l,d,f,u,m,x,S,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,d,f,u,m,x,S,g)}set(t,e,i,s,r,a,o,c,l,d,f,u,m,x,S,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=f,p[14]=u,p[3]=m,p[7]=x,p[11]=S,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vr().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Pi.setFromMatrixColumn(t,0).length(),r=1/Pi.setFromMatrixColumn(t,1).length(),a=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=a*d,m=a*f,x=o*d,S=o*f;e[0]=c*d,e[4]=-c*f,e[8]=l,e[1]=m+x*l,e[5]=u-S*l,e[9]=-o*c,e[2]=S-u*l,e[6]=x+m*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*d,m=c*f,x=l*d,S=l*f;e[0]=u+S*o,e[4]=x*o-m,e[8]=a*l,e[1]=a*f,e[5]=a*d,e[9]=-o,e[2]=m*o-x,e[6]=S+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*d,m=c*f,x=l*d,S=l*f;e[0]=u-S*o,e[4]=-a*f,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*d,e[9]=S-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*d,m=a*f,x=o*d,S=o*f;e[0]=c*d,e[4]=x*l-m,e[8]=u*l+S,e[1]=c*f,e[5]=S*l+u,e[9]=m*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,m=a*l,x=o*c,S=o*l;e[0]=c*d,e[4]=S-u*f,e[8]=x*f+m,e[1]=f,e[5]=a*d,e[9]=-o*d,e[2]=-l*d,e[6]=m*f+x,e[10]=u-S*f}else if(t.order==="XZY"){const u=a*c,m=a*l,x=o*c,S=o*l;e[0]=c*d,e[4]=-f,e[8]=l*d,e[1]=u*f+S,e[5]=a*d,e[9]=m*f-x,e[2]=x*f-m,e[6]=o*d,e[10]=S*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yu,t,Eu)}lookAt(t,e,i){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),qn.crossVectors(i,$e),qn.lengthSq()===0&&(Math.abs(i.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),qn.crossVectors(i,$e)),qn.normalize(),Ps.crossVectors($e,qn),s[0]=qn.x,s[4]=Ps.x,s[8]=$e.x,s[1]=qn.y,s[5]=Ps.y,s[9]=$e.y,s[2]=qn.z,s[6]=Ps.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],f=i[5],u=i[9],m=i[13],x=i[2],S=i[6],g=i[10],p=i[14],E=i[3],b=i[7],w=i[11],L=i[15],T=s[0],P=s[4],M=s[8],R=s[12],B=s[1],I=s[5],H=s[9],q=s[13],j=s[2],O=s[6],W=s[10],X=s[14],et=s[3],nt=s[7],ft=s[11],yt=s[15];return r[0]=a*T+o*B+c*j+l*et,r[4]=a*P+o*I+c*O+l*nt,r[8]=a*M+o*H+c*W+l*ft,r[12]=a*R+o*q+c*X+l*yt,r[1]=d*T+f*B+u*j+m*et,r[5]=d*P+f*I+u*O+m*nt,r[9]=d*M+f*H+u*W+m*ft,r[13]=d*R+f*q+u*X+m*yt,r[2]=x*T+S*B+g*j+p*et,r[6]=x*P+S*I+g*O+p*nt,r[10]=x*M+S*H+g*W+p*ft,r[14]=x*R+S*q+g*X+p*yt,r[3]=E*T+b*B+w*j+L*et,r[7]=E*P+b*I+w*O+L*nt,r[11]=E*M+b*H+w*W+L*ft,r[15]=E*R+b*q+w*X+L*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],d=t[2],f=t[6],u=t[10],m=t[14],x=t[3],S=t[7],g=t[11],p=t[15],E=c*m-l*u,b=o*m-l*f,w=o*u-c*f,L=a*m-l*d,T=a*u-c*d,P=a*f-o*d;return e*(S*E-g*b+p*w)-i*(x*E-g*L+p*T)+s*(x*b-S*L+p*P)-r*(x*w-S*T+g*P)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],f=t[9],u=t[10],m=t[11],x=t[12],S=t[13],g=t[14],p=t[15],E=e*o-i*a,b=e*c-s*a,w=e*l-r*a,L=i*c-s*o,T=i*l-r*o,P=s*l-r*c,M=d*S-f*x,R=d*g-u*x,B=d*p-m*x,I=f*g-u*S,H=f*p-m*S,q=u*p-m*g,j=E*q-b*H+w*I+L*B-T*R+P*M;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/j;return t[0]=(o*q-c*H+l*I)*O,t[1]=(s*H-i*q-r*I)*O,t[2]=(S*P-g*T+p*L)*O,t[3]=(u*T-f*P-m*L)*O,t[4]=(c*B-a*q-l*R)*O,t[5]=(e*q-s*B+r*R)*O,t[6]=(g*w-x*P-p*b)*O,t[7]=(d*P-u*w+m*b)*O,t[8]=(a*H-o*B+l*M)*O,t[9]=(i*B-e*H-r*M)*O,t[10]=(x*T-S*w+p*E)*O,t[11]=(f*w-d*T-m*E)*O,t[12]=(o*R-a*I-c*M)*O,t[13]=(e*I-i*R+s*M)*O,t[14]=(S*b-x*L-g*E)*O,t[15]=(d*L-f*b+u*E)*O,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,d=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+i,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,d=a+a,f=o+o,u=r*l,m=r*d,x=r*f,S=a*d,g=a*f,p=o*f,E=c*l,b=c*d,w=c*f,L=i.x,T=i.y,P=i.z;return s[0]=(1-(S+p))*L,s[1]=(m+w)*L,s[2]=(x-b)*L,s[3]=0,s[4]=(m-w)*T,s[5]=(1-(u+p))*T,s[6]=(g+E)*T,s[7]=0,s[8]=(x+b)*P,s[9]=(g-E)*P,s[10]=(1-(u+S))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Pi.set(s[0],s[1],s[2]).length();const o=Pi.set(s[4],s[5],s[6]).length(),c=Pi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),on.copy(this);const l=1/a,d=1/o,f=1/c;return on.elements[0]*=l,on.elements[1]*=l,on.elements[2]*=l,on.elements[4]*=d,on.elements[5]*=d,on.elements[6]*=d,on.elements[8]*=f,on.elements[9]*=f,on.elements[10]*=f,e.setFromRotationMatrix(on),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=Mn,c=!1){const l=this.elements,d=2*r/(e-t),f=2*r/(i-s),u=(e+t)/(e-t),m=(i+s)/(i-s);let x,S;if(c)x=r/(a-r),S=a*r/(a-r);else if(o===Mn)x=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===vs)x=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Mn,c=!1){const l=this.elements,d=2/(e-t),f=2/(i-s),u=-(e+t)/(e-t),m=-(i+s)/(i-s);let x,S;if(c)x=1/(a-r),S=a/(a-r);else if(o===Mn)x=-2/(a-r),S=-(a+r)/(a-r);else if(o===vs)x=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};vr.prototype.isMatrix4=!0;let ye=vr;const Pi=new F,on=new ye,yu=new F(0,0,0),Eu=new F(1,1,1),qn=new F,Ps=new F,$e=new F,yl=new ye,El=new ai;class oi{constructor(t=0,e=0,i=0,s=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],f=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return El.setFromEuler(this),this.setFromQuaternion(El,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class oh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bu=0;const bl=new F,Li=new ai,Rn=new ye,Ls=new F,ss=new F,Tu=new F,Au=new ai,Tl=new F(1,0,0),Al=new F(0,1,0),wl=new F(0,0,1),Rl={type:"added"},wu={type:"removed"},Di={type:"childadded",child:null},kr={type:"childremoved",child:null};class Ne extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=ys(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ne.DEFAULT_UP.clone();const t=new F,e=new oi,i=new ai,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new Bt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=Ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(Tl,t)}rotateY(t){return this.rotateOnAxis(Al,t)}rotateZ(t){return this.rotateOnAxis(wl,t)}translateOnAxis(t,e){return bl.copy(t).applyQuaternion(this.quaternion),this.position.add(bl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Tl,t)}translateY(t){return this.translateOnAxis(Al,t)}translateZ(t){return this.translateOnAxis(wl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ls.copy(t):Ls.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ss,Ls,this.up):Rn.lookAt(Ls,ss,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),Li.setFromRotationMatrix(Rn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(te("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rl),Di.child=t,this.dispatchEvent(Di),Di.child=null):te("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wu),kr.child=t,this.dispatchEvent(kr),kr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rl),Di.child=t,this.dispatchEvent(Di),Di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,t,Tu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,Au,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),d=a(t.images),f=a(t.shapes),u=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ne.DEFAULT_UP=new F(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fs extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ru={type:"move"};class zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const S of t.hand.values()){const g=e.getJointPose(S,i),p=this._getHandJoint(l,S);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=d.position.distanceTo(f.position),m=.02,x=.005;l.inputState.pinching&&u>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ru)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new fs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},Ds={h:0,s:0,l:0};function Gr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Zt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Kt.workingColorSpace){if(t=pu(t,1),e=qt(e,0,1),i=qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Gr(a,r,t+1/3),this.g=Gr(a,r,t),this.b=Gr(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ke){function i(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const i=lh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return Kt.workingToColorSpace(Be.copy(this),t),Math.round(qt(Be.r*255,0,255))*65536+Math.round(qt(Be.g*255,0,255))*256+Math.round(qt(Be.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Be.copy(this),e);const i=Be.r,s=Be.g,r=Be.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=d<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=Ke){Kt.workingToColorSpace(Be.copy(this),t);const e=Be.r,i=Be.g,s=Be.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(Ds);const i=Ur($n.h,Ds.h,e),s=Ur($n.s,Ds.s,e),r=Ur($n.l,Ds.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Zt;Zt.NAMES=lh;class Cu extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const ln=new F,Cn=new F,Hr=new F,In=new F,Ui=new F,Ni=new F,Cl=new F,Vr=new F,Wr=new F,Xr=new F,Yr=new Se,qr=new Se,$r=new Se;class en{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),ln.subVectors(t,e),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){ln.subVectors(s,e),Cn.subVectors(i,e),Hr.subVectors(t,e);const a=ln.dot(ln),o=ln.dot(Cn),c=ln.dot(Hr),l=Cn.dot(Cn),d=Cn.dot(Hr),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,m=(l*c-o*d)*u,x=(a*d-o*c)*u;return r.set(1-m-x,x,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,In)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,In.x),c.addScaledVector(a,In.y),c.addScaledVector(o,In.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return Yr.setScalar(0),qr.setScalar(0),$r.setScalar(0),Yr.fromBufferAttribute(t,e),qr.fromBufferAttribute(t,i),$r.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Yr,r.x),a.addScaledVector(qr,r.y),a.addScaledVector($r,r.z),a}static isFrontFacing(t,e,i,s){return ln.subVectors(i,e),Cn.subVectors(t,e),ln.cross(Cn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),ln.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return en.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Ui.subVectors(s,i),Ni.subVectors(r,i),Vr.subVectors(t,i);const c=Ui.dot(Vr),l=Ni.dot(Vr);if(c<=0&&l<=0)return e.copy(i);Wr.subVectors(t,s);const d=Ui.dot(Wr),f=Ni.dot(Wr);if(d>=0&&f<=d)return e.copy(s);const u=c*f-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),e.copy(i).addScaledVector(Ui,a);Xr.subVectors(t,r);const m=Ui.dot(Xr),x=Ni.dot(Xr);if(x>=0&&m<=x)return e.copy(r);const S=m*l-c*x;if(S<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(i).addScaledVector(Ni,o);const g=d*x-m*f;if(g<=0&&f-d>=0&&m-x>=0)return Cl.subVectors(r,s),o=(f-d)/(f-d+(m-x)),e.copy(s).addScaledVector(Cl,o);const p=1/(g+S+u);return a=S*p,o=u*p,e.copy(i).addScaledVector(Ui,a).addScaledVector(Ni,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Es{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,cn):cn.fromBufferAttribute(r,a),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Us.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Us.copy(i.boundingBox)),Us.applyMatrix4(t.matrixWorld),this.union(Us)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rs),Ns.subVectors(this.max,rs),Fi.subVectors(t.a,rs),Oi.subVectors(t.b,rs),Bi.subVectors(t.c,rs),jn.subVectors(Oi,Fi),Kn.subVectors(Bi,Oi),hi.subVectors(Fi,Bi);let e=[0,-jn.z,jn.y,0,-Kn.z,Kn.y,0,-hi.z,hi.y,jn.z,0,-jn.x,Kn.z,0,-Kn.x,hi.z,0,-hi.x,-jn.y,jn.x,0,-Kn.y,Kn.x,0,-hi.y,hi.x,0];return!jr(e,Fi,Oi,Bi,Ns)||(e=[1,0,0,0,1,0,0,0,1],!jr(e,Fi,Oi,Bi,Ns))?!1:(Fs.crossVectors(jn,Kn),e=[Fs.x,Fs.y,Fs.z],jr(e,Fi,Oi,Bi,Ns))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Pn=[new F,new F,new F,new F,new F,new F,new F,new F],cn=new F,Us=new Es,Fi=new F,Oi=new F,Bi=new F,jn=new F,Kn=new F,hi=new F,rs=new F,Ns=new F,Fs=new F,di=new F;function jr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){di.fromArray(n,r);const o=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),c=t.dot(di),l=e.dot(di),d=i.dot(di);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const we=new F,Os=new Gt;let Iu=0;class En extends li{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Iu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ml,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Os.fromBufferAttribute(this,e),Os.applyMatrix3(t),this.setXY(e,Os.x,Os.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=is(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=He(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=is(e,this.array)),e}setX(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=is(e,this.array)),e}setY(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=is(e,this.array)),e}setZ(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=is(e,this.array)),e}setW(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),i=He(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),i=He(i,this.array),s=He(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),i=He(i,this.array),s=He(s,this.array),r=He(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ml&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class ch extends En{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class hh extends En{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Xe extends En{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Pu=new Es,as=new F,Kr=new F;class Sr{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Pu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;as.subVectors(t,this.center);const e=as.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(as,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Kr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(as.copy(t.center).add(Kr)),this.expandByPoint(as.copy(t.center).sub(Kr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Lu=0;const Qe=new ye,Zr=new Ne,ki=new F,je=new Es,os=new Es,De=new F;class an extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=ys(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hu(t)?hh:ch)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Bt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,i){return Qe.makeTranslation(t,e,i),this.applyMatrix4(Qe),this}scale(t,e,i){return Qe.makeScale(t,e,i),this.applyMatrix4(Qe),this}lookAt(t){return Zr.lookAt(t),Zr.updateMatrix(),this.applyMatrix4(Zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xe(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Es);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];je.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];os.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(je.min,os.min),je.expandByPoint(De),De.addVectors(je.max,os.max),je.expandByPoint(De)):(je.expandByPoint(os.min),je.expandByPoint(os.max))}je.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)De.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(De));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)De.fromBufferAttribute(o,l),c&&(ki.fromBufferAttribute(t,l),De.add(ki)),s=Math.max(s,i.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let M=0;M<i.count;M++)o[M]=new F,c[M]=new F;const l=new F,d=new F,f=new F,u=new Gt,m=new Gt,x=new Gt,S=new F,g=new F;function p(M,R,B){l.fromBufferAttribute(i,M),d.fromBufferAttribute(i,R),f.fromBufferAttribute(i,B),u.fromBufferAttribute(r,M),m.fromBufferAttribute(r,R),x.fromBufferAttribute(r,B),d.sub(l),f.sub(l),m.sub(u),x.sub(u);const I=1/(m.x*x.y-x.x*m.y);isFinite(I)&&(S.copy(d).multiplyScalar(x.y).addScaledVector(f,-m.y).multiplyScalar(I),g.copy(f).multiplyScalar(m.x).addScaledVector(d,-x.x).multiplyScalar(I),o[M].add(S),o[R].add(S),o[B].add(S),c[M].add(g),c[R].add(g),c[B].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let M=0,R=E.length;M<R;++M){const B=E[M],I=B.start,H=B.count;for(let q=I,j=I+H;q<j;q+=3)p(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const b=new F,w=new F,L=new F,T=new F;function P(M){L.fromBufferAttribute(s,M),T.copy(L);const R=o[M];b.copy(R),b.sub(L.multiplyScalar(L.dot(R))).normalize(),w.crossVectors(T,R);const I=w.dot(c[M])<0?-1:1;a.setXYZW(M,b.x,b.y,b.z,I)}for(let M=0,R=E.length;M<R;++M){const B=E[M],I=B.start,H=B.count;for(let q=I,j=I+H;q<j;q+=3)P(t.getX(q+0)),P(t.getX(q+1)),P(t.getX(q+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,d=new F,f=new F;if(t)for(let u=0,m=t.count;u<m;u+=3){const x=t.getX(u+0),S=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,g),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,g),o.add(d),c.add(d),l.add(d),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,c){const l=o.array,d=o.itemSize,f=o.normalized,u=new l.constructor(c.length*d);let m=0,x=0;for(let S=0,g=c.length;S<g;S++){o.isInterleavedBufferAttribute?m=c[S]*o.data.stride+o.offset:m=c[S]*d;for(let p=0;p<d;p++)u[x++]=l[m++]}return new En(u,d,f)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new an,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,f=l.length;d<f;d++){const u=l[d],m=t(u,i);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let f=0,u=l.length;f<u;f++){const m=l[f];d.push(m.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],f=r[l];for(let u=0,m=f.length;u<m;u++)d.push(f[u].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,d=a.length;l<d;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Du=0;class ts extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=ys(),this.name="",this.type="Material",this.blending=Yi,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ga,this.blendDst=_a,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(i.blending=this.blending),this.side!==ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ga&&(i.blendSrc=this.blendSrc),this.blendDst!==_a&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ji&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ln=new F,Jr=new F,Bs=new F,Zn=new F,Qr=new F,ks=new F,ta=new F;class Io{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Jr.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(Jr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Bs),o=Zn.dot(this.direction),c=-Zn.dot(Bs),l=Zn.lengthSq(),d=Math.abs(1-a*a);let f,u,m,x;if(d>0)if(f=a*c-o,u=a*o-c,x=r*d,f>=0)if(u>=-x)if(u<=x){const S=1/d;f*=S,u*=S,m=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;else u<=-x?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+u*(u+2*c)+l):u<=x?(f=0,u=Math.min(Math.max(-r,-c),r),m=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Jr).addScaledVector(Bs,u),m}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);const i=Ln.dot(this.direction),s=Ln.dot(Ln)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),d>=0?(r=(t.min.y-u.y)*d,a=(t.max.y-u.y)*d):(r=(t.max.y-u.y)*d,a=(t.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,i,s,r){Qr.subVectors(e,t),ks.subVectors(i,t),ta.crossVectors(Qr,ks);let a=this.direction.dot(ta),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,t);const c=o*this.direction.dot(ks.crossVectors(Zn,ks));if(c<0)return null;const l=o*this.direction.dot(Qr.cross(Zn));if(l<0||c+l>a)return null;const d=-o*Zn.dot(ta);return d<0?null:this.at(d/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dh extends ts{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Il=new ye,ui=new Io,zs=new Sr,Pl=new F,Gs=new F,Hs=new F,Vs=new F,ea=new F,Ws=new F,Ll=new F,Xs=new F;class Tn extends Ne{constructor(t=new an,e=new dh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ws.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],f=r[c];d!==0&&(ea.fromBufferAttribute(f,t),a?Ws.addScaledVector(ea,d):Ws.addScaledVector(ea.sub(e),d))}e.add(Ws)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(r),ui.copy(t.ray).recast(t.near),!(zs.containsPoint(ui.origin)===!1&&(ui.intersectSphere(zs,Pl)===null||ui.origin.distanceToSquared(Pl)>(t.far-t.near)**2))&&(Il.copy(r).invert(),ui.copy(t.ray).applyMatrix4(Il),!(i.boundingBox!==null&&ui.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=u.length;x<S;x++){const g=u[x],p=a[g.materialIndex],E=Math.max(g.start,m.start),b=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let w=E,L=b;w<L;w+=3){const T=o.getX(w),P=o.getX(w+1),M=o.getX(w+2);s=Ys(this,p,t,i,l,d,f,T,P,M),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let g=x,p=S;g<p;g+=3){const E=o.getX(g),b=o.getX(g+1),w=o.getX(g+2);s=Ys(this,a,t,i,l,d,f,E,b,w),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,S=u.length;x<S;x++){const g=u[x],p=a[g.materialIndex],E=Math.max(g.start,m.start),b=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let w=E,L=b;w<L;w+=3){const T=w,P=w+1,M=w+2;s=Ys(this,p,t,i,l,d,f,T,P,M),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),S=Math.min(c.count,m.start+m.count);for(let g=x,p=S;g<p;g+=3){const E=g,b=g+1,w=g+2;s=Ys(this,a,t,i,l,d,f,E,b,w),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Uu(n,t,e,i,s,r,a,o){let c;if(t.side===We?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===ri,o),c===null)return null;Xs.copy(o),Xs.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Xs);return l<e.near||l>e.far?null:{distance:l,point:Xs.clone(),object:n}}function Ys(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,Gs),n.getVertexPosition(c,Hs),n.getVertexPosition(l,Vs);const d=Uu(n,t,e,i,Gs,Hs,Vs,Ll);if(d){const f=new F;en.getBarycoord(Ll,Gs,Hs,Vs,f),s&&(d.uv=en.getInterpolatedAttribute(s,o,c,l,f,new Gt)),r&&(d.uv1=en.getInterpolatedAttribute(r,o,c,l,f,new Gt)),a&&(d.normal=en.getInterpolatedAttribute(a,o,c,l,f,new F),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new F,materialIndex:0};en.getNormal(Gs,Hs,Vs,u.normal),d.face=u,d.barycoord=f}return d}class Nu extends Ge{constructor(t=null,e=1,i=1,s,r,a,o,c,l=Ue,d=Ue,f,u){super(null,a,o,c,l,d,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const na=new F,Fu=new F,Ou=new Bt;class Qn{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=na.subVectors(i,e).cross(Fu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(na),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Ou.getNormalMatrix(t),s=this.coplanarPoint(na).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new Sr,Bu=new Gt(.5,.5),qs=new F;class Po{constructor(t=new Qn,e=new Qn,i=new Qn,s=new Qn,r=new Qn,a=new Qn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Mn,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],f=r[5],u=r[6],m=r[7],x=r[8],S=r[9],g=r[10],p=r[11],E=r[12],b=r[13],w=r[14],L=r[15];if(s[0].setComponents(l-a,m-d,p-x,L-E).normalize(),s[1].setComponents(l+a,m+d,p+x,L+E).normalize(),s[2].setComponents(l+o,m+f,p+S,L+b).normalize(),s[3].setComponents(l-o,m-f,p-S,L-b).normalize(),i)s[4].setComponents(c,u,g,w).normalize(),s[5].setComponents(l-c,m-u,p-g,L-w).normalize();else if(s[4].setComponents(l-c,m-u,p-g,L-w).normalize(),e===Mn)s[5].setComponents(l+c,m+u,p+g,L+w).normalize();else if(e===vs)s[5].setComponents(c,u,g,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){fi.center.set(0,0,0);const e=Bu.distanceTo(t.center);return fi.radius=.7071067811865476+e,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(qs.x=s.normal.x>0?t.max.x:t.min.x,qs.y=s.normal.y>0?t.max.y:t.min.y,qs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Lo extends ts{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _r=new F,xr=new F,Dl=new ye,ls=new Io,$s=new Sr,ia=new F,Ul=new F;class ku extends Ne{constructor(t=new an,e=new Lo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)_r.fromBufferAttribute(e,s-1),xr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=_r.distanceTo(xr);t.setAttribute("lineDistance",new Xe(i,1))}else Ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$s.copy(i.boundingSphere),$s.applyMatrix4(s),$s.radius+=r,t.ray.intersectsSphere($s)===!1)return;Dl.copy(s).invert(),ls.copy(t.ray).applyMatrix4(Dl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const m=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let S=m,g=x-1;S<g;S+=l){const p=d.getX(S),E=d.getX(S+1),b=js(this,t,ls,c,p,E,S);b&&e.push(b)}if(this.isLineLoop){const S=d.getX(x-1),g=d.getX(m),p=js(this,t,ls,c,S,g,x-1);p&&e.push(p)}}else{const m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let S=m,g=x-1;S<g;S+=l){const p=js(this,t,ls,c,S,S+1,S);p&&e.push(p)}if(this.isLineLoop){const S=js(this,t,ls,c,x-1,m,x-1);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function js(n,t,e,i,s,r,a){const o=n.geometry.attributes.position;if(_r.fromBufferAttribute(o,s),xr.fromBufferAttribute(o,r),e.distanceSqToSegment(_r,xr,ia,Ul)>i)return;ia.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ia);if(!(l<t.near||l>t.far))return{distance:l,point:Ul.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Nl=new F,Fl=new F;class uh extends ku{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Nl.fromBufferAttribute(e,s),Fl.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Nl.distanceTo(Fl);t.setAttribute("lineDistance",new Xe(i,1))}else Ct("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fh extends Ge{constructor(t=[],e=Ti,i,s,r,a,o,c,l,d){super(t,e,i,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zi extends Ge{constructor(t,e,i=bn,s,r,a,o=Ue,c=Ue,l,d=Hn,f=1){if(d!==Hn&&d!==xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:f};super(u,s,r,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Co(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class zu extends Zi{constructor(t,e=bn,i=Ti,s,r,a=Ue,o=Ue,c,l=Hn){const d={width:t,height:t,depth:1},f=[d,d,d,d,d,d];super(t,t,e,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class ph extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class es extends an{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],f=[];let u=0,m=0;x("z","y","x",-1,-1,i,e,t,a,r,0),x("z","y","x",1,-1,i,e,-t,a,r,1),x("x","z","y",1,1,t,i,e,s,a,2),x("x","z","y",1,-1,t,i,-e,s,a,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(d,3)),this.setAttribute("uv",new Xe(f,2));function x(S,g,p,E,b,w,L,T,P,M,R){const B=w/P,I=L/M,H=w/2,q=L/2,j=T/2,O=P+1,W=M+1;let X=0,et=0;const nt=new F;for(let ft=0;ft<W;ft++){const yt=ft*I-q;for(let wt=0;wt<O;wt++){const Jt=wt*B-H;nt[S]=Jt*E,nt[g]=yt*b,nt[p]=j,l.push(nt.x,nt.y,nt.z),nt[S]=0,nt[g]=0,nt[p]=T>0?1:-1,d.push(nt.x,nt.y,nt.z),f.push(wt/P),f.push(1-ft/M),X+=1}}for(let ft=0;ft<M;ft++)for(let yt=0;yt<P;yt++){const wt=u+yt+O*ft,Jt=u+yt+O*(ft+1),se=u+(yt+1)+O*(ft+1),Ht=u+(yt+1)+O*ft;c.push(wt,Jt,Ht),c.push(Jt,se,Ht),et+=6}o.addGroup(m,et,R),m+=et,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new es(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const Ks=new F,Zs=new F,sa=new F,Js=new en;class Gu extends an{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ms*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],d=["a","b","c"],f=new Array(3),u={},m=[];for(let x=0;x<c;x+=3){a?(l[0]=a.getX(x),l[1]=a.getX(x+1),l[2]=a.getX(x+2)):(l[0]=x,l[1]=x+1,l[2]=x+2);const{a:S,b:g,c:p}=Js;if(S.fromBufferAttribute(o,l[0]),g.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),Js.getNormal(sa),f[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,f[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,f[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let E=0;E<3;E++){const b=(E+1)%3,w=f[E],L=f[b],T=Js[d[E]],P=Js[d[b]],M=`${w}_${L}`,R=`${L}_${w}`;R in u&&u[R]?(sa.dot(u[R].normal)<=r&&(m.push(T.x,T.y,T.z),m.push(P.x,P.y,P.z)),u[R]=null):M in u||(u[M]={index0:l[E],index1:l[b],normal:sa.clone()})}}for(const x in u)if(u[x]){const{index0:S,index1:g}=u[x];Ks.fromBufferAttribute(o,S),Zs.fromBufferAttribute(o,g),m.push(Ks.x,Ks.y,Ks.z),m.push(Zs.x,Zs.y,Zs.z)}this.setAttribute("position",new Xe(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class yr extends an{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,d=c+1,f=t/o,u=e/c,m=[],x=[],S=[],g=[];for(let p=0;p<d;p++){const E=p*u-a;for(let b=0;b<l;b++){const w=b*f-r;x.push(w,-E,0),S.push(0,0,1),g.push(b/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){const b=E+l*p,w=E+l*(p+1),L=E+1+l*(p+1),T=E+1+l*p;m.push(b,w,T),m.push(w,L,T)}this.setIndex(m),this.setAttribute("position",new Xe(x,3)),this.setAttribute("normal",new Xe(S,3)),this.setAttribute("uv",new Xe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yr(t.width,t.height,t.widthSegments,t.heightSegments)}}function Ji(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(Ol(s))s.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Ol(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function ze(n){const t={};for(let e=0;e<n.length;e++){const i=Ji(n[e]);for(const s in i)t[s]=i[s]}return t}function Ol(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Hu(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function mh(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const Vu={clone:Ji,merge:ze};var Wu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends ts{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wu,this.fragmentShader=Xu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ji(t.uniforms),this.uniformsGroups=Hu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Yu extends An{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class qu extends ts{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=io,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $u extends ts{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ju extends ts{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class gh extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const ra=new ye,Bl=new F,kl=new F;class Ku{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.mapType=Ze,this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Po,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Bl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Bl),kl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kl),e.updateMatrixWorld(),ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===vs||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ra)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Qs=new F,tr=new ai,mn=new F;class _h extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Qs,tr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qs,tr,mn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Qs,tr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qs,tr,mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new F,zl=new Gt,Gl=new Gt;class hn extends _h{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ro*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ro*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z)}getViewSize(t,e){return this.getViewBounds(t,zl,Gl),e.subVectors(Gl,zl)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ms*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Er extends _h{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Zu extends Ku{constructor(){super(new Er(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hl extends gh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new Zu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Ju extends gh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const zi=-90,Gi=1;class Qu extends Ne{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(zi,Gi,t,e);s.layers=this.layers,this.add(s);const r=new hn(zi,Gi,t,e);r.layers=this.layers,this.add(r);const a=new hn(zi,Gi,t,e);a.layers=this.layers,this.add(a);const o=new hn(zi,Gi,t,e);o.layers=this.layers,this.add(o);const c=new hn(zi,Gi,t,e);c.layers=this.layers,this.add(c);const l=new hn(zi,Gi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(f,u,m),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class tf extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Vl{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Zo=class Zo{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Zo.prototype.isMatrix2=!0;let Wl=Zo;class ef extends uh{constructor(t=10,e=10,i=4473924,s=8947848){i=new Zt(i),s=new Zt(s);const r=e/2,a=t/e,o=t/2,c=[],l=[];for(let u=0,m=0,x=-o;u<=e;u++,x+=a){c.push(-o,0,x,o,0,x),c.push(x,0,-o,x,0,o);const S=u===r?i:s;S.toArray(l,m),m+=3,S.toArray(l,m),m+=3,S.toArray(l,m),m+=3,S.toArray(l,m),m+=3}const d=new an;d.setAttribute("position",new Xe(c,3)),d.setAttribute("color",new Xe(l,3));const f=new Lo({vertexColors:!0,toneMapped:!1});super(d,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class nf extends li{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ct("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Xl(n,t,e,i){const s=sf(i);switch(e){case nh:return n*t;case sh:return n*t/s.components*s.byteLength;case bo:return n*t/s.components*s.byteLength;case Ai:return n*t*2/s.components*s.byteLength;case To:return n*t*2/s.components*s.byteLength;case ih:return n*t*3/s.components*s.byteLength;case dn:return n*t*4/s.components*s.byteLength;case Ao:return n*t*4/s.components*s.byteLength;case ar:case or:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case lr:case cr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ra:case Ia:return Math.max(n,16)*Math.max(t,8)/4;case wa:case Ca:return Math.max(n,8)*Math.max(t,8)/2;case Pa:case La:case Ua:case Na:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Da:case ur:case Fa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ka:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case za:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ha:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Va:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case qa:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case $a:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ja:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ka:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Za:case Ja:case Qa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case to:case eo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case fr:case no:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function sf(n){switch(n){case Ze:case Jc:return{byteLength:1,components:1};case _s:case Qc:case Gn:return{byteLength:2,components:1};case yo:case Eo:return{byteLength:2,components:4};case bn:case So:case vn:return{byteLength:4,components:1};case th:case eh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mo}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xh(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function rf(n){const t=new WeakMap;function e(o,c){const l=o.array,d=o.usage,f=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const d=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,d);else{f.sort((m,x)=>m.start-x.start);let u=0;for(let m=1;m<f.length;m++){const x=f[u],S=f[m];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++u,f[u]=S)}f.length=u+1;for(let m=0,x=f.length;m<x;m++){const S=f[m];n.bufferSubData(l,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var af=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,of=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,df=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ff=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,mf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_f=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Af=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,wf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Cf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,If=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Pf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Df=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ff="gl_FragColor = linearToOutputTexel( gl_FragColor );",Of=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,zf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$f=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Jf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Qf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ep=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,np=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ip=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ap=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,op=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,cp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,up=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_p=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Mp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Up=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Np=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Fp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Op=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Vp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$p=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Kp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,em=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const am=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,om=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_m=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Em=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Am=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Im=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Pm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Um=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Nm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Om=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,km=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:af,alphahash_pars_fragment:of,alphamap_fragment:lf,alphamap_pars_fragment:cf,alphatest_fragment:hf,alphatest_pars_fragment:df,aomap_fragment:uf,aomap_pars_fragment:ff,batching_pars_vertex:pf,batching_vertex:mf,begin_vertex:gf,beginnormal_vertex:_f,bsdfs:xf,iridescence_fragment:vf,bumpmap_pars_fragment:Mf,clipping_planes_fragment:Sf,clipping_planes_pars_fragment:yf,clipping_planes_pars_vertex:Ef,clipping_planes_vertex:bf,color_fragment:Tf,color_pars_fragment:Af,color_pars_vertex:wf,color_vertex:Rf,common:Cf,cube_uv_reflection_fragment:If,defaultnormal_vertex:Pf,displacementmap_pars_vertex:Lf,displacementmap_vertex:Df,emissivemap_fragment:Uf,emissivemap_pars_fragment:Nf,colorspace_fragment:Ff,colorspace_pars_fragment:Of,envmap_fragment:Bf,envmap_common_pars_fragment:kf,envmap_pars_fragment:zf,envmap_pars_vertex:Gf,envmap_physical_pars_fragment:Jf,envmap_vertex:Hf,fog_vertex:Vf,fog_pars_vertex:Wf,fog_fragment:Xf,fog_pars_fragment:Yf,gradientmap_pars_fragment:qf,lightmap_pars_fragment:$f,lights_lambert_fragment:jf,lights_lambert_pars_fragment:Kf,lights_pars_begin:Zf,lights_toon_fragment:Qf,lights_toon_pars_fragment:tp,lights_phong_fragment:ep,lights_phong_pars_fragment:np,lights_physical_fragment:ip,lights_physical_pars_fragment:sp,lights_fragment_begin:rp,lights_fragment_maps:ap,lights_fragment_end:op,lightprobes_pars_fragment:lp,logdepthbuf_fragment:cp,logdepthbuf_pars_fragment:hp,logdepthbuf_pars_vertex:dp,logdepthbuf_vertex:up,map_fragment:fp,map_pars_fragment:pp,map_particle_fragment:mp,map_particle_pars_fragment:gp,metalnessmap_fragment:_p,metalnessmap_pars_fragment:xp,morphinstance_vertex:vp,morphcolor_vertex:Mp,morphnormal_vertex:Sp,morphtarget_pars_vertex:yp,morphtarget_vertex:Ep,normal_fragment_begin:bp,normal_fragment_maps:Tp,normal_pars_fragment:Ap,normal_pars_vertex:wp,normal_vertex:Rp,normalmap_pars_fragment:Cp,clearcoat_normal_fragment_begin:Ip,clearcoat_normal_fragment_maps:Pp,clearcoat_pars_fragment:Lp,iridescence_pars_fragment:Dp,opaque_fragment:Up,packing:Np,premultiplied_alpha_fragment:Fp,project_vertex:Op,dithering_fragment:Bp,dithering_pars_fragment:kp,roughnessmap_fragment:zp,roughnessmap_pars_fragment:Gp,shadowmap_pars_fragment:Hp,shadowmap_pars_vertex:Vp,shadowmap_vertex:Wp,shadowmask_pars_fragment:Xp,skinbase_vertex:Yp,skinning_pars_vertex:qp,skinning_vertex:$p,skinnormal_vertex:jp,specularmap_fragment:Kp,specularmap_pars_fragment:Zp,tonemapping_fragment:Jp,tonemapping_pars_fragment:Qp,transmission_fragment:tm,transmission_pars_fragment:em,uv_pars_fragment:nm,uv_pars_vertex:im,uv_vertex:sm,worldpos_vertex:rm,background_vert:am,background_frag:om,backgroundCube_vert:lm,backgroundCube_frag:cm,cube_vert:hm,cube_frag:dm,depth_vert:um,depth_frag:fm,distance_vert:pm,distance_frag:mm,equirect_vert:gm,equirect_frag:_m,linedashed_vert:xm,linedashed_frag:vm,meshbasic_vert:Mm,meshbasic_frag:Sm,meshlambert_vert:ym,meshlambert_frag:Em,meshmatcap_vert:bm,meshmatcap_frag:Tm,meshnormal_vert:Am,meshnormal_frag:wm,meshphong_vert:Rm,meshphong_frag:Cm,meshphysical_vert:Im,meshphysical_frag:Pm,meshtoon_vert:Lm,meshtoon_frag:Dm,points_vert:Um,points_frag:Nm,shadow_vert:Fm,shadow_frag:Om,sprite_vert:Bm,sprite_frag:km},ut={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},_n={basic:{uniforms:ze([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:ze([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Zt(0)},envMapIntensity:{value:1}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:ze([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:ze([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:ze([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:ze([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:ze([ut.points,ut.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:ze([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:ze([ut.common,ut.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:ze([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:ze([ut.sprite,ut.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distance:{uniforms:ze([ut.common,ut.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distance_vert,fragmentShader:Wt.distance_frag},shadow:{uniforms:ze([ut.lights,ut.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};_n.physical={uniforms:ze([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const er={r:0,b:0,g:0},zm=new ye,vh=new Bt;vh.set(-1,0,0,0,1,0,0,0,1);function Gm(n,t,e,i,s,r){const a=new Zt(0);let o=s===!0?0:1,c,l,d=null,f=0,u=null;function m(E){let b=E.isScene===!0?E.background:null;if(b&&b.isTexture){const w=E.backgroundBlurriness>0;b=t.get(b,w)}return b}function x(E){let b=!1;const w=m(E);w===null?g(a,o):w&&w.isColor&&(g(w,1),b=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?e.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(E,b){const w=m(b);w&&(w.isCubeTexture||w.mapping===Mr)?(l===void 0&&(l=new Tn(new es(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Ji(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(L,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=w,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(zm.makeRotationFromEuler(b.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(vh),l.material.toneMapped=Kt.getTransfer(w.colorSpace)!==ie,(d!==w||f!==w.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Tn(new yr(2,2),new An({name:"BackgroundMaterial",uniforms:Ji(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(w.colorSpace)!==ie,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||f!==w.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,b){E.getRGB(er,mh(n)),e.buffers.color.setClear(er.r,er.g,er.b,b,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,b=1){a.set(E),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:x,addToRenderList:S,dispose:p}}function Hm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(I,H,q,j,O){let W=!1;const X=f(I,j,q,H);r!==X&&(r=X,l(r.object)),W=m(I,j,q,O),W&&x(I,j,q,O),O!==null&&t.update(O,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,w(I,H,q,j),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return n.createVertexArray()}function l(I){return n.bindVertexArray(I)}function d(I){return n.deleteVertexArray(I)}function f(I,H,q,j){const O=j.wireframe===!0;let W=i[H.id];W===void 0&&(W={},i[H.id]=W);const X=I.isInstancedMesh===!0?I.id:0;let et=W[X];et===void 0&&(et={},W[X]=et);let nt=et[q.id];nt===void 0&&(nt={},et[q.id]=nt);let ft=nt[O];return ft===void 0&&(ft=u(c()),nt[O]=ft),ft}function u(I){const H=[],q=[],j=[];for(let O=0;O<e;O++)H[O]=0,q[O]=0,j[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:q,attributeDivisors:j,object:I,attributes:{},index:null}}function m(I,H,q,j){const O=r.attributes,W=H.attributes;let X=0;const et=q.getAttributes();for(const nt in et)if(et[nt].location>=0){const yt=O[nt];let wt=W[nt];if(wt===void 0&&(nt==="instanceMatrix"&&I.instanceMatrix&&(wt=I.instanceMatrix),nt==="instanceColor"&&I.instanceColor&&(wt=I.instanceColor)),yt===void 0||yt.attribute!==wt||wt&&yt.data!==wt.data)return!0;X++}return r.attributesNum!==X||r.index!==j}function x(I,H,q,j){const O={},W=H.attributes;let X=0;const et=q.getAttributes();for(const nt in et)if(et[nt].location>=0){let yt=W[nt];yt===void 0&&(nt==="instanceMatrix"&&I.instanceMatrix&&(yt=I.instanceMatrix),nt==="instanceColor"&&I.instanceColor&&(yt=I.instanceColor));const wt={};wt.attribute=yt,yt&&yt.data&&(wt.data=yt.data),O[nt]=wt,X++}r.attributes=O,r.attributesNum=X,r.index=j}function S(){const I=r.newAttributes;for(let H=0,q=I.length;H<q;H++)I[H]=0}function g(I){p(I,0)}function p(I,H){const q=r.newAttributes,j=r.enabledAttributes,O=r.attributeDivisors;q[I]=1,j[I]===0&&(n.enableVertexAttribArray(I),j[I]=1),O[I]!==H&&(n.vertexAttribDivisor(I,H),O[I]=H)}function E(){const I=r.newAttributes,H=r.enabledAttributes;for(let q=0,j=H.length;q<j;q++)H[q]!==I[q]&&(n.disableVertexAttribArray(q),H[q]=0)}function b(I,H,q,j,O,W,X){X===!0?n.vertexAttribIPointer(I,H,q,O,W):n.vertexAttribPointer(I,H,q,j,O,W)}function w(I,H,q,j){S();const O=j.attributes,W=q.getAttributes(),X=H.defaultAttributeValues;for(const et in W){const nt=W[et];if(nt.location>=0){let ft=O[et];if(ft===void 0&&(et==="instanceMatrix"&&I.instanceMatrix&&(ft=I.instanceMatrix),et==="instanceColor"&&I.instanceColor&&(ft=I.instanceColor)),ft!==void 0){const yt=ft.normalized,wt=ft.itemSize,Jt=t.get(ft);if(Jt===void 0)continue;const se=Jt.buffer,Ht=Jt.type,J=Jt.bytesPerElement,gt=Ht===n.INT||Ht===n.UNSIGNED_INT||ft.gpuType===So;if(ft.isInterleavedBufferAttribute){const ot=ft.data,It=ot.stride,Ot=ft.offset;if(ot.isInstancedInterleavedBuffer){for(let Pt=0;Pt<nt.locationSize;Pt++)p(nt.location+Pt,ot.meshPerAttribute);I.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Pt=0;Pt<nt.locationSize;Pt++)g(nt.location+Pt);n.bindBuffer(n.ARRAY_BUFFER,se);for(let Pt=0;Pt<nt.locationSize;Pt++)b(nt.location+Pt,wt/nt.locationSize,Ht,yt,It*J,(Ot+wt/nt.locationSize*Pt)*J,gt)}else{if(ft.isInstancedBufferAttribute){for(let ot=0;ot<nt.locationSize;ot++)p(nt.location+ot,ft.meshPerAttribute);I.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let ot=0;ot<nt.locationSize;ot++)g(nt.location+ot);n.bindBuffer(n.ARRAY_BUFFER,se);for(let ot=0;ot<nt.locationSize;ot++)b(nt.location+ot,wt/nt.locationSize,Ht,yt,wt*J,wt/nt.locationSize*ot*J,gt)}}else if(X!==void 0){const yt=X[et];if(yt!==void 0)switch(yt.length){case 2:n.vertexAttrib2fv(nt.location,yt);break;case 3:n.vertexAttrib3fv(nt.location,yt);break;case 4:n.vertexAttrib4fv(nt.location,yt);break;default:n.vertexAttrib1fv(nt.location,yt)}}}}E()}function L(){R();for(const I in i){const H=i[I];for(const q in H){const j=H[q];for(const O in j){const W=j[O];for(const X in W)d(W[X].object),delete W[X];delete j[O]}}delete i[I]}}function T(I){if(i[I.id]===void 0)return;const H=i[I.id];for(const q in H){const j=H[q];for(const O in j){const W=j[O];for(const X in W)d(W[X].object),delete W[X];delete j[O]}}delete i[I.id]}function P(I){for(const H in i){const q=i[H];for(const j in q){const O=q[j];if(O[I.id]===void 0)continue;const W=O[I.id];for(const X in W)d(W[X].object),delete W[X];delete O[I.id]}}}function M(I){for(const H in i){const q=i[H],j=I.isInstancedMesh===!0?I.id:0,O=q[j];if(O!==void 0){for(const W in O){const X=O[W];for(const et in X)d(X[et].object),delete X[et];delete O[W]}delete q[j],Object.keys(q).length===0&&delete i[H]}}}function R(){B(),a=!0,r!==s&&(r=s,l(r.object))}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:B,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfObject:M,releaseStatesOfProgram:P,initAttributes:S,enableAttribute:g,disableUnusedAttributes:E}}function Vm(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),e.update(l,i,d))}function o(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let m=0;m<d;m++)u+=l[m];e.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Wm(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==dn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const M=P===Gn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Ze&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==vn&&!M)}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Ct("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:w,maxSamples:L,samples:T}}function Xm(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Qn,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const m=f.length!==0||u||i!==0||s;return s=u,i=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=d(f,u,0)},this.setState=function(f,u,m){const x=f.clippingPlanes,S=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!s||x===null||x.length===0||r&&!g)r?d(null):l();else{const E=r?0:i,b=E*4;let w=p.clippingState||null;c.value=w,w=d(x,u,b,m);for(let L=0;L!==b;++L)w[L]=e[L];p.clippingState=w,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(f,u,m,x){const S=f!==null?f.length:0;let g=null;if(S!==0){if(g=c.value,x!==!0||g===null){const p=m+S*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,w=m;b!==S;++b,w+=4)a.copy(f[b]).applyMatrix4(E,o),a.normal.toArray(g,w),g[w+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,g}}const ii=4,Yl=[.125,.215,.35,.446,.526,.582],gi=20,Ym=256,cs=new Er,ql=new Zt;let aa=null,oa=0,la=0,ca=!1;const qm=new F;class $l{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=qm}=r;aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(aa,oa,la),this._renderer.xr.enabled=ca,t.scissorTest=!1,Hi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ti||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ke,minFilter:ke,generateMipmaps:!1,type:Gn,format:dn,colorSpace:pr,depthBuffer:!1},s=jl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jl(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=$m(r)),this._blurMaterial=Km(r,t,e),this._ggxMaterial=jm(r,t,e)}return s}_compileMaterial(t){const e=new Tn(new an,t);this._renderer.compile(e,cs)}_sceneToCubeUV(t,e,i,s,r){const c=new hn(90,1,e,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,m=f.toneMapping;f.getClearColor(ql),f.toneMapping=Sn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Tn(new es,new dh({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,g=S.material;let p=!1;const E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,p=!0):(g.color.copy(ql),p=!0);for(let b=0;b<6;b++){const w=b%3;w===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[b],r.y,r.z)):w===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[b]));const L=this._cubeSize;Hi(s,w*L,b>2?L:0,L,L),f.setRenderTarget(s),p&&f.render(S,c),f.render(t,c)}f.toneMapping=m,f.autoClear=u,t.background=E}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ti||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Hi(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,cs)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-d*d),u=0+l*1.25,m=f*u,{_lodMax:x}=this,S=this._sizeLods[i],g=3*S*(i>x-ii?i-x+ii:0),p=4*(this._cubeSize-S);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=x-e,Hi(r,g,p,3*S,2*S),s.setRenderTarget(r),s.render(o,cs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-i,Hi(t,g,p,3*S,2*S),s.setRenderTarget(t),s.render(o,cs)}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&te("blur direction must be either latitudinal or longitudinal!");const d=3,f=this._lodMeshes[s];f.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*gi-1),S=r/x,g=isFinite(r)?1+Math.floor(d*S):gi;g>gi&&Ct(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gi}`);const p=[];let E=0;for(let P=0;P<gi;++P){const M=P/S,R=Math.exp(-M*M/2);p.push(R),P===0?E+=R:P<g&&(E+=2*R)}for(let P=0;P<p.length;P++)p[P]=p[P]/E;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=x,u.mipInt.value=b-i;const w=this._sizeLods[s],L=3*w*(s>b-ii?s-b+ii:0),T=4*(this._cubeSize-w);Hi(e,L,T,3*w,2*w),c.setRenderTarget(e),c.render(f,cs)}}function $m(n){const t=[],e=[],i=[];let s=n;const r=n-ii+1+Yl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>n-ii?c=Yl[a-n+ii-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),d=-l,f=1+l,u=[d,d,f,d,f,f,d,d,f,f,d,f],m=6,x=6,S=3,g=2,p=1,E=new Float32Array(S*x*m),b=new Float32Array(g*x*m),w=new Float32Array(p*x*m);for(let T=0;T<m;T++){const P=T%3*2/3-1,M=T>2?0:-1,R=[P,M,0,P+2/3,M,0,P+2/3,M+1,0,P,M,0,P+2/3,M+1,0,P,M+1,0];E.set(R,S*x*T),b.set(u,g*x*T);const B=[T,T,T,T,T,T];w.set(B,p*x*T)}const L=new an;L.setAttribute("position",new En(E,S)),L.setAttribute("uv",new En(b,g)),L.setAttribute("faceIndex",new En(w,p)),i.push(new Tn(L,null)),s>ii&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function jl(n,t,e){const i=new yn(n,t,e);return i.texture.mapping=Mr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hi(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function jm(n,t,e){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ym,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:br(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Km(n,t,e){const i=new Float32Array(gi),s=new F(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Kl(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Zl(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function br(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Mh extends yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new fh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new es(5,5,5),r=new An({name:"CubemapFromEquirect",uniforms:Ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:We,blending:Bn});r.uniforms.tEquirect.value=e;const a=new Tn(s,r),o=e.minFilter;return e.minFilter===_i&&(e.minFilter=ke),new Qu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}function Zm(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){const m=u.mapping;if(m===Pr||m===Lr)if(t.has(u)){const x=t.get(u).texture;return o(x,u.mapping)}else{const x=u.image;if(x&&x.height>0){const S=new Mh(x.height);return S.fromEquirectangularTexture(n,u),t.set(u,S),u.addEventListener("dispose",l),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,x=m===Pr||m===Lr,S=m===Ti||m===Ki;if(x||S){let g=e.get(u);const p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new $l(n)),g=x?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const E=u.image;return x&&E&&E.height>0||S&&E&&c(E)?(i===null&&(i=new $l(n)),g=x?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",d),g.texture):null}}}return u}function o(u,m){return m===Pr?u.mapping=Ti:m===Lr&&(u.mapping=Ki),u}function c(u){let m=0;const x=6;for(let S=0;S<x;S++)u[S]!==void 0&&m++;return m===x}function l(u){const m=u.target;m.removeEventListener("dispose",l);const x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Jm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&so("WebGLRenderer: "+i+" extension not supported."),s}}}function Qm(n,t,e,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const x in u.attributes)t.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete s[u.id];const m=r.get(u);m&&(t.remove(m),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(f){const u=f.attributes;for(const m in u)t.update(u[m],n.ARRAY_BUFFER)}function l(f){const u=[],m=f.index,x=f.attributes.position;let S=0;if(x===void 0)return;if(m!==null){const E=m.array;S=m.version;for(let b=0,w=E.length;b<w;b+=3){const L=E[b+0],T=E[b+1],P=E[b+2];u.push(L,T,T,P,P,L)}}else{const E=x.array;S=x.version;for(let b=0,w=E.length/3-1;b<w;b+=3){const L=b+0,T=b+1,P=b+2;u.push(L,T,T,P,P,L)}}const g=new(x.count>=65535?hh:ch)(u,1);g.version=S;const p=r.get(f);p&&t.remove(p),r.set(f,g)}function d(f){const u=r.get(f);if(u){const m=f.index;m!==null&&u.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:d}}function tg(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){n.drawElements(i,u,r,f*a),e.update(u,i,1)}function l(f,u,m){m!==0&&(n.drawElementsInstanced(i,u,r,f*a,m),e.update(u,i,m))}function d(f,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,m);let S=0;for(let g=0;g<m;g++)S+=u[g];e.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function eg(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:te("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function ng(n,t,e){const i=new WeakMap,s=new Se;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let R=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let b=0;m===!0&&(b=1),x===!0&&(b=2),S===!0&&(b=3);let w=o.attributes.position.count*b,L=1;w>t.maxTextureSize&&(L=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const T=new Float32Array(w*L*4*f),P=new ah(T,w,L,f);P.type=vn,P.needsUpdate=!0;const M=b*4;for(let B=0;B<f;B++){const I=g[B],H=p[B],q=E[B],j=w*L*4*B;for(let O=0;O<I.count;O++){const W=O*M;m===!0&&(s.fromBufferAttribute(I,O),T[j+W+0]=s.x,T[j+W+1]=s.y,T[j+W+2]=s.z,T[j+W+3]=0),x===!0&&(s.fromBufferAttribute(H,O),T[j+W+4]=s.x,T[j+W+5]=s.y,T[j+W+6]=s.z,T[j+W+7]=0),S===!0&&(s.fromBufferAttribute(q,O),T[j+W+8]=s.x,T[j+W+9]=s.y,T[j+W+10]=s.z,T[j+W+11]=q.itemSize===4?s.w:1)}}u={count:f,texture:P,size:new Gt(w,L)},i.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let m=0;for(let S=0;S<l.length;S++)m+=l[S];const x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function ig(n,t,e,i,s){let r=new WeakMap;function a(l){const d=s.render.frame,f=l.geometry,u=t.get(l,f);if(r.get(u)!==d&&(t.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return u}function o(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:o}}const sg={[Wc]:"LINEAR_TONE_MAPPING",[Xc]:"REINHARD_TONE_MAPPING",[Yc]:"CINEON_TONE_MAPPING",[qc]:"ACES_FILMIC_TONE_MAPPING",[jc]:"AGX_TONE_MAPPING",[Kc]:"NEUTRAL_TONE_MAPPING",[$c]:"CUSTOM_TONE_MAPPING"};function rg(n,t,e,i,s){const r=new yn(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new Zi(t,e):void 0}),a=new yn(t,e,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),o=new an;o.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Xe([0,2,0,0,2,0],2));const c=new Yu({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new Tn(o,c),d=new Er(-1,1,1,-1,0,1);let f=null,u=null,m=!1,x,S=null,g=[],p=!1;this.setSize=function(E,b){r.setSize(E,b),a.setSize(E,b);for(let w=0;w<g.length;w++){const L=g[w];L.setSize&&L.setSize(E,b)}},this.setEffects=function(E){g=E,p=g.length>0&&g[0].isRenderPass===!0;const b=r.width,w=r.height;for(let L=0;L<g.length;L++){const T=g[L];T.setSize&&T.setSize(b,w)}},this.begin=function(E,b){if(m||E.toneMapping===Sn&&g.length===0)return!1;if(S=b,b!==null){const w=b.width,L=b.height;(r.width!==w||r.height!==L)&&this.setSize(w,L)}return p===!1&&E.setRenderTarget(r),x=E.toneMapping,E.toneMapping=Sn,!0},this.hasRenderPass=function(){return p},this.end=function(E,b){E.toneMapping=x,m=!0;let w=r,L=a;for(let T=0;T<g.length;T++){const P=g[T];if(P.enabled!==!1&&(P.render(E,L,w,b),P.needsSwap!==!1)){const M=w;w=L,L=M}}if(f!==E.outputColorSpace||u!==E.toneMapping){f=E.outputColorSpace,u=E.toneMapping,c.defines={},Kt.getTransfer(f)===ie&&(c.defines.SRGB_TRANSFER="");const T=sg[u];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(S),E.render(l,d),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Sh=new Ge,ao=new Zi(1,1),yh=new ah,Eh=new Su,bh=new fh,Jl=[],Ql=[],tc=new Float32Array(16),ec=new Float32Array(9),nc=new Float32Array(4);function ns(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Jl[s];if(r===void 0&&(r=new Float32Array(s),Jl[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Le(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Tr(n,t){let e=Ql[t];e===void 0&&(e=new Int32Array(t),Ql[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function ag(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2fv(this.addr,t),Le(e,t)}}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;n.uniform3fv(this.addr,t),Le(e,t)}}function cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4fv(this.addr,t),Le(e,t)}}function hg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;nc.set(i),n.uniformMatrix2fv(this.addr,!1,nc),Le(e,i)}}function dg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;ec.set(i),n.uniformMatrix3fv(this.addr,!1,ec),Le(e,i)}}function ug(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;tc.set(i),n.uniformMatrix4fv(this.addr,!1,tc),Le(e,i)}}function fg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function pg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2iv(this.addr,t),Le(e,t)}}function mg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3iv(this.addr,t),Le(e,t)}}function gg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4iv(this.addr,t),Le(e,t)}}function _g(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function xg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2uiv(this.addr,t),Le(e,t)}}function vg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3uiv(this.addr,t),Le(e,t)}}function Mg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4uiv(this.addr,t),Le(e,t)}}function Sg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ao.compareFunction=e.isReversedDepthBuffer()?Ro:wo,r=ao):r=Sh,e.setTexture2D(t||r,s)}function yg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Eh,s)}function Eg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||bh,s)}function bg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||yh,s)}function Tg(n){switch(n){case 5126:return ag;case 35664:return og;case 35665:return lg;case 35666:return cg;case 35674:return hg;case 35675:return dg;case 35676:return ug;case 5124:case 35670:return fg;case 35667:case 35671:return pg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return _g;case 36294:return xg;case 36295:return vg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return bg}}function Ag(n,t){n.uniform1fv(this.addr,t)}function wg(n,t){const e=ns(t,this.size,2);n.uniform2fv(this.addr,e)}function Rg(n,t){const e=ns(t,this.size,3);n.uniform3fv(this.addr,e)}function Cg(n,t){const e=ns(t,this.size,4);n.uniform4fv(this.addr,e)}function Ig(n,t){const e=ns(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Pg(n,t){const e=ns(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Lg(n,t){const e=ns(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Dg(n,t){n.uniform1iv(this.addr,t)}function Ug(n,t){n.uniform2iv(this.addr,t)}function Ng(n,t){n.uniform3iv(this.addr,t)}function Fg(n,t){n.uniform4iv(this.addr,t)}function Og(n,t){n.uniform1uiv(this.addr,t)}function Bg(n,t){n.uniform2uiv(this.addr,t)}function kg(n,t){n.uniform3uiv(this.addr,t)}function zg(n,t){n.uniform4uiv(this.addr,t)}function Gg(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ao:a=Sh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Hg(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Eh,r[a])}function Vg(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||bh,r[a])}function Wg(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||yh,r[a])}function Xg(n){switch(n){case 5126:return Ag;case 35664:return wg;case 35665:return Rg;case 35666:return Cg;case 35674:return Ig;case 35675:return Pg;case 35676:return Lg;case 5124:case 35670:return Dg;case 35667:case 35671:return Ug;case 35668:case 35672:return Ng;case 35669:case 35673:return Fg;case 5125:return Og;case 36294:return Bg;case 36295:return kg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Gg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Vg;case 36289:case 36303:case 36311:case 36292:return Wg}}class Yg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Tg(e.type)}}class qg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Xg(e.type)}}class $g{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const ha=/(\w+)(\])?(\[|\.)?/g;function ic(n,t){n.seq.push(t),n.map[t.id]=t}function jg(n,t,e){const i=n.name,s=i.length;for(ha.lastIndex=0;;){const r=ha.exec(i),a=ha.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){ic(e,l===void 0?new Yg(o,n,t):new qg(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new $g(o),ic(e,f)),e=f}}}class hr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);jg(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function sc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Kg=37297;let Zg=0;function Jg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const rc=new Bt;function Qg(n){Kt._getMatrix(rc,Kt.workingColorSpace,n);const t=`mat3( ${rc.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(n)){case mr:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function ac(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Jg(n.getShaderSource(t),o)}else return r}function t_(n,t){const e=Qg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const e_={[Wc]:"Linear",[Xc]:"Reinhard",[Yc]:"Cineon",[qc]:"ACESFilmic",[jc]:"AgX",[Kc]:"Neutral",[$c]:"Custom"};function n_(n,t){const e=e_[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const nr=new F;function i_(){Kt.getLuminanceCoefficients(nr);const n=nr.x.toFixed(4),t=nr.y.toFixed(4),e=nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function s_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function r_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function a_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ps(n){return n!==""}function oc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const o_=/^[ \t]*#include +<([\w\d./]+)>/gm;function oo(n){return n.replace(o_,c_)}const l_=new Map;function c_(n,t){let e=Wt[t];if(e===void 0){const i=l_.get(t);if(i!==void 0)e=Wt[i],Ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return oo(e)}const h_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cc(n){return n.replace(h_,d_)}function d_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function hc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const u_={[rr]:"SHADOWMAP_TYPE_PCF",[us]:"SHADOWMAP_TYPE_VSM"};function f_(n){return u_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const p_={[Ti]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE_UV"};function m_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":p_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const g_={[Ki]:"ENVMAP_MODE_REFRACTION"};function __(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":g_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const x_={[Vc]:"ENVMAP_BLENDING_MULTIPLY",[Qd]:"ENVMAP_BLENDING_MIX",[tu]:"ENVMAP_BLENDING_ADD"};function v_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":x_[n.combine]||"ENVMAP_BLENDING_NONE"}function M_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function S_(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=f_(e),l=m_(e),d=__(e),f=v_(e),u=M_(e),m=s_(e),x=r_(r),S=s.createProgram();let g,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(ps).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(ps).join(`
`),p.length>0&&(p+=`
`)):(g=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),p=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Sn?"#define TONE_MAPPING":"",e.toneMapping!==Sn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Sn?n_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,t_("linearToOutputTexel",e.outputColorSpace),i_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),a=oo(a),a=oc(a,e),a=lc(a,e),o=oo(o),o=oc(o,e),o=lc(o,e),a=cc(a),o=cc(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=E+g+a,w=E+p+o,L=sc(s,s.VERTEX_SHADER,b),T=sc(s,s.FRAGMENT_SHADER,w);s.attachShader(S,L),s.attachShader(S,T),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function P(I){if(n.debug.checkShaderErrors){const H=s.getProgramInfoLog(S)||"",q=s.getShaderInfoLog(L)||"",j=s.getShaderInfoLog(T)||"",O=H.trim(),W=q.trim(),X=j.trim();let et=!0,nt=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,L,T);else{const ft=ac(s,L,"vertex"),yt=ac(s,T,"fragment");te("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+ft+`
`+yt)}else O!==""?Ct("WebGLProgram: Program Info Log:",O):(W===""||X==="")&&(nt=!1);nt&&(I.diagnostics={runnable:et,programLog:O,vertexShader:{log:W,prefix:g},fragmentShader:{log:X,prefix:p}})}s.deleteShader(L),s.deleteShader(T),M=new hr(s,S),R=a_(s,S)}let M;this.getUniforms=function(){return M===void 0&&P(this),M};let R;this.getAttributes=function(){return R===void 0&&P(this),R};let B=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(S,Kg)),B},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zg++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=L,this.fragmentShader=T,this}let y_=0;class E_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new b_(t),e.set(t,i)),i}}class b_{constructor(t){this.id=y_++,this.code=t,this.usedTimes=0}}function T_(n){return n===Ai||n===ur||n===fr}function A_(n,t,e,i,s,r){const a=new oh,o=new E_,c=new Set,l=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function S(M,R,B,I,H,q){const j=I.fog,O=H.geometry,W=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,X=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,et=t.get(M.envMap||W,X),nt=et&&et.mapping===Mr?et.image.height:null,ft=m[M.type];M.precision!==null&&(u=i.getMaxPrecision(M.precision),u!==M.precision&&Ct("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const yt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,wt=yt!==void 0?yt.length:0;let Jt=0;O.morphAttributes.position!==void 0&&(Jt=1),O.morphAttributes.normal!==void 0&&(Jt=2),O.morphAttributes.color!==void 0&&(Jt=3);let se,Ht,J,gt;if(ft){const kt=_n[ft];se=kt.vertexShader,Ht=kt.fragmentShader}else se=M.vertexShader,Ht=M.fragmentShader,o.update(M),J=o.getVertexShaderID(M),gt=o.getFragmentShaderID(M);const ot=n.getRenderTarget(),It=n.state.buffers.depth.getReversed(),Ot=H.isInstancedMesh===!0,Pt=H.isBatchedMesh===!0,pe=!!M.map,$t=!!M.matcap,re=!!et,fe=!!M.aoMap,Yt=!!M.lightMap,Re=!!M.bumpMap,me=!!M.normalMap,Ye=!!M.displacementMap,D=!!M.emissiveMap,Ce=!!M.metalnessMap,jt=!!M.roughnessMap,de=M.anisotropy>0,dt=M.clearcoat>0,ge=M.dispersion>0,y=M.iridescence>0,_=M.sheen>0,k=M.transmission>0,K=de&&!!M.anisotropyMap,tt=dt&&!!M.clearcoatMap,st=dt&&!!M.clearcoatNormalMap,ht=dt&&!!M.clearcoatRoughnessMap,Y=y&&!!M.iridescenceMap,Z=y&&!!M.iridescenceThicknessMap,_t=_&&!!M.sheenColorMap,Mt=_&&!!M.sheenRoughnessMap,lt=!!M.specularMap,rt=!!M.specularColorMap,Ut=!!M.specularIntensityMap,Vt=k&&!!M.transmissionMap,ee=k&&!!M.thicknessMap,C=!!M.gradientMap,at=!!M.alphaMap,$=M.alphaTest>0,xt=!!M.alphaHash,ct=!!M.extensions;let Q=Sn;M.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Q=n.toneMapping);const Tt={shaderID:ft,shaderType:M.type,shaderName:M.name,vertexShader:se,fragmentShader:Ht,defines:M.defines,customVertexShaderID:J,customFragmentShaderID:gt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:Pt,batchingColor:Pt&&H._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&H.instanceColor!==null,instancingMorph:Ot&&H.morphTexture!==null,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:pe,matcap:$t,envMap:re,envMapMode:re&&et.mapping,envMapCubeUVHeight:nt,aoMap:fe,lightMap:Yt,bumpMap:Re,normalMap:me,displacementMap:Ye,emissiveMap:D,normalMapObjectSpace:me&&M.normalMapType===iu,normalMapTangentSpace:me&&M.normalMapType===io,packedNormalMap:me&&M.normalMapType===io&&T_(M.normalMap.format),metalnessMap:Ce,roughnessMap:jt,anisotropy:de,anisotropyMap:K,clearcoat:dt,clearcoatMap:tt,clearcoatNormalMap:st,clearcoatRoughnessMap:ht,dispersion:ge,iridescence:y,iridescenceMap:Y,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:_t,sheenRoughnessMap:Mt,specularMap:lt,specularColorMap:rt,specularIntensityMap:Ut,transmission:k,transmissionMap:Vt,thicknessMap:ee,gradientMap:C,opaque:M.transparent===!1&&M.blending===Yi&&M.alphaToCoverage===!1,alphaMap:at,alphaTest:$,alphaHash:xt,combine:M.combine,mapUv:pe&&x(M.map.channel),aoMapUv:fe&&x(M.aoMap.channel),lightMapUv:Yt&&x(M.lightMap.channel),bumpMapUv:Re&&x(M.bumpMap.channel),normalMapUv:me&&x(M.normalMap.channel),displacementMapUv:Ye&&x(M.displacementMap.channel),emissiveMapUv:D&&x(M.emissiveMap.channel),metalnessMapUv:Ce&&x(M.metalnessMap.channel),roughnessMapUv:jt&&x(M.roughnessMap.channel),anisotropyMapUv:K&&x(M.anisotropyMap.channel),clearcoatMapUv:tt&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:st&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ht&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&x(M.sheenRoughnessMap.channel),specularMapUv:lt&&x(M.specularMap.channel),specularColorMapUv:rt&&x(M.specularColorMap.channel),specularIntensityMapUv:Ut&&x(M.specularIntensityMap.channel),transmissionMapUv:Vt&&x(M.transmissionMap.channel),thicknessMapUv:ee&&x(M.thicknessMap.channel),alphaMapUv:at&&x(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(me||de),vertexNormals:!!O.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!O.attributes.uv&&(pe||at),fog:!!j,useFog:M.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||O.attributes.normal===void 0&&me===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:It,skinning:H.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Jt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:Q,decodeVideoTexture:pe&&M.map.isVideoTexture===!0&&Kt.getTransfer(M.map.colorSpace)===ie,decodeVideoTextureEmissive:D&&M.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(M.emissiveMap.colorSpace)===ie,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Un,flipSided:M.side===We,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ct&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&M.extensions.multiDraw===!0||Pt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function g(M){const R=[];if(M.shaderID?R.push(M.shaderID):(R.push(M.customVertexShaderID),R.push(M.customFragmentShaderID)),M.defines!==void 0)for(const B in M.defines)R.push(B),R.push(M.defines[B]);return M.isRawShaderMaterial===!1&&(p(R,M),E(R,M),R.push(n.outputColorSpace)),R.push(M.customProgramCacheKey),R.join()}function p(M,R){M.push(R.precision),M.push(R.outputColorSpace),M.push(R.envMapMode),M.push(R.envMapCubeUVHeight),M.push(R.mapUv),M.push(R.alphaMapUv),M.push(R.lightMapUv),M.push(R.aoMapUv),M.push(R.bumpMapUv),M.push(R.normalMapUv),M.push(R.displacementMapUv),M.push(R.emissiveMapUv),M.push(R.metalnessMapUv),M.push(R.roughnessMapUv),M.push(R.anisotropyMapUv),M.push(R.clearcoatMapUv),M.push(R.clearcoatNormalMapUv),M.push(R.clearcoatRoughnessMapUv),M.push(R.iridescenceMapUv),M.push(R.iridescenceThicknessMapUv),M.push(R.sheenColorMapUv),M.push(R.sheenRoughnessMapUv),M.push(R.specularMapUv),M.push(R.specularColorMapUv),M.push(R.specularIntensityMapUv),M.push(R.transmissionMapUv),M.push(R.thicknessMapUv),M.push(R.combine),M.push(R.fogExp2),M.push(R.sizeAttenuation),M.push(R.morphTargetsCount),M.push(R.morphAttributeCount),M.push(R.numDirLights),M.push(R.numPointLights),M.push(R.numSpotLights),M.push(R.numSpotLightMaps),M.push(R.numHemiLights),M.push(R.numRectAreaLights),M.push(R.numDirLightShadows),M.push(R.numPointLightShadows),M.push(R.numSpotLightShadows),M.push(R.numSpotLightShadowsWithMaps),M.push(R.numLightProbes),M.push(R.shadowMapType),M.push(R.toneMapping),M.push(R.numClippingPlanes),M.push(R.numClipIntersection),M.push(R.depthPacking)}function E(M,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),M.push(a.mask)}function b(M){const R=m[M.type];let B;if(R){const I=_n[R];B=Vu.clone(I.uniforms)}else B=M.uniforms;return B}function w(M,R){let B=d.get(R);return B!==void 0?++B.usedTimes:(B=new S_(n,R,M,s),l.push(B),d.set(R,B)),B}function L(M){if(--M.usedTimes===0){const R=l.indexOf(M);l[R]=l[l.length-1],l.pop(),d.delete(M.cacheKey),M.destroy()}}function T(M){o.remove(M)}function P(){o.dispose()}return{getParameters:S,getProgramCacheKey:g,getUniforms:b,acquireProgram:w,releaseProgram:L,releaseShaderCache:T,programs:l,dispose:P}}function w_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function R_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function dc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function uc(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,x,S,g,p){let E=n[t];return E===void 0?(E={id:u.id,object:u,geometry:m,material:x,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:g,group:p},n[t]=E):(E.id=u.id,E.object=u,E.geometry=m,E.material=x,E.materialVariant=a(u),E.groupOrder=S,E.renderOrder=u.renderOrder,E.z=g,E.group=p),t++,E}function c(u,m,x,S,g,p){const E=o(u,m,x,S,g,p);x.transmission>0?i.push(E):x.transparent===!0?s.push(E):e.push(E)}function l(u,m,x,S,g,p){const E=o(u,m,x,S,g,p);x.transmission>0?i.unshift(E):x.transparent===!0?s.unshift(E):e.unshift(E)}function d(u,m){e.length>1&&e.sort(u||R_),i.length>1&&i.sort(m||dc),s.length>1&&s.sort(m||dc)}function f(){for(let u=t,m=n.length;u<m;u++){const x=n[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:d}}function C_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new uc,n.set(i,[a])):s>=r.length?(a=new uc,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function I_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Zt};break;case"SpotLight":e={position:new F,direction:new F,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function P_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let L_=0;function D_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function U_(n){const t=new I_,e=P_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);const s=new F,r=new ye,a=new ye;function o(l){let d=0,f=0,u=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let m=0,x=0,S=0,g=0,p=0,E=0,b=0,w=0,L=0,T=0,P=0;l.sort(D_);for(let R=0,B=l.length;R<B;R++){const I=l[R],H=I.color,q=I.intensity,j=I.distance;let O=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ai?O=I.shadow.map.texture:O=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=H.r*q,f+=H.g*q,u+=H.b*q;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],q);P++}else if(I.isDirectionalLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const X=I.shadow,et=e.get(I);et.shadowIntensity=X.intensity,et.shadowBias=X.bias,et.shadowNormalBias=X.normalBias,et.shadowRadius=X.radius,et.shadowMapSize=X.mapSize,i.directionalShadow[m]=et,i.directionalShadowMap[m]=O,i.directionalShadowMatrix[m]=I.shadow.matrix,E++}i.directional[m]=W,m++}else if(I.isSpotLight){const W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(H).multiplyScalar(q),W.distance=j,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[S]=W;const X=I.shadow;if(I.map&&(i.spotLightMap[L]=I.map,L++,X.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[S]=X.matrix,I.castShadow){const et=e.get(I);et.shadowIntensity=X.intensity,et.shadowBias=X.bias,et.shadowNormalBias=X.normalBias,et.shadowRadius=X.radius,et.shadowMapSize=X.mapSize,i.spotShadow[S]=et,i.spotShadowMap[S]=O,w++}S++}else if(I.isRectAreaLight){const W=t.get(I);W.color.copy(H).multiplyScalar(q),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=W,g++}else if(I.isPointLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const X=I.shadow,et=e.get(I);et.shadowIntensity=X.intensity,et.shadowBias=X.bias,et.shadowNormalBias=X.normalBias,et.shadowRadius=X.radius,et.shadowMapSize=X.mapSize,et.shadowCameraNear=X.camera.near,et.shadowCameraFar=X.camera.far,i.pointShadow[x]=et,i.pointShadowMap[x]=O,i.pointShadowMatrix[x]=I.shadow.matrix,b++}i.point[x]=W,x++}else if(I.isHemisphereLight){const W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(q),W.groundColor.copy(I.groundColor).multiplyScalar(q),i.hemi[p]=W,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const M=i.hash;(M.directionalLength!==m||M.pointLength!==x||M.spotLength!==S||M.rectAreaLength!==g||M.hemiLength!==p||M.numDirectionalShadows!==E||M.numPointShadows!==b||M.numSpotShadows!==w||M.numSpotMaps!==L||M.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=S,i.rectArea.length=g,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=w+L-T,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,M.directionalLength=m,M.pointLength=x,M.spotLength=S,M.rectAreaLength=g,M.hemiLength=p,M.numDirectionalShadows=E,M.numPointShadows=b,M.numSpotShadows=w,M.numSpotMaps=L,M.numLightProbes=P,i.version=L_++)}function c(l,d){let f=0,u=0,m=0,x=0,S=0;const g=d.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){const b=l[p];if(b.isDirectionalLight){const w=i.directional[f];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),f++}else if(b.isSpotLight){const w=i.spot[m];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),m++}else if(b.isRectAreaLight){const w=i.rectArea[x];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const w=i.point[u];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){const w=i.hemi[S];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(g),S++}}}return{setup:o,setupView:c,state:i}}function fc(n){const t=new U_(n),e=[],i=[],s=[];function r(u){f.camera=u,e.length=0,i.length=0,s.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function d(u){t.setupView(e,u)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function N_(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new fc(n),t.set(s,[o])):r>=a.length?(o=new fc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const F_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,B_=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],k_=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],pc=new ye,hs=new F,da=new F;function z_(n,t,e){let i=new Po;const s=new Gt,r=new Gt,a=new Se,o=new $u,c=new ju,l={},d=e.maxTextureSize,f={[ri]:We,[We]:ri,[Un]:Un},u=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:F_,fragmentShader:O_}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const x=new an;x.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Tn(x,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rr;let p=this.type;this.render=function(T,P,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Ud&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=rr);const R=n.getRenderTarget(),B=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Bn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const q=p!==this.type;q&&P.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(O=>O.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,O=T.length;j<O;j++){const W=T[j],X=W.shadow;if(X===void 0){Ct("WebGLShadowMap:",W,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const et=X.getFrameExtents();s.multiply(et),r.copy(X.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/et.x),s.x=r.x*et.x,X.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/et.y),s.y=r.y*et.y,X.mapSize.y=r.y));const nt=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=nt,X.map===null||q===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===us){if(W.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new yn(s.x,s.y,{format:Ai,type:Gn,minFilter:ke,magFilter:ke,generateMipmaps:!1}),X.map.texture.name=W.name+".shadowMap",X.map.depthTexture=new Zi(s.x,s.y,vn),X.map.depthTexture.name=W.name+".shadowMapDepth",X.map.depthTexture.format=Hn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ue,X.map.depthTexture.magFilter=Ue}else W.isPointLight?(X.map=new Mh(s.x),X.map.depthTexture=new zu(s.x,bn)):(X.map=new yn(s.x,s.y),X.map.depthTexture=new Zi(s.x,s.y,bn)),X.map.depthTexture.name=W.name+".shadowMap",X.map.depthTexture.format=Hn,this.type===rr?(X.map.depthTexture.compareFunction=nt?Ro:wo,X.map.depthTexture.minFilter=ke,X.map.depthTexture.magFilter=ke):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ue,X.map.depthTexture.magFilter=Ue);X.camera.updateProjectionMatrix()}const ft=X.map.isWebGLCubeRenderTarget?6:1;for(let yt=0;yt<ft;yt++){if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,yt),n.clear();else{yt===0&&(n.setRenderTarget(X.map),n.clear());const wt=X.getViewport(yt);a.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),H.viewport(a)}if(W.isPointLight){const wt=X.camera,Jt=X.matrix,se=W.distance||wt.far;se!==wt.far&&(wt.far=se,wt.updateProjectionMatrix()),hs.setFromMatrixPosition(W.matrixWorld),wt.position.copy(hs),da.copy(wt.position),da.add(B_[yt]),wt.up.copy(k_[yt]),wt.lookAt(da),wt.updateMatrixWorld(),Jt.makeTranslation(-hs.x,-hs.y,-hs.z),pc.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(pc,wt.coordinateSystem,wt.reversedDepth)}else X.updateMatrices(W);i=X.getFrustum(),w(P,M,X.camera,W,this.type)}X.isPointLightShadow!==!0&&this.type===us&&E(X,M),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(R,B,I)};function E(T,P){const M=t.update(S);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new yn(s.x,s.y,{format:Ai,type:Gn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,M,u,S,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,M,m,S,null)}function b(T,P,M,R){let B=null;const I=M.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)B=I;else if(B=M.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const H=B.uuid,q=P.uuid;let j=l[H];j===void 0&&(j={},l[H]=j);let O=j[q];O===void 0&&(O=B.clone(),j[q]=O,P.addEventListener("dispose",L)),B=O}if(B.visible=P.visible,B.wireframe=P.wireframe,R===us?B.side=P.shadowSide!==null?P.shadowSide:P.side:B.side=P.shadowSide!==null?P.shadowSide:f[P.side],B.alphaMap=P.alphaMap,B.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,B.map=P.map,B.clipShadows=P.clipShadows,B.clippingPlanes=P.clippingPlanes,B.clipIntersection=P.clipIntersection,B.displacementMap=P.displacementMap,B.displacementScale=P.displacementScale,B.displacementBias=P.displacementBias,B.wireframeLinewidth=P.wireframeLinewidth,B.linewidth=P.linewidth,M.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const H=n.properties.get(B);H.light=M}return B}function w(T,P,M,R,B){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&B===us)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,T.matrixWorld);const q=t.update(T),j=T.material;if(Array.isArray(j)){const O=q.groups;for(let W=0,X=O.length;W<X;W++){const et=O[W],nt=j[et.materialIndex];if(nt&&nt.visible){const ft=b(T,nt,R,B);T.onBeforeShadow(n,T,P,M,q,ft,et),n.renderBufferDirect(M,null,q,ft,T,et),T.onAfterShadow(n,T,P,M,q,ft,et)}}}else if(j.visible){const O=b(T,j,R,B);T.onBeforeShadow(n,T,P,M,q,O,null),n.renderBufferDirect(M,null,q,O,T,null),T.onAfterShadow(n,T,P,M,q,O,null)}}const H=T.children;for(let q=0,j=H.length;q<j;q++)w(H[q],P,M,R,B)}function L(T){T.target.removeEventListener("dispose",L);for(const M in l){const R=l[M],B=T.target.uuid;B in R&&(R[B].dispose(),delete R[B])}}}function G_(n,t){function e(){let C=!1;const at=new Se;let $=null;const xt=new Se(0,0,0,0);return{setMask:function(ct){$!==ct&&!C&&(n.colorMask(ct,ct,ct,ct),$=ct)},setLocked:function(ct){C=ct},setClear:function(ct,Q,Tt,kt,Ee){Ee===!0&&(ct*=kt,Q*=kt,Tt*=kt),at.set(ct,Q,Tt,kt),xt.equals(at)===!1&&(n.clearColor(ct,Q,Tt,kt),xt.copy(at))},reset:function(){C=!1,$=null,xt.set(-1,0,0,0)}}}function i(){let C=!1,at=!1,$=null,xt=null,ct=null;return{setReversed:function(Q){if(at!==Q){const Tt=t.get("EXT_clip_control");Q?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),at=Q;const kt=ct;ct=null,this.setClear(kt)}},getReversed:function(){return at},setTest:function(Q){Q?ot(n.DEPTH_TEST):It(n.DEPTH_TEST)},setMask:function(Q){$!==Q&&!C&&(n.depthMask(Q),$=Q)},setFunc:function(Q){if(at&&(Q=fu[Q]),xt!==Q){switch(Q){case xa:n.depthFunc(n.NEVER);break;case va:n.depthFunc(n.ALWAYS);break;case Ma:n.depthFunc(n.LESS);break;case ji:n.depthFunc(n.LEQUAL);break;case Sa:n.depthFunc(n.EQUAL);break;case ya:n.depthFunc(n.GEQUAL);break;case Ea:n.depthFunc(n.GREATER);break;case ba:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xt=Q}},setLocked:function(Q){C=Q},setClear:function(Q){ct!==Q&&(ct=Q,at&&(Q=1-Q),n.clearDepth(Q))},reset:function(){C=!1,$=null,xt=null,ct=null,at=!1}}}function s(){let C=!1,at=null,$=null,xt=null,ct=null,Q=null,Tt=null,kt=null,Ee=null;return{setTest:function(ae){C||(ae?ot(n.STENCIL_TEST):It(n.STENCIL_TEST))},setMask:function(ae){at!==ae&&!C&&(n.stencilMask(ae),at=ae)},setFunc:function(ae,wn,un){($!==ae||xt!==wn||ct!==un)&&(n.stencilFunc(ae,wn,un),$=ae,xt=wn,ct=un)},setOp:function(ae,wn,un){(Q!==ae||Tt!==wn||kt!==un)&&(n.stencilOp(ae,wn,un),Q=ae,Tt=wn,kt=un)},setLocked:function(ae){C=ae},setClear:function(ae){Ee!==ae&&(n.clearStencil(ae),Ee=ae)},reset:function(){C=!1,at=null,$=null,xt=null,ct=null,Q=null,Tt=null,kt=null,Ee=null}}}const r=new e,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let d={},f={},u={},m=new WeakMap,x=[],S=null,g=!1,p=null,E=null,b=null,w=null,L=null,T=null,P=null,M=new Zt(0,0,0),R=0,B=!1,I=null,H=null,q=null,j=null,O=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,et=0;const nt=n.getParameter(n.VERSION);nt.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(nt)[1]),X=et>=1):nt.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),X=et>=2);let ft=null,yt={};const wt=n.getParameter(n.SCISSOR_BOX),Jt=n.getParameter(n.VIEWPORT),se=new Se().fromArray(wt),Ht=new Se().fromArray(Jt);function J(C,at,$,xt){const ct=new Uint8Array(4),Q=n.createTexture();n.bindTexture(C,Q),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Tt=0;Tt<$;Tt++)C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?n.texImage3D(at,0,n.RGBA,1,1,xt,0,n.RGBA,n.UNSIGNED_BYTE,ct):n.texImage2D(at+Tt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ct);return Q}const gt={};gt[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),gt[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),gt[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(n.DEPTH_TEST),a.setFunc(ji),Re(!1),me(hl),ot(n.CULL_FACE),fe(Bn);function ot(C){d[C]!==!0&&(n.enable(C),d[C]=!0)}function It(C){d[C]!==!1&&(n.disable(C),d[C]=!1)}function Ot(C,at){return u[C]!==at?(n.bindFramebuffer(C,at),u[C]=at,C===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=at),C===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=at),!0):!1}function Pt(C,at){let $=x,xt=!1;if(C){$=m.get(at),$===void 0&&($=[],m.set(at,$));const ct=C.textures;if($.length!==ct.length||$[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,Tt=ct.length;Q<Tt;Q++)$[Q]=n.COLOR_ATTACHMENT0+Q;$.length=ct.length,xt=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,xt=!0);xt&&n.drawBuffers($)}function pe(C){return S!==C?(n.useProgram(C),S=C,!0):!1}const $t={[mi]:n.FUNC_ADD,[Fd]:n.FUNC_SUBTRACT,[Od]:n.FUNC_REVERSE_SUBTRACT};$t[Bd]=n.MIN,$t[kd]=n.MAX;const re={[zd]:n.ZERO,[Gd]:n.ONE,[Hd]:n.SRC_COLOR,[ga]:n.SRC_ALPHA,[$d]:n.SRC_ALPHA_SATURATE,[Yd]:n.DST_COLOR,[Wd]:n.DST_ALPHA,[Vd]:n.ONE_MINUS_SRC_COLOR,[_a]:n.ONE_MINUS_SRC_ALPHA,[qd]:n.ONE_MINUS_DST_COLOR,[Xd]:n.ONE_MINUS_DST_ALPHA,[jd]:n.CONSTANT_COLOR,[Kd]:n.ONE_MINUS_CONSTANT_COLOR,[Zd]:n.CONSTANT_ALPHA,[Jd]:n.ONE_MINUS_CONSTANT_ALPHA};function fe(C,at,$,xt,ct,Q,Tt,kt,Ee,ae){if(C===Bn){g===!0&&(It(n.BLEND),g=!1);return}if(g===!1&&(ot(n.BLEND),g=!0),C!==Nd){if(C!==p||ae!==B){if((E!==mi||L!==mi)&&(n.blendEquation(n.FUNC_ADD),E=mi,L=mi),ae)switch(C){case Yi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dl:n.blendFunc(n.ONE,n.ONE);break;case ul:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case fl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:te("WebGLState: Invalid blending: ",C);break}else switch(C){case Yi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ul:te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fl:te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:te("WebGLState: Invalid blending: ",C);break}b=null,w=null,T=null,P=null,M.set(0,0,0),R=0,p=C,B=ae}return}ct=ct||at,Q=Q||$,Tt=Tt||xt,(at!==E||ct!==L)&&(n.blendEquationSeparate($t[at],$t[ct]),E=at,L=ct),($!==b||xt!==w||Q!==T||Tt!==P)&&(n.blendFuncSeparate(re[$],re[xt],re[Q],re[Tt]),b=$,w=xt,T=Q,P=Tt),(kt.equals(M)===!1||Ee!==R)&&(n.blendColor(kt.r,kt.g,kt.b,Ee),M.copy(kt),R=Ee),p=C,B=!1}function Yt(C,at){C.side===Un?It(n.CULL_FACE):ot(n.CULL_FACE);let $=C.side===We;at&&($=!$),Re($),C.blending===Yi&&C.transparent===!1?fe(Bn):fe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const xt=C.stencilWrite;o.setTest(xt),xt&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),D(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ot(n.SAMPLE_ALPHA_TO_COVERAGE):It(n.SAMPLE_ALPHA_TO_COVERAGE)}function Re(C){I!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),I=C)}function me(C){C!==Ld?(ot(n.CULL_FACE),C!==H&&(C===hl?n.cullFace(n.BACK):C===Dd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):It(n.CULL_FACE),H=C}function Ye(C){C!==q&&(X&&n.lineWidth(C),q=C)}function D(C,at,$){C?(ot(n.POLYGON_OFFSET_FILL),(j!==at||O!==$)&&(j=at,O=$,a.getReversed()&&(at=-at),n.polygonOffset(at,$))):It(n.POLYGON_OFFSET_FILL)}function Ce(C){C?ot(n.SCISSOR_TEST):It(n.SCISSOR_TEST)}function jt(C){C===void 0&&(C=n.TEXTURE0+W-1),ft!==C&&(n.activeTexture(C),ft=C)}function de(C,at,$){$===void 0&&(ft===null?$=n.TEXTURE0+W-1:$=ft);let xt=yt[$];xt===void 0&&(xt={type:void 0,texture:void 0},yt[$]=xt),(xt.type!==C||xt.texture!==at)&&(ft!==$&&(n.activeTexture($),ft=$),n.bindTexture(C,at||gt[C]),xt.type=C,xt.texture=at)}function dt(){const C=yt[ft];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function ge(){try{n.compressedTexImage2D(...arguments)}catch(C){te("WebGLState:",C)}}function y(){try{n.compressedTexImage3D(...arguments)}catch(C){te("WebGLState:",C)}}function _(){try{n.texSubImage2D(...arguments)}catch(C){te("WebGLState:",C)}}function k(){try{n.texSubImage3D(...arguments)}catch(C){te("WebGLState:",C)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(C){te("WebGLState:",C)}}function tt(){try{n.compressedTexSubImage3D(...arguments)}catch(C){te("WebGLState:",C)}}function st(){try{n.texStorage2D(...arguments)}catch(C){te("WebGLState:",C)}}function ht(){try{n.texStorage3D(...arguments)}catch(C){te("WebGLState:",C)}}function Y(){try{n.texImage2D(...arguments)}catch(C){te("WebGLState:",C)}}function Z(){try{n.texImage3D(...arguments)}catch(C){te("WebGLState:",C)}}function _t(C){return f[C]!==void 0?f[C]:n.getParameter(C)}function Mt(C,at){f[C]!==at&&(n.pixelStorei(C,at),f[C]=at)}function lt(C){se.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),se.copy(C))}function rt(C){Ht.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),Ht.copy(C))}function Ut(C,at){let $=l.get(at);$===void 0&&($=new WeakMap,l.set(at,$));let xt=$.get(C);xt===void 0&&(xt=n.getUniformBlockIndex(at,C.name),$.set(C,xt))}function Vt(C,at){const xt=l.get(at).get(C);c.get(at)!==xt&&(n.uniformBlockBinding(at,xt,C.__bindingPointIndex),c.set(at,xt))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},ft=null,yt={},u={},m=new WeakMap,x=[],S=null,g=!1,p=null,E=null,b=null,w=null,L=null,T=null,P=null,M=new Zt(0,0,0),R=0,B=!1,I=null,H=null,q=null,j=null,O=null,se.set(0,0,n.canvas.width,n.canvas.height),Ht.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:It,bindFramebuffer:Ot,drawBuffers:Pt,useProgram:pe,setBlending:fe,setMaterial:Yt,setFlipSided:Re,setCullFace:me,setLineWidth:Ye,setPolygonOffset:D,setScissorTest:Ce,activeTexture:jt,bindTexture:de,unbindTexture:dt,compressedTexImage2D:ge,compressedTexImage3D:y,texImage2D:Y,texImage3D:Z,pixelStorei:Mt,getParameter:_t,updateUBOMapping:Ut,uniformBlockBinding:Vt,texStorage2D:st,texStorage3D:ht,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:K,compressedTexSubImage3D:tt,scissor:lt,viewport:rt,reset:ee}}function H_(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Gt,d=new WeakMap,f=new Set;let u;const m=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(y,_){return x?new OffscreenCanvas(y,_):gr("canvas")}function g(y,_,k){let K=1;const tt=ge(y);if((tt.width>k||tt.height>k)&&(K=k/Math.max(tt.width,tt.height)),K<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const st=Math.floor(K*tt.width),ht=Math.floor(K*tt.height);u===void 0&&(u=S(st,ht));const Y=_?S(st,ht):u;return Y.width=st,Y.height=ht,Y.getContext("2d").drawImage(y,0,0,st,ht),Ct("WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+st+"x"+ht+")."),Y}else return"data"in y&&Ct("WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),y;return y}function p(y){return y.generateMipmaps}function E(y){n.generateMipmap(y)}function b(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(y,_,k,K,tt,st=!1){if(y!==null){if(n[y]!==void 0)return n[y];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let ht;K&&(ht=t.get("EXT_texture_norm16"),ht||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===n.RED&&(k===n.FLOAT&&(Y=n.R32F),k===n.HALF_FLOAT&&(Y=n.R16F),k===n.UNSIGNED_BYTE&&(Y=n.R8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.R16_EXT),k===n.SHORT&&ht&&(Y=ht.R16_SNORM_EXT)),_===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.R8UI),k===n.UNSIGNED_SHORT&&(Y=n.R16UI),k===n.UNSIGNED_INT&&(Y=n.R32UI),k===n.BYTE&&(Y=n.R8I),k===n.SHORT&&(Y=n.R16I),k===n.INT&&(Y=n.R32I)),_===n.RG&&(k===n.FLOAT&&(Y=n.RG32F),k===n.HALF_FLOAT&&(Y=n.RG16F),k===n.UNSIGNED_BYTE&&(Y=n.RG8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RG16_EXT),k===n.SHORT&&ht&&(Y=ht.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RG8UI),k===n.UNSIGNED_SHORT&&(Y=n.RG16UI),k===n.UNSIGNED_INT&&(Y=n.RG32UI),k===n.BYTE&&(Y=n.RG8I),k===n.SHORT&&(Y=n.RG16I),k===n.INT&&(Y=n.RG32I)),_===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),k===n.UNSIGNED_INT&&(Y=n.RGB32UI),k===n.BYTE&&(Y=n.RGB8I),k===n.SHORT&&(Y=n.RGB16I),k===n.INT&&(Y=n.RGB32I)),_===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),k===n.UNSIGNED_INT&&(Y=n.RGBA32UI),k===n.BYTE&&(Y=n.RGBA8I),k===n.SHORT&&(Y=n.RGBA16I),k===n.INT&&(Y=n.RGBA32I)),_===n.RGB&&(k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGB16_EXT),k===n.SHORT&&ht&&(Y=ht.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),_===n.RGBA){const Z=st?mr:Kt.getTransfer(tt);k===n.FLOAT&&(Y=n.RGBA32F),k===n.HALF_FLOAT&&(Y=n.RGBA16F),k===n.UNSIGNED_BYTE&&(Y=Z===ie?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGBA16_EXT),k===n.SHORT&&ht&&(Y=ht.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function L(y,_){let k;return y?_===null||_===bn||_===xs?k=n.DEPTH24_STENCIL8:_===vn?k=n.DEPTH32F_STENCIL8:_===_s&&(k=n.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===bn||_===xs?k=n.DEPTH_COMPONENT24:_===vn?k=n.DEPTH_COMPONENT32F:_===_s&&(k=n.DEPTH_COMPONENT16),k}function T(y,_){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==Ue&&y.minFilter!==ke?Math.log2(Math.max(_.width,_.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?_.mipmaps.length:1}function P(y){const _=y.target;_.removeEventListener("dispose",P),R(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function M(y){const _=y.target;_.removeEventListener("dispose",M),I(_)}function R(y){const _=i.get(y);if(_.__webglInit===void 0)return;const k=y.source,K=m.get(k);if(K){const tt=K[_.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&B(y),Object.keys(K).length===0&&m.delete(k)}i.remove(y)}function B(y){const _=i.get(y);n.deleteTexture(_.__webglTexture);const k=y.source,K=m.get(k);delete K[_.__cacheKey],a.memory.textures--}function I(y){const _=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(_.__webglFramebuffer[K]))for(let tt=0;tt<_.__webglFramebuffer[K].length;tt++)n.deleteFramebuffer(_.__webglFramebuffer[K][tt]);else n.deleteFramebuffer(_.__webglFramebuffer[K]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[K])}else{if(Array.isArray(_.__webglFramebuffer))for(let K=0;K<_.__webglFramebuffer.length;K++)n.deleteFramebuffer(_.__webglFramebuffer[K]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let K=0;K<_.__webglColorRenderbuffer.length;K++)_.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[K]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=y.textures;for(let K=0,tt=k.length;K<tt;K++){const st=i.get(k[K]);st.__webglTexture&&(n.deleteTexture(st.__webglTexture),a.memory.textures--),i.remove(k[K])}i.remove(y)}let H=0;function q(){H=0}function j(){return H}function O(y){H=y}function W(){const y=H;return y>=s.maxTextures&&Ct("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),H+=1,y}function X(y){const _=[];return _.push(y.wrapS),_.push(y.wrapT),_.push(y.wrapR||0),_.push(y.magFilter),_.push(y.minFilter),_.push(y.anisotropy),_.push(y.internalFormat),_.push(y.format),_.push(y.type),_.push(y.generateMipmaps),_.push(y.premultiplyAlpha),_.push(y.flipY),_.push(y.unpackAlignment),_.push(y.colorSpace),_.join()}function et(y,_){const k=i.get(y);if(y.isVideoTexture&&de(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&k.__version!==y.version){const K=y.image;if(K===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{It(k,y,_);return}}else y.isExternalTexture&&(k.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+_)}function nt(y,_){const k=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&k.__version!==y.version){It(k,y,_);return}else y.isExternalTexture&&(k.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+_)}function ft(y,_){const k=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&k.__version!==y.version){It(k,y,_);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+_)}function yt(y,_){const k=i.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&k.__version!==y.version){Ot(k,y,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+_)}const wt={[Ta]:n.REPEAT,[Nn]:n.CLAMP_TO_EDGE,[Aa]:n.MIRRORED_REPEAT},Jt={[Ue]:n.NEAREST,[eu]:n.NEAREST_MIPMAP_NEAREST,[Is]:n.NEAREST_MIPMAP_LINEAR,[ke]:n.LINEAR,[Dr]:n.LINEAR_MIPMAP_NEAREST,[_i]:n.LINEAR_MIPMAP_LINEAR},se={[su]:n.NEVER,[cu]:n.ALWAYS,[ru]:n.LESS,[wo]:n.LEQUAL,[au]:n.EQUAL,[Ro]:n.GEQUAL,[ou]:n.GREATER,[lu]:n.NOTEQUAL};function Ht(y,_){if(_.type===vn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===ke||_.magFilter===Dr||_.magFilter===Is||_.magFilter===_i||_.minFilter===ke||_.minFilter===Dr||_.minFilter===Is||_.minFilter===_i)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,wt[_.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,wt[_.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,wt[_.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,Jt[_.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,Jt[_.minFilter]),_.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,se[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ue||_.minFilter!==Is&&_.minFilter!==_i||_.type===vn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(y,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function J(y,_){let k=!1;y.__webglInit===void 0&&(y.__webglInit=!0,_.addEventListener("dispose",P));const K=_.source;let tt=m.get(K);tt===void 0&&(tt={},m.set(K,tt));const st=X(_);if(st!==y.__cacheKey){tt[st]===void 0&&(tt[st]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),tt[st].usedTimes++;const ht=tt[y.__cacheKey];ht!==void 0&&(tt[y.__cacheKey].usedTimes--,ht.usedTimes===0&&B(_)),y.__cacheKey=st,y.__webglTexture=tt[st].texture}return k}function gt(y,_,k){return Math.floor(Math.floor(y/k)/_)}function ot(y,_,k,K){const st=y.updateRanges;if(st.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,k,K,_.data);else{st.sort((Mt,lt)=>Mt.start-lt.start);let ht=0;for(let Mt=1;Mt<st.length;Mt++){const lt=st[ht],rt=st[Mt],Ut=lt.start+lt.count,Vt=gt(rt.start,_.width,4),ee=gt(lt.start,_.width,4);rt.start<=Ut+1&&Vt===ee&&gt(rt.start+rt.count-1,_.width,4)===Vt?lt.count=Math.max(lt.count,rt.start+rt.count-lt.start):(++ht,st[ht]=rt)}st.length=ht+1;const Y=e.getParameter(n.UNPACK_ROW_LENGTH),Z=e.getParameter(n.UNPACK_SKIP_PIXELS),_t=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Mt=0,lt=st.length;Mt<lt;Mt++){const rt=st[Mt],Ut=Math.floor(rt.start/4),Vt=Math.ceil(rt.count/4),ee=Ut%_.width,C=Math.floor(Ut/_.width),at=Vt,$=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ee),e.pixelStorei(n.UNPACK_SKIP_ROWS,C),e.texSubImage2D(n.TEXTURE_2D,0,ee,C,at,$,k,K,_.data)}y.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Y),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(n.UNPACK_SKIP_ROWS,_t)}}function It(y,_,k){let K=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(K=n.TEXTURE_3D);const tt=J(y,_),st=_.source;e.bindTexture(K,y.__webglTexture,n.TEXTURE0+k);const ht=i.get(st);if(st.version!==ht.__version||tt===!0){if(e.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const $=Kt.getPrimaries(Kt.workingColorSpace),xt=_.colorSpace===ei?null:Kt.getPrimaries(_.colorSpace),ct=_.colorSpace===ei||$===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=g(_.image,!1,s.maxTextureSize);Z=dt(_,Z);const _t=r.convert(_.format,_.colorSpace),Mt=r.convert(_.type);let lt=w(_.internalFormat,_t,Mt,_.normalized,_.colorSpace,_.isVideoTexture);Ht(K,_);let rt;const Ut=_.mipmaps,Vt=_.isVideoTexture!==!0,ee=ht.__version===void 0||tt===!0,C=st.dataReady,at=T(_,Z);if(_.isDepthTexture)lt=L(_.format===xi,_.type),ee&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,lt,Z.width,Z.height):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,_t,Mt,null));else if(_.isDataTexture)if(Ut.length>0){Vt&&ee&&e.texStorage2D(n.TEXTURE_2D,at,lt,Ut[0].width,Ut[0].height);for(let $=0,xt=Ut.length;$<xt;$++)rt=Ut[$],Vt?C&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,rt.width,rt.height,_t,Mt,rt.data):e.texImage2D(n.TEXTURE_2D,$,lt,rt.width,rt.height,0,_t,Mt,rt.data);_.generateMipmaps=!1}else Vt?(ee&&e.texStorage2D(n.TEXTURE_2D,at,lt,Z.width,Z.height),C&&ot(_,Z,_t,Mt)):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,_t,Mt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Vt&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,lt,Ut[0].width,Ut[0].height,Z.depth);for(let $=0,xt=Ut.length;$<xt;$++)if(rt=Ut[$],_.format!==dn)if(_t!==null)if(Vt){if(C)if(_.layerUpdates.size>0){const ct=Xl(rt.width,rt.height,_.format,_.type);for(const Q of _.layerUpdates){const Tt=rt.data.subarray(Q*ct/rt.data.BYTES_PER_ELEMENT,(Q+1)*ct/rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,Q,rt.width,rt.height,1,_t,Tt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,rt.width,rt.height,Z.depth,_t,rt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,lt,rt.width,rt.height,Z.depth,0,rt.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?C&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,rt.width,rt.height,Z.depth,_t,Mt,rt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,lt,rt.width,rt.height,Z.depth,0,_t,Mt,rt.data)}else{Vt&&ee&&e.texStorage2D(n.TEXTURE_2D,at,lt,Ut[0].width,Ut[0].height);for(let $=0,xt=Ut.length;$<xt;$++)rt=Ut[$],_.format!==dn?_t!==null?Vt?C&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,rt.width,rt.height,_t,rt.data):e.compressedTexImage2D(n.TEXTURE_2D,$,lt,rt.width,rt.height,0,rt.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?C&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,rt.width,rt.height,_t,Mt,rt.data):e.texImage2D(n.TEXTURE_2D,$,lt,rt.width,rt.height,0,_t,Mt,rt.data)}else if(_.isDataArrayTexture)if(Vt){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,lt,Z.width,Z.height,Z.depth),C)if(_.layerUpdates.size>0){const $=Xl(Z.width,Z.height,_.format,_.type);for(const xt of _.layerUpdates){const ct=Z.data.subarray(xt*$/Z.data.BYTES_PER_ELEMENT,(xt+1)*$/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xt,Z.width,Z.height,1,_t,Mt,ct)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,_t,Mt,Z.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,lt,Z.width,Z.height,Z.depth,0,_t,Mt,Z.data);else if(_.isData3DTexture)Vt?(ee&&e.texStorage3D(n.TEXTURE_3D,at,lt,Z.width,Z.height,Z.depth),C&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,_t,Mt,Z.data)):e.texImage3D(n.TEXTURE_3D,0,lt,Z.width,Z.height,Z.depth,0,_t,Mt,Z.data);else if(_.isFramebufferTexture){if(ee)if(Vt)e.texStorage2D(n.TEXTURE_2D,at,lt,Z.width,Z.height);else{let $=Z.width,xt=Z.height;for(let ct=0;ct<at;ct++)e.texImage2D(n.TEXTURE_2D,ct,lt,$,xt,0,_t,Mt,null),$>>=1,xt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Z.parentNode!==$){$.appendChild(Z),f.add(_),$.onpaint=kt=>{const Ee=kt.changedElements;for(const ae of f)Ee.includes(ae.image)&&(ae.needsUpdate=!0)},$.requestPaint();return}const xt=0,ct=n.RGBA,Q=n.RGBA,Tt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,xt,ct,Q,Tt,Z),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ut.length>0){if(Vt&&ee){const $=ge(Ut[0]);e.texStorage2D(n.TEXTURE_2D,at,lt,$.width,$.height)}for(let $=0,xt=Ut.length;$<xt;$++)rt=Ut[$],Vt?C&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,_t,Mt,rt):e.texImage2D(n.TEXTURE_2D,$,lt,_t,Mt,rt);_.generateMipmaps=!1}else if(Vt){if(ee){const $=ge(Z);e.texStorage2D(n.TEXTURE_2D,at,lt,$.width,$.height)}C&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Mt,Z)}else e.texImage2D(n.TEXTURE_2D,0,lt,_t,Mt,Z);p(_)&&E(K),ht.__version=st.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function Ot(y,_,k){if(_.image.length!==6)return;const K=J(y,_),tt=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+k);const st=i.get(tt);if(tt.version!==st.__version||K===!0){e.activeTexture(n.TEXTURE0+k);const ht=Kt.getPrimaries(Kt.workingColorSpace),Y=_.colorSpace===ei?null:Kt.getPrimaries(_.colorSpace),Z=_.colorSpace===ei||ht===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const _t=_.isCompressedTexture||_.image[0].isCompressedTexture,Mt=_.image[0]&&_.image[0].isDataTexture,lt=[];for(let Q=0;Q<6;Q++)!_t&&!Mt?lt[Q]=g(_.image[Q],!0,s.maxCubemapSize):lt[Q]=Mt?_.image[Q].image:_.image[Q],lt[Q]=dt(_,lt[Q]);const rt=lt[0],Ut=r.convert(_.format,_.colorSpace),Vt=r.convert(_.type),ee=w(_.internalFormat,Ut,Vt,_.normalized,_.colorSpace),C=_.isVideoTexture!==!0,at=st.__version===void 0||K===!0,$=tt.dataReady;let xt=T(_,rt);Ht(n.TEXTURE_CUBE_MAP,_);let ct;if(_t){C&&at&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ee,rt.width,rt.height);for(let Q=0;Q<6;Q++){ct=lt[Q].mipmaps;for(let Tt=0;Tt<ct.length;Tt++){const kt=ct[Tt];_.format!==dn?Ut!==null?C?$&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,0,0,kt.width,kt.height,Ut,kt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,ee,kt.width,kt.height,0,kt.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,0,0,kt.width,kt.height,Ut,Vt,kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt,ee,kt.width,kt.height,0,Ut,Vt,kt.data)}}}else{if(ct=_.mipmaps,C&&at){ct.length>0&&xt++;const Q=ge(lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ee,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(Mt){C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,lt[Q].width,lt[Q].height,Ut,Vt,lt[Q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ee,lt[Q].width,lt[Q].height,0,Ut,Vt,lt[Q].data);for(let Tt=0;Tt<ct.length;Tt++){const Ee=ct[Tt].image[Q].image;C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,0,0,Ee.width,Ee.height,Ut,Vt,Ee.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,ee,Ee.width,Ee.height,0,Ut,Vt,Ee.data)}}else{C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ut,Vt,lt[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ee,Ut,Vt,lt[Q]);for(let Tt=0;Tt<ct.length;Tt++){const kt=ct[Tt];C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,0,0,Ut,Vt,kt.image[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Tt+1,ee,Ut,Vt,kt.image[Q])}}}p(_)&&E(n.TEXTURE_CUBE_MAP),st.__version=tt.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function Pt(y,_,k,K,tt,st){const ht=r.convert(k.format,k.colorSpace),Y=r.convert(k.type),Z=w(k.internalFormat,ht,Y,k.normalized,k.colorSpace),_t=i.get(_),Mt=i.get(k);if(Mt.__renderTarget=_,!_t.__hasExternalTextures){const lt=Math.max(1,_.width>>st),rt=Math.max(1,_.height>>st);tt===n.TEXTURE_3D||tt===n.TEXTURE_2D_ARRAY?e.texImage3D(tt,st,Z,lt,rt,_.depth,0,ht,Y,null):e.texImage2D(tt,st,Z,lt,rt,0,ht,Y,null)}e.bindFramebuffer(n.FRAMEBUFFER,y),jt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,tt,Mt.__webglTexture,0,Ce(_)):(tt===n.TEXTURE_2D||tt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,tt,Mt.__webglTexture,st),e.bindFramebuffer(n.FRAMEBUFFER,null)}function pe(y,_,k){if(n.bindRenderbuffer(n.RENDERBUFFER,y),_.depthBuffer){const K=_.depthTexture,tt=K&&K.isDepthTexture?K.type:null,st=L(_.stencilBuffer,tt),ht=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;jt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce(_),st,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce(_),st,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,st,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,y)}else{const K=_.textures;for(let tt=0;tt<K.length;tt++){const st=K[tt],ht=r.convert(st.format,st.colorSpace),Y=r.convert(st.type),Z=w(st.internalFormat,ht,Y,st.normalized,st.colorSpace);jt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce(_),Z,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $t(y,_,k){const K=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,y),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=i.get(_.depthTexture);if(tt.__renderTarget=_,(!tt.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),K){if(tt.__webglInit===void 0&&(tt.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),tt.__webglTexture===void 0){tt.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,tt.__webglTexture),Ht(n.TEXTURE_CUBE_MAP,_.depthTexture);const _t=r.convert(_.depthTexture.format),Mt=r.convert(_.depthTexture.type);let lt;_.depthTexture.format===Hn?lt=n.DEPTH_COMPONENT24:_.depthTexture.format===xi&&(lt=n.DEPTH24_STENCIL8);for(let rt=0;rt<6;rt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,lt,_.width,_.height,0,_t,Mt,null)}}else et(_.depthTexture,0);const st=tt.__webglTexture,ht=Ce(_),Y=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,Z=_.depthTexture.format===xi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Hn)jt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Y,st,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Z,Y,st,0);else if(_.depthTexture.format===xi)jt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Y,st,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Z,Y,st,0);else throw new Error("Unknown depthTexture format")}function re(y){const _=i.get(y),k=y.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==y.depthTexture){const K=y.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),K){const tt=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,K.removeEventListener("dispose",tt)};K.addEventListener("dispose",tt),_.__depthDisposeCallback=tt}_.__boundDepthTexture=K}if(y.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let K=0;K<6;K++)$t(_.__webglFramebuffer[K],y,K);else{const K=y.texture.mipmaps;K&&K.length>0?$t(_.__webglFramebuffer[0],y,0):$t(_.__webglFramebuffer,y,0)}else if(k){_.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[K]),_.__webglDepthbuffer[K]===void 0)_.__webglDepthbuffer[K]=n.createRenderbuffer(),pe(_.__webglDepthbuffer[K],y,!1);else{const tt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,st)}}else{const K=y.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),pe(_.__webglDepthbuffer,y,!1);else{const tt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,st)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function fe(y,_,k){const K=i.get(y);_!==void 0&&Pt(K.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&re(y)}function Yt(y){const _=y.texture,k=i.get(y),K=i.get(_);y.addEventListener("dispose",M);const tt=y.textures,st=y.isWebGLCubeRenderTarget===!0,ht=tt.length>1;if(ht||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=_.version,a.memory.textures++),st){k.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[Y]=[];for(let Z=0;Z<_.mipmaps.length;Z++)k.__webglFramebuffer[Y][Z]=n.createFramebuffer()}else k.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)k.__webglFramebuffer[Y]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ht)for(let Y=0,Z=tt.length;Y<Z;Y++){const _t=i.get(tt[Y]);_t.__webglTexture===void 0&&(_t.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&jt(y)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Y=0;Y<tt.length;Y++){const Z=tt[Y];k.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[Y]);const _t=r.convert(Z.format,Z.colorSpace),Mt=r.convert(Z.type),lt=w(Z.internalFormat,_t,Mt,Z.normalized,Z.colorSpace,y.isXRRenderTarget===!0),rt=Ce(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,rt,lt,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,k.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),pe(k.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(st){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Ht(n.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Pt(k.__webglFramebuffer[Y][Z],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else Pt(k.__webglFramebuffer[Y],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(_)&&E(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Y=0,Z=tt.length;Y<Z;Y++){const _t=tt[Y],Mt=i.get(_t);let lt=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(lt=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,Mt.__webglTexture),Ht(lt,_t),Pt(k.__webglFramebuffer,y,_t,n.COLOR_ATTACHMENT0+Y,lt,0),p(_t)&&E(lt)}e.unbindTexture()}else{let Y=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(Y=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,K.__webglTexture),Ht(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Pt(k.__webglFramebuffer[Z],y,_,n.COLOR_ATTACHMENT0,Y,Z);else Pt(k.__webglFramebuffer,y,_,n.COLOR_ATTACHMENT0,Y,0);p(_)&&E(Y),e.unbindTexture()}y.depthBuffer&&re(y)}function Re(y){const _=y.textures;for(let k=0,K=_.length;k<K;k++){const tt=_[k];if(p(tt)){const st=b(y),ht=i.get(tt).__webglTexture;e.bindTexture(st,ht),E(st),e.unbindTexture()}}}const me=[],Ye=[];function D(y){if(y.samples>0){if(jt(y)===!1){const _=y.textures,k=y.width,K=y.height;let tt=n.COLOR_BUFFER_BIT;const st=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(y),Y=_.length>1;if(Y)for(let _t=0;_t<_.length;_t++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const Z=y.texture.mipmaps;Z&&Z.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let _t=0;_t<_.length;_t++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(tt|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(tt|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[_t]);const Mt=i.get(_[_t]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Mt,0)}n.blitFramebuffer(0,0,k,K,0,0,k,K,tt,n.NEAREST),c===!0&&(me.length=0,Ye.length=0,me.push(n.COLOR_ATTACHMENT0+_t),y.depthBuffer&&y.resolveDepthBuffer===!1&&(me.push(st),Ye.push(st),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ye)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let _t=0;_t<_.length;_t++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,ht.__webglColorRenderbuffer[_t]);const Mt=i.get(_[_t]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,Mt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&c){const _=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Ce(y){return Math.min(s.maxSamples,y.samples)}function jt(y){const _=i.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function de(y){const _=a.render.frame;d.get(y)!==_&&(d.set(y,_),y.update())}function dt(y,_){const k=y.colorSpace,K=y.format,tt=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||k!==pr&&k!==ei&&(Kt.getTransfer(k)===ie?(K!==dn||tt!==Ze)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):te("WebGLTextures: Unsupported texture color space:",k)),_}function ge(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=q,this.getTextureUnits=j,this.setTextureUnits=O,this.setTexture2D=et,this.setTexture2DArray=nt,this.setTexture3D=ft,this.setTextureCube=yt,this.rebindTextures=fe,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Pt,this.useMultisampledRTT=jt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function V_(n,t){function e(i,s=ei){let r;const a=Kt.getTransfer(s);if(i===Ze)return n.UNSIGNED_BYTE;if(i===yo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Eo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===th)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===eh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jc)return n.BYTE;if(i===Qc)return n.SHORT;if(i===_s)return n.UNSIGNED_SHORT;if(i===So)return n.INT;if(i===bn)return n.UNSIGNED_INT;if(i===vn)return n.FLOAT;if(i===Gn)return n.HALF_FLOAT;if(i===nh)return n.ALPHA;if(i===ih)return n.RGB;if(i===dn)return n.RGBA;if(i===Hn)return n.DEPTH_COMPONENT;if(i===xi)return n.DEPTH_STENCIL;if(i===sh)return n.RED;if(i===bo)return n.RED_INTEGER;if(i===Ai)return n.RG;if(i===To)return n.RG_INTEGER;if(i===Ao)return n.RGBA_INTEGER;if(i===ar||i===or||i===lr||i===cr)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ar)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ar)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===lr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===wa||i===Ra||i===Ca||i===Ia)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===wa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ca)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pa||i===La||i===Da||i===Ua||i===Na||i===ur||i===Fa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Pa||i===La)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Da)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ua)return r.COMPRESSED_R11_EAC;if(i===Na)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ur)return r.COMPRESSED_RG11_EAC;if(i===Fa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Oa||i===Ba||i===ka||i===za||i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===Ya||i===qa||i===$a||i===ja||i===Ka)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Oa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ba)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ka)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===za)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ga)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ha)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Va)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ya)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===qa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$a)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ja)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ka)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Za||i===Ja||i===Qa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Za)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===to||i===eo||i===fr||i===no)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===to)return r.COMPRESSED_RED_RGTC1_EXT;if(i===eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===no)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const W_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Y_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new ph(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new An({vertexShader:W_,fragmentShader:X_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tn(new yr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class q_ extends li{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,f=null,u=null,m=null,x=null;const S=typeof XRWebGLBinding<"u",g=new Y_,p={},E=e.getContextAttributes();let b=null,w=null;const L=[],T=[],P=new Gt;let M=null;const R=new hn;R.viewport=new Se;const B=new hn;B.viewport=new Se;const I=[R,B],H=new tf;let q=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let gt=L[J];return gt===void 0&&(gt=new zr,L[J]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function(J){let gt=L[J];return gt===void 0&&(gt=new zr,L[J]=gt),gt.getGripSpace()},this.getHand=function(J){let gt=L[J];return gt===void 0&&(gt=new zr,L[J]=gt),gt.getHandSpace()};function O(J){const gt=T.indexOf(J.inputSource);if(gt===-1)return;const ot=L[gt];ot!==void 0&&(ot.update(J.inputSource,J.frame,l||a),ot.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",X);for(let J=0;J<L.length;J++){const gt=T[J];gt!==null&&(T[J]=null,L[J].disconnect(gt))}q=null,j=null,g.reset();for(const J in p)delete p[J];t.setRenderTarget(b),m=null,u=null,f=null,s=null,w=null,Ht.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",W),s.addEventListener("inputsourceschange",X),E.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(P),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,It=null,Ot=null;E.depth&&(Ot=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=E.stencil?xi:Hn,It=E.stencil?xs:bn);const Pt={colorFormat:e.RGBA8,depthFormat:Ot,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Pt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),w=new yn(u.textureWidth,u.textureHeight,{format:dn,type:Ze,depthTexture:new Zi(u.textureWidth,u.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ot={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new yn(m.framebufferWidth,m.framebufferHeight,{format:dn,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ht.setContext(s),Ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X(J){for(let gt=0;gt<J.removed.length;gt++){const ot=J.removed[gt],It=T.indexOf(ot);It>=0&&(T[It]=null,L[It].disconnect(ot))}for(let gt=0;gt<J.added.length;gt++){const ot=J.added[gt];let It=T.indexOf(ot);if(It===-1){for(let Pt=0;Pt<L.length;Pt++)if(Pt>=T.length){T.push(ot),It=Pt;break}else if(T[Pt]===null){T[Pt]=ot,It=Pt;break}if(It===-1)break}const Ot=L[It];Ot&&Ot.connect(ot)}}const et=new F,nt=new F;function ft(J,gt,ot){et.setFromMatrixPosition(gt.matrixWorld),nt.setFromMatrixPosition(ot.matrixWorld);const It=et.distanceTo(nt),Ot=gt.projectionMatrix.elements,Pt=ot.projectionMatrix.elements,pe=Ot[14]/(Ot[10]-1),$t=Ot[14]/(Ot[10]+1),re=(Ot[9]+1)/Ot[5],fe=(Ot[9]-1)/Ot[5],Yt=(Ot[8]-1)/Ot[0],Re=(Pt[8]+1)/Pt[0],me=pe*Yt,Ye=pe*Re,D=It/(-Yt+Re),Ce=D*-Yt;if(gt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ce),J.translateZ(D),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ot[10]===-1)J.projectionMatrix.copy(gt.projectionMatrix),J.projectionMatrixInverse.copy(gt.projectionMatrixInverse);else{const jt=pe+D,de=$t+D,dt=me-Ce,ge=Ye+(It-Ce),y=re*$t/de*jt,_=fe*$t/de*jt;J.projectionMatrix.makePerspective(dt,ge,y,_,jt,de),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function yt(J,gt){gt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(gt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let gt=J.near,ot=J.far;g.texture!==null&&(g.depthNear>0&&(gt=g.depthNear),g.depthFar>0&&(ot=g.depthFar)),H.near=B.near=R.near=gt,H.far=B.far=R.far=ot,(q!==H.near||j!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),q=H.near,j=H.far),H.layers.mask=J.layers.mask|6,R.layers.mask=H.layers.mask&-5,B.layers.mask=H.layers.mask&-3;const It=J.parent,Ot=H.cameras;yt(H,It);for(let Pt=0;Pt<Ot.length;Pt++)yt(Ot[Pt],It);Ot.length===2?ft(H,R,B):H.projectionMatrix.copy(R.projectionMatrix),wt(J,H,It)};function wt(J,gt,ot){ot===null?J.matrix.copy(gt.matrixWorld):(J.matrix.copy(ot.matrixWorld),J.matrix.invert(),J.matrix.multiply(gt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(gt.projectionMatrix),J.projectionMatrixInverse.copy(gt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ro*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function(J){c=J,u!==null&&(u.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(J){return p[J]};let Jt=null;function se(J,gt){if(d=gt.getViewerPose(l||a),x=gt,d!==null){const ot=d.views;m!==null&&(t.setRenderTargetFramebuffer(w,m.framebuffer),t.setRenderTarget(w));let It=!1;ot.length!==H.cameras.length&&(H.cameras.length=0,It=!0);for(let $t=0;$t<ot.length;$t++){const re=ot[$t];let fe=null;if(m!==null)fe=m.getViewport(re);else{const Re=f.getViewSubImage(u,re);fe=Re.viewport,$t===0&&(t.setRenderTargetTextures(w,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(w))}let Yt=I[$t];Yt===void 0&&(Yt=new hn,Yt.layers.enable($t),Yt.viewport=new Se,I[$t]=Yt),Yt.matrix.fromArray(re.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(re.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(fe.x,fe.y,fe.width,fe.height),$t===0&&(H.matrix.copy(Yt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),It===!0&&H.cameras.push(Yt)}const Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const $t=f.getDepthInformation(ot[0]);$t&&$t.isValid&&$t.texture&&g.init($t,s.renderState)}if(Ot&&Ot.includes("camera-access")&&S){t.state.unbindTexture(),f=i.getBinding();for(let $t=0;$t<ot.length;$t++){const re=ot[$t].camera;if(re){let fe=p[re];fe||(fe=new ph,p[re]=fe);const Yt=f.getCameraImage(re);fe.sourceTexture=Yt}}}}for(let ot=0;ot<L.length;ot++){const It=T[ot],Ot=L[ot];It!==null&&Ot!==void 0&&Ot.update(It,gt,l||a)}Jt&&Jt(J,gt),gt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:gt}),x=null}const Ht=new xh;Ht.setAnimationLoop(se),this.setAnimationLoop=function(J){Jt=J},this.dispose=function(){}}}const $_=new ye,Th=new Bt;Th.set(-1,0,0,0,1,0,0,0,1);function j_(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,mh(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,b,w){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),d(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&m(g,p,w)):p.isMeshMatcapMaterial?(r(g,p),x(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),S(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,E,b):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===We&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===We&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const E=t.get(p),b=E.envMap,w=E.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4($_.makeRotationFromEuler(w)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Th),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,E,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=b*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===We&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function S(g,p){const E=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function K_(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,b){const w=b.program;i.uniformBlockBinding(E,w)}function l(E,b){let w=s[E.id];w===void 0&&(x(E),w=d(E),s[E.id]=w,E.addEventListener("dispose",g));const L=b.program;i.updateUBOMapping(E,L);const T=t.render.frame;r[E.id]!==T&&(u(E),r[E.id]=T)}function d(E){const b=f();E.__bindingPointIndex=b;const w=n.createBuffer(),L=E.__size,T=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,L,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,w),w}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return te("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const b=s[E.id],w=E.uniforms,L=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let T=0,P=w.length;T<P;T++){const M=Array.isArray(w[T])?w[T]:[w[T]];for(let R=0,B=M.length;R<B;R++){const I=M[R];if(m(I,T,R,L)===!0){const H=I.__offset,q=Array.isArray(I.value)?I.value:[I.value];let j=0;for(let O=0;O<q.length;O++){const W=q[O],X=S(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,H+j,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):ArrayBuffer.isView(W)?I.__data.set(new W.constructor(W.buffer,W.byteOffset,I.__data.length)):(W.toArray(I.__data,j),j+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,b,w,L){const T=E.value,P=b+"_"+w;if(L[P]===void 0)return typeof T=="number"||typeof T=="boolean"?L[P]=T:ArrayBuffer.isView(T)?L[P]=T.slice():L[P]=T.clone(),!0;{const M=L[P];if(typeof T=="number"||typeof T=="boolean"){if(M!==T)return L[P]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(M.equals(T)===!1)return M.copy(T),!0}}return!1}function x(E){const b=E.uniforms;let w=0;const L=16;for(let P=0,M=b.length;P<M;P++){const R=Array.isArray(b[P])?b[P]:[b[P]];for(let B=0,I=R.length;B<I;B++){const H=R[B],q=Array.isArray(H.value)?H.value:[H.value];for(let j=0,O=q.length;j<O;j++){const W=q[j],X=S(W),et=w%L,nt=et%X.boundary,ft=et+nt;w+=nt,ft!==0&&L-ft<X.storage&&(w+=L-ft),H.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=w,w+=X.storage}}}const T=w%L;return T>0&&(w+=L-T),E.__size=w,E.__cache={},this}function S(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(b.boundary=16,b.storage=E.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",E),b}function g(E){const b=E.target;b.removeEventListener("dispose",g);const w=a.indexOf(b.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}const Z_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gn=null;function J_(){return gn===null&&(gn=new Nu(Z_,16,16,Ai,Gn),gn.name="DFG_LUT",gn.minFilter=ke,gn.magFilter=ke,gn.wrapS=Nn,gn.wrapT=Nn,gn.generateMipmaps=!1,gn.needsUpdate=!0),gn}class Q_{constructor(t={}){const{canvas:e=du(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:m=Ze}=t;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;const S=m,g=new Set([Ao,To,bo]),p=new Set([Ze,bn,_s,xs,yo,Eo]),E=new Uint32Array(4),b=new Int32Array(4),w=new F;let L=null,T=null;const P=[],M=[];let R=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let I=!1,H=null;this._outputColorSpace=Ke;let q=0,j=0,O=null,W=-1,X=null;const et=new Se,nt=new Se;let ft=null;const yt=new Zt(0);let wt=0,Jt=e.width,se=e.height,Ht=1,J=null,gt=null;const ot=new Se(0,0,Jt,se),It=new Se(0,0,Jt,se);let Ot=!1;const Pt=new Po;let pe=!1,$t=!1;const re=new ye,fe=new F,Yt=new Se,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Ye(){return O===null?Ht:1}let D=i;function Ce(v,N){return e.getContext(v,N)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Mo}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",kt,!1),D===null){const N="webgl2";if(D=Ce(N,v),D===null)throw Ce(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw te("WebGLRenderer: "+v.message),v}let jt,de,dt,ge,y,_,k,K,tt,st,ht,Y,Z,_t,Mt,lt,rt,Ut,Vt,ee,C,at,$;function xt(){jt=new Jm(D),jt.init(),C=new V_(D,jt),de=new Wm(D,jt,t,C),dt=new G_(D,jt),de.reversedDepthBuffer&&u&&dt.buffers.depth.setReversed(!0),ge=new eg(D),y=new w_,_=new H_(D,jt,dt,y,de,C,ge),k=new Zm(B),K=new rf(D),at=new Hm(D,K),tt=new Qm(D,K,ge,at),st=new ig(D,tt,K,at,ge),Ut=new ng(D,de,_),Mt=new Xm(y),ht=new A_(B,k,jt,de,at,Mt),Y=new j_(B,y),Z=new C_,_t=new N_(jt),rt=new Gm(B,k,dt,st,x,c),lt=new z_(B,st,de),$=new K_(D,ge,de,dt),Vt=new Vm(D,jt,ge),ee=new tg(D,jt,ge),ge.programs=ht.programs,B.capabilities=de,B.extensions=jt,B.properties=y,B.renderLists=Z,B.shadowMap=lt,B.state=dt,B.info=ge}xt(),S!==Ze&&(R=new rg(S,e.width,e.height,s,r));const ct=new q_(B,D);this.xr=ct,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const v=jt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=jt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Ht},this.setPixelRatio=function(v){v!==void 0&&(Ht=v,this.setSize(Jt,se,!1))},this.getSize=function(v){return v.set(Jt,se)},this.setSize=function(v,N,V=!0){if(ct.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}Jt=v,se=N,e.width=Math.floor(v*Ht),e.height=Math.floor(N*Ht),V===!0&&(e.style.width=v+"px",e.style.height=N+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,v,N)},this.getDrawingBufferSize=function(v){return v.set(Jt*Ht,se*Ht).floor()},this.setDrawingBufferSize=function(v,N,V){Jt=v,se=N,Ht=V,e.width=Math.floor(v*V),e.height=Math.floor(N*V),this.setViewport(0,0,v,N)},this.setEffects=function(v){if(S===Ze){te("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let N=0;N<v.length;N++)if(v[N].isOutputPass===!0){Ct("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(et)},this.getViewport=function(v){return v.copy(ot)},this.setViewport=function(v,N,V,z){v.isVector4?ot.set(v.x,v.y,v.z,v.w):ot.set(v,N,V,z),dt.viewport(et.copy(ot).multiplyScalar(Ht).round())},this.getScissor=function(v){return v.copy(It)},this.setScissor=function(v,N,V,z){v.isVector4?It.set(v.x,v.y,v.z,v.w):It.set(v,N,V,z),dt.scissor(nt.copy(It).multiplyScalar(Ht).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(v){dt.setScissorTest(Ot=v)},this.setOpaqueSort=function(v){J=v},this.setTransparentSort=function(v){gt=v},this.getClearColor=function(v){return v.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(v=!0,N=!0,V=!0){let z=0;if(v){let G=!1;if(O!==null){const mt=O.texture.format;G=g.has(mt)}if(G){const mt=O.texture.type,St=p.has(mt),pt=rt.getClearColor(),Et=rt.getClearAlpha(),At=pt.r,zt=pt.g,Xt=pt.b;St?(E[0]=At,E[1]=zt,E[2]=Xt,E[3]=Et,D.clearBufferuiv(D.COLOR,0,E)):(b[0]=At,b[1]=zt,b[2]=Xt,b[3]=Et,D.clearBufferiv(D.COLOR,0,b))}else z|=D.COLOR_BUFFER_BIT}N&&(z|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),H=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",kt,!1),rt.dispose(),Z.dispose(),_t.dispose(),y.dispose(),k.dispose(),st.dispose(),at.dispose(),$.dispose(),ht.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Jo),ct.removeEventListener("sessionend",Qo),ci.stop()};function Q(v){v.preventDefault(),xl("WebGLRenderer: Context Lost."),I=!0}function Tt(){xl("WebGLRenderer: Context Restored."),I=!1;const v=ge.autoReset,N=lt.enabled,V=lt.autoUpdate,z=lt.needsUpdate,G=lt.type;xt(),ge.autoReset=v,lt.enabled=N,lt.autoUpdate=V,lt.needsUpdate=z,lt.type=G}function kt(v){te("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ee(v){const N=v.target;N.removeEventListener("dispose",Ee),ae(N)}function ae(v){wn(v),y.remove(v)}function wn(v){const N=y.get(v).programs;N!==void 0&&(N.forEach(function(V){ht.releaseProgram(V)}),v.isShaderMaterial&&ht.releaseShaderCache(v))}this.renderBufferDirect=function(v,N,V,z,G,mt){N===null&&(N=Re);const St=G.isMesh&&G.matrixWorld.determinant()<0,pt=hd(v,N,V,z,G);dt.setMaterial(z,St);let Et=V.index,At=1;if(z.wireframe===!0){if(Et=tt.getWireframeAttribute(V),Et===void 0)return;At=2}const zt=V.drawRange,Xt=V.attributes.position;let Rt=zt.start*At,oe=(zt.start+zt.count)*At;mt!==null&&(Rt=Math.max(Rt,mt.start*At),oe=Math.min(oe,(mt.start+mt.count)*At)),Et!==null?(Rt=Math.max(Rt,0),oe=Math.min(oe,Et.count)):Xt!=null&&(Rt=Math.max(Rt,0),oe=Math.min(oe,Xt.count));const be=oe-Rt;if(be<0||be===1/0)return;at.setup(G,z,pt,V,Et);let _e,ce=Vt;if(Et!==null&&(_e=K.get(Et),ce=ee,ce.setIndex(_e)),G.isMesh)z.wireframe===!0?(dt.setLineWidth(z.wireframeLinewidth*Ye()),ce.setMode(D.LINES)):ce.setMode(D.TRIANGLES);else if(G.isLine){let Fe=z.linewidth;Fe===void 0&&(Fe=1),dt.setLineWidth(Fe*Ye()),G.isLineSegments?ce.setMode(D.LINES):G.isLineLoop?ce.setMode(D.LINE_LOOP):ce.setMode(D.LINE_STRIP)}else G.isPoints?ce.setMode(D.POINTS):G.isSprite&&ce.setMode(D.TRIANGLES);if(G.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))ce.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Fe=G._multiDrawStarts,vt=G._multiDrawCounts,qe=G._multiDrawCount,Qt=Et?K.get(Et).bytesPerElement:1,Je=y.get(z).currentProgram.getUniforms();for(let fn=0;fn<qe;fn++)Je.setValue(D,"_gl_DrawID",fn),ce.render(Fe[fn]/Qt,vt[fn])}else if(G.isInstancedMesh)ce.renderInstances(Rt,be,G.count);else if(V.isInstancedBufferGeometry){const Fe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,vt=Math.min(V.instanceCount,Fe);ce.renderInstances(Rt,be,vt)}else ce.render(Rt,be)};function un(v,N,V){v.transparent===!0&&v.side===Un&&v.forceSinglePass===!1?(v.side=We,v.needsUpdate=!0,Rs(v,N,V),v.side=ri,v.needsUpdate=!0,Rs(v,N,V),v.side=Un):Rs(v,N,V)}this.compile=function(v,N,V=null){V===null&&(V=v),T=_t.get(V),T.init(N),M.push(T),V.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),v!==V&&v.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights();const z=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const mt=G.material;if(mt)if(Array.isArray(mt))for(let St=0;St<mt.length;St++){const pt=mt[St];un(pt,V,G),z.add(pt)}else un(mt,V,G),z.add(mt)}),T=M.pop(),z},this.compileAsync=function(v,N,V=null){const z=this.compile(v,N,V);return new Promise(G=>{function mt(){if(z.forEach(function(St){y.get(St).currentProgram.isReady()&&z.delete(St)}),z.size===0){G(v);return}setTimeout(mt,10)}jt.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Rr=null;function ld(v){Rr&&Rr(v)}function Jo(){ci.stop()}function Qo(){ci.start()}const ci=new xh;ci.setAnimationLoop(ld),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(v){Rr=v,ct.setAnimationLoop(v),v===null?ci.stop():ci.start()},ct.addEventListener("sessionstart",Jo),ct.addEventListener("sessionend",Qo),this.render=function(v,N){if(N!==void 0&&N.isCamera!==!0){te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;H!==null&&H.renderStart(v,N);const V=ct.enabled===!0&&ct.isPresenting===!0,z=R!==null&&(O===null||V)&&R.begin(B,O);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(N),N=ct.getCamera()),v.isScene===!0&&v.onBeforeRender(B,v,N,O),T=_t.get(v,M.length),T.init(N),T.state.textureUnits=_.getTextureUnits(),M.push(T),re.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Pt.setFromProjectionMatrix(re,Mn,N.reversedDepth),$t=this.localClippingEnabled,pe=Mt.init(this.clippingPlanes,$t),L=Z.get(v,P.length),L.init(),P.push(L),ct.enabled===!0&&ct.isPresenting===!0){const St=B.xr.getDepthSensingMesh();St!==null&&Cr(St,N,-1/0,B.sortObjects)}Cr(v,N,0,B.sortObjects),L.finish(),B.sortObjects===!0&&L.sort(J,gt),me=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,me&&rt.addToRenderList(L,v),this.info.render.frame++,pe===!0&&Mt.beginShadows();const G=T.state.shadowsArray;if(lt.render(G,v,N),pe===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&R.hasRenderPass())===!1){const St=L.opaque,pt=L.transmissive;if(T.setupLights(),N.isArrayCamera){const Et=N.cameras;if(pt.length>0)for(let At=0,zt=Et.length;At<zt;At++){const Xt=Et[At];el(St,pt,v,Xt)}me&&rt.render(v);for(let At=0,zt=Et.length;At<zt;At++){const Xt=Et[At];tl(L,v,Xt,Xt.viewport)}}else pt.length>0&&el(St,pt,v,N),me&&rt.render(v),tl(L,v,N)}O!==null&&j===0&&(_.updateMultisampleRenderTarget(O),_.updateRenderTargetMipmap(O)),z&&R.end(B),v.isScene===!0&&v.onAfterRender(B,v,N),at.resetDefaultState(),W=-1,X=null,M.pop(),M.length>0?(T=M[M.length-1],_.setTextureUnits(T.state.textureUnits),pe===!0&&Mt.setGlobalState(B.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?L=P[P.length-1]:L=null,H!==null&&H.renderEnd()};function Cr(v,N,V,z){if(v.visible===!1)return;if(v.layers.test(N.layers)){if(v.isGroup)V=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(N);else if(v.isLightProbeGrid)T.pushLightProbeGrid(v);else if(v.isLight)T.pushLight(v),v.castShadow&&T.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Pt.intersectsSprite(v)){z&&Yt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(re);const St=st.update(v),pt=v.material;pt.visible&&L.push(v,St,pt,V,Yt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Pt.intersectsObject(v))){const St=st.update(v),pt=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Yt.copy(v.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Yt.copy(St.boundingSphere.center)),Yt.applyMatrix4(v.matrixWorld).applyMatrix4(re)),Array.isArray(pt)){const Et=St.groups;for(let At=0,zt=Et.length;At<zt;At++){const Xt=Et[At],Rt=pt[Xt.materialIndex];Rt&&Rt.visible&&L.push(v,St,Rt,V,Yt.z,Xt)}}else pt.visible&&L.push(v,St,pt,V,Yt.z,null)}}const mt=v.children;for(let St=0,pt=mt.length;St<pt;St++)Cr(mt[St],N,V,z)}function tl(v,N,V,z){const{opaque:G,transmissive:mt,transparent:St}=v;T.setupLightsView(V),pe===!0&&Mt.setGlobalState(B.clippingPlanes,V),z&&dt.viewport(et.copy(z)),G.length>0&&ws(G,N,V),mt.length>0&&ws(mt,N,V),St.length>0&&ws(St,N,V),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function el(v,N,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){const Rt=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new yn(1,1,{generateMipmaps:!0,type:Rt?Gn:Ze,minFilter:_i,samples:Math.max(4,de.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const mt=T.state.transmissionRenderTarget[z.id],St=z.viewport||et;mt.setSize(St.z*B.transmissionResolutionScale,St.w*B.transmissionResolutionScale);const pt=B.getRenderTarget(),Et=B.getActiveCubeFace(),At=B.getActiveMipmapLevel();B.setRenderTarget(mt),B.getClearColor(yt),wt=B.getClearAlpha(),wt<1&&B.setClearColor(16777215,.5),B.clear(),me&&rt.render(V);const zt=B.toneMapping;B.toneMapping=Sn;const Xt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),pe===!0&&Mt.setGlobalState(B.clippingPlanes,z),ws(v,V,z),_.updateMultisampleRenderTarget(mt),_.updateRenderTargetMipmap(mt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let oe=0,be=N.length;oe<be;oe++){const _e=N[oe],{object:ce,geometry:Fe,material:vt,group:qe}=_e;if(vt.side===Un&&ce.layers.test(z.layers)){const Qt=vt.side;vt.side=We,vt.needsUpdate=!0,nl(ce,V,z,Fe,vt,qe),vt.side=Qt,vt.needsUpdate=!0,Rt=!0}}Rt===!0&&(_.updateMultisampleRenderTarget(mt),_.updateRenderTargetMipmap(mt))}B.setRenderTarget(pt,Et,At),B.setClearColor(yt,wt),Xt!==void 0&&(z.viewport=Xt),B.toneMapping=zt}function ws(v,N,V){const z=N.isScene===!0?N.overrideMaterial:null;for(let G=0,mt=v.length;G<mt;G++){const St=v[G],{object:pt,geometry:Et,group:At}=St;let zt=St.material;zt.allowOverride===!0&&z!==null&&(zt=z),pt.layers.test(V.layers)&&nl(pt,N,V,Et,zt,At)}}function nl(v,N,V,z,G,mt){v.onBeforeRender(B,N,V,z,G,mt),v.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(B,N,V,z,v,mt),G.transparent===!0&&G.side===Un&&G.forceSinglePass===!1?(G.side=We,G.needsUpdate=!0,B.renderBufferDirect(V,N,z,G,v,mt),G.side=ri,G.needsUpdate=!0,B.renderBufferDirect(V,N,z,G,v,mt),G.side=Un):B.renderBufferDirect(V,N,z,G,v,mt),v.onAfterRender(B,N,V,z,G,mt)}function Rs(v,N,V){N.isScene!==!0&&(N=Re);const z=y.get(v),G=T.state.lights,mt=T.state.shadowsArray,St=G.state.version,pt=ht.getParameters(v,G.state,mt,N,V,T.state.lightProbeGridArray),Et=ht.getProgramCacheKey(pt);let At=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;const zt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=k.get(v.envMap||z.environment,zt),z.envMapRotation=z.environment!==null&&v.envMap===null?N.environmentRotation:v.envMapRotation,At===void 0&&(v.addEventListener("dispose",Ee),At=new Map,z.programs=At);let Xt=At.get(Et);if(Xt!==void 0){if(z.currentProgram===Xt&&z.lightsStateVersion===St)return sl(v,pt),Xt}else pt.uniforms=ht.getUniforms(v),H!==null&&v.isNodeMaterial&&H.build(v,V,pt),v.onBeforeCompile(pt,B),Xt=ht.acquireProgram(pt,Et),At.set(Et,Xt),z.uniforms=pt.uniforms;const Rt=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Rt.clippingPlanes=Mt.uniform),sl(v,pt),z.needsLights=ud(v),z.lightsStateVersion=St,z.needsLights&&(Rt.ambientLightColor.value=G.state.ambient,Rt.lightProbe.value=G.state.probe,Rt.directionalLights.value=G.state.directional,Rt.directionalLightShadows.value=G.state.directionalShadow,Rt.spotLights.value=G.state.spot,Rt.spotLightShadows.value=G.state.spotShadow,Rt.rectAreaLights.value=G.state.rectArea,Rt.ltc_1.value=G.state.rectAreaLTC1,Rt.ltc_2.value=G.state.rectAreaLTC2,Rt.pointLights.value=G.state.point,Rt.pointLightShadows.value=G.state.pointShadow,Rt.hemisphereLights.value=G.state.hemi,Rt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Rt.spotLightMatrix.value=G.state.spotLightMatrix,Rt.spotLightMap.value=G.state.spotLightMap,Rt.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=Xt,z.uniformsList=null,Xt}function il(v){if(v.uniformsList===null){const N=v.currentProgram.getUniforms();v.uniformsList=hr.seqWithValue(N.seq,v.uniforms)}return v.uniformsList}function sl(v,N){const V=y.get(v);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function cd(v,N){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;w.setFromMatrixPosition(N.matrixWorld);for(let V=0,z=v.length;V<z;V++){const G=v[V];if(G.texture!==null&&G.boundingBox.containsPoint(w))return G}return null}function hd(v,N,V,z,G){N.isScene!==!0&&(N=Re),_.resetTextureUnits();const mt=N.fog,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,pt=O===null?B.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Kt.workingColorSpace,Et=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,At=k.get(z.envMap||St,Et),zt=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xt=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Rt=!!V.morphAttributes.position,oe=!!V.morphAttributes.normal,be=!!V.morphAttributes.color;let _e=Sn;z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(_e=B.toneMapping);const ce=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Fe=ce!==void 0?ce.length:0,vt=y.get(z),qe=T.state.lights;if(pe===!0&&($t===!0||v!==X)){const ue=v===X&&z.id===W;Mt.setState(z,v,ue)}let Qt=!1;z.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==qe.state.version||vt.outputColorSpace!==pt||G.isBatchedMesh&&vt.batching===!1||!G.isBatchedMesh&&vt.batching===!0||G.isBatchedMesh&&vt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&vt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&vt.instancing===!1||!G.isInstancedMesh&&vt.instancing===!0||G.isSkinnedMesh&&vt.skinning===!1||!G.isSkinnedMesh&&vt.skinning===!0||G.isInstancedMesh&&vt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&vt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&vt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&vt.instancingMorph===!1&&G.morphTexture!==null||vt.envMap!==At||z.fog===!0&&vt.fog!==mt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==Mt.numPlanes||vt.numIntersection!==Mt.numIntersection)||vt.vertexAlphas!==zt||vt.vertexTangents!==Xt||vt.morphTargets!==Rt||vt.morphNormals!==oe||vt.morphColors!==be||vt.toneMapping!==_e||vt.morphTargetsCount!==Fe||!!vt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Qt=!0):(Qt=!0,vt.__version=z.version);let Je=vt.currentProgram;Qt===!0&&(Je=Rs(z,N,G),H&&z.isNodeMaterial&&H.onUpdateProgram(z,Je,vt));let fn=!1,Wn=!1,wi=!1;const he=Je.getUniforms(),Te=vt.uniforms;if(dt.useProgram(Je.program)&&(fn=!0,Wn=!0,wi=!0),z.id!==W&&(W=z.id,Wn=!0),vt.needsLights){const ue=cd(T.state.lightProbeGridArray,G);vt.lightProbeGrid!==ue&&(vt.lightProbeGrid=ue,Wn=!0)}if(fn||X!==v){dt.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),he.setValue(D,"projectionMatrix",v.projectionMatrix),he.setValue(D,"viewMatrix",v.matrixWorldInverse);const Yn=he.map.cameraPosition;Yn!==void 0&&Yn.setValue(D,fe.setFromMatrixPosition(v.matrixWorld)),de.logarithmicDepthBuffer&&he.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&he.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),X!==v&&(X=v,Wn=!0,wi=!0)}if(vt.needsLights&&(qe.state.directionalShadowMap.length>0&&he.setValue(D,"directionalShadowMap",qe.state.directionalShadowMap,_),qe.state.spotShadowMap.length>0&&he.setValue(D,"spotShadowMap",qe.state.spotShadowMap,_),qe.state.pointShadowMap.length>0&&he.setValue(D,"pointShadowMap",qe.state.pointShadowMap,_)),G.isSkinnedMesh){he.setOptional(D,G,"bindMatrix"),he.setOptional(D,G,"bindMatrixInverse");const ue=G.skeleton;ue&&(ue.boneTexture===null&&ue.computeBoneTexture(),he.setValue(D,"boneTexture",ue.boneTexture,_))}G.isBatchedMesh&&(he.setOptional(D,G,"batchingTexture"),he.setValue(D,"batchingTexture",G._matricesTexture,_),he.setOptional(D,G,"batchingIdTexture"),he.setValue(D,"batchingIdTexture",G._indirectTexture,_),he.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&he.setValue(D,"batchingColorTexture",G._colorsTexture,_));const Xn=V.morphAttributes;if((Xn.position!==void 0||Xn.normal!==void 0||Xn.color!==void 0)&&Ut.update(G,V,Je),(Wn||vt.receiveShadow!==G.receiveShadow)&&(vt.receiveShadow=G.receiveShadow,he.setValue(D,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(Te.envMapIntensity.value=N.environmentIntensity),Te.dfgLUT!==void 0&&(Te.dfgLUT.value=J_()),Wn){if(he.setValue(D,"toneMappingExposure",B.toneMappingExposure),vt.needsLights&&dd(Te,wi),mt&&z.fog===!0&&Y.refreshFogUniforms(Te,mt),Y.refreshMaterialUniforms(Te,z,Ht,se,T.state.transmissionRenderTarget[v.id]),vt.needsLights&&vt.lightProbeGrid){const ue=vt.lightProbeGrid;Te.probesSH.value=ue.texture,Te.probesMin.value.copy(ue.boundingBox.min),Te.probesMax.value.copy(ue.boundingBox.max),Te.probesResolution.value.copy(ue.resolution)}hr.upload(D,il(vt),Te,_)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(hr.upload(D,il(vt),Te,_),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&he.setValue(D,"center",G.center),he.setValue(D,"modelViewMatrix",G.modelViewMatrix),he.setValue(D,"normalMatrix",G.normalMatrix),he.setValue(D,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const ue=z.uniformsGroups;for(let Yn=0,Ri=ue.length;Yn<Ri;Yn++){const rl=ue[Yn];$.update(rl,Je),$.bind(rl,Je)}}return Je}function dd(v,N){v.ambientLightColor.needsUpdate=N,v.lightProbe.needsUpdate=N,v.directionalLights.needsUpdate=N,v.directionalLightShadows.needsUpdate=N,v.pointLights.needsUpdate=N,v.pointLightShadows.needsUpdate=N,v.spotLights.needsUpdate=N,v.spotLightShadows.needsUpdate=N,v.rectAreaLights.needsUpdate=N,v.hemisphereLights.needsUpdate=N}function ud(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(v,N,V){const z=y.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),y.get(v.texture).__webglTexture=N,y.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,N){const V=y.get(v);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};const fd=D.createFramebuffer();this.setRenderTarget=function(v,N=0,V=0){O=v,q=N,j=V;let z=null,G=!1,mt=!1;if(v){const pt=y.get(v);if(pt.__useDefaultFramebuffer!==void 0){dt.bindFramebuffer(D.FRAMEBUFFER,pt.__webglFramebuffer),et.copy(v.viewport),nt.copy(v.scissor),ft=v.scissorTest,dt.viewport(et),dt.scissor(nt),dt.setScissorTest(ft),W=-1;return}else if(pt.__webglFramebuffer===void 0)_.setupRenderTarget(v);else if(pt.__hasExternalTextures)_.rebindTextures(v,y.get(v.texture).__webglTexture,y.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const zt=v.depthTexture;if(pt.__boundDepthTexture!==zt){if(zt!==null&&y.has(zt)&&(v.width!==zt.image.width||v.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(v)}}const Et=v.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(mt=!0);const At=y.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(At[N])?z=At[N][V]:z=At[N],G=!0):v.samples>0&&_.useMultisampledRTT(v)===!1?z=y.get(v).__webglMultisampledFramebuffer:Array.isArray(At)?z=At[V]:z=At,et.copy(v.viewport),nt.copy(v.scissor),ft=v.scissorTest}else et.copy(ot).multiplyScalar(Ht).floor(),nt.copy(It).multiplyScalar(Ht).floor(),ft=Ot;if(V!==0&&(z=fd),dt.bindFramebuffer(D.FRAMEBUFFER,z)&&dt.drawBuffers(v,z),dt.viewport(et),dt.scissor(nt),dt.setScissorTest(ft),G){const pt=y.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,V)}else if(mt){const pt=N;for(let Et=0;Et<v.textures.length;Et++){const At=y.get(v.textures[Et]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Et,At.__webglTexture,V,pt)}}else if(v!==null&&V!==0){const pt=y.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pt.__webglTexture,V)}W=-1},this.readRenderTargetPixels=function(v,N,V,z,G,mt,St,pt=0){if(!(v&&v.isWebGLRenderTarget)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=y.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(Et=Et[St]),Et){dt.bindFramebuffer(D.FRAMEBUFFER,Et);try{const At=v.textures[pt],zt=At.format,Xt=At.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pt),!de.textureFormatReadable(zt)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!de.textureTypeReadable(Xt)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=v.width-z&&V>=0&&V<=v.height-G&&D.readPixels(N,V,z,G,C.convert(zt),C.convert(Xt),mt)}finally{const At=O!==null?y.get(O).__webglFramebuffer:null;dt.bindFramebuffer(D.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(v,N,V,z,G,mt,St,pt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=y.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(Et=Et[St]),Et)if(N>=0&&N<=v.width-z&&V>=0&&V<=v.height-G){dt.bindFramebuffer(D.FRAMEBUFFER,Et);const At=v.textures[pt],zt=At.format,Xt=At.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pt),!de.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!de.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Rt),D.bufferData(D.PIXEL_PACK_BUFFER,mt.byteLength,D.STREAM_READ),D.readPixels(N,V,z,G,C.convert(zt),C.convert(Xt),0);const oe=O!==null?y.get(O).__webglFramebuffer:null;dt.bindFramebuffer(D.FRAMEBUFFER,oe);const be=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await uu(D,be,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Rt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,mt),D.deleteBuffer(Rt),D.deleteSync(be),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,N=null,V=0){const z=Math.pow(2,-V),G=Math.floor(v.image.width*z),mt=Math.floor(v.image.height*z),St=N!==null?N.x:0,pt=N!==null?N.y:0;_.setTexture2D(v,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,St,pt,G,mt),dt.unbindTexture()};const pd=D.createFramebuffer(),md=D.createFramebuffer();this.copyTextureToTexture=function(v,N,V=null,z=null,G=0,mt=0){let St,pt,Et,At,zt,Xt,Rt,oe,be;const _e=v.isCompressedTexture?v.mipmaps[mt]:v.image;if(V!==null)St=V.max.x-V.min.x,pt=V.max.y-V.min.y,Et=V.isBox3?V.max.z-V.min.z:1,At=V.min.x,zt=V.min.y,Xt=V.isBox3?V.min.z:0;else{const Te=Math.pow(2,-G);St=Math.floor(_e.width*Te),pt=Math.floor(_e.height*Te),v.isDataArrayTexture?Et=_e.depth:v.isData3DTexture?Et=Math.floor(_e.depth*Te):Et=1,At=0,zt=0,Xt=0}z!==null?(Rt=z.x,oe=z.y,be=z.z):(Rt=0,oe=0,be=0);const ce=C.convert(N.format),Fe=C.convert(N.type);let vt;N.isData3DTexture?(_.setTexture3D(N,0),vt=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(_.setTexture2DArray(N,0),vt=D.TEXTURE_2D_ARRAY):(_.setTexture2D(N,0),vt=D.TEXTURE_2D),dt.activeTexture(D.TEXTURE0),dt.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),dt.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),dt.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const qe=dt.getParameter(D.UNPACK_ROW_LENGTH),Qt=dt.getParameter(D.UNPACK_IMAGE_HEIGHT),Je=dt.getParameter(D.UNPACK_SKIP_PIXELS),fn=dt.getParameter(D.UNPACK_SKIP_ROWS),Wn=dt.getParameter(D.UNPACK_SKIP_IMAGES);dt.pixelStorei(D.UNPACK_ROW_LENGTH,_e.width),dt.pixelStorei(D.UNPACK_IMAGE_HEIGHT,_e.height),dt.pixelStorei(D.UNPACK_SKIP_PIXELS,At),dt.pixelStorei(D.UNPACK_SKIP_ROWS,zt),dt.pixelStorei(D.UNPACK_SKIP_IMAGES,Xt);const wi=v.isDataArrayTexture||v.isData3DTexture,he=N.isDataArrayTexture||N.isData3DTexture;if(v.isDepthTexture){const Te=y.get(v),Xn=y.get(N),ue=y.get(Te.__renderTarget),Yn=y.get(Xn.__renderTarget);dt.bindFramebuffer(D.READ_FRAMEBUFFER,ue.__webglFramebuffer),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let Ri=0;Ri<Et;Ri++)wi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(v).__webglTexture,G,Xt+Ri),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(N).__webglTexture,mt,be+Ri)),D.blitFramebuffer(At,zt,St,pt,Rt,oe,St,pt,D.DEPTH_BUFFER_BIT,D.NEAREST);dt.bindFramebuffer(D.READ_FRAMEBUFFER,null),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||y.has(v)){const Te=y.get(v),Xn=y.get(N);dt.bindFramebuffer(D.READ_FRAMEBUFFER,pd),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,md);for(let ue=0;ue<Et;ue++)wi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Te.__webglTexture,G,Xt+ue):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Te.__webglTexture,G),he?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Xn.__webglTexture,mt,be+ue):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Xn.__webglTexture,mt),G!==0?D.blitFramebuffer(At,zt,St,pt,Rt,oe,St,pt,D.COLOR_BUFFER_BIT,D.NEAREST):he?D.copyTexSubImage3D(vt,mt,Rt,oe,be+ue,At,zt,St,pt):D.copyTexSubImage2D(vt,mt,Rt,oe,At,zt,St,pt);dt.bindFramebuffer(D.READ_FRAMEBUFFER,null),dt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else he?v.isDataTexture||v.isData3DTexture?D.texSubImage3D(vt,mt,Rt,oe,be,St,pt,Et,ce,Fe,_e.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(vt,mt,Rt,oe,be,St,pt,Et,ce,_e.data):D.texSubImage3D(vt,mt,Rt,oe,be,St,pt,Et,ce,Fe,_e):v.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,mt,Rt,oe,St,pt,ce,Fe,_e.data):v.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,mt,Rt,oe,_e.width,_e.height,ce,_e.data):D.texSubImage2D(D.TEXTURE_2D,mt,Rt,oe,St,pt,ce,Fe,_e);dt.pixelStorei(D.UNPACK_ROW_LENGTH,qe),dt.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Qt),dt.pixelStorei(D.UNPACK_SKIP_PIXELS,Je),dt.pixelStorei(D.UNPACK_SKIP_ROWS,fn),dt.pixelStorei(D.UNPACK_SKIP_IMAGES,Wn),mt===0&&N.generateMipmaps&&D.generateMipmap(vt),dt.unbindTexture()},this.initRenderTarget=function(v){y.get(v).__webglFramebuffer===void 0&&_.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?_.setTextureCube(v,0):v.isData3DTexture?_.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?_.setTexture2DArray(v,0):_.setTexture2D(v,0),dt.unbindTexture()},this.resetState=function(){q=0,j=0,O=null,dt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}const mc={type:"change"},Do={type:"start"},Ah={type:"end"},ir=new Io,gc=new Qn,tx=Math.cos(70*mu.DEG2RAD),Ie=new F,Ve=2*Math.PI,le={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ua=1e-6;class ex extends nf{constructor(t,e=null){super(t,e),this.state=le.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:On.ROTATE,MIDDLE:On.DOLLY,RIGHT:On.PAN},this.touches={ONE:ni.ROTATE,TWO:ni.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new ai,this._lastTargetPosition=new F,this._quat=new ai().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vl,this._sphericalDelta=new Vl,this._scale=1,this._panOffset=new F,this._rotateStart=new Gt,this._rotateEnd=new Gt,this._rotateDelta=new Gt,this._panStart=new Gt,this._panEnd=new Gt,this._panDelta=new Gt,this._dollyStart=new Gt,this._dollyEnd=new Gt,this._dollyDelta=new Gt,this._dollyDirection=new F,this._mouse=new Gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ix.bind(this),this._onPointerDown=nx.bind(this),this._onPointerUp=sx.bind(this),this._onContextMenu=dx.bind(this),this._onMouseWheel=ox.bind(this),this._onKeyDown=lx.bind(this),this._onTouchStart=cx.bind(this),this._onTouchMove=hx.bind(this),this._onMouseDown=rx.bind(this),this._onMouseMove=ax.bind(this),this._interceptControlDown=ux.bind(this),this._interceptControlUp=fx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(mc),this.update(),this.state=le.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ie.copy(e).sub(this.target),Ie.applyQuaternion(this._quat),this._spherical.setFromVector3(Ie),this.autoRotate&&this.state===le.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ve:i>Math.PI&&(i-=Ve),s<-Math.PI?s+=Ve:s>Math.PI&&(s-=Ve),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ie.setFromSpherical(this._spherical),Ie.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ie),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ie.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ie.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ir.origin.copy(this.object.position),ir.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ir.direction))<tx?this.object.lookAt(this.target):(gc.setFromNormalAndCoplanarPoint(this.object.up,this.target),ir.intersectPlane(gc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ua||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ua||this._lastTargetPosition.distanceToSquared(this.target)>ua?(this.dispatchEvent(mc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ve/60*this.autoRotateSpeed*t:Ve/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ie.setFromMatrixColumn(e,0),Ie.multiplyScalar(-t),this._panOffset.add(Ie)}_panUp(t,e){this.screenSpacePanning===!0?Ie.setFromMatrixColumn(e,1):(Ie.setFromMatrixColumn(e,0),Ie.crossVectors(this.object.up,Ie)),Ie.multiplyScalar(t),this._panOffset.add(Ie)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ie.copy(s).sub(this.target);let r=Ie.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ve*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function nx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ix(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function sx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ah),this.state=le.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function rx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case On.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=le.DOLLY;break;case On.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}break;case On.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(Do)}function ax(n){switch(this.state){case le.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case le.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function ox(n){this.enabled===!1||this.enableZoom===!1||this.state!==le.NONE||(n.preventDefault(),this.dispatchEvent(Do),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Ah))}function lx(n){this.enabled!==!1&&this._handleKeyDown(n)}function cx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ni.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=le.TOUCH_ROTATE;break;case ni.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=le.TOUCH_PAN;break;default:this.state=le.NONE}break;case 2:switch(this.touches.TWO){case ni.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=le.TOUCH_DOLLY_PAN;break;case ni.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=le.TOUCH_DOLLY_ROTATE;break;default:this.state=le.NONE}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(Do)}function hx(n){switch(this._trackPointer(n),this.state){case le.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case le.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case le.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case le.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=le.NONE}}function dx(n){this.enabled!==!1&&n.preventDefault()}function ux(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function fx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const px="#1f6659",mx="#4d5a52";class gx{constructor(t,e){pn(this,"renderer");pn(this,"scene",new Cu);pn(this,"camera",new Er(-1,1,1,-1,.1,5e4));pn(this,"controls");pn(this,"root",new fs);pn(this,"sceneSpan",1e3);pn(this,"cameraReady",!1);pn(this,"animationFrame",null);this.canvas=t,this.state=e,this.renderer=new Q_({canvas:t,antialias:!0}),this.renderer.setClearColor(16514296,1),this.renderer.outputColorSpace=Ke,this.controls=new ex(this.camera,t),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enableRotate=!0,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:On.ROTATE,MIDDLE:On.DOLLY,RIGHT:On.PAN},this.controls.touches={ONE:ni.ROTATE,TWO:ni.DOLLY_PAN},this.controls.addEventListener("change",()=>this.renderFrame()),this.scene.add(this.root),this.addLighting(),this.startRenderLoop()}bindInteractions(t){}dispose(){this.animationFrame!==null&&window.cancelAnimationFrame(this.animationFrame),this.animationFrame=null,this.controls.dispose(),this.clearRoot(),this.renderer.dispose()}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.renderer.setPixelRatio(e),this.renderer.setSize(Math.max(1,t.width),Math.max(1,t.height),!1),this.updateCameraFrustum(t.width,t.height),this.draw()}draw(){this.clearRoot();const t=zn(this.state.boards);if(!t){this.renderFrame();return}const e=Math.max(this.state.depth,...this.state.boards.map(o=>xn(o,this.state.depth))),i=this.overlayThickness(e),s=e+i,r=t.left+t.w/2,a=t.top+t.h/2;this.sceneSpan=Math.max(t.w,t.h,s,1)*1.65,this.updateCameraFrustum(this.canvas.clientWidth,this.canvas.clientHeight),this.addGround(t.w,s,t.h),go(this.state.boards).map(o=>this.boxForBoard(o,r,a,s,i)).forEach(o=>this.addBoardBox(o)),this.cameraReady||this.resetCamera(),this.controls.target.set(0,0,0),this.controls.update(),this.renderFrame()}addLighting(){this.scene.add(new Ju(16777215,1.75));const t=new Hl(16777215,2.3);t.position.set(800,1100,900),this.scene.add(t);const e=new Hl(16777215,.75);e.position.set(-700,500,-500),this.scene.add(e)}updateCameraFrustum(t,e){const i=Math.max(.1,t/Math.max(1,e)),s=this.sceneSpan;i>=1?(this.camera.left=-s*i/2,this.camera.right=s*i/2,this.camera.top=s/2,this.camera.bottom=-s/2):(this.camera.left=-s/2,this.camera.right=s/2,this.camera.top=s/i/2,this.camera.bottom=-s/i/2),this.camera.updateProjectionMatrix()}resetCamera(){this.camera.position.set(this.sceneSpan*.55,0,this.sceneSpan*1.45),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update(),this.cameraReady=!0}addGround(t,e,i){const s=Math.max(t,e,300)*1.25,r=new ef(s,12,10466216,14081752);r.position.y=-Math.max(60,i/2+36),r.position.z=0,this.root.add(r)}boxForBoard(t,e,i,s,r){const a=Lt(t),o=this.zRangeForBoard(t,xn(t,this.state.depth),r),c=Math.max(1,o.front-o.back),l=t.kind==="front"&&!this.state.showFrontPanels?.18:1;return{board:t,x:a.x+a.w/2-e,y:i-(a.y+a.h/2),z:(o.back+o.front)/2-s/2,w:Math.max(1,a.w),h:Math.max(1,a.h),d:c,opacity:l}}zRangeForBoard(t,e,i){if(t.kind==="front"){const s=this.deepestOverlappingStructuralDepth(t)??e;return{back:s,front:s+i}}return t.kind==="back"?{back:0,front:i}:{back:0,front:e}}addBoardBox(t){const e=this.materialFor(t.board),i=this.state.selectedIds.includes(t.board.id)||this.state.selectedId===t.board.id,s=new es(t.w,t.h,t.d),r=new qu({color:new Zt(e.color),opacity:t.opacity,roughness:.78,metalness:0,transparent:t.opacity<1,depthWrite:t.opacity>=1}),a=new Tn(s,r);a.position.set(t.x,t.y,t.z),this.root.add(a);const o=new Gu(s),c=new Lo({color:i?px:mx,transparent:!0,opacity:i?1:.44}),l=new uh(o,c);l.position.copy(a.position),this.root.add(l)}overlayThickness(t){return Math.max(4,Math.min(this.state.thickness,t*.08))}deepestOverlappingStructuralDepth(t){const e=this.state.boards.filter(i=>i.id!==t.id&&i.kind!=="front"&&i.kind!=="back").filter(i=>this.boardsOverlapInElevation(t,i));return e.length?Math.max(...e.map(i=>xn(i,this.state.depth))):null}boardsOverlapInElevation(t,e){const i=Lt(t),s=Lt(e);return i.x<s.x+s.w&&i.x+i.w>s.x&&i.y<s.y+s.h&&i.y+i.h>s.y}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}clearRoot(){[...this.root.children].forEach(t=>{this.root.remove(t),this.disposeObject(t)})}disposeObject(t){t.traverse(e=>{var r;const i=e;(r=i.geometry)==null||r.dispose();const s=i.material;Array.isArray(s)?s.forEach(a=>a.dispose()):s==null||s.dispose()})}renderFrame(){this.renderer.render(this.scene,this.camera)}startRenderLoop(){const t=()=>{this.animationFrame=window.requestAnimationFrame(t),this.controls.update(),this.renderFrame()};t()}}const _x=`{
  "schemaVersion": 1,
  "version": "75559e1",
  "appVersion": "75559e1",
  "projectName": "Complicated",
  "boards": [
    {
      "id": 1,
      "name": "P1",
      "x": 18,
      "y": -18,
      "w": 1869,
      "h": 18,
      "kind": "shelf",
      "autoThickness": "height",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": true,
      "group": 1
    },
    {
      "id": 2,
      "name": "P2",
      "x": 0,
      "y": -1887,
      "w": 18,
      "h": 1869,
      "kind": "upright",
      "autoThickness": "width",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": true,
      "group": 1
    },
    {
      "id": 3,
      "name": "P3",
      "x": 1869,
      "y": -1510,
      "w": 18,
      "h": 1492,
      "kind": "upright",
      "autoThickness": "width",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 4,
      "name": "P4",
      "x": 18,
      "y": -773,
      "w": 1103,
      "h": 18,
      "kind": "shelf",
      "autoThickness": "height",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 5,
      "name": "P5",
      "x": 1121,
      "y": -1510,
      "w": 18,
      "h": 1115,
      "kind": "upright",
      "autoThickness": "width",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 6,
      "name": "P6",
      "x": 748,
      "y": -755,
      "w": 18,
      "h": 737,
      "kind": "upright",
      "autoThickness": "width",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 7,
      "name": "P7",
      "x": 1139,
      "y": -1150,
      "w": 730,
      "h": 18,
      "kind": "shelf",
      "autoThickness": "height",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 8,
      "name": "P8",
      "x": 766,
      "y": -395,
      "w": 1103,
      "h": 18,
      "kind": "shelf",
      "autoThickness": "height",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 10,
      "name": "P10",
      "x": 374,
      "y": -1510,
      "w": 18,
      "h": 737,
      "kind": "upright",
      "autoThickness": "width",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 11,
      "name": "P11",
      "x": 18,
      "y": -1528,
      "w": 1121,
      "h": 18,
      "kind": "shelf",
      "autoThickness": "height",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 13,
      "name": "P13",
      "x": 1504,
      "y": -1528,
      "w": 383,
      "h": 18,
      "kind": "shelf",
      "autoThickness": "height",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 14,
      "name": "P14",
      "x": 1495,
      "y": -377,
      "w": 18,
      "h": 359,
      "kind": "upright",
      "autoThickness": "width",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    },
    {
      "id": 15,
      "name": "P15",
      "x": 383,
      "y": -1519,
      "w": 747,
      "h": 755,
      "kind": "front",
      "autoThickness": "none",
      "materialId": "oak",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 2
    },
    {
      "id": 17,
      "name": "P17",
      "x": 1130,
      "y": -1141,
      "w": 365,
      "h": 755,
      "kind": "front",
      "autoThickness": "none",
      "materialId": "oak",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 3
    },
    {
      "id": 18,
      "name": "P18",
      "x": 1513,
      "y": -1141,
      "w": 365,
      "h": 755,
      "kind": "front",
      "autoThickness": "none",
      "materialId": "oak",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 4
    },
    {
      "id": 21,
      "name": "P21",
      "x": 0,
      "y": -1887,
      "w": 1887,
      "h": 1887,
      "kind": "back",
      "autoThickness": "none",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": true,
      "group": 5
    },
    {
      "id": 22,
      "name": "P22",
      "x": 9,
      "y": -764,
      "w": 365,
      "h": 755,
      "kind": "front",
      "autoThickness": "none",
      "materialId": "oak",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 6
    },
    {
      "id": 23,
      "name": "P23",
      "x": 392,
      "y": -763,
      "w": 365,
      "h": 755,
      "kind": "front",
      "autoThickness": "none",
      "materialId": "oak",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 7
    },
    {
      "id": 24,
      "name": "P24",
      "x": 18,
      "y": -1150,
      "w": 356,
      "h": 18,
      "kind": "shelf",
      "autoThickness": "height",
      "materialId": "birch-plywood",
      "depthOverride": null,
      "laminate": {
        "left": false,
        "right": false,
        "front": false,
        "back": false
      },
      "ignoreInOrder": false,
      "group": 1
    }
  ],
  "anchors": [
    {
      "id": 22,
      "boardId": 6,
      "edge": "bottom",
      "targetBoardId": 1,
      "targetEdge": "top"
    },
    {
      "id": 23,
      "boardId": 6,
      "edge": "top",
      "targetBoardId": 4,
      "targetEdge": "bottom"
    },
    {
      "id": 36,
      "boardId": 4,
      "edge": "left",
      "targetBoardId": 2,
      "targetEdge": "right"
    },
    {
      "id": 37,
      "boardId": 4,
      "edge": "right",
      "targetBoardId": 5,
      "targetEdge": "left"
    },
    {
      "id": 69,
      "boardId": 10,
      "edge": "bottom",
      "targetBoardId": 4,
      "targetEdge": "top"
    },
    {
      "id": 71,
      "boardId": 10,
      "edge": "top",
      "targetBoardId": 11,
      "targetEdge": "bottom"
    },
    {
      "id": 81,
      "boardId": 14,
      "edge": "bottom",
      "targetBoardId": 1,
      "targetEdge": "top"
    },
    {
      "id": 82,
      "boardId": 14,
      "edge": "top",
      "targetBoardId": 8,
      "targetEdge": "bottom"
    },
    {
      "id": 88,
      "boardId": 5,
      "edge": "bottom",
      "targetBoardId": 8,
      "targetEdge": "top"
    },
    {
      "id": 89,
      "boardId": 5,
      "edge": "top",
      "targetBoardId": 11,
      "targetEdge": "bottom"
    },
    {
      "id": 104,
      "boardId": 11,
      "edge": "left",
      "targetBoardId": 2,
      "targetEdge": "right"
    },
    {
      "id": 107,
      "boardId": 3,
      "edge": "bottom",
      "targetBoardId": 1,
      "targetEdge": "top"
    },
    {
      "id": 108,
      "boardId": 3,
      "edge": "top",
      "targetBoardId": 13,
      "targetEdge": "bottom"
    },
    {
      "id": 109,
      "boardId": 7,
      "edge": "right",
      "targetBoardId": 3,
      "targetEdge": "left"
    },
    {
      "id": 110,
      "boardId": 7,
      "edge": "left",
      "targetBoardId": 5,
      "targetEdge": "right"
    },
    {
      "id": 118,
      "boardId": 8,
      "edge": "right",
      "targetBoardId": 3,
      "targetEdge": "left"
    },
    {
      "id": 119,
      "boardId": 8,
      "edge": "left",
      "targetBoardId": 6,
      "targetEdge": "right"
    },
    {
      "id": 124,
      "boardId": 1,
      "edge": "left",
      "targetBoardId": 2,
      "targetEdge": "right"
    },
    {
      "id": 126,
      "boardId": 2,
      "edge": "bottom",
      "targetBoardId": 1,
      "targetEdge": "top"
    },
    {
      "id": 130,
      "boardId": 24,
      "edge": "left",
      "targetBoardId": 2,
      "targetEdge": "right"
    },
    {
      "id": 131,
      "boardId": 24,
      "edge": "right",
      "targetBoardId": 10,
      "targetEdge": "left"
    }
  ],
  "layoutAnchors": [
    {
      "id": 1,
      "boardId": 1,
      "axis": "x",
      "offset": 365
    },
    {
      "id": 2,
      "boardId": 1,
      "axis": "x",
      "offset": 739
    },
    {
      "id": 3,
      "boardId": 1,
      "axis": "x",
      "offset": 1112
    },
    {
      "id": 4,
      "boardId": 1,
      "axis": "x",
      "offset": 1486
    },
    {
      "id": 5,
      "boardId": 2,
      "axis": "y",
      "offset": 368
    },
    {
      "id": 6,
      "boardId": 2,
      "axis": "y",
      "offset": 746
    },
    {
      "id": 7,
      "boardId": 2,
      "axis": "y",
      "offset": 1123
    },
    {
      "id": 8,
      "boardId": 2,
      "axis": "y",
      "offset": 1501
    },
    {
      "id": 16,
      "boardId": 3,
      "axis": "y",
      "offset": 369
    },
    {
      "id": 17,
      "boardId": 3,
      "axis": "y",
      "offset": 746
    },
    {
      "id": 18,
      "boardId": 3,
      "axis": "y",
      "offset": 1124
    }
  ],
  "measurements": [
    {
      "id": 1,
      "name": "M1",
      "a": {
        "kind": "board-edge",
        "boardId": 4,
        "edge": "bottom",
        "offset": 156.45374157226385
      },
      "b": {
        "kind": "board-edge",
        "boardId": 1,
        "edge": "top",
        "offset": 159.66911316720035
      },
      "axis": "vertical",
      "displayOffset": 46
    },
    {
      "id": 2,
      "name": "M2",
      "a": {
        "kind": "board-edge",
        "boardId": 2,
        "edge": "right",
        "offset": 1427.9481403863758
      },
      "b": {
        "kind": "board-edge",
        "boardId": 6,
        "edge": "left",
        "offset": 286.30202560156624
      },
      "axis": "horizontal",
      "displayOffset": 60
    },
    {
      "id": 3,
      "name": "M3",
      "a": {
        "kind": "board-edge",
        "boardId": 5,
        "edge": "right",
        "offset": 853.3080327763436
      },
      "b": {
        "kind": "board-edge",
        "boardId": 3,
        "edge": "left",
        "offset": 1231.3403369838493
      },
      "axis": "horizontal",
      "displayOffset": -27
    },
    {
      "id": 4,
      "name": "M4",
      "a": {
        "kind": "board-edge",
        "boardId": 8,
        "edge": "top",
        "offset": 551.5
      },
      "b": {
        "kind": "board-edge",
        "boardId": 7,
        "edge": "bottom",
        "offset": 168.340583862087
      },
      "axis": "vertical",
      "displayOffset": 88
    },
    {
      "id": 5,
      "name": "M5",
      "a": {
        "kind": "board-edge",
        "boardId": 10,
        "edge": "right",
        "offset": 311.6615867039279
      },
      "b": {
        "kind": "board-edge",
        "boardId": 5,
        "edge": "left",
        "offset": 291.9334520521436
      },
      "axis": "horizontal",
      "displayOffset": 102
    },
    {
      "id": 6,
      "name": "M6",
      "a": {
        "kind": "board-edge",
        "boardId": 11,
        "edge": "bottom",
        "offset": 611.7693733298971
      },
      "b": {
        "kind": "board-edge",
        "boardId": 4,
        "edge": "top",
        "offset": 607.2167268717931
      },
      "axis": "vertical",
      "displayOffset": 116
    }
  ],
  "materials": [
    {
      "id": "birch-plywood",
      "name": "Birch plywood",
      "color": "#d9b77e"
    },
    {
      "id": "oak",
      "name": "Oak",
      "color": "#c99756"
    },
    {
      "id": "walnut",
      "name": "Walnut",
      "color": "#7a4f34"
    },
    {
      "id": "pine",
      "name": "Pine",
      "color": "#e1c889"
    },
    {
      "id": "white-melamine",
      "name": "White melamine",
      "color": "#f5f3ec"
    },
    {
      "id": "black",
      "name": "Black",
      "color": "#252525"
    },
    {
      "id": "white",
      "name": "White",
      "color": "#ffffff"
    },
    {
      "id": "gray",
      "name": "Gray",
      "color": "#9aa0a6"
    },
    {
      "id": "red",
      "name": "Red",
      "color": "#b8483b"
    },
    {
      "id": "blue",
      "name": "Blue",
      "color": "#3f75a3"
    },
    {
      "id": "green",
      "name": "Green",
      "color": "#538052"
    }
  ],
  "selectedId": null,
  "selectedIds": [],
  "selectedMeasurementId": null,
  "nextId": 25,
  "nextAnchorId": 132,
  "nextLayoutAnchorId": 19,
  "nextMeasurementId": 7,
  "thickness": 18,
  "depth": 300,
  "grid": 5,
  "gridOriginX": 525.1775988815943,
  "gridOriginY": 53.528333678163406,
  "snap": true,
  "showDimensions": true,
  "showFrontPanels": false,
  "scale": 0.3405137216861568,
  "panX": 286.2407655104855,
  "panY": 812.2706299140425
}
`,Dt=it("#sketchCanvas"),xx=it("#view3dCanvas"),A={projectNameInput:it("#projectNameInput"),templateChooser:it("#templateChooser"),canvasWrap:it("#canvasWrap"),templateList:it("#templateList"),measureModeBtn:it("#measureModeBtn"),presetList:it("#presetList"),thicknessInput:it("#thicknessInput"),depthInput:it("#depthInput"),gridInput:it("#gridInput"),snapToggle:it("#snapToggle"),dimToggle:it("#dimToggle"),frontLayerToggle:it("#frontLayerToggle"),duplicateBtn:it("#duplicateBtn"),rotateBtn:it("#rotateBtn"),undoBtn:it("#undoBtn"),redoBtn:it("#redoBtn"),measureWidthBtn:it("#measureWidthBtn"),measureHeightBtn:it("#measureHeightBtn"),saveBtn:it("#saveBtn"),loadBtn:it("#loadBtn"),newProjectBtn:it("#newProjectBtn"),projectFileInput:it("#projectFileInput"),deleteBtn:it("#deleteBtn"),fitBtn:it("#fitBtn"),view3dBtn:it("#view3dBtn"),copyCsvBtn:it("#copyCsvBtn"),exportBtn:it("#exportBtn"),printOrderBtn:it("#printOrderBtn"),notificationToast:it("#notificationToast"),selectionStatus:it("#selectionStatus"),snapStatus:it("#snapStatus"),emptySelection:it("#emptySelection"),inspector:it("#inspector"),nameInput:it("#nameInput"),xInput:it("#xInput"),yInput:it("#yInput"),wInput:it("#wInput"),hInput:it("#hInput"),depthOverrideInput:it("#depthOverrideInput"),layoutAnchorAxisInput:it("#layoutAnchorAxisInput"),layoutAnchorCountInput:it("#layoutAnchorCountInput"),layoutAnchorBalanceInput:it("#layoutAnchorBalanceInput"),layoutAnchorStartInput:it("#layoutAnchorStartInput"),layoutAnchorEndInput:it("#layoutAnchorEndInput"),layoutAnchorStartLabel:it("#layoutAnchorStartLabel"),layoutAnchorEndLabel:it("#layoutAnchorEndLabel"),layoutAnchorThicknessInput:it("#layoutAnchorThicknessInput"),layoutAnchorApplyBtn:it("#layoutAnchorApplyBtn"),layoutAnchorClearBtn:it("#layoutAnchorClearBtn"),layoutAnchorSummary:it("#layoutAnchorSummary"),materialSelect:it("#materialSelect"),materialSelectButton:it("#materialSelectButton"),materialSelectList:it("#materialSelectList"),materialSelectSwatch:it("#materialSelectSwatch"),materialSelectText:it("#materialSelectText"),materialInput:it("#materialInput"),materialLabelSwatch:it("#materialLabelSwatch"),materialForm:it("#materialForm"),materialNameInput:it("#materialNameInput"),materialColorInput:it("#materialColorInput"),addMaterialBtn:it("#addMaterialBtn"),laminateLeftInput:it("#laminateLeftInput"),laminateRightInput:it("#laminateRightInput"),laminateTopInput:it("#laminateTopInput"),laminateBottomInput:it("#laminateBottomInput"),laminateFrontInput:it("#laminateFrontInput"),laminateBackInput:it("#laminateBackInput"),ignoreOrderInput:it("#ignoreOrderInput"),measureList:it("#measureList"),warningList:it("#warningList"),cutList:it("#cutList"),ignoredCutList:it("#ignoredCutList"),rightPanelTools:it("#rightPanelTools"),woodOrderPanel:it("#woodOrderPanel"),woodOrderToggleBtn:it("#woodOrderToggleBtn"),woodOrderBackBtn:it("#woodOrderBackBtn"),materialList:it("#materialList"),anchorOverlay:it("#anchorOverlay"),overlayScaleBar:it("#overlayScaleBar"),overlayScaleLabel:it("#overlayScaleLabel"),overlayZoomLabel:it("#overlayZoomLabel"),measureRenameForm:it("#measureRenameForm"),measureRenameInput:it("#measureRenameInput"),measureRenameCancelBtn:it("#measureRenameCancelBtn")},h={projectName:"",boards:[],anchors:[],layoutAnchors:[],measurements:[],materials:Ph(),selectedId:null,selectedIds:[],selectedMeasurementId:null,nextId:1,nextAnchorId:1,nextLayoutAnchorId:1,nextMeasurementId:1,thickness:18,depth:560,grid:25,gridOriginX:160,gridOriginY:120,snap:!0,showDimensions:!0,showFrontPanels:!0,scale:.62,panX:160,panY:110,dragging:null,resizing:null,measurementDragging:null,panning:null,selectionBox:null,snapGuides:[],tool:"select",pendingMeasurementAnchor:null,previewMeasurementAnchor:null,lastSnap:U("common.ready")},wh=["left","right","top","bottom","front","back"],Rh=new Pd(Dt,h),Uo=new gx(xx,h),Ch="mebel-maker-project",_c="c0d63eb",vx=80,Mx=.125,Sx=.09,yx=1.3,Ex=2,Wi=46,Ih=new AbortController,bt={signal:Ih.signal},$i=[],Ar=[];let xc,Ms=null,Qi="sketch",ti=!1;const bx={side:{name:U("pieces.side"),kind:"upright",orientation:"vertical",w:()=>h.thickness,h:()=>560},shelf:{name:U("pieces.shelf"),kind:"shelf",orientation:"horizontal",w:()=>820-h.thickness*2,h:()=>h.thickness},divider:{name:U("pieces.divider"),kind:"upright",orientation:"vertical",w:()=>h.thickness,h:()=>560-h.thickness*2},back:{name:U("pieces.back"),kind:"back",orientation:"front",w:()=>820,h:()=>560},front:{name:U("pieces.front"),kind:"front",orientation:"front",w:()=>820,h:()=>560}},No="birch-plywood";function it(n){const t=document.querySelector(n);if(!t)throw new Error(`Missing element: ${n}`);return t}function U(n,t){return Ac(n,t?{values:t}:void 0)}function Ph(){return[{id:"birch-plywood",name:tn("birch-plywood"),color:"#d9b77e"},{id:"oak",name:tn("oak"),color:"#c99756"},{id:"walnut",name:tn("walnut"),color:"#7a4f34"},{id:"pine",name:tn("pine"),color:"#e1c889"},{id:"white-melamine",name:tn("white-melamine"),color:"#f5f3ec"},{id:"black",name:tn("black"),color:"#252525"},{id:"white",name:tn("white"),color:"#ffffff"},{id:"gray",name:tn("gray"),color:"#9aa0a6"},{id:"red",name:tn("red"),color:"#b8483b"},{id:"blue",name:tn("blue"),color:"#3f75a3"},{id:"green",name:tn("green"),color:"#538052"}]}function tn(n){return{"birch-plywood":U("materials.birchPlywood"),oak:U("materials.oak"),walnut:U("materials.walnut"),pine:U("materials.pine"),"white-melamine":U("materials.whiteMelamine"),black:U("materials.black"),white:U("materials.white"),gray:U("materials.gray"),red:U("materials.red"),blue:U("materials.blue"),green:U("materials.green")}[n]??""}function Xi(n){return tn(n.id)||n.name}function Tx(n){const t=Ph();if(!(n!=null&&n.length))return t;const e=new Set,i=n.filter(s=>{const r=s.id&&s.name&&/^#[0-9a-f]{6}$/i.test(s.color)&&!e.has(s.id);return r&&e.add(s.id),r});return i.some(s=>s.id===No)?i:[...t,...i]}function Ax(n){if(!(n!=null&&n.length))return[];const t=new Set(h.boards.map(s=>s.id)),e=["left","right","top","bottom"],i=new Set;return n.filter(s=>{const r=`${s.boardId}:${s.edge}:${s.targetBoardId}:${s.targetEdge}`,a=t.has(s.boardId)&&t.has(s.targetBoardId)&&s.boardId!==s.targetBoardId&&e.includes(s.edge)&&e.includes(s.targetEdge)&&!i.has(r);return a&&i.add(r),a})}function wx(n){if(!(n!=null&&n.length))return[];const t=new Set(h.boards.map(i=>i.id)),e=new Set;return n.filter(i=>{const s=h.boards.find(d=>d.id===i.boardId),r=Number(i.offset),a=s?Lt(s):null,o=i.axis==="x"?a==null?void 0:a.w:a==null?void 0:a.h,c=`${i.boardId}:${i.axis}:${Math.round(r*1e3)}`,l=t.has(i.boardId)&&(i.axis==="x"||i.axis==="y")&&Number.isFinite(r)&&r>=0&&o!==void 0&&r<=o&&!e.has(c);return l&&e.add(c),l}).map(i=>({...i,offset:Math.round(i.offset)}))}function Rx(){return{left:!1,right:!1,top:!1,bottom:!1,front:!1,back:!1}}function Lh(n){return{...Rx(),...n}}function wr(n){return`P${n}`}function Fo(n){return`M${n}`}function Cx(n){return/^(Board \d+|Side|Shelf|Shelf \d+|Divider|Back|Front|Left side|Right side|Top|Bottom|Middle shelf|Left adjustable shelf|Right adjustable shelf|Center divider)( copy)?$/.test(n)}function Dh(n,t){const e=(n==null?void 0:n.trim())??"";return!e||Cx(e)?wr(t):e}function Mi(){const n=new Set(h.selectedIds);return h.selectedId!==null&&n.add(h.selectedId),n}function Vn(n,t=n[0]??null){const e=new Set(h.boards.map(r=>r.id)),i=[...new Set(n)].filter(r=>e.has(r)),s=t!==null&&i.includes(t)?t:i[0]??null;h.selectedId=s,h.selectedIds=i,i.length&&(h.selectedMeasurementId=null)}function Uh(){Vn([])}function bs(n){h.selectedMeasurementId=n!==null&&h.measurements.some(t=>t.id===n)?n:null,h.selectedMeasurementId!==null&&(h.selectedId=null,h.selectedIds=[])}function Ix(n){const t=Mi();t.has(n)?t.delete(n):t.add(n),Vn([...t],t.has(n)?n:[...t][0]??null)}function Px(n,t){return((n==null?void 0:n.trim())??"")||Fo(t)}function Lx(n){const t=n.materialId&&h.materials.some(r=>r.id===n.materialId)?n.materialId:No,e=n.kind??"panel",i=Xx(n.orientation,e,n.autoThickness);return{id:n.id,name:Dh(n.name,n.id),x:Number.isFinite(Number(n.x))?Math.round(Number(n.x)):120,y:Number.isFinite(Number(n.y))?Math.round(Number(n.y)):120,dimensions:Yx(n,i),orientation:i,kind:e,materialId:t,laminate:Lh(n.laminate),ignoreInOrder:n.ignoreInOrder??!1,group:n.group??0}}function Dx(n=h.boards){return Math.max(0,...n.map(t=>t.id))+1}function Ux(n=h.measurements){return Math.max(0,...n.map(t=>t.id))+1}function Nx(n=h.anchors){return Math.max(0,...n.map(t=>t.id))+1}function Fx(n=h.layoutAnchors){return Math.max(0,...n.map(t=>t.id))+1}function Nh(n){return wh.filter(t=>n[t]).join(",")||"none"}function Ox(n){const t=wh.filter(e=>n[e]);return t.length?t.map(e=>Oo(e)).join(", "):U("metrics.none")}function Bx(n){const t=Lt(n),i=[["left",t.h],["right",t.h],["top",t.w],["bottom",t.w],["front",t.w],["back",t.w]].filter(([s])=>n.laminate[s]).map(([s,r])=>`${Oo(s)} ${Nt(r)}`);return i.length?i.join(", "):U("metrics.none")}function Oo(n){return{left:U("inspector.left"),right:U("inspector.right"),top:U("inspector.top"),bottom:U("inspector.bottom"),front:U("inspector.front"),back:U("inspector.back")}[n]}function Me(n){return n.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t)}function Bo(n){const t=h.materials.find(e=>e.id===n);return t?Xi(t):U("inspector.unknownMaterial")}function vc(n){var t;return((t=h.materials.find(e=>e.id===n))==null?void 0:t.color)??h.materials[0].color}function kx(n){return h.materials.find(t=>t.id===n)??null}function zx(n){const t=n.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"custom-material";let e=t,i=2;for(;h.materials.some(s=>s.id===e);)e=`${t}-${i}`,i+=1;return e}function Gx(n){return/^#[0-9a-f]{6}$/i.test(n)?n:"#c99756"}function ve(n,t){const e=Number(n);return Number.isFinite(e)&&e>0?Math.round(e):t}function Hx(n){const t=Number(n);return Number.isFinite(t)&&t>0?Math.round(t):null}function Vx(n,t){const e=Number(n);return Number.isFinite(e)?Math.round(e):Oc(t)}function Wx(n){return n==="width"?"vertical":n==="height"?"horizontal":"front"}function Xx(n,t,e){return n==="vertical"||n==="horizontal"||n==="front"?n:e?Wx(e):vd(t)}function ko(n,t,e){return n==="vertical"?{width:h.depth,height:e,thickness:t}:n==="horizontal"?{width:t,height:h.depth,thickness:e}:{width:t,height:e,thickness:h.thickness}}function Yx(n,t){const e=n.dimensions,i=ve(n.thicknessOverride,h.thickness),s=Hx(n.depthOverride)??h.depth,r=ve(n.w,400),a=ve(n.h,250);return t==="vertical"?{width:ve(e==null?void 0:e.width,s),height:ve(e==null?void 0:e.height,a),thickness:ve(e==null?void 0:e.thickness,i)}:t==="horizontal"?{width:ve(e==null?void 0:e.width,r),height:ve(e==null?void 0:e.height,s),thickness:ve(e==null?void 0:e.thickness,i)}:{width:ve(e==null?void 0:e.width,r),height:ve(e==null?void 0:e.height,a),thickness:ve(e==null?void 0:e.thickness,i)}}function lo(n){return-n}function Mc(n){return-n}function Fh(n,t=!0){t&&ne();const e={id:h.nextId,name:Dh(n.name,h.nextId),x:n.x??120,y:n.y??120,dimensions:n.dimensions??ko(n.orientation,400,250),orientation:n.orientation,kind:n.kind,materialId:n.materialId??No,laminate:Lh(n.laminate),ignoreInOrder:n.ignoreInOrder??!1,group:0};h.nextId+=1,h.boards.push(e),Vn([e.id],e.id),jh(e.id),Ft()}function qx(n){Fh(n,!1)}function Fn(n,t,e,i,s,r){qx({x:n,y:t,dimensions:ko(r,e,i),kind:s,orientation:r})}function $x(n,t,e){n&&ne(),h.boards=[],h.anchors=[],h.layoutAnchors=[],h.measurements=[],h.nextId=1,h.nextAnchorId=1,h.nextLayoutAnchorId=1,h.nextMeasurementId=1,h.selectedMeasurementId=null,h.pendingMeasurementAnchor=null,h.previewMeasurementAnchor=null,h.gridOriginX=t,h.gridOriginY=e}function ds(n,t,e,i){const s=h.thickness,r=e-2*s;Fn(n,t,s,i,"upright","vertical"),Fn(n+e-s,t,s,i,"upright","vertical"),Fn(n+s,t,r,s,"shelf","horizontal"),Fn(n+s,t+i-s,r,s,"shelf","horizontal")}function fa(n,t,e,i){Fn(n,t,e,i,"back","front")}function pa(n,t,e){const i=h.thickness;Fn(n+i,t,e-2*i,i,"shelf","horizontal")}function jx(n,t,e){const i=h.thickness;Fn(n,t,i,e,"upright","vertical")}function Kx(n,t=!0){const e=h.thickness,i=0;if(n==="complex"){Zx(_x,Sc(n),t);return}if($x(t,i,0),n==="cabinet"&&(ds(i,-560,820,560),pa(i,-285,820)),n==="bookcase"&&(ds(i,-1280,760,1280),[320,560,800,1040].forEach(o=>pa(i,-1280+o,760)),fa(i,-1280,760,1280)),n==="base-cabinet"){const o=i+410-e/2,c=-360;ds(i,-720,820,720),Fn(i+e,c,o-i-e,e,"shelf","horizontal"),Fn(o+e,c,i+820-e-(o+e),e,"shelf","horizontal"),jx(o,-720+e,720-2*e),fa(i,-720,820,720)}n==="wall-cabinet"&&(ds(i,-640,720,640),pa(i,-325,720),fa(i,-640,720,640)),n==="simple-box"&&ds(i,-360,520,360),Vn([1],1),h.lastSnap=Sc(n),Wo()}function Sc(n){return{cabinet:U("templates.cabinet"),bookcase:U("templates.bookcase"),"base-cabinet":U("templates.baseCabinet"),"wall-cabinet":U("templates.wallCabinet"),"simple-box":U("templates.simpleBox"),complex:U("templates.complex")}[n]}function Zx(n,t,e){try{const i=JSON.parse(n);if(!Go(i))throw new Error(U("status.unsupportedTemplateFile"));As({...i,projectName:t},e),h.lastSnap=t,Wo()}catch{h.lastSnap=U("status.couldNotCreateTemplate"),nn(U("status.couldNotCreateTemplate")),Ae()}}function Oh(n=!0){n&&ne(),h.projectName="",h.boards=[],h.anchors=[],h.layoutAnchors=[],h.measurements=[],h.selectedId=null,h.selectedIds=[],h.selectedMeasurementId=null,h.nextId=1,h.nextAnchorId=1,h.nextLayoutAnchorId=1,h.nextMeasurementId=1,h.dragging=null,h.resizing=null,h.measurementDragging=null,h.panning=null,h.selectionBox=null,h.snapGuides=[],h.tool="select",h.pendingMeasurementAnchor=null,h.previewMeasurementAnchor=null,h.gridOriginX=0,h.gridOriginY=0,b0(),h.lastSnap=U(n?"status.newProject":"common.ready"),Ft()}function Jx(){if(!(!!h.projectName||h.boards.length>0||h.measurements.length>0)){h.lastSnap=U("status.readyForNewProject"),Ae();return}window.confirm(U("dialogs.newProjectConfirm"))&&(Oh(),nn(U("status.newProjectReady")))}function Ft(){yd(h.boards),t0(),Qx(),x0(),p0(),Ae(),m0(),g0(),_0(),Bh(),i0()}function Bh(){A.rightPanelTools.hidden=ti,A.woodOrderPanel.hidden=!ti,A.woodOrderToggleBtn.classList.toggle("active",ti),A.woodOrderToggleBtn.setAttribute("aria-pressed",String(ti)),A.woodOrderToggleBtn.title=U(ti?"workspace.hideWoodOrder":"workspace.showWoodOrder"),A.woodOrderToggleBtn.setAttribute("aria-label",U(ti?"workspace.hideWoodOrder":"workspace.showWoodOrder"))}function Qx(){A.templateChooser.hidden=h.boards.length>0||h.measurements.length>0}function t0(){if(Qi==="3d"){Uo.draw();return}Rh.draw()}function zo(){if(Qi==="3d"){Uo.resize();return}Rh.resize()}function e0(n){Qi!==n&&(Qi=n,A.canvasWrap.dataset.view=n,A.view3dBtn.classList.toggle("active",n==="3d"),A.view3dBtn.setAttribute("aria-pressed",String(n==="3d")),h.lastSnap=U(n==="3d"?"status.view3d":"status.sketchView"),window.requestAnimationFrame(()=>{zo(),Ae()}))}function n0(n){return JSON.parse(JSON.stringify(n))}function ne(){$i.push(Ts()),$i.length>vx&&$i.shift(),Ar.length=0}function kh(){const n=$i.pop();if(!n){h.lastSnap=U("status.nothingToUndo"),Ae();return}Ar.push(Ts()),As(n,!1),h.lastSnap=U("status.undone"),Ae()}function co(){const n=Ar.pop();if(!n){h.lastSnap=U("status.nothingToRedo"),Ae();return}$i.push(Ts()),As(n,!1),h.lastSnap=U("status.redone"),Ae()}function Ts(){return n0({schemaVersion:2,version:_c,appVersion:_c,projectName:h.projectName,boards:h.boards,anchors:h.anchors,layoutAnchors:h.layoutAnchors,measurements:h.measurements,materials:h.materials,selectedId:h.selectedId,selectedIds:h.selectedIds,selectedMeasurementId:h.selectedMeasurementId,nextId:h.nextId,nextAnchorId:h.nextAnchorId,nextLayoutAnchorId:h.nextLayoutAnchorId,nextMeasurementId:h.nextMeasurementId,thickness:h.thickness,depth:h.depth,grid:h.grid,gridOriginX:h.gridOriginX,gridOriginY:h.gridOriginY,snap:h.snap,showDimensions:h.showDimensions,showFrontPanels:h.showFrontPanels,scale:h.scale,panX:h.panX,panY:h.panY})}function As(n,t=!0){var i,s,r;t&&ne(),h.projectName=zh(n.projectName),h.materials=Tx(n.materials),h.thickness=ve(n.thickness,h.thickness),h.depth=ve(n.depth,h.depth),h.boards=(n.boards??[]).map(Lx),h.anchors=Ax(n.anchors),h.layoutAnchors=wx(n.layoutAnchors),h.measurements=(n.measurements??[]).map((a,o)=>({...a,name:Px(a.name,a.id),displayOffset:Vx(a.displayOffset,o)}));const e=(i=n.selectedIds)!=null&&i.length?n.selectedIds:n.selectedId?[n.selectedId]:[];h.selectedMeasurementId=null,Vn(e,n.selectedId),e.length||bs(n.selectedMeasurementId??null),h.nextId=n.nextId??Dx(h.boards),h.nextAnchorId=n.nextAnchorId??Nx(h.anchors),h.nextLayoutAnchorId=n.nextLayoutAnchorId??Fx(h.layoutAnchors),h.nextMeasurementId=n.nextMeasurementId??Ux(h.measurements),h.grid=n.grid??h.grid,h.gridOriginX=n.gridOriginX??((s=zn(h.boards))==null?void 0:s.left)??h.gridOriginX,h.gridOriginY=n.gridOriginY??((r=zn(h.boards))==null?void 0:r.top)??h.gridOriginY,h.snap=n.snap??h.snap,h.showDimensions=n.showDimensions??h.showDimensions,h.showFrontPanels=n.showFrontPanels??h.showFrontPanels,h.scale=n.scale??h.scale,h.panX=n.panX??h.panX,h.panY=n.panY??h.panY,h.dragging=null,h.resizing=null,h.measurementDragging=null,h.panning=null,h.selectionBox=null,h.snapGuides=[],h.tool="select",h.pendingMeasurementAnchor=null,h.previewMeasurementAnchor=null,Wh(),Ft()}function Go(n){return[1,2].includes(n.schemaVersion??(n.version===1?1:2))&&Array.isArray(n.boards)}function i0(){try{localStorage.setItem(Ch,JSON.stringify(Ts()))}catch{}}function s0(){try{const n=localStorage.getItem(Ch);if(!n)return!1;const t=JSON.parse(n);if(!Go(t))throw new Error("Unsupported project file");return As(t,!1),h.lastSnap=U("status.restoredAutosave"),Ae(),!0}catch{return h.lastSnap=U("status.couldNotRestoreAutosave"),Ae(),!1}}function r0(){s0()||Oh(!1)}function a0(){const n=JSON.stringify(Ts(),null,2);Vh(n,"application/json",`${Hh()}-${Gh()}.mebel`),h.lastSnap=U("status.projectExported"),nn(U("status.savedProject")),Ae()}function zh(n){return typeof n=="string"?n.trim().slice(0,80):""}function Gh(n=new Date){return n.toISOString().replace(/\.\d{3}Z$/,"Z").replace(/:/g,"-")}function Hh(){return h.projectName.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)||"mebel-maker"}function Vh(n,t,e){const i=new Blob([n],{type:t}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=e,document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(s)}function o0(){A.projectFileInput.value="",A.projectFileInput.click(),nn(U("status.chooseProjectFile"))}function l0(n){const t=new FileReader;t.addEventListener("load",()=>{try{const e=JSON.parse(String(t.result??""));if(!Go(e))throw new Error("Unsupported project file");As(e),h.lastSnap=U("status.projectImported"),nn(U("status.loadedProject")),Ae()}catch{h.lastSnap=U("status.couldNotImportProject"),nn(U("status.couldNotLoadProject")),Ae()}}),t.addEventListener("error",()=>{h.lastSnap=U("status.couldNotReadFile"),nn(U("status.couldNotReadFile")),Ae()}),t.readAsText(n)}function nn(n){window.clearTimeout(xc),A.notificationToast.textContent=n,A.notificationToast.hidden=!1,xc=window.setTimeout(()=>{A.notificationToast.hidden=!0},2400)}function Wh(){A.projectNameInput.value=h.projectName,A.thicknessInput.value=String(h.thickness),A.layoutAnchorThicknessInput.value=String(h.thickness),A.depthInput.value=String(h.depth),A.gridInput.value=String(h.grid),A.snapToggle.checked=h.snap,A.dimToggle.checked=h.showDimensions,A.frontLayerToggle.checked=h.showFrontPanels}function Dn(n,t){if(!n.length)return null;const e=t(n[0]);return n.every(i=>t(i)===e)?e:null}function gs(n,t){return h.layoutAnchors.filter(e=>e.boardId===n&&(!t||e.axis===t)).sort((e,i)=>e.offset-i.offset)}function c0(n){return n.orientation==="vertical"?"y":"x"}function Xh(){const n=Xo();A.layoutAnchorStartLabel.textContent=U(n==="x"?"inspector.leftEdge":"inspector.topEdge"),A.layoutAnchorEndLabel.textContent=U(n==="x"?"inspector.rightEdge":"inspector.bottomEdge")}function ho(){const n=A.layoutAnchorBalanceInput.disabled||!A.layoutAnchorBalanceInput.checked;A.layoutAnchorStartInput.disabled=n,A.layoutAnchorEndInput.disabled=n,A.layoutAnchorThicknessInput.disabled=n}function Vi(n,t,e=U("common.mixed")){n.value=t??"",n.placeholder=t===null?e:""}function pi(n,t){n.checked=t??!1,n.indeterminate=t===null}function Yh(n,t){n.addEventListener("change",t,bt),n.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),n.blur())},bt)}function h0(n){A.duplicateBtn.disabled=n,A.rotateBtn.disabled=n,A.measureWidthBtn.disabled=n,A.measureHeightBtn.disabled=n}function Ae(){var c;const n=sn(h),t=rn(h),e=Cc(h),i=zn(t),s=t.length>0,r=t.length>1;if(A.emptySelection.hidden=s,A.inspector.hidden=!s,A.selectionStatus.textContent=r&&i?`${U("status.boardsSelected",{count:t.length})} · ${Nt(i.w)} × ${Nt(i.h)}`:n?xd(n):e?`${U("workspace.measureName")} ${e.name}`:U("workspace.noBoardSelected"),A.snapStatus.textContent=h.lastSnap,d0(),A.measureModeBtn.classList.toggle("active",h.tool==="measure"),A.undoBtn.disabled=!$i.length,A.redoBtn.disabled=!Ar.length,h0(!s),A.deleteBtn.disabled=!s&&!e,A.deleteBtn.title=U(e?"workspace.deleteSelectedMeasurement":"workspace.deleteSelectedBoards"),A.deleteBtn.setAttribute("aria-label",U(e?"workspace.deleteSelectedMeasurement":"workspace.deleteSelectedBoards")),Dt.classList.toggle("measure-mode",h.tool==="measure"),h.tool==="measure"&&(Dt.style.cursor=""),A.wInput.disabled=!1,A.hInput.disabled=!1,A.nameInput.disabled=!1,A.layoutAnchorAxisInput.disabled=!n||r,A.layoutAnchorCountInput.disabled=!n||r,A.layoutAnchorBalanceInput.disabled=!n||r,A.layoutAnchorApplyBtn.disabled=!n||r,A.layoutAnchorClearBtn.disabled=!n||r||gs(n.id).length===0,(!n||r)&&(A.layoutAnchorSummary.textContent=U("inspector.noLayoutAnchors")),A.materialLabelSwatch.style.background=n&&!r?vc(n.materialId):"transparent",!s){ho();return}if(r)A.nameInput.disabled=!0,Vi(A.nameInput,null,U("status.boardsSelected",{count:t.length})),Vi(A.xInput,i?String(Math.round(i.left)):null),Vi(A.yInput,i?String(Math.round(lo(i.top))):null),Vi(A.wInput,null),Vi(A.hInput,null),A.wInput.disabled=!0,A.hInput.disabled=!0;else if(n){const l=Lt(n),d=((c=gs(n.id).at(0))==null?void 0:c.axis)??c0(n),f=gs(n.id,d);A.nameInput.value=n.name,A.nameInput.placeholder="",A.xInput.value=String(Math.round(l.x)),A.yInput.value=String(Math.round(lo(l.y))),A.wInput.value=String(Math.round(l.w)),A.hInput.value=String(Math.round(l.h)),A.wInput.placeholder=n.orientation==="vertical"&&n.dimensions.thickness===h.thickness?U("common.global"):"",A.hInput.placeholder=n.orientation==="horizontal"&&n.dimensions.thickness===h.thickness?U("common.global"):"",n.orientation==="vertical"&&n.dimensions.thickness===h.thickness&&(A.wInput.value=""),n.orientation==="horizontal"&&n.dimensions.thickness===h.thickness&&(A.hInput.value=""),A.depthOverrideInput.value=xn(n,h.depth)===h.depth?"":String(xn(n,h.depth)),A.materialInput.value=n.materialId,A.layoutAnchorAxisInput.value=d,Xh(),f.length&&(A.layoutAnchorCountInput.value=String(f.length)),A.layoutAnchorThicknessInput.value||(A.layoutAnchorThicknessInput.value=String(h.thickness)),A.layoutAnchorSummary.textContent=f.length?f.map(u=>Nt(u.offset)).join(", "):U("inspector.noLayoutAnchors"),A.wInput.disabled=!1,A.hInput.disabled=!1}const a=Dn(t,l=>l.materialId),o=Dn(t,l=>xn(l,h.depth)===h.depth?"":String(xn(l,h.depth)));A.materialInput.value=a??"",Vo(),Vi(A.depthOverrideInput,o,U("common.mixed")),A.materialLabelSwatch.style.background=a?vc(a):"transparent",pi(A.laminateLeftInput,Dn(t,l=>String(l.laminate.left))===null?null:t[0].laminate.left),pi(A.laminateRightInput,Dn(t,l=>String(l.laminate.right))===null?null:t[0].laminate.right),pi(A.laminateTopInput,Dn(t,l=>String(l.laminate.top))===null?null:t[0].laminate.top),pi(A.laminateBottomInput,Dn(t,l=>String(l.laminate.bottom))===null?null:t[0].laminate.bottom),pi(A.laminateFrontInput,Dn(t,l=>String(l.laminate.front))===null?null:t[0].laminate.front),pi(A.laminateBackInput,Dn(t,l=>String(l.laminate.back))===null?null:t[0].laminate.back),pi(A.ignoreOrderInput,Dn(t,l=>String(l.ignoreInOrder))===null?null:t[0].ignoreInOrder),ho()}function d0(){const n=u0(118/h.scale),t=Math.max(28,Math.min(90,n*h.scale));A.overlayScaleBar.style.setProperty("--scale-width",`${t}px`),A.overlayScaleLabel.textContent=Nt(n),A.overlayZoomLabel.textContent=U("workspace.zoom",{percent:Math.round(h.scale*100)})}function u0(n){const e=10**Math.floor(Math.log10(Math.max(1,n))),i=n/e;return i>=5?5*e:i>=2?2*e:e}function Ho(){A.materialSelectList.hidden=!0,A.materialSelectButton.setAttribute("aria-expanded","false")}function Vo(){const n=A.materialInput.value?kx(A.materialInput.value):null;A.materialSelectText.textContent=n?`${Xi(n)} (${n.color.toUpperCase()})`:U("inspector.mixedMaterials"),A.materialSelectSwatch.style.background=n?n.color:"linear-gradient(135deg, #d9b77e 0 50%, #7a4f34 50% 100%)",A.materialSelectSwatch.classList.toggle("mixed",!n),A.materialSelectList.querySelectorAll("[data-material-id]").forEach(t=>{const e=t.dataset.materialId===A.materialInput.value;t.classList.toggle("selected",e),t.setAttribute("aria-selected",String(e))})}function f0(){const n=A.materialSelectList.hidden;A.materialSelectList.hidden=!n,A.materialSelectButton.setAttribute("aria-expanded",String(n)),n&&Vo()}function qh(n){ti=n,h.lastSnap=U(n?"status.woodOrder":"status.properties"),Bh(),Ae()}function $h(n){const t=h.boards.find(e=>e.id===n);t&&(Vn([t.id],t.id),h.tool="select",h.lastSnap=U("status.selected",{name:t.name}),Ft())}function p0(){A.materialInput.innerHTML=`
    <option value="">${Me(U("inspector.mixedMaterials"))}</option>
  `+h.materials.map(n=>`
    <option value="${Me(n.id)}">${Me(Xi(n))} (${Me(n.color.toUpperCase())})</option>
  `).join(""),A.materialSelectList.innerHTML=h.materials.map(n=>`
    <button
      class="material-select-option"
      type="button"
      role="option"
      data-material-id="${Me(n.id)}"
      title="${Me(Xi(n))} ${Me(n.color.toUpperCase())}"
      aria-selected="false"
    >
      <span class="material-select-swatch" style="background: ${n.color}"></span>
      <span class="material-select-option-copy">
        <strong>${Me(Xi(n))}</strong>
        <small>${Me(n.color.toUpperCase())}</small>
      </span>
    </button>
  `).join(""),A.materialList.innerHTML=h.materials.map(n=>`
    <div class="material-card">
      <span class="material-swatch" style="background: ${n.color}"></span>
      <strong>${Me(Xi(n))}</strong>
    </div>
  `).join(""),Vo()}function m0(){const n=sn(h),t=rn(h),e=t.length>1?t:n?Pc(h,n.group):h.boards,i=zn(e),s=Lc(e,h.thickness),r=[];if(t.length>1&&i)r.push(`
      <div class="metric-card">
        <strong>${U("status.boardsSelected",{count:t.length})}</strong>
        <span>${U("metrics.selection")}: ${Nt(i.w)} × ${Nt(i.h)}</span>
        <span>${U("metrics.position")}: X ${Nt(i.left)}, Y ${Nt(i.top)}</span>
      </div>
    `);else if(n){const a=Lt(n);r.push(`
      <div class="metric-card">
        <strong>${n.name}</strong>
        <span>${U("metrics.board")}: ${Nt(a.w)} × ${Nt(a.h)} × ${Nt(xn(n,h.depth))}</span>
        <span>${U("metrics.position")}: X ${Nt(a.x)}, Y ${Nt(lo(a.y))}</span>
      </div>
    `)}i&&r.push(`
      <div class="metric-card">
        <strong>${t.length>1?U("pieces.selectedBoards"):n?U("pieces.connectedGroup",{group:n.group}):U("pieces.wholeSketch")}</strong>
        <span>${U("metrics.outer")}: ${Nt(i.w)} × ${Nt(i.h)}</span>
        <span>${U("metrics.inner")}: ${s!=null&&s.hasFrame?`${Nt(s.innerW)} × ${Nt(s.innerH)}`:U("metrics.needsOpposingFrameBoards")}</span>
        <span>${U("metrics.thicknessModel")}: ${Nt(h.thickness)}</span>
        <span>${U("metrics.defaultDepth")}: ${Nt(h.depth)}</span>
      </div>
    `),A.measureList.innerHTML=r.join("")||`<div class="empty-state">${Me(U("metrics.addBoards"))}</div>`}function g0(){const n=Bc(h.boards);if(!n.length){A.warningList.innerHTML=`<div class="empty-state">${Me(U("metrics.noOverlaps"))}</div>`;return}A.warningList.innerHTML=n.map(t=>{const[e,i]=t.boardIds.map(s=>{var r;return((r=h.boards.find(a=>a.id===s))==null?void 0:r.name)??wr(s)});return`
      <div class="warning-card">
        <strong>${U("metrics.overlap")}</strong>
        <span>${e} and ${i}</span>
        <span>${Nt(t.w)} × ${Nt(t.h)}</span>
      </div>
    `}).join("")}function _0(){A.cutList.innerHTML=yc(h.boards.filter(n=>!n.ignoreInOrder),U("pieces.noBoardsInOrder")),A.ignoredCutList.innerHTML=yc(h.boards.filter(n=>n.ignoreInOrder),U("pieces.noIgnoredBoards"))}function yc(n,t){const e=new Map;return n.forEach(i=>{const s=td(i),r=`${s.thickness}×${s.width}×${s.height}×${i.materialId}×${Nh(i.laminate)}`;e.set(r,[...e.get(r)??[],i])}),[...e.entries()].map(([i,s])=>{const[r,a,o,c]=i.split("×"),l=Bx(s[0]);return`
      <div class="cut-card">
        <strong><span class="count">${s.length}×</span> ${a} × ${o} × ${r} mm</strong>
        <span>${U("metrics.material")}: ${Me(Bo(c))}</span>
        <span>${U("metrics.laminate")}: ${l}</span>
        <div class="cut-card-pieces">${s.map(d=>`
          <button class="cut-piece-button" type="button" data-board-id="${d.id}" title="${Me(U("order.selectPiece",{name:d.name}))}">
            ${Me(d.name)}
          </button>
        `).join("")}</div>
      </div>
    `}).join("")||`<div class="empty-state">${t}</div>`}function x0(){const n=sn(h);if(!n){A.anchorOverlay.innerHTML="";return}A.anchorOverlay.innerHTML=h.anchors.filter(t=>t.boardId===n.id).map(t=>{const e=v0(t);if(!e)return"";const i=xe(h,e.x,e.y);return`
        <button class="anchor-chip" data-remove-anchor="${t.id}" type="button" style="left: ${i.x}px; top: ${i.y-8}px" title="${Me(U("anchors.removeAnchorTo",{target:bc(t)}))}" aria-label="${Me(U("anchors.removeAnchorTo",{target:bc(t)}))}">
          ${Ec()}
          <span class="visually-hidden">${U("anchors.removeAnchor")}</span>
        </button>
      `}).join("")+h.snapGuides.flatMap(t=>t.linkPoint?[t.linkPoint]:[]).map(t=>{const e=xe(h,t.x,t.y);return`
        <span class="anchor-chip anchor-chip-preview" style="left: ${e.x}px; top: ${e.y-8}px" title="${Me(U("anchors.willLink"))}" aria-hidden="true">
          ${Ec()}
        </span>
      `}).join("")}function Ec(){return`
    <svg class="anchor-chip-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 7.5 L7 6 C5.5 4.5 3.2 4.5 1.7 6 C.2 7.5 .2 9.8 1.7 11.3 L4.7 14.3 C5.8 15.4 7.4 15.7 8.8 15.1"></path>
      <path d="M15.5 16.5 L17 18 C18.5 19.5 20.8 19.5 22.3 18 C23.8 16.5 23.8 14.2 22.3 12.7 L19.3 9.7 C18.2 8.6 16.6 8.3 15.2 8.9"></path>
      <path d="M9 15 L15 9"></path>
      <path d="M5 21 L19 3"></path>
    </svg>
  `}function bc(n){const t=h.boards.find(e=>e.id===n.targetBoardId);return`${(t==null?void 0:t.name)??wr(n.targetBoardId)} ${Oo(n.targetEdge)}`}function v0(n){const t=h.boards.find(c=>c.id===n.boardId),e=h.boards.find(c=>c.id===n.targetBoardId);if(!t||!e)return null;const i=Lt(t),s=Lt(e),r=Zh(t,n.edge);if(n.edge==="left"||n.edge==="right"){const c=Math.max(i.y,s.y),l=Math.min(i.y+i.h,s.y+s.h);return{x:r,y:c<=l?(c+l)/2:i.y+i.h/2}}const a=Math.max(i.x,s.x),o=Math.min(i.x+i.w,s.x+s.w);return{x:a<=o?(a+o)/2:i.x+i.w/2,y:r}}function jh(n){const t=h.boards.find(e=>e.id===n);!t||t.kind==="back"||t.kind==="front"||(h.anchors=h.anchors.filter(e=>e.boardId!==n),h.boards.forEach(e=>{e.id===t.id||e.kind==="back"||e.kind==="front"||y0(t,e).forEach(([i,s])=>M0(t.id,i,e.id,s))}))}function M0(n,t,e,i){const s=h.boards.find(a=>a.id===n);!s||!S0(s,t)||h.anchors.some(a=>a.boardId===n&&a.edge===t&&a.targetBoardId===e&&a.targetEdge===i)||(h.anchors.push({id:h.nextAnchorId,boardId:n,edge:t,targetBoardId:e,targetEdge:i}),h.nextAnchorId+=1)}function S0(n,t){return n.kind==="front"?!1:n.orientation==="vertical"?t==="top"||t==="bottom":n.orientation==="horizontal"?t==="left"||t==="right":!0}function y0(n,t){const i=[],s=Lt(n),r=Lt(t);return Math.abs(s.x-(r.x+r.w))<=.5&&sr(s.y,s.y+s.h,r.y,r.y+r.h)&&i.push(["left","right"]),Math.abs(s.x+s.w-r.x)<=.5&&sr(s.y,s.y+s.h,r.y,r.y+r.h)&&i.push(["right","left"]),Math.abs(s.y-(r.y+r.h))<=.5&&sr(s.x,s.x+s.w,r.x,r.x+r.w)&&i.push(["top","bottom"]),Math.abs(s.y+s.h-r.y)<=.5&&sr(s.x,s.x+s.w,r.x,r.x+r.w)&&i.push(["bottom","top"]),i}function sr(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function Si(n,t=new Set){if(t.has(n))return;t.add(n),[...new Set(h.anchors.filter(i=>i.targetBoardId===n).map(i=>i.boardId))].forEach(i=>{Kh(i),Si(i,t)})}function Kh(n){const t=h.boards.find(i=>i.id===n);if(!t)return;const e=Lt(t);h.anchors.filter(i=>i.boardId===n).forEach(i=>{const s=h.boards.find(r=>r.id===i.targetBoardId);s&&E0(e,i.edge,Zh(s,i.targetEdge))}),uo(t,e)}function Zh(n,t){const e=Lt(n);return t==="left"?e.x:t==="right"?e.x+e.w:t==="top"?e.y:e.y+e.h}function E0(n,t,e){if(t==="left"){const i=n.x+n.w;n.x=e,n.w=Math.max(1,i-e)}if(t==="right"&&(n.w=Math.max(1,e-n.x)),t==="top"){const i=n.y+n.h;n.y=e,n.h=Math.max(1,i-e)}t==="bottom"&&(n.h=Math.max(1,e-n.y))}function Wo(){const n=zn(h.boards),t=Dt.getBoundingClientRect();if(!n||t.width<1||t.height<1)return;const e=70,i=Math.max(1,t.width-e-Wi),s=Math.max(1,t.height-e-Wi);h.scale=Math.min(i/n.w,s/n.h),h.scale=Math.max(Mx,Math.min(yx,h.scale)),h.panX=Wi-n.left*h.scale,h.panY=t.height-Wi-n.bottom*h.scale,Ft()}function b0(){const n=Dt.getBoundingClientRect();h.scale=.62,h.panX=Wi,h.panY=n.height>1?n.height-Wi:420}function T0(n){if(n===h.thickness)return;ne();const t=h.thickness,e=h.boards.some(i=>i.orientation!=="front")?window.confirm(U("dialogs.updateThickness",{value:Nt(n)})):!1;h.thickness=n,ve(A.layoutAnchorThicknessInput.value,t)===t&&(A.layoutAnchorThicknessInput.value=String(n)),h.boards.forEach(i=>{const s=R0(i,t),r=e?n:s,a=r-s;if(i.orientation==="front"?i.dimensions.thickness=n:i.dimensions.thickness=r,i.orientation==="vertical"&&i.x>160&&(i.x-=a),i.orientation==="horizontal"){const o=Lt(i);i.x+=a,i.dimensions.width=Math.max(r,o.w-a*2),i.y>120&&(i.y-=a)}}),h.boards.forEach(i=>Kh(i.id)),h.lastSnap=e?U("status.allAutoThickness",{value:Nt(h.thickness)}):U("status.defaultThickness",{value:Nt(h.thickness)}),Ft()}function A0(n){if(n===h.depth)return;ne();const t=h.depth,e=h.boards.length>0?window.confirm(U("dialogs.updateDepth",{value:Nt(n)})):!1;h.depth=n,h.boards.length>0&&h.boards.forEach(i=>{const s=e?n:w0(i,t);i.orientation==="vertical"&&(i.dimensions.width=s),i.orientation==="horizontal"&&(i.dimensions.height=s)}),h.lastSnap=e?U("status.allPiecesDepth",{value:Nt(h.depth)}):U("status.defaultDepth",{value:Nt(h.depth)}),Ft()}function w0(n,t){return n.orientation==="vertical"?n.dimensions.width:n.orientation==="horizontal"?n.dimensions.height:t}function R0(n,t){return n.dimensions.thickness??t}function C0(){const n=Jh();Vh(n,"text/csv;charset=utf-8",`${Hh()}-pieces-${Gh()}.csv`),h.lastSnap=U("status.pieceListCsvExported"),nn(U("status.savedPieceListCsv")),Ae()}async function I0(){try{await D0(Jh()),h.lastSnap=U("status.pieceListCsvCopied"),nn(U("status.copiedPieceListCsv"))}catch{h.lastSnap=U("status.couldNotCopyCsv"),nn(U("status.couldNotCopyCsv"))}Ae()}function P0(){const n=Qh(),t=`${h.projectName||U("app.name")} - ${U("panels.woodOrder")}`,e=URL.createObjectURL(new Blob([L0(n,t)],{type:"text/html"}));if(!window.open(e,"_blank")){URL.revokeObjectURL(e),h.lastSnap=U("status.couldNotPrintOrder"),nn(U("status.couldNotPrintOrder")),Ae();return}window.setTimeout(()=>URL.revokeObjectURL(e),6e4),h.lastSnap=U("status.pieceListTablePrinted"),nn(U("status.pieceListTablePrinted")),Ae()}function L0(n,t){const e=n[0],i=n.slice(1);return`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${Me(t)}</title>
        <style>
          body { color: #202522; font-family: Arial, sans-serif; margin: 24px; }
          h1 { font-size: 20px; margin: 0 0 16px; }
          table { border-collapse: collapse; font-size: 12px; width: 100%; }
          th, td { border: 1px solid #9aa59d; padding: 6px 8px; text-align: left; vertical-align: top; }
          th { background: #eef4f1; font-weight: 700; }
          td:first-child, th:first-child,
          td:nth-child(2), th:nth-child(2),
          td:nth-child(3), th:nth-child(3),
          td:nth-child(4), th:nth-child(4) { text-align: right; white-space: nowrap; }
        </style>
      </head>
      <body>
        <h1>${Me(t)}</h1>
        <table>
          <thead>
            <tr>${e.map(s=>`<th>${Me(s)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${i.map(s=>`<tr>${s.map(r=>`<td>${Me(r)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
        <script>
          window.addEventListener("load", () => window.setTimeout(() => window.print(), 0));
        <\/script>
      </body>
    </html>
  `}function Jh(){return Qh().map(n=>n.map(U0).join(",")).join(`
`)}function Qh(){const n=[[U("order.csvQuantity"),U("order.csvThickness"),U("order.csvWidth"),U("order.csvHeight"),U("order.csvMaterial"),U("order.csvLaminateEdges"),U("order.csvPieces")]],t=new Map;return h.boards.filter(e=>!e.ignoreInOrder).forEach(e=>{const i=td(e),s=`${i.thickness}×${i.width}×${i.height}×${e.materialId}×${Nh(e.laminate)}`;t.set(s,[...t.get(s)??[],e])}),t.forEach((e,i)=>{const[s,r,a,o]=i.split("×");n.push([String(e.length),s,r,a,Bo(o),Ox(e[0].laminate),e.map(c=>c.name).join("; ")])}),n}function td(n){const t=mo(n);return{thickness:Math.round(t.thickness),width:Math.round(t.width),height:Math.round(t.height)}}async function D0(n){var a;if((a=window.navigator.clipboard)!=null&&a.writeText)try{await window.navigator.clipboard.writeText(n);return}catch{}let t=!1;const e=o=>{var c;(c=o.clipboardData)==null||c.setData("text/plain",n),o.preventDefault(),t=!0};document.addEventListener("copy",e);const i=document.execCommand("copy");if(document.removeEventListener("copy",e),i&&t)return;const s=document.createElement("textarea");s.value=n,s.style.left="-9999px",s.style.position="fixed",document.body.append(s),s.focus(),s.select();const r=document.execCommand("copy");if(s.remove(),!r)throw new Error("Clipboard copy failed")}function U0(n){return/[",\n]/.test(n)?`"${n.replace(/"/g,'""')}"`:n}function N0(n){const t=sn(h),e=rn(h);if(!t||!e.length)return;const i=n==null?void 0:n.target;if(i===A.wInput&&t.orientation==="vertical"&&A.wInput.value===""){ne(),t.dimensions.thickness=h.thickness,h.lastSnap=U("status.widthUsesGlobal",{value:Nt(h.thickness)}),Si(t.id),Ft();return}if(i===A.hInput&&t.orientation==="horizontal"&&A.hInput.value===""){ne(),t.dimensions.thickness=h.thickness,h.lastSnap=U("status.heightUsesGlobal",{value:Nt(h.thickness)}),Si(t.id),Ft();return}if(i===A.depthOverrideInput&&A.depthOverrideInput.value===""){ne(),e.forEach(s=>{s.orientation==="vertical"&&(s.dimensions.width=h.depth),s.orientation==="horizontal"&&(s.dimensions.height=h.depth)}),h.lastSnap=U("status.depthUsesGlobal",{value:Nt(h.depth)}),Ft();return}if(!(i instanceof HTMLInputElement&&i.type==="number"&&i.value==="")){if(ne(),e.length>1){const s=zn(e);if(s&&(i===A.xInput||i===A.yInput)){const r=i===A.xInput?Number(A.xInput.value):s.left,a=i===A.yInput?Mc(Number(A.yInput.value)):s.top;W0(e,(Number.isFinite(r)?r:s.left)-s.left,(Number.isFinite(a)?a:s.top)-s.top),h.lastSnap=U("status.selectionMoved")}i===A.depthOverrideInput&&(e.forEach(r=>{const a=ve(A.depthOverrideInput.value,xn(r,h.depth));r.orientation==="vertical"&&(r.dimensions.width=a),r.orientation==="horizontal"&&(r.dimensions.height=a)}),h.lastSnap=U("status.depthSetOnBoards",{count:e.length}))}else{t.name=A.nameInput.value.trim()||t.name;const s={x:Number(A.xInput.value)||0,y:Mc(Number(A.yInput.value)||0),w:t.orientation==="vertical"&&A.wInput.value===""?h.thickness:Math.max(1,Number(A.wInput.value)||1),h:t.orientation==="horizontal"&&A.hInput.value===""?h.thickness:Math.max(1,Number(A.hInput.value)||1)};t.orientation==="vertical"&&(t.dimensions.thickness=A.wInput.value===""?h.thickness:ve(A.wInput.value,ol(t,h.thickness))),t.orientation==="horizontal"&&(t.dimensions.thickness=A.hInput.value===""?h.thickness:ve(A.hInput.value,ol(t,h.thickness)));const r=A.depthOverrideInput.value===""?h.depth:ve(A.depthOverrideInput.value,xn(t,h.depth));t.orientation==="vertical"&&(t.dimensions.width=r),t.orientation==="horizontal"&&(t.dimensions.height=r),Rc(t,s),Si(t.id)}Ft()}}function ed(){const n=rn(h);!n.length||!A.materialInput.value||n.every(t=>t.materialId===A.materialInput.value)||(ne(),n.forEach(t=>{t.materialId=A.materialInput.value}),h.lastSnap=n.length>1?U("status.materialSetOnBoards",{count:n.length}):U("status.material",{name:Bo(n[0].materialId)}),Ft())}function F0(){const n=A.materialNameInput.value.trim();if(!n){h.lastSnap=U("status.nameMaterialFirst"),Ae();return}ne();const t={id:zx(n),name:n,color:Gx(A.materialColorInput.value)};h.materials.push(t),A.materialNameInput.value="",A.materialColorInput.value="#c99756",h.lastSnap=U("status.materialAdded",{name:t.name}),Ft()}function O0(){const n=rn(h);n.length&&(ne(),n.forEach(t=>{t.laminate={left:A.laminateLeftInput.checked,right:A.laminateRightInput.checked,top:A.laminateTopInput.checked,bottom:A.laminateBottomInput.checked,front:A.laminateFrontInput.checked,back:A.laminateBackInput.checked}}),h.lastSnap=n.length>1?U("status.laminateSetOnBoards",{count:n.length}):U("status.laminateUpdated"),Ft())}function B0(){const n=rn(h);n.length&&(ne(),n.forEach(t=>{t.ignoreInOrder=A.ignoreOrderInput.checked}),h.lastSnap=A.ignoreOrderInput.checked?U("status.removedFromOrder"):U("status.addedToOrder"),Ft())}function Xo(){return A.layoutAnchorAxisInput.value==="y"?"y":"x"}function k0(){const n=sn(h);if(!n)return;Xh();const t=Xo(),e=gs(n.id,t);A.layoutAnchorCountInput.value=e.length?String(e.length):A.layoutAnchorCountInput.value,A.layoutAnchorSummary.textContent=e.length?e.map(i=>Nt(i.offset)).join(", "):U("inspector.noLayoutAnchors")}function z0(n,t,e){const i=Lt(n),s=t==="x"?i.w:i.h;if(!A.layoutAnchorBalanceInput.checked)return Array.from({length:e},(d,f)=>Math.round(s*(f+1)/(e+1)));const r=Math.max(1,ve(A.layoutAnchorThicknessInput.value,h.thickness)),a=A.layoutAnchorStartInput.value==="inside"?r:0,o=A.layoutAnchorEndInput.value==="inside"?r:0,l=(s-a-o-e*r)/(e+1);return l<0?null:Array.from({length:e},(d,f)=>Math.round(a+l*(f+1)+r*f+r/2))}function G0(){const n=sn(h);if(!n||rn(h).length>1)return;const t=Xo(),e=Math.max(1,Math.min(20,ve(A.layoutAnchorCountInput.value,4))),i=z0(n,t,e);if(!i){h.lastSnap=U("status.notEnoughSpan"),Ae();return}ne(),h.layoutAnchors=h.layoutAnchors.filter(s=>!(s.boardId===n.id&&s.axis===t)),i.forEach(s=>{h.layoutAnchors.push({id:h.nextLayoutAnchorId,boardId:n.id,axis:t,offset:s}),h.nextLayoutAnchorId+=1}),h.lastSnap=A.layoutAnchorBalanceInput.checked?U("status.balancedAnchorsAdded",{count:e}):U("status.layoutAnchorsAdded",{count:e}),Ft()}function H0(){const n=sn(h);!n||!gs(n.id).length||(ne(),h.layoutAnchors=h.layoutAnchors.filter(t=>t.boardId!==n.id),h.lastSnap=U("status.layoutAnchorsCleared"),Ft())}function nd(n,t){const e=bx[n];if(!e)return;const i=t??V0();h.boards.length||(h.gridOriginX=i.x,h.gridOriginY=i.y),Fh({x:Ei(h,i.x-e.w()/2,"x"),y:Ei(h,i.y-e.h()/2,"y"),dimensions:ko(e.orientation,e.w(),e.h()),kind:e.kind,orientation:e.orientation})}function V0(){const n=Dt.getBoundingClientRect();return si(h,n.width/2,n.height/2)}function uo(n,t){Rc(n,t)}function W0(n,t,e){n.forEach(i=>{i.x=Math.round(i.x+t),i.y=Math.round(i.y+e)}),n.forEach(i=>Si(i.id))}function fo(n,t,e){ne();const i=h.nextMeasurementId;h.measurements.push({id:i,name:Fo(i),a:n,b:t,axis:e,displayOffset:_o({},h.measurements.length)}),h.nextMeasurementId+=1,bs(i),h.tool="select",h.pendingMeasurementAnchor=null,h.previewMeasurementAnchor=null,h.lastSnap=U("status.measurementAdded"),Ft()}function id(n){const t=sn(h);if(!t)return;const e=Lt(t);if(n==="horizontal"){fo({kind:"board-edge",boardId:t.id,edge:"left",offset:e.h/2},{kind:"board-edge",boardId:t.id,edge:"right",offset:e.h/2},"horizontal");return}fo({kind:"board-edge",boardId:t.id,edge:"top",offset:e.w/2},{kind:"board-edge",boardId:t.id,edge:"bottom",offset:e.w/2},"vertical")}function X0(n){const t=Nc(h,n);if(!h.pendingMeasurementAnchor){h.pendingMeasurementAnchor=t,h.previewMeasurementAnchor=null,h.lastSnap=t.kind==="grid"?U("status.gridAnchorSet"):U("status.edgeAnchorSet"),Ft();return}const e=vi(h,h.pendingMeasurementAnchor),i=vi(h,t);!e||!i||fo(h.pendingMeasurementAnchor,t,Fc(e,i))}function Y0(){const n=Mi();n.size&&(ne(),h.boards=h.boards.filter(t=>!n.has(t.id)),h.anchors=h.anchors.filter(t=>!n.has(t.boardId)&&!n.has(t.targetBoardId)),h.layoutAnchors=h.layoutAnchors.filter(t=>!n.has(t.boardId)),h.measurements=h.measurements.filter(t=>![t.a,t.b].some(e=>e.kind==="board-edge"&&n.has(e.boardId))),h.selectedMeasurementId&&!h.measurements.some(t=>t.id===h.selectedMeasurementId)&&(h.selectedMeasurementId=null),Uh(),h.lastSnap=n.size>1?U("status.boardsDeleted",{count:n.size}):U("status.boardDeleted"),Ft())}function q0(n){h.measurements.some(e=>e.id===n)&&(ne(),h.measurements=h.measurements.filter(e=>e.id!==n),h.selectedMeasurementId===n&&(h.selectedMeasurementId=null),Ms===n&&Ss(),h.lastSnap=U("status.measurementDeleted"),Ft())}function Ss(){Ms=null,A.measureRenameForm.hidden=!0}function $0(n){const t=A.measureRenameForm.parentElement;if(!t)return;const e=t.getBoundingClientRect(),i=240,s=108,r=Math.max(8,Math.min(n.clientX-e.left-i/2,e.width-i-8)),a=Math.max(8,Math.min(n.clientY-e.top-s-10,e.height-s-8));A.measureRenameForm.style.left=`${r}px`,A.measureRenameForm.style.top=`${a}px`}function j0(n,t){const e=h.measurements.find(i=>i.id===n);e&&(Ms=e.id,bs(e.id),$0(t),A.measureRenameInput.value=e.name,A.measureRenameForm.hidden=!1,h.lastSnap=U("status.renameMeasurement"),Ft(),window.requestAnimationFrame(()=>{A.measureRenameInput.focus(),A.measureRenameInput.select()}))}function sd(){if(Ms===null)return;const n=h.measurements.find(i=>i.id===Ms);if(!n){Ss();return}const t=A.measureRenameInput.value.trim(),e=t||Fo(n.id);Ss(),n.name!==e&&(ne(),n.name=e,bs(n.id),h.lastSnap=U(t?"status.measurementNamed":"status.measurementReset"),Ft())}function rd(){const n=Cc(h);if(n){q0(n.id);return}Y0()}function ad(){var s;const n=rn(h);if(!n.length)return;ne();const t=new Set(n.map(r=>r.id)),e=new Map,i=n.map(r=>{const a=h.nextId;return h.nextId+=1,e.set(r.id,a),{...r,id:a,name:wr(a),x:r.x+35,y:r.y+35,dimensions:{...r.dimensions},laminate:{...r.laminate},group:0}});h.boards.push(...i),h.anchors.filter(r=>t.has(r.boardId)&&t.has(r.targetBoardId)).forEach(r=>{const a=e.get(r.boardId),o=e.get(r.targetBoardId);!a||!o||(h.anchors.push({...r,id:h.nextAnchorId,boardId:a,targetBoardId:o}),h.nextAnchorId+=1)}),h.layoutAnchors.filter(r=>t.has(r.boardId)).forEach(r=>{const a=e.get(r.boardId);a&&(h.layoutAnchors.push({...r,id:h.nextLayoutAnchorId,boardId:a}),h.nextLayoutAnchorId+=1)}),Vn(i.map(r=>r.id),((s=i[0])==null?void 0:s.id)??null),h.lastSnap=i.length>1?U("status.boardsDuplicated",{count:i.length}):U("status.boardDuplicated"),Ft()}function K0(n){return n==="vertical"?"horizontal":n==="horizontal"?"vertical":"front"}function Z0(n){return n==="upright"?"shelf":n==="shelf"?"upright":n}function od(){const n=rn(h);if(!n.length)return;ne();const t=new Set(n.map(e=>e.id));n.forEach(e=>{const i=Lt(e),s=i.x+i.w/2,r=i.y+i.h/2;e.orientation=K0(e.orientation),e.kind=Z0(e.kind);const a=Lt(e);e.x=Math.round(s-a.w/2),e.y=Math.round(r-a.h/2),h.layoutAnchors.filter(o=>o.boardId===e.id).forEach(o=>{o.axis=o.axis==="x"?"y":"x"})}),h.anchors=h.anchors.filter(e=>!t.has(e.boardId)&&!t.has(e.targetBoardId)),h.lastSnap=n.length>1?U("status.rotatedBoards",{count:n.length}):U("status.rotated90"),Ft()}function J0(n){return n instanceof HTMLElement?n instanceof HTMLInputElement?["email","number","password","search","tel","text","url"].includes(n.type):n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement||n.isContentEditable:!1}function Yo(n){return{n:"ns-resize",s:"ns-resize",e:"ew-resize",w:"ew-resize",ne:"nesw-resize",sw:"nesw-resize",nw:"nwse-resize",se:"nwse-resize"}[n]}function Tc(n){return n.shiftKey||n.metaKey||n.ctrlKey}function Q0(n){return n.button===1||n.altKey}function tv(n,t){const e=Math.min(n.x,t.x),i=Math.min(n.y,t.y);return{x:e,y:i,w:Math.abs(n.x-t.x),h:Math.abs(n.y-t.y)}}function ev(n,t){return n.x<=t.x+t.w&&n.x+n.w>=t.x&&n.y<=t.y+t.h&&n.y+n.h>=t.y}function nv(n){return h.boards.filter(t=>t.kind==="front"&&!h.showFrontPanels?!1:ev(n,Lt(t)))}function po(n){if(h.tool==="measure"){Dt.style.cursor="";return}if(h.measurementDragging){Dt.style.cursor="move";return}if(vo(h,n)){Dt.style.cursor="move";return}const t=sn(h);if(t){const e=Dc(h,t,n);if(e){Dt.style.cursor=Yo(e);return}}Dt.style.cursor=Ic(h,n)?"grab":"crosshair"}function iv(n){const t=h.measurementDragging;if(!t)return;const e=h.measurements.find(c=>c.id===t.id),i=h.measurements.findIndex(c=>c.id===t.id);if(!e||i<0)return;const s=xo(h,e,i);if(!s)return;const r=n.x-t.startPoint.x,a=n.y-t.startPoint.y,o=Math.hypot(r*h.scale,a*h.scale);!t.changed&&o>3&&(ne(),t.changed=!0),t.changed&&(e.displayOffset=Math.round(s.axis==="horizontal"?t.startOffset-a:t.startOffset+r),h.lastSnap=U("status.measurementDisplayMoved"),Dt.style.cursor="move",Ft())}function sv(n){h.tool!=="measure"||!h.pendingMeasurementAnchor||(h.previewMeasurementAnchor=Nc(h,n),Ft())}Dt.addEventListener("pointerdown",n=>{const t=Dt.getBoundingClientRect(),e=si(h,n.clientX-t.left,n.clientY-t.top);if(h.tool==="measure"){X0(e);return}if(Q0(n)){h.panning={startX:n.clientX,startY:n.clientY,panX:h.panX,panY:h.panY},Dt.style.cursor="grabbing",Dt.setPointerCapture(n.pointerId);return}const i=sn(h);if(i){const a=Dc(h,i,e);if(a&&rn(h).length<=1){ne(),h.resizing={id:i.id,handle:a,startPoint:e,startRect:Lt(i)},h.lastSnap=U("status.resizing"),Dt.style.cursor=Yo(a),Dt.setPointerCapture(n.pointerId),Ft();return}}const s=vo(h,e);if(s){const a=h.measurements.findIndex(o=>o.id===s.id);bs(s.id),h.measurementDragging={id:s.id,startPoint:e,startOffset:_o(s,a),changed:!1},h.lastSnap=U("status.measurementSelected"),Dt.style.cursor="move",Dt.setPointerCapture(n.pointerId),Ft();return}const r=Ic(h,e);if(r){if(Tc(n)){Ix(r.id),h.lastSnap=Mi().size>1?U("status.boardsSelected",{count:Mi().size}):U("status.selectionUpdated"),Ft();return}const a=Mi(),o=a.has(r.id)?[r.id,...[...a].filter(c=>c!==r.id)]:[r.id];Vn(o,r.id),ne(),h.dragging={ids:o,startPoint:e,startRects:o.flatMap(c=>{const l=h.boards.find(d=>d.id===c);return l?[{id:c,...Lt(l)}]:[]})},Dt.style.cursor="grabbing",Dt.setPointerCapture(n.pointerId)}else h.selectionBox={start:e,current:e,additive:Tc(n)},Dt.style.cursor="crosshair",Dt.setPointerCapture(n.pointerId);Ft()},bt);Dt.addEventListener("dblclick",n=>{if(h.tool==="measure")return;const t=Dt.getBoundingClientRect(),e=si(h,n.clientX-t.left,n.clientY-t.top),i=vo(h,e);i&&(n.preventDefault(),j0(i.id,n))},bt);Dt.addEventListener("pointermove",n=>{const t=Dt.getBoundingClientRect(),e=si(h,n.clientX-t.left,n.clientY-t.top);if(h.tool==="measure"){sv(e),po(e);return}if(h.resizing){const f=h.boards.find(m=>{var x;return m.id===((x=h.resizing)==null?void 0:x.id)});if(!f)return;const u=bd(h,f,h.resizing.handle,h.resizing.startRect,h.resizing.startPoint,e);uo(f,u.rect),Si(f.id),h.snapGuides=u.guides,h.lastSnap=u.label,Dt.style.cursor=Yo(h.resizing.handle),Ft();return}if(h.panning){h.panX=h.panning.panX+n.clientX-h.panning.startX,h.panY=h.panning.panY+n.clientY-h.panning.startY,h.snapGuides=[],h.lastSnap=U("status.panningView"),Dt.style.cursor="grabbing",Ft();return}if(h.measurementDragging){iv(e);return}if(h.selectionBox){h.selectionBox.current=e,h.snapGuides=[],h.lastSnap=U("status.selectingBoards"),Dt.style.cursor="crosshair",Ft();return}if(!h.dragging){po(e);return}const i=h.boards.find(f=>{var u;return f.id===((u=h.dragging)==null?void 0:u.ids[0])});if(!i)return;const s=h.dragging.startRects.find(f=>f.id===i.id);if(!s)return;const r=e.x-h.dragging.startPoint.x,a=e.y-h.dragging.startPoint.y,o=new Set(h.dragging.ids),c=Ed(h,i,s.x+r,s.y+a,o),l=c.x-s.x,d=c.y-s.y;h.dragging.startRects.forEach(f=>{const u=h.boards.find(m=>m.id===f.id);u&&uo(u,{...f,x:f.x+l,y:f.y+d})}),h.dragging.ids.forEach(f=>Si(f)),h.snapGuides=c.guides,h.lastSnap=c.label,Dt.style.cursor="grabbing",Ft()},bt);Dt.addEventListener("pointerup",n=>{var a;const t=Dt.getBoundingClientRect(),e=si(h,n.clientX-t.left,n.clientY-t.top),i=((a=h.dragging)==null?void 0:a.ids)??(h.resizing?[h.resizing.id]:[]),s=h.measurementDragging,r=h.selectionBox;if(r){const o=tv(r.start,r.current);if(Math.hypot((r.current.x-r.start.x)*h.scale,(r.current.y-r.start.y)*h.scale)>4){const l=nv(o).map(f=>f.id),d=r.additive?[...Mi(),...l]:l;Vn(d,l[0]??(r.additive?h.selectedId:null)),h.lastSnap=l.length?U("status.boardsSelected",{count:Mi().size}):U("status.noBoardsInSelection")}else r.additive||(Uh(),h.selectedMeasurementId=null,h.lastSnap=U("workspace.noBoardSelected"))}h.dragging=null,h.resizing=null,h.measurementDragging=null,h.panning=null,h.selectionBox=null,h.snapGuides=[],i.forEach(o=>jh(o)),s!=null&&s.changed&&(h.lastSnap=U("status.measurementDisplayMoved")),Dt.hasPointerCapture(n.pointerId)&&Dt.releasePointerCapture(n.pointerId),po(e),Ft()},bt);Dt.addEventListener("pointerleave",()=>{!h.dragging&&!h.resizing&&!h.measurementDragging&&!h.panning&&!h.selectionBox&&(Dt.style.cursor="")},bt);Dt.addEventListener("wheel",n=>{n.preventDefault();const t=Dt.getBoundingClientRect(),e={x:n.clientX-t.left,y:n.clientY-t.top},i=si(h,e.x,e.y);h.scale=Math.max(Sx,Math.min(Ex,h.scale*(n.deltaY>0?.92:1.08)));const s=si(h,e.x,e.y);h.panX+=(s.x-i.x)*h.scale,h.panY+=(s.y-i.y)*h.scale,Ft()},{passive:!1,signal:Ih.signal});A.anchorOverlay.addEventListener("click",n=>{const t=n.target.closest("[data-remove-anchor]");if(!t)return;const e=Number(t.dataset.removeAnchor);ne(),h.anchors=h.anchors.filter(i=>i.id!==e),h.lastSnap=U("status.anchorRemoved"),Ft()},bt);A.templateList.addEventListener("click",n=>{const t=n.target.closest("[data-template]"),e=t==null?void 0:t.dataset.template;e&&Kx(e)},bt);A.measureModeBtn.addEventListener("click",()=>{h.tool=h.tool==="measure"?"select":"measure",h.pendingMeasurementAnchor=null,h.previewMeasurementAnchor=null,h.lastSnap=h.tool==="measure"?U("status.pickFirstAnchor"):U("status.selectMode"),Ft()},bt);A.presetList.addEventListener("click",n=>{const t=n.target.closest("[data-preset]");t&&nd(t.dataset.preset??"")},bt);A.presetList.addEventListener("dragstart",n=>{const t=n.target.closest("[data-preset]");!t||!n.dataTransfer||(n.dataTransfer.setData("text/plain",t.dataset.preset??""),n.dataTransfer.effectAllowed="copy")},bt);Dt.addEventListener("dragover",n=>{n.preventDefault(),Dt.classList.add("drop-ready")},bt);Dt.addEventListener("dragleave",()=>{Dt.classList.remove("drop-ready")},bt);Dt.addEventListener("drop",n=>{var i;n.preventDefault(),Dt.classList.remove("drop-ready");const t=(i=n.dataTransfer)==null?void 0:i.getData("text/plain");if(!t)return;const e=Dt.getBoundingClientRect();nd(t,si(h,n.clientX-e.left,n.clientY-e.top))},bt);A.duplicateBtn.addEventListener("click",ad,bt);A.rotateBtn.addEventListener("click",od,bt);A.undoBtn.addEventListener("click",kh,bt);A.redoBtn.addEventListener("click",co,bt);A.measureWidthBtn.addEventListener("click",()=>id("horizontal"),bt);A.measureHeightBtn.addEventListener("click",()=>id("vertical"),bt);A.saveBtn.addEventListener("click",a0,bt);A.loadBtn.addEventListener("click",o0,bt);A.newProjectBtn.addEventListener("click",Jx,bt);A.projectFileInput.addEventListener("change",()=>{var t;const n=(t=A.projectFileInput.files)==null?void 0:t[0];n&&l0(n)},bt);A.deleteBtn.addEventListener("click",rd,bt);A.fitBtn.addEventListener("click",Wo,bt);A.view3dBtn.addEventListener("click",()=>{e0(Qi==="3d"?"sketch":"3d")},bt);A.woodOrderToggleBtn.addEventListener("click",()=>qh(!ti),bt);A.woodOrderBackBtn.addEventListener("click",()=>qh(!1),bt);A.cutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&$h(Number(t.dataset.boardId))},bt);A.ignoredCutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&$h(Number(t.dataset.boardId))},bt);A.copyCsvBtn.addEventListener("click",()=>void I0(),bt);A.exportBtn.addEventListener("click",C0,bt);A.printOrderBtn.addEventListener("click",P0,bt);A.projectNameInput.addEventListener("change",()=>{const n=zh(A.projectNameInput.value);A.projectNameInput.value=n,n!==h.projectName&&(ne(),h.projectName=n,h.lastSnap=U(n?"status.projectNamed":"status.projectNameCleared"),Ft())},bt);Yh(A.thicknessInput,()=>T0(Math.max(3,Number(A.thicknessInput.value)||18)));A.depthInput.addEventListener("change",()=>A0(ve(A.depthInput.value,h.depth)),bt);A.gridInput.addEventListener("input",()=>{ne(),h.grid=Math.max(1,Number(A.gridInput.value)||25),Ft()},bt);A.snapToggle.addEventListener("change",()=>{ne(),h.snap=A.snapToggle.checked,h.lastSnap=h.snap?U("status.snapOn"):U("status.snapOff"),Ft()},bt);A.dimToggle.addEventListener("change",()=>{ne(),h.showDimensions=A.dimToggle.checked,Ft()},bt);A.frontLayerToggle.addEventListener("change",()=>{ne(),h.showFrontPanels=A.frontLayerToggle.checked,h.lastSnap=h.showFrontPanels?U("status.frontPanelsShown"):U("status.frontPanelsGhosted"),Ft()},bt);[A.nameInput,A.xInput,A.yInput,A.wInput,A.hInput,A.depthOverrideInput].forEach(n=>Yh(n,N0));A.materialInput.addEventListener("change",ed,bt);A.materialSelectButton.addEventListener("click",n=>{n.stopPropagation(),f0()},bt);A.materialSelectList.addEventListener("click",n=>{const t=n.target.closest("[data-material-id]");t&&(A.materialInput.value=t.dataset.materialId??"",Ho(),ed())},bt);document.addEventListener("click",n=>{A.materialSelect.contains(n.target)||Ho()},bt);document.addEventListener("keydown",n=>{n.key==="Escape"&&Ho()},bt);A.layoutAnchorAxisInput.addEventListener("change",k0,bt);A.layoutAnchorBalanceInput.addEventListener("change",ho,bt);A.layoutAnchorApplyBtn.addEventListener("click",G0,bt);A.layoutAnchorClearBtn.addEventListener("click",H0,bt);A.materialForm.addEventListener("submit",n=>{n.preventDefault(),F0()},bt);[A.laminateLeftInput,A.laminateRightInput,A.laminateTopInput,A.laminateBottomInput,A.laminateFrontInput,A.laminateBackInput].forEach(n=>n.addEventListener("change",O0,bt));A.ignoreOrderInput.addEventListener("change",B0,bt);A.measureRenameForm.addEventListener("submit",n=>{n.preventDefault(),sd()},bt);A.measureRenameCancelBtn.addEventListener("click",Ss,bt);A.measureRenameInput.addEventListener("keydown",n=>{n.key==="Escape"&&Ss(),n.key==="Enter"&&(n.preventDefault(),sd())},bt);document.addEventListener("keydown",n=>{if(J0(n.target))return;const t=n.key.toLowerCase(),e=n.metaKey||n.ctrlKey;if(e&&t==="z"){n.preventDefault(),n.shiftKey?co():kh();return}if(e&&t==="y"){n.preventDefault(),co();return}if(e&&t==="d"){n.preventDefault(),ad();return}if(!e&&t==="r"){n.preventDefault(),od();return}(n.key==="Delete"||n.key==="Backspace")&&(n.preventDefault(),rd())},bt);window.addEventListener("resize",zo,bt);Wh();A.canvasWrap.dataset.view=Qi;A.view3dBtn.setAttribute("aria-pressed","false");Uo.bindInteractions(bt);r0();zo();
