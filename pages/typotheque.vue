<template>
  <div class="container">
	  <div class="content">
		  
		  <div class="col-left">
		  	<div class="logo">
			  	<nuxt-link to="/">
			  	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 776.86 861.5"><path d="M291.29,701.18c0,92.18,68.41,131,165.81,131,112.47,0,162.9-51,162.9-163.49V558.56H444.92C360.86,558.56,291.29,614.22,291.29,701.18ZM151.57,725.53c0-113,68.41-197.69,176.24-208.13V490.15c-84.06-10.43-146.67-87-146.67-179.14,0-133.34,130.44-215.66,280-215.66C622.9,95.35,740,173,747,332.46H611.89c-7-80-60.87-117.1-149-117.1-83.48,0-141.45,38.84-141.45,114.78s55.65,117.11,139.14,117.11H928.43V558.56H755.08c0,266.11-3.47,265,5.8,273.64,8.12,7.54,11.6,5.22,167.55,5.22V945.25c-207.55,0-224.94,5.8-263.21-34.2-22.61-23.77-21.45-74.79-21.45-74.79H622.9c-34.78,86.38-107.83,120.59-203.49,120.59C265.2,956.85,151.57,877.42,151.57,725.53Z" transform="translate(-151.57 -95.35)"/></svg>
			  	</nuxt-link></div>
		  	<div class="tools hidePara">
			  	<div class="tools-content"  v-bind:class="{ open: isTools }">
			  			
				  	
			  	</div>
			  	<div class="tools-nav">Paramètres</div>
		  	</div>
		  </div>
		  
		  <div class="col-content" v-bind:class="{ marge: isTools }">
		  	<div class="col-content-list">

			  	<div v-if="!messages.length">
					<div v-show='isShowLoading'>Chargement des messages...</div>
				  	<div v-show='isShowNoResult'>aucun message enregistré</div>
			  	</div>
				  	
		  		<div v-for='(message, indexMessage) in messages' class="item" v-for-callback="{key: indexMessage, array: messages, callback: callback}">
			  		<div class="item-content"  :id="'S_' + indexMessage">
				  		<div class="message relative" :style="{ 'color': message.color_text }">
					  		<a :href="'/?id_message=' + message.id_message">{{message.texte}}</a> 
					  		<div style="display:block;width: 100%;height:auto" :id="'p5Canvas_' + message.id_message" class="canvas-area"></div>
					  	</div>
				  		<div class="item-tools">
					  		<div><button class="getPoster" @click="getPoster(message.id_message,$event)">Créer un poster</button></div>
					  		<div><button><a :href="'/?id_message=' + message.id_message">Modifier la font</a></button></div>
					  		<div><button @click="delMessage(message.id_message)">Supprimer</button></div>
				  		</div>
				  		
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

if (process.browser) {
  var effet_1 = require('~/assets/js/ms1.js')
  var effet_2 = require('~/assets/js/ms2.js')
  var effet_3 = require('~/assets/js/ms3.js')
}

var playerSound;
var bufferSound = new Array();

