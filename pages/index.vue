<template>
  <div class="container">
	  <div class="content">
		  
		  <div class="col-left">
		  	<div @click="goHome(0)" class="logo">
			  	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 776.86 861.5"><path d="M291.29,701.18c0,92.18,68.41,131,165.81,131,112.47,0,162.9-51,162.9-163.49V558.56H444.92C360.86,558.56,291.29,614.22,291.29,701.18ZM151.57,725.53c0-113,68.41-197.69,176.24-208.13V490.15c-84.06-10.43-146.67-87-146.67-179.14,0-133.34,130.44-215.66,280-215.66C622.9,95.35,740,173,747,332.46H611.89c-7-80-60.87-117.1-149-117.1-83.48,0-141.45,38.84-141.45,114.78s55.65,117.11,139.14,117.11H928.43V558.56H755.08c0,266.11-3.47,265,5.8,273.64,8.12,7.54,11.6,5.22,167.55,5.22V945.25c-207.55,0-224.94,5.8-263.21-34.2-22.61-23.77-21.45-74.79-21.45-74.79H622.9c-34.78,86.38-107.83,120.59-203.49,120.59C265.2,956.85,151.57,877.42,151.57,725.53Z" transform="translate(-151.57 -95.35)"/></svg>
			  	</div>
		  	<div class="tools">
			  	<div class="tools-content"  v-bind:class="{ open: isTools }">
				  	<div>
					  	<label class="big">Effets</label>
					  	<select v-model="id_effet" name="id_effet" id="id_effet" @change="selectEffet">
							<option value="1"> MS1</option>
							<option value="2"> MS2</option>
							<option value="3"> MS3</option>
						</select>
				  	</div>
				  	<div>
					  	<label class="big">Couleur</label>
					  	<div class="zoneColorText"><color-picker v-model="tools_color_text" @change="updateColorText"></color-picker></div>
				  	</div>
				  	<div>
					  	<label class="big">Fond</label>
					  	<div class="zoneColorBg"><color-picker v-model="tools_color_bg" @change="updateColorBg"></color-picker></div>
				  	</div>
				  	<div>
					  	<label>Taille de la font : {{tools_font_size}}</label>
					  	<input class="slider" type="range" @input="updateFontSize()" id="tools_font_size" min="10" max="200" v-model="tools_font_size" />
				  	</div>
				  	<div>
					  	<label>Interlettrage : {{tools_interlettrage}}</label>
					  	<input class="slider" type="range" @input="updateFontSize()" id="tools_interlettrage" min="-10" max="40" v-model="tools_interlettrage" />
				  	</div>
				  	<div>
					  	<label>Interlignage : {{tools_interlignage}}</label>
					  	<input class="slider" type="range" @input="updateFontSize()" id="tools_interlignage" min="10" max="200" v-model="tools_interlignage" />
				  	</div>

				  	<div>
					  	<label class="big">Formes</label>
					  	<select v-model="id_forme" name="id_forme" id="id_forme">
							<option value="1"> MS1</option>
							<option value="2"> MS2</option>
							<option value="3"> MS3</option>
						</select>
				  	</div>
				  	
				  	<div>
					  	<button class="cursor-pointer" @click="initParametres();">Valeurs par défaut</button>
				  	</div>
				  	
				  	<div v-show="isAuthenticated">
					  	<button class="cursor-pointer" @click="logout();">log-out</button>
				  	</div>
				  	
			  	</div>
			  	<div class="tools-nav" @click="openTools">Paramètres</div>
		  	</div>
		  </div>
		  
		  <div class="col-content" @click="initEspace()" v-bind:class="{ marge: isTools }">
		  	<div class="mesure">
			  	<div>
				  	<div><div class="mesure-val">{{mesureVal}}</div><div class="indice">DBA</div></div>
				  	<div v-show="isRecord" class="mesure-temps">Durée : {{mesureTps}}</div>
			  	</div>
			  	<div>
				  	
				  </div>
		    </div>
		  	<div id="content"></div>
		  	<div class="col-content-list">
			  		<div class="item" style="display:block">
				  		<div @click="clickEdit"  @input="clickEdit" ref="editItem" class="editItem bigBefore" contenteditable v-html="messageInit"></div>
				  		<div style="display:block;width: 100%;height:auto" id="p5Canvas_99" class="canvas-area hidden"></div>
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
		  	<div v-show="displayRecord"><button class="btRecord" @click="beforeRecording"  @mouseover="recordOver = true" @mouseleave="recordOver = false" v-bind:class="{ 'animate-onWait': !recordOver }">record</button>
					<div v-show="displayActiveSound != ''" class="pt-3 text-sm">{{displayActiveSound}}</div>

				  	</div>
				  	
				  	<div v-show="id_message != 0"><button class="btRecord btPlay" @click="playMessage">play</button></div>
				  	
				  	<div  v-show="displaySave"><button class="btRecord btPlay" @click="addMessage()">save</button></div>
			
			
			<!--<div v-show="displayReset"><button class="btRecord btPlay" @click="reset(true)">reset</button></div>-->
		  	<div v-show="displayNew" class="cursor-pointer" @click="newMessage()">new</div>
		  </div>

	  </div>
	  
	  <!-- Main modal -->
		<div id="defaultModalFile" tabindex="1" @keydown.esc="displayAddSound(0)" class="modalZone hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0">
		    <div class="relative px-6 w-full max-w-2xl h-full md:h-auto">
		        <!-- Modal content -->
		        <div class="relative  p-6 border">
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
var gainToDecibels = require('decibels/from-gain')

