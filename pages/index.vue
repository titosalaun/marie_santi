<template>
  <div class="container">
	  <div class="content">
		  
		  <div class="col-left">
		  	<div class="logo">
			  	<nuxt-link to="/">
			  	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 776.86 861.5"><path d="M291.29,701.18c0,92.18,68.41,131,165.81,131,112.47,0,162.9-51,162.9-163.49V558.56H444.92C360.86,558.56,291.29,614.22,291.29,701.18ZM151.57,725.53c0-113,68.41-197.69,176.24-208.13V490.15c-84.06-10.43-146.67-87-146.67-179.14,0-133.34,130.44-215.66,280-215.66C622.9,95.35,740,173,747,332.46H611.89c-7-80-60.87-117.1-149-117.1-83.48,0-141.45,38.84-141.45,114.78s55.65,117.11,139.14,117.11H928.43V558.56H755.08c0,266.11-3.47,265,5.8,273.64,8.12,7.54,11.6,5.22,167.55,5.22V945.25c-207.55,0-224.94,5.8-263.21-34.2-22.61-23.77-21.45-74.79-21.45-74.79H622.9c-34.78,86.38-107.83,120.59-203.49,120.59C265.2,956.85,151.57,877.42,151.57,725.53Z" transform="translate(-151.57 -95.35)"/></svg>
			  	</nuxt-link></div>
		  	<div class="tools">
			  	<div class="tools-content"  v-bind:class="{ open: isTools }">
				  	<div>
					  	<label>Message</label>
					  	<textarea  ref="titot" placeholder="..." v-model="tools_message" name="tools_message" id="tools_message"></textarea>
				  	</div>
				  	<div>
					  	<label>Couleur</label>
					  	<div class="zoneColorText"><color-picker v-model="tools_color_text" @change="updateColorText"></color-picker></div>
				  	</div>
				  	<div>
					  	<label>Fond</label>
					  	<div class="zoneColorBg"><color-picker v-model="tools_color_bg" @change="updateColorBg"></color-picker></div>
				  	</div>
				  	<div>
					  	<label>Taille : {{tools_font_size}}</label>
					  	<input class="slider" type="range" @input="updateFontSize()" id="tools_font_size" min="10" max="200" v-model="tools_font_size" />
				  	</div>
				  	
				  	<div v-show="isAuthenticated">
					  	<label class="cursor-pointer" @click="logout();">log-out</label>
				  	</div>
				  	
			  	</div>
			  	<div class="tools-nav" @click="openTools">Paramètres</div>
		  	</div>
		  </div>
		  
		  <div class="col-content" v-bind:class="{ marge: isTools }">
		  	<div class="mesure">
			  	<div>
				  	<div><div class="mesure-val">{{mesureVal}}</div><div @click="testTito" class="indice">DBA</div></div>
				  	<div v-show="isRecord" class="mesure-temps">Durée : {{mesureTps}}</div>
			  	</div>
			  	<div v-show="displayRecord">
				  	<div><button class="btRecord" @click="beforeRecording"  @mouseover="recordOver = true" @mouseleave="recordOver = false" v-bind:class="{ 'animate-onWait': !recordOver }">record</button>
					  					  	<div class="pt-3 text-sm">{{displayActiveSound}}</div>

				  	</div>
				  </div>
		    </div>
		  	<div id="content"></div>
		  	<div class="col-content-list">
			  		<div class="item" style="display:block">
				  		<div @click="clickEdit"  @input="clickEdit" ref="editItem" class="editItem" contenteditable>{{messageInit}}</div>
				  		<div id="p5Canvas" class="canvas-area"></div>
			  		</div>
		  	</div>
		  			  	
		  </div>
		  
		   <div class="col-right">
			<div>
				<select v-model="id_source" name="id_source" id="id_source" @change="selectSource">
					<option value="1"> Micro</option>
					<option value="2"> MP3</option>
				</select>
			</div>
		  	<!--<div v-show="displayStart" class="startMic cursor-pointer" @click="startCapture()">start</div>-->
		  	<div v-show="displaySave" class="cursor-pointer" @click="addMessage()">save</div>
		  	<div v-show="displayReset" class="cursor-pointer" @click="reset(true)">reset</div>
		  	<div v-show="displayNew" class="cursor-pointer" @click="newMessage()">new</div>
		  </div>

	  </div>
	  
	  <!-- Main modal -->
		<div id="defaultModalFile" tabindex="1" @keydown.esc="displayAddSound(0)" class="modalZone hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0">
		    <div class="relative px-6 w-full max-w-2xl h-full md:h-auto">
		        <!-- Modal content -->
		        <div class="relative bg-mainBg p-6 border">
		            <!-- Modal header -->
		            <div class="flex justify-between items-start border-b ">
			             <h1>Sons</h1>
		                <div class="bg-transparent ml-auto inline-flex items-center highlight" data-modal-toggle="defaultModalFile">
		                    <svg @click="verifDisplayAddSound()" class="big cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
		                </div>
		            </div>
		            <!-- Modal body -->
		            <div>
			            <div class="form-container w-full border-0 p-0">
							<form method="post" autocomplete="off" @submit.prevent="submitFileForm">
								
								
				                
					            <div class="form-bloc mt-9">
					                <div class="col w-full">
						                <div class="col-content">
							                <div>
											   <label @click="initForm" class="uploadZone-file bt-upload required_field">
											        <span class="leading-normal">Ajouter un mp3</span>
													<input type="file" id="file_media" ref="file_media" v-on:change="handleFileUploadSon($event)" class="hidden"  :accept="accept_file" />
											    </label>
											    
											    
											    <div class="progress progress-media hidden">
													<div class="progress-title-media">{{ uploadPercentageFile }}%</div>
													<div class="progress-bar-media" :style="{ width: uploadPercentageFile + '%' }"></div>
												</div>
											</div>
						                </div>
					                </div>
					            </div>
					            
					            
					             <div class="form-bloc mt-9 flex-col">
						            <div v-if="!sounds.length">
										<div v-show='isShowLoadingSound'>Chargement des sons...</div>
									  	<div v-show='isShowNoResultSound'>aucun son enregistré</div>
								  	</div>
									  	
							  		<div @click="addSoundToPlay('/upload/' + sound.fichier)" class="cursor-pointer block overflow-hidden w-full mb-3 item" v-for='(sound, indexSound) in sounds'>
								  		{{sound.titre}}
							  		</div>
						        </div>

				                 <div class="form-action justify-center" style="justify-content: center">
					                <div><button @click="verifDisplayAddSound()" type="button">Annuler</button></div>
					                <!--<div><button type="submit">Enregistrer</button></div>-->
				                </div>
	                
				            </form>
				        </div>
		            </div>
		        </div>
		    </div>
		</div>
		
		
		
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import * as Tone from 'tone';
import moment from 'moment';
var P5;
var playerSound;
export default {
	middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInfont']),
  }
  ,
	data() {
	    return {
		    script: null,
      ps: null,
		    url_server:this.$store.state.url_server,
		    id_user: this.$auth.user.id,
		    parametres:'',
		    messages : [],
		    isShowLoading:true,
		    isShowNoResult:false,
		    timeoutObj:'',
			isTools:false,
			timeOutTools:'',
			tools_message:'',
			tools_color_text:'#fff',
			tools_color_bg:'#000',
			tools_font_size:50,
			isMic:false,
			meter:'',
			mic:'',
			recorder:'',
			playerSound:'',
			bufferSound:'',
			mesureVal:0.0,
			intervalDisplayMic:'',
			micFFT:'',
			isDeviceInitialize:false,
			message:'',
			messageInit:'Votre texte...',
			id_source:1,
			isBegin:false,
			displayStart:false,
			displaySave:false,
			displayReset:false,
			displayRecord:false,
			displayNew:false,
			isRecord:false,
			isCapture:false,
			recordOver:false,
			isPlayer:false,
			mesureTps:0,
			id_message:0,
			resultSound:'',
			fileSound:'',
			isNewMessage:true,
			id_sound:0,
			file_media:'',
			uploadPercentageFile:0,
			uploadPercentageSave:0,
			accept_file:'.mp3',
			sounds : [],
			isShowLoadingSound:true,
			isShowNoResultSound:false,
			displayActiveSound:'',
			isPlayP5:false,
			
	    }
	  }
  ,
	mounted() {   

	 this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	 
	 this.loadParametres();
	 this.initPage();
	 this.initDisplayErreur();
	 this.getSounds();
	 
	 this.script = function (p5) {    
	  var speed = 2;    
	  var posX = 0;
	  let font;
	  let points;
	  let bounds;
	  var para = 200;
	  let string;
	  let stringArray;
	  let micLevel = 50
	  let fontSize = 50;
	  let titoP5 = 10;
	  let textToPointsOptions = {
		  sampleFactor : 0.35,
		
		  simplifyThreshold:0
		}
	  // NOTE: Set up is here  
	  p5.preload = _ => {      
	   font = p5.loadFont('UniversalSansDisplayTrial491-Regular.otf');    
	  }   
	  p5.setup = _ => {      
	   var canvas = p5.createCanvas(p5.displayWidth, p5.displayHeight);   
	   canvas.parent("p5Canvas");  
	   string = "je m'aaappelle ainsi";
	   p5.textFont(font);
	   p5.textSize(50); 
	   
	   stringArray = font.textToPoints(string,p5.width/2 - p5.textWidth(), p5.height/2, fontSize, p5.textToPointsOptions)

  
	  }     
	  // NOTE: Draw is here
	  p5.draw = _ => {     
		  console.log("isdraw: " + micLevel)
		  //if (p5.isPlayP5) {
			  p5.background(250);
			  stringArray.forEach(
			    (element, indexPosition) =>{
			
			      p5.line(element.x, element.y, element.x+p5.micLevel*250, element.y)
			      p5.line(element.x, element.y, element.x-p5.micLevel*250, element.y)
			      p5.line(element.x, element.y, element.x, element.y+p5.micLevel*250)
			      p5.line(element.x, element.y, element.x, element.y-p5.micLevel*250)
			
			
			
			    }
			  )

		//}
	   
	  }  
	 }   
	 // NOTE: Use p5 as an instance mode
	 //const P5 = require('p5');
	 //this.tito = new P5(script)
	 
	 P5 = require('p5')
    
    
    //this.ps.isPlayP5 = false;
    

	},
	methods: {
		testTito: function()
		{
			if (this.isPlayP5) {
				this.isPlayP5 = false;
				this.ps = null;
			}
			else {
				this.isPlayP5 = true;
				this.ps = new P5(this.script)
			}
			console.log("ici")
			//this.ps.isPlayP5 = true;
		}
		,
		 getSounds: function()
		 {
	       axios.get(this.url_server + "/getSounds?id_user=" + this.id_user)
	       .then(response => {
		       this.isShowLoadingSound = false;
		       this.sounds = response.data.liste;
		       if (this.messages.length == 0) this.isShowNoResultSound = true;
		   })
	       .catch(error => displayErreur('Erreur lors du chargement des messages'))
	    }
	    ,
		 getMessages: function()
		 {
	       axios.get(this.url_server + "/getMessages?id_user=" + this.id_user)
	       .then(response => {
		       this.isShowLoading = false;
		       this.messages = response.data.liste;
		       if (this.messages.length == 0) this.isShowNoResult = true;
		   })
	       .catch(error => displayErreur('Erreur lors du chargement des messages'))
	    },
	    addMessage: function()
		 {
			 	this.uploadPercentageSave = 0;
				isAction('Sauvegarde du message en cours...',false);

				this.isNewMessage = true;
			 	if (this.id_message != 0) this.isNewMessage = false;
			 	this.date_creation = moment().format('YYYY-MM-DD HH:mm:ss');//moment(this.date_interview).format('YYYY-MM-DD');
			 	
				var base64 = this.resultSound;

				let formData = new FormData();
				formData.append('soundBlob', base64) ;
				formData.append('id_message', this.id_message) ;
				formData.append('id_user', this.id_user) ;
				formData.append('texte', this.message) ;
				formData.append('duree', this.mesureTps) ;
				formData.append('date_creation', this.date_creation) ;
				formData.append('isNew', this.isNewMessage) ;
					console.log("this.isNewMessage : " + this.isNewMessage)
				const timeoutObj = setTimeout(() => {
					axios.post(this.url_server + '/addMessage',
					    formData,
					    {
					      headers: {
					          'Content-Type': 'multipart/form-data'
					      },
					      onUploadProgress: function( progressEvent ) {
						      
						      var val = parseInt( Math.round((progressEvent.loaded*100) / progressEvent.total ));
						      document.querySelector('.progress-alert').style.width = val + "px";
						      console.log("progress : " + val)
					      }.bind(this)
					    }
					  )
					  .then(response => {
					  		isAction('',false);
					  	   document.querySelector('.progress-alert').style.width = "0px";	
					       this.id_message = response.data.id_message;
					       if (this.isNewMessage) displayErreur('Votre message a été sauvegardé dans la galerie');
					       else hideErreur();
				      })
				      .catch(err => {
					      isAction('',false);
					      if (typeof err.response.data.message === 'undefined') displayErreur(err.response.data.message)
					      else displayErreur(err.response.data.message)
	
				      })
				}, 1500);
					
					/*const timeoutObj = setTimeout(() => {
						
						let data = { 
							id_message: _parent.id_message,
							id_user: _parent.id_user,
							texte: _parent.message,
							resultSound: base64,
							duree: _parent.mesureTps,
							date_creation: _parent.date_creation,
					        isNew: _parent.isNewMessage,
					    }; 
					 	
				       axios.post(_parent.url_server + "/addMessage", data)
				       .then(response => {
					       isAction('',false);
					       _parent.id_message = response.data.id_message;
					       if (_parent.isNewMessage) displayErreur('Votre message a été sauvegardé dans la galerie');
					       else hideErreur();
					   })
					   .catch(error => {
						   isAction('',false);
						   displayErreur('Erreur lors de la sauvegarde du message');
				      })
				    }, 1500);*/
				    
				    
				//});
	    }
		,
	    initPage () {
		   this.initEdit();
		   this.updateFontSize();
	    }
	    ,
	    initEdit() {
		    this.message = this.messageInit;
		    const el = document.querySelector('.editItem');  
			const selection = window.getSelection();  
			const range = document.createRange();  
			selection.removeAllRanges();  
			range.selectNodeContents(el);  
			range.collapse(false);  
			selection.addRange(range);  
			el.focus();
		}
		,
		clickEdit: function(e){
		    this.message = e.target.innerHTML;
		    this.initDisplayErreur();
		    if (!this.isBegin) {
			    e.target.innerHTML = '';
			    this.message = '';
			    this.messageInit = '';
			    this.isBegin = true;
			}
						
			if ((this.isBegin) && (this.message != '')) {
				this.displayStart = true;
				this.displaySave = false;
				this.displayReset = true;
				this.displayRecord = true;
			}
			else {
				if (this.message == '') {
					this.reset(false);
				}
			}
		}
		,
	    reset(isSource) {
		    if (isSource) this.id_source = 1;
		    this.id_message = 0;
		    document.querySelector('.editItem').innerHTML = '';
		    this.message = '';
		    this.displayStart = false;
		    this.displaySave = false;
			this.displayReset = false;
			this.displayNew = false;
			this.displayRecord = false;
			
			if (isSource) this.fileSound = '';
			this.resultSound = '';
			
			if (this.isMic) {
				clearInterval(this.intervalDisplayMic);
				this.isMic = false;
				this.mic.close();
			    this.mesureVal = 0.0;
			    this.isMicInitialize = false;
			    this.isCapture = false;
			    Tone.Transport.stop();
			    this.mesureTps = 0;
			    this.resultSound ='';
			}
			
			if (this.isRecord) {
			    this.isRecord = false;
			    document.querySelector('.btRecord').classList.add("animate-onWait");
			    document.querySelector('.btRecord').innerHTML = 'record';
			    this.recorder.stop();
			}
			
			this.initEdit();
		}
	    ,
		openTools (){
		    if (this.isTools) {
			    this.isTools = false;
		    }
		    else {
			    this.isTools = true;
		    }
		}
		,
		initTools (){
			//this.updateCss();
			
			this.updateColorPicker();
		    
		}	    
		,
	    updateColorText: function() {
		    clearTimeout(this.timeOutTools);
		    this.timeOutTools = setTimeout(function () {  
			    this.updateColorPicker();
			    this.$parent.$emit('update:color_text_send', this.tools_color_text);
		    }.bind(this), 100)
	    }
	    ,
	    updateColorBg: function() {
		    clearTimeout(this.timeOutTools);
		    this.timeOutTools = setTimeout(function () {  
			    this.updateColorPicker();
			    this.$parent.$emit('update:color_bg_send', this.tools_color_bg);
		    }.bind(this), 100)
	    }
	    ,
	    updateColorPicker: function() {
		    document.querySelector('.zoneColorText .color-block .value').innerHTML = this.tools_color_text;
		    document.querySelector('.zoneColorBg .color-block .value').innerHTML = this.tools_color_bg;
	    }
	    ,
	    loadParametres: function() {
		    var para = this.parametres;
		    this.tools_color_text = para.color_text;
		    this.tools_color_bg = para.color_bg;
		    		    
		    this.initTools();

	    }
	    ,
	    updateFontSize: function() {
		    document.querySelector('.col-content-list').style.fontSize = this.tools_font_size + "px";
		    document.querySelector('.col-content-list').style.lineHeight = (parseInt(this.tools_font_size) + 3) + "px";

	    
	    }
	    ,
	    initDevice: function() {
		    this.meter = new Tone.Meter({});
			this.mic = new Tone.UserMedia();
			this.recorder = new Tone.Recorder();
			this.playerSound = new Tone.Player().toDestination();
			
			
			
			

			document.querySelector('.mesure').supported = Tone.UserMedia.supported;
			
			//this.mic.open();


			/*this.micFFT = new Tone.FFT({
				tone: this.micFFT,
				parent: document.querySelector("#content")
			});
			this.mic.connect(this.micFFT);*/

	    }
	    ,
	    initCapture: function() {
		    if (this.isMic) {
				this.mic.close();
				this.isMic = false;
				this.mic.disconnect(this.meter);
				this.mic.disconnect(this.recorder);
				Tone.Transport.stop();
			}
			
			if (this.isPlayer) {
				this.playerSound.stop();
				this.playerSound.disconnect(this.meter);
				this.playerSound.disconnect(this.recorder);
				this.isPlayer = false;
				Tone.Transport.stop();
				this.fileSound = '';
			}
			
			this.mesureVal = 0.0;
			this.mesureTps = 0;
			this.isCapture = false;
			clearInterval(this.intervalDisplayMic);
		}
		,
	    startCapture: function() {
		    Tone.context.resume()
		    
		    //this.mic.connect(this.meter);
			//this.mic.connect(this.recorder);
			
			if (!this.isDeviceInitialize) {
				this.initDevice();
				this.isDeviceInitialize = true;
			}
			
			this.initCapture();
			
			this.resultSound = '';
			
		    this.testTito();
		    
		    if (this.id_source == 1) {
			    this.mic.open();
			    this.isMic = true;
				this.isCapture = true;
				this.fileSound = '';
				
				this.mic.connect(this.meter);
				this.mic.connect(this.recorder);
					
				//important
				Tone.Transport.start();
				this.intervalDisplayMic = setInterval(() => this.displayVal(this.meter.getValue()), 100);
				this.recording();
		    }
		    else {
			    //this.fileSound = '/upload/file-1653998449916.mp3';
			    console.log("file : " + this.fileSound);
			    if (this.fileSound != '') {
				    document.querySelector('.btRecord').innerHTML = 'loading...';
				    const bufferSound = new Tone.ToneAudioBuffer({
						onload: () => {
							console.log("load sound : " + this.meter)
							this.playerSound.connect(this.meter);
							this.playerSound.connect(this.recorder);
							console.log("load sound : " + this.meter)
							this.playerSound.buffer = bufferSound;
							
							this.playerSound.start();
							this.isPlayer = true;
							this.isCapture = true;
							
							
							
							this.intervalDisplayMic = setInterval(() => this.displayVal(this.meter.getValue()), 100);
						
						//important
						Tone.Transport.start();
						
						this.recording();
						},
						onerror: () => {
							console.log("no sound")
						},
						reverse: false,
						url: this.fileSound,
					});
				}
				else {
					displayErreur("Vous devez choisir un son MP3");
				}
		    }

				
		}
	    ,
	    displayVal: function(val) {
		    this.index++;
		    
		    //const dBFS = this.meter.getLevel();
			val = val;
			
			const lowerBound = 0;
			const upperBound = 100;
			
			val = parseInt(val) + 100;

		    this.mesureVal =  val;
		    console.log("val = " + val)
		    
		    this.mesureTps = this.convertSoundDuration(Tone.Transport.getSecondsAtTime());
		    
		    this.ps.micLevel = val / 1000;
		    
			//effet
		    //this.tools_font_size = (this.mesureVal * 50) / 90;
		    //this.updateFontSize();
		}
		,
	    clamp: function(value, min, max) {
		   return Math.min(max, Math.max(min, value));
		}
		,
		convertSoundDuration(sec)
		{
			var val = (sec / 60).toFixed(2);
			return val.toString().replace(".",":")
		}
		,
		async logout() {
	      await this.$auth.logout();
	      this.$router.push('/login')
	    }
	    ,
	    beforeRecording: function()
	    {
		    this.initDisplayErreur();
		    if (this.isRecord) this.recording()
		    else this.startCapture();
	    }
	    ,
	    recording:  async function() {

		    if (this.isRecord) {
			    this.isRecord = false;
			    document.querySelector('.btRecord').classList.add("animate-onWait");
			    document.querySelector('.btRecord').innerHTML = 'record';

			    this.resultSound = await this.recorder.stop();
			    this.displaySave = true;
			    this.initCapture();
			    
			    

			}
			else {
				this.resultSound = '';
				this.recorder.start();
				this.displaySave = false;
				this.isRecord = true;
				document.querySelector('.btRecord').classList.remove("animate-onWait");
			    document.querySelector('.btRecord').innerHTML = 'stop recording';
			}


		    
		}
		,
		selectSource: function()
		{
			this.displayActiveSound = '';
			if (this.id_source == 2) {
				this.displayAddSound(0)
			}
		}
		,
		verifDisplayAddSound: function()
		{
			if (this.fileSound == '') this.id_source = 1;
			this.displayAddSound(0)
		}
		,
	    displayAddSound: function(id_sound = 0)
	    {
		    
		    var _element = document.querySelectorAll("#defaultModalFile")[0]
		    
		    if (_element.classList.contains('hidden')) {
			    _element.classList.remove("hidden");
			    _element.focus()
			    this.id_sound = id_sound;
			    if (this.id_sound != 0) {
					
					this.getFile();
				}
				else {
				}
			}
			else {
				this.file_media = '';
				_element.classList.add("hidden");
				this.initForm();
			}
	    }
	    ,
		handleFileUploadSon(e){
			this.hideErreur();
			
			var element = e.currentTarget;
			this.fileId = element.id;
	
			this.file_media = element.files[0];
			var titre = element.files[0].name;
			if (this.file_media != '') {
				this.submitSon(titre);
			}
		}
		,
	    submitSon(titre){
		  //this.uploadErreur = '';
		  this.uploadPercentageFile = 0;
		  let formData = new FormData();
		  formData.append('file', this.file_media);
		  document.querySelectorAll(".progress-media")[0].classList.remove('hidden');
		  document.querySelectorAll(".uploadZone-file")[0].classList.add('hidden');
		  document.getElementById("file_media").disabled = true;
		  axios.post(this.url_server + '/uploadFile',
		    formData,
		    {
		      headers: {
		          'Content-Type': 'multipart/form-data'
		      },
		      onUploadProgress: function( progressEvent ) {
			      var val = parseInt( Math.round((progressEvent.loaded*100) / progressEvent.total ));
			      document.querySelectorAll(".progress-title-media")[0].innerHTML = val + '%';
				  this.uploadPercentageFile = val;
		      }.bind(this)
		    }
		  )
		  .then(response => {
			  
			  var isOptimize = response.data.isOptimize;
			  
			  document.querySelector('#file_media').value='';
			  this.fileSound = response.data.optimizeFile[0];
			  console.log("titre : " + titre)
			  this.submitSonForm(titre);
	
	      })
	      .catch(err => {
		      if (typeof err.response.data.message === 'undefined') displayErreur(err)
		      else displayErreur(err.response.data.message)
			  document.querySelectorAll(".progress-media")[0].classList.add('hidden');
			  document.querySelectorAll(".uploadZone-file")[0].classList.remove('hidden');
			  document.getElementById("file_media").disabled = false;
	      })
		},
		submitSonForm(titre) {
		   if (this.fileSound != '') {
			   this.isNew_file = false;
			   if (this.id_sound == 0) this.isNew_file = true;
			   
			   var date_creation = moment().format('YYYY-MM-DD HH:mm:ss');
			   let data = {
				id_sound:0,
				id_user:this.id_user,
				fichier: this.fileSound,
				titre: titre,
				date_creation: date_creation,
		        isNew: this.isNew_file,
		      };
		
		      axios.post(this.url_server + "/addSound", data)
			   .then(response => {
				   this.id_sound = response.data.id_sound;
				   this.fileSound = '/upload/' + this.fileSound;
				   this.displayActiveSound = this.fileSound;
				   this.displayAddSound(0);
			   })
			   .catch(error => {
				  enabledActionsModal();
				  displayErreur("Erreur lors de l'ajout d'un son : " + error)
			   })
			}
			else {
				displayErreur("Erreur lors de l'ajout d'un son, son manquant : ");
				this.displayAddSound(0)
			}
	       
	    },
	    initForm: function(event)
	    {
		   clearRequiredModal();
		   enabledActionsModal();
		   hideErreur();
	    }
	    ,
		hideErreur: function()
	    {
		    hideErreur();
	    }
	    ,
	    initDisplayErreur: function()
	    {
		    hideErreur();
	    }
	    ,
	    addSoundToPlay: function(fichier)
	    {
		    this.fileSound = fichier;
		    this.displayActiveSound = this.fileSound;
		    this.verifDisplayAddSound();
		    
	    }
		
	}
}




</script>

<style scoped>

</style>
