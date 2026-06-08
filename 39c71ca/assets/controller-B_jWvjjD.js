var sd=Object.defineProperty;var rd=(n,t,e)=>t in n?sd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var cn=(n,t,e)=>rd(n,typeof t!="symbol"?t+"":t,e);function Ft(n){return`${Math.round(n)} mm`}function ad(n){return`${n.name} · ${Ft(n.w)} × ${Ft(n.h)}`}function Je(n){return n.boards.find(t=>t.id===n.selectedId)??null}function Qe(n){const t=new Set(n.selectedIds);return n.selectedId!==null&&t.add(n.selectedId),n.boards.filter(e=>t.has(e.id))}function Mc(n){return n.measurements.find(t=>t.id===n.selectedMeasurementId)??null}function ti(n,t,e){return{x:(t-n.panX)/n.scale,y:(e-n.panY)/n.scale}}function ge(n,t,e){return{x:t*n.scale+n.panX,y:e*n.scale+n.panY}}function ei(n){return ho(n)}function ho(n){return{left:n.x,right:n.x+n.w,top:n.y,bottom:n.y+n.h,centerX:n.x+n.w/2,centerY:n.y+n.h/2}}function tl(n){return n.kind==="back"?0:n.kind==="front"?2:1}function uo(n){return n.map((t,e)=>({board:t,index:e})).sort((t,e)=>tl(t.board)-tl(e.board)||t.index-e.index).map(({board:t})=>t)}function Sc(n,t){const e=uo(n.boards);for(let i=e.length-1;i>=0;i-=1){const s=e[i];if(!(s.kind==="front"&&!n.showFrontPanels)&&od(s,t))return s}return null}function od(n,t){const e=n.w<32||n.h<32?14:0;return t.x>=n.x-e&&t.x<=n.x+n.w+e&&t.y>=n.y-e&&t.y<=n.y+n.h+e}function Nn(n){if(!n.length)return null;const t=Math.min(...n.map(r=>r.x)),e=Math.min(...n.map(r=>r.y)),i=Math.max(...n.map(r=>r.x+r.w)),s=Math.max(...n.map(r=>r.y+r.h));return{left:t,top:e,right:i,bottom:s,w:i-t,h:s-e}}function ar(n){return{x:n.x,y:n.y,w:n.w,h:n.h}}function Qn(n,t){return n.depthOverride??t}function el(n,t){return n.thicknessOverride??t}function vi(n,t,e){const i=e==="x"?n.gridOriginX:n.gridOriginY;return i+Math.round((t-i)/n.grid)*n.grid}function yc(n,t){return n.boards.filter(e=>e.group===t)}function ld(n){let t=1;const e=new Set;n.forEach(i=>{if(e.has(i.id))return;const s=[i];for(e.add(i.id),i.group=t;s.length;){const r=s.shift();r&&n.forEach(a=>{e.has(a.id)||!md(r,a)||(a.group=t,e.add(a.id),s.push(a))})}t+=1})}function Ec(n,t){const e=Nn(n);if(!e)return null;const i=n.filter(d=>!Mi(d)),s=i.find(d=>Math.abs(d.x-e.left)<=.5&&d.h>t*2),r=i.find(d=>Math.abs(d.x+d.w-e.right)<=.5&&d.h>t*2),a=i.find(d=>Math.abs(d.y-e.top)<=.5&&d.w>t*2),o=i.find(d=>Math.abs(d.y+d.h-e.bottom)<=.5&&d.w>t*2),c=Math.max(0,e.w-((s==null?void 0:s.w)??0)-((r==null?void 0:r.w)??0)),l=Math.max(0,e.h-((a==null?void 0:a.h)??0)-((o==null?void 0:o.h)??0));return{innerW:c,innerH:l,hasFrame:!!(s||r||a||o)}}function cd(n,t,e,i,s=new Set([t.id])){if(!n.snap)return{x:e,y:i,label:"Snap off",guides:[]};const r=28/n.scale,a={x:vi(n,e,"x"),y:vi(n,i,"y")};let o=`Grid ${n.grid} mm`,c=r,l=r;const d=[],f=[],h={...t,x:e,y:i},g=ei(h);n.boards.forEach(S=>{if(s.has(S.id))return;const m=ei(S),p=[[g.left,m.left,"left aligned",null,null],[g.right,m.right,"right aligned",null,null],[g.centerX,m.centerX,"center aligned",null,null],[g.left,m.right,"touching right edge","left","right"],[g.right,m.left,"touching left edge","right","left"]],E=[[g.top,m.top,"top aligned",null,null],[g.bottom,m.bottom,"bottom aligned",null,null],[g.centerY,m.centerY,"middle aligned",null,null],[g.top,m.bottom,"flush below","top","bottom"],[g.bottom,m.top,"flush above","bottom","top"]];p.forEach(([b,T,L,A,I])=>{const v=T-b;Math.abs(v)<c&&(a.x=e+v,c=Math.abs(v),o=L,f[0]=A&&I?{edge:A,target:S,targetEdge:I}:null,d[0]={orientation:"vertical",position:T,label:L})}),E.forEach(([b,T,L,A,I])=>{const v=T-b;Math.abs(v)<l&&(a.y=i+v,l=Math.abs(v),o=L,f[1]=A&&I?{edge:A,target:S,targetEdge:I}:null,d[1]={orientation:"horizontal",position:T,label:L})})}),Ic(n,s).forEach(({anchor:S,board:m,position:p})=>{if(S.axis==="x"){const b=p-g.centerX;Math.abs(b)<c&&(a.x=e+b,c=Math.abs(b),o=`${m.name} layout anchor`,f[0]=null,d[0]={orientation:"vertical",position:p,label:o});return}const E=p-g.centerY;Math.abs(E)<l&&(a.y=i+E,l=Math.abs(E),o=`${m.name} layout anchor`,f[1]=null,d[1]={orientation:"horizontal",position:p,label:o})});const x={...t,x:a.x,y:a.y};return f.forEach((S,m)=>{!S||!d[m]||(d[m].linkPoint=Lc(t,x,S.edge,S.target,S.targetEdge))}),{...a,label:o,guides:d.filter(Boolean)}}function bc(n,t,e){const s=ge(n,e.x,e.y),r=ge(n,t.x,t.y),a=t.w*n.scale,o=t.h*n.scale,c={nw:{x:r.x,y:r.y},n:{x:r.x+a/2,y:r.y},ne:{x:r.x+a,y:r.y},w:{x:r.x,y:r.y+o/2},e:{x:r.x+a,y:r.y+o/2},sw:{x:r.x,y:r.y+o},s:{x:r.x+a/2,y:r.y+o},se:{x:r.x+a,y:r.y+o}};return Tc(t).reduce((l,d)=>{const f=c[d],h=Math.abs(s.x-f.x),g=Math.abs(s.y-f.y);if(h>18||g>18)return l;const x=h*h+g*g;return x<l.distance?{handle:d,distance:x}:l},{handle:null,distance:Number.POSITIVE_INFINITY}).handle}function hd(n,t,e,i,s,r){const a=r.x-s.x,o=r.y-s.y,c={...i};return e.includes("e")&&(c.w=i.w+a),e.includes("s")&&(c.h=i.h+o),e.includes("w")&&(c.x=i.x+a,c.w=i.w-a),e.includes("n")&&(c.y=i.y+o,c.h=i.h-o),t.autoThickness==="width"&&(c.x=i.x,c.w=i.w),t.autoThickness==="height"&&(c.y=i.y,c.h=i.h),dd(n,t,Pc(c,n.thickness),ud(e))}function Tc(n){return n.autoThickness==="width"?["n","s"]:n.autoThickness==="height"?["w","e"]:["nw","n","ne","w","e","sw","s","se"]}function Ac(n,t){const e=Math.max(10,12/n.scale),i=Math.max(10,16/n.scale);let s=null,r=Number.POSITIVE_INFINITY;return n.boards.forEach(a=>{const o=ei(a);[{edge:"left",distance:Math.abs(t.x-o.left),offset:t.y-a.y},{edge:"right",distance:Math.abs(t.x-o.right),offset:t.y-a.y},{edge:"top",distance:Math.abs(t.y-o.top),offset:t.x-a.x},{edge:"bottom",distance:Math.abs(t.y-o.bottom),offset:t.x-a.x}].forEach(l=>{const d=(l.edge==="left"||l.edge==="right")&&t.y>=a.y-e&&t.y<=a.y+a.h+e,f=(l.edge==="top"||l.edge==="bottom")&&t.x>=a.x-e&&t.x<=a.x+a.w+e;if(!(!(d||f)||l.distance>e)&&l.distance<r){const h=l.edge==="left"||l.edge==="right"?a.h/2:a.w/2,g=Math.abs(l.offset-h)<=i?h:l.offset;s={kind:"board-edge",boardId:a.id,edge:l.edge,offset:g},r=l.distance}})}),s??{kind:"grid",x:vi(n,t.x,"x"),y:vi(n,t.y,"y")}}function gi(n,t){if(t.kind==="grid")return{x:t.x,y:t.y};const e=n.boards.find(s=>s.id===t.boardId);if(!e)return null;const i=ei(e);return t.edge==="left"||t.edge==="right"?{x:t.edge==="left"?i.left:i.right,y:e.y+nl(t.offset,0,e.h)}:{x:e.x+nl(t.offset,0,e.w),y:t.edge==="top"?i.top:i.bottom}}function wc(n,t){return Math.abs(n.x-t.x)>=Math.abs(n.y-t.y)?"horizontal":"vertical"}function Rc(n){return 46+n*14}function fo(n,t){return n.displayOffset??Rc(t)}function po(n,t,e){const i=gi(n,t.a),s=gi(n,t.b);if(!i||!s)return null;const r=fo(t,e);if(t.axis==="horizontal"){const o=Math.min(i.y,s.y)-r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:i.x,y:o},lineEnd:{x:s.x,y:o},labelPoint:{x:(i.x+s.x)/2,y:o-13/n.scale}}}const a=Math.max(i.x,s.x)+r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:a,y:i.y},lineEnd:{x:a,y:s.y},labelPoint:{x:a-16/n.scale,y:(i.y+s.y)/2}}}function mo(n,t){const e=Math.max(8,10/n.scale),i=42/n.scale,s=18/n.scale;for(let r=n.measurements.length-1;r>=0;r-=1){const a=n.measurements[r],o=po(n,a,r);if(!o)continue;const c=Math.min(o.lineStart.x,o.lineEnd.x)-e,l=Math.max(o.lineStart.x,o.lineEnd.x)+e,d=Math.min(o.lineStart.y,o.lineEnd.y)-e,f=Math.max(o.lineStart.y,o.lineEnd.y)+e,h=t.x>=c&&t.x<=l&&t.y>=d&&t.y<=f,g=Math.abs(t.x-o.labelPoint.x)<=i&&Math.abs(t.y-o.labelPoint.y)<=s;if(h||g)return a}return null}function Cc(n){const t=[];for(let e=0;e<n.length;e+=1)for(let i=e+1;i<n.length;i+=1){const s=n[e],r=n[i];if(Mi(s)||Mi(r))continue;const a=Math.max(s.x,r.x),o=Math.max(s.y,r.y),c=Math.min(s.x+s.w,r.x+r.w),l=Math.min(s.y+s.h,r.y+r.h);c-a>.5&&l-o>.5&&t.push({x:a,y:o,w:c-a,h:l-o,boardIds:[s.id,r.id]})}return t}function dd(n,t,e,i){if(!n.snap)return{rect:e,label:"Snap off",guides:[]};const s=28/n.scale,r={...e};let a=`Grid ${n.grid} mm`;const o=[];return i.forEach(c=>{let l=s,d=a,f=null;const h=da(ho(r),c);let x=vi(n,h,c==="left"||c==="right"?"x":"y")-h;Math.abs(x)<=s&&(d=`Grid ${n.grid} mm`),n.boards.forEach(S=>{if(S.id===t.id)return;const m=ei(S);fd(m,c).forEach(([p,E,b])=>{const T=p-h;if(Math.abs(T)<l){l=Math.abs(T),x=T,d=E;const L=pd(r,c,T,n.thickness),A=b?Lc(t,L,c,S,b):void 0;f={orientation:c==="left"||c==="right"?"vertical":"horizontal",position:p,label:E,linkPoint:A}}})}),Ic(n,new Set([t.id])).forEach(({anchor:S,board:m,position:p})=>{const E=c==="left"||c==="right";if(E&&S.axis!=="x"||!E&&S.axis!=="y")return;const b=p-h;Math.abs(b)<l&&(l=Math.abs(b),x=b,d=`${m.name} layout anchor`,f={orientation:E?"vertical":"horizontal",position:p,label:d})}),Dc(r,c,x,n.thickness),a=d,f&&o.push(f)}),{rect:r,label:a,guides:o}}function Ic(n,t){return n.layoutAnchors.flatMap(e=>{if(t.has(e.boardId))return[];const i=n.boards.find(r=>r.id===e.boardId);if(!i)return[];const s=e.axis==="x"?i.w:i.h;return e.offset<0||e.offset>s?[]:[{anchor:e,board:i,position:(e.axis==="x"?i.x:i.y)+e.offset}]})}function ud(n){const t=[];return n.includes("n")&&t.push("top"),n.includes("s")&&t.push("bottom"),n.includes("w")&&t.push("left"),n.includes("e")&&t.push("right"),t}function Pc(n,t){const e={...n},i=Math.max(8,t);return e.w<i&&(e.x+=e.w-i,e.w=i),e.h<i&&(e.y+=e.h-i,e.h=i),e}function da(n,t){return t==="left"?n.left:t==="right"?n.right:t==="top"?n.top:n.bottom}function fd(n,t){return t==="left"||t==="right"?[[n.left,"left edge",t==="right"?"left":null],[n.right,"right edge",t==="left"?"right":null],[n.centerX,"vertical center",null]]:[[n.top,"top edge",t==="bottom"?"top":null],[n.bottom,"bottom edge",t==="top"?"bottom":null],[n.centerY,"horizontal center",null]]}function pd(n,t,e,i){const s={...n};return Dc(s,t,e,i),s}function Lc(n,t,e,i,s){if(Mi(n)||Mi(i))return;const r=ho(t),a=ei(i),o=da(r,e),c=da(a,s);if(Math.abs(o-c)>.5)return;if(e==="left"||e==="right"){const f=Math.max(t.y,i.y),h=Math.min(t.y+t.h,i.y+i.h);return f>h+.5?void 0:{x:o,y:(f+h)/2}}const l=Math.max(t.x,i.x),d=Math.min(t.x+t.w,i.x+i.w);if(!(l>d+.5))return{x:(l+d)/2,y:o}}function Dc(n,t,e,i){t==="left"&&(n.x+=e,n.w-=e),t==="right"&&(n.w+=e),t==="top"&&(n.y+=e,n.h-=e),t==="bottom"&&(n.h+=e);const s=Pc(n,i);n.x=s.x,n.y=s.y,n.w=s.w,n.h=s.h}function nl(n,t,e){return Math.max(t,Math.min(e,n))}function md(n,t){if(Mi(n)||Mi(t))return!1;if(gd(n,t))return!0;const e=ei(n),i=ei(t),s=Math.abs(e.right-i.left)<=.5||Math.abs(i.right-e.left)<=.5,r=Math.abs(e.bottom-i.top)<=.5||Math.abs(i.bottom-e.top)<=.5;return s&&il(e.top,e.bottom,i.top,i.bottom)||r&&il(e.left,e.right,i.left,i.right)}function Mi(n){return n.kind==="back"||n.kind==="front"}function il(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function gd(n,t){return n.x<t.x+t.w-.5&&n.x+n.w>t.x+.5&&n.y<t.y+t.h-.5&&n.y+n.h>t.y+.5}const Ar=["#5c8d89","#d19041","#725d9f","#538052","#bb5d50","#3f75a3"];class _d{constructor(t,e){cn(this,"ctx");this.canvas=t,this.state=e;const i=t.getContext("2d");if(!i)throw new Error("Canvas rendering is not available.");this.ctx=i}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.canvas.width=Math.max(1,Math.round(t.width*e)),this.canvas.height=Math.max(1,Math.round(t.height*e)),this.ctx.setTransform(e,0,0,e,0,0),this.draw()}draw(){const t=this.canvas.getBoundingClientRect();this.ctx.clearRect(0,0,t.width,t.height),this.drawGrid(t.width,t.height),uo(this.state.boards).forEach(e=>this.drawBoard(e)),this.drawLayoutAnchors(),this.drawOverlaps(),this.drawSelectionBox(),this.drawSnapGuides(t.width,t.height),this.drawMeasurements(),this.drawDimensions(),this.drawResizeHandles(),this.drawOriginAxis(t.width,t.height)}drawGrid(t,e){const i=this.scaledGridPx();this.ctx.save(),this.ctx.strokeStyle="#e1e8e2",this.ctx.lineWidth=1;const s=ge(this.state,this.state.gridOriginX,this.state.gridOriginY),r=(s.x%i+i)%i,a=(s.y%i+i)%i;for(let o=r;o<t;o+=i)this.line(o,0,o,e);for(let o=a;o<e;o+=i)this.line(0,o,t,o);this.ctx.restore()}scaledGridPx(){const t=this.state.grid*this.state.scale,e=12;if(t>=e)return t;const i=this.niceGridMultiplier(e/Math.max(.1,t));return t*i}niceGridMultiplier(t){const i=10**Math.floor(Math.log10(t)),s=t/i;return s<=2?2*i:s<=5?5*i:10*i}drawOriginAxis(t,e){const i=ge(this.state,0,0),s=42,r=s+18;if(i.x<-r||i.x>t+r||i.y<-r||i.y>e+r)return;const a=Math.max(1,Math.min(t-1,i.x)),o=Math.max(1,Math.min(e-1,i.y)),c=a<12;this.ctx.save(),this.ctx.strokeStyle="#1f6659",this.ctx.fillStyle="#1f6659",this.ctx.lineWidth=2,this.ctx.font="11px system-ui",this.ctx.textBaseline="middle",this.drawArrow(a,o,a+s,o),this.drawArrow(a,o,a,o-s),this.ctx.beginPath(),this.ctx.arc(a,o,3,0,Math.PI*2),this.ctx.fill(),this.ctx.textAlign="left",this.ctx.fillText("X",a+s+7,o),this.ctx.fillText("0,0",a+6,o+13),this.ctx.textAlign=c?"left":"center",this.ctx.fillText("Y",a+(c?7:0),o-s-10),this.ctx.restore()}drawBoard(t){var h;const e=ge(this.state,t.x,t.y),i=t.w*this.state.scale,s=t.h*this.state.scale,r=this.state.selectedIds.includes(t.id)||t.id===this.state.selectedId,a=t.id===this.state.selectedId,o=t.id===((h=this.state.resizing)==null?void 0:h.id),c=Ar[(t.group-1)%Ar.length]??Ar[0],l=this.materialFor(t),d=this.boardOpacity(t,r||o);this.ctx.save(),this.ctx.globalAlpha=d,this.ctx.fillStyle=t.kind==="back"?this.withAlpha(l.color,.36):l.color,this.ctx.strokeStyle=a?"#1f6659":r?"#2f78b7":c,this.ctx.lineWidth=t.kind==="back"?1.5:a?3:r?2.5:2,this.ctx.fillRect(e.x,e.y,i,s),this.ctx.strokeRect(e.x,e.y,i,s),this.drawLaminateEdges(t,e.x,e.y,i,s),this.ctx.strokeStyle="rgba(99, 72, 37, 0.28)",this.ctx.lineWidth=1;const f=Math.max(10,28*this.state.scale);if(t.w>=t.h)for(let g=e.y+f;g<e.y+s;g+=f)this.line(e.x+4,g,e.x+i-4,g);else for(let g=e.x+f;g<e.x+i;g+=f)this.line(g,e.y+4,g,e.y+s-4);this.ctx.fillStyle="#27302b",this.ctx.font="12px system-ui",this.ctx.textBaseline="top",this.ctx.fillText(t.name,e.x+7,e.y+6),this.ctx.restore()}boardOpacity(t,e){return t.kind!=="front"?1:e?.5:this.state.showFrontPanels?1:.3}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}withAlpha(t,e){const i=/^#([0-9a-f]{6})$/i.exec(t);if(!i)return t;const s=i[1],r=parseInt(s.slice(0,2),16),a=parseInt(s.slice(2,4),16),o=parseInt(s.slice(4,6),16);return`rgba(${r}, ${a}, ${o}, ${e})`}drawLaminateEdges(t,e,i,s,r){const a=[[t.laminate.left,e,i,e,i+r],[t.laminate.right,e+s,i,e+s,i+r],[t.laminate.front,e,i+r,e+s,i+r],[t.laminate.back,e,i,e+s,i]];a.some(([o])=>o)&&(this.ctx.save(),this.ctx.strokeStyle="#d58b28",this.ctx.lineCap="round",this.ctx.lineWidth=Math.max(3,5*this.state.scale),a.forEach(([o,c,l,d,f])=>{o&&this.line(c,l,d,f)}),this.ctx.restore())}drawOverlaps(){const t=Cc(this.state.boards);t.length&&(this.ctx.save(),t.forEach(e=>{const i=ge(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale;this.ctx.fillStyle="rgba(184, 72, 59, 0.22)",this.ctx.fillRect(i.x,i.y,s,r),this.ctx.strokeStyle="rgba(184, 72, 59, 0.9)",this.ctx.lineWidth=1.5,this.ctx.strokeRect(i.x,i.y,s,r),this.ctx.beginPath();for(let a=i.x-r;a<i.x+s+r;a+=8)this.ctx.moveTo(a,i.y+r),this.ctx.lineTo(a+r,i.y);this.ctx.stroke()}),this.ctx.restore())}drawLayoutAnchors(){if(!this.state.layoutAnchors.length)return;const t=new Set(this.state.selectedIds);this.state.selectedId!==null&&t.add(this.state.selectedId),this.ctx.save(),this.state.layoutAnchors.forEach(e=>{const i=this.state.boards.find(l=>l.id===e.boardId);if(!i)return;const s=t.has(i.id),r=s?"#1f6659":"rgba(31, 102, 89, 0.52)";if(this.ctx.strokeStyle=r,this.ctx.fillStyle=s?"#ffffff":"#e7f3f0",this.ctx.lineWidth=s?2:1.4,this.ctx.setLineDash(s?[5,4]:[3,5]),e.axis==="x"){const l=i.x+e.offset;if(e.offset<0||e.offset>i.w)return;const d=ge(this.state,l,i.y),f=ge(this.state,l,i.y+i.h);this.line(d.x,d.y,f.x,f.y),this.drawLayoutAnchorDot(d.x,(d.y+f.y)/2,r);return}const a=i.y+e.offset;if(e.offset<0||e.offset>i.h)return;const o=ge(this.state,i.x,a),c=ge(this.state,i.x+i.w,a);this.line(o.x,o.y,c.x,c.y),this.drawLayoutAnchorDot((o.x+c.x)/2,o.y,r)}),this.ctx.restore()}drawSelectionBox(){const t=this.state.selectionBox;if(!t)return;const e=ge(this.state,t.start.x,t.start.y),i=ge(this.state,t.current.x,t.current.y),s=Math.min(e.x,i.x),r=Math.min(e.y,i.y),a=Math.abs(e.x-i.x),o=Math.abs(e.y-i.y);this.ctx.save(),this.ctx.fillStyle="rgba(47, 120, 183, 0.12)",this.ctx.strokeStyle="#2f78b7",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,4]),this.ctx.fillRect(s,r,a,o),this.ctx.strokeRect(s,r,a,o),this.ctx.restore()}drawSnapGuides(t,e){this.state.snapGuides.length&&(this.ctx.save(),this.ctx.strokeStyle="#2398b6",this.ctx.fillStyle="#1b728a",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,5]),this.ctx.font="12px system-ui",this.state.snapGuides.forEach(i=>{if(i.orientation==="vertical"){const s=ge(this.state,i.position,0);this.line(s.x,0,s.x,e),this.drawGuideLabel(i.label,s.x+8,e-18,t,e)}else{const s=ge(this.state,0,i.position);this.line(0,s.y,t,s.y),this.drawGuideLabel(i.label,t-12,s.y-8,t,e,"right")}}),this.ctx.restore())}drawMeasurements(){if(this.state.measurements.forEach((t,e)=>{const i=po(this.state,t,e);if(!i)return;const s=t.id===this.state.selectedMeasurementId,r=s?"#b8483b":"#4152a3";this.drawMeasurementLine(i.a,i.b,i.lineStart,i.lineEnd,t.axis,r,t.name,s),this.drawAnchorDot(i.a.x,i.a.y,s?"#fff7f5":"#ffffff",r),this.drawAnchorDot(i.b.x,i.b.y,s?"#fff7f5":"#ffffff",r)}),this.state.pendingMeasurementAnchor){const t=gi(this.state,this.state.pendingMeasurementAnchor);t&&this.drawAnchorDot(t.x,t.y,"#4152a3")}if(this.state.pendingMeasurementAnchor&&this.state.previewMeasurementAnchor){const t=gi(this.state,this.state.pendingMeasurementAnchor),e=gi(this.state,this.state.previewMeasurementAnchor);if(!t||!e)return;this.ctx.save(),this.ctx.globalAlpha=.82,this.drawMeasurement(t,e,wc(t,e),46+this.state.measurements.length*14,"#2398b6"),this.ctx.restore(),this.drawAnchorDot(t.x,t.y,"#4152a3"),this.drawAnchorDot(e.x,e.y,"#2398b6")}}measurementLabel(t,e){const i=t.trim();return i?`${i} ${e}`:e}drawMeasurement(t,e,i,s,r,a=""){if(i==="horizontal"){const c=Math.min(t.y,e.y)-s;this.drawDimensionLine(t.x,c,e.x,c,this.measurementLabel(a,Ft(Math.abs(e.x-t.x))),0,r),this.drawExtension(t.x,t.y,t.x,c,r),this.drawExtension(e.x,e.y,e.x,c,r);return}const o=Math.max(t.x,e.x)+s;this.drawDimensionLine(o,t.y,o,e.y,this.measurementLabel(a,Ft(Math.abs(e.y-t.y))),0,r),this.drawExtension(t.x,t.y,o,t.y,r),this.drawExtension(e.x,e.y,o,e.y,r)}drawMeasurementLine(t,e,i,s,r,a,o,c){const l=Ft(Math.abs(r==="horizontal"?e.x-t.x:e.y-t.y));this.drawDimensionLine(i.x,i.y,s.x,s.y,this.measurementLabel(o,l),0,a,c?2.4:1.5),this.drawExtension(t.x,t.y,i.x,i.y,a),this.drawExtension(e.x,e.y,s.x,s.y,a)}drawDimensions(){if(!this.state.showDimensions)return;const t=Je(this.state),e=Qe(this.state),i=e.length>1?e:t?yc(this.state,t.group):this.state.boards,s=Nn(i);if(!s)return;this.drawDimensionLine(s.left,s.top,s.right,s.top,`Outer ${Ft(s.w)}`,-28,"#255e55"),this.drawDimensionLine(s.right,s.top,s.right,s.bottom,`Outer ${Ft(s.h)}`,30,"#255e55");const r=Ec(i,this.state.thickness);r!=null&&r.hasFrame&&(this.drawDimensionLine(s.left+this.state.thickness,s.bottom,s.right-this.state.thickness,s.bottom,`Inner ${Ft(r.innerW)}`,28,"#a45f1b"),this.drawDimensionLine(s.left,s.top+this.state.thickness,s.left,s.bottom-this.state.thickness,`Inner ${Ft(r.innerH)}`,-30,"#a45f1b")),t&&e.length<=1&&(this.drawDimensionLine(t.x,t.y+t.h,t.x+t.w,t.y+t.h,Ft(t.w),18,"#6e4d83"),this.drawDimensionLine(t.x+t.w,t.y,t.x+t.w,t.y+t.h,Ft(t.h),18,"#6e4d83"))}drawResizeHandles(){if(Qe(this.state).length>1)return;const t=Je(this.state);if(!t)return;const e=ge(this.state,t.x,t.y),i=t.w*this.state.scale,s=t.h*this.state.scale,r={nw:[e.x,e.y],n:[e.x+i/2,e.y],ne:[e.x+i,e.y],w:[e.x,e.y+s/2],e:[e.x+i,e.y+s/2],sw:[e.x,e.y+s],s:[e.x+i/2,e.y+s],se:[e.x+i,e.y+s]},a=Tc(t).map(l=>r[l]);this.ctx.save(),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle="#1f6659",this.ctx.lineWidth=1.5;const o=10,c=o/2;a.forEach(([l,d])=>{this.ctx.fillRect(l-c,d-c,o,o),this.ctx.strokeRect(l-c,d-c,o,o)}),this.ctx.restore()}drawGuideLabel(t,e,i,s,r,a="left"){const c=this.ctx.measureText(t).width,l=10,d=a==="right"?Math.max(l+c,Math.min(s-l,e)):Math.max(l,Math.min(s-l-c,e)),f=Math.max(18,Math.min(r-10,i));this.ctx.save(),this.ctx.setLineDash([]),this.ctx.textAlign=a,this.ctx.textBaseline="alphabetic",this.ctx.fillText(t,d,f),this.ctx.restore()}drawDimensionLine(t,e,i,s,r,a=0,o="#2c6159",c=1.5){const l=ge(this.state,t,e),d=ge(this.state,i,s),f=Math.abs(e-s)<.01;this.ctx.save(),this.ctx.strokeStyle=o,this.ctx.fillStyle=o,this.ctx.lineWidth=c,this.ctx.font="12px system-ui",this.ctx.textAlign="center",this.ctx.textBaseline="middle",f?(l.y+=a,d.y+=a,this.line(l.x,l.y,d.x,d.y),this.line(l.x,l.y-5,l.x,l.y+5),this.line(d.x,d.y-5,d.x,d.y+5),this.ctx.fillText(r,(l.x+d.x)/2,l.y-13)):(l.x+=a,d.x+=a,this.line(l.x,l.y,d.x,d.y),this.line(l.x-5,l.y,l.x+5,l.y),this.line(d.x-5,d.y,d.x+5,d.y),this.ctx.translate(l.x-16,(l.y+d.y)/2),this.ctx.rotate(-Math.PI/2),this.ctx.fillText(r,0,0)),this.ctx.restore()}line(t,e,i,s){this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(i,s),this.ctx.stroke()}drawArrow(t,e,i,s){const r=Math.atan2(s-e,i-t),a=7;this.line(t,e,i,s),this.ctx.beginPath(),this.ctx.moveTo(i,s),this.ctx.lineTo(i-a*Math.cos(r-Math.PI/6),s-a*Math.sin(r-Math.PI/6)),this.ctx.lineTo(i-a*Math.cos(r+Math.PI/6),s-a*Math.sin(r+Math.PI/6)),this.ctx.closePath(),this.ctx.fill()}drawExtension(t,e,i,s,r){const a=ge(this.state,t,e),o=ge(this.state,i,s);this.ctx.save(),this.ctx.strokeStyle=r,this.ctx.lineWidth=1,this.ctx.setLineDash([4,4]),this.line(a.x,a.y,o.x,o.y),this.ctx.restore()}drawAnchorDot(t,e,i="#ffffff",s="#4152a3"){const r=ge(this.state,t,e);this.ctx.save(),this.ctx.fillStyle=i,this.ctx.strokeStyle=s,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(r.x,r.y,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}drawLayoutAnchorDot(t,e,i){this.ctx.save(),this.ctx.setLineDash([]),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle=i,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(t,e,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const go="184",Ln={ROTATE:0,DOLLY:1,PAN:2},Zn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},xd=0,sl=1,vd=2,tr=1,Md=2,ls=3,ni=0,Ge=1,Cn=2,Dn=0,Gi=1,rl=2,al=3,ol=4,Sd=5,ui=100,yd=101,Ed=102,bd=103,Td=104,Ad=200,wd=201,Rd=202,Cd=203,ua=204,fa=205,Id=206,Pd=207,Ld=208,Dd=209,Ud=210,Nd=211,Fd=212,Od=213,Bd=214,pa=0,ma=1,ga=2,Wi=3,_a=4,xa=5,va=6,Ma=7,Uc=0,kd=1,zd=2,gn=0,Nc=1,Fc=2,Oc=3,Bc=4,kc=5,zc=6,Gc=7,Hc=300,Si=301,Xi=302,wr=303,Rr=304,gr=306,Sa=1e3,In=1001,ya=1002,Ie=1003,Gd=1004,Ts=1005,Ne=1006,Cr=1007,pi=1008,$e=1009,Vc=1010,Wc=1011,fs=1012,_o=1013,Mn=1014,fn=1015,Fn=1016,xo=1017,vo=1018,ps=1020,Xc=35902,Yc=35899,qc=1021,$c=1022,an=1023,On=1026,mi=1027,jc=1028,Mo=1029,yi=1030,So=1031,yo=1033,er=33776,nr=33777,ir=33778,sr=33779,Ea=35840,ba=35841,Ta=35842,Aa=35843,wa=36196,Ra=37492,Ca=37496,Ia=37488,Pa=37489,or=37490,La=37491,Da=37808,Ua=37809,Na=37810,Fa=37811,Oa=37812,Ba=37813,ka=37814,za=37815,Ga=37816,Ha=37817,Va=37818,Wa=37819,Xa=37820,Ya=37821,qa=36492,$a=36494,ja=36495,Ka=36283,Za=36284,lr=36285,Ja=36286,Hd=3200,Qa=0,Vd=1,Kn="",qe="srgb",cr="srgb-linear",hr="linear",ee="srgb",Ti=7680,ll=519,Wd=512,Xd=513,Yd=514,Eo=515,qd=516,$d=517,bo=518,jd=519,cl=35044,hl="300 es",pn=2e3,ms=2001;function Kd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function dr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Zd(){const n=dr("canvas");return n.style.display="block",n}const dl={};function ul(...n){const t="THREE."+n.shift();console.log(t,...n)}function Kc(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Rt(...n){n=Kc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Jt(...n){n=Kc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function to(...n){const t=n.join(" ");t in dl||(dl[t]=!0,Rt(...n))}function Jd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Qd={[pa]:ma,[ga]:va,[_a]:Ma,[Wi]:xa,[ma]:pa,[va]:ga,[Ma]:_a,[xa]:Wi};class ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ds=Math.PI/180,eo=180/Math.PI;function xs(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]).toLowerCase()}function Xt(n,t,e){return Math.max(t,Math.min(e,n))}function tu(n,t){return(n%t+t)%t}function Ir(n,t,e){return(1-e)*n+e*t}function Ji(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Be(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const eu={DEG2RAD:ds},Go=class Go{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Go.prototype.isVector2=!0;let kt=Go;class ii{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],d=i[s+2],f=i[s+3],h=r[a+0],g=r[a+1],x=r[a+2],S=r[a+3];if(f!==S||c!==h||l!==g||d!==x){let m=c*h+l*g+d*x+f*S;m<0&&(h=-h,g=-g,x=-x,S=-S,m=-m);let p=1-o;if(m<.9995){const E=Math.acos(m),b=Math.sin(E);p=Math.sin(p*E)/b,o=Math.sin(o*E)/b,c=c*p+h*o,l=l*p+g*o,d=d*p+x*o,f=f*p+S*o}else{c=c*p+h*o,l=l*p+g*o,d=d*p+x*o,f=f*p+S*o;const E=1/Math.sqrt(c*c+l*l+d*d+f*f);c*=E,l*=E,d*=E,f*=E}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],d=i[s+3],f=r[a],h=r[a+1],g=r[a+2],x=r[a+3];return t[e]=o*x+d*f+c*g-l*h,t[e+1]=c*x+d*h+l*f-o*g,t[e+2]=l*x+d*g+o*h-c*f,t[e+3]=d*x-o*f-c*h-l*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(s/2),f=o(r/2),h=c(i/2),g=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=h*d*f+l*g*x,this._y=l*g*f-h*d*x,this._z=l*d*x+h*g*f,this._w=l*d*f-h*g*x;break;case"YXZ":this._x=h*d*f+l*g*x,this._y=l*g*f-h*d*x,this._z=l*d*x-h*g*f,this._w=l*d*f+h*g*x;break;case"ZXY":this._x=h*d*f-l*g*x,this._y=l*g*f+h*d*x,this._z=l*d*x+h*g*f,this._w=l*d*f-h*g*x;break;case"ZYX":this._x=h*d*f-l*g*x,this._y=l*g*f+h*d*x,this._z=l*d*x-h*g*f,this._w=l*d*f+h*g*x;break;case"YZX":this._x=h*d*f+l*g*x,this._y=l*g*f+h*d*x,this._z=l*d*x-h*g*f,this._w=l*d*f-h*g*x;break;case"XZY":this._x=h*d*f-l*g*x,this._y=l*g*f-h*d*x,this._z=l*d*x+h*g*f,this._w=l*d*f+h*g*x;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],d=e[6],f=e[10],h=i+o+f;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(d-c)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(i>o&&i>f){const g=2*Math.sqrt(1+i-o-f);this._w=(d-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(o>f){const g=2*Math.sqrt(1+o-i-f);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+d)/g}else{const g=2*Math.sqrt(1+f-i-o);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(c+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,d=e._w;return this._x=i*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-i*l,this._z=r*d+a*l+i*c-s*o,this._w=a*d-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ho=class Ho{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),d=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+c*l+a*f-o*d,this.y=i+c*d+o*l-r*f,this.z=s+c*f+r*d-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Pr.copy(this).projectOnVector(t),this.sub(Pr)}reflect(t){return this.sub(Pr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ho.prototype.isVector3=!0;let F=Ho;const Pr=new F,fl=new ii,Vo=class Vo{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],f=i[7],h=i[2],g=i[5],x=i[8],S=s[0],m=s[3],p=s[6],E=s[1],b=s[4],T=s[7],L=s[2],A=s[5],I=s[8];return r[0]=a*S+o*E+c*L,r[3]=a*m+o*b+c*A,r[6]=a*p+o*T+c*I,r[1]=l*S+d*E+f*L,r[4]=l*m+d*b+f*A,r[7]=l*p+d*T+f*I,r[2]=h*S+g*E+x*L,r[5]=h*m+g*b+x*A,r[8]=h*p+g*T+x*I,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8];return e*a*d-e*o*l-i*r*d+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],f=d*a-o*l,h=o*c-d*r,g=l*r-a*c,x=e*f+i*h+s*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return t[0]=f*S,t[1]=(s*l-d*i)*S,t[2]=(o*i-s*a)*S,t[3]=h*S,t[4]=(d*e-s*c)*S,t[5]=(s*r-o*e)*S,t[6]=g*S,t[7]=(i*c-l*e)*S,t[8]=(a*e-i*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Lr.makeScale(t,e)),this}rotate(t){return this.premultiply(Lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Vo.prototype.isMatrix3=!0;let Nt=Vo;const Lr=new Nt,pl=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nu(){const n={enabled:!0,workingColorSpace:cr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ee&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(s.r=Hi(s.r),s.g=Hi(s.g),s.b=Hi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return to("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return to("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[cr]:{primaries:t,whitePoint:i,transfer:hr,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:i,transfer:ee,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),n}const $t=nu();function Un(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Hi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ai;class iu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ai===void 0&&(Ai=dr("canvas")),Ai.width=t.width,Ai.height=t.height;const s=Ai.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ai}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=dr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Un(e[i]/255)*255):e[i]=Un(e[i]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let su=0;class To{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=xs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Dr(s[a].image)):r.push(Dr(s[a]))}else r=Dr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Dr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?iu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}let ru=0;const Ur=new F;class Oe extends ri{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,i=In,s=In,r=Ne,a=pi,o=an,c=$e,l=Oe.DEFAULT_ANISOTROPY,d=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=xs(),this.name="",this.source=new To(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ur).x}get height(){return this.source.getSize(Ur).y}get depth(){return this.source.getSize(Ur).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sa:t.x=t.x-Math.floor(t.x);break;case In:t.x=t.x<0?0:1;break;case ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sa:t.y=t.y-Math.floor(t.y);break;case In:t.y=t.y<0?0:1;break;case ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=Hc;Oe.DEFAULT_ANISOTROPY=1;const Wo=class Wo{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],d=c[4],f=c[8],h=c[1],g=c[5],x=c[9],S=c[2],m=c[6],p=c[10];if(Math.abs(d-h)<.01&&Math.abs(f-S)<.01&&Math.abs(x-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+S)<.1&&Math.abs(x+m)<.1&&Math.abs(l+g+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,T=(g+1)/2,L=(p+1)/2,A=(d+h)/4,I=(f+S)/4,v=(x+m)/4;return b>T&&b>L?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=A/i,r=I/i):T>L?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=A/s,r=v/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=I/r,s=v/r),this.set(i,s,r,e),this}let E=Math.sqrt((m-x)*(m-x)+(f-S)*(f-S)+(h-d)*(h-d));return Math.abs(E)<.001&&(E=1),this.x=(m-x)/E,this.y=(f-S)/E,this.z=(h-d)/E,this.w=Math.acos((l+g+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wo.prototype.isVector4=!0;let _e=Wo;class au extends ri{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ne,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Oe(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Ne,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new To(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _n extends au{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Zc extends Oe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ou extends Oe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const mr=class mr{constructor(t,e,i,s,r,a,o,c,l,d,f,h,g,x,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,d,f,h,g,x,S,m)}set(t,e,i,s,r,a,o,c,l,d,f,h,g,x,S,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=f,p[14]=h,p[3]=g,p[7]=x,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mr().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/wi.setFromMatrixColumn(t,0).length(),r=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=a*d,g=a*f,x=o*d,S=o*f;e[0]=c*d,e[4]=-c*f,e[8]=l,e[1]=g+x*l,e[5]=h-S*l,e[9]=-o*c,e[2]=S-h*l,e[6]=x+g*l,e[10]=a*c}else if(t.order==="YXZ"){const h=c*d,g=c*f,x=l*d,S=l*f;e[0]=h+S*o,e[4]=x*o-g,e[8]=a*l,e[1]=a*f,e[5]=a*d,e[9]=-o,e[2]=g*o-x,e[6]=S+h*o,e[10]=a*c}else if(t.order==="ZXY"){const h=c*d,g=c*f,x=l*d,S=l*f;e[0]=h-S*o,e[4]=-a*f,e[8]=x+g*o,e[1]=g+x*o,e[5]=a*d,e[9]=S-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const h=a*d,g=a*f,x=o*d,S=o*f;e[0]=c*d,e[4]=x*l-g,e[8]=h*l+S,e[1]=c*f,e[5]=S*l+h,e[9]=g*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const h=a*c,g=a*l,x=o*c,S=o*l;e[0]=c*d,e[4]=S-h*f,e[8]=x*f+g,e[1]=f,e[5]=a*d,e[9]=-o*d,e[2]=-l*d,e[6]=g*f+x,e[10]=h-S*f}else if(t.order==="XZY"){const h=a*c,g=a*l,x=o*c,S=o*l;e[0]=c*d,e[4]=-f,e[8]=l*d,e[1]=h*f+S,e[5]=a*d,e[9]=g*f-x,e[2]=x*f-g,e[6]=o*d,e[10]=S*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(lu,t,cu)}lookAt(t,e,i){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Hn.crossVectors(i,Xe),Hn.lengthSq()===0&&(Math.abs(i.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Hn.crossVectors(i,Xe)),Hn.normalize(),As.crossVectors(Xe,Hn),s[0]=Hn.x,s[4]=As.x,s[8]=Xe.x,s[1]=Hn.y,s[5]=As.y,s[9]=Xe.y,s[2]=Hn.z,s[6]=As.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],f=i[5],h=i[9],g=i[13],x=i[2],S=i[6],m=i[10],p=i[14],E=i[3],b=i[7],T=i[11],L=i[15],A=s[0],I=s[4],v=s[8],R=s[12],B=s[1],C=s[5],H=s[9],q=s[13],Z=s[2],N=s[6],W=s[10],G=s[14],tt=s[3],et=s[7],ut=s[11],St=s[15];return r[0]=a*A+o*B+c*Z+l*tt,r[4]=a*I+o*C+c*N+l*et,r[8]=a*v+o*H+c*W+l*ut,r[12]=a*R+o*q+c*G+l*St,r[1]=d*A+f*B+h*Z+g*tt,r[5]=d*I+f*C+h*N+g*et,r[9]=d*v+f*H+h*W+g*ut,r[13]=d*R+f*q+h*G+g*St,r[2]=x*A+S*B+m*Z+p*tt,r[6]=x*I+S*C+m*N+p*et,r[10]=x*v+S*H+m*W+p*ut,r[14]=x*R+S*q+m*G+p*St,r[3]=E*A+b*B+T*Z+L*tt,r[7]=E*I+b*C+T*N+L*et,r[11]=E*v+b*H+T*W+L*ut,r[15]=E*R+b*q+T*G+L*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],d=t[2],f=t[6],h=t[10],g=t[14],x=t[3],S=t[7],m=t[11],p=t[15],E=c*g-l*h,b=o*g-l*f,T=o*h-c*f,L=a*g-l*d,A=a*h-c*d,I=a*f-o*d;return e*(S*E-m*b+p*T)-i*(x*E-m*L+p*A)+s*(x*b-S*L+p*I)-r*(x*T-S*A+m*I)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],f=t[9],h=t[10],g=t[11],x=t[12],S=t[13],m=t[14],p=t[15],E=e*o-i*a,b=e*c-s*a,T=e*l-r*a,L=i*c-s*o,A=i*l-r*o,I=s*l-r*c,v=d*S-f*x,R=d*m-h*x,B=d*p-g*x,C=f*m-h*S,H=f*p-g*S,q=h*p-g*m,Z=E*q-b*H+T*C+L*B-A*R+I*v;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/Z;return t[0]=(o*q-c*H+l*C)*N,t[1]=(s*H-i*q-r*C)*N,t[2]=(S*I-m*A+p*L)*N,t[3]=(h*A-f*I-g*L)*N,t[4]=(c*B-a*q-l*R)*N,t[5]=(e*q-s*B+r*R)*N,t[6]=(m*T-x*I-p*b)*N,t[7]=(d*I-h*T+g*b)*N,t[8]=(a*H-o*B+l*v)*N,t[9]=(i*B-e*H-r*v)*N,t[10]=(x*A-S*T+p*E)*N,t[11]=(f*T-d*A-g*E)*N,t[12]=(o*R-a*C-c*v)*N,t[13]=(e*C-i*R+s*v)*N,t[14]=(S*b-x*L-m*E)*N,t[15]=(d*L-f*b+h*E)*N,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,d=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+i,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,d=a+a,f=o+o,h=r*l,g=r*d,x=r*f,S=a*d,m=a*f,p=o*f,E=c*l,b=c*d,T=c*f,L=i.x,A=i.y,I=i.z;return s[0]=(1-(S+p))*L,s[1]=(g+T)*L,s[2]=(x-b)*L,s[3]=0,s[4]=(g-T)*A,s[5]=(1-(h+p))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(x+b)*I,s[9]=(m-E)*I,s[10]=(1-(h+S))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let a=wi.set(s[0],s[1],s[2]).length();const o=wi.set(s[4],s[5],s[6]).length(),c=wi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),en.copy(this);const l=1/a,d=1/o,f=1/c;return en.elements[0]*=l,en.elements[1]*=l,en.elements[2]*=l,en.elements[4]*=d,en.elements[5]*=d,en.elements[6]*=d,en.elements[8]*=f,en.elements[9]*=f,en.elements[10]*=f,e.setFromRotationMatrix(en),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=pn,c=!1){const l=this.elements,d=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),g=(i+s)/(i-s);let x,S;if(c)x=r/(a-r),S=a*r/(a-r);else if(o===pn)x=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===ms)x=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=pn,c=!1){const l=this.elements,d=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),g=-(i+s)/(i-s);let x,S;if(c)x=1/(a-r),S=a/(a-r);else if(o===pn)x=-2/(a-r),S=-(a+r)/(a-r);else if(o===ms)x=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};mr.prototype.isMatrix4=!0;let xe=mr;const wi=new F,en=new xe,lu=new F(0,0,0),cu=new F(1,1,1),Hn=new F,As=new F,Xe=new F,gl=new xe,_l=new ii;class si{constructor(t=0,e=0,i=0,s=si.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],f=s[2],h=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return gl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(gl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _l.setFromEuler(this),this.setFromQuaternion(_l,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class Jc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hu=0;const xl=new F,Ri=new ii,bn=new xe,ws=new F,Qi=new F,du=new F,uu=new ii,vl=new F(1,0,0),Ml=new F(0,1,0),Sl=new F(0,0,1),yl={type:"added"},fu={type:"removed"},Ci={type:"childadded",child:null},Nr={type:"childremoved",child:null};class Pe extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new F,e=new si,i=new ii,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new Nt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.premultiply(Ri),this}rotateX(t){return this.rotateOnAxis(vl,t)}rotateY(t){return this.rotateOnAxis(Ml,t)}rotateZ(t){return this.rotateOnAxis(Sl,t)}translateOnAxis(t,e){return xl.copy(t).applyQuaternion(this.quaternion),this.position.add(xl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(vl,t)}translateY(t){return this.translateOnAxis(Ml,t)}translateZ(t){return this.translateOnAxis(Sl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ws.copy(t):ws.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(Qi,ws,this.up):bn.lookAt(ws,Qi,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),Ri.setFromRotationMatrix(bn),this.quaternion.premultiply(Ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(yl),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(fu),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(yl),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,t,du),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,uu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),x=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new F(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class cs extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pu={type:"move"};class Fr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const S of t.hand.values()){const m=e.getJointPose(S,i),p=this._getHandJoint(l,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=d.position.distanceTo(f.position),g=.02,x=.005;l.inputState.pinching&&h>g+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=g-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pu)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new cs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function Or(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=$t.workingColorSpace){if(t=tu(t,1),e=Xt(e,0,1),i=Xt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Or(a,r,t+1/3),this.g=Or(a,r,t),this.b=Or(a,r,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function i(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){const i=Qc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return $t.workingToColorSpace(Ue.copy(this),t),Math.round(Xt(Ue.r*255,0,255))*65536+Math.round(Xt(Ue.g*255,0,255))*256+Math.round(Xt(Ue.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Ue.copy(this),e);const i=Ue.r,s=Ue.g,r=Ue.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=d<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=qe){$t.workingToColorSpace(Ue.copy(this),t);const e=Ue.r,i=Ue.g,s=Ue.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Rs);const i=Ir(Vn.h,Rs.h,e),s=Ir(Vn.s,Rs.s,e),r=Ir(Vn.l,Rs.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new jt;jt.NAMES=Qc;class mu extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const nn=new F,Tn=new F,Br=new F,An=new F,Ii=new F,Pi=new F,El=new F,kr=new F,zr=new F,Gr=new F,Hr=new _e,Vr=new _e,Wr=new _e;class Ze{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),nn.subVectors(t,e),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){nn.subVectors(s,e),Tn.subVectors(i,e),Br.subVectors(t,e);const a=nn.dot(nn),o=nn.dot(Tn),c=nn.dot(Br),l=Tn.dot(Tn),d=Tn.dot(Br),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,g=(l*c-o*d)*h,x=(a*d-o*c)*h;return r.set(1-g-x,x,g)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,An)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,An.x),c.addScaledVector(a,An.y),c.addScaledVector(o,An.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return Hr.setScalar(0),Vr.setScalar(0),Wr.setScalar(0),Hr.fromBufferAttribute(t,e),Vr.fromBufferAttribute(t,i),Wr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Hr,r.x),a.addScaledVector(Vr,r.y),a.addScaledVector(Wr,r.z),a}static isFrontFacing(t,e,i,s){return nn.subVectors(i,e),Tn.subVectors(t,e),nn.cross(Tn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),nn.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Ze.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Ii.subVectors(s,i),Pi.subVectors(r,i),kr.subVectors(t,i);const c=Ii.dot(kr),l=Pi.dot(kr);if(c<=0&&l<=0)return e.copy(i);zr.subVectors(t,s);const d=Ii.dot(zr),f=Pi.dot(zr);if(d>=0&&f<=d)return e.copy(s);const h=c*f-d*l;if(h<=0&&c>=0&&d<=0)return a=c/(c-d),e.copy(i).addScaledVector(Ii,a);Gr.subVectors(t,r);const g=Ii.dot(Gr),x=Pi.dot(Gr);if(x>=0&&g<=x)return e.copy(r);const S=g*l-c*x;if(S<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(i).addScaledVector(Pi,o);const m=d*x-g*f;if(m<=0&&f-d>=0&&g-x>=0)return El.subVectors(r,s),o=(f-d)/(f-d+(g-x)),e.copy(s).addScaledVector(El,o);const p=1/(m+S+h);return a=S*p,o=h*p,e.copy(i).addScaledVector(Ii,a).addScaledVector(Pi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class vs{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,sn):sn.fromBufferAttribute(r,a),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Cs.copy(i.boundingBox)),Cs.applyMatrix4(t.matrixWorld),this.union(Cs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ts),Is.subVectors(this.max,ts),Li.subVectors(t.a,ts),Di.subVectors(t.b,ts),Ui.subVectors(t.c,ts),Wn.subVectors(Di,Li),Xn.subVectors(Ui,Di),oi.subVectors(Li,Ui);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-oi.z,oi.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,oi.z,0,-oi.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-oi.y,oi.x,0];return!Xr(e,Li,Di,Ui,Is)||(e=[1,0,0,0,1,0,0,0,1],!Xr(e,Li,Di,Ui,Is))?!1:(Ps.crossVectors(Wn,Xn),e=[Ps.x,Ps.y,Ps.z],Xr(e,Li,Di,Ui,Is))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const wn=[new F,new F,new F,new F,new F,new F,new F,new F],sn=new F,Cs=new vs,Li=new F,Di=new F,Ui=new F,Wn=new F,Xn=new F,oi=new F,ts=new F,Is=new F,Ps=new F,li=new F;function Xr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){li.fromArray(n,r);const o=s.x*Math.abs(li.x)+s.y*Math.abs(li.y)+s.z*Math.abs(li.z),c=t.dot(li),l=e.dot(li),d=i.dot(li);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const ye=new F,Ls=new kt;let gu=0;class xn extends ri{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=cl,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ls.fromBufferAttribute(this,e),Ls.applyMatrix3(t),this.setXY(e,Ls.x,Ls.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ji(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Be(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ji(e,this.array)),e}setX(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ji(e,this.array)),e}setY(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ji(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ji(e,this.array)),e}setW(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),i=Be(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),i=Be(i,this.array),s=Be(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),i=Be(i,this.array),s=Be(s,this.array),r=Be(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==cl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class th extends xn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class eh extends xn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class He extends xn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const _u=new vs,es=new F,Yr=new F;class _r{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):_u.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;es.subVectors(t,this.center);const e=es.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(es,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(es.copy(t.center).add(Yr)),this.expandByPoint(es.copy(t.center).sub(Yr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let xu=0;const Ke=new xe,qr=new Pe,Ni=new F,Ye=new vs,ns=new vs,Ce=new F;class tn extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kd(t)?eh:th)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Nt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,i){return Ke.makeTranslation(t,e,i),this.applyMatrix4(Ke),this}scale(t,e,i){return Ke.makeScale(t,e,i),this.applyMatrix4(Ke),this}lookAt(t){return qr.lookAt(t),qr.updateMatrix(),this.applyMatrix4(qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new He(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ns.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Ye.min,ns.min),Ye.expandByPoint(Ce),Ce.addVectors(Ye.max,ns.max),Ye.expandByPoint(Ce)):(Ye.expandByPoint(ns.min),Ye.expandByPoint(ns.max))}Ye.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Ce.fromBufferAttribute(o,l),c&&(Ni.fromBufferAttribute(t,l),Ce.add(Ni)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new F,c[v]=new F;const l=new F,d=new F,f=new F,h=new kt,g=new kt,x=new kt,S=new F,m=new F;function p(v,R,B){l.fromBufferAttribute(i,v),d.fromBufferAttribute(i,R),f.fromBufferAttribute(i,B),h.fromBufferAttribute(r,v),g.fromBufferAttribute(r,R),x.fromBufferAttribute(r,B),d.sub(l),f.sub(l),g.sub(h),x.sub(h);const C=1/(g.x*x.y-x.x*g.y);isFinite(C)&&(S.copy(d).multiplyScalar(x.y).addScaledVector(f,-g.y).multiplyScalar(C),m.copy(f).multiplyScalar(g.x).addScaledVector(d,-x.x).multiplyScalar(C),o[v].add(S),o[R].add(S),o[B].add(S),c[v].add(m),c[R].add(m),c[B].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let v=0,R=E.length;v<R;++v){const B=E[v],C=B.start,H=B.count;for(let q=C,Z=C+H;q<Z;q+=3)p(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const b=new F,T=new F,L=new F,A=new F;function I(v){L.fromBufferAttribute(s,v),A.copy(L);const R=o[v];b.copy(R),b.sub(L.multiplyScalar(L.dot(R))).normalize(),T.crossVectors(A,R);const C=T.dot(c[v])<0?-1:1;a.setXYZW(v,b.x,b.y,b.z,C)}for(let v=0,R=E.length;v<R;++v){const B=E[v],C=B.start,H=B.count;for(let q=C,Z=C+H;q<Z;q+=3)I(t.getX(q+0)),I(t.getX(q+1)),I(t.getX(q+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);const s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,d=new F,f=new F;if(t)for(let h=0,g=t.count;h<g;h+=3){const x=t.getX(h+0),S=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,m),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,m),o.add(d),c.add(d),l.add(d),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,g=e.count;h<g;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,c){const l=o.array,d=o.itemSize,f=o.normalized,h=new l.constructor(c.length*d);let g=0,x=0;for(let S=0,m=c.length;S<m;S++){o.isInterleavedBufferAttribute?g=c[S]*o.data.stride+o.offset:g=c[S]*d;for(let p=0;p<d;p++)h[x++]=l[g++]}return new xn(h,d,f)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new tn,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,f=l.length;d<f;d++){const h=l[d],g=t(h,i);c.push(g)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let f=0,h=l.length;f<h;f++){const g=l[f];d.push(g.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],f=r[l];for(let h=0,g=f.length;h<g;h++)d.push(f[h].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,d=a.length;l<d;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let vu=0;class ji extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=xs(),this.name="",this.type="Material",this.blending=Gi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ua,this.blendDst=fa,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(i.blending=this.blending),this.side!==ni&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ua&&(i.blendSrc=this.blendSrc),this.blendDst!==fa&&(i.blendDst=this.blendDst),this.blendEquation!==ui&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Wi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ll&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Rn=new F,$r=new F,Ds=new F,Yn=new F,jr=new F,Us=new F,Kr=new F;class Ao{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Rn.copy(this.origin).addScaledVector(this.direction,e),Rn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){$r.copy(t).add(e).multiplyScalar(.5),Ds.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub($r);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ds),o=Yn.dot(this.direction),c=-Yn.dot(Ds),l=Yn.lengthSq(),d=Math.abs(1-a*a);let f,h,g,x;if(d>0)if(f=a*c-o,h=a*o-c,x=r*d,f>=0)if(h>=-x)if(h<=x){const S=1/d;f*=S,h*=S,g=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+l;else h<=-x?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),g=-f*f+h*(h+2*c)+l):h<=x?(f=0,h=Math.min(Math.max(-r,-c),r),g=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),g=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy($r).addScaledVector(Ds,h),g}intersectSphere(t,e){Rn.subVectors(t.center,this.origin);const i=Rn.dot(this.direction),s=Rn.dot(Rn)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),d>=0?(r=(t.min.y-h.y)*d,a=(t.max.y-h.y)*d):(r=(t.max.y-h.y)*d,a=(t.min.y-h.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Rn)!==null}intersectTriangle(t,e,i,s,r){jr.subVectors(e,t),Us.subVectors(i,t),Kr.crossVectors(jr,Us);let a=this.direction.dot(Kr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,t);const c=o*this.direction.dot(Us.crossVectors(Yn,Us));if(c<0)return null;const l=o*this.direction.dot(jr.cross(Yn));if(l<0||c+l>a)return null;const d=-o*Yn.dot(Kr);return d<0?null:this.at(d/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nh extends ji{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=Uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const bl=new xe,ci=new Ao,Ns=new _r,Tl=new F,Fs=new F,Os=new F,Bs=new F,Zr=new F,ks=new F,Al=new F,zs=new F;class Sn extends Pe{constructor(t=new tn,e=new nh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ks.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],f=r[c];d!==0&&(Zr.fromBufferAttribute(f,t),a?ks.addScaledVector(Zr,d):ks.addScaledVector(Zr.sub(e),d))}e.add(ks)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ns.copy(i.boundingSphere),Ns.applyMatrix4(r),ci.copy(t.ray).recast(t.near),!(Ns.containsPoint(ci.origin)===!1&&(ci.intersectSphere(Ns,Tl)===null||ci.origin.distanceToSquared(Tl)>(t.far-t.near)**2))&&(bl.copy(r).invert(),ci.copy(t.ray).applyMatrix4(bl),!(i.boundingBox!==null&&ci.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ci)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,h=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){const m=h[x],p=a[m.materialIndex],E=Math.max(m.start,g.start),b=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let T=E,L=b;T<L;T+=3){const A=o.getX(T),I=o.getX(T+1),v=o.getX(T+2);s=Gs(this,p,t,i,l,d,f,A,I,v),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,g.start),S=Math.min(o.count,g.start+g.count);for(let m=x,p=S;m<p;m+=3){const E=o.getX(m),b=o.getX(m+1),T=o.getX(m+2);s=Gs(this,a,t,i,l,d,f,E,b,T),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){const m=h[x],p=a[m.materialIndex],E=Math.max(m.start,g.start),b=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let T=E,L=b;T<L;T+=3){const A=T,I=T+1,v=T+2;s=Gs(this,p,t,i,l,d,f,A,I,v),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,g.start),S=Math.min(c.count,g.start+g.count);for(let m=x,p=S;m<p;m+=3){const E=m,b=m+1,T=m+2;s=Gs(this,a,t,i,l,d,f,E,b,T),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Mu(n,t,e,i,s,r,a,o){let c;if(t.side===Ge?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===ni,o),c===null)return null;zs.copy(o),zs.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(zs);return l<e.near||l>e.far?null:{distance:l,point:zs.clone(),object:n}}function Gs(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,Fs),n.getVertexPosition(c,Os),n.getVertexPosition(l,Bs);const d=Mu(n,t,e,i,Fs,Os,Bs,Al);if(d){const f=new F;Ze.getBarycoord(Al,Fs,Os,Bs,f),s&&(d.uv=Ze.getInterpolatedAttribute(s,o,c,l,f,new kt)),r&&(d.uv1=Ze.getInterpolatedAttribute(r,o,c,l,f,new kt)),a&&(d.normal=Ze.getInterpolatedAttribute(a,o,c,l,f,new F),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new F,materialIndex:0};Ze.getNormal(Fs,Os,Bs,h.normal),d.face=h,d.barycoord=f}return d}class Su extends Oe{constructor(t=null,e=1,i=1,s,r,a,o,c,l=Ie,d=Ie,f,h){super(null,a,o,c,l,d,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jr=new F,yu=new F,Eu=new Nt;class $n{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Jr.subVectors(i,e).cross(yu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(Jr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Eu.getNormalMatrix(t),s=this.coplanarPoint(Jr).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hi=new _r,bu=new kt(.5,.5),Hs=new F;class wo{constructor(t=new $n,e=new $n,i=new $n,s=new $n,r=new $n,a=new $n){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=pn,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],f=r[5],h=r[6],g=r[7],x=r[8],S=r[9],m=r[10],p=r[11],E=r[12],b=r[13],T=r[14],L=r[15];if(s[0].setComponents(l-a,g-d,p-x,L-E).normalize(),s[1].setComponents(l+a,g+d,p+x,L+E).normalize(),s[2].setComponents(l+o,g+f,p+S,L+b).normalize(),s[3].setComponents(l-o,g-f,p-S,L-b).normalize(),i)s[4].setComponents(c,h,m,T).normalize(),s[5].setComponents(l-c,g-h,p-m,L-T).normalize();else if(s[4].setComponents(l-c,g-h,p-m,L-T).normalize(),e===pn)s[5].setComponents(l+c,g+h,p+m,L+T).normalize();else if(e===ms)s[5].setComponents(c,h,m,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(t){hi.center.set(0,0,0);const e=bu.distanceTo(t.center);return hi.radius=.7071067811865476+e,hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Hs.x=s.normal.x>0?t.max.x:t.min.x,Hs.y=s.normal.y>0?t.max.y:t.min.y,Hs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ro extends ji{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ur=new F,fr=new F,wl=new xe,is=new Ao,Vs=new _r,Qr=new F,Rl=new F;class Tu extends Pe{constructor(t=new tn,e=new Ro){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)ur.fromBufferAttribute(e,s-1),fr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=ur.distanceTo(fr);t.setAttribute("lineDistance",new He(i,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vs.copy(i.boundingSphere),Vs.applyMatrix4(s),Vs.radius+=r,t.ray.intersectsSphere(Vs)===!1)return;wl.copy(s).invert(),is.copy(t.ray).applyMatrix4(wl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const g=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let S=g,m=x-1;S<m;S+=l){const p=d.getX(S),E=d.getX(S+1),b=Ws(this,t,is,c,p,E,S);b&&e.push(b)}if(this.isLineLoop){const S=d.getX(x-1),m=d.getX(g),p=Ws(this,t,is,c,S,m,x-1);p&&e.push(p)}}else{const g=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let S=g,m=x-1;S<m;S+=l){const p=Ws(this,t,is,c,S,S+1,S);p&&e.push(p)}if(this.isLineLoop){const S=Ws(this,t,is,c,x-1,g,x-1);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ws(n,t,e,i,s,r,a){const o=n.geometry.attributes.position;if(ur.fromBufferAttribute(o,s),fr.fromBufferAttribute(o,r),e.distanceSqToSegment(ur,fr,Qr,Rl)>i)return;Qr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Qr);if(!(l<t.near||l>t.far))return{distance:l,point:Rl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Cl=new F,Il=new F;class ih extends Tu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Cl.fromBufferAttribute(e,s),Il.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Cl.distanceTo(Il);t.setAttribute("lineDistance",new He(i,1))}else Rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sh extends Oe{constructor(t=[],e=Si,i,s,r,a,o,c,l,d){super(t,e,i,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Yi extends Oe{constructor(t,e,i=Mn,s,r,a,o=Ie,c=Ie,l,d=On,f=1){if(d!==On&&d!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new To(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Au extends Yi{constructor(t,e=Mn,i=Si,s,r,a=Ie,o=Ie,c,l=On){const d={width:t,height:t,depth:1},f=[d,d,d,d,d,d];super(t,t,e,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class rh extends Oe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ki extends tn{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],f=[];let h=0,g=0;x("z","y","x",-1,-1,i,e,t,a,r,0),x("z","y","x",1,-1,i,e,-t,a,r,1),x("x","z","y",1,1,t,i,e,s,a,2),x("x","z","y",1,-1,t,i,-e,s,a,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new He(l,3)),this.setAttribute("normal",new He(d,3)),this.setAttribute("uv",new He(f,2));function x(S,m,p,E,b,T,L,A,I,v,R){const B=T/I,C=L/v,H=T/2,q=L/2,Z=A/2,N=I+1,W=v+1;let G=0,tt=0;const et=new F;for(let ut=0;ut<W;ut++){const St=ut*C-q;for(let At=0;At<N;At++){const Kt=At*B-H;et[S]=Kt*E,et[m]=St*b,et[p]=Z,l.push(et.x,et.y,et.z),et[S]=0,et[m]=0,et[p]=A>0?1:-1,d.push(et.x,et.y,et.z),f.push(At/I),f.push(1-ut/v),G+=1}}for(let ut=0;ut<v;ut++)for(let St=0;St<I;St++){const At=h+St+N*ut,Kt=h+St+N*(ut+1),ne=h+(St+1)+N*(ut+1),zt=h+(St+1)+N*ut;c.push(At,Kt,zt),c.push(Kt,ne,zt),tt+=6}o.addGroup(g,tt,R),g+=tt,h+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ki(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const Xs=new F,Ys=new F,ta=new F,qs=new Ze;class wu extends tn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ds*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],d=["a","b","c"],f=new Array(3),h={},g=[];for(let x=0;x<c;x+=3){a?(l[0]=a.getX(x),l[1]=a.getX(x+1),l[2]=a.getX(x+2)):(l[0]=x,l[1]=x+1,l[2]=x+2);const{a:S,b:m,c:p}=qs;if(S.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),qs.getNormal(ta),f[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let E=0;E<3;E++){const b=(E+1)%3,T=f[E],L=f[b],A=qs[d[E]],I=qs[d[b]],v=`${T}_${L}`,R=`${L}_${T}`;R in h&&h[R]?(ta.dot(h[R].normal)<=r&&(g.push(A.x,A.y,A.z),g.push(I.x,I.y,I.z)),h[R]=null):v in h||(h[v]={index0:l[E],index1:l[b],normal:ta.clone()})}}for(const x in h)if(h[x]){const{index0:S,index1:m}=h[x];Xs.fromBufferAttribute(o,S),Ys.fromBufferAttribute(o,m),g.push(Xs.x,Xs.y,Xs.z),g.push(Ys.x,Ys.y,Ys.z)}this.setAttribute("position",new He(g,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class xr extends tn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,d=c+1,f=t/o,h=e/c,g=[],x=[],S=[],m=[];for(let p=0;p<d;p++){const E=p*h-a;for(let b=0;b<l;b++){const T=b*f-r;x.push(T,-E,0),S.push(0,0,1),m.push(b/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){const b=E+l*p,T=E+l*(p+1),L=E+1+l*(p+1),A=E+1+l*p;g.push(b,T,A),g.push(T,L,A)}this.setIndex(g),this.setAttribute("position",new He(x,3)),this.setAttribute("normal",new He(S,3)),this.setAttribute("uv",new He(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xr(t.width,t.height,t.widthSegments,t.heightSegments)}}function qi(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(Pl(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Pl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Fe(n){const t={};for(let e=0;e<n.length;e++){const i=qi(n[e]);for(const s in i)t[s]=i[s]}return t}function Pl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Ru(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function ah(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const Cu={clone:qi,merge:Fe};var Iu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yn extends ji{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Iu,this.fragmentShader=Pu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qi(t.uniforms),this.uniformsGroups=Ru(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Lu extends yn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Du extends ji{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qa,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Uu extends ji{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Nu extends ji{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class oh extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const ea=new xe,Ll=new F,Dl=new F;class Fu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.mapType=$e,this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wo,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Ll.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ll),Dl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dl),e.updateMatrixWorld(),ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===ms||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ea)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const $s=new F,js=new ii,hn=new F;class lh extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose($s,js,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($s,js,hn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose($s,js,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($s,js,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qn=new F,Ul=new kt,Nl=new kt;class rn extends lh{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=eo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ds*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return eo*2*Math.atan(Math.tan(ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qn.x,qn.y).multiplyScalar(-t/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qn.x,qn.y).multiplyScalar(-t/qn.z)}getViewSize(t,e){return this.getViewBounds(t,Ul,Nl),e.subVectors(Nl,Ul)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ds*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class vr extends lh{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ou extends Fu{constructor(){super(new vr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fl extends oh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new Ou}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Bu extends oh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Fi=-90,Oi=1;class ku extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(Fi,Oi,t,e);s.layers=this.layers,this.add(s);const r=new rn(Fi,Oi,t,e);r.layers=this.layers,this.add(r);const a=new rn(Fi,Oi,t,e);a.layers=this.layers,this.add(a);const o=new rn(Fi,Oi,t,e);o.layers=this.layers,this.add(o);const c=new rn(Fi,Oi,t,e);c.layers=this.layers,this.add(c);const l=new rn(Fi,Oi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===pn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(f,h,g),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class zu extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Ol{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Xo=class Xo{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Xo.prototype.isMatrix2=!0;let Bl=Xo;class Gu extends ih{constructor(t=10,e=10,i=4473924,s=8947848){i=new jt(i),s=new jt(s);const r=e/2,a=t/e,o=t/2,c=[],l=[];for(let h=0,g=0,x=-o;h<=e;h++,x+=a){c.push(-o,0,x,o,0,x),c.push(x,0,-o,x,0,o);const S=h===r?i:s;S.toArray(l,g),g+=3,S.toArray(l,g),g+=3,S.toArray(l,g),g+=3,S.toArray(l,g),g+=3}const d=new tn;d.setAttribute("position",new He(c,3)),d.setAttribute("color",new He(l,3));const f=new Ro({vertexColors:!0,toneMapped:!1});super(d,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Hu extends ri{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Rt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function kl(n,t,e,i){const s=Vu(i);switch(e){case qc:return n*t;case jc:return n*t/s.components*s.byteLength;case Mo:return n*t/s.components*s.byteLength;case yi:return n*t*2/s.components*s.byteLength;case So:return n*t*2/s.components*s.byteLength;case $c:return n*t*3/s.components*s.byteLength;case an:return n*t*4/s.components*s.byteLength;case yo:return n*t*4/s.components*s.byteLength;case er:case nr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ir:case sr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ba:case Aa:return Math.max(n,16)*Math.max(t,8)/4;case Ea:case Ta:return Math.max(n,8)*Math.max(t,8)/2;case wa:case Ra:case Ia:case Pa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ca:case or:case La:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Da:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Na:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ka:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case za:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ga:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Va:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Xa:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ya:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case qa:case $a:case ja:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Ka:case Za:return Math.ceil(n/4)*Math.ceil(t/4)*8;case lr:case Ja:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vu(n){switch(n){case $e:case Vc:return{byteLength:1,components:1};case fs:case Wc:case Fn:return{byteLength:2,components:1};case xo:case vo:return{byteLength:2,components:4};case Mn:case _o:case fn:return{byteLength:4,components:1};case Xc:case Yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:go}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=go);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ch(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Wu(n){const t=new WeakMap;function e(o,c){const l=o.array,d=o.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,d),o.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const d=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,d);else{f.sort((g,x)=>g.start-x.start);let h=0;for(let g=1;g<f.length;g++){const x=f[h],S=f[g];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++h,f[h]=S)}f.length=h+1;for(let g=0,x=f.length;g<x;g++){const S=f[g];n.bufferSubData(l,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Xu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yu=`#ifdef USE_ALPHAHASH
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
#endif`,qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$u=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ju=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ku=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zu=`#ifdef USE_AOMAP
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
#endif`,Ju=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qu=`#ifdef USE_BATCHING
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
#endif`,tf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ef=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rf=`#ifdef USE_IRIDESCENCE
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
#endif`,af=`#ifdef USE_BUMPMAP
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
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,mf=`#define PI 3.141592653589793
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
} // validated`,gf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_f=`vec3 transformedNormal = objectNormal;
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
#endif`,xf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ef=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bf=`#ifdef USE_ENVMAP
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
#endif`,Tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
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
#endif`,wf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,If=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Df=`#ifdef USE_GRADIENTMAP
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
}`,Uf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Of=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Bf=`#ifdef USE_ENVMAP
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
#endif`,kf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vf=`PhysicalMaterial material;
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
#endif`,Wf=`uniform sampler2D dfgLUT;
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
}`,Xf=`
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
#endif`,Yf=`#if defined( RE_IndirectDiffuse )
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
#endif`,qf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$f=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ep=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,np=`#if defined( USE_POINTS_UV )
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
#endif`,ip=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ap=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`#ifdef USE_MORPHTARGETS
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
#endif`,cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mp=`#ifdef USE_NORMALMAP
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
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_p=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ip=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pp=`float getShadowMask() {
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
}`,Lp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dp=`#ifdef USE_SKINNING
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
#endif`,Up=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Np=`#ifdef USE_SKINNING
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
#endif`,Fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zp=`#ifdef USE_TRANSMISSION
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
#endif`,Gp=`#ifdef USE_TRANSMISSION
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qp=`uniform sampler2D t2D;
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
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`#include <common>
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
}`,Qp=`#if DEPTH_PACKING == 3200
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
}`,tm=`#define DISTANCE
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
}`,em=`#define DISTANCE
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`uniform float scale;
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
}`,rm=`uniform vec3 diffuse;
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
}`,am=`#include <common>
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
}`,om=`uniform vec3 diffuse;
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
}`,lm=`#define LAMBERT
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
}`,cm=`#define LAMBERT
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
}`,hm=`#define MATCAP
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
}`,dm=`#define MATCAP
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
}`,um=`#define NORMAL
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
}`,fm=`#define NORMAL
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
}`,pm=`#define PHONG
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
}`,mm=`#define PHONG
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
}`,gm=`#define STANDARD
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
}`,_m=`#define STANDARD
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
}`,xm=`#define TOON
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
}`,vm=`#define TOON
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
}`,Mm=`uniform float size;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,ym=`#include <common>
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
}`,Em=`uniform vec3 color;
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
}`,bm=`uniform float rotation;
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
}`,Tm=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:Xu,alphahash_pars_fragment:Yu,alphamap_fragment:qu,alphamap_pars_fragment:$u,alphatest_fragment:ju,alphatest_pars_fragment:Ku,aomap_fragment:Zu,aomap_pars_fragment:Ju,batching_pars_vertex:Qu,batching_vertex:tf,begin_vertex:ef,beginnormal_vertex:nf,bsdfs:sf,iridescence_fragment:rf,bumpmap_pars_fragment:af,clipping_planes_fragment:of,clipping_planes_pars_fragment:lf,clipping_planes_pars_vertex:cf,clipping_planes_vertex:hf,color_fragment:df,color_pars_fragment:uf,color_pars_vertex:ff,color_vertex:pf,common:mf,cube_uv_reflection_fragment:gf,defaultnormal_vertex:_f,displacementmap_pars_vertex:xf,displacementmap_vertex:vf,emissivemap_fragment:Mf,emissivemap_pars_fragment:Sf,colorspace_fragment:yf,colorspace_pars_fragment:Ef,envmap_fragment:bf,envmap_common_pars_fragment:Tf,envmap_pars_fragment:Af,envmap_pars_vertex:wf,envmap_physical_pars_fragment:Bf,envmap_vertex:Rf,fog_vertex:Cf,fog_pars_vertex:If,fog_fragment:Pf,fog_pars_fragment:Lf,gradientmap_pars_fragment:Df,lightmap_pars_fragment:Uf,lights_lambert_fragment:Nf,lights_lambert_pars_fragment:Ff,lights_pars_begin:Of,lights_toon_fragment:kf,lights_toon_pars_fragment:zf,lights_phong_fragment:Gf,lights_phong_pars_fragment:Hf,lights_physical_fragment:Vf,lights_physical_pars_fragment:Wf,lights_fragment_begin:Xf,lights_fragment_maps:Yf,lights_fragment_end:qf,lightprobes_pars_fragment:$f,logdepthbuf_fragment:jf,logdepthbuf_pars_fragment:Kf,logdepthbuf_pars_vertex:Zf,logdepthbuf_vertex:Jf,map_fragment:Qf,map_pars_fragment:tp,map_particle_fragment:ep,map_particle_pars_fragment:np,metalnessmap_fragment:ip,metalnessmap_pars_fragment:sp,morphinstance_vertex:rp,morphcolor_vertex:ap,morphnormal_vertex:op,morphtarget_pars_vertex:lp,morphtarget_vertex:cp,normal_fragment_begin:hp,normal_fragment_maps:dp,normal_pars_fragment:up,normal_pars_vertex:fp,normal_vertex:pp,normalmap_pars_fragment:mp,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:_p,clearcoat_pars_fragment:xp,iridescence_pars_fragment:vp,opaque_fragment:Mp,packing:Sp,premultiplied_alpha_fragment:yp,project_vertex:Ep,dithering_fragment:bp,dithering_pars_fragment:Tp,roughnessmap_fragment:Ap,roughnessmap_pars_fragment:wp,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Cp,shadowmap_vertex:Ip,shadowmask_pars_fragment:Pp,skinbase_vertex:Lp,skinning_pars_vertex:Dp,skinning_vertex:Up,skinnormal_vertex:Np,specularmap_fragment:Fp,specularmap_pars_fragment:Op,tonemapping_fragment:Bp,tonemapping_pars_fragment:kp,transmission_fragment:zp,transmission_pars_fragment:Gp,uv_pars_fragment:Hp,uv_pars_vertex:Vp,uv_vertex:Wp,worldpos_vertex:Xp,background_vert:Yp,background_frag:qp,backgroundCube_vert:$p,backgroundCube_frag:jp,cube_vert:Kp,cube_frag:Zp,depth_vert:Jp,depth_frag:Qp,distance_vert:tm,distance_frag:em,equirect_vert:nm,equirect_frag:im,linedashed_vert:sm,linedashed_frag:rm,meshbasic_vert:am,meshbasic_frag:om,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:hm,meshmatcap_frag:dm,meshnormal_vert:um,meshnormal_frag:fm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:_m,meshtoon_vert:xm,meshtoon_frag:vm,points_vert:Mm,points_frag:Sm,shadow_vert:ym,shadow_frag:Em,sprite_vert:bm,sprite_frag:Tm},dt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},un={basic:{uniforms:Fe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Fe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new jt(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Fe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Fe([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Fe([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Fe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Fe([dt.points,dt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Fe([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Fe([dt.common,dt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Fe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Fe([dt.sprite,dt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:Fe([dt.common,dt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:Fe([dt.lights,dt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};un.physical={uniforms:Fe([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Ks={r:0,b:0,g:0},Am=new xe,hh=new Nt;hh.set(-1,0,0,0,1,0,0,0,1);function wm(n,t,e,i,s,r){const a=new jt(0);let o=s===!0?0:1,c,l,d=null,f=0,h=null;function g(E){let b=E.isScene===!0?E.background:null;if(b&&b.isTexture){const T=E.backgroundBlurriness>0;b=t.get(b,T)}return b}function x(E){let b=!1;const T=g(E);T===null?m(a,o):T&&T.isColor&&(m(T,1),b=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?e.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(E,b){const T=g(b);T&&(T.isCubeTexture||T.mapping===gr)?(l===void 0&&(l=new Sn(new Ki(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:qi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(L,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Am.makeRotationFromEuler(b.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(hh),l.material.toneMapped=$t.getTransfer(T.colorSpace)!==ee,(d!==T||f!==T.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=T,f=T.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Sn(new xr(2,2),new yn({name:"BackgroundMaterial",uniforms:qi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=$t.getTransfer(T.colorSpace)!==ee,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||f!==T.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=T,f=T.version,h=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,b){E.getRGB(Ks,ah(n)),e.buffers.color.setClear(Ks.r,Ks.g,Ks.b,b,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,b=1){a.set(E),o=b,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,m(a,o)},render:x,addToRenderList:S,dispose:p}}function Rm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(C,H,q,Z,N){let W=!1;const G=f(C,Z,q,H);r!==G&&(r=G,l(r.object)),W=g(C,Z,q,N),W&&x(C,Z,q,N),N!==null&&t.update(N,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,T(C,H,q,Z),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function d(C){return n.deleteVertexArray(C)}function f(C,H,q,Z){const N=Z.wireframe===!0;let W=i[H.id];W===void 0&&(W={},i[H.id]=W);const G=C.isInstancedMesh===!0?C.id:0;let tt=W[G];tt===void 0&&(tt={},W[G]=tt);let et=tt[q.id];et===void 0&&(et={},tt[q.id]=et);let ut=et[N];return ut===void 0&&(ut=h(c()),et[N]=ut),ut}function h(C){const H=[],q=[],Z=[];for(let N=0;N<e;N++)H[N]=0,q[N]=0,Z[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:q,attributeDivisors:Z,object:C,attributes:{},index:null}}function g(C,H,q,Z){const N=r.attributes,W=H.attributes;let G=0;const tt=q.getAttributes();for(const et in tt)if(tt[et].location>=0){const St=N[et];let At=W[et];if(At===void 0&&(et==="instanceMatrix"&&C.instanceMatrix&&(At=C.instanceMatrix),et==="instanceColor"&&C.instanceColor&&(At=C.instanceColor)),St===void 0||St.attribute!==At||At&&St.data!==At.data)return!0;G++}return r.attributesNum!==G||r.index!==Z}function x(C,H,q,Z){const N={},W=H.attributes;let G=0;const tt=q.getAttributes();for(const et in tt)if(tt[et].location>=0){let St=W[et];St===void 0&&(et==="instanceMatrix"&&C.instanceMatrix&&(St=C.instanceMatrix),et==="instanceColor"&&C.instanceColor&&(St=C.instanceColor));const At={};At.attribute=St,St&&St.data&&(At.data=St.data),N[et]=At,G++}r.attributes=N,r.attributesNum=G,r.index=Z}function S(){const C=r.newAttributes;for(let H=0,q=C.length;H<q;H++)C[H]=0}function m(C){p(C,0)}function p(C,H){const q=r.newAttributes,Z=r.enabledAttributes,N=r.attributeDivisors;q[C]=1,Z[C]===0&&(n.enableVertexAttribArray(C),Z[C]=1),N[C]!==H&&(n.vertexAttribDivisor(C,H),N[C]=H)}function E(){const C=r.newAttributes,H=r.enabledAttributes;for(let q=0,Z=H.length;q<Z;q++)H[q]!==C[q]&&(n.disableVertexAttribArray(q),H[q]=0)}function b(C,H,q,Z,N,W,G){G===!0?n.vertexAttribIPointer(C,H,q,N,W):n.vertexAttribPointer(C,H,q,Z,N,W)}function T(C,H,q,Z){S();const N=Z.attributes,W=q.getAttributes(),G=H.defaultAttributeValues;for(const tt in W){const et=W[tt];if(et.location>=0){let ut=N[tt];if(ut===void 0&&(tt==="instanceMatrix"&&C.instanceMatrix&&(ut=C.instanceMatrix),tt==="instanceColor"&&C.instanceColor&&(ut=C.instanceColor)),ut!==void 0){const St=ut.normalized,At=ut.itemSize,Kt=t.get(ut);if(Kt===void 0)continue;const ne=Kt.buffer,zt=Kt.type,K=Kt.bytesPerElement,mt=zt===n.INT||zt===n.UNSIGNED_INT||ut.gpuType===_o;if(ut.isInterleavedBufferAttribute){const at=ut.data,Ct=at.stride,Ut=ut.offset;if(at.isInstancedInterleavedBuffer){for(let It=0;It<et.locationSize;It++)p(et.location+It,at.meshPerAttribute);C.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let It=0;It<et.locationSize;It++)m(et.location+It);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let It=0;It<et.locationSize;It++)b(et.location+It,At/et.locationSize,zt,St,Ct*K,(Ut+At/et.locationSize*It)*K,mt)}else{if(ut.isInstancedBufferAttribute){for(let at=0;at<et.locationSize;at++)p(et.location+at,ut.meshPerAttribute);C.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let at=0;at<et.locationSize;at++)m(et.location+at);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let at=0;at<et.locationSize;at++)b(et.location+at,At/et.locationSize,zt,St,At*K,At/et.locationSize*at*K,mt)}}else if(G!==void 0){const St=G[tt];if(St!==void 0)switch(St.length){case 2:n.vertexAttrib2fv(et.location,St);break;case 3:n.vertexAttrib3fv(et.location,St);break;case 4:n.vertexAttrib4fv(et.location,St);break;default:n.vertexAttrib1fv(et.location,St)}}}}E()}function L(){R();for(const C in i){const H=i[C];for(const q in H){const Z=H[q];for(const N in Z){const W=Z[N];for(const G in W)d(W[G].object),delete W[G];delete Z[N]}}delete i[C]}}function A(C){if(i[C.id]===void 0)return;const H=i[C.id];for(const q in H){const Z=H[q];for(const N in Z){const W=Z[N];for(const G in W)d(W[G].object),delete W[G];delete Z[N]}}delete i[C.id]}function I(C){for(const H in i){const q=i[H];for(const Z in q){const N=q[Z];if(N[C.id]===void 0)continue;const W=N[C.id];for(const G in W)d(W[G].object),delete W[G];delete N[C.id]}}}function v(C){for(const H in i){const q=i[H],Z=C.isInstancedMesh===!0?C.id:0,N=q[Z];if(N!==void 0){for(const W in N){const G=N[W];for(const tt in G)d(G[tt].object),delete G[tt];delete N[W]}delete q[Z],Object.keys(q).length===0&&delete i[H]}}}function R(){B(),a=!0,r!==s&&(r=s,l(r.object))}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:B,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:I,initAttributes:S,enableAttribute:m,disableUnusedAttributes:E}}function Cm(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),e.update(l,i,d))}function o(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let h=0;for(let g=0;g<d;g++)h+=l[g];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Im(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==an&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){const v=I===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==$e&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==fn&&!v)}function c(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Rt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:T,maxSamples:L,samples:A}}function Pm(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new $n,o=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const g=f.length!==0||h||i!==0||s;return s=h,i=f.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=d(f,h,0)},this.setState=function(f,h,g){const x=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!s||x===null||x.length===0||r&&!m)r?d(null):l();else{const E=r?0:i,b=E*4;let T=p.clippingState||null;c.value=T,T=d(x,h,b,g);for(let L=0;L!==b;++L)T[L]=e[L];p.clippingState=T,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(f,h,g,x){const S=f!==null?f.length:0;let m=null;if(S!==0){if(m=c.value,x!==!0||m===null){const p=g+S*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,T=g;b!==S;++b,T+=4)a.copy(f[b]).applyMatrix4(E,o),a.normal.toArray(m,T),m[T+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}const Jn=4,zl=[.125,.215,.35,.446,.526,.582],fi=20,Lm=256,ss=new vr,Gl=new jt;let na=null,ia=0,sa=0,ra=!1;const Dm=new F;class Hl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=Dm}=r;na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(na,ia,sa),this._renderer.xr.enabled=ra,t.scissorTest=!1,Bi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===Xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ne,minFilter:Ne,generateMipmaps:!1,type:Fn,format:an,colorSpace:cr,depthBuffer:!1},s=Vl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vl(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Um(r)),this._blurMaterial=Fm(r,t,e),this._ggxMaterial=Nm(r,t,e)}return s}_compileMaterial(t){const e=new Sn(new tn,t);this._renderer.compile(e,ss)}_sceneToCubeUV(t,e,i,s,r){const c=new rn(90,1,e,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,g=f.toneMapping;f.getClearColor(Gl),f.toneMapping=gn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Sn(new Ki,new nh({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let p=!1;const E=t.background;E?E.isColor&&(m.color.copy(E),t.background=null,p=!0):(m.color.copy(Gl),p=!0);for(let b=0;b<6;b++){const T=b%3;T===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[b],r.y,r.z)):T===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[b]));const L=this._cubeSize;Bi(s,T*L,b>2?L:0,L,L),f.setRenderTarget(s),p&&f.render(S,c),f.render(t,c)}f.toneMapping=g,f.autoClear=h,t.background=E}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Si||t.mapping===Xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Bi(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,ss)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-d*d),h=0+l*1.25,g=f*h,{_lodMax:x}=this,S=this._sizeLods[i],m=3*S*(i>x-Jn?i-x+Jn:0),p=4*(this._cubeSize-S);c.envMap.value=t.texture,c.roughness.value=g,c.mipInt.value=x-e,Bi(r,m,p,3*S,2*S),s.setRenderTarget(r),s.render(o,ss),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-i,Bi(t,m,p,3*S,2*S),s.setRenderTarget(t),s.render(o,ss)}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Jt("blur direction must be either latitudinal or longitudinal!");const d=3,f=this._lodMeshes[s];f.material=l;const h=l.uniforms,g=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*fi-1),S=r/x,m=isFinite(r)?1+Math.floor(d*S):fi;m>fi&&Rt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fi}`);const p=[];let E=0;for(let I=0;I<fi;++I){const v=I/S,R=Math.exp(-v*v/2);p.push(R),I===0?E+=R:I<m&&(E+=2*R)}for(let I=0;I<p.length;I++)p[I]=p[I]/E;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=x,h.mipInt.value=b-i;const T=this._sizeLods[s],L=3*T*(s>b-Jn?s-b+Jn:0),A=4*(this._cubeSize-T);Bi(e,L,A,3*T,2*T),c.setRenderTarget(e),c.render(f,ss)}}function Um(n){const t=[],e=[],i=[];let s=n;const r=n-Jn+1+zl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>n-Jn?c=zl[a-n+Jn-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),d=-l,f=1+l,h=[d,d,f,d,f,f,d,d,f,f,d,f],g=6,x=6,S=3,m=2,p=1,E=new Float32Array(S*x*g),b=new Float32Array(m*x*g),T=new Float32Array(p*x*g);for(let A=0;A<g;A++){const I=A%3*2/3-1,v=A>2?0:-1,R=[I,v,0,I+2/3,v,0,I+2/3,v+1,0,I,v,0,I+2/3,v+1,0,I,v+1,0];E.set(R,S*x*A),b.set(h,m*x*A);const B=[A,A,A,A,A,A];T.set(B,p*x*A)}const L=new tn;L.setAttribute("position",new xn(E,S)),L.setAttribute("uv",new xn(b,m)),L.setAttribute("faceIndex",new xn(T,p)),i.push(new Sn(L,null)),s>Jn&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Vl(n,t,e){const i=new _n(n,t,e);return i.texture.mapping=gr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Bi(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Nm(n,t,e){return new yn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Lm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Mr(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Fm(n,t,e){const i=new Float32Array(fi),s=new F(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mr(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Wl(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mr(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Xl(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Mr(){return`

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
	`}class dh extends _n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new sh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ki(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:qi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ge,blending:Dn});r.uniforms.tEquirect.value=e;const a=new Sn(s,r),o=e.minFilter;return e.minFilter===pi&&(e.minFilter=Ne),new ku(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}function Om(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,g=!1){return h==null?null:g?a(h):r(h)}function r(h){if(h&&h.isTexture){const g=h.mapping;if(g===wr||g===Rr)if(t.has(h)){const x=t.get(h).texture;return o(x,h.mapping)}else{const x=h.image;if(x&&x.height>0){const S=new dh(x.height);return S.fromEquirectangularTexture(n,h),t.set(h,S),h.addEventListener("dispose",l),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const g=h.mapping,x=g===wr||g===Rr,S=g===Si||g===Xi;if(x||S){let m=e.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Hl(n)),m=x?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{const E=h.image;return x&&E&&E.height>0||S&&E&&c(E)?(i===null&&(i=new Hl(n)),m=x?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",d),m.texture):null}}}return h}function o(h,g){return g===wr?h.mapping=Si:g===Rr&&(h.mapping=Xi),h}function c(h){let g=0;const x=6;for(let S=0;S<x;S++)h[S]!==void 0&&g++;return g===x}function l(h){const g=h.target;g.removeEventListener("dispose",l);const x=t.get(g);x!==void 0&&(t.delete(g),x.dispose())}function d(h){const g=h.target;g.removeEventListener("dispose",d);const x=e.get(g);x!==void 0&&(e.delete(g),x.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Bm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&to("WebGLRenderer: "+i+" extension not supported."),s}}}function km(n,t,e,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const x in h.attributes)t.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete s[h.id];const g=r.get(h);g&&(t.remove(g),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER)}function l(f){const h=[],g=f.index,x=f.attributes.position;let S=0;if(x===void 0)return;if(g!==null){const E=g.array;S=g.version;for(let b=0,T=E.length;b<T;b+=3){const L=E[b+0],A=E[b+1],I=E[b+2];h.push(L,A,A,I,I,L)}}else{const E=x.array;S=x.version;for(let b=0,T=E.length/3-1;b<T;b+=3){const L=b+0,A=b+1,I=b+2;h.push(L,A,A,I,I,L)}}const m=new(x.count>=65535?eh:th)(h,1);m.version=S;const p=r.get(f);p&&t.remove(p),r.set(f,m)}function d(f){const h=r.get(f);if(h){const g=f.index;g!==null&&h.version<g.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:d}}function zm(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){n.drawElements(i,h,r,f*a),e.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,r,f*a,g),e.update(h,i,g))}function d(f,h,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,g);let S=0;for(let m=0;m<g;m++)S+=h[m];e.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function Gm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Hm(n,t,e){const i=new WeakMap,s=new _e;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let B=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",B)};var g=B;h!==void 0&&h.texture.dispose();const x=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let T=0;x===!0&&(T=1),S===!0&&(T=2),m===!0&&(T=3);let L=o.attributes.position.count*T,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const I=new Float32Array(L*A*4*f),v=new Zc(I,L,A,f);v.type=fn,v.needsUpdate=!0;const R=T*4;for(let C=0;C<f;C++){const H=p[C],q=E[C],Z=b[C],N=L*A*4*C;for(let W=0;W<H.count;W++){const G=W*R;x===!0&&(s.fromBufferAttribute(H,W),I[N+G+0]=s.x,I[N+G+1]=s.y,I[N+G+2]=s.z,I[N+G+3]=0),S===!0&&(s.fromBufferAttribute(q,W),I[N+G+4]=s.x,I[N+G+5]=s.y,I[N+G+6]=s.z,I[N+G+7]=0),m===!0&&(s.fromBufferAttribute(Z,W),I[N+G+8]=s.x,I[N+G+9]=s.y,I[N+G+10]=s.z,I[N+G+11]=Z.itemSize===4?s.w:1)}}h={count:f,texture:v,size:new kt(L,A)},i.set(o,h),o.addEventListener("dispose",B)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let x=0;for(let m=0;m<l.length;m++)x+=l[m];const S=o.morphTargetsRelative?1:1-x;c.getUniforms().setValue(n,"morphTargetBaseInfluence",S),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Vm(n,t,e,i,s){let r=new WeakMap;function a(l){const d=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==d&&(t.update(h),r.set(h,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==d&&(g.update(),r.set(g,d))}return h}function o(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:o}}const Wm={[Nc]:"LINEAR_TONE_MAPPING",[Fc]:"REINHARD_TONE_MAPPING",[Oc]:"CINEON_TONE_MAPPING",[Bc]:"ACES_FILMIC_TONE_MAPPING",[zc]:"AGX_TONE_MAPPING",[Gc]:"NEUTRAL_TONE_MAPPING",[kc]:"CUSTOM_TONE_MAPPING"};function Xm(n,t,e,i,s){const r=new _n(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new Yi(t,e):void 0}),a=new _n(t,e,{type:Fn,depthBuffer:!1,stencilBuffer:!1}),o=new tn;o.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new He([0,2,0,0,2,0],2));const c=new Lu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Sn(o,c),d=new vr(-1,1,1,-1,0,1);let f=null,h=null,g=!1,x,S=null,m=[],p=!1;this.setSize=function(E,b){r.setSize(E,b),a.setSize(E,b);for(let T=0;T<m.length;T++){const L=m[T];L.setSize&&L.setSize(E,b)}},this.setEffects=function(E){m=E,p=m.length>0&&m[0].isRenderPass===!0;const b=r.width,T=r.height;for(let L=0;L<m.length;L++){const A=m[L];A.setSize&&A.setSize(b,T)}},this.begin=function(E,b){if(g||E.toneMapping===gn&&m.length===0)return!1;if(S=b,b!==null){const T=b.width,L=b.height;(r.width!==T||r.height!==L)&&this.setSize(T,L)}return p===!1&&E.setRenderTarget(r),x=E.toneMapping,E.toneMapping=gn,!0},this.hasRenderPass=function(){return p},this.end=function(E,b){E.toneMapping=x,g=!0;let T=r,L=a;for(let A=0;A<m.length;A++){const I=m[A];if(I.enabled!==!1&&(I.render(E,L,T,b),I.needsSwap!==!1)){const v=T;T=L,L=v}}if(f!==E.outputColorSpace||h!==E.toneMapping){f=E.outputColorSpace,h=E.toneMapping,c.defines={},$t.getTransfer(f)===ee&&(c.defines.SRGB_TRANSFER="");const A=Wm[h];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,E.setRenderTarget(S),E.render(l,d),S=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const uh=new Oe,no=new Yi(1,1),fh=new Zc,ph=new ou,mh=new sh,Yl=[],ql=[],$l=new Float32Array(16),jl=new Float32Array(9),Kl=new Float32Array(4);function Zi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Yl[s];if(r===void 0&&(r=new Float32Array(s),Yl[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function we(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Re(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Sr(n,t){let e=ql[t];e===void 0&&(e=new Int32Array(t),ql[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Ym(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function qm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2fv(this.addr,t),Re(e,t)}}function $m(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;n.uniform3fv(this.addr,t),Re(e,t)}}function jm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4fv(this.addr,t),Re(e,t)}}function Km(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;Kl.set(i),n.uniformMatrix2fv(this.addr,!1,Kl),Re(e,i)}}function Zm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;jl.set(i),n.uniformMatrix3fv(this.addr,!1,jl),Re(e,i)}}function Jm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;$l.set(i),n.uniformMatrix4fv(this.addr,!1,$l),Re(e,i)}}function Qm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function tg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2iv(this.addr,t),Re(e,t)}}function eg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3iv(this.addr,t),Re(e,t)}}function ng(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4iv(this.addr,t),Re(e,t)}}function ig(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function sg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2uiv(this.addr,t),Re(e,t)}}function rg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3uiv(this.addr,t),Re(e,t)}}function ag(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4uiv(this.addr,t),Re(e,t)}}function og(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(no.compareFunction=e.isReversedDepthBuffer()?bo:Eo,r=no):r=uh,e.setTexture2D(t||r,s)}function lg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ph,s)}function cg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||mh,s)}function hg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||fh,s)}function dg(n){switch(n){case 5126:return Ym;case 35664:return qm;case 35665:return $m;case 35666:return jm;case 35674:return Km;case 35675:return Zm;case 35676:return Jm;case 5124:case 35670:return Qm;case 35667:case 35671:return tg;case 35668:case 35672:return eg;case 35669:case 35673:return ng;case 5125:return ig;case 36294:return sg;case 36295:return rg;case 36296:return ag;case 35678:case 36198:case 36298:case 36306:case 35682:return og;case 35679:case 36299:case 36307:return lg;case 35680:case 36300:case 36308:case 36293:return cg;case 36289:case 36303:case 36311:case 36292:return hg}}function ug(n,t){n.uniform1fv(this.addr,t)}function fg(n,t){const e=Zi(t,this.size,2);n.uniform2fv(this.addr,e)}function pg(n,t){const e=Zi(t,this.size,3);n.uniform3fv(this.addr,e)}function mg(n,t){const e=Zi(t,this.size,4);n.uniform4fv(this.addr,e)}function gg(n,t){const e=Zi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function _g(n,t){const e=Zi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function xg(n,t){const e=Zi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function vg(n,t){n.uniform1iv(this.addr,t)}function Mg(n,t){n.uniform2iv(this.addr,t)}function Sg(n,t){n.uniform3iv(this.addr,t)}function yg(n,t){n.uniform4iv(this.addr,t)}function Eg(n,t){n.uniform1uiv(this.addr,t)}function bg(n,t){n.uniform2uiv(this.addr,t)}function Tg(n,t){n.uniform3uiv(this.addr,t)}function Ag(n,t){n.uniform4uiv(this.addr,t)}function wg(n,t,e){const i=this.cache,s=t.length,r=Sr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=no:a=uh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Rg(n,t,e){const i=this.cache,s=t.length,r=Sr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ph,r[a])}function Cg(n,t,e){const i=this.cache,s=t.length,r=Sr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||mh,r[a])}function Ig(n,t,e){const i=this.cache,s=t.length,r=Sr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||fh,r[a])}function Pg(n){switch(n){case 5126:return ug;case 35664:return fg;case 35665:return pg;case 35666:return mg;case 35674:return gg;case 35675:return _g;case 35676:return xg;case 5124:case 35670:return vg;case 35667:case 35671:return Mg;case 35668:case 35672:return Sg;case 35669:case 35673:return yg;case 5125:return Eg;case 36294:return bg;case 36295:return Tg;case 36296:return Ag;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Rg;case 35680:case 36300:case 36308:case 36293:return Cg;case 36289:case 36303:case 36311:case 36292:return Ig}}class Lg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=dg(e.type)}}class Dg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Pg(e.type)}}class Ug{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const aa=/(\w+)(\])?(\[|\.)?/g;function Zl(n,t){n.seq.push(t),n.map[t.id]=t}function Ng(n,t,e){const i=n.name,s=i.length;for(aa.lastIndex=0;;){const r=aa.exec(i),a=aa.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Zl(e,l===void 0?new Lg(o,n,t):new Dg(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Ug(o),Zl(e,f)),e=f}}}class rr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Ng(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Jl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Fg=37297;let Og=0;function Bg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Ql=new Nt;function kg(n){$t._getMatrix(Ql,$t.workingColorSpace,n);const t=`mat3( ${Ql.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(n)){case hr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function tc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Bg(n.getShaderSource(t),o)}else return r}function zg(n,t){const e=kg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Gg={[Nc]:"Linear",[Fc]:"Reinhard",[Oc]:"Cineon",[Bc]:"ACESFilmic",[zc]:"AgX",[Gc]:"Neutral",[kc]:"Custom"};function Hg(n,t){const e=Gg[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Zs=new F;function Vg(){$t.getLuminanceCoefficients(Zs);const n=Zs.x.toFixed(4),t=Zs.y.toFixed(4),e=Zs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hs).join(`
`)}function Xg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Yg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function hs(n){return n!==""}function ec(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function io(n){return n.replace(qg,jg)}const $g=new Map;function jg(n,t){let e=Ht[t];if(e===void 0){const i=$g.get(t);if(i!==void 0)e=Ht[i],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return io(e)}const Kg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(n){return n.replace(Kg,Zg)}function Zg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const Jg={[tr]:"SHADOWMAP_TYPE_PCF",[ls]:"SHADOWMAP_TYPE_VSM"};function Qg(n){return Jg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const t_={[Si]:"ENVMAP_TYPE_CUBE",[Xi]:"ENVMAP_TYPE_CUBE",[gr]:"ENVMAP_TYPE_CUBE_UV"};function e_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":t_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const n_={[Xi]:"ENVMAP_MODE_REFRACTION"};function i_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":n_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const s_={[Uc]:"ENVMAP_BLENDING_MULTIPLY",[kd]:"ENVMAP_BLENDING_MIX",[zd]:"ENVMAP_BLENDING_ADD"};function r_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":s_[n.combine]||"ENVMAP_BLENDING_NONE"}function a_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function o_(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Qg(e),l=e_(e),d=i_(e),f=r_(e),h=a_(e),g=Wg(e),x=Xg(r),S=s.createProgram();let m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(hs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(hs).join(`
`),p.length>0&&(p+=`
`)):(m=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hs).join(`
`),p=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gn?"#define TONE_MAPPING":"",e.toneMapping!==gn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==gn?Hg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,zg("linearToOutputTexel",e.outputColorSpace),Vg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(hs).join(`
`)),a=io(a),a=ec(a,e),a=nc(a,e),o=io(o),o=ec(o,e),o=nc(o,e),a=ic(a),o=ic(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=E+m+a,T=E+p+o,L=Jl(s,s.VERTEX_SHADER,b),A=Jl(s,s.FRAGMENT_SHADER,T);s.attachShader(S,L),s.attachShader(S,A),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function I(C){if(n.debug.checkShaderErrors){const H=s.getProgramInfoLog(S)||"",q=s.getShaderInfoLog(L)||"",Z=s.getShaderInfoLog(A)||"",N=H.trim(),W=q.trim(),G=Z.trim();let tt=!0,et=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(tt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,L,A);else{const ut=tc(s,L,"vertex"),St=tc(s,A,"fragment");Jt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+N+`
`+ut+`
`+St)}else N!==""?Rt("WebGLProgram: Program Info Log:",N):(W===""||G==="")&&(et=!1);et&&(C.diagnostics={runnable:tt,programLog:N,vertexShader:{log:W,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(L),s.deleteShader(A),v=new rr(s,S),R=Yg(s,S)}let v;this.getUniforms=function(){return v===void 0&&I(this),v};let R;this.getAttributes=function(){return R===void 0&&I(this),R};let B=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(S,Fg)),B},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Og++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=L,this.fragmentShader=A,this}let l_=0;class c_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new h_(t),e.set(t,i)),i}}class h_{constructor(t){this.id=l_++,this.code=t,this.usedTimes=0}}function d_(n){return n===yi||n===or||n===lr}function u_(n,t,e,i,s,r){const a=new Jc,o=new c_,c=new Set,l=[],d=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return c.add(v),v===0?"uv":`uv${v}`}function S(v,R,B,C,H,q){const Z=C.fog,N=H.geometry,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,tt=t.get(v.envMap||W,G),et=tt&&tt.mapping===gr?tt.image.height:null,ut=g[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Rt("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const St=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,At=St!==void 0?St.length:0;let Kt=0;N.morphAttributes.position!==void 0&&(Kt=1),N.morphAttributes.normal!==void 0&&(Kt=2),N.morphAttributes.color!==void 0&&(Kt=3);let ne,zt,K,mt;if(ut){const Ot=un[ut];ne=Ot.vertexShader,zt=Ot.fragmentShader}else ne=v.vertexShader,zt=v.fragmentShader,o.update(v),K=o.getVertexShaderID(v),mt=o.getFragmentShaderID(v);const at=n.getRenderTarget(),Ct=n.state.buffers.depth.getReversed(),Ut=H.isInstancedMesh===!0,It=H.isBatchedMesh===!0,ue=!!v.map,Yt=!!v.matcap,ie=!!tt,de=!!v.aoMap,Wt=!!v.lightMap,Ee=!!v.bumpMap,fe=!!v.normalMap,Ve=!!v.displacementMap,D=!!v.emissiveMap,be=!!v.metalnessMap,qt=!!v.roughnessMap,ce=v.anisotropy>0,ht=v.clearcoat>0,pe=v.dispersion>0,y=v.iridescence>0,_=v.sheen>0,O=v.transmission>0,$=ce&&!!v.anisotropyMap,Q=ht&&!!v.clearcoatMap,nt=ht&&!!v.clearcoatNormalMap,ct=ht&&!!v.clearcoatRoughnessMap,X=y&&!!v.iridescenceMap,j=y&&!!v.iridescenceThicknessMap,gt=_&&!!v.sheenColorMap,vt=_&&!!v.sheenRoughnessMap,ot=!!v.specularMap,it=!!v.specularColorMap,Lt=!!v.specularIntensityMap,Gt=O&&!!v.transmissionMap,Qt=O&&!!v.thicknessMap,P=!!v.gradientMap,st=!!v.alphaMap,Y=v.alphaTest>0,_t=!!v.alphaHash,lt=!!v.extensions;let J=gn;v.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(J=n.toneMapping);const Et={shaderID:ut,shaderType:v.type,shaderName:v.name,vertexShader:ne,fragmentShader:zt,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:mt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:It,batchingColor:It&&H._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&H.instanceColor!==null,instancingMorph:Ut&&H.morphTexture!==null,outputColorSpace:at===null?n.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ue,matcap:Yt,envMap:ie,envMapMode:ie&&tt.mapping,envMapCubeUVHeight:et,aoMap:de,lightMap:Wt,bumpMap:Ee,normalMap:fe,displacementMap:Ve,emissiveMap:D,normalMapObjectSpace:fe&&v.normalMapType===Vd,normalMapTangentSpace:fe&&v.normalMapType===Qa,packedNormalMap:fe&&v.normalMapType===Qa&&d_(v.normalMap.format),metalnessMap:be,roughnessMap:qt,anisotropy:ce,anisotropyMap:$,clearcoat:ht,clearcoatMap:Q,clearcoatNormalMap:nt,clearcoatRoughnessMap:ct,dispersion:pe,iridescence:y,iridescenceMap:X,iridescenceThicknessMap:j,sheen:_,sheenColorMap:gt,sheenRoughnessMap:vt,specularMap:ot,specularColorMap:it,specularIntensityMap:Lt,transmission:O,transmissionMap:Gt,thicknessMap:Qt,gradientMap:P,opaque:v.transparent===!1&&v.blending===Gi&&v.alphaToCoverage===!1,alphaMap:st,alphaTest:Y,alphaHash:_t,combine:v.combine,mapUv:ue&&x(v.map.channel),aoMapUv:de&&x(v.aoMap.channel),lightMapUv:Wt&&x(v.lightMap.channel),bumpMapUv:Ee&&x(v.bumpMap.channel),normalMapUv:fe&&x(v.normalMap.channel),displacementMapUv:Ve&&x(v.displacementMap.channel),emissiveMapUv:D&&x(v.emissiveMap.channel),metalnessMapUv:be&&x(v.metalnessMap.channel),roughnessMapUv:qt&&x(v.roughnessMap.channel),anisotropyMapUv:$&&x(v.anisotropyMap.channel),clearcoatMapUv:Q&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:nt&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:j&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:vt&&x(v.sheenRoughnessMap.channel),specularMapUv:ot&&x(v.specularMap.channel),specularColorMapUv:it&&x(v.specularColorMap.channel),specularIntensityMapUv:Lt&&x(v.specularIntensityMap.channel),transmissionMapUv:Gt&&x(v.transmissionMap.channel),thicknessMapUv:Qt&&x(v.thicknessMap.channel),alphaMapUv:st&&x(v.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(fe||ce),vertexNormals:!!N.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!N.attributes.uv&&(ue||st),fog:!!Z,useFog:v.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||N.attributes.normal===void 0&&fe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ct,skinning:H.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Kt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:J,decodeVideoTexture:ue&&v.map.isVideoTexture===!0&&$t.getTransfer(v.map.colorSpace)===ee,decodeVideoTextureEmissive:D&&v.emissiveMap.isVideoTexture===!0&&$t.getTransfer(v.emissiveMap.colorSpace)===ee,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Cn,flipSided:v.side===Ge,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:lt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&v.extensions.multiDraw===!0||It)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Et.vertexUv1s=c.has(1),Et.vertexUv2s=c.has(2),Et.vertexUv3s=c.has(3),c.clear(),Et}function m(v){const R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(const B in v.defines)R.push(B),R.push(v.defines[B]);return v.isRawShaderMaterial===!1&&(p(R,v),E(R,v),R.push(n.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function p(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function E(v,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),v.push(a.mask)}function b(v){const R=g[v.type];let B;if(R){const C=un[R];B=Cu.clone(C.uniforms)}else B=v.uniforms;return B}function T(v,R){let B=d.get(R);return B!==void 0?++B.usedTimes:(B=new o_(n,R,v,s),l.push(B),d.set(R,B)),B}function L(v){if(--v.usedTimes===0){const R=l.indexOf(v);l[R]=l[l.length-1],l.pop(),d.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function I(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:b,acquireProgram:T,releaseProgram:L,releaseShaderCache:A,programs:l,dispose:I}}function f_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function p_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function rc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ac(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let g=0;return h.isInstancedMesh&&(g+=2),h.isSkinnedMesh&&(g+=1),g}function o(h,g,x,S,m,p){let E=n[t];return E===void 0?(E={id:h.id,object:h,geometry:g,material:x,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:m,group:p},n[t]=E):(E.id=h.id,E.object=h,E.geometry=g,E.material=x,E.materialVariant=a(h),E.groupOrder=S,E.renderOrder=h.renderOrder,E.z=m,E.group=p),t++,E}function c(h,g,x,S,m,p){const E=o(h,g,x,S,m,p);x.transmission>0?i.push(E):x.transparent===!0?s.push(E):e.push(E)}function l(h,g,x,S,m,p){const E=o(h,g,x,S,m,p);x.transmission>0?i.unshift(E):x.transparent===!0?s.unshift(E):e.unshift(E)}function d(h,g){e.length>1&&e.sort(h||p_),i.length>1&&i.sort(g||rc),s.length>1&&s.sort(g||rc)}function f(){for(let h=t,g=n.length;h<g;h++){const x=n[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:d}}function m_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new ac,n.set(i,[a])):s>=r.length?(a=new ac,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function g_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new jt};break;case"SpotLight":e={position:new F,direction:new F,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function __(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let x_=0;function v_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function M_(n){const t=new g_,e=__(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);const s=new F,r=new xe,a=new xe;function o(l){let d=0,f=0,h=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let g=0,x=0,S=0,m=0,p=0,E=0,b=0,T=0,L=0,A=0,I=0;l.sort(v_);for(let R=0,B=l.length;R<B;R++){const C=l[R],H=C.color,q=C.intensity,Z=C.distance;let N=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===yi?N=C.shadow.map.texture:N=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)d+=H.r*q,f+=H.g*q,h+=H.b*q;else if(C.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(C.sh.coefficients[W],q);I++}else if(C.isDirectionalLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const G=C.shadow,tt=e.get(C);tt.shadowIntensity=G.intensity,tt.shadowBias=G.bias,tt.shadowNormalBias=G.normalBias,tt.shadowRadius=G.radius,tt.shadowMapSize=G.mapSize,i.directionalShadow[g]=tt,i.directionalShadowMap[g]=N,i.directionalShadowMatrix[g]=C.shadow.matrix,E++}i.directional[g]=W,g++}else if(C.isSpotLight){const W=t.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(H).multiplyScalar(q),W.distance=Z,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,i.spot[S]=W;const G=C.shadow;if(C.map&&(i.spotLightMap[L]=C.map,L++,G.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[S]=G.matrix,C.castShadow){const tt=e.get(C);tt.shadowIntensity=G.intensity,tt.shadowBias=G.bias,tt.shadowNormalBias=G.normalBias,tt.shadowRadius=G.radius,tt.shadowMapSize=G.mapSize,i.spotShadow[S]=tt,i.spotShadowMap[S]=N,T++}S++}else if(C.isRectAreaLight){const W=t.get(C);W.color.copy(H).multiplyScalar(q),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=W,m++}else if(C.isPointLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),W.distance=C.distance,W.decay=C.decay,C.castShadow){const G=C.shadow,tt=e.get(C);tt.shadowIntensity=G.intensity,tt.shadowBias=G.bias,tt.shadowNormalBias=G.normalBias,tt.shadowRadius=G.radius,tt.shadowMapSize=G.mapSize,tt.shadowCameraNear=G.camera.near,tt.shadowCameraFar=G.camera.far,i.pointShadow[x]=tt,i.pointShadowMap[x]=N,i.pointShadowMatrix[x]=C.shadow.matrix,b++}i.point[x]=W,x++}else if(C.isHemisphereLight){const W=t.get(C);W.skyColor.copy(C.color).multiplyScalar(q),W.groundColor.copy(C.groundColor).multiplyScalar(q),i.hemi[p]=W,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==g||v.pointLength!==x||v.spotLength!==S||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==E||v.numPointShadows!==b||v.numSpotShadows!==T||v.numSpotMaps!==L||v.numLightProbes!==I)&&(i.directional.length=g,i.spot.length=S,i.rectArea.length=m,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=T+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=I,v.directionalLength=g,v.pointLength=x,v.spotLength=S,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=E,v.numPointShadows=b,v.numSpotShadows=T,v.numSpotMaps=L,v.numLightProbes=I,i.version=x_++)}function c(l,d){let f=0,h=0,g=0,x=0,S=0;const m=d.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){const b=l[p];if(b.isDirectionalLight){const T=i.directional[f];T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),f++}else if(b.isSpotLight){const T=i.spot[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),g++}else if(b.isRectAreaLight){const T=i.rectArea[x];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const T=i.point[h];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const T=i.hemi[S];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(m),S++}}}return{setup:o,setupView:c,state:i}}function oc(n){const t=new M_(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function d(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function S_(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new oc(n),t.set(s,[o])):r>=a.length?(o=new oc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const y_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E_=`uniform sampler2D shadow_pass;
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
}`,b_=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],T_=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],lc=new xe,rs=new F,oa=new F;function A_(n,t,e){let i=new wo;const s=new kt,r=new kt,a=new _e,o=new Uu,c=new Nu,l={},d=e.maxTextureSize,f={[ni]:Ge,[Ge]:ni,[Cn]:Cn},h=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:y_,fragmentShader:E_}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const x=new tn;x.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Sn(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tr;let p=this.type;this.render=function(A,I,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Md&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=tr);const R=n.getRenderTarget(),B=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Dn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const q=p!==this.type;q&&I.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(N=>N.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,N=A.length;Z<N;Z++){const W=A[Z],G=W.shadow;if(G===void 0){Rt("WebGLShadowMap:",W,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const tt=G.getFrameExtents();s.multiply(tt),r.copy(G.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/tt.x),s.x=r.x*tt.x,G.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/tt.y),s.y=r.y*tt.y,G.mapSize.y=r.y));const et=n.state.buffers.depth.getReversed();if(G.camera._reversedDepth=et,G.map===null||q===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===ls){if(W.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new _n(s.x,s.y,{format:yi,type:Fn,minFilter:Ne,magFilter:Ne,generateMipmaps:!1}),G.map.texture.name=W.name+".shadowMap",G.map.depthTexture=new Yi(s.x,s.y,fn),G.map.depthTexture.name=W.name+".shadowMapDepth",G.map.depthTexture.format=On,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ie,G.map.depthTexture.magFilter=Ie}else W.isPointLight?(G.map=new dh(s.x),G.map.depthTexture=new Au(s.x,Mn)):(G.map=new _n(s.x,s.y),G.map.depthTexture=new Yi(s.x,s.y,Mn)),G.map.depthTexture.name=W.name+".shadowMap",G.map.depthTexture.format=On,this.type===tr?(G.map.depthTexture.compareFunction=et?bo:Eo,G.map.depthTexture.minFilter=Ne,G.map.depthTexture.magFilter=Ne):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ie,G.map.depthTexture.magFilter=Ie);G.camera.updateProjectionMatrix()}const ut=G.map.isWebGLCubeRenderTarget?6:1;for(let St=0;St<ut;St++){if(G.map.isWebGLCubeRenderTarget)n.setRenderTarget(G.map,St),n.clear();else{St===0&&(n.setRenderTarget(G.map),n.clear());const At=G.getViewport(St);a.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),H.viewport(a)}if(W.isPointLight){const At=G.camera,Kt=G.matrix,ne=W.distance||At.far;ne!==At.far&&(At.far=ne,At.updateProjectionMatrix()),rs.setFromMatrixPosition(W.matrixWorld),At.position.copy(rs),oa.copy(At.position),oa.add(b_[St]),At.up.copy(T_[St]),At.lookAt(oa),At.updateMatrixWorld(),Kt.makeTranslation(-rs.x,-rs.y,-rs.z),lc.multiplyMatrices(At.projectionMatrix,At.matrixWorldInverse),G._frustum.setFromProjectionMatrix(lc,At.coordinateSystem,At.reversedDepth)}else G.updateMatrices(W);i=G.getFrustum(),T(I,v,G.camera,W,this.type)}G.isPointLightShadow!==!0&&this.type===ls&&E(G,v),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(R,B,C)};function E(A,I){const v=t.update(S);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,g.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new _n(s.x,s.y,{format:yi,type:Fn})),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(I,null,v,h,S,null),g.uniforms.shadow_pass.value=A.mapPass.texture,g.uniforms.resolution.value=A.mapSize,g.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(I,null,v,g,S,null)}function b(A,I,v,R){let B=null;const C=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)B=C;else if(B=v.isPointLight===!0?c:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const H=B.uuid,q=I.uuid;let Z=l[H];Z===void 0&&(Z={},l[H]=Z);let N=Z[q];N===void 0&&(N=B.clone(),Z[q]=N,I.addEventListener("dispose",L)),B=N}if(B.visible=I.visible,B.wireframe=I.wireframe,R===ls?B.side=I.shadowSide!==null?I.shadowSide:I.side:B.side=I.shadowSide!==null?I.shadowSide:f[I.side],B.alphaMap=I.alphaMap,B.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,B.map=I.map,B.clipShadows=I.clipShadows,B.clippingPlanes=I.clippingPlanes,B.clipIntersection=I.clipIntersection,B.displacementMap=I.displacementMap,B.displacementScale=I.displacementScale,B.displacementBias=I.displacementBias,B.wireframeLinewidth=I.wireframeLinewidth,B.linewidth=I.linewidth,v.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const H=n.properties.get(B);H.light=v}return B}function T(A,I,v,R,B){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&B===ls)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const q=t.update(A),Z=A.material;if(Array.isArray(Z)){const N=q.groups;for(let W=0,G=N.length;W<G;W++){const tt=N[W],et=Z[tt.materialIndex];if(et&&et.visible){const ut=b(A,et,R,B);A.onBeforeShadow(n,A,I,v,q,ut,tt),n.renderBufferDirect(v,null,q,ut,A,tt),A.onAfterShadow(n,A,I,v,q,ut,tt)}}}else if(Z.visible){const N=b(A,Z,R,B);A.onBeforeShadow(n,A,I,v,q,N,null),n.renderBufferDirect(v,null,q,N,A,null),A.onAfterShadow(n,A,I,v,q,N,null)}}const H=A.children;for(let q=0,Z=H.length;q<Z;q++)T(H[q],I,v,R,B)}function L(A){A.target.removeEventListener("dispose",L);for(const v in l){const R=l[v],B=A.target.uuid;B in R&&(R[B].dispose(),delete R[B])}}}function w_(n,t){function e(){let P=!1;const st=new _e;let Y=null;const _t=new _e(0,0,0,0);return{setMask:function(lt){Y!==lt&&!P&&(n.colorMask(lt,lt,lt,lt),Y=lt)},setLocked:function(lt){P=lt},setClear:function(lt,J,Et,Ot,ve){ve===!0&&(lt*=Ot,J*=Ot,Et*=Ot),st.set(lt,J,Et,Ot),_t.equals(st)===!1&&(n.clearColor(lt,J,Et,Ot),_t.copy(st))},reset:function(){P=!1,Y=null,_t.set(-1,0,0,0)}}}function i(){let P=!1,st=!1,Y=null,_t=null,lt=null;return{setReversed:function(J){if(st!==J){const Et=t.get("EXT_clip_control");J?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),st=J;const Ot=lt;lt=null,this.setClear(Ot)}},getReversed:function(){return st},setTest:function(J){J?at(n.DEPTH_TEST):Ct(n.DEPTH_TEST)},setMask:function(J){Y!==J&&!P&&(n.depthMask(J),Y=J)},setFunc:function(J){if(st&&(J=Qd[J]),_t!==J){switch(J){case pa:n.depthFunc(n.NEVER);break;case ma:n.depthFunc(n.ALWAYS);break;case ga:n.depthFunc(n.LESS);break;case Wi:n.depthFunc(n.LEQUAL);break;case _a:n.depthFunc(n.EQUAL);break;case xa:n.depthFunc(n.GEQUAL);break;case va:n.depthFunc(n.GREATER);break;case Ma:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_t=J}},setLocked:function(J){P=J},setClear:function(J){lt!==J&&(lt=J,st&&(J=1-J),n.clearDepth(J))},reset:function(){P=!1,Y=null,_t=null,lt=null,st=!1}}}function s(){let P=!1,st=null,Y=null,_t=null,lt=null,J=null,Et=null,Ot=null,ve=null;return{setTest:function(se){P||(se?at(n.STENCIL_TEST):Ct(n.STENCIL_TEST))},setMask:function(se){st!==se&&!P&&(n.stencilMask(se),st=se)},setFunc:function(se,En,on){(Y!==se||_t!==En||lt!==on)&&(n.stencilFunc(se,En,on),Y=se,_t=En,lt=on)},setOp:function(se,En,on){(J!==se||Et!==En||Ot!==on)&&(n.stencilOp(se,En,on),J=se,Et=En,Ot=on)},setLocked:function(se){P=se},setClear:function(se){ve!==se&&(n.clearStencil(se),ve=se)},reset:function(){P=!1,st=null,Y=null,_t=null,lt=null,J=null,Et=null,Ot=null,ve=null}}}const r=new e,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let d={},f={},h={},g=new WeakMap,x=[],S=null,m=!1,p=null,E=null,b=null,T=null,L=null,A=null,I=null,v=new jt(0,0,0),R=0,B=!1,C=null,H=null,q=null,Z=null,N=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,tt=0;const et=n.getParameter(n.VERSION);et.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(et)[1]),G=tt>=1):et.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),G=tt>=2);let ut=null,St={};const At=n.getParameter(n.SCISSOR_BOX),Kt=n.getParameter(n.VIEWPORT),ne=new _e().fromArray(At),zt=new _e().fromArray(Kt);function K(P,st,Y,_t){const lt=new Uint8Array(4),J=n.createTexture();n.bindTexture(P,J),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Et=0;Et<Y;Et++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(st,0,n.RGBA,1,1,_t,0,n.RGBA,n.UNSIGNED_BYTE,lt):n.texImage2D(st+Et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,lt);return J}const mt={};mt[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),mt[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),mt[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(n.DEPTH_TEST),a.setFunc(Wi),Ee(!1),fe(sl),at(n.CULL_FACE),de(Dn);function at(P){d[P]!==!0&&(n.enable(P),d[P]=!0)}function Ct(P){d[P]!==!1&&(n.disable(P),d[P]=!1)}function Ut(P,st){return h[P]!==st?(n.bindFramebuffer(P,st),h[P]=st,P===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=st),P===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=st),!0):!1}function It(P,st){let Y=x,_t=!1;if(P){Y=g.get(st),Y===void 0&&(Y=[],g.set(st,Y));const lt=P.textures;if(Y.length!==lt.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let J=0,Et=lt.length;J<Et;J++)Y[J]=n.COLOR_ATTACHMENT0+J;Y.length=lt.length,_t=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,_t=!0);_t&&n.drawBuffers(Y)}function ue(P){return S!==P?(n.useProgram(P),S=P,!0):!1}const Yt={[ui]:n.FUNC_ADD,[yd]:n.FUNC_SUBTRACT,[Ed]:n.FUNC_REVERSE_SUBTRACT};Yt[bd]=n.MIN,Yt[Td]=n.MAX;const ie={[Ad]:n.ZERO,[wd]:n.ONE,[Rd]:n.SRC_COLOR,[ua]:n.SRC_ALPHA,[Ud]:n.SRC_ALPHA_SATURATE,[Ld]:n.DST_COLOR,[Id]:n.DST_ALPHA,[Cd]:n.ONE_MINUS_SRC_COLOR,[fa]:n.ONE_MINUS_SRC_ALPHA,[Dd]:n.ONE_MINUS_DST_COLOR,[Pd]:n.ONE_MINUS_DST_ALPHA,[Nd]:n.CONSTANT_COLOR,[Fd]:n.ONE_MINUS_CONSTANT_COLOR,[Od]:n.CONSTANT_ALPHA,[Bd]:n.ONE_MINUS_CONSTANT_ALPHA};function de(P,st,Y,_t,lt,J,Et,Ot,ve,se){if(P===Dn){m===!0&&(Ct(n.BLEND),m=!1);return}if(m===!1&&(at(n.BLEND),m=!0),P!==Sd){if(P!==p||se!==B){if((E!==ui||L!==ui)&&(n.blendEquation(n.FUNC_ADD),E=ui,L=ui),se)switch(P){case Gi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rl:n.blendFunc(n.ONE,n.ONE);break;case al:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ol:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Jt("WebGLState: Invalid blending: ",P);break}else switch(P){case Gi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case al:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ol:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",P);break}b=null,T=null,A=null,I=null,v.set(0,0,0),R=0,p=P,B=se}return}lt=lt||st,J=J||Y,Et=Et||_t,(st!==E||lt!==L)&&(n.blendEquationSeparate(Yt[st],Yt[lt]),E=st,L=lt),(Y!==b||_t!==T||J!==A||Et!==I)&&(n.blendFuncSeparate(ie[Y],ie[_t],ie[J],ie[Et]),b=Y,T=_t,A=J,I=Et),(Ot.equals(v)===!1||ve!==R)&&(n.blendColor(Ot.r,Ot.g,Ot.b,ve),v.copy(Ot),R=ve),p=P,B=!1}function Wt(P,st){P.side===Cn?Ct(n.CULL_FACE):at(n.CULL_FACE);let Y=P.side===Ge;st&&(Y=!Y),Ee(Y),P.blending===Gi&&P.transparent===!1?de(Dn):de(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const _t=P.stencilWrite;o.setTest(_t),_t&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),D(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?at(n.SAMPLE_ALPHA_TO_COVERAGE):Ct(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ee(P){C!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),C=P)}function fe(P){P!==xd?(at(n.CULL_FACE),P!==H&&(P===sl?n.cullFace(n.BACK):P===vd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ct(n.CULL_FACE),H=P}function Ve(P){P!==q&&(G&&n.lineWidth(P),q=P)}function D(P,st,Y){P?(at(n.POLYGON_OFFSET_FILL),(Z!==st||N!==Y)&&(Z=st,N=Y,a.getReversed()&&(st=-st),n.polygonOffset(st,Y))):Ct(n.POLYGON_OFFSET_FILL)}function be(P){P?at(n.SCISSOR_TEST):Ct(n.SCISSOR_TEST)}function qt(P){P===void 0&&(P=n.TEXTURE0+W-1),ut!==P&&(n.activeTexture(P),ut=P)}function ce(P,st,Y){Y===void 0&&(ut===null?Y=n.TEXTURE0+W-1:Y=ut);let _t=St[Y];_t===void 0&&(_t={type:void 0,texture:void 0},St[Y]=_t),(_t.type!==P||_t.texture!==st)&&(ut!==Y&&(n.activeTexture(Y),ut=Y),n.bindTexture(P,st||mt[P]),_t.type=P,_t.texture=st)}function ht(){const P=St[ut];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function pe(){try{n.compressedTexImage2D(...arguments)}catch(P){Jt("WebGLState:",P)}}function y(){try{n.compressedTexImage3D(...arguments)}catch(P){Jt("WebGLState:",P)}}function _(){try{n.texSubImage2D(...arguments)}catch(P){Jt("WebGLState:",P)}}function O(){try{n.texSubImage3D(...arguments)}catch(P){Jt("WebGLState:",P)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(P){Jt("WebGLState:",P)}}function Q(){try{n.compressedTexSubImage3D(...arguments)}catch(P){Jt("WebGLState:",P)}}function nt(){try{n.texStorage2D(...arguments)}catch(P){Jt("WebGLState:",P)}}function ct(){try{n.texStorage3D(...arguments)}catch(P){Jt("WebGLState:",P)}}function X(){try{n.texImage2D(...arguments)}catch(P){Jt("WebGLState:",P)}}function j(){try{n.texImage3D(...arguments)}catch(P){Jt("WebGLState:",P)}}function gt(P){return f[P]!==void 0?f[P]:n.getParameter(P)}function vt(P,st){f[P]!==st&&(n.pixelStorei(P,st),f[P]=st)}function ot(P){ne.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),ne.copy(P))}function it(P){zt.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),zt.copy(P))}function Lt(P,st){let Y=l.get(st);Y===void 0&&(Y=new WeakMap,l.set(st,Y));let _t=Y.get(P);_t===void 0&&(_t=n.getUniformBlockIndex(st,P.name),Y.set(P,_t))}function Gt(P,st){const _t=l.get(st).get(P);c.get(st)!==_t&&(n.uniformBlockBinding(st,_t,P.__bindingPointIndex),c.set(st,_t))}function Qt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},ut=null,St={},h={},g=new WeakMap,x=[],S=null,m=!1,p=null,E=null,b=null,T=null,L=null,A=null,I=null,v=new jt(0,0,0),R=0,B=!1,C=null,H=null,q=null,Z=null,N=null,ne.set(0,0,n.canvas.width,n.canvas.height),zt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:at,disable:Ct,bindFramebuffer:Ut,drawBuffers:It,useProgram:ue,setBlending:de,setMaterial:Wt,setFlipSided:Ee,setCullFace:fe,setLineWidth:Ve,setPolygonOffset:D,setScissorTest:be,activeTexture:qt,bindTexture:ce,unbindTexture:ht,compressedTexImage2D:pe,compressedTexImage3D:y,texImage2D:X,texImage3D:j,pixelStorei:vt,getParameter:gt,updateUBOMapping:Lt,uniformBlockBinding:Gt,texStorage2D:nt,texStorage3D:ct,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:$,compressedTexSubImage3D:Q,scissor:ot,viewport:it,reset:Qt}}function R_(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new kt,d=new WeakMap,f=new Set;let h;const g=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(y,_){return x?new OffscreenCanvas(y,_):dr("canvas")}function m(y,_,O){let $=1;const Q=pe(y);if((Q.width>O||Q.height>O)&&($=O/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const nt=Math.floor($*Q.width),ct=Math.floor($*Q.height);h===void 0&&(h=S(nt,ct));const X=_?S(nt,ct):h;return X.width=nt,X.height=ct,X.getContext("2d").drawImage(y,0,0,nt,ct),Rt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+nt+"x"+ct+")."),X}else return"data"in y&&Rt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),y;return y}function p(y){return y.generateMipmaps}function E(y){n.generateMipmap(y)}function b(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(y,_,O,$,Q,nt=!1){if(y!==null){if(n[y]!==void 0)return n[y];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let ct;$&&(ct=t.get("EXT_texture_norm16"),ct||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=_;if(_===n.RED&&(O===n.FLOAT&&(X=n.R32F),O===n.HALF_FLOAT&&(X=n.R16F),O===n.UNSIGNED_BYTE&&(X=n.R8),O===n.UNSIGNED_SHORT&&ct&&(X=ct.R16_EXT),O===n.SHORT&&ct&&(X=ct.R16_SNORM_EXT)),_===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.R8UI),O===n.UNSIGNED_SHORT&&(X=n.R16UI),O===n.UNSIGNED_INT&&(X=n.R32UI),O===n.BYTE&&(X=n.R8I),O===n.SHORT&&(X=n.R16I),O===n.INT&&(X=n.R32I)),_===n.RG&&(O===n.FLOAT&&(X=n.RG32F),O===n.HALF_FLOAT&&(X=n.RG16F),O===n.UNSIGNED_BYTE&&(X=n.RG8),O===n.UNSIGNED_SHORT&&ct&&(X=ct.RG16_EXT),O===n.SHORT&&ct&&(X=ct.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.RG8UI),O===n.UNSIGNED_SHORT&&(X=n.RG16UI),O===n.UNSIGNED_INT&&(X=n.RG32UI),O===n.BYTE&&(X=n.RG8I),O===n.SHORT&&(X=n.RG16I),O===n.INT&&(X=n.RG32I)),_===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.RGB8UI),O===n.UNSIGNED_SHORT&&(X=n.RGB16UI),O===n.UNSIGNED_INT&&(X=n.RGB32UI),O===n.BYTE&&(X=n.RGB8I),O===n.SHORT&&(X=n.RGB16I),O===n.INT&&(X=n.RGB32I)),_===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),O===n.UNSIGNED_INT&&(X=n.RGBA32UI),O===n.BYTE&&(X=n.RGBA8I),O===n.SHORT&&(X=n.RGBA16I),O===n.INT&&(X=n.RGBA32I)),_===n.RGB&&(O===n.UNSIGNED_SHORT&&ct&&(X=ct.RGB16_EXT),O===n.SHORT&&ct&&(X=ct.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),_===n.RGBA){const j=nt?hr:$t.getTransfer(Q);O===n.FLOAT&&(X=n.RGBA32F),O===n.HALF_FLOAT&&(X=n.RGBA16F),O===n.UNSIGNED_BYTE&&(X=j===ee?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&ct&&(X=ct.RGBA16_EXT),O===n.SHORT&&ct&&(X=ct.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function L(y,_){let O;return y?_===null||_===Mn||_===ps?O=n.DEPTH24_STENCIL8:_===fn?O=n.DEPTH32F_STENCIL8:_===fs&&(O=n.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Mn||_===ps?O=n.DEPTH_COMPONENT24:_===fn?O=n.DEPTH_COMPONENT32F:_===fs&&(O=n.DEPTH_COMPONENT16),O}function A(y,_){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==Ie&&y.minFilter!==Ne?Math.log2(Math.max(_.width,_.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?_.mipmaps.length:1}function I(y){const _=y.target;_.removeEventListener("dispose",I),R(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&f.delete(_)}function v(y){const _=y.target;_.removeEventListener("dispose",v),C(_)}function R(y){const _=i.get(y);if(_.__webglInit===void 0)return;const O=y.source,$=g.get(O);if($){const Q=$[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&B(y),Object.keys($).length===0&&g.delete(O)}i.remove(y)}function B(y){const _=i.get(y);n.deleteTexture(_.__webglTexture);const O=y.source,$=g.get(O);delete $[_.__cacheKey],a.memory.textures--}function C(y){const _=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let Q=0;Q<_.__webglFramebuffer[$].length;Q++)n.deleteFramebuffer(_.__webglFramebuffer[$][Q]);else n.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)n.deleteFramebuffer(_.__webglFramebuffer[$]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=y.textures;for(let $=0,Q=O.length;$<Q;$++){const nt=i.get(O[$]);nt.__webglTexture&&(n.deleteTexture(nt.__webglTexture),a.memory.textures--),i.remove(O[$])}i.remove(y)}let H=0;function q(){H=0}function Z(){return H}function N(y){H=y}function W(){const y=H;return y>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),H+=1,y}function G(y){const _=[];return _.push(y.wrapS),_.push(y.wrapT),_.push(y.wrapR||0),_.push(y.magFilter),_.push(y.minFilter),_.push(y.anisotropy),_.push(y.internalFormat),_.push(y.format),_.push(y.type),_.push(y.generateMipmaps),_.push(y.premultiplyAlpha),_.push(y.flipY),_.push(y.unpackAlignment),_.push(y.colorSpace),_.join()}function tt(y,_){const O=i.get(y);if(y.isVideoTexture&&ce(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&O.__version!==y.version){const $=y.image;if($===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ct(O,y,_);return}}else y.isExternalTexture&&(O.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+_)}function et(y,_){const O=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&O.__version!==y.version){Ct(O,y,_);return}else y.isExternalTexture&&(O.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+_)}function ut(y,_){const O=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&O.__version!==y.version){Ct(O,y,_);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+_)}function St(y,_){const O=i.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&O.__version!==y.version){Ut(O,y,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+_)}const At={[Sa]:n.REPEAT,[In]:n.CLAMP_TO_EDGE,[ya]:n.MIRRORED_REPEAT},Kt={[Ie]:n.NEAREST,[Gd]:n.NEAREST_MIPMAP_NEAREST,[Ts]:n.NEAREST_MIPMAP_LINEAR,[Ne]:n.LINEAR,[Cr]:n.LINEAR_MIPMAP_NEAREST,[pi]:n.LINEAR_MIPMAP_LINEAR},ne={[Wd]:n.NEVER,[jd]:n.ALWAYS,[Xd]:n.LESS,[Eo]:n.LEQUAL,[Yd]:n.EQUAL,[bo]:n.GEQUAL,[qd]:n.GREATER,[$d]:n.NOTEQUAL};function zt(y,_){if(_.type===fn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ne||_.magFilter===Cr||_.magFilter===Ts||_.magFilter===pi||_.minFilter===Ne||_.minFilter===Cr||_.minFilter===Ts||_.minFilter===pi)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,At[_.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,At[_.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,At[_.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,Kt[_.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,Kt[_.minFilter]),_.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,ne[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ie||_.minFilter!==Ts&&_.minFilter!==pi||_.type===fn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(y,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function K(y,_){let O=!1;y.__webglInit===void 0&&(y.__webglInit=!0,_.addEventListener("dispose",I));const $=_.source;let Q=g.get($);Q===void 0&&(Q={},g.set($,Q));const nt=G(_);if(nt!==y.__cacheKey){Q[nt]===void 0&&(Q[nt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Q[nt].usedTimes++;const ct=Q[y.__cacheKey];ct!==void 0&&(Q[y.__cacheKey].usedTimes--,ct.usedTimes===0&&B(_)),y.__cacheKey=nt,y.__webglTexture=Q[nt].texture}return O}function mt(y,_,O){return Math.floor(Math.floor(y/O)/_)}function at(y,_,O,$){const nt=y.updateRanges;if(nt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,O,$,_.data);else{nt.sort((vt,ot)=>vt.start-ot.start);let ct=0;for(let vt=1;vt<nt.length;vt++){const ot=nt[ct],it=nt[vt],Lt=ot.start+ot.count,Gt=mt(it.start,_.width,4),Qt=mt(ot.start,_.width,4);it.start<=Lt+1&&Gt===Qt&&mt(it.start+it.count-1,_.width,4)===Gt?ot.count=Math.max(ot.count,it.start+it.count-ot.start):(++ct,nt[ct]=it)}nt.length=ct+1;const X=e.getParameter(n.UNPACK_ROW_LENGTH),j=e.getParameter(n.UNPACK_SKIP_PIXELS),gt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let vt=0,ot=nt.length;vt<ot;vt++){const it=nt[vt],Lt=Math.floor(it.start/4),Gt=Math.ceil(it.count/4),Qt=Lt%_.width,P=Math.floor(Lt/_.width),st=Gt,Y=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Qt),e.pixelStorei(n.UNPACK_SKIP_ROWS,P),e.texSubImage2D(n.TEXTURE_2D,0,Qt,P,st,Y,O,$,_.data)}y.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,X),e.pixelStorei(n.UNPACK_SKIP_PIXELS,j),e.pixelStorei(n.UNPACK_SKIP_ROWS,gt)}}function Ct(y,_,O){let $=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=n.TEXTURE_3D);const Q=K(y,_),nt=_.source;e.bindTexture($,y.__webglTexture,n.TEXTURE0+O);const ct=i.get(nt);if(nt.version!==ct.__version||Q===!0){if(e.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const Y=$t.getPrimaries($t.workingColorSpace),_t=_.colorSpace===Kn?null:$t.getPrimaries(_.colorSpace),lt=_.colorSpace===Kn||Y===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let j=m(_.image,!1,s.maxTextureSize);j=ht(_,j);const gt=r.convert(_.format,_.colorSpace),vt=r.convert(_.type);let ot=T(_.internalFormat,gt,vt,_.normalized,_.colorSpace,_.isVideoTexture);zt($,_);let it;const Lt=_.mipmaps,Gt=_.isVideoTexture!==!0,Qt=ct.__version===void 0||Q===!0,P=nt.dataReady,st=A(_,j);if(_.isDepthTexture)ot=L(_.format===mi,_.type),Qt&&(Gt?e.texStorage2D(n.TEXTURE_2D,1,ot,j.width,j.height):e.texImage2D(n.TEXTURE_2D,0,ot,j.width,j.height,0,gt,vt,null));else if(_.isDataTexture)if(Lt.length>0){Gt&&Qt&&e.texStorage2D(n.TEXTURE_2D,st,ot,Lt[0].width,Lt[0].height);for(let Y=0,_t=Lt.length;Y<_t;Y++)it=Lt[Y],Gt?P&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,it.width,it.height,gt,vt,it.data):e.texImage2D(n.TEXTURE_2D,Y,ot,it.width,it.height,0,gt,vt,it.data);_.generateMipmaps=!1}else Gt?(Qt&&e.texStorage2D(n.TEXTURE_2D,st,ot,j.width,j.height),P&&at(_,j,gt,vt)):e.texImage2D(n.TEXTURE_2D,0,ot,j.width,j.height,0,gt,vt,j.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Gt&&Qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,st,ot,Lt[0].width,Lt[0].height,j.depth);for(let Y=0,_t=Lt.length;Y<_t;Y++)if(it=Lt[Y],_.format!==an)if(gt!==null)if(Gt){if(P)if(_.layerUpdates.size>0){const lt=kl(it.width,it.height,_.format,_.type);for(const J of _.layerUpdates){const Et=it.data.subarray(J*lt/it.data.BYTES_PER_ELEMENT,(J+1)*lt/it.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,J,it.width,it.height,1,gt,Et)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,it.width,it.height,j.depth,gt,it.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,ot,it.width,it.height,j.depth,0,it.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?P&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,it.width,it.height,j.depth,gt,vt,it.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Y,ot,it.width,it.height,j.depth,0,gt,vt,it.data)}else{Gt&&Qt&&e.texStorage2D(n.TEXTURE_2D,st,ot,Lt[0].width,Lt[0].height);for(let Y=0,_t=Lt.length;Y<_t;Y++)it=Lt[Y],_.format!==an?gt!==null?Gt?P&&e.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,it.width,it.height,gt,it.data):e.compressedTexImage2D(n.TEXTURE_2D,Y,ot,it.width,it.height,0,it.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?P&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,it.width,it.height,gt,vt,it.data):e.texImage2D(n.TEXTURE_2D,Y,ot,it.width,it.height,0,gt,vt,it.data)}else if(_.isDataArrayTexture)if(Gt){if(Qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,st,ot,j.width,j.height,j.depth),P)if(_.layerUpdates.size>0){const Y=kl(j.width,j.height,_.format,_.type);for(const _t of _.layerUpdates){const lt=j.data.subarray(_t*Y/j.data.BYTES_PER_ELEMENT,(_t+1)*Y/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_t,j.width,j.height,1,gt,vt,lt)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,gt,vt,j.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ot,j.width,j.height,j.depth,0,gt,vt,j.data);else if(_.isData3DTexture)Gt?(Qt&&e.texStorage3D(n.TEXTURE_3D,st,ot,j.width,j.height,j.depth),P&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,gt,vt,j.data)):e.texImage3D(n.TEXTURE_3D,0,ot,j.width,j.height,j.depth,0,gt,vt,j.data);else if(_.isFramebufferTexture){if(Qt)if(Gt)e.texStorage2D(n.TEXTURE_2D,st,ot,j.width,j.height);else{let Y=j.width,_t=j.height;for(let lt=0;lt<st;lt++)e.texImage2D(n.TEXTURE_2D,lt,ot,Y,_t,0,gt,vt,null),Y>>=1,_t>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const Y=n.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),j.parentNode!==Y){Y.appendChild(j),f.add(_),Y.onpaint=Ot=>{const ve=Ot.changedElements;for(const se of f)ve.includes(se.image)&&(se.needsUpdate=!0)},Y.requestPaint();return}const _t=0,lt=n.RGBA,J=n.RGBA,Et=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,_t,lt,J,Et,j),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Lt.length>0){if(Gt&&Qt){const Y=pe(Lt[0]);e.texStorage2D(n.TEXTURE_2D,st,ot,Y.width,Y.height)}for(let Y=0,_t=Lt.length;Y<_t;Y++)it=Lt[Y],Gt?P&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,gt,vt,it):e.texImage2D(n.TEXTURE_2D,Y,ot,gt,vt,it);_.generateMipmaps=!1}else if(Gt){if(Qt){const Y=pe(j);e.texStorage2D(n.TEXTURE_2D,st,ot,Y.width,Y.height)}P&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt,vt,j)}else e.texImage2D(n.TEXTURE_2D,0,ot,gt,vt,j);p(_)&&E($),ct.__version=nt.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function Ut(y,_,O){if(_.image.length!==6)return;const $=K(y,_),Q=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+O);const nt=i.get(Q);if(Q.version!==nt.__version||$===!0){e.activeTexture(n.TEXTURE0+O);const ct=$t.getPrimaries($t.workingColorSpace),X=_.colorSpace===Kn?null:$t.getPrimaries(_.colorSpace),j=_.colorSpace===Kn||ct===X?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const gt=_.isCompressedTexture||_.image[0].isCompressedTexture,vt=_.image[0]&&_.image[0].isDataTexture,ot=[];for(let J=0;J<6;J++)!gt&&!vt?ot[J]=m(_.image[J],!0,s.maxCubemapSize):ot[J]=vt?_.image[J].image:_.image[J],ot[J]=ht(_,ot[J]);const it=ot[0],Lt=r.convert(_.format,_.colorSpace),Gt=r.convert(_.type),Qt=T(_.internalFormat,Lt,Gt,_.normalized,_.colorSpace),P=_.isVideoTexture!==!0,st=nt.__version===void 0||$===!0,Y=Q.dataReady;let _t=A(_,it);zt(n.TEXTURE_CUBE_MAP,_);let lt;if(gt){P&&st&&e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Qt,it.width,it.height);for(let J=0;J<6;J++){lt=ot[J].mipmaps;for(let Et=0;Et<lt.length;Et++){const Ot=lt[Et];_.format!==an?Lt!==null?P?Y&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,0,0,Ot.width,Ot.height,Lt,Ot.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,Qt,Ot.width,Ot.height,0,Ot.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?Y&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,0,0,Ot.width,Ot.height,Lt,Gt,Ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,Qt,Ot.width,Ot.height,0,Lt,Gt,Ot.data)}}}else{if(lt=_.mipmaps,P&&st){lt.length>0&&_t++;const J=pe(ot[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Qt,J.width,J.height)}for(let J=0;J<6;J++)if(vt){P?Y&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ot[J].width,ot[J].height,Lt,Gt,ot[J].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qt,ot[J].width,ot[J].height,0,Lt,Gt,ot[J].data);for(let Et=0;Et<lt.length;Et++){const ve=lt[Et].image[J].image;P?Y&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,0,0,ve.width,ve.height,Lt,Gt,ve.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,Qt,ve.width,ve.height,0,Lt,Gt,ve.data)}}else{P?Y&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Lt,Gt,ot[J]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qt,Lt,Gt,ot[J]);for(let Et=0;Et<lt.length;Et++){const Ot=lt[Et];P?Y&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,0,0,Lt,Gt,Ot.image[J]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,Qt,Lt,Gt,Ot.image[J])}}}p(_)&&E(n.TEXTURE_CUBE_MAP),nt.__version=Q.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function It(y,_,O,$,Q,nt){const ct=r.convert(O.format,O.colorSpace),X=r.convert(O.type),j=T(O.internalFormat,ct,X,O.normalized,O.colorSpace),gt=i.get(_),vt=i.get(O);if(vt.__renderTarget=_,!gt.__hasExternalTextures){const ot=Math.max(1,_.width>>nt),it=Math.max(1,_.height>>nt);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?e.texImage3D(Q,nt,j,ot,it,_.depth,0,ct,X,null):e.texImage2D(Q,nt,j,ot,it,0,ct,X,null)}e.bindFramebuffer(n.FRAMEBUFFER,y),qt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,Q,vt.__webglTexture,0,be(_)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,Q,vt.__webglTexture,nt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(y,_,O){if(n.bindRenderbuffer(n.RENDERBUFFER,y),_.depthBuffer){const $=_.depthTexture,Q=$&&$.isDepthTexture?$.type:null,nt=L(_.stencilBuffer,Q),ct=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;qt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be(_),nt,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,be(_),nt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,nt,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,y)}else{const $=_.textures;for(let Q=0;Q<$.length;Q++){const nt=$[Q],ct=r.convert(nt.format,nt.colorSpace),X=r.convert(nt.type),j=T(nt.internalFormat,ct,X,nt.normalized,nt.colorSpace);qt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be(_),j,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,be(_),j,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,j,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Yt(y,_,O){const $=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,y),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(_.depthTexture);if(Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),zt(n.TEXTURE_CUBE_MAP,_.depthTexture);const gt=r.convert(_.depthTexture.format),vt=r.convert(_.depthTexture.type);let ot;_.depthTexture.format===On?ot=n.DEPTH_COMPONENT24:_.depthTexture.format===mi&&(ot=n.DEPTH24_STENCIL8);for(let it=0;it<6;it++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,ot,_.width,_.height,0,gt,vt,null)}}else tt(_.depthTexture,0);const nt=Q.__webglTexture,ct=be(_),X=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,j=_.depthTexture.format===mi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===On)qt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,X,nt,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,j,X,nt,0);else if(_.depthTexture.format===mi)qt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,X,nt,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,j,X,nt,0);else throw new Error("Unknown depthTexture format")}function ie(y){const _=i.get(y),O=y.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==y.depthTexture){const $=y.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=$}if(y.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let $=0;$<6;$++)Yt(_.__webglFramebuffer[$],y,$);else{const $=y.texture.mipmaps;$&&$.length>0?Yt(_.__webglFramebuffer[0],y,0):Yt(_.__webglFramebuffer,y,0)}else if(O){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=n.createRenderbuffer(),ue(_.__webglDepthbuffer[$],y,!1);else{const Q=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=_.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,nt)}}else{const $=y.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ue(_.__webglDepthbuffer,y,!1);else{const Q=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,nt)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function de(y,_,O){const $=i.get(y);_!==void 0&&It($.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&ie(y)}function Wt(y){const _=y.texture,O=i.get(y),$=i.get(_);y.addEventListener("dispose",v);const Q=y.textures,nt=y.isWebGLCubeRenderTarget===!0,ct=Q.length>1;if(ct||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=_.version,a.memory.textures++),nt){O.__webglFramebuffer=[];for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[X]=[];for(let j=0;j<_.mipmaps.length;j++)O.__webglFramebuffer[X][j]=n.createFramebuffer()}else O.__webglFramebuffer[X]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let X=0;X<_.mipmaps.length;X++)O.__webglFramebuffer[X]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ct)for(let X=0,j=Q.length;X<j;X++){const gt=i.get(Q[X]);gt.__webglTexture===void 0&&(gt.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&qt(y)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let X=0;X<Q.length;X++){const j=Q[X];O.__webglColorRenderbuffer[X]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[X]);const gt=r.convert(j.format,j.colorSpace),vt=r.convert(j.type),ot=T(j.internalFormat,gt,vt,j.normalized,j.colorSpace,y.isXRRenderTarget===!0),it=be(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,it,ot,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+X,n.RENDERBUFFER,O.__webglColorRenderbuffer[X])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),ue(O.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(nt){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),zt(n.TEXTURE_CUBE_MAP,_);for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)It(O.__webglFramebuffer[X][j],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,j);else It(O.__webglFramebuffer[X],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);p(_)&&E(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let X=0,j=Q.length;X<j;X++){const gt=Q[X],vt=i.get(gt);let ot=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ot=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,vt.__webglTexture),zt(ot,gt),It(O.__webglFramebuffer,y,gt,n.COLOR_ATTACHMENT0+X,ot,0),p(gt)&&E(ot)}e.unbindTexture()}else{let X=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(X=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(X,$.__webglTexture),zt(X,_),_.mipmaps&&_.mipmaps.length>0)for(let j=0;j<_.mipmaps.length;j++)It(O.__webglFramebuffer[j],y,_,n.COLOR_ATTACHMENT0,X,j);else It(O.__webglFramebuffer,y,_,n.COLOR_ATTACHMENT0,X,0);p(_)&&E(X),e.unbindTexture()}y.depthBuffer&&ie(y)}function Ee(y){const _=y.textures;for(let O=0,$=_.length;O<$;O++){const Q=_[O];if(p(Q)){const nt=b(y),ct=i.get(Q).__webglTexture;e.bindTexture(nt,ct),E(nt),e.unbindTexture()}}}const fe=[],Ve=[];function D(y){if(y.samples>0){if(qt(y)===!1){const _=y.textures,O=y.width,$=y.height;let Q=n.COLOR_BUFFER_BIT;const nt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=i.get(y),X=_.length>1;if(X)for(let gt=0;gt<_.length;gt++)e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);const j=y.texture.mipmaps;j&&j.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let gt=0;gt<_.length;gt++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),X){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ct.__webglColorRenderbuffer[gt]);const vt=i.get(_[gt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,vt,0)}n.blitFramebuffer(0,0,O,$,0,0,O,$,Q,n.NEAREST),c===!0&&(fe.length=0,Ve.length=0,fe.push(n.COLOR_ATTACHMENT0+gt),y.depthBuffer&&y.resolveDepthBuffer===!1&&(fe.push(nt),Ve.push(nt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ve)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),X)for(let gt=0;gt<_.length;gt++){e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,ct.__webglColorRenderbuffer[gt]);const vt=i.get(_[gt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,vt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&c){const _=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function be(y){return Math.min(s.maxSamples,y.samples)}function qt(y){const _=i.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ce(y){const _=a.render.frame;d.get(y)!==_&&(d.set(y,_),y.update())}function ht(y,_){const O=y.colorSpace,$=y.format,Q=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||O!==cr&&O!==Kn&&($t.getTransfer(O)===ee?($!==an||Q!==$e)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",O)),_}function pe(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=q,this.getTextureUnits=Z,this.setTextureUnits=N,this.setTexture2D=tt,this.setTexture2DArray=et,this.setTexture3D=ut,this.setTextureCube=St,this.rebindTextures=de,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=It,this.useMultisampledRTT=qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function C_(n,t){function e(i,s=Kn){let r;const a=$t.getTransfer(s);if(i===$e)return n.UNSIGNED_BYTE;if(i===xo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Xc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Yc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Vc)return n.BYTE;if(i===Wc)return n.SHORT;if(i===fs)return n.UNSIGNED_SHORT;if(i===_o)return n.INT;if(i===Mn)return n.UNSIGNED_INT;if(i===fn)return n.FLOAT;if(i===Fn)return n.HALF_FLOAT;if(i===qc)return n.ALPHA;if(i===$c)return n.RGB;if(i===an)return n.RGBA;if(i===On)return n.DEPTH_COMPONENT;if(i===mi)return n.DEPTH_STENCIL;if(i===jc)return n.RED;if(i===Mo)return n.RED_INTEGER;if(i===yi)return n.RG;if(i===So)return n.RG_INTEGER;if(i===yo)return n.RGBA_INTEGER;if(i===er||i===nr||i===ir||i===sr)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ea||i===ba||i===Ta||i===Aa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ea)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===wa||i===Ra||i===Ca||i===Ia||i===Pa||i===or||i===La)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===wa||i===Ra)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ca)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ia)return r.COMPRESSED_R11_EAC;if(i===Pa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===or)return r.COMPRESSED_RG11_EAC;if(i===La)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Da||i===Ua||i===Na||i===Fa||i===Oa||i===Ba||i===ka||i===za||i===Ga||i===Ha||i===Va||i===Wa||i===Xa||i===Ya)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Da)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ua)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Na)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Oa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ba)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ka)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===za)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ga)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ha)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Va)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ya)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qa||i===$a||i===ja)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===qa)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$a)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ka||i===Za||i===lr||i===Ja)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ka)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Za)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ja)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ps?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const I_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,P_=`
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

}`;class L_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new rh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new yn({vertexShader:I_,fragmentShader:P_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Sn(new xr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class D_ extends ri{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,f=null,h=null,g=null,x=null;const S=typeof XRWebGLBinding<"u",m=new L_,p={},E=e.getContextAttributes();let b=null,T=null;const L=[],A=[],I=new kt;let v=null;const R=new rn;R.viewport=new _e;const B=new rn;B.viewport=new _e;const C=[R,B],H=new zu;let q=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let mt=L[K];return mt===void 0&&(mt=new Fr,L[K]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(K){let mt=L[K];return mt===void 0&&(mt=new Fr,L[K]=mt),mt.getGripSpace()},this.getHand=function(K){let mt=L[K];return mt===void 0&&(mt=new Fr,L[K]=mt),mt.getHandSpace()};function N(K){const mt=A.indexOf(K.inputSource);if(mt===-1)return;const at=L[mt];at!==void 0&&(at.update(K.inputSource,K.frame,l||a),at.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",G);for(let K=0;K<L.length;K++){const mt=A[K];mt!==null&&(A[K]=null,L[K].disconnect(mt))}q=null,Z=null,m.reset();for(const K in p)delete p[K];t.setRenderTarget(b),g=null,h=null,f=null,s=null,T=null,zt.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",W),s.addEventListener("inputsourceschange",G),E.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(I),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,Ct=null,Ut=null;E.depth&&(Ut=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=E.stencil?mi:On,Ct=E.stencil?ps:Mn);const It={colorFormat:e.RGBA8,depthFormat:Ut,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(It),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),T=new _n(h.textureWidth,h.textureHeight,{format:an,type:$e,depthTexture:new Yi(h.textureWidth,h.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const at={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),T=new _n(g.framebufferWidth,g.framebufferHeight,{format:an,type:$e,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),zt.setContext(s),zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(K){for(let mt=0;mt<K.removed.length;mt++){const at=K.removed[mt],Ct=A.indexOf(at);Ct>=0&&(A[Ct]=null,L[Ct].disconnect(at))}for(let mt=0;mt<K.added.length;mt++){const at=K.added[mt];let Ct=A.indexOf(at);if(Ct===-1){for(let It=0;It<L.length;It++)if(It>=A.length){A.push(at),Ct=It;break}else if(A[It]===null){A[It]=at,Ct=It;break}if(Ct===-1)break}const Ut=L[Ct];Ut&&Ut.connect(at)}}const tt=new F,et=new F;function ut(K,mt,at){tt.setFromMatrixPosition(mt.matrixWorld),et.setFromMatrixPosition(at.matrixWorld);const Ct=tt.distanceTo(et),Ut=mt.projectionMatrix.elements,It=at.projectionMatrix.elements,ue=Ut[14]/(Ut[10]-1),Yt=Ut[14]/(Ut[10]+1),ie=(Ut[9]+1)/Ut[5],de=(Ut[9]-1)/Ut[5],Wt=(Ut[8]-1)/Ut[0],Ee=(It[8]+1)/It[0],fe=ue*Wt,Ve=ue*Ee,D=Ct/(-Wt+Ee),be=D*-Wt;if(mt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(be),K.translateZ(D),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ut[10]===-1)K.projectionMatrix.copy(mt.projectionMatrix),K.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const qt=ue+D,ce=Yt+D,ht=fe-be,pe=Ve+(Ct-be),y=ie*Yt/ce*qt,_=de*Yt/ce*qt;K.projectionMatrix.makePerspective(ht,pe,y,_,qt,ce),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function St(K,mt){mt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(mt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let mt=K.near,at=K.far;m.texture!==null&&(m.depthNear>0&&(mt=m.depthNear),m.depthFar>0&&(at=m.depthFar)),H.near=B.near=R.near=mt,H.far=B.far=R.far=at,(q!==H.near||Z!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),q=H.near,Z=H.far),H.layers.mask=K.layers.mask|6,R.layers.mask=H.layers.mask&-5,B.layers.mask=H.layers.mask&-3;const Ct=K.parent,Ut=H.cameras;St(H,Ct);for(let It=0;It<Ut.length;It++)St(Ut[It],Ct);Ut.length===2?ut(H,R,B):H.projectionMatrix.copy(R.projectionMatrix),At(K,H,Ct)};function At(K,mt,at){at===null?K.matrix.copy(mt.matrixWorld):(K.matrix.copy(at.matrixWorld),K.matrix.invert(),K.matrix.multiply(mt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(mt.projectionMatrix),K.projectionMatrixInverse.copy(mt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=eo*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&g===null))return c},this.setFoveation=function(K){c=K,h!==null&&(h.fixedFoveation=K),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(K){return p[K]};let Kt=null;function ne(K,mt){if(d=mt.getViewerPose(l||a),x=mt,d!==null){const at=d.views;g!==null&&(t.setRenderTargetFramebuffer(T,g.framebuffer),t.setRenderTarget(T));let Ct=!1;at.length!==H.cameras.length&&(H.cameras.length=0,Ct=!0);for(let Yt=0;Yt<at.length;Yt++){const ie=at[Yt];let de=null;if(g!==null)de=g.getViewport(ie);else{const Ee=f.getViewSubImage(h,ie);de=Ee.viewport,Yt===0&&(t.setRenderTargetTextures(T,Ee.colorTexture,Ee.depthStencilTexture),t.setRenderTarget(T))}let Wt=C[Yt];Wt===void 0&&(Wt=new rn,Wt.layers.enable(Yt),Wt.viewport=new _e,C[Yt]=Wt),Wt.matrix.fromArray(ie.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(ie.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(de.x,de.y,de.width,de.height),Yt===0&&(H.matrix.copy(Wt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Ct===!0&&H.cameras.push(Wt)}const Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const Yt=f.getDepthInformation(at[0]);Yt&&Yt.isValid&&Yt.texture&&m.init(Yt,s.renderState)}if(Ut&&Ut.includes("camera-access")&&S){t.state.unbindTexture(),f=i.getBinding();for(let Yt=0;Yt<at.length;Yt++){const ie=at[Yt].camera;if(ie){let de=p[ie];de||(de=new rh,p[ie]=de);const Wt=f.getCameraImage(ie);de.sourceTexture=Wt}}}}for(let at=0;at<L.length;at++){const Ct=A[at],Ut=L[at];Ct!==null&&Ut!==void 0&&Ut.update(Ct,mt,l||a)}Kt&&Kt(K,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),x=null}const zt=new ch;zt.setAnimationLoop(ne),this.setAnimationLoop=function(K){Kt=K},this.dispose=function(){}}}const U_=new xe,gh=new Nt;gh.set(-1,0,0,0,1,0,0,0,1);function N_(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ah(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,b,T){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&g(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),x(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),S(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,E,b):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ge&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ge&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=t.get(p),b=E.envMap,T=E.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(U_.makeRotationFromEuler(T)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(gh),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function g(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ge&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){const E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function F_(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,b){const T=b.program;i.uniformBlockBinding(E,T)}function l(E,b){let T=s[E.id];T===void 0&&(x(E),T=d(E),s[E.id]=T,E.addEventListener("dispose",m));const L=b.program;i.updateUBOMapping(E,L);const A=t.render.frame;r[E.id]!==A&&(h(E),r[E.id]=A)}function d(E){const b=f();E.__bindingPointIndex=b;const T=n.createBuffer(),L=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,T),T}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const b=s[E.id],T=E.uniforms,L=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let A=0,I=T.length;A<I;A++){const v=Array.isArray(T[A])?T[A]:[T[A]];for(let R=0,B=v.length;R<B;R++){const C=v[R];if(g(C,A,R,L)===!0){const H=C.__offset,q=Array.isArray(C.value)?C.value:[C.value];let Z=0;for(let N=0;N<q.length;N++){const W=q[N],G=S(W);typeof W=="number"||typeof W=="boolean"?(C.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,H+Z,C.__data)):W.isMatrix3?(C.__data[0]=W.elements[0],C.__data[1]=W.elements[1],C.__data[2]=W.elements[2],C.__data[3]=0,C.__data[4]=W.elements[3],C.__data[5]=W.elements[4],C.__data[6]=W.elements[5],C.__data[7]=0,C.__data[8]=W.elements[6],C.__data[9]=W.elements[7],C.__data[10]=W.elements[8],C.__data[11]=0):ArrayBuffer.isView(W)?C.__data.set(new W.constructor(W.buffer,W.byteOffset,C.__data.length)):(W.toArray(C.__data,Z),Z+=G.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(E,b,T,L){const A=E.value,I=b+"_"+T;if(L[I]===void 0)return typeof A=="number"||typeof A=="boolean"?L[I]=A:ArrayBuffer.isView(A)?L[I]=A.slice():L[I]=A.clone(),!0;{const v=L[I];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return L[I]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(v.equals(A)===!1)return v.copy(A),!0}}return!1}function x(E){const b=E.uniforms;let T=0;const L=16;for(let I=0,v=b.length;I<v;I++){const R=Array.isArray(b[I])?b[I]:[b[I]];for(let B=0,C=R.length;B<C;B++){const H=R[B],q=Array.isArray(H.value)?H.value:[H.value];for(let Z=0,N=q.length;Z<N;Z++){const W=q[Z],G=S(W),tt=T%L,et=tt%G.boundary,ut=tt+et;T+=et,ut!==0&&L-ut<G.storage&&(T+=L-ut),H.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=T,T+=G.storage}}}const A=T%L;return A>0&&(T+=L-A),E.__size=T,E.__cache={},this}function S(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(b.boundary=16,b.storage=E.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){const b=E.target;b.removeEventListener("dispose",m);const T=a.indexOf(b.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}const O_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let dn=null;function B_(){return dn===null&&(dn=new Su(O_,16,16,yi,Fn),dn.name="DFG_LUT",dn.minFilter=Ne,dn.magFilter=Ne,dn.wrapS=In,dn.wrapT=In,dn.generateMipmaps=!1,dn.needsUpdate=!0),dn}class k_{constructor(t={}){const{canvas:e=Zd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:g=$e}=t;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;const S=g,m=new Set([yo,So,Mo]),p=new Set([$e,Mn,fs,ps,xo,vo]),E=new Uint32Array(4),b=new Int32Array(4),T=new F;let L=null,A=null;const I=[],v=[];let R=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let C=!1,H=null;this._outputColorSpace=qe;let q=0,Z=0,N=null,W=-1,G=null;const tt=new _e,et=new _e;let ut=null;const St=new jt(0);let At=0,Kt=e.width,ne=e.height,zt=1,K=null,mt=null;const at=new _e(0,0,Kt,ne),Ct=new _e(0,0,Kt,ne);let Ut=!1;const It=new wo;let ue=!1,Yt=!1;const ie=new xe,de=new F,Wt=new _e,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function Ve(){return N===null?zt:1}let D=i;function be(M,U){return e.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${go}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",Et,!1),e.addEventListener("webglcontextcreationerror",Ot,!1),D===null){const U="webgl2";if(D=be(U,M),D===null)throw be(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Jt("WebGLRenderer: "+M.message),M}let qt,ce,ht,pe,y,_,O,$,Q,nt,ct,X,j,gt,vt,ot,it,Lt,Gt,Qt,P,st,Y;function _t(){qt=new Bm(D),qt.init(),P=new C_(D,qt),ce=new Im(D,qt,t,P),ht=new w_(D,qt),ce.reversedDepthBuffer&&h&&ht.buffers.depth.setReversed(!0),pe=new Gm(D),y=new f_,_=new R_(D,qt,ht,y,ce,P,pe),O=new Om(B),$=new Wu(D),st=new Rm(D,$),Q=new km(D,$,pe,st),nt=new Vm(D,Q,$,st,pe),Lt=new Hm(D,ce,_),vt=new Pm(y),ct=new u_(B,O,qt,ce,st,vt),X=new N_(B,y),j=new m_,gt=new S_(qt),it=new wm(B,O,ht,nt,x,c),ot=new A_(B,nt,ce),Y=new F_(D,pe,ce,ht),Gt=new Cm(D,qt,pe),Qt=new zm(D,qt,pe),pe.programs=ct.programs,B.capabilities=ce,B.extensions=qt,B.properties=y,B.renderLists=j,B.shadowMap=ot,B.state=ht,B.info=pe}_t(),S!==$e&&(R=new Xm(S,e.width,e.height,s,r));const lt=new D_(B,D);this.xr=lt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=qt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=qt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return zt},this.setPixelRatio=function(M){M!==void 0&&(zt=M,this.setSize(Kt,ne,!1))},this.getSize=function(M){return M.set(Kt,ne)},this.setSize=function(M,U,V=!0){if(lt.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=M,ne=U,e.width=Math.floor(M*zt),e.height=Math.floor(U*zt),V===!0&&(e.style.width=M+"px",e.style.height=U+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(Kt*zt,ne*zt).floor()},this.setDrawingBufferSize=function(M,U,V){Kt=M,ne=U,zt=V,e.width=Math.floor(M*V),e.height=Math.floor(U*V),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(S===$e){Jt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){Rt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(tt)},this.getViewport=function(M){return M.copy(at)},this.setViewport=function(M,U,V,k){M.isVector4?at.set(M.x,M.y,M.z,M.w):at.set(M,U,V,k),ht.viewport(tt.copy(at).multiplyScalar(zt).round())},this.getScissor=function(M){return M.copy(Ct)},this.setScissor=function(M,U,V,k){M.isVector4?Ct.set(M.x,M.y,M.z,M.w):Ct.set(M,U,V,k),ht.scissor(et.copy(Ct).multiplyScalar(zt).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(M){ht.setScissorTest(Ut=M)},this.setOpaqueSort=function(M){K=M},this.setTransparentSort=function(M){mt=M},this.getClearColor=function(M){return M.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,V=!0){let k=0;if(M){let z=!1;if(N!==null){const pt=N.texture.format;z=m.has(pt)}if(z){const pt=N.texture.type,Mt=p.has(pt),ft=it.getClearColor(),yt=it.getClearAlpha(),Tt=ft.r,Bt=ft.g,Vt=ft.b;Mt?(E[0]=Tt,E[1]=Bt,E[2]=Vt,E[3]=yt,D.clearBufferuiv(D.COLOR,0,E)):(b[0]=Tt,b[1]=Bt,b[2]=Vt,b[3]=yt,D.clearBufferiv(D.COLOR,0,b))}else k|=D.COLOR_BUFFER_BIT}U&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),H=M},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",Et,!1),e.removeEventListener("webglcontextcreationerror",Ot,!1),it.dispose(),j.dispose(),gt.dispose(),y.dispose(),O.dispose(),nt.dispose(),st.dispose(),Y.dispose(),ct.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",Yo),lt.removeEventListener("sessionend",qo),ai.stop()};function J(M){M.preventDefault(),ul("WebGLRenderer: Context Lost."),C=!0}function Et(){ul("WebGLRenderer: Context Restored."),C=!1;const M=pe.autoReset,U=ot.enabled,V=ot.autoUpdate,k=ot.needsUpdate,z=ot.type;_t(),pe.autoReset=M,ot.enabled=U,ot.autoUpdate=V,ot.needsUpdate=k,ot.type=z}function Ot(M){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ve(M){const U=M.target;U.removeEventListener("dispose",ve),se(U)}function se(M){En(M),y.remove(M)}function En(M){const U=y.get(M).programs;U!==void 0&&(U.forEach(function(V){ct.releaseProgram(V)}),M.isShaderMaterial&&ct.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,V,k,z,pt){U===null&&(U=Ee);const Mt=z.isMesh&&z.matrixWorld.determinant()<0,ft=Jh(M,U,V,k,z);ht.setMaterial(k,Mt);let yt=V.index,Tt=1;if(k.wireframe===!0){if(yt=Q.getWireframeAttribute(V),yt===void 0)return;Tt=2}const Bt=V.drawRange,Vt=V.attributes.position;let wt=Bt.start*Tt,re=(Bt.start+Bt.count)*Tt;pt!==null&&(wt=Math.max(wt,pt.start*Tt),re=Math.min(re,(pt.start+pt.count)*Tt)),yt!==null?(wt=Math.max(wt,0),re=Math.min(re,yt.count)):Vt!=null&&(wt=Math.max(wt,0),re=Math.min(re,Vt.count));const Me=re-wt;if(Me<0||Me===1/0)return;st.setup(z,k,ft,V,yt);let me,oe=Gt;if(yt!==null&&(me=$.get(yt),oe=Qt,oe.setIndex(me)),z.isMesh)k.wireframe===!0?(ht.setLineWidth(k.wireframeLinewidth*Ve()),oe.setMode(D.LINES)):oe.setMode(D.TRIANGLES);else if(z.isLine){let Le=k.linewidth;Le===void 0&&(Le=1),ht.setLineWidth(Le*Ve()),z.isLineSegments?oe.setMode(D.LINES):z.isLineLoop?oe.setMode(D.LINE_LOOP):oe.setMode(D.LINE_STRIP)}else z.isPoints?oe.setMode(D.POINTS):z.isSprite&&oe.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(qt.get("WEBGL_multi_draw"))oe.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Le=z._multiDrawStarts,xt=z._multiDrawCounts,We=z._multiDrawCount,Zt=yt?$.get(yt).bytesPerElement:1,je=y.get(k).currentProgram.getUniforms();for(let ln=0;ln<We;ln++)je.setValue(D,"_gl_DrawID",ln),oe.render(Le[ln]/Zt,xt[ln])}else if(z.isInstancedMesh)oe.renderInstances(wt,Me,z.count);else if(V.isInstancedBufferGeometry){const Le=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,xt=Math.min(V.instanceCount,Le);oe.renderInstances(wt,Me,xt)}else oe.render(wt,Me)};function on(M,U,V){M.transparent===!0&&M.side===Cn&&M.forceSinglePass===!1?(M.side=Ge,M.needsUpdate=!0,bs(M,U,V),M.side=ni,M.needsUpdate=!0,bs(M,U,V),M.side=Cn):bs(M,U,V)}this.compile=function(M,U,V=null){V===null&&(V=M),A=gt.get(V),A.init(U),v.push(A),V.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),M!==V&&M.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),A.setupLights();const k=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const pt=z.material;if(pt)if(Array.isArray(pt))for(let Mt=0;Mt<pt.length;Mt++){const ft=pt[Mt];on(ft,V,z),k.add(ft)}else on(pt,V,z),k.add(pt)}),A=v.pop(),k},this.compileAsync=function(M,U,V=null){const k=this.compile(M,U,V);return new Promise(z=>{function pt(){if(k.forEach(function(Mt){y.get(Mt).currentProgram.isReady()&&k.delete(Mt)}),k.size===0){z(M);return}setTimeout(pt,10)}qt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let br=null;function Kh(M){br&&br(M)}function Yo(){ai.stop()}function qo(){ai.start()}const ai=new ch;ai.setAnimationLoop(Kh),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(M){br=M,lt.setAnimationLoop(M),M===null?ai.stop():ai.start()},lt.addEventListener("sessionstart",Yo),lt.addEventListener("sessionend",qo),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;H!==null&&H.renderStart(M,U);const V=lt.enabled===!0&&lt.isPresenting===!0,k=R!==null&&(N===null||V)&&R.begin(B,N);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(U),U=lt.getCamera()),M.isScene===!0&&M.onBeforeRender(B,M,U,N),A=gt.get(M,v.length),A.init(U),A.state.textureUnits=_.getTextureUnits(),v.push(A),ie.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),It.setFromProjectionMatrix(ie,pn,U.reversedDepth),Yt=this.localClippingEnabled,ue=vt.init(this.clippingPlanes,Yt),L=j.get(M,I.length),L.init(),I.push(L),lt.enabled===!0&&lt.isPresenting===!0){const Mt=B.xr.getDepthSensingMesh();Mt!==null&&Tr(Mt,U,-1/0,B.sortObjects)}Tr(M,U,0,B.sortObjects),L.finish(),B.sortObjects===!0&&L.sort(K,mt),fe=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,fe&&it.addToRenderList(L,M),this.info.render.frame++,ue===!0&&vt.beginShadows();const z=A.state.shadowsArray;if(ot.render(z,M,U),ue===!0&&vt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&R.hasRenderPass())===!1){const Mt=L.opaque,ft=L.transmissive;if(A.setupLights(),U.isArrayCamera){const yt=U.cameras;if(ft.length>0)for(let Tt=0,Bt=yt.length;Tt<Bt;Tt++){const Vt=yt[Tt];jo(Mt,ft,M,Vt)}fe&&it.render(M);for(let Tt=0,Bt=yt.length;Tt<Bt;Tt++){const Vt=yt[Tt];$o(L,M,Vt,Vt.viewport)}}else ft.length>0&&jo(Mt,ft,M,U),fe&&it.render(M),$o(L,M,U)}N!==null&&Z===0&&(_.updateMultisampleRenderTarget(N),_.updateRenderTargetMipmap(N)),k&&R.end(B),M.isScene===!0&&M.onAfterRender(B,M,U),st.resetDefaultState(),W=-1,G=null,v.pop(),v.length>0?(A=v[v.length-1],_.setTextureUnits(A.state.textureUnits),ue===!0&&vt.setGlobalState(B.clippingPlanes,A.state.camera)):A=null,I.pop(),I.length>0?L=I[I.length-1]:L=null,H!==null&&H.renderEnd()};function Tr(M,U,V,k){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLightProbeGrid)A.pushLightProbeGrid(M);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||It.intersectsSprite(M)){k&&Wt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ie);const Mt=nt.update(M),ft=M.material;ft.visible&&L.push(M,Mt,ft,V,Wt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||It.intersectsObject(M))){const Mt=nt.update(M),ft=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Wt.copy(M.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Wt.copy(Mt.boundingSphere.center)),Wt.applyMatrix4(M.matrixWorld).applyMatrix4(ie)),Array.isArray(ft)){const yt=Mt.groups;for(let Tt=0,Bt=yt.length;Tt<Bt;Tt++){const Vt=yt[Tt],wt=ft[Vt.materialIndex];wt&&wt.visible&&L.push(M,Mt,wt,V,Wt.z,Vt)}}else ft.visible&&L.push(M,Mt,ft,V,Wt.z,null)}}const pt=M.children;for(let Mt=0,ft=pt.length;Mt<ft;Mt++)Tr(pt[Mt],U,V,k)}function $o(M,U,V,k){const{opaque:z,transmissive:pt,transparent:Mt}=M;A.setupLightsView(V),ue===!0&&vt.setGlobalState(B.clippingPlanes,V),k&&ht.viewport(tt.copy(k)),z.length>0&&Es(z,U,V),pt.length>0&&Es(pt,U,V),Mt.length>0&&Es(Mt,U,V),ht.buffers.depth.setTest(!0),ht.buffers.depth.setMask(!0),ht.buffers.color.setMask(!0),ht.setPolygonOffset(!1)}function jo(M,U,V,k){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[k.id]===void 0){const wt=qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[k.id]=new _n(1,1,{generateMipmaps:!0,type:wt?Fn:$e,minFilter:pi,samples:Math.max(4,ce.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace})}const pt=A.state.transmissionRenderTarget[k.id],Mt=k.viewport||tt;pt.setSize(Mt.z*B.transmissionResolutionScale,Mt.w*B.transmissionResolutionScale);const ft=B.getRenderTarget(),yt=B.getActiveCubeFace(),Tt=B.getActiveMipmapLevel();B.setRenderTarget(pt),B.getClearColor(St),At=B.getClearAlpha(),At<1&&B.setClearColor(16777215,.5),B.clear(),fe&&it.render(V);const Bt=B.toneMapping;B.toneMapping=gn;const Vt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),A.setupLightsView(k),ue===!0&&vt.setGlobalState(B.clippingPlanes,k),Es(M,V,k),_.updateMultisampleRenderTarget(pt),_.updateRenderTargetMipmap(pt),qt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let re=0,Me=U.length;re<Me;re++){const me=U[re],{object:oe,geometry:Le,material:xt,group:We}=me;if(xt.side===Cn&&oe.layers.test(k.layers)){const Zt=xt.side;xt.side=Ge,xt.needsUpdate=!0,Ko(oe,V,k,Le,xt,We),xt.side=Zt,xt.needsUpdate=!0,wt=!0}}wt===!0&&(_.updateMultisampleRenderTarget(pt),_.updateRenderTargetMipmap(pt))}B.setRenderTarget(ft,yt,Tt),B.setClearColor(St,At),Vt!==void 0&&(k.viewport=Vt),B.toneMapping=Bt}function Es(M,U,V){const k=U.isScene===!0?U.overrideMaterial:null;for(let z=0,pt=M.length;z<pt;z++){const Mt=M[z],{object:ft,geometry:yt,group:Tt}=Mt;let Bt=Mt.material;Bt.allowOverride===!0&&k!==null&&(Bt=k),ft.layers.test(V.layers)&&Ko(ft,U,V,yt,Bt,Tt)}}function Ko(M,U,V,k,z,pt){M.onBeforeRender(B,U,V,k,z,pt),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(B,U,V,k,M,pt),z.transparent===!0&&z.side===Cn&&z.forceSinglePass===!1?(z.side=Ge,z.needsUpdate=!0,B.renderBufferDirect(V,U,k,z,M,pt),z.side=ni,z.needsUpdate=!0,B.renderBufferDirect(V,U,k,z,M,pt),z.side=Cn):B.renderBufferDirect(V,U,k,z,M,pt),M.onAfterRender(B,U,V,k,z,pt)}function bs(M,U,V){U.isScene!==!0&&(U=Ee);const k=y.get(M),z=A.state.lights,pt=A.state.shadowsArray,Mt=z.state.version,ft=ct.getParameters(M,z.state,pt,U,V,A.state.lightProbeGridArray),yt=ct.getProgramCacheKey(ft);let Tt=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,k.fog=U.fog;const Bt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=O.get(M.envMap||k.environment,Bt),k.envMapRotation=k.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Tt===void 0&&(M.addEventListener("dispose",ve),Tt=new Map,k.programs=Tt);let Vt=Tt.get(yt);if(Vt!==void 0){if(k.currentProgram===Vt&&k.lightsStateVersion===Mt)return Jo(M,ft),Vt}else ft.uniforms=ct.getUniforms(M),H!==null&&M.isNodeMaterial&&H.build(M,V,ft),M.onBeforeCompile(ft,B),Vt=ct.acquireProgram(ft,yt),Tt.set(yt,Vt),k.uniforms=ft.uniforms;const wt=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(wt.clippingPlanes=vt.uniform),Jo(M,ft),k.needsLights=td(M),k.lightsStateVersion=Mt,k.needsLights&&(wt.ambientLightColor.value=z.state.ambient,wt.lightProbe.value=z.state.probe,wt.directionalLights.value=z.state.directional,wt.directionalLightShadows.value=z.state.directionalShadow,wt.spotLights.value=z.state.spot,wt.spotLightShadows.value=z.state.spotShadow,wt.rectAreaLights.value=z.state.rectArea,wt.ltc_1.value=z.state.rectAreaLTC1,wt.ltc_2.value=z.state.rectAreaLTC2,wt.pointLights.value=z.state.point,wt.pointLightShadows.value=z.state.pointShadow,wt.hemisphereLights.value=z.state.hemi,wt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,wt.spotLightMatrix.value=z.state.spotLightMatrix,wt.spotLightMap.value=z.state.spotLightMap,wt.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=A.state.lightProbeGridArray.length>0,k.currentProgram=Vt,k.uniformsList=null,Vt}function Zo(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=rr.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Jo(M,U){const V=y.get(M);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function Zh(M,U){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;T.setFromMatrixPosition(U.matrixWorld);for(let V=0,k=M.length;V<k;V++){const z=M[V];if(z.texture!==null&&z.boundingBox.containsPoint(T))return z}return null}function Jh(M,U,V,k,z){U.isScene!==!0&&(U=Ee),_.resetTextureUnits();const pt=U.fog,Mt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?U.environment:null,ft=N===null?B.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:$t.workingColorSpace,yt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Tt=O.get(k.envMap||Mt,yt),Bt=k.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Vt=!!V.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),wt=!!V.morphAttributes.position,re=!!V.morphAttributes.normal,Me=!!V.morphAttributes.color;let me=gn;k.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(me=B.toneMapping);const oe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Le=oe!==void 0?oe.length:0,xt=y.get(k),We=A.state.lights;if(ue===!0&&(Yt===!0||M!==G)){const he=M===G&&k.id===W;vt.setState(k,M,he)}let Zt=!1;k.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==We.state.version||xt.outputColorSpace!==ft||z.isBatchedMesh&&xt.batching===!1||!z.isBatchedMesh&&xt.batching===!0||z.isBatchedMesh&&xt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&xt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&xt.instancing===!1||!z.isInstancedMesh&&xt.instancing===!0||z.isSkinnedMesh&&xt.skinning===!1||!z.isSkinnedMesh&&xt.skinning===!0||z.isInstancedMesh&&xt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&xt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&xt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&xt.instancingMorph===!1&&z.morphTexture!==null||xt.envMap!==Tt||k.fog===!0&&xt.fog!==pt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==vt.numPlanes||xt.numIntersection!==vt.numIntersection)||xt.vertexAlphas!==Bt||xt.vertexTangents!==Vt||xt.morphTargets!==wt||xt.morphNormals!==re||xt.morphColors!==Me||xt.toneMapping!==me||xt.morphTargetsCount!==Le||!!xt.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Zt=!0):(Zt=!0,xt.__version=k.version);let je=xt.currentProgram;Zt===!0&&(je=bs(k,U,z),H&&k.isNodeMaterial&&H.onUpdateProgram(k,je,xt));let ln=!1,kn=!1,Ei=!1;const le=je.getUniforms(),Se=xt.uniforms;if(ht.useProgram(je.program)&&(ln=!0,kn=!0,Ei=!0),k.id!==W&&(W=k.id,kn=!0),xt.needsLights){const he=Zh(A.state.lightProbeGridArray,z);xt.lightProbeGrid!==he&&(xt.lightProbeGrid=he,kn=!0)}if(ln||G!==M){ht.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),le.setValue(D,"projectionMatrix",M.projectionMatrix),le.setValue(D,"viewMatrix",M.matrixWorldInverse);const Gn=le.map.cameraPosition;Gn!==void 0&&Gn.setValue(D,de.setFromMatrixPosition(M.matrixWorld)),ce.logarithmicDepthBuffer&&le.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&le.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),G!==M&&(G=M,kn=!0,Ei=!0)}if(xt.needsLights&&(We.state.directionalShadowMap.length>0&&le.setValue(D,"directionalShadowMap",We.state.directionalShadowMap,_),We.state.spotShadowMap.length>0&&le.setValue(D,"spotShadowMap",We.state.spotShadowMap,_),We.state.pointShadowMap.length>0&&le.setValue(D,"pointShadowMap",We.state.pointShadowMap,_)),z.isSkinnedMesh){le.setOptional(D,z,"bindMatrix"),le.setOptional(D,z,"bindMatrixInverse");const he=z.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),le.setValue(D,"boneTexture",he.boneTexture,_))}z.isBatchedMesh&&(le.setOptional(D,z,"batchingTexture"),le.setValue(D,"batchingTexture",z._matricesTexture,_),le.setOptional(D,z,"batchingIdTexture"),le.setValue(D,"batchingIdTexture",z._indirectTexture,_),le.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&le.setValue(D,"batchingColorTexture",z._colorsTexture,_));const zn=V.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&Lt.update(z,V,je),(kn||xt.receiveShadow!==z.receiveShadow)&&(xt.receiveShadow=z.receiveShadow,le.setValue(D,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&U.environment!==null&&(Se.envMapIntensity.value=U.environmentIntensity),Se.dfgLUT!==void 0&&(Se.dfgLUT.value=B_()),kn){if(le.setValue(D,"toneMappingExposure",B.toneMappingExposure),xt.needsLights&&Qh(Se,Ei),pt&&k.fog===!0&&X.refreshFogUniforms(Se,pt),X.refreshMaterialUniforms(Se,k,zt,ne,A.state.transmissionRenderTarget[M.id]),xt.needsLights&&xt.lightProbeGrid){const he=xt.lightProbeGrid;Se.probesSH.value=he.texture,Se.probesMin.value.copy(he.boundingBox.min),Se.probesMax.value.copy(he.boundingBox.max),Se.probesResolution.value.copy(he.resolution)}rr.upload(D,Zo(xt),Se,_)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(rr.upload(D,Zo(xt),Se,_),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&le.setValue(D,"center",z.center),le.setValue(D,"modelViewMatrix",z.modelViewMatrix),le.setValue(D,"normalMatrix",z.normalMatrix),le.setValue(D,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){const he=k.uniformsGroups;for(let Gn=0,bi=he.length;Gn<bi;Gn++){const Qo=he[Gn];Y.update(Qo,je),Y.bind(Qo,je)}}return je}function Qh(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function td(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(M,U,V){const k=y.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),y.get(M.texture).__webglTexture=U,y.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:V,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const V=y.get(M);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0};const ed=D.createFramebuffer();this.setRenderTarget=function(M,U=0,V=0){N=M,q=U,Z=V;let k=null,z=!1,pt=!1;if(M){const ft=y.get(M);if(ft.__useDefaultFramebuffer!==void 0){ht.bindFramebuffer(D.FRAMEBUFFER,ft.__webglFramebuffer),tt.copy(M.viewport),et.copy(M.scissor),ut=M.scissorTest,ht.viewport(tt),ht.scissor(et),ht.setScissorTest(ut),W=-1;return}else if(ft.__webglFramebuffer===void 0)_.setupRenderTarget(M);else if(ft.__hasExternalTextures)_.rebindTextures(M,y.get(M.texture).__webglTexture,y.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Bt=M.depthTexture;if(ft.__boundDepthTexture!==Bt){if(Bt!==null&&y.has(Bt)&&(M.width!==Bt.image.width||M.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_.setupDepthRenderbuffer(M)}}const yt=M.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(pt=!0);const Tt=y.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Tt[U])?k=Tt[U][V]:k=Tt[U],z=!0):M.samples>0&&_.useMultisampledRTT(M)===!1?k=y.get(M).__webglMultisampledFramebuffer:Array.isArray(Tt)?k=Tt[V]:k=Tt,tt.copy(M.viewport),et.copy(M.scissor),ut=M.scissorTest}else tt.copy(at).multiplyScalar(zt).floor(),et.copy(Ct).multiplyScalar(zt).floor(),ut=Ut;if(V!==0&&(k=ed),ht.bindFramebuffer(D.FRAMEBUFFER,k)&&ht.drawBuffers(M,k),ht.viewport(tt),ht.scissor(et),ht.setScissorTest(ut),z){const ft=y.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,ft.__webglTexture,V)}else if(pt){const ft=U;for(let yt=0;yt<M.textures.length;yt++){const Tt=y.get(M.textures[yt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+yt,Tt.__webglTexture,V,ft)}}else if(M!==null&&V!==0){const ft=y.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,V)}W=-1},this.readRenderTargetPixels=function(M,U,V,k,z,pt,Mt,ft=0){if(!(M&&M.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Mt!==void 0&&(yt=yt[Mt]),yt){ht.bindFramebuffer(D.FRAMEBUFFER,yt);try{const Tt=M.textures[ft],Bt=Tt.format,Vt=Tt.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft),!ce.textureFormatReadable(Bt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ce.textureTypeReadable(Vt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-k&&V>=0&&V<=M.height-z&&D.readPixels(U,V,k,z,P.convert(Bt),P.convert(Vt),pt)}finally{const Tt=N!==null?y.get(N).__webglFramebuffer:null;ht.bindFramebuffer(D.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(M,U,V,k,z,pt,Mt,ft=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=y.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Mt!==void 0&&(yt=yt[Mt]),yt)if(U>=0&&U<=M.width-k&&V>=0&&V<=M.height-z){ht.bindFramebuffer(D.FRAMEBUFFER,yt);const Tt=M.textures[ft],Bt=Tt.format,Vt=Tt.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft),!ce.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ce.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const wt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,wt),D.bufferData(D.PIXEL_PACK_BUFFER,pt.byteLength,D.STREAM_READ),D.readPixels(U,V,k,z,P.convert(Bt),P.convert(Vt),0);const re=N!==null?y.get(N).__webglFramebuffer:null;ht.bindFramebuffer(D.FRAMEBUFFER,re);const Me=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Jd(D,Me,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,wt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pt),D.deleteBuffer(wt),D.deleteSync(Me),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,V=0){const k=Math.pow(2,-V),z=Math.floor(M.image.width*k),pt=Math.floor(M.image.height*k),Mt=U!==null?U.x:0,ft=U!==null?U.y:0;_.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,Mt,ft,z,pt),ht.unbindTexture()};const nd=D.createFramebuffer(),id=D.createFramebuffer();this.copyTextureToTexture=function(M,U,V=null,k=null,z=0,pt=0){let Mt,ft,yt,Tt,Bt,Vt,wt,re,Me;const me=M.isCompressedTexture?M.mipmaps[pt]:M.image;if(V!==null)Mt=V.max.x-V.min.x,ft=V.max.y-V.min.y,yt=V.isBox3?V.max.z-V.min.z:1,Tt=V.min.x,Bt=V.min.y,Vt=V.isBox3?V.min.z:0;else{const Se=Math.pow(2,-z);Mt=Math.floor(me.width*Se),ft=Math.floor(me.height*Se),M.isDataArrayTexture?yt=me.depth:M.isData3DTexture?yt=Math.floor(me.depth*Se):yt=1,Tt=0,Bt=0,Vt=0}k!==null?(wt=k.x,re=k.y,Me=k.z):(wt=0,re=0,Me=0);const oe=P.convert(U.format),Le=P.convert(U.type);let xt;U.isData3DTexture?(_.setTexture3D(U,0),xt=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(_.setTexture2DArray(U,0),xt=D.TEXTURE_2D_ARRAY):(_.setTexture2D(U,0),xt=D.TEXTURE_2D),ht.activeTexture(D.TEXTURE0),ht.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),ht.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),ht.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const We=ht.getParameter(D.UNPACK_ROW_LENGTH),Zt=ht.getParameter(D.UNPACK_IMAGE_HEIGHT),je=ht.getParameter(D.UNPACK_SKIP_PIXELS),ln=ht.getParameter(D.UNPACK_SKIP_ROWS),kn=ht.getParameter(D.UNPACK_SKIP_IMAGES);ht.pixelStorei(D.UNPACK_ROW_LENGTH,me.width),ht.pixelStorei(D.UNPACK_IMAGE_HEIGHT,me.height),ht.pixelStorei(D.UNPACK_SKIP_PIXELS,Tt),ht.pixelStorei(D.UNPACK_SKIP_ROWS,Bt),ht.pixelStorei(D.UNPACK_SKIP_IMAGES,Vt);const Ei=M.isDataArrayTexture||M.isData3DTexture,le=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Se=y.get(M),zn=y.get(U),he=y.get(Se.__renderTarget),Gn=y.get(zn.__renderTarget);ht.bindFramebuffer(D.READ_FRAMEBUFFER,he.__webglFramebuffer),ht.bindFramebuffer(D.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let bi=0;bi<yt;bi++)Ei&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(M).__webglTexture,z,Vt+bi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,y.get(U).__webglTexture,pt,Me+bi)),D.blitFramebuffer(Tt,Bt,Mt,ft,wt,re,Mt,ft,D.DEPTH_BUFFER_BIT,D.NEAREST);ht.bindFramebuffer(D.READ_FRAMEBUFFER,null),ht.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||y.has(M)){const Se=y.get(M),zn=y.get(U);ht.bindFramebuffer(D.READ_FRAMEBUFFER,nd),ht.bindFramebuffer(D.DRAW_FRAMEBUFFER,id);for(let he=0;he<yt;he++)Ei?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Se.__webglTexture,z,Vt+he):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Se.__webglTexture,z),le?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,zn.__webglTexture,pt,Me+he):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,zn.__webglTexture,pt),z!==0?D.blitFramebuffer(Tt,Bt,Mt,ft,wt,re,Mt,ft,D.COLOR_BUFFER_BIT,D.NEAREST):le?D.copyTexSubImage3D(xt,pt,wt,re,Me+he,Tt,Bt,Mt,ft):D.copyTexSubImage2D(xt,pt,wt,re,Tt,Bt,Mt,ft);ht.bindFramebuffer(D.READ_FRAMEBUFFER,null),ht.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else le?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(xt,pt,wt,re,Me,Mt,ft,yt,oe,Le,me.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(xt,pt,wt,re,Me,Mt,ft,yt,oe,me.data):D.texSubImage3D(xt,pt,wt,re,Me,Mt,ft,yt,oe,Le,me):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pt,wt,re,Mt,ft,oe,Le,me.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pt,wt,re,me.width,me.height,oe,me.data):D.texSubImage2D(D.TEXTURE_2D,pt,wt,re,Mt,ft,oe,Le,me);ht.pixelStorei(D.UNPACK_ROW_LENGTH,We),ht.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Zt),ht.pixelStorei(D.UNPACK_SKIP_PIXELS,je),ht.pixelStorei(D.UNPACK_SKIP_ROWS,ln),ht.pixelStorei(D.UNPACK_SKIP_IMAGES,kn),pt===0&&U.generateMipmaps&&D.generateMipmap(xt),ht.unbindTexture()},this.initRenderTarget=function(M){y.get(M).__webglFramebuffer===void 0&&_.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?_.setTextureCube(M,0):M.isData3DTexture?_.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?_.setTexture2DArray(M,0):_.setTexture2D(M,0),ht.unbindTexture()},this.resetState=function(){q=0,Z=0,N=null,ht.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}const cc={type:"change"},Co={type:"start"},_h={type:"end"},Js=new Ao,hc=new $n,z_=Math.cos(70*eu.DEG2RAD),Te=new F,ke=2*Math.PI,ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},la=1e-6;class G_ extends Hu{constructor(t,e=null){super(t,e),this.state=ae.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ln.ROTATE,MIDDLE:Ln.DOLLY,RIGHT:Ln.PAN},this.touches={ONE:Zn.ROTATE,TWO:Zn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new ii,this._lastTargetPosition=new F,this._quat=new ii().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ol,this._sphericalDelta=new Ol,this._scale=1,this._panOffset=new F,this._rotateStart=new kt,this._rotateEnd=new kt,this._rotateDelta=new kt,this._panStart=new kt,this._panEnd=new kt,this._panDelta=new kt,this._dollyStart=new kt,this._dollyEnd=new kt,this._dollyDelta=new kt,this._dollyDirection=new F,this._mouse=new kt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=V_.bind(this),this._onPointerDown=H_.bind(this),this._onPointerUp=W_.bind(this),this._onContextMenu=Z_.bind(this),this._onMouseWheel=q_.bind(this),this._onKeyDown=$_.bind(this),this._onTouchStart=j_.bind(this),this._onTouchMove=K_.bind(this),this._onMouseDown=X_.bind(this),this._onMouseMove=Y_.bind(this),this._interceptControlDown=J_.bind(this),this._interceptControlUp=Q_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cc),this.update(),this.state=ae.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ke:i>Math.PI&&(i-=ke),s<-Math.PI?s+=ke:s>Math.PI&&(s-=ke),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Te.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Js.origin.copy(this.object.position),Js.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Js.direction))<z_?this.object.lookAt(this.target):(hc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Js.intersectPlane(hc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>la||8*(1-this._lastQuaternion.dot(this.object.quaternion))>la||this._lastTargetPosition.distanceToSquared(this.target)>la?(this.dispatchEvent(cc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ke/60*this.autoRotateSpeed*t:ke/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Te.copy(s).sub(this.target);let r=Te.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ke*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new kt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function H_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function V_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function W_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_h),this.state=ae.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function X_(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ln.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ae.DOLLY;break;case Ln.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ae.ROTATE}break;case Ln.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ae.PAN}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(Co)}function Y_(n){switch(this.state){case ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function q_(n){this.enabled===!1||this.enableZoom===!1||this.state!==ae.NONE||(n.preventDefault(),this.dispatchEvent(Co),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(_h))}function $_(n){this.enabled!==!1&&this._handleKeyDown(n)}function j_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Zn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ae.TOUCH_ROTATE;break;case Zn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ae.TOUCH_PAN;break;default:this.state=ae.NONE}break;case 2:switch(this.touches.TWO){case Zn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ae.TOUCH_DOLLY_PAN;break;case Zn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ae.TOUCH_DOLLY_ROTATE;break;default:this.state=ae.NONE}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(Co)}function K_(n){switch(this._trackPointer(n),this.state){case ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ae.NONE}}function Z_(n){this.enabled!==!1&&n.preventDefault()}function J_(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Q_(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const tx="#1f6659",ex="#4d5a52";class nx{constructor(t,e){cn(this,"renderer");cn(this,"scene",new mu);cn(this,"camera",new vr(-1,1,1,-1,.1,5e4));cn(this,"controls");cn(this,"root",new cs);cn(this,"sceneSpan",1e3);cn(this,"cameraReady",!1);cn(this,"animationFrame",null);this.canvas=t,this.state=e,this.renderer=new k_({canvas:t,antialias:!0}),this.renderer.setClearColor(16514296,1),this.renderer.outputColorSpace=qe,this.controls=new G_(this.camera,t),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enableRotate=!0,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:Ln.ROTATE,MIDDLE:Ln.DOLLY,RIGHT:Ln.PAN},this.controls.touches={ONE:Zn.ROTATE,TWO:Zn.DOLLY_PAN},this.controls.addEventListener("change",()=>this.renderFrame()),this.scene.add(this.root),this.addLighting(),this.startRenderLoop()}bindInteractions(t){}dispose(){this.animationFrame!==null&&window.cancelAnimationFrame(this.animationFrame),this.animationFrame=null,this.controls.dispose(),this.clearRoot(),this.renderer.dispose()}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.renderer.setPixelRatio(e),this.renderer.setSize(Math.max(1,t.width),Math.max(1,t.height),!1),this.updateCameraFrustum(t.width,t.height),this.draw()}draw(){this.clearRoot();const t=Nn(this.state.boards);if(!t){this.renderFrame();return}const e=Math.max(this.state.depth,...this.state.boards.map(o=>Qn(o,this.state.depth))),i=this.overlayThickness(e),s=e+i,r=t.left+t.w/2,a=t.top+t.h/2;this.sceneSpan=Math.max(t.w,t.h,s,1)*1.65,this.updateCameraFrustum(this.canvas.clientWidth,this.canvas.clientHeight),this.addGround(t.w,s,t.h),uo(this.state.boards).map(o=>this.boxForBoard(o,r,a,s,i)).forEach(o=>this.addBoardBox(o)),this.cameraReady||this.resetCamera(),this.controls.target.set(0,0,0),this.controls.update(),this.renderFrame()}addLighting(){this.scene.add(new Bu(16777215,1.75));const t=new Fl(16777215,2.3);t.position.set(800,1100,900),this.scene.add(t);const e=new Fl(16777215,.75);e.position.set(-700,500,-500),this.scene.add(e)}updateCameraFrustum(t,e){const i=Math.max(.1,t/Math.max(1,e)),s=this.sceneSpan;i>=1?(this.camera.left=-s*i/2,this.camera.right=s*i/2,this.camera.top=s/2,this.camera.bottom=-s/2):(this.camera.left=-s/2,this.camera.right=s/2,this.camera.top=s/i/2,this.camera.bottom=-s/i/2),this.camera.updateProjectionMatrix()}resetCamera(){this.camera.position.set(this.sceneSpan*.55,0,this.sceneSpan*1.45),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update(),this.cameraReady=!0}addGround(t,e,i){const s=Math.max(t,e,300)*1.25,r=new Gu(s,12,10466216,14081752);r.position.y=-Math.max(60,i/2+36),r.position.z=0,this.root.add(r)}boxForBoard(t,e,i,s,r){const a=this.zRangeForBoard(t,Qn(t,this.state.depth),r),o=Math.max(1,a.front-a.back),c=t.kind==="front"&&!this.state.showFrontPanels?.18:1;return{board:t,x:t.x+t.w/2-e,y:i-(t.y+t.h/2),z:(a.back+a.front)/2-s/2,w:Math.max(1,t.w),h:Math.max(1,t.h),d:o,opacity:c}}zRangeForBoard(t,e,i){if(t.kind==="front"){const s=this.deepestOverlappingStructuralDepth(t)??e;return{back:s,front:s+i}}return t.kind==="back"?{back:0,front:i}:{back:0,front:e}}addBoardBox(t){const e=this.materialFor(t.board),i=this.state.selectedIds.includes(t.board.id)||this.state.selectedId===t.board.id,s=new Ki(t.w,t.h,t.d),r=new Du({color:new jt(e.color),opacity:t.opacity,roughness:.78,metalness:0,transparent:t.opacity<1,depthWrite:t.opacity>=1}),a=new Sn(s,r);a.position.set(t.x,t.y,t.z),this.root.add(a);const o=new wu(s),c=new Ro({color:i?tx:ex,transparent:!0,opacity:i?1:.44}),l=new ih(o,c);l.position.copy(a.position),this.root.add(l)}overlayThickness(t){return Math.max(4,Math.min(this.state.thickness,t*.08))}deepestOverlappingStructuralDepth(t){const e=this.state.boards.filter(i=>i.id!==t.id&&i.kind!=="front"&&i.kind!=="back").filter(i=>this.boardsOverlapInElevation(t,i));return e.length?Math.max(...e.map(i=>Qn(i,this.state.depth))):null}boardsOverlapInElevation(t,e){return t.x<e.x+e.w&&t.x+t.w>e.x&&t.y<e.y+e.h&&t.y+t.h>e.y}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}clearRoot(){[...this.root.children].forEach(t=>{this.root.remove(t),this.disposeObject(t)})}disposeObject(t){t.traverse(e=>{var r;const i=e;(r=i.geometry)==null||r.dispose();const s=i.material;Array.isArray(s)?s.forEach(a=>a.dispose()):s==null||s.dispose()})}renderFrame(){this.renderer.render(this.scene,this.camera)}startRenderLoop(){const t=()=>{this.animationFrame=window.requestAnimationFrame(t),this.controls.update(),this.renderFrame()};t()}}const ix=`{
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
`,Pt=rt("#sketchCanvas"),sx=rt("#view3dCanvas"),w={projectNameInput:rt("#projectNameInput"),templateChooser:rt("#templateChooser"),canvasWrap:rt("#canvasWrap"),templateList:rt("#templateList"),measureModeBtn:rt("#measureModeBtn"),presetList:rt("#presetList"),thicknessInput:rt("#thicknessInput"),depthInput:rt("#depthInput"),gridInput:rt("#gridInput"),snapToggle:rt("#snapToggle"),dimToggle:rt("#dimToggle"),frontLayerToggle:rt("#frontLayerToggle"),duplicateBtn:rt("#duplicateBtn"),rotateBtn:rt("#rotateBtn"),undoBtn:rt("#undoBtn"),redoBtn:rt("#redoBtn"),measureWidthBtn:rt("#measureWidthBtn"),measureHeightBtn:rt("#measureHeightBtn"),saveBtn:rt("#saveBtn"),loadBtn:rt("#loadBtn"),newProjectBtn:rt("#newProjectBtn"),projectFileInput:rt("#projectFileInput"),deleteBtn:rt("#deleteBtn"),fitBtn:rt("#fitBtn"),view3dBtn:rt("#view3dBtn"),copyCsvBtn:rt("#copyCsvBtn"),exportBtn:rt("#exportBtn"),notificationToast:rt("#notificationToast"),selectionStatus:rt("#selectionStatus"),snapStatus:rt("#snapStatus"),emptySelection:rt("#emptySelection"),inspector:rt("#inspector"),nameInput:rt("#nameInput"),xInput:rt("#xInput"),yInput:rt("#yInput"),wInput:rt("#wInput"),hInput:rt("#hInput"),depthOverrideInput:rt("#depthOverrideInput"),layoutAnchorAxisInput:rt("#layoutAnchorAxisInput"),layoutAnchorCountInput:rt("#layoutAnchorCountInput"),layoutAnchorBalanceInput:rt("#layoutAnchorBalanceInput"),layoutAnchorStartInput:rt("#layoutAnchorStartInput"),layoutAnchorEndInput:rt("#layoutAnchorEndInput"),layoutAnchorStartLabel:rt("#layoutAnchorStartLabel"),layoutAnchorEndLabel:rt("#layoutAnchorEndLabel"),layoutAnchorThicknessInput:rt("#layoutAnchorThicknessInput"),layoutAnchorApplyBtn:rt("#layoutAnchorApplyBtn"),layoutAnchorClearBtn:rt("#layoutAnchorClearBtn"),layoutAnchorSummary:rt("#layoutAnchorSummary"),materialSelect:rt("#materialSelect"),materialSelectButton:rt("#materialSelectButton"),materialSelectList:rt("#materialSelectList"),materialSelectSwatch:rt("#materialSelectSwatch"),materialSelectText:rt("#materialSelectText"),materialInput:rt("#materialInput"),materialLabelSwatch:rt("#materialLabelSwatch"),materialForm:rt("#materialForm"),materialNameInput:rt("#materialNameInput"),materialColorInput:rt("#materialColorInput"),addMaterialBtn:rt("#addMaterialBtn"),laminateLeftInput:rt("#laminateLeftInput"),laminateRightInput:rt("#laminateRightInput"),laminateFrontInput:rt("#laminateFrontInput"),laminateBackInput:rt("#laminateBackInput"),ignoreOrderInput:rt("#ignoreOrderInput"),measureList:rt("#measureList"),warningList:rt("#warningList"),cutList:rt("#cutList"),ignoredCutList:rt("#ignoredCutList"),rightPanelTools:rt("#rightPanelTools"),woodOrderPanel:rt("#woodOrderPanel"),woodOrderToggleBtn:rt("#woodOrderToggleBtn"),woodOrderBackBtn:rt("#woodOrderBackBtn"),materialList:rt("#materialList"),anchorOverlay:rt("#anchorOverlay"),overlayScaleBar:rt("#overlayScaleBar"),overlayScaleLabel:rt("#overlayScaleLabel"),overlayZoomLabel:rt("#overlayZoomLabel"),measureRenameForm:rt("#measureRenameForm"),measureRenameInput:rt("#measureRenameInput"),measureRenameCancelBtn:rt("#measureRenameCancelBtn")},u={projectName:"",boards:[],anchors:[],layoutAnchors:[],measurements:[],materials:Sh(),selectedId:null,selectedIds:[],selectedMeasurementId:null,nextId:1,nextAnchorId:1,nextLayoutAnchorId:1,nextMeasurementId:1,thickness:18,depth:560,grid:25,gridOriginX:160,gridOriginY:120,snap:!0,showDimensions:!0,showFrontPanels:!0,scale:.62,panX:160,panY:110,dragging:null,resizing:null,measurementDragging:null,panning:null,selectionBox:null,snapGuides:[],tool:"select",pendingMeasurementAnchor:null,previewMeasurementAnchor:null,lastSnap:"Ready"},xh=new _d(Pt,u),Io=new nx(sx,u),vh="mebel-maker-project",dc="39c71ca",rx=80,ax=.125,ox=.09,lx=1.3,cx=2,zi=46,Mh=new AbortController,bt={signal:Mh.signal},Vi=[],yr=[];let uc,gs=null,$i="sketch",jn=!1;const hx={side:{name:"Side",kind:"upright",autoThickness:"width",w:()=>u.thickness,h:()=>560},shelf:{name:"Shelf",kind:"shelf",autoThickness:"height",w:()=>820-u.thickness*2,h:()=>u.thickness},divider:{name:"Divider",kind:"upright",autoThickness:"width",w:()=>u.thickness,h:()=>560-u.thickness*2},back:{name:"Back",kind:"back",autoThickness:"none",w:()=>820,h:()=>560},front:{name:"Front",kind:"front",autoThickness:"none",w:()=>820,h:()=>560}},Po="birch-plywood";function rt(n){const t=document.querySelector(n);if(!t)throw new Error(`Missing element: ${n}`);return t}function Sh(){return[{id:"birch-plywood",name:"Birch plywood",color:"#d9b77e"},{id:"oak",name:"Oak",color:"#c99756"},{id:"walnut",name:"Walnut",color:"#7a4f34"},{id:"pine",name:"Pine",color:"#e1c889"},{id:"white-melamine",name:"White melamine",color:"#f5f3ec"},{id:"black",name:"Black",color:"#252525"},{id:"white",name:"White",color:"#ffffff"},{id:"gray",name:"Gray",color:"#9aa0a6"},{id:"red",name:"Red",color:"#b8483b"},{id:"blue",name:"Blue",color:"#3f75a3"},{id:"green",name:"Green",color:"#538052"}]}function dx(n){const t=Sh();if(!(n!=null&&n.length))return t;const e=new Set,i=n.filter(s=>{const r=s.id&&s.name&&/^#[0-9a-f]{6}$/i.test(s.color)&&!e.has(s.id);return r&&e.add(s.id),r});return i.some(s=>s.id===Po)?i:[...t,...i]}function ux(n){if(!(n!=null&&n.length))return[];const t=new Set(u.boards.map(s=>s.id)),e=["left","right","top","bottom"],i=new Set;return n.filter(s=>{const r=`${s.boardId}:${s.edge}:${s.targetBoardId}:${s.targetEdge}`,a=t.has(s.boardId)&&t.has(s.targetBoardId)&&s.boardId!==s.targetBoardId&&e.includes(s.edge)&&e.includes(s.targetEdge)&&!i.has(r);return a&&i.add(r),a})}function fx(n){if(!(n!=null&&n.length))return[];const t=new Set(u.boards.map(i=>i.id)),e=new Set;return n.filter(i=>{const s=u.boards.find(l=>l.id===i.boardId),r=Number(i.offset),a=i.axis==="x"?s==null?void 0:s.w:s==null?void 0:s.h,o=`${i.boardId}:${i.axis}:${Math.round(r*1e3)}`,c=t.has(i.boardId)&&(i.axis==="x"||i.axis==="y")&&Number.isFinite(r)&&r>=0&&a!==void 0&&r<=a&&!e.has(o);return c&&e.add(o),c}).map(i=>({...i,offset:Math.round(i.offset)}))}function yh(){return{left:!1,right:!1,front:!1,back:!1}}function Er(n){return`P${n}`}function Lo(n){return`M${n}`}function px(n){return/^(Board \d+|Side|Shelf|Shelf \d+|Divider|Back|Front|Left side|Right side|Top|Bottom|Middle shelf|Left adjustable shelf|Right adjustable shelf|Center divider)( copy)?$/.test(n)}function Eh(n,t){const e=(n==null?void 0:n.trim())??"";return!e||px(e)?Er(t):e}function _i(){const n=new Set(u.selectedIds);return u.selectedId!==null&&n.add(u.selectedId),n}function Bn(n,t=n[0]??null){const e=new Set(u.boards.map(r=>r.id)),i=[...new Set(n)].filter(r=>e.has(r)),s=t!==null&&i.includes(t)?t:i[0]??null;u.selectedId=s,u.selectedIds=i,i.length&&(u.selectedMeasurementId=null)}function bh(){Bn([])}function Ms(n){u.selectedMeasurementId=n!==null&&u.measurements.some(t=>t.id===n)?n:null,u.selectedMeasurementId!==null&&(u.selectedId=null,u.selectedIds=[])}function mx(n){const t=_i();t.has(n)?t.delete(n):t.add(n),Bn([...t],t.has(n)?n:[...t][0]??null)}function gx(n,t){return((n==null?void 0:n.trim())??"")||Lo(t)}function _x(n){const t=n.materialId&&u.materials.some(e=>e.id===n.materialId)?n.materialId:Po;return{...n,name:Eh(n.name,n.id),materialId:t,thicknessOverride:pr(n.thicknessOverride),depthOverride:pr(n.depthOverride),laminate:n.laminate??yh(),ignoreInOrder:n.ignoreInOrder??!1}}function xx(n=u.boards){return Math.max(0,...n.map(t=>t.id))+1}function vx(n=u.measurements){return Math.max(0,...n.map(t=>t.id))+1}function Mx(n=u.anchors){return Math.max(0,...n.map(t=>t.id))+1}function Sx(n=u.layoutAnchors){return Math.max(0,...n.map(t=>t.id))+1}function Th(n){return["left","right","front","back"].filter(t=>n[t]).join(",")||"none"}function yx(n){const t=["left","right","front","back"].filter(e=>n[e]);return t.length?t.join(", "):"none"}function Ex(n){const t=[["left",n.h],["right",n.h],["front",n.w],["back",n.w]],e=Math.min(n.w,n.h),i=t.filter(([s])=>n.laminate[s]).map(([,s])=>s===e?"short":"long");return i.length?i.join(","):"none"}function ze(n){return n.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t)}function Do(n){var t;return((t=u.materials.find(e=>e.id===n))==null?void 0:t.name)??"Unknown material"}function fc(n){var t;return((t=u.materials.find(e=>e.id===n))==null?void 0:t.color)??u.materials[0].color}function bx(n){return u.materials.find(t=>t.id===n)??null}function Tx(n){const t=n.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"custom-material";let e=t,i=2;for(;u.materials.some(s=>s.id===e);)e=`${t}-${i}`,i+=1;return e}function Ax(n){return/^#[0-9a-f]{6}$/i.test(n)?n:"#c99756"}function mn(n,t){const e=Number(n);return Number.isFinite(e)&&e>0?Math.round(e):t}function pr(n){const t=Number(n);return Number.isFinite(t)&&t>0?Math.round(t):null}function wx(n,t){const e=Number(n);return Number.isFinite(e)?Math.round(e):Rc(t)}function so(n){return-n}function pc(n){return-n}function Ah(n,t=!0){t&&te();const e={id:u.nextId,name:Eh(n.name,u.nextId),x:n.x??120,y:n.y??120,w:n.w??400,h:n.h??250,kind:n.kind,autoThickness:n.autoThickness,materialId:n.materialId??Po,thicknessOverride:pr(n.thicknessOverride),depthOverride:pr(n.depthOverride),laminate:n.laminate??yh(),ignoreInOrder:n.ignoreInOrder??!1,group:0};u.nextId+=1,u.boards.push(e),Bn([e.id],e.id),kh(e.id),Dt()}function Pn(n){Ah(n,!1)}function Rx(n,t,e){n&&te(),u.boards=[],u.anchors=[],u.layoutAnchors=[],u.measurements=[],u.nextId=1,u.nextAnchorId=1,u.nextLayoutAnchorId=1,u.nextMeasurementId=1,u.selectedMeasurementId=null,u.pendingMeasurementAnchor=null,u.previewMeasurementAnchor=null,u.gridOriginX=t,u.gridOriginY=e}function as(n,t,e,i){const s=u.thickness,r=e-2*s;Pn({x:n,y:t,w:s,h:i,kind:"upright",autoThickness:"width"}),Pn({x:n+e-s,y:t,w:s,h:i,kind:"upright",autoThickness:"width"}),Pn({x:n+s,y:t,w:r,h:s,kind:"shelf",autoThickness:"height"}),Pn({x:n+s,y:t+i-s,w:r,h:s,kind:"shelf",autoThickness:"height"})}function ca(n,t,e,i){Pn({x:n,y:t,w:e,h:i,kind:"back",autoThickness:"none"})}function ha(n,t,e){const i=u.thickness;Pn({x:n+i,y:t,w:e-2*i,h:i,kind:"shelf",autoThickness:"height"})}function Cx(n,t,e){const i=u.thickness;Pn({x:n,y:t,w:i,h:e,kind:"upright",autoThickness:"width"})}function Ix(n,t=!0){const e=u.thickness,i=0;if(n==="complex"){Px(ix,mc(n),t);return}if(Rx(t,i,0),n==="cabinet"&&(as(i,-560,820,560),ha(i,-285,820)),n==="bookcase"&&(as(i,-1280,760,1280),[320,560,800,1040].forEach(o=>ha(i,-1280+o,760)),ca(i,-1280,760,1280)),n==="base-cabinet"){const o=i+410-e/2,c=-360;as(i,-720,820,720),Pn({x:i+e,y:c,w:o-i-e,h:e,kind:"shelf",autoThickness:"height"}),Pn({x:o+e,y:c,w:i+820-e-(o+e),h:e,kind:"shelf",autoThickness:"height"}),Cx(o,-720+e,720-2*e),ca(i,-720,820,720)}n==="wall-cabinet"&&(as(i,-640,720,640),ha(i,-325,720),ca(i,-640,720,640)),n==="simple-box"&&as(i,-360,520,360),Bn([1],1),u.lastSnap=mc(n),Bo()}function mc(n){return{cabinet:"Cabinet",bookcase:"Bookcase","base-cabinet":"Base cabinet","wall-cabinet":"Wall cabinet","simple-box":"Simple box",complex:"Complex"}[n]}function Px(n,t,e){try{const i=JSON.parse(n);if(!No(i))throw new Error("Unsupported template file");ys({...i,projectName:t},e),u.lastSnap=t,Bo()}catch{u.lastSnap="Could not create template",vn("Could not create template"),Ae()}}function wh(n=!0){n&&te(),u.projectName="",u.boards=[],u.anchors=[],u.layoutAnchors=[],u.measurements=[],u.selectedId=null,u.selectedIds=[],u.selectedMeasurementId=null,u.nextId=1,u.nextAnchorId=1,u.nextLayoutAnchorId=1,u.nextMeasurementId=1,u.dragging=null,u.resizing=null,u.measurementDragging=null,u.panning=null,u.selectionBox=null,u.snapGuides=[],u.tool="select",u.pendingMeasurementAnchor=null,u.previewMeasurementAnchor=null,u.gridOriginX=0,u.gridOriginY=0,s0(),u.lastSnap=n?"New project":"Ready",Dt()}function Lx(){if(!(!!u.projectName||u.boards.length>0||u.measurements.length>0)){u.lastSnap="Ready for a new project",Ae();return}window.confirm("Start a new project? This removes the current project name, pieces, measurements, and anchors.")&&(wh(),vn("New project ready"))}function Dt(){ld(u.boards),Ux(),Dx(),Jx(),$x(),Ae(),jx(),Kx(),Zx(),Rh(),Ox()}function Rh(){w.rightPanelTools.hidden=jn,w.woodOrderPanel.hidden=!jn,w.woodOrderToggleBtn.classList.toggle("active",jn),w.woodOrderToggleBtn.setAttribute("aria-pressed",String(jn)),w.woodOrderToggleBtn.title=jn?"Hide wood order list":"Show wood order list",w.woodOrderToggleBtn.setAttribute("aria-label",jn?"Hide wood order list":"Show wood order list")}function Dx(){w.templateChooser.hidden=u.boards.length>0||u.measurements.length>0}function Ux(){if($i==="3d"){Io.draw();return}xh.draw()}function Uo(){if($i==="3d"){Io.resize();return}xh.resize()}function Nx(n){$i!==n&&($i=n,w.canvasWrap.dataset.view=n,w.view3dBtn.classList.toggle("active",n==="3d"),w.view3dBtn.setAttribute("aria-pressed",String(n==="3d")),u.lastSnap=n==="3d"?"3D view":"Sketch view",window.requestAnimationFrame(()=>{Uo(),Ae()}))}function Fx(n){return JSON.parse(JSON.stringify(n))}function te(){Vi.push(Ss()),Vi.length>rx&&Vi.shift(),yr.length=0}function Ch(){const n=Vi.pop();if(!n){u.lastSnap="Nothing to undo",Ae();return}yr.push(Ss()),ys(n,!1),u.lastSnap="Undone",Ae()}function ro(){const n=yr.pop();if(!n){u.lastSnap="Nothing to redo",Ae();return}Vi.push(Ss()),ys(n,!1),u.lastSnap="Redone",Ae()}function Ss(){return Fx({schemaVersion:1,version:dc,appVersion:dc,projectName:u.projectName,boards:u.boards,anchors:u.anchors,layoutAnchors:u.layoutAnchors,measurements:u.measurements,materials:u.materials,selectedId:u.selectedId,selectedIds:u.selectedIds,selectedMeasurementId:u.selectedMeasurementId,nextId:u.nextId,nextAnchorId:u.nextAnchorId,nextLayoutAnchorId:u.nextLayoutAnchorId,nextMeasurementId:u.nextMeasurementId,thickness:u.thickness,depth:u.depth,grid:u.grid,gridOriginX:u.gridOriginX,gridOriginY:u.gridOriginY,snap:u.snap,showDimensions:u.showDimensions,showFrontPanels:u.showFrontPanels,scale:u.scale,panX:u.panX,panY:u.panY})}function ys(n,t=!0){var i,s,r;t&&te(),u.projectName=Ih(n.projectName),u.materials=dx(n.materials),u.boards=(n.boards??[]).map(_x),u.anchors=ux(n.anchors),u.layoutAnchors=fx(n.layoutAnchors),u.measurements=(n.measurements??[]).map((a,o)=>({...a,name:gx(a.name,a.id),displayOffset:wx(a.displayOffset,o)}));const e=(i=n.selectedIds)!=null&&i.length?n.selectedIds:n.selectedId?[n.selectedId]:[];u.selectedMeasurementId=null,Bn(e,n.selectedId),e.length||Ms(n.selectedMeasurementId??null),u.nextId=n.nextId??xx(u.boards),u.nextAnchorId=n.nextAnchorId??Mx(u.anchors),u.nextLayoutAnchorId=n.nextLayoutAnchorId??Sx(u.layoutAnchors),u.nextMeasurementId=n.nextMeasurementId??vx(u.measurements),u.thickness=mn(n.thickness,u.thickness),u.depth=mn(n.depth,u.depth),u.grid=n.grid??u.grid,u.gridOriginX=n.gridOriginX??((s=Nn(u.boards))==null?void 0:s.left)??u.gridOriginX,u.gridOriginY=n.gridOriginY??((r=Nn(u.boards))==null?void 0:r.top)??u.gridOriginY,u.snap=n.snap??u.snap,u.showDimensions=n.showDimensions??u.showDimensions,u.showFrontPanels=n.showFrontPanels??u.showFrontPanels,u.scale=n.scale??u.scale,u.panX=n.panX??u.panX,u.panY=n.panY??u.panY,u.dragging=null,u.resizing=null,u.measurementDragging=null,u.panning=null,u.selectionBox=null,u.snapGuides=[],u.tool="select",u.pendingMeasurementAnchor=null,u.previewMeasurementAnchor=null,Uh(),Dt()}function No(n){return(n.schemaVersion??(n.version===1?1:void 0))===1&&Array.isArray(n.boards)}function Ox(){try{localStorage.setItem(vh,JSON.stringify(Ss()))}catch{}}function Bx(){try{const n=localStorage.getItem(vh);if(!n)return!1;const t=JSON.parse(n);if(!No(t))throw new Error("Unsupported project file");return ys(t,!1),u.lastSnap="Restored autosave",Ae(),!0}catch{return u.lastSnap="Could not restore autosave",Ae(),!1}}function kx(){Bx()||wh(!1)}function zx(){const n=JSON.stringify(Ss(),null,2);Dh(n,"application/json",`${Lh()}-${Ph()}.mebel`),u.lastSnap="Project exported",vn("Saved .mebel project"),Ae()}function Ih(n){return typeof n=="string"?n.trim().slice(0,80):""}function Ph(n=new Date){return n.toISOString().replace(/\.\d{3}Z$/,"Z").replace(/:/g,"-")}function Lh(){return u.projectName.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)||"mebel-maker"}function Dh(n,t,e){const i=new Blob([n],{type:t}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=e,document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(s)}function Gx(){w.projectFileInput.value="",w.projectFileInput.click(),vn("Choose a .mebel project file")}function Hx(n){const t=new FileReader;t.addEventListener("load",()=>{try{const e=JSON.parse(String(t.result??""));if(!No(e))throw new Error("Unsupported project file");ys(e),u.lastSnap="Project imported",vn("Loaded project"),Ae()}catch{u.lastSnap="Could not import project",vn("Could not load project"),Ae()}}),t.addEventListener("error",()=>{u.lastSnap="Could not read file",vn("Could not read file"),Ae()}),t.readAsText(n)}function vn(n){window.clearTimeout(uc),w.notificationToast.textContent=n,w.notificationToast.hidden=!1,uc=window.setTimeout(()=>{w.notificationToast.hidden=!0},2400)}function Uh(){w.projectNameInput.value=u.projectName,w.thicknessInput.value=String(u.thickness),w.layoutAnchorThicknessInput.value=String(u.thickness),w.depthInput.value=String(u.depth),w.gridInput.value=String(u.grid),w.snapToggle.checked=u.snap,w.dimToggle.checked=u.showDimensions,w.frontLayerToggle.checked=u.showFrontPanels}function di(n,t){if(!n.length)return null;const e=t(n[0]);return n.every(i=>t(i)===e)?e:null}function us(n,t){return u.layoutAnchors.filter(e=>e.boardId===n&&(!t||e.axis===t)).sort((e,i)=>e.offset-i.offset)}function Vx(n){return n.autoThickness==="width"?"y":"x"}function Nh(){const n=ko();w.layoutAnchorStartLabel.textContent=n==="x"?"Left edge":"Top edge",w.layoutAnchorEndLabel.textContent=n==="x"?"Right edge":"Bottom edge"}function ao(){const n=w.layoutAnchorBalanceInput.disabled||!w.layoutAnchorBalanceInput.checked;w.layoutAnchorStartInput.disabled=n,w.layoutAnchorEndInput.disabled=n,w.layoutAnchorThicknessInput.disabled=n}function ki(n,t,e="Mixed"){n.value=t??"",n.placeholder=t===null?e:""}function os(n,t){n.checked=t??!1,n.indeterminate=t===null}function Fh(n,t){n.addEventListener("change",t,bt),n.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),n.blur())},bt)}function Wx(n){w.duplicateBtn.disabled=n,w.rotateBtn.disabled=n,w.measureWidthBtn.disabled=n,w.measureHeightBtn.disabled=n}function Ae(){var c;const n=Je(u),t=Qe(u),e=Mc(u),i=Nn(t),s=t.length>0,r=t.length>1;if(w.emptySelection.hidden=s,w.inspector.hidden=!s,w.selectionStatus.textContent=r&&i?`${t.length} boards selected · ${Ft(i.w)} × ${Ft(i.h)}`:n?ad(n):e?`Measure ${e.name}`:"No board selected",w.snapStatus.textContent=u.lastSnap,Xx(),w.measureModeBtn.classList.toggle("active",u.tool==="measure"),w.undoBtn.disabled=!Vi.length,w.redoBtn.disabled=!yr.length,Wx(!s),w.deleteBtn.disabled=!s&&!e,w.deleteBtn.title=e?"Delete selected measurement":"Delete selected boards",w.deleteBtn.setAttribute("aria-label",e?"Delete selected measurement":"Delete selected boards"),Pt.classList.toggle("measure-mode",u.tool==="measure"),u.tool==="measure"&&(Pt.style.cursor=""),w.wInput.disabled=!1,w.hInput.disabled=!1,w.nameInput.disabled=!1,w.layoutAnchorAxisInput.disabled=!n||r,w.layoutAnchorCountInput.disabled=!n||r,w.layoutAnchorBalanceInput.disabled=!n||r,w.layoutAnchorApplyBtn.disabled=!n||r,w.layoutAnchorClearBtn.disabled=!n||r||us(n.id).length===0,(!n||r)&&(w.layoutAnchorSummary.textContent="No layout anchors"),w.materialLabelSwatch.style.background=n&&!r?fc(n.materialId):"transparent",!s){ao();return}if(r)w.nameInput.disabled=!0,ki(w.nameInput,null,`${t.length} boards`),ki(w.xInput,i?String(Math.round(i.left)):null),ki(w.yInput,i?String(Math.round(so(i.top))):null),ki(w.wInput,null),ki(w.hInput,null),w.wInput.disabled=!0,w.hInput.disabled=!0;else if(n){const l=((c=us(n.id).at(0))==null?void 0:c.axis)??Vx(n),d=us(n.id,l);w.nameInput.value=n.name,w.nameInput.placeholder="",w.xInput.value=String(Math.round(n.x)),w.yInput.value=String(Math.round(so(n.y))),w.wInput.value=String(Math.round(n.w)),w.hInput.value=String(Math.round(n.h)),w.wInput.placeholder=n.autoThickness==="width"&&n.thicknessOverride===null?"Global":"",w.hInput.placeholder=n.autoThickness==="height"&&n.thicknessOverride===null?"Global":"",n.autoThickness==="width"&&n.thicknessOverride===null&&(w.wInput.value=""),n.autoThickness==="height"&&n.thicknessOverride===null&&(w.hInput.value=""),w.depthOverrideInput.value=n.depthOverride===null?"":String(n.depthOverride),w.materialInput.value=n.materialId,w.layoutAnchorAxisInput.value=l,Nh(),d.length&&(w.layoutAnchorCountInput.value=String(d.length)),w.layoutAnchorThicknessInput.value||(w.layoutAnchorThicknessInput.value=String(u.thickness)),w.layoutAnchorSummary.textContent=d.length?d.map(f=>Ft(f.offset)).join(", "):"No layout anchors",w.wInput.disabled=!1,w.hInput.disabled=!1}const a=di(t,l=>l.materialId),o=di(t,l=>l.depthOverride===null?"":String(l.depthOverride));w.materialInput.value=a??"",Oo(),ki(w.depthOverrideInput,o,"Mixed"),w.materialLabelSwatch.style.background=a?fc(a):"transparent",os(w.laminateLeftInput,di(t,l=>String(l.laminate.left))===null?null:t[0].laminate.left),os(w.laminateRightInput,di(t,l=>String(l.laminate.right))===null?null:t[0].laminate.right),os(w.laminateFrontInput,di(t,l=>String(l.laminate.front))===null?null:t[0].laminate.front),os(w.laminateBackInput,di(t,l=>String(l.laminate.back))===null?null:t[0].laminate.back),os(w.ignoreOrderInput,di(t,l=>String(l.ignoreInOrder))===null?null:t[0].ignoreInOrder),ao()}function Xx(){const n=Yx(118/u.scale),t=Math.max(28,Math.min(90,n*u.scale));w.overlayScaleBar.style.setProperty("--scale-width",`${t}px`),w.overlayScaleLabel.textContent=Ft(n),w.overlayZoomLabel.textContent=`Zoom ${Math.round(u.scale*100)}%`}function Yx(n){const e=10**Math.floor(Math.log10(Math.max(1,n))),i=n/e;return i>=5?5*e:i>=2?2*e:e}function Fo(){w.materialSelectList.hidden=!0,w.materialSelectButton.setAttribute("aria-expanded","false")}function Oo(){const n=w.materialInput.value?bx(w.materialInput.value):null;w.materialSelectText.textContent=n?`${n.name} (${n.color.toUpperCase()})`:"Mixed materials",w.materialSelectSwatch.style.background=n?n.color:"linear-gradient(135deg, #d9b77e 0 50%, #7a4f34 50% 100%)",w.materialSelectSwatch.classList.toggle("mixed",!n),w.materialSelectList.querySelectorAll("[data-material-id]").forEach(t=>{const e=t.dataset.materialId===w.materialInput.value;t.classList.toggle("selected",e),t.setAttribute("aria-selected",String(e))})}function qx(){const n=w.materialSelectList.hidden;w.materialSelectList.hidden=!n,w.materialSelectButton.setAttribute("aria-expanded",String(n)),n&&Oo()}function Oh(n){jn=n,u.lastSnap=n?"Wood order":"Properties",Rh(),Ae()}function Bh(n){const t=u.boards.find(e=>e.id===n);t&&(Bn([t.id],t.id),u.tool="select",u.lastSnap=`${t.name} selected`,Dt())}function $x(){w.materialInput.innerHTML=`
    <option value="">Mixed materials</option>
  `+u.materials.map(n=>`
    <option value="${ze(n.id)}">${ze(n.name)} (${ze(n.color.toUpperCase())})</option>
  `).join(""),w.materialSelectList.innerHTML=u.materials.map(n=>`
    <button
      class="material-select-option"
      type="button"
      role="option"
      data-material-id="${ze(n.id)}"
      title="${ze(n.name)} ${ze(n.color.toUpperCase())}"
      aria-selected="false"
    >
      <span class="material-select-swatch" style="background: ${n.color}"></span>
      <span class="material-select-option-copy">
        <strong>${ze(n.name)}</strong>
        <small>${ze(n.color.toUpperCase())}</small>
      </span>
    </button>
  `).join(""),w.materialList.innerHTML=u.materials.map(n=>`
    <div class="material-card">
      <span class="material-swatch" style="background: ${n.color}"></span>
      <strong>${ze(n.name)}</strong>
    </div>
  `).join(""),Oo()}function jx(){const n=Je(u),t=Qe(u),e=t.length>1?t:n?yc(u,n.group):u.boards,i=Nn(e),s=Ec(e,u.thickness),r=[];t.length>1&&i?r.push(`
      <div class="metric-card">
        <strong>${t.length} selected boards</strong>
        <span>Selection: ${Ft(i.w)} × ${Ft(i.h)}</span>
        <span>Position: X ${Ft(i.left)}, Y ${Ft(i.top)}</span>
      </div>
    `):n&&r.push(`
      <div class="metric-card">
        <strong>${n.name}</strong>
        <span>Board: ${Ft(n.w)} × ${Ft(n.h)} × ${Ft(Qn(n,u.depth))}</span>
        <span>Position: X ${Ft(n.x)}, Y ${Ft(so(n.y))}</span>
      </div>
    `),i&&r.push(`
      <div class="metric-card">
        <strong>${t.length>1?"Selected boards":n?`Connected group ${n.group}`:"Whole sketch"}</strong>
        <span>Outer: ${Ft(i.w)} × ${Ft(i.h)}</span>
        <span>Inner: ${s!=null&&s.hasFrame?`${Ft(s.innerW)} × ${Ft(s.innerH)}`:"needs opposing frame boards"}</span>
        <span>Thickness model: ${Ft(u.thickness)}</span>
        <span>Default depth: ${Ft(u.depth)}</span>
      </div>
    `),w.measureList.innerHTML=r.join("")||'<div class="empty-state">Add boards to see measurements.</div>'}function Kx(){const n=Cc(u.boards);if(!n.length){w.warningList.innerHTML='<div class="empty-state">No overlaps.</div>';return}w.warningList.innerHTML=n.map(t=>{const[e,i]=t.boardIds.map(s=>{var r;return((r=u.boards.find(a=>a.id===s))==null?void 0:r.name)??Er(s)});return`
      <div class="warning-card">
        <strong>Overlap</strong>
        <span>${e} and ${i}</span>
        <span>${Ft(t.w)} × ${Ft(t.h)}</span>
      </div>
    `}).join("")}function Zx(){w.cutList.innerHTML=gc(u.boards.filter(n=>!n.ignoreInOrder),"No boards in the wood order."),w.ignoredCutList.innerHTML=gc(u.boards.filter(n=>n.ignoreInOrder),"No ignored boards.")}function gc(n,t){const e=new Map;return n.forEach(i=>{const s=`${Math.round(i.w)}×${Math.round(i.h)}×${Qn(i,u.depth)}×${u.thickness}×${i.materialId}×${Th(i.laminate)}`;e.set(s,[...e.get(s)??[],i])}),[...e.entries()].map(([i,s])=>{const[r,a,o,,c]=i.split("×"),l=Ex(s[0]);return`
      <div class="cut-card">
        <strong><span class="count">${s.length}×</span> ${r} × ${a} × ${o} mm</strong>
        <span>Material: ${ze(Do(c))}</span>
        <span>Laminate: ${l}</span>
        <div class="cut-card-pieces">${s.map(d=>`
          <button class="cut-piece-button" type="button" data-board-id="${d.id}" title="Select ${ze(d.name)}">
            ${ze(d.name)}
          </button>
        `).join("")}</div>
      </div>
    `}).join("")||`<div class="empty-state">${t}</div>`}function Jx(){const n=Je(u);if(!n){w.anchorOverlay.innerHTML="";return}w.anchorOverlay.innerHTML=u.anchors.filter(t=>t.boardId===n.id).map(t=>{const e=Qx(t);if(!e)return"";const i=ge(u,e.x,e.y);return`
        <button class="anchor-chip" data-remove-anchor="${t.id}" type="button" style="left: ${i.x}px; top: ${i.y-8}px" title="Remove anchor to ${ze(xc(t))}" aria-label="Remove anchor to ${ze(xc(t))}">
          ${_c()}
          <span class="visually-hidden">Remove anchor</span>
        </button>
      `}).join("")+u.snapGuides.flatMap(t=>t.linkPoint?[t.linkPoint]:[]).map(t=>{const e=ge(u,t.x,t.y);return`
        <span class="anchor-chip anchor-chip-preview" style="left: ${e.x}px; top: ${e.y-8}px" title="Will link when released" aria-hidden="true">
          ${_c()}
        </span>
      `}).join("")}function _c(){return`
    <svg class="anchor-chip-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 7.5 L7 6 C5.5 4.5 3.2 4.5 1.7 6 C.2 7.5 .2 9.8 1.7 11.3 L4.7 14.3 C5.8 15.4 7.4 15.7 8.8 15.1"></path>
      <path d="M15.5 16.5 L17 18 C18.5 19.5 20.8 19.5 22.3 18 C23.8 16.5 23.8 14.2 22.3 12.7 L19.3 9.7 C18.2 8.6 16.6 8.3 15.2 8.9"></path>
      <path d="M9 15 L15 9"></path>
      <path d="M5 21 L19 3"></path>
    </svg>
  `}function xc(n){const t=u.boards.find(e=>e.id===n.targetBoardId);return`${(t==null?void 0:t.name)??Er(n.targetBoardId)} ${n.targetEdge}`}function Qx(n){const t=u.boards.find(a=>a.id===n.boardId),e=u.boards.find(a=>a.id===n.targetBoardId);if(!t||!e)return null;const i=Gh(t,n.edge);if(n.edge==="left"||n.edge==="right"){const a=Math.max(t.y,e.y),o=Math.min(t.y+t.h,e.y+e.h);return{x:i,y:a<=o?(a+o)/2:t.y+t.h/2}}const s=Math.max(t.x,e.x),r=Math.min(t.x+t.w,e.x+e.w);return{x:s<=r?(s+r)/2:t.x+t.w/2,y:i}}function kh(n){const t=u.boards.find(e=>e.id===n);!t||t.kind==="back"||t.kind==="front"||(u.anchors=u.anchors.filter(e=>e.boardId!==n),u.boards.forEach(e=>{e.id===t.id||e.kind==="back"||e.kind==="front"||n0(t,e).forEach(([i,s])=>t0(t.id,i,e.id,s))}))}function t0(n,t,e,i){const s=u.boards.find(a=>a.id===n);!s||!e0(s,t)||u.anchors.some(a=>a.boardId===n&&a.edge===t&&a.targetBoardId===e&&a.targetEdge===i)||(u.anchors.push({id:u.nextAnchorId,boardId:n,edge:t,targetBoardId:e,targetEdge:i}),u.nextAnchorId+=1)}function e0(n,t){return n.kind==="front"?!1:n.autoThickness==="width"?t==="top"||t==="bottom":n.autoThickness==="height"?t==="left"||t==="right":!0}function n0(n,t){const i=[];return Math.abs(n.x-(t.x+t.w))<=.5&&Qs(n.y,n.y+n.h,t.y,t.y+t.h)&&i.push(["left","right"]),Math.abs(n.x+n.w-t.x)<=.5&&Qs(n.y,n.y+n.h,t.y,t.y+t.h)&&i.push(["right","left"]),Math.abs(n.y-(t.y+t.h))<=.5&&Qs(n.x,n.x+n.w,t.x,t.x+t.w)&&i.push(["top","bottom"]),Math.abs(n.y+n.h-t.y)<=.5&&Qs(n.x,n.x+n.w,t.x,t.x+t.w)&&i.push(["bottom","top"]),i}function Qs(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function xi(n,t=new Set){if(t.has(n))return;t.add(n),[...new Set(u.anchors.filter(i=>i.targetBoardId===n).map(i=>i.boardId))].forEach(i=>{zh(i),xi(i,t)})}function zh(n){const t=u.boards.find(i=>i.id===n);if(!t)return;const e=ar(t);u.anchors.filter(i=>i.boardId===n).forEach(i=>{const s=u.boards.find(r=>r.id===i.targetBoardId);s&&i0(e,i.edge,Gh(s,i.targetEdge))}),oo(t,e)}function Gh(n,t){return t==="left"?n.x:t==="right"?n.x+n.w:t==="top"?n.y:n.y+n.h}function i0(n,t,e){if(t==="left"){const i=n.x+n.w;n.x=e,n.w=Math.max(1,i-e)}if(t==="right"&&(n.w=Math.max(1,e-n.x)),t==="top"){const i=n.y+n.h;n.y=e,n.h=Math.max(1,i-e)}t==="bottom"&&(n.h=Math.max(1,e-n.y))}function Bo(){const n=Nn(u.boards),t=Pt.getBoundingClientRect();if(!n||t.width<1||t.height<1)return;const e=70,i=Math.max(1,t.width-e-zi),s=Math.max(1,t.height-e-zi);u.scale=Math.min(i/n.w,s/n.h),u.scale=Math.max(ax,Math.min(lx,u.scale)),u.panX=zi-n.left*u.scale,u.panY=t.height-zi-n.bottom*u.scale,Dt()}function s0(){const n=Pt.getBoundingClientRect();u.scale=.62,u.panX=zi,u.panY=n.height>1?n.height-zi:420}function r0(n){if(n===u.thickness)return;te();const t=u.thickness,e=u.boards.some(i=>i.autoThickness!=="none")?window.confirm(`Update all existing auto-thickness pieces to ${Ft(n)} thickness? Choose Cancel to keep their current thicknesses.`):!1;u.thickness=n,mn(w.layoutAnchorThicknessInput.value,t)===t&&(w.layoutAnchorThicknessInput.value=String(n)),u.boards.forEach(i=>{const s=l0(i,t),r=e?n:s,a=r-s;i.autoThickness!=="none"&&(i.thicknessOverride=e?null:s),i.autoThickness==="width"&&(i.x>160&&(i.x-=a),i.w=r),i.autoThickness==="height"&&(i.x+=a,i.w=Math.max(r,i.w-a*2),i.y>120&&(i.y-=a),i.h=r)}),u.boards.forEach(i=>zh(i.id)),u.lastSnap=e?`All auto-thickness pieces ${Ft(u.thickness)}`:`Default thickness ${Ft(u.thickness)}`,Dt()}function a0(n){if(n===u.depth)return;te();const t=u.depth,e=u.boards.length>0?window.confirm(`Update all existing pieces to ${Ft(n)} depth? Choose Cancel to keep their current depths.`):!1;u.depth=n,u.boards.length>0&&u.boards.forEach(i=>{i.depthOverride=e?null:o0(i,t)}),u.lastSnap=e?`All pieces depth ${Ft(u.depth)}`:`Default depth ${Ft(u.depth)}`,Dt()}function o0(n,t){return n.depthOverride??t}function l0(n,t){return n.thicknessOverride??t}function c0(){const n=Hh();Dh(n,"text/csv;charset=utf-8",`${Lh()}-pieces-${Ph()}.csv`),u.lastSnap="Piece list CSV exported",vn("Saved piece list CSV"),Ae()}async function h0(){try{await d0(Hh()),u.lastSnap="Piece list CSV copied",vn("Copied piece list CSV")}catch{u.lastSnap="Could not copy CSV",vn("Could not copy CSV")}Ae()}function Hh(){const n=[["quantity","width_mm","height_mm","depth_mm","thickness_mm","material","laminate_edges","pieces"]],t=new Map;return u.boards.filter(e=>!e.ignoreInOrder).forEach(e=>{const i=`${Math.round(e.w)}×${Math.round(e.h)}×${Qn(e,u.depth)}×${u.thickness}×${e.materialId}×${Th(e.laminate)}`;t.set(i,[...t.get(i)??[],e])}),t.forEach((e,i)=>{const[s,r,a,o,c]=i.split("×");n.push([String(e.length),s,r,a,o,Do(c),yx(e[0].laminate),e.map(l=>l.name).join("; ")])}),n.map(e=>e.map(u0).join(",")).join(`
`)}async function d0(n){var a;if((a=window.navigator.clipboard)!=null&&a.writeText)try{await window.navigator.clipboard.writeText(n);return}catch{}let t=!1;const e=o=>{var c;(c=o.clipboardData)==null||c.setData("text/plain",n),o.preventDefault(),t=!0};document.addEventListener("copy",e);const i=document.execCommand("copy");if(document.removeEventListener("copy",e),i&&t)return;const s=document.createElement("textarea");s.value=n,s.style.left="-9999px",s.style.position="fixed",document.body.append(s),s.focus(),s.select();const r=document.execCommand("copy");if(s.remove(),!r)throw new Error("Clipboard copy failed")}function u0(n){return/[",\n]/.test(n)?`"${n.replace(/"/g,'""')}"`:n}function f0(n){const t=Je(u),e=Qe(u);if(!t||!e.length)return;const i=n==null?void 0:n.target;if(i===w.wInput&&t.autoThickness==="width"&&w.wInput.value===""){te(),t.thicknessOverride=null,t.w=u.thickness,u.lastSnap=`Width uses global ${Ft(u.thickness)}`,xi(t.id),Dt();return}if(i===w.hInput&&t.autoThickness==="height"&&w.hInput.value===""){te(),t.thicknessOverride=null,t.h=u.thickness,u.lastSnap=`Height uses global ${Ft(u.thickness)}`,xi(t.id),Dt();return}if(i===w.depthOverrideInput&&w.depthOverrideInput.value===""){te(),e.forEach(s=>{s.depthOverride=null}),u.lastSnap=`Depth uses global ${Ft(u.depth)}`,Dt();return}if(!(i instanceof HTMLInputElement&&i.type==="number"&&i.value==="")){if(te(),e.length>1){const s=Nn(e);if(s&&(i===w.xInput||i===w.yInput)){const r=i===w.xInput?Number(w.xInput.value):s.left,a=i===w.yInput?pc(Number(w.yInput.value)):s.top;y0(e,(Number.isFinite(r)?r:s.left)-s.left,(Number.isFinite(a)?a:s.top)-s.top),u.lastSnap="Selection moved"}i===w.depthOverrideInput&&(e.forEach(r=>{r.depthOverride=mn(w.depthOverrideInput.value,Qn(r,u.depth))}),u.lastSnap=`Depth set on ${e.length} boards`)}else t.name=w.nameInput.value.trim()||t.name,t.x=Number(w.xInput.value)||0,t.y=pc(Number(w.yInput.value)||0),t.w=t.autoThickness==="width"&&w.wInput.value===""?u.thickness:Math.max(1,Number(w.wInput.value)||1),t.h=t.autoThickness==="height"&&w.hInput.value===""?u.thickness:Math.max(1,Number(w.hInput.value)||1),t.autoThickness==="width"&&(t.thicknessOverride=w.wInput.value===""?null:mn(w.wInput.value,el(t,u.thickness))),t.autoThickness==="height"&&(t.thicknessOverride=w.hInput.value===""?null:mn(w.hInput.value,el(t,u.thickness))),t.depthOverride=w.depthOverrideInput.value===""?null:mn(w.depthOverrideInput.value,Qn(t,u.depth)),xi(t.id);Dt()}}function Vh(){const n=Qe(u);!n.length||!w.materialInput.value||n.every(t=>t.materialId===w.materialInput.value)||(te(),n.forEach(t=>{t.materialId=w.materialInput.value}),u.lastSnap=n.length>1?`Material set on ${n.length} boards`:`Material: ${Do(n[0].materialId)}`,Dt())}function p0(){const n=w.materialNameInput.value.trim();if(!n){u.lastSnap="Name the material first",Ae();return}te();const t={id:Tx(n),name:n,color:Ax(w.materialColorInput.value)};u.materials.push(t),w.materialNameInput.value="",w.materialColorInput.value="#c99756",u.lastSnap=`Material added: ${t.name}`,Dt()}function m0(){const n=Qe(u);n.length&&(te(),n.forEach(t=>{t.laminate={left:w.laminateLeftInput.checked,right:w.laminateRightInput.checked,front:w.laminateFrontInput.checked,back:w.laminateBackInput.checked}}),u.lastSnap=n.length>1?`Laminate set on ${n.length} boards`:"Laminate updated",Dt())}function g0(){const n=Qe(u);n.length&&(te(),n.forEach(t=>{t.ignoreInOrder=w.ignoreOrderInput.checked}),u.lastSnap=w.ignoreOrderInput.checked?"Removed from wood order":"Added to wood order",Dt())}function ko(){return w.layoutAnchorAxisInput.value==="y"?"y":"x"}function _0(){const n=Je(u);if(!n)return;Nh();const t=ko(),e=us(n.id,t);w.layoutAnchorCountInput.value=e.length?String(e.length):w.layoutAnchorCountInput.value,w.layoutAnchorSummary.textContent=e.length?e.map(i=>Ft(i.offset)).join(", "):"No layout anchors"}function x0(n,t,e){const i=t==="x"?n.w:n.h;if(!w.layoutAnchorBalanceInput.checked)return Array.from({length:e},(l,d)=>Math.round(i*(d+1)/(e+1)));const s=Math.max(1,mn(w.layoutAnchorThicknessInput.value,u.thickness)),r=w.layoutAnchorStartInput.value==="inside"?s:0,a=w.layoutAnchorEndInput.value==="inside"?s:0,c=(i-r-a-e*s)/(e+1);return c<0?null:Array.from({length:e},(l,d)=>Math.round(r+c*(d+1)+s*d+s/2))}function v0(){const n=Je(u);if(!n||Qe(u).length>1)return;const t=ko(),e=Math.max(1,Math.min(20,mn(w.layoutAnchorCountInput.value,4))),i=x0(n,t,e);if(!i){u.lastSnap="Not enough span for balanced anchors",Ae();return}te(),u.layoutAnchors=u.layoutAnchors.filter(s=>!(s.boardId===n.id&&s.axis===t)),i.forEach(s=>{u.layoutAnchors.push({id:u.nextLayoutAnchorId,boardId:n.id,axis:t,offset:s}),u.nextLayoutAnchorId+=1}),u.lastSnap=w.layoutAnchorBalanceInput.checked?`${e} balanced anchors added`:`${e} layout anchors added`,Dt()}function M0(){const n=Je(u);!n||!us(n.id).length||(te(),u.layoutAnchors=u.layoutAnchors.filter(t=>t.boardId!==n.id),u.lastSnap="Layout anchors cleared",Dt())}function Wh(n,t){const e=hx[n];if(!e)return;const i=t??S0();u.boards.length||(u.gridOriginX=i.x,u.gridOriginY=i.y),Ah({x:vi(u,i.x-e.w()/2,"x"),y:vi(u,i.y-e.h()/2,"y"),w:e.w(),h:e.h(),kind:e.kind,autoThickness:e.autoThickness})}function S0(){const n=Pt.getBoundingClientRect();return ti(u,n.width/2,n.height/2)}function oo(n,t){n.x=Math.round(t.x),n.y=Math.round(t.y),n.w=Math.round(t.w),n.h=Math.round(t.h)}function y0(n,t,e){n.forEach(i=>{i.x=Math.round(i.x+t),i.y=Math.round(i.y+e)}),n.forEach(i=>xi(i.id))}function lo(n,t,e){te();const i=u.nextMeasurementId;u.measurements.push({id:i,name:Lo(i),a:n,b:t,axis:e,displayOffset:fo({},u.measurements.length)}),u.nextMeasurementId+=1,Ms(i),u.tool="select",u.pendingMeasurementAnchor=null,u.previewMeasurementAnchor=null,u.lastSnap="Measurement added",Dt()}function Xh(n){const t=Je(u);if(t){if(n==="horizontal"){lo({kind:"board-edge",boardId:t.id,edge:"left",offset:t.h/2},{kind:"board-edge",boardId:t.id,edge:"right",offset:t.h/2},"horizontal");return}lo({kind:"board-edge",boardId:t.id,edge:"top",offset:t.w/2},{kind:"board-edge",boardId:t.id,edge:"bottom",offset:t.w/2},"vertical")}}function E0(n){const t=Ac(u,n);if(!u.pendingMeasurementAnchor){u.pendingMeasurementAnchor=t,u.previewMeasurementAnchor=null,u.lastSnap=t.kind==="grid"?"Grid anchor set, pick second anchor":"Edge anchor set, pick second anchor",Dt();return}const e=gi(u,u.pendingMeasurementAnchor),i=gi(u,t);!e||!i||lo(u.pendingMeasurementAnchor,t,wc(e,i))}function b0(){const n=_i();n.size&&(te(),u.boards=u.boards.filter(t=>!n.has(t.id)),u.anchors=u.anchors.filter(t=>!n.has(t.boardId)&&!n.has(t.targetBoardId)),u.layoutAnchors=u.layoutAnchors.filter(t=>!n.has(t.boardId)),u.measurements=u.measurements.filter(t=>![t.a,t.b].some(e=>e.kind==="board-edge"&&n.has(e.boardId))),u.selectedMeasurementId&&!u.measurements.some(t=>t.id===u.selectedMeasurementId)&&(u.selectedMeasurementId=null),bh(),u.lastSnap=n.size>1?`${n.size} boards deleted`:"Board deleted",Dt())}function T0(n){u.measurements.some(e=>e.id===n)&&(te(),u.measurements=u.measurements.filter(e=>e.id!==n),u.selectedMeasurementId===n&&(u.selectedMeasurementId=null),gs===n&&_s(),u.lastSnap="Measurement deleted",Dt())}function _s(){gs=null,w.measureRenameForm.hidden=!0}function A0(n){const t=w.measureRenameForm.parentElement;if(!t)return;const e=t.getBoundingClientRect(),i=240,s=108,r=Math.max(8,Math.min(n.clientX-e.left-i/2,e.width-i-8)),a=Math.max(8,Math.min(n.clientY-e.top-s-10,e.height-s-8));w.measureRenameForm.style.left=`${r}px`,w.measureRenameForm.style.top=`${a}px`}function w0(n,t){const e=u.measurements.find(i=>i.id===n);e&&(gs=e.id,Ms(e.id),A0(t),w.measureRenameInput.value=e.name,w.measureRenameForm.hidden=!1,u.lastSnap="Rename measurement",Dt(),window.requestAnimationFrame(()=>{w.measureRenameInput.focus(),w.measureRenameInput.select()}))}function Yh(){if(gs===null)return;const n=u.measurements.find(i=>i.id===gs);if(!n){_s();return}const t=w.measureRenameInput.value.trim(),e=t||Lo(n.id);_s(),n.name!==e&&(te(),n.name=e,Ms(n.id),u.lastSnap=t?"Measurement named":"Measurement reset",Dt())}function qh(){const n=Mc(u);if(n){T0(n.id);return}b0()}function $h(){var s;const n=Qe(u);if(!n.length)return;te();const t=new Set(n.map(r=>r.id)),e=new Map,i=n.map(r=>{const a=u.nextId;return u.nextId+=1,e.set(r.id,a),{...r,id:a,name:Er(a),x:r.x+35,y:r.y+35,group:0}});u.boards.push(...i),u.anchors.filter(r=>t.has(r.boardId)&&t.has(r.targetBoardId)).forEach(r=>{const a=e.get(r.boardId),o=e.get(r.targetBoardId);!a||!o||(u.anchors.push({...r,id:u.nextAnchorId,boardId:a,targetBoardId:o}),u.nextAnchorId+=1)}),u.layoutAnchors.filter(r=>t.has(r.boardId)).forEach(r=>{const a=e.get(r.boardId);a&&(u.layoutAnchors.push({...r,id:u.nextLayoutAnchorId,boardId:a}),u.nextLayoutAnchorId+=1)}),Bn(i.map(r=>r.id),((s=i[0])==null?void 0:s.id)??null),u.lastSnap=i.length>1?`${i.length} boards duplicated`:"Board duplicated",Dt()}function R0(n){return n==="width"?"height":n==="height"?"width":"none"}function C0(n){return n==="upright"?"shelf":n==="shelf"?"upright":n}function jh(){const n=Qe(u);if(!n.length)return;te();const t=new Set(n.map(e=>e.id));n.forEach(e=>{const i=e.x+e.w/2,s=e.y+e.h/2,r=e.h,a=e.w;e.x=Math.round(i-r/2),e.y=Math.round(s-a/2),e.w=Math.round(r),e.h=Math.round(a),e.autoThickness=R0(e.autoThickness),e.kind=C0(e.kind),u.layoutAnchors.filter(o=>o.boardId===e.id).forEach(o=>{o.axis=o.axis==="x"?"y":"x"})}),u.anchors=u.anchors.filter(e=>!t.has(e.boardId)&&!t.has(e.targetBoardId)),u.lastSnap=n.length>1?`${n.length} boards rotated`:"Rotated 90 deg",Dt()}function I0(n){return n instanceof HTMLElement?n instanceof HTMLInputElement?["email","number","password","search","tel","text","url"].includes(n.type):n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement||n.isContentEditable:!1}function zo(n){return{n:"ns-resize",s:"ns-resize",e:"ew-resize",w:"ew-resize",ne:"nesw-resize",sw:"nesw-resize",nw:"nwse-resize",se:"nwse-resize"}[n]}function vc(n){return n.shiftKey||n.metaKey||n.ctrlKey}function P0(n){return n.button===1||n.altKey}function L0(n,t){const e=Math.min(n.x,t.x),i=Math.min(n.y,t.y);return{x:e,y:i,w:Math.abs(n.x-t.x),h:Math.abs(n.y-t.y)}}function D0(n,t){return n.x<=t.x+t.w&&n.x+n.w>=t.x&&n.y<=t.y+t.h&&n.y+n.h>=t.y}function U0(n){return u.boards.filter(t=>t.kind==="front"&&!u.showFrontPanels?!1:D0(n,ar(t)))}function co(n){if(u.tool==="measure"){Pt.style.cursor="";return}if(u.measurementDragging){Pt.style.cursor="move";return}if(mo(u,n)){Pt.style.cursor="move";return}const t=Je(u);if(t){const e=bc(u,t,n);if(e){Pt.style.cursor=zo(e);return}}Pt.style.cursor=Sc(u,n)?"grab":"crosshair"}function N0(n){const t=u.measurementDragging;if(!t)return;const e=u.measurements.find(c=>c.id===t.id),i=u.measurements.findIndex(c=>c.id===t.id);if(!e||i<0)return;const s=po(u,e,i);if(!s)return;const r=n.x-t.startPoint.x,a=n.y-t.startPoint.y,o=Math.hypot(r*u.scale,a*u.scale);!t.changed&&o>3&&(te(),t.changed=!0),t.changed&&(e.displayOffset=Math.round(s.axis==="horizontal"?t.startOffset-a:t.startOffset+r),u.lastSnap="Measurement display moved",Pt.style.cursor="move",Dt())}function F0(n){u.tool!=="measure"||!u.pendingMeasurementAnchor||(u.previewMeasurementAnchor=Ac(u,n),Dt())}Pt.addEventListener("pointerdown",n=>{const t=Pt.getBoundingClientRect(),e=ti(u,n.clientX-t.left,n.clientY-t.top);if(u.tool==="measure"){E0(e);return}if(P0(n)){u.panning={startX:n.clientX,startY:n.clientY,panX:u.panX,panY:u.panY},Pt.style.cursor="grabbing",Pt.setPointerCapture(n.pointerId);return}const i=Je(u);if(i){const a=bc(u,i,e);if(a&&Qe(u).length<=1){te(),u.resizing={id:i.id,handle:a,startPoint:e,startRect:ar(i)},u.lastSnap="Resizing",Pt.style.cursor=zo(a),Pt.setPointerCapture(n.pointerId),Dt();return}}const s=mo(u,e);if(s){const a=u.measurements.findIndex(o=>o.id===s.id);Ms(s.id),u.measurementDragging={id:s.id,startPoint:e,startOffset:fo(s,a),changed:!1},u.lastSnap="Measurement selected",Pt.style.cursor="move",Pt.setPointerCapture(n.pointerId),Dt();return}const r=Sc(u,e);if(r){if(vc(n)){mx(r.id),u.lastSnap=_i().size>1?`${_i().size} boards selected`:"Selection updated",Dt();return}const a=_i(),o=a.has(r.id)?[r.id,...[...a].filter(c=>c!==r.id)]:[r.id];Bn(o,r.id),te(),u.dragging={ids:o,startPoint:e,startRects:o.flatMap(c=>{const l=u.boards.find(d=>d.id===c);return l?[{id:c,...ar(l)}]:[]})},Pt.style.cursor="grabbing",Pt.setPointerCapture(n.pointerId)}else u.selectionBox={start:e,current:e,additive:vc(n)},Pt.style.cursor="crosshair",Pt.setPointerCapture(n.pointerId);Dt()},bt);Pt.addEventListener("dblclick",n=>{if(u.tool==="measure")return;const t=Pt.getBoundingClientRect(),e=ti(u,n.clientX-t.left,n.clientY-t.top),i=mo(u,e);i&&(n.preventDefault(),w0(i.id,n))},bt);Pt.addEventListener("pointermove",n=>{const t=Pt.getBoundingClientRect(),e=ti(u,n.clientX-t.left,n.clientY-t.top);if(u.tool==="measure"){F0(e),co(e);return}if(u.resizing){const f=u.boards.find(g=>{var x;return g.id===((x=u.resizing)==null?void 0:x.id)});if(!f)return;const h=hd(u,f,u.resizing.handle,u.resizing.startRect,u.resizing.startPoint,e);oo(f,h.rect),xi(f.id),u.snapGuides=h.guides,u.lastSnap=h.label,Pt.style.cursor=zo(u.resizing.handle),Dt();return}if(u.panning){u.panX=u.panning.panX+n.clientX-u.panning.startX,u.panY=u.panning.panY+n.clientY-u.panning.startY,u.snapGuides=[],u.lastSnap="Panning view",Pt.style.cursor="grabbing",Dt();return}if(u.measurementDragging){N0(e);return}if(u.selectionBox){u.selectionBox.current=e,u.snapGuides=[],u.lastSnap="Selecting boards",Pt.style.cursor="crosshair",Dt();return}if(!u.dragging){co(e);return}const i=u.boards.find(f=>{var h;return f.id===((h=u.dragging)==null?void 0:h.ids[0])});if(!i)return;const s=u.dragging.startRects.find(f=>f.id===i.id);if(!s)return;const r=e.x-u.dragging.startPoint.x,a=e.y-u.dragging.startPoint.y,o=new Set(u.dragging.ids),c=cd(u,i,s.x+r,s.y+a,o),l=c.x-s.x,d=c.y-s.y;u.dragging.startRects.forEach(f=>{const h=u.boards.find(g=>g.id===f.id);h&&oo(h,{...f,x:f.x+l,y:f.y+d})}),u.dragging.ids.forEach(f=>xi(f)),u.snapGuides=c.guides,u.lastSnap=c.label,Pt.style.cursor="grabbing",Dt()},bt);Pt.addEventListener("pointerup",n=>{var a;const t=Pt.getBoundingClientRect(),e=ti(u,n.clientX-t.left,n.clientY-t.top),i=((a=u.dragging)==null?void 0:a.ids)??(u.resizing?[u.resizing.id]:[]),s=u.measurementDragging,r=u.selectionBox;if(r){const o=L0(r.start,r.current);if(Math.hypot((r.current.x-r.start.x)*u.scale,(r.current.y-r.start.y)*u.scale)>4){const l=U0(o).map(f=>f.id),d=r.additive?[..._i(),...l]:l;Bn(d,l[0]??(r.additive?u.selectedId:null)),u.lastSnap=l.length?`${_i().size} boards selected`:"No boards in selection"}else r.additive||(bh(),u.selectedMeasurementId=null,u.lastSnap="No board selected")}u.dragging=null,u.resizing=null,u.measurementDragging=null,u.panning=null,u.selectionBox=null,u.snapGuides=[],i.forEach(o=>kh(o)),s!=null&&s.changed&&(u.lastSnap="Measurement display moved"),Pt.hasPointerCapture(n.pointerId)&&Pt.releasePointerCapture(n.pointerId),co(e),Dt()},bt);Pt.addEventListener("pointerleave",()=>{!u.dragging&&!u.resizing&&!u.measurementDragging&&!u.panning&&!u.selectionBox&&(Pt.style.cursor="")},bt);Pt.addEventListener("wheel",n=>{n.preventDefault();const t=Pt.getBoundingClientRect(),e={x:n.clientX-t.left,y:n.clientY-t.top},i=ti(u,e.x,e.y);u.scale=Math.max(ox,Math.min(cx,u.scale*(n.deltaY>0?.92:1.08)));const s=ti(u,e.x,e.y);u.panX+=(s.x-i.x)*u.scale,u.panY+=(s.y-i.y)*u.scale,Dt()},{passive:!1,signal:Mh.signal});w.anchorOverlay.addEventListener("click",n=>{const t=n.target.closest("[data-remove-anchor]");if(!t)return;const e=Number(t.dataset.removeAnchor);te(),u.anchors=u.anchors.filter(i=>i.id!==e),u.lastSnap="Anchor removed",Dt()},bt);w.templateList.addEventListener("click",n=>{const t=n.target.closest("[data-template]"),e=t==null?void 0:t.dataset.template;e&&Ix(e)},bt);w.measureModeBtn.addEventListener("click",()=>{u.tool=u.tool==="measure"?"select":"measure",u.pendingMeasurementAnchor=null,u.previewMeasurementAnchor=null,u.lastSnap=u.tool==="measure"?"Pick first anchor":"Select mode",Dt()},bt);w.presetList.addEventListener("click",n=>{const t=n.target.closest("[data-preset]");t&&Wh(t.dataset.preset??"")},bt);w.presetList.addEventListener("dragstart",n=>{const t=n.target.closest("[data-preset]");!t||!n.dataTransfer||(n.dataTransfer.setData("text/plain",t.dataset.preset??""),n.dataTransfer.effectAllowed="copy")},bt);Pt.addEventListener("dragover",n=>{n.preventDefault(),Pt.classList.add("drop-ready")},bt);Pt.addEventListener("dragleave",()=>{Pt.classList.remove("drop-ready")},bt);Pt.addEventListener("drop",n=>{var i;n.preventDefault(),Pt.classList.remove("drop-ready");const t=(i=n.dataTransfer)==null?void 0:i.getData("text/plain");if(!t)return;const e=Pt.getBoundingClientRect();Wh(t,ti(u,n.clientX-e.left,n.clientY-e.top))},bt);w.duplicateBtn.addEventListener("click",$h,bt);w.rotateBtn.addEventListener("click",jh,bt);w.undoBtn.addEventListener("click",Ch,bt);w.redoBtn.addEventListener("click",ro,bt);w.measureWidthBtn.addEventListener("click",()=>Xh("horizontal"),bt);w.measureHeightBtn.addEventListener("click",()=>Xh("vertical"),bt);w.saveBtn.addEventListener("click",zx,bt);w.loadBtn.addEventListener("click",Gx,bt);w.newProjectBtn.addEventListener("click",Lx,bt);w.projectFileInput.addEventListener("change",()=>{var t;const n=(t=w.projectFileInput.files)==null?void 0:t[0];n&&Hx(n)},bt);w.deleteBtn.addEventListener("click",qh,bt);w.fitBtn.addEventListener("click",Bo,bt);w.view3dBtn.addEventListener("click",()=>{Nx($i==="3d"?"sketch":"3d")},bt);w.woodOrderToggleBtn.addEventListener("click",()=>Oh(!jn),bt);w.woodOrderBackBtn.addEventListener("click",()=>Oh(!1),bt);w.cutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&Bh(Number(t.dataset.boardId))},bt);w.ignoredCutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&Bh(Number(t.dataset.boardId))},bt);w.copyCsvBtn.addEventListener("click",()=>void h0(),bt);w.exportBtn.addEventListener("click",c0,bt);w.projectNameInput.addEventListener("change",()=>{const n=Ih(w.projectNameInput.value);w.projectNameInput.value=n,n!==u.projectName&&(te(),u.projectName=n,u.lastSnap=n?"Project named":"Project name cleared",Dt())},bt);Fh(w.thicknessInput,()=>r0(Math.max(3,Number(w.thicknessInput.value)||18)));w.depthInput.addEventListener("change",()=>a0(mn(w.depthInput.value,u.depth)),bt);w.gridInput.addEventListener("input",()=>{te(),u.grid=Math.max(1,Number(w.gridInput.value)||25),Dt()},bt);w.snapToggle.addEventListener("change",()=>{te(),u.snap=w.snapToggle.checked,u.lastSnap=u.snap?"Snap on":"Snap off",Dt()},bt);w.dimToggle.addEventListener("change",()=>{te(),u.showDimensions=w.dimToggle.checked,Dt()},bt);w.frontLayerToggle.addEventListener("change",()=>{te(),u.showFrontPanels=w.frontLayerToggle.checked,u.lastSnap=u.showFrontPanels?"Front panels shown":"Front panels ghosted",Dt()},bt);[w.nameInput,w.xInput,w.yInput,w.wInput,w.hInput,w.depthOverrideInput].forEach(n=>Fh(n,f0));w.materialInput.addEventListener("change",Vh,bt);w.materialSelectButton.addEventListener("click",n=>{n.stopPropagation(),qx()},bt);w.materialSelectList.addEventListener("click",n=>{const t=n.target.closest("[data-material-id]");t&&(w.materialInput.value=t.dataset.materialId??"",Fo(),Vh())},bt);document.addEventListener("click",n=>{w.materialSelect.contains(n.target)||Fo()},bt);document.addEventListener("keydown",n=>{n.key==="Escape"&&Fo()},bt);w.layoutAnchorAxisInput.addEventListener("change",_0,bt);w.layoutAnchorBalanceInput.addEventListener("change",ao,bt);w.layoutAnchorApplyBtn.addEventListener("click",v0,bt);w.layoutAnchorClearBtn.addEventListener("click",M0,bt);w.materialForm.addEventListener("submit",n=>{n.preventDefault(),p0()},bt);[w.laminateLeftInput,w.laminateRightInput,w.laminateFrontInput,w.laminateBackInput].forEach(n=>n.addEventListener("change",m0,bt));w.ignoreOrderInput.addEventListener("change",g0,bt);w.measureRenameForm.addEventListener("submit",n=>{n.preventDefault(),Yh()},bt);w.measureRenameCancelBtn.addEventListener("click",_s,bt);w.measureRenameInput.addEventListener("keydown",n=>{n.key==="Escape"&&_s(),n.key==="Enter"&&(n.preventDefault(),Yh())},bt);document.addEventListener("keydown",n=>{if(I0(n.target))return;const t=n.key.toLowerCase(),e=n.metaKey||n.ctrlKey;if(e&&t==="z"){n.preventDefault(),n.shiftKey?ro():Ch();return}if(e&&t==="y"){n.preventDefault(),ro();return}if(e&&t==="d"){n.preventDefault(),$h();return}if(!e&&t==="r"){n.preventDefault(),jh();return}(n.key==="Delete"||n.key==="Backspace")&&(n.preventDefault(),qh())},bt);window.addEventListener("resize",Uo,bt);Uh();w.canvasWrap.dataset.view=$i;w.view3dBtn.setAttribute("aria-pressed","false");Io.bindInteractions(bt);kx();Uo();
