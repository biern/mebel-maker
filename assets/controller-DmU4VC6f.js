var Hh=Object.defineProperty;var Vh=(n,t,e)=>t in n?Hh(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var mn=(n,t,e)=>Vh(n,typeof t!="symbol"?t+"":t,e);import{t as Xc,e as Zi,f as $c,n as Co,b as Ji,s as Wh,a as Yc,c as xs,d as wr,g as qc,h as Xh,i as $h,j as jc,l as Yh}from"./index-DM3e0jRb.js";const Kc=28;function Ot(n){return`${Math.round(n)} mm`}function qh(n){const t=Pt(n);return`${n.name} · ${Ot(t.w)} × ${Ot(t.h)}`}function jh(n){return n==="upright"?"vertical":n==="shelf"?"horizontal":"front"}function Zc(n){return n.dimensions}function Kh(n){const t=Zc(n);return n.orientation==="vertical"?{x:n.x,y:n.y,w:t.thickness,h:t.height}:n.orientation==="horizontal"?{x:n.x,y:n.y,w:t.width,h:t.thickness}:{x:n.x,y:n.y,w:t.width,h:t.height}}function Jc(n,t){const e=Zc(n);n.orientation==="vertical"?n.dimensions={width:e.width,height:Math.round(t.h),thickness:e.thickness}:n.orientation==="horizontal"?n.dimensions={width:Math.round(t.w),height:e.height,thickness:e.thickness}:n.dimensions={width:Math.round(t.w),height:Math.round(t.h),thickness:e.thickness},n.x=Math.round(t.x),n.y=Math.round(t.y)}function an(n){return n.boards.find(t=>t.id===n.selectedId)??null}function Fe(n){const t=new Set(n.selectedIds);return n.selectedId!==null&&t.add(n.selectedId),n.boards.filter(e=>t.has(e.id))}function Qc(n){return n.measurements.find(t=>t.id===n.selectedMeasurementId)??null}function oi(n,t,e){return{x:(t-n.panX)/n.scale,y:(e-n.panY)/n.scale}}function _e(n,t,e){return{x:t*n.scale+n.panX,y:e*n.scale+n.panY}}function Ti(n){return mr(Pt(n))}function mr(n){return{left:n.x,right:n.x+n.w,top:n.y,bottom:n.y+n.h,centerX:n.x+n.w/2,centerY:n.y+n.h/2}}function El(n){return n.kind==="back"?0:n.kind==="front"?2:1}function Po(n){return n.map((t,e)=>({board:t,index:e})).sort((t,e)=>El(t.board)-El(e.board)||t.index-e.index).map(({board:t})=>t)}function td(n,t){const e=Po(n.boards);for(let i=e.length-1;i>=0;i-=1){const s=e[i];if(!(s.kind==="front"&&!n.showFrontPanels)&&Zh(s,t))return s}return null}function Zh(n,t){const e=Pt(n),i=e.w<32||e.h<32?14:0;return t.x>=e.x-i&&t.x<=e.x+e.w+i&&t.y>=e.y-i&&t.y<=e.y+e.h+i}function Wn(n){if(!n.length)return null;const t=n.map(Pt),e=Math.min(...t.map(a=>a.x)),i=Math.min(...t.map(a=>a.y)),s=Math.max(...t.map(a=>a.x+a.w)),r=Math.max(...t.map(a=>a.y+a.h));return{left:e,top:i,right:s,bottom:r,w:s-e,h:r-i}}function Pt(n){return Kh(n)}function Mn(n,t){return n.orientation==="vertical"?n.dimensions.width:n.orientation==="horizontal"?n.dimensions.height:t}function Tl(n,t){return n.dimensions.thickness}function Ai(n,t,e){const i=e==="x"?n.gridOriginX:n.gridOriginY;return i+Math.round((t-i)/n.grid)*n.grid}function ed(n,t){return n.boards.filter(e=>e.group===t)}function Jh(n){let t=1;const e=new Set;n.forEach(i=>{if(e.has(i.id))return;const s=[i];for(e.add(i.id),i.group=t;s.length;){const r=s.shift();r&&n.forEach(a=>{e.has(a.id)||!lu(r,a)||(a.group=t,e.add(a.id),s.push(a))})}t+=1})}function nd(n,t){const e=Wn(n);if(!e)return null;const i=n.filter(u=>!li(u)),s=i.find(u=>{const f=Pt(u);return Math.abs(f.x-e.left)<=.5&&f.h>t*2}),r=i.find(u=>{const f=Pt(u);return Math.abs(f.x+f.w-e.right)<=.5&&f.h>t*2}),a=i.find(u=>{const f=Pt(u);return Math.abs(f.y-e.top)<=.5&&f.w>t*2}),o=i.find(u=>{const f=Pt(u);return Math.abs(f.y+f.h-e.bottom)<=.5&&f.w>t*2}),l=Math.max(0,e.w-(s?Pt(s).w:0)-(r?Pt(r).w:0)),c=Math.max(0,e.h-(a?Pt(a).h:0)-(o?Pt(o).h:0));return{innerW:l,innerH:c,hasFrame:!!(s||r||a||o)}}function Qh(n){const t=[],e=new Set,i=n.filter(s=>!li(s));return i.forEach(s=>{s.orientation!=="horizontal"&&s.orientation!=="vertical"||i.forEach(r=>{s.id!==r.id&&(s.orientation==="horizontal"&&r.orientation==="vertical"&&au(s,r,t,e),s.orientation==="vertical"&&r.orientation==="horizontal"&&ou(s,r,t,e))})}),t.sort((s,r)=>s.hostBoardId-r.hostBoardId||s.offset-r.offset||s.targetBoardId-r.targetBoardId)}function tu(n,t,e,i,s=new Set([t.id])){if(!n.snap)return{x:e,y:i,label:"Snap off",guides:[]};const r=Kc/n.scale,a={x:Ai(n,e,"x"),y:Ai(n,i,"y")};let o=`Grid ${n.grid} mm`,l=r,c=r;const u=[],f=[],h={...t,x:e,y:i},m=Ti(h);n.boards.forEach(S=>{if(s.has(S.id))return;const g=Ti(S),p=[[m.left,g.left,"left aligned",null,null],[m.right,g.right,"right aligned",null,null],[m.centerX,g.centerX,"center aligned",null,null],[m.left,g.right,"touching right edge","left","right"],[m.right,g.left,"touching left edge","right","left"]],y=[[m.top,g.top,"top aligned",null,null],[m.bottom,g.bottom,"bottom aligned",null,null],[m.centerY,g.centerY,"middle aligned",null,null],[m.top,g.bottom,"flush below","top","bottom"],[m.bottom,g.top,"flush above","bottom","top"]];p.forEach(([T,w,L,A,D])=>{const M=w-T;Math.abs(M)<l&&(a.x=e+M,l=Math.abs(M),o=L,f[0]=A&&D?{edge:A,target:S,targetEdge:D}:null,u[0]={orientation:"vertical",position:w,label:L})}),y.forEach(([T,w,L,A,D])=>{const M=w-T;Math.abs(M)<c&&(a.y=i+M,c=Math.abs(M),o=L,f[1]=A&&D?{edge:A,target:S,targetEdge:D}:null,u[1]={orientation:"horizontal",position:w,label:L})})}),cd(n,s).forEach(({anchor:S,board:g,position:p})=>{if(S.axis==="x"){const T=p-m.centerX;Math.abs(T)<l&&(a.x=e+T,l=Math.abs(T),o=`${g.name} layout anchor`,f[0]=null,u[0]={orientation:"vertical",position:p,label:o});return}const y=p-m.centerY;Math.abs(y)<c&&(a.y=i+y,c=Math.abs(y),o=`${g.name} layout anchor`,f[1]=null,u[1]={orientation:"horizontal",position:p,label:o})});const _={...Pt(t),x:a.x,y:a.y};return f.forEach((S,g)=>{!S||!u[g]||(u[g].linkPoint=hd(t,_,S.edge,S.target,S.targetEdge))}),{...a,label:o,guides:u.filter(Boolean)}}function id(n,t,e){const s=_e(n,e.x,e.y),r=Pt(t),a=_e(n,r.x,r.y),o=r.w*n.scale,l=r.h*n.scale,c={nw:{x:a.x,y:a.y},n:{x:a.x+o/2,y:a.y},ne:{x:a.x+o,y:a.y},w:{x:a.x,y:a.y+l/2},e:{x:a.x+o,y:a.y+l/2},sw:{x:a.x,y:a.y+l},s:{x:a.x+o/2,y:a.y+l},se:{x:a.x+o,y:a.y+l}};return sd(t).reduce((u,f)=>{const h=c[f],m=Math.abs(s.x-h.x),_=Math.abs(s.y-h.y);if(m>18||_>18)return u;const S=m*m+_*_;return S<u.distance?{handle:f,distance:S}:u},{handle:null,distance:Number.POSITIVE_INFINITY}).handle}function eu(n,t,e,i,s,r){const a=r.x-s.x,o=r.y-s.y,l={...i};return e.includes("e")&&(l.w=i.w+a),e.includes("s")&&(l.h=i.h+o),e.includes("w")&&(l.x=i.x+a,l.w=i.w-a),e.includes("n")&&(l.y=i.y+o,l.h=i.h-o),t.orientation==="vertical"&&(l.x=i.x,l.w=i.w),t.orientation==="horizontal"&&(l.y=i.y,l.h=i.h),nu(n,t,dd(l,n.thickness),iu(e))}function sd(n){return n.orientation==="vertical"?["n","s"]:n.orientation==="horizontal"?["w","e"]:["nw","n","ne","w","e","sw","s","se"]}function rd(n,t){const e=Math.max(10,12/n.scale),i=Math.max(10,16/n.scale);let s=null,r=Number.POSITIVE_INFINITY;return n.boards.forEach(a=>{const o=Pt(a),l=Ti(a);[{edge:"left",distance:Math.abs(t.x-l.left),offset:t.y-o.y},{edge:"right",distance:Math.abs(t.x-l.right),offset:t.y-o.y},{edge:"top",distance:Math.abs(t.y-l.top),offset:t.x-o.x},{edge:"bottom",distance:Math.abs(t.y-l.bottom),offset:t.x-o.x}].forEach(u=>{const f=(u.edge==="left"||u.edge==="right")&&t.y>=o.y-e&&t.y<=o.y+o.h+e,h=(u.edge==="top"||u.edge==="bottom")&&t.x>=o.x-e&&t.x<=o.x+o.w+e;if(!(!(f||h)||u.distance>e)&&u.distance<r){const m=u.edge==="left"||u.edge==="right"?o.h/2:o.w/2,_=Math.abs(u.offset-m)<=i?m:u.offset;s={kind:"board-edge",boardId:a.id,edge:u.edge,offset:_},r=u.distance}})}),s??{kind:"grid",x:Ai(n,t.x,"x"),y:Ai(n,t.y,"y")}}function yi(n,t){if(t.kind==="grid")return{x:t.x,y:t.y};const e=n.boards.find(r=>r.id===t.boardId);if(!e)return null;const i=Pt(e),s=Ti(e);return t.edge==="left"||t.edge==="right"?{x:t.edge==="left"?s.left:s.right,y:i.y+Al(t.offset,0,i.h)}:{x:i.x+Al(t.offset,0,i.w),y:t.edge==="top"?s.top:s.bottom}}function ad(n,t){return Math.abs(n.x-t.x)>=Math.abs(n.y-t.y)?"horizontal":"vertical"}function od(n){return 46+n*14}function Io(n,t){return n.displayOffset??od(t)}function Lo(n,t,e){const i=yi(n,t.a),s=yi(n,t.b);if(!i||!s)return null;const r=Io(t,e);if(t.axis==="horizontal"){const o=Math.min(i.y,s.y)-r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:i.x,y:o},lineEnd:{x:s.x,y:o},labelPoint:{x:(i.x+s.x)/2,y:o-13/n.scale}}}const a=Math.max(i.x,s.x)+r;return{a:i,b:s,axis:t.axis,offset:r,lineStart:{x:a,y:i.y},lineEnd:{x:a,y:s.y},labelPoint:{x:a-16/n.scale,y:(i.y+s.y)/2}}}function Do(n,t){const e=Math.max(8,10/n.scale),i=42/n.scale,s=18/n.scale;for(let r=n.measurements.length-1;r>=0;r-=1){const a=n.measurements[r],o=Lo(n,a,r);if(!o)continue;const l=Math.min(o.lineStart.x,o.lineEnd.x)-e,c=Math.max(o.lineStart.x,o.lineEnd.x)+e,u=Math.min(o.lineStart.y,o.lineEnd.y)-e,f=Math.max(o.lineStart.y,o.lineEnd.y)+e,h=t.x>=l&&t.x<=c&&t.y>=u&&t.y<=f,m=Math.abs(t.x-o.labelPoint.x)<=i&&Math.abs(t.y-o.labelPoint.y)<=s;if(h||m)return a}return null}function ld(n){const t=[];for(let e=0;e<n.length;e+=1)for(let i=e+1;i<n.length;i+=1){const s=n[e],r=n[i];if(li(s)||li(r))continue;const a=Pt(s),o=Pt(r),l=Math.max(a.x,o.x),c=Math.max(a.y,o.y),u=Math.min(a.x+a.w,o.x+o.w),f=Math.min(a.y+a.h,o.y+o.h);u-l>.5&&f-c>.5&&t.push({x:l,y:c,w:u-l,h:f-c,boardIds:[s.id,r.id]})}return t}function nu(n,t,e,i){if(!n.snap)return{rect:e,label:"Snap off",guides:[]};const s=Kc/n.scale,r={...e};let a=`Grid ${n.grid} mm`;const o=[];return i.forEach(l=>{let c=s,u=a,f=null;const h=wa(mr(r),l);let _=Ai(n,h,l==="left"||l==="right"?"x":"y")-h;Math.abs(_)<=s&&(u=`Grid ${n.grid} mm`),n.boards.forEach(S=>{if(S.id===t.id)return;const g=Ti(S);su(g,l).forEach(([p,y,T])=>{const w=p-h;if(Math.abs(w)<c){c=Math.abs(w),_=w,u=y;const L=ru(r,l,w,n.thickness),A=T?hd(t,L,l,S,T):void 0;f={orientation:l==="left"||l==="right"?"vertical":"horizontal",position:p,label:y,linkPoint:A}}})}),cd(n,new Set([t.id])).forEach(({anchor:S,board:g,position:p})=>{const y=l==="left"||l==="right";if(y&&S.axis!=="x"||!y&&S.axis!=="y")return;const T=p-h;Math.abs(T)<c&&(c=Math.abs(T),_=T,u=`${g.name} layout anchor`,f={orientation:y?"vertical":"horizontal",position:p,label:u})}),ud(r,l,_,n.thickness),a=u,f&&o.push(f)}),{rect:r,label:a,guides:o}}function cd(n,t){return n.layoutAnchors.flatMap(e=>{if(t.has(e.boardId))return[];const i=n.boards.find(a=>a.id===e.boardId);if(!i)return[];const s=Pt(i),r=e.axis==="x"?s.w:s.h;return e.offset<0||e.offset>r?[]:[{anchor:e,board:i,position:(e.axis==="x"?s.x:s.y)+e.offset}]})}function iu(n){const t=[];return n.includes("n")&&t.push("top"),n.includes("s")&&t.push("bottom"),n.includes("w")&&t.push("left"),n.includes("e")&&t.push("right"),t}function dd(n,t){const e={...n},i=Math.max(8,t);return e.w<i&&(e.x+=e.w-i,e.w=i),e.h<i&&(e.y+=e.h-i,e.h=i),e}function wa(n,t){return t==="left"?n.left:t==="right"?n.right:t==="top"?n.top:n.bottom}function su(n,t){return t==="left"||t==="right"?[[n.left,"left edge",t==="right"?"left":null],[n.right,"right edge",t==="left"?"right":null],[n.centerX,"vertical center",null]]:[[n.top,"top edge",t==="bottom"?"top":null],[n.bottom,"bottom edge",t==="top"?"bottom":null],[n.centerY,"horizontal center",null]]}function ru(n,t,e,i){const s={...n};return ud(s,t,e,i),s}function hd(n,t,e,i,s){if(li(n)||li(i))return;const r=mr(t),a=Pt(i),o=mr(a),l=wa(r,e),c=wa(o,s);if(Math.abs(l-c)>.5)return;if(e==="left"||e==="right"){const h=Math.max(t.y,a.y),m=Math.min(t.y+t.h,a.y+a.h);return h>m+.5?void 0:{x:l,y:(h+m)/2}}const u=Math.max(t.x,a.x),f=Math.min(t.x+t.w,a.x+a.w);if(!(u>f+.5))return{x:(u+f)/2,y:l}}function ud(n,t,e,i){t==="left"&&(n.x+=e,n.w-=e),t==="right"&&(n.w+=e),t==="top"&&(n.y+=e,n.h-=e),t==="bottom"&&(n.h+=e);const s=dd(n,i);n.x=s.x,n.y=s.y,n.w=s.w,n.h=s.h}function au(n,t,e,i){const r=Pt(n),a=Pt(t);[["top","bottom",r.y,a.y+a.h],["bottom","top",r.y+r.h,a.y]].forEach(([l,c,u,f])=>{if(Math.abs(u-f)>.5||pd(r.x,r.x+r.w,a.x,a.x+a.w)<=.5)return;const h=a.x+a.w/2-r.x;if(h<-.5||h>r.w+.5)return;const m=a.w/2;fd(e,i,{hostBoardId:n.id,targetBoardId:t.id,axis:"horizontal",edge:l,offset:h,labelOffset:md(h,r.w,m),point:{x:r.x+h,y:u}},c)})}function ou(n,t,e,i){const r=Pt(n),a=Pt(t);[["left","right",r.x,a.x+a.w],["right","left",r.x+r.w,a.x]].forEach(([l,c,u,f])=>{if(Math.abs(u-f)>.5||pd(r.y,r.y+r.h,a.y,a.y+a.h)<=.5)return;const h=a.y+a.h/2-r.y;if(h<-.5||h>r.h+.5)return;const m=a.h/2;fd(e,i,{hostBoardId:n.id,targetBoardId:t.id,axis:"vertical",edge:l,offset:h,labelOffset:md(h,r.h,m),point:{x:u,y:r.y+h}},c)})}function fd(n,t,e,i){const s=`${e.hostBoardId}:${e.targetBoardId}:${e.edge}:${i}:${Math.round(e.offset*1e3)}`;t.has(s)||(t.add(s),n.push(e))}function pd(n,t,e,i){return Math.min(t,i)-Math.max(n,e)}function md(n,t,e){return Math.abs(n-(t-e))<=.5?-e:n}function Al(n,t,e){return Math.max(t,Math.min(e,n))}function lu(n,t){if(li(n)||li(t))return!1;if(cu(n,t))return!0;const e=Ti(n),i=Ti(t),s=Math.abs(e.right-i.left)<=.5||Math.abs(i.right-e.left)<=.5,r=Math.abs(e.bottom-i.top)<=.5||Math.abs(i.bottom-e.top)<=.5;return s&&wl(e.top,e.bottom,i.top,i.bottom)||r&&wl(e.left,e.right,i.left,i.right)}function li(n){return n.kind==="back"||n.kind==="front"}function wl(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function cu(n,t){const e=Pt(n),i=Pt(t);return e.x<i.x+i.w-.5&&e.x+e.w>i.x+.5&&e.y<i.y+i.h-.5&&e.y+e.h>i.y+.5}const gd="#d6c4a1";function Rr(n){return n==="s1"||n==="s2"||n==="none"?n:"both"}function gr(n,t){return n==="both"||n===t}function du(n){return n==="horizontal"?["bottom","top"]:n==="vertical"?["right","left"]:["front","back"]}function hu(n){return n==="horizontal"?[3,2]:n==="vertical"?[0,1]:[4,5]}const Hr=["#5c8d89","#d19041","#725d9f","#538052","#bb5d50","#3f75a3"];function Ds(n){return Xc(n)}class uu{constructor(t,e){mn(this,"ctx");this.canvas=t,this.state=e;const i=t.getContext("2d");if(!i)throw new Error("Canvas rendering is not available.");this.ctx=i}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.canvas.width=Math.max(1,Math.round(t.width*e)),this.canvas.height=Math.max(1,Math.round(t.height*e)),this.ctx.setTransform(e,0,0,e,0,0),this.draw()}draw(){const t=this.canvas.getBoundingClientRect();this.ctx.clearRect(0,0,t.width,t.height),this.drawGrid(t.width,t.height),Po(this.state.boards).forEach(e=>this.drawBoard(e)),this.drawLayoutAnchors(),this.drawOverlaps(),this.drawConnectionMarks(),this.drawSelectionBox(),this.drawSnapGuides(t.width,t.height),this.drawMeasurements(),this.drawDimensions(),this.drawResizeHandles(),this.drawOriginAxis(t.width,t.height)}drawGrid(t,e){const i=this.scaledGridPx();this.ctx.save(),this.ctx.strokeStyle="#e1e8e2",this.ctx.lineWidth=1;const s=_e(this.state,this.state.gridOriginX,this.state.gridOriginY),r=(s.x%i+i)%i,a=(s.y%i+i)%i;for(let o=r;o<t;o+=i)this.line(o,0,o,e);for(let o=a;o<e;o+=i)this.line(0,o,t,o);this.ctx.restore()}scaledGridPx(){const t=this.state.grid*this.state.scale,e=12;if(t>=e)return t;const i=this.niceGridMultiplier(e/Math.max(.1,t));return t*i}niceGridMultiplier(t){const i=10**Math.floor(Math.log10(t)),s=t/i;return s<=2?2*i:s<=5?5*i:10*i}drawOriginAxis(t,e){const i=_e(this.state,0,0),s=42,r=s+18;if(i.x<-r||i.x>t+r||i.y<-r||i.y>e+r)return;const a=Math.max(1,Math.min(t-1,i.x)),o=Math.max(1,Math.min(e-1,i.y)),l=a<12;this.ctx.save(),this.ctx.strokeStyle="#1f6659",this.ctx.fillStyle="#1f6659",this.ctx.lineWidth=2,this.ctx.font="11px system-ui",this.ctx.textBaseline="middle",this.drawArrow(a,o,a+s,o),this.drawArrow(a,o,a,o-s),this.ctx.beginPath(),this.ctx.arc(a,o,3,0,Math.PI*2),this.ctx.fill(),this.ctx.textAlign="left",this.ctx.fillText("X",a+s+7,o),this.ctx.fillText("0,0",a+6,o+13),this.ctx.textAlign=l?"left":"center",this.ctx.fillText("Y",a+(l?7:0),o-s-10),this.ctx.restore()}drawBoard(t){var _;if(t.kind==="front"&&!this.state.showFrontPanels)return;const e=Pt(t),i=_e(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale,a=this.state.selectedIds.includes(t.id)||t.id===this.state.selectedId,o=t.id===this.state.selectedId,l=t.id===((_=this.state.resizing)==null?void 0:_.id),c=Hr[(t.group-1)%Hr.length]??Hr[0],u=this.materialFor(t),f=this.boardOpacity(t,a||l);this.ctx.save(),this.ctx.globalAlpha=f;const h=t.orientation==="front"&&!gr(t.faceLamination,"s1")?gd:u.color;this.ctx.fillStyle=t.kind==="back"?this.withAlpha(h,.36):h,this.ctx.strokeStyle=o?"#1f6659":a?"#2f78b7":c,this.ctx.lineWidth=t.kind==="back"?1.5:o?3:a?2.5:2,this.ctx.fillRect(i.x,i.y,s,r),this.ctx.strokeRect(i.x,i.y,s,r),this.drawBandingEdges(t,i.x,i.y,s,r),this.ctx.strokeStyle="rgba(99, 72, 37, 0.28)",this.ctx.lineWidth=1;const m=Math.max(10,28*this.state.scale);if(e.w>=e.h)for(let S=i.y+m;S<i.y+r;S+=m)this.line(i.x+4,S,i.x+s-4,S);else for(let S=i.x+m;S<i.x+s;S+=m)this.line(S,i.y+4,S,i.y+r-4);this.ctx.fillStyle="#27302b",this.ctx.font="12px system-ui",this.ctx.textBaseline="top",this.ctx.fillText(t.name,i.x+7,i.y+6),this.ctx.restore()}boardOpacity(t,e){return t.kind!=="front"?1:e?.5:1}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}withAlpha(t,e){const i=/^#([0-9a-f]{6})$/i.exec(t);if(!i)return t;const s=i[1],r=parseInt(s.slice(0,2),16),a=parseInt(s.slice(2,4),16),o=parseInt(s.slice(4,6),16);return`rgba(${r}, ${a}, ${o}, ${e})`}drawBandingEdges(t,e,i,s,r){const a=t.edgeBanding,o=t.legacyLaminate;let l;o&&!Object.values(a).some(Boolean)?l=[[o.left,e,i,e,i+r],[o.right,e+s,i,e+s,i+r],[o.top||o.back,e,i,e+s,i],[o.bottom||o.front,e,i+r,e+s,i+r]]:t.orientation==="vertical"?l=[[!!a.a1,e,i,e+s,i],[!!a.a2,e,i+r,e+s,i+r],[!!a.b1,e+s/2,i,e+s/2,i+r]]:t.orientation==="horizontal"?l=[[!!a.b1,e,i,e,i+r],[!!a.b2,e+s,i,e+s,i+r],[!!a.a1,e,i+r/2,e+s,i+r/2]]:l=[[!!a.b1,e,i,e,i+r],[!!a.b2,e+s,i,e+s,i+r],[!!a.a1,e,i,e+s,i],[!!a.a2,e,i+r,e+s,i+r]],l.some(([c])=>c)&&(this.ctx.save(),this.ctx.strokeStyle="#d58b28",this.ctx.lineCap="round",this.ctx.lineWidth=Math.max(3,5*this.state.scale),l.forEach(([c,u,f,h,m])=>{c&&this.line(u,f,h,m)}),this.ctx.restore())}drawOverlaps(){const t=ld(this.state.boards);t.length&&(this.ctx.save(),t.forEach(e=>{const i=_e(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale;this.ctx.fillStyle="rgba(184, 72, 59, 0.22)",this.ctx.fillRect(i.x,i.y,s,r),this.ctx.strokeStyle="rgba(184, 72, 59, 0.9)",this.ctx.lineWidth=1.5,this.ctx.strokeRect(i.x,i.y,s,r),this.ctx.beginPath();for(let a=i.x-r;a<i.x+s+r;a+=8)this.ctx.moveTo(a,i.y+r),this.ctx.lineTo(a+r,i.y);this.ctx.stroke()}),this.ctx.restore())}drawConnectionMarks(){if(!this.state.showConnectionMarks)return;const t=Qh(this.state.boards);t.length&&(this.ctx.save(),this.ctx.strokeStyle="#805a2f",this.ctx.fillStyle="#805a2f",this.ctx.lineWidth=1.6,this.ctx.font="12px system-ui",this.ctx.setLineDash([2,3]),t.forEach(e=>this.drawConnectionMark(e)),this.ctx.restore())}drawConnectionMark(t){const e=_e(this.state,t.point.x,t.point.y),i=Ot(t.labelOffset),s=9;if(this.ctx.save(),this.ctx.setLineDash([]),t.axis==="horizontal"){this.line(e.x,e.y-s,e.x,e.y+s);const r=t.edge==="top";this.drawOutlinedText(i,e.x,e.y+(r?-15:15),"center",r?"bottom":"top")}else{this.line(e.x-s,e.y,e.x+s,e.y);const r=t.edge==="left";this.drawOutlinedText(i,e.x+(r?-12:12),e.y,r?"right":"left","middle")}this.ctx.restore()}drawLayoutAnchors(){if(!this.state.layoutAnchors.length)return;const t=new Set(this.state.selectedIds);this.state.selectedId!==null&&t.add(this.state.selectedId),this.ctx.save(),this.state.layoutAnchors.forEach(e=>{const i=this.state.boards.find(u=>u.id===e.boardId);if(!i)return;const s=t.has(i.id),r=s?"#1f6659":"rgba(31, 102, 89, 0.52)";if(this.ctx.strokeStyle=r,this.ctx.fillStyle=s?"#ffffff":"#e7f3f0",this.ctx.lineWidth=s?2:1.4,this.ctx.setLineDash(s?[5,4]:[3,5]),e.axis==="x"){const u=Pt(i),f=u.x+e.offset;if(e.offset<0||e.offset>u.w)return;const h=_e(this.state,f,u.y),m=_e(this.state,f,u.y+u.h);this.line(h.x,h.y,m.x,m.y),this.drawLayoutAnchorDot(h.x,(h.y+m.y)/2,r);return}const a=Pt(i),o=a.y+e.offset;if(e.offset<0||e.offset>a.h)return;const l=_e(this.state,a.x,o),c=_e(this.state,a.x+a.w,o);this.line(l.x,l.y,c.x,c.y),this.drawLayoutAnchorDot((l.x+c.x)/2,l.y,r)}),this.ctx.restore()}drawSelectionBox(){const t=this.state.selectionBox;if(!t)return;const e=_e(this.state,t.start.x,t.start.y),i=_e(this.state,t.current.x,t.current.y),s=Math.min(e.x,i.x),r=Math.min(e.y,i.y),a=Math.abs(e.x-i.x),o=Math.abs(e.y-i.y);this.ctx.save(),this.ctx.fillStyle="rgba(47, 120, 183, 0.12)",this.ctx.strokeStyle="#2f78b7",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,4]),this.ctx.fillRect(s,r,a,o),this.ctx.strokeRect(s,r,a,o),this.ctx.restore()}drawSnapGuides(t,e){this.state.snapGuides.length&&(this.ctx.save(),this.ctx.strokeStyle="#2398b6",this.ctx.fillStyle="#1b728a",this.ctx.lineWidth=1.5,this.ctx.setLineDash([6,5]),this.ctx.font="12px system-ui",this.state.snapGuides.forEach(i=>{if(i.orientation==="vertical"){const s=_e(this.state,i.position,0);this.line(s.x,0,s.x,e),this.drawGuideLabel(i.label,s.x+8,e-18,t,e)}else{const s=_e(this.state,0,i.position);this.line(0,s.y,t,s.y),this.drawGuideLabel(i.label,t-12,s.y-8,t,e,"right")}}),this.ctx.restore())}drawMeasurements(){if(this.state.measurements.forEach((t,e)=>{const i=Lo(this.state,t,e);if(!i)return;const s=t.id===this.state.selectedMeasurementId,r=s?"#b8483b":"#4152a3";this.drawMeasurementLine(i.a,i.b,i.lineStart,i.lineEnd,t.axis,r,t.name,s),this.drawAnchorDot(i.a.x,i.a.y,s?"#fff7f5":"#ffffff",r),this.drawAnchorDot(i.b.x,i.b.y,s?"#fff7f5":"#ffffff",r)}),this.state.pendingMeasurementAnchor){const t=yi(this.state,this.state.pendingMeasurementAnchor);t&&this.drawAnchorDot(t.x,t.y,"#4152a3")}if(this.state.pendingMeasurementAnchor&&this.state.previewMeasurementAnchor){const t=yi(this.state,this.state.pendingMeasurementAnchor),e=yi(this.state,this.state.previewMeasurementAnchor);if(!t||!e)return;this.ctx.save(),this.ctx.globalAlpha=.82,this.drawMeasurement(t,e,ad(t,e),46+this.state.measurements.length*14,"#2398b6"),this.ctx.restore(),this.drawAnchorDot(t.x,t.y,"#4152a3"),this.drawAnchorDot(e.x,e.y,"#2398b6")}}measurementLabel(t,e){const i=t.trim();return i?`${i} ${e}`:e}drawMeasurement(t,e,i,s,r,a=""){if(i==="horizontal"){const l=Math.min(t.y,e.y)-s;this.drawDimensionLine(t.x,l,e.x,l,this.measurementLabel(a,Ot(Math.abs(e.x-t.x))),0,r),this.drawExtension(t.x,t.y,t.x,l,r),this.drawExtension(e.x,e.y,e.x,l,r);return}const o=Math.max(t.x,e.x)+s;this.drawDimensionLine(o,t.y,o,e.y,this.measurementLabel(a,Ot(Math.abs(e.y-t.y))),0,r),this.drawExtension(t.x,t.y,o,t.y,r),this.drawExtension(e.x,e.y,o,e.y,r)}drawMeasurementLine(t,e,i,s,r,a,o,l){const c=Ot(Math.abs(r==="horizontal"?e.x-t.x:e.y-t.y));this.drawDimensionLine(i.x,i.y,s.x,s.y,this.measurementLabel(o,c),0,a,l?2.4:1.5),this.drawExtension(t.x,t.y,i.x,i.y,a),this.drawExtension(e.x,e.y,s.x,s.y,a)}drawDimensions(){if(!this.state.showDimensions)return;const t=this.visibleBoard(an(this.state)),e=Fe(this.state).filter(a=>this.isBoardVisible(a)),i=e.length>1?e:t?ed(this.state,t.group).filter(a=>this.isBoardVisible(a)):this.state.boards.filter(a=>this.isBoardVisible(a)),s=Wn(i);if(!s)return;this.drawDimensionLine(s.left,s.top,s.right,s.top,`${Ds("metrics.outer")} ${Ot(s.w)}`,-28,"#255e55"),this.drawDimensionLine(s.right,s.top,s.right,s.bottom,`${Ds("metrics.outer")} ${Ot(s.h)}`,30,"#255e55");const r=nd(i,this.state.thickness);if(r!=null&&r.hasFrame&&(this.drawDimensionLine(s.left+this.state.thickness,s.bottom,s.right-this.state.thickness,s.bottom,`${Ds("metrics.inner")} ${Ot(r.innerW)}`,28,"#a45f1b"),this.drawDimensionLine(s.left,s.top+this.state.thickness,s.left,s.bottom-this.state.thickness,`${Ds("metrics.inner")} ${Ot(r.innerH)}`,-30,"#a45f1b")),t&&e.length<=1){const a=Pt(t);this.drawDimensionLine(a.x,a.y+a.h,a.x+a.w,a.y+a.h,Ot(a.w),18,"#6e4d83"),this.drawDimensionLine(a.x+a.w,a.y,a.x+a.w,a.y+a.h,Ot(a.h),18,"#6e4d83")}}drawResizeHandles(){if(Fe(this.state).length>1)return;const t=an(this.state);if(!t||!this.isBoardVisible(t))return;const e=Pt(t),i=_e(this.state,e.x,e.y),s=e.w*this.state.scale,r=e.h*this.state.scale,a={nw:[i.x,i.y],n:[i.x+s/2,i.y],ne:[i.x+s,i.y],w:[i.x,i.y+r/2],e:[i.x+s,i.y+r/2],sw:[i.x,i.y+r],s:[i.x+s/2,i.y+r],se:[i.x+s,i.y+r]},o=sd(t).map(u=>a[u]);this.ctx.save(),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle="#1f6659",this.ctx.lineWidth=1.5;const l=10,c=l/2;o.forEach(([u,f])=>{this.ctx.fillRect(u-c,f-c,l,l),this.ctx.strokeRect(u-c,f-c,l,l)}),this.ctx.restore()}isBoardVisible(t){return t.kind!=="front"||this.state.showFrontPanels}visibleBoard(t){return t&&this.isBoardVisible(t)?t:null}drawGuideLabel(t,e,i,s,r,a="left"){const l=this.ctx.measureText(t).width,c=10,u=a==="right"?Math.max(c+l,Math.min(s-c,e)):Math.max(c,Math.min(s-c-l,e)),f=Math.max(18,Math.min(r-10,i));this.ctx.save(),this.ctx.setLineDash([]),this.ctx.textAlign=a,this.ctx.textBaseline="alphabetic",this.ctx.fillText(t,u,f),this.ctx.restore()}drawOutlinedText(t,e,i,s,r){this.ctx.save(),this.ctx.textAlign=s,this.ctx.textBaseline=r,this.ctx.lineWidth=4,this.ctx.strokeStyle="rgba(255, 255, 255, 0.92)",this.ctx.strokeText(t,e,i),this.ctx.fillStyle="#805a2f",this.ctx.fillText(t,e,i),this.ctx.restore()}drawDimensionLine(t,e,i,s,r,a=0,o="#2c6159",l=1.5){const c=_e(this.state,t,e),u=_e(this.state,i,s),f=Math.abs(e-s)<.01;this.ctx.save(),this.ctx.strokeStyle=o,this.ctx.fillStyle=o,this.ctx.lineWidth=l,this.ctx.font="12px system-ui",this.ctx.textAlign="center",this.ctx.textBaseline="middle",f?(c.y+=a,u.y+=a,this.line(c.x,c.y,u.x,u.y),this.line(c.x,c.y-5,c.x,c.y+5),this.line(u.x,u.y-5,u.x,u.y+5),this.ctx.fillText(r,(c.x+u.x)/2,c.y-13)):(c.x+=a,u.x+=a,this.line(c.x,c.y,u.x,u.y),this.line(c.x-5,c.y,c.x+5,c.y),this.line(u.x-5,u.y,u.x+5,u.y),this.ctx.translate(c.x-16,(c.y+u.y)/2),this.ctx.rotate(-Math.PI/2),this.ctx.fillText(r,0,0)),this.ctx.restore()}line(t,e,i,s){this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(i,s),this.ctx.stroke()}drawArrow(t,e,i,s){const r=Math.atan2(s-e,i-t),a=7;this.line(t,e,i,s),this.ctx.beginPath(),this.ctx.moveTo(i,s),this.ctx.lineTo(i-a*Math.cos(r-Math.PI/6),s-a*Math.sin(r-Math.PI/6)),this.ctx.lineTo(i-a*Math.cos(r+Math.PI/6),s-a*Math.sin(r+Math.PI/6)),this.ctx.closePath(),this.ctx.fill()}drawExtension(t,e,i,s,r){const a=_e(this.state,t,e),o=_e(this.state,i,s);this.ctx.save(),this.ctx.strokeStyle=r,this.ctx.lineWidth=1,this.ctx.setLineDash([4,4]),this.line(a.x,a.y,o.x,o.y),this.ctx.restore()}drawAnchorDot(t,e,i="#ffffff",s="#4152a3"){const r=_e(this.state,t,e);this.ctx.save(),this.ctx.fillStyle=i,this.ctx.strokeStyle=s,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(r.x,r.y,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}drawLayoutAnchorDot(t,e,i){this.ctx.save(),this.ctx.setLineDash([]),this.ctx.fillStyle="#ffffff",this.ctx.strokeStyle=i,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(t,e,4,0,Math.PI*2),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore()}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uo="184",zn={ROTATE:0,DOLLY:1,PAN:2},ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fu=0,Rl=1,pu=2,cr=1,mu=2,ms=3,ci=0,Ye=1,On=2,Gn=0,qi=1,Cl=2,Pl=3,Il=4,gu=5,xi=100,_u=101,xu=102,vu=103,Mu=104,Su=200,yu=201,bu=202,Eu=203,Ra=204,Ca=205,Tu=206,Au=207,wu=208,Ru=209,Cu=210,Pu=211,Iu=212,Lu=213,Du=214,Pa=0,Ia=1,La=2,Qi=3,Da=4,Ua=5,Na=6,Fa=7,_d=0,Uu=1,Nu=2,bn=0,xd=1,vd=2,Md=3,Sd=4,yd=5,bd=6,Ed=7,Td=300,wi=301,ts=302,Vr=303,Wr=304,Cr=306,Oa=1e3,Bn=1001,Ba=1002,Ue=1003,Fu=1004,Us=1005,ze=1006,Xr=1007,Mi=1008,tn=1009,Ad=1010,wd=1011,Ss=1012,No=1013,An=1014,Sn=1015,Xn=1016,Fo=1017,Oo=1018,ys=1020,Rd=35902,Cd=35899,Pd=1021,Id=1022,un=1023,$n=1026,Si=1027,Ld=1028,Bo=1029,Ri=1030,ko=1031,zo=1033,dr=33776,hr=33777,ur=33778,fr=33779,ka=35840,za=35841,Ga=35842,Ha=35843,Va=36196,Wa=37492,Xa=37496,$a=37488,Ya=37489,_r=37490,qa=37491,ja=37808,Ka=37809,Za=37810,Ja=37811,Qa=37812,to=37813,eo=37814,no=37815,io=37816,so=37817,ro=37818,ao=37819,oo=37820,lo=37821,co=36492,ho=36494,uo=36495,fo=36283,po=36284,xr=36285,mo=36286,Ou=3200,go=0,Bu=1,si="",Qe="srgb",vr="srgb-linear",Mr="linear",se="srgb",Ii=7680,Ll=519,ku=512,zu=513,Gu=514,Go=515,Hu=516,Vu=517,Ho=518,Wu=519,Dl=35044,Ul="300 es",yn=2e3,bs=2001;function Xu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Sr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function $u(){const n=Sr("canvas");return n.style.display="block",n}const Nl={};function Fl(...n){const t="THREE."+n.shift();console.log(t,...n)}function Dd(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Lt(...n){n=Dd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function ne(...n){n=Dd(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function _o(...n){const t=n.join(" ");t in Nl||(Nl[t]=!0,Lt(...n))}function Yu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const qu={[Pa]:Ia,[La]:Na,[Da]:Fa,[Qi]:Ua,[Ia]:Pa,[Na]:La,[Fa]:Da,[Ua]:Qi};class ui{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vs=Math.PI/180,xo=180/Math.PI;function As(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]).toLowerCase()}function qt(n,t,e){return Math.max(t,Math.min(e,n))}function ju(n,t){return(n%t+t)%t}function $r(n,t,e){return(1-e)*n+e*t}function as(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function We(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ku={DEG2RAD:vs},hl=class hl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};hl.prototype.isVector2=!0;let Ht=hl;class di{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],m=r[a+1],_=r[a+2],S=r[a+3];if(f!==S||l!==h||c!==m||u!==_){let g=l*h+c*m+u*_+f*S;g<0&&(h=-h,m=-m,_=-_,S=-S,g=-g);let p=1-o;if(g<.9995){const y=Math.acos(g),T=Math.sin(y);p=Math.sin(p*y)/T,o=Math.sin(o*y)/T,l=l*p+h*o,c=c*p+m*o,u=u*p+_*o,f=f*p+S*o}else{l=l*p+h*o,c=c*p+m*o,u=u*p+_*o,f=f*p+S*o;const y=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=y,c*=y,u*=y,f*=y}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],h=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+u*f+l*m-c*h,t[e+1]=l*_+u*h+c*f-o*m,t[e+2]=c*_+u*m+o*h-l*f,t[e+3]=u*_-o*f-l*h-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),h=l(i/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*m*_,this._y=c*m*f-h*u*_,this._z=c*u*_+h*m*f,this._w=c*u*f-h*m*_;break;case"YXZ":this._x=h*u*f+c*m*_,this._y=c*m*f-h*u*_,this._z=c*u*_-h*m*f,this._w=c*u*f+h*m*_;break;case"ZXY":this._x=h*u*f-c*m*_,this._y=c*m*f+h*u*_,this._z=c*u*_+h*m*f,this._w=c*u*f-h*m*_;break;case"ZYX":this._x=h*u*f-c*m*_,this._y=c*m*f+h*u*_,this._z=c*u*_-h*m*f,this._w=c*u*f+h*m*_;break;case"YZX":this._x=h*u*f+c*m*_,this._y=c*m*f+h*u*_,this._z=c*u*_-h*m*f,this._w=c*u*f-h*m*_;break;case"XZY":this._x=h*u*f-c*m*_,this._y=c*m*f-h*u*_,this._z=c*u*_+h*m*f,this._w=c*u*f+h*m*_;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+o+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ul=class ul{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ol.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ol.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yr.copy(this).projectOnVector(t),this.sub(Yr)}reflect(t){return this.sub(Yr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ul.prototype.isVector3=!0;let F=ul;const Yr=new F,Ol=new di,fl=class fl{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],m=i[5],_=i[8],S=s[0],g=s[3],p=s[6],y=s[1],T=s[4],w=s[7],L=s[2],A=s[5],D=s[8];return r[0]=a*S+o*y+l*L,r[3]=a*g+o*T+l*A,r[6]=a*p+o*w+l*D,r[1]=c*S+u*y+f*L,r[4]=c*g+u*T+f*A,r[7]=c*p+u*w+f*D,r[2]=h*S+m*y+_*L,r[5]=h*g+m*T+_*A,r[8]=h*p+m*w+_*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*r,m=c*r-a*l,_=e*f+i*h+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return t[0]=f*S,t[1]=(s*c-u*i)*S,t[2]=(o*i-s*a)*S,t[3]=h*S,t[4]=(u*e-s*l)*S,t[5]=(s*r-o*e)*S,t[6]=m*S,t[7]=(i*l-c*e)*S,t[8]=(a*e-i*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(qr.makeScale(t,e)),this}rotate(t){return this.premultiply(qr.makeRotation(-t)),this}translate(t,e){return this.premultiply(qr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};fl.prototype.isMatrix3=!0;let kt=fl;const qr=new kt,Bl=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zu(){const n={enabled:!0,workingColorSpace:vr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===se&&(s.r=Hn(s.r),s.g=Hn(s.g),s.b=Hn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===se&&(s.r=ji(s.r),s.g=ji(s.g),s.b=ji(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===si?Mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _o("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _o("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[vr]:{primaries:t,whitePoint:i,transfer:Mr,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:t,whitePoint:i,transfer:se,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}}),n}const Jt=Zu();function Hn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ji(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Li;class Ju{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Li===void 0&&(Li=Sr("canvas")),Li.width=t.width,Li.height=t.height;const s=Li.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Li}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Sr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Hn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Hn(e[i]/255)*255):e[i]=Hn(e[i]);return{data:e,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Qu=0;class Vo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=As(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(jr(s[a].image)):r.push(jr(s[a]))}else r=jr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function jr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ju.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}let tf=0;const Kr=new F;class He extends ui{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,i=Bn,s=Bn,r=ze,a=Mi,o=un,l=tn,c=He.DEFAULT_ANISOTROPY,u=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=As(),this.name="",this.source=new Vo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kr).x}get height(){return this.source.getSize(Kr).y}get depth(){return this.source.getSize(Kr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Lt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Lt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Td)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Oa:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case Ba:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Oa:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case Ba:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Td;He.DEFAULT_ANISOTROPY=1;const pl=class pl{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],m=l[5],_=l[9],S=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-S)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+S)<.1&&Math.abs(_+g)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,w=(m+1)/2,L=(p+1)/2,A=(u+h)/4,D=(f+S)/4,M=(_+g)/4;return T>w&&T>L?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=A/i,r=D/i):w>L?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=A/s,r=M/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=D/r,s=M/r),this.set(i,s,r,e),this}let y=Math.sqrt((g-_)*(g-_)+(f-S)*(f-S)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(g-_)/y,this.y=(f-S)/y,this.z=(h-u)/y,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};pl.prototype.isVector4=!0;let Se=pl;class ef extends ui{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new He(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Vo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends ef{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Ud extends He{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class nf extends He{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ar=class Ar{constructor(t,e,i,s,r,a,o,l,c,u,f,h,m,_,S,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,f,h,m,_,S,g)}set(t,e,i,s,r,a,o,l,c,u,f,h,m,_,S,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=m,p[7]=_,p[11]=S,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ar().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/Di.setFromMatrixColumn(t,0).length(),r=1/Di.setFromMatrixColumn(t,1).length(),a=1/Di.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=a*u,m=a*f,_=o*u,S=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=m+_*c,e[5]=h-S*c,e[9]=-o*l,e[2]=S-h*c,e[6]=_+m*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*u,m=l*f,_=c*u,S=c*f;e[0]=h+S*o,e[4]=_*o-m,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=m*o-_,e[6]=S+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*u,m=l*f,_=c*u,S=c*f;e[0]=h-S*o,e[4]=-a*f,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*u,e[9]=S-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*u,m=a*f,_=o*u,S=o*f;e[0]=l*u,e[4]=_*c-m,e[8]=h*c+S,e[1]=l*f,e[5]=S*c+h,e[9]=m*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,m=a*c,_=o*l,S=o*c;e[0]=l*u,e[4]=S-h*f,e[8]=_*f+m,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=m*f+_,e[10]=h-S*f}else if(t.order==="XZY"){const h=a*l,m=a*c,_=o*l,S=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+S,e[5]=a*u,e[9]=m*f-_,e[2]=_*f-m,e[6]=o*u,e[10]=S*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sf,t,rf)}lookAt(t,e,i){const s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Zn.crossVectors(i,Ze),Zn.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Zn.crossVectors(i,Ze)),Zn.normalize(),Ns.crossVectors(Ze,Zn),s[0]=Zn.x,s[4]=Ns.x,s[8]=Ze.x,s[1]=Zn.y,s[5]=Ns.y,s[9]=Ze.y,s[2]=Zn.z,s[6]=Ns.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],m=i[13],_=i[2],S=i[6],g=i[10],p=i[14],y=i[3],T=i[7],w=i[11],L=i[15],A=s[0],D=s[4],M=s[8],R=s[12],B=s[1],P=s[5],H=s[9],Y=s[13],j=s[2],O=s[6],W=s[10],X=s[14],nt=s[3],it=s[7],ft=s[11],bt=s[15];return r[0]=a*A+o*B+l*j+c*nt,r[4]=a*D+o*P+l*O+c*it,r[8]=a*M+o*H+l*W+c*ft,r[12]=a*R+o*Y+l*X+c*bt,r[1]=u*A+f*B+h*j+m*nt,r[5]=u*D+f*P+h*O+m*it,r[9]=u*M+f*H+h*W+m*ft,r[13]=u*R+f*Y+h*X+m*bt,r[2]=_*A+S*B+g*j+p*nt,r[6]=_*D+S*P+g*O+p*it,r[10]=_*M+S*H+g*W+p*ft,r[14]=_*R+S*Y+g*X+p*bt,r[3]=y*A+T*B+w*j+L*nt,r[7]=y*D+T*P+w*O+L*it,r[11]=y*M+T*H+w*W+L*ft,r[15]=y*R+T*Y+w*X+L*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],m=t[14],_=t[3],S=t[7],g=t[11],p=t[15],y=l*m-c*h,T=o*m-c*f,w=o*h-l*f,L=a*m-c*u,A=a*h-l*u,D=a*f-o*u;return e*(S*y-g*T+p*w)-i*(_*y-g*L+p*A)+s*(_*T-S*L+p*D)-r*(_*w-S*A+g*D)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],m=t[11],_=t[12],S=t[13],g=t[14],p=t[15],y=e*o-i*a,T=e*l-s*a,w=e*c-r*a,L=i*l-s*o,A=i*c-r*o,D=s*c-r*l,M=u*S-f*_,R=u*g-h*_,B=u*p-m*_,P=f*g-h*S,H=f*p-m*S,Y=h*p-m*g,j=y*Y-T*H+w*P+L*B-A*R+D*M;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/j;return t[0]=(o*Y-l*H+c*P)*O,t[1]=(s*H-i*Y-r*P)*O,t[2]=(S*D-g*A+p*L)*O,t[3]=(h*A-f*D-m*L)*O,t[4]=(l*B-a*Y-c*R)*O,t[5]=(e*Y-s*B+r*R)*O,t[6]=(g*w-_*D-p*T)*O,t[7]=(u*D-h*w+m*T)*O,t[8]=(a*H-o*B+c*M)*O,t[9]=(i*B-e*H-r*M)*O,t[10]=(_*A-S*w+p*y)*O,t[11]=(f*w-u*A-m*y)*O,t[12]=(o*R-a*P-l*M)*O,t[13]=(e*P-i*R+s*M)*O,t[14]=(S*T-_*L-g*y)*O,t[15]=(u*L-f*T+h*y)*O,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,f=o+o,h=r*c,m=r*u,_=r*f,S=a*u,g=a*f,p=o*f,y=l*c,T=l*u,w=l*f,L=i.x,A=i.y,D=i.z;return s[0]=(1-(S+p))*L,s[1]=(m+w)*L,s[2]=(_-T)*L,s[3]=0,s[4]=(m-w)*A,s[5]=(1-(h+p))*A,s[6]=(g+y)*A,s[7]=0,s[8]=(_+T)*D,s[9]=(g-y)*D,s[10]=(1-(h+S))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Di.set(s[0],s[1],s[2]).length();const o=Di.set(s[4],s[5],s[6]).length(),l=Di.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ln.copy(this);const c=1/a,u=1/o,f=1/l;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=f,ln.elements[9]*=f,ln.elements[10]*=f,e.setFromRotationMatrix(ln),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=yn,l=!1){const c=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),m=(i+s)/(i-s);let _,S;if(l)_=r/(a-r),S=a*r/(a-r);else if(o===yn)_=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===bs)_=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=yn,l=!1){const c=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),m=-(i+s)/(i-s);let _,S;if(l)_=1/(a-r),S=a/(a-r);else if(o===yn)_=-2/(a-r),S=-(a+r)/(a-r);else if(o===bs)_=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Ar.prototype.isMatrix4=!0;let ye=Ar;const Di=new F,ln=new ye,sf=new F(0,0,0),rf=new F(1,1,1),Zn=new F,Ns=new F,Ze=new F,zl=new ye,Gl=new di;class hi{constructor(t=0,e=0,i=0,s=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return zl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Gl.setFromEuler(this),this.setFromQuaternion(Gl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class Nd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let af=0;const Hl=new F,Ui=new di,In=new ye,Fs=new F,os=new F,of=new F,lf=new di,Vl=new F(1,0,0),Wl=new F(0,1,0),Xl=new F(0,0,1),$l={type:"added"},cf={type:"removed"},Ni={type:"childadded",child:null},Zr={type:"childremoved",child:null};class Ne extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=As(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ne.DEFAULT_UP.clone();const t=new F,e=new hi,i=new di,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new kt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=Ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.premultiply(Ui),this}rotateX(t){return this.rotateOnAxis(Vl,t)}rotateY(t){return this.rotateOnAxis(Wl,t)}rotateZ(t){return this.rotateOnAxis(Xl,t)}translateOnAxis(t,e){return Hl.copy(t).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vl,t)}translateY(t){return this.translateOnAxis(Wl,t)}translateZ(t){return this.translateOnAxis(Xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Fs.copy(t):Fs.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(os,Fs,this.up):In.lookAt(Fs,os,this.up),this.quaternion.setFromRotationMatrix(In),s&&(In.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(In),this.quaternion.premultiply(Ui.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ne("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($l),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null):ne("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cf),Zr.child=t,this.dispatchEvent(Zr),Zr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),In.multiply(t.parent.matrixWorld)),t.applyMatrix4(In),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($l),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,t,of),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,lf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ne.DEFAULT_UP=new F(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class gs extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}}const df={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const S of t.hand.values()){const g=e.getJointPose(S,i),p=this._getHandJoint(c,S);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,_=.005;c.inputState.pinching&&h>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(df)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new gs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Os={h:0,s:0,l:0};function Qr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Qt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Jt.workingColorSpace){if(t=ju(t,1),e=qt(e,0,1),i=qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Qr(a,r,t+1/3),this.g=Qr(a,r,t),this.b=Qr(a,r,t-1/3)}return Jt.colorSpaceToWorking(this,s),this}setStyle(t,e=Qe){function i(r){r!==void 0&&parseFloat(r)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Lt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const i=Fd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=ji(t.r),this.g=ji(t.g),this.b=ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return Jt.workingToColorSpace(ke.copy(this),t),Math.round(qt(ke.r*255,0,255))*65536+Math.round(qt(ke.g*255,0,255))*256+Math.round(qt(ke.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(ke.copy(this),e);const i=ke.r,s=ke.g,r=ke.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=Qe){Jt.workingToColorSpace(ke.copy(this),t);const e=ke.r,i=ke.g,s=ke.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Os);const i=$r(Jn.h,Os.h,e),s=$r(Jn.s,Os.s,e),r=$r(Jn.l,Os.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ke=new Qt;Qt.NAMES=Fd;class hf extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const cn=new F,Ln=new F,ta=new F,Dn=new F,Fi=new F,Oi=new F,Yl=new F,ea=new F,na=new F,ia=new F,sa=new Se,ra=new Se,aa=new Se;class rn{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){cn.subVectors(s,e),Ln.subVectors(i,e),ta.subVectors(t,e);const a=cn.dot(cn),o=cn.dot(Ln),l=cn.dot(ta),c=Ln.dot(Ln),u=Ln.dot(ta),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,m=(c*l-o*u)*h,_=(a*u-o*l)*h;return r.set(1-m-_,_,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return sa.setScalar(0),ra.setScalar(0),aa.setScalar(0),sa.fromBufferAttribute(t,e),ra.fromBufferAttribute(t,i),aa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(sa,r.x),a.addScaledVector(ra,r.y),a.addScaledVector(aa,r.z),a}static isFrontFacing(t,e,i,s){return cn.subVectors(i,e),Ln.subVectors(t,e),cn.cross(Ln).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),cn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Fi.subVectors(s,i),Oi.subVectors(r,i),ea.subVectors(t,i);const l=Fi.dot(ea),c=Oi.dot(ea);if(l<=0&&c<=0)return e.copy(i);na.subVectors(t,s);const u=Fi.dot(na),f=Oi.dot(na);if(u>=0&&f<=u)return e.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(Fi,a);ia.subVectors(t,r);const m=Fi.dot(ia),_=Oi.dot(ia);if(_>=0&&m<=_)return e.copy(r);const S=m*c-l*_;if(S<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(Oi,o);const g=u*_-m*f;if(g<=0&&f-u>=0&&m-_>=0)return Yl.subVectors(r,s),o=(f-u)/(f-u+(m-_)),e.copy(s).addScaledVector(Yl,o);const p=1/(g+S+h);return a=S*p,o=h*p,e.copy(i).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class ws{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Bs.copy(i.boundingBox)),Bs.applyMatrix4(t.matrixWorld),this.union(Bs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ls),ks.subVectors(this.max,ls),Bi.subVectors(t.a,ls),ki.subVectors(t.b,ls),zi.subVectors(t.c,ls),Qn.subVectors(ki,Bi),ti.subVectors(zi,ki),pi.subVectors(Bi,zi);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-pi.z,pi.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,pi.z,0,-pi.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-pi.y,pi.x,0];return!oa(e,Bi,ki,zi,ks)||(e=[1,0,0,0,1,0,0,0,1],!oa(e,Bi,ki,zi,ks))?!1:(zs.crossVectors(Qn,ti),e=[zs.x,zs.y,zs.z],oa(e,Bi,ki,zi,ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Un=[new F,new F,new F,new F,new F,new F,new F,new F],dn=new F,Bs=new ws,Bi=new F,ki=new F,zi=new F,Qn=new F,ti=new F,pi=new F,ls=new F,ks=new F,zs=new F,mi=new F;function oa(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){mi.fromArray(n,r);const o=s.x*Math.abs(mi.x)+s.y*Math.abs(mi.y)+s.z*Math.abs(mi.z),l=t.dot(mi),c=e.dot(mi),u=i.dot(mi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const we=new F,Gs=new Ht;let uf=0;class Tn extends ui{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Dl,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Gs.fromBufferAttribute(this,e),Gs.applyMatrix3(t),this.setXY(e,Gs.x,Gs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=as(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=We(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=as(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=as(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=as(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=as(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),s=We(s,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Dl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Od extends Tn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Bd extends Tn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class qe extends Tn{constructor(t,e,i){super(new Float32Array(t),e,i)}}const ff=new ws,cs=new F,la=new F;class Pr{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ff.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cs.subVectors(t,this.center);const e=cs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(cs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(la.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cs.copy(t.center).add(la)),this.expandByPoint(cs.copy(t.center).sub(la))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let pf=0;const nn=new ye,ca=new Ne,Gi=new F,Je=new ws,ds=new ws,De=new F;class on extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=As(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xu(t)?Bd:Od)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,i){return nn.makeTranslation(t,e,i),this.applyMatrix4(nn),this}scale(t,e,i){return nn.makeScale(t,e,i),this.applyMatrix4(nn),this}lookAt(t){return ca.lookAt(t),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qe(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ws);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ds.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(Je.min,ds.min),Je.expandByPoint(De),De.addVectors(Je.max,ds.max),Je.expandByPoint(De)):(Je.expandByPoint(ds.min),Je.expandByPoint(ds.max))}Je.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)De.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(De));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)De.fromBufferAttribute(o,c),l&&(Gi.fromBufferAttribute(t,c),De.add(Gi)),s=Math.max(s,i.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let M=0;M<i.count;M++)o[M]=new F,l[M]=new F;const c=new F,u=new F,f=new F,h=new Ht,m=new Ht,_=new Ht,S=new F,g=new F;function p(M,R,B){c.fromBufferAttribute(i,M),u.fromBufferAttribute(i,R),f.fromBufferAttribute(i,B),h.fromBufferAttribute(r,M),m.fromBufferAttribute(r,R),_.fromBufferAttribute(r,B),u.sub(c),f.sub(c),m.sub(h),_.sub(h);const P=1/(m.x*_.y-_.x*m.y);isFinite(P)&&(S.copy(u).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(P),g.copy(f).multiplyScalar(m.x).addScaledVector(u,-_.x).multiplyScalar(P),o[M].add(S),o[R].add(S),o[B].add(S),l[M].add(g),l[R].add(g),l[B].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let M=0,R=y.length;M<R;++M){const B=y[M],P=B.start,H=B.count;for(let Y=P,j=P+H;Y<j;Y+=3)p(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}const T=new F,w=new F,L=new F,A=new F;function D(M){L.fromBufferAttribute(s,M),A.copy(L);const R=o[M];T.copy(R),T.sub(L.multiplyScalar(L.dot(R))).normalize(),w.crossVectors(A,R);const P=w.dot(l[M])<0?-1:1;a.setXYZW(M,T.x,T.y,T.z,P)}for(let M=0,R=y.length;M<R;++M){const B=y[M],P=B.start,H=B.count;for(let Y=P,j=P+H;Y<j;Y+=3)D(t.getX(Y+0)),D(t.getX(Y+1)),D(t.getX(Y+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,u=new F,f=new F;if(t)for(let h=0,m=t.count;h<m;h+=3){const _=t.getX(h+0),S=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,g),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let m=0,_=0;for(let S=0,g=l.length;S<g;S++){o.isInterleavedBufferAttribute?m=l[S]*o.data.stride+o.offset:m=l[S]*u;for(let p=0;p<u;p++)h[_++]=c[m++]}return new Tn(h,u,f)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new on,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],m=t(h,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const m=c[f];u.push(m.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let mf=0;class is extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=As(),this.name="",this.type="Material",this.blending=qi,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ra,this.blendDst=Ca,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Lt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Lt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==qi&&(i.blending=this.blending),this.side!==ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ra&&(i.blendSrc=this.blendSrc),this.blendDst!==Ca&&(i.blendDst=this.blendDst),this.blendEquation!==xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ll&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Nn=new F,da=new F,Hs=new F,ei=new F,ha=new F,Vs=new F,ua=new F;class Wo{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){da.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),ei.copy(this.origin).sub(da);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Hs),o=ei.dot(this.direction),l=-ei.dot(Hs),c=ei.lengthSq(),u=Math.abs(1-a*a);let f,h,m,_;if(u>0)if(f=a*l-o,h=a*o-l,_=r*u,f>=0)if(h>=-_)if(h<=_){const S=1/u;f*=S,h*=S,m=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),m=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-r,-l),r),m=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),m=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(da).addScaledVector(Hs,h),m}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);const i=Nn.dot(this.direction),s=Nn.dot(Nn)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,i,s,r){ha.subVectors(e,t),Vs.subVectors(i,t),ua.crossVectors(ha,Vs);let a=this.direction.dot(ua),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ei.subVectors(this.origin,t);const l=o*this.direction.dot(Vs.crossVectors(ei,Vs));if(l<0)return null;const c=o*this.direction.dot(ha.cross(ei));if(c<0||l+c>a)return null;const u=-o*ei.dot(ua);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kd extends is{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=_d,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ql=new ye,gi=new Wo,Ws=new Pr,jl=new F,Xs=new F,$s=new F,Ys=new F,fa=new F,qs=new F,Kl=new F,js=new F;class wn extends Ne{constructor(t=new on,e=new kd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(fa.fromBufferAttribute(f,t),a?qs.addScaledVector(fa,u):qs.addScaledVector(fa.sub(e),u))}e.add(qs)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ws.copy(i.boundingSphere),Ws.applyMatrix4(r),gi.copy(t.ray).recast(t.near),!(Ws.containsPoint(gi.origin)===!1&&(gi.intersectSphere(Ws,jl)===null||gi.origin.distanceToSquared(jl)>(t.far-t.near)**2))&&(ql.copy(r).invert(),gi.copy(t.ray).applyMatrix4(ql),!(i.boundingBox!==null&&gi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,gi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=h.length;_<S;_++){const g=h[_],p=a[g.materialIndex],y=Math.max(g.start,m.start),T=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let w=y,L=T;w<L;w+=3){const A=o.getX(w),D=o.getX(w+1),M=o.getX(w+2);s=Ks(this,p,t,i,c,u,f,A,D,M),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let g=_,p=S;g<p;g+=3){const y=o.getX(g),T=o.getX(g+1),w=o.getX(g+2);s=Ks(this,a,t,i,c,u,f,y,T,w),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,S=h.length;_<S;_++){const g=h[_],p=a[g.materialIndex],y=Math.max(g.start,m.start),T=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let w=y,L=T;w<L;w+=3){const A=w,D=w+1,M=w+2;s=Ks(this,p,t,i,c,u,f,A,D,M),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),S=Math.min(l.count,m.start+m.count);for(let g=_,p=S;g<p;g+=3){const y=g,T=g+1,w=g+2;s=Ks(this,a,t,i,c,u,f,y,T,w),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function gf(n,t,e,i,s,r,a,o){let l;if(t.side===Ye?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ci,o),l===null)return null;js.copy(o),js.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(js);return c<e.near||c>e.far?null:{distance:c,point:js.clone(),object:n}}function Ks(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Xs),n.getVertexPosition(l,$s),n.getVertexPosition(c,Ys);const u=gf(n,t,e,i,Xs,$s,Ys,Kl);if(u){const f=new F;rn.getBarycoord(Kl,Xs,$s,Ys,f),s&&(u.uv=rn.getInterpolatedAttribute(s,o,l,c,f,new Ht)),r&&(u.uv1=rn.getInterpolatedAttribute(r,o,l,c,f,new Ht)),a&&(u.normal=rn.getInterpolatedAttribute(a,o,l,c,f,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new F,materialIndex:0};rn.getNormal(Xs,$s,Ys,h.normal),u.face=h,u.barycoord=f}return u}class _f extends He{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Ue,u=Ue,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const pa=new F,xf=new F,vf=new kt;class ii{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=pa.subVectors(i,e).cross(xf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(pa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||vf.getNormalMatrix(t),s=this.coplanarPoint(pa).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new Pr,Mf=new Ht(.5,.5),Zs=new F;class Xo{constructor(t=new ii,e=new ii,i=new ii,s=new ii,r=new ii,a=new ii){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=yn,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],m=r[7],_=r[8],S=r[9],g=r[10],p=r[11],y=r[12],T=r[13],w=r[14],L=r[15];if(s[0].setComponents(c-a,m-u,p-_,L-y).normalize(),s[1].setComponents(c+a,m+u,p+_,L+y).normalize(),s[2].setComponents(c+o,m+f,p+S,L+T).normalize(),s[3].setComponents(c-o,m-f,p-S,L-T).normalize(),i)s[4].setComponents(l,h,g,w).normalize(),s[5].setComponents(c-l,m-h,p-g,L-w).normalize();else if(s[4].setComponents(c-l,m-h,p-g,L-w).normalize(),e===yn)s[5].setComponents(c+l,m+h,p+g,L+w).normalize();else if(e===bs)s[5].setComponents(l,h,g,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(t){_i.center.set(0,0,0);const e=Mf.distanceTo(t.center);return _i.radius=.7071067811865476+e,_i.applyMatrix4(t.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Zs.x=s.normal.x>0?t.max.x:t.min.x,Zs.y=s.normal.y>0?t.max.y:t.min.y,Zs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $o extends is{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const yr=new F,br=new F,Zl=new ye,hs=new Wo,Js=new Pr,ma=new F,Jl=new F;class Sf extends Ne{constructor(t=new on,e=new $o){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)yr.fromBufferAttribute(e,s-1),br.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=yr.distanceTo(br);t.setAttribute("lineDistance",new qe(i,1))}else Lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Js.copy(i.boundingSphere),Js.applyMatrix4(s),Js.radius+=r,t.ray.intersectsSphere(Js)===!1)return;Zl.copy(s).invert(),hs.copy(t.ray).applyMatrix4(Zl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let S=m,g=_-1;S<g;S+=c){const p=u.getX(S),y=u.getX(S+1),T=Qs(this,t,hs,l,p,y,S);T&&e.push(T)}if(this.isLineLoop){const S=u.getX(_-1),g=u.getX(m),p=Qs(this,t,hs,l,S,g,_-1);p&&e.push(p)}}else{const m=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let S=m,g=_-1;S<g;S+=c){const p=Qs(this,t,hs,l,S,S+1,S);p&&e.push(p)}if(this.isLineLoop){const S=Qs(this,t,hs,l,_-1,m,_-1);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Qs(n,t,e,i,s,r,a){const o=n.geometry.attributes.position;if(yr.fromBufferAttribute(o,s),br.fromBufferAttribute(o,r),e.distanceSqToSegment(yr,br,ma,Jl)>i)return;ma.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ma);if(!(c<t.near||c>t.far))return{distance:c,point:Jl.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Ql=new F,tc=new F;class zd extends Sf{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Ql.fromBufferAttribute(e,s),tc.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ql.distanceTo(tc);t.setAttribute("lineDistance",new qe(i,1))}else Lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Gd extends He{constructor(t=[],e=wi,i,s,r,a,o,l,c,u){super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class es extends He{constructor(t,e,i=An,s,r,a,o=Ue,l=Ue,c,u=$n,f=1){if(u!==$n&&u!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Vo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class yf extends es{constructor(t,e=An,i=wi,s,r,a=Ue,o=Ue,l,c=$n){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Hd extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ss extends on{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,m=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new qe(c,3)),this.setAttribute("normal",new qe(u,3)),this.setAttribute("uv",new qe(f,2));function _(S,g,p,y,T,w,L,A,D,M,R){const B=w/D,P=L/M,H=w/2,Y=L/2,j=A/2,O=D+1,W=M+1;let X=0,nt=0;const it=new F;for(let ft=0;ft<W;ft++){const bt=ft*P-Y;for(let wt=0;wt<O;wt++){const te=wt*B-H;it[S]=te*y,it[g]=bt*T,it[p]=j,c.push(it.x,it.y,it.z),it[S]=0,it[g]=0,it[p]=A>0?1:-1,u.push(it.x,it.y,it.z),f.push(wt/D),f.push(1-ft/M),X+=1}}for(let ft=0;ft<M;ft++)for(let bt=0;bt<D;bt++){const wt=h+bt+O*ft,te=h+bt+O*(ft+1),re=h+(bt+1)+O*(ft+1),Vt=h+(bt+1)+O*ft;l.push(wt,te,Vt),l.push(te,re,Vt),nt+=6}o.addGroup(m,nt,R),m+=nt,h+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const tr=new F,er=new F,ga=new F,nr=new rn;class bf extends on{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(vs*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},m=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:S,b:g,c:p}=nr;if(S.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),nr.getNormal(ga),f[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,f[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,f[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let y=0;y<3;y++){const T=(y+1)%3,w=f[y],L=f[T],A=nr[u[y]],D=nr[u[T]],M=`${w}_${L}`,R=`${L}_${w}`;R in h&&h[R]?(ga.dot(h[R].normal)<=r&&(m.push(A.x,A.y,A.z),m.push(D.x,D.y,D.z)),h[R]=null):M in h||(h[M]={index0:c[y],index1:c[T],normal:ga.clone()})}}for(const _ in h)if(h[_]){const{index0:S,index1:g}=h[_];tr.fromBufferAttribute(o,S),er.fromBufferAttribute(o,g),m.push(tr.x,tr.y,tr.z),m.push(er.x,er.y,er.z)}this.setAttribute("position",new qe(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ir extends on{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=t/o,h=e/l,m=[],_=[],S=[],g=[];for(let p=0;p<u;p++){const y=p*h-a;for(let T=0;T<c;T++){const w=T*f-r;_.push(w,-y,0),S.push(0,0,1),g.push(T/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const T=y+c*p,w=y+c*(p+1),L=y+1+c*(p+1),A=y+1+c*p;m.push(T,w,A),m.push(w,L,A)}this.setIndex(m),this.setAttribute("position",new qe(_,3)),this.setAttribute("normal",new qe(S,3)),this.setAttribute("uv",new qe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ir(t.width,t.height,t.widthSegments,t.heightSegments)}}function ns(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(ec(s))s.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(ec(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Ge(n){const t={};for(let e=0;e<n.length;e++){const i=ns(n[e]);for(const s in i)t[s]=i[s]}return t}function ec(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Ef(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Vd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Tf={clone:ns,merge:Ge};var Af=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends is{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Af,this.fragmentShader=wf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ns(t.uniforms),this.uniformsGroups=Ef(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Rf extends Rn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Cf extends is{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=go,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Pf extends is{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class If extends is{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Wd extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const _a=new ye,nc=new F,ic=new F;class Lf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xo,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;nc.setFromMatrixPosition(t.matrixWorld),e.position.copy(nc),ic.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ic),e.updateMatrixWorld(),_a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_a,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===bs||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ir=new F,sr=new di,gn=new F;class Xd extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ir,sr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ir,sr,gn.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(ir,sr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ir,sr,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ni=new F,sc=new Ht,rc=new Ht;class hn extends Xd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=xo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xo*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ni.x,ni.y).multiplyScalar(-t/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ni.x,ni.y).multiplyScalar(-t/ni.z)}getViewSize(t,e){return this.getViewBounds(t,sc,rc),e.subVectors(rc,sc)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Lr extends Xd{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Df extends Lf{constructor(){super(new Lr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ac extends Wd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new Df}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Uf extends Wd{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Hi=-90,Vi=1;class Nf extends Ne{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(Hi,Vi,t,e);s.layers=this.layers,this.add(s);const r=new hn(Hi,Vi,t,e);r.layers=this.layers,this.add(r);const a=new hn(Hi,Vi,t,e);a.layers=this.layers,this.add(a);const o=new hn(Hi,Vi,t,e);o.layers=this.layers,this.add(o);const l=new hn(Hi,Vi,t,e);l.layers=this.layers,this.add(l);const c=new hn(Hi,Vi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===yn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,m),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Ff extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class oc{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const ml=class ml{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};ml.prototype.isMatrix2=!0;let lc=ml;class Of extends zd{constructor(t=10,e=10,i=4473924,s=8947848){i=new Qt(i),s=new Qt(s);const r=e/2,a=t/e,o=t/2,l=[],c=[];for(let h=0,m=0,_=-o;h<=e;h++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const S=h===r?i:s;S.toArray(c,m),m+=3,S.toArray(c,m),m+=3,S.toArray(c,m),m+=3,S.toArray(c,m),m+=3}const u=new on;u.setAttribute("position",new qe(l,3)),u.setAttribute("color",new qe(c,3));const f=new $o({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Bf extends ui{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Lt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function cc(n,t,e,i){const s=kf(i);switch(e){case Pd:return n*t;case Ld:return n*t/s.components*s.byteLength;case Bo:return n*t/s.components*s.byteLength;case Ri:return n*t*2/s.components*s.byteLength;case ko:return n*t*2/s.components*s.byteLength;case Id:return n*t*3/s.components*s.byteLength;case un:return n*t*4/s.components*s.byteLength;case zo:return n*t*4/s.components*s.byteLength;case dr:case hr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ur:case fr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case za:case Ha:return Math.max(n,16)*Math.max(t,8)/4;case ka:case Ga:return Math.max(n,8)*Math.max(t,8)/2;case Va:case Wa:case $a:case Ya:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Xa:case _r:case qa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ja:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case to:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case eo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case no:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case io:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case so:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ro:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ao:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case oo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case lo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case co:case ho:case uo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case fo:case po:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xr:case mo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kf(n){switch(n){case tn:case Ad:return{byteLength:1,components:1};case Ss:case wd:case Xn:return{byteLength:2,components:1};case Fo:case Oo:return{byteLength:2,components:4};case An:case No:case Sn:return{byteLength:4,components:1};case Rd:case Cd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $d(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function zf(n){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<f.length;m++){const _=f[h],S=f[m];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++h,f[h]=S)}f.length=h+1;for(let m=0,_=f.length;m<_;m++){const S=f[m];n.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Gf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hf=`#ifdef USE_ALPHAHASH
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
#endif`,Vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$f=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yf=`#ifdef USE_AOMAP
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
#endif`,qf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jf=`#ifdef USE_BATCHING
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
#endif`,Kf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tp=`#ifdef USE_IRIDESCENCE
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
#endif`,ep=`#ifdef USE_BUMPMAP
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
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,dp=`#define PI 3.141592653589793
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
} // validated`,hp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,up=`vec3 transformedNormal = objectNormal;
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
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_p="gl_FragColor = linearToOutputTexel( gl_FragColor );",xp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vp=`#ifdef USE_ENVMAP
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
#endif`,Mp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
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
#endif`,yp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ap=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rp=`#ifdef USE_GRADIENTMAP
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
}`,Cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Up=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bp=`PhysicalMaterial material;
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
#endif`,kp=`uniform sampler2D dfgLUT;
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
}`,zp=`
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
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$p=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zp=`#if defined( USE_POINTS_UV )
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
#endif`,Jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,im=`#ifdef USE_MORPHTARGETS
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
#endif`,sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,am=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dm=`#ifdef USE_NORMALMAP
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
#endif`,hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,um=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_m=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ym=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Am=`float getShadowMask() {
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
}`,wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rm=`#ifdef USE_SKINNING
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
#endif`,Cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pm=`#ifdef USE_SKINNING
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
#endif`,Im=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Um=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nm=`#ifdef USE_TRANSMISSION
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
#endif`,Fm=`#ifdef USE_TRANSMISSION
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
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hm=`uniform sampler2D t2D;
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
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$m=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`#include <common>
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
}`,qm=`#if DEPTH_PACKING == 3200
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
}`,jm=`#define DISTANCE
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
}`,Km=`#define DISTANCE
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
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
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
}`,tg=`uniform vec3 diffuse;
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
}`,eg=`#include <common>
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
}`,ng=`uniform vec3 diffuse;
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
}`,ig=`#define LAMBERT
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
}`,sg=`#define LAMBERT
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
}`,rg=`#define MATCAP
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
}`,ag=`#define MATCAP
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
}`,og=`#define NORMAL
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
}`,lg=`#define NORMAL
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
}`,cg=`#define PHONG
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
}`,dg=`#define PHONG
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
}`,hg=`#define STANDARD
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
}`,ug=`#define STANDARD
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
}`,fg=`#define TOON
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
}`,pg=`#define TOON
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
}`,mg=`uniform float size;
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
}`,gg=`uniform vec3 diffuse;
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
}`,_g=`#include <common>
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
}`,xg=`uniform vec3 color;
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
}`,vg=`uniform float rotation;
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
}`,Mg=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:Gf,alphahash_pars_fragment:Hf,alphamap_fragment:Vf,alphamap_pars_fragment:Wf,alphatest_fragment:Xf,alphatest_pars_fragment:$f,aomap_fragment:Yf,aomap_pars_fragment:qf,batching_pars_vertex:jf,batching_vertex:Kf,begin_vertex:Zf,beginnormal_vertex:Jf,bsdfs:Qf,iridescence_fragment:tp,bumpmap_pars_fragment:ep,clipping_planes_fragment:np,clipping_planes_pars_fragment:ip,clipping_planes_pars_vertex:sp,clipping_planes_vertex:rp,color_fragment:ap,color_pars_fragment:op,color_pars_vertex:lp,color_vertex:cp,common:dp,cube_uv_reflection_fragment:hp,defaultnormal_vertex:up,displacementmap_pars_vertex:fp,displacementmap_vertex:pp,emissivemap_fragment:mp,emissivemap_pars_fragment:gp,colorspace_fragment:_p,colorspace_pars_fragment:xp,envmap_fragment:vp,envmap_common_pars_fragment:Mp,envmap_pars_fragment:Sp,envmap_pars_vertex:yp,envmap_physical_pars_fragment:Dp,envmap_vertex:bp,fog_vertex:Ep,fog_pars_vertex:Tp,fog_fragment:Ap,fog_pars_fragment:wp,gradientmap_pars_fragment:Rp,lightmap_pars_fragment:Cp,lights_lambert_fragment:Pp,lights_lambert_pars_fragment:Ip,lights_pars_begin:Lp,lights_toon_fragment:Up,lights_toon_pars_fragment:Np,lights_phong_fragment:Fp,lights_phong_pars_fragment:Op,lights_physical_fragment:Bp,lights_physical_pars_fragment:kp,lights_fragment_begin:zp,lights_fragment_maps:Gp,lights_fragment_end:Hp,lightprobes_pars_fragment:Vp,logdepthbuf_fragment:Wp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:$p,logdepthbuf_vertex:Yp,map_fragment:qp,map_pars_fragment:jp,map_particle_fragment:Kp,map_particle_pars_fragment:Zp,metalnessmap_fragment:Jp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:tm,morphcolor_vertex:em,morphnormal_vertex:nm,morphtarget_pars_vertex:im,morphtarget_vertex:sm,normal_fragment_begin:rm,normal_fragment_maps:am,normal_pars_fragment:om,normal_pars_vertex:lm,normal_vertex:cm,normalmap_pars_fragment:dm,clearcoat_normal_fragment_begin:hm,clearcoat_normal_fragment_maps:um,clearcoat_pars_fragment:fm,iridescence_pars_fragment:pm,opaque_fragment:mm,packing:gm,premultiplied_alpha_fragment:_m,project_vertex:xm,dithering_fragment:vm,dithering_pars_fragment:Mm,roughnessmap_fragment:Sm,roughnessmap_pars_fragment:ym,shadowmap_pars_fragment:bm,shadowmap_pars_vertex:Em,shadowmap_vertex:Tm,shadowmask_pars_fragment:Am,skinbase_vertex:wm,skinning_pars_vertex:Rm,skinning_vertex:Cm,skinnormal_vertex:Pm,specularmap_fragment:Im,specularmap_pars_fragment:Lm,tonemapping_fragment:Dm,tonemapping_pars_fragment:Um,transmission_fragment:Nm,transmission_pars_fragment:Fm,uv_pars_fragment:Om,uv_pars_vertex:Bm,uv_vertex:km,worldpos_vertex:zm,background_vert:Gm,background_frag:Hm,backgroundCube_vert:Vm,backgroundCube_frag:Wm,cube_vert:Xm,cube_frag:$m,depth_vert:Ym,depth_frag:qm,distance_vert:jm,distance_frag:Km,equirect_vert:Zm,equirect_frag:Jm,linedashed_vert:Qm,linedashed_frag:tg,meshbasic_vert:eg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:sg,meshmatcap_vert:rg,meshmatcap_frag:ag,meshnormal_vert:og,meshnormal_frag:lg,meshphong_vert:cg,meshphong_frag:dg,meshphysical_vert:hg,meshphysical_frag:ug,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:gg,shadow_vert:_g,shadow_frag:xg,sprite_vert:vg,sprite_frag:Mg},ut={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},xn={basic:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)},envMapIntensity:{value:1}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Ge([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Ge([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Ge([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Ge([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Ge([ut.points,ut.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Ge([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Ge([ut.common,ut.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Ge([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Ge([ut.sprite,ut.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distance:{uniforms:Ge([ut.common,ut.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distance_vert,fragmentShader:Xt.distance_frag},shadow:{uniforms:Ge([ut.lights,ut.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};xn.physical={uniforms:Ge([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const rr={r:0,b:0,g:0},Sg=new ye,Yd=new kt;Yd.set(-1,0,0,0,1,0,0,0,1);function yg(n,t,e,i,s,r){const a=new Qt(0);let o=s===!0?0:1,l,c,u=null,f=0,h=null;function m(y){let T=y.isScene===!0?y.background:null;if(T&&T.isTexture){const w=y.backgroundBlurriness>0;T=t.get(T,w)}return T}function _(y){let T=!1;const w=m(y);w===null?g(a,o):w&&w.isColor&&(g(w,1),T=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?e.buffers.color.setClear(0,0,0,1,r):L==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(y,T){const w=m(T);w&&(w.isCubeTexture||w.mapping===Cr)?(c===void 0&&(c=new wn(new ss(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:ns(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(L,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Sg.makeRotationFromEuler(T.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Yd),c.material.toneMapped=Jt.getTransfer(w.colorSpace)!==se,(u!==w||f!==w.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,f=w.version,h=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new wn(new Ir(2,2),new Rn({name:"BackgroundMaterial",uniforms:ns(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(w.colorSpace)!==se,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,f=w.version,h=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,T){y.getRGB(rr,Vd(n)),e.buffers.color.setClear(rr.r,rr.g,rr.b,T,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,T=1){a.set(y),o=T,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:_,addToRenderList:S,dispose:p}}function bg(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(P,H,Y,j,O){let W=!1;const X=f(P,j,Y,H);r!==X&&(r=X,c(r.object)),W=m(P,j,Y,O),W&&_(P,j,Y,O),O!==null&&t.update(O,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,w(P,H,Y,j),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function f(P,H,Y,j){const O=j.wireframe===!0;let W=i[H.id];W===void 0&&(W={},i[H.id]=W);const X=P.isInstancedMesh===!0?P.id:0;let nt=W[X];nt===void 0&&(nt={},W[X]=nt);let it=nt[Y.id];it===void 0&&(it={},nt[Y.id]=it);let ft=it[O];return ft===void 0&&(ft=h(l()),it[O]=ft),ft}function h(P){const H=[],Y=[],j=[];for(let O=0;O<e;O++)H[O]=0,Y[O]=0,j[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Y,attributeDivisors:j,object:P,attributes:{},index:null}}function m(P,H,Y,j){const O=r.attributes,W=H.attributes;let X=0;const nt=Y.getAttributes();for(const it in nt)if(nt[it].location>=0){const bt=O[it];let wt=W[it];if(wt===void 0&&(it==="instanceMatrix"&&P.instanceMatrix&&(wt=P.instanceMatrix),it==="instanceColor"&&P.instanceColor&&(wt=P.instanceColor)),bt===void 0||bt.attribute!==wt||wt&&bt.data!==wt.data)return!0;X++}return r.attributesNum!==X||r.index!==j}function _(P,H,Y,j){const O={},W=H.attributes;let X=0;const nt=Y.getAttributes();for(const it in nt)if(nt[it].location>=0){let bt=W[it];bt===void 0&&(it==="instanceMatrix"&&P.instanceMatrix&&(bt=P.instanceMatrix),it==="instanceColor"&&P.instanceColor&&(bt=P.instanceColor));const wt={};wt.attribute=bt,bt&&bt.data&&(wt.data=bt.data),O[it]=wt,X++}r.attributes=O,r.attributesNum=X,r.index=j}function S(){const P=r.newAttributes;for(let H=0,Y=P.length;H<Y;H++)P[H]=0}function g(P){p(P,0)}function p(P,H){const Y=r.newAttributes,j=r.enabledAttributes,O=r.attributeDivisors;Y[P]=1,j[P]===0&&(n.enableVertexAttribArray(P),j[P]=1),O[P]!==H&&(n.vertexAttribDivisor(P,H),O[P]=H)}function y(){const P=r.newAttributes,H=r.enabledAttributes;for(let Y=0,j=H.length;Y<j;Y++)H[Y]!==P[Y]&&(n.disableVertexAttribArray(Y),H[Y]=0)}function T(P,H,Y,j,O,W,X){X===!0?n.vertexAttribIPointer(P,H,Y,O,W):n.vertexAttribPointer(P,H,Y,j,O,W)}function w(P,H,Y,j){S();const O=j.attributes,W=Y.getAttributes(),X=H.defaultAttributeValues;for(const nt in W){const it=W[nt];if(it.location>=0){let ft=O[nt];if(ft===void 0&&(nt==="instanceMatrix"&&P.instanceMatrix&&(ft=P.instanceMatrix),nt==="instanceColor"&&P.instanceColor&&(ft=P.instanceColor)),ft!==void 0){const bt=ft.normalized,wt=ft.itemSize,te=t.get(ft);if(te===void 0)continue;const re=te.buffer,Vt=te.type,J=te.bytesPerElement,gt=Vt===n.INT||Vt===n.UNSIGNED_INT||ft.gpuType===No;if(ft.isInterleavedBufferAttribute){const ot=ft.data,Dt=ot.stride,Bt=ft.offset;if(ot.isInstancedInterleavedBuffer){for(let Ut=0;Ut<it.locationSize;Ut++)p(it.location+Ut,ot.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ut=0;Ut<it.locationSize;Ut++)g(it.location+Ut);n.bindBuffer(n.ARRAY_BUFFER,re);for(let Ut=0;Ut<it.locationSize;Ut++)T(it.location+Ut,wt/it.locationSize,Vt,bt,Dt*J,(Bt+wt/it.locationSize*Ut)*J,gt)}else{if(ft.isInstancedBufferAttribute){for(let ot=0;ot<it.locationSize;ot++)p(it.location+ot,ft.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let ot=0;ot<it.locationSize;ot++)g(it.location+ot);n.bindBuffer(n.ARRAY_BUFFER,re);for(let ot=0;ot<it.locationSize;ot++)T(it.location+ot,wt/it.locationSize,Vt,bt,wt*J,wt/it.locationSize*ot*J,gt)}}else if(X!==void 0){const bt=X[nt];if(bt!==void 0)switch(bt.length){case 2:n.vertexAttrib2fv(it.location,bt);break;case 3:n.vertexAttrib3fv(it.location,bt);break;case 4:n.vertexAttrib4fv(it.location,bt);break;default:n.vertexAttrib1fv(it.location,bt)}}}}y()}function L(){R();for(const P in i){const H=i[P];for(const Y in H){const j=H[Y];for(const O in j){const W=j[O];for(const X in W)u(W[X].object),delete W[X];delete j[O]}}delete i[P]}}function A(P){if(i[P.id]===void 0)return;const H=i[P.id];for(const Y in H){const j=H[Y];for(const O in j){const W=j[O];for(const X in W)u(W[X].object),delete W[X];delete j[O]}}delete i[P.id]}function D(P){for(const H in i){const Y=i[H];for(const j in Y){const O=Y[j];if(O[P.id]===void 0)continue;const W=O[P.id];for(const X in W)u(W[X].object),delete W[X];delete O[P.id]}}}function M(P){for(const H in i){const Y=i[H],j=P.isInstancedMesh===!0?P.id:0,O=Y[j];if(O!==void 0){for(const W in O){const X=O[W];for(const nt in X)u(X[nt].object),delete X[nt];delete O[W]}delete Y[j],Object.keys(Y).length===0&&delete i[H]}}}function R(){B(),a=!0,r!==s&&(r=s,c(r.object))}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:B,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfObject:M,releaseStatesOfProgram:D,initAttributes:S,enableAttribute:g,disableUnusedAttributes:y}}function Eg(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let m=0;m<u;m++)h+=c[m];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Tg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(D){return!(D!==un&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const M=D===Xn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==tn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Sn&&!M)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(Lt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Lt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:T,maxFragmentUniforms:w,maxSamples:L,samples:A}}function Ag(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new ii,o=new kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||i!==0||s;return s=h,i=f.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,m){const _=f.clippingPlanes,S=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!s||_===null||_.length===0||r&&!g)r?u(null):c();else{const y=r?0:i,T=y*4;let w=p.clippingState||null;l.value=w,w=u(_,h,T,m);for(let L=0;L!==T;++L)w[L]=e[L];p.clippingState=w,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,m,_){const S=f!==null?f.length:0;let g=null;if(S!==0){if(g=l.value,_!==!0||g===null){const p=m+S*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,w=m;T!==S;++T,w+=4)a.copy(f[T]).applyMatrix4(y,o),a.normal.toArray(g,w),g[w+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,g}}const ai=4,dc=[.125,.215,.35,.446,.526,.582],vi=20,wg=256,us=new Lr,hc=new Qt;let xa=null,va=0,Ma=0,Sa=!1;const Rg=new F;class uc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=Rg}=r;xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xa,va,Ma),this._renderer.xr.enabled=Sa,t.scissorTest=!1,Wi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wi||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:Xn,format:un,colorSpace:vr,depthBuffer:!1},s=fc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fc(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cg(r)),this._blurMaterial=Ig(r,t,e),this._ggxMaterial=Pg(r,t,e)}return s}_compileMaterial(t){const e=new wn(new on,t);this._renderer.compile(e,us)}_sceneToCubeUV(t,e,i,s,r){const l=new hn(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(hc),f.toneMapping=bn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wn(new ss,new kd({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,g=S.material;let p=!1;const y=t.background;y?y.isColor&&(g.color.copy(y),t.background=null,p=!0):(g.color.copy(hc),p=!0);for(let T=0;T<6;T++){const w=T%3;w===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[T],r.y,r.z)):w===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[T]));const L=this._cubeSize;Wi(s,w*L,T>2?L:0,L,L),f.setRenderTarget(s),p&&f.render(S,l),f.render(t,l)}f.toneMapping=m,f.autoClear=h,t.background=y}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===wi||t.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Wi(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,us)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,m=f*h,{_lodMax:_}=this,S=this._sizeLods[i],g=3*S*(i>_-ai?i-_+ai:0),p=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=_-e,Wi(r,g,p,3*S,2*S),s.setRenderTarget(r),s.render(o,us),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-i,Wi(t,g,p,3*S,2*S),s.setRenderTarget(t),s.render(o,us)}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ne("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=c;const h=c.uniforms,m=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*vi-1),S=r/_,g=isFinite(r)?1+Math.floor(u*S):vi;g>vi&&Lt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${vi}`);const p=[];let y=0;for(let D=0;D<vi;++D){const M=D/S,R=Math.exp(-M*M/2);p.push(R),D===0?y+=R:D<g&&(y+=2*R)}for(let D=0;D<p.length;D++)p[D]=p[D]/y;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:T}=this;h.dTheta.value=_,h.mipInt.value=T-i;const w=this._sizeLods[s],L=3*w*(s>T-ai?s-T+ai:0),A=4*(this._cubeSize-w);Wi(e,L,A,3*w,2*w),l.setRenderTarget(e),l.render(f,us)}}function Cg(n){const t=[],e=[],i=[];let s=n;const r=n-ai+1+dc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-ai?l=dc[a-n+ai-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,_=6,S=3,g=2,p=1,y=new Float32Array(S*_*m),T=new Float32Array(g*_*m),w=new Float32Array(p*_*m);for(let A=0;A<m;A++){const D=A%3*2/3-1,M=A>2?0:-1,R=[D,M,0,D+2/3,M,0,D+2/3,M+1,0,D,M,0,D+2/3,M+1,0,D,M+1,0];y.set(R,S*_*A),T.set(h,g*_*A);const B=[A,A,A,A,A,A];w.set(B,p*_*A)}const L=new on;L.setAttribute("position",new Tn(y,S)),L.setAttribute("uv",new Tn(T,g)),L.setAttribute("faceIndex",new Tn(w,p)),i.push(new wn(L,null)),s>ai&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function fc(n,t,e){const i=new En(n,t,e);return i.texture.mapping=Cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Wi(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Pg(n,t,e){return new Rn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dr(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ig(n,t,e){const i=new Float32Array(vi),s=new F(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dr(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function pc(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dr(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function mc(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Dr(){return`

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
	`}class qd extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Gd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ss(5,5,5),r=new Rn({name:"CubemapFromEquirect",uniforms:ns(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ye,blending:Gn});r.uniforms.tEquirect.value=e;const a=new wn(s,r),o=e.minFilter;return e.minFilter===Mi&&(e.minFilter=ze),new Nf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}function Lg(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===Vr||m===Wr)if(t.has(h)){const _=t.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const S=new qd(_.height);return S.fromEquirectangularTexture(n,h),t.set(h,S),h.addEventListener("dispose",c),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const m=h.mapping,_=m===Vr||m===Wr,S=m===wi||m===ts;if(_||S){let g=e.get(h);const p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new uc(n)),g=_?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const y=h.image;return _&&y&&y.height>0||S&&y&&l(y)?(i===null&&(i=new uc(n)),g=_?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,m){return m===Vr?h.mapping=wi:m===Wr&&(h.mapping=ts),h}function l(h){let m=0;const _=6;for(let S=0;S<_;S++)h[S]!==void 0&&m++;return m===_}function c(h){const m=h.target;m.removeEventListener("dispose",c);const _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Dg(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&_o("WebGLRenderer: "+i+" extension not supported."),s}}}function Ug(n,t,e,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete s[h.id];const m=r.get(h);m&&(t.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const m in h)t.update(h[m],n.ARRAY_BUFFER)}function c(f){const h=[],m=f.index,_=f.attributes.position;let S=0;if(_===void 0)return;if(m!==null){const y=m.array;S=m.version;for(let T=0,w=y.length;T<w;T+=3){const L=y[T+0],A=y[T+1],D=y[T+2];h.push(L,A,A,D,D,L)}}else{const y=_.array;S=_.version;for(let T=0,w=y.length/3-1;T<w;T+=3){const L=T+0,A=T+1,D=T+2;h.push(L,A,A,D,D,L)}}const g=new(_.count>=65535?Bd:Od)(h,1);g.version=S;const p=r.get(f);p&&t.remove(p),r.set(f,g)}function u(f){const h=r.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Ng(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*a),e.update(h,i,1)}function c(f,h,m){m!==0&&(n.drawElementsInstanced(i,h,r,f*a,m),e.update(h,i,m))}function u(f,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,m);let S=0;for(let g=0;g<m;g++)S+=h[g];e.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Fg(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:ne("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Og(n,t,e){const i=new WeakMap,s=new Se;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let R=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",R)};h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let T=0;m===!0&&(T=1),_===!0&&(T=2),S===!0&&(T=3);let w=o.attributes.position.count*T,L=1;w>t.maxTextureSize&&(L=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const A=new Float32Array(w*L*4*f),D=new Ud(A,w,L,f);D.type=Sn,D.needsUpdate=!0;const M=T*4;for(let B=0;B<f;B++){const P=g[B],H=p[B],Y=y[B],j=w*L*4*B;for(let O=0;O<P.count;O++){const W=O*M;m===!0&&(s.fromBufferAttribute(P,O),A[j+W+0]=s.x,A[j+W+1]=s.y,A[j+W+2]=s.z,A[j+W+3]=0),_===!0&&(s.fromBufferAttribute(H,O),A[j+W+4]=s.x,A[j+W+5]=s.y,A[j+W+6]=s.z,A[j+W+7]=0),S===!0&&(s.fromBufferAttribute(Y,O),A[j+W+8]=s.x,A[j+W+9]=s.y,A[j+W+10]=s.z,A[j+W+11]=Y.itemSize===4?s.w:1)}}h={count:f,texture:D,size:new Ht(w,L)},i.set(o,h),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let m=0;for(let S=0;S<c.length;S++)m+=c[S];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Bg(n,t,e,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const kg={[xd]:"LINEAR_TONE_MAPPING",[vd]:"REINHARD_TONE_MAPPING",[Md]:"CINEON_TONE_MAPPING",[Sd]:"ACES_FILMIC_TONE_MAPPING",[bd]:"AGX_TONE_MAPPING",[Ed]:"NEUTRAL_TONE_MAPPING",[yd]:"CUSTOM_TONE_MAPPING"};function zg(n,t,e,i,s){const r=new En(t,e,{type:n,depthBuffer:i,stencilBuffer:s,depthTexture:i?new es(t,e):void 0}),a=new En(t,e,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),o=new on;o.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new qe([0,2,0,0,2,0],2));const l=new Rf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new wn(o,l),u=new Lr(-1,1,1,-1,0,1);let f=null,h=null,m=!1,_,S=null,g=[],p=!1;this.setSize=function(y,T){r.setSize(y,T),a.setSize(y,T);for(let w=0;w<g.length;w++){const L=g[w];L.setSize&&L.setSize(y,T)}},this.setEffects=function(y){g=y,p=g.length>0&&g[0].isRenderPass===!0;const T=r.width,w=r.height;for(let L=0;L<g.length;L++){const A=g[L];A.setSize&&A.setSize(T,w)}},this.begin=function(y,T){if(m||y.toneMapping===bn&&g.length===0)return!1;if(S=T,T!==null){const w=T.width,L=T.height;(r.width!==w||r.height!==L)&&this.setSize(w,L)}return p===!1&&y.setRenderTarget(r),_=y.toneMapping,y.toneMapping=bn,!0},this.hasRenderPass=function(){return p},this.end=function(y,T){y.toneMapping=_,m=!0;let w=r,L=a;for(let A=0;A<g.length;A++){const D=g[A];if(D.enabled!==!1&&(D.render(y,L,w,T),D.needsSwap!==!1)){const M=w;w=L,L=M}}if(f!==y.outputColorSpace||h!==y.toneMapping){f=y.outputColorSpace,h=y.toneMapping,l.defines={},Jt.getTransfer(f)===se&&(l.defines.SRGB_TRANSFER="");const A=kg[h];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(S),y.render(c,u),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const jd=new He,vo=new es(1,1),Kd=new Ud,Zd=new nf,Jd=new Gd,gc=[],_c=[],xc=new Float32Array(16),vc=new Float32Array(9),Mc=new Float32Array(4);function rs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=gc[s];if(r===void 0&&(r=new Float32Array(s),gc[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ie(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Le(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ur(n,t){let e=_c[t];e===void 0&&(e=new Int32Array(t),_c[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Gg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Hg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;n.uniform2fv(this.addr,t),Le(e,t)}}function Vg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;n.uniform3fv(this.addr,t),Le(e,t)}}function Wg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;n.uniform4fv(this.addr,t),Le(e,t)}}function Xg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ie(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,i))return;Mc.set(i),n.uniformMatrix2fv(this.addr,!1,Mc),Le(e,i)}}function $g(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ie(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,i))return;vc.set(i),n.uniformMatrix3fv(this.addr,!1,vc),Le(e,i)}}function Yg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ie(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,i))return;xc.set(i),n.uniformMatrix4fv(this.addr,!1,xc),Le(e,i)}}function qg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function jg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;n.uniform2iv(this.addr,t),Le(e,t)}}function Kg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;n.uniform3iv(this.addr,t),Le(e,t)}}function Zg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;n.uniform4iv(this.addr,t),Le(e,t)}}function Jg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Qg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;n.uniform2uiv(this.addr,t),Le(e,t)}}function t_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;n.uniform3uiv(this.addr,t),Le(e,t)}}function e_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;n.uniform4uiv(this.addr,t),Le(e,t)}}function n_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(vo.compareFunction=e.isReversedDepthBuffer()?Ho:Go,r=vo):r=jd,e.setTexture2D(t||r,s)}function i_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Zd,s)}function s_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Jd,s)}function r_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Kd,s)}function a_(n){switch(n){case 5126:return Gg;case 35664:return Hg;case 35665:return Vg;case 35666:return Wg;case 35674:return Xg;case 35675:return $g;case 35676:return Yg;case 5124:case 35670:return qg;case 35667:case 35671:return jg;case 35668:case 35672:return Kg;case 35669:case 35673:return Zg;case 5125:return Jg;case 36294:return Qg;case 36295:return t_;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}function o_(n,t){n.uniform1fv(this.addr,t)}function l_(n,t){const e=rs(t,this.size,2);n.uniform2fv(this.addr,e)}function c_(n,t){const e=rs(t,this.size,3);n.uniform3fv(this.addr,e)}function d_(n,t){const e=rs(t,this.size,4);n.uniform4fv(this.addr,e)}function h_(n,t){const e=rs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function u_(n,t){const e=rs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function f_(n,t){const e=rs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function p_(n,t){n.uniform1iv(this.addr,t)}function m_(n,t){n.uniform2iv(this.addr,t)}function g_(n,t){n.uniform3iv(this.addr,t)}function __(n,t){n.uniform4iv(this.addr,t)}function x_(n,t){n.uniform1uiv(this.addr,t)}function v_(n,t){n.uniform2uiv(this.addr,t)}function M_(n,t){n.uniform3uiv(this.addr,t)}function S_(n,t){n.uniform4uiv(this.addr,t)}function y_(n,t,e){const i=this.cache,s=t.length,r=Ur(e,s);Ie(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=vo:a=jd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function b_(n,t,e){const i=this.cache,s=t.length,r=Ur(e,s);Ie(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Zd,r[a])}function E_(n,t,e){const i=this.cache,s=t.length,r=Ur(e,s);Ie(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Jd,r[a])}function T_(n,t,e){const i=this.cache,s=t.length,r=Ur(e,s);Ie(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Kd,r[a])}function A_(n){switch(n){case 5126:return o_;case 35664:return l_;case 35665:return c_;case 35666:return d_;case 35674:return h_;case 35675:return u_;case 35676:return f_;case 5124:case 35670:return p_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return __;case 5125:return x_;case 36294:return v_;case 36295:return M_;case 36296:return S_;case 35678:case 36198:case 36298:case 36306:case 35682:return y_;case 35679:case 36299:case 36307:return b_;case 35680:case 36300:case 36308:case 36293:return E_;case 36289:case 36303:case 36311:case 36292:return T_}}class w_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=a_(e.type)}}class R_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=A_(e.type)}}class C_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function Sc(n,t){n.seq.push(t),n.map[t.id]=t}function P_(n,t,e){const i=n.name,s=i.length;for(ya.lastIndex=0;;){const r=ya.exec(i),a=ya.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Sc(e,c===void 0?new w_(o,n,t):new R_(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new C_(o),Sc(e,f)),e=f}}}class pr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);P_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function yc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const I_=37297;let L_=0;function D_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const bc=new kt;function U_(n){Jt._getMatrix(bc,Jt.workingColorSpace,n);const t=`mat3( ${bc.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(n)){case Mr:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ec(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+D_(n.getShaderSource(t),o)}else return r}function N_(n,t){const e=U_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const F_={[xd]:"Linear",[vd]:"Reinhard",[Md]:"Cineon",[Sd]:"ACESFilmic",[bd]:"AgX",[Ed]:"Neutral",[yd]:"Custom"};function O_(n,t){const e=F_[t];return e===void 0?(Lt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ar=new F;function B_(){Jt.getLuminanceCoefficients(ar);const n=ar.x.toFixed(4),t=ar.y.toFixed(4),e=ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function k_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_s).join(`
`)}function z_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function G_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function _s(n){return n!==""}function Tc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ac(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const H_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mo(n){return n.replace(H_,W_)}const V_=new Map;function W_(n,t){let e=Xt[t];if(e===void 0){const i=V_.get(t);if(i!==void 0)e=Xt[i],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Mo(e)}const X_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(n){return n.replace(X_,$_)}function $_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Rc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const Y_={[cr]:"SHADOWMAP_TYPE_PCF",[ms]:"SHADOWMAP_TYPE_VSM"};function q_(n){return Y_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const j_={[wi]:"ENVMAP_TYPE_CUBE",[ts]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE_UV"};function K_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":j_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Z_={[ts]:"ENVMAP_MODE_REFRACTION"};function J_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Z_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Q_={[_d]:"ENVMAP_BLENDING_MULTIPLY",[Uu]:"ENVMAP_BLENDING_MIX",[Nu]:"ENVMAP_BLENDING_ADD"};function tx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Q_[n.combine]||"ENVMAP_BLENDING_NONE"}function ex(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function nx(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=q_(e),c=K_(e),u=J_(e),f=tx(e),h=ex(e),m=k_(e),_=z_(r),S=s.createProgram();let g,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(_s).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(_s).join(`
`),p.length>0&&(p+=`
`)):(g=[Rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),p=[Rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bn?"#define TONE_MAPPING":"",e.toneMapping!==bn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==bn?O_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,N_("linearToOutputTexel",e.outputColorSpace),B_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_s).join(`
`)),a=Mo(a),a=Tc(a,e),a=Ac(a,e),o=Mo(o),o=Tc(o,e),o=Ac(o,e),a=wc(a),o=wc(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=y+g+a,w=y+p+o,L=yc(s,s.VERTEX_SHADER,T),A=yc(s,s.FRAGMENT_SHADER,w);s.attachShader(S,L),s.attachShader(S,A),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function D(P){if(n.debug.checkShaderErrors){const H=s.getProgramInfoLog(S)||"",Y=s.getShaderInfoLog(L)||"",j=s.getShaderInfoLog(A)||"",O=H.trim(),W=Y.trim(),X=j.trim();let nt=!0,it=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(nt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,L,A);else{const ft=Ec(s,L,"vertex"),bt=Ec(s,A,"fragment");ne("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+ft+`
`+bt)}else O!==""?Lt("WebGLProgram: Program Info Log:",O):(W===""||X==="")&&(it=!1);it&&(P.diagnostics={runnable:nt,programLog:O,vertexShader:{log:W,prefix:g},fragmentShader:{log:X,prefix:p}})}s.deleteShader(L),s.deleteShader(A),M=new pr(s,S),R=G_(s,S)}let M;this.getUniforms=function(){return M===void 0&&D(this),M};let R;this.getAttributes=function(){return R===void 0&&D(this),R};let B=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(S,I_)),B},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=L_++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=L,this.fragmentShader=A,this}let ix=0;class sx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new rx(t),e.set(t,i)),i}}class rx{constructor(t){this.id=ix++,this.code=t,this.usedTimes=0}}function ax(n){return n===Ri||n===_r||n===xr}function ox(n,t,e,i,s,r){const a=new Nd,o=new sx,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function S(M,R,B,P,H,Y){const j=P.fog,O=H.geometry,W=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,X=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,nt=t.get(M.envMap||W,X),it=nt&&nt.mapping===Cr?nt.image.height:null,ft=m[M.type];M.precision!==null&&(h=i.getMaxPrecision(M.precision),h!==M.precision&&Lt("WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));const bt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,wt=bt!==void 0?bt.length:0;let te=0;O.morphAttributes.position!==void 0&&(te=1),O.morphAttributes.normal!==void 0&&(te=2),O.morphAttributes.color!==void 0&&(te=3);let re,Vt,J,gt;if(ft){const zt=xn[ft];re=zt.vertexShader,Vt=zt.fragmentShader}else re=M.vertexShader,Vt=M.fragmentShader,o.update(M),J=o.getVertexShaderID(M),gt=o.getFragmentShaderID(M);const ot=n.getRenderTarget(),Dt=n.state.buffers.depth.getReversed(),Bt=H.isInstancedMesh===!0,Ut=H.isBatchedMesh===!0,me=!!M.map,jt=!!M.matcap,ae=!!nt,pe=!!M.aoMap,Yt=!!M.lightMap,Re=!!M.bumpMap,ge=!!M.normalMap,je=!!M.displacementMap,U=!!M.emissiveMap,Ce=!!M.metalnessMap,Kt=!!M.roughnessMap,ue=M.anisotropy>0,ht=M.clearcoat>0,xe=M.dispersion>0,b=M.iridescence>0,x=M.sheen>0,k=M.transmission>0,K=ue&&!!M.anisotropyMap,et=ht&&!!M.clearcoatMap,st=ht&&!!M.clearcoatNormalMap,dt=ht&&!!M.clearcoatRoughnessMap,$=b&&!!M.iridescenceMap,Z=b&&!!M.iridescenceThicknessMap,_t=x&&!!M.sheenColorMap,St=x&&!!M.sheenRoughnessMap,lt=!!M.specularMap,rt=!!M.specularColorMap,Ft=!!M.specularIntensityMap,Wt=k&&!!M.transmissionMap,ie=k&&!!M.thicknessMap,I=!!M.gradientMap,at=!!M.alphaMap,q=M.alphaTest>0,xt=!!M.alphaHash,ct=!!M.extensions;let tt=bn;M.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(tt=n.toneMapping);const Tt={shaderID:ft,shaderType:M.type,shaderName:M.name,vertexShader:re,fragmentShader:Vt,defines:M.defines,customVertexShaderID:J,customFragmentShaderID:gt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:Ut,batchingColor:Ut&&H._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&H.instanceColor!==null,instancingMorph:Bt&&H.morphTexture!==null,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Jt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:me,matcap:jt,envMap:ae,envMapMode:ae&&nt.mapping,envMapCubeUVHeight:it,aoMap:pe,lightMap:Yt,bumpMap:Re,normalMap:ge,displacementMap:je,emissiveMap:U,normalMapObjectSpace:ge&&M.normalMapType===Bu,normalMapTangentSpace:ge&&M.normalMapType===go,packedNormalMap:ge&&M.normalMapType===go&&ax(M.normalMap.format),metalnessMap:Ce,roughnessMap:Kt,anisotropy:ue,anisotropyMap:K,clearcoat:ht,clearcoatMap:et,clearcoatNormalMap:st,clearcoatRoughnessMap:dt,dispersion:xe,iridescence:b,iridescenceMap:$,iridescenceThicknessMap:Z,sheen:x,sheenColorMap:_t,sheenRoughnessMap:St,specularMap:lt,specularColorMap:rt,specularIntensityMap:Ft,transmission:k,transmissionMap:Wt,thicknessMap:ie,gradientMap:I,opaque:M.transparent===!1&&M.blending===qi&&M.alphaToCoverage===!1,alphaMap:at,alphaTest:q,alphaHash:xt,combine:M.combine,mapUv:me&&_(M.map.channel),aoMapUv:pe&&_(M.aoMap.channel),lightMapUv:Yt&&_(M.lightMap.channel),bumpMapUv:Re&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:je&&_(M.displacementMap.channel),emissiveMapUv:U&&_(M.emissiveMap.channel),metalnessMapUv:Ce&&_(M.metalnessMap.channel),roughnessMapUv:Kt&&_(M.roughnessMap.channel),anisotropyMapUv:K&&_(M.anisotropyMap.channel),clearcoatMapUv:et&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:st&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:St&&_(M.sheenRoughnessMap.channel),specularMapUv:lt&&_(M.specularMap.channel),specularColorMapUv:rt&&_(M.specularColorMap.channel),specularIntensityMapUv:Ft&&_(M.specularIntensityMap.channel),transmissionMapUv:Wt&&_(M.transmissionMap.channel),thicknessMapUv:ie&&_(M.thicknessMap.channel),alphaMapUv:at&&_(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ge||ue),vertexNormals:!!O.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!O.attributes.uv&&(me||at),fog:!!j,useFog:M.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||O.attributes.normal===void 0&&ge===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Dt,skinning:H.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:te,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:tt,decodeVideoTexture:me&&M.map.isVideoTexture===!0&&Jt.getTransfer(M.map.colorSpace)===se,decodeVideoTextureEmissive:U&&M.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(M.emissiveMap.colorSpace)===se,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===On,flipSided:M.side===Ye,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ct&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&M.extensions.multiDraw===!0||Ut)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function g(M){const R=[];if(M.shaderID?R.push(M.shaderID):(R.push(M.customVertexShaderID),R.push(M.customFragmentShaderID)),M.defines!==void 0)for(const B in M.defines)R.push(B),R.push(M.defines[B]);return M.isRawShaderMaterial===!1&&(p(R,M),y(R,M),R.push(n.outputColorSpace)),R.push(M.customProgramCacheKey),R.join()}function p(M,R){M.push(R.precision),M.push(R.outputColorSpace),M.push(R.envMapMode),M.push(R.envMapCubeUVHeight),M.push(R.mapUv),M.push(R.alphaMapUv),M.push(R.lightMapUv),M.push(R.aoMapUv),M.push(R.bumpMapUv),M.push(R.normalMapUv),M.push(R.displacementMapUv),M.push(R.emissiveMapUv),M.push(R.metalnessMapUv),M.push(R.roughnessMapUv),M.push(R.anisotropyMapUv),M.push(R.clearcoatMapUv),M.push(R.clearcoatNormalMapUv),M.push(R.clearcoatRoughnessMapUv),M.push(R.iridescenceMapUv),M.push(R.iridescenceThicknessMapUv),M.push(R.sheenColorMapUv),M.push(R.sheenRoughnessMapUv),M.push(R.specularMapUv),M.push(R.specularColorMapUv),M.push(R.specularIntensityMapUv),M.push(R.transmissionMapUv),M.push(R.thicknessMapUv),M.push(R.combine),M.push(R.fogExp2),M.push(R.sizeAttenuation),M.push(R.morphTargetsCount),M.push(R.morphAttributeCount),M.push(R.numDirLights),M.push(R.numPointLights),M.push(R.numSpotLights),M.push(R.numSpotLightMaps),M.push(R.numHemiLights),M.push(R.numRectAreaLights),M.push(R.numDirLightShadows),M.push(R.numPointLightShadows),M.push(R.numSpotLightShadows),M.push(R.numSpotLightShadowsWithMaps),M.push(R.numLightProbes),M.push(R.shadowMapType),M.push(R.toneMapping),M.push(R.numClippingPlanes),M.push(R.numClipIntersection),M.push(R.depthPacking)}function y(M,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),M.push(a.mask)}function T(M){const R=m[M.type];let B;if(R){const P=xn[R];B=Tf.clone(P.uniforms)}else B=M.uniforms;return B}function w(M,R){let B=u.get(R);return B!==void 0?++B.usedTimes:(B=new nx(n,R,M,s),c.push(B),u.set(R,B)),B}function L(M){if(--M.usedTimes===0){const R=c.indexOf(M);c[R]=c[c.length-1],c.pop(),u.delete(M.cacheKey),M.destroy()}}function A(M){o.remove(M)}function D(){o.dispose()}return{getParameters:S,getProgramCacheKey:g,getUniforms:T,acquireProgram:w,releaseProgram:L,releaseShaderCache:A,programs:c,dispose:D}}function lx(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function cx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Cc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Pc(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,_,S,g,p){let y=n[t];return y===void 0?(y={id:h.id,object:h,geometry:m,material:_,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:g,group:p},n[t]=y):(y.id=h.id,y.object=h,y.geometry=m,y.material=_,y.materialVariant=a(h),y.groupOrder=S,y.renderOrder=h.renderOrder,y.z=g,y.group=p),t++,y}function l(h,m,_,S,g,p){const y=o(h,m,_,S,g,p);_.transmission>0?i.push(y):_.transparent===!0?s.push(y):e.push(y)}function c(h,m,_,S,g,p){const y=o(h,m,_,S,g,p);_.transmission>0?i.unshift(y):_.transparent===!0?s.unshift(y):e.unshift(y)}function u(h,m){e.length>1&&e.sort(h||cx),i.length>1&&i.sort(m||Cc),s.length>1&&s.sort(m||Cc)}function f(){for(let h=t,m=n.length;h<m;h++){const _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function dx(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Pc,n.set(i,[a])):s>=r.length?(a=new Pc,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function hx(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Qt};break;case"SpotLight":e={position:new F,direction:new F,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function ux(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let fx=0;function px(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function mx(n){const t=new hx,e=ux(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const s=new F,r=new ye,a=new ye;function o(c){let u=0,f=0,h=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let m=0,_=0,S=0,g=0,p=0,y=0,T=0,w=0,L=0,A=0,D=0;c.sort(px);for(let R=0,B=c.length;R<B;R++){const P=c[R],H=P.color,Y=P.intensity,j=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ri?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=H.r*Y,f+=H.g*Y,h+=H.b*Y;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],Y);D++}else if(P.isDirectionalLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const X=P.shadow,nt=e.get(P);nt.shadowIntensity=X.intensity,nt.shadowBias=X.bias,nt.shadowNormalBias=X.normalBias,nt.shadowRadius=X.radius,nt.shadowMapSize=X.mapSize,i.directionalShadow[m]=nt,i.directionalShadowMap[m]=O,i.directionalShadowMatrix[m]=P.shadow.matrix,y++}i.directional[m]=W,m++}else if(P.isSpotLight){const W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(H).multiplyScalar(Y),W.distance=j,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[S]=W;const X=P.shadow;if(P.map&&(i.spotLightMap[L]=P.map,L++,X.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[S]=X.matrix,P.castShadow){const nt=e.get(P);nt.shadowIntensity=X.intensity,nt.shadowBias=X.bias,nt.shadowNormalBias=X.normalBias,nt.shadowRadius=X.radius,nt.shadowMapSize=X.mapSize,i.spotShadow[S]=nt,i.spotShadowMap[S]=O,w++}S++}else if(P.isRectAreaLight){const W=t.get(P);W.color.copy(H).multiplyScalar(Y),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=W,g++}else if(P.isPointLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const X=P.shadow,nt=e.get(P);nt.shadowIntensity=X.intensity,nt.shadowBias=X.bias,nt.shadowNormalBias=X.normalBias,nt.shadowRadius=X.radius,nt.shadowMapSize=X.mapSize,nt.shadowCameraNear=X.camera.near,nt.shadowCameraFar=X.camera.far,i.pointShadow[_]=nt,i.pointShadowMap[_]=O,i.pointShadowMatrix[_]=P.shadow.matrix,T++}i.point[_]=W,_++}else if(P.isHemisphereLight){const W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(Y),W.groundColor.copy(P.groundColor).multiplyScalar(Y),i.hemi[p]=W,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const M=i.hash;(M.directionalLength!==m||M.pointLength!==_||M.spotLength!==S||M.rectAreaLength!==g||M.hemiLength!==p||M.numDirectionalShadows!==y||M.numPointShadows!==T||M.numSpotShadows!==w||M.numSpotMaps!==L||M.numLightProbes!==D)&&(i.directional.length=m,i.spot.length=S,i.rectArea.length=g,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=w+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=D,M.directionalLength=m,M.pointLength=_,M.spotLength=S,M.rectAreaLength=g,M.hemiLength=p,M.numDirectionalShadows=y,M.numPointShadows=T,M.numSpotShadows=w,M.numSpotMaps=L,M.numLightProbes=D,i.version=fx++)}function l(c,u){let f=0,h=0,m=0,_=0,S=0;const g=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const T=c[p];if(T.isDirectionalLight){const w=i.directional[f];w.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),f++}else if(T.isSpotLight){const w=i.spot[m];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),m++}else if(T.isRectAreaLight){const w=i.rectArea[_];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(T.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(T.width*.5,0,0),w.halfHeight.set(0,T.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),_++}else if(T.isPointLight){const w=i.point[h];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(g),h++}else if(T.isHemisphereLight){const w=i.hemi[S];w.direction.setFromMatrixPosition(T.matrixWorld),w.direction.transformDirection(g),S++}}}return{setup:o,setupView:l,state:i}}function Ic(n){const t=new mx(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function gx(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Ic(n),t.set(s,[o])):r>=a.length?(o=new Ic(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const _x=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xx=`uniform sampler2D shadow_pass;
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
}`,vx=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Mx=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Lc=new ye,fs=new F,ba=new F;function Sx(n,t,e){let i=new Xo;const s=new Ht,r=new Ht,a=new Se,o=new Pf,l=new If,c={},u=e.maxTextureSize,f={[ci]:Ye,[Ye]:ci,[On]:On},h=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:_x,fragmentShader:xx}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new on;_.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new wn(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cr;let p=this.type;this.render=function(A,D,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===mu&&(Lt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=cr);const R=n.getRenderTarget(),B=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Gn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const Y=p!==this.type;Y&&D.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(O=>O.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,O=A.length;j<O;j++){const W=A[j],X=W.shadow;if(X===void 0){Lt("WebGLShadowMap:",W,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const nt=X.getFrameExtents();s.multiply(nt),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/nt.x),s.x=r.x*nt.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/nt.y),s.y=r.y*nt.y,X.mapSize.y=r.y));const it=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=it,X.map===null||Y===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===ms){if(W.isPointLight){Lt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new En(s.x,s.y,{format:Ri,type:Xn,minFilter:ze,magFilter:ze,generateMipmaps:!1}),X.map.texture.name=W.name+".shadowMap",X.map.depthTexture=new es(s.x,s.y,Sn),X.map.depthTexture.name=W.name+".shadowMapDepth",X.map.depthTexture.format=$n,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ue,X.map.depthTexture.magFilter=Ue}else W.isPointLight?(X.map=new qd(s.x),X.map.depthTexture=new yf(s.x,An)):(X.map=new En(s.x,s.y),X.map.depthTexture=new es(s.x,s.y,An)),X.map.depthTexture.name=W.name+".shadowMap",X.map.depthTexture.format=$n,this.type===cr?(X.map.depthTexture.compareFunction=it?Ho:Go,X.map.depthTexture.minFilter=ze,X.map.depthTexture.magFilter=ze):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Ue,X.map.depthTexture.magFilter=Ue);X.camera.updateProjectionMatrix()}const ft=X.map.isWebGLCubeRenderTarget?6:1;for(let bt=0;bt<ft;bt++){if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,bt),n.clear();else{bt===0&&(n.setRenderTarget(X.map),n.clear());const wt=X.getViewport(bt);a.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),H.viewport(a)}if(W.isPointLight){const wt=X.camera,te=X.matrix,re=W.distance||wt.far;re!==wt.far&&(wt.far=re,wt.updateProjectionMatrix()),fs.setFromMatrixPosition(W.matrixWorld),wt.position.copy(fs),ba.copy(wt.position),ba.add(vx[bt]),wt.up.copy(Mx[bt]),wt.lookAt(ba),wt.updateMatrixWorld(),te.makeTranslation(-fs.x,-fs.y,-fs.z),Lc.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Lc,wt.coordinateSystem,wt.reversedDepth)}else X.updateMatrices(W);i=X.getFrustum(),w(D,M,X.camera,W,this.type)}X.isPointLightShadow!==!0&&this.type===ms&&y(X,M),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(R,B,P)};function y(A,D){const M=t.update(S);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new En(s.x,s.y,{format:Ri,type:Xn})),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,M,h,S,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,M,m,S,null)}function T(A,D,M,R){let B=null;const P=M.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)B=P;else if(B=M.isPointLight===!0?l:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const H=B.uuid,Y=D.uuid;let j=c[H];j===void 0&&(j={},c[H]=j);let O=j[Y];O===void 0&&(O=B.clone(),j[Y]=O,D.addEventListener("dispose",L)),B=O}if(B.visible=D.visible,B.wireframe=D.wireframe,R===ms?B.side=D.shadowSide!==null?D.shadowSide:D.side:B.side=D.shadowSide!==null?D.shadowSide:f[D.side],B.alphaMap=D.alphaMap,B.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,B.map=D.map,B.clipShadows=D.clipShadows,B.clippingPlanes=D.clippingPlanes,B.clipIntersection=D.clipIntersection,B.displacementMap=D.displacementMap,B.displacementScale=D.displacementScale,B.displacementBias=D.displacementBias,B.wireframeLinewidth=D.wireframeLinewidth,B.linewidth=D.linewidth,M.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const H=n.properties.get(B);H.light=M}return B}function w(A,D,M,R,B){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&B===ms)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,A.matrixWorld);const Y=t.update(A),j=A.material;if(Array.isArray(j)){const O=Y.groups;for(let W=0,X=O.length;W<X;W++){const nt=O[W],it=j[nt.materialIndex];if(it&&it.visible){const ft=T(A,it,R,B);A.onBeforeShadow(n,A,D,M,Y,ft,nt),n.renderBufferDirect(M,null,Y,ft,A,nt),A.onAfterShadow(n,A,D,M,Y,ft,nt)}}}else if(j.visible){const O=T(A,j,R,B);A.onBeforeShadow(n,A,D,M,Y,O,null),n.renderBufferDirect(M,null,Y,O,A,null),A.onAfterShadow(n,A,D,M,Y,O,null)}}const H=A.children;for(let Y=0,j=H.length;Y<j;Y++)w(H[Y],D,M,R,B)}function L(A){A.target.removeEventListener("dispose",L);for(const M in c){const R=c[M],B=A.target.uuid;B in R&&(R[B].dispose(),delete R[B])}}}function yx(n,t){function e(){let I=!1;const at=new Se;let q=null;const xt=new Se(0,0,0,0);return{setMask:function(ct){q!==ct&&!I&&(n.colorMask(ct,ct,ct,ct),q=ct)},setLocked:function(ct){I=ct},setClear:function(ct,tt,Tt,zt,Ee){Ee===!0&&(ct*=zt,tt*=zt,Tt*=zt),at.set(ct,tt,Tt,zt),xt.equals(at)===!1&&(n.clearColor(ct,tt,Tt,zt),xt.copy(at))},reset:function(){I=!1,q=null,xt.set(-1,0,0,0)}}}function i(){let I=!1,at=!1,q=null,xt=null,ct=null;return{setReversed:function(tt){if(at!==tt){const Tt=t.get("EXT_clip_control");tt?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),at=tt;const zt=ct;ct=null,this.setClear(zt)}},getReversed:function(){return at},setTest:function(tt){tt?ot(n.DEPTH_TEST):Dt(n.DEPTH_TEST)},setMask:function(tt){q!==tt&&!I&&(n.depthMask(tt),q=tt)},setFunc:function(tt){if(at&&(tt=qu[tt]),xt!==tt){switch(tt){case Pa:n.depthFunc(n.NEVER);break;case Ia:n.depthFunc(n.ALWAYS);break;case La:n.depthFunc(n.LESS);break;case Qi:n.depthFunc(n.LEQUAL);break;case Da:n.depthFunc(n.EQUAL);break;case Ua:n.depthFunc(n.GEQUAL);break;case Na:n.depthFunc(n.GREATER);break;case Fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xt=tt}},setLocked:function(tt){I=tt},setClear:function(tt){ct!==tt&&(ct=tt,at&&(tt=1-tt),n.clearDepth(tt))},reset:function(){I=!1,q=null,xt=null,ct=null,at=!1}}}function s(){let I=!1,at=null,q=null,xt=null,ct=null,tt=null,Tt=null,zt=null,Ee=null;return{setTest:function(oe){I||(oe?ot(n.STENCIL_TEST):Dt(n.STENCIL_TEST))},setMask:function(oe){at!==oe&&!I&&(n.stencilMask(oe),at=oe)},setFunc:function(oe,Pn,fn){(q!==oe||xt!==Pn||ct!==fn)&&(n.stencilFunc(oe,Pn,fn),q=oe,xt=Pn,ct=fn)},setOp:function(oe,Pn,fn){(tt!==oe||Tt!==Pn||zt!==fn)&&(n.stencilOp(oe,Pn,fn),tt=oe,Tt=Pn,zt=fn)},setLocked:function(oe){I=oe},setClear:function(oe){Ee!==oe&&(n.clearStencil(oe),Ee=oe)},reset:function(){I=!1,at=null,q=null,xt=null,ct=null,tt=null,Tt=null,zt=null,Ee=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h={},m=new WeakMap,_=[],S=null,g=!1,p=null,y=null,T=null,w=null,L=null,A=null,D=null,M=new Qt(0,0,0),R=0,B=!1,P=null,H=null,Y=null,j=null,O=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,nt=0;const it=n.getParameter(n.VERSION);it.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(it)[1]),X=nt>=1):it.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),X=nt>=2);let ft=null,bt={};const wt=n.getParameter(n.SCISSOR_BOX),te=n.getParameter(n.VIEWPORT),re=new Se().fromArray(wt),Vt=new Se().fromArray(te);function J(I,at,q,xt){const ct=new Uint8Array(4),tt=n.createTexture();n.bindTexture(I,tt),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Tt=0;Tt<q;Tt++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(at,0,n.RGBA,1,1,xt,0,n.RGBA,n.UNSIGNED_BYTE,ct):n.texImage2D(at+Tt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ct);return tt}const gt={};gt[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),gt[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),gt[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(n.DEPTH_TEST),a.setFunc(Qi),Re(!1),ge(Rl),ot(n.CULL_FACE),pe(Gn);function ot(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function Dt(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function Bt(I,at){return h[I]!==at?(n.bindFramebuffer(I,at),h[I]=at,I===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=at),I===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=at),!0):!1}function Ut(I,at){let q=_,xt=!1;if(I){q=m.get(at),q===void 0&&(q=[],m.set(at,q));const ct=I.textures;if(q.length!==ct.length||q[0]!==n.COLOR_ATTACHMENT0){for(let tt=0,Tt=ct.length;tt<Tt;tt++)q[tt]=n.COLOR_ATTACHMENT0+tt;q.length=ct.length,xt=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,xt=!0);xt&&n.drawBuffers(q)}function me(I){return S!==I?(n.useProgram(I),S=I,!0):!1}const jt={[xi]:n.FUNC_ADD,[_u]:n.FUNC_SUBTRACT,[xu]:n.FUNC_REVERSE_SUBTRACT};jt[vu]=n.MIN,jt[Mu]=n.MAX;const ae={[Su]:n.ZERO,[yu]:n.ONE,[bu]:n.SRC_COLOR,[Ra]:n.SRC_ALPHA,[Cu]:n.SRC_ALPHA_SATURATE,[wu]:n.DST_COLOR,[Tu]:n.DST_ALPHA,[Eu]:n.ONE_MINUS_SRC_COLOR,[Ca]:n.ONE_MINUS_SRC_ALPHA,[Ru]:n.ONE_MINUS_DST_COLOR,[Au]:n.ONE_MINUS_DST_ALPHA,[Pu]:n.CONSTANT_COLOR,[Iu]:n.ONE_MINUS_CONSTANT_COLOR,[Lu]:n.CONSTANT_ALPHA,[Du]:n.ONE_MINUS_CONSTANT_ALPHA};function pe(I,at,q,xt,ct,tt,Tt,zt,Ee,oe){if(I===Gn){g===!0&&(Dt(n.BLEND),g=!1);return}if(g===!1&&(ot(n.BLEND),g=!0),I!==gu){if(I!==p||oe!==B){if((y!==xi||L!==xi)&&(n.blendEquation(n.FUNC_ADD),y=xi,L=xi),oe)switch(I){case qi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cl:n.blendFunc(n.ONE,n.ONE);break;case Pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Il:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ne("WebGLState: Invalid blending: ",I);break}else switch(I){case qi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Pl:ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Il:ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ne("WebGLState: Invalid blending: ",I);break}T=null,w=null,A=null,D=null,M.set(0,0,0),R=0,p=I,B=oe}return}ct=ct||at,tt=tt||q,Tt=Tt||xt,(at!==y||ct!==L)&&(n.blendEquationSeparate(jt[at],jt[ct]),y=at,L=ct),(q!==T||xt!==w||tt!==A||Tt!==D)&&(n.blendFuncSeparate(ae[q],ae[xt],ae[tt],ae[Tt]),T=q,w=xt,A=tt,D=Tt),(zt.equals(M)===!1||Ee!==R)&&(n.blendColor(zt.r,zt.g,zt.b,Ee),M.copy(zt),R=Ee),p=I,B=!1}function Yt(I,at){I.side===On?Dt(n.CULL_FACE):ot(n.CULL_FACE);let q=I.side===Ye;at&&(q=!q),Re(q),I.blending===qi&&I.transparent===!1?pe(Gn):pe(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const xt=I.stencilWrite;o.setTest(xt),xt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),U(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ot(n.SAMPLE_ALPHA_TO_COVERAGE):Dt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Re(I){P!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),P=I)}function ge(I){I!==fu?(ot(n.CULL_FACE),I!==H&&(I===Rl?n.cullFace(n.BACK):I===pu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Dt(n.CULL_FACE),H=I}function je(I){I!==Y&&(X&&n.lineWidth(I),Y=I)}function U(I,at,q){I?(ot(n.POLYGON_OFFSET_FILL),(j!==at||O!==q)&&(j=at,O=q,a.getReversed()&&(at=-at),n.polygonOffset(at,q))):Dt(n.POLYGON_OFFSET_FILL)}function Ce(I){I?ot(n.SCISSOR_TEST):Dt(n.SCISSOR_TEST)}function Kt(I){I===void 0&&(I=n.TEXTURE0+W-1),ft!==I&&(n.activeTexture(I),ft=I)}function ue(I,at,q){q===void 0&&(ft===null?q=n.TEXTURE0+W-1:q=ft);let xt=bt[q];xt===void 0&&(xt={type:void 0,texture:void 0},bt[q]=xt),(xt.type!==I||xt.texture!==at)&&(ft!==q&&(n.activeTexture(q),ft=q),n.bindTexture(I,at||gt[I]),xt.type=I,xt.texture=at)}function ht(){const I=bt[ft];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function xe(){try{n.compressedTexImage2D(...arguments)}catch(I){ne("WebGLState:",I)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(I){ne("WebGLState:",I)}}function x(){try{n.texSubImage2D(...arguments)}catch(I){ne("WebGLState:",I)}}function k(){try{n.texSubImage3D(...arguments)}catch(I){ne("WebGLState:",I)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(I){ne("WebGLState:",I)}}function et(){try{n.compressedTexSubImage3D(...arguments)}catch(I){ne("WebGLState:",I)}}function st(){try{n.texStorage2D(...arguments)}catch(I){ne("WebGLState:",I)}}function dt(){try{n.texStorage3D(...arguments)}catch(I){ne("WebGLState:",I)}}function $(){try{n.texImage2D(...arguments)}catch(I){ne("WebGLState:",I)}}function Z(){try{n.texImage3D(...arguments)}catch(I){ne("WebGLState:",I)}}function _t(I){return f[I]!==void 0?f[I]:n.getParameter(I)}function St(I,at){f[I]!==at&&(n.pixelStorei(I,at),f[I]=at)}function lt(I){re.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),re.copy(I))}function rt(I){Vt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Vt.copy(I))}function Ft(I,at){let q=c.get(at);q===void 0&&(q=new WeakMap,c.set(at,q));let xt=q.get(I);xt===void 0&&(xt=n.getUniformBlockIndex(at,I.name),q.set(I,xt))}function Wt(I,at){const xt=c.get(at).get(I);l.get(at)!==xt&&(n.uniformBlockBinding(at,xt,I.__bindingPointIndex),l.set(at,xt))}function ie(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},ft=null,bt={},h={},m=new WeakMap,_=[],S=null,g=!1,p=null,y=null,T=null,w=null,L=null,A=null,D=null,M=new Qt(0,0,0),R=0,B=!1,P=null,H=null,Y=null,j=null,O=null,re.set(0,0,n.canvas.width,n.canvas.height),Vt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Dt,bindFramebuffer:Bt,drawBuffers:Ut,useProgram:me,setBlending:pe,setMaterial:Yt,setFlipSided:Re,setCullFace:ge,setLineWidth:je,setPolygonOffset:U,setScissorTest:Ce,activeTexture:Kt,bindTexture:ue,unbindTexture:ht,compressedTexImage2D:xe,compressedTexImage3D:b,texImage2D:$,texImage3D:Z,pixelStorei:St,getParameter:_t,updateUBOMapping:Ft,uniformBlockBinding:Wt,texStorage2D:st,texStorage3D:dt,texSubImage2D:x,texSubImage3D:k,compressedTexSubImage2D:K,compressedTexSubImage3D:et,scissor:lt,viewport:rt,reset:ie}}function bx(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ht,u=new WeakMap,f=new Set;let h;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(b,x){return _?new OffscreenCanvas(b,x):Sr("canvas")}function g(b,x,k){let K=1;const et=xe(b);if((et.width>k||et.height>k)&&(K=k/Math.max(et.width,et.height)),K<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const st=Math.floor(K*et.width),dt=Math.floor(K*et.height);h===void 0&&(h=S(st,dt));const $=x?S(st,dt):h;return $.width=st,$.height=dt,$.getContext("2d").drawImage(b,0,0,st,dt),Lt("WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+st+"x"+dt+")."),$}else return"data"in b&&Lt("WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),b;return b}function p(b){return b.generateMipmaps}function y(b){n.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(b,x,k,K,et,st=!1){if(b!==null){if(n[b]!==void 0)return n[b];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let dt;K&&(dt=t.get("EXT_texture_norm16"),dt||Lt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=x;if(x===n.RED&&(k===n.FLOAT&&($=n.R32F),k===n.HALF_FLOAT&&($=n.R16F),k===n.UNSIGNED_BYTE&&($=n.R8),k===n.UNSIGNED_SHORT&&dt&&($=dt.R16_EXT),k===n.SHORT&&dt&&($=dt.R16_SNORM_EXT)),x===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&($=n.R8UI),k===n.UNSIGNED_SHORT&&($=n.R16UI),k===n.UNSIGNED_INT&&($=n.R32UI),k===n.BYTE&&($=n.R8I),k===n.SHORT&&($=n.R16I),k===n.INT&&($=n.R32I)),x===n.RG&&(k===n.FLOAT&&($=n.RG32F),k===n.HALF_FLOAT&&($=n.RG16F),k===n.UNSIGNED_BYTE&&($=n.RG8),k===n.UNSIGNED_SHORT&&dt&&($=dt.RG16_EXT),k===n.SHORT&&dt&&($=dt.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&($=n.RG8UI),k===n.UNSIGNED_SHORT&&($=n.RG16UI),k===n.UNSIGNED_INT&&($=n.RG32UI),k===n.BYTE&&($=n.RG8I),k===n.SHORT&&($=n.RG16I),k===n.INT&&($=n.RG32I)),x===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&($=n.RGB8UI),k===n.UNSIGNED_SHORT&&($=n.RGB16UI),k===n.UNSIGNED_INT&&($=n.RGB32UI),k===n.BYTE&&($=n.RGB8I),k===n.SHORT&&($=n.RGB16I),k===n.INT&&($=n.RGB32I)),x===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&($=n.RGBA8UI),k===n.UNSIGNED_SHORT&&($=n.RGBA16UI),k===n.UNSIGNED_INT&&($=n.RGBA32UI),k===n.BYTE&&($=n.RGBA8I),k===n.SHORT&&($=n.RGBA16I),k===n.INT&&($=n.RGBA32I)),x===n.RGB&&(k===n.UNSIGNED_SHORT&&dt&&($=dt.RGB16_EXT),k===n.SHORT&&dt&&($=dt.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),x===n.RGBA){const Z=st?Mr:Jt.getTransfer(et);k===n.FLOAT&&($=n.RGBA32F),k===n.HALF_FLOAT&&($=n.RGBA16F),k===n.UNSIGNED_BYTE&&($=Z===se?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&dt&&($=dt.RGBA16_EXT),k===n.SHORT&&dt&&($=dt.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function L(b,x){let k;return b?x===null||x===An||x===ys?k=n.DEPTH24_STENCIL8:x===Sn?k=n.DEPTH32F_STENCIL8:x===Ss&&(k=n.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===An||x===ys?k=n.DEPTH_COMPONENT24:x===Sn?k=n.DEPTH_COMPONENT32F:x===Ss&&(k=n.DEPTH_COMPONENT16),k}function A(b,x){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ue&&b.minFilter!==ze?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function D(b){const x=b.target;x.removeEventListener("dispose",D),R(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&f.delete(x)}function M(b){const x=b.target;x.removeEventListener("dispose",M),P(x)}function R(b){const x=i.get(b);if(x.__webglInit===void 0)return;const k=b.source,K=m.get(k);if(K){const et=K[x.__cacheKey];et.usedTimes--,et.usedTimes===0&&B(b),Object.keys(K).length===0&&m.delete(k)}i.remove(b)}function B(b){const x=i.get(b);n.deleteTexture(x.__webglTexture);const k=b.source,K=m.get(k);delete K[x.__cacheKey],a.memory.textures--}function P(b){const x=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let et=0;et<x.__webglFramebuffer[K].length;et++)n.deleteFramebuffer(x.__webglFramebuffer[K][et]);else n.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)n.deleteFramebuffer(x.__webglFramebuffer[K]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const k=b.textures;for(let K=0,et=k.length;K<et;K++){const st=i.get(k[K]);st.__webglTexture&&(n.deleteTexture(st.__webglTexture),a.memory.textures--),i.remove(k[K])}i.remove(b)}let H=0;function Y(){H=0}function j(){return H}function O(b){H=b}function W(){const b=H;return b>=s.maxTextures&&Lt("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),H+=1,b}function X(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function nt(b,x){const k=i.get(b);if(b.isVideoTexture&&ue(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&k.__version!==b.version){const K=b.image;if(K===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(k,b,x);return}}else b.isExternalTexture&&(k.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+x)}function it(b,x){const k=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){Dt(k,b,x);return}else b.isExternalTexture&&(k.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+x)}function ft(b,x){const k=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){Dt(k,b,x);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+x)}function bt(b,x){const k=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&k.__version!==b.version){Bt(k,b,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+x)}const wt={[Oa]:n.REPEAT,[Bn]:n.CLAMP_TO_EDGE,[Ba]:n.MIRRORED_REPEAT},te={[Ue]:n.NEAREST,[Fu]:n.NEAREST_MIPMAP_NEAREST,[Us]:n.NEAREST_MIPMAP_LINEAR,[ze]:n.LINEAR,[Xr]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},re={[ku]:n.NEVER,[Wu]:n.ALWAYS,[zu]:n.LESS,[Go]:n.LEQUAL,[Gu]:n.EQUAL,[Ho]:n.GEQUAL,[Hu]:n.GREATER,[Vu]:n.NOTEQUAL};function Vt(b,x){if(x.type===Sn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===ze||x.magFilter===Xr||x.magFilter===Us||x.magFilter===Mi||x.minFilter===ze||x.minFilter===Xr||x.minFilter===Us||x.minFilter===Mi)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,wt[x.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,wt[x.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,wt[x.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,te[x.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,te[x.minFilter]),x.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,re[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ue||x.minFilter!==Us&&x.minFilter!==Mi||x.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(b,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function J(b,x){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",D));const K=x.source;let et=m.get(K);et===void 0&&(et={},m.set(K,et));const st=X(x);if(st!==b.__cacheKey){et[st]===void 0&&(et[st]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),et[st].usedTimes++;const dt=et[b.__cacheKey];dt!==void 0&&(et[b.__cacheKey].usedTimes--,dt.usedTimes===0&&B(x)),b.__cacheKey=st,b.__webglTexture=et[st].texture}return k}function gt(b,x,k){return Math.floor(Math.floor(b/k)/x)}function ot(b,x,k,K){const st=b.updateRanges;if(st.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,k,K,x.data);else{st.sort((St,lt)=>St.start-lt.start);let dt=0;for(let St=1;St<st.length;St++){const lt=st[dt],rt=st[St],Ft=lt.start+lt.count,Wt=gt(rt.start,x.width,4),ie=gt(lt.start,x.width,4);rt.start<=Ft+1&&Wt===ie&&gt(rt.start+rt.count-1,x.width,4)===Wt?lt.count=Math.max(lt.count,rt.start+rt.count-lt.start):(++dt,st[dt]=rt)}st.length=dt+1;const $=e.getParameter(n.UNPACK_ROW_LENGTH),Z=e.getParameter(n.UNPACK_SKIP_PIXELS),_t=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let St=0,lt=st.length;St<lt;St++){const rt=st[St],Ft=Math.floor(rt.start/4),Wt=Math.ceil(rt.count/4),ie=Ft%x.width,I=Math.floor(Ft/x.width),at=Wt,q=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ie),e.pixelStorei(n.UNPACK_SKIP_ROWS,I),e.texSubImage2D(n.TEXTURE_2D,0,ie,I,at,q,k,K,x.data)}b.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,$),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(n.UNPACK_SKIP_ROWS,_t)}}function Dt(b,x,k){let K=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=n.TEXTURE_3D);const et=J(b,x),st=x.source;e.bindTexture(K,b.__webglTexture,n.TEXTURE0+k);const dt=i.get(st);if(st.version!==dt.__version||et===!0){if(e.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const q=Jt.getPrimaries(Jt.workingColorSpace),xt=x.colorSpace===si?null:Jt.getPrimaries(x.colorSpace),ct=x.colorSpace===si||q===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct)}e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let Z=g(x.image,!1,s.maxTextureSize);Z=ht(x,Z);const _t=r.convert(x.format,x.colorSpace),St=r.convert(x.type);let lt=w(x.internalFormat,_t,St,x.normalized,x.colorSpace,x.isVideoTexture);Vt(K,x);let rt;const Ft=x.mipmaps,Wt=x.isVideoTexture!==!0,ie=dt.__version===void 0||et===!0,I=st.dataReady,at=A(x,Z);if(x.isDepthTexture)lt=L(x.format===Si,x.type),ie&&(Wt?e.texStorage2D(n.TEXTURE_2D,1,lt,Z.width,Z.height):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,_t,St,null));else if(x.isDataTexture)if(Ft.length>0){Wt&&ie&&e.texStorage2D(n.TEXTURE_2D,at,lt,Ft[0].width,Ft[0].height);for(let q=0,xt=Ft.length;q<xt;q++)rt=Ft[q],Wt?I&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,rt.width,rt.height,_t,St,rt.data):e.texImage2D(n.TEXTURE_2D,q,lt,rt.width,rt.height,0,_t,St,rt.data);x.generateMipmaps=!1}else Wt?(ie&&e.texStorage2D(n.TEXTURE_2D,at,lt,Z.width,Z.height),I&&ot(x,Z,_t,St)):e.texImage2D(n.TEXTURE_2D,0,lt,Z.width,Z.height,0,_t,St,Z.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Wt&&ie&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,lt,Ft[0].width,Ft[0].height,Z.depth);for(let q=0,xt=Ft.length;q<xt;q++)if(rt=Ft[q],x.format!==un)if(_t!==null)if(Wt){if(I)if(x.layerUpdates.size>0){const ct=cc(rt.width,rt.height,x.format,x.type);for(const tt of x.layerUpdates){const Tt=rt.data.subarray(tt*ct/rt.data.BYTES_PER_ELEMENT,(tt+1)*ct/rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,tt,rt.width,rt.height,1,_t,Tt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,rt.width,rt.height,Z.depth,_t,rt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,q,lt,rt.width,rt.height,Z.depth,0,rt.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?I&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,rt.width,rt.height,Z.depth,_t,St,rt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,q,lt,rt.width,rt.height,Z.depth,0,_t,St,rt.data)}else{Wt&&ie&&e.texStorage2D(n.TEXTURE_2D,at,lt,Ft[0].width,Ft[0].height);for(let q=0,xt=Ft.length;q<xt;q++)rt=Ft[q],x.format!==un?_t!==null?Wt?I&&e.compressedTexSubImage2D(n.TEXTURE_2D,q,0,0,rt.width,rt.height,_t,rt.data):e.compressedTexImage2D(n.TEXTURE_2D,q,lt,rt.width,rt.height,0,rt.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?I&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,rt.width,rt.height,_t,St,rt.data):e.texImage2D(n.TEXTURE_2D,q,lt,rt.width,rt.height,0,_t,St,rt.data)}else if(x.isDataArrayTexture)if(Wt){if(ie&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,lt,Z.width,Z.height,Z.depth),I)if(x.layerUpdates.size>0){const q=cc(Z.width,Z.height,x.format,x.type);for(const xt of x.layerUpdates){const ct=Z.data.subarray(xt*q/Z.data.BYTES_PER_ELEMENT,(xt+1)*q/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xt,Z.width,Z.height,1,_t,St,ct)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,_t,St,Z.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,lt,Z.width,Z.height,Z.depth,0,_t,St,Z.data);else if(x.isData3DTexture)Wt?(ie&&e.texStorage3D(n.TEXTURE_3D,at,lt,Z.width,Z.height,Z.depth),I&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,_t,St,Z.data)):e.texImage3D(n.TEXTURE_3D,0,lt,Z.width,Z.height,Z.depth,0,_t,St,Z.data);else if(x.isFramebufferTexture){if(ie)if(Wt)e.texStorage2D(n.TEXTURE_2D,at,lt,Z.width,Z.height);else{let q=Z.width,xt=Z.height;for(let ct=0;ct<at;ct++)e.texImage2D(n.TEXTURE_2D,ct,lt,q,xt,0,_t,St,null),q>>=1,xt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const q=n.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),Z.parentNode!==q){q.appendChild(Z),f.add(x),q.onpaint=zt=>{const Ee=zt.changedElements;for(const oe of f)Ee.includes(oe.image)&&(oe.needsUpdate=!0)},q.requestPaint();return}const xt=0,ct=n.RGBA,tt=n.RGBA,Tt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,xt,ct,tt,Tt,Z),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ft.length>0){if(Wt&&ie){const q=xe(Ft[0]);e.texStorage2D(n.TEXTURE_2D,at,lt,q.width,q.height)}for(let q=0,xt=Ft.length;q<xt;q++)rt=Ft[q],Wt?I&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,_t,St,rt):e.texImage2D(n.TEXTURE_2D,q,lt,_t,St,rt);x.generateMipmaps=!1}else if(Wt){if(ie){const q=xe(Z);e.texStorage2D(n.TEXTURE_2D,at,lt,q.width,q.height)}I&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,St,Z)}else e.texImage2D(n.TEXTURE_2D,0,lt,_t,St,Z);p(x)&&y(K),dt.__version=st.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Bt(b,x,k){if(x.image.length!==6)return;const K=J(b,x),et=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+k);const st=i.get(et);if(et.version!==st.__version||K===!0){e.activeTexture(n.TEXTURE0+k);const dt=Jt.getPrimaries(Jt.workingColorSpace),$=x.colorSpace===si?null:Jt.getPrimaries(x.colorSpace),Z=x.colorSpace===si||dt===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const _t=x.isCompressedTexture||x.image[0].isCompressedTexture,St=x.image[0]&&x.image[0].isDataTexture,lt=[];for(let tt=0;tt<6;tt++)!_t&&!St?lt[tt]=g(x.image[tt],!0,s.maxCubemapSize):lt[tt]=St?x.image[tt].image:x.image[tt],lt[tt]=ht(x,lt[tt]);const rt=lt[0],Ft=r.convert(x.format,x.colorSpace),Wt=r.convert(x.type),ie=w(x.internalFormat,Ft,Wt,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,at=st.__version===void 0||K===!0,q=et.dataReady;let xt=A(x,rt);Vt(n.TEXTURE_CUBE_MAP,x);let ct;if(_t){I&&at&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ie,rt.width,rt.height);for(let tt=0;tt<6;tt++){ct=lt[tt].mipmaps;for(let Tt=0;Tt<ct.length;Tt++){const zt=ct[Tt];x.format!==un?Ft!==null?I?q&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,0,0,zt.width,zt.height,Ft,zt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,ie,zt.width,zt.height,0,zt.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,0,0,zt.width,zt.height,Ft,Wt,zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt,ie,zt.width,zt.height,0,Ft,Wt,zt.data)}}}else{if(ct=x.mipmaps,I&&at){ct.length>0&&xt++;const tt=xe(lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ie,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(St){I?q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,lt[tt].width,lt[tt].height,Ft,Wt,lt[tt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ie,lt[tt].width,lt[tt].height,0,Ft,Wt,lt[tt].data);for(let Tt=0;Tt<ct.length;Tt++){const Ee=ct[Tt].image[tt].image;I?q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,0,0,Ee.width,Ee.height,Ft,Wt,Ee.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,ie,Ee.width,Ee.height,0,Ft,Wt,Ee.data)}}else{I?q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ft,Wt,lt[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ie,Ft,Wt,lt[tt]);for(let Tt=0;Tt<ct.length;Tt++){const zt=ct[Tt];I?q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,0,0,Ft,Wt,zt.image[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Tt+1,ie,Ft,Wt,zt.image[tt])}}}p(x)&&y(n.TEXTURE_CUBE_MAP),st.__version=et.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Ut(b,x,k,K,et,st){const dt=r.convert(k.format,k.colorSpace),$=r.convert(k.type),Z=w(k.internalFormat,dt,$,k.normalized,k.colorSpace),_t=i.get(x),St=i.get(k);if(St.__renderTarget=x,!_t.__hasExternalTextures){const lt=Math.max(1,x.width>>st),rt=Math.max(1,x.height>>st);et===n.TEXTURE_3D||et===n.TEXTURE_2D_ARRAY?e.texImage3D(et,st,Z,lt,rt,x.depth,0,dt,$,null):e.texImage2D(et,st,Z,lt,rt,0,dt,$,null)}e.bindFramebuffer(n.FRAMEBUFFER,b),Kt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,et,St.__webglTexture,0,Ce(x)):(et===n.TEXTURE_2D||et>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,et,St.__webglTexture,st),e.bindFramebuffer(n.FRAMEBUFFER,null)}function me(b,x,k){if(n.bindRenderbuffer(n.RENDERBUFFER,b),x.depthBuffer){const K=x.depthTexture,et=K&&K.isDepthTexture?K.type:null,st=L(x.stencilBuffer,et),dt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Kt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce(x),st,x.width,x.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce(x),st,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,st,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,dt,n.RENDERBUFFER,b)}else{const K=x.textures;for(let et=0;et<K.length;et++){const st=K[et],dt=r.convert(st.format,st.colorSpace),$=r.convert(st.type),Z=w(st.internalFormat,dt,$,st.normalized,st.colorSpace);Kt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce(x),Z,x.width,x.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce(x),Z,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Z,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function jt(b,x,k){const K=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const et=i.get(x.depthTexture);if(et.__renderTarget=x,(!et.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),K){if(et.__webglInit===void 0&&(et.__webglInit=!0,x.depthTexture.addEventListener("dispose",D)),et.__webglTexture===void 0){et.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,et.__webglTexture),Vt(n.TEXTURE_CUBE_MAP,x.depthTexture);const _t=r.convert(x.depthTexture.format),St=r.convert(x.depthTexture.type);let lt;x.depthTexture.format===$n?lt=n.DEPTH_COMPONENT24:x.depthTexture.format===Si&&(lt=n.DEPTH24_STENCIL8);for(let rt=0;rt<6;rt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,lt,x.width,x.height,0,_t,St,null)}}else nt(x.depthTexture,0);const st=et.__webglTexture,dt=Ce(x),$=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,Z=x.depthTexture.format===Si?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===$n)Kt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,$,st,0,dt):n.framebufferTexture2D(n.FRAMEBUFFER,Z,$,st,0);else if(x.depthTexture.format===Si)Kt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,$,st,0,dt):n.framebufferTexture2D(n.FRAMEBUFFER,Z,$,st,0);else throw new Error("Unknown depthTexture format")}function ae(b){const x=i.get(b),k=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const K=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),K){const et=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,K.removeEventListener("dispose",et)};K.addEventListener("dispose",et),x.__depthDisposeCallback=et}x.__boundDepthTexture=K}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(k)for(let K=0;K<6;K++)jt(x.__webglFramebuffer[K],b,K);else{const K=b.texture.mipmaps;K&&K.length>0?jt(x.__webglFramebuffer[0],b,0):jt(x.__webglFramebuffer,b,0)}else if(k){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]===void 0)x.__webglDepthbuffer[K]=n.createRenderbuffer(),me(x.__webglDepthbuffer[K],b,!1);else{const et=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,st)}}else{const K=b.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),me(x.__webglDepthbuffer,b,!1);else{const et=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,st)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function pe(b,x,k){const K=i.get(b);x!==void 0&&Ut(K.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&ae(b)}function Yt(b){const x=b.texture,k=i.get(b),K=i.get(x);b.addEventListener("dispose",M);const et=b.textures,st=b.isWebGLCubeRenderTarget===!0,dt=et.length>1;if(dt||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=x.version,a.memory.textures++),st){k.__webglFramebuffer=[];for(let $=0;$<6;$++)if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer[$]=[];for(let Z=0;Z<x.mipmaps.length;Z++)k.__webglFramebuffer[$][Z]=n.createFramebuffer()}else k.__webglFramebuffer[$]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer=[];for(let $=0;$<x.mipmaps.length;$++)k.__webglFramebuffer[$]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(dt)for(let $=0,Z=et.length;$<Z;$++){const _t=i.get(et[$]);_t.__webglTexture===void 0&&(_t.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&Kt(b)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let $=0;$<et.length;$++){const Z=et[$];k.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[$]);const _t=r.convert(Z.format,Z.colorSpace),St=r.convert(Z.type),lt=w(Z.internalFormat,_t,St,Z.normalized,Z.colorSpace,b.isXRRenderTarget===!0),rt=Ce(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,rt,lt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,k.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),me(k.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(st){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Vt(n.TEXTURE_CUBE_MAP,x);for(let $=0;$<6;$++)if(x.mipmaps&&x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)Ut(k.__webglFramebuffer[$][Z],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Z);else Ut(k.__webglFramebuffer[$],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);p(x)&&y(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let $=0,Z=et.length;$<Z;$++){const _t=et[$],St=i.get(_t);let lt=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(lt=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,St.__webglTexture),Vt(lt,_t),Ut(k.__webglFramebuffer,b,_t,n.COLOR_ATTACHMENT0+$,lt,0),p(_t)&&y(lt)}e.unbindTexture()}else{let $=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&($=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture($,K.__webglTexture),Vt($,x),x.mipmaps&&x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)Ut(k.__webglFramebuffer[Z],b,x,n.COLOR_ATTACHMENT0,$,Z);else Ut(k.__webglFramebuffer,b,x,n.COLOR_ATTACHMENT0,$,0);p(x)&&y($),e.unbindTexture()}b.depthBuffer&&ae(b)}function Re(b){const x=b.textures;for(let k=0,K=x.length;k<K;k++){const et=x[k];if(p(et)){const st=T(b),dt=i.get(et).__webglTexture;e.bindTexture(st,dt),y(st),e.unbindTexture()}}}const ge=[],je=[];function U(b){if(b.samples>0){if(Kt(b)===!1){const x=b.textures,k=b.width,K=b.height;let et=n.COLOR_BUFFER_BIT;const st=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=i.get(b),$=x.length>1;if($)for(let _t=0;_t<x.length;_t++)e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer);const Z=b.texture.mipmaps;Z&&Z.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let _t=0;_t<x.length;_t++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(et|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(et|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const St=i.get(x[_t]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,St,0)}n.blitFramebuffer(0,0,k,K,0,0,k,K,et,n.NEAREST),l===!0&&(ge.length=0,je.length=0,ge.push(n.COLOR_ATTACHMENT0+_t),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ge.push(st),je.push(st),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,je)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ge))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let _t=0;_t<x.length;_t++){e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const St=i.get(x[_t]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,St,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const x=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Ce(b){return Math.min(s.maxSamples,b.samples)}function Kt(b){const x=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ue(b){const x=a.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function ht(b,x){const k=b.colorSpace,K=b.format,et=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||k!==vr&&k!==si&&(Jt.getTransfer(k)===se?(K!==un||et!==tn)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ne("WebGLTextures: Unsupported texture color space:",k)),x}function xe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=Y,this.getTextureUnits=j,this.setTextureUnits=O,this.setTexture2D=nt,this.setTexture2DArray=it,this.setTexture3D=ft,this.setTextureCube=bt,this.rebindTextures=pe,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Ut,this.useMultisampledRTT=Kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Ex(n,t){function e(i,s=si){let r;const a=Jt.getTransfer(s);if(i===tn)return n.UNSIGNED_BYTE;if(i===Fo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Oo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Rd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Cd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ad)return n.BYTE;if(i===wd)return n.SHORT;if(i===Ss)return n.UNSIGNED_SHORT;if(i===No)return n.INT;if(i===An)return n.UNSIGNED_INT;if(i===Sn)return n.FLOAT;if(i===Xn)return n.HALF_FLOAT;if(i===Pd)return n.ALPHA;if(i===Id)return n.RGB;if(i===un)return n.RGBA;if(i===$n)return n.DEPTH_COMPONENT;if(i===Si)return n.DEPTH_STENCIL;if(i===Ld)return n.RED;if(i===Bo)return n.RED_INTEGER;if(i===Ri)return n.RG;if(i===ko)return n.RG_INTEGER;if(i===zo)return n.RGBA_INTEGER;if(i===dr||i===hr||i===ur||i===fr)if(a===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ka||i===za||i===Ga||i===Ha)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Va||i===Wa||i===Xa||i===$a||i===Ya||i===_r||i===qa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Va||i===Wa)return a===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Xa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===$a)return r.COMPRESSED_R11_EAC;if(i===Ya)return r.COMPRESSED_SIGNED_R11_EAC;if(i===_r)return r.COMPRESSED_RG11_EAC;if(i===qa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ja||i===Ka||i===Za||i===Ja||i===Qa||i===to||i===eo||i===no||i===io||i===so||i===ro||i===ao||i===oo||i===lo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ja)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ka)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Za)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ja)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===to)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===eo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===no)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===io)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===so)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ro)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ao)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===co||i===ho||i===uo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===co)return a===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===uo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fo||i===po||i===xr||i===mo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===fo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===po)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ys?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const Tx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ax=`
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

}`;class wx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Hd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Rn({vertexShader:Tx,fragmentShader:Ax,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new wn(new Ir(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Rx extends ui{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,m=null,_=null;const S=typeof XRWebGLBinding<"u",g=new wx,p={},y=e.getContextAttributes();let T=null,w=null;const L=[],A=[],D=new Ht;let M=null;const R=new hn;R.viewport=new Se;const B=new hn;B.viewport=new Se;const P=[R,B],H=new Ff;let Y=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let gt=L[J];return gt===void 0&&(gt=new Jr,L[J]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function(J){let gt=L[J];return gt===void 0&&(gt=new Jr,L[J]=gt),gt.getGripSpace()},this.getHand=function(J){let gt=L[J];return gt===void 0&&(gt=new Jr,L[J]=gt),gt.getHandSpace()};function O(J){const gt=A.indexOf(J.inputSource);if(gt===-1)return;const ot=L[gt];ot!==void 0&&(ot.update(J.inputSource,J.frame,c||a),ot.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",X);for(let J=0;J<L.length;J++){const gt=A[J];gt!==null&&(A[J]=null,L[J].disconnect(gt))}Y=null,j=null,g.reset();for(const J in p)delete p[J];t.setRenderTarget(T),m=null,h=null,f=null,s=null,w=null,Vt.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",W),s.addEventListener("inputsourceschange",X),y.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(D),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,Dt=null,Bt=null;y.depth&&(Bt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=y.stencil?Si:$n,Dt=y.stencil?ys:An);const Ut={colorFormat:e.RGBA8,depthFormat:Bt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),w=new En(h.textureWidth,h.textureHeight,{format:un,type:tn,depthTexture:new es(h.textureWidth,h.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ot={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new En(m.framebufferWidth,m.framebufferHeight,{format:un,type:tn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Vt.setContext(s),Vt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X(J){for(let gt=0;gt<J.removed.length;gt++){const ot=J.removed[gt],Dt=A.indexOf(ot);Dt>=0&&(A[Dt]=null,L[Dt].disconnect(ot))}for(let gt=0;gt<J.added.length;gt++){const ot=J.added[gt];let Dt=A.indexOf(ot);if(Dt===-1){for(let Ut=0;Ut<L.length;Ut++)if(Ut>=A.length){A.push(ot),Dt=Ut;break}else if(A[Ut]===null){A[Ut]=ot,Dt=Ut;break}if(Dt===-1)break}const Bt=L[Dt];Bt&&Bt.connect(ot)}}const nt=new F,it=new F;function ft(J,gt,ot){nt.setFromMatrixPosition(gt.matrixWorld),it.setFromMatrixPosition(ot.matrixWorld);const Dt=nt.distanceTo(it),Bt=gt.projectionMatrix.elements,Ut=ot.projectionMatrix.elements,me=Bt[14]/(Bt[10]-1),jt=Bt[14]/(Bt[10]+1),ae=(Bt[9]+1)/Bt[5],pe=(Bt[9]-1)/Bt[5],Yt=(Bt[8]-1)/Bt[0],Re=(Ut[8]+1)/Ut[0],ge=me*Yt,je=me*Re,U=Dt/(-Yt+Re),Ce=U*-Yt;if(gt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ce),J.translateZ(U),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Bt[10]===-1)J.projectionMatrix.copy(gt.projectionMatrix),J.projectionMatrixInverse.copy(gt.projectionMatrixInverse);else{const Kt=me+U,ue=jt+U,ht=ge-Ce,xe=je+(Dt-Ce),b=ae*jt/ue*Kt,x=pe*jt/ue*Kt;J.projectionMatrix.makePerspective(ht,xe,b,x,Kt,ue),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function bt(J,gt){gt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(gt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let gt=J.near,ot=J.far;g.texture!==null&&(g.depthNear>0&&(gt=g.depthNear),g.depthFar>0&&(ot=g.depthFar)),H.near=B.near=R.near=gt,H.far=B.far=R.far=ot,(Y!==H.near||j!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),Y=H.near,j=H.far),H.layers.mask=J.layers.mask|6,R.layers.mask=H.layers.mask&-5,B.layers.mask=H.layers.mask&-3;const Dt=J.parent,Bt=H.cameras;bt(H,Dt);for(let Ut=0;Ut<Bt.length;Ut++)bt(Bt[Ut],Dt);Bt.length===2?ft(H,R,B):H.projectionMatrix.copy(R.projectionMatrix),wt(J,H,Dt)};function wt(J,gt,ot){ot===null?J.matrix.copy(gt.matrixWorld):(J.matrix.copy(ot.matrixWorld),J.matrix.invert(),J.matrix.multiply(gt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(gt.projectionMatrix),J.projectionMatrixInverse.copy(gt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=xo*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(J){l=J,h!==null&&(h.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(J){return p[J]};let te=null;function re(J,gt){if(u=gt.getViewerPose(c||a),_=gt,u!==null){const ot=u.views;m!==null&&(t.setRenderTargetFramebuffer(w,m.framebuffer),t.setRenderTarget(w));let Dt=!1;ot.length!==H.cameras.length&&(H.cameras.length=0,Dt=!0);for(let jt=0;jt<ot.length;jt++){const ae=ot[jt];let pe=null;if(m!==null)pe=m.getViewport(ae);else{const Re=f.getViewSubImage(h,ae);pe=Re.viewport,jt===0&&(t.setRenderTargetTextures(w,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(w))}let Yt=P[jt];Yt===void 0&&(Yt=new hn,Yt.layers.enable(jt),Yt.viewport=new Se,P[jt]=Yt),Yt.matrix.fromArray(ae.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(ae.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(pe.x,pe.y,pe.width,pe.height),jt===0&&(H.matrix.copy(Yt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Dt===!0&&H.cameras.push(Yt)}const Bt=s.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const jt=f.getDepthInformation(ot[0]);jt&&jt.isValid&&jt.texture&&g.init(jt,s.renderState)}if(Bt&&Bt.includes("camera-access")&&S){t.state.unbindTexture(),f=i.getBinding();for(let jt=0;jt<ot.length;jt++){const ae=ot[jt].camera;if(ae){let pe=p[ae];pe||(pe=new Hd,p[ae]=pe);const Yt=f.getCameraImage(ae);pe.sourceTexture=Yt}}}}for(let ot=0;ot<L.length;ot++){const Dt=A[ot],Bt=L[ot];Dt!==null&&Bt!==void 0&&Bt.update(Dt,gt,c||a)}te&&te(J,gt),gt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:gt}),_=null}const Vt=new $d;Vt.setAnimationLoop(re),this.setAnimationLoop=function(J){te=J},this.dispose=function(){}}}const Cx=new ye,Qd=new kt;Qd.set(-1,0,0,0,1,0,0,0,1);function Px(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Vd(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,T,w){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&m(g,p,w)):p.isMeshMatcapMaterial?(r(g,p),_(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),S(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,y,T):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ye&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ye&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=t.get(p),T=y.envMap,w=y.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(w)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Qd),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=T*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ye&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function S(g,p){const y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Ix(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){const w=T.program;i.uniformBlockBinding(y,w)}function c(y,T){let w=s[y.id];w===void 0&&(_(y),w=u(y),s[y.id]=w,y.addEventListener("dispose",g));const L=T.program;i.updateUBOMapping(y,L);const A=t.render.frame;r[y.id]!==A&&(h(y),r[y.id]=A)}function u(y){const T=f();y.__bindingPointIndex=T;const w=n.createBuffer(),L=y.__size,A=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,w),w}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const T=s[y.id],w=y.uniforms,L=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let A=0,D=w.length;A<D;A++){const M=Array.isArray(w[A])?w[A]:[w[A]];for(let R=0,B=M.length;R<B;R++){const P=M[R];if(m(P,A,R,L)===!0){const H=P.__offset,Y=Array.isArray(P.value)?P.value:[P.value];let j=0;for(let O=0;O<Y.length;O++){const W=Y[O],X=S(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,H+j,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):ArrayBuffer.isView(W)?P.__data.set(new W.constructor(W.buffer,W.byteOffset,P.__data.length)):(W.toArray(P.__data,j),j+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(y,T,w,L){const A=y.value,D=T+"_"+w;if(L[D]===void 0)return typeof A=="number"||typeof A=="boolean"?L[D]=A:ArrayBuffer.isView(A)?L[D]=A.slice():L[D]=A.clone(),!0;{const M=L[D];if(typeof A=="number"||typeof A=="boolean"){if(M!==A)return L[D]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(M.equals(A)===!1)return M.copy(A),!0}}return!1}function _(y){const T=y.uniforms;let w=0;const L=16;for(let D=0,M=T.length;D<M;D++){const R=Array.isArray(T[D])?T[D]:[T[D]];for(let B=0,P=R.length;B<P;B++){const H=R[B],Y=Array.isArray(H.value)?H.value:[H.value];for(let j=0,O=Y.length;j<O;j++){const W=Y[j],X=S(W),nt=w%L,it=nt%X.boundary,ft=nt+it;w+=it,ft!==0&&L-ft<X.storage&&(w+=L-ft),H.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=w,w+=X.storage}}}const A=w%L;return A>0&&(w+=L-A),y.__size=w,y.__cache={},this}function S(y){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Lt("WebGLRenderer: Unsupported uniform value type.",y),T}function g(y){const T=y.target;T.removeEventListener("dispose",g);const w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function p(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}const Lx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _n=null;function Dx(){return _n===null&&(_n=new _f(Lx,16,16,Ri,Xn),_n.name="DFG_LUT",_n.minFilter=ze,_n.magFilter=ze,_n.wrapS=Bn,_n.wrapT=Bn,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}class Ux{constructor(t={}){const{canvas:e=$u(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:m=tn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const S=m,g=new Set([zo,ko,Bo]),p=new Set([tn,An,Ss,ys,Fo,Oo]),y=new Uint32Array(4),T=new Int32Array(4),w=new F;let L=null,A=null;const D=[],M=[];let R=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let P=!1,H=null;this._outputColorSpace=Qe;let Y=0,j=0,O=null,W=-1,X=null;const nt=new Se,it=new Se;let ft=null;const bt=new Qt(0);let wt=0,te=e.width,re=e.height,Vt=1,J=null,gt=null;const ot=new Se(0,0,te,re),Dt=new Se(0,0,te,re);let Bt=!1;const Ut=new Xo;let me=!1,jt=!1;const ae=new ye,pe=new F,Yt=new Se,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function je(){return O===null?Vt:1}let U=i;function Ce(v,N){return e.getContext(v,N)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Uo}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",zt,!1),U===null){const N="webgl2";if(U=Ce(N,v),U===null)throw Ce(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw ne("WebGLRenderer: "+v.message),v}let Kt,ue,ht,xe,b,x,k,K,et,st,dt,$,Z,_t,St,lt,rt,Ft,Wt,ie,I,at,q;function xt(){Kt=new Dg(U),Kt.init(),I=new Ex(U,Kt),ue=new Tg(U,Kt,t,I),ht=new yx(U,Kt),ue.reversedDepthBuffer&&h&&ht.buffers.depth.setReversed(!0),xe=new Fg(U),b=new lx,x=new bx(U,Kt,ht,b,ue,I,xe),k=new Lg(B),K=new zf(U),at=new bg(U,K),et=new Ug(U,K,xe,at),st=new Bg(U,et,K,at,xe),Ft=new Og(U,ue,x),St=new Ag(b),dt=new ox(B,k,Kt,ue,at,St),$=new Px(B,b),Z=new dx,_t=new gx(Kt),rt=new yg(B,k,ht,st,_,l),lt=new Sx(B,st,ue),q=new Ix(U,xe,ue,ht),Wt=new Eg(U,Kt,xe),ie=new Ng(U,Kt,xe),xe.programs=dt.programs,B.capabilities=ue,B.extensions=Kt,B.properties=b,B.renderLists=Z,B.shadowMap=lt,B.state=ht,B.info=xe}xt(),S!==tn&&(R=new zg(S,e.width,e.height,s,r));const ct=new Rx(B,U);this.xr=ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const v=Kt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Kt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Vt},this.setPixelRatio=function(v){v!==void 0&&(Vt=v,this.setSize(te,re,!1))},this.getSize=function(v){return v.set(te,re)},this.setSize=function(v,N,V=!0){if(ct.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}te=v,re=N,e.width=Math.floor(v*Vt),e.height=Math.floor(N*Vt),V===!0&&(e.style.width=v+"px",e.style.height=N+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,v,N)},this.getDrawingBufferSize=function(v){return v.set(te*Vt,re*Vt).floor()},this.setDrawingBufferSize=function(v,N,V){te=v,re=N,Vt=V,e.width=Math.floor(v*V),e.height=Math.floor(N*V),this.setViewport(0,0,v,N)},this.setEffects=function(v){if(S===tn){ne("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let N=0;N<v.length;N++)if(v[N].isOutputPass===!0){Lt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(nt)},this.getViewport=function(v){return v.copy(ot)},this.setViewport=function(v,N,V,z){v.isVector4?ot.set(v.x,v.y,v.z,v.w):ot.set(v,N,V,z),ht.viewport(nt.copy(ot).multiplyScalar(Vt).round())},this.getScissor=function(v){return v.copy(Dt)},this.setScissor=function(v,N,V,z){v.isVector4?Dt.set(v.x,v.y,v.z,v.w):Dt.set(v,N,V,z),ht.scissor(it.copy(Dt).multiplyScalar(Vt).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(v){ht.setScissorTest(Bt=v)},this.setOpaqueSort=function(v){J=v},this.setTransparentSort=function(v){gt=v},this.getClearColor=function(v){return v.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(v=!0,N=!0,V=!0){let z=0;if(v){let G=!1;if(O!==null){const mt=O.texture.format;G=g.has(mt)}if(G){const mt=O.texture.type,yt=p.has(mt),pt=rt.getClearColor(),Et=rt.getClearAlpha(),At=pt.r,Gt=pt.g,$t=pt.b;yt?(y[0]=At,y[1]=Gt,y[2]=$t,y[3]=Et,U.clearBufferuiv(U.COLOR,0,y)):(T[0]=At,T[1]=Gt,T[2]=$t,T[3]=Et,U.clearBufferiv(U.COLOR,0,T))}else z|=U.COLOR_BUFFER_BIT}N&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),H=v},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",zt,!1),rt.dispose(),Z.dispose(),_t.dispose(),b.dispose(),k.dispose(),st.dispose(),at.dispose(),q.dispose(),dt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",gl),ct.removeEventListener("sessionend",_l),fi.stop()};function tt(v){v.preventDefault(),Fl("WebGLRenderer: Context Lost."),P=!0}function Tt(){Fl("WebGLRenderer: Context Restored."),P=!1;const v=xe.autoReset,N=lt.enabled,V=lt.autoUpdate,z=lt.needsUpdate,G=lt.type;xt(),xe.autoReset=v,lt.enabled=N,lt.autoUpdate=V,lt.needsUpdate=z,lt.type=G}function zt(v){ne("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ee(v){const N=v.target;N.removeEventListener("dispose",Ee),oe(N)}function oe(v){Pn(v),b.remove(v)}function Pn(v){const N=b.get(v).programs;N!==void 0&&(N.forEach(function(V){dt.releaseProgram(V)}),v.isShaderMaterial&&dt.releaseShaderCache(v))}this.renderBufferDirect=function(v,N,V,z,G,mt){N===null&&(N=Re);const yt=G.isMesh&&G.matrixWorld.determinant()<0,pt=Fh(v,N,V,z,G);ht.setMaterial(z,yt);let Et=V.index,At=1;if(z.wireframe===!0){if(Et=et.getWireframeAttribute(V),Et===void 0)return;At=2}const Gt=V.drawRange,$t=V.attributes.position;let Rt=Gt.start*At,le=(Gt.start+Gt.count)*At;mt!==null&&(Rt=Math.max(Rt,mt.start*At),le=Math.min(le,(mt.start+mt.count)*At)),Et!==null?(Rt=Math.max(Rt,0),le=Math.min(le,Et.count)):$t!=null&&(Rt=Math.max(Rt,0),le=Math.min(le,$t.count));const Te=le-Rt;if(Te<0||Te===1/0)return;at.setup(G,z,pt,V,Et);let ve,de=Wt;if(Et!==null&&(ve=K.get(Et),de=ie,de.setIndex(ve)),G.isMesh)z.wireframe===!0?(ht.setLineWidth(z.wireframeLinewidth*je()),de.setMode(U.LINES)):de.setMode(U.TRIANGLES);else if(G.isLine){let Oe=z.linewidth;Oe===void 0&&(Oe=1),ht.setLineWidth(Oe*je()),G.isLineSegments?de.setMode(U.LINES):G.isLineLoop?de.setMode(U.LINE_LOOP):de.setMode(U.LINE_STRIP)}else G.isPoints?de.setMode(U.POINTS):G.isSprite&&de.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(Kt.get("WEBGL_multi_draw"))de.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Oe=G._multiDrawStarts,Mt=G._multiDrawCounts,Ke=G._multiDrawCount,ee=Et?K.get(Et).bytesPerElement:1,en=b.get(z).currentProgram.getUniforms();for(let pn=0;pn<Ke;pn++)en.setValue(U,"_gl_DrawID",pn),de.render(Oe[pn]/ee,Mt[pn])}else if(G.isInstancedMesh)de.renderInstances(Rt,Te,G.count);else if(V.isInstancedBufferGeometry){const Oe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Mt=Math.min(V.instanceCount,Oe);de.renderInstances(Rt,Te,Mt)}else de.render(Rt,Te)};function fn(v,N,V){v.transparent===!0&&v.side===On&&v.forceSinglePass===!1?(v.side=Ye,v.needsUpdate=!0,Ls(v,N,V),v.side=ci,v.needsUpdate=!0,Ls(v,N,V),v.side=On):Ls(v,N,V)}this.compile=function(v,N,V=null){V===null&&(V=v),A=_t.get(V),A.init(N),M.push(A),V.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(A.pushLight(G),G.castShadow&&A.pushShadow(G))}),v!==V&&v.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(A.pushLight(G),G.castShadow&&A.pushShadow(G))}),A.setupLights();const z=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const mt=G.material;if(mt)if(Array.isArray(mt))for(let yt=0;yt<mt.length;yt++){const pt=mt[yt];fn(pt,V,G),z.add(pt)}else fn(mt,V,G),z.add(mt)}),A=M.pop(),z},this.compileAsync=function(v,N,V=null){const z=this.compile(v,N,V);return new Promise(G=>{function mt(){if(z.forEach(function(yt){b.get(yt).currentProgram.isReady()&&z.delete(yt)}),z.size===0){G(v);return}setTimeout(mt,10)}Kt.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let zr=null;function Uh(v){zr&&zr(v)}function gl(){fi.stop()}function _l(){fi.start()}const fi=new $d;fi.setAnimationLoop(Uh),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(v){zr=v,ct.setAnimationLoop(v),v===null?fi.stop():fi.start()},ct.addEventListener("sessionstart",gl),ct.addEventListener("sessionend",_l),this.render=function(v,N){if(N!==void 0&&N.isCamera!==!0){ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;H!==null&&H.renderStart(v,N);const V=ct.enabled===!0&&ct.isPresenting===!0,z=R!==null&&(O===null||V)&&R.begin(B,O);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(N),N=ct.getCamera()),v.isScene===!0&&v.onBeforeRender(B,v,N,O),A=_t.get(v,M.length),A.init(N),A.state.textureUnits=x.getTextureUnits(),M.push(A),ae.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ut.setFromProjectionMatrix(ae,yn,N.reversedDepth),jt=this.localClippingEnabled,me=St.init(this.clippingPlanes,jt),L=Z.get(v,D.length),L.init(),D.push(L),ct.enabled===!0&&ct.isPresenting===!0){const yt=B.xr.getDepthSensingMesh();yt!==null&&Gr(yt,N,-1/0,B.sortObjects)}Gr(v,N,0,B.sortObjects),L.finish(),B.sortObjects===!0&&L.sort(J,gt),ge=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,ge&&rt.addToRenderList(L,v),this.info.render.frame++,me===!0&&St.beginShadows();const G=A.state.shadowsArray;if(lt.render(G,v,N),me===!0&&St.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&R.hasRenderPass())===!1){const yt=L.opaque,pt=L.transmissive;if(A.setupLights(),N.isArrayCamera){const Et=N.cameras;if(pt.length>0)for(let At=0,Gt=Et.length;At<Gt;At++){const $t=Et[At];vl(yt,pt,v,$t)}ge&&rt.render(v);for(let At=0,Gt=Et.length;At<Gt;At++){const $t=Et[At];xl(L,v,$t,$t.viewport)}}else pt.length>0&&vl(yt,pt,v,N),ge&&rt.render(v),xl(L,v,N)}O!==null&&j===0&&(x.updateMultisampleRenderTarget(O),x.updateRenderTargetMipmap(O)),z&&R.end(B),v.isScene===!0&&v.onAfterRender(B,v,N),at.resetDefaultState(),W=-1,X=null,M.pop(),M.length>0?(A=M[M.length-1],x.setTextureUnits(A.state.textureUnits),me===!0&&St.setGlobalState(B.clippingPlanes,A.state.camera)):A=null,D.pop(),D.length>0?L=D[D.length-1]:L=null,H!==null&&H.renderEnd()};function Gr(v,N,V,z){if(v.visible===!1)return;if(v.layers.test(N.layers)){if(v.isGroup)V=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(N);else if(v.isLightProbeGrid)A.pushLightProbeGrid(v);else if(v.isLight)A.pushLight(v),v.castShadow&&A.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Ut.intersectsSprite(v)){z&&Yt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ae);const yt=st.update(v),pt=v.material;pt.visible&&L.push(v,yt,pt,V,Yt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Ut.intersectsObject(v))){const yt=st.update(v),pt=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Yt.copy(v.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Yt.copy(yt.boundingSphere.center)),Yt.applyMatrix4(v.matrixWorld).applyMatrix4(ae)),Array.isArray(pt)){const Et=yt.groups;for(let At=0,Gt=Et.length;At<Gt;At++){const $t=Et[At],Rt=pt[$t.materialIndex];Rt&&Rt.visible&&L.push(v,yt,Rt,V,Yt.z,$t)}}else pt.visible&&L.push(v,yt,pt,V,Yt.z,null)}}const mt=v.children;for(let yt=0,pt=mt.length;yt<pt;yt++)Gr(mt[yt],N,V,z)}function xl(v,N,V,z){const{opaque:G,transmissive:mt,transparent:yt}=v;A.setupLightsView(V),me===!0&&St.setGlobalState(B.clippingPlanes,V),z&&ht.viewport(nt.copy(z)),G.length>0&&Is(G,N,V),mt.length>0&&Is(mt,N,V),yt.length>0&&Is(yt,N,V),ht.buffers.depth.setTest(!0),ht.buffers.depth.setMask(!0),ht.buffers.color.setMask(!0),ht.setPolygonOffset(!1)}function vl(v,N,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[z.id]===void 0){const Rt=Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[z.id]=new En(1,1,{generateMipmaps:!0,type:Rt?Xn:tn,minFilter:Mi,samples:Math.max(4,ue.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace})}const mt=A.state.transmissionRenderTarget[z.id],yt=z.viewport||nt;mt.setSize(yt.z*B.transmissionResolutionScale,yt.w*B.transmissionResolutionScale);const pt=B.getRenderTarget(),Et=B.getActiveCubeFace(),At=B.getActiveMipmapLevel();B.setRenderTarget(mt),B.getClearColor(bt),wt=B.getClearAlpha(),wt<1&&B.setClearColor(16777215,.5),B.clear(),ge&&rt.render(V);const Gt=B.toneMapping;B.toneMapping=bn;const $t=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),A.setupLightsView(z),me===!0&&St.setGlobalState(B.clippingPlanes,z),Is(v,V,z),x.updateMultisampleRenderTarget(mt),x.updateRenderTargetMipmap(mt),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let le=0,Te=N.length;le<Te;le++){const ve=N[le],{object:de,geometry:Oe,material:Mt,group:Ke}=ve;if(Mt.side===On&&de.layers.test(z.layers)){const ee=Mt.side;Mt.side=Ye,Mt.needsUpdate=!0,Ml(de,V,z,Oe,Mt,Ke),Mt.side=ee,Mt.needsUpdate=!0,Rt=!0}}Rt===!0&&(x.updateMultisampleRenderTarget(mt),x.updateRenderTargetMipmap(mt))}B.setRenderTarget(pt,Et,At),B.setClearColor(bt,wt),$t!==void 0&&(z.viewport=$t),B.toneMapping=Gt}function Is(v,N,V){const z=N.isScene===!0?N.overrideMaterial:null;for(let G=0,mt=v.length;G<mt;G++){const yt=v[G],{object:pt,geometry:Et,group:At}=yt;let Gt=yt.material;Gt.allowOverride===!0&&z!==null&&(Gt=z),pt.layers.test(V.layers)&&Ml(pt,N,V,Et,Gt,At)}}function Ml(v,N,V,z,G,mt){v.onBeforeRender(B,N,V,z,G,mt),v.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(B,N,V,z,v,mt),G.transparent===!0&&G.side===On&&G.forceSinglePass===!1?(G.side=Ye,G.needsUpdate=!0,B.renderBufferDirect(V,N,z,G,v,mt),G.side=ci,G.needsUpdate=!0,B.renderBufferDirect(V,N,z,G,v,mt),G.side=On):B.renderBufferDirect(V,N,z,G,v,mt),v.onAfterRender(B,N,V,z,G,mt)}function Ls(v,N,V){N.isScene!==!0&&(N=Re);const z=b.get(v),G=A.state.lights,mt=A.state.shadowsArray,yt=G.state.version,pt=dt.getParameters(v,G.state,mt,N,V,A.state.lightProbeGridArray),Et=dt.getProgramCacheKey(pt);let At=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,z.fog=N.fog;const Gt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=k.get(v.envMap||z.environment,Gt),z.envMapRotation=z.environment!==null&&v.envMap===null?N.environmentRotation:v.envMapRotation,At===void 0&&(v.addEventListener("dispose",Ee),At=new Map,z.programs=At);let $t=At.get(Et);if($t!==void 0){if(z.currentProgram===$t&&z.lightsStateVersion===yt)return yl(v,pt),$t}else pt.uniforms=dt.getUniforms(v),H!==null&&v.isNodeMaterial&&H.build(v,V,pt),v.onBeforeCompile(pt,B),$t=dt.acquireProgram(pt,Et),At.set(Et,$t),z.uniforms=pt.uniforms;const Rt=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Rt.clippingPlanes=St.uniform),yl(v,pt),z.needsLights=Bh(v),z.lightsStateVersion=yt,z.needsLights&&(Rt.ambientLightColor.value=G.state.ambient,Rt.lightProbe.value=G.state.probe,Rt.directionalLights.value=G.state.directional,Rt.directionalLightShadows.value=G.state.directionalShadow,Rt.spotLights.value=G.state.spot,Rt.spotLightShadows.value=G.state.spotShadow,Rt.rectAreaLights.value=G.state.rectArea,Rt.ltc_1.value=G.state.rectAreaLTC1,Rt.ltc_2.value=G.state.rectAreaLTC2,Rt.pointLights.value=G.state.point,Rt.pointLightShadows.value=G.state.pointShadow,Rt.hemisphereLights.value=G.state.hemi,Rt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Rt.spotLightMatrix.value=G.state.spotLightMatrix,Rt.spotLightMap.value=G.state.spotLightMap,Rt.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=A.state.lightProbeGridArray.length>0,z.currentProgram=$t,z.uniformsList=null,$t}function Sl(v){if(v.uniformsList===null){const N=v.currentProgram.getUniforms();v.uniformsList=pr.seqWithValue(N.seq,v.uniforms)}return v.uniformsList}function yl(v,N){const V=b.get(v);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Nh(v,N){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;w.setFromMatrixPosition(N.matrixWorld);for(let V=0,z=v.length;V<z;V++){const G=v[V];if(G.texture!==null&&G.boundingBox.containsPoint(w))return G}return null}function Fh(v,N,V,z,G){N.isScene!==!0&&(N=Re),x.resetTextureUnits();const mt=N.fog,yt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?N.environment:null,pt=O===null?B.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Jt.workingColorSpace,Et=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,At=k.get(z.envMap||yt,Et),Gt=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,$t=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Rt=!!V.morphAttributes.position,le=!!V.morphAttributes.normal,Te=!!V.morphAttributes.color;let ve=bn;z.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ve=B.toneMapping);const de=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Oe=de!==void 0?de.length:0,Mt=b.get(z),Ke=A.state.lights;if(me===!0&&(jt===!0||v!==X)){const fe=v===X&&z.id===W;St.setState(z,v,fe)}let ee=!1;z.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Ke.state.version||Mt.outputColorSpace!==pt||G.isBatchedMesh&&Mt.batching===!1||!G.isBatchedMesh&&Mt.batching===!0||G.isBatchedMesh&&Mt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Mt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Mt.instancing===!1||!G.isInstancedMesh&&Mt.instancing===!0||G.isSkinnedMesh&&Mt.skinning===!1||!G.isSkinnedMesh&&Mt.skinning===!0||G.isInstancedMesh&&Mt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Mt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Mt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Mt.instancingMorph===!1&&G.morphTexture!==null||Mt.envMap!==At||z.fog===!0&&Mt.fog!==mt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==St.numPlanes||Mt.numIntersection!==St.numIntersection)||Mt.vertexAlphas!==Gt||Mt.vertexTangents!==$t||Mt.morphTargets!==Rt||Mt.morphNormals!==le||Mt.morphColors!==Te||Mt.toneMapping!==ve||Mt.morphTargetsCount!==Oe||!!Mt.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(ee=!0):(ee=!0,Mt.__version=z.version);let en=Mt.currentProgram;ee===!0&&(en=Ls(z,N,G),H&&z.isNodeMaterial&&H.onUpdateProgram(z,en,Mt));let pn=!1,qn=!1,Ci=!1;const he=en.getUniforms(),Ae=Mt.uniforms;if(ht.useProgram(en.program)&&(pn=!0,qn=!0,Ci=!0),z.id!==W&&(W=z.id,qn=!0),Mt.needsLights){const fe=Nh(A.state.lightProbeGridArray,G);Mt.lightProbeGrid!==fe&&(Mt.lightProbeGrid=fe,qn=!0)}if(pn||X!==v){ht.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),he.setValue(U,"projectionMatrix",v.projectionMatrix),he.setValue(U,"viewMatrix",v.matrixWorldInverse);const Kn=he.map.cameraPosition;Kn!==void 0&&Kn.setValue(U,pe.setFromMatrixPosition(v.matrixWorld)),ue.logarithmicDepthBuffer&&he.setValue(U,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&he.setValue(U,"isOrthographic",v.isOrthographicCamera===!0),X!==v&&(X=v,qn=!0,Ci=!0)}if(Mt.needsLights&&(Ke.state.directionalShadowMap.length>0&&he.setValue(U,"directionalShadowMap",Ke.state.directionalShadowMap,x),Ke.state.spotShadowMap.length>0&&he.setValue(U,"spotShadowMap",Ke.state.spotShadowMap,x),Ke.state.pointShadowMap.length>0&&he.setValue(U,"pointShadowMap",Ke.state.pointShadowMap,x)),G.isSkinnedMesh){he.setOptional(U,G,"bindMatrix"),he.setOptional(U,G,"bindMatrixInverse");const fe=G.skeleton;fe&&(fe.boneTexture===null&&fe.computeBoneTexture(),he.setValue(U,"boneTexture",fe.boneTexture,x))}G.isBatchedMesh&&(he.setOptional(U,G,"batchingTexture"),he.setValue(U,"batchingTexture",G._matricesTexture,x),he.setOptional(U,G,"batchingIdTexture"),he.setValue(U,"batchingIdTexture",G._indirectTexture,x),he.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&he.setValue(U,"batchingColorTexture",G._colorsTexture,x));const jn=V.morphAttributes;if((jn.position!==void 0||jn.normal!==void 0||jn.color!==void 0)&&Ft.update(G,V,en),(qn||Mt.receiveShadow!==G.receiveShadow)&&(Mt.receiveShadow=G.receiveShadow,he.setValue(U,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&N.environment!==null&&(Ae.envMapIntensity.value=N.environmentIntensity),Ae.dfgLUT!==void 0&&(Ae.dfgLUT.value=Dx()),qn){if(he.setValue(U,"toneMappingExposure",B.toneMappingExposure),Mt.needsLights&&Oh(Ae,Ci),mt&&z.fog===!0&&$.refreshFogUniforms(Ae,mt),$.refreshMaterialUniforms(Ae,z,Vt,re,A.state.transmissionRenderTarget[v.id]),Mt.needsLights&&Mt.lightProbeGrid){const fe=Mt.lightProbeGrid;Ae.probesSH.value=fe.texture,Ae.probesMin.value.copy(fe.boundingBox.min),Ae.probesMax.value.copy(fe.boundingBox.max),Ae.probesResolution.value.copy(fe.resolution)}pr.upload(U,Sl(Mt),Ae,x)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(pr.upload(U,Sl(Mt),Ae,x),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&he.setValue(U,"center",G.center),he.setValue(U,"modelViewMatrix",G.modelViewMatrix),he.setValue(U,"normalMatrix",G.normalMatrix),he.setValue(U,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const fe=z.uniformsGroups;for(let Kn=0,Pi=fe.length;Kn<Pi;Kn++){const bl=fe[Kn];q.update(bl,en),q.bind(bl,en)}}return en}function Oh(v,N){v.ambientLightColor.needsUpdate=N,v.lightProbe.needsUpdate=N,v.directionalLights.needsUpdate=N,v.directionalLightShadows.needsUpdate=N,v.pointLights.needsUpdate=N,v.pointLightShadows.needsUpdate=N,v.spotLights.needsUpdate=N,v.spotLightShadows.needsUpdate=N,v.rectAreaLights.needsUpdate=N,v.hemisphereLights.needsUpdate=N}function Bh(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(v,N,V){const z=b.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),b.get(v.texture).__webglTexture=N,b.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,N){const V=b.get(v);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};const kh=U.createFramebuffer();this.setRenderTarget=function(v,N=0,V=0){O=v,Y=N,j=V;let z=null,G=!1,mt=!1;if(v){const pt=b.get(v);if(pt.__useDefaultFramebuffer!==void 0){ht.bindFramebuffer(U.FRAMEBUFFER,pt.__webglFramebuffer),nt.copy(v.viewport),it.copy(v.scissor),ft=v.scissorTest,ht.viewport(nt),ht.scissor(it),ht.setScissorTest(ft),W=-1;return}else if(pt.__webglFramebuffer===void 0)x.setupRenderTarget(v);else if(pt.__hasExternalTextures)x.rebindTextures(v,b.get(v.texture).__webglTexture,b.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Gt=v.depthTexture;if(pt.__boundDepthTexture!==Gt){if(Gt!==null&&b.has(Gt)&&(v.width!==Gt.image.width||v.height!==Gt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(v)}}const Et=v.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(mt=!0);const At=b.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(At[N])?z=At[N][V]:z=At[N],G=!0):v.samples>0&&x.useMultisampledRTT(v)===!1?z=b.get(v).__webglMultisampledFramebuffer:Array.isArray(At)?z=At[V]:z=At,nt.copy(v.viewport),it.copy(v.scissor),ft=v.scissorTest}else nt.copy(ot).multiplyScalar(Vt).floor(),it.copy(Dt).multiplyScalar(Vt).floor(),ft=Bt;if(V!==0&&(z=kh),ht.bindFramebuffer(U.FRAMEBUFFER,z)&&ht.drawBuffers(v,z),ht.viewport(nt),ht.scissor(it),ht.setScissorTest(ft),G){const pt=b.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,V)}else if(mt){const pt=N;for(let Et=0;Et<v.textures.length;Et++){const At=b.get(v.textures[Et]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Et,At.__webglTexture,V,pt)}}else if(v!==null&&V!==0){const pt=b.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pt.__webglTexture,V)}W=-1},this.readRenderTargetPixels=function(v,N,V,z,G,mt,yt,pt=0){if(!(v&&v.isWebGLRenderTarget)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=b.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et){ht.bindFramebuffer(U.FRAMEBUFFER,Et);try{const At=v.textures[pt],Gt=At.format,$t=At.type;if(v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt),!ue.textureFormatReadable(Gt)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ue.textureTypeReadable($t)){ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=v.width-z&&V>=0&&V<=v.height-G&&U.readPixels(N,V,z,G,I.convert(Gt),I.convert($t),mt)}finally{const At=O!==null?b.get(O).__webglFramebuffer:null;ht.bindFramebuffer(U.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(v,N,V,z,G,mt,yt,pt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=b.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et)if(N>=0&&N<=v.width-z&&V>=0&&V<=v.height-G){ht.bindFramebuffer(U.FRAMEBUFFER,Et);const At=v.textures[pt],Gt=At.format,$t=At.type;if(v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt),!ue.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Rt),U.bufferData(U.PIXEL_PACK_BUFFER,mt.byteLength,U.STREAM_READ),U.readPixels(N,V,z,G,I.convert(Gt),I.convert($t),0);const le=O!==null?b.get(O).__webglFramebuffer:null;ht.bindFramebuffer(U.FRAMEBUFFER,le);const Te=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Yu(U,Te,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Rt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,mt),U.deleteBuffer(Rt),U.deleteSync(Te),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,N=null,V=0){const z=Math.pow(2,-V),G=Math.floor(v.image.width*z),mt=Math.floor(v.image.height*z),yt=N!==null?N.x:0,pt=N!==null?N.y:0;x.setTexture2D(v,0),U.copyTexSubImage2D(U.TEXTURE_2D,V,0,0,yt,pt,G,mt),ht.unbindTexture()};const zh=U.createFramebuffer(),Gh=U.createFramebuffer();this.copyTextureToTexture=function(v,N,V=null,z=null,G=0,mt=0){let yt,pt,Et,At,Gt,$t,Rt,le,Te;const ve=v.isCompressedTexture?v.mipmaps[mt]:v.image;if(V!==null)yt=V.max.x-V.min.x,pt=V.max.y-V.min.y,Et=V.isBox3?V.max.z-V.min.z:1,At=V.min.x,Gt=V.min.y,$t=V.isBox3?V.min.z:0;else{const Ae=Math.pow(2,-G);yt=Math.floor(ve.width*Ae),pt=Math.floor(ve.height*Ae),v.isDataArrayTexture?Et=ve.depth:v.isData3DTexture?Et=Math.floor(ve.depth*Ae):Et=1,At=0,Gt=0,$t=0}z!==null?(Rt=z.x,le=z.y,Te=z.z):(Rt=0,le=0,Te=0);const de=I.convert(N.format),Oe=I.convert(N.type);let Mt;N.isData3DTexture?(x.setTexture3D(N,0),Mt=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(x.setTexture2DArray(N,0),Mt=U.TEXTURE_2D_ARRAY):(x.setTexture2D(N,0),Mt=U.TEXTURE_2D),ht.activeTexture(U.TEXTURE0),ht.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),ht.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),ht.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const Ke=ht.getParameter(U.UNPACK_ROW_LENGTH),ee=ht.getParameter(U.UNPACK_IMAGE_HEIGHT),en=ht.getParameter(U.UNPACK_SKIP_PIXELS),pn=ht.getParameter(U.UNPACK_SKIP_ROWS),qn=ht.getParameter(U.UNPACK_SKIP_IMAGES);ht.pixelStorei(U.UNPACK_ROW_LENGTH,ve.width),ht.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ve.height),ht.pixelStorei(U.UNPACK_SKIP_PIXELS,At),ht.pixelStorei(U.UNPACK_SKIP_ROWS,Gt),ht.pixelStorei(U.UNPACK_SKIP_IMAGES,$t);const Ci=v.isDataArrayTexture||v.isData3DTexture,he=N.isDataArrayTexture||N.isData3DTexture;if(v.isDepthTexture){const Ae=b.get(v),jn=b.get(N),fe=b.get(Ae.__renderTarget),Kn=b.get(jn.__renderTarget);ht.bindFramebuffer(U.READ_FRAMEBUFFER,fe.__webglFramebuffer),ht.bindFramebuffer(U.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Pi=0;Pi<Et;Pi++)Ci&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,b.get(v).__webglTexture,G,$t+Pi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,b.get(N).__webglTexture,mt,Te+Pi)),U.blitFramebuffer(At,Gt,yt,pt,Rt,le,yt,pt,U.DEPTH_BUFFER_BIT,U.NEAREST);ht.bindFramebuffer(U.READ_FRAMEBUFFER,null),ht.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||b.has(v)){const Ae=b.get(v),jn=b.get(N);ht.bindFramebuffer(U.READ_FRAMEBUFFER,zh),ht.bindFramebuffer(U.DRAW_FRAMEBUFFER,Gh);for(let fe=0;fe<Et;fe++)Ci?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ae.__webglTexture,G,$t+fe):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ae.__webglTexture,G),he?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,jn.__webglTexture,mt,Te+fe):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,jn.__webglTexture,mt),G!==0?U.blitFramebuffer(At,Gt,yt,pt,Rt,le,yt,pt,U.COLOR_BUFFER_BIT,U.NEAREST):he?U.copyTexSubImage3D(Mt,mt,Rt,le,Te+fe,At,Gt,yt,pt):U.copyTexSubImage2D(Mt,mt,Rt,le,At,Gt,yt,pt);ht.bindFramebuffer(U.READ_FRAMEBUFFER,null),ht.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else he?v.isDataTexture||v.isData3DTexture?U.texSubImage3D(Mt,mt,Rt,le,Te,yt,pt,Et,de,Oe,ve.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(Mt,mt,Rt,le,Te,yt,pt,Et,de,ve.data):U.texSubImage3D(Mt,mt,Rt,le,Te,yt,pt,Et,de,Oe,ve):v.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,mt,Rt,le,yt,pt,de,Oe,ve.data):v.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,mt,Rt,le,ve.width,ve.height,de,ve.data):U.texSubImage2D(U.TEXTURE_2D,mt,Rt,le,yt,pt,de,Oe,ve);ht.pixelStorei(U.UNPACK_ROW_LENGTH,Ke),ht.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ee),ht.pixelStorei(U.UNPACK_SKIP_PIXELS,en),ht.pixelStorei(U.UNPACK_SKIP_ROWS,pn),ht.pixelStorei(U.UNPACK_SKIP_IMAGES,qn),mt===0&&N.generateMipmaps&&U.generateMipmap(Mt),ht.unbindTexture()},this.initRenderTarget=function(v){b.get(v).__webglFramebuffer===void 0&&x.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?x.setTextureCube(v,0):v.isData3DTexture?x.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?x.setTexture2DArray(v,0):x.setTexture2D(v,0),ht.unbindTexture()},this.resetState=function(){Y=0,j=0,O=null,ht.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}const Dc={type:"change"},Yo={type:"start"},th={type:"end"},or=new Wo,Uc=new ii,Nx=Math.cos(70*Ku.DEG2RAD),Pe=new F,Xe=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ea=1e-6;class Fx extends Bf{constructor(t,e=null){super(t,e),this.state=ce.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zn.ROTATE,MIDDLE:zn.DOLLY,RIGHT:zn.PAN},this.touches={ONE:ri.ROTATE,TWO:ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new di,this._lastTargetPosition=new F,this._quat=new di().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new oc,this._sphericalDelta=new oc,this._scale=1,this._panOffset=new F,this._rotateStart=new Ht,this._rotateEnd=new Ht,this._rotateDelta=new Ht,this._panStart=new Ht,this._panEnd=new Ht,this._panDelta=new Ht,this._dollyStart=new Ht,this._dollyEnd=new Ht,this._dollyDelta=new Ht,this._dollyDirection=new F,this._mouse=new Ht,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Bx.bind(this),this._onPointerDown=Ox.bind(this),this._onPointerUp=kx.bind(this),this._onContextMenu=$x.bind(this),this._onMouseWheel=Hx.bind(this),this._onKeyDown=Vx.bind(this),this._onTouchStart=Wx.bind(this),this._onTouchMove=Xx.bind(this),this._onMouseDown=zx.bind(this),this._onMouseMove=Gx.bind(this),this._interceptControlDown=Yx.bind(this),this._interceptControlUp=qx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Dc),this.update(),this.state=ce.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Pe.copy(e).sub(this.target),Pe.applyQuaternion(this._quat),this._spherical.setFromVector3(Pe),this.autoRotate&&this.state===ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Xe:i>Math.PI&&(i-=Xe),s<-Math.PI?s+=Xe:s>Math.PI&&(s-=Xe),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Pe.setFromSpherical(this._spherical),Pe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Pe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Pe.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Pe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(or.origin.copy(this.object.position),or.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(or.direction))<Nx?this.object.lookAt(this.target):(Uc.setFromNormalAndCoplanarPoint(this.object.up,this.target),or.intersectPlane(Uc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ea||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ea||this._lastTargetPosition.distanceToSquared(this.target)>Ea?(this.dispatchEvent(Dc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Xe/60*this.autoRotateSpeed*t:Xe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Pe.setFromMatrixColumn(e,0),Pe.multiplyScalar(-t),this._panOffset.add(Pe)}_panUp(t,e){this.screenSpacePanning===!0?Pe.setFromMatrixColumn(e,1):(Pe.setFromMatrixColumn(e,0),Pe.crossVectors(this.object.up,Pe)),Pe.multiplyScalar(t),this._panOffset.add(Pe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pe.copy(s).sub(this.target);let r=Pe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Xe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ht,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Ox(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Bx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function kx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(th),this.state=ce.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function zx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case zn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ce.DOLLY;break;case zn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}break;case zn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(Yo)}function Gx(n){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Hx(n){this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE||(n.preventDefault(),this.dispatchEvent(Yo),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(th))}function Vx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Wx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ce.TOUCH_ROTATE;break;case ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ce.TOUCH_DOLLY_PAN;break;case ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(Yo)}function Xx(n){switch(this._trackPointer(n),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ce.NONE}}function $x(n){this.enabled!==!1&&n.preventDefault()}function Yx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const jx="#1f6659",Kx="#4d5a52";class Zx{constructor(t,e){mn(this,"renderer");mn(this,"scene",new hf);mn(this,"camera",new Lr(-1,1,1,-1,.1,5e4));mn(this,"controls");mn(this,"root",new gs);mn(this,"sceneSpan",1e3);mn(this,"cameraReady",!1);mn(this,"animationFrame",null);this.canvas=t,this.state=e,this.renderer=new Ux({canvas:t,antialias:!0}),this.renderer.setClearColor(16514296,1),this.renderer.outputColorSpace=Qe,this.controls=new Fx(this.camera,t),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enableRotate=!0,this.controls.enableZoom=!0,this.controls.enablePan=!0,this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:zn.ROTATE,MIDDLE:zn.DOLLY,RIGHT:zn.PAN},this.controls.touches={ONE:ri.ROTATE,TWO:ri.DOLLY_PAN},this.controls.addEventListener("change",()=>this.renderFrame()),this.scene.add(this.root),this.addLighting(),this.startRenderLoop()}bindInteractions(t){}dispose(){this.animationFrame!==null&&window.cancelAnimationFrame(this.animationFrame),this.animationFrame=null,this.controls.dispose(),this.clearRoot(),this.renderer.dispose()}resize(){const t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1;this.renderer.setPixelRatio(e),this.renderer.setSize(Math.max(1,t.width),Math.max(1,t.height),!1),this.updateCameraFrustum(t.width,t.height),this.draw()}draw(){this.clearRoot();const t=Wn(this.state.boards);if(!t){this.renderFrame();return}const e=Math.max(this.state.depth,...this.state.boards.map(o=>Mn(o,this.state.depth))),i=this.overlayThickness(e),s=e+i,r=t.left+t.w/2,a=t.top+t.h/2;this.sceneSpan=Math.max(t.w,t.h,s,1)*1.65,this.updateCameraFrustum(this.canvas.clientWidth,this.canvas.clientHeight),this.addGround(t.w,s,t.h),Po(this.state.boards).map(o=>this.boxForBoard(o,r,a,s,i)).filter(o=>o!==null).forEach(o=>this.addBoardBox(o)),this.cameraReady||this.resetCamera(),this.controls.target.set(0,0,0),this.controls.update(),this.renderFrame()}addLighting(){this.scene.add(new Uf(16777215,1.75));const t=new ac(16777215,2.3);t.position.set(800,1100,900),this.scene.add(t);const e=new ac(16777215,.75);e.position.set(-700,500,-500),this.scene.add(e)}updateCameraFrustum(t,e){const i=Math.max(.1,t/Math.max(1,e)),s=this.sceneSpan;i>=1?(this.camera.left=-s*i/2,this.camera.right=s*i/2,this.camera.top=s/2,this.camera.bottom=-s/2):(this.camera.left=-s/2,this.camera.right=s/2,this.camera.top=s/i/2,this.camera.bottom=-s/i/2),this.camera.updateProjectionMatrix()}resetCamera(){this.camera.position.set(this.sceneSpan*.55,0,this.sceneSpan*1.45),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update(),this.cameraReady=!0}addGround(t,e,i){const s=Math.max(t,e,300)*1.25,r=new Of(s,12,10466216,14081752);r.position.y=-Math.max(60,i/2+36),r.position.z=0,this.root.add(r)}boxForBoard(t,e,i,s,r){if(t.kind==="front"&&!this.state.showFrontPanels)return null;const a=Pt(t),o=this.zRangeForBoard(t,Mn(t,this.state.depth),r),l=Math.max(1,o.front-o.back);return{board:t,x:a.x+a.w/2-e,y:i-(a.y+a.h/2),z:(o.back+o.front)/2-s/2,w:Math.max(1,a.w),h:Math.max(1,a.h),d:l,opacity:1}}zRangeForBoard(t,e,i){if(t.kind==="front"){const s=this.deepestOverlappingStructuralDepth(t)??e;return{back:s,front:s+i}}return t.kind==="back"?{back:0,front:i}:{back:0,front:e}}addBoardBox(t){const e=this.materialFor(t.board),i=this.state.selectedIds.includes(t.board.id)||this.state.selectedId===t.board.id,s=new ss(t.w,t.h,t.d),r=new Cf({color:new Qt(e.color),opacity:t.opacity,roughness:.78,metalness:0,transparent:t.opacity<1,depthWrite:t.opacity>=1}),a=t.board.edgeBanding,o=t.board.orientation==="vertical"?[null,null,a.a1,a.a2,a.b1,a.b2]:t.board.orientation==="horizontal"?[a.b2,a.b1,null,null,a.a1,a.a2]:[a.b2,a.b1,a.a1,a.a2,null,null],[l,c]=hu(t.board.orientation),u=new Set;gr(t.board.faceLamination,"s1")||u.add(l),gr(t.board.faceLamination,"s2")||u.add(c);const f=o.some(Boolean)||u.size>0?o.map((g,p)=>p===0?r:r.clone()):null;f==null||f.forEach((g,p)=>{o[p]?g.color.set("#d58b28"):u.has(p)&&g.color.set(gd)});const h=new wn(s,f??r);h.position.set(t.x,t.y,t.z),this.root.add(h);const m=new bf(s),_=new $o({color:i?jx:Kx,transparent:!0,opacity:i?1:.44}),S=new zd(m,_);S.position.copy(h.position),this.root.add(S)}overlayThickness(t){return Math.max(4,Math.min(this.state.thickness,t*.08))}deepestOverlappingStructuralDepth(t){const e=this.state.boards.filter(i=>i.id!==t.id&&i.kind!=="front"&&i.kind!=="back").filter(i=>this.boardsOverlapInElevation(t,i));return e.length?Math.max(...e.map(i=>Mn(i,this.state.depth))):null}boardsOverlapInElevation(t,e){const i=Pt(t),s=Pt(e);return i.x<s.x+s.w&&i.x+i.w>s.x&&i.y<s.y+s.h&&i.y+i.h>s.y}materialFor(t){return this.state.materials.find(e=>e.id===t.materialId)??this.state.materials[0]}clearRoot(){[...this.root.children].forEach(t=>{this.root.remove(t),this.disposeObject(t)})}disposeObject(t){t.traverse(e=>{var r;const i=e;(r=i.geometry)==null||r.dispose();const s=i.material;Array.isArray(s)?s.forEach(a=>a.dispose()):s==null||s.dispose()})}renderFrame(){this.renderer.render(this.scene,this.camera)}startRenderLoop(){const t=()=>{this.animationFrame=window.requestAnimationFrame(t),this.controls.update(),this.renderFrame()};t()}}const Jx=`{
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
`,Nt=Q("#sketchCanvas"),Qx=Q("#view3dCanvas"),E={projectNameInput:Q("#projectNameInput"),templateChooser:Q("#templateChooser"),canvasWrap:Q("#canvasWrap"),templateList:Q("#templateList"),measureModeBtn:Q("#measureModeBtn"),presetList:Q("#presetList"),thicknessInput:Q("#thicknessInput"),depthInput:Q("#depthInput"),gridInput:Q("#gridInput"),snapToggle:Q("#snapToggle"),dimToggle:Q("#dimToggle"),frontLayerToggle:Q("#frontLayerToggle"),connectionMarksToggle:Q("#connectionMarksToggle"),duplicateBtn:Q("#duplicateBtn"),rotateBtn:Q("#rotateBtn"),undoBtn:Q("#undoBtn"),redoBtn:Q("#redoBtn"),measureWidthBtn:Q("#measureWidthBtn"),measureHeightBtn:Q("#measureHeightBtn"),saveBtn:Q("#saveBtn"),loadBtn:Q("#loadBtn"),newProjectBtn:Q("#newProjectBtn"),projectFileInput:Q("#projectFileInput"),deleteBtn:Q("#deleteBtn"),fitBtn:Q("#fitBtn"),printSketchBtn:Q("#printSketchBtn"),view3dBtn:Q("#view3dBtn"),copyCsvBtn:Q("#copyCsvBtn"),exportBtn:Q("#exportBtn"),printOrderBtn:Q("#printOrderBtn"),notificationToast:Q("#notificationToast"),selectionStatus:Q("#selectionStatus"),snapStatus:Q("#snapStatus"),emptySelection:Q("#emptySelection"),inspector:Q("#inspector"),nameInput:Q("#nameInput"),xInput:Q("#xInput"),yInput:Q("#yInput"),wInput:Q("#wInput"),hInput:Q("#hInput"),depthOverrideInput:Q("#depthOverrideInput"),layoutAnchorAxisInput:Q("#layoutAnchorAxisInput"),layoutAnchorCountInput:Q("#layoutAnchorCountInput"),layoutAnchorBalanceInput:Q("#layoutAnchorBalanceInput"),layoutAnchorStartInput:Q("#layoutAnchorStartInput"),layoutAnchorEndInput:Q("#layoutAnchorEndInput"),layoutAnchorStartLabel:Q("#layoutAnchorStartLabel"),layoutAnchorEndLabel:Q("#layoutAnchorEndLabel"),layoutAnchorThicknessInput:Q("#layoutAnchorThicknessInput"),layoutAnchorApplyBtn:Q("#layoutAnchorApplyBtn"),layoutAnchorClearBtn:Q("#layoutAnchorClearBtn"),layoutAnchorSummary:Q("#layoutAnchorSummary"),materialSelect:Q("#materialSelect"),materialSelectButton:Q("#materialSelectButton"),materialSelectList:Q("#materialSelectList"),materialSelectSwatch:Q("#materialSelectSwatch"),materialSelectText:Q("#materialSelectText"),materialInput:Q("#materialInput"),materialLabelSwatch:Q("#materialLabelSwatch"),faceLaminationInput:Q("#faceLaminationInput"),faceLaminationHint:Q("#faceLaminationHint"),materialForm:Q("#materialForm"),materialNameInput:Q("#materialNameInput"),materialColorInput:Q("#materialColorInput"),addMaterialBtn:Q("#addMaterialBtn"),bandingProfileInput:Q("#bandingProfileInput"),bandingDiagram:Q("#bandingDiagram"),bandingViewLabel:Q("#bandingViewLabel"),bandingBoardFace:Q("#bandingBoardFace"),bandingEdgeFields:Q("#bandingEdgeFields"),bandingPresets:Q("#bandingPresets"),bandingTypeInput:Q("#bandingTypeInput"),bandingDecorInput:Q("#bandingDecorInput"),bandingThicknessInput:Q("#bandingThicknessInput"),addBandingProfileBtn:Q("#addBandingProfileBtn"),grainInput:Q("#grainInput"),bandingDimensions:Q("#bandingDimensions"),bandingReview:Q("#bandingReview"),bandingReviewText:Q("#bandingReviewText"),confirmBandingBtn:Q("#confirmBandingBtn"),ignoreOrderInput:Q("#ignoreOrderInput"),measureList:Q("#measureList"),warningList:Q("#warningList"),cutList:Q("#cutList"),orderLegend:Q("#orderLegend"),ignoredCutList:Q("#ignoredCutList"),rightPanelTools:Q("#rightPanelTools"),woodOrderPanel:Q("#woodOrderPanel"),woodOrderToggleBtn:Q("#woodOrderToggleBtn"),woodOrderBackBtn:Q("#woodOrderBackBtn"),materialList:Q("#materialList"),anchorOverlay:Q("#anchorOverlay"),overlayScaleBar:Q("#overlayScaleBar"),overlayScaleLabel:Q("#overlayScaleLabel"),overlayZoomLabel:Q("#overlayZoomLabel"),measureRenameForm:Q("#measureRenameForm"),measureRenameInput:Q("#measureRenameInput"),measureRenameCancelBtn:Q("#measureRenameCancelBtn")},d={projectName:"",boards:[],anchors:[],layoutAnchors:[],measurements:[],materials:ih(),edgeBandingProfiles:[],selectedId:null,selectedIds:[],selectedMeasurementId:null,nextId:1,nextAnchorId:1,nextLayoutAnchorId:1,nextMeasurementId:1,thickness:18,depth:560,grid:25,gridOriginX:160,gridOriginY:120,snap:!0,showDimensions:!0,showFrontPanels:!1,showConnectionMarks:!0,scale:.62,panX:160,panY:110,dragging:null,resizing:null,measurementDragging:null,panning:null,selectionBox:null,snapGuides:[],tool:"select",pendingMeasurementAnchor:null,previewMeasurementAnchor:null,lastSnap:C("common.ready")},qo=new uu(Nt,d),jo=new Zx(Qx,d),eh="mebel-maker-project",Nc="c8e2168",t0=80,e0=.125,n0=.09,i0=1.3,s0=2,$i=46,nh=new AbortController,vt={signal:nh.signal},Ki=[],Nr=[];let Fc,Es=null,Yn="sketch",Fn=!1,vn="matching-yes",Er=null,So;const r0={side:{name:C("pieces.side"),kind:"upright",orientation:"vertical",w:()=>d.thickness,h:()=>560},shelf:{name:C("pieces.shelf"),kind:"shelf",orientation:"horizontal",w:()=>820-d.thickness*2,h:()=>d.thickness},divider:{name:C("pieces.divider"),kind:"upright",orientation:"vertical",w:()=>d.thickness,h:()=>560-d.thickness*2},back:{name:C("pieces.back"),kind:"back",orientation:"front",w:()=>820,h:()=>560},front:{name:C("pieces.front"),kind:"front",orientation:"front",w:()=>820,h:()=>560}},Ko="birch-plywood";function Q(n){const t=document.querySelector(n);if(!t)throw new Error(`Missing element: ${n}`);return t}function C(n,t){return Xc(n,t?{values:t}:void 0)}function ih(){return[{id:"birch-plywood",name:sn("birch-plywood"),color:"#d9b77e"},{id:"oak",name:sn("oak"),color:"#c99756"},{id:"walnut",name:sn("walnut"),color:"#7a4f34"},{id:"pine",name:sn("pine"),color:"#e1c889"},{id:"white-melamine",name:sn("white-melamine"),color:"#f5f3ec"},{id:"black",name:sn("black"),color:"#252525"},{id:"white",name:sn("white"),color:"#ffffff"},{id:"gray",name:sn("gray"),color:"#9aa0a6"},{id:"red",name:sn("red"),color:"#b8483b"},{id:"blue",name:sn("blue"),color:"#3f75a3"},{id:"green",name:sn("green"),color:"#538052"}]}function sn(n){return{"birch-plywood":C("materials.birchPlywood"),oak:C("materials.oak"),walnut:C("materials.walnut"),pine:C("materials.pine"),"white-melamine":C("materials.whiteMelamine"),black:C("materials.black"),white:C("materials.white"),gray:C("materials.gray"),red:C("materials.red"),blue:C("materials.blue"),green:C("materials.green")}[n]??""}function Yi(n){return sn(n.id)||n.name}function a0(n){const t=ih();if(!(n!=null&&n.length))return t;const e=new Set,i=n.filter(s=>{const r=s.id&&s.name&&/^#[0-9a-f]{6}$/i.test(s.color)&&!e.has(s.id);return r&&e.add(s.id),r});return i.some(s=>s.id===Ko)?i:[...t,...i]}function o0(n){if(!(n!=null&&n.length))return[];const t=new Set(d.boards.map(s=>s.id)),e=["left","right","top","bottom"],i=new Set;return n.filter(s=>{const r=`${s.boardId}:${s.edge}:${s.targetBoardId}:${s.targetEdge}`,a=t.has(s.boardId)&&t.has(s.targetBoardId)&&s.boardId!==s.targetBoardId&&e.includes(s.edge)&&e.includes(s.targetEdge)&&!i.has(r);return a&&i.add(r),a})}function l0(n){if(!(n!=null&&n.length))return[];const t=new Set(d.boards.map(i=>i.id)),e=new Set;return n.filter(i=>{const s=d.boards.find(u=>u.id===i.boardId),r=Number(i.offset),a=s?Pt(s):null,o=i.axis==="x"?a==null?void 0:a.w:a==null?void 0:a.h,l=`${i.boardId}:${i.axis}:${Math.round(r*1e3)}`,c=t.has(i.boardId)&&(i.axis==="x"||i.axis==="y")&&Number.isFinite(r)&&r>=0&&o!==void 0&&r<=o&&!e.has(l);return c&&e.add(l),c}).map(i=>({...i,offset:Math.round(i.offset)}))}function Fr(n){return`P${n}`}function Zo(n){return`M${n}`}function c0(n){return/^(Board \d+|Side|Shelf|Shelf \d+|Divider|Back|Front|Left side|Right side|Top|Bottom|Middle shelf|Left adjustable shelf|Right adjustable shelf|Center divider)( copy)?$/.test(n)}function sh(n,t){const e=(n==null?void 0:n.trim())??"";return!e||c0(e)?Fr(t):e}function bi(){const n=new Set(d.selectedIds);return d.selectedId!==null&&n.add(d.selectedId),n}function Cn(n,t=n[0]??null){const e=new Set(d.boards.map(r=>r.id)),i=[...new Set(n)].filter(r=>e.has(r)),s=t!==null&&i.includes(t)?t:i[0]??null;d.selectedId=s,d.selectedIds=i,i.length&&(d.selectedMeasurementId=null)}function rh(){Cn([])}function Rs(n){d.selectedMeasurementId=n!==null&&d.measurements.some(t=>t.id===n)?n:null,d.selectedMeasurementId!==null&&(d.selectedId=null,d.selectedIds=[])}function d0(n){const t=bi();t.has(n)?t.delete(n):t.add(n),Cn([...t],t.has(n)?n:[...t][0]??null)}function h0(n,t){return((n==null?void 0:n.trim())??"")||Zo(t)}function u0(n){const t=n.materialId&&d.materials.some(r=>r.id===n.materialId)?n.materialId:Ko,e=n.kind??"panel",i=A0(n.orientation,e,n.autoThickness);return{id:n.id,name:sh(n.name,n.id),x:Number.isFinite(Number(n.x))?Math.round(Number(n.x)):120,y:Number.isFinite(Number(n.y))?Math.round(Number(n.y)):120,dimensions:w0(n,i),orientation:i,kind:e,materialId:t,faceLamination:Rr(n.faceLamination),...Co(n),ignoreInOrder:n.ignoreInOrder??!1,group:n.group??0}}function f0(n=d.boards){return Math.max(0,...n.map(t=>t.id))+1}function p0(n=d.measurements){return Math.max(0,...n.map(t=>t.id))+1}function m0(n=d.anchors){return Math.max(0,...n.map(t=>t.id))+1}function g0(n=d.layoutAnchors){return Math.max(0,...n.map(t=>t.id))+1}function Or(n){return{left:C("inspector.left"),right:C("inspector.right"),top:C("inspector.top"),bottom:C("inspector.bottom"),front:C("inspector.front"),back:C("inspector.back")}[n]}function Vn(n){return new Intl.NumberFormat(document.documentElement.lang||"en",{maximumFractionDigits:3}).format(n)}function yo(n){return`${Vn(n.width)} × ${Vn(n.height)} × ${Vn(n.thickness)} mm`}function Tr(n){return n?n.thickness===null?C("banding.yes"):`${Vn(n.thickness)} mm`:C("metrics.none")}function Jo(n,t=!1){return n?t&&n.id.startsWith("match-")?Tr(n):`${n.type==="veneer"?C("banding.veneer"):n.type} · ${n.decor} · ${Tr(n)}`:C("metrics.none")}function _0(){return[`<option value="matching-yes">${Ct(C("banding.yes"))}</option>`,`<option value="matching-08">${Ct(C("banding.matching",{thickness:Vn(.8)}))}</option>`,`<option value="matching-2">${Ct(C("banding.matching",{thickness:2}))}</option>`,...d.edgeBandingProfiles.map(n=>`<option value="${Ct(n.id)}">${Ct(Jo(n))}</option>`)].join("")}function Qo(n,t){if(n==="matching-yes"||n==="matching-08"||n==="matching-2"){const e=n==="matching-yes"?null:n==="matching-08"?.8:2;return{id:`match-${t.materialId}-${e}`,type:"ABS",decor:Br(t.materialId),thickness:e}}return d.edgeBandingProfiles.find(e=>e.id===n)??null}function ah(n){return n.legacyLaminate?Yh.filter(t=>n.legacyLaminate[t]).map(Or).join(", "):""}function oh(n){return C(n.grainDirection==="a"?"banding.grainA":n.grainDirection==="b"?"banding.grainB":"banding.grainNone")}function lh(n){return C(`faceLamination.${{both:"both",s1:"onlyS1",s2:"onlyS2",none:"none"}[Rr(n.faceLamination)]}`)}function x0(n){E.faceLaminationInput.value=$e(n,i=>i.faceLamination)??"";const t=n.every(i=>i.orientation===n[0].orientation)?n[0].orientation:null,e=t?du(t).map(Or):null;["s1","s2"].forEach((i,s)=>{E.faceLaminationInput.querySelector(`option[value='${i}']`).textContent=e?C("faceLamination.onlyDirection",{side:i.toUpperCase(),direction:e[s]}):C(i==="s1"?"faceLamination.onlyS1":"faceLamination.onlyS2")}),E.faceLaminationHint.textContent=e?C("faceLamination.directionHint",{first:e[0],second:e[1]}):C("faceLamination.referenceHint")}function v0(n){const t=n[0],e=Xh(n.every(_=>_.orientation===t.orientation)?t.orientation:null);E.bandingViewLabel.textContent=C("banding.flatViewAxes",{horizontal:e.horizontalAxis,vertical:e.verticalAxis,arrow:e.verticalArrow}),vn!=="matching-yes"&&vn!=="matching-08"&&vn!=="matching-2"&&!d.edgeBandingProfiles.some(_=>_.id===vn)&&(vn="matching-yes");const i=_0();E.bandingProfileInput.innerHTML=i,E.bandingProfileInput.value=vn,E.bandingPresets.querySelector("[data-banding-preset='front']").hidden=!n.every(_=>$c(_)),Zi.forEach(_=>{const S=$e(n,P=>$h(P,_)),g=S?`${Or(S)} · ${_.toUpperCase()}`:`${_.toUpperCase()} · ${C("banding.mixedNames")}`,p=$e(n,P=>String(jc(P,_))),y=p===null?C("common.mixed"):`${Vn(Number(p))} mm`,T=$e(n,P=>Ji(P.edgeBanding[_])),w=t.edgeBanding[_],L=T===null?C("common.mixed"):Jo(w,!0),A=E.bandingDiagram.querySelector(`[data-banding-edge='${_}']`),D=T===null?"mixed":w?"true":"false";A.setAttribute("aria-pressed",D),A.setAttribute("aria-label",`${g}, ${y}, ${L}`),A.title=`${g}: ${L}`,A.innerHTML=`<span>${Ct(g)}</span><span>${Ct(y)}</span><span>${Ct(T===null?C("common.mixed"):Tr(w))}</span>`;const M=Q(`#bandingLabel-${_}`);M.textContent=`${g} · ${y}`;const R=E.bandingEdgeFields.querySelector(`[data-banding-input='${_}']`),B=T===null?"":w?"current":"none";R.innerHTML=`${B!=="none"?`<option value="${B}" disabled>${Ct(L)}</option>`:""}<option value="none">${Ct(C("metrics.none"))}</option>${i}`,R.value=B,R.title=L}),Object.entries(e.edges).forEach(([_,S])=>{const g=E.bandingDiagram.querySelector(`[data-banding-edge='${S}']`);g.style.gridColumn=_==="left"?"1":_==="right"?"3":"2",g.style.gridRow=_==="top"?"1":_==="bottom"?"3":"2",E.bandingBoardFace.classList.toggle(`banded-${_}`,n.some(p=>p.edgeBanding[S]))});const s=$e(n,_=>String(_.dimensions.width)),r=$e(n,_=>String(_.dimensions.height)),[a,o]=e.horizontalAxis==="A"?[s,r]:[r,s],l=$e(n,_=>String(gr(_.faceLamination,e.visibleFace))),c=C(l===null?"common.mixed":l==="true"?"faceLamination.laminated":"faceLamination.unlaminated");E.bandingBoardFace.innerHTML=`<span>${a===null?"—":Vn(Number(a))} × ${o===null?"—":Vn(Number(o))}</span><span>${e.horizontalAxis} →<br>${e.verticalAxis} ${e.verticalArrow}</span><span>${e.visibleFace.toUpperCase()} · ${Ct(c)}</span>`,["a","b"].forEach(_=>{E.grainInput.querySelector(`option[value='${_}']`).textContent=C("banding.grainAlongAxis",{axis:_.toUpperCase(),arrow:e.horizontalAxis.toLowerCase()===_?"→":e.verticalArrow})}),E.grainInput.value=$e(n,_=>_.grainDirection)??"";const u=$e(n,_=>yo(_.dimensions)),f=$e(n,_=>yo(xs(_))),h=n.some(_=>_.bandingNeedsReview),m=n.some(_=>wr(_)==="invalidCore"||xs(_).width<=0||xs(_).height<=0);E.bandingDimensions.innerHTML=`<div><span>${Ct(C(h?"banding.projectSize":"banding.finished"))}</span><strong>${Ct(u??C("common.mixed"))}</strong></div><div${m?' class="banding-invalid"':""}><span>${Ct(C("banding.core"))}</span><strong>${Ct(f??C("common.mixed"))}</strong></div>${n.length>1?`<small>${Ct(C("banding.multiNote"))}</small>`:""}`,E.bandingReview.hidden=!h&&!m,E.bandingReviewText.innerHTML=`${m?Ct(C("banding.invalidCore")):""}${h?`<div>${Ct(C(n.some(_=>_.legacyLaminate)?"banding.review":"banding.reviewRequired"))}</div>${n.filter(_=>_.legacyLaminate).map(_=>`<div><strong>${Ct(_.name)}</strong>: ${Ct(ah(_))}</div>`).join("")}`:""}`,E.confirmBandingBtn.hidden=!h,E.confirmBandingBtn.disabled=m}function Ct(n){return n.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t)}function Br(n){const t=d.materials.find(e=>e.id===n);return t?Yi(t):C("inspector.unknownMaterial")}function Oc(n){var t;return((t=d.materials.find(e=>e.id===n))==null?void 0:t.color)??d.materials[0].color}function M0(n){return d.materials.find(t=>t.id===n)??null}function S0(n){const t=n.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"custom-material";let e=t,i=2;for(;d.materials.some(s=>s.id===e);)e=`${t}-${i}`,i+=1;return e}function y0(n){return/^#[0-9a-f]{6}$/i.test(n)?n:"#c99756"}function Me(n,t){const e=Number(n);return Number.isFinite(e)&&e>0?Math.round(e):t}function b0(n){const t=Number(n);return Number.isFinite(t)&&t>0?Math.round(t):null}function E0(n,t){const e=Number(n);return Number.isFinite(e)?Math.round(e):od(t)}function T0(n){return n==="width"?"vertical":n==="height"?"horizontal":"front"}function A0(n,t,e){return n==="vertical"||n==="horizontal"||n==="front"?n:e?T0(e):jh(t)}function tl(n,t,e){return n==="vertical"?{width:d.depth,height:e,thickness:t}:n==="horizontal"?{width:t,height:d.depth,thickness:e}:{width:t,height:e,thickness:d.thickness}}function w0(n,t){const e=n.dimensions,i=Me(n.thicknessOverride,d.thickness),s=b0(n.depthOverride)??d.depth,r=Me(n.w,400),a=Me(n.h,250);return t==="vertical"?{width:Me(e==null?void 0:e.width,s),height:Me(e==null?void 0:e.height,a),thickness:Me(e==null?void 0:e.thickness,i)}:t==="horizontal"?{width:Me(e==null?void 0:e.width,r),height:Me(e==null?void 0:e.height,s),thickness:Me(e==null?void 0:e.thickness,i)}:{width:Me(e==null?void 0:e.width,r),height:Me(e==null?void 0:e.height,a),thickness:Me(e==null?void 0:e.thickness,i)}}function bo(n){return-n}function Bc(n){return-n}function ch(n,t=!0){t&&Zt();const e={id:d.nextId,name:sh(n.name,d.nextId),x:n.x??120,y:n.y??120,dimensions:n.dimensions??tl(n.orientation,400,250),orientation:n.orientation,kind:n.kind,materialId:n.materialId??Ko,faceLamination:Rr(n.faceLamination),...Co(n),ignoreInOrder:n.ignoreInOrder??!1,group:0};d.nextId+=1,d.boards.push(e),Cn([e.id],e.id),yh(e.id),It()}function R0(n){ch(n,!1)}function kn(n,t,e,i,s,r){R0({x:n,y:t,dimensions:tl(r,e,i),kind:s,orientation:r})}function C0(n,t,e){n&&Zt(),d.boards=[],d.anchors=[],d.layoutAnchors=[],d.measurements=[],d.nextId=1,d.nextAnchorId=1,d.nextLayoutAnchorId=1,d.nextMeasurementId=1,d.selectedMeasurementId=null,d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.gridOriginX=t,d.gridOriginY=e}function ps(n,t,e,i){const s=d.thickness,r=e-2*s;kn(n,t,s,i,"upright","vertical"),kn(n+e-s,t,s,i,"upright","vertical"),kn(n+s,t,r,s,"shelf","horizontal"),kn(n+s,t+i-s,r,s,"shelf","horizontal")}function Ta(n,t,e,i){kn(n,t,e,i,"back","front")}function Aa(n,t,e){const i=d.thickness;kn(n+i,t,e-2*i,i,"shelf","horizontal")}function P0(n,t,e){const i=d.thickness;kn(n,t,i,e,"upright","vertical")}function I0(n,t=!0){const e=d.thickness,i=0;if(n==="complex"){L0(Jx,kc(n),t);return}if(C0(t,i,0),n==="cabinet"&&(ps(i,-560,820,560),Aa(i,-285,820)),n==="bookcase"&&(ps(i,-1280,760,1280),[320,560,800,1040].forEach(o=>Aa(i,-1280+o,760)),Ta(i,-1280,760,1280)),n==="base-cabinet"){const o=i+410-e/2,l=-360;ps(i,-720,820,720),kn(i+e,l,o-i-e,e,"shelf","horizontal"),kn(o+e,l,i+820-e-(o+e),e,"shelf","horizontal"),P0(o,-720+e,720-2*e),Ta(i,-720,820,720)}n==="wall-cabinet"&&(ps(i,-640,720,640),Aa(i,-325,720),Ta(i,-640,720,640)),n==="simple-box"&&ps(i,-360,520,360),Cn([1],1),d.lastSnap=kc(n),ol()}function kc(n){return{cabinet:C("templates.cabinet"),bookcase:C("templates.bookcase"),"base-cabinet":C("templates.baseCabinet"),"wall-cabinet":C("templates.wallCabinet"),"simple-box":C("templates.simpleBox"),complex:C("templates.complex")}[n]}function L0(n,t,e){try{const i=JSON.parse(n);if(!nl(i))throw new Error(C("status.unsupportedTemplateFile"));Ps({...i,projectName:t},e),d.lastSnap=t,ol()}catch{d.lastSnap=C("status.couldNotCreateTemplate"),Ve(C("status.couldNotCreateTemplate")),be()}}function dh(n=!0){n&&Zt(),d.projectName="",d.boards=[],d.anchors=[],d.layoutAnchors=[],d.measurements=[],d.selectedId=null,d.selectedIds=[],d.selectedMeasurementId=null,d.nextId=1,d.nextAnchorId=1,d.nextLayoutAnchorId=1,d.nextMeasurementId=1,d.dragging=null,d.resizing=null,d.measurementDragging=null,d.panning=null,d.selectionBox=null,d.snapGuides=[],d.tool="select",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.gridOriginX=0,d.gridOriginY=0,rv(),d.lastSnap=C(n?"status.newProject":"common.ready"),It()}function D0(){if(!(!!d.projectName||d.boards.length>0||d.measurements.length>0)){d.lastSnap=C("status.readyForNewProject"),be();return}window.confirm(C("dialogs.newProjectConfirm"))&&(dh(),Ve(C("status.newProjectReady")))}function It(){Jh(d.boards),N0(),U0(),Q0(),j0(),be(),K0(),Z0(),J0(),hh(),O0()}function hh(){E.rightPanelTools.hidden=Fn,E.woodOrderPanel.hidden=!Fn,E.woodOrderToggleBtn.classList.toggle("active",Fn),E.woodOrderToggleBtn.setAttribute("aria-pressed",String(Fn)),E.woodOrderToggleBtn.title=C(Fn?"workspace.hideWoodOrder":"workspace.showWoodOrder"),E.woodOrderToggleBtn.setAttribute("aria-label",C(Fn?"workspace.hideWoodOrder":"workspace.showWoodOrder"))}function U0(){E.templateChooser.hidden=d.boards.length>0||d.measurements.length>0}function N0(){if(Yn==="3d"){jo.draw();return}qo.draw()}function kr(){if(Yn==="3d"){jo.resize();return}qo.resize()}function el(n){Yn!==n&&(Yn=n,E.canvasWrap.dataset.view=n,E.view3dBtn.classList.toggle("active",n==="3d"),E.view3dBtn.setAttribute("aria-pressed",String(n==="3d")),d.lastSnap=C(n==="3d"?"status.view3d":"status.sketchView"),window.requestAnimationFrame(()=>{kr(),be()}))}function F0(n){return JSON.parse(JSON.stringify(n))}function Zt(){Ki.push(Cs()),Ki.length>t0&&Ki.shift(),Nr.length=0}function uh(){const n=Ki.pop();if(!n){d.lastSnap=C("status.nothingToUndo"),be();return}Nr.push(Cs()),Ps(n,!1),d.lastSnap=C("status.undone"),be()}function Eo(){const n=Nr.pop();if(!n){d.lastSnap=C("status.nothingToRedo"),be();return}Ki.push(Cs()),Ps(n,!1),d.lastSnap=C("status.redone"),be()}function Cs(){return F0({schemaVersion:4,version:Nc,appVersion:Nc,projectName:d.projectName,boards:d.boards,anchors:d.anchors,layoutAnchors:d.layoutAnchors,measurements:d.measurements,materials:d.materials,edgeBandingProfiles:d.edgeBandingProfiles,selectedId:d.selectedId,selectedIds:d.selectedIds,selectedMeasurementId:d.selectedMeasurementId,nextId:d.nextId,nextAnchorId:d.nextAnchorId,nextLayoutAnchorId:d.nextLayoutAnchorId,nextMeasurementId:d.nextMeasurementId,thickness:d.thickness,depth:d.depth,grid:d.grid,gridOriginX:d.gridOriginX,gridOriginY:d.gridOriginY,snap:d.snap,showDimensions:d.showDimensions,showFrontPanels:d.showFrontPanels,showConnectionMarks:d.showConnectionMarks,scale:d.scale,panX:d.panX,panY:d.panY})}function Ps(n,t=!0){var s,r,a;t&&Zt(),d.projectName=fh(n.projectName),d.materials=a0(n.materials);const e=(n.edgeBandingProfiles??[]).map(Yc).filter(o=>o!==null);d.edgeBandingProfiles=e.filter((o,l)=>e.findIndex(c=>c.id===o.id)===l),d.thickness=Me(n.thickness,d.thickness),d.depth=Me(n.depth,d.depth),d.boards=(n.boards??[]).map(u0),d.anchors=o0(n.anchors),d.layoutAnchors=l0(n.layoutAnchors),d.measurements=(n.measurements??[]).map((o,l)=>({...o,name:h0(o.name,o.id),displayOffset:E0(o.displayOffset,l)}));const i=(s=n.selectedIds)!=null&&s.length?n.selectedIds:n.selectedId?[n.selectedId]:[];d.selectedMeasurementId=null,Cn(i,n.selectedId),i.length||Rs(n.selectedMeasurementId??null),d.nextId=n.nextId??f0(d.boards),d.nextAnchorId=n.nextAnchorId??m0(d.anchors),d.nextLayoutAnchorId=n.nextLayoutAnchorId??g0(d.layoutAnchors),d.nextMeasurementId=n.nextMeasurementId??p0(d.measurements),d.grid=n.grid??d.grid,d.gridOriginX=n.gridOriginX??((r=Wn(d.boards))==null?void 0:r.left)??d.gridOriginX,d.gridOriginY=n.gridOriginY??((a=Wn(d.boards))==null?void 0:a.top)??d.gridOriginY,d.snap=n.snap??d.snap,d.showDimensions=n.showDimensions??d.showDimensions,d.showFrontPanels=n.showFrontPanels??d.showFrontPanels,d.showConnectionMarks=n.showConnectionMarks??!0,d.scale=n.scale??d.scale,d.panX=n.panX??d.panX,d.panY=n.panY??d.panY,d.dragging=null,d.resizing=null,d.measurementDragging=null,d.panning=null,d.selectionBox=null,d.snapGuides=[],d.tool="select",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,il(),It()}function nl(n){return[1,2,3,4].includes(n.schemaVersion??(n.version===1?1:2))&&Array.isArray(n.boards)}function O0(){try{localStorage.setItem(eh,JSON.stringify(Cs()))}catch{}}function B0(){try{const n=localStorage.getItem(eh);if(!n)return!1;const t=JSON.parse(n);if(!nl(t))throw new Error("Unsupported project file");return Ps(t,!1),d.lastSnap=C("status.restoredAutosave"),be(),!0}catch{return d.lastSnap=C("status.couldNotRestoreAutosave"),be(),!1}}function k0(){B0()||dh(!1)}function z0(){const n=JSON.stringify(Cs(),null,2);gh(n,"application/json",`${mh()}-${ph()}.mebel`),d.lastSnap=C("status.projectExported"),Ve(C("status.savedProject")),be()}function fh(n){return typeof n=="string"?n.trim().slice(0,80):""}function ph(n=new Date){return n.toISOString().replace(/\.\d{3}Z$/,"Z").replace(/:/g,"-")}function mh(){return d.projectName.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)||"mebel-maker"}function gh(n,t,e){const i=new Blob([n],{type:t}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=e,document.body.append(r),r.click(),r.remove(),URL.revokeObjectURL(s)}function G0(){E.projectFileInput.value="",E.projectFileInput.click(),Ve(C("status.chooseProjectFile"))}function H0(n){const t=new FileReader;t.addEventListener("load",()=>{try{const e=JSON.parse(String(t.result??""));if(!nl(e))throw new Error("Unsupported project file");Ps(e),d.lastSnap=C("status.projectImported"),Ve(C("status.loadedProject")),be()}catch{d.lastSnap=C("status.couldNotImportProject"),Ve(C("status.couldNotLoadProject")),be()}}),t.addEventListener("error",()=>{d.lastSnap=C("status.couldNotReadFile"),Ve(C("status.couldNotReadFile")),be()}),t.readAsText(n)}function Ve(n){window.clearTimeout(Fc),E.notificationToast.textContent=n,E.notificationToast.hidden=!1,Fc=window.setTimeout(()=>{E.notificationToast.hidden=!0},2400)}function il(){E.projectNameInput.value=d.projectName,E.thicknessInput.value=String(d.thickness),E.layoutAnchorThicknessInput.value=String(d.thickness),E.depthInput.value=String(d.depth),E.gridInput.value=String(d.grid),E.snapToggle.checked=d.snap,E.dimToggle.checked=d.showDimensions,E.frontLayerToggle.checked=d.showFrontPanels,E.connectionMarksToggle.checked=d.showConnectionMarks}function $e(n,t){if(!n.length)return null;const e=t(n[0]);return n.every(i=>t(i)===e)?e:null}function Ms(n,t){return d.layoutAnchors.filter(e=>e.boardId===n&&(!t||e.axis===t)).sort((e,i)=>e.offset-i.offset)}function V0(n){return n.orientation==="vertical"?"y":"x"}function _h(){const n=cl();E.layoutAnchorStartLabel.textContent=C(n==="x"?"inspector.leftEdge":"inspector.topEdge"),E.layoutAnchorEndLabel.textContent=C(n==="x"?"inspector.rightEdge":"inspector.bottomEdge")}function To(){const n=E.layoutAnchorBalanceInput.disabled||!E.layoutAnchorBalanceInput.checked;E.layoutAnchorStartInput.disabled=n,E.layoutAnchorEndInput.disabled=n,E.layoutAnchorThicknessInput.disabled=n}function Xi(n,t,e=C("common.mixed")){n.value=t??"",n.placeholder=t===null?e:""}function W0(n,t){n.checked=t??!1,n.indeterminate=t===null}function xh(n,t){n.addEventListener("change",t,vt),n.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),n.blur())},vt)}function X0(n){E.duplicateBtn.disabled=n,E.rotateBtn.disabled=n,E.measureWidthBtn.disabled=n,E.measureHeightBtn.disabled=n}function be(){var l;const n=an(d),t=Fe(d),e=Qc(d),i=Wn(t),s=t.length>0,r=t.length>1;if(E.emptySelection.hidden=s,E.inspector.hidden=!s,E.selectionStatus.textContent=r&&i?`${C("status.boardsSelected",{count:t.length})} · ${Ot(i.w)} × ${Ot(i.h)}`:n?qh(n):e?`${C("workspace.measureName")} ${e.name}`:C("workspace.noBoardSelected"),E.snapStatus.textContent=d.lastSnap,$0(),E.measureModeBtn.classList.toggle("active",d.tool==="measure"),E.undoBtn.disabled=!Ki.length,E.redoBtn.disabled=!Nr.length,X0(!s),E.deleteBtn.disabled=!s&&!e,E.deleteBtn.title=C(e?"workspace.deleteSelectedMeasurement":"workspace.deleteSelectedBoards"),E.deleteBtn.setAttribute("aria-label",C(e?"workspace.deleteSelectedMeasurement":"workspace.deleteSelectedBoards")),Nt.classList.toggle("measure-mode",d.tool==="measure"),d.tool==="measure"&&(Nt.style.cursor=""),E.wInput.disabled=!1,E.hInput.disabled=!1,E.nameInput.disabled=!1,E.layoutAnchorAxisInput.disabled=!n||r,E.layoutAnchorCountInput.disabled=!n||r,E.layoutAnchorBalanceInput.disabled=!n||r,E.layoutAnchorApplyBtn.disabled=!n||r,E.layoutAnchorClearBtn.disabled=!n||r||Ms(n.id).length===0,(!n||r)&&(E.layoutAnchorSummary.textContent=C("inspector.noLayoutAnchors")),E.materialLabelSwatch.style.background=n&&!r?Oc(n.materialId):"transparent",!s){To();return}if(r)E.nameInput.disabled=!0,Xi(E.nameInput,null,C("status.boardsSelected",{count:t.length})),Xi(E.xInput,i?String(Math.round(i.left)):null),Xi(E.yInput,i?String(Math.round(bo(i.top))):null),Xi(E.wInput,null),Xi(E.hInput,null),E.wInput.disabled=!0,E.hInput.disabled=!0;else if(n){const c=Pt(n),u=((l=Ms(n.id).at(0))==null?void 0:l.axis)??V0(n),f=Ms(n.id,u);E.nameInput.value=n.name,E.nameInput.placeholder="",E.xInput.value=String(Math.round(c.x)),E.yInput.value=String(Math.round(bo(c.y))),E.wInput.value=String(Math.round(c.w)),E.hInput.value=String(Math.round(c.h)),E.wInput.placeholder=n.orientation==="vertical"&&n.dimensions.thickness===d.thickness?C("common.global"):"",E.hInput.placeholder=n.orientation==="horizontal"&&n.dimensions.thickness===d.thickness?C("common.global"):"",n.orientation==="vertical"&&n.dimensions.thickness===d.thickness&&(E.wInput.value=""),n.orientation==="horizontal"&&n.dimensions.thickness===d.thickness&&(E.hInput.value=""),E.depthOverrideInput.value=Mn(n,d.depth)===d.depth?"":String(Mn(n,d.depth)),E.materialInput.value=n.materialId,E.layoutAnchorAxisInput.value=u,_h(),f.length&&(E.layoutAnchorCountInput.value=String(f.length)),E.layoutAnchorThicknessInput.value||(E.layoutAnchorThicknessInput.value=String(d.thickness)),E.layoutAnchorSummary.textContent=f.length?f.map(h=>Ot(h.offset)).join(", "):C("inspector.noLayoutAnchors"),E.wInput.disabled=!1,E.hInput.disabled=!1}const a=$e(t,c=>c.materialId),o=$e(t,c=>Mn(c,d.depth)===d.depth?"":String(Mn(c,d.depth)));E.materialInput.value=a??"",rl(),Xi(E.depthOverrideInput,o,C("common.mixed")),E.materialLabelSwatch.style.background=a?Oc(a):"transparent",x0(t),v0(t),W0(E.ignoreOrderInput,$e(t,c=>String(c.ignoreInOrder))===null?null:t[0].ignoreInOrder),To()}function $0(){const n=Y0(118/d.scale),t=Math.max(28,Math.min(90,n*d.scale));E.overlayScaleBar.style.setProperty("--scale-width",`${t}px`),E.overlayScaleLabel.textContent=Ot(n),E.overlayZoomLabel.textContent=C("workspace.zoom",{percent:Math.round(d.scale*100)})}function Y0(n){const e=10**Math.floor(Math.log10(Math.max(1,n))),i=n/e;return i>=5?5*e:i>=2?2*e:e}function sl(){E.materialSelectList.hidden=!0,E.materialSelectButton.setAttribute("aria-expanded","false")}function rl(){const n=E.materialInput.value?M0(E.materialInput.value):null;E.materialSelectText.textContent=n?`${Yi(n)} (${n.color.toUpperCase()})`:C("inspector.mixedMaterials"),E.materialSelectSwatch.style.background=n?n.color:"linear-gradient(135deg, #d9b77e 0 50%, #7a4f34 50% 100%)",E.materialSelectSwatch.classList.toggle("mixed",!n),E.materialSelectList.querySelectorAll("[data-material-id]").forEach(t=>{const e=t.dataset.materialId===E.materialInput.value;t.classList.toggle("selected",e),t.setAttribute("aria-selected",String(e))})}function q0(){const n=E.materialSelectList.hidden;E.materialSelectList.hidden=!n,E.materialSelectButton.setAttribute("aria-expanded",String(n)),n&&rl()}function vh(n){Fn=n,d.lastSnap=C(n?"status.woodOrder":"status.properties"),hh(),be()}function Mh(n){const t=d.boards.find(e=>e.id===n);t&&(Cn([t.id],t.id),d.tool="select",d.lastSnap=C("status.selected",{name:t.name}),It())}function j0(){E.materialInput.innerHTML=`
    <option value="">${Ct(C("inspector.mixedMaterials"))}</option>
  `+d.materials.map(n=>`
    <option value="${Ct(n.id)}">${Ct(Yi(n))} (${Ct(n.color.toUpperCase())})</option>
  `).join(""),E.materialSelectList.innerHTML=d.materials.map(n=>`
    <button
      class="material-select-option"
      type="button"
      role="option"
      data-material-id="${Ct(n.id)}"
      title="${Ct(Yi(n))} ${Ct(n.color.toUpperCase())}"
      aria-selected="false"
    >
      <span class="material-select-swatch" style="background: ${n.color}"></span>
      <span class="material-select-option-copy">
        <strong>${Ct(Yi(n))}</strong>
        <small>${Ct(n.color.toUpperCase())}</small>
      </span>
    </button>
  `).join(""),E.materialList.innerHTML=d.materials.map(n=>`
    <div class="material-card">
      <span class="material-swatch" style="background: ${n.color}"></span>
      <strong>${Ct(Yi(n))}</strong>
    </div>
  `).join(""),rl()}function K0(){const n=an(d),t=Fe(d),e=t.length>1?t:n?ed(d,n.group):d.boards,i=Wn(e),s=nd(e,d.thickness),r=[];if(t.length>1&&i)r.push(`
      <div class="metric-card">
        <strong>${C("status.boardsSelected",{count:t.length})}</strong>
        <span>${C("metrics.selection")}: ${Ot(i.w)} × ${Ot(i.h)}</span>
        <span>${C("metrics.position")}: X ${Ot(i.left)}, Y ${Ot(i.top)}</span>
      </div>
    `);else if(n){const a=Pt(n);r.push(`
      <div class="metric-card">
        <strong>${n.name}</strong>
        <span>${C("metrics.board")}: ${Ot(a.w)} × ${Ot(a.h)} × ${Ot(Mn(n,d.depth))}</span>
        <span>${C("metrics.position")}: X ${Ot(a.x)}, Y ${Ot(bo(a.y))}</span>
      </div>
    `)}i&&r.push(`
      <div class="metric-card">
        <strong>${t.length>1?C("pieces.selectedBoards"):n?C("pieces.connectedGroup",{group:n.group}):C("pieces.wholeSketch")}</strong>
        <span>${C("metrics.outer")}: ${Ot(i.w)} × ${Ot(i.h)}</span>
        <span>${C("metrics.inner")}: ${s!=null&&s.hasFrame?`${Ot(s.innerW)} × ${Ot(s.innerH)}`:C("metrics.needsOpposingFrameBoards")}</span>
        <span>${C("metrics.thicknessModel")}: ${Ot(d.thickness)}</span>
        <span>${C("metrics.defaultDepth")}: ${Ot(d.depth)}</span>
      </div>
    `),E.measureList.innerHTML=r.join("")||`<div class="empty-state">${Ct(C("metrics.addBoards"))}</div>`}function Z0(){const t=ld(d.boards).map(e=>{const[i,s]=e.boardIds.map(r=>{var a;return((a=d.boards.find(o=>o.id===r))==null?void 0:a.name)??Fr(r)});return`
      <div class="warning-card">
        <strong>${C("metrics.overlap")}</strong>
        <span>${i} and ${s}</span>
        <span>${Ot(e.w)} × ${Ot(e.h)}</span>
      </div>
    `});d.boards.filter(e=>!e.ignoreInOrder).forEach(e=>{const i=wr(e);i&&t.push(`<div class="warning-card"><strong>${Ct(e.name)} · ${Ct(C("banding.title"))}</strong><span>${Ct(C(i==="review"?"banding.reviewRequired":"banding.invalidCore"))}</span></div>`)}),E.warningList.innerHTML=t.join("")||`<div class="empty-state">${Ct(C("metrics.noOverlaps"))}</div>`}function J0(){E.orderLegend.innerHTML=Sh(),E.cutList.innerHTML=zc(d.boards.filter(n=>!n.ignoreInOrder),C("pieces.noBoardsInOrder")),E.ignoredCutList.innerHTML=zc(d.boards.filter(n=>n.ignoreInOrder),C("pieces.noIgnoredBoards"))}function zc(n,t){return qc(n).map(e=>{const i=e[0],s=wr(i);return`
      <div class="cut-card">
        <strong><span class="count">${e.length}×</span> ${yo(i.dimensions)}</strong>
        <span>${C("metrics.material")}: ${Ct(Br(i.materialId))}</span>
        <span>${C("faceLamination.title")}: ${Ct(lh(i))}</span>
        <span>${C("banding.grain")}: ${Ct(oh(i))}</span>
        <div class="cut-banding">${Zi.map(r=>`<span>${r.toUpperCase()} · ${Vn(jc(i,r))} mm: ${Ct(Jo(i.edgeBanding[r]))}</span>`).join("")}</div>
        ${s?`<div class="banding-review">${Ct(C(s==="review"?"banding.reviewRequired":"banding.invalidCore"))}${i.legacyLaminate?`<div>${Ct(ah(i))}</div>`:""}</div>`:""}
        <div class="cut-card-pieces">${e.map(r=>`
          <button class="cut-piece-button" type="button" data-board-id="${r.id}" title="${Ct(C("order.selectPiece",{name:r.name}))}">
            ${Ct(r.name)}
          </button>
        `).join("")}</div>
      </div>
    `}).join("")||`<div class="empty-state">${t}</div>`}function Sh(){return`<div class="order-edge-diagram" role="img" aria-label="${Ct(C("banding.csvSketch"))}">${Zi.map(n=>`<div class="${n}">${n.toUpperCase()}</div>`).join("")}<div class="order-diagram-dimensions">A × B<br>S1</div></div><p class="banding-order-note">${Ct(C("banding.orderNote"))}</p>`}function al(){const n=d.boards.filter(t=>!t.ignoreInOrder&&wr(t));return n.length?(Cn([n[0].id]),Fn=!1,d.lastSnap=C("banding.exportBlocked",{pieces:n.map(t=>t.name).join(", ")}),It(),Ve(d.lastSnap),!1):!0}function Q0(){const n=an(d);if(!n){E.anchorOverlay.innerHTML="";return}E.anchorOverlay.innerHTML=d.anchors.filter(t=>t.boardId===n.id).map(t=>{const e=tv(t);if(!e)return"";const i=_e(d,e.x,e.y);return`
        <button class="anchor-chip" data-remove-anchor="${t.id}" type="button" style="left: ${i.x}px; top: ${i.y-8}px" title="${Ct(C("anchors.removeAnchorTo",{target:Hc(t)}))}" aria-label="${Ct(C("anchors.removeAnchorTo",{target:Hc(t)}))}">
          ${Gc()}
          <span class="visually-hidden">${C("anchors.removeAnchor")}</span>
        </button>
      `}).join("")+d.snapGuides.flatMap(t=>t.linkPoint?[t.linkPoint]:[]).map(t=>{const e=_e(d,t.x,t.y);return`
        <span class="anchor-chip anchor-chip-preview" style="left: ${e.x}px; top: ${e.y-8}px" title="${Ct(C("anchors.willLink"))}" aria-hidden="true">
          ${Gc()}
        </span>
      `}).join("")}function Gc(){return`
    <svg class="anchor-chip-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 7.5 L7 6 C5.5 4.5 3.2 4.5 1.7 6 C.2 7.5 .2 9.8 1.7 11.3 L4.7 14.3 C5.8 15.4 7.4 15.7 8.8 15.1"></path>
      <path d="M15.5 16.5 L17 18 C18.5 19.5 20.8 19.5 22.3 18 C23.8 16.5 23.8 14.2 22.3 12.7 L19.3 9.7 C18.2 8.6 16.6 8.3 15.2 8.9"></path>
      <path d="M9 15 L15 9"></path>
      <path d="M5 21 L19 3"></path>
    </svg>
  `}function Hc(n){const t=d.boards.find(e=>e.id===n.targetBoardId);return`${(t==null?void 0:t.name)??Fr(n.targetBoardId)} ${Or(n.targetEdge)}`}function tv(n){const t=d.boards.find(l=>l.id===n.boardId),e=d.boards.find(l=>l.id===n.targetBoardId);if(!t||!e)return null;const i=Pt(t),s=Pt(e),r=Eh(t,n.edge);if(n.edge==="left"||n.edge==="right"){const l=Math.max(i.y,s.y),c=Math.min(i.y+i.h,s.y+s.h);return{x:r,y:l<=c?(l+c)/2:i.y+i.h/2}}const a=Math.max(i.x,s.x),o=Math.min(i.x+i.w,s.x+s.w);return{x:a<=o?(a+o)/2:i.x+i.w/2,y:r}}function yh(n){const t=d.boards.find(e=>e.id===n);!t||t.kind==="back"||t.kind==="front"||(d.anchors=d.anchors.filter(e=>e.boardId!==n),d.boards.forEach(e=>{e.id===t.id||e.kind==="back"||e.kind==="front"||iv(t,e).forEach(([i,s])=>ev(t.id,i,e.id,s))}))}function ev(n,t,e,i){const s=d.boards.find(a=>a.id===n);!s||!nv(s,t)||d.anchors.some(a=>a.boardId===n&&a.edge===t&&a.targetBoardId===e&&a.targetEdge===i)||(d.anchors.push({id:d.nextAnchorId,boardId:n,edge:t,targetBoardId:e,targetEdge:i}),d.nextAnchorId+=1)}function nv(n,t){return n.kind==="front"?!1:n.orientation==="vertical"?t==="top"||t==="bottom":n.orientation==="horizontal"?t==="left"||t==="right":!0}function iv(n,t){const i=[],s=Pt(n),r=Pt(t);return Math.abs(s.x-(r.x+r.w))<=.5&&lr(s.y,s.y+s.h,r.y,r.y+r.h)&&i.push(["left","right"]),Math.abs(s.x+s.w-r.x)<=.5&&lr(s.y,s.y+s.h,r.y,r.y+r.h)&&i.push(["right","left"]),Math.abs(s.y-(r.y+r.h))<=.5&&lr(s.x,s.x+s.w,r.x,r.x+r.w)&&i.push(["top","bottom"]),Math.abs(s.y+s.h-r.y)<=.5&&lr(s.x,s.x+s.w,r.x,r.x+r.w)&&i.push(["bottom","top"]),i}function lr(n,t,e,i){return Math.max(n,e)<=Math.min(t,i)+.5}function Ei(n,t=new Set){if(t.has(n))return;t.add(n),[...new Set(d.anchors.filter(i=>i.targetBoardId===n).map(i=>i.boardId))].forEach(i=>{bh(i),Ei(i,t)})}function bh(n){const t=d.boards.find(i=>i.id===n);if(!t)return;const e=Pt(t);d.anchors.filter(i=>i.boardId===n).forEach(i=>{const s=d.boards.find(r=>r.id===i.targetBoardId);s&&sv(e,i.edge,Eh(s,i.targetEdge))}),Ao(t,e)}function Eh(n,t){const e=Pt(n);return t==="left"?e.x:t==="right"?e.x+e.w:t==="top"?e.y:e.y+e.h}function sv(n,t,e){if(t==="left"){const i=n.x+n.w;n.x=e,n.w=Math.max(1,i-e)}if(t==="right"&&(n.w=Math.max(1,e-n.x)),t==="top"){const i=n.y+n.h;n.y=e,n.h=Math.max(1,i-e)}t==="bottom"&&(n.h=Math.max(1,e-n.y))}function ol(){const n=Wn(d.boards),t=Nt.getBoundingClientRect();if(!n||t.width<1||t.height<1)return;const e=70,i=Math.max(1,t.width-e-$i),s=Math.max(1,t.height-e-$i);d.scale=Math.min(i/n.w,s/n.h),d.scale=Math.max(e0,Math.min(i0,d.scale)),d.panX=$i-n.left*d.scale,d.panY=t.height-$i-n.bottom*d.scale,It()}function rv(){const n=Nt.getBoundingClientRect();d.scale=.62,d.panX=$i,d.panY=n.height>1?n.height-$i:420}function av(n){if(n===d.thickness)return;Zt();const t=d.thickness,e=d.boards.some(i=>i.orientation!=="front")?window.confirm(C("dialogs.updateThickness",{value:Ot(n)})):!1;d.thickness=n,Me(E.layoutAnchorThicknessInput.value,t)===t&&(E.layoutAnchorThicknessInput.value=String(n)),d.boards.forEach(i=>{const s=cv(i,t),r=e?n:s,a=r-s;if(i.orientation==="front"?i.dimensions.thickness=n:i.dimensions.thickness=r,i.orientation==="vertical"&&i.x>160&&(i.x-=a),i.orientation==="horizontal"){const o=Pt(i);i.x+=a,i.dimensions.width=Math.max(r,o.w-a*2),i.y>120&&(i.y-=a)}}),d.boards.forEach(i=>bh(i.id)),d.lastSnap=e?C("status.allAutoThickness",{value:Ot(d.thickness)}):C("status.defaultThickness",{value:Ot(d.thickness)}),It()}function ov(n){if(n===d.depth)return;Zt();const t=d.depth,e=d.boards.length>0?window.confirm(C("dialogs.updateDepth",{value:Ot(n)})):!1;d.depth=n,d.boards.length>0&&d.boards.forEach(i=>{const s=e?n:lv(i,t);i.orientation==="vertical"&&(i.dimensions.width=s),i.orientation==="horizontal"&&(i.dimensions.height=s)}),d.lastSnap=e?C("status.allPiecesDepth",{value:Ot(d.depth)}):C("status.defaultDepth",{value:Ot(d.depth)}),It()}function lv(n,t){return n.orientation==="vertical"?n.dimensions.width:n.orientation==="horizontal"?n.dimensions.height:t}function cv(n,t){return n.dimensions.thickness??t}function dv(){if(!al())return;const n=Th();gh(n,"text/csv;charset=utf-8",`${mh()}-pieces-${ph()}.csv`),d.lastSnap=C("status.pieceListCsvExported"),Ve(C("status.savedPieceListCsv")),be()}async function hv(){if(al()){try{await mv(Th()),d.lastSnap=C("status.pieceListCsvCopied"),Ve(C("status.copiedPieceListCsv"))}catch{d.lastSnap=C("status.couldNotCopyCsv"),Ve(C("status.couldNotCopyCsv"))}be()}}function uv(){if(!al())return;const n=Ah(),t=`${d.projectName||C("app.name")} - ${C("panels.woodOrder")}`,e=URL.createObjectURL(new Blob([pv(n,t)],{type:"text/html"}));if(!window.open(e,"_blank")){URL.revokeObjectURL(e),d.lastSnap=C("status.couldNotPrintOrder"),Ve(C("status.couldNotPrintOrder")),be();return}window.setTimeout(()=>URL.revokeObjectURL(e),6e4),d.lastSnap=C("status.pieceListTablePrinted"),Ve(C("status.pieceListTablePrinted")),be()}function fv(){if(Er)return;const n=Nt.getBoundingClientRect(),t=E.canvasWrap.getBoundingClientRect(),e=(n.width||t.width||1)/Math.max(1,n.height||t.height);Er={showConnectionMarks:d.showConnectionMarks,showFrontPanels:d.showFrontPanels,view:Yn},window.clearTimeout(So),E.canvasWrap.style.setProperty("--print-sketch-ratio",String(e)),document.body.classList.add("printing-sketch"),d.showConnectionMarks=!0,d.showFrontPanels=!1,E.connectionMarksToggle.checked=!0,E.frontLayerToggle.checked=!1,Yn!=="sketch"&&el("sketch"),d.lastSnap=C("status.sketchPrintReady"),Ve(C("status.sketchPrintReady")),be(),window.addEventListener("afterprint",Vc,{once:!0}),window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{qo.resize(),So=window.setTimeout(Vc,6e4),window.print()})})}function Vc(){const n=Er;n&&(Er=null,window.clearTimeout(So),document.body.classList.remove("printing-sketch"),E.canvasWrap.style.removeProperty("--print-sketch-ratio"),d.showConnectionMarks=n.showConnectionMarks,d.showFrontPanels=n.showFrontPanels,il(),Yn!==n.view?el(n.view):kr(),d.lastSnap=C("status.sketchPrintRestored"),It())}function pv(n,t){const e=n[0],i=n.slice(1);return`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${Ct(t)}</title>
        <style>
          body { color: #202522; font-family: Arial, sans-serif; margin: 24px; }
          h1 { font-size: 20px; margin: 0 0 16px; }
          p { font-size: 12px; }
          table { border-collapse: collapse; font-size: 10px; width: 100%; }
          th, td { border: 1px solid #9aa59d; padding: 6px 8px; text-align: left; vertical-align: top; }
          th { background: #eef4f1; font-weight: 700; }
          td:first-child, th:first-child,
          td:nth-child(2), th:nth-child(2),
          td:nth-child(3), th:nth-child(3),
          td:nth-child(4), th:nth-child(4) { text-align: right; white-space: nowrap; }
          .order-legend { align-items: center; display: flex; gap: 16px; margin-bottom: 16px; }
          .order-edge-diagram { align-items: center; background: #eee5d4; border: 1px solid #9aa59d; display: grid; flex: 0 0 auto; font-size: 11px; grid-template-columns: 24px 60px 24px; grid-template-rows: 20px 40px 20px; text-align: center; width: 108px; }
          .a1 { grid-column: 2; grid-row: 1; } .a2 { grid-column: 2; grid-row: 3; } .b1 { grid-column: 1; grid-row: 2; } .b2 { grid-column: 3; grid-row: 2; }
          .order-diagram-dimensions { grid-column: 2; grid-row: 2; }
          tr { break-inside: avoid; }
          @page { size: landscape; margin: 12mm; }
        </style>
      </head>
      <body>
        <h1>${Ct(t)}</h1>
        <div class="order-legend">${Sh()}</div>
        <table>
          <thead>
            <tr>${e.map(s=>`<th>${Ct(s)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${i.map(s=>`<tr>${s.map(r=>`<td>${Ct(r)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
        <script>
          window.addEventListener("load", () => window.setTimeout(() => window.print(), 0));
        <\/script>
      </body>
    </html>
  `}function Th(){const n=Ah();return[...[[C("banding.orderNote")],[C("banding.csvSketch")],["       A1"],["B1   A × B (S1)   B2"],["       A2"],[]].map(e=>Array.from({length:n[0].length},(i,s)=>e[s]??"")),...n].map(e=>e.map(gv).join(",")).join(`
`)}function Ah(){const n=[[C("order.csvQuantity"),C("order.csvThickness"),C("banding.csvA"),C("banding.csvB"),C("order.csvMaterial"),C("faceLamination.title"),C("banding.csvGrain"),...Zi.map(t=>t.toUpperCase()),C("order.csvPieces")]];return qc(d.boards.filter(t=>!t.ignoreInOrder)).forEach(t=>{const e=t[0];n.push([String(t.length),String(e.dimensions.thickness),String(e.dimensions.width),String(e.dimensions.height),Br(e.materialId),lh(e),oh(e),...Zi.map(i=>Tr(e.edgeBanding[i])),t.map(i=>i.name).join("; ")])}),n}async function mv(n){var a;if((a=window.navigator.clipboard)!=null&&a.writeText)try{await window.navigator.clipboard.writeText(n);return}catch{}let t=!1;const e=o=>{var l;(l=o.clipboardData)==null||l.setData("text/plain",n),o.preventDefault(),t=!0};document.addEventListener("copy",e);const i=document.execCommand("copy");if(document.removeEventListener("copy",e),i&&t)return;const s=document.createElement("textarea");s.value=n,s.style.left="-9999px",s.style.position="fixed",document.body.append(s),s.focus(),s.select();const r=document.execCommand("copy");if(s.remove(),!r)throw new Error("Clipboard copy failed")}function gv(n){return/[",\n]/.test(n)?`"${n.replace(/"/g,'""')}"`:n}function _v(n){const t=an(d),e=Fe(d);if(!t||!e.length)return;const i=n==null?void 0:n.target;if(i===E.wInput&&t.orientation==="vertical"&&E.wInput.value===""){Zt(),t.dimensions.thickness=d.thickness,d.lastSnap=C("status.widthUsesGlobal",{value:Ot(d.thickness)}),Ei(t.id),It();return}if(i===E.hInput&&t.orientation==="horizontal"&&E.hInput.value===""){Zt(),t.dimensions.thickness=d.thickness,d.lastSnap=C("status.heightUsesGlobal",{value:Ot(d.thickness)}),Ei(t.id),It();return}if(i===E.depthOverrideInput&&E.depthOverrideInput.value===""){Zt(),e.forEach(s=>{s.orientation==="vertical"&&(s.dimensions.width=d.depth),s.orientation==="horizontal"&&(s.dimensions.height=d.depth)}),d.lastSnap=C("status.depthUsesGlobal",{value:Ot(d.depth)}),It();return}if(!(i instanceof HTMLInputElement&&i.type==="number"&&i.value==="")){if(Zt(),e.length>1){const s=Wn(e);if(s&&(i===E.xInput||i===E.yInput)){const r=i===E.xInput?Number(E.xInput.value):s.left,a=i===E.yInput?Bc(Number(E.yInput.value)):s.top;wv(e,(Number.isFinite(r)?r:s.left)-s.left,(Number.isFinite(a)?a:s.top)-s.top),d.lastSnap=C("status.selectionMoved")}i===E.depthOverrideInput&&(e.forEach(r=>{const a=Me(E.depthOverrideInput.value,Mn(r,d.depth));r.orientation==="vertical"&&(r.dimensions.width=a),r.orientation==="horizontal"&&(r.dimensions.height=a)}),d.lastSnap=C("status.depthSetOnBoards",{count:e.length}))}else{t.name=E.nameInput.value.trim()||t.name;const s={x:Number(E.xInput.value)||0,y:Bc(Number(E.yInput.value)||0),w:t.orientation==="vertical"&&E.wInput.value===""?d.thickness:Math.max(1,Number(E.wInput.value)||1),h:t.orientation==="horizontal"&&E.hInput.value===""?d.thickness:Math.max(1,Number(E.hInput.value)||1)};t.orientation==="vertical"&&(t.dimensions.thickness=E.wInput.value===""?d.thickness:Me(E.wInput.value,Tl(t,d.thickness))),t.orientation==="horizontal"&&(t.dimensions.thickness=E.hInput.value===""?d.thickness:Me(E.hInput.value,Tl(t,d.thickness)));const r=E.depthOverrideInput.value===""?d.depth:Me(E.depthOverrideInput.value,Mn(t,d.depth));t.orientation==="vertical"&&(t.dimensions.width=r),t.orientation==="horizontal"&&(t.dimensions.height=r),Jc(t,s),Ei(t.id)}It()}}function wh(){const n=Fe(d);!n.length||!E.materialInput.value||n.every(t=>t.materialId===E.materialInput.value)||(Zt(),n.forEach(t=>{t.materialId=E.materialInput.value}),d.lastSnap=n.length>1?C("status.materialSetOnBoards",{count:n.length}):C("status.material",{name:Br(n[0].materialId)}),It())}function xv(){const n=E.materialNameInput.value.trim();if(!n){d.lastSnap=C("status.nameMaterialFirst"),be();return}Zt();const t={id:S0(n),name:n,color:y0(E.materialColorInput.value)};d.materials.push(t),E.materialNameInput.value="",E.materialColorInput.value="#c99756",d.lastSnap=C("status.materialAdded",{name:t.name}),It()}function ll(n){n.some(({board:t,edge:e,profile:i})=>Ji(t.edgeBanding[e])!==Ji(i))&&(Zt(),n.forEach(({board:t,edge:e,profile:i})=>Wh(t,e,i)),d.lastSnap=C("banding.updated"),It())}function vv(){const n=Yc({id:`band-${crypto.randomUUID()}`,type:E.bandingTypeInput.value,decor:E.bandingDecorInput.value,thickness:E.bandingThicknessInput.value===""?null:Number(E.bandingThicknessInput.value)});if(!n){Ve(C("banding.profileInvalid"));return}const t=d.edgeBandingProfiles.find(e=>Ji(e)===Ji(n));t||(Zt(),d.edgeBandingProfiles.push(n)),vn=(t??n).id,E.bandingDecorInput.value="",d.lastSnap=C("banding.profileAdded"),It()}function Mv(){const n=Fe(d).filter(t=>t.bandingNeedsReview);!n.length||n.some(t=>xs(t).width<=0||xs(t).height<=0)||(Zt(),n.forEach(t=>{t.bandingNeedsReview=!1,delete t.legacyLaminate}),d.lastSnap=C("banding.confirmed"),It())}function Sv(){const n=Fe(d);n.length&&(Zt(),n.forEach(t=>{t.ignoreInOrder=E.ignoreOrderInput.checked}),d.lastSnap=E.ignoreOrderInput.checked?C("status.removedFromOrder"):C("status.addedToOrder"),It())}function cl(){return E.layoutAnchorAxisInput.value==="y"?"y":"x"}function yv(){const n=an(d);if(!n)return;_h();const t=cl(),e=Ms(n.id,t);E.layoutAnchorCountInput.value=e.length?String(e.length):E.layoutAnchorCountInput.value,E.layoutAnchorSummary.textContent=e.length?e.map(i=>Ot(i.offset)).join(", "):C("inspector.noLayoutAnchors")}function bv(n,t,e){const i=Pt(n),s=t==="x"?i.w:i.h;if(!E.layoutAnchorBalanceInput.checked)return Array.from({length:e},(u,f)=>Math.round(s*(f+1)/(e+1)));const r=Math.max(1,Me(E.layoutAnchorThicknessInput.value,d.thickness)),a=E.layoutAnchorStartInput.value==="inside"?r:0,o=E.layoutAnchorEndInput.value==="inside"?r:0,c=(s-a-o-e*r)/(e+1);return c<0?null:Array.from({length:e},(u,f)=>Math.round(a+c*(f+1)+r*f+r/2))}function Ev(){const n=an(d);if(!n||Fe(d).length>1)return;const t=cl(),e=Math.max(1,Math.min(20,Me(E.layoutAnchorCountInput.value,4))),i=bv(n,t,e);if(!i){d.lastSnap=C("status.notEnoughSpan"),be();return}Zt(),d.layoutAnchors=d.layoutAnchors.filter(s=>!(s.boardId===n.id&&s.axis===t)),i.forEach(s=>{d.layoutAnchors.push({id:d.nextLayoutAnchorId,boardId:n.id,axis:t,offset:s}),d.nextLayoutAnchorId+=1}),d.lastSnap=E.layoutAnchorBalanceInput.checked?C("status.balancedAnchorsAdded",{count:e}):C("status.layoutAnchorsAdded",{count:e}),It()}function Tv(){const n=an(d);!n||!Ms(n.id).length||(Zt(),d.layoutAnchors=d.layoutAnchors.filter(t=>t.boardId!==n.id),d.lastSnap=C("status.layoutAnchorsCleared"),It())}function Rh(n,t){const e=r0[n];if(!e)return;const i=t??Av();d.boards.length||(d.gridOriginX=i.x,d.gridOriginY=i.y),ch({x:Ai(d,i.x-e.w()/2,"x"),y:Ai(d,i.y-e.h()/2,"y"),dimensions:tl(e.orientation,e.w(),e.h()),kind:e.kind,orientation:e.orientation})}function Av(){const n=Nt.getBoundingClientRect();return oi(d,n.width/2,n.height/2)}function Ao(n,t){Jc(n,t)}function wv(n,t,e){n.forEach(i=>{i.x=Math.round(i.x+t),i.y=Math.round(i.y+e)}),n.forEach(i=>Ei(i.id))}function wo(n,t,e){Zt();const i=d.nextMeasurementId;d.measurements.push({id:i,name:Zo(i),a:n,b:t,axis:e,displayOffset:Io({},d.measurements.length)}),d.nextMeasurementId+=1,Rs(i),d.tool="select",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.lastSnap=C("status.measurementAdded"),It()}function Ch(n){const t=an(d);if(!t)return;const e=Pt(t);if(n==="horizontal"){wo({kind:"board-edge",boardId:t.id,edge:"left",offset:e.h/2},{kind:"board-edge",boardId:t.id,edge:"right",offset:e.h/2},"horizontal");return}wo({kind:"board-edge",boardId:t.id,edge:"top",offset:e.w/2},{kind:"board-edge",boardId:t.id,edge:"bottom",offset:e.w/2},"vertical")}function Rv(n){const t=rd(d,n);if(!d.pendingMeasurementAnchor){d.pendingMeasurementAnchor=t,d.previewMeasurementAnchor=null,d.lastSnap=t.kind==="grid"?C("status.gridAnchorSet"):C("status.edgeAnchorSet"),It();return}const e=yi(d,d.pendingMeasurementAnchor),i=yi(d,t);!e||!i||wo(d.pendingMeasurementAnchor,t,ad(e,i))}function Cv(){const n=bi();n.size&&(Zt(),d.boards=d.boards.filter(t=>!n.has(t.id)),d.anchors=d.anchors.filter(t=>!n.has(t.boardId)&&!n.has(t.targetBoardId)),d.layoutAnchors=d.layoutAnchors.filter(t=>!n.has(t.boardId)),d.measurements=d.measurements.filter(t=>![t.a,t.b].some(e=>e.kind==="board-edge"&&n.has(e.boardId))),d.selectedMeasurementId&&!d.measurements.some(t=>t.id===d.selectedMeasurementId)&&(d.selectedMeasurementId=null),rh(),d.lastSnap=n.size>1?C("status.boardsDeleted",{count:n.size}):C("status.boardDeleted"),It())}function Pv(n){d.measurements.some(e=>e.id===n)&&(Zt(),d.measurements=d.measurements.filter(e=>e.id!==n),d.selectedMeasurementId===n&&(d.selectedMeasurementId=null),Es===n&&Ts(),d.lastSnap=C("status.measurementDeleted"),It())}function Ts(){Es=null,E.measureRenameForm.hidden=!0}function Iv(n){const t=E.measureRenameForm.parentElement;if(!t)return;const e=t.getBoundingClientRect(),i=240,s=108,r=Math.max(8,Math.min(n.clientX-e.left-i/2,e.width-i-8)),a=Math.max(8,Math.min(n.clientY-e.top-s-10,e.height-s-8));E.measureRenameForm.style.left=`${r}px`,E.measureRenameForm.style.top=`${a}px`}function Lv(n,t){const e=d.measurements.find(i=>i.id===n);e&&(Es=e.id,Rs(e.id),Iv(t),E.measureRenameInput.value=e.name,E.measureRenameForm.hidden=!1,d.lastSnap=C("status.renameMeasurement"),It(),window.requestAnimationFrame(()=>{E.measureRenameInput.focus(),E.measureRenameInput.select()}))}function Ph(){if(Es===null)return;const n=d.measurements.find(i=>i.id===Es);if(!n){Ts();return}const t=E.measureRenameInput.value.trim(),e=t||Zo(n.id);Ts(),n.name!==e&&(Zt(),n.name=e,Rs(n.id),d.lastSnap=C(t?"status.measurementNamed":"status.measurementReset"),It())}function Ih(){const n=Qc(d);if(n){Pv(n.id);return}Cv()}function Lh(){var s;const n=Fe(d);if(!n.length)return;Zt();const t=new Set(n.map(r=>r.id)),e=new Map,i=n.map(r=>{const a=d.nextId;return d.nextId+=1,e.set(r.id,a),{...r,id:a,name:Fr(a),x:r.x+35,y:r.y+35,dimensions:{...r.dimensions},...Co(r),group:0}});d.boards.push(...i),d.anchors.filter(r=>t.has(r.boardId)&&t.has(r.targetBoardId)).forEach(r=>{const a=e.get(r.boardId),o=e.get(r.targetBoardId);!a||!o||(d.anchors.push({...r,id:d.nextAnchorId,boardId:a,targetBoardId:o}),d.nextAnchorId+=1)}),d.layoutAnchors.filter(r=>t.has(r.boardId)).forEach(r=>{const a=e.get(r.boardId);a&&(d.layoutAnchors.push({...r,id:d.nextLayoutAnchorId,boardId:a}),d.nextLayoutAnchorId+=1)}),Cn(i.map(r=>r.id),((s=i[0])==null?void 0:s.id)??null),d.lastSnap=i.length>1?C("status.boardsDuplicated",{count:i.length}):C("status.boardDuplicated"),It()}function Dv(n){return n==="vertical"?"horizontal":n==="horizontal"?"vertical":"front"}function Uv(n){return n==="upright"?"shelf":n==="shelf"?"upright":n}function Dh(){const n=Fe(d);if(!n.length)return;Zt();const t=new Set(n.map(e=>e.id));n.forEach(e=>{const i=Pt(e),s=i.x+i.w/2,r=i.y+i.h/2;e.orientation=Dv(e.orientation),e.kind=Uv(e.kind);const a=Pt(e);e.x=Math.round(s-a.w/2),e.y=Math.round(r-a.h/2),d.layoutAnchors.filter(o=>o.boardId===e.id).forEach(o=>{o.axis=o.axis==="x"?"y":"x"})}),d.anchors=d.anchors.filter(e=>!t.has(e.boardId)&&!t.has(e.targetBoardId)),d.lastSnap=n.length>1?C("status.rotatedBoards",{count:n.length}):C("status.rotated90"),It()}function Nv(n){return n instanceof HTMLElement?n instanceof HTMLInputElement?["email","number","password","search","tel","text","url"].includes(n.type):n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement||n.isContentEditable:!1}function dl(n){return{n:"ns-resize",s:"ns-resize",e:"ew-resize",w:"ew-resize",ne:"nesw-resize",sw:"nesw-resize",nw:"nwse-resize",se:"nwse-resize"}[n]}function Wc(n){return n.shiftKey||n.metaKey||n.ctrlKey}function Fv(n){return n.button===1||n.altKey}function Ov(n,t){const e=Math.min(n.x,t.x),i=Math.min(n.y,t.y);return{x:e,y:i,w:Math.abs(n.x-t.x),h:Math.abs(n.y-t.y)}}function Bv(n,t){return n.x<=t.x+t.w&&n.x+n.w>=t.x&&n.y<=t.y+t.h&&n.y+n.h>=t.y}function kv(n){return d.boards.filter(t=>t.kind==="front"&&!d.showFrontPanels?!1:Bv(n,Pt(t)))}function Ro(n){if(d.tool==="measure"){Nt.style.cursor="";return}if(d.measurementDragging){Nt.style.cursor="move";return}if(Do(d,n)){Nt.style.cursor="move";return}const t=an(d);if(t){const e=id(d,t,n);if(e){Nt.style.cursor=dl(e);return}}Nt.style.cursor=td(d,n)?"grab":"crosshair"}function zv(n){const t=d.measurementDragging;if(!t)return;const e=d.measurements.find(l=>l.id===t.id),i=d.measurements.findIndex(l=>l.id===t.id);if(!e||i<0)return;const s=Lo(d,e,i);if(!s)return;const r=n.x-t.startPoint.x,a=n.y-t.startPoint.y,o=Math.hypot(r*d.scale,a*d.scale);!t.changed&&o>3&&(Zt(),t.changed=!0),t.changed&&(e.displayOffset=Math.round(s.axis==="horizontal"?t.startOffset-a:t.startOffset+r),d.lastSnap=C("status.measurementDisplayMoved"),Nt.style.cursor="move",It())}function Gv(n){d.tool!=="measure"||!d.pendingMeasurementAnchor||(d.previewMeasurementAnchor=rd(d,n),It())}Nt.addEventListener("pointerdown",n=>{const t=Nt.getBoundingClientRect(),e=oi(d,n.clientX-t.left,n.clientY-t.top);if(d.tool==="measure"){Rv(e);return}if(Fv(n)){d.panning={startX:n.clientX,startY:n.clientY,panX:d.panX,panY:d.panY},Nt.style.cursor="grabbing",Nt.setPointerCapture(n.pointerId);return}const i=an(d);if(i){const a=id(d,i,e);if(a&&Fe(d).length<=1){Zt(),d.resizing={id:i.id,handle:a,startPoint:e,startRect:Pt(i)},d.lastSnap=C("status.resizing"),Nt.style.cursor=dl(a),Nt.setPointerCapture(n.pointerId),It();return}}const s=Do(d,e);if(s){const a=d.measurements.findIndex(o=>o.id===s.id);Rs(s.id),d.measurementDragging={id:s.id,startPoint:e,startOffset:Io(s,a),changed:!1},d.lastSnap=C("status.measurementSelected"),Nt.style.cursor="move",Nt.setPointerCapture(n.pointerId),It();return}const r=td(d,e);if(r){if(Wc(n)){d0(r.id),d.lastSnap=bi().size>1?C("status.boardsSelected",{count:bi().size}):C("status.selectionUpdated"),It();return}const a=bi(),o=a.has(r.id)?[r.id,...[...a].filter(l=>l!==r.id)]:[r.id];Cn(o,r.id),Zt(),d.dragging={ids:o,startPoint:e,startRects:o.flatMap(l=>{const c=d.boards.find(u=>u.id===l);return c?[{id:l,...Pt(c)}]:[]})},Nt.style.cursor="grabbing",Nt.setPointerCapture(n.pointerId)}else d.selectionBox={start:e,current:e,additive:Wc(n)},Nt.style.cursor="crosshair",Nt.setPointerCapture(n.pointerId);It()},vt);Nt.addEventListener("dblclick",n=>{if(d.tool==="measure")return;const t=Nt.getBoundingClientRect(),e=oi(d,n.clientX-t.left,n.clientY-t.top),i=Do(d,e);i&&(n.preventDefault(),Lv(i.id,n))},vt);Nt.addEventListener("pointermove",n=>{const t=Nt.getBoundingClientRect(),e=oi(d,n.clientX-t.left,n.clientY-t.top);if(d.tool==="measure"){Gv(e),Ro(e);return}if(d.resizing){const f=d.boards.find(m=>{var _;return m.id===((_=d.resizing)==null?void 0:_.id)});if(!f)return;const h=eu(d,f,d.resizing.handle,d.resizing.startRect,d.resizing.startPoint,e);Ao(f,h.rect),Ei(f.id),d.snapGuides=h.guides,d.lastSnap=h.label,Nt.style.cursor=dl(d.resizing.handle),It();return}if(d.panning){d.panX=d.panning.panX+n.clientX-d.panning.startX,d.panY=d.panning.panY+n.clientY-d.panning.startY,d.snapGuides=[],d.lastSnap=C("status.panningView"),Nt.style.cursor="grabbing",It();return}if(d.measurementDragging){zv(e);return}if(d.selectionBox){d.selectionBox.current=e,d.snapGuides=[],d.lastSnap=C("status.selectingBoards"),Nt.style.cursor="crosshair",It();return}if(!d.dragging){Ro(e);return}const i=d.boards.find(f=>{var h;return f.id===((h=d.dragging)==null?void 0:h.ids[0])});if(!i)return;const s=d.dragging.startRects.find(f=>f.id===i.id);if(!s)return;const r=e.x-d.dragging.startPoint.x,a=e.y-d.dragging.startPoint.y,o=new Set(d.dragging.ids),l=tu(d,i,s.x+r,s.y+a,o),c=l.x-s.x,u=l.y-s.y;d.dragging.startRects.forEach(f=>{const h=d.boards.find(m=>m.id===f.id);h&&Ao(h,{...f,x:f.x+c,y:f.y+u})}),d.dragging.ids.forEach(f=>Ei(f)),d.snapGuides=l.guides,d.lastSnap=l.label,Nt.style.cursor="grabbing",It()},vt);Nt.addEventListener("pointerup",n=>{var a;const t=Nt.getBoundingClientRect(),e=oi(d,n.clientX-t.left,n.clientY-t.top),i=((a=d.dragging)==null?void 0:a.ids)??(d.resizing?[d.resizing.id]:[]),s=d.measurementDragging,r=d.selectionBox;if(r){const o=Ov(r.start,r.current);if(Math.hypot((r.current.x-r.start.x)*d.scale,(r.current.y-r.start.y)*d.scale)>4){const c=kv(o).map(f=>f.id),u=r.additive?[...bi(),...c]:c;Cn(u,c[0]??(r.additive?d.selectedId:null)),d.lastSnap=c.length?C("status.boardsSelected",{count:bi().size}):C("status.noBoardsInSelection")}else r.additive||(rh(),d.selectedMeasurementId=null,d.lastSnap=C("workspace.noBoardSelected"))}d.dragging=null,d.resizing=null,d.measurementDragging=null,d.panning=null,d.selectionBox=null,d.snapGuides=[],i.forEach(o=>yh(o)),s!=null&&s.changed&&(d.lastSnap=C("status.measurementDisplayMoved")),Nt.hasPointerCapture(n.pointerId)&&Nt.releasePointerCapture(n.pointerId),Ro(e),It()},vt);Nt.addEventListener("pointerleave",()=>{!d.dragging&&!d.resizing&&!d.measurementDragging&&!d.panning&&!d.selectionBox&&(Nt.style.cursor="")},vt);Nt.addEventListener("wheel",n=>{n.preventDefault();const t=Nt.getBoundingClientRect(),e={x:n.clientX-t.left,y:n.clientY-t.top},i=oi(d,e.x,e.y);d.scale=Math.max(n0,Math.min(s0,d.scale*(n.deltaY>0?.92:1.08)));const s=oi(d,e.x,e.y);d.panX+=(s.x-i.x)*d.scale,d.panY+=(s.y-i.y)*d.scale,It()},{passive:!1,signal:nh.signal});E.anchorOverlay.addEventListener("click",n=>{const t=n.target.closest("[data-remove-anchor]");if(!t)return;const e=Number(t.dataset.removeAnchor);Zt(),d.anchors=d.anchors.filter(i=>i.id!==e),d.lastSnap=C("status.anchorRemoved"),It()},vt);E.templateList.addEventListener("click",n=>{const t=n.target.closest("[data-template]"),e=t==null?void 0:t.dataset.template;e&&I0(e)},vt);E.measureModeBtn.addEventListener("click",()=>{d.tool=d.tool==="measure"?"select":"measure",d.pendingMeasurementAnchor=null,d.previewMeasurementAnchor=null,d.lastSnap=d.tool==="measure"?C("status.pickFirstAnchor"):C("status.selectMode"),It()},vt);E.presetList.addEventListener("click",n=>{const t=n.target.closest("[data-preset]");t&&Rh(t.dataset.preset??"")},vt);E.presetList.addEventListener("dragstart",n=>{const t=n.target.closest("[data-preset]");!t||!n.dataTransfer||(n.dataTransfer.setData("text/plain",t.dataset.preset??""),n.dataTransfer.effectAllowed="copy")},vt);Nt.addEventListener("dragover",n=>{n.preventDefault(),Nt.classList.add("drop-ready")},vt);Nt.addEventListener("dragleave",()=>{Nt.classList.remove("drop-ready")},vt);Nt.addEventListener("drop",n=>{var i;n.preventDefault(),Nt.classList.remove("drop-ready");const t=(i=n.dataTransfer)==null?void 0:i.getData("text/plain");if(!t)return;const e=Nt.getBoundingClientRect();Rh(t,oi(d,n.clientX-e.left,n.clientY-e.top))},vt);E.duplicateBtn.addEventListener("click",Lh,vt);E.rotateBtn.addEventListener("click",Dh,vt);E.undoBtn.addEventListener("click",uh,vt);E.redoBtn.addEventListener("click",Eo,vt);E.measureWidthBtn.addEventListener("click",()=>Ch("horizontal"),vt);E.measureHeightBtn.addEventListener("click",()=>Ch("vertical"),vt);E.saveBtn.addEventListener("click",z0,vt);E.loadBtn.addEventListener("click",G0,vt);E.newProjectBtn.addEventListener("click",D0,vt);E.projectFileInput.addEventListener("change",()=>{var t;const n=(t=E.projectFileInput.files)==null?void 0:t[0];n&&H0(n)},vt);E.deleteBtn.addEventListener("click",Ih,vt);E.fitBtn.addEventListener("click",ol,vt);E.view3dBtn.addEventListener("click",()=>{el(Yn==="3d"?"sketch":"3d")},vt);E.woodOrderToggleBtn.addEventListener("click",()=>vh(!Fn),vt);E.woodOrderBackBtn.addEventListener("click",()=>vh(!1),vt);E.cutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&Mh(Number(t.dataset.boardId))},vt);E.ignoredCutList.addEventListener("click",n=>{const t=n.target.closest("[data-board-id]");t&&Mh(Number(t.dataset.boardId))},vt);E.copyCsvBtn.addEventListener("click",()=>void hv(),vt);E.exportBtn.addEventListener("click",dv,vt);E.printOrderBtn.addEventListener("click",uv,vt);E.printSketchBtn.addEventListener("click",fv,vt);E.projectNameInput.addEventListener("change",()=>{const n=fh(E.projectNameInput.value);E.projectNameInput.value=n,n!==d.projectName&&(Zt(),d.projectName=n,d.lastSnap=C(n?"status.projectNamed":"status.projectNameCleared"),It())},vt);xh(E.thicknessInput,()=>av(Math.max(3,Number(E.thicknessInput.value)||18)));E.depthInput.addEventListener("change",()=>ov(Me(E.depthInput.value,d.depth)),vt);E.gridInput.addEventListener("input",()=>{Zt(),d.grid=Math.max(1,Number(E.gridInput.value)||25),It()},vt);E.snapToggle.addEventListener("change",()=>{Zt(),d.snap=E.snapToggle.checked,d.lastSnap=d.snap?C("status.snapOn"):C("status.snapOff"),It()},vt);E.dimToggle.addEventListener("change",()=>{Zt(),d.showDimensions=E.dimToggle.checked,It()},vt);E.frontLayerToggle.addEventListener("change",()=>{Zt(),d.showFrontPanels=E.frontLayerToggle.checked,d.lastSnap=d.showFrontPanels?C("status.frontPanelsShown"):C("status.frontPanelsHidden"),It()},vt);E.connectionMarksToggle.addEventListener("change",()=>{Zt(),d.showConnectionMarks=E.connectionMarksToggle.checked,d.lastSnap=d.showConnectionMarks?C("status.connectionMarksShown"):C("status.connectionMarksHidden"),It()},vt);[E.nameInput,E.xInput,E.yInput,E.wInput,E.hInput,E.depthOverrideInput].forEach(n=>xh(n,_v));E.materialInput.addEventListener("change",wh,vt);E.materialSelectButton.addEventListener("click",n=>{n.stopPropagation(),q0()},vt);E.materialSelectList.addEventListener("click",n=>{const t=n.target.closest("[data-material-id]");t&&(E.materialInput.value=t.dataset.materialId??"",sl(),wh())},vt);document.addEventListener("click",n=>{E.materialSelect.contains(n.target)||sl()},vt);document.addEventListener("keydown",n=>{n.key==="Escape"&&sl()},vt);E.layoutAnchorAxisInput.addEventListener("change",yv,vt);E.layoutAnchorBalanceInput.addEventListener("change",To,vt);E.layoutAnchorApplyBtn.addEventListener("click",Ev,vt);E.layoutAnchorClearBtn.addEventListener("click",Tv,vt);E.materialForm.addEventListener("submit",n=>{n.preventDefault(),xv()},vt);E.bandingProfileInput.addEventListener("change",()=>{vn=E.bandingProfileInput.value},vt);E.bandingDiagram.addEventListener("click",n=>{var r;const t=n.target.closest("[data-banding-edge]");if(!t)return;const e=t.dataset.bandingEdge,i=Fe(d),s=$e(i,a=>Ji(a.edgeBanding[e]))!==null&&!!((r=i[0])!=null&&r.edgeBanding[e]);ll(i.map(a=>({board:a,edge:e,profile:s?null:Qo(vn,a)})))},vt);E.bandingEdgeFields.addEventListener("change",n=>{const t=n.target;if(!t.dataset.bandingInput||!t.value||t.value==="current")return;const e=t.dataset.bandingInput;ll(Fe(d).map(i=>({board:i,edge:e,profile:Qo(t.value,i)})))},vt);E.bandingPresets.addEventListener("click",n=>{const t=n.target.closest("[data-banding-preset]");if(!t)return;const e=t.dataset.bandingPreset;ll(Fe(d).flatMap(i=>Zi.map(s=>({board:i,edge:s,profile:e==="all"||e==="front"&&s===$c(i)?Qo(vn,i):null}))))},vt);E.addBandingProfileBtn.addEventListener("click",vv,vt);E.confirmBandingBtn.addEventListener("click",Mv,vt);E.faceLaminationInput.addEventListener("change",()=>{const n=E.faceLaminationInput.value;if(!["both","s1","s2","none"].includes(n))return;const t=Rr(n),e=Fe(d);!e.length||e.every(i=>i.faceLamination===t)||(Zt(),e.forEach(i=>{i.faceLamination=t}),d.lastSnap=C("faceLamination.updated"),It())},vt);E.grainInput.addEventListener("change",()=>{const n=E.grainInput.value;if(n!=="none"&&n!=="a"&&n!=="b")return;const t=Fe(d);!t.length||t.every(e=>e.grainDirection===n)||(Zt(),t.forEach(e=>{e.grainDirection=n}),It())},vt);E.ignoreOrderInput.addEventListener("change",Sv,vt);E.measureRenameForm.addEventListener("submit",n=>{n.preventDefault(),Ph()},vt);E.measureRenameCancelBtn.addEventListener("click",Ts,vt);E.measureRenameInput.addEventListener("keydown",n=>{n.key==="Escape"&&Ts(),n.key==="Enter"&&(n.preventDefault(),Ph())},vt);document.addEventListener("keydown",n=>{if(Nv(n.target))return;const t=n.key.toLowerCase(),e=n.metaKey||n.ctrlKey;if(e&&t==="z"){n.preventDefault(),n.shiftKey?Eo():uh();return}if(e&&t==="y"){n.preventDefault(),Eo();return}if(e&&t==="d"){n.preventDefault(),Lh();return}if(!e&&t==="r"){n.preventDefault(),Dh();return}(n.key==="Delete"||n.key==="Backspace")&&(n.preventDefault(),Ih())},vt);window.addEventListener("resize",kr,vt);il();E.canvasWrap.dataset.view=Yn;E.view3dBtn.setAttribute("aria-pressed","false");jo.bindInteractions(vt);k0();kr();
