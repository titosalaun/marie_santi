<template>
  <div class="container">
	  <div class="content">

		  
		  <div class="col-content" style="width:100%;padding-top:20px;">
			<div style="width:400px">
				<div style="margin-bottom:15px;">
				    <div>
					    <label>Nb étudiants</label>
					    <input type="text" id="nb_etudiant" v-model="nb_etudiant" />
				    </div>
			    </div>
			    
			    <div style="margin-bottom:15px;">
				    <div>
					    <label>Nb jury</label>
					    <input type="text" id="nb_jury" v-model="nb_jury" />
				    </div>
			    </div>
			    
			     <div style="margin-bottom:15px;">
				    <div>
					    <div><button class="btRecord" @click="goCalcule">Valider</button></div>
				    </div>
			    </div>
			</div>
			
			
				
				
		  	<table>
			  	<tr v-show="isLoadTable" v-for="i in etudiants.length" >
			  			<td style="width:30px;height:30px;border:1px solid #fff;padding:5px" v-for="j in nb_jury" >{{calcule(i,j)}}</td>
			  	</tr>
		  	</table>
		  			  	
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
	layout:'defaultold',
	mounted() {   

	 
	},
	data() {
	    return {
		    url_server:this.$store.state.url_server,
		    id_user: 0,
		    parametres:'',
		    messages : [],
		    isShowLoading:true,
		    isShowNoResult:false,
		    timeoutObj:'',
			isTools:false,
			isPause:false,
			myCurrentTimeSave:0,
			valSetTimeout:0,
			nb_jury : 32,
			nb_etudiant : 72,
			etudiants: new Array(),
			isLoadTable:false,
			isLoading:false,
	    }
	  },
	methods: {
		goCalcule: function()
		 {
			 this.etudiants = new Array();
			 this.isLoading = true;
			 setTimeout(function () { this.initEtudiants(); }.bind(this),1000);
			 
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
	    initEtudiants: function()
	    {
		    
		    var nb = this.nb_jury;
		    var table = new Array();
		    var index = 0;
		    while(index < this.nb_etudiant) {
			    table = this.getLigneEtudiant(table);
			    index++;
			}
			
			
			/*for (var i=0;i<table.length;i++) {
				console.log(i + " : " + table[i])
			}*/
			
			this.etudiants = table;
			this.isLoadTable = true;
			console.log("FIN : " + this.etudiants.length);
		    //console.log("array : " +  table);
		    var myArray = '20,28,8,1,25,15,13,2';
		    if (myArray.includes(2)) console.log("YES");
		    else console.log("NO")
		    
	    }
	     ,
	    getLigneEtudiant: function(table)
	    {
		    var sample = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
		    
		    var val = this.getEtudiant(sample,8);
		    if (table.includes(val)) {
			    this.getLigneEtudiant(table);
			}
			else {
				table.push(val);
				return table;
			}
			
			
	    }
	    ,
	    getEtudiant: function(array,size)
	    {
		  const results = [],sampled = {};
		  while(results.length<size && results.length<array.length) {
		    const index = Math.trunc(Math.random() * array.length);
		    if(!sampled[index]) {
		      results.push(array[index]);
		      sampled[index] = true;
		    }
		  }
		  return results;
		}
	    ,
	    getRandomNumber(min,max){
		    return Math.floor(Math.random()*(max-min+1)+min);
		}
		 ,
	    calcule(i,j){
		    this.isLoading = false;
		    var val = '';
		    val = this.etudiants[i-1].toString(); 
		    const myArray = val.split(",");
		    const myArrayNew = new Array();
		    for (var u=0;u<myArray.length;u++) {
			    myArrayNew.push('*' + myArray[u] + '*')
		    }
		    
		    console.log("myArray" + myArray)
		    
		    var tito = "no";
		     if (myArrayNew.includes(j)) tito = "yes";
		    console.log("j : " + j + " / " + tito)
		    if (myArrayNew.includes('*' + j + '*')) return j;
		    else return '';
		}
	    		
	}
}




</script>

<style scoped>

</style>
