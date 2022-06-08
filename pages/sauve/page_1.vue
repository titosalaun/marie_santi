<template>
  <div class="container">
	  <div class="content">
		<div class="flex justify-center" id="p5Canvas"></div>
	    
	    <div class="tools">
			<div class="pt-6">
				<div id="p5_loading" class="animate-pulse">Loading...</div>
				<div id="Play" class="animate-pulse hide cursor-pointer">Click to play</div>
		    </div>
	    </div>
	  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	
	mounted() {   
	 const script = function (p5) {    
	  var speed = 2;    
	  var posX = 0;
	  let font;
	  let points;
	  let bounds;
	  var para = 200;
	  let song;
let fft;
let analyser;
	  
	  // NOTE: Set up is here  
	  p5.preload = _ => {      
	   font = p5.loadFont('UniversalSansDisplayTrial491-Regular.otf');   
	   song = p5.loadSound('20181201121239_05-feedback.mp3',soundLoaded); 
	  }   
	  p5.setup = _ => {      
	   var canvas = p5.createCanvas(p5.displayWidth, p5.displayHeight);   
	   canvas.parent("p5Canvas");   
	   
	    p5.stroke(255,0,0); 
		  p5.strokeWeight(4);
		  p5.noFill();
		
		  
		  fft = new P5.FFT();  
		  analyser = new P5.Amplitude();
  
	  }     
	  // NOTE: Draw is here
	  p5.draw = _ => {     
		  p5.background(0);

		  let waveform = fft.waveform();
		  let amp = analyser.getLevel();
		  amp = p5.map(amp, 0, 1, -100, 100);
		  
		  p5.stroke(255, 255, 255);
		  p5.strokeWeight(1);
		  
		  for (let i = 0; i< waveform.length; i++){
		    let x = p5.map(i, 0, waveform.length, 0, p5.width);
		    let y = p5.map( waveform[i], -1, 1, 0, p5.height);
		    p5.point(x,y);
		  }
		  
		  p5.stroke(255, 0, 0);
		  p5.strokeWeight(5);
		  
		  noiseLine(10, p5.height / 2, p5.width - 20, 0, 0, amp);
	   
	  }  
	  
	  p5.mouseClicked = _ => {
		document.getElementById('Play').classList.add("hide");
	 	song.play();
	  }
	  
	  function soundLoaded()
	  {
		  document.getElementById('Play').classList.remove("hide");
		  //parent.isLoadPage = true;
	  }
	  
	  
	  function noiseLine(x, y, len, angle, noiseOff, amp) {
		  p5.push();
		  p5.translate(x, y);
		  p5.rotate(angle);
		    
		  let numSegs = 10;
		  let segLen = len / numSegs;
		  
		  let px = 0;
		  let py = 0;
		  
		  let freq = 0.01; // sldFreq.value();
		  
		  for( let i = segLen; i < len; i += segLen){
		    let sampX = (noiseOff + p5.frameCount + i) * freq;
		    let yOff = p5.noise(sampX);
		    yOff = p5.map(yOff, 0, 1, -amp, amp);
		    
		    let nx = i;
		    let ny = yOff;
		    
		    p5.line(px, py, nx, ny);
		    
		    px = nx;
		    py = ny;
		  }
		  
		  p5.line(px, py, len, 0); 
		  
		  p5.pop();
		}
	 }   

	 // NOTE: Use p5 as an instance mode
	 const P5 = require('p5');
	 const P5Sound = require('p5/lib/addons/p5.sound');
	 //import * as p5Class from 'p5'
	 
	 this.tito = new P5(script)
	},
	data() {
	    return {
		  tito:'',
		  bg:0,
		  isLoadPage:false,
	    }
	  },
	methods: {
		Play() {
			console.log("tito: " + this.tito)
			this.bg = 255
		  //this.tito.background(255);
	    }
	}
})
</script>

<style scoped>

</style>
