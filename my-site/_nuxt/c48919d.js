(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{427:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},428:function(e,t){e.exports=function(e,i){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var o,r,n=[],l=!0,d=!1;try{for(t=t.call(e);!(l=(o=t.next()).done)&&(n.push(o.value),!i||n.length!==i);l=!0);}catch(e){d=!0,r=e}finally{try{l||null==t.return||t.return()}finally{if(d)throw r}}return n}},e.exports.__esModule=!0,e.exports.default=e.exports},429:function(e,t,o){var r=o(430);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?r(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},430:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,o=new Array(t);i<t;i++)o[i]=e[i];return o},e.exports.__esModule=!0,e.exports.default=e.exports},431:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},432:function(e,t,o){"use strict";var r=o(3),n=o(2),l=o(4),d=o(59),c=o(433),h=o(201),m=o(5),f=n.RangeError,v=n.String,_=Math.floor,y=l(h),j=l("".slice),S=l(1..toFixed),w=function(e,t,o){return 0===t?o:t%2==1?w(e,t-1,o*e):w(e*e,t/2,o)},x=function(data,e,t){for(var o=-1,r=t;++o<6;)r+=e*data[o],data[o]=r%1e7,r=_(r/1e7)},C=function(data,e){for(var t=6,o=0;--t>=0;)o+=data[t],data[t]=_(o/e),o=o%e*1e7},k=function(data){for(var e=6,s="";--e>=0;)if(""!==s||0===e||0!==data[e]){var t=v(data[e]);s=""===s?t:s+y("0",7-t.length)+t}return s};r({target:"Number",proto:!0,forced:m((function(){return"0.000"!==S(8e-5,3)||"1"!==S(.9,0)||"1.25"!==S(1.255,2)||"1000000000000000128"!==S(0xde0b6b3a7640080,0)}))||!m((function(){S({})}))},{toFixed:function(e){var t,o,r,n,l=c(this),h=d(e),data=[0,0,0,0,0,0],m="",_="0";if(h<0||h>20)throw f("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return v(l);if(l<0&&(m="-",l=-l),l>1e-21)if(o=(t=function(e){for(var t=0,o=e;o>=4096;)t+=12,o/=4096;for(;o>=2;)t+=1,o/=2;return t}(l*w(2,69,1))-69)<0?l*w(2,-t,1):l/w(2,t,1),o*=4503599627370496,(t=52-t)>0){for(x(data,0,o),r=h;r>=7;)x(data,1e7,0),r-=7;for(x(data,w(10,r,1),0),r=t-1;r>=23;)C(data,1<<23),r-=23;C(data,1<<r),x(data,1,1),C(data,2),_=k(data)}else x(data,0,o),x(data,1<<-t,0),_=k(data)+y("0",h);return _=h>0?m+((n=_.length)<=h?"0."+y("0",h-n)+_:j(_,0,n-h)+"."+j(_,n-h)):m+_}})},433:function(e,t,o){var r=o(4);e.exports=r(1..valueOf)},435:function(e,t,o){var r=o(427),n=o(428),l=o(429),d=o(431);e.exports=function(e,i){return r(e)||n(e,i)||l(e,i)||d()},e.exports.__esModule=!0,e.exports.default=e.exports},436:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},e.exports.__esModule=!0,e.exports.default=e.exports},437:function(e,t){function o(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}e.exports=function(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e},e.exports.__esModule=!0,e.exports.default=e.exports},438:function(e,t,o){var map={"./af":292,"./af.js":292,"./ar":293,"./ar-dz":294,"./ar-dz.js":294,"./ar-kw":295,"./ar-kw.js":295,"./ar-ly":296,"./ar-ly.js":296,"./ar-ma":297,"./ar-ma.js":297,"./ar-sa":298,"./ar-sa.js":298,"./ar-tn":299,"./ar-tn.js":299,"./ar.js":293,"./az":300,"./az.js":300,"./be":301,"./be.js":301,"./bg":302,"./bg.js":302,"./bm":303,"./bm.js":303,"./bn":304,"./bn-bd":305,"./bn-bd.js":305,"./bn.js":304,"./bo":306,"./bo.js":306,"./br":307,"./br.js":307,"./bs":308,"./bs.js":308,"./ca":309,"./ca.js":309,"./cs":310,"./cs.js":310,"./cv":311,"./cv.js":311,"./cy":312,"./cy.js":312,"./da":313,"./da.js":313,"./de":314,"./de-at":315,"./de-at.js":315,"./de-ch":316,"./de-ch.js":316,"./de.js":314,"./dv":317,"./dv.js":317,"./el":318,"./el.js":318,"./en-au":319,"./en-au.js":319,"./en-ca":320,"./en-ca.js":320,"./en-gb":321,"./en-gb.js":321,"./en-ie":322,"./en-ie.js":322,"./en-il":323,"./en-il.js":323,"./en-in":324,"./en-in.js":324,"./en-nz":325,"./en-nz.js":325,"./en-sg":326,"./en-sg.js":326,"./eo":327,"./eo.js":327,"./es":328,"./es-do":329,"./es-do.js":329,"./es-mx":330,"./es-mx.js":330,"./es-us":331,"./es-us.js":331,"./es.js":328,"./et":332,"./et.js":332,"./eu":333,"./eu.js":333,"./fa":334,"./fa.js":334,"./fi":335,"./fi.js":335,"./fil":336,"./fil.js":336,"./fo":337,"./fo.js":337,"./fr":338,"./fr-ca":339,"./fr-ca.js":339,"./fr-ch":340,"./fr-ch.js":340,"./fr.js":338,"./fy":341,"./fy.js":341,"./ga":342,"./ga.js":342,"./gd":343,"./gd.js":343,"./gl":344,"./gl.js":344,"./gom-deva":345,"./gom-deva.js":345,"./gom-latn":346,"./gom-latn.js":346,"./gu":347,"./gu.js":347,"./he":348,"./he.js":348,"./hi":349,"./hi.js":349,"./hr":350,"./hr.js":350,"./hu":351,"./hu.js":351,"./hy-am":352,"./hy-am.js":352,"./id":353,"./id.js":353,"./is":354,"./is.js":354,"./it":355,"./it-ch":356,"./it-ch.js":356,"./it.js":355,"./ja":357,"./ja.js":357,"./jv":358,"./jv.js":358,"./ka":359,"./ka.js":359,"./kk":360,"./kk.js":360,"./km":361,"./km.js":361,"./kn":362,"./kn.js":362,"./ko":363,"./ko.js":363,"./ku":364,"./ku.js":364,"./ky":365,"./ky.js":365,"./lb":366,"./lb.js":366,"./lo":367,"./lo.js":367,"./lt":368,"./lt.js":368,"./lv":369,"./lv.js":369,"./me":370,"./me.js":370,"./mi":371,"./mi.js":371,"./mk":372,"./mk.js":372,"./ml":373,"./ml.js":373,"./mn":374,"./mn.js":374,"./mr":375,"./mr.js":375,"./ms":376,"./ms-my":377,"./ms-my.js":377,"./ms.js":376,"./mt":378,"./mt.js":378,"./my":379,"./my.js":379,"./nb":380,"./nb.js":380,"./ne":381,"./ne.js":381,"./nl":382,"./nl-be":383,"./nl-be.js":383,"./nl.js":382,"./nn":384,"./nn.js":384,"./oc-lnc":385,"./oc-lnc.js":385,"./pa-in":386,"./pa-in.js":386,"./pl":387,"./pl.js":387,"./pt":388,"./pt-br":389,"./pt-br.js":389,"./pt.js":388,"./ro":390,"./ro.js":390,"./ru":391,"./ru.js":391,"./sd":392,"./sd.js":392,"./se":393,"./se.js":393,"./si":394,"./si.js":394,"./sk":395,"./sk.js":395,"./sl":396,"./sl.js":396,"./sq":397,"./sq.js":397,"./sr":398,"./sr-cyrl":399,"./sr-cyrl.js":399,"./sr.js":398,"./ss":400,"./ss.js":400,"./sv":401,"./sv.js":401,"./sw":402,"./sw.js":402,"./ta":403,"./ta.js":403,"./te":404,"./te.js":404,"./tet":405,"./tet.js":405,"./tg":406,"./tg.js":406,"./th":407,"./th.js":407,"./tk":408,"./tk.js":408,"./tl-ph":409,"./tl-ph.js":409,"./tlh":410,"./tlh.js":410,"./tr":411,"./tr.js":411,"./tzl":412,"./tzl.js":412,"./tzm":413,"./tzm-latn":414,"./tzm-latn.js":414,"./tzm.js":413,"./ug-cn":415,"./ug-cn.js":415,"./uk":416,"./uk.js":416,"./ur":417,"./ur.js":417,"./uz":418,"./uz-latn":419,"./uz-latn.js":419,"./uz.js":418,"./vi":420,"./vi.js":420,"./x-pseudo":421,"./x-pseudo.js":421,"./yo":422,"./yo.js":422,"./zh-cn":423,"./zh-cn.js":423,"./zh-hk":424,"./zh-hk.js":424,"./zh-mo":425,"./zh-mo.js":425,"./zh-tw":426,"./zh-tw.js":426};function r(e){var t=n(e);return o(t)}function n(e){if(!o.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}r.keys=function(){return Object.keys(map)},r.resolve=n,e.exports=r,r.id=438},439:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},456:function(e,t,o){"use strict";o.r(t);o(30),o(24),o(25),o(39),o(40);var r,n=o(7),l=o(15),d=(o(49),o(10),o(28),o(85),o(432),o(29),o(58),o(72),o(31),o(37)),c=o(73),h=o.n(c),m=o(434),f=o(291),v=o.n(f);function _(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}var y,j={middleware:"auth",computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(t){Object(l.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(d.b)(["isAuthenticated","loggedInfont"])),data:function(){return{script:null,ps:null,url_server:this.$store.state.url_server,id_user:this.$auth.user.id,parametres:"",messages:[],isShowLoading:!0,isShowNoResult:!1,timeoutObj:"",isTools:!1,timeOutTools:"",tools_message:"",tools_color_text:"#fff",tools_color_bg:"#000",tools_font_size:50,isMic:!1,meter:"",mic:"",recorder:"",playerSound:"",bufferSound:"",mesureVal:0,intervalDisplayMic:"",micFFT:"",isDeviceInitialize:!1,message:"",messageInit:"Votre texte...",id_source:1,isBegin:!1,displayStart:!1,displaySave:!1,displayReset:!1,displayRecord:!1,displayNew:!1,isRecord:!1,isCapture:!1,recordOver:!1,isPlayer:!1,mesureTps:0,id_message:0,resultSound:"",fileSound:"",isNewMessage:!0,id_sound:0,file_media:"",uploadPercentageFile:0,uploadPercentageSave:0,accept_file:".mp3",sounds:[],isShowLoadingSound:!0,isShowNoResultSound:!1,displayActiveSound:"",isPlayP5:!1}},mounted:function(){this.parametres=JSON.parse(localStorage.getItem("parametres")||"[]"),this.loadParametres(),this.initPage(),this.initDisplayErreur(),this.getSounds(),this.script=function(e){var t,o;e.preload=function(o){t=e.loadFont("UniversalSansDisplayTrial491-Regular.otf")},e.setup=function(r){e.createCanvas(e.displayWidth,e.displayHeight).parent("p5Canvas"),"je m'aaappelle ainsi",e.textFont(t),e.textSize(50),o=t.textToPoints("je m'aaappelle ainsi",e.width/2-e.textWidth(),e.height/2,50,e.textToPointsOptions)},e.draw=function(t){console.log("isdraw: 50"),e.background(250),o.forEach((function(element,t){e.line(element.x,element.y,element.x+250*e.micLevel,element.y),e.line(element.x,element.y,element.x-250*e.micLevel,element.y),e.line(element.x,element.y,element.x,element.y+250*e.micLevel),e.line(element.x,element.y,element.x,element.y-250*e.micLevel)}))}},r=o(440)},methods:{testTito:function(){this.isPlayP5?(this.isPlayP5=!1,this.ps=null):(this.isPlayP5=!0,this.ps=new r(this.script)),console.log("ici")},getSounds:function(){var e=this;h.a.get(this.url_server+"/getSounds?id_user="+this.id_user).then((function(t){e.isShowLoadingSound=!1,e.sounds=t.data.liste,0==e.messages.length&&(e.isShowNoResultSound=!0)})).catch((function(e){return displayErreur("Erreur lors du chargement des messages")}))},getMessages:function(){var e=this;h.a.get(this.url_server+"/getMessages?id_user="+this.id_user).then((function(t){e.isShowLoading=!1,e.messages=t.data.liste,0==e.messages.length&&(e.isShowNoResult=!0)})).catch((function(e){return displayErreur("Erreur lors du chargement des messages")}))},addMessage:function(){var e=this;this.uploadPercentageSave=0,isAction("Sauvegarde du message en cours...",!1),this.isNewMessage=!0,0!=this.id_message&&(this.isNewMessage=!1),this.date_creation=v()().format("YYYY-MM-DD HH:mm:ss");var t=this.resultSound,o=new FormData;o.append("soundBlob",t),o.append("id_message",this.id_message),o.append("id_user",this.id_user),o.append("texte",this.message),o.append("duree",this.mesureTps),o.append("date_creation",this.date_creation),o.append("isNew",this.isNewMessage),console.log("this.isNewMessage : "+this.isNewMessage);setTimeout((function(){h.a.post(e.url_server+"/addMessage",o,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){var t=parseInt(Math.round(100*e.loaded/e.total));document.querySelector(".progress-alert").style.width=t+"px",console.log("progress : "+t)}.bind(e)}).then((function(t){isAction("",!1),document.querySelector(".progress-alert").style.width="0px",e.id_message=t.data.id_message,e.isNewMessage?displayErreur("Votre message a été sauvegardé dans la galerie"):hideErreur()})).catch((function(e){isAction("",!1),e.response.data.message,displayErreur(e.response.data.message)}))}),1500)},initPage:function(){this.initEdit(),this.updateFontSize()},initEdit:function(){this.message=this.messageInit;var e=document.querySelector(".editItem"),t=window.getSelection(),o=document.createRange();t.removeAllRanges(),o.selectNodeContents(e),o.collapse(!1),t.addRange(o),e.focus()},clickEdit:function(e){this.message=e.target.innerHTML,this.initDisplayErreur(),this.isBegin||(e.target.innerHTML="",this.message="",this.messageInit="",this.isBegin=!0),this.isBegin&&""!=this.message?(this.displayStart=!0,this.displaySave=!1,this.displayReset=!0,this.displayRecord=!0):""==this.message&&this.reset(!1)},reset:function(e){e&&(this.id_source=1),this.id_message=0,document.querySelector(".editItem").innerHTML="",this.message="",this.displayStart=!1,this.displaySave=!1,this.displayReset=!1,this.displayNew=!1,this.displayRecord=!1,e&&(this.fileSound=""),this.resultSound="",this.isMic&&(clearInterval(this.intervalDisplayMic),this.isMic=!1,this.mic.close(),this.mesureVal=0,this.isMicInitialize=!1,this.isCapture=!1,m.e.stop(),this.mesureTps=0,this.resultSound=""),this.isRecord&&(this.isRecord=!1,document.querySelector(".btRecord").classList.add("animate-onWait"),document.querySelector(".btRecord").innerHTML="record",this.recorder.stop()),this.initEdit()},openTools:function(){this.isTools?this.isTools=!1:this.isTools=!0},initTools:function(){this.updateColorPicker()},updateColorText:function(){clearTimeout(this.timeOutTools),this.timeOutTools=setTimeout(function(){this.updateColorPicker(),this.$parent.$emit("update:color_text_send",this.tools_color_text)}.bind(this),100)},updateColorBg:function(){clearTimeout(this.timeOutTools),this.timeOutTools=setTimeout(function(){this.updateColorPicker(),this.$parent.$emit("update:color_bg_send",this.tools_color_bg)}.bind(this),100)},updateColorPicker:function(){document.querySelector(".zoneColorText .color-block .value").innerHTML=this.tools_color_text,document.querySelector(".zoneColorBg .color-block .value").innerHTML=this.tools_color_bg},loadParametres:function(){var e=this.parametres;this.tools_color_text=e.color_text,this.tools_color_bg=e.color_bg,this.initTools()},updateFontSize:function(){document.querySelector(".col-content-list").style.fontSize=this.tools_font_size+"px",document.querySelector(".col-content-list").style.lineHeight=parseInt(this.tools_font_size)+3+"px"},initDevice:function(){this.meter=new m.a({}),this.mic=new m.g,this.recorder=new m.c,this.playerSound=(new m.b).toDestination(),document.querySelector(".mesure").supported=m.g.supported},initCapture:function(){this.isMic&&(this.mic.close(),this.isMic=!1,this.mic.disconnect(this.meter),this.mic.disconnect(this.recorder),m.e.stop()),this.isPlayer&&(this.playerSound.stop(),this.playerSound.disconnect(this.meter),this.playerSound.disconnect(this.recorder),this.isPlayer=!1,m.e.stop(),this.fileSound=""),this.mesureVal=0,this.mesureTps=0,this.isCapture=!1,clearInterval(this.intervalDisplayMic)},startCapture:function(){var e=this;if(m.h.resume(),this.isDeviceInitialize||(this.initDevice(),this.isDeviceInitialize=!0),this.initCapture(),this.resultSound="",this.testTito(),1==this.id_source)this.mic.open(),this.isMic=!0,this.isCapture=!0,this.fileSound="",this.mic.connect(this.meter),this.mic.connect(this.recorder),m.e.start(),this.intervalDisplayMic=setInterval((function(){return e.displayVal(e.meter.getValue())}),100),this.recording();else if(console.log("file : "+this.fileSound),""!=this.fileSound){document.querySelector(".btRecord").innerHTML="loading...";var t=new m.d({onload:function(){console.log("load sound : "+e.meter),e.playerSound.connect(e.meter),e.playerSound.connect(e.recorder),console.log("load sound : "+e.meter),e.playerSound.buffer=t,e.playerSound.start(),e.isPlayer=!0,e.isCapture=!0,e.intervalDisplayMic=setInterval((function(){return e.displayVal(e.meter.getValue())}),100),m.e.start(),e.recording()},onerror:function(){console.log("no sound")},reverse:!1,url:this.fileSound})}else displayErreur("Vous devez choisir un son MP3")},displayVal:function(e){this.index++,e=e;e=parseInt(e)+100,this.mesureVal=e,console.log("val = "+e),this.mesureTps=this.convertSoundDuration(m.e.getSecondsAtTime()),this.ps.micLevel=e/1e3},clamp:function(e,t,o){return Math.min(o,Math.max(t,e))},convertSoundDuration:function(e){return(e/60).toFixed(2).toString().replace(".",":")},logout:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$auth.logout();case 2:e.$router.push("/login");case 3:case"end":return t.stop()}}),t)})))()},beforeRecording:function(){this.initDisplayErreur(),this.isRecord?this.recording():this.startCapture()},recording:(y=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.isRecord){e.next=11;break}return this.isRecord=!1,document.querySelector(".btRecord").classList.add("animate-onWait"),document.querySelector(".btRecord").innerHTML="record",e.next=6,this.recorder.stop();case 6:this.resultSound=e.sent,this.displaySave=!0,this.initCapture(),e.next=17;break;case 11:this.resultSound="",this.recorder.start(),this.displaySave=!1,this.isRecord=!0,document.querySelector(".btRecord").classList.remove("animate-onWait"),document.querySelector(".btRecord").innerHTML="stop recording";case 17:case"end":return e.stop()}}),e,this)}))),function(){return y.apply(this,arguments)}),selectSource:function(){this.displayActiveSound="",2==this.id_source&&this.displayAddSound(0)},verifDisplayAddSound:function(){""==this.fileSound&&(this.id_source=1),this.displayAddSound(0)},displayAddSound:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=document.querySelectorAll("#defaultModalFile")[0];t.classList.contains("hidden")?(t.classList.remove("hidden"),t.focus(),this.id_sound=e,0!=this.id_sound&&this.getFile()):(this.file_media="",t.classList.add("hidden"),this.initForm())},handleFileUploadSon:function(e){this.hideErreur();var element=e.currentTarget;this.fileId=element.id,this.file_media=element.files[0];var t=element.files[0].name;""!=this.file_media&&this.submitSon(t)},submitSon:function(e){var t=this;this.uploadPercentageFile=0;var o=new FormData;o.append("file",this.file_media),document.querySelectorAll(".progress-media")[0].classList.remove("hidden"),document.querySelectorAll(".uploadZone-file")[0].classList.add("hidden"),document.getElementById("file_media").disabled=!0,h.a.post(this.url_server+"/uploadFile",o,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){var t=parseInt(Math.round(100*e.loaded/e.total));document.querySelectorAll(".progress-title-media")[0].innerHTML=t+"%",this.uploadPercentageFile=t}.bind(this)}).then((function(o){o.data.isOptimize;document.querySelector("#file_media").value="",t.fileSound=o.data.optimizeFile[0],console.log("titre : "+e),t.submitSonForm(e)})).catch((function(e){void 0===e.response.data.message?displayErreur(e):displayErreur(e.response.data.message),document.querySelectorAll(".progress-media")[0].classList.add("hidden"),document.querySelectorAll(".uploadZone-file")[0].classList.remove("hidden"),document.getElementById("file_media").disabled=!1}))},submitSonForm:function(e){var t=this;if(""!=this.fileSound){this.isNew_file=!1,0==this.id_sound&&(this.isNew_file=!0);var o=v()().format("YYYY-MM-DD HH:mm:ss"),data={id_sound:0,id_user:this.id_user,fichier:this.fileSound,titre:e,date_creation:o,isNew:this.isNew_file};h.a.post(this.url_server+"/addSound",data).then((function(e){t.id_sound=e.data.id_sound,t.fileSound="/upload/"+t.fileSound,t.displayActiveSound=t.fileSound,t.displayAddSound(0)})).catch((function(e){enabledActionsModal(),displayErreur("Erreur lors de l'ajout d'un son : "+e)}))}else displayErreur("Erreur lors de l'ajout d'un son, son manquant : "),this.displayAddSound(0)},initForm:function(e){clearRequiredModal(),enabledActionsModal(),hideErreur()},hideErreur:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){hideErreur()})),initDisplayErreur:function(){hideErreur()},addSoundToPlay:function(e){this.fileSound=e,this.displayActiveSound=this.fileSound,this.verifDisplayAddSound()}}},S=j,w=o(33),component=Object(w.a)(S,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container"},[o("div",{staticClass:"content"},[o("div",{staticClass:"col-left"},[o("div",{staticClass:"logo"},[o("nuxt-link",{attrs:{to:"/"}},[o("svg",{attrs:{id:"Calque_1","data-name":"Calque 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 776.86 861.5"}},[o("path",{attrs:{d:"M291.29,701.18c0,92.18,68.41,131,165.81,131,112.47,0,162.9-51,162.9-163.49V558.56H444.92C360.86,558.56,291.29,614.22,291.29,701.18ZM151.57,725.53c0-113,68.41-197.69,176.24-208.13V490.15c-84.06-10.43-146.67-87-146.67-179.14,0-133.34,130.44-215.66,280-215.66C622.9,95.35,740,173,747,332.46H611.89c-7-80-60.87-117.1-149-117.1-83.48,0-141.45,38.84-141.45,114.78s55.65,117.11,139.14,117.11H928.43V558.56H755.08c0,266.11-3.47,265,5.8,273.64,8.12,7.54,11.6,5.22,167.55,5.22V945.25c-207.55,0-224.94,5.8-263.21-34.2-22.61-23.77-21.45-74.79-21.45-74.79H622.9c-34.78,86.38-107.83,120.59-203.49,120.59C265.2,956.85,151.57,877.42,151.57,725.53Z",transform:"translate(-151.57 -95.35)"}})])])],1),e._v(" "),o("div",{staticClass:"tools"},[o("div",{staticClass:"tools-content",class:{open:e.isTools}},[o("div",[o("label",[e._v("Message")]),e._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.tools_message,expression:"tools_message"}],ref:"titot",attrs:{placeholder:"...",name:"tools_message",id:"tools_message"},domProps:{value:e.tools_message},on:{input:function(t){t.target.composing||(e.tools_message=t.target.value)}}})]),e._v(" "),o("div",[o("label",[e._v("Couleur")]),e._v(" "),o("div",{staticClass:"zoneColorText"},[o("color-picker",{on:{change:e.updateColorText},model:{value:e.tools_color_text,callback:function(t){e.tools_color_text=t},expression:"tools_color_text"}})],1)]),e._v(" "),o("div",[o("label",[e._v("Fond")]),e._v(" "),o("div",{staticClass:"zoneColorBg"},[o("color-picker",{on:{change:e.updateColorBg},model:{value:e.tools_color_bg,callback:function(t){e.tools_color_bg=t},expression:"tools_color_bg"}})],1)]),e._v(" "),o("div",[o("label",[e._v("Taille : "+e._s(e.tools_font_size))]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.tools_font_size,expression:"tools_font_size"}],staticClass:"slider",attrs:{type:"range",id:"tools_font_size",min:"10",max:"200"},domProps:{value:e.tools_font_size},on:{input:function(t){return e.updateFontSize()},__r:function(t){e.tools_font_size=t.target.value}}})]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.isAuthenticated,expression:"isAuthenticated"}]},[o("label",{staticClass:"cursor-pointer",on:{click:function(t){return e.logout()}}},[e._v("log-out")])])]),e._v(" "),o("div",{staticClass:"tools-nav",on:{click:e.openTools}},[e._v("Paramètres")])])]),e._v(" "),o("div",{staticClass:"col-content",class:{marge:e.isTools}},[o("div",{staticClass:"mesure"},[o("div",[o("div",[o("div",{staticClass:"mesure-val"},[e._v(e._s(e.mesureVal))]),o("div",{staticClass:"indice",on:{click:e.testTito}},[e._v("DBA")])]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.isRecord,expression:"isRecord"}],staticClass:"mesure-temps"},[e._v("Durée : "+e._s(e.mesureTps))])]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.displayRecord,expression:"displayRecord"}]},[o("div",[o("button",{staticClass:"btRecord",class:{"animate-onWait":!e.recordOver},on:{click:e.beforeRecording,mouseover:function(t){e.recordOver=!0},mouseleave:function(t){e.recordOver=!1}}},[e._v("record")]),e._v(" "),o("div",{staticClass:"pt-3 text-sm"},[e._v(e._s(e.displayActiveSound))])])])]),e._v(" "),o("div",{attrs:{id:"content"}}),e._v(" "),o("div",{staticClass:"col-content-list"},[o("div",{staticClass:"item",staticStyle:{display:"block"}},[o("div",{ref:"editItem",staticClass:"editItem",attrs:{contenteditable:""},on:{click:e.clickEdit,input:e.clickEdit}},[e._v(e._s(e.messageInit))]),e._v(" "),o("div",{staticClass:"canvas-area",attrs:{id:"p5Canvas"}})])])]),e._v(" "),o("div",{staticClass:"col-right"},[o("div",[o("select",{directives:[{name:"model",rawName:"v-model",value:e.id_source,expression:"id_source"}],attrs:{name:"id_source",id:"id_source"},on:{change:[function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.id_source=t.target.multiple?o:o[0]},e.selectSource]}},[o("option",{attrs:{value:"1"}},[e._v(" Micro")]),e._v(" "),o("option",{attrs:{value:"2"}},[e._v(" MP3")])])]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.displaySave,expression:"displaySave"}],staticClass:"cursor-pointer",on:{click:function(t){return e.addMessage()}}},[e._v("save")]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.displayReset,expression:"displayReset"}],staticClass:"cursor-pointer",on:{click:function(t){return e.reset(!0)}}},[e._v("reset")]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.displayNew,expression:"displayNew"}],staticClass:"cursor-pointer",on:{click:function(t){return e.newMessage()}}},[e._v("new")])])]),e._v(" "),o("div",{staticClass:"modalZone hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0",attrs:{id:"defaultModalFile",tabindex:"1"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.displayAddSound(0)}}},[o("div",{staticClass:"relative px-6 w-full max-w-2xl h-full md:h-auto"},[o("div",{staticClass:"relative bg-mainBg p-6 border"},[o("div",{staticClass:"flex justify-between items-start border-b "},[o("h1",[e._v("Sons")]),e._v(" "),o("div",{staticClass:"bg-transparent ml-auto inline-flex items-center highlight",attrs:{"data-modal-toggle":"defaultModalFile"}},[o("svg",{staticClass:"big cursor-pointer",attrs:{fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},on:{click:function(t){return e.verifDisplayAddSound()}}},[o("path",{attrs:{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"}})])])]),e._v(" "),o("div",[o("div",{staticClass:"form-container w-full border-0 p-0"},[o("form",{attrs:{method:"post",autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.submitFileForm.apply(null,arguments)}}},[o("div",{staticClass:"form-bloc mt-9"},[o("div",{staticClass:"col w-full"},[o("div",{staticClass:"col-content"},[o("div",[o("label",{staticClass:"uploadZone-file bt-upload required_field",on:{click:e.initForm}},[o("span",{staticClass:"leading-normal"},[e._v("Ajouter un mp3")]),e._v(" "),o("input",{ref:"file_media",staticClass:"hidden",attrs:{type:"file",id:"file_media",accept:e.accept_file},on:{change:function(t){return e.handleFileUploadSon(t)}}})]),e._v(" "),o("div",{staticClass:"progress progress-media hidden"},[o("div",{staticClass:"progress-title-media"},[e._v(e._s(e.uploadPercentageFile)+"%")]),e._v(" "),o("div",{staticClass:"progress-bar-media",style:{width:e.uploadPercentageFile+"%"}})])])])])]),e._v(" "),o("div",{staticClass:"form-bloc mt-9 flex-col"},[e.sounds.length?e._e():o("div",[o("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowLoadingSound,expression:"isShowLoadingSound"}]},[e._v("Chargement des sons...")]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowNoResultSound,expression:"isShowNoResultSound"}]},[e._v("aucun son enregistré")])]),e._v(" "),e._l(e.sounds,(function(t,r){return o("div",{staticClass:"cursor-pointer block overflow-hidden w-full mb-3 item",on:{click:function(o){return e.addSoundToPlay("/upload/"+t.fichier)}}},[e._v("\n\t\t\t\t\t\t\t\t  \t\t"+e._s(t.titre)+"\n\t\t\t\t\t\t\t  \t\t")])}))],2),e._v(" "),o("div",{staticClass:"form-action justify-center",staticStyle:{"justify-content":"center"}},[o("div",[o("button",{attrs:{type:"button"},on:{click:function(t){return e.verifDisplayAddSound()}}},[e._v("Annuler")])])])])])])])])])])}),[],!1,null,"29136b8c",null);t.default=component.exports}}]);