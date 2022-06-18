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
					  	<label class="big">Couleur</label>
					  	<div class="zoneColorText"><color-picker v-model="color_text" @change="updateColorText"></color-picker></div>
				  	</div>
				  	<div>
					  	<label class="big">Fond</label>
					  	<div class="zoneColorBg"><color-picker v-model="color_bg" @change="updateColorBg"></color-picker></div>
				  	</div>
				  	<div>
					  	<label>Taille de la font : {{tools_font_size}}</label>
					  	<input class="slider" type="range" @input="updateFontSize()" id="font_size" min="10" max="200" v-model="font_size" />
				  	</div>
				  	<div>
					  	<label>Interlettrage : {{tools_interlettrage}}</label>
					  	<input class="slider" type="range" @input="updateFontSize()" id="interlettrage" min="-10" max="40" v-model="interlettrage" />
				  	</div>
				  	<div>
					  	<label>Interlignage : {{tools_interlignage}}</label>
					  	<input class="slider" type="range" @input="updateFontSize()" id="interlignage" min="10" max="200" v-model="interlignage" />
				  	</div>
				  	<div>
					  	<button class="cursor-pointer toGalerie" @click="exportGalerie();">Galerie</button>
				  	</div>
				  	<div>
					  	<button class="cursor-pointer toPoster" @click="exportPoster();">Export JPG</button>
				  	</div>
				  					  	
			  	</div>
		  	</div>
		  </div>
		  
		  <div class="col-content" v-bind:class="{ marge: isTools }">
		  	<div class="col-content-list">
		  		<div class="item flex-col">
			  		<div v-show='isShowLoading' class="block text-center w-full">Chargement du poster...</div>
			  		<div id="p5Canvas_99" class="canvas-area flex justify-center w-full"></div>
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
  }
  ,
   created() {
		 this.id_message = parseInt(this.$route.query.id);
	}
	,
	mounted() {   
     var id = 0;
	 localStorage.setItem('id_message', JSON.stringify(id));
	 
	 this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	 
	 
	 this.getMessage();
	 
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
		    message : [],
		    isShowLoading:true,
		    isShowNoResult:false,
		    timeoutObj:'',
			isTools:false,
			isPause:false,
			myCurrentTimeSave:0,
			valSetTimeout:0,
			indexLoad:0,
			tito:'',
			id_message:0,
			id_effet:1,
			texte:'',
			color_text:'',
			color_bg:'',
			font_size:'',
			interlignage:'',
			interlettrage:'',
			isTools:true,
			timeOutTools:0,
	    }
	  
  },
	methods: {
		 getMessage: function()
		 {
	       axios.get(this.url_server + "/getMessage?id_message=" + this.id_message)
	       .then(response => {
		       this.message = response.data.liste;
			   if (typeof this.message.texte !== 'undefined') {
				    this.id_message = this.message.id_message;
			        this.id_effet = this.message.id_effet;
			        this.texte = this.message.texte;
			        this.color_text = this.message.color_text;
			        this.color_bg = this.message.color_bg;
			        this.font_size = this.message.font_size;
			        
			        this.initTools();
			        
			        console.log("font_size : " + this.font_size)
			        this.loadMessage(true,this.id_message,this.id_effet,this.texte,this.color_text,this.color_bg,this.font_size)
			    }
		   })
	       .catch(error => {
		       this.id_message = 0;
			   displayErreur("Erreur lors du chargement du message : " +error)
	      })
	    }
	    ,
	    initDisplayErreur: function()
	    {
		    hideErreur();
	    }
	    ,
		loadMessage: function(isFirst,id_message,id_effet,message,color_text,color_bg,font_size) {
			console.log("color_text : " + color_text)
			
			if (!isFirst) {
				document.querySelector('#p5Canvas_99').removeChild(document.querySelector('canvas'));
			}
			this.radar = this.selectEffet(id_effet);
			
			this.ps = new P5(this.radar.main)
			this.radar.setFctCanvasSize(547,910);
		    this.radar.setFctCanvasId(99)
		    this.radar.setFctSound(0)
		    this.radar.setFctTextColor(color_text)
		    this.radar.setFctBgColor(color_bg)
		    this.radar.setFctFontSize(font_size)
    
			this.radar.setFctTexte(message,0);
			
			this.isShowLoading = false;
			document.querySelector('.canvas-area').classList.remove("hidden");
		}
		,
		selectEffet: function(id_effet)
		{
			if (id_effet == 1) this.radar = effet_1;
			if (id_effet == 2) this.radar = effet_2;
			if (id_effet == 3) this.radar = effet_3;
			
			return this.radar;
		}
		,
	    updateColorText: function() {
		    clearTimeout(this.timeOutTools);
		    this.timeOutTools = setTimeout(function () {  
			    this.updateColorPicker(true);
		    }.bind(this), 100)
	    }
	    ,
	    updateColorBg: function() {
		    clearTimeout(this.timeOutTools);
		    this.timeOutTools = setTimeout(function () {  
			    this.updateColorPicker(true);
		    }.bind(this), 100)
	    }
	    ,
	    updateColorPicker: function(isRadar) {
		    if (isRadar) {
			    this.loadMessage(false,this.id_message,this.id_effet,this.texte,this.color_text,this.color_bg,this.font_size)
			    /*this.radar.setFctTextColor(this.color_text)
				this.radar.setFctBgColor(this.color_bg)
				this.radar.setFctRedraw(this.color_text);*/
				//this.startP5()
				//this.stopP5()
		    }
		    
		    document.querySelector('.zoneColorText .color-block .value').innerHTML = this.color_text;
		    document.querySelector('.zoneColorBg .color-block .value').innerHTML = this.color_bg;
	    }
	    ,
	    initTools: function() {
		    this.updateColorPicker(false);
		}
		,
		startP5: function() {
			this.radar.startLoopP5();
		},
		stopP5: function() {
			this.radar.stopLoopP5();
		},
		exportPoster: function() {
			this.radar.setFctSave();
	    	
	    }
	    ,
		exportGalerie: function() {
			isAction('Exportation du poster en cours...',false);
			
			var el = document.querySelector(".toGalerie");
			el.classList.add("cursornotallowed");
			el.disabled = true;
	
			var canvas = document.getElementById("defaultCanvas0");
			var dataURL = canvas.toDataURL("image/png");
			console.log(dataURL)
			
			//var base64 = this.resultSound;
			let formData = new FormData();
			formData.append('poster', dataURL) ;
			formData.append('id_message', this.id_message) ;
			
			const timeOutTools = setTimeout(() => {
			axios.post(this.url_server + '/addPoster',
			    formData,
			    {
			      headers: {
			          'Content-Type': 'multipart/form-data'
			      },
			      onUploadProgress: function( progressEvent ) {
				      
				      //var val = parseInt( Math.round((progressEvent.loaded*100) / progressEvent.total ));
				      //document.querySelector('.progress-alert').style.width = val + "px";
				      //console.log("progress : " + val)
			      }.bind(this)
			    }
			  )
			  .then(response => {
			  	   //document.querySelector('.progress-alert').style.width = "0px";	
			       //this.id_message = response.data.id_message;
			       
			       var el = document.querySelector(".toGalerie");
					el.classList.remove("cursornotallowed");
					el.disabled = false;
					isAction('',false);
			       displayErreur('Votre poster a été sauvegardé dans la galerie');
		      })
		      .catch(err => {
			      if (typeof err.response.data.message === 'undefined') displayErreur(err.response.data.message)
			      else displayErreur(err.response.data.message)

		      })
		}, 1500);
	    	
	    },
		goHome: function(id_message)
		{
			localStorage.setItem('id_message', JSON.stringify(id_message));
			document.location = '/'
		}
	    		
	}
}




</script>

<style scoped>

</style>
