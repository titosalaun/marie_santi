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
					  	<textarea  placeholder="..." v-model="tools_message" name="tools_message" id="tools_message"></textarea>
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
		  	<div class="mesure"><div class="mesure-val">{{decibelVal}}</div><div class="indice">DBA</div></div>
		  	<div id="content"></div>
		  	<div class="col-content-list">
			  	<div v-if="!messages.length"><div v-show='isShowLoading'>Chargement des messages...</div><div class="flex" v-show='isShowNoResult'><div class="pr-1 flex items-center"><NuxtLink :to="{ path: url_add}">aucun résultat, ajouter un message </NuxtLink></div> <div class="add highlight"><NuxtLink :to="{ path: url_add}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="big"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg></NuxtLink></div></div></div>
			  	<div v-for='(message, indexMessage) in messages' class="item">{{message.texte}}</div>
		  	</div>
		  	
		  	<div><div id="p5Canvas" class="canvas-area"></div></div>
		  	
		  </div>
		  
		   <div class="col-right">
		  	<div class="startMic cursor-pointer" @click="startMic()">start</div>
		  </div>

	  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import * as Tone from 'tone';


export default {
	middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInfont']),
  },
	mounted() {   

	 this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	 
	 this.loadParametres();
	 
	 this.getMessages();

	},
	data() {
	    return {
		    url_server:this.$store.state.url_server,
		    id_user: this.$auth.user.id,
		    parametres:'',
		    messages : [],
		    isShowLoading:true,
		    isShowNoResult:false,
			isTools:false,
			timeOutTools:'',
			tools_message:'',
			tools_color_text:'#fff',
			tools_color_bg:'#000',
			tools_font_size:20,
			isMic:false,
			meter:'',
			mic:'',
			decibelVal:0.0,
			intervalDisplayMic:'',
			micFFT:'',
			isMicInitialize:false,
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
	    },
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
	    initMic: function() {
		    this.meter = new Tone.Meter({});
			this.mic = new Tone.UserMedia();
			this.mic.connect(this.meter);
						
			//this.meter.toMaster()
			document.querySelector('.mesure').supported = Tone.UserMedia.supported;
			
			this.mic.open();
			
			/*this.mic = new Tone.UserMedia();

			this.micFFT = new Tone.FFT({
				tone: this.micFFT,
				parent: document.querySelector("#content")
			});
			this.mic.connect(this.micFFT);*/

	    }
	    ,
	    startMic: function() {
		    Tone.context.resume()
		    
		    
		    
		    if (this.isMic) {
			    this.mic.close();
			    this.decibelVal = 0.0;
			    this.isMic = false;
			    this.isMicInitialize = false;
			    document.querySelector('.startMic').innerHTML = 'start';
			    
		    }
			else {
				if (!this.isMicInitialize)
			    {
				    this.initMic();
				    this.isMicInitialize = true;
			    }
				this.isMic = true;
				document.querySelector('.startMic').innerHTML = 'stop';
			}
			
			if (this.isMic) {
				this.intervalDisplayMic = setInterval(() => this.displayVal(this.meter.getValue()), 100);
			}
			else {
				clearInterval(this.intervalDisplayMic);
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

		    this.decibelVal =  val;
		}
		,
	    clamp: function(value, min, max) {
		   return Math.min(max, Math.max(min, value));
		}
		,
		async logout() {
	      await this.$auth.logout();
	      this.$router.push('/login')
	      // this.$store.commit('setLoggedIn', false) // even if I use this
	      //console.log(this.$auth.loggedIn) // -> false
	    }
	}
}


</script>

<style scoped>

</style>