export default {
	middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInfont']),
  },
	mounted() {   

	 this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	 this.getMessages();
	 
	 playerSound = new Tone.Player().toDestination();
	 
	 this.initDisplayErreur();
	 
	 P5 = require('p5');
	},
	data() {
	    return {
		    script: null,
			ps: null,
			radar:'',
		    url_server:this.$store.state.url_server,
		    id_user: this.$auth.user.id,
		    parametres:'',
		    messages : [],
		    isShowLoading:true,
		    isShowNoResult:false,
		    timeoutObj:'',
			isTools:false,
			isPause:false,
			myCurrentTimeSave:0,
			valSetTimeout:0,
	    }
	  },
	  directives: {
    forCallback(el, binding) {
      let element = binding.value
      var key = element.key
      var len = 0

      if (Array.isArray(element.array)) {
        len = element.array.length
      }

      else if (typeof element.array === 'object') {
        var keys = Object.keys(element.array)
        key = keys.indexOf(key)
        len = keys.length
      }

      if (key == len - 1) {
        if (typeof element.callback === 'function') {
          element.callback(element.array)
        }
      }
    }
  },
	methods: {
		 getMessages: function()
		 {
	       axios.get(this.url_server + "/getMessages?id_user=" + this.id_user)
	       .then(response => {
		       this.isShowLoading = false;
		       this.messages = response.data.liste;
		       if (this.messages.length == 0) this.isShowNoResult = true;
		   })
	       .catch(error => displayErreur('Erreur lors du chargement des messages'))
	    }
	    ,
	    delMessage: function(id_message)
		 {
	       axios.get(this.url_server + "/delMessage?id_message=" + id_message)
	       .then(response => {
		       this.isShowLoading = true;
		       this.isShowNoResult = false;
		       this.messages = new Array();
		       this.getMessages();
		   })
	       .catch(error => displayErreur('Erreur lors du chargement des messages'))
	    }
	    ,
	    getPoster: function(id_message,event)
		 {
	       event.target.innerHTML = 'dev en cours';
	        setTimeout(function () { event.target.innerHTML = 'Créer un poster'; }.bind(this), 2000);
	    }
		,
		async logout() {
	      await this.$auth.logout();
	      this.$router.push('/login')
	    }
	    ,
		loadSound(file, id, index)
		{
			console.log("debut")
			
			//file = convertSound(file);
			console.log("blob : " + file)
			//var blobUrl = URL.createObjectURL(file);
			
			bufferSound[index] = new Tone.ToneAudioBuffer({
				onload: () => {
					document.querySelector('#' + id + ' .duration').innerHTML = this.convertSoundDuration(bufferSound[index].duration);
					document.querySelector('#' + id + ' .content-play').classList.remove('isLoading');
				},
				onerror: () => {
					document.querySelector('#' + id + ' .duration').innerHTML = "no sound";
				},
				reverse: false,
				url: file,
			});
			
			/*bufferSound[index] = new Tone.ToneAudioBuffer(file, ( ) => {

				console.log("in : " + id)
				document.querySelector('#' + id + ' .duration').innerHTML = this.convertSoundDuration(bufferSound[index].duration);
				document.querySelector('#' + id + ' .content-play').classList.remove('isLoading');
			});*/
			
						
			
			
					}
	    ,
	    onload()
	    {
		    console.log("ONLOAD")
	    }
	    ,
		playSound(file,id,index)  
		{
			if (!document.querySelector('#' + id + ' .content-play').classList.contains('isLoading')) {
				
				if (this.isPlayingSound == index) {
					this.stopSound();
				}
				else {
					if (this.isPlayingSound != -1) {
						clearTimeout(this.valSetTimeout);
						this.stopSound();
					}
					
					this.initAllSound();
					
					Tone.Transport.start();
					this.myCurrentTime = new Tone.TransportTime();
					
					this.isPlayingSound = index;
					this.progressValTotal = bufferSound[index].duration;
					playerSound.buffer = bufferSound[index];
					playerSound.start();
					playerSound.onstop = () => {
					    this.stopSound();
					  };
					this.playSoundProgress(id);
					console.log("TITO1")
					//document.querySelector('#' + id + ' .player img').setAttribute("src","/img/pause.png");
					document.querySelector('#' + id + ' .ctrlPlay').classList.add("hide");
					document.querySelector('#' + id + ' .ctrlPause').classList.remove("hide");
					
					
				}
				
			}
			
		}
		,
		initAllSound()
		{
			document.querySelectorAll('.progress-play').forEach(el => el.style.width = '0px');
			document.querySelectorAll('.ctrlPlay').forEach(el => el.classList.remove("hide"));
			document.querySelectorAll('.ctrlPause').forEach(el => el.classList.add("hide"));
		}
		,
		pauseSound(id)  
		{
			//Tone.Transport.stop();
			clearInterval(this.valSetInterval);		
			playerSound.stop();		
			
			
			this.myCurrentTimeSave = this.myCurrentTime;
			console.log("PAUSE : " + this.myCurrentTimeSave)
			//document.querySelector('#' + id + ' .player img').setAttribute("src","/img/play.svg");
			document.querySelector('#' + id + ' .ctrlPlay').classList.remove("hide");
			document.querySelector('#' + id + ' .ctrlPause').classList.add("hide");
			//Tone.Transport.stop();
			//this.myCurrentTime = 0;
		}
		,
		stopSound()  
		{
			//Tone.stop();
			console.log("STOP")
			this.isPlayingSound = -1;
			this.progressValTotal = 0;
			clearInterval(this.valSetInterval);
			this.initAllSound();
			playerSound.stop();		
			Tone.Transport.stop();
			this.myCurrentTime = 0;
		}
		,
		playSoundProgress(id)  
		{
			console.log(this.myCurrentTime + ' / ' + this.progressValTotal)
			var val_progress = Math.round((this.myCurrentTime*100) / this.progressValTotal )
			if ((this.isPlayingSound != -1) && (val_progress <= 101)) {		
				document.querySelector('#' + id + ' .progress-play').style.width = val_progress + '%';
				
				this.valSetInterval = setTimeout(function () { if (this.isPlayingSound != -1) this.playSoundProgress(id) }.bind(this), 200);
			}
			else {
				clearTimeout(this.valSetInterval);
				Tone.Transport.stop();
			}
			
		}
		,
		convertSoundDuration(sec)
		{
			var val = (sec / 60).toFixed(2);
			return val.toString().replace(".",":")
		}
		,
		convertSound(data) {
			let binary = convertURIToBinary(data);
			let blob = new Blob([binary], {
			  type: 'audio/ogg'
			});
			let blobUrl = URL.createObjectURL(blob);
			
			return blobUrl;
		}
		,
	    initDisplayErreur: function()
	    {
		    hideErreur();
	    }
	    ,
	    getRandomNumber(min,max){
		    return Math.floor(Math.random()*(max-min+1)+min);
		}
		,
		loadMessage: function(id_message,id_effet,message,color_text,color_bg,font_size) {
			console.log("id_effet : " + id_effet)
			this.selectEffet(id_effet);
			
			this.ps = new P5(this.radar.main)
		    this.radar.setDelegate(this.callbackOnP5);
		    this.radar.setFctCanvasId(id_message)
		    this.radar.setFctSound(0)
		    this.radar.setFctTextColor(color_text)
		    this.radar.setFctBgColor(color_bg)
		    this.radar.setFctFontSize(font_size)
    
			this.radar.setFctTexte(message);
			//this.startP5();
		}
		,
		selectEffet: function(id_effet)
		{
			if (id_effet == 1) this.radar = effet_1;
			if (id_effet == 2) this.radar = effet_2;
			if (id_effet == 3) this.radar = effet_3;
		}
		,
		callback(elements) {			
			for( var i=0; i< elements.length; i++ )
			{
				console.log("BOUVLE : " + elements[i].texte)
				//document.querySelector('#p5Canvas_' + elements[i].id_message).removeChild(document.querySelector('canvas'));
				this.loadMessage(elements[i].id_message,elements[i].id_effet,elements[i].texte,elements[i].color_text,elements[i].color_bg,elements[i].font_size);
			}
			//this.loadMessage(elements.id_message,elements.id_effet,elements.message,elements.color_text,elements.color_bg,elements.font_size);
	    },
	    		
	}
}




</script>

<style scoped>

</style>