if (process.browser) {
  var effet_1 = require('~/assets/js/ms1_home.js')
  var effet_2 = require('~/assets/js/ms2_home.js')
  var effet_3 = require('~/assets/js/ms3_home.js')
}

var P5;
var P5Sound;
var playerSound;
export default {
	middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInfont']),
  }
  ,
  created() {	 
	 
	 	 	
	 	 console.log("ID : " + this.id_message)
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
			tools_interlignage:52,
			tools_interlettrage:1,
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
			messageInit:'LES LIGATURES MUTENT EN REGARD DES STYLES D’ÉCRITURE, PROLIFÈRENT PUIS INVESTISSENT LES CASSES TYPOGRAPHIQUES. CERTAINES, PASSÉES À LA POSTÉRITÉ, EUVRENT ENCORE EN CATIMINI DANS LES FAMILLES DE CARACTÈRES NUMÉRIQUES TANDIS QUE D’AUTRES EN ASSURENT LE LEITMOTIV',
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
			Fmessage:'',
			message_son:'',
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
			radar:'',
			id_effet:1,
			id_forme:1,
			isPlaying:false,
			modeRecording:1,
	    }
	  }
	,
	mounted() {   
		
		var id = JSON.parse(localStorage.getItem('id_message') || "[]") ;
	 console.log("id = " + id)
	 if (typeof id === 'undefined') {
		 this.id_message = 0;
	 }
	 else  this.id_message = id;

	 this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	 
	 if (this.id_message == 0) this.loadParametres();
	 this.initPage();
	 this.initDisplayErreur();
	 this.getSounds();
	 
	 P5 = require('p5')
	 
	 if (this.id_message != 0) {
		 this.messageInit ='loading...';
		 this.getMessage();
	 }
	 //P5Sound = require('p5/lib/addons/p5.sound');
     
    //radar.setLoop();
	 
	 
    this.selectEffet();

	},
	methods: {
		getMessage: function()
		 {
	       axios.get(this.url_server + "/getMessage?id_message=" + this.id_message)
	       .then(response => {
		       this.Fmessage = response.data.liste;
			   if (typeof this.Fmessage.texte !== 'undefined') {
				   this.id_effet = this.Fmessage.id_effet;
				   this.tools_font_size = this.Fmessage.font_size;
				   this.tools_color_text = this.Fmessage.color_text;
				   this.tools_color_bg = this.Fmessage.color_bg;
				   console.log("ici : " + this.tools_color_text)
				   this.interlignage = this.Fmessage.interlignage;
				   this.interlettrage = this.Fmessage.interlettrage;
			       this.messageInit = this.Fmessage.texte;
			       this.message = this.messageInit;
			       this.message_son = '/upload/message_' + this.id_message + '.webm';
			       
			       this.parametres.color_text = this.tools_color_text;
				   this.parametres.color_bg = this.tools_color_bg;
				   localStorage.setItem('parametres', JSON.stringify(this.parametres));
			       
			       //this.loadParametres();
			       
			       document.querySelector('.zoneColorText .color-block .value').innerHTML = this.tools_color_text;
		    document.querySelector('.zoneColorBg .color-block .value').innerHTML = this.tools_color_bg;
			       
			       this.updateColorText();
			       this.updateColorBg();
			       this.updateFontSize();
			
			    }
		   })
	       .catch(error => {
		       this.id_message = 0;
			   displayErreur("erreur de chargement du message")
	      })
	    },
		initEspace: function()
		{
			if (this.isTools) {
			    this.isTools = false;
		    }
		}
		,
		callbackOnP5: function(timeStr) {
	      this.mesureVal = timeStr;
	    }
	    ,
		startP5: function() {
			this.radar.startLoopP5();
		},
		stopP5: function() {
			this.radar.stopLoopP5();
		},
		startEffect: function()
		{
			console.log("testTito")
			if (this.isPlayP5) {
				/*this.isPlayP5 = false;
				this.ps = null;
				delete this.ps;*/
				this.stopP5();
				this.isPlayP5 = false;
				
				document.querySelector('.canvas-area').classList.add("hidden");
				document.querySelector('.editItem').classList.remove("hidden");
				
				document.querySelector('#p5Canvas_99').removeChild(document.querySelector('canvas'));
				
				this.ps = null;
			}
			else {
				console.log("PLAYYYYYYYYYY")
				
				this.isPlayP5 = true;
				
				//this.ps.isPlayP5 = true;
				
				//this.ps.isPlayP5 = true;
				
				
				
				/*this.ps = new P5(this.radar.main)
			    this.radar.setFctCanvasSize(window.innerWidth-200,900);
			    this.radar.setDelegate(this.callbackOnP5);
			    this.radar.setFctCanvasId(99)
			    this.radar.setFctSound(0)
			    console.log("couleyr : " + this.tools_color_text)
			    this.radar.setFctTextColor(this.tools_color_text)
			    this.radar.setFctBgColor(this.tools_color_bg)
			    this.radar.setFctFontSize(this.tools_font_size)
				this.radar.setFctTexte(document.querySelector('.editItem').innerHTML);*/
				
							this.ps = new P5(this.radar.main)
    // NOTE: p5.jsからのコールバックを受け取る
    this.radar.setDelegate(this.callbackOnP5);
    var p_width = document.querySelector('.col-content-list').clientWidth
    console.log("p_width : " + p_width)
    this.radar.setFctCanvasSize(p_width, 500);
    this.radar.setFctSound(0)
    console.log("couleyr : " + this.tools_color_text)
    this.radar.setFctTextColor(this.tools_color_text)
    this.radar.setFctBgColor(this.tools_color_bg)
		     var le_texte = document.querySelector('.editItem').innerHTML;
		     le_texte = le_texte.replaceAll("<div>","");
		     le_texte = le_texte.replaceAll("</div>","");
		     le_texte = le_texte.replaceAll("<br />","");
		     le_texte = le_texte.replaceAll("<br>","");
				this.radar.setFctTexte(le_texte);
				
				this.startP5();
				
				document.querySelector('.editItem').classList.add("hidden");
				document.querySelector('.canvas-area').classList.remove("hidden");
				
			}
			
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
				formData.append('id_effet', this.id_effet) ;
				formData.append('color_text', this.tools_color_text) ;
				formData.append('color_bg', this.tools_color_bg) ;
				formData.append('font_size', this.tools_font_size) ;
				formData.append('interlignage', this.tools_interlignage) ;
				formData.append('interlettrage', this.tools_interlettrage) ;
				formData.append('texte', this.formatMessage(this.message)) ;
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
					       if (this.isNewMessage) displayErreur('Votre message a été sauvegardé dans la typothèque');
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
			
			if (this.id_message == 0) {
			    
			    
			    if (!this.isBegin) {
				    e.target.innerHTML = '';
				    this.message = '';
				    this.messageInit = '';
				    document.querySelector('.editItem').classList.remove("bigBefore");
				    this.isBegin = true;
				}
							
				if ((this.isBegin) && (this.message != '')) {
					this.displayStart = true;
					this.displaySave = false;
					this.displayReset = true;
					this.displayRecord = true;
					document.querySelector('.editItem').classList.remove("bigBefore");
				}
				else {
					if (this.message == '') {
						this.reset(false);
					}
				}
				
				console.log("TEXTE : " + document.querySelector('.editItem').innerHTML)
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
			
			if (this.isPlayP5) {
				this.startEffect();
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
		    //clearTimeout(this.timeOutTools);
		    //this.timeOutTools = setTimeout(function () {  
			    this.updateColorPicker();
			    this.$parent.$emit('update:color_text_send', this.tools_color_text);
		    //}.bind(this), 100)
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
		    
		    if (typeof para.color_text === 'undefined') {
			    
			    var para = new Object();
		  		para.color_text = '#ffffff';
		  		para.color_bg = '#000';
		    
		  		this.parametres = para;
		    
		  		localStorage.setItem('parametres', JSON.stringify(this.parametres));
			    this.tools_color_text = "#fff";
				this.tools_color_bg = "#000";

		    }
		    else {
			    console.log("la")
			    console.log("tito color : " + para.color_text)
				this.tools_color_text = para.color_text;
				this.tools_color_bg = para.color_bg;
		    }
		    
		    		    
		    this.initTools();

	    }
	    ,
	    initParametres: function()
	    {
		    this.tools_color_text = '#fff';
		    this.tools_color_bg = '#000';
		    this.id_effet = 1;
		    this.id_forme = 1;
		    this.tools_font_size = 50;
		    this.tools_interlignage = 52;
		    this.tools_interlettrage = 1;
		    
		    this.$parent.$emit('update:color_text_send', this.tools_color_text);
		    this.$parent.$emit('update:color_bg_send', this.tools_color_bg);
		    this.updateFontSize();
	    }
	    ,
	    updateFontSize: function() {
		    document.querySelector('.col-content-list').style.fontSize = this.tools_font_size + "px";
		    document.querySelector('.col-content-list').style.lineHeight = (parseInt(this.tools_interlignage) + 3) + "px";
		    document.querySelector('.col-content-list').style.letterSpacing = (parseInt(this.tools_interlettrage)) + "px";

	    
	    }
	    ,
	    initDevice: function() {
		    this.meter = new Tone.Meter({normalRange:true});
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
			
		    
		    
		    if (this.id_source == 1) {
			    this.mic.open();
			    this.isMic = true;
				this.isCapture = true;
				this.fileSound = '';
				
				this.mic.connect(this.meter);
				this.mic.connect(this.recorder);
					
				//important
				Tone.Transport.start();
				this.intervalDisplayMic = setInterval(() => this.displayVal(this.meter.getValue(),this.meter.getValue()), 100);
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
							
							//this.initCapture();
							
							this.intervalDisplayMic = setInterval(() => this.displayVal(this.meter.getValue(),this.meter.getValue()), 100);
						
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
	    displayVal: function(val,val1) {
		    this.index++;
		    
		    //const dBFS = this.meter.getLevel();
			val = val;
			
			const lowerBound = 0;
			const upperBound = 100;
			
			//console.log("val = " + val)
			//console.log("val1 = " + val1)
			
			//val = parseInt(val) + 100;
			var decibel = (100 - gainToDecibels(val)*-1) - 10;
			//decibel = parseInt(decibel) +;

		    this.mesureVal =  decibel.toFixed(2);
		    
		    
		    this.mesureTps = this.convertSoundDuration(Tone.Transport.getSecondsAtTime());

		    this.radar.setFctSound(val)
		    
		    console.log("ISPALY : " + this.playerSound.state)
		    
		    if (this.id_source == 2) {
			    if (this.playerSound.state == 'stopped') {
				    //toto
				    this.isRecord = false;
				    this.isRecord = true;
			    this.beforeRecording();
				    //document.querySelector('.btRecord').classList.add("animate-onWait");
				    //document.querySelector('.btRecord').innerHTML = 'record';
	
				    //this.displaySave = true;
				    this.isPlaying = false;
				    this.initCapture();
			    }
		    }
		    //console.log("NEW val = " + (this.clamp(val)))
			//effet
		    //this.tools_font_size = (this.mesureVal * 50) / 90;
		    //this.updateFontSize();
		}
		,
	    clamp: function(value) {
		    return (0.0079 * value) + 0.001;
		   //return Math.min(max, Math.max(min, value));
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
	    playMessage: function()
	    {
		    this.fileSound = this.message_son;
		    
		    if (this.isPlaying) {
			    this.isPlaying = false;
			    this.isRecord = true;
			    this.beforeRecording();
			    
			    
			    
		    }
		    else {
			    console.log("TOTOT")
			    this.id_source = 2;
					this.isRecord = false;
			    this.isPlaying = true;
			    //this.loadSound(this.fileSound)
			    this.beforeRecording();
		    }

	    }
	    ,
	    beforeRecording: function()
	    {
		    this.initDisplayErreur();
		    this.startEffect();
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
		selectEffet: function()
		{
			if (this.id_effet == 1) this.radar = effet_1;
			if (this.id_effet == 2) this.radar = effet_2;
			if (this.id_effet == 3) this.radar = effet_3;
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
	    ,
		goHome: function(id_message)
		{
			localStorage.setItem('id_message', JSON.stringify(id_message));
			document.location = '/'
		}
		,
		formatMessage: function(message) {
			message = message.replaceAll("<br>",' ');
			message = message.replaceAll("<div>",' ');
			message = message.replaceAll("</div>",' ');
			message = message.replaceAll("<br />",' ');
			return message
		}
		
	}

}






</script>

<style scoped>

</style>
