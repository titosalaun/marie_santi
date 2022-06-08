<template>
  <div class="container">
    
    <div class="form-login flex items-center justify-center w-full bg-mainBg">
	    
		    <div class="form-login-content md:w-1/2 lg:w-96 w-full flex items-center justify-center flex-col bg-mainBg p-3 md:p-6  border border-mainColor">
			    <h1>
				    <div class="logoContainer" v-show="!isPasswordForgot">
				    	<div class="logo">
					    	<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 776.86 861.5"><path d="M291.29,701.18c0,92.18,68.41,131,165.81,131,112.47,0,162.9-51,162.9-163.49V558.56H444.92C360.86,558.56,291.29,614.22,291.29,701.18ZM151.57,725.53c0-113,68.41-197.69,176.24-208.13V490.15c-84.06-10.43-146.67-87-146.67-179.14,0-133.34,130.44-215.66,280-215.66C622.9,95.35,740,173,747,332.46H611.89c-7-80-60.87-117.1-149-117.1-83.48,0-141.45,38.84-141.45,114.78s55.65,117.11,139.14,117.11H928.43V558.56H755.08c0,266.11-3.47,265,5.8,273.64,8.12,7.54,11.6,5.22,167.55,5.22V945.25c-207.55,0-224.94,5.8-263.21-34.2-22.61-23.77-21.45-74.79-21.45-74.79H622.9c-34.78,86.38-107.83,120.59-203.49,120.59C265.2,956.85,151.57,877.42,151.57,725.53Z" transform="translate(-151.57 -95.35)"/></svg>
				    	</div>
				    </div>
				    <span v-show="isPasswordForgot">Mot de passe oublié ?</span>
				</h1>
			    
			    
			    <div class="w-full">
				    <form method="post" @submit.prevent="checkSubmit">
					    
					    <div v-show="passwordForgotSend" class="text-mainColor mb-9">
					    	Un email vient de vous être envoyé avec les instructions pour réinitialiser votre mot de passe.
					    </div>

						<div>
							<div v-show="!passwordForgotSend">
							    <div v-bind:class = "(!isPasswordForgot)?'mb-6':'mb-0'">
								    <div><input placeholder="E-mail" name="username" id="username" v-model="username" type="email" @focus="initForm()" /></div>
							    </div>
						    
								 <div v-show="!isPasswordForgot" class="relative">
										    <div><input :type="showPassword ? 'password' : 'text'" placeholder="Mot de passe"  name="password" id="password" v-model="password" class="form-input"  type="password" @focus="initForm()" />
											    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
				
				                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mini" @click="showPassword = !showPassword" :class="{'hidden': !showPassword, 'block':showPassword }">
									  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
									  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
									</svg>
									
									<svg xmlns="http://www.w3.org/2000/svg" class="mini"  :class="{'block': !showPassword, 'hidden':showPassword }" @click="showPassword = !showPassword" viewBox="0 0 20 20" fill="currentColor">
									  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
									  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
									</svg>
				
				                  </div>
								    </div>
						    </div>
						    
						    <!--<div class="mb-4">
							    <label class="inline-flex items-center">
				                  <input v-model="remember_me" id="remember_me" name="remember_me" type="checkbox" value="1" />
				                  <span class="ml-2"><a href="#">Se souvenir de moi</a></span>
				                </label>
						    </div>-->
	
						    <div class="pt-6 mb-9  text-center form-action  main-action">
						    	<button type="submit"><span v-if="!isPasswordForgot">Log in</span><span v-else>Envoyer</span></button>
						    </div>
							</div>
						     <div class="text-center cx-tools">
						    	<p @click="cxMode(true,'passwordForgot')" v-show="!isPasswordForgot">Mot de passe oublié ?</p>
						    	<p @click="cxMode(false,'login')" v-show="isPasswordForgot">Log in</p>
						    </div>
						</div>
				    </form>
			    </div>
			    
		    </div>
	    
    </div>
    
    
    
    
    
                
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'auth'
  ,
  mounted() {
	this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
  	//this.hideErreur();
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  showPassword:true,
	  isPasswordForgot:false,
	  submitUrl:'login',
	  username: '',
      password: '',
	  user:'',
	  id_user:'',
      username: '',
      password: '',
      passwordForgotSend:false,
      parametres:'',
    }
  },
  methods: {
	  checkSubmit: function() {
		  hideErreur();
		  disabledActions();
		  
		  if (this.isPasswordForgot) this.passwordForgot();
		  else this.login();
	  }
	  ,
	  passwordForgot: function() {	
		  var para = this.parametres;
		  this.tools_color_text = para.color_text;
		  this.tools_color_bg = para.color_bg;
		  axios.get(this.url_server + "/passwordForgot?username=" + this.username + "&color_text=" + para.color_text.replace('#','') + "&color_bg=" + para.color_bg.replace('#',''))
	       .then(response => {
		      this.cxMode(false,'login');
		      this.passwordForgotSend = true;
		      this.isPasswordForgot = true;
		      
		      //displayErreur(response.data.message);
		   })
	       .catch(error => {
		       enabledActions();
		       if (!error.response) {
		            displayErreur("Erreur réseau - appel API passwordForgot");
		        } else {
		            displayErreur(error.response.data.message);
		        }
	      })
    },
	  async login() {
		  
		  try {
	        await this.$auth.loginWith('local', {
	          data: {
	            username: this.username,
	            password: this.password
	          }
	        })
	        this.$router.push('/')
	      } catch (e) {
		      enabledActions();
		      if (!e.response) {
	            // network error
	            displayErreur("Erreur réseau - appel API login");
	        } else {
	            displayErreur(e.response.data.message);
	        }
	      }
    },
    cxMode: function(val,url)
    {
	    this.username = '';
	    this.password = '';
	    this.isPasswordForgot = val;
	    this.passwordForgotSend = false;
	    this.submitUrl = url;
	    enabledActions();
    }
    ,
    hideErreur: function()
    {
	    hideErreur();
    }
    ,
    initForm: function()
    {
	   enabledActions();
	   hideErreur();
    }
    
  }
}
</script> 

<style>

</style>
