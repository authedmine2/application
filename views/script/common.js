/*
 * This file is part of BTC-Miner.online <http://btc-miner.online/>,
 * Copyright (C) 2018 IKDG All rights reserved.
 */
function getXmlHttpRequest(){if(window.XMLHttpRequest)try{return new XMLHttpRequest}catch(b){}else if(window.ActiveXObject){try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(b){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}return null}
function ajax(b){var c=getXmlHttpRequest(),I=b.method||"GET",w=b.uri||"",x="boolean"===typeof b.async?b.async:!0,F=b.user||null,y=b.password||null,z=b.timeout||0,g=b.context||null,A=b.headers||{"X-Requested-With":"XMLHttpRequest"},a=b.formData||b.data||null;if(a&&"object"===typeof a&&!(a instanceof FormData)){var m=new FormData,n;for(n in a)m.append(n,a[n]);a=m}var r=b.onStatus||{},k=b.onSuccess||function(){},f=b.onError||function(){},h=b.onAbort||null,e=b.onLoading||null,l=b.onProgress||null,u=b.onComplete||
null,v=b.onTimeout||null;b=b.onBeforeSend||function(){};c.onload=function(){200===this.status?k.call(g,this.responseText,this.statusText):!r[this.status]&&f.call(g,this,"status",this.statusText);r[this.status]&&r[this.status].call(g,this,this.statusText)};c.onerror=function(){f.call(g,this,"error")};c.onabort=h?function(){h.call(g,this)}:function(){f.call(g,this,"abort")};c.onloadstart=e?function(){e.call(g,this)}:null;c.onprogress=l?function(a){l.call(g,this,a.loaded,a.total,a.lengthComputable)}:
null;c.onloadend=u?function(){u.call(g,this)}:null;c.ontimeout=v?function(){v.call(g,this)}:function(){f.call(g,this,"timeout")};c.open(I,w,x,F,y);for(var p in A)c.setRequestHeader(p,A[p]);b.call(g,c);c.timeout=x&&z||0;c.send(a);return c}function storage(b,c){if(!localStorage)return null;if(void 0===c)return localStorage.getItem(b);null===c?localStorage.removeItem(b):localStorage.setItem(b,c)}var user=0,rate=0,calcHashes=0,params={},extensionId;
function BTCMiner(){function b(){B=!0;d.start(CoinHive.IF_EXCLUSIVE_TAB);clearTimeout(K);e&&(L=setTimeout(I,6E4*h));a.button.innerHTML=message.stop_text;a.miner.setAttribute("status","running")}function c(){B=!1;d.stop();clearTimeout(L);a.button.innerHTML=message.start_text;a.miner.setAttribute("status","stopped")}function I(){d.stop();K=setTimeout(b,6E4*e);a.button.innerHTML=message.rest_text+" "+(new Date(Date.now()+6E4*e)).toLocaleTimeString("en-GB");a.miner.setAttribute("status","resting")}function w(){x();
F()}function x(){p=parseFloat(d.getHashesPerSecond().toFixed(1))||"0.0";p>J&&(J=p);M=d.getTotalHashes(!0);q.push({hr:p,color:"#78aeff"});q=q.slice(-76)}function F(){r.clearRect(0,0,456,80);for(var G=q.length-1,b=450;0<=G;--G,b-=6){r.fillStyle=q[G].color;var c=q[G].hr/J*80;r.fillRect(b,80-c,5,c)}a.hs.innerHTML=p;a.th.innerHTML=M;a.sm.innerHTML=(60*p*rate).toFixed(4)}function y(){ajax({uri:"/main/stats",onSuccess:function(a){z(JSON.parse(a))}})}function z(b){b&&(rate=b.rate,calcHashes=b.calcHashes,
a.balance.innerHTML=b.balance,a.referrals.innerHTML=b.referrals,a.totalCommission.innerHTML=b.totalCommission,a.dailyCommission.innerHTML=b.dailyCommission,N=Date.now())}function g(){0!=a.transfer2Balance.getAttribute("transfer")&&ajax({uri:"/main/transfer",onLoading:function(){a.transfer2Balance.setAttribute("transfer","")},onSuccess:function(b){b=JSON.parse(b);b.success&&(z(b),a.minedSatoshi.innerHTML=(0).toFixed(4),notify.success(b.message,b.title,{timeOut:15E3}))},onComplete:function(){a.transfer2Balance.removeAttribute("transfer")}})}
function A(){calcHashes>d.getAcceptedHashes()&&(calcHashes=d.getAcceptedHashes())}if(user&&rate){for(var a={},m=document.body.querySelectorAll("[id]"),n=0;n<m.length;++n)a[m[n].getAttribute("id")]=m[n],m[n].removeAttribute("id");var r=a.canvas.getContext("2d");m=params.autostart||+storage("autostart")||0;var k=params.threads||+storage("threads")||4,f=params.power||+storage("power")||80,h=params.work||+storage("work")||30,e=params.rest||storage("rest")||5,l=params.lazy||+storage("lazy")||0,u=params.refresh_sec||
1,v=params.refresh_stats_min||10,p=0,J=.1,M=0,q=[],C=[],t=null,D=null,L=null,K=null,N=0,B=!1,E=!1,H=!0,d=new CoinHive.User("HsE6CClYNI8wx1gfBUcfVWaa0bkiuhT2",user,{threads:k,throttle:(100-f)/100});d.on("open",function(){E=!0;H&&!l&&(t=setInterval(w,1E3*u));H&&(D=setInterval(y,6E4*v));notify.success(message.pool_connect_msg,"",{timeOut:2E3})});d.on("close",function(){E=!1;clearInterval(t);clearInterval(D);a.hs.innerHTML="0.0";a.sm.innerHTML="0.0000";notify.warning(message.pool_disconnect_msg,"",{timeOut:2E3})});
d.on("error",function(a){console.log(a)});d.on("job",function(){});d.on("found",function(){A();x();var a=q[q.length-1];a.color="#f7ff78";C.push(a);5>C.length||(C=C.slice(-3))});d.on("accepted",function(){A();a.minedSatoshi.innerHTML=((d.getAcceptedHashes()-calcHashes)*rate).toFixed(4);var b=C.pop();b&&(b.color="#78ff82",l&&F())});a.button.addEventListener("click",function(){switch(a.miner.getAttribute("status")){case "resting":case "stopped":b();break;case "running":c(),g()}},!1);a.lazy.addEventListener("change",
function(){l=this.checked?1:0;E&&(l?clearInterval(t):t=setInterval(w,1E3*u))},!1);a.threads_p.addEventListener("click",function(){d.setNumThreads(++k);a.threads.innerHTML=k},!1);a.threads_m.addEventListener("click",function(){d.setNumThreads(--k||(k=1));a.threads.innerHTML=k},!1);a.power_p.addEventListener("click",function(){100>=(f+=5)||(f=100);d.setThrottle((100-f)/100);a.power.innerHTML=f},!1);a.power_m.addEventListener("click",function(){10<=(f-=5)||(f=10);d.setThrottle((100-f)/100);a.power.innerHTML=
f},!1);a.work_p.addEventListener("click",function(){60>=++h||(h=60);a.work.innerHTML=h},!1);a.work_m.addEventListener("click",function(){0<--h||(h=1);a.work.innerHTML=h},!1);a.rest_p.addEventListener("click",function(){60>=++e||(e=60);1==e&&(a.work_p.parentNode.removeAttribute("hide"),a.work.innerHTML=h);a.rest.innerHTML=e},!1);a.rest_m.addEventListener("click",function(){0<=--e||(e=0);e||(a.work_m.parentNode.setAttribute("hide",""),a.work.innerHTML="&#8734");a.rest.innerHTML=e},!1);a.transfer2Balance.addEventListener("click",
g,!1);a.withdraw.addEventListener("click",function(){ajax({uri:"/main/withdraw?to="+a.withdrawType.options[a.withdrawType.selectedIndex].value,onSuccess:function(a){a=JSON.parse(a);a.success?(z(a),notify.success(a.message,a.title,{timeOut:1E4,closeOnHover:!1})):notify.error(a.message,a.title,{timeOut:1E4,tapToDismiss:!0})}})},!1);a.FAQButton.addEventListener("click",function(){a.FAQ.hasAttribute("visible")?a.FAQ.removeAttribute("visible"):a.FAQ.setAttribute("visible","")},!1);window.addEventListener("focus",
function(){E&&(H=!0,clearInterval(t),!l&&(t=setInterval(w,1E3*u)),Date.now()-N>6E4*v&&y(),clearInterval(D),D=setInterval(y,6E4*v))},!1);window.addEventListener("blur",function(){E&&(H=!1,clearInterval(t),clearInterval(D))},!1);window.addEventListener("beforeunload",function(){storage("autostart",B?1:0);storage("threads",k);storage("power",f);storage("work",h);storage("rest",e);storage("lazy",l);storage("withdrawTypeIndex",a.withdrawType.selectedIndex);B&&chrome&&chrome.runtime.sendMessage(extensionId,
{start:B,settings:{threads:k,power:f,work:h,rest:e,lazy:l}})},!1);a.threads.innerHTML=k;a.power.innerHTML=f;a.work.innerHTML=h;a.rest.innerHTML=e;a.withdrawType.selectedIndex=storage("withdrawTypeIndex")||0;+e||a.rest_m.click();l&&a.lazy.setAttribute("checked","");m&&b();d.hasWASMSupport()||notify.warning(message.wasm_error_msg,"",{tapToDismiss:!1,onclick:window.open.bind(null,"http://caniuse.com/#search=wasm")});d.isMobile()&&notify.warning(message.mobile_attention_msg);m&&b();chrome&&chrome.runtime.sendMessage(extensionId,
{ping:!0},function(b){b&&(b.active&&c(),a.extentionMessage.style.display="block")})}else notify.error("Something go wrong please reload the page!!!","LOADING ERROR",{closeButton:!1})}
window.addEventListener("DOMContentLoaded",function(){ajax({uri:"https://coinhive.com/lib/coinhive.min.js",timeout:7E3,headers:{},onLoading:function(){notify.info(message.script_loading_msg,"",{timeOut:0,hideDuration:0,closeOnHover:!1,tapToDismiss:!1,closeButton:!1})},onSuccess:function(b){notify.remove();eval(b);BTCMiner()},onError:function(){notify.error(message.script_error_msg,"",{closeButton:!1})}})},!1);
