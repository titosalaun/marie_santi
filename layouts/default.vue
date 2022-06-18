<template>
  <div :style="updateCss()" class="mainSpace" v-bind:class="{ isLoad: !isload }">
	<TheHeader />
    <Nuxt :color_text_send.sync="color_text" :color_bg_send.sync="color_bg" />
    <TheFooter />
  </div>
</template>

<script>
export default{
	name: 'defaultLayout',
	mounted() {   
		//localStorage.setItem('parametres', JSON.stringify(this.parametres));
		this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
		console.log("PARATITO : " + this.parametres)
		
		this.initParametres();
	},
    watch: {
        color_text: {
            handler(newValue) {
	            this.updateParametres(newValue,this.color_bg);
	             console.log("colorTexte : " + newValue)
            }, deep: true
        }
        ,
        color_bg: {
            handler(newValue) {
	            this.updateParametres(this.color_text,newValue);
	             console.log("bgTexte : " + this.newValue)
            }, deep: true
        }
    }
    ,
	data() {
	    return {
			isTools:true,
			color_text:'',
			color_bg:'',
			parametres:'',
			isload:false,
	    }
	  },
	methods: {
	    updateCss: function() {
	      return {
	        '--style_color_text': this.color_text,
	        '--style_color_bg': this.color_bg,
	      }
	    }
	    ,
	    initParametres: function() {
		    
		    if (typeof this.parametres === 'undefined') {
	      		var para = new Object();
		  		para.color_text = '#ffffff';
		  		para.color_bg = '#000';
		    
		  		this.parametres = para;
		    
		  		localStorage.setItem('parametres', JSON.stringify(this.parametres));
		  	}
		  	else {
			  	this.color_text = this.parametres.color_text;
			  	this.color_bg = this.parametres.color_bg; 
		  	}
		    
		    this.loadParametres();
	    }
	    ,
	    loadParametres: function() {
		   
		    var para = this.parametres;
		    this.color_text = para.color_text;
		    this.color_bg = para.color_bg;
		    		    
		    this.isload = true;

	    }
	    ,
	    updateParametres: function(color_text,color_bg) {
		    this.parametres.color_text = color_text;
		    this.parametres.color_bg = color_bg;
		    
		    this.color_text = color_text;
		    this.color_bg = color_bg;
		    console.log("new val : " + this.parametres.color_text)
		    localStorage.setItem('parametres', JSON.stringify(this.parametres));


	    }
	}
}
</script>

<style>
	.mainSpace {
		color: var(--style_color_text);
		background-color: var(--style_color_bg);
	}
	
	.tools .tools-content {
		background-color: var(--style_color_bg) !important;
	}
	
	
	.logo svg path, svg path {
		fill: var(--style_color_text);
	}
	
	.mainSpace input[type=number], input[type=text], input[type=file], input[type=password], input[type=email], textarea, select, .one-colorpicker {
		border-color: var(--style_color_text);
		color: var(--style_color_text);
	}
	
	.mainSpace input:focus, .mainSpace textarea:focus, .mainSpace select:focus {
		border-color: var(--style_color_text);
		outline:none;
		outline-color:red !important;
		outline-border:0px;
	}
	
	.slider {
	  background-color: var(--style_color_text);
	}
	
	.slider::-webkit-slider-thumb {
	   background-color: var(--style_color_text);
	}
	
	.slider::-moz-range-thumb {
	   background-color: var(--style_color_text);
	}
	
	.form-login-content {
		border-color: var(--style_color_text);
	}
	
	button {
	  color: var(--style_color_text);
	  background-color: var(--style_color_bg);
	  border-color: var(--style_color_text);
  	}
  	
  	button:focus {
	   color: var(--style_color_text);
	  background-color: var(--style_color_bg);
	  border-color: var(--style_color_text);
  	}
  	
  	button:hover {
	  color: var(--style_color_bg);
	  background-color: var(--style_color_text);
  	}
  	
  	.alertBox {
	  	 color: var(--style_color_bg);
	  background-color: var(--style_color_text);
  	}
  	
  	.alertBox > svg {
	  	 stroke:var(--style_color_bg);
  	}
  	
  	.editItem {
	   color: var(--style_color_text);
	   font-size: var(--tools_font_size)px;
	   line-height: var(--tools_interlignage)px;
	   letter-spacing: var(--tools_interlettrage)px;
  	}
  	
  	.editItem:focus {
	   color: var(--style_color_text);
	  background-color: var(--style_color_bg);
	  border-color: var(--style_color_bg);
	  outline:none;
		outline-color:var(--style_color_bg) !important;
		outline-border:0px;
  	}
  	
  	.container .content .col-content .col-content-list .item .item-content .progress-play {
	  	background-color: var(--style_color_text);
  	}
  	
  	#defaultModalFile > div {
	  	border-color: var(--style_color_text);
  	}
  	
  	#defaultModalFile > div > div {
	  	border-color: var(--style_color_text);
  	}
  	
  	.form-container .bt-upload, .form-container .progress {
	  	border-color: var(--style_color_text);
  	}
  	
  	.form-container .bt-upload:focus {
	   color: var(--style_color_text);
	  background-color: var(--style_color_bg);
	  border-color: var(--style_color_text);
  	}
  	
  	.form-container .bt-upload:hover {
	  color: var(--style_color_bg);
	  background-color: var(--style_color_text);
  	}
  	
  	.form-container .progress > div:first-child  {
	  	background-color: var(--style_color_bg);
	}
	
	.form-container .progress > div:last-child {
		background-color: var(--style_color_text);
	}
	
	.progress-alert {
		background-color: var(--style_color_bg);
	}
	

</style>
