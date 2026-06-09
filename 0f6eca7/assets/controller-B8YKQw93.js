var du=Object.defineProperty;var fu=(n,t,e)=>t in n?du(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var un=(n,t,e)=>fu(n,typeof t!="symbol"?t+"":t,e);import{t as Tc}from"./index-Bu3P17cg.js";const Ac=28;function Ut(n){return`${Math.round(n)} mm`}function pu(n){return`${n.name} · ${Ut(n.w)} × ${Ut(n.h)}`}function tn(n){return n.boards.find(t=>t.id===n.selectedId)??null}function en(n){const t=new Set(n.selectedIds);return n.selectedId!==null&&t.add(n.selectedId),n.boards.filter(e=>t.has(e.id))}function wc(n){return n.measurements.find(t=>t.id===n.selectedMeasurementId)??null}function ii(n,t,e){return{x:(t-n.panX)/n.scale,y:(e-n.panY)/n.scale}}function _e(n,t,e){return{x:t*n.scale+n.panX,y:e*n.scale+n.panY}}function si(n){return go(n)}function go(n){return{left:n.x,right:n.x+n.w,top:n.y,bottom:n.y+n.h,centerX:n.x+n.w/2,centerY:n.y+n.h/2}}function al(n){return n.kind==="back"?0:n.kind==="front"?2:1}function _o(n){return n.map((t,e)=>({board:t,index:e})).sort((t,e)=>al(t.board)-al(e.board)||t.index-e.index).map(({board:t})=>t)}function Rc(n,t){const e=_o(n.boards);for(let i=e.length-1;i>=0;i-=1){const s=e[i];if(!(s.kind==="front"&&!n.showFrontPanels)&&mu(s,t))return s}return null}function mu(n,t){const e=n.w<32||n.h<32?14:0;return t.x>=n.x-e&&t.x<=n.x+n.w+e&&t.y>=n.y-e&&t.y<=n.y+n.h+e}function Bn(n){if(!n.length)return null;const t=Math.min(...n.map(r=>r.x)),e=Math.min(...n.map(r=>r.y)),i=Math.max(...n.map(r=>r.x+r.w)),s=Math.max(...n.map(r=>r.y+r.h));return{left:t,top:e,right:i,bottom:s,w:i-t,h:s-e}}function hr(n){return{x:n.x,y:n.y,w:n.w,h:n.h}}function ni(n,t){return n.depthOverride??t}function ma(n,t){return n.thicknessOverride??t}function yi(n,t,e){const i=e==="x"?n.gridOriginX:n.gridOriginY;return i+Math.round((t-i)/n.grid)*n.grid}function Cc(n,t){return n.boards.filter(e=>e.group===t)}function gu(n){let t=1;const e=new Set;n.forEach(i=>{if(e.has(i.id))return;const s=[i];for(e.add(i.id),i.group=t;s.length;){const r=s.shift();r&&n.forEach(a=>{e.has(a.id)||!Eu(r,a)||(a.group=t,e.add(a.id),s.push(a))})}t+=1})}function Ic(n,t){const e=Bn(n);if(!e)return null;const i=n.filter(u=>!Ei(u)),s=i.find(u=>Math.abs(u.x-e.left)<=.5&&u.h>t*2),r=i.find(u=>Math.abs(u.x+u.w-e.right)<=.5&&u.h>t*2),a=i.find(u=>Math.abs(u.y-e.top)<=.5&&u.w>t*2),o=i.find(u=>Math.abs(u.y+u.h-e.bottom)<=.5&&u.w>t*2),c=Math.max(0,e.w-((s==null?void 0:s.w)??0)-((r==null?void 0:r.w)??0)),l=Math.max(0,e.h-((a==null?void 0:a.h)??0)-((o==null?void 0:o.h)??0));return{innerW:c,innerH:l,hasFrame:!!(s||r||a||o)}}function _u(n,t,e,i,s=new Set([t.id])){if(!n.snap)return{x:e,y:i,label:"Snap off",guides:[]};const r=Ac/n.scale,a={x:yi(n,e,"x"),y:yi(n,i,"y")};let o=`Grid ${n.grid} mm`,c=r,l=r;const u=[],f=[],h={...t,x:e,y:i},m=si(h);n.boards.forEach(S=>{if(s.has(S.id))return;const g=si(S),p=[[m.left,g.left,"left aligned",null,null],[m.right,g.right,"right aligned",null,null],[m.centerX,g.centerX,"center aligned",null,null],[m.left,g.right,"touching right edge","left","right"],[m.right,g.left,"touching left edge","right","left"]],E=[[m.top,g.top,"top aligned",null,null],[m.bottom,g.bottom,"bottom aligned",null,null],[m.centerY,g.centerY,"middle aligned",null,null],[m.top,g.bottom,"flush below","top","bottom"],[m.bottom,g.top,"flush above","bottom","top"]];p.forEach(([b,A,L,T,P])=>{const M=A-b;Math.abs(M)<c&&(a.x=e+M,c=Math.abs(M),o=L,f[0]=T&&P?{edge:T,target:S,targetEdge:P}:null,u[0]={orientation:"vertical",position:A,label:L})}),E.forEach(([b,A,L,T,P])=>{const M=A-b;Math.abs(M)<l&&(a.y=i+M,l=Math.abs(M),o=L,f[1]=T&&P?{edge:T,target:S,targetEdge:P}:null,u[1]={orientation:"horizontal",position:A,label:L})})}),Oc(n,s).forEach(({anchor:S,board:g,position:p})=>{if(S.axis==="x"){const b=p-m.centerX;Math.abs(b)<c&&(a.x=e+b,c=Math.abs(b),o=`${g.name} layout anchor`,f[0]=null,u[0]={orientation:"vertical",position:p,label:o});return}const E=p-m.centerY;Math.abs(E)<l&&(a.y=i+E,l=Math.abs(E),o=`${g.name} layout anchor`,f[1]=null,u[1]={orientation:"horizontal",position:p,label:o})});const x={...t,x:a.x,y:a.y};return f.forEach((S,g)=>{!S||!u[g]||(u[g].linkPoint=kc(t,x,S.edge,S.target,S.targetEdge))}),{...a,label:o,guides:u.filter(Boolean)}}function Pc(n,t,e){const s=_e(n,e.x,e.y),r=_e(n,t.x,t.y),a=t.w*n.scale,o=t.h*n.scale,c={nw:{x:r.x,y:r.y},n:{x:r.x+a/2,y:r.y},ne:{x:r.x+a,y:r.y},w:{x:r.x,y:r.y+o/2},e:{x:r.x+a,y:r.y+o/2},sw:{x:r.x,y:r.y+o},s:{x:r.x+a/2,y:r.y+o},se:{x:r.x+a,y:r.y+o}};return Lc(t).reduce((l,u)=>{const f=c[u],h=Math.abs(s.x-f.x),m=Math.abs(s.y-f.y);if(h>18||m>18)return l;const x=h*h+m*m;return x<l.distance?{handle:u,distance:x}:l},{handle:null,distance:Number.POSITIVE_INFINITY}).handle}function xu(n,t,e,i,s,r){const a=r.x-s.x,o=r.y-s.y,c={...i};return e.includes("e")&&(c.w=i.w+a),e.includes("s")&&(c.h=i.h+o),e.includes("w")&&(c.x=i.x+a,c.w=i.w-a),e.includes("n")&&(c.y=i.y+o,c.h=i.h-o),t.autoThickness==="width"&&(c.x=i.x,c.w=i.w),t.autoThickness==="height"&&(c.y=i.y,c.h=i.h),vu(n,t,Bc(c,n.thickness),Mu(e))}function Lc(n){return n.autoThickness==="width"?["n","s"]:n.autoThickness==="height"?["w","e"]:["nw","n","ne","w","e","sw","s","se"]}function Dc(n,t){const e=Math.max(10,12/n.scale),i=Math.max(10,16/n.scale);let s=null,r=Number.POSITIVE_INFINITY;return n.boards.forEach(a=>{const o=si(a);[{edge:"left",distance:Math.abs(t.x-o.left),offset:t.y-a.y},{edge:"right",distance:Math.abs(t.x-o.right),offset:t.y-a.y},{edge:"top",distance:Math.abs(t.y-o.top),offset:t.x-a.x},{edge:"bottom",distance:Math.abs(t.y-o.bottom),offset:t.x-a.x}].forEach(l=>{const u=(l.edge==="left"||l.edge==="right")&&t.y>=a.y-e&&t.y<=a.y+a.h+e,f=(l.edge==="top"||l.edge==="bottom")&&t.x>=a.x-e&&t.x<=a.x+a.w+e;if(!(!(u||f)||l.distance>e)&&l.distance<r){const h=l.edge==="left"||l.edge==="right"?a.h/2:a.w/2,m=Math.abs(l.offset-h)<=i?h:l.offset;s={kind:"board-edge",boardId:a.id,edge:l.edge,offset:m},r=l.distance}})}),s??{kind:"grid",x:yi(n,t.x,"x"),y:yi(n,t.y,"y")}}function vi(n,t){if(t.kind==="grid")return{x:t.x,y:t.y};const e=n.boards.find(s=>s.id===t.boardId);if(!e)return null;const i=si(e);return t.edge==="left"||t.edge==="right"?{x:t.edge==="left"?i.left:i.right,y:e.y+ol(t.offset,0,e.h)}:{x:e.x+ol(t.offset,0,e.w),y:t.edge==="top"?i.top:i.bottom}}function Uc(n,t){return Math.abs(n.x-t.x)>=Math.abs(n.y-t.y)?"horizontal":"vertical"}function Nc(n){return 46+n*14}function xo(n,t){return n.displayOffset??Nc(t)}function vo(n,t,e){const i=vi(n,t.a),s=vi(n,t.b);if(!i||!s)return null;const r=xo(t,e);if(t.axis==="horizontal"){const o=Math.min(i.y,s.y)-r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:i.x,y:o},lineEnd:{x:s.x,y:o},labelPoint:{x:(i.x+s.x)/2,y:o-13/n.scale}}}const a=Math.max(i.x,s.x)+r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:a,y:i.y},lineEnd:{x:a,y:s.y},labelPoint:{x:a-16/n.scale,y:(i.y+s.y)/2}}}function Mo(n,t){const e=Math.max(8,10/n.scale),i=42/n.scale,s=18/n.scale;for(let r=n.measurements.length-1;r>=0;r-=1){const a=n.measurements[r],o=vo(n,a,r);if(!o)continue;const c=Math.min(o.lineStart.x,o.lineEnd.x)-e,l=Math.max(o.lineStart.x,o.lineEnd.x)+e,u=Math.min(o.lineStart.y,o.lineEnd.y)-e,f=Math.max(o.lineStart.y,o.lineEnd.y)+e,h=t.x>=c&&t.x<=l&&t.y>=u&&t.y<=f,m=Math.abs(t.x-o.labelPoint.x)<=i&&Math.abs(t.y-o.labelPoint.y)<=s;if(h||m)return a}return null}function Fc(n){const t=[];for(let e=0;e<n.length;e+=1)for(let i=e+1;i<n.length;i+=1){const s=n[e],r=n[i];if(Ei(s)||Ei(r))continue;const a=Math.max(s.x,r.x),o=Math.max(s.y,r.y),c=Math.min(s.x+s.w,r.x+r.w),l=Math.min(s.y+s.h,r.y+r.h);c-a>.5&&l-o>.5&&t.push({x:a,y:o,w:c-a,h:l-o,boardIds:[s.id,r.id]})}return t}function vu(n,t,e,i){if(!n.snap)return{rect:e,label:"Snap off",guides:[]};const s=Ac/n.scale,r={...e};let a=`Grid ${n.grid} mm`;const o=[];return i.forEach(c=>{let l=s,u=a,f=null;const h=ga(go(r),c);let x=yi(n,h,c==="left"||c==="right"?"x":"y")-h;Math.abs(x)<=s&&(u=`Grid ${n.grid} mm`),n.boards.forEach(S=>{if(S.id===t.id)return;const g=si(S);Su(g,c).forEach(([p,E,b])=>{const A=p-h;if(Math.abs(A)<l){l=Math.abs(A),x=A,u=E;const L=yu(r,c,A,n.thickness),T=b?kc(t,L,c,S,b):void 0;f={orientation:c==="left"||c==="right"?"vertical":"horizontal",position:p,label:E,linkPoint:T}}})}),Oc(n,new Set([t.id])).forEach(({anchor:S,board:g,position:p})=>{const E=c==="left"||c==="right";if(E&&S.axis!=="x"||!E&&S.axis!=="y")return;const b=p-h;Math.abs(b)<l&&(l=Math.abs(b),x=b,u=`${g.name} layout anchor`,f={orientation:E?"vertical":"horizontal",position:p,label:u})}),zc(r,c,x,n.thickness),a=u,f&&o.push(f)}),{rect:r,label:a,guides:o}}function Oc(n,t){return n.layoutAnchors.flatMap(e=>{if(t.has(e.boardId))return[];const i=n.boards.find(r=>r.id===e.boardId);if(!i)return[];const s=e.axis==="x"?i.w:i.h;return e.offset<0||e.offset>s?[]:[{anchor:e,board:i,position:(e.axis==="x"?i.x:i.y)+e.offset}]})}function Mu(n){const t=[];return n.includes("n")&&t.push("top"),n.includes("s")&&t.push("bottom"),n.includes("w")&&t.push("left"),n.includes("e")&&t.push("right"),t}function Bc(n,t){const e={...n},i=Math.max(8,t);return e.w<i&&(e.x+=e.w-i,e.w=i),e.h<i&&(e.y+=e.h-i,e.h=i),e}function ga(n,t){return t==="left"?n.left:t==="right"?n.right:t==="top"?n.top:n.bottom}function Su(n,t){return t==="left"||t==="right"?[[n.left,"left edge",t==="right"?"left":null],[n.right,"right edge",t==="left"?"right":null],[n.centerX,"vertical center",null]]:[[n.top,"top edge",t==="bottom"?"top":null],[n.bottom,"bottom edge",t==="top"?"bottom":null],[n.centerY,"horizontal center",null]]}function yu(n,t,e,i){const s={...n};return zc(s,t,e,i),s}function kc(n,t,e,i,s){if(Ei(n)||Ei(i))return;const r=go(t),a=si(i),o=ga(r,e),c=ga(a,s);if(Math.abs(o-c)>.5)return;if(e==="left"||e==="right"){const f=Math.max(t.y,i.y),h=Math.min(t.y+t.h,i.y+i.h);return f>h+.5?void 0:{x:o,y:(f+h)/2}}const l=Math.max(t.x,i.x),u=Math.min(t.x+t.w,i.x+i.w);if(!(l>u+.5))return{x:(l+u)/2,y:o}}function zc(n,t,e,i){t==="left"&&(n.x+=e,n.w-=e),t==="right"&&(n.w+=e),t==="top"&&(n.y+=e,n.h-=e),t==="bottom"&&(n.h+=e);const s=Bc(n,i);n.x=s.x,n.y=s.y,n.w=s.w,n.h=s.h}function ol(n,t,e){return Math.max(t,Math.min(e,n))}function Eu(n,t){if(Ei(n)||Ei(t))return!1;if(bu(n,t))return!0;const e=si(n),i=si(t),s=Math.abs(e.right-i.left)<=.5||Math.abs(i.right-e.left)<=.5,r=Math.abs(e.bottom-i.top)<=.5||Math.abs(i.bottom-e.top)<=.5;return s&&ll(e.top,e.bottom,i.top,i.bottom)||r&&ll(e.left,e.right,i.left,i.right)}function Ei(n){return n.kind==="back"||n.kind==="front"}function ll(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function bu(n,t){return n.x<t.x+t.w-.5&&n.x+n.w>t.x+.5&&n.y<t.y+t.h-.5&&n.y+n.h>t.y+.5}const Ir=["#5c8d89","#d19041","#725d9f","#538052","#bb5d50","#3f75a3"];function Rs(n){return Tc(n)}class Tu{constructor(t,e){un(this,"ctx");this.canvas=t,this.state=e;const i=t.getContext("2d");if(!i)throw new Error("Canvas rendering is not available.");this.ctx=i}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.canvas.width=Math.max(1,Math.round(t.width*e)),this.canvas.height=Math.max(1,Math.round(t.height*e)),this.ctx.setTransform(e,0,0,e,0,0),this.draw()}draw(){const t=this.canvas.getBoundingClientRect();this.ctx.clearRect(0,0,t.width,t.height),this.drawGrid(t.width,t.height),_o(this.state.boards).forEach(e=>this.drawBoard(e)),this.drawLayoutAnchors(),this.drawOverlaps(),this.drawSelectionBox(),this.drawSnapGuides(t.width,t.height),this.drawMeasurements(),this.drawDimensions(),this.drawResizeHandles(),this.drawOriginAxis(t.width,t.height)}drawGrid(t,e){const i=this.scaledGridPx();this.ctx.save(),this.ctx.strokeStyle="#e1e8e2",this.ctx.lineWidth=1;const s=_e(this.state,this.state.gridOriginX,this.state.gridOriginY),r=(s.x%i+i)%i,a=(s.y%i+i)%i;for(let o=r;o<t;o+=i)this.line(o,0,o,e);for(let o=a;o<e;o+=i)this.line(0,o,t,o);this.ctx.restore()}scaledGridPx(){const t=this.state.grid*this.state.scale,e=12;if(t>=e)return t;const i=this.niceGridMultiplier(e/Math.max(.1,t));return t*i}niceGridMultiplier(t){const i=10**Math.floor(Math.log10(t)),s=t/i;return s<=2?2*i:s<=5?5*i:10*i}drawOriginAxis(t,e){const i=_e(this.state,0,0),s=42,r=s+18;if(i.x<-r||i.x>t+r||i.y<-r||i.y>e+r)return;const a=Math.max(1,Math.min(t-1,i.x)),o=Math.max(1,Math.min(e-1,i.y)),c=a<12;this.ctx.save(),this.ctx.strokeStyle="#1f6659",this.ctx.fillStyle="#1f6659",this.ctx.lineWidth=2,this.ctx.font="11px system-ui",this.ctx.textBaseline="middle",this.drawArrow(a,o,a+s,o),this.drawArrow(a,o,a,o-s),this.ctx.beginPath(),this.ctx.arc(a,o,3,0,Math.PI*2),this.ctx.fill(),this.ctx.textAlign="left",this.ctx.fillText("X",a+s+7,o),this.ctx.fillText("0,0",a+6,o+13),this.ctx.textAlign=c?"left":"center",this.ctx.fillText("Y",a+(c?7:0),o-s-10),this.ctx.restore()}drawBoard(t){var h;const e=_e(this.state,t.x,t.y),i=t.w*this.state.scale,s=t.h*this.state.scale,r=this.state.selectedIds.includes(t.id)||t.id===this.state.selectedId,a=t.id===this.state.selectedId,o=t.id===((h=this.state.resizing)==null?void 0:h.id),c=Ir[(t.group-1)%Ir.length]??Ir[0],l=this.materialFor(t),u=this.boardOpacity(t,r||o);this.ctx.save(),this.ctx.globalAlpha=u,this.ctx.fillStyle=t.kind==="back"?this.withAlpha(l.color,.36):l.color,this.ctx.strokeStyle=a?"#1f6659":r?"#2f78b7":c,this.ctx.lineWidth=t.kind==="back"?1.5:a?3:r?2.5:2,this.ctx.fillRect(e.x,e.y,i,s),this.ctx.strokeRect(e.x,e.y,i,s),this.drawLaminateEdges(t,e.x,e.y,i,s),this.ctx.strokeStyle="rgba(99, 72, 37, 0.28)",this.ctx.lineWidth=1;const f=Math.max(10,28*this.state.scale);if(t.w>=t.h)for(let m=e.y+f;m<e.y+s;m+=f)this.line(e.x+4,m,e.x+i-4,m);else for(let m=e.x+f;m<e.x+i;m+=f)this.line(m,e.y+4,m,e.y+s-4);this.ctx.fillStyle="#27302b",this.ctx.font="12px system-ui",this.ctx.textBaseline="top",this.ctx.fillText(t.name,e.x+7,e.y+6),this.ctx.restore()}boardOpacity(t,e){return t.kind!=="front"?1:e?.5:this.state.showFrontPanels?1:.3}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}withAlpha(t,e){const i=/^#([0-9a-f]{6})$/i.exec(t);if(!i)return t;const s=i[1],r=parseInt(s.slice(0,2),16),a=parseInt(s.slice(2,4),16),o=parseInt(s.slice(4,6),16);return`rgba(${r}, ${a}, ${o}, ${e})`}drawLaminateEdges(t,e,i,s,r){const a=[[t.laminate.left,e,i,e,i+r],[t.laminate.right,e+s,i,e+s,i+r],[t.laminate.top||t.laminate.back,e,i,e+s,i],[t.laminate.bottom||t.laminate.front,e,i+r,e+s,i+r]];a.some(([o])=>o)&&(this.ctx.save(),this.ctx.strokeStyle="#d58b28",this.ctx.lineCap="round",this.ctx.lineWidth=Math.max(3,5*this.state.scale),a.forEach(([o,c,l,u,f])=>{o&&this.line(c,l,u,f)}),this.ctx.restore())}drawOverlaps(){const t=Fc(this.state.boards);t.length&&(this.ctx.save(),t.forEach(e=>{const i=_e(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale;this.ctx.fillStyle="rgba(184, 72, 59, 0.22)",this.ctx.fillRect(i.x,i.y,s,r),this.ctx.strokeStyle="rgba(184, 72, 59, 0.9)",this.ctx.lineWidth=1.5,this.ctx.strokeRect(i.x,i.y,s,r),this.ctx.beginPath();for(let a=i.x-r;a<i.x+s+r;a+=8)this.ctx.moveTo(a,i.y+r),this.ctx.lineTo(a+r,i.y);this.ctx.stroke()}),this.ctx.restore())}drawLayoutAnchors(){if(!this.state.layoutAnchors.length)return;const t=new Set(this.state.selectedIds);this.state.selectedId!==null&&t.add(this.state.selectedId),this.ctx.save(),this.state.layoutAnchors.forEach(e=>{const i=this.state.boards.find(l=>l.id===e.boardId);if(!i)return;const s=t.has(i.id),r=s?"#1f6659":"rgba(31, 102, 89, 0.52)";if(this.ctx.strokeStyle=r,this.ctx.fillStyle=s?"#ffffff":"#e7f3f0",this.ctx.lineWidth=s?2:1.4,this.ctx.setLineDash(s?[5,4]:[3,5]),e.axis==="x"){const l=i.x+e.offset;if(e.offset<0||e.offset>i.w)return;const u=_e(this.state,l,i.y),f=_e(this.state,l,i.y+i.h);this.line(u.x,u.y,f.x,f.y),this.drawLayoutAnchorDot(u.x,(u.y+f.y)/2,r);return}const a=i.y+e.offset;if(e.offset<0||e.offset>i.h)return;const o=_e(this.state,i.x,a),c=_e(this.state,i.x+i.w,a);this.line(o.x,o.y,c.x,c.y),this.drawLayoutAnchorDot((o.x+c.x)/2,o.y,r)}),this.ctx.restore()}drawSelectionBox(){const t=this.state.selectionBox;if(!t)return;const e=_e(this.state,t.start.x,t.start.y),i=_e(this.state,t.current.x,t.current.y),s=Math.min(e.x,i.x),r=Math.min(e.y,i.y),a=Math.abs(e.x-i.x),o=Math.abs(e.y-i.y);this.ctx.save(),this.ctx.fillStyle="rgba(47, 120, 183, 0.12)",this.ctx.strokeStyle="#2f78b7",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,4]),this.ctx.fillRect(s,r,a,o),this.ctx.strokeRect(s,r,a,o),this.ctx.restore()}drawSnapGuides(t,e){this.state.snapGuides.length&&(this.ctx.save(),this.ctx.strokeStyle="#2398b6",this.ctx.fillStyle="#1b728a",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,5]),this.ctx.font="12px system-ui",this.state.snapGuides.forEach(i=>{if(i.orientation==="vertical"){const s=_e(this.state,i.position,0);this.line(s.x,0,s.x,e),this.drawGuideLabel(i.label,s.x+8,e-18,t,e)}else{const s=_e(this.state,0,i.position);this.line(0,s.y,t,s.y),this.drawGuideLabel(i.label,t-12,s.y-8,t,e,"right")}}),this.ctx.restore())}drawMeasurements(){if(this.state.measurements.forEach((t,e)=>{const i=vo(this.state,t,e);if(!i)return;const s=t.id===this.state.selectedMeasurementId,r=s?"#b8483b":"#4152a3";this.drawMeasurementLine(i.a,i.b,i.lineStart,i.lineEnd,t.axis,r,t.name,s),this.drawAnchorDot(i.a.x,i.a.y,s?"#fff7f5":"#ffffff",r),this.drawAnchorDot(i.b.x,i.b.y,s?"#fff7f5":"#ffffff",r)}),this.state.pendingMeasurementAnchor){const t=vi(this.state,this.state.pendingMeasurementAnchor);t&&this.drawAnchorDot(t.x,t.y,"#4152a3")}if(this.state.pendingMeasurementAnchor&&this.state.previewMeasurementAnchor){const t=vi(this.state,this.state.pendingMeasurementAnchor),e=vi(this.state,this.state.previewMeasurementAnchor);if(!t||!e)return;this.ctx.save(),this.ctx.globalAlpha=.82,this.drawMeasurement(t,e,Uc(t,e),46+this.state.measurements.length*14,"#2398b6"),this.ctx.restore(),this.drawAnchorDot(t.x,t.y,"#4152a3"),this.drawAnchorDot(e.x,e.y,"#2398b6")}}measurementLabel(t,e){const i=t.trim();return i?`${i} ${e}`:e}drawMeasurement(t,e,i,s,r,a=""){if(i==="horizontal"){const c=Math.min(t.y,e.y)-s;this.drawDimensionLine(t.x,c,e.x,c,this.measurementLabel(a,Ut(Math.abs(e.x-t.x))),0,r),this.drawExtension(t.x,t.y,t.x,c,r),this.drawExtension(e.x,e.y,e.x,c,r);return}const o=Math.max(t.x,e.x)+s;this.drawDimensionLine(o,t.y,o,e.y,this.measurementLabel(a,Ut(Math.abs(e.y-t.y))),0,r),this.drawExtension(t.x,t.y,o,t.y,r),this.drawExtension(e.x,e.y,o,e.y,r)}drawMeasurementLine(t,e,i,s,r,a,o,c){const l=Ut(Math.abs(r==="horizontal"?e.x-t.x:e.y-t.y));this.drawDimensionLine(i.x,i.y,s.x,s.y,this.measurementLabel(o,l),0,a,c?2.4:1.5),this.drawExtension(t.x,t.y,i.x,i.y,a),this.drawExtension(e.x,e.y,s.x,s.y,a)}drawDimensions(){if(!this.state.showDimensions)return;const t=tn(this.state),e=en(this.state),i=e.length>1?e:t?Cc(this.state,t.group):this.state.boards,s=Bn(i);if(!s)return;this.drawDimensionLine(s.left,s.top,s.right,s.top,`${Rs("metrics.outer")} ${Ut(s.w)}`,-28,"#255e55"),this.drawDimensionLine(s.right,s.top,s.right,s.bottom,`${Rs("metrics.outer")} ${Ut(s.h)}`,30,"#255e55");const r=Ic(i,this.state.thickness);r!=null&&r.hasFrame&&(this.drawDimensionLine(s.left+this.state.thickness,s.bottom,s.right-this.state.thickness,s.bottom,`${Rs("metrics.inner")} ${Ut(r.innerW)}`,28,"#a45f1b"),this.drawDimensionLine(s.left,s.top+this.state.thickness,s.left,s.bottom-this.state.thickness,`${Rs("metrics.inner")} ${Ut(r.innerH)}`,-30,"#a45f1b")),t&&e.length<=1&&(this.drawDimensionLine(t.x,t.y+t.h,t.x+t.w,t.y+t.h,Ut(t.w),18,"#6e4d83"),this.drawDimensionLine(t.x+t.w,t.y,t.x+t.w,t.y+t.h,Ut(t.h),18,"#6e4d83"))}drawResizeHandles(){if(en(this.state).length>1)return;const t=tn(this.state);if(!t)return;const e=_e(this.state,t.x,t.y),i=t.w*this.state.scale,s=t.h*this.state.scale,r={nw:[e.x,e.y],n:[e.x+i/2,e.y],ne:[e.x+i,e.y],w:[e.x,e.y+s/2],e:[e.x+i,e.y+s/2],sw:[e.x,e.y+s],s:[e.x+i/2,e.y+s],se:[e.x+i,e.y+s]},a=Lc(t).map(l=>r[l]);this.ctx.save(),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle="#1f6659",this.ctx.lineWidth=1.5;const o=10,c=o/2;a.forEach(([l,u])=>{this.ctx.fillRect(l-c,u-c,o,o),this.ctx.strokeRect(l-c,u-c,o,o)}),this.ctx.restore()}drawGuideLabel(t,e,i,s,r,a="left"){const c=this.ctx.measureText(t).width,l=10,u=a==="right"?Math.max(l+c,Math.min(s-l,e)):Math.max(l,Math.min(s-l-c,e)),f=Math.max(18,Math.min(r-10,i));this.ctx.save(),this.ctx.setLineDash([]),this.ctx.textAlign=a,this.ctx.textBaseline="alphabetic",this.ctx.fillText(t,u,f),this.ctx.restore()}drawDimensionLine(t,e,i,s,r,a=0,o="#2c6159",c=1.5){const l=_e(this.state,t,e),u=_e(this.state,i,s),f=Math.abs(e-s)<.01;this.ctx.save(),this.ctx.strokeStyle=o,this.ctx.fillStyle=o,this.ctx.lineWidth=c,this.ctx.font="12px system-ui",this.ctx.textAlign="center",this.ctx.textBaseline="middle",f?(l.y+=a,u.y+=a,this.line(l.x,l.y,u.x,u.y),this.line(l.x,l.y-5,l.x,l.y+5),this.line(u.x,u.y-5,u.x,u.y+5),this.ctx.fillText(r,(l.x+u.x)/2,l.y-13)):(l.x+=a,u.x+=a,this.line(l.x,l.y,u.x,u.y),this.line(l.x-5,l.y,l.x+5,l.y),this.line(u.x-5,u.y,u.x+5,u.y),this.ctx.translate(l.x-16,(l.y+u.y)/2),this.ctx.rotate(-Math.PI/2),this.ctx.fillText(r,0,0)),this.ctx.restore()}line(t,e,i,s){this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(i,s),this.ctx.stroke()}drawArrow(t,e,i,s){const r=Math.atan2(s-e,i-t),a=7;this.line(t,e,i,s),this.ctx.beginPath(),this.ctx.moveTo(i,s),this.ctx.lineTo(i-a*Math.cos(r-Math.PI/6),s-a*Math.sin(r-Math.PI/6)),this.ctx.lineTo(i-a*Math.cos(r+Math.PI/6),s-a*Math.sin(r+Math.PI/6)),this.ctx.closePath(),this.ctx.fill()}drawExtension(t,e,i,s,r){const a=_e(this.state,t,e),o=_e(this.state,i,s);this.ctx.save(),this.ctx.strokeStyle=r,this.ctx.lineWidth=1,this.ctx.setLineDash([4,4]),this.line(a.x,a.y,o.x,o.y),this.ctx.restore()}drawAnchorDot(t,e,i="#ffffff",s="#4152a3"){const r=_e(this.state,t,e);this.ctx.save(),this.ctx.fillStyle=i,this.ctx.strokeStyle=s,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(r.x,r.y,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}drawLayoutAnchorDot(t,e,i){this.ctx.save(),this.ctx.setLineDash([]),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle=i,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(t,e,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const So="184",Nn={ROTATE:0,DOLLY:1,PAN:2},ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Au=0,cl=1,wu=2,sr=1,Ru=2,us=3,ri=0,He=1,Ln=2,Fn=0,Xi=1,hl=2,ul=3,dl=4,Cu=5,mi=100,Iu=101,Pu=102,Lu=103,Du=104,Uu=200,Nu=201,Fu=202,Ou=203,_a=204,xa=205,Bu=206,ku=207,zu=208,Gu=209,Hu=210,Vu=211,Wu=212,Xu=213,Yu=214,va=0,Ma=1,Sa=2,$i=3,ya=4,Ea=5,ba=6,Ta=7,Gc=0,qu=1,$u=2,xn=0,Hc=1,Vc=2,Wc=3,Xc=4,Yc=5,qc=6,$c=7,jc=300,bi=301,ji=302,Pr=303,Lr=304,Mr=306,Aa=1e3,Dn=1001,wa=1002,Le=1003,ju=1004,Cs=1005,Oe=1006,Dr=1007,_i=1008,je=1009,Kc=1010,Zc=1011,gs=1012,yo=1013,yn=1014,mn=1015,kn=1016,Eo=1017,bo=1018,_s=1020,Jc=35902,Qc=35899,th=1021,eh=1022,ln=1023,zn=1026,xi=1027,nh=1028,To=1029,Ti=1030,Ao=1031,wo=1033,rr=33776,ar=33777,or=33778,lr=33779,Ra=35840,Ca=35841,Ia=35842,Pa=35843,La=36196,Da=37492,Ua=37496,Na=37488,Fa=37489,ur=37490,Oa=37491,Ba=37808,ka=37809,za=37810,Ga=37811,Ha=37812,Va=37813,Wa=37814,Xa=37815,Ya=37816,qa=37817,$a=37818,ja=37819,Ka=37820,Za=37821,Ja=36492,Qa=36494,to=36495,eo=36283,no=36284,dr=36285,io=36286,Ku=3200,so=0,Zu=1,Qn="",$e="srgb",fr="srgb-linear",pr="linear",ne="srgb",Ri=7680,fl=519,Ju=512,Qu=513,td=514,Ro=515,ed=516,nd=517,Co=518,id=519,pl=35044,ml="300 es",gn=2e3,xs=2001;function sd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function mr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function rd(){const n=mr("canvas");return n.style.display="block",n}const gl={};function _l(...n){const t="THREE."+n.shift();console.log(t,...n)}function ih(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ct(...n){n=ih(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Qt(...n){n=ih(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function ro(...n){const t=n.join(" ");t in gl||(gl[t]=!0,Ct(...n))}function ad(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const od={[va]:Ma,[Sa]:ba,[ya]:Ta,[$i]:Ea,[Ma]:va,[ba]:Sa,[Ta]:ya,[Ea]:$i};class li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ps=Math.PI/180,ao=180/Math.PI;function Ss(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Yt(n,t,e){return Math.max(t,Math.min(e,n))}function ld(n,t){return(n%t+t)%t}function Ur(n,t,e){return(1-e)*n+e*t}function ns(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ze(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const cd={DEG2RAD:ps},qo=class qo{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};qo.prototype.isVector2=!0;let zt=qo;class ai{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],m=r[a+1],x=r[a+2],S=r[a+3];if(f!==S||c!==h||l!==m||u!==x){let g=c*h+l*m+u*x+f*S;g<0&&(h=-h,m=-m,x=-x,S=-S,g=-g);let p=1-o;if(g<.9995){const E=Math.acos(g),b=Math.sin(E);p=Math.sin(p*E)/b,o=Math.sin(o*E)/b,c=c*p+h*o,l=l*p+m*o,u=u*p+x*o,f=f*p+S*o}else{c=c*p+h*o,l=l*p+m*o,u=u*p+x*o,f=f*p+S*o;const E=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=E,l*=E,u*=E,f*=E}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[a],h=r[a+1],m=r[a+2],x=r[a+3];return t[e]=o*x+u*f+c*m-l*h,t[e+1]=c*x+u*h+l*f-o*m,t[e+2]=l*x+u*m+o*h-c*f,t[e+3]=u*x-o*f-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),f=o(r/2),h=c(i/2),m=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*m*x,this._y=l*m*f-h*u*x,this._z=l*u*x+h*m*f,this._w=l*u*f-h*m*x;break;case"YXZ":this._x=h*u*f+l*m*x,this._y=l*m*f-h*u*x,this._z=l*u*x-h*m*f,this._w=l*u*f+h*m*x;break;case"ZXY":this._x=h*u*f-l*m*x,this._y=l*m*f+h*u*x,this._z=l*u*x+h*m*f,this._w=l*u*f-h*m*x;break;case"ZYX":this._x=h*u*f-l*m*x,this._y=l*m*f+h*u*x,this._z=l*u*x-h*m*f,this._w=l*u*f+h*m*x;break;case"YZX":this._x=h*u*f+l*m*x,this._y=l*m*f+h*u*x,this._z=l*u*x-h*m*f,this._w=l*u*f-h*m*x;break;case"XZY":this._x=h*u*f-l*m*x,this._y=l*m*f-h*u*x,this._z=l*u*x+h*m*f,this._w=l*u*f+h*m*x;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=i+o+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const $o=class $o{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),u=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+c*l+a*f-o*u,this.y=i+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Nr.copy(this).projectOnVector(t),this.sub(Nr)}reflect(t){return this.sub(Nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Yt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$o.prototype.isVector3=!0;let F=$o;const Nr=new F,xl=new ai,jo=class jo{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],m=i[5],x=i[8],S=s[0],g=s[3],p=s[6],E=s[1],b=s[4],A=s[7],L=s[2],T=s[5],P=s[8];return r[0]=a*S+o*E+c*L,r[3]=a*g+o*b+c*T,r[6]=a*p+o*A+c*P,r[1]=l*S+u*E+f*L,r[4]=l*g+u*b+f*T,r[7]=l*p+u*A+f*P,r[2]=h*S+m*E+x*L,r[5]=h*g+m*b+x*T,r[8]=h*p+m*A+x*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=u*a-o*l,h=o*c-u*r,m=l*r-a*c,x=e*f+i*h+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return t[0]=f*S,t[1]=(s*l-u*i)*S,t[2]=(o*i-s*a)*S,t[3]=h*S,t[4]=(u*e-s*c)*S,t[5]=(s*r-o*e)*S,t[6]=m*S,t[7]=(i*c-l*e)*S,t[8]=(a*e-i*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Fr.makeScale(t,e)),this}rotate(t){return this.premultiply(Fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};jo.prototype.isMatrix3=!0;let Ot=jo;const Fr=new Ot,vl=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ml=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hd(){const n={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ne&&(s.r=On(s.r),s.g=On(s.g),s.b=On(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ne&&(s.r=Yi(s.r),s.g=Yi(s.g),s.b=Yi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Qn?pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ro("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ro("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[fr]:{primaries:t,whitePoint:i,transfer:pr,toXYZ:vl,fromXYZ:Ml,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:i,transfer:ne,toXYZ:vl,fromXYZ:Ml,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),n}const jt=hd();function On(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Yi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ci;class ud{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ci===void 0&&(Ci=mr("canvas")),Ci.width=t.width,Ci.height=t.height;const s=Ci.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ci}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=mr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=On(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(On(e[i]/255)*255):e[i]=On(e[i]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let dd=0;class Io{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Ss(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Or(s[a].image)):r.push(Or(s[a]))}else r=Or(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Or(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ud.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}let fd=0;const Br=new F;class ke extends li{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,i=Dn,s=Dn,r=Oe,a=_i,o=ln,c=je,l=ke.DEFAULT_ANISOTROPY,u=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Ss(),this.name="",this.source=new Io(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Br).x}get height(){return this.source.getSize(Br).y}get depth(){return this.source.getSize(Br).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Aa:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case wa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Aa:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case wa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=jc;ke.DEFAULT_ANISOTROPY=1;const Ko=class Ko{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],m=c[5],x=c[9],S=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-S)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+S)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,A=(m+1)/2,L=(p+1)/2,T=(u+h)/4,P=(f+S)/4,M=(x+g)/4;return b>A&&b>L?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=T/i,r=P/i):A>L?A<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),i=T/s,r=M/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=P/r,s=M/r),this.set(i,s,r,e),this}let E=Math.sqrt((g-x)*(g-x)+(f-S)*(f-S)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(g-x)/E,this.y=(f-S)/E,this.z=(h-u)/E,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Yt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ko.prototype.isVector4=!0;let xe=Ko;class pd extends li{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new ke(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Oe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Io(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vn extends pd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class sh extends ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class md extends ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vr=class vr{constructor(t,e,i,s,r,a,o,c,l,u,f,h,m,x,S,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,u,f,h,m,x,S,g)}set(t,e,i,s,r,a,o,c,l,u,f,h,m,x,S,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=m,p[7]=x,p[11]=S,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vr().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),a=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=a*u,m=a*f,x=o*u,S=o*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=m+x*l,e[5]=h-S*l,e[9]=-o*c,e[2]=S-h*l,e[6]=x+m*l,e[10]=a*c}else if(t.order==="YXZ"){const h=c*u,m=c*f,x=l*u,S=l*f;e[0]=h+S*o,e[4]=x*o-m,e[8]=a*l,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=m*o-x,e[6]=S+h*o,e[10]=a*c}else if(t.order==="ZXY"){const h=c*u,m=c*f,x=l*u,S=l*f;e[0]=h-S*o,e[4]=-a*f,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*u,e[9]=S-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const h=a*u,m=a*f,x=o*u,S=o*f;e[0]=c*u,e[4]=x*l-m,e[8]=h*l+S,e[1]=c*f,e[5]=S*l+h,e[9]=m*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const h=a*c,m=a*l,x=o*c,S=o*l;e[0]=c*u,e[4]=S-h*f,e[8]=x*f+m,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=m*f+x,e[10]=h-S*f}else if(t.order==="XZY"){const h=a*c,m=a*l,x=o*c,S=o*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+S,e[5]=a*u,e[9]=m*f-x,e[2]=x*f-m,e[6]=o*u,e[10]=S*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gd,t,_d)}lookAt(t,e,i){const s=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),Xn.crossVectors(i,Ye),Xn.lengthSq()===0&&(Math.abs(i.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),Xn.crossVectors(i,Ye)),Xn.normalize(),Is.crossVectors(Ye,Xn),s[0]=Xn.x,s[4]=Is.x,s[8]=Ye.x,s[1]=Xn.y,s[5]=Is.y,s[9]=Ye.y,s[2]=Xn.z,s[6]=Is.z,s[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],m=i[13],x=i[2],S=i[6],g=i[10],p=i[14],E=i[3],b=i[7],A=i[11],L=i[15],T=s[0],P=s[4],M=s[8],R=s[12],B=s[1],I=s[5],H=s[9],q=s[13],j=s[2],O=s[6],W=s[10],X=s[14],et=s[3],nt=s[7],ft=s[11],yt=s[15];return r[0]=a*T+o*B+c*j+l*et,r[4]=a*P+o*I+c*O+l*nt,r[8]=a*M+o*H+c*W+l*ft,r[12]=a*R+o*q+c*X+l*yt,r[1]=u*T+f*B+h*j+m*et,r[5]=u*P+f*I+h*O+m*nt,r[9]=u*M+f*H+h*W+m*ft,r[13]=u*R+f*q+h*X+m*yt,r[2]=x*T+S*B+g*j+p*et,r[6]=x*P+S*I+g*O+p*nt,r[10]=x*M+S*H+g*W+p*ft,r[14]=x*R+S*q+g*X+p*yt,r[3]=E*T+b*B+A*j+L*et,r[7]=E*P+b*I+A*O+L*nt,r[11]=E*M+b*H+A*W+L*ft,r[15]=E*R+b*q+A*X+L*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],m=t[14],x=t[3],S=t[7],g=t[11],p=t[15],E=c*m-l*h,b=o*m-l*f,A=o*h-c*f,L=a*m-l*u,T=a*h-c*u,P=a*f-o*u;return e*(S*E-g*b+p*A)-i*(x*E-g*L+p*T)+s*(x*b-S*L+p*P)-r*(x*A-S*T+g*P)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],m=t[11],x=t[12],S=t[13],g=t[14],p=t[15],E=e*o-i*a,b=e*c-s*a,A=e*l-r*a,L=i*c-s*o,T=i*l-r*o,P=s*l-r*c,M=u*S-f*x,R=u*g-h*x,B=u*p-m*x,I=f*g-h*S,H=f*p-m*S,q=h*p-m*g,j=E*q-b*H+A*I+L*B-T*R+P*M;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/j;return t[0]=(o*q-c*H+l*I)*O,t[1]=(s*H-i*q-r*I)*O,t[2]=(S*P-g*T+p*L)*O,t[3]=(h*T-f*P-m*L)*O,t[4]=(c*B-a*q-l*R)*O,t[5]=(e*q-s*B+r*R)*O,t[6]=(g*A-x*P-p*b)*O,t[7]=(u*P-h*A+m*b)*O,t[8]=(a*H-o*B+l*M)*O,t[9]=(i*B-e*H-r*M)*O,t[10]=(x*T-S*A+p*E)*O,t[11]=(f*A-u*T-m*E)*O,t[12]=(o*R-a*I-c*M)*O,t[13]=(e*I-i*R+s*M)*O,t[14]=(S*b-x*L-g*E)*O,t[15]=(u*L-f*b+h*E)*O,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,f=o+o,h=r*l,m=r*u,x=r*f,S=a*u,g=a*f,p=o*f,E=c*l,b=c*u,A=c*f,L=i.x,T=i.y,P=i.z;return s[0]=(1-(S+p))*L,s[1]=(m+A)*L,s[2]=(x-b)*L,s[3]=0,s[4]=(m-A)*T,s[5]=(1-(h+p))*T,s[6]=(g+E)*T,s[7]=0,s[8]=(x+b)*P,s[9]=(g-E)*P,s[10]=(1-(h+S))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Ii.set(s[0],s[1],s[2]).length();const o=Ii.set(s[4],s[5],s[6]).length(),c=Ii.set(s[8],s[9],s[10]).length();r<0&&(a=-a),sn.copy(this);const l=1/a,u=1/o,f=1/c;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=f,sn.elements[9]*=f,sn.elements[10]*=f,e.setFromRotationMatrix(sn),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=gn,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),m=(i+s)/(i-s);let x,S;if(c)x=r/(a-r),S=a*r/(a-r);else if(o===gn)x=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===xs)x=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=gn,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),m=-(i+s)/(i-s);let x,S;if(c)x=1/(a-r),S=a/(a-r);else if(o===gn)x=-2/(a-r),S=-(a+r)/(a-r);else if(o===xs)x=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};vr.prototype.isMatrix4=!0;let ve=vr;const Ii=new F,sn=new ve,gd=new F(0,0,0),_d=new F(1,1,1),Xn=new F,Is=new F,Ye=new F,Sl=new ve,yl=new ai;class oi{constructor(t=0,e=0,i=0,s=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Yt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Sl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Sl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yl.setFromEuler(this),this.setFromQuaternion(yl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class rh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xd=0;const El=new F,Pi=new ai,An=new ve,Ps=new F,is=new F,vd=new F,Md=new ai,bl=new F(1,0,0),Tl=new F(0,1,0),Al=new F(0,0,1),wl={type:"added"},Sd={type:"removed"},Li={type:"childadded",child:null},kr={type:"childremoved",child:null};class De extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Ss(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new F,e=new oi,i=new ai,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ve},normalMatrix:{value:new Ot}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(bl,t)}rotateY(t){return this.rotateOnAxis(Tl,t)}rotateZ(t){return this.rotateOnAxis(Al,t)}translateOnAxis(t,e){return El.copy(t).applyQuaternion(this.quaternion),this.position.add(El.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bl,t)}translateY(t){return this.translateOnAxis(Tl,t)}translateZ(t){return this.translateOnAxis(Al,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ps.copy(t):Ps.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(is,Ps,this.up):An.lookAt(Ps,is,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),Pi.setFromRotationMatrix(An),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wl),Li.child=t,this.dispatchEvent(Li),Li.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sd),kr.child=t,this.dispatchEvent(kr),kr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),An.multiply(t.parent.matrixWorld)),t.applyMatrix4(An),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wl),Li.child=t,this.dispatchEvent(Li),Li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,vd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,Md,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}De.DEFAULT_UP=new F(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ds extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yd={type:"move"};class zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ds,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ds,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ds,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const S of t.hand.values()){const g=e.getJointPose(S,i),p=this._getHandJoint(l,S);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,x=.005;l.inputState.pinching&&h>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yd)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ds;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const ah={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Ls={h:0,s:0,l:0};function Gr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Kt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=jt.workingColorSpace){if(t=ld(t,1),e=Yt(e,0,1),i=Yt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Gr(a,r,t+1/3),this.g=Gr(a,r,t),this.b=Gr(a,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=$e){function i(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const i=ah[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=On(t.r),this.g=On(t.g),this.b=On(t.b),this}copyLinearToSRGB(t){return this.r=Yi(t.r),this.g=Yi(t.g),this.b=Yi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return jt.workingToColorSpace(Fe.copy(this),t),Math.round(Yt(Fe.r*255,0,255))*65536+Math.round(Yt(Fe.g*255,0,255))*256+Math.round(Yt(Fe.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=$e){jt.workingToColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(Ls);const i=Ur(Yn.h,Ls.h,e),s=Ur(Yn.s,Ls.s,e),r=Ur(Yn.l,Ls.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Kt;Kt.NAMES=ah;class Ed extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const rn=new F,wn=new F,Hr=new F,Rn=new F,Di=new F,Ui=new F,Rl=new F,Vr=new F,Wr=new F,Xr=new F,Yr=new xe,qr=new xe,$r=new xe;class Qe{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),rn.subVectors(t,e),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){rn.subVectors(s,e),wn.subVectors(i,e),Hr.subVectors(t,e);const a=rn.dot(rn),o=rn.dot(wn),c=rn.dot(Hr),l=wn.dot(wn),u=wn.dot(Hr),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,m=(l*c-o*u)*h,x=(a*u-o*c)*h;return r.set(1-m-x,x,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Rn)===null?!1:Rn.x>=0&&Rn.y>=0&&Rn.x+Rn.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,Rn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Rn.x),c.addScaledVector(a,Rn.y),c.addScaledVector(o,Rn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return Yr.setScalar(0),qr.setScalar(0),$r.setScalar(0),Yr.fromBufferAttribute(t,e),qr.fromBufferAttribute(t,i),$r.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Yr,r.x),a.addScaledVector(qr,r.y),a.addScaledVector($r,r.z),a}static isFrontFacing(t,e,i,s){return rn.subVectors(i,e),wn.subVectors(t,e),rn.cross(wn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),rn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Di.subVectors(s,i),Ui.subVectors(r,i),Vr.subVectors(t,i);const c=Di.dot(Vr),l=Ui.dot(Vr);if(c<=0&&l<=0)return e.copy(i);Wr.subVectors(t,s);const u=Di.dot(Wr),f=Ui.dot(Wr);if(u>=0&&f<=u)return e.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(i).addScaledVector(Di,a);Xr.subVectors(t,r);const m=Di.dot(Xr),x=Ui.dot(Xr);if(x>=0&&m<=x)return e.copy(r);const S=m*l-c*x;if(S<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(i).addScaledVector(Ui,o);const g=u*x-m*f;if(g<=0&&f-u>=0&&m-x>=0)return Rl.subVectors(r,s),o=(f-u)/(f-u+(m-x)),e.copy(s).addScaledVector(Rl,o);const p=1/(g+S+h);return a=S*p,o=h*p,e.copy(i).addScaledVector(Di,a).addScaledVector(Ui,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class ys{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ds.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ds.copy(i.boundingBox)),Ds.applyMatrix4(t.matrixWorld),this.union(Ds)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),Us.subVectors(this.max,ss),Ni.subVectors(t.a,ss),Fi.subVectors(t.b,ss),Oi.subVectors(t.c,ss),qn.subVectors(Fi,Ni),$n.subVectors(Oi,Fi),hi.subVectors(Ni,Oi);let e=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-hi.z,hi.y,qn.z,0,-qn.x,$n.z,0,-$n.x,hi.z,0,-hi.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-hi.y,hi.x,0];return!jr(e,Ni,Fi,Oi,Us)||(e=[1,0,0,0,1,0,0,0,1],!jr(e,Ni,Fi,Oi,Us))?!1:(Ns.crossVectors(qn,$n),e=[Ns.x,Ns.y,Ns.z],jr(e,Ni,Fi,Oi,Us))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Cn=[new F,new F,new F,new F,new F,new F,new F,new F],an=new F,Ds=new ys,Ni=new F,Fi=new F,Oi=new F,qn=new F,$n=new F,hi=new F,ss=new F,Us=new F,Ns=new F,ui=new F;function jr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ui.fromArray(n,r);const o=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),c=t.dot(ui),l=e.dot(ui),u=i.dot(ui);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ee=new F,Fs=new zt;let bd=0;class Mn extends li{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=pl,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Fs.fromBufferAttribute(this,e),Fs.applyMatrix3(t),this.setXY(e,Fs.x,Fs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ns(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ze(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ns(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ns(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ns(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ns(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==pl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class oh extends Mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class lh extends Mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ve extends Mn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Td=new ys,rs=new F,Kr=new F;class Sr{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Td.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);const e=rs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(rs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Kr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(Kr)),this.expandByPoint(rs.copy(t.center).sub(Kr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Ad=0;const Ze=new ve,Zr=new De,Bi=new F,qe=new ys,as=new ys,Ie=new F;class nn extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=Ss(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sd(t)?lh:oh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ot().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,i){return Ze.makeTranslation(t,e,i),this.applyMatrix4(Ze),this}scale(t,e,i){return Ze.makeScale(t,e,i),this.applyMatrix4(Ze),this}lookAt(t){return Zr.lookAt(t),Zr.updateMatrix(),this.applyMatrix4(Zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ys);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(Ie.addVectors(qe.min,as.min),qe.expandByPoint(Ie),Ie.addVectors(qe.max,as.max),qe.expandByPoint(Ie)):(qe.expandByPoint(as.min),qe.expandByPoint(as.max))}qe.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ie));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ie.fromBufferAttribute(o,l),c&&(Bi.fromBufferAttribute(t,l),Ie.add(Bi)),s=Math.max(s,i.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let M=0;M<i.count;M++)o[M]=new F,c[M]=new F;const l=new F,u=new F,f=new F,h=new zt,m=new zt,x=new zt,S=new F,g=new F;function p(M,R,B){l.fromBufferAttribute(i,M),u.fromBufferAttribute(i,R),f.fromBufferAttribute(i,B),h.fromBufferAttribute(r,M),m.fromBufferAttribute(r,R),x.fromBufferAttribute(r,B),u.sub(l),f.sub(l),m.sub(h),x.sub(h);const I=1/(m.x*x.y-x.x*m.y);isFinite(I)&&(S.copy(u).multiplyScalar(x.y).addScaledVector(f,-m.y).multiplyScalar(I),g.copy(f).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(I),o[M].add(S),o[R].add(S),o[B].add(S),c[M].add(g),c[R].add(g),c[B].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let M=0,R=E.length;M<R;++M){const B=E[M],I=B.start,H=B.count;for(let q=I,j=I+H;q<j;q+=3)p(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const b=new F,A=new F,L=new F,T=new F;function P(M){L.fromBufferAttribute(s,M),T.copy(L);const R=o[M];b.copy(R),b.sub(L.multiplyScalar(L.dot(R))).normalize(),A.crossVectors(T,R);const I=A.dot(c[M])<0?-1:1;a.setXYZW(M,b.x,b.y,b.z,I)}for(let M=0,R=E.length;M<R;++M){const B=E[M],I=B.start,H=B.count;for(let q=I,j=I+H;q<j;q+=3)P(t.getX(q+0)),P(t.getX(q+1)),P(t.getX(q+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,u=new F,f=new F;if(t)for(let h=0,m=t.count;h<m;h+=3){const x=t.getX(h+0),S=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,g),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,g),o.add(u),c.add(u),l.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u);let m=0,x=0;for(let S=0,g=c.length;S<g;S++){o.isInterleavedBufferAttribute?m=c[S]*o.data.stride+o.offset:m=c[S]*u;for(let p=0;p<u;p++)h[x++]=l[m++]}return new Mn(h,u,f)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new nn,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){const h=l[u],m=t(h,i);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const m=l[f];u.push(m.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let wd=0;class Qi extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=Ss(),this.name="",this.type="Material",this.blending=Xi,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_a,this.blendDst=xa,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Xi&&(i.blending=this.blending),this.side!==ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_a&&(i.blendSrc=this.blendSrc),this.blendDst!==xa&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const In=new F,Jr=new F,Os=new F,jn=new F,Qr=new F,Bs=new F,ta=new F;class Po{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Jr.copy(t).add(e).multiplyScalar(.5),Os.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(Jr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Os),o=jn.dot(this.direction),c=-jn.dot(Os),l=jn.lengthSq(),u=Math.abs(1-a*a);let f,h,m,x;if(u>0)if(f=a*c-o,h=a*o-c,x=r*u,f>=0)if(h>=-x)if(h<=x){const S=1/u;f*=S,h*=S,m=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;else h<=-x?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+h*(h+2*c)+l):h<=x?(f=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Jr).addScaledVector(Os,h),m}intersectSphere(t,e){In.subVectors(t.center,this.origin);const i=In.dot(this.direction),s=In.dot(In)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,i,s,r){Qr.subVectors(e,t),Bs.subVectors(i,t),ta.crossVectors(Qr,Bs);let a=this.direction.dot(ta),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;jn.subVectors(this.origin,t);const c=o*this.direction.dot(Bs.crossVectors(jn,Bs));if(c<0)return null;const l=o*this.direction.dot(Qr.cross(jn));if(l<0||c+l>a)return null;const u=-o*jn.dot(ta);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ch extends Qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=Gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Cl=new ve,di=new Po,ks=new Sr,Il=new F,zs=new F,Gs=new F,Hs=new F,ea=new F,Vs=new F,Pl=new F,Ws=new F;class En extends De{constructor(t=new nn,e=new ch){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Vs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],f=r[c];u!==0&&(ea.fromBufferAttribute(f,t),a?Vs.addScaledVector(ea,u):Vs.addScaledVector(ea.sub(e),u))}e.add(Vs)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(r),di.copy(t.ray).recast(t.near),!(ks.containsPoint(di.origin)===!1&&(di.intersectSphere(ks,Il)===null||di.origin.distanceToSquared(Il)>(t.far-t.near)**2))&&(Cl.copy(r).invert(),di.copy(t.ray).applyMatrix4(Cl),!(i.boundingBox!==null&&di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){const g=h[x],p=a[g.materialIndex],E=Math.max(g.start,m.start),b=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let A=E,L=b;A<L;A+=3){const T=o.getX(A),P=o.getX(A+1),M=o.getX(A+2);s=Xs(this,p,t,i,l,u,f,T,P,M),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let g=x,p=S;g<p;g+=3){const E=o.getX(g),b=o.getX(g+1),A=o.getX(g+2);s=Xs(this,a,t,i,l,u,f,E,b,A),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){const g=h[x],p=a[g.materialIndex],E=Math.max(g.start,m.start),b=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let A=E,L=b;A<L;A+=3){const T=A,P=A+1,M=A+2;s=Xs(this,p,t,i,l,u,f,T,P,M),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),S=Math.min(c.count,m.start+m.count);for(let g=x,p=S;g<p;g+=3){const E=g,b=g+1,A=g+2;s=Xs(this,a,t,i,l,u,f,E,b,A),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Rd(n,t,e,i,s,r,a,o){let c;if(t.side===He?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===ri,o),c===null)return null;Ws.copy(o),Ws.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Ws);return l<e.near||l>e.far?null:{distance:l,point:Ws.clone(),object:n}}function Xs(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,zs),n.getVertexPosition(c,Gs),n.getVertexPosition(l,Hs);const u=Rd(n,t,e,i,zs,Gs,Hs,Pl);if(u){const f=new F;Qe.getBarycoord(Pl,zs,Gs,Hs,f),s&&(u.uv=Qe.getInterpolatedAttribute(s,o,c,l,f,new zt)),r&&(u.uv1=Qe.getInterpolatedAttribute(r,o,c,l,f,new zt)),a&&(u.normal=Qe.getInterpolatedAttribute(a,o,c,l,f,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new F,materialIndex:0};Qe.getNormal(zs,Gs,Hs,h.normal),u.face=h,u.barycoord=f}return u}class Cd extends ke{constructor(t=null,e=1,i=1,s,r,a,o,c,l=Le,u=Le,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const na=new F,Id=new F,Pd=new Ot;class Zn{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=na.subVectors(i,e).cross(Id.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(na),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Pd.getNormalMatrix(t),s=this.coplanarPoint(na).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new Sr,Ld=new zt(.5,.5),Ys=new F;class Lo{constructor(t=new Zn,e=new Zn,i=new Zn,s=new Zn,r=new Zn,a=new Zn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=gn,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],m=r[7],x=r[8],S=r[9],g=r[10],p=r[11],E=r[12],b=r[13],A=r[14],L=r[15];if(s[0].setComponents(l-a,m-u,p-x,L-E).normalize(),s[1].setComponents(l+a,m+u,p+x,L+E).normalize(),s[2].setComponents(l+o,m+f,p+S,L+b).normalize(),s[3].setComponents(l-o,m-f,p-S,L-b).normalize(),i)s[4].setComponents(c,h,g,A).normalize(),s[5].setComponents(l-c,m-h,p-g,L-A).normalize();else if(s[4].setComponents(l-c,m-h,p-g,L-A).normalize(),e===gn)s[5].setComponents(l+c,m+h,p+g,L+A).normalize();else if(e===xs)s[5].setComponents(c,h,g,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){fi.center.set(0,0,0);const e=Ld.distanceTo(t.center);return fi.radius=.7071067811865476+e,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Ys.x=s.normal.x>0?t.max.x:t.min.x,Ys.y=s.normal.y>0?t.max.y:t.min.y,Ys.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ys)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Do extends Qi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const gr=new F,_r=new F,Ll=new ve,os=new Po,qs=new Sr,ia=new F,Dl=new F;class Dd extends De{constructor(t=new nn,e=new Do){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)gr.fromBufferAttribute(e,s-1),_r.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=gr.distanceTo(_r);t.setAttribute("lineDistance",new Ve(i,1))}else Ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere),qs.applyMatrix4(s),qs.radius+=r,t.ray.intersectsSphere(qs)===!1)return;Ll.copy(s).invert(),os.copy(t.ray).applyMatrix4(Ll);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let S=m,g=x-1;S<g;S+=l){const p=u.getX(S),E=u.getX(S+1),b=$s(this,t,os,c,p,E,S);b&&e.push(b)}if(this.isLineLoop){const S=u.getX(x-1),g=u.getX(m),p=$s(this,t,os,c,S,g,x-1);p&&e.push(p)}}else{const m=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let S=m,g=x-1;S<g;S+=l){const p=$s(this,t,os,c,S,S+1,S);p&&e.push(p)}if(this.isLineLoop){const S=$s(this,t,os,c,x-1,m,x-1);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function $s(n,t,e,i,s,r,a){const o=n.geometry.attributes.position;if(gr.fromBufferAttribute(o,s),_r.fromBufferAttribute(o,r),e.distanceSqToSegment(gr,_r,ia,Dl)>i)return;ia.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ia);if(!(l<t.near||l>t.far))return{distance:l,point:Dl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Ul=new F,Nl=new F;class hh extends Dd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Ul.fromBufferAttribute(e,s),Nl.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ul.distanceTo(Nl);t.setAttribute("lineDistance",new Ve(i,1))}else Ct("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class uh extends ke{constructor(t=[],e=bi,i,s,r,a,o,c,l,u){super(t,e,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ki extends ke{constructor(t,e,i=yn,s,r,a,o=Le,c=Le,l,u=zn,f=1){if(u!==zn&&u!==xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Io(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ud extends Ki{constructor(t,e=yn,i=bi,s,r,a=Le,o=Le,c,l=zn){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class dh extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ts extends nn{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],f=[];let h=0,m=0;x("z","y","x",-1,-1,i,e,t,a,r,0),x("z","y","x",1,-1,i,e,-t,a,r,1),x("x","z","y",1,1,t,i,e,s,a,2),x("x","z","y",1,-1,t,i,-e,s,a,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(f,2));function x(S,g,p,E,b,A,L,T,P,M,R){const B=A/P,I=L/M,H=A/2,q=L/2,j=T/2,O=P+1,W=M+1;let X=0,et=0;const nt=new F;for(let ft=0;ft<W;ft++){const yt=ft*I-q;for(let wt=0;wt<O;wt++){const Zt=wt*B-H;nt[S]=Zt*E,nt[g]=yt*b,nt[p]=j,l.push(nt.x,nt.y,nt.z),nt[S]=0,nt[g]=0,nt[p]=T>0?1:-1,u.push(nt.x,nt.y,nt.z),f.push(wt/P),f.push(1-ft/M),X+=1}}for(let ft=0;ft<M;ft++)for(let yt=0;yt<P;yt++){const wt=h+yt+O*ft,Zt=h+yt+O*(ft+1),ie=h+(yt+1)+O*(ft+1),Gt=h+(yt+1)+O*ft;c.push(wt,Zt,Gt),c.push(Zt,ie,Gt),et+=6}o.addGroup(m,et,R),m+=et,h+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ts(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const js=new F,Ks=new F,sa=new F,Zs=new Qe;class Nd extends nn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ps*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],u=["a","b","c"],f=new Array(3),h={},m=[];for(let x=0;x<c;x+=3){a?(l[0]=a.getX(x),l[1]=a.getX(x+1),l[2]=a.getX(x+2)):(l[0]=x,l[1]=x+1,l[2]=x+2);const{a:S,b:g,c:p}=Zs;if(S.fromBufferAttribute(o,l[0]),g.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),Zs.getNormal(sa),f[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,f[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,f[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let E=0;E<3;E++){const b=(E+1)%3,A=f[E],L=f[b],T=Zs[u[E]],P=Zs[u[b]],M=`${A}_${L}`,R=`${L}_${A}`;R in h&&h[R]?(sa.dot(h[R].normal)<=r&&(m.push(T.x,T.y,T.z),m.push(P.x,P.y,P.z)),h[R]=null):M in h||(h[M]={index0:l[E],index1:l[b],normal:sa.clone()})}}for(const x in h)if(h[x]){const{index0:S,index1:g}=h[x];js.fromBufferAttribute(o,S),Ks.fromBufferAttribute(o,g),m.push(js.x,js.y,js.z),m.push(Ks.x,Ks.y,Ks.z)}this.setAttribute("position",new Ve(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class yr extends nn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,f=t/o,h=e/c,m=[],x=[],S=[],g=[];for(let p=0;p<u;p++){const E=p*h-a;for(let b=0;b<l;b++){const A=b*f-r;x.push(A,-E,0),S.push(0,0,1),g.push(b/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){const b=E+l*p,A=E+l*(p+1),L=E+1+l*(p+1),T=E+1+l*p;m.push(b,A,T),m.push(A,L,T)}this.setIndex(m),this.setAttribute("position",new Ve(x,3)),this.setAttribute("normal",new Ve(S,3)),this.setAttribute("uv",new Ve(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yr(t.width,t.height,t.widthSegments,t.heightSegments)}}function Zi(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(Fl(s))s.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Fl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Be(n){const t={};for(let e=0;e<n.length;e++){const i=Zi(n[e]);for(const s in i)t[s]=i[s]}return t}function Fl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Fd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function fh(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const Od={clone:Zi,merge:Be};var Bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bd,this.fragmentShader=kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=Fd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class zd extends bn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gd extends Qi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Hd extends Qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Vd extends Qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ph extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const ra=new ve,Ol=new F,Bl=new F;class Wd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.mapType=je,this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lo,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Ol.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ol),Bl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Bl),e.updateMatrixWorld(),ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===xs||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ra)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Js=new F,Qs=new ai,dn=new F;class mh extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Js,Qs,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Js,Qs,dn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Js,Qs,dn),dn.x===1&&dn.y===1&&dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Js,Qs,dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new F,kl=new zt,zl=new zt;class on extends mh{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ao*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ao*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z)}getViewSize(t,e){return this.getViewBounds(t,kl,zl),e.subVectors(zl,kl)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ps*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Er extends mh{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Xd extends Wd{constructor(){super(new Er(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gl extends ph{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Xd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Yd extends ph{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ki=-90,zi=1;class qd extends De{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new on(ki,zi,t,e);s.layers=this.layers,this.add(s);const r=new on(ki,zi,t,e);r.layers=this.layers,this.add(r);const a=new on(ki,zi,t,e);a.layers=this.layers,this.add(a);const o=new on(ki,zi,t,e);o.layers=this.layers,this.add(o);const c=new on(ki,zi,t,e);c.layers=this.layers,this.add(c);const l=new on(ki,zi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===gn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===xs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,m),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class $d extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Hl{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Yt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Yt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Zo=class Zo{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Zo.prototype.isMatrix2=!0;let Vl=Zo;class jd extends hh{constructor(t=10,e=10,i=4473924,s=8947848){i=new Kt(i),s=new Kt(s);const r=e/2,a=t/e,o=t/2,c=[],l=[];for(let h=0,m=0,x=-o;h<=e;h++,x+=a){c.push(-o,0,x,o,0,x),c.push(x,0,-o,x,0,o);const S=h===r?i:s;S.toArray(l,m),m+=3,S.toArray(l,m),m+=3,S.toArray(l,m),m+=3,S.toArray(l,m),m+=3}const u=new nn;u.setAttribute("position",new Ve(c,3)),u.setAttribute("color",new Ve(l,3));const f=new Do({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Kd extends li{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ct("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Wl(n,t,e,i){const s=Zd(i);switch(e){case th:return n*t;case nh:return n*t/s.components*s.byteLength;case To:return n*t/s.components*s.byteLength;case Ti:return n*t*2/s.components*s.byteLength;case Ao:return n*t*2/s.components*s.byteLength;case eh:return n*t*3/s.components*s.byteLength;case ln:return n*t*4/s.components*s.byteLength;case wo:return n*t*4/s.components*s.byteLength;case rr:case ar:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case or:case lr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ca:case Pa:return Math.max(n,16)*Math.max(t,8)/4;case Ra:case Ia:return Math.max(n,8)*Math.max(t,8)/2;case La:case Da:case Na:case Fa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ua:case ur:case Oa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case za:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Va:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ya:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case qa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case $a:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ja:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ka:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Za:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ja:case Qa:case to:return Math.ceil(n/4)*Math.ceil(t/4)*16;case eo:case no:return Math.ceil(n/4)*Math.ceil(t/4)*8;case dr:case io:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zd(n){switch(n){case je:case Kc:return{byteLength:1,components:1};case gs:case Zc:case kn:return{byteLength:2,components:1};case Eo:case bo:return{byteLength:2,components:4};case yn:case yo:case mn:return{byteLength:4,components:1};case Jc:case Qc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:So}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=So);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function gh(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Jd(n){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,u);else{f.sort((m,x)=>m.start-x.start);let h=0;for(let m=1;m<f.length;m++){const x=f[h],S=f[m];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++h,f[h]=S)}f.length=h+1;for(let m=0,x=f.length;m<x;m++){const S=f[m];n.bufferSubData(l,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tf=`#ifdef USE_ALPHAHASH
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
#endif`,ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,af=`#ifdef USE_AOMAP
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
#endif`,of=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lf=`#ifdef USE_BATCHING
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
#endif`,cf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,df=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ff=`#ifdef USE_IRIDESCENCE
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
#endif`,pf=`#ifdef USE_BUMPMAP
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
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ef=`#define PI 3.141592653589793
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
} // validated`,bf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tf=`vec3 transformedNormal = objectNormal;
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
#endif`,Af=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,If="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lf=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
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
#endif`,Of=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gf=`#ifdef USE_GRADIENTMAP
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
}`,Hf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Yf=`#ifdef USE_ENVMAP
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
#endif`,qf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zf=`PhysicalMaterial material;
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
#endif`,Jf=`uniform sampler2D dfgLUT;
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
}`,Qf=`
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
#endif`,tp=`#if defined( RE_IndirectDiffuse )
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
#endif`,ep=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,np=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ip=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,op=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hp=`#if defined( USE_POINTS_UV )
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
#endif`,up=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gp=`#ifdef USE_MORPHTARGETS
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
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ep=`#ifdef USE_NORMALMAP
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
#endif`,bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ap=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ip=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Up=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kp=`float getShadowMask() {
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
}`,zp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gp=`#ifdef USE_SKINNING
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
#endif`,Hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vp=`#ifdef USE_SKINNING
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
#endif`,Wp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$p=`#ifdef USE_TRANSMISSION
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
#endif`,jp=`#ifdef USE_TRANSMISSION
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
#endif`,Kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,em=`uniform sampler2D t2D;
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,im=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,am=`#include <common>
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
}`,om=`#if DEPTH_PACKING == 3200
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
}`,lm=`#define DISTANCE
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
}`,cm=`#define DISTANCE
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,um=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dm=`uniform float scale;
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
}`,fm=`uniform vec3 diffuse;
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
}`,pm=`#include <common>
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
}`,mm=`uniform vec3 diffuse;
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
}`,gm=`#define LAMBERT
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
}`,_m=`#define LAMBERT
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
}`,xm=`#define MATCAP
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
}`,vm=`#define MATCAP
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
}`,Mm=`#define NORMAL
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
}`,Sm=`#define NORMAL
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
}`,ym=`#define PHONG
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
}`,Em=`#define PHONG
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
}`,bm=`#define STANDARD
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
}`,Tm=`#define STANDARD
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
}`,Am=`#define TOON
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
}`,wm=`#define TOON
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
}`,Rm=`uniform float size;
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Im=`#include <common>
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
}`,Pm=`uniform vec3 color;
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
}`,Lm=`uniform float rotation;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:Qd,alphahash_pars_fragment:tf,alphamap_fragment:ef,alphamap_pars_fragment:nf,alphatest_fragment:sf,alphatest_pars_fragment:rf,aomap_fragment:af,aomap_pars_fragment:of,batching_pars_vertex:lf,batching_vertex:cf,begin_vertex:hf,beginnormal_vertex:uf,bsdfs:df,iridescence_fragment:ff,bumpmap_pars_fragment:pf,clipping_planes_fragment:mf,clipping_planes_pars_fragment:gf,clipping_planes_pars_vertex:_f,clipping_planes_vertex:xf,color_fragment:vf,color_pars_fragment:Mf,color_pars_vertex:Sf,color_vertex:yf,common:Ef,cube_uv_reflection_fragment:bf,defaultnormal_vertex:Tf,displacementmap_pars_vertex:Af,displacementmap_vertex:wf,emissivemap_fragment:Rf,emissivemap_pars_fragment:Cf,colorspace_fragment:If,colorspace_pars_fragment:Pf,envmap_fragment:Lf,envmap_common_pars_fragment:Df,envmap_pars_fragment:Uf,envmap_pars_vertex:Nf,envmap_physical_pars_fragment:Yf,envmap_vertex:Ff,fog_vertex:Of,fog_pars_vertex:Bf,fog_fragment:kf,fog_pars_fragment:zf,gradientmap_pars_fragment:Gf,lightmap_pars_fragment:Hf,lights_lambert_fragment:Vf,lights_lambert_pars_fragment:Wf,lights_pars_begin:Xf,lights_toon_fragment:qf,lights_toon_pars_fragment:$f,lights_phong_fragment:jf,lights_phong_pars_fragment:Kf,lights_physical_fragment:Zf,lights_physical_pars_fragment:Jf,lights_fragment_begin:Qf,lights_fragment_maps:tp,lights_fragment_end:ep,lightprobes_pars_fragment:np,logdepthbuf_fragment:ip,logdepthbuf_pars_fragment:sp,logdepthbuf_pars_vertex:rp,logdepthbuf_vertex:ap,map_fragment:op,map_pars_fragment:lp,map_particle_fragment:cp,map_particle_pars_fragment:hp,metalnessmap_fragment:up,metalnessmap_pars_fragment:dp,morphinstance_vertex:fp,morphcolor_vertex:pp,morphnormal_vertex:mp,morphtarget_pars_vertex:gp,morphtarget_vertex:_p,normal_fragment_begin:xp,normal_fragment_maps:vp,normal_pars_fragment:Mp,normal_pars_vertex:Sp,normal_vertex:yp,normalmap_pars_fragment:Ep,clearcoat_normal_fragment_begin:bp,clearcoat_normal_fragment_maps:Tp,clearcoat_pars_fragment:Ap,iridescence_pars_fragment:wp,opaque_fragment:Rp,packing:Cp,premultiplied_alpha_fragment:Ip,project_vertex:Pp,dithering_fragment:Lp,dithering_pars_fragment:Dp,roughnessmap_fragment:Up,roughnessmap_pars_fragment:Np,shadowmap_pars_fragment:Fp,shadowmap_pars_vertex:Op,shadowmap_vertex:Bp,shadowmask_pars_fragment:kp,skinbase_vertex:zp,skinning_pars_vertex:Gp,skinning_vertex:Hp,skinnormal_vertex:Vp,specularmap_fragment:Wp,specularmap_pars_fragment:Xp,tonemapping_fragment:Yp,tonemapping_pars_fragment:qp,transmission_fragment:$p,transmission_pars_fragment:jp,uv_pars_fragment:Kp,uv_pars_vertex:Zp,uv_vertex:Jp,worldpos_vertex:Qp,background_vert:tm,background_frag:em,backgroundCube_vert:nm,backgroundCube_frag:im,cube_vert:sm,cube_frag:rm,depth_vert:am,depth_frag:om,distance_vert:lm,distance_frag:cm,equirect_vert:hm,equirect_frag:um,linedashed_vert:dm,linedashed_frag:fm,meshbasic_vert:pm,meshbasic_frag:mm,meshlambert_vert:gm,meshlambert_frag:_m,meshmatcap_vert:xm,meshmatcap_frag:vm,meshnormal_vert:Mm,meshnormal_frag:Sm,meshphong_vert:ym,meshphong_frag:Em,meshphysical_vert:bm,meshphysical_frag:Tm,meshtoon_vert:Am,meshtoon_frag:wm,points_vert:Rm,points_frag:Cm,shadow_vert:Im,shadow_frag:Pm,sprite_vert:Lm,sprite_frag:Dm},dt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},pn={basic:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Be([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Be([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Be([dt.points,dt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Be([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Be([dt.common,dt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Be([dt.sprite,dt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:Be([dt.common,dt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:Be([dt.lights,dt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};pn.physical={uniforms:Be([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const tr={r:0,b:0,g:0},Um=new ve,_h=new Ot;_h.set(-1,0,0,0,1,0,0,0,1);function Nm(n,t,e,i,s,r){const a=new Kt(0);let o=s===!0?0:1,c,l,u=null,f=0,h=null;function m(E){let b=E.isScene===!0?E.background:null;if(b&&b.isTexture){const A=E.backgroundBlurriness>0;b=t.get(b,A)}return b}function x(E){let b=!1;const A=m(E);A===null?g(a,o):A&&A.isColor&&(g(A,1),b=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?e.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(E,b){const A=m(b);A&&(A.isCubeTexture||A.mapping===Mr)?(l===void 0&&(l=new En(new ts(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Zi(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(L,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=A,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Um.makeRotationFromEuler(b.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(_h),l.material.toneMapped=jt.getTransfer(A.colorSpace)!==ne,(u!==A||f!==A.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new En(new yr(2,2),new bn({name:"BackgroundMaterial",uniforms:Zi(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=jt.getTransfer(A.colorSpace)!==ne,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=A,f=A.version,h=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,b){E.getRGB(tr,fh(n)),e.buffers.color.setClear(tr.r,tr.g,tr.b,b,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,b=1){a.set(E),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:x,addToRenderList:S,dispose:p}}function Fm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(I,H,q,j,O){let W=!1;const X=f(I,j,q,H);r!==X&&(r=X,l(r.object)),W=m(I,j,q,O),W&&x(I,j,q,O),O!==null&&t.update(O,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,A(I,H,q,j),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return n.createVertexArray()}function l(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function f(I,H,q,j){const O=j.wireframe===!0;let W=i[H.id];W===void 0&&(W={},i[H.id]=W);const X=I.isInstancedMesh===!0?I.id:0;let et=W[X];et===void 0&&(et={},W[X]=et);let nt=et[q.id];nt===void 0&&(nt={},et[q.id]=nt);let ft=nt[O];return ft===void 0&&(ft=h(c()),nt[O]=ft),ft}function h(I){const H=[],q=[],j=[];for(let O=0;O<e;O++)H[O]=0,q[O]=0,j[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:q,attributeDivisors:j,object:I,attributes:{},index:null}}function m(I,H,q,j){const O=r.attributes,W=H.attributes;let X=0;const et=q.getAttributes();for(const nt in et)if(et[nt].location>=0){const yt=O[nt];let wt=W[nt];if(wt===void 0&&(nt==="instanceMatrix"&&I.instanceMatrix&&(wt=I.instanceMatrix),nt==="instanceColor"&&I.instanceColor&&(wt=I.instanceColor)),yt===void 0||yt.attribute!==wt||wt&&yt.data!==wt.data)return!0;X++}return r.attributesNum!==X||r.index!==j}function x(I,H,q,j){const O={},W=H.attributes;let X=0;const et=q.getAttributes();for(const nt in et)if(et[nt].location>=0){let yt=W[nt];yt===void 0&&(nt==="instanceMatrix"&&I.instanceMatrix&&(yt=I.instanceMatrix),nt==="instanceColor"&&I.instanceColor&&(yt=I.instanceColor));const wt={};wt.attribute=yt,yt&&yt.data&&(wt.data=yt.data),O[nt]=wt,X++}r.attributes=O,r.attributesNum=X,r.index=j}function S(){const I=r.newAttributes;for(let H=0,q=I.length;H<q;H++)I[H]=0}function g(I){p(I,0)}function p(I,H){const q=r.newAttributes,j=r.enabledAttributes,O=r.attributeDivisors;q[I]=1,j[I]===0&&(n.enableVertexAttribArray(I),j[I]=1),O[I]!==H&&(n.vertexAttribDivisor(I,H),O[I]=H)}function E(){const I=r.newAttributes,H=r.enabledAttributes;for(let q=0,j=H.length;q<j;q++)H[q]!==I[q]&&(n.disableVertexAttribArray(q),H[q]=0)}function b(I,H,q,j,O,W,X){X===!0?n.vertexAttribIPointer(I,H,q,O,W):n.vertexAttribPointer(I,H,q,j,O,W)}function A(I,H,q,j){S();const O=j.attributes,W=q.getAttributes(),X=H.defaultAttributeValues;for(const et in W){const nt=W[et];if(nt.location>=0){let ft=O[et];if(ft===void 0&&(et==="instanceMatrix"&&I.instanceMatrix&&(ft=I.instanceMatrix),et==="instanceColor"&&I.instanceColor&&(ft=I.instanceColor)),ft!==void 0){const yt=ft.normalized,wt=ft.itemSize,Zt=t.get(ft);if(Zt===void 0)continue;const ie=Zt.buffer,Gt=Zt.type,J=Zt.bytesPerElement,gt=Gt===n.INT||Gt===n.UNSIGNED_INT||ft.gpuType===yo;if(ft.isInterleavedBufferAttribute){const ot=ft.data,It=ot.stride,Ft=ft.offset;if(ot.isInstancedInterleavedBuffer){for(let Pt=0;Pt<nt.locationSize;Pt++)p(nt.location+Pt,ot.meshPerAttribute);I.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Pt=0;Pt<nt.locationSize;Pt++)g(nt.location+Pt);n.bindBuffer(n.ARRAY_BUFFER,ie);for(let Pt=0;Pt<nt.locationSize;Pt++)b(nt.location+Pt,wt/nt.locationSize,Gt,yt,It*J,(Ft+wt/nt.locationSize*Pt)*J,gt)}else{if(ft.isInstancedBufferAttribute){for(let ot=0;ot<nt.locationSize;ot++)p(nt.location+ot,ft.meshPerAttribute);I.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let ot=0;ot<nt.locationSize;ot++)g(nt.location+ot);n.bindBuffer(n.ARRAY_BUFFER,ie);for(let ot=0;ot<nt.locationSize;ot++)b(nt.location+ot,wt/nt.locationSize,Gt,yt,wt*J,wt/nt.locationSize*ot*J,gt)}}else if(X!==void 0){const yt=X[et];if(yt!==void 0)switch(yt.length){case 2:n.vertexAttrib2fv(nt.location,yt);break;case 3:n.vertexAttrib3fv(nt.location,yt);break;case 4:n.vertexAttrib4fv(nt.location,yt);break;default:n.vertexAttrib1fv(nt.location,yt)}}}}E()}function L(){R();for(const I in i){const H=i[I];for(const q in H){const j=H[q];for(const O in j){const W=j[O];for(const X in W)u(W[X].object),delete W[X];delete j[O]}}delete i[I]}}function T(I){if(i[I.id]===void 0)return;const H=i[I.id];for(const q in H){const j=H[q];for(const O in j){const W=j[O];for(const X in W)u(W[X].object),delete W[X];delete j[O]}}delete i[I.id]}function P(I){for(const H in i){const q=i[H];for(const j in q){const O=q[j];if(O[I.id]===void 0)continue;const W=O[I.id];for(const X in W)u(W[X].object),delete W[X];delete O[I.id]}}}function M(I){for(const H in i){const q=i[H],j=I.isInstancedMesh===!0?I.id:0,O=q[j];if(O!==void 0){for(const W in O){const X=O[W];for(const et in X)u(X[et].object),delete X[et];delete O[W]}delete q[j],Object.keys(q).length===0&&delete i[H]}}}function R(){B(),a=!0,r!==s&&(r=s,l(r.object))}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:B,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfObject:M,releaseStatesOfProgram:P,initAttributes:S,enableAttribute:g,disableUnusedAttributes:E}}function Om(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let m=0;m<u;m++)h+=l[m];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Bm(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==ln&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const M=P===kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==je&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==mn&&!M)}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Ct("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),A=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:A,maxSamples:L,samples:T}}function km(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Zn,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||i!==0||s;return s=h,i=f.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,m){const x=f.clippingPlanes,S=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!s||x===null||x.length===0||r&&!g)r?u(null):l();else{const E=r?0:i,b=E*4;let A=p.clippingState||null;c.value=A,A=u(x,h,b,m);for(let L=0;L!==b;++L)A[L]=e[L];p.clippingState=A,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,m,x){const S=f!==null?f.length:0;let g=null;if(S!==0){if(g=c.value,x!==!0||g===null){const p=m+S*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,A=m;b!==S;++b,A+=4)a.copy(f[b]).applyMatrix4(E,o),a.normal.toArray(g,A),g[A+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,g}}const ei=4,Xl=[.125,.215,.35,.446,.526,.582],gi=20,zm=256,ls=new Er,Yl=new Kt;let aa=null,oa=0,la=0,ca=!1;const Gm=new F;class ql{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=Gm}=r;aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(aa,oa,la),this._renderer.xr.enabled=ca,t.scissorTest=!1,Gi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===bi||t.mapping===ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:kn,format:ln,colorSpace:fr,depthBuffer:!1},s=$l(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$l(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Hm(r)),this._blurMaterial=Wm(r,t,e),this._ggxMaterial=Vm(r,t,e)}return s}_compileMaterial(t){const e=new En(new nn,t);this._renderer.compile(e,ls)}_sceneToCubeUV(t,e,i,s,r){const c=new on(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(Yl),f.toneMapping=xn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new En(new ts,new ch({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,g=S.material;let p=!1;const E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,p=!0):(g.color.copy(Yl),p=!0);for(let b=0;b<6;b++){const A=b%3;A===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):A===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const L=this._cubeSize;Gi(s,A*L,b>2?L:0,L,L),f.setRenderTarget(s),p&&f.render(S,c),f.render(t,c)}f.toneMapping=m,f.autoClear=h,t.background=E}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===bi||t.mapping===ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Gi(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,ls)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=0+l*1.25,m=f*h,{_lodMax:x}=this,S=this._sizeLods[i],g=3*S*(i>x-ei?i-x+ei:0),p=4*(this._cubeSize-S);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=x-e,Gi(r,g,p,3*S,2*S),s.setRenderTarget(r),s.render(o,ls),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-i,Gi(t,g,p,3*S,2*S),s.setRenderTarget(t),s.render(o,ls)}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const h=l.uniforms,m=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*gi-1),S=r/x,g=isFinite(r)?1+Math.floor(u*S):gi;g>gi&&Ct(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gi}`);const p=[];let E=0;for(let P=0;P<gi;++P){const M=P/S,R=Math.exp(-M*M/2);p.push(R),P===0?E+=R:P<g&&(E+=2*R)}for(let P=0;P<p.length;P++)p[P]=p[P]/E;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=x,h.mipInt.value=b-i;const A=this._sizeLods[s],L=3*A*(s>b-ei?s-b+ei:0),T=4*(this._cubeSize-A);Gi(e,L,T,3*A,2*A),c.setRenderTarget(e),c.render(f,ls)}}function Hm(n){const t=[],e=[],i=[];let s=n;const r=n-ei+1+Xl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>n-ei?c=Xl[a-n+ei-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,x=6,S=3,g=2,p=1,E=new Float32Array(S*x*m),b=new Float32Array(g*x*m),A=new Float32Array(p*x*m);for(let T=0;T<m;T++){const P=T%3*2/3-1,M=T>2?0:-1,R=[P,M,0,P+2/3,M,0,P+2/3,M+1,0,P,M,0,P+2/3,M+1,0,P,M+1,0];E.set(R,S*x*T),b.set(h,g*x*T);const B=[T,T,T,T,T,T];A.set(B,p*x*T)}const L=new nn;L.setAttribute("position",new Mn(E,S)),L.setAttribute("uv",new Mn(b,g)),L.setAttribute("faceIndex",new Mn(A,p)),i.push(new En(L,null)),s>ei&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function $l(n,t,e){const i=new vn(n,t,e);return i.texture.mapping=Mr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Gi(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Vm(n,t,e){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:br(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Wm(n,t,e){const i=new Float32Array(gi),s=new F(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:br(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function jl(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:br(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Kl(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function br(){return`

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
	`}class xh extends vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new uh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ts(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Zi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:He,blending:Fn});r.uniforms.tEquirect.value=e;const a=new En(s,r),o=e.minFilter;return e.minFilter===_i&&(e.minFilter=Oe),new qd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}function Xm(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===Pr||m===Lr)if(t.has(h)){const x=t.get(h).texture;return o(x,h.mapping)}else{const x=h.image;if(x&&x.height>0){const S=new xh(x.height);return S.fromEquirectangularTexture(n,h),t.set(h,S),h.addEventListener("dispose",l),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const m=h.mapping,x=m===Pr||m===Lr,S=m===bi||m===ji;if(x||S){let g=e.get(h);const p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new ql(n)),g=x?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const E=h.image;return x&&E&&E.height>0||S&&E&&c(E)?(i===null&&(i=new ql(n)),g=x?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,m){return m===Pr?h.mapping=bi:m===Lr&&(h.mapping=ji),h}function c(h){let m=0;const x=6;for(let S=0;S<x;S++)h[S]!==void 0&&m++;return m===x}function l(h){const m=h.target;m.removeEventListener("dispose",l);const x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Ym(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&ro("WebGLRenderer: "+i+" extension not supported."),s}}}function qm(n,t,e,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const x in h.attributes)t.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete s[h.id];const m=r.get(h);m&&(t.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const m in h)t.update(h[m],n.ARRAY_BUFFER)}function l(f){const h=[],m=f.index,x=f.attributes.position;let S=0;if(x===void 0)return;if(m!==null){const E=m.array;S=m.version;for(let b=0,A=E.length;b<A;b+=3){const L=E[b+0],T=E[b+1],P=E[b+2];h.push(L,T,T,P,P,L)}}else{const E=x.array;S=x.version;for(let b=0,A=E.length/3-1;b<A;b+=3){const L=b+0,T=b+1,P=b+2;h.push(L,T,T,P,P,L)}}const g=new(x.count>=65535?lh:oh)(h,1);g.version=S;const p=r.get(f);p&&t.remove(p),r.set(f,g)}function u(f){const h=r.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function $m(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){n.drawElements(i,h,r,f*a),e.update(h,i,1)}function l(f,h,m){m!==0&&(n.drawElementsInstanced(i,h,r,f*a,m),e.update(h,i,m))}function u(f,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,m);let S=0;for(let g=0;g<m;g++)S+=h[g];e.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function jm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Qt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Km(n,t,e){const i=new WeakMap,s=new xe;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let R=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",R)};h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let b=0;m===!0&&(b=1),x===!0&&(b=2),S===!0&&(b=3);let A=o.attributes.position.count*b,L=1;A>t.maxTextureSize&&(L=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const T=new Float32Array(A*L*4*f),P=new sh(T,A,L,f);P.type=mn,P.needsUpdate=!0;const M=b*4;for(let B=0;B<f;B++){const I=g[B],H=p[B],q=E[B],j=A*L*4*B;for(let O=0;O<I.count;O++){const W=O*M;m===!0&&(s.fromBufferAttribute(I,O),T[j+W+0]=s.x,T[j+W+1]=s.y,T[j+W+2]=s.z,T[j+W+3]=0),x===!0&&(s.fromBufferAttribute(H,O),T[j+W+4]=s.x,T[j+W+5]=s.y,T[j+W+6]=s.z,T[j+W+7]=0),S===!0&&(s.fromBufferAttribute(q,O),T[j+W+8]=s.x,T[j+W+9]=s.y,T[j+W+10]=s.z,T[j+W+11]=q.itemSize===4?s.w:1)}}h={count:f,texture:P,size:new zt(A,L)},i.set(o,h),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let m=0;for(let S=0;S<l.length;S++)m+=l[S];const x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Zm(n,t,e,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const Jm={[Hc]:"LINEAR_TONE_MAPPING",[Vc]:"REINHARD_TONE_MAPPING",[Wc]:"CINEON_TONE_MAPPING",[Xc]:"ACES_FILMIC_TONE_MAPPING",[qc]:"AGX_TONE_MAPPING",[$c]:"NEUTRAL_TONE_MAPPING",[Yc]:"CUSTOM_TONE_MAPPING"};function Qm(n,t,e,i,s){const r=new vn(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new Ki(t,e):void 0}),a=new vn(t,e,{type:kn,depthBuffer:!1,stencilBuffer:!1}),o=new nn;o.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ve([0,2,0,0,2,0],2));const c=new zd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new En(o,c),u=new Er(-1,1,1,-1,0,1);let f=null,h=null,m=!1,x,S=null,g=[],p=!1;this.setSize=function(E,b){r.setSize(E,b),a.setSize(E,b);for(let A=0;A<g.length;A++){const L=g[A];L.setSize&&L.setSize(E,b)}},this.setEffects=function(E){g=E,p=g.length>0&&g[0].isRenderPass===!0;const b=r.width,A=r.height;for(let L=0;L<g.length;L++){const T=g[L];T.setSize&&T.setSize(b,A)}},this.begin=function(E,b){if(m||E.toneMapping===xn&&g.length===0)return!1;if(S=b,b!==null){const A=b.width,L=b.height;(r.width!==A||r.height!==L)&&this.setSize(A,L)}return p===!1&&E.setRenderTarget(r),x=E.toneMapping,E.toneMapping=xn,!0},this.hasRenderPass=function(){return p},this.end=function(E,b){E.toneMapping=x,m=!0;let A=r,L=a;for(let T=0;T<g.length;T++){const P=g[T];if(P.enabled!==!1&&(P.render(E,L,A,b),P.needsSwap!==!1)){const M=A;A=L,L=M}}if(f!==E.outputColorSpace||h!==E.toneMapping){f=E.outputColorSpace,h=E.toneMapping,c.defines={},jt.getTransfer(f)===ne&&(c.defines.SRGB_TRANSFER="");const T=Jm[h];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=A.texture,E.setRenderTarget(S),E.render(l,u),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const vh=new ke,oo=new Ki(1,1),Mh=new sh,Sh=new md,yh=new uh,Zl=[],Jl=[],Ql=new Float32Array(16),tc=new Float32Array(9),ec=new Float32Array(4);function es(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Zl[s];if(r===void 0&&(r=new Float32Array(s),Zl[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Re(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ce(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Tr(n,t){let e=Jl[t];e===void 0&&(e=new Int32Array(t),Jl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function tg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function eg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2fv(this.addr,t),Ce(e,t)}}function ng(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;n.uniform3fv(this.addr,t),Ce(e,t)}}function ig(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4fv(this.addr,t),Ce(e,t)}}function sg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;ec.set(i),n.uniformMatrix2fv(this.addr,!1,ec),Ce(e,i)}}function rg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;tc.set(i),n.uniformMatrix3fv(this.addr,!1,tc),Ce(e,i)}}function ag(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;Ql.set(i),n.uniformMatrix4fv(this.addr,!1,Ql),Ce(e,i)}}function og(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2iv(this.addr,t),Ce(e,t)}}function cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3iv(this.addr,t),Ce(e,t)}}function hg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4iv(this.addr,t),Ce(e,t)}}function ug(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function dg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2uiv(this.addr,t),Ce(e,t)}}function fg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3uiv(this.addr,t),Ce(e,t)}}function pg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4uiv(this.addr,t),Ce(e,t)}}function mg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(oo.compareFunction=e.isReversedDepthBuffer()?Co:Ro,r=oo):r=vh,e.setTexture2D(t||r,s)}function gg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Sh,s)}function _g(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||yh,s)}function xg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Mh,s)}function vg(n){switch(n){case 5126:return tg;case 35664:return eg;case 35665:return ng;case 35666:return ig;case 35674:return sg;case 35675:return rg;case 35676:return ag;case 5124:case 35670:return og;case 35667:case 35671:return lg;case 35668:case 35672:return cg;case 35669:case 35673:return hg;case 5125:return ug;case 36294:return dg;case 36295:return fg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return mg;case 35679:case 36299:case 36307:return gg;case 35680:case 36300:case 36308:case 36293:return _g;case 36289:case 36303:case 36311:case 36292:return xg}}function Mg(n,t){n.uniform1fv(this.addr,t)}function Sg(n,t){const e=es(t,this.size,2);n.uniform2fv(this.addr,e)}function yg(n,t){const e=es(t,this.size,3);n.uniform3fv(this.addr,e)}function Eg(n,t){const e=es(t,this.size,4);n.uniform4fv(this.addr,e)}function bg(n,t){const e=es(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Tg(n,t){const e=es(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Ag(n,t){const e=es(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wg(n,t){n.uniform1iv(this.addr,t)}function Rg(n,t){n.uniform2iv(this.addr,t)}function Cg(n,t){n.uniform3iv(this.addr,t)}function Ig(n,t){n.uniform4iv(this.addr,t)}function Pg(n,t){n.uniform1uiv(this.addr,t)}function Lg(n,t){n.uniform2uiv(this.addr,t)}function Dg(n,t){n.uniform3uiv(this.addr,t)}function Ug(n,t){n.uniform4uiv(this.addr,t)}function Ng(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=oo:a=vh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Fg(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Sh,r[a])}function Og(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||yh,r[a])}function Bg(n,t,e){const i=this.cache,s=t.length,r=Tr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Mh,r[a])}function kg(n){switch(n){case 5126:return Mg;case 35664:return Sg;case 35665:return yg;case 35666:return Eg;case 35674:return bg;case 35675:return Tg;case 35676:return Ag;case 5124:case 35670:return wg;case 35667:case 35671:return Rg;case 35668:case 35672:return Cg;case 35669:case 35673:return Ig;case 5125:return Pg;case 36294:return Lg;case 36295:return Dg;case 36296:return Ug;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return Bg}}class zg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=vg(e.type)}}class Gg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=kg(e.type)}}class Hg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const ha=/(\w+)(\])?(\[|\.)?/g;function nc(n,t){n.seq.push(t),n.map[t.id]=t}function Vg(n,t,e){const i=n.name,s=i.length;for(ha.lastIndex=0;;){const r=ha.exec(i),a=ha.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){nc(e,l===void 0?new zg(o,n,t):new Gg(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Hg(o),nc(e,f)),e=f}}}class cr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Vg(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function ic(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Wg=37297;let Xg=0;function Yg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const sc=new Ot;function qg(n){jt._getMatrix(sc,jt.workingColorSpace,n);const t=`mat3( ${sc.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(n)){case pr:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function rc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Yg(n.getShaderSource(t),o)}else return r}function $g(n,t){const e=qg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const jg={[Hc]:"Linear",[Vc]:"Reinhard",[Wc]:"Cineon",[Xc]:"ACESFilmic",[qc]:"AgX",[$c]:"Neutral",[Yc]:"Custom"};function Kg(n,t){const e=jg[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const er=new F;function Zg(){jt.getLuminanceCoefficients(er);const n=er.x.toFixed(4),t=er.y.toFixed(4),e=er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function Qg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function t_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function fs(n){return n!==""}function ac(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function oc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const e_=/^[ \t]*#include +<([\w\d./]+)>/gm;function lo(n){return n.replace(e_,i_)}const n_=new Map;function i_(n,t){let e=Vt[t];if(e===void 0){const i=n_.get(t);if(i!==void 0)e=Vt[i],Ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return lo(e)}const s_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lc(n){return n.replace(s_,r_)}function r_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const a_={[sr]:"SHADOWMAP_TYPE_PCF",[us]:"SHADOWMAP_TYPE_VSM"};function o_(n){return a_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const l_={[bi]:"ENVMAP_TYPE_CUBE",[ji]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE_UV"};function c_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":l_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const h_={[ji]:"ENVMAP_MODE_REFRACTION"};function u_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":h_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const d_={[Gc]:"ENVMAP_BLENDING_MULTIPLY",[qu]:"ENVMAP_BLENDING_MIX",[$u]:"ENVMAP_BLENDING_ADD"};function f_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":d_[n.combine]||"ENVMAP_BLENDING_NONE"}function p_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function m_(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=o_(e),l=c_(e),u=u_(e),f=f_(e),h=p_(e),m=Jg(e),x=Qg(r),S=s.createProgram();let g,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(fs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(fs).join(`
`),p.length>0&&(p+=`
`)):(g=[cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),p=[cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xn?"#define TONE_MAPPING":"",e.toneMapping!==xn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==xn?Kg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,$g("linearToOutputTexel",e.outputColorSpace),Zg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fs).join(`
`)),a=lo(a),a=ac(a,e),a=oc(a,e),o=lo(o),o=ac(o,e),o=oc(o,e),a=lc(a),o=lc(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=E+g+a,A=E+p+o,L=ic(s,s.VERTEX_SHADER,b),T=ic(s,s.FRAGMENT_SHADER,A);s.attachShader(S,L),s.attachShader(S,T),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function P(I){if(n.debug.checkShaderErrors){const H=s.getProgramInfoLog(S)||"",q=s.getShaderInfoLog(L)||"",j=s.getShaderInfoLog(T)||"",O=H.trim(),W=q.trim(),X=j.trim();let et=!0,nt=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,L,T);else{const ft=rc(s,L,"vertex"),yt=rc(s,T,"fragment");Qt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+ft+`
`+yt)}else O!==""?Ct("WebGLProgram: Program Info Log:",O):(W===""||X==="")&&(nt=!1);nt&&(I.diagnostics={runnable:et,programLog:O,vertexShader:{log:W,prefix:g},fragmentShader:{log:X,prefix:p}})}s.deleteShader(L),s.deleteShader(T),M=new cr(s,S),R=t_(s,S)}let M;this.getUniforms=function(){return M===void 0&&P(this),M};let R;this.getAttributes=function(){return R===void 0&&P(this),R};let B=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(S,Wg)),B},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xg++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=L,this.fragmentShader=T,this}let g_=0;class __{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new x_(t),e.set(t,i)),i}}class x_{constructor(t){this.id=g_++,this.code=t,this.usedTimes=0}}function v_(n){return n===Ti||n===ur||n===dr}function M_(n,t,e,i,s,r){const a=new rh,o=new __,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function S(M,R,B,I,H,q){const j=I.fog,O=H.geometry,W=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,X=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,et=t.get(M.envMap||W,X),nt=et&&et.mapping===Mr?et.image.height:null,ft=m[M.type];M.precision!==null&&(h=i.getMaxPrecision(M.precision),h!==M.precision&&Ct("WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));const yt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,wt=yt!==void 0?yt.length:0;let Zt=0;O.morphAttributes.position!==void 0&&(Zt=1),O.morphAttributes.normal!==void 0&&(Zt=2),O.morphAttributes.color!==void 0&&(Zt=3);let ie,Gt,J,gt;if(ft){const Bt=pn[ft];ie=Bt.vertexShader,Gt=Bt.fragmentShader}else ie=M.vertexShader,Gt=M.fragmentShader,o.update(M),J=o.getVertexShaderID(M),gt=o.getFragmentShaderID(M);const ot=n.getRenderTarget(),It=n.state.buffers.depth.getReversed(),Ft=H.isInstancedMesh===!0,Pt=H.isBatchedMesh===!0,fe=!!M.map,qt=!!M.matcap,se=!!et,de=!!M.aoMap,Xt=!!M.lightMap,be=!!M.bumpMap,pe=!!M.normalMap,We=!!M.displacementMap,D=!!M.emissiveMap,Te=!!M.metalnessMap,$t=!!M.roughnessMap,he=M.anisotropy>0,ut=M.clearcoat>0,me=M.dispersion>0,y=M.iridescence>0,_=M.sheen>0,k=M.transmission>0,K=he&&!!M.anisotropyMap,tt=ut&&!!M.clearcoatMap,it=ut&&!!M.clearcoatNormalMap,ht=ut&&!!M.clearcoatRoughnessMap,Y=y&&!!M.iridescenceMap,Z=y&&!!M.iridescenceThicknessMap,_t=_&&!!M.sheenColorMap,Mt=_&&!!M.sheenRoughnessMap,lt=!!M.specularMap,st=!!M.specularColorMap,Dt=!!M.specularIntensityMap,Ht=k&&!!M.transmissionMap,te=k&&!!M.thicknessMap,C=!!M.gradientMap,rt=!!M.alphaMap,$=M.alphaTest>0,xt=!!M.alphaHash,ct=!!M.extensions;let Q=xn;M.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Q=n.toneMapping);const bt={shaderID:ft,shaderType:M.type,shaderName:M.name,vertexShader:ie,fragmentShader:Gt,defines:M.defines,customVertexShaderID:J,customFragmentShaderID:gt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:Pt,batchingColor:Pt&&H._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&H.instanceColor!==null,instancingMorph:Ft&&H.morphTexture!==null,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:fe,matcap:qt,envMap:se,envMapMode:se&&et.mapping,envMapCubeUVHeight:nt,aoMap:de,lightMap:Xt,bumpMap:be,normalMap:pe,displacementMap:We,emissiveMap:D,normalMapObjectSpace:pe&&M.normalMapType===Zu,normalMapTangentSpace:pe&&M.normalMapType===so,packedNormalMap:pe&&M.normalMapType===so&&v_(M.normalMap.format),metalnessMap:Te,roughnessMap:$t,anisotropy:he,anisotropyMap:K,clearcoat:ut,clearcoatMap:tt,clearcoatNormalMap:it,clearcoatRoughnessMap:ht,dispersion:me,iridescence:y,iridescenceMap:Y,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:_t,sheenRoughnessMap:Mt,specularMap:lt,specularColorMap:st,specularIntensityMap:Dt,transmission:k,transmissionMap:Ht,thicknessMap:te,gradientMap:C,opaque:M.transparent===!1&&M.blending===Xi&&M.alphaToCoverage===!1,alphaMap:rt,alphaTest:$,alphaHash:xt,combine:M.combine,mapUv:fe&&x(M.map.channel),aoMapUv:de&&x(M.aoMap.channel),lightMapUv:Xt&&x(M.lightMap.channel),bumpMapUv:be&&x(M.bumpMap.channel),normalMapUv:pe&&x(M.normalMap.channel),displacementMapUv:We&&x(M.displacementMap.channel),emissiveMapUv:D&&x(M.emissiveMap.channel),metalnessMapUv:Te&&x(M.metalnessMap.channel),roughnessMapUv:$t&&x(M.roughnessMap.channel),anisotropyMapUv:K&&x(M.anisotropyMap.channel),clearcoatMapUv:tt&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:it&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ht&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&x(M.sheenRoughnessMap.channel),specularMapUv:lt&&x(M.specularMap.channel),specularColorMapUv:st&&x(M.specularColorMap.channel),specularIntensityMapUv:Dt&&x(M.specularIntensityMap.channel),transmissionMapUv:Ht&&x(M.transmissionMap.channel),thicknessMapUv:te&&x(M.thicknessMap.channel),alphaMapUv:rt&&x(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(pe||he),vertexNormals:!!O.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!O.attributes.uv&&(fe||rt),fog:!!j,useFog:M.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||O.attributes.normal===void 0&&pe===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:It,skinning:H.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Zt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:Q,decodeVideoTexture:fe&&M.map.isVideoTexture===!0&&jt.getTransfer(M.map.colorSpace)===ne,decodeVideoTextureEmissive:D&&M.emissiveMap.isVideoTexture===!0&&jt.getTransfer(M.emissiveMap.colorSpace)===ne,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ln,flipSided:M.side===He,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ct&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&M.extensions.multiDraw===!0||Pt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return bt.vertexUv1s=c.has(1),bt.vertexUv2s=c.has(2),bt.vertexUv3s=c.has(3),c.clear(),bt}function g(M){const R=[];if(M.shaderID?R.push(M.shaderID):(R.push(M.customVertexShaderID),R.push(M.customFragmentShaderID)),M.defines!==void 0)for(const B in M.defines)R.push(B),R.push(M.defines[B]);return M.isRawShaderMaterial===!1&&(p(R,M),E(R,M),R.push(n.outputColorSpace)),R.push(M.customProgramCacheKey),R.join()}function p(M,R){M.push(R.precision),M.push(R.outputColorSpace),M.push(R.envMapMode),M.push(R.envMapCubeUVHeight),M.push(R.mapUv),M.push(R.alphaMapUv),M.push(R.lightMapUv),M.push(R.aoMapUv),M.push(R.bumpMapUv),M.push(R.normalMapUv),M.push(R.displacementMapUv),M.push(R.emissiveMapUv),M.push(R.metalnessMapUv),M.push(R.roughnessMapUv),M.push(R.anisotropyMapUv),M.push(R.clearcoatMapUv),M.push(R.clearcoatNormalMapUv),M.push(R.clearcoatRoughnessMapUv),M.push(R.iridescenceMapUv),M.push(R.iridescenceThicknessMapUv),M.push(R.sheenColorMapUv),M.push(R.sheenRoughnessMapUv),M.push(R.specularMapUv),M.push(R.specularColorMapUv),M.push(R.specularIntensityMapUv),M.push(R.transmissionMapUv),M.push(R.thicknessMapUv),M.push(R.combine),M.push(R.fogExp2),M.push(R.sizeAttenuation),M.push(R.morphTargetsCount),M.push(R.morphAttributeCount),M.push(R.numDirLights),M.push(R.numPointLights),M.push(R.numSpotLights),M.push(R.numSpotLightMaps),M.push(R.numHemiLights),M.push(R.numRectAreaLights),M.push(R.numDirLightShadows),M.push(R.numPointLightShadows),M.push(R.numSpotLightShadows),M.push(R.numSpotLightShadowsWithMaps),M.push(R.numLightProbes),M.push(R.shadowMapType),M.push(R.toneMapping),M.push(R.numClippingPlanes),M.push(R.numClipIntersection),M.push(R.depthPacking)}function E(M,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),M.push(a.mask)}function b(M){const R=m[M.type];let B;if(R){const I=pn[R];B=Od.clone(I.uniforms)}else B=M.uniforms;return B}function A(M,R){let B=u.get(R);return B!==void 0?++B.usedTimes:(B=new m_(n,R,M,s),l.push(B),u.set(R,B)),B}function L(M){if(--M.usedTimes===0){const R=l.indexOf(M);l[R]=l[l.length-1],l.pop(),u.delete(M.cacheKey),M.destroy()}}function T(M){o.remove(M)}function P(){o.dispose()}return{getParameters:S,getProgramCacheKey:g,getUniforms:b,acquireProgram:A,releaseProgram:L,releaseShaderCache:T,programs:l,dispose:P}}function S_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function y_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function hc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function uc(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,x,S,g,p){let E=n[t];return E===void 0?(E={id:h.id,object:h,geometry:m,material:x,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:g,group:p},n[t]=E):(E.id=h.id,E.object=h,E.geometry=m,E.material=x,E.materialVariant=a(h),E.groupOrder=S,E.renderOrder=h.renderOrder,E.z=g,E.group=p),t++,E}function c(h,m,x,S,g,p){const E=o(h,m,x,S,g,p);x.transmission>0?i.push(E):x.transparent===!0?s.push(E):e.push(E)}function l(h,m,x,S,g,p){const E=o(h,m,x,S,g,p);x.transmission>0?i.unshift(E):x.transparent===!0?s.unshift(E):e.unshift(E)}function u(h,m){e.length>1&&e.sort(h||y_),i.length>1&&i.sort(m||hc),s.length>1&&s.sort(m||hc)}function f(){for(let h=t,m=n.length;h<m;h++){const x=n[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function E_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new uc,n.set(i,[a])):s>=r.length?(a=new uc,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function b_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Kt};break;case"SpotLight":e={position:new F,direction:new F,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function T_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let A_=0;function w_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function R_(n){const t=new b_,e=T_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);const s=new F,r=new ve,a=new ve;function o(l){let u=0,f=0,h=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let m=0,x=0,S=0,g=0,p=0,E=0,b=0,A=0,L=0,T=0,P=0;l.sort(w_);for(let R=0,B=l.length;R<B;R++){const I=l[R],H=I.color,q=I.intensity,j=I.distance;let O=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ti?O=I.shadow.map.texture:O=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=H.r*q,f+=H.g*q,h+=H.b*q;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],q);P++}else if(I.isDirectionalLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const X=I.shadow,et=e.get(I);et.shadowIntensity=X.intensity,et.shadowBias=X.bias,et.shadowNormalBias=X.normalBias,et.shadowRadius=X.radius,et.shadowMapSize=X.mapSize,i.directionalShadow[m]=et,i.directionalShadowMap[m]=O,i.directionalShadowMatrix[m]=I.shadow.matrix,E++}i.directional[m]=W,m++}else if(I.isSpotLight){const W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(H).multiplyScalar(q),W.distance=j,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[S]=W;const X=I.shadow;if(I.map&&(i.spotLightMap[L]=I.map,L++,X.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[S]=X.matrix,I.castShadow){const et=e.get(I);et.shadowIntensity=X.intensity,et.shadowBias=X.bias,et.shadowNormalBias=X.normalBias,et.shadowRadius=X.radius,et.shadowMapSize=X.mapSize,i.spotShadow[S]=et,i.spotShadowMap[S]=O,A++}S++}else if(I.isRectAreaLight){const W=t.get(I);W.color.copy(H).multiplyScalar(q),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=W,g++}else if(I.isPointLight){const W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){const X=I.shadow,et=e.get(I);et.shadowIntensity=X.intensity,et.shadowBias=X.bias,et.shadowNormalBias=X.normalBias,et.shadowRadius=X.radius,et.shadowMapSize=X.mapSize,et.shadowCameraNear=X.camera.near,et.shadowCameraFar=X.camera.far,i.pointShadow[x]=et,i.pointShadowMap[x]=O,i.pointShadowMatrix[x]=I.shadow.matrix,b++}i.point[x]=W,x++}else if(I.isHemisphereLight){const W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(q),W.groundColor.copy(I.groundColor).multiplyScalar(q),i.hemi[p]=W,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const M=i.hash;(M.directionalLength!==m||M.pointLength!==x||M.spotLength!==S||M.rectAreaLength!==g||M.hemiLength!==p||M.numDirectionalShadows!==E||M.numPointShadows!==b||M.numSpotShadows!==A||M.numSpotMaps!==L||M.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=S,i.rectArea.length=g,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=A+L-T,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,M.directionalLength=m,M.pointLength=x,M.spotLength=S,M.rectAreaLength=g,M.hemiLength=p,M.numDirectionalShadows=E,M.numPointShadows=b,M.numSpotShadows=A,M.numSpotMaps=L,M.numLightProbes=P,i.version=A_++)}function c(l,u){let f=0,h=0,m=0,x=0,S=0;const g=u.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){const b=l[p];if(b.isDirectionalLight){const A=i.directional[f];A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),f++}else if(b.isSpotLight){const A=i.spot[m];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),m++}else if(b.isRectAreaLight){const A=i.rectArea[x];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const A=i.point[h];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(g),h++}else if(b.isHemisphereLight){const A=i.hemi[S];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(g),S++}}}return{setup:o,setupView:c,state:i}}function dc(n){const t=new R_(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function C_(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new dc(n),t.set(s,[o])):r>=a.length?(o=new dc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P_=`uniform sampler2D shadow_pass;
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
}`,L_=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],D_=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],fc=new ve,cs=new F,ua=new F;function U_(n,t,e){let i=new Lo;const s=new zt,r=new zt,a=new xe,o=new Hd,c=new Vd,l={},u=e.maxTextureSize,f={[ri]:He,[He]:ri,[Ln]:Ln},h=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:I_,fragmentShader:P_}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const x=new nn;x.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new En(x,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sr;let p=this.type;this.render=function(T,P,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Ru&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=sr);const R=n.getRenderTarget(),B=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Fn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const q=p!==this.type;q&&P.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(O=>O.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,O=T.length;j<O;j++){const W=T[j],X=W.shadow;if(X===void 0){Ct("WebGLShadowMap:",W,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const et=X.getFrameExtents();s.multiply(et),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/et.x),s.x=r.x*et.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/et.y),s.y=r.y*et.y,X.mapSize.y=r.y));const nt=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=nt,X.map===null||q===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===us){if(W.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new vn(s.x,s.y,{format:Ti,type:kn,minFilter:Oe,magFilter:Oe,generateMipmaps:!1}),X.map.texture.name=W.name+".shadowMap",X.map.depthTexture=new Ki(s.x,s.y,mn),X.map.depthTexture.name=W.name+".shadowMapDepth",X.map.depthTexture.format=zn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Le,X.map.depthTexture.magFilter=Le}else W.isPointLight?(X.map=new xh(s.x),X.map.depthTexture=new Ud(s.x,yn)):(X.map=new vn(s.x,s.y),X.map.depthTexture=new Ki(s.x,s.y,yn)),X.map.depthTexture.name=W.name+".shadowMap",X.map.depthTexture.format=zn,this.type===sr?(X.map.depthTexture.compareFunction=nt?Co:Ro,X.map.depthTexture.minFilter=Oe,X.map.depthTexture.magFilter=Oe):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Le,X.map.depthTexture.magFilter=Le);X.camera.updateProjectionMatrix()}const ft=X.map.isWebGLCubeRenderTarget?6:1;for(let yt=0;yt<ft;yt++){if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,yt),n.clear();else{yt===0&&(n.setRenderTarget(X.map),n.clear());const wt=X.getViewport(yt);a.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),H.viewport(a)}if(W.isPointLight){const wt=X.camera,Zt=X.matrix,ie=W.distance||wt.far;ie!==wt.far&&(wt.far=ie,wt.updateProjectionMatrix()),cs.setFromMatrixPosition(W.matrixWorld),wt.position.copy(cs),ua.copy(wt.position),ua.add(L_[yt]),wt.up.copy(D_[yt]),wt.lookAt(ua),wt.updateMatrixWorld(),Zt.makeTranslation(-cs.x,-cs.y,-cs.z),fc.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(fc,wt.coordinateSystem,wt.reversedDepth)}else X.updateMatrices(W);i=X.getFrustum(),A(P,M,X.camera,W,this.type)}X.isPointLightShadow!==!0&&this.type===us&&E(X,M),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(R,B,I)};function E(T,P){const M=t.update(S);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new vn(s.x,s.y,{format:Ti,type:kn})),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,M,h,S,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,M,m,S,null)}function b(T,P,M,R){let B=null;const I=M.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)B=I;else if(B=M.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const H=B.uuid,q=P.uuid;let j=l[H];j===void 0&&(j={},l[H]=j);let O=j[q];O===void 0&&(O=B.clone(),j[q]=O,P.addEventListener("dispose",L)),B=O}if(B.visible=P.visible,B.wireframe=P.wireframe,R===us?B.side=P.shadowSide!==null?P.shadowSide:P.side:B.side=P.shadowSide!==null?P.shadowSide:f[P.side],B.alphaMap=P.alphaMap,B.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,B.map=P.map,B.clipShadows=P.clipShadows,B.clippingPlanes=P.clippingPlanes,B.clipIntersection=P.clipIntersection,B.displacementMap=P.displacementMap,B.displacementScale=P.displacementScale,B.displacementBias=P.displacementBias,B.wireframeLinewidth=P.wireframeLinewidth,B.linewidth=P.linewidth,M.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const H=n.properties.get(B);H.light=M}return B}function A(T,P,M,R,B){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&B===us)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,T.matrixWorld);const q=t.update(T),j=T.material;if(Array.isArray(j)){const O=q.groups;for(let W=0,X=O.length;W<X;W++){const et=O[W],nt=j[et.materialIndex];if(nt&&nt.visible){const ft=b(T,nt,R,B);T.onBeforeShadow(n,T,P,M,q,ft,et),n.renderBufferDirect(M,null,q,ft,T,et),T.onAfterShadow(n,T,P,M,q,ft,et)}}}else if(j.visible){const O=b(T,j,R,B);T.onBeforeShadow(n,T,P,M,q,O,null),n.renderBufferDirect(M,null,q,O,T,null),T.onAfterShadow(n,T,P,M,q,O,null)}}const H=T.children;for(let q=0,j=H.length;q<j;q++)A(H[q],P,M,R,B)}function L(T){T.target.removeEventListener("dispose",L);for(const M in l){const R=l[M],B=T.target.uuid;B in R&&(R[B].dispose(),delete R[B])}}}function N_(n,t){function e(){let C=!1;const rt=new xe;let $=null;const xt=new xe(0,0,0,0);return{setMask:function(ct){$!==ct&&!C&&(n.colorMask(ct,ct,ct,ct),$=ct)},setLocked:function(ct){C=ct},setClear:function(ct,Q,bt,Bt,Me){Me===!0&&(ct*=Bt,Q*=Bt,bt*=Bt),rt.set(ct,Q,bt,Bt),xt.equals(rt)===!1&&(n.clearColor(ct,Q,bt,Bt),xt.copy(rt))},reset:function(){C=!1,$=null,xt.set(-1,0,0,0)}}}function i(){let C=!1,rt=!1,$=null,xt=null,ct=null;return{setReversed:function(Q){if(rt!==Q){const bt=t.get("EXT_clip_control");Q?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),rt=Q;const Bt=ct;ct=null,this.setClear(Bt)}},getReversed:function(){return rt},setTest:function(Q){Q?ot(n.DEPTH_TEST):It(n.DEPTH_TEST)},setMask:function(Q){$!==Q&&!C&&(n.depthMask(Q),$=Q)},setFunc:function(Q){if(rt&&(Q=od[Q]),xt!==Q){switch(Q){case va:n.depthFunc(n.NEVER);break;case Ma:n.depthFunc(n.ALWAYS);break;case Sa:n.depthFunc(n.LESS);break;case $i:n.depthFunc(n.LEQUAL);break;case ya:n.depthFunc(n.EQUAL);break;case Ea:n.depthFunc(n.GEQUAL);break;case ba:n.depthFunc(n.GREATER);break;case Ta:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xt=Q}},setLocked:function(Q){C=Q},setClear:function(Q){ct!==Q&&(ct=Q,rt&&(Q=1-Q),n.clearDepth(Q))},reset:function(){C=!1,$=null,xt=null,ct=null,rt=!1}}}function s(){let C=!1,rt=null,$=null,xt=null,ct=null,Q=null,bt=null,Bt=null,Me=null;return{setTest:function(re){C||(re?ot(n.STENCIL_TEST):It(n.STENCIL_TEST))},setMask:function(re){rt!==re&&!C&&(n.stencilMask(re),rt=re)},setFunc:function(re,Tn,cn){($!==re||xt!==Tn||ct!==cn)&&(n.stencilFunc(re,Tn,cn),$=re,xt=Tn,ct=cn)},setOp:function(re,Tn,cn){(Q!==re||bt!==Tn||Bt!==cn)&&(n.stencilOp(re,Tn,cn),Q=re,bt=Tn,Bt=cn)},setLocked:function(re){C=re},setClear:function(re){Me!==re&&(n.clearStencil(re),Me=re)},reset:function(){C=!1,rt=null,$=null,xt=null,ct=null,Q=null,bt=null,Bt=null,Me=null}}}const r=new e,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h={},m=new WeakMap,x=[],S=null,g=!1,p=null,E=null,b=null,A=null,L=null,T=null,P=null,M=new Kt(0,0,0),R=0,B=!1,I=null,H=null,q=null,j=null,O=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,et=0;const nt=n.getParameter(n.VERSION);nt.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(nt)[1]),X=et>=1):nt.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),X=et>=2);let ft=null,yt={};const wt=n.getParameter(n.SCISSOR_BOX),Zt=n.getParameter(n.VIEWPORT),ie=new xe().fromArray(wt),Gt=new xe().fromArray(Zt);function J(C,rt,$,xt){const ct=new Uint8Array(4),Q=n.createTexture();n.bindTexture(C,Q),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let bt=0;bt<$;bt++)C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?n.texImage3D(rt,0,n.RGBA,1,1,xt,0,n.RGBA,n.UNSIGNED_BYTE,ct):n.texImage2D(rt+bt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ct);return Q}const gt={};gt[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),gt[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),gt[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(n.DEPTH_TEST),a.setFunc($i),be(!1),pe(cl),ot(n.CULL_FACE),de(Fn);function ot(C){u[C]!==!0&&(n.enable(C),u[C]=!0)}function It(C){u[C]!==!1&&(n.disable(C),u[C]=!1)}function Ft(C,rt){return h[C]!==rt?(n.bindFramebuffer(C,rt),h[C]=rt,C===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=rt),C===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=rt),!0):!1}function Pt(C,rt){let $=x,xt=!1;if(C){$=m.get(rt),$===void 0&&($=[],m.set(rt,$));const ct=C.textures;if($.length!==ct.length||$[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,bt=ct.length;Q<bt;Q++)$[Q]=n.COLOR_ATTACHMENT0+Q;$.length=ct.length,xt=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,xt=!0);xt&&n.drawBuffers($)}function fe(C){return S!==C?(n.useProgram(C),S=C,!0):!1}const qt={[mi]:n.FUNC_ADD,[Iu]:n.FUNC_SUBTRACT,[Pu]:n.FUNC_REVERSE_SUBTRACT};qt[Lu]=n.MIN,qt[Du]=n.MAX;const se={[Uu]:n.ZERO,[Nu]:n.ONE,[Fu]:n.SRC_COLOR,[_a]:n.SRC_ALPHA,[Hu]:n.SRC_ALPHA_SATURATE,[zu]:n.DST_COLOR,[Bu]:n.DST_ALPHA,[Ou]:n.ONE_MINUS_SRC_COLOR,[xa]:n.ONE_MINUS_SRC_ALPHA,[Gu]:n.ONE_MINUS_DST_COLOR,[ku]:n.ONE_MINUS_DST_ALPHA,[Vu]:n.CONSTANT_COLOR,[Wu]:n.ONE_MINUS_CONSTANT_COLOR,[Xu]:n.CONSTANT_ALPHA,[Yu]:n.ONE_MINUS_CONSTANT_ALPHA};function de(C,rt,$,xt,ct,Q,bt,Bt,Me,re){if(C===Fn){g===!0&&(It(n.BLEND),g=!1);return}if(g===!1&&(ot(n.BLEND),g=!0),C!==Cu){if(C!==p||re!==B){if((E!==mi||L!==mi)&&(n.blendEquation(n.FUNC_ADD),E=mi,L=mi),re)switch(C){case Xi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFunc(n.ONE,n.ONE);break;case ul:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case dl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qt("WebGLState: Invalid blending: ",C);break}else switch(C){case Xi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ul:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dl:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",C);break}b=null,A=null,T=null,P=null,M.set(0,0,0),R=0,p=C,B=re}return}ct=ct||rt,Q=Q||$,bt=bt||xt,(rt!==E||ct!==L)&&(n.blendEquationSeparate(qt[rt],qt[ct]),E=rt,L=ct),($!==b||xt!==A||Q!==T||bt!==P)&&(n.blendFuncSeparate(se[$],se[xt],se[Q],se[bt]),b=$,A=xt,T=Q,P=bt),(Bt.equals(M)===!1||Me!==R)&&(n.blendColor(Bt.r,Bt.g,Bt.b,Me),M.copy(Bt),R=Me),p=C,B=!1}function Xt(C,rt){C.side===Ln?It(n.CULL_FACE):ot(n.CULL_FACE);let $=C.side===He;rt&&($=!$),be($),C.blending===Xi&&C.transparent===!1?de(Fn):de(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const xt=C.stencilWrite;o.setTest(xt),xt&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),D(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ot(n.SAMPLE_ALPHA_TO_COVERAGE):It(n.SAMPLE_ALPHA_TO_COVERAGE)}function be(C){I!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),I=C)}function pe(C){C!==Au?(ot(n.CULL_FACE),C!==H&&(C===cl?n.cullFace(n.BACK):C===wu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):It(n.CULL_FACE),H=C}function We(C){C!==q&&(X&&n.lineWidth(C),q=C)}function D(C,rt,$){C?(ot(n.POLYGON_OFFSET_FILL),(j!==rt||O!==$)&&(j=rt,O=$,a.getReversed()&&(rt=-rt),n.polygonOffset(rt,$))):It(n.POLYGON_OFFSET_FILL)}function Te(C){C?ot(n.SCISSOR_TEST):It(n.SCISSOR_TEST)}function $t(C){C===void 0&&(C=n.TEXTURE0+W-1),ft!==C&&(n.activeTexture(C),ft=C)}function he(C,rt,$){$===void 0&&(ft===null?$=n.TEXTURE0+W-1:$=ft);let xt=yt[$];xt===void 0&&(xt={type:void 0,texture:void 0},yt[$]=xt),(xt.type!==C||xt.texture!==rt)&&(ft!==$&&(n.activeTexture($),ft=$),n.bindTexture(C,rt||gt[C]),xt.type=C,xt.texture=rt)}function ut(){const C=yt[ft];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function me(){try{n.compressedTexImage2D(...arguments)}catch(C){Qt("WebGLState:",C)}}function y(){try{n.compressedTexImage3D(...arguments)}catch(C){Qt("WebGLState:",C)}}function _(){try{n.texSubImage2D(...arguments)}catch(C){Qt("WebGLState:",C)}}function k(){try{n.texSubImage3D(...arguments)}catch(C){Qt("WebGLState:",C)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(C){Qt("WebGLState:",C)}}function tt(){try{n.compressedTexSubImage3D(...arguments)}catch(C){Qt("WebGLState:",C)}}function it(){try{n.texStorage2D(...arguments)}catch(C){Qt("WebGLState:",C)}}function ht(){try{n.texStorage3D(...arguments)}catch(C){Qt("WebGLState:",C)}}function Y(){try{n.texImage2D(...arguments)}catch(C){Qt("WebGLState:",C)}}function Z(){try{n.texImage3D(...arguments)}catch(C){Qt("WebGLState:",C)}}function _t(C){return f[C]!==void 0?f[C]:n.getParameter(C)}function Mt(C,rt){f[C]!==rt&&(n.pixelStorei(C,rt),f[C]=rt)}function lt(C){ie.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),ie.copy(C))}function st(C){Gt.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),Gt.copy(C))}function Dt(C,rt){let $=l.get(rt);$===void 0&&($=new WeakMap,l.set(rt,$));let xt=$.get(C);xt===void 0&&(xt=n.getUniformBlockIndex(rt,C.name),$.set(C,xt))}function Ht(C,rt){const xt=l.get(rt).get(C);c.get(rt)!==xt&&(n.uniformBlockBinding(rt,xt,C.__bindingPointIndex),c.set(rt,xt))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},ft=null,yt={},h={},m=new WeakMap,x=[],S=null,g=!1,p=null,E=null,b=null,A=null,L=null,T=null,P=null,M=new Kt(0,0,0),R=0,B=!1,I=null,H=null,q=null,j=null,O=null,ie.set(0,0,n.canvas.width,n.canvas.height),Gt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:It,bindFramebuffer:Ft,drawBuffers:Pt,useProgram:fe,setBlending:de,setMaterial:Xt,setFlipSided:be,setCullFace:pe,setLineWidth:We,setPolygonOffset:D,setScissorTest:Te,activeTexture:$t,bindTexture:he,unbindTexture:ut,compressedTexImage2D:me,compressedTexImage3D:y,texImage2D:Y,texImage3D:Z,pixelStorei:Mt,getParameter:_t,updateUBOMapping:Dt,uniformBlockBinding:Ht,texStorage2D:it,texStorage3D:ht,texSubImage2D:_,texSubImage3D:k,compressedTexSubImage2D:K,compressedTexSubImage3D:tt,scissor:lt,viewport:st,reset:te}}function F_(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new zt,u=new WeakMap,f=new Set;let h;const m=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(y,_){return x?new OffscreenCanvas(y,_):mr("canvas")}function g(y,_,k){let K=1;const tt=me(y);if((tt.width>k||tt.height>k)&&(K=k/Math.max(tt.width,tt.height)),K<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const it=Math.floor(K*tt.width),ht=Math.floor(K*tt.height);h===void 0&&(h=S(it,ht));const Y=_?S(it,ht):h;return Y.width=it,Y.height=ht,Y.getContext("2d").drawImage(y,0,0,it,ht),Ct("WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+it+"x"+ht+")."),Y}else return"data"in y&&Ct("WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),y;return y}function p(y){return y.generateMipmaps}function E(y){n.generateMipmap(y)}function b(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(y,_,k,K,tt,it=!1){if(y!==null){if(n[y]!==void 0)return n[y];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let ht;K&&(ht=t.get("EXT_texture_norm16"),ht||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===n.RED&&(k===n.FLOAT&&(Y=n.R32F),k===n.HALF_FLOAT&&(Y=n.R16F),k===n.UNSIGNED_BYTE&&(Y=n.R8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.R16_EXT),k===n.SHORT&&ht&&(Y=ht.R16_SNORM_EXT)),_===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.R8UI),k===n.UNSIGNED_SHORT&&(Y=n.R16UI),k===n.UNSIGNED_INT&&(Y=n.R32UI),k===n.BYTE&&(Y=n.R8I),k===n.SHORT&&(Y=n.R16I),k===n.INT&&(Y=n.R32I)),_===n.RG&&(k===n.FLOAT&&(Y=n.RG32F),k===n.HALF_FLOAT&&(Y=n.RG16F),k===n.UNSIGNED_BYTE&&(Y=n.RG8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RG16_EXT),k===n.SHORT&&ht&&(Y=ht.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RG8UI),k===n.UNSIGNED_SHORT&&(Y=n.RG16UI),k===n.UNSIGNED_INT&&(Y=n.RG32UI),k===n.BYTE&&(Y=n.RG8I),k===n.SHORT&&(Y=n.RG16I),k===n.INT&&(Y=n.RG32I)),_===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),k===n.UNSIGNED_INT&&(Y=n.RGB32UI),k===n.BYTE&&(Y=n.RGB8I),k===n.SHORT&&(Y=n.RGB16I),k===n.INT&&(Y=n.RGB32I)),_===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),k===n.UNSIGNED_INT&&(Y=n.RGBA32UI),k===n.BYTE&&(Y=n.RGBA8I),k===n.SHORT&&(Y=n.RGBA16I),k===n.INT&&(Y=n.RGBA32I)),_===n.RGB&&(k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGB16_EXT),k===n.SHORT&&ht&&(Y=ht.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),_===n.RGBA){const Z=it?pr:jt.getTransfer(tt);k===n.FLOAT&&(Y=n.RGBA32F),k===n.HALF_FLOAT&&(Y=n.RGBA16F),k===n.UNSIGNED_BYTE&&(Y=Z===ne?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&ht&&(Y=ht.RGBA16_EXT),k===n.SHORT&&ht&&(Y=ht.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function L(y,_){let k;return y?_===null||_===yn||_===_s?k=n.DEPTH24_STENCIL8:_===mn?k=n.DEPTH32F_STENCIL8:_===gs&&(k=n.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===yn||_===_s?k=n.DEPTH_COMPONENT24:_===mn?k=n.DEPTH_COMPONENT32F:_===gs&&(k=n.DEPTH_COMPONENT16),k}function T(y,_){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==Le&&y.minFilter!==Oe?Math.log2(Math.max(_.width,_.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?_.mipmaps.length:1}function P(y){const _=y.target;_.removeEventListener("dispose",P),R(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function M(y){const _=y.target;_.removeEventListener("dispose",M),I(_)}function R(y){const _=i.get(y);if(_.__webglInit===void 0)return;const k=y.source,K=m.get(k);if(K){const tt=K[_.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&B(y),Object.keys(K).length===0&&m.delete(k)}i.remove(y)}function B(y){const _=i.get(y);n.deleteTexture(_.__webglTexture);const k=y.source,K=m.get(k);delete K[_.__cacheKey],a.memory.textures--}function I(y){const _=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(_.__webglFramebuffer[K]))for(let tt=0;tt<_.__webglFramebuffer[K].length;tt++)n.deleteFramebuffer(_.__webglFramebuffer[K][tt]);else n.deleteFramebuffer(_.__webglFramebuffer[K]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[K])}else{if(Array.isArray(_.__webglFramebuffer))for(let K=0;K<_.__webglFramebuffer.length;K++)n.deleteFramebuffer(_.__webglFramebuffer[K]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let K=0;K<_.__webglColorRenderbuffer.length;K++)_.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[K]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=y.textures;for(let K=0,tt=k.length;K<tt;K++){const it=i.get(k[K]);it.__webglTexture&&(n.deleteTexture(it.__webglTexture),a.memory.textures--),i.remove(k[K])}i.remove(y)}let H=0;function q(){H=0}function j(){return H}function O(y){H=y}function W(){const y=H;return y>=s.maxTextures&&Ct("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),H+=1,y}function X(y){const _=[];return _.push(y.wrapS),_.push(y.wrapT),_.push(y.wrapR||0),_.push(y.magFilter),_.push(y.minFilter),_.push(y.anisotropy),_.push(y.internalFormat),_.push(y.format),_.push(y.type),_.push(y.generateMipmaps),_.push(y.premultiplyAlpha),_.push(y.flipY),_.push(y.unpackAlignment),_.push(y.colorSpace),_.join()}function et(y,_){const k=i.get(y);if(y.isVideoTexture&&he(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&k.__version!==y.version){const K=y.image;if(K===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{It(k,y,_);return}}else y.isExternalTexture&&(k.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+_)}function nt(y,_){const k=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&k.__version!==y.version){It(k,y,_);return}else y.isExternalTexture&&(k.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+_)}function ft(y,_){const k=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&k.__version!==y.version){It(k,y,_);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+_)}function yt(y,_){const k=i.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&k.__version!==y.version){Ft(k,y,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+_)}const wt={[Aa]:n.REPEAT,[Dn]:n.CLAMP_TO_EDGE,[wa]:n.MIRRORED_REPEAT},Zt={[Le]:n.NEAREST,[ju]:n.NEAREST_MIPMAP_NEAREST,[Cs]:n.NEAREST_MIPMAP_LINEAR,[Oe]:n.LINEAR,[Dr]:n.LINEAR_MIPMAP_NEAREST,[_i]:n.LINEAR_MIPMAP_LINEAR},ie={[Ju]:n.NEVER,[id]:n.ALWAYS,[Qu]:n.LESS,[Ro]:n.LEQUAL,[td]:n.EQUAL,[Co]:n.GEQUAL,[ed]:n.GREATER,[nd]:n.NOTEQUAL};function Gt(y,_){if(_.type===mn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Oe||_.magFilter===Dr||_.magFilter===Cs||_.magFilter===_i||_.minFilter===Oe||_.minFilter===Dr||_.minFilter===Cs||_.minFilter===_i)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,wt[_.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,wt[_.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,wt[_.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,Zt[_.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,Zt[_.minFilter]),_.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,ie[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Le||_.minFilter!==Cs&&_.minFilter!==_i||_.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(y,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function J(y,_){let k=!1;y.__webglInit===void 0&&(y.__webglInit=!0,_.addEventListener("dispose",P));const K=_.source;let tt=m.get(K);tt===void 0&&(tt={},m.set(K,tt));const it=X(_);if(it!==y.__cacheKey){tt[it]===void 0&&(tt[it]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),tt[it].usedTimes++;const ht=tt[y.__cacheKey];ht!==void 0&&(tt[y.__cacheKey].usedTimes--,ht.usedTimes===0&&B(_)),y.__cacheKey=it,y.__webglTexture=tt[it].texture}return k}function gt(y,_,k){return Math.floor(Math.floor(y/k)/_)}function ot(y,_,k,K){const it=y.updateRanges;if(it.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,k,K,_.data);else{it.sort((Mt,lt)=>Mt.start-lt.start);let ht=0;for(let Mt=1;Mt<it.length;Mt++){const lt=it[ht],st=it[Mt],Dt=lt.start+lt.count,Ht=gt(st.start,_.width,4),te=gt(lt.start,_.width,4);st.start<=Dt+1&&Ht===te&&gt(st.start+st.count-1,_.width,4)===Ht?lt.count=Math.max(lt.count,st.start+st.count-lt.start):(++ht,it[ht]=st)}it.length=ht+1;const Y=e.getParameter(n.UNPACK_ROW_LENGTH),Z=e.getParameter(n.UNPACK_SKIP_PIXELS),_t=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Mt=0,lt=it.length;Mt<lt;Mt++){const st=it[Mt],Dt=Math.floor(st.start/4),Ht=Math.ceil(st.count/4),te=Dt%_.width,C=Math.floor(Dt/_.width),rt=Ht,$=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,te),e.pixelStorei(n.UNPACK_SKIP_ROWS,C),e.texSubImage2D(n.TEXTURE_2D,0,te,C,rt,$,k,K,_.data)}y.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Y),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(n.UNPACK_SKIP_ROWS,_t)}}function It(y,_,k){let K=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(K=n.TEXTURE_3D);const tt=J(y,_),it=_.source;e.bindTexture(K,y.__webglTexture,n.TEXTURE0+k);const ht=i.get(it);if(it.version!==ht.__version||tt===!0){if(e.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const $=jt.getPrimaries(jt.workingColorSpace),xt=_.colorSpace===Qn?null:jt.getPrimaries(_.colorSpace),ct=_.colorSpace===Qn||$===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=g(_.image,!1,s.maxTextureSize);Z=ut(_,Z);const _t=r.convert(_.format,_.colorSpace),Mt=r.convert(_.type);let lt=A(_.internalFormat,_t,Mt,_.normalized,_.colorSpace,_.isVideoTexture);Gt(K,_);let st;const Dt=_.mipmaps,Ht=_.isVideoTexture!==!0,te=ht.__version===void 0||tt===!0,C=it.dataReady,rt=T(_,Z);if(_.isDepthTexture)lt=L(_.format===xi,_.type),te&&(Ht?e.texStorage2D(n.TEXTURE_2D,1,lt,Z.width,Z.height):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,_t,Mt,null));else if(_.isDataTexture)if(Dt.length>0){Ht&&te&&e.texStorage2D(n.TEXTURE_2D,rt,lt,Dt[0].width,Dt[0].height);for(let $=0,xt=Dt.length;$<xt;$++)st=Dt[$],Ht?C&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,st.width,st.height,_t,Mt,st.data):e.texImage2D(n.TEXTURE_2D,$,lt,st.width,st.height,0,_t,Mt,st.data);_.generateMipmaps=!1}else Ht?(te&&e.texStorage2D(n.TEXTURE_2D,rt,lt,Z.width,Z.height),C&&ot(_,Z,_t,Mt)):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,_t,Mt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ht&&te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,lt,Dt[0].width,Dt[0].height,Z.depth);for(let $=0,xt=Dt.length;$<xt;$++)if(st=Dt[$],_.format!==ln)if(_t!==null)if(Ht){if(C)if(_.layerUpdates.size>0){const ct=Wl(st.width,st.height,_.format,_.type);for(const Q of _.layerUpdates){const bt=st.data.subarray(Q*ct/st.data.BYTES_PER_ELEMENT,(Q+1)*ct/st.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,Q,st.width,st.height,1,_t,bt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,st.width,st.height,Z.depth,_t,st.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,lt,st.width,st.height,Z.depth,0,st.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?C&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,st.width,st.height,Z.depth,_t,Mt,st.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,lt,st.width,st.height,Z.depth,0,_t,Mt,st.data)}else{Ht&&te&&e.texStorage2D(n.TEXTURE_2D,rt,lt,Dt[0].width,Dt[0].height);for(let $=0,xt=Dt.length;$<xt;$++)st=Dt[$],_.format!==ln?_t!==null?Ht?C&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,st.width,st.height,_t,st.data):e.compressedTexImage2D(n.TEXTURE_2D,$,lt,st.width,st.height,0,st.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?C&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,st.width,st.height,_t,Mt,st.data):e.texImage2D(n.TEXTURE_2D,$,lt,st.width,st.height,0,_t,Mt,st.data)}else if(_.isDataArrayTexture)if(Ht){if(te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,lt,Z.width,Z.height,Z.depth),C)if(_.layerUpdates.size>0){const $=Wl(Z.width,Z.height,_.format,_.type);for(const xt of _.layerUpdates){const ct=Z.data.subarray(xt*$/Z.data.BYTES_PER_ELEMENT,(xt+1)*$/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xt,Z.width,Z.height,1,_t,Mt,ct)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,_t,Mt,Z.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,lt,Z.width,Z.height,Z.depth,0,_t,Mt,Z.data);else if(_.isData3DTexture)Ht?(te&&e.texStorage3D(n.TEXTURE_3D,rt,lt,Z.width,Z.height,Z.depth),C&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,_t,Mt,Z.data)):e.texImage3D(n.TEXTURE_3D,0,lt,Z.width,Z.height,Z.depth,0,_t,Mt,Z.data);else if(_.isFramebufferTexture){if(te)if(Ht)e.texStorage2D(n.TEXTURE_2D,rt,lt,Z.width,Z.height);else{let $=Z.width,xt=Z.height;for(let ct=0;ct<rt;ct++)e.texImage2D(n.TEXTURE_2D,ct,lt,$,xt,0,_t,Mt,null),$>>=1,xt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Z.parentNode!==$){$.appendChild(Z),f.add(_),$.onpaint=Bt=>{const Me=Bt.changedElements;for(const re of f)Me.includes(re.image)&&(re.needsUpdate=!0)},$.requestPaint();return}const xt=0,ct=n.RGBA,Q=n.RGBA,bt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,xt,ct,Q,bt,Z),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Ht&&te){const $=me(Dt[0]);e.texStorage2D(n.TEXTURE_2D,rt,lt,$.width,$.height)}for(let $=0,xt=Dt.length;$<xt;$++)st=Dt[$],Ht?C&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,_t,Mt,st):e.texImage2D(n.TEXTURE_2D,$,lt,_t,Mt,st);_.generateMipmaps=!1}else if(Ht){if(te){const $=me(Z);e.texStorage2D(n.TEXTURE_2D,rt,lt,$.width,$.height)}C&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Mt,Z)}else e.texImage2D(n.TEXTURE_2D,0,lt,_t,Mt,Z);p(_)&&E(K),ht.__version=it.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function Ft(y,_,k){if(_.image.length!==6)return;const K=J(y,_),tt=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+k);const it=i.get(tt);if(tt.version!==it.__version||K===!0){e.activeTexture(n.TEXTURE0+k);const ht=jt.getPrimaries(jt.workingColorSpace),Y=_.colorSpace===Qn?null:jt.getPrimaries(_.colorSpace),Z=_.colorSpace===Qn||ht===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const _t=_.isCompressedTexture||_.image[0].isCompressedTexture,Mt=_.image[0]&&_.image[0].isDataTexture,lt=[];for(let Q=0;Q<6;Q++)!_t&&!Mt?lt[Q]=g(_.image[Q],!0,s.maxCubemapSize):lt[Q]=Mt?_.image[Q].image:_.image[Q],lt[Q]=ut(_,lt[Q]);const st=lt[0],Dt=r.convert(_.format,_.colorSpace),Ht=r.convert(_.type),te=A(_.internalFormat,Dt,Ht,_.normalized,_.colorSpace),C=_.isVideoTexture!==!0,rt=it.__version===void 0||K===!0,$=tt.dataReady;let xt=T(_,st);Gt(n.TEXTURE_CUBE_MAP,_);let ct;if(_t){C&&rt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,te,st.width,st.height);for(let Q=0;Q<6;Q++){ct=lt[Q].mipmaps;for(let bt=0;bt<ct.length;bt++){const Bt=ct[bt];_.format!==ln?Dt!==null?C?$&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,0,0,Bt.width,Bt.height,Dt,Bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,te,Bt.width,Bt.height,0,Bt.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,0,0,Bt.width,Bt.height,Dt,Ht,Bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,te,Bt.width,Bt.height,0,Dt,Ht,Bt.data)}}}else{if(ct=_.mipmaps,C&&rt){ct.length>0&&xt++;const Q=me(lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,te,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(Mt){C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,lt[Q].width,lt[Q].height,Dt,Ht,lt[Q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,te,lt[Q].width,lt[Q].height,0,Dt,Ht,lt[Q].data);for(let bt=0;bt<ct.length;bt++){const Me=ct[bt].image[Q].image;C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,0,0,Me.width,Me.height,Dt,Ht,Me.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,te,Me.width,Me.height,0,Dt,Ht,Me.data)}}else{C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Dt,Ht,lt[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,te,Dt,Ht,lt[Q]);for(let bt=0;bt<ct.length;bt++){const Bt=ct[bt];C?$&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,0,0,Dt,Ht,Bt.image[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,te,Dt,Ht,Bt.image[Q])}}}p(_)&&E(n.TEXTURE_CUBE_MAP),it.__version=tt.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function Pt(y,_,k,K,tt,it){const ht=r.convert(k.format,k.colorSpace),Y=r.convert(k.type),Z=A(k.internalFormat,ht,Y,k.normalized,k.colorSpace),_t=i.get(_),Mt=i.get(k);if(Mt.__renderTarget=_,!_t.__hasExternalTextures){const lt=Math.max(1,_.width>>it),st=Math.max(1,_.height>>it);tt===n.TEXTURE_3D||tt===n.TEXTURE_2D_ARRAY?e.texImage3D(tt,it,Z,lt,st,_.depth,0,ht,Y,null):e.texImage2D(tt,it,Z,lt,st,0,ht,Y,null)}e.bindFramebuffer(n.FRAMEBUFFER,y),$t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,tt,Mt.__webglTexture,0,Te(_)):(tt===n.TEXTURE_2D||tt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,tt,Mt.__webglTexture,it),e.bindFramebuffer(n.FRAMEBUFFER,null)}function fe(y,_,k){if(n.bindRenderbuffer(n.RENDERBUFFER,y),_.depthBuffer){const K=_.depthTexture,tt=K&&K.isDepthTexture?K.type:null,it=L(_.stencilBuffer,tt),ht=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;$t(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(_),it,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(_),it,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,it,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,y)}else{const K=_.textures;for(let tt=0;tt<K.length;tt++){const it=K[tt],ht=r.convert(it.format,it.colorSpace),Y=r.convert(it.type),Z=A(it.internalFormat,ht,Y,it.normalized,it.colorSpace);$t(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te(_),Z,_.width,_.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te(_),Z,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Z,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function qt(y,_,k){const K=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,y),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=i.get(_.depthTexture);if(tt.__renderTarget=_,(!tt.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),K){if(tt.__webglInit===void 0&&(tt.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),tt.__webglTexture===void 0){tt.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,tt.__webglTexture),Gt(n.TEXTURE_CUBE_MAP,_.depthTexture);const _t=r.convert(_.depthTexture.format),Mt=r.convert(_.depthTexture.type);let lt;_.depthTexture.format===zn?lt=n.DEPTH_COMPONENT24:_.depthTexture.format===xi&&(lt=n.DEPTH24_STENCIL8);for(let st=0;st<6;st++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,lt,_.width,_.height,0,_t,Mt,null)}}else et(_.depthTexture,0);const it=tt.__webglTexture,ht=Te(_),Y=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,Z=_.depthTexture.format===xi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===zn)$t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Y,it,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Z,Y,it,0);else if(_.depthTexture.format===xi)$t(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Y,it,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,Z,Y,it,0);else throw new Error("Unknown depthTexture format")}function se(y){const _=i.get(y),k=y.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==y.depthTexture){const K=y.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),K){const tt=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,K.removeEventListener("dispose",tt)};K.addEventListener("dispose",tt),_.__depthDisposeCallback=tt}_.__boundDepthTexture=K}if(y.depthTexture&&!_.__autoAllocateDepthBuffer)if(k)for(let K=0;K<6;K++)qt(_.__webglFramebuffer[K],y,K);else{const K=y.texture.mipmaps;K&&K.length>0?qt(_.__webglFramebuffer[0],y,0):qt(_.__webglFramebuffer,y,0)}else if(k){_.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[K]),_.__webglDepthbuffer[K]===void 0)_.__webglDepthbuffer[K]=n.createRenderbuffer(),fe(_.__webglDepthbuffer[K],y,!1);else{const tt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=_.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,it)}}else{const K=y.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),fe(_.__webglDepthbuffer,y,!1);else{const tt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,it)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function de(y,_,k){const K=i.get(y);_!==void 0&&Pt(K.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&se(y)}function Xt(y){const _=y.texture,k=i.get(y),K=i.get(_);y.addEventListener("dispose",M);const tt=y.textures,it=y.isWebGLCubeRenderTarget===!0,ht=tt.length>1;if(ht||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=_.version,a.memory.textures++),it){k.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[Y]=[];for(let Z=0;Z<_.mipmaps.length;Z++)k.__webglFramebuffer[Y][Z]=n.createFramebuffer()}else k.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)k.__webglFramebuffer[Y]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ht)for(let Y=0,Z=tt.length;Y<Z;Y++){const _t=i.get(tt[Y]);_t.__webglTexture===void 0&&(_t.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&$t(y)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Y=0;Y<tt.length;Y++){const Z=tt[Y];k.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[Y]);const _t=r.convert(Z.format,Z.colorSpace),Mt=r.convert(Z.type),lt=A(Z.internalFormat,_t,Mt,Z.normalized,Z.colorSpace,y.isXRRenderTarget===!0),st=Te(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,st,lt,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,k.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),fe(k.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(it){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Gt(n.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Pt(k.__webglFramebuffer[Y][Z],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else Pt(k.__webglFramebuffer[Y],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(_)&&E(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){for(let Y=0,Z=tt.length;Y<Z;Y++){const _t=tt[Y],Mt=i.get(_t);let lt=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(lt=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,Mt.__webglTexture),Gt(lt,_t),Pt(k.__webglFramebuffer,y,_t,n.COLOR_ATTACHMENT0+Y,lt,0),p(_t)&&E(lt)}e.unbindTexture()}else{let Y=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(Y=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,K.__webglTexture),Gt(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Pt(k.__webglFramebuffer[Z],y,_,n.COLOR_ATTACHMENT0,Y,Z);else Pt(k.__webglFramebuffer,y,_,n.COLOR_ATTACHMENT0,Y,0);p(_)&&E(Y),e.unbindTexture()}y.depthBuffer&&se(y)}function be(y){const _=y.textures;for(let k=0,K=_.length;k<K;k++){const tt=_[k];if(p(tt)){const it=b(y),ht=i.get(tt).__webglTexture;e.bindTexture(it,ht),E(it),e.unbindTexture()}}}const pe=[],We=[];function D(y){if(y.samples>0){if($t(y)===!1){const _=y.textures,k=y.width,K=y.height;let tt=n.COLOR_BUFFER_BIT;const it=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=i.get(y),Y=_.length>1;if(Y)for(let _t=0;_t<_.length;_t++)e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer);const Z=y.texture.mipmaps;Z&&Z.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let _t=0;_t<_.length;_t++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(tt|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(tt|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ht.__webglColorRenderbuffer[_t]);const Mt=i.get(_[_t]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Mt,0)}n.blitFramebuffer(0,0,k,K,0,0,k,K,tt,n.NEAREST),c===!0&&(pe.length=0,We.length=0,pe.push(n.COLOR_ATTACHMENT0+_t),y.depthBuffer&&y.resolveDepthBuffer===!1&&(pe.push(it),We.push(it),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,We)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,pe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let _t=0;_t<_.length;_t++){e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,ht.__webglColorRenderbuffer[_t]);const Mt=i.get(_[_t]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,Mt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&c){const _=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Te(y){return Math.min(s.maxSamples,y.samples)}function $t(y){const _=i.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function he(y){const _=a.render.frame;u.get(y)!==_&&(u.set(y,_),y.update())}function ut(y,_){const k=y.colorSpace,K=y.format,tt=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||k!==fr&&k!==Qn&&(jt.getTransfer(k)===ne?(K!==ln||tt!==je)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",k)),_}function me(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=q,this.getTextureUnits=j,this.setTextureUnits=O,this.setTexture2D=et,this.setTexture2DArray=nt,this.setTexture3D=ft,this.setTextureCube=yt,this.rebindTextures=de,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=be,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=Pt,this.useMultisampledRTT=$t,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function O_(n,t){function e(i,s=Qn){let r;const a=jt.getTransfer(s);if(i===je)return n.UNSIGNED_BYTE;if(i===Eo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===bo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Kc)return n.BYTE;if(i===Zc)return n.SHORT;if(i===gs)return n.UNSIGNED_SHORT;if(i===yo)return n.INT;if(i===yn)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===kn)return n.HALF_FLOAT;if(i===th)return n.ALPHA;if(i===eh)return n.RGB;if(i===ln)return n.RGBA;if(i===zn)return n.DEPTH_COMPONENT;if(i===xi)return n.DEPTH_STENCIL;if(i===nh)return n.RED;if(i===To)return n.RED_INTEGER;if(i===Ti)return n.RG;if(i===Ao)return n.RG_INTEGER;if(i===wo)return n.RGBA_INTEGER;if(i===rr||i===ar||i===or||i===lr)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ra||i===Ca||i===Ia||i===Pa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ra)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ca)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ia)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===La||i===Da||i===Ua||i===Na||i===Fa||i===ur||i===Oa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===La||i===Da)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ua)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Na)return r.COMPRESSED_R11_EAC;if(i===Fa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ur)return r.COMPRESSED_RG11_EAC;if(i===Oa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ba||i===ka||i===za||i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===Ya||i===qa||i===$a||i===ja||i===Ka||i===Za)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ba)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ka)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===za)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ga)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ha)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Va)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ya)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$a)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ja)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ka)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Za)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ja||i===Qa||i===to)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ja)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===to)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===eo||i===no||i===dr||i===io)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===eo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===no)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===dr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===io)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===_s?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const B_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k_=`
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

}`;class z_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new dh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new bn({vertexShader:B_,fragmentShader:k_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new En(new yr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class G_ extends li{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,m=null,x=null;const S=typeof XRWebGLBinding<"u",g=new z_,p={},E=e.getContextAttributes();let b=null,A=null;const L=[],T=[],P=new zt;let M=null;const R=new on;R.viewport=new xe;const B=new on;B.viewport=new xe;const I=[R,B],H=new $d;let q=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let gt=L[J];return gt===void 0&&(gt=new zr,L[J]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function(J){let gt=L[J];return gt===void 0&&(gt=new zr,L[J]=gt),gt.getGripSpace()},this.getHand=function(J){let gt=L[J];return gt===void 0&&(gt=new zr,L[J]=gt),gt.getHandSpace()};function O(J){const gt=T.indexOf(J.inputSource);if(gt===-1)return;const ot=L[gt];ot!==void 0&&(ot.update(J.inputSource,J.frame,l||a),ot.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",X);for(let J=0;J<L.length;J++){const gt=T[J];gt!==null&&(T[J]=null,L[J].disconnect(gt))}q=null,j=null,g.reset();for(const J in p)delete p[J];t.setRenderTarget(b),m=null,h=null,f=null,s=null,A=null,Gt.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",W),s.addEventListener("inputsourceschange",X),E.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(P),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,It=null,Ft=null;E.depth&&(Ft=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=E.stencil?xi:zn,It=E.stencil?_s:yn);const Pt={colorFormat:e.RGBA8,depthFormat:Ft,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Pt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),A=new vn(h.textureWidth,h.textureHeight,{format:ln,type:je,depthTexture:new Ki(h.textureWidth,h.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ot={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),A=new vn(m.framebufferWidth,m.framebufferHeight,{format:ln,type:je,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Gt.setContext(s),Gt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X(J){for(let gt=0;gt<J.removed.length;gt++){const ot=J.removed[gt],It=T.indexOf(ot);It>=0&&(T[It]=null,L[It].disconnect(ot))}for(let gt=0;gt<J.added.length;gt++){const ot=J.added[gt];let It=T.indexOf(ot);if(It===-1){for(let Pt=0;Pt<L.length;Pt++)if(Pt>=T.length){T.push(ot),It=Pt;break}else if(T[Pt]===null){T[Pt]=ot,It=Pt;break}if(It===-1)break}const Ft=L[It];Ft&&Ft.connect(ot)}}const et=new F,nt=new F;function ft(J,gt,ot){et.setFromMatrixPosition(gt.matrixWorld),nt.setFromMatrixPosition(ot.matrixWorld);const It=et.distanceTo(nt),Ft=gt.projectionMatrix.elements,Pt=ot.projectionMatrix.elements,fe=Ft[14]/(Ft[10]-1),qt=Ft[14]/(Ft[10]+1),se=(Ft[9]+1)/Ft[5],de=(Ft[9]-1)/Ft[5],Xt=(Ft[8]-1)/Ft[0],be=(Pt[8]+1)/Pt[0],pe=fe*Xt,We=fe*be,D=It/(-Xt+be),Te=D*-Xt;if(gt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Te),J.translateZ(D),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ft[10]===-1)J.projectionMatrix.copy(gt.projectionMatrix),J.projectionMatrixInverse.copy(gt.projectionMatrixInverse);else{const $t=fe+D,he=qt+D,ut=pe-Te,me=We+(It-Te),y=se*qt/he*$t,_=de*qt/he*$t;J.projectionMatrix.makePerspective(ut,me,y,_,$t,he),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function yt(J,gt){gt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(gt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let gt=J.near,ot=J.far;g.texture!==null&&(g.depthNear>0&&(gt=g.depthNear),g.depthFar>0&&(ot=g.depthFar)),H.near=B.near=R.near=gt,H.far=B.far=R.far=ot,(q!==H.near||j!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),q=H.near,j=H.far),H.layers.mask=J.layers.mask|6,R.layers.mask=H.layers.mask&-5,B.layers.mask=H.layers.mask&-3;const It=J.parent,Ft=H.cameras;yt(H,It);for(let Pt=0;Pt<Ft.length;Pt++)yt(Ft[Pt],It);Ft.length===2?ft(H,R,B):H.projectionMatrix.copy(R.projectionMatrix),wt(J,H,It)};function wt(J,gt,ot){ot===null?J.matrix.copy(gt.matrixWorld):(J.matrix.copy(ot.matrixWorld),J.matrix.invert(),J.matrix.multiply(gt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(gt.projectionMatrix),J.projectionMatrixInverse.copy(gt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ao*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(J){c=J,h!==null&&(h.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(J){return p[J]};let Zt=null;function ie(J,gt){if(u=gt.getViewerPose(l||a),x=gt,u!==null){const ot=u.views;m!==null&&(t.setRenderTargetFramebuffer(A,m.framebuffer),t.setRenderTarget(A));let It=!1;ot.length!==H.cameras.length&&(H.cameras.length=0,It=!0);for(let qt=0;qt<ot.length;qt++){const se=ot[qt];let de=null;if(m!==null)de=m.getViewport(se);else{const be=f.getViewSubImage(h,se);de=be.viewport,qt===0&&(t.setRenderTargetTextures(A,be.colorTexture,be.depthStencilTexture),t.setRenderTarget(A))}let Xt=I[qt];Xt===void 0&&(Xt=new on,Xt.layers.enable(qt),Xt.viewport=new xe,I[qt]=Xt),Xt.matrix.fromArray(se.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(se.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(de.x,de.y,de.width,de.height),qt===0&&(H.matrix.copy(Xt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),It===!0&&H.cameras.push(Xt)}const Ft=s.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const qt=f.getDepthInformation(ot[0]);qt&&qt.isValid&&qt.texture&&g.init(qt,s.renderState)}if(Ft&&Ft.includes("camera-access")&&S){t.state.unbindTexture(),f=i.getBinding();for(let qt=0;qt<ot.length;qt++){const se=ot[qt].camera;if(se){let de=p[se];de||(de=new dh,p[se]=de);const Xt=f.getCameraImage(se);de.sourceTexture=Xt}}}}for(let ot=0;ot<L.length;ot++){const It=T[ot],Ft=L[ot];It!==null&&Ft!==void 0&&Ft.update(It,gt,l||a)}Zt&&Zt(J,gt),gt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:gt}),x=null}const Gt=new gh;Gt.setAnimationLoop(ie),this.setAnimationLoop=function(J){Zt=J},this.dispose=function(){}}}const H_=new ve,Eh=new Ot;Eh.set(-1,0,0,0,1,0,0,0,1);function V_(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,fh(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,b,A){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&m(g,p,A)):p.isMeshMatcapMaterial?(r(g,p),x(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),S(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,E,b):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===He&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===He&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const E=t.get(p),b=E.envMap,A=E.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(H_.makeRotationFromEuler(A)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Eh),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,E,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=b*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function S(g,p){const E=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function W_(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,b){const A=b.program;i.uniformBlockBinding(E,A)}function l(E,b){let A=s[E.id];A===void 0&&(x(E),A=u(E),s[E.id]=A,E.addEventListener("dispose",g));const L=b.program;i.updateUBOMapping(E,L);const T=t.render.frame;r[E.id]!==T&&(h(E),r[E.id]=T)}function u(E){const b=f();E.__bindingPointIndex=b;const A=n.createBuffer(),L=E.__size,T=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,L,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,A),A}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const b=s[E.id],A=E.uniforms,L=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let T=0,P=A.length;T<P;T++){const M=Array.isArray(A[T])?A[T]:[A[T]];for(let R=0,B=M.length;R<B;R++){const I=M[R];if(m(I,T,R,L)===!0){const H=I.__offset,q=Array.isArray(I.value)?I.value:[I.value];let j=0;for(let O=0;O<q.length;O++){const W=q[O],X=S(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,H+j,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):ArrayBuffer.isView(W)?I.__data.set(new W.constructor(W.buffer,W.byteOffset,I.__data.length)):(W.toArray(I.__data,j),j+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,b,A,L){const T=E.value,P=b+"_"+A;if(L[P]===void 0)return typeof T=="number"||typeof T=="boolean"?L[P]=T:ArrayBuffer.isView(T)?L[P]=T.slice():L[P]=T.clone(),!0;{const M=L[P];if(typeof T=="number"||typeof T=="boolean"){if(M!==T)return L[P]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(M.equals(T)===!1)return M.copy(T),!0}}return!1}function x(E){const b=E.uniforms;let A=0;const L=16;for(let P=0,M=b.length;P<M;P++){const R=Array.isArray(b[P])?b[P]:[b[P]];for(let B=0,I=R.length;B<I;B++){const H=R[B],q=Array.isArray(H.value)?H.value:[H.value];for(let j=0,O=q.length;j<O;j++){const W=q[j],X=S(W),et=A%L,nt=et%X.boundary,ft=et+nt;A+=nt,ft!==0&&L-ft<X.storage&&(A+=L-ft),H.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=A,A+=X.storage}}}const T=A%L;return T>0&&(A+=L-T),E.__size=A,E.__cache={},this}function S(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(b.boundary=16,b.storage=E.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",E),b}function g(E){const b=E.target;b.removeEventListener("dispose",g);const A=a.indexOf(b.__bindingPointIndex);a.splice(A,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}const X_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fn=null;function Y_(){return fn===null&&(fn=new Cd(X_,16,16,Ti,kn),fn.name="DFG_LUT",fn.minFilter=Oe,fn.magFilter=Oe,fn.wrapS=Dn,fn.wrapT=Dn,fn.generateMipmaps=!1,fn.needsUpdate=!0),fn}class q_{constructor(t={}){const{canvas:e=rd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:m=je}=t;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;const S=m,g=new Set([wo,Ao,To]),p=new Set([je,yn,gs,_s,Eo,bo]),E=new Uint32Array(4),b=new Int32Array(4),A=new F;let L=null,T=null;const P=[],M=[];let R=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let I=!1,H=null;this._outputColorSpace=$e;let q=0,j=0,O=null,W=-1,X=null;const et=new xe,nt=new xe;let ft=null;const yt=new Kt(0);let wt=0,Zt=e.width,ie=e.height,Gt=1,J=null,gt=null;const ot=new xe(0,0,Zt,ie),It=new xe(0,0,Zt,ie);let Ft=!1;const Pt=new Lo;let fe=!1,qt=!1;const se=new ve,de=new F,Xt=new xe,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pe=!1;function We(){return O===null?Gt:1}let D=i;function Te(v,U){return e.getContext(v,U)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${So}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",bt,!1),e.addEventListener("webglcontextcreationerror",Bt,!1),D===null){const U="webgl2";if(D=Te(U,v),D===null)throw Te(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw Qt("WebGLRenderer: "+v.message),v}let $t,he,ut,me,y,_,k,K,tt,it,ht,Y,Z,_t,Mt,lt,st,Dt,Ht,te,C,rt,$;function xt(){$t=new Ym(D),$t.init(),C=new O_(D,$t),he=new Bm(D,$t,t,C),ut=new N_(D,$t),he.reversedDepthBuffer&&h&&ut.buffers.depth.setReversed(!0),me=new jm(D),y=new S_,_=new F_(D,$t,ut,y,he,C,me),k=new Xm(B),K=new Jd(D),rt=new Fm(D,K),tt=new qm(D,K,me,rt),it=new Zm(D,tt,K,rt,me),Dt=new Km(D,he,_),Mt=new km(y),ht=new M_(B,k,$t,he,rt,Mt),Y=new V_(B,y),Z=new E_,_t=new C_($t),st=new Nm(B,k,ut,it,x,c),lt=new U_(B,it,he),$=new W_(D,me,he,ut),Ht=new Om(D,$t,me),te=new $m(D,$t,me),me.programs=ht.programs,B.capabilities=he,B.extensions=$t,B.properties=y,B.renderLists=Z,B.shadowMap=lt,B.state=ut,B.info=me}xt(),S!==je&&(R=new Qm(S,e.width,e.height,s,r));const ct=new G_(B,D);this.xr=ct,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const v=$t.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=$t.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Gt},this.setPixelRatio=function(v){v!==void 0&&(Gt=v,this.setSize(Zt,ie,!1))},this.getSize=function(v){return v.set(Zt,ie)},this.setSize=function(v,U,V=!0){if(ct.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}Zt=v,ie=U,e.width=Math.floor(v*Gt),e.height=Math.floor(U*Gt),V===!0&&(e.style.width=v+"px",e.style.height=U+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,v,U)},this.getDrawingBufferSize=function(v){return v.set(Zt*Gt,ie*Gt).floor()},this.setDrawingBufferSize=function(v,U,V){Zt=v,ie=U,Gt=V,e.width=Math.floor(v*V),e.height=Math.floor(U*V),this.setViewport(0,0,v,U)},this.setEffects=function(v){if(S===je){Qt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let U=0;U<v.length;U++)if(v[U].isOutputPass===!0){Ct("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(et)},this.getViewport=function(v){return v.copy(ot)},this.setViewport=function(v,U,V,z){v.isVector4?ot.set(v.x,v.y,v.z,v.w):ot.set(v,U,V,z),ut.viewport(et.copy(ot).multiplyScalar(Gt).round())},this.getScissor=function(v){return v.copy(It)},this.setScissor=function(v,U,V,z){v.isVector4?It.set(v.x,v.y,v.z,v.w):It.set(v,U,V,z),ut.scissor(nt.copy(It).multiplyScalar(Gt).round())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(v){ut.setScissorTest(Ft=v)},this.setOpaqueSort=function(v){J=v},this.setTransparentSort=function(v){gt=v},this.getClearColor=function(v){return v.copy(st.getClearColor())},this.setClearColor=function(){st.setClearColor(...arguments)},this.getClearAlpha=function(){return st.getClearAlpha()},this.setClearAlpha=function(){st.setClearAlpha(...arguments)},this.clear=function(v=!0,U=!0,V=!0){let z=0;if(v){let G=!1;if(O!==null){const mt=O.texture.format;G=g.has(mt)}if(G){const mt=O.texture.type,St=p.has(mt),pt=st.getClearColor(),Et=st.getClearAlpha(),At=pt.r,kt=pt.g,Wt=pt.b;St?(E[0]=At,E[1]=kt,E[2]=Wt,E[3]=Et,D.clearBufferuiv(D.COLOR,0,E)):(b[0]=At,b[1]=kt,b[2]=Wt,b[3]=Et,D.clearBufferiv(D.COLOR,0,b))}else z|=D.COLOR_BUFFER_BIT}U&&(z|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),H=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",bt,!1),e.removeEventListener("webglcontextcreationerror",Bt,!1),st.dispose(),Z.dispose(),_t.dispose(),y.dispose(),k.dispose(),it.dispose(),rt.dispose(),$.dispose(),ht.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Jo),ct.removeEventListener("sessionend",Qo),ci.stop()};function Q(v){v.preventDefault(),_l("WebGLRenderer: Context Lost."),I=!0}function bt(){_l("WebGLRenderer: Context Restored."),I=!1;const v=me.autoReset,U=lt.enabled,V=lt.autoUpdate,z=lt.needsUpdate,G=lt.type;xt(),me.autoReset=v,lt.enabled=U,lt.autoUpdate=V,lt.needsUpdate=z,lt.type=G}function Bt(v){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Me(v){const U=v.target;U.removeEventListener("dispose",Me),re(U)}function re(v){Tn(v),y.remove(v)}function Tn(v){const U=y.get(v).programs;U!==void 0&&(U.forEach(function(V){ht.releaseProgram(V)}),v.isShaderMaterial&&ht.releaseShaderCache(v))}this.renderBufferDirect=function(v,U,V,z,G,mt){U===null&&(U=be);const St=G.isMesh&&G.matrixWorld.determinant()<0,pt=au(v,U,V,z,G);ut.setMaterial(z,St);let Et=V.index,At=1;if(z.wireframe===!0){if(Et=tt.getWireframeAttribute(V),Et===void 0)return;At=2}const kt=V.drawRange,Wt=V.attributes.position;let Rt=kt.start*At,ae=(kt.start+kt.count)*At;mt!==null&&(Rt=Math.max(Rt,mt.start*At),ae=Math.min(ae,(mt.start+mt.count)*At)),Et!==null?(Rt=Math.max(Rt,0),ae=Math.min(ae,Et.count)):Wt!=null&&(Rt=Math.max(Rt,0),ae=Math.min(ae,Wt.count));const Se=ae-Rt;if(Se<0||Se===1/0)return;rt.setup(G,z,pt,V,Et);let ge,le=Ht;if(Et!==null&&(ge=K.get(Et),le=te,le.setIndex(ge)),G.isMesh)z.wireframe===!0?(ut.setLineWidth(z.wireframeLinewidth*We()),le.setMode(D.LINES)):le.setMode(D.TRIANGLES);else if(G.isLine){let Ue=z.linewidth;Ue===void 0&&(Ue=1),ut.setLineWidth(Ue*We()),G.isLineSegments?le.setMode(D.LINES):G.isLineLoop?le.setMode(D.LINE_LOOP):le.setMode(D.LINE_STRIP)}else G.isPoints?le.setMode(D.POINTS):G.isSprite&&le.setMode(D.TRIANGLES);if(G.isBatchedMesh)if($t.get("WEBGL_multi_draw"))le.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ue=G._multiDrawStarts,vt=G._multiDrawCounts,Xe=G._multiDrawCount,Jt=Et?K.get(Et).bytesPerElement:1,Ke=y.get(z).currentProgram.getUniforms();for(let hn=0;hn<Xe;hn++)Ke.setValue(D,"_gl_DrawID",hn),le.render(Ue[hn]/Jt,vt[hn])}else if(G.isInstancedMesh)le.renderInstances(Rt,Se,G.count);else if(V.isInstancedBufferGeometry){const Ue=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,vt=Math.min(V.instanceCount,Ue);le.renderInstances(Rt,Se,vt)}else le.render(Rt,Se)};function cn(v,U,V){v.transparent===!0&&v.side===Ln&&v.forceSinglePass===!1?(v.side=He,v.needsUpdate=!0,ws(v,U,V),v.side=ri,v.needsUpdate=!0,ws(v,U,V),v.side=Ln):ws(v,U,V)}this.compile=function(v,U,V=null){V===null&&(V=v),T=_t.get(V),T.init(U),M.push(T),V.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),v!==V&&v.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights();const z=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const mt=G.material;if(mt)if(Array.isArray(mt))for(let St=0;St<mt.length;St++){const pt=mt[St];cn(pt,V,G),z.add(pt)}else cn(mt,V,G),z.add(mt)}),T=M.pop(),z},this.compileAsync=function(v,U,V=null){const z=this.compile(v,U,V);return new Promise(G=>{function mt(){if(z.forEach(function(St){y.get(St).currentProgram.isReady()&&z.delete(St)}),z.size===0){G(v);return}setTimeout(mt,10)}$t.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Rr=null;function su(v){Rr&&Rr(v)}function Jo(){ci.stop()}function Qo(){ci.start()}const ci=new gh;ci.setAnimationLoop(su),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(v){Rr=v,ct.setAnimationLoop(v),v===null?ci.stop():ci.start()},ct.addEventListener("sessionstart",Jo),ct.addEventListener("sessionend",Qo),this.render=function(v,U){if(U!==void 0&&U.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;H!==null&&H.renderStart(v,U);const V=ct.enabled===!0&&ct.isPresenting===!0,z=R!==null&&(O===null||V)&&R.begin(B,O);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(U),U=ct.getCamera()),v.isScene===!0&&v.onBeforeRender(B,v,U,O),T=_t.get(v,M.length),T.init(U),T.state.textureUnits=_.getTextureUnits(),M.push(T),se.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Pt.setFromProjectionMatrix(se,gn,U.reversedDepth),qt=this.localClippingEnabled,fe=Mt.init(this.clippingPlanes,qt),L=Z.get(v,P.length),L.init(),P.push(L),ct.enabled===!0&&ct.isPresenting===!0){const St=B.xr.getDepthSensingMesh();St!==null&&Cr(St,U,-1/0,B.sortObjects)}Cr(v,U,0,B.sortObjects),L.finish(),B.sortObjects===!0&&L.sort(J,gt),pe=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,pe&&st.addToRenderList(L,v),this.info.render.frame++,fe===!0&&Mt.beginShadows();const G=T.state.shadowsArray;if(lt.render(G,v,U),fe===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&R.hasRenderPass())===!1){const St=L.opaque,pt=L.transmissive;if(T.setupLights(),U.isArrayCamera){const Et=U.cameras;if(pt.length>0)for(let At=0,kt=Et.length;At<kt;At++){const Wt=Et[At];el(St,pt,v,Wt)}pe&&st.render(v);for(let At=0,kt=Et.length;At<kt;At++){const Wt=Et[At];tl(L,v,Wt,Wt.viewport)}}else pt.length>0&&el(St,pt,v,U),pe&&st.render(v),tl(L,v,U)}O!==null&&j===0&&(_.updateMultisampleRenderTarget(O),_.updateRenderTargetMipmap(O)),z&&R.end(B),v.isScene===!0&&v.onAfterRender(B,v,U),rt.resetDefaultState(),W=-1,X=null,M.pop(),M.length>0?(T=M[M.length-1],_.setTextureUnits(T.state.textureUnits),fe===!0&&Mt.setGlobalState(B.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?L=P[P.length-1]:L=null,H!==null&&H.renderEnd()};function Cr(v,U,V,z){if(v.visible===!1)return;if(v.layers.test(U.layers)){if(v.isGroup)V=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(U);else if(v.isLightProbeGrid)T.pushLightProbeGrid(v);else if(v.isLight)T.pushLight(v),v.castShadow&&T.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Pt.intersectsSprite(v)){z&&Xt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(se);const St=it.update(v),pt=v.material;pt.visible&&L.push(v,St,pt,V,Xt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Pt.intersectsObject(v))){const St=it.update(v),pt=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Xt.copy(v.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Xt.copy(St.boundingSphere.center)),Xt.applyMatrix4(v.matrixWorld).applyMatrix4(se)),Array.isArray(pt)){const Et=St.groups;for(let At=0,kt=Et.length;At<kt;At++){const Wt=Et[At],Rt=pt[Wt.materialIndex];Rt&&Rt.visible&&L.push(v,St,Rt,V,Xt.z,Wt)}}else pt.visible&&L.push(v,St,pt,V,Xt.z,null)}}const mt=v.children;for(let St=0,pt=mt.length;St<pt;St++)Cr(mt[St],U,V,z)}function tl(v,U,V,z){const{opaque:G,transmissive:mt,transparent:St}=v;T.setupLightsView(V),fe===!0&&Mt.setGlobalState(B.clippingPlanes,V),z&&ut.viewport(et.copy(z)),G.length>0&&As(G,U,V),mt.length>0&&As(mt,U,V),St.length>0&&As(St,U,V),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function el(v,U,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){const Rt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new vn(1,1,{generateMipmaps:!0,type:Rt?kn:je,minFilter:_i,samples:Math.max(4,he.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace})}const mt=T.state.transmissionRenderTarget[z.id],St=z.viewport||et;mt.setSize(St.z*B.transmissionResolutionScale,St.w*B.transmissionResolutionScale);const pt=B.getRenderTarget(),Et=B.getActiveCubeFace(),At=B.getActiveMipmapLevel();B.setRenderTarget(mt),B.getClearColor(yt),wt=B.getClearAlpha(),wt<1&&B.setClearColor(16777215,.5),B.clear(),pe&&st.render(V);const kt=B.toneMapping;B.toneMapping=xn;const Wt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),fe===!0&&Mt.setGlobalState(B.clippingPlanes,z),As(v,V,z),_.updateMultisampleRenderTarget(mt),_.updateRenderTargetMipmap(mt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let ae=0,Se=U.length;ae<Se;ae++){const ge=U[ae],{object:le,geometry:Ue,material:vt,group:Xe}=ge;if(vt.side===Ln&&le.layers.test(z.layers)){const Jt=vt.side;vt.side=He,vt.needsUpdate=!0,nl(le,V,z,Ue,vt,Xe),vt.side=Jt,vt.needsUpdate=!0,Rt=!0}}Rt===!0&&(_.updateMultisampleRenderTarget(mt),_.updateRenderTargetMipmap(mt))}B.setRenderTarget(pt,Et,At),B.setClearColor(yt,wt),Wt!==void 0&&(z.viewport=Wt),B.toneMapping=kt}function As(v,U,V){const z=U.isScene===!0?U.overrideMaterial:null;for(let G=0,mt=v.length;G<mt;G++){const St=v[G],{object:pt,geometry:Et,group:At}=St;let kt=St.material;kt.allowOverride===!0&&z!==null&&(kt=z),pt.layers.test(V.layers)&&nl(pt,U,V,Et,kt,At)}}function nl(v,U,V,z,G,mt){v.onBeforeRender(B,U,V,z,G,mt),v.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(B,U,V,z,v,mt),G.transparent===!0&&G.side===Ln&&G.forceSinglePass===!1?(G.side=He,G.needsUpdate=!0,B.renderBufferDirect(V,U,z,G,v,mt),G.side=ri,G.needsUpdate=!0,B.renderBufferDirect(V,U,z,G,v,mt),G.side=Ln):B.renderBufferDirect(V,U,z,G,v,mt),v.onAfterRender(B,U,V,z,G,mt)}function ws(v,U,V){U.isScene!==!0&&(U=be);const z=y.get(v),G=T.state.lights,mt=T.state.shadowsArray,St=G.state.version,pt=ht.getParameters(v,G.state,mt,U,V,T.state.lightProbeGridArray),Et=ht.getProgramCacheKey(pt);let At=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;const kt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=k.get(v.envMap||z.environment,kt),z.envMapRotation=z.environment!==null&&v.envMap===null?U.environmentRotation:v.envMapRotation,At===void 0&&(v.addEventListener("dispose",Me),At=new Map,z.programs=At);let Wt=At.get(Et);if(Wt!==void 0){if(z.currentProgram===Wt&&z.lightsStateVersion===St)return sl(v,pt),Wt}else pt.uniforms=ht.getUniforms(v),H!==null&&v.isNodeMaterial&&H.build(v,V,pt),v.onBeforeCompile(pt,B),Wt=ht.acquireProgram(pt,Et),At.set(Et,Wt),z.uniforms=pt.uniforms;const Rt=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Rt.clippingPlanes=Mt.uniform),sl(v,pt),z.needsLights=lu(v),z.lightsStateVersion=St,z.needsLights&&(Rt.ambientLightColor.value=G.state.ambient,Rt.lightProbe.value=G.state.probe,Rt.directionalLights.value=G.state.directional,Rt.directionalLightShadows.value=G.state.directionalShadow,Rt.spotLights.value=G.state.spot,Rt.spotLightShadows.value=G.state.spotShadow,Rt.rectAreaLights.value=G.state.rectArea,Rt.ltc_1.value=G.state.rectAreaLTC1,Rt.ltc_2.value=G.state.rectAreaLTC2,Rt.pointLights.value=G.state.point,Rt.pointLightShadows.value=G.state.pointShadow,Rt.hemisphereLights.value=G.state.hemi,Rt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Rt.spotLightMatrix.value=G.state.spotLightMatrix,Rt.spotLightMap.value=G.state.spotLightMap,Rt.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=Wt,z.uniformsList=null,Wt}function il(v){if(v.uniformsList===null){const U=v.currentProgram.getUniforms();v.uniformsList=cr.seqWithValue(U.seq,v.uniforms)}return v.uniformsList}function sl(v,U){const V=y.get(v);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function ru(v,U){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;A.setFromMatrixPosition(U.matrixWorld);for(let V=0,z=v.length;V<z;V++){const G=v[V];if(G.texture!==null&&G.boundingBox.containsPoint(A))return G}return null}function au(v,U,V,z,G){U.isScene!==!0&&(U=be),_.resetTextureUnits();const mt=U.fog,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,pt=O===null?B.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:jt.workingColorSpace,Et=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,At=k.get(z.envMap||St,Et),kt=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Wt=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Rt=!!V.morphAttributes.position,ae=!!V.morphAttributes.normal,Se=!!V.morphAttributes.color;let ge=xn;z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ge=B.toneMapping);const le=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ue=le!==void 0?le.length:0,vt=y.get(z),Xe=T.state.lights;if(fe===!0&&(qt===!0||v!==X)){const ue=v===X&&z.id===W;Mt.setState(z,v,ue)}let Jt=!1;z.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==Xe.state.version||vt.outputColorSpace!==pt||G.isBatchedMesh&&vt.batching===!1||!G.isBatchedMesh&&vt.batching===!0||G.isBatchedMesh&&vt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&vt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&vt.instancing===!1||!G.isInstancedMesh&&vt.instancing===!0||G.isSkinnedMesh&&vt.skinning===!1||!G.isSkinnedMesh&&vt.skinning===!0||G.isInstancedMesh&&vt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&vt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&vt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&vt.instancingMorph===!1&&G.morphTexture!==null||vt.envMap!==At||z.fog===!0&&vt.fog!==mt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==Mt.numPlanes||vt.numIntersection!==Mt.numIntersection)||vt.vertexAlphas!==kt||vt.vertexTangents!==Wt||vt.morphTargets!==Rt||vt.morphNormals!==ae||vt.morphColors!==Se||vt.toneMapping!==ge||vt.morphTargetsCount!==Ue||!!vt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Jt=!0):(Jt=!0,vt.__version=z.version);let Ke=vt.currentProgram;Jt===!0&&(Ke=ws(z,U,G),H&&z.isNodeMaterial&&H.onUpdateProgram(z,Ke,vt));let hn=!1,Hn=!1,Ai=!1;const ce=Ke.getUniforms(),ye=vt.uniforms;if(ut.useProgram(Ke.program)&&(hn=!0,Hn=!0,Ai=!0),z.id!==W&&(W=z.id,Hn=!0),vt.needsLights){const ue=ru(T.state.lightProbeGridArray,G);vt.lightProbeGrid!==ue&&(vt.lightProbeGrid=ue,Hn=!0)}if(hn||X!==v){ut.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ce.setValue(D,"projectionMatrix",v.projectionMatrix),ce.setValue(D,"viewMatrix",v.matrixWorldInverse);const Wn=ce.map.cameraPosition;Wn!==void 0&&Wn.setValue(D,de.setFromMatrixPosition(v.matrixWorld)),he.logarithmicDepthBuffer&&ce.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ce.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),X!==v&&(X=v,Hn=!0,Ai=!0)}if(vt.needsLights&&(Xe.state.directionalShadowMap.length>0&&ce.setValue(D,"directionalShadowMap",Xe.state.directionalShadowMap,_),Xe.state.spotShadowMap.length>0&&ce.setValue(D,"spotShadowMap",Xe.state.spotShadowMap,_),Xe.state.pointShadowMap.length>0&&ce.setValue(D,"pointShadowMap",Xe.state.pointShadowMap,_)),G.isSkinnedMesh){ce.setOptional(D,G,"bindMatrix"),ce.setOptional(D,G,"bindMatrixInverse");const ue=G.skeleton;ue&&(ue.boneTexture===null&&ue.computeBoneTexture(),ce.setValue(D,"boneTexture",ue.boneTexture,_))}G.isBatchedMesh&&(ce.setOptional(D,G,"batchingTexture"),ce.setValue(D,"batchingTexture",G._matricesTexture,_),ce.setOptional(D,G,"batchingIdTexture"),ce.setValue(D,"batchingIdTexture",G._indirectTexture,_),ce.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&ce.setValue(D,"batchingColorTexture",G._colorsTexture,_));const Vn=V.morphAttributes;if((Vn.position!==void 0||Vn.normal!==void 0||Vn.color!==void 0)&&Dt.update(G,V,Ke),(Hn||vt.receiveShadow!==G.receiveShadow)&&(vt.receiveShadow=G.receiveShadow,ce.setValue(D,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(ye.envMapIntensity.value=U.environmentIntensity),ye.dfgLUT!==void 0&&(ye.dfgLUT.value=Y_()),Hn){if(ce.setValue(D,"toneMappingExposure",B.toneMappingExposure),vt.needsLights&&ou(ye,Ai),mt&&z.fog===!0&&Y.refreshFogUniforms(ye,mt),Y.refreshMaterialUniforms(ye,z,Gt,ie,T.state.transmissionRenderTarget[v.id]),vt.needsLights&&vt.lightProbeGrid){const ue=vt.lightProbeGrid;ye.probesSH.value=ue.texture,ye.probesMin.value.copy(ue.boundingBox.min),ye.probesMax.value.copy(ue.boundingBox.max),ye.probesResolution.value.copy(ue.resolution)}cr.upload(D,il(vt),ye,_)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(cr.upload(D,il(vt),ye,_),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ce.setValue(D,"center",G.center),ce.setValue(D,"modelViewMatrix",G.modelViewMatrix),ce.setValue(D,"normalMatrix",G.normalMatrix),ce.setValue(D,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const ue=z.uniformsGroups;for(let Wn=0,wi=ue.length;Wn<wi;Wn++){const rl=ue[Wn];$.update(rl,Ke),$.bind(rl,Ke)}}return Ke}function ou(v,U){v.ambientLightColor.needsUpdate=U,v.lightProbe.needsUpdate=U,v.directionalLights.needsUpdate=U,v.directionalLightShadows.needsUpdate=U,v.pointLights.needsUpdate=U,v.pointLightShadows.needsUpdate=U,v.spotLights.needsUpdate=U,v.spotLightShadows.needsUpdate=U,v.rectAreaLights.needsUpdate=U,v.hemisphereLights.needsUpdate=U}function lu(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(v,U,V){const z=y.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),y.get(v.texture).__webglTexture=U,y.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,U){const V=y.get(v);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0};const cu=D.createFramebuffer();this.setRenderTarget=function(v,U=0,V=0){O=v,q=U,j=V;let z=null,G=!1,mt=!1;if(v){const pt=y.get(v);if(pt.__useDefaultFramebuffer!==void 0){ut.bindFramebuffer(D.FRAMEBUFFER,pt.__webglFramebuffer),et.copy(v.viewport),nt.copy(v.scissor),ft=v.scissorTest,ut.viewport(et),ut.scissor(nt),ut.setScissorTest(ft),W=-1;return}else if(pt.__webglFramebuffer===void 0)_.setupRenderTarget(v);else if(pt.__hasExternalTextures)_.rebindTextures(v,y.get(v.texture).__webglTexture,y.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const kt=v.depthTexture;if(pt.__boundDepthTexture!==kt){if(kt!==null&&y.has(kt)&&(v.width!==kt.image.width||v.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(v)}}const Et=v.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(mt=!0);const At=y.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(At[U])?z=At[U][V]:z=At[U],G=!0):v.samples>0&&_.useMultisampledRTT(v)===!1?z=y.get(v).__webglMultisampledFramebuffer:Array.isArray(At)?z=At[V]:z=At,et.copy(v.viewport),nt.copy(v.scissor),ft=v.scissorTest}else et.copy(ot).multiplyScalar(Gt).floor(),nt.copy(It).multiplyScalar(Gt).floor(),ft=Ft;if(V!==0&&(z=cu),ut.bindFramebuffer(D.FRAMEBUFFER,z)&&ut.drawBuffers(v,z),ut.viewport(et),ut.scissor(nt),ut.setScissorTest(ft),G){const pt=y.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,pt.__webglTexture,V)}else if(mt){const pt=U;for(let Et=0;Et<v.textures.length;Et++){const At=y.get(v.textures[Et]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Et,At.__webglTexture,V,pt)}}else if(v!==null&&V!==0){const pt=y.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pt.__webglTexture,V)}W=-1},this.readRenderTargetPixels=function(v,U,V,z,G,mt,St,pt=0){if(!(v&&v.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=y.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(Et=Et[St]),Et){ut.bindFramebuffer(D.FRAMEBUFFER,Et);try{const At=v.textures[pt],kt=At.format,Wt=At.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pt),!he.textureFormatReadable(kt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!he.textureTypeReadable(Wt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=v.width-z&&V>=0&&V<=v.height-G&&D.readPixels(U,V,z,G,C.convert(kt),C.convert(Wt),mt)}finally{const At=O!==null?y.get(O).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(v,U,V,z,G,mt,St,pt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=y.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(Et=Et[St]),Et)if(U>=0&&U<=v.width-z&&V>=0&&V<=v.height-G){ut.bindFramebuffer(D.FRAMEBUFFER,Et);const At=v.textures[pt],kt=At.format,Wt=At.type;if(v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pt),!he.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!he.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Rt),D.bufferData(D.PIXEL_PACK_BUFFER,mt.byteLength,D.STREAM_READ),D.readPixels(U,V,z,G,C.convert(kt),C.convert(Wt),0);const ae=O!==null?y.get(O).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,ae);const Se=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await ad(D,Se,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Rt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,mt),D.deleteBuffer(Rt),D.deleteSync(Se),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,U=null,V=0){const z=Math.pow(2,-V),G=Math.floor(v.image.width*z),mt=Math.floor(v.image.height*z),St=U!==null?U.x:0,pt=U!==null?U.y:0;_.setTexture2D(v,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,St,pt,G,mt),ut.unbindTexture()};const hu=D.createFramebuffer(),uu=D.createFramebuffer();this.copyTextureToTexture=function(v,U,V=null,z=null,G=0,mt=0){let St,pt,Et,At,kt,Wt,Rt,ae,Se;const ge=v.isCompressedTexture?v.mipmaps[mt]:v.image;if(V!==null)St=V.max.x-V.min.x,pt=V.max.y-V.min.y,Et=V.isBox3?V.max.z-V.min.z:1,At=V.min.x,kt=V.min.y,Wt=V.isBox3?V.min.z:0;else{const ye=Math.pow(2,-G);St=Math.floor(ge.width*ye),pt=Math.floor(ge.height*ye),v.isDataArrayTexture?Et=ge.depth:v.isData3DTexture?Et=Math.floor(ge.depth*ye):Et=1,At=0,kt=0,Wt=0}z!==null?(Rt=z.x,ae=z.y,Se=z.z):(Rt=0,ae=0,Se=0);const le=C.convert(U.format),Ue=C.convert(U.type);let vt;U.isData3DTexture?(_.setTexture3D(U,0),vt=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(_.setTexture2DArray(U,0),vt=D.TEXTURE_2D_ARRAY):(_.setTexture2D(U,0),vt=D.TEXTURE_2D),ut.activeTexture(D.TEXTURE0),ut.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),ut.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),ut.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Xe=ut.getParameter(D.UNPACK_ROW_LENGTH),Jt=ut.getParameter(D.UNPACK_IMAGE_HEIGHT),Ke=ut.getParameter(D.UNPACK_SKIP_PIXELS),hn=ut.getParameter(D.UNPACK_SKIP_ROWS),Hn=ut.getParameter(D.UNPACK_SKIP_IMAGES);ut.pixelStorei(D.UNPACK_ROW_LENGTH,ge.width),ut.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ge.height),ut.pixelStorei(D.UNPACK_SKIP_PIXELS,At),ut.pixelStorei(D.UNPACK_SKIP_ROWS,kt),ut.pixelStorei(D.UNPACK_SKIP_IMAGES,Wt);const Ai=v.isDataArrayTexture||v.isData3DTexture,ce=U.isDataArrayTexture||U.isData3DTexture;if(v.isDepthTexture){const ye=y.get(v),Vn=y.get(U),ue=y.get(ye.__renderTarget),Wn=y.get(Vn.__renderTarget);ut.bindFramebuffer(D.READ_FRAMEBUFFER,ue.__webglFramebuffer),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let wi=0;wi<Et;wi++)Ai&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(v).__webglTexture,G,Wt+wi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(U).__webglTexture,mt,Se+wi)),D.blitFramebuffer(At,kt,St,pt,Rt,ae,St,pt,D.DEPTH_BUFFER_BIT,D.NEAREST);ut.bindFramebuffer(D.READ_FRAMEBUFFER,null),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||y.has(v)){const ye=y.get(v),Vn=y.get(U);ut.bindFramebuffer(D.READ_FRAMEBUFFER,hu),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,uu);for(let ue=0;ue<Et;ue++)Ai?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ye.__webglTexture,G,Wt+ue):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ye.__webglTexture,G),ce?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Vn.__webglTexture,mt,Se+ue):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Vn.__webglTexture,mt),G!==0?D.blitFramebuffer(At,kt,St,pt,Rt,ae,St,pt,D.COLOR_BUFFER_BIT,D.NEAREST):ce?D.copyTexSubImage3D(vt,mt,Rt,ae,Se+ue,At,kt,St,pt):D.copyTexSubImage2D(vt,mt,Rt,ae,At,kt,St,pt);ut.bindFramebuffer(D.READ_FRAMEBUFFER,null),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ce?v.isDataTexture||v.isData3DTexture?D.texSubImage3D(vt,mt,Rt,ae,Se,St,pt,Et,le,Ue,ge.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(vt,mt,Rt,ae,Se,St,pt,Et,le,ge.data):D.texSubImage3D(vt,mt,Rt,ae,Se,St,pt,Et,le,Ue,ge):v.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,mt,Rt,ae,St,pt,le,Ue,ge.data):v.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,mt,Rt,ae,ge.width,ge.height,le,ge.data):D.texSubImage2D(D.TEXTURE_2D,mt,Rt,ae,St,pt,le,Ue,ge);ut.pixelStorei(D.UNPACK_ROW_LENGTH,Xe),ut.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Jt),ut.pixelStorei(D.UNPACK_SKIP_PIXELS,Ke),ut.pixelStorei(D.UNPACK_SKIP_ROWS,hn),ut.pixelStorei(D.UNPACK_SKIP_IMAGES,Hn),mt===0&&U.generateMipmaps&&D.generateMipmap(vt),ut.unbindTexture()},this.initRenderTarget=function(v){y.get(v).__webglFramebuffer===void 0&&_.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?_.setTextureCube(v,0):v.isData3DTexture?_.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?_.setTexture2DArray(v,0):_.setTexture2D(v,0),ut.unbindTexture()},this.resetState=function(){q=0,j=0,O=null,ut.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}const pc={type:"change"},Uo={type:"start"},bh={type:"end"},nr=new Po,mc=new Zn,$_=Math.cos(70*cd.DEG2RAD),Ae=new F,Ge=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},da=1e-6;class j_ extends Kd{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Nn.ROTATE,MIDDLE:Nn.DOLLY,RIGHT:Nn.PAN},this.touches={ONE:ti.ROTATE,TWO:ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new ai,this._lastTargetPosition=new F,this._quat=new ai().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hl,this._sphericalDelta=new Hl,this._scale=1,this._panOffset=new F,this._rotateStart=new zt,this._rotateEnd=new zt,this._rotateDelta=new zt,this._panStart=new zt,this._panEnd=new zt,this._panDelta=new zt,this._dollyStart=new zt,this._dollyEnd=new zt,this._dollyDelta=new zt,this._dollyDirection=new F,this._mouse=new zt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Z_.bind(this),this._onPointerDown=K_.bind(this),this._onPointerUp=J_.bind(this),this._onContextMenu=rx.bind(this),this._onMouseWheel=ex.bind(this),this._onKeyDown=nx.bind(this),this._onTouchStart=ix.bind(this),this._onTouchMove=sx.bind(this),this._onMouseDown=Q_.bind(this),this._onMouseMove=tx.bind(this),this._interceptControlDown=ax.bind(this),this._interceptControlUp=ox.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pc),this.update(),this.state=oe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ge:i>Math.PI&&(i-=Ge),s<-Math.PI?s+=Ge:s>Math.PI&&(s-=Ge),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ae.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(nr.origin.copy(this.object.position),nr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nr.direction))<$_?this.object.lookAt(this.target):(mc.setFromNormalAndCoplanarPoint(this.object.up,this.target),nr.intersectPlane(mc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>da||8*(1-this._lastQuaternion.dot(this.object.quaternion))>da||this._lastTargetPosition.distanceToSquared(this.target)>da?(this.dispatchEvent(pc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ge/60*this.autoRotateSpeed*t:Ge/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new zt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function K_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Z_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function J_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bh),this.state=oe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Q_(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Nn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=oe.DOLLY;break;case Nn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=oe.ROTATE}break;case Nn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Uo)}function tx(n){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function ex(n){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(n.preventDefault(),this.dispatchEvent(Uo),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(bh))}function nx(n){this.enabled!==!1&&this._handleKeyDown(n)}function ix(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=oe.TOUCH_ROTATE;break;case ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=oe.TOUCH_DOLLY_PAN;break;case ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Uo)}function sx(n){switch(this._trackPointer(n),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=oe.NONE}}function rx(n){this.enabled!==!1&&n.preventDefault()}function ax(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ox(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const lx="#1f6659",cx="#4d5a52";class hx{constructor(t,e){un(this,"renderer");un(this,"scene",new Ed);un(this,"camera",new Er(-1,1,1,-1,.1,5e4));un(this,"controls");un(this,"root",new ds);un(this,"sceneSpan",1e3);un(this,"cameraReady",!1);un(this,"animationFrame",null);this.canvas=t,this.state=e,this.renderer=new q_({canvas:t,antialias:!0}),this.renderer.setClearColor(16514296,1),this.renderer.outputColorSpace=$e,this.controls=new j_(this.camera,t),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enableRotate=!0,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:Nn.ROTATE,MIDDLE:Nn.DOLLY,RIGHT:Nn.PAN},this.controls.touches={ONE:ti.ROTATE,TWO:ti.DOLLY_PAN},this.controls.addEventListener("change",()=>this.renderFrame()),this.scene.add(this.root),this.addLighting(),this.startRenderLoop()}bindInteractions(t){}dispose(){this.animationFrame!==null&&window.cancelAnimationFrame(this.animationFrame),this.animationFrame=null,this.controls.dispose(),this.clearRoot(),this.renderer.dispose()}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.renderer.setPixelRatio(e),this.renderer.setSize(Math.max(1,t.width),Math.max(1,t.height),!1),this.updateCameraFrustum(t.width,t.height),this.draw()}draw(){this.clearRoot();const t=Bn(this.state.boards);if(!t){this.renderFrame();return}const e=Math.max(this.state.depth,...this.state.boards.map(o=>ni(o,this.state.depth))),i=this.overlayThickness(e),s=e+i,r=t.left+t.w/2,a=t.top+t.h/2;this.sceneSpan=Math.max(t.w,t.h,s,1)*1.65,this.updateCameraFrustum(this.canvas.clientWidth,this.canvas.clientHeight),this.addGround(t.w,s,t.h),_o(this.state.boards).map(o=>this.boxForBoard(o,r,a,s,i)).forEach(o=>this.addBoardBox(o)),this.cameraReady||this.resetCamera(),this.controls.target.set(0,0,0),this.controls.update(),this.renderFrame()}addLighting(){this.scene.add(new Yd(16777215,1.75));const t=new Gl(16777215,2.3);t.position.set(800,1100,900),this.scene.add(t);const e=new Gl(16777215,.75);e.position.set(-700,500,-500),this.scene.add(e)}updateCameraFrustum(t,e){const i=Math.max(.1,t/Math.max(1,e)),s=this.sceneSpan;i>=1?(this.camera.left=-s*i/2,this.camera.right=s*i/2,this.camera.top=s/2,this.camera.bottom=-s/2):(this.camera.left=-s/2,this.camera.right=s/2,this.camera.top=s/i/2,this.camera.bottom=-s/i/2),this.camera.updateProjectionMatrix()}resetCamera(){this.camera.position.set(this.sceneSpan*.55,0,this.sceneSpan*1.45),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update(),this.cameraReady=!0}addGround(t,e,i){const s=Math.max(t,e,300)*1.25,r=new jd(s,12,10466216,14081752);r.position.y=-Math.max(60,i/2+36),r.position.z=0,this.root.add(r)}boxForBoard(t,e,i,s,r){const a=this.zRangeForBoard(t,ni(t,this.state.depth),r),o=Math.max(1,a.front-a.back),c=t.kind==="front"&&!this.state.showFrontPanels?.18:1;return{board:t,x:t.x+t.w/2-e,y:i-(t.y+t.h/2),z:(a.back+a.front)/2-s/2,w:Math.max(1,t.w),h:Math.max(1,t.h),d:o,opacity:c}}zRangeForBoard(t,e,i){if(t.kind==="front"){const s=this.deepestOverlappingStructuralDepth(t)??e;return{back:s,front:s+i}}return t.kind==="back"?{back:0,front:i}:{back:0,front:e}}addBoardBox(t){const e=this.materialFor(t.board),i=this.state.selectedIds.includes(t.board.id)||this.state.selectedId===t.board.id,s=new ts(t.w,t.h,t.d),r=new Gd({color:new Kt(e.color),opacity:t.opacity,roughness:.78,metalness:0,transparent:t.opacity<1,depthWrite:t.opacity>=1}),a=new En(s,r);a.position.set(t.x,t.y,t.z),this.root.add(a);const o=new Nd(s),c=new Do({color:i?lx:cx,transparent:!0,opacity:i?1:.44}),l=new hh(o,c);l.position.copy(a.position),this.root.add(l)}overlayThickness(t){return Math.max(4,Math.min(this.state.thickness,t*.08))}deepestOverlappingStructuralDepth(t){const e=this.state.boards.filter(i=>i.id!==t.id&&i.kind!=="front"&&i.kind!=="back").filter(i=>this.boardsOverlapInElevation(t,i));return e.length?Math.max(...e.map(i=>ni(i,this.state.depth))):null}boardsOverlapInElevation(t,e){return t.x<e.x+e.w&&t.x+t.w>e.x&&t.y<e.y+e.h&&t.y+t.h>e.y}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}clearRoot(){[...this.root.children].forEach(t=>{this.root.remove(t),this.disposeObject(t)})}disposeObject(t){t.traverse(e=>{var r;const i=e;(r=i.geometry)==null||r.dispose();const s=i.material;Array.isArray(s)?s.forEach(a=>a.dispose()):s==null||s.dispose()})}renderFrame(){this.renderer.render(this.scene,this.camera)}startRenderLoop(){const t=()=>{this.animationFrame=window.requestAnimationFrame(t),this.controls.update(),this.renderFrame()};t()}}const ux=`{
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
`,Lt=at("#sketchCanvas"),dx=at("#view3dCanvas"),w={projectNameInput:at("#projectNameInput"),templateChooser:at("#templateChooser"),canvasWrap:at("#canvasWrap"),templateList:at("#templateList"),measureModeBtn:at("#measureModeBtn"),presetList:at("#presetList"),thicknessInput:at("#thicknessInput"),depthInput:at("#depthInput"),gridInput:at("#gridInput"),snapToggle:at("#snapToggle"),dimToggle:at("#dimToggle"),frontLayerToggle:at("#frontLayerToggle"),duplicateBtn:at("#duplicateBtn"),rotateBtn:at("#rotateBtn"),undoBtn:at("#undoBtn"),redoBtn:at("#redoBtn"),measureWidthBtn:at("#measureWidthBtn"),measureHeightBtn:at("#measureHeightBtn"),saveBtn:at("#saveBtn"),loadBtn:at("#loadBtn"),newProjectBtn:at("#newProjectBtn"),projectFileInput:at("#projectFileInput"),deleteBtn:at("#deleteBtn"),fitBtn:at("#fitBtn"),view3dBtn:at("#view3dBtn"),copyCsvBtn:at("#copyCsvBtn"),exportBtn:at("#exportBtn"),notificationToast:at("#notificationToast"),selectionStatus:at("#selectionStatus"),snapStatus:at("#snapStatus"),emptySelection:at("#emptySelection"),inspector:at("#inspector"),nameInput:at("#nameInput"),xInput:at("#xInput"),yInput:at("#yInput"),wInput:at("#wInput"),hInput:at("#hInput"),depthOverrideInput:at("#depthOverrideInput"),layoutAnchorAxisInput:at("#layoutAnchorAxisInput"),layoutAnchorCountInput:at("#layoutAnchorCountInput"),layoutAnchorBalanceInput:at("#layoutAnchorBalanceInput"),layoutAnchorStartInput:at("#layoutAnchorStartInput"),layoutAnchorEndInput:at("#layoutAnchorEndInput"),layoutAnchorStartLabel:at("#layoutAnchorStartLabel"),layoutAnchorEndLabel:at("#layoutAnchorEndLabel"),layoutAnchorThicknessInput:at("#layoutAnchorThicknessInput"),layoutAnchorApplyBtn:at("#layoutAnchorApplyBtn"),layoutAnchorClearBtn:at("#layoutAnchorClearBtn"),layoutAnchorSummary:at("#layoutAnchorSummary"),materialSelect:at("#materialSelect"),materialSelectButton:at("#materialSelectButton"),materialSelectList:at("#materialSelectList"),materialSelectSwatch:at("#materialSelectSwatch"),materialSelectText:at("#materialSelectText"),materialInput:at("#materialInput"),materialLabelSwatch:at("#materialLabelSwatch"),materialForm:at("#materialForm"),materialNameInput:at("#materialNameInput"),materialColorInput:at("#materialColorInput"),addMaterialBtn:at("#addMaterialBtn"),laminateLeftInput:at("#laminateLeftInput"),laminateRightInput:at("#laminateRightInput"),laminateTopInput:at("#laminateTopInput"),laminateBottomInput:at("#laminateBottomInput"),laminateFrontInput:at("#laminateFrontInput"),laminateBackInput:at("#laminateBackInput"),ignoreOrderInput:at("#ignoreOrderInput"),measureList:at("#measureList"),warningList:at("#warningList"),cutList:at("#cutList"),ignoredCutList:at("#ignoredCutList"),rightPanelTools:at("#rightPanelTools"),woodOrderPanel:at("#woodOrderPanel"),woodOrderToggleBtn:at("#woodOrderToggleBtn"),woodOrderBackBtn:at("#woodOrderBackBtn"),materialList:at("#materialList"),anchorOverlay:at("#anchorOverlay"),overlayScaleBar:at("#overlayScaleBar"),overlayScaleLabel:at("#overlayScaleLabel"),overlayZoomLabel:at("#overlayZoomLabel"),measureRenameForm:at("#measureRenameForm"),measureRenameInput:at("#measureRenameInput"),measureRenameCancelBtn:at("#measureRenameCancelBtn")},d={projectName:"",boards:[],anchors:[],layoutAnchors:[],measurements:[],materials:Ch(),selectedId:null,selectedIds:[],selectedMeasurementId:null,nextId:1,nextAnchorId:1,nextLayoutAnchorId:1,nextMeasurementId:1,thickness:18,depth:560,grid:25,gridOriginX:160,gridOriginY:120,snap:!0,showDimensions:!0,showFrontPanels:!0,scale:.62,panX:160,panY:110,dragging:null,resizing:null,measurementDragging:null,panning:null,selectionBox:null,snapGuides:[],tool:"select",pendingMeasurementAnchor:null,previewMeasurementAnchor:null,lastSnap:N("common.ready")},Th=["left","right","top","bottom","front","back"],Ah=new Tu(Lt,d),No=new hx(dx,d),wh="mebel-maker-project",gc="0f6eca7",fx=80,px=.125,mx=.09,gx=1.3,_x=2,Vi=46,Rh=new AbortController,Tt={signal:Rh.signal},qi=[],Ar=[];let _c,vs=null,Ji="sketch",Jn=!1;const xx={side:{name:N("pieces.side"),kind:"upright",autoThickness:"width",w:()=>d.thickness,h:()=>560},shelf:{name:N("pieces.shelf"),kind:"shelf",autoThickness:"height",w:()=>820-d.thickness*2,h:()=>d.thickness},divider:{name:N("pieces.divider"),kind:"upright",autoThickness:"width",w:()=>d.thickness,h:()=>560-d.thickness*2},back:{name:N("pieces.back"),kind:"back",autoThickness:"none",w:()=>820,h:()=>560},front:{name:N("pieces.front"),kind:"front",autoThickness:"none",w:()=>820,h:()=>560}},Fo="birch-plywood";function at(n){const t=document.querySelector(n);if(!t)throw new Error(`Missing element: ${n}`);return t}function N(n,t){return Tc(n,t?{values:t}:void 0)}function Ch(){return[{id:"birch-plywood",name:Je("birch-plywood"),color:"#d9b77e"},{id:"oak",name:Je("oak"),color:"#c99756"},{id:"walnut",name:Je("walnut"),color:"#7a4f34"},{id:"pine",name:Je("pine"),color:"#e1c889"},{id:"white-melamine",name:Je("white-melamine"),color:"#f5f3ec"},{id:"black",name:Je("black"),color:"#252525"},{id:"white",name:Je("white"),color:"#ffffff"},{id:"gray",name:Je("gray"),color:"#9aa0a6"},{id:"red",name:Je("red"),color:"#b8483b"},{id:"blue",name:Je("blue"),color:"#3f75a3"},{id:"green",name:Je("green"),color:"#538052"}]}function Je(n){return{"birch-plywood":N("materials.birchPlywood"),oak:N("materials.oak"),walnut:N("materials.walnut"),pine:N("materials.pine"),"white-melamine":N("materials.whiteMelamine"),black:N("materials.black"),white:N("materials.white"),gray:N("materials.gray"),red:N("materials.red"),blue:N("materials.blue"),green:N("materials.green")}[n]??""}function Wi(n){return Je(n.id)||n.name}function vx(n){const t=Ch();if(!(n!=null&&n.length))return t;const e=new Set,i=n.filter(s=>{const r=s.id&&s.name&&/^#[0-9a-f]{6}$/i.test(s.color)&&!e.has(s.id);return r&&e.add(s.id),r});return i.some(s=>s.id===Fo)?i:[...t,...i]}function Mx(n){if(!(n!=null&&n.length))return[];const t=new Set(d.boards.map(s=>s.id)),e=["left","right","top","bottom"],i=new Set;return n.filter(s=>{const r=`${s.boardId}:${s.edge}:${s.targetBoardId}:${s.targetEdge}`,a=t.has(s.boardId)&&t.has(s.targetBoardId)&&s.boardId!==s.targetBoardId&&e.includes(s.edge)&&e.includes(s.targetEdge)&&!i.has(r);return a&&i.add(r),a})}function Sx(n){if(!(n!=null&&n.length))return[];const t=new Set(d.boards.map(i=>i.id)),e=new Set;return n.filter(i=>{const s=d.boards.find(l=>l.id===i.boardId),r=Number(i.offset),a=i.axis==="x"?s==null?void 0:s.w:s==null?void 0:s.h,o=`${i.boardId}:${i.axis}:${Math.round(r*1e3)}`,c=t.has(i.boardId)&&(i.axis==="x"||i.axis==="y")&&Number.isFinite(r)&&r>=0&&a!==void 0&&r<=a&&!e.has(o);return c&&e.add(o),c}).map(i=>({...i,offset:Math.round(i.offset)}))}function yx(){return{left:!1,right:!1,top:!1,bottom:!1,front:!1,back:!1}}function Ih(n){return{...yx(),...n}}function wr(n){return`P${n}`}function Oo(n){return`M${n}`}function Ex(n){return/^(Board \d+|Side|Shelf|Shelf \d+|Divider|Back|Front|Left side|Right side|Top|Bottom|Middle shelf|Left adjustable shelf|Right adjustable shelf|Center divider)( copy)?$/.test(n)}function Ph(n,t){const e=(n==null?void 0:n.trim())??"";return!e||Ex(e)?wr(t):e}function Mi(){const n=new Set(d.selectedIds);return d.selectedId!==null&&n.add(d.selectedId),n}function Gn(n,t=n[0]??null){const e=new Set(d.boards.map(r=>r.id)),i=[...new Set(n)].filter(r=>e.has(r)),s=t!==null&&i.includes(t)?t:i[0]??null;d.selectedId=s,d.selectedIds=i,i.length&&(d.selectedMeasurementId=null)}function Lh(){Gn([])}function Es(n){d.selectedMeasurementId=n!==null&&d.measurements.some(t=>t.id===n)?n:null,d.selectedMeasurementId!==null&&(d.selectedId=null,d.selectedIds=[])}function bx(n){const t=Mi();t.has(n)?t.delete(n):t.add(n),Gn([...t],t.has(n)?n:[...t][0]??null)}function Tx(n,t){return((n==null?void 0:n.trim())??"")||Oo(t)}function Ax(n){const t=n.materialId&&d.materials.some(e=>e.id===n.materialId)?n.materialId:Fo;return{...n,name:Ph(n.name,n.id),materialId:t,thicknessOverride:xr(n.thicknessOverride),depthOverride:xr(n.depthOverride),laminate:Ih(n.laminate),ignoreInOrder:n.ignoreInOrder??!1}}function wx(n=d.boards){return Math.max(0,...n.map(t=>t.id))+1}function Rx(n=d.measurements){return Math.max(0,...n.map(t=>t.id))+1}function Cx(n=d.anchors){return Math.max(0,...n.map(t=>t.id))+1}function Ix(n=d.layoutAnchors){return Math.max(0,...n.map(t=>t.id))+1}function Dh(n){return Th.filter(t=>n[t]).join(",")||"none"}function Px(n){const t=Th.filter(e=>n[e]);return t.length?t.map(e=>Bo(e)).join(", "):N("metrics.none")}function Lx(n){const e=[["left",n.h],["right",n.h],["top",n.w],["bottom",n.w],["front",n.w],["back",n.w]].filter(([i])=>n.laminate[i]).map(([i,s])=>`${Bo(i)} ${Ut(s)}`);return e.length?e.join(", "):N("metrics.none")}function Bo(n){return{left:N("inspector.left"),right:N("inspector.right"),top:N("inspector.top"),bottom:N("inspector.bottom"),front:N("inspector.front"),back:N("inspector.back")}[n]}function Pe(n){return n.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t)}function ko(n){const t=d.materials.find(e=>e.id===n);return t?Wi(t):N("inspector.unknownMaterial")}function xc(n){var t;return((t=d.materials.find(e=>e.id===n))==null?void 0:t.color)??d.materials[0].color}function Dx(n){return d.materials.find(t=>t.id===n)??null}function Ux(n){const t=n.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"custom-material";let e=t,i=2;for(;d.materials.some(s=>s.id===e);)e=`${t}-${i}`,i+=1;return e}function Nx(n){return/^#[0-9a-f]{6}$/i.test(n)?n:"#c99756"}function _n(n,t){const e=Number(n);return Number.isFinite(e)&&e>0?Math.round(e):t}function xr(n){const t=Number(n);return Number.isFinite(t)&&t>0?Math.round(t):null}function Fx(n,t){const e=Number(n);return Number.isFinite(e)?Math.round(e):Nc(t)}function co(n){return-n}function vc(n){return-n}function Uh(n,t=!0){t&&ee();const e={id:d.nextId,name:Ph(n.name,d.nextId),x:n.x??120,y:n.y??120,w:n.w??400,h:n.h??250,kind:n.kind,autoThickness:n.autoThickness,materialId:n.materialId??Fo,thicknessOverride:xr(n.thicknessOverride),depthOverride:xr(n.depthOverride),laminate:Ih(n.laminate),ignoreInOrder:n.ignoreInOrder??!1,group:0};d.nextId+=1,d.boards.push(e),Gn([e.id],e.id),qh(e.id),Nt()}function Un(n){Uh(n,!1)}function Ox(n,t,e){n&&ee(),d.boards=[],d.anchors=[],d.layoutAnchors=[],d.measurements=[],d.nextId=1,d.nextAnchorId=1,d.nextLayoutAnchorId=1,d.nextMeasurementId=1,d.selectedMeasurementId=null,d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.gridOriginX=t,d.gridOriginY=e}function hs(n,t,e,i){const s=d.thickness,r=e-2*s;Un({x:n,y:t,w:s,h:i,kind:"upright",autoThickness:"width"}),Un({x:n+e-s,y:t,w:s,h:i,kind:"upright",autoThickness:"width"}),Un({x:n+s,y:t,w:r,h:s,kind:"shelf",autoThickness:"height"}),Un({x:n+s,y:t+i-s,w:r,h:s,kind:"shelf",autoThickness:"height"})}function fa(n,t,e,i){Un({x:n,y:t,w:e,h:i,kind:"back",autoThickness:"none"})}function pa(n,t,e){const i=d.thickness;Un({x:n+i,y:t,w:e-2*i,h:i,kind:"shelf",autoThickness:"height"})}function Bx(n,t,e){const i=d.thickness;Un({x:n,y:t,w:i,h:e,kind:"upright",autoThickness:"width"})}function kx(n,t=!0){const e=d.thickness,i=0;if(n==="complex"){zx(ux,Mc(n),t);return}if(Ox(t,i,0),n==="cabinet"&&(hs(i,-560,820,560),pa(i,-285,820)),n==="bookcase"&&(hs(i,-1280,760,1280),[320,560,800,1040].forEach(o=>pa(i,-1280+o,760)),fa(i,-1280,760,1280)),n==="base-cabinet"){const o=i+410-e/2,c=-360;hs(i,-720,820,720),Un({x:i+e,y:c,w:o-i-e,h:e,kind:"shelf",autoThickness:"height"}),Un({x:o+e,y:c,w:i+820-e-(o+e),h:e,kind:"shelf",autoThickness:"height"}),Bx(o,-720+e,720-2*e),fa(i,-720,820,720)}n==="wall-cabinet"&&(hs(i,-640,720,640),pa(i,-325,720),fa(i,-640,720,640)),n==="simple-box"&&hs(i,-360,520,360),Gn([1],1),d.lastSnap=Mc(n),Wo()}function Mc(n){return{cabinet:N("templates.cabinet"),bookcase:N("templates.bookcase"),"base-cabinet":N("templates.baseCabinet"),"wall-cabinet":N("templates.wallCabinet"),"simple-box":N("templates.simpleBox"),complex:N("templates.complex")}[n]}function zx(n,t,e){try{const i=JSON.parse(n);if(!Go(i))throw new Error(N("status.unsupportedTemplateFile"));Ts({...i,projectName:t},e),d.lastSnap=t,Wo()}catch{d.lastSnap=N("status.couldNotCreateTemplate"),Sn(N("status.couldNotCreateTemplate")),we()}}function Nh(n=!0){n&&ee(),d.projectName="",d.boards=[],d.anchors=[],d.layoutAnchors=[],d.measurements=[],d.selectedId=null,d.selectedIds=[],d.selectedMeasurementId=null,d.nextId=1,d.nextAnchorId=1,d.nextLayoutAnchorId=1,d.nextMeasurementId=1,d.dragging=null,d.resizing=null,d.measurementDragging=null,d.panning=null,d.selectionBox=null,d.snapGuides=[],d.tool="select",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.gridOriginX=0,d.gridOriginY=0,f0(),d.lastSnap=N(n?"status.newProject":"common.ready"),Nt()}function Gx(){if(!(!!d.projectName||d.boards.length>0||d.measurements.length>0)){d.lastSnap=N("status.readyForNewProject"),we();return}window.confirm(N("dialogs.newProjectConfirm"))&&(Nh(),Sn(N("status.newProjectReady")))}function Nt(){gu(d.boards),Vx(),Hx(),o0(),i0(),we(),s0(),r0(),a0(),Fh(),Yx()}function Fh(){w.rightPanelTools.hidden=Jn,w.woodOrderPanel.hidden=!Jn,w.woodOrderToggleBtn.classList.toggle("active",Jn),w.woodOrderToggleBtn.setAttribute("aria-pressed",String(Jn)),w.woodOrderToggleBtn.title=N(Jn?"workspace.hideWoodOrder":"workspace.showWoodOrder"),w.woodOrderToggleBtn.setAttribute("aria-label",N(Jn?"workspace.hideWoodOrder":"workspace.showWoodOrder"))}function Hx(){w.templateChooser.hidden=d.boards.length>0||d.measurements.length>0}function Vx(){if(Ji==="3d"){No.draw();return}Ah.draw()}function zo(){if(Ji==="3d"){No.resize();return}Ah.resize()}function Wx(n){Ji!==n&&(Ji=n,w.canvasWrap.dataset.view=n,w.view3dBtn.classList.toggle("active",n==="3d"),w.view3dBtn.setAttribute("aria-pressed",String(n==="3d")),d.lastSnap=N(n==="3d"?"status.view3d":"status.sketchView"),window.requestAnimationFrame(()=>{zo(),we()}))}function Xx(n){return JSON.parse(JSON.stringify(n))}function ee(){qi.push(bs()),qi.length>fx&&qi.shift(),Ar.length=0}function Oh(){const n=qi.pop();if(!n){d.lastSnap=N("status.nothingToUndo"),we();return}Ar.push(bs()),Ts(n,!1),d.lastSnap=N("status.undone"),we()}function ho(){const n=Ar.pop();if(!n){d.lastSnap=N("status.nothingToRedo"),we();return}qi.push(bs()),Ts(n,!1),d.lastSnap=N("status.redone"),we()}function bs(){return Xx({schemaVersion:1,version:gc,appVersion:gc,projectName:d.projectName,boards:d.boards,anchors:d.anchors,layoutAnchors:d.layoutAnchors,measurements:d.measurements,materials:d.materials,selectedId:d.selectedId,selectedIds:d.selectedIds,selectedMeasurementId:d.selectedMeasurementId,nextId:d.nextId,nextAnchorId:d.nextAnchorId,nextLayoutAnchorId:d.nextLayoutAnchorId,nextMeasurementId:d.nextMeasurementId,thickness:d.thickness,depth:d.depth,grid:d.grid,gridOriginX:d.gridOriginX,gridOriginY:d.gridOriginY,snap:d.snap,showDimensions:d.showDimensions,showFrontPanels:d.showFrontPanels,scale:d.scale,panX:d.panX,panY:d.panY})}function Ts(n,t=!0){var i,s,r;t&&ee(),d.projectName=Bh(n.projectName),d.materials=vx(n.materials),d.boards=(n.boards??[]).map(Ax),d.anchors=Mx(n.anchors),d.layoutAnchors=Sx(n.layoutAnchors),d.measurements=(n.measurements??[]).map((a,o)=>({...a,name:Tx(a.name,a.id),displayOffset:Fx(a.displayOffset,o)}));const e=(i=n.selectedIds)!=null&&i.length?n.selectedIds:n.selectedId?[n.selectedId]:[];d.selectedMeasurementId=null,Gn(e,n.selectedId),e.length||Es(n.selectedMeasurementId??null),d.nextId=n.nextId??wx(d.boards),d.nextAnchorId=n.nextAnchorId??Cx(d.anchors),d.nextLayoutAnchorId=n.nextLayoutAnchorId??Ix(d.layoutAnchors),d.nextMeasurementId=n.nextMeasurementId??Rx(d.measurements),d.thickness=_n(n.thickness,d.thickness),d.depth=_n(n.depth,d.depth),d.grid=n.grid??d.grid,d.gridOriginX=n.gridOriginX??((s=Bn(d.boards))==null?void 0:s.left)??d.gridOriginX,d.gridOriginY=n.gridOriginY??((r=Bn(d.boards))==null?void 0:r.top)??d.gridOriginY,d.snap=n.snap??d.snap,d.showDimensions=n.showDimensions??d.showDimensions,d.showFrontPanels=n.showFrontPanels??d.showFrontPanels,d.scale=n.scale??d.scale,d.panX=n.panX??d.panX,d.panY=n.panY??d.panY,d.dragging=null,d.resizing=null,d.measurementDragging=null,d.panning=null,d.selectionBox=null,d.snapGuides=[],d.tool="select",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,Hh(),Nt()}function Go(n){return(n.schemaVersion??(n.version===1?1:void 0))===1&&Array.isArray(n.boards)}function Yx(){try{localStorage.setItem(wh,JSON.stringify(bs()))}catch{}}function qx(){try{const n=localStorage.getItem(wh);if(!n)return!1;const t=JSON.parse(n);if(!Go(t))throw new Error("Unsupported project file");return Ts(t,!1),d.lastSnap=N("status.restoredAutosave"),we(),!0}catch{return d.lastSnap=N("status.couldNotRestoreAutosave"),we(),!1}}function $x(){qx()||Nh(!1)}function jx(){const n=JSON.stringify(bs(),null,2);Gh(n,"application/json",`${zh()}-${kh()}.mebel`),d.lastSnap=N("status.projectExported"),Sn(N("status.savedProject")),we()}function Bh(n){return typeof n=="string"?n.trim().slice(0,80):""}function kh(n=new Date){return n.toISOString().replace(/\.\d{3}Z$/,"Z").replace(/:/g,"-")}function zh(){return d.projectName.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)||"mebel-maker"}function Gh(n,t,e){const i=new Blob([n],{type:t}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=e,document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(s)}function Kx(){w.projectFileInput.value="",w.projectFileInput.click(),Sn(N("status.chooseProjectFile"))}function Zx(n){const t=new FileReader;t.addEventListener("load",()=>{try{const e=JSON.parse(String(t.result??""));if(!Go(e))throw new Error("Unsupported project file");Ts(e),d.lastSnap=N("status.projectImported"),Sn(N("status.loadedProject")),we()}catch{d.lastSnap=N("status.couldNotImportProject"),Sn(N("status.couldNotLoadProject")),we()}}),t.addEventListener("error",()=>{d.lastSnap=N("status.couldNotReadFile"),Sn(N("status.couldNotReadFile")),we()}),t.readAsText(n)}function Sn(n){window.clearTimeout(_c),w.notificationToast.textContent=n,w.notificationToast.hidden=!1,_c=window.setTimeout(()=>{w.notificationToast.hidden=!0},2400)}function Hh(){w.projectNameInput.value=d.projectName,w.thicknessInput.value=String(d.thickness),w.layoutAnchorThicknessInput.value=String(d.thickness),w.depthInput.value=String(d.depth),w.gridInput.value=String(d.grid),w.snapToggle.checked=d.snap,w.dimToggle.checked=d.showDimensions,w.frontLayerToggle.checked=d.showFrontPanels}function Pn(n,t){if(!n.length)return null;const e=t(n[0]);return n.every(i=>t(i)===e)?e:null}function ms(n,t){return d.layoutAnchors.filter(e=>e.boardId===n&&(!t||e.axis===t)).sort((e,i)=>e.offset-i.offset)}function Jx(n){return n.autoThickness==="width"?"y":"x"}function Vh(){const n=Xo();w.layoutAnchorStartLabel.textContent=N(n==="x"?"inspector.leftEdge":"inspector.topEdge"),w.layoutAnchorEndLabel.textContent=N(n==="x"?"inspector.rightEdge":"inspector.bottomEdge")}function uo(){const n=w.layoutAnchorBalanceInput.disabled||!w.layoutAnchorBalanceInput.checked;w.layoutAnchorStartInput.disabled=n,w.layoutAnchorEndInput.disabled=n,w.layoutAnchorThicknessInput.disabled=n}function Hi(n,t,e=N("common.mixed")){n.value=t??"",n.placeholder=t===null?e:""}function pi(n,t){n.checked=t??!1,n.indeterminate=t===null}function Wh(n,t){n.addEventListener("change",t,Tt),n.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),n.blur())},Tt)}function Qx(n){w.duplicateBtn.disabled=n,w.rotateBtn.disabled=n,w.measureWidthBtn.disabled=n,w.measureHeightBtn.disabled=n}function we(){var c;const n=tn(d),t=en(d),e=wc(d),i=Bn(t),s=t.length>0,r=t.length>1;if(w.emptySelection.hidden=s,w.inspector.hidden=!s,w.selectionStatus.textContent=r&&i?`${N("status.boardsSelected",{count:t.length})} · ${Ut(i.w)} × ${Ut(i.h)}`:n?pu(n):e?`${N("workspace.measureName")} ${e.name}`:N("workspace.noBoardSelected"),w.snapStatus.textContent=d.lastSnap,t0(),w.measureModeBtn.classList.toggle("active",d.tool==="measure"),w.undoBtn.disabled=!qi.length,w.redoBtn.disabled=!Ar.length,Qx(!s),w.deleteBtn.disabled=!s&&!e,w.deleteBtn.title=N(e?"workspace.deleteSelectedMeasurement":"workspace.deleteSelectedBoards"),w.deleteBtn.setAttribute("aria-label",N(e?"workspace.deleteSelectedMeasurement":"workspace.deleteSelectedBoards")),Lt.classList.toggle("measure-mode",d.tool==="measure"),d.tool==="measure"&&(Lt.style.cursor=""),w.wInput.disabled=!1,w.hInput.disabled=!1,w.nameInput.disabled=!1,w.layoutAnchorAxisInput.disabled=!n||r,w.layoutAnchorCountInput.disabled=!n||r,w.layoutAnchorBalanceInput.disabled=!n||r,w.layoutAnchorApplyBtn.disabled=!n||r,w.layoutAnchorClearBtn.disabled=!n||r||ms(n.id).length===0,(!n||r)&&(w.layoutAnchorSummary.textContent=N("inspector.noLayoutAnchors")),w.materialLabelSwatch.style.background=n&&!r?xc(n.materialId):"transparent",!s){uo();return}if(r)w.nameInput.disabled=!0,Hi(w.nameInput,null,N("status.boardsSelected",{count:t.length})),Hi(w.xInput,i?String(Math.round(i.left)):null),Hi(w.yInput,i?String(Math.round(co(i.top))):null),Hi(w.wInput,null),Hi(w.hInput,null),w.wInput.disabled=!0,w.hInput.disabled=!0;else if(n){const l=((c=ms(n.id).at(0))==null?void 0:c.axis)??Jx(n),u=ms(n.id,l);w.nameInput.value=n.name,w.nameInput.placeholder="",w.xInput.value=String(Math.round(n.x)),w.yInput.value=String(Math.round(co(n.y))),w.wInput.value=String(Math.round(n.w)),w.hInput.value=String(Math.round(n.h)),w.wInput.placeholder=n.autoThickness==="width"&&n.thicknessOverride===null?N("common.global"):"",w.hInput.placeholder=n.autoThickness==="height"&&n.thicknessOverride===null?N("common.global"):"",n.autoThickness==="width"&&n.thicknessOverride===null&&(w.wInput.value=""),n.autoThickness==="height"&&n.thicknessOverride===null&&(w.hInput.value=""),w.depthOverrideInput.value=n.depthOverride===null?"":String(n.depthOverride),w.materialInput.value=n.materialId,w.layoutAnchorAxisInput.value=l,Vh(),u.length&&(w.layoutAnchorCountInput.value=String(u.length)),w.layoutAnchorThicknessInput.value||(w.layoutAnchorThicknessInput.value=String(d.thickness)),w.layoutAnchorSummary.textContent=u.length?u.map(f=>Ut(f.offset)).join(", "):N("inspector.noLayoutAnchors"),w.wInput.disabled=!1,w.hInput.disabled=!1}const a=Pn(t,l=>l.materialId),o=Pn(t,l=>l.depthOverride===null?"":String(l.depthOverride));w.materialInput.value=a??"",Vo(),Hi(w.depthOverrideInput,o,N("common.mixed")),w.materialLabelSwatch.style.background=a?xc(a):"transparent",pi(w.laminateLeftInput,Pn(t,l=>String(l.laminate.left))===null?null:t[0].laminate.left),pi(w.laminateRightInput,Pn(t,l=>String(l.laminate.right))===null?null:t[0].laminate.right),pi(w.laminateTopInput,Pn(t,l=>String(l.laminate.top))===null?null:t[0].laminate.top),pi(w.laminateBottomInput,Pn(t,l=>String(l.laminate.bottom))===null?null:t[0].laminate.bottom),pi(w.laminateFrontInput,Pn(t,l=>String(l.laminate.front))===null?null:t[0].laminate.front),pi(w.laminateBackInput,Pn(t,l=>String(l.laminate.back))===null?null:t[0].laminate.back),pi(w.ignoreOrderInput,Pn(t,l=>String(l.ignoreInOrder))===null?null:t[0].ignoreInOrder),uo()}function t0(){const n=e0(118/d.scale),t=Math.max(28,Math.min(90,n*d.scale));w.overlayScaleBar.style.setProperty("--scale-width",`${t}px`),w.overlayScaleLabel.textContent=Ut(n),w.overlayZoomLabel.textContent=N("workspace.zoom",{percent:Math.round(d.scale*100)})}function e0(n){const e=10**Math.floor(Math.log10(Math.max(1,n))),i=n/e;return i>=5?5*e:i>=2?2*e:e}function Ho(){w.materialSelectList.hidden=!0,w.materialSelectButton.setAttribute("aria-expanded","false")}function Vo(){const n=w.materialInput.value?Dx(w.materialInput.value):null;w.materialSelectText.textContent=n?`${Wi(n)} (${n.color.toUpperCase()})`:N("inspector.mixedMaterials"),w.materialSelectSwatch.style.background=n?n.color:"linear-gradient(135deg, #d9b77e 0 50%, #7a4f34 50% 100%)",w.materialSelectSwatch.classList.toggle("mixed",!n),w.materialSelectList.querySelectorAll("[data-material-id]").forEach(t=>{const e=t.dataset.materialId===w.materialInput.value;t.classList.toggle("selected",e),t.setAttribute("aria-selected",String(e))})}function n0(){const n=w.materialSelectList.hidden;w.materialSelectList.hidden=!n,w.materialSelectButton.setAttribute("aria-expanded",String(n)),n&&Vo()}function Xh(n){Jn=n,d.lastSnap=N(n?"status.woodOrder":"status.properties"),Fh(),we()}function Yh(n){const t=d.boards.find(e=>e.id===n);t&&(Gn([t.id],t.id),d.tool="select",d.lastSnap=N("status.selected",{name:t.name}),Nt())}function i0(){w.materialInput.innerHTML=`
    <option value="">${Pe(N("inspector.mixedMaterials"))}</option>
  `+d.materials.map(n=>`
    <option value="${Pe(n.id)}">${Pe(Wi(n))} (${Pe(n.color.toUpperCase())})</option>
  `).join(""),w.materialSelectList.innerHTML=d.materials.map(n=>`
    <button
      class="material-select-option"
      type="button"
      role="option"
      data-material-id="${Pe(n.id)}"
      title="${Pe(Wi(n))} ${Pe(n.color.toUpperCase())}"
      aria-selected="false"
    >
      <span class="material-select-swatch" style="background: ${n.color}"></span>
      <span class="material-select-option-copy">
        <strong>${Pe(Wi(n))}</strong>
        <small>${Pe(n.color.toUpperCase())}</small>
      </span>
    </button>
  `).join(""),w.materialList.innerHTML=d.materials.map(n=>`
    <div class="material-card">
      <span class="material-swatch" style="background: ${n.color}"></span>
      <strong>${Pe(Wi(n))}</strong>
    </div>
  `).join(""),Vo()}function s0(){const n=tn(d),t=en(d),e=t.length>1?t:n?Cc(d,n.group):d.boards,i=Bn(e),s=Ic(e,d.thickness),r=[];t.length>1&&i?r.push(`
      <div class="metric-card">
        <strong>${N("status.boardsSelected",{count:t.length})}</strong>
        <span>${N("metrics.selection")}: ${Ut(i.w)} × ${Ut(i.h)}</span>
        <span>${N("metrics.position")}: X ${Ut(i.left)}, Y ${Ut(i.top)}</span>
      </div>
    `):n&&r.push(`
      <div class="metric-card">
        <strong>${n.name}</strong>
        <span>${N("metrics.board")}: ${Ut(n.w)} × ${Ut(n.h)} × ${Ut(ni(n,d.depth))}</span>
        <span>${N("metrics.position")}: X ${Ut(n.x)}, Y ${Ut(co(n.y))}</span>
      </div>
    `),i&&r.push(`
      <div class="metric-card">
        <strong>${t.length>1?N("pieces.selectedBoards"):n?N("pieces.connectedGroup",{group:n.group}):N("pieces.wholeSketch")}</strong>
        <span>${N("metrics.outer")}: ${Ut(i.w)} × ${Ut(i.h)}</span>
        <span>${N("metrics.inner")}: ${s!=null&&s.hasFrame?`${Ut(s.innerW)} × ${Ut(s.innerH)}`:N("metrics.needsOpposingFrameBoards")}</span>
        <span>${N("metrics.thicknessModel")}: ${Ut(d.thickness)}</span>
        <span>${N("metrics.defaultDepth")}: ${Ut(d.depth)}</span>
      </div>
    `),w.measureList.innerHTML=r.join("")||`<div class="empty-state">${Pe(N("metrics.addBoards"))}</div>`}function r0(){const n=Fc(d.boards);if(!n.length){w.warningList.innerHTML=`<div class="empty-state">${Pe(N("metrics.noOverlaps"))}</div>`;return}w.warningList.innerHTML=n.map(t=>{const[e,i]=t.boardIds.map(s=>{var r;return((r=d.boards.find(a=>a.id===s))==null?void 0:r.name)??wr(s)});return`
      <div class="warning-card">
        <strong>${N("metrics.overlap")}</strong>
        <span>${e} and ${i}</span>
        <span>${Ut(t.w)} × ${Ut(t.h)}</span>
      </div>
    `}).join("")}function a0(){w.cutList.innerHTML=Sc(d.boards.filter(n=>!n.ignoreInOrder),N("pieces.noBoardsInOrder")),w.ignoredCutList.innerHTML=Sc(d.boards.filter(n=>n.ignoreInOrder),N("pieces.noIgnoredBoards"))}function Sc(n,t){const e=new Map;return n.forEach(i=>{const s=`${Math.round(i.w)}×${Math.round(i.h)}×${ni(i,d.depth)}×${d.thickness}×${i.materialId}×${Dh(i.laminate)}`;e.set(s,[...e.get(s)??[],i])}),[...e.entries()].map(([i,s])=>{const[r,a,o,,c]=i.split("×"),l=Lx(s[0]);return`
      <div class="cut-card">
        <strong><span class="count">${s.length}×</span> ${r} × ${a} × ${o} mm</strong>
        <span>${N("metrics.material")}: ${Pe(ko(c))}</span>
        <span>${N("metrics.laminate")}: ${l}</span>
        <div class="cut-card-pieces">${s.map(u=>`
          <button class="cut-piece-button" type="button" data-board-id="${u.id}" title="${Pe(N("order.selectPiece",{name:u.name}))}">
            ${Pe(u.name)}
          </button>
        `).join("")}</div>
      </div>
    `}).join("")||`<div class="empty-state">${t}</div>`}function o0(){const n=tn(d);if(!n){w.anchorOverlay.innerHTML="";return}w.anchorOverlay.innerHTML=d.anchors.filter(t=>t.boardId===n.id).map(t=>{const e=l0(t);if(!e)return"";const i=_e(d,e.x,e.y);return`
        <button class="anchor-chip" data-remove-anchor="${t.id}" type="button" style="left: ${i.x}px; top: ${i.y-8}px" title="${Pe(N("anchors.removeAnchorTo",{target:Ec(t)}))}" aria-label="${Pe(N("anchors.removeAnchorTo",{target:Ec(t)}))}">
          ${yc()}
          <span class="visually-hidden">${N("anchors.removeAnchor")}</span>
        </button>
      `}).join("")+d.snapGuides.flatMap(t=>t.linkPoint?[t.linkPoint]:[]).map(t=>{const e=_e(d,t.x,t.y);return`
        <span class="anchor-chip anchor-chip-preview" style="left: ${e.x}px; top: ${e.y-8}px" title="${Pe(N("anchors.willLink"))}" aria-hidden="true">
          ${yc()}
        </span>
      `}).join("")}function yc(){return`
    <svg class="anchor-chip-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 7.5 L7 6 C5.5 4.5 3.2 4.5 1.7 6 C.2 7.5 .2 9.8 1.7 11.3 L4.7 14.3 C5.8 15.4 7.4 15.7 8.8 15.1"></path>
      <path d="M15.5 16.5 L17 18 C18.5 19.5 20.8 19.5 22.3 18 C23.8 16.5 23.8 14.2 22.3 12.7 L19.3 9.7 C18.2 8.6 16.6 8.3 15.2 8.9"></path>
      <path d="M9 15 L15 9"></path>
      <path d="M5 21 L19 3"></path>
    </svg>
  `}function Ec(n){const t=d.boards.find(e=>e.id===n.targetBoardId);return`${(t==null?void 0:t.name)??wr(n.targetBoardId)} ${Bo(n.targetEdge)}`}function l0(n){const t=d.boards.find(a=>a.id===n.boardId),e=d.boards.find(a=>a.id===n.targetBoardId);if(!t||!e)return null;const i=jh(t,n.edge);if(n.edge==="left"||n.edge==="right"){const a=Math.max(t.y,e.y),o=Math.min(t.y+t.h,e.y+e.h);return{x:i,y:a<=o?(a+o)/2:t.y+t.h/2}}const s=Math.max(t.x,e.x),r=Math.min(t.x+t.w,e.x+e.w);return{x:s<=r?(s+r)/2:t.x+t.w/2,y:i}}function qh(n){const t=d.boards.find(e=>e.id===n);!t||t.kind==="back"||t.kind==="front"||(d.anchors=d.anchors.filter(e=>e.boardId!==n),d.boards.forEach(e=>{e.id===t.id||e.kind==="back"||e.kind==="front"||u0(t,e).forEach(([i,s])=>c0(t.id,i,e.id,s))}))}function c0(n,t,e,i){const s=d.boards.find(a=>a.id===n);!s||!h0(s,t)||d.anchors.some(a=>a.boardId===n&&a.edge===t&&a.targetBoardId===e&&a.targetEdge===i)||(d.anchors.push({id:d.nextAnchorId,boardId:n,edge:t,targetBoardId:e,targetEdge:i}),d.nextAnchorId+=1)}function h0(n,t){return n.kind==="front"?!1:n.autoThickness==="width"?t==="top"||t==="bottom":n.autoThickness==="height"?t==="left"||t==="right":!0}function u0(n,t){const i=[];return Math.abs(n.x-(t.x+t.w))<=.5&&ir(n.y,n.y+n.h,t.y,t.y+t.h)&&i.push(["left","right"]),Math.abs(n.x+n.w-t.x)<=.5&&ir(n.y,n.y+n.h,t.y,t.y+t.h)&&i.push(["right","left"]),Math.abs(n.y-(t.y+t.h))<=.5&&ir(n.x,n.x+n.w,t.x,t.x+t.w)&&i.push(["top","bottom"]),Math.abs(n.y+n.h-t.y)<=.5&&ir(n.x,n.x+n.w,t.x,t.x+t.w)&&i.push(["bottom","top"]),i}function ir(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function Si(n,t=new Set){if(t.has(n))return;t.add(n),[...new Set(d.anchors.filter(i=>i.targetBoardId===n).map(i=>i.boardId))].forEach(i=>{$h(i),Si(i,t)})}function $h(n){const t=d.boards.find(i=>i.id===n);if(!t)return;const e=hr(t);d.anchors.filter(i=>i.boardId===n).forEach(i=>{const s=d.boards.find(r=>r.id===i.targetBoardId);s&&d0(e,i.edge,jh(s,i.targetEdge))}),fo(t,e)}function jh(n,t){return t==="left"?n.x:t==="right"?n.x+n.w:t==="top"?n.y:n.y+n.h}function d0(n,t,e){if(t==="left"){const i=n.x+n.w;n.x=e,n.w=Math.max(1,i-e)}if(t==="right"&&(n.w=Math.max(1,e-n.x)),t==="top"){const i=n.y+n.h;n.y=e,n.h=Math.max(1,i-e)}t==="bottom"&&(n.h=Math.max(1,e-n.y))}function Wo(){const n=Bn(d.boards),t=Lt.getBoundingClientRect();if(!n||t.width<1||t.height<1)return;const e=70,i=Math.max(1,t.width-e-Vi),s=Math.max(1,t.height-e-Vi);d.scale=Math.min(i/n.w,s/n.h),d.scale=Math.max(px,Math.min(gx,d.scale)),d.panX=Vi-n.left*d.scale,d.panY=t.height-Vi-n.bottom*d.scale,Nt()}function f0(){const n=Lt.getBoundingClientRect();d.scale=.62,d.panX=Vi,d.panY=n.height>1?n.height-Vi:420}function p0(n){if(n===d.thickness)return;ee();const t=d.thickness,e=d.boards.some(i=>i.autoThickness!=="none")?window.confirm(N("dialogs.updateThickness",{value:Ut(n)})):!1;d.thickness=n,_n(w.layoutAnchorThicknessInput.value,t)===t&&(w.layoutAnchorThicknessInput.value=String(n)),d.boards.forEach(i=>{const s=_0(i,t),r=e?n:s,a=r-s;i.autoThickness!=="none"&&(i.thicknessOverride=e?null:s),i.autoThickness==="width"&&(i.x>160&&(i.x-=a),i.w=r),i.autoThickness==="height"&&(i.x+=a,i.w=Math.max(r,i.w-a*2),i.y>120&&(i.y-=a),i.h=r)}),d.boards.forEach(i=>$h(i.id)),d.lastSnap=e?N("status.allAutoThickness",{value:Ut(d.thickness)}):N("status.defaultThickness",{value:Ut(d.thickness)}),Nt()}function m0(n){if(n===d.depth)return;ee();const t=d.depth,e=d.boards.length>0?window.confirm(N("dialogs.updateDepth",{value:Ut(n)})):!1;d.depth=n,d.boards.length>0&&d.boards.forEach(i=>{i.depthOverride=e?null:g0(i,t)}),d.lastSnap=e?N("status.allPiecesDepth",{value:Ut(d.depth)}):N("status.defaultDepth",{value:Ut(d.depth)}),Nt()}function g0(n,t){return n.depthOverride??t}function _0(n,t){return n.thicknessOverride??t}function x0(){const n=Kh();Gh(n,"text/csv;charset=utf-8",`${zh()}-pieces-${kh()}.csv`),d.lastSnap=N("status.pieceListCsvExported"),Sn(N("status.savedPieceListCsv")),we()}async function v0(){try{await S0(Kh()),d.lastSnap=N("status.pieceListCsvCopied"),Sn(N("status.copiedPieceListCsv"))}catch{d.lastSnap=N("status.couldNotCopyCsv"),Sn(N("status.couldNotCopyCsv"))}we()}function Kh(){const n=[[N("order.csvQuantity"),N("order.csvThickness"),N("order.csvWidth"),N("order.csvHeight"),N("order.csvMaterial"),N("order.csvLaminateEdges"),N("order.csvPieces")]],t=new Map;return d.boards.filter(e=>!e.ignoreInOrder).forEach(e=>{const i=M0(e),s=`${i.thickness}×${i.width}×${i.height}×${e.materialId}×${Dh(e.laminate)}`;t.set(s,[...t.get(s)??[],e])}),t.forEach((e,i)=>{const[s,r,a,o]=i.split("×");n.push([String(e.length),s,r,a,ko(o),Px(e[0].laminate),e.map(c=>c.name).join("; ")])}),n.map(e=>e.map(y0).join(",")).join(`
`)}function M0(n){const t=Math.round(ma(n,d.thickness)),e=Math.round(ni(n,d.depth));return n.autoThickness==="width"?{thickness:t,width:e,height:Math.round(n.h)}:n.autoThickness==="height"?{thickness:t,width:Math.round(n.w),height:e}:{thickness:t,width:Math.round(n.w),height:Math.round(n.h)}}async function S0(n){var a;if((a=window.navigator.clipboard)!=null&&a.writeText)try{await window.navigator.clipboard.writeText(n);return}catch{}let t=!1;const e=o=>{var c;(c=o.clipboardData)==null||c.setData("text/plain",n),o.preventDefault(),t=!0};document.addEventListener("copy",e);const i=document.execCommand("copy");if(document.removeEventListener("copy",e),i&&t)return;const s=document.createElement("textarea");s.value=n,s.style.left="-9999px",s.style.position="fixed",document.body.append(s),s.focus(),s.select();const r=document.execCommand("copy");if(s.remove(),!r)throw new Error("Clipboard copy failed")}function y0(n){return/[",\n]/.test(n)?`"${n.replace(/"/g,'""')}"`:n}function E0(n){const t=tn(d),e=en(d);if(!t||!e.length)return;const i=n==null?void 0:n.target;if(i===w.wInput&&t.autoThickness==="width"&&w.wInput.value===""){ee(),t.thicknessOverride=null,t.w=d.thickness,d.lastSnap=N("status.widthUsesGlobal",{value:Ut(d.thickness)}),Si(t.id),Nt();return}if(i===w.hInput&&t.autoThickness==="height"&&w.hInput.value===""){ee(),t.thicknessOverride=null,t.h=d.thickness,d.lastSnap=N("status.heightUsesGlobal",{value:Ut(d.thickness)}),Si(t.id),Nt();return}if(i===w.depthOverrideInput&&w.depthOverrideInput.value===""){ee(),e.forEach(s=>{s.depthOverride=null}),d.lastSnap=N("status.depthUsesGlobal",{value:Ut(d.depth)}),Nt();return}if(!(i instanceof HTMLInputElement&&i.type==="number"&&i.value==="")){if(ee(),e.length>1){const s=Bn(e);if(s&&(i===w.xInput||i===w.yInput)){const r=i===w.xInput?Number(w.xInput.value):s.left,a=i===w.yInput?vc(Number(w.yInput.value)):s.top;L0(e,(Number.isFinite(r)?r:s.left)-s.left,(Number.isFinite(a)?a:s.top)-s.top),d.lastSnap=N("status.selectionMoved")}i===w.depthOverrideInput&&(e.forEach(r=>{r.depthOverride=_n(w.depthOverrideInput.value,ni(r,d.depth))}),d.lastSnap=N("status.depthSetOnBoards",{count:e.length}))}else t.name=w.nameInput.value.trim()||t.name,t.x=Number(w.xInput.value)||0,t.y=vc(Number(w.yInput.value)||0),t.w=t.autoThickness==="width"&&w.wInput.value===""?d.thickness:Math.max(1,Number(w.wInput.value)||1),t.h=t.autoThickness==="height"&&w.hInput.value===""?d.thickness:Math.max(1,Number(w.hInput.value)||1),t.autoThickness==="width"&&(t.thicknessOverride=w.wInput.value===""?null:_n(w.wInput.value,ma(t,d.thickness))),t.autoThickness==="height"&&(t.thicknessOverride=w.hInput.value===""?null:_n(w.hInput.value,ma(t,d.thickness))),t.depthOverride=w.depthOverrideInput.value===""?null:_n(w.depthOverrideInput.value,ni(t,d.depth)),Si(t.id);Nt()}}function Zh(){const n=en(d);!n.length||!w.materialInput.value||n.every(t=>t.materialId===w.materialInput.value)||(ee(),n.forEach(t=>{t.materialId=w.materialInput.value}),d.lastSnap=n.length>1?N("status.materialSetOnBoards",{count:n.length}):N("status.material",{name:ko(n[0].materialId)}),Nt())}function b0(){const n=w.materialNameInput.value.trim();if(!n){d.lastSnap=N("status.nameMaterialFirst"),we();return}ee();const t={id:Ux(n),name:n,color:Nx(w.materialColorInput.value)};d.materials.push(t),w.materialNameInput.value="",w.materialColorInput.value="#c99756",d.lastSnap=N("status.materialAdded",{name:t.name}),Nt()}function T0(){const n=en(d);n.length&&(ee(),n.forEach(t=>{t.laminate={left:w.laminateLeftInput.checked,right:w.laminateRightInput.checked,top:w.laminateTopInput.checked,bottom:w.laminateBottomInput.checked,front:w.laminateFrontInput.checked,back:w.laminateBackInput.checked}}),d.lastSnap=n.length>1?N("status.laminateSetOnBoards",{count:n.length}):N("status.laminateUpdated"),Nt())}function A0(){const n=en(d);n.length&&(ee(),n.forEach(t=>{t.ignoreInOrder=w.ignoreOrderInput.checked}),d.lastSnap=w.ignoreOrderInput.checked?N("status.removedFromOrder"):N("status.addedToOrder"),Nt())}function Xo(){return w.layoutAnchorAxisInput.value==="y"?"y":"x"}function w0(){const n=tn(d);if(!n)return;Vh();const t=Xo(),e=ms(n.id,t);w.layoutAnchorCountInput.value=e.length?String(e.length):w.layoutAnchorCountInput.value,w.layoutAnchorSummary.textContent=e.length?e.map(i=>Ut(i.offset)).join(", "):N("inspector.noLayoutAnchors")}function R0(n,t,e){const i=t==="x"?n.w:n.h;if(!w.layoutAnchorBalanceInput.checked)return Array.from({length:e},(l,u)=>Math.round(i*(u+1)/(e+1)));const s=Math.max(1,_n(w.layoutAnchorThicknessInput.value,d.thickness)),r=w.layoutAnchorStartInput.value==="inside"?s:0,a=w.layoutAnchorEndInput.value==="inside"?s:0,c=(i-r-a-e*s)/(e+1);return c<0?null:Array.from({length:e},(l,u)=>Math.round(r+c*(u+1)+s*u+s/2))}function C0(){const n=tn(d);if(!n||en(d).length>1)return;const t=Xo(),e=Math.max(1,Math.min(20,_n(w.layoutAnchorCountInput.value,4))),i=R0(n,t,e);if(!i){d.lastSnap=N("status.notEnoughSpan"),we();return}ee(),d.layoutAnchors=d.layoutAnchors.filter(s=>!(s.boardId===n.id&&s.axis===t)),i.forEach(s=>{d.layoutAnchors.push({id:d.nextLayoutAnchorId,boardId:n.id,axis:t,offset:s}),d.nextLayoutAnchorId+=1}),d.lastSnap=w.layoutAnchorBalanceInput.checked?N("status.balancedAnchorsAdded",{count:e}):N("status.layoutAnchorsAdded",{count:e}),Nt()}function I0(){const n=tn(d);!n||!ms(n.id).length||(ee(),d.layoutAnchors=d.layoutAnchors.filter(t=>t.boardId!==n.id),d.lastSnap=N("status.layoutAnchorsCleared"),Nt())}function Jh(n,t){const e=xx[n];if(!e)return;const i=t??P0();d.boards.length||(d.gridOriginX=i.x,d.gridOriginY=i.y),Uh({x:yi(d,i.x-e.w()/2,"x"),y:yi(d,i.y-e.h()/2,"y"),w:e.w(),h:e.h(),kind:e.kind,autoThickness:e.autoThickness})}function P0(){const n=Lt.getBoundingClientRect();return ii(d,n.width/2,n.height/2)}function fo(n,t){n.x=Math.round(t.x),n.y=Math.round(t.y),n.w=Math.round(t.w),n.h=Math.round(t.h)}function L0(n,t,e){n.forEach(i=>{i.x=Math.round(i.x+t),i.y=Math.round(i.y+e)}),n.forEach(i=>Si(i.id))}function po(n,t,e){ee();const i=d.nextMeasurementId;d.measurements.push({id:i,name:Oo(i),a:n,b:t,axis:e,displayOffset:xo({},d.measurements.length)}),d.nextMeasurementId+=1,Es(i),d.tool="select",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.lastSnap=N("status.measurementAdded"),Nt()}function Qh(n){const t=tn(d);if(t){if(n==="horizontal"){po({kind:"board-edge",boardId:t.id,edge:"left",offset:t.h/2},{kind:"board-edge",boardId:t.id,edge:"right",offset:t.h/2},"horizontal");return}po({kind:"board-edge",boardId:t.id,edge:"top",offset:t.w/2},{kind:"board-edge",boardId:t.id,edge:"bottom",offset:t.w/2},"vertical")}}function D0(n){const t=Dc(d,n);if(!d.pendingMeasurementAnchor){d.pendingMeasurementAnchor=t,d.previewMeasurementAnchor=null,d.lastSnap=t.kind==="grid"?N("status.gridAnchorSet"):N("status.edgeAnchorSet"),Nt();return}const e=vi(d,d.pendingMeasurementAnchor),i=vi(d,t);!e||!i||po(d.pendingMeasurementAnchor,t,Uc(e,i))}function U0(){const n=Mi();n.size&&(ee(),d.boards=d.boards.filter(t=>!n.has(t.id)),d.anchors=d.anchors.filter(t=>!n.has(t.boardId)&&!n.has(t.targetBoardId)),d.layoutAnchors=d.layoutAnchors.filter(t=>!n.has(t.boardId)),d.measurements=d.measurements.filter(t=>![t.a,t.b].some(e=>e.kind==="board-edge"&&n.has(e.boardId))),d.selectedMeasurementId&&!d.measurements.some(t=>t.id===d.selectedMeasurementId)&&(d.selectedMeasurementId=null),Lh(),d.lastSnap=n.size>1?N("status.boardsDeleted",{count:n.size}):N("status.boardDeleted"),Nt())}function N0(n){d.measurements.some(e=>e.id===n)&&(ee(),d.measurements=d.measurements.filter(e=>e.id!==n),d.selectedMeasurementId===n&&(d.selectedMeasurementId=null),vs===n&&Ms(),d.lastSnap=N("status.measurementDeleted"),Nt())}function Ms(){vs=null,w.measureRenameForm.hidden=!0}function F0(n){const t=w.measureRenameForm.parentElement;if(!t)return;const e=t.getBoundingClientRect(),i=240,s=108,r=Math.max(8,Math.min(n.clientX-e.left-i/2,e.width-i-8)),a=Math.max(8,Math.min(n.clientY-e.top-s-10,e.height-s-8));w.measureRenameForm.style.left=`${r}px`,w.measureRenameForm.style.top=`${a}px`}function O0(n,t){const e=d.measurements.find(i=>i.id===n);e&&(vs=e.id,Es(e.id),F0(t),w.measureRenameInput.value=e.name,w.measureRenameForm.hidden=!1,d.lastSnap=N("status.renameMeasurement"),Nt(),window.requestAnimationFrame(()=>{w.measureRenameInput.focus(),w.measureRenameInput.select()}))}function tu(){if(vs===null)return;const n=d.measurements.find(i=>i.id===vs);if(!n){Ms();return}const t=w.measureRenameInput.value.trim(),e=t||Oo(n.id);Ms(),n.name!==e&&(ee(),n.name=e,Es(n.id),d.lastSnap=N(t?"status.measurementNamed":"status.measurementReset"),Nt())}function eu(){const n=wc(d);if(n){N0(n.id);return}U0()}function nu(){var s;const n=en(d);if(!n.length)return;ee();const t=new Set(n.map(r=>r.id)),e=new Map,i=n.map(r=>{const a=d.nextId;return d.nextId+=1,e.set(r.id,a),{...r,id:a,name:wr(a),x:r.x+35,y:r.y+35,group:0}});d.boards.push(...i),d.anchors.filter(r=>t.has(r.boardId)&&t.has(r.targetBoardId)).forEach(r=>{const a=e.get(r.boardId),o=e.get(r.targetBoardId);!a||!o||(d.anchors.push({...r,id:d.nextAnchorId,boardId:a,targetBoardId:o}),d.nextAnchorId+=1)}),d.layoutAnchors.filter(r=>t.has(r.boardId)).forEach(r=>{const a=e.get(r.boardId);a&&(d.layoutAnchors.push({...r,id:d.nextLayoutAnchorId,boardId:a}),d.nextLayoutAnchorId+=1)}),Gn(i.map(r=>r.id),((s=i[0])==null?void 0:s.id)??null),d.lastSnap=i.length>1?N("status.boardsDuplicated",{count:i.length}):N("status.boardDuplicated"),Nt()}function B0(n){return n==="width"?"height":n==="height"?"width":"none"}function k0(n){return n==="upright"?"shelf":n==="shelf"?"upright":n}function iu(){const n=en(d);if(!n.length)return;ee();const t=new Set(n.map(e=>e.id));n.forEach(e=>{const i=e.x+e.w/2,s=e.y+e.h/2,r=e.h,a=e.w;e.x=Math.round(i-r/2),e.y=Math.round(s-a/2),e.w=Math.round(r),e.h=Math.round(a),e.autoThickness=B0(e.autoThickness),e.kind=k0(e.kind),d.layoutAnchors.filter(o=>o.boardId===e.id).forEach(o=>{o.axis=o.axis==="x"?"y":"x"})}),d.anchors=d.anchors.filter(e=>!t.has(e.boardId)&&!t.has(e.targetBoardId)),d.lastSnap=n.length>1?N("status.rotatedBoards",{count:n.length}):N("status.rotated90"),Nt()}function z0(n){return n instanceof HTMLElement?n instanceof HTMLInputElement?["email","number","password","search","tel","text","url"].includes(n.type):n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement||n.isContentEditable:!1}function Yo(n){return{n:"ns-resize",s:"ns-resize",e:"ew-resize",w:"ew-resize",ne:"nesw-resize",sw:"nesw-resize",nw:"nwse-resize",se:"nwse-resize"}[n]}function bc(n){return n.shiftKey||n.metaKey||n.ctrlKey}function G0(n){return n.button===1||n.altKey}function H0(n,t){const e=Math.min(n.x,t.x),i=Math.min(n.y,t.y);return{x:e,y:i,w:Math.abs(n.x-t.x),h:Math.abs(n.y-t.y)}}function V0(n,t){return n.x<=t.x+t.w&&n.x+n.w>=t.x&&n.y<=t.y+t.h&&n.y+n.h>=t.y}function W0(n){return d.boards.filter(t=>t.kind==="front"&&!d.showFrontPanels?!1:V0(n,hr(t)))}function mo(n){if(d.tool==="measure"){Lt.style.cursor="";return}if(d.measurementDragging){Lt.style.cursor="move";return}if(Mo(d,n)){Lt.style.cursor="move";return}const t=tn(d);if(t){const e=Pc(d,t,n);if(e){Lt.style.cursor=Yo(e);return}}Lt.style.cursor=Rc(d,n)?"grab":"crosshair"}function X0(n){const t=d.measurementDragging;if(!t)return;const e=d.measurements.find(c=>c.id===t.id),i=d.measurements.findIndex(c=>c.id===t.id);if(!e||i<0)return;const s=vo(d,e,i);if(!s)return;const r=n.x-t.startPoint.x,a=n.y-t.startPoint.y,o=Math.hypot(r*d.scale,a*d.scale);!t.changed&&o>3&&(ee(),t.changed=!0),t.changed&&(e.displayOffset=Math.round(s.axis==="horizontal"?t.startOffset-a:t.startOffset+r),d.lastSnap=N("status.measurementDisplayMoved"),Lt.style.cursor="move",Nt())}function Y0(n){d.tool!=="measure"||!d.pendingMeasurementAnchor||(d.previewMeasurementAnchor=Dc(d,n),Nt())}Lt.addEventListener("pointerdown",n=>{const t=Lt.getBoundingClientRect(),e=ii(d,n.clientX-t.left,n.clientY-t.top);if(d.tool==="measure"){D0(e);return}if(G0(n)){d.panning={startX:n.clientX,startY:n.clientY,panX:d.panX,panY:d.panY},Lt.style.cursor="grabbing",Lt.setPointerCapture(n.pointerId);return}const i=tn(d);if(i){const a=Pc(d,i,e);if(a&&en(d).length<=1){ee(),d.resizing={id:i.id,handle:a,startPoint:e,startRect:hr(i)},d.lastSnap=N("status.resizing"),Lt.style.cursor=Yo(a),Lt.setPointerCapture(n.pointerId),Nt();return}}const s=Mo(d,e);if(s){const a=d.measurements.findIndex(o=>o.id===s.id);Es(s.id),d.measurementDragging={id:s.id,startPoint:e,startOffset:xo(s,a),changed:!1},d.lastSnap=N("status.measurementSelected"),Lt.style.cursor="move",Lt.setPointerCapture(n.pointerId),Nt();return}const r=Rc(d,e);if(r){if(bc(n)){bx(r.id),d.lastSnap=Mi().size>1?N("status.boardsSelected",{count:Mi().size}):N("status.selectionUpdated"),Nt();return}const a=Mi(),o=a.has(r.id)?[r.id,...[...a].filter(c=>c!==r.id)]:[r.id];Gn(o,r.id),ee(),d.dragging={ids:o,startPoint:e,startRects:o.flatMap(c=>{const l=d.boards.find(u=>u.id===c);return l?[{id:c,...hr(l)}]:[]})},Lt.style.cursor="grabbing",Lt.setPointerCapture(n.pointerId)}else d.selectionBox={start:e,current:e,additive:bc(n)},Lt.style.cursor="crosshair",Lt.setPointerCapture(n.pointerId);Nt()},Tt);Lt.addEventListener("dblclick",n=>{if(d.tool==="measure")return;const t=Lt.getBoundingClientRect(),e=ii(d,n.clientX-t.left,n.clientY-t.top),i=Mo(d,e);i&&(n.preventDefault(),O0(i.id,n))},Tt);Lt.addEventListener("pointermove",n=>{const t=Lt.getBoundingClientRect(),e=ii(d,n.clientX-t.left,n.clientY-t.top);if(d.tool==="measure"){Y0(e),mo(e);return}if(d.resizing){const f=d.boards.find(m=>{var x;return m.id===((x=d.resizing)==null?void 0:x.id)});if(!f)return;const h=xu(d,f,d.resizing.handle,d.resizing.startRect,d.resizing.startPoint,e);fo(f,h.rect),Si(f.id),d.snapGuides=h.guides,d.lastSnap=h.label,Lt.style.cursor=Yo(d.resizing.handle),Nt();return}if(d.panning){d.panX=d.panning.panX+n.clientX-d.panning.startX,d.panY=d.panning.panY+n.clientY-d.panning.startY,d.snapGuides=[],d.lastSnap=N("status.panningView"),Lt.style.cursor="grabbing",Nt();return}if(d.measurementDragging){X0(e);return}if(d.selectionBox){d.selectionBox.current=e,d.snapGuides=[],d.lastSnap=N("status.selectingBoards"),Lt.style.cursor="crosshair",Nt();return}if(!d.dragging){mo(e);return}const i=d.boards.find(f=>{var h;return f.id===((h=d.dragging)==null?void 0:h.ids[0])});if(!i)return;const s=d.dragging.startRects.find(f=>f.id===i.id);if(!s)return;const r=e.x-d.dragging.startPoint.x,a=e.y-d.dragging.startPoint.y,o=new Set(d.dragging.ids),c=_u(d,i,s.x+r,s.y+a,o),l=c.x-s.x,u=c.y-s.y;d.dragging.startRects.forEach(f=>{const h=d.boards.find(m=>m.id===f.id);h&&fo(h,{...f,x:f.x+l,y:f.y+u})}),d.dragging.ids.forEach(f=>Si(f)),d.snapGuides=c.guides,d.lastSnap=c.label,Lt.style.cursor="grabbing",Nt()},Tt);Lt.addEventListener("pointerup",n=>{var a;const t=Lt.getBoundingClientRect(),e=ii(d,n.clientX-t.left,n.clientY-t.top),i=((a=d.dragging)==null?void 0:a.ids)??(d.resizing?[d.resizing.id]:[]),s=d.measurementDragging,r=d.selectionBox;if(r){const o=H0(r.start,r.current);if(Math.hypot((r.current.x-r.start.x)*d.scale,(r.current.y-r.start.y)*d.scale)>4){const l=W0(o).map(f=>f.id),u=r.additive?[...Mi(),...l]:l;Gn(u,l[0]??(r.additive?d.selectedId:null)),d.lastSnap=l.length?N("status.boardsSelected",{count:Mi().size}):N("status.noBoardsInSelection")}else r.additive||(Lh(),d.selectedMeasurementId=null,d.lastSnap=N("workspace.noBoardSelected"))}d.dragging=null,d.resizing=null,d.measurementDragging=null,d.panning=null,d.selectionBox=null,d.snapGuides=[],i.forEach(o=>qh(o)),s!=null&&s.changed&&(d.lastSnap=N("status.measurementDisplayMoved")),Lt.hasPointerCapture(n.pointerId)&&Lt.releasePointerCapture(n.pointerId),mo(e),Nt()},Tt);Lt.addEventListener("pointerleave",()=>{!d.dragging&&!d.resizing&&!d.measurementDragging&&!d.panning&&!d.selectionBox&&(Lt.style.cursor="")},Tt);Lt.addEventListener("wheel",n=>{n.preventDefault();const t=Lt.getBoundingClientRect(),e={x:n.clientX-t.left,y:n.clientY-t.top},i=ii(d,e.x,e.y);d.scale=Math.max(mx,Math.min(_x,d.scale*(n.deltaY>0?.92:1.08)));const s=ii(d,e.x,e.y);d.panX+=(s.x-i.x)*d.scale,d.panY+=(s.y-i.y)*d.scale,Nt()},{passive:!1,signal:Rh.signal});w.anchorOverlay.addEventListener("click",n=>{const t=n.target.closest("[data-remove-anchor]");if(!t)return;const e=Number(t.dataset.removeAnchor);ee(),d.anchors=d.anchors.filter(i=>i.id!==e),d.lastSnap=N("status.anchorRemoved"),Nt()},Tt);w.templateList.addEventListener("click",n=>{const t=n.target.closest("[data-template]"),e=t==null?void 0:t.dataset.template;e&&kx(e)},Tt);w.measureModeBtn.addEventListener("click",()=>{d.tool=d.tool==="measure"?"select":"measure",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.lastSnap=d.tool==="measure"?N("status.pickFirstAnchor"):N("status.selectMode"),Nt()},Tt);w.presetList.addEventListener("click",n=>{const t=n.target.closest("[data-preset]");t&&Jh(t.dataset.preset??"")},Tt);w.presetList.addEventListener("dragstart",n=>{const t=n.target.closest("[data-preset]");!t||!n.dataTransfer||(n.dataTransfer.setData("text/plain",t.dataset.preset??""),n.dataTransfer.effectAllowed="copy")},Tt);Lt.addEventListener("dragover",n=>{n.preventDefault(),Lt.classList.add("drop-ready")},Tt);Lt.addEventListener("dragleave",()=>{Lt.classList.remove("drop-ready")},Tt);Lt.addEventListener("drop",n=>{var i;n.preventDefault(),Lt.classList.remove("drop-ready");const t=(i=n.dataTransfer)==null?void 0:i.getData("text/plain");if(!t)return;const e=Lt.getBoundingClientRect();Jh(t,ii(d,n.clientX-e.left,n.clientY-e.top))},Tt);w.duplicateBtn.addEventListener("click",nu,Tt);w.rotateBtn.addEventListener("click",iu,Tt);w.undoBtn.addEventListener("click",Oh,Tt);w.redoBtn.addEventListener("click",ho,Tt);w.measureWidthBtn.addEventListener("click",()=>Qh("horizontal"),Tt);w.measureHeightBtn.addEventListener("click",()=>Qh("vertical"),Tt);w.saveBtn.addEventListener("click",jx,Tt);w.loadBtn.addEventListener("click",Kx,Tt);w.newProjectBtn.addEventListener("click",Gx,Tt);w.projectFileInput.addEventListener("change",()=>{var t;const n=(t=w.projectFileInput.files)==null?void 0:t[0];n&&Zx(n)},Tt);w.deleteBtn.addEventListener("click",eu,Tt);w.fitBtn.addEventListener("click",Wo,Tt);w.view3dBtn.addEventListener("click",()=>{Wx(Ji==="3d"?"sketch":"3d")},Tt);w.woodOrderToggleBtn.addEventListener("click",()=>Xh(!Jn),Tt);w.woodOrderBackBtn.addEventListener("click",()=>Xh(!1),Tt);w.cutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&Yh(Number(t.dataset.boardId))},Tt);w.ignoredCutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&Yh(Number(t.dataset.boardId))},Tt);w.copyCsvBtn.addEventListener("click",()=>void v0(),Tt);w.exportBtn.addEventListener("click",x0,Tt);w.projectNameInput.addEventListener("change",()=>{const n=Bh(w.projectNameInput.value);w.projectNameInput.value=n,n!==d.projectName&&(ee(),d.projectName=n,d.lastSnap=N(n?"status.projectNamed":"status.projectNameCleared"),Nt())},Tt);Wh(w.thicknessInput,()=>p0(Math.max(3,Number(w.thicknessInput.value)||18)));w.depthInput.addEventListener("change",()=>m0(_n(w.depthInput.value,d.depth)),Tt);w.gridInput.addEventListener("input",()=>{ee(),d.grid=Math.max(1,Number(w.gridInput.value)||25),Nt()},Tt);w.snapToggle.addEventListener("change",()=>{ee(),d.snap=w.snapToggle.checked,d.lastSnap=d.snap?N("status.snapOn"):N("status.snapOff"),Nt()},Tt);w.dimToggle.addEventListener("change",()=>{ee(),d.showDimensions=w.dimToggle.checked,Nt()},Tt);w.frontLayerToggle.addEventListener("change",()=>{ee(),d.showFrontPanels=w.frontLayerToggle.checked,d.lastSnap=d.showFrontPanels?N("status.frontPanelsShown"):N("status.frontPanelsGhosted"),Nt()},Tt);[w.nameInput,w.xInput,w.yInput,w.wInput,w.hInput,w.depthOverrideInput].forEach(n=>Wh(n,E0));w.materialInput.addEventListener("change",Zh,Tt);w.materialSelectButton.addEventListener("click",n=>{n.stopPropagation(),n0()},Tt);w.materialSelectList.addEventListener("click",n=>{const t=n.target.closest("[data-material-id]");t&&(w.materialInput.value=t.dataset.materialId??"",Ho(),Zh())},Tt);document.addEventListener("click",n=>{w.materialSelect.contains(n.target)||Ho()},Tt);document.addEventListener("keydown",n=>{n.key==="Escape"&&Ho()},Tt);w.layoutAnchorAxisInput.addEventListener("change",w0,Tt);w.layoutAnchorBalanceInput.addEventListener("change",uo,Tt);w.layoutAnchorApplyBtn.addEventListener("click",C0,Tt);w.layoutAnchorClearBtn.addEventListener("click",I0,Tt);w.materialForm.addEventListener("submit",n=>{n.preventDefault(),b0()},Tt);[w.laminateLeftInput,w.laminateRightInput,w.laminateTopInput,w.laminateBottomInput,w.laminateFrontInput,w.laminateBackInput].forEach(n=>n.addEventListener("change",T0,Tt));w.ignoreOrderInput.addEventListener("change",A0,Tt);w.measureRenameForm.addEventListener("submit",n=>{n.preventDefault(),tu()},Tt);w.measureRenameCancelBtn.addEventListener("click",Ms,Tt);w.measureRenameInput.addEventListener("keydown",n=>{n.key==="Escape"&&Ms(),n.key==="Enter"&&(n.preventDefault(),tu())},Tt);document.addEventListener("keydown",n=>{if(z0(n.target))return;const t=n.key.toLowerCase(),e=n.metaKey||n.ctrlKey;if(e&&t==="z"){n.preventDefault(),n.shiftKey?ho():Oh();return}if(e&&t==="y"){n.preventDefault(),ho();return}if(e&&t==="d"){n.preventDefault(),nu();return}if(!e&&t==="r"){n.preventDefault(),iu();return}(n.key==="Delete"||n.key==="Backspace")&&(n.preventDefault(),eu())},Tt);window.addEventListener("resize",zo,Tt);Hh();w.canvasWrap.dataset.view=Ji;w.view3dBtn.setAttribute("aria-pressed","false");No.bindInteractions(Tt);$x();zo();
