(()=>{var t={484:function(t){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",s="day",a="week",i="month",o="quarter",l="year",c="date",u=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,d=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},p={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,i),a=n-s<0,o=e.clone().add(r+(a?-1:1),i);return+(-(r+(n-s)/(a?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(u){return{M:i,y:l,w:a,d:s,D:c,h:r,m:n,s:e,ms:t,Q:o}[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},f="en",g={};g[f]=h;var y=function(t){return t instanceof S},$=function(t,e,n){var r;if(!t)return f;if("string"==typeof t)g[t]&&(r=t),e&&(g[t]=e,r=t);else{var s=t.name;g[s]=t,r=s}return!n&&r&&(f=r),r||!n&&f},v=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},C=p;C.l=$,C.i=y,C.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function h(t){this.$L=$(t.locale,null,!0),this.parse(t)}var m=h.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(C.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(u);if(r){var s=r[2]-1||0,a=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return C},m.isValid=function(){return!("Invalid Date"===this.$d.toString())},m.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return v(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<v(t)},m.$g=function(t,e,n){return C.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,o){var u=this,d=!!C.u(o)||o,h=C.p(t),m=function(t,e){var n=C.w(u.$u?Date.UTC(u.$y,e,t):new Date(u.$y,e,t),u);return d?n:n.endOf(s)},p=function(t,e){return C.w(u.toDate()[t].apply(u.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),u)},f=this.$W,g=this.$M,y=this.$D,$="set"+(this.$u?"UTC":"");switch(h){case l:return d?m(1,0):m(31,11);case i:return d?m(1,g):m(0,g+1);case a:var v=this.$locale().weekStart||0,S=(f<v?f+7:f)-v;return m(d?y-S:y+(6-S),g);case s:case c:return p($+"Hours",0);case r:return p($+"Minutes",1);case n:return p($+"Seconds",2);case e:return p($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(a,o){var u,d=C.p(a),h="set"+(this.$u?"UTC":""),m=(u={},u[s]=h+"Date",u[c]=h+"Date",u[i]=h+"Month",u[l]=h+"FullYear",u[r]=h+"Hours",u[n]=h+"Minutes",u[e]=h+"Seconds",u[t]=h+"Milliseconds",u)[d],p=d===s?this.$D+(o-this.$W):o;if(d===i||d===l){var f=this.clone().set(c,1);f.$d[m](p),f.init(),this.$d=f.set(c,Math.min(this.$D,f.daysInMonth())).$d}else m&&this.$d[m](p);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[C.p(t)]()},m.add=function(t,o){var c,u=this;t=Number(t);var d=C.p(o),h=function(e){var n=v(u);return C.w(n.date(n.date()+Math.round(e*t)),u)};if(d===i)return this.set(i,this.$M+t);if(d===l)return this.set(l,this.$y+t);if(d===s)return h(1);if(d===a)return h(7);var m=(c={},c[n]=6e4,c[r]=36e5,c[e]=1e3,c)[d]||1,p=this.$d.getTime()+t*m;return C.w(p,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=C.z(this),s=this.$locale(),a=this.$H,i=this.$m,o=this.$M,l=s.weekdays,c=s.months,u=function(t,r,s,a){return t&&(t[r]||t(e,n))||s[r].substr(0,a)},h=function(t){return C.s(a%12||12,t,"0")},m=s.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:C.s(o+1,2,"0"),MMM:u(s.monthsShort,o,c,3),MMMM:u(c,o),D:this.$D,DD:C.s(this.$D,2,"0"),d:String(this.$W),dd:u(s.weekdaysMin,this.$W,l,2),ddd:u(s.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(a),HH:C.s(a,2,"0"),h:h(1),hh:h(2),a:m(a,i,!0),A:m(a,i,!1),m:String(i),mm:C.s(i,2,"0"),s:String(this.$s),ss:C.s(this.$s,2,"0"),SSS:C.s(this.$ms,3,"0"),Z:r};return n.replace(d,(function(t,e){return e||p[t]||r.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(t,c,u){var d,h=C.p(c),m=v(t),p=6e4*(m.utcOffset()-this.utcOffset()),f=this-m,g=C.m(this,m);return g=(d={},d[l]=g/12,d[i]=g,d[o]=g/3,d[a]=(f-p)/6048e5,d[s]=(f-p)/864e5,d[r]=f/36e5,d[n]=f/6e4,d[e]=f/1e3,d)[h]||f,u?g:C.a(g)},m.daysInMonth=function(){return this.endOf(i).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=$(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return C.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),M=S.prototype;return v.prototype=M,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",s],["$M",i],["$y",l],["$D",c]].forEach((function(t){M[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=$,v.isDayjs=y,v.unix=function(t){return v(1e3*t)},v.en=g[f],v.Ls=g,v.p={},v}()}},e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={exports:{}};return t[r].call(s.exports,s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(484),e=n.n(t);class r{constructor(t,e){this.mapId=t,this.onClick=e}async init(){await this.injectScript(),await this.loadYMaps(),this.initMap()}injectScript(){return new Promise((t=>{const e=document.createElement("script");e.src="https://api-maps.yandex.ru/2.1/?apikey=23265c40-7e83-4018-b79c-affa080745c1&lang=ru_RU",document.body.appendChild(e),e.addEventListener("load",t)}))}loadYMaps(){return new Promise((t=>ymaps.ready(t)))}initMap(){this.map=new ymaps.Map(this.mapId,{center:[55.76,37.64],zoom:12,controls:["zoomControl"]}),this.clusterer=new ymaps.Clusterer({clusterDisableClickZoom:!0,clusterOpenBalloonOnClick:!0,clusterBalloonContentLayout:"cluster#balloonCarousel",clusterBalloonPanelMaxMapArea:0,clusterBalloonContentLayoutWidth:300,clusterBalloonContentLayoutHeight:130,clusterBalloonPagerSize:5}),this.clusterer.events.add("click",(t=>this.onClick(t.get("target").geometry.getCoordinates(),!0))),this.map.geoObjects.add(this.clusterer),this.map.events.add("click",(t=>this.onClick(t.get("coords"))))}openBalloon(t,e){this.map.balloon.open(t,e)}closeBalloon(){this.map.balloon.close()}balloonIsOpen(){return this.map.balloon.isOpen()}setBalloonContent(t){this.map.balloon.setData(t)}setClusteredBalloonContent(t){this.clusterer.options.set("clusterBalloonItemContentLayout",ymaps.templateLayoutFactory.createClass(t))}createPlacemark(t){const e=new ymaps.Placemark(t.coords,t);e.events.add("click",(t=>{const e=t.get("target").geometry.getCoordinates();this.onClick(e)})),this.clusterer.add(e)}getPlacemarks(){return this.clusterer.getGeoObjects()}}new class{constructor(){this.map=new r("map",this.onClick.bind(this)),this.map.init().then(this.onInit.bind(this))}onInit(){const t=this.getData();t.forEach((e=>{const n=this.filterCoordsByProperties(this.map.getPlacemarks(),e.coords);0===n.length?this.map.createPlacemark(e):n[0].properties.set({filteredData:this.filterByCoords(t,e.coords)})})),document.addEventListener("click",this.onFormClick.bind(this)),document.addEventListener("keydown",this.onFormKeydown.bind(this))}onClick(t,e){e?this.openClusteredBalloon():this.openBalloon(t)}async openBalloon(t){let e=await this.getBalloonTemplate(t);this.map.openBalloon(t,e)}openClusteredBalloon(){let t=this.getClustererTemplate();this.map.setClusteredBalloonContent(t)}onFormKeydown(t){27==t.keyCode&&this.map.balloonIsOpen()&&this.map.closeBalloon()}onFormClick(t){let{className:e}=t.target;"form__button"===e?this.submitClick():"js-address-link"===e&&this.linkClick(t)}async submitClick(){const t=document.querySelector(".modal__address"),n=JSON.parse(t.dataset.coords),r=this.getSelector("#name"),s=this.getSelector("#place"),a=this.getSelector("#comment"),i=await this.getAddress(n),o=e()().format("DD.MM.YYYY");if(!this.validateFields([r,s,a]))return;const l={coords:n,name:this.getValue(r),place:this.getValue(s),comment:this.getValue(a),address:i,date:o};0===this.filterByCoords(this.getData(),n).length&&this.map.createPlacemark(l),this.setData(l),this.map.closeBalloon()}linkClick(t){t.preventDefault(),this.map.closeBalloon();const e=JSON.parse(t.target.dataset.coords);this.openBalloon(e)}async getBalloonTemplate(t){const e=this.filterByCoords(this.getData(),t),n=await this.getAddress(t);let r=document.createElement("div");r.className="balloon";let s=document.createElement("div");s.className="reviews";let a=document.createElement("div");a.className="modal__address",a.textContent=n,a.dataset.coords=JSON.stringify(t);let i=document.createElement("ul");i.className="modal__list",e.forEach((t=>{let e=this.getReviewItemTemplate(t),n=document.createElement("li");n.className="modal__list-item",n.appendChild(e),i.appendChild(n)})),s.appendChild(a),e.length>0&&s.appendChild(i),r.appendChild(s);const o=document.querySelector("#modal").innerHTML;let l=document.createElement("div");return l.className="modal",l.innerHTML=o,r.appendChild(l),r.innerHTML}getClustererTemplate(){let t=document.createElement("div"),e=document.createElement("a");e.href="#",e.className="js-address-link",e.textContent="{{properties.address}}",e.dataset.coords="[{{properties.coords}}]";let n=this.getReviewItemTemplate({name:"{{properties.name}}",place:"{{properties.place}}",date:"{{properties.date}}",comment:"{{properties.comment}}"});return t.appendChild(e),t.appendChild(n),t.innerHTML}getReviewItemTemplate(t){let e=document.createElement("div"),n=document.createElement("b");n.textContent=t.name;let r=document.createElement("span");r.className="modal__text",r.textContent=` ${t.place} ${t.date}`;let s=document.createElement("div");return s.className="modal__text",s.textContent=t.comment,e.appendChild(n),e.appendChild(r),e.appendChild(s),e}getData(){return localStorage.getItem("markers")||this.createStorage(),JSON.parse(localStorage.getItem("markers"))}setData(t){let e=[];localStorage.getItem("markers")&&(e=JSON.parse(localStorage.getItem("markers"))),e.push(t),localStorage.setItem("markers",JSON.stringify(e))}createStorage(){localStorage.setItem("markers","[]")}validateFields(t){let e=!0;return t.forEach((t=>{t.classList.remove("input-error"),this.isValid(t)||(t.classList.add("input-error"),e=!1)})),e}isValid(t){return""!==t.value.trim()}getSelector(t){return document.querySelector(t)}getValue(t){return t.value.trim()}getAddress(t){return new Promise(((e,n)=>{ymaps.geocode(t).then((t=>e(t.geoObjects.get(0).getAddressLine()))).catch((t=>n(t)))}))}filterByCoords(t,e){return t.filter((t=>JSON.stringify(t.coords)===JSON.stringify(e)))}filterCoordsByProperties(t,e){return t.filter((t=>JSON.stringify(t.properties.get("coords"))===JSON.stringify(e)))}}})()})();