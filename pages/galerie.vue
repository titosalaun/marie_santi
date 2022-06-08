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
				  	
		  		<div v-for='(message, indexMessage) in messages' class="item">
			  		<div class="item-content"  :id="'S_' + indexMessage">
				  		<div class="zonePlay">
					  		
					  		<div class="content-play isLoading" @click="playSound('/upload/message_' + message.id_message + '.webm','S_' + indexMessage, indexMessage)">
					  		<svg class="ctrlPlay"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
</svg>
							<svg class="ctrlPause hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" /></svg>
					  		</div>
				  		</div>
				  		<div class="message relative">{{message.texte}} <div class="progress-play"></div></div>
				  		<div class="duration">loading...{{loadSound('/upload/message_' + message.id_message + '.webm','S_' + indexMessage, indexMessage)}}</div>
				  		
			  		</div>
			  	</div>
		  	</div>
		  			  	
		  </div>
		  
		   <div class="col-right">
			
		  </div>

	  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import * as Tone from 'tone';
import moment from 'moment';

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
	},
	data() {
	    return {
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
	    		
	}
}




</script>

<style scoped>

</style>
