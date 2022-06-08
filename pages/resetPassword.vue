<template>
  <div class="container flex max-w-full w-full h-full p-6 md:p-0">
    
    <div class="form-login flex items-center justify-center w-full bg-mainBg">
	    
		     <div class="form-login-content md:w-1/2 lg:w-96 w-full flex items-center justify-center flex-col bg-mainBg p-3 md:p-6  border border-mainColor">
			    <h1>Réinitialisez votre mot de passe</h1>
			    
			    
			    <div class="p-3 w-full">
				    <form method="post" @submit.prevent="submit">
					    
					     <div v-show="!TokenVerif" class="bg-buttonBg text-mainColor p-3 rounded-xl">
					    	Le jeton de réinitialisation du mot de passe n'est pas valide ou a expiré.
					    </div>

					    <div v-show='isTokenVerif' >
						    <div class="mb-6 relative">
							    <div>
								    <input :type="showPassword ? 'password' : 'text'" placeholder="Mot de passe"  name="password" id="password" v-model="password" class="form-input"  type="password" @focus="initForm()" />
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
						    
						    <div class="relative">
							    <div><input :type="showPasswordConfirm ? 'password' : 'text'" placeholder="Confirmer le mot de passe"  name="password_confirm" id="password_confirm" v-model="password_confirm" class="form-input"  type="password" @focus="initForm()" />
								    
								    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
										    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mini" @click="showPasswordConfirm = !showPasswordConfirm" :class="{'hidden': !showPasswordConfirm, 'block':showPasswordConfirm }">
										  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
										  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
										</svg>
										
										<svg xmlns="http://www.w3.org/2000/svg" class="mini"  :class="{'block': !showPasswordConfirm, 'hidden':showPasswordConfirm }" @click="showPasswordConfirm = !showPasswordConfirm" viewBox="0 0 20 20" fill="currentColor">
										  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
										  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
										</svg>
									</div>
									    
							    </div>
						    </div>
	
						    <div class="pt-6 mb-4  text-center form-action main-action">
						    	<button type="submit">Envoyer</button>
						    </div>
						</div>
					    
					    <div :class="{'mt-2': !isTokenVerif }" class="mb-2 text-center cx-tools" v-show="!isTokenVerif">
					    	<p ><NuxtLink to="/login">Log in</NuxtLink></p>
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
  layout: 'auth',
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  showPassword:true,
	  showPasswordConfirm:true,
	  token:this.$route.query.token,
	  password_confirm: '',
      password: '',
	  id_user:0,
	  isTokenVerif:false,
	  TokenVerif:true,
    }
  },
  mounted() {
  	this.verifPasswordForgot();
  	this.hideErreur();
  },
  methods: {
	  verifPasswordForgot: function() {
			axios.get(this.url_server + "/verifPasswordForgot?token=" + this.token)
			.then(response => {
		       this.id_user = response.data.id_user;
		       if (this.id_user == 0) {
			       this.TokenVerif = false;
		       }
		       else {
			       this.isTokenVerif = true;
		       }
		   })
	       .catch(error => {
			   this.TokenVerif = false;
	      })
	  }
	  ,
	  submit: function() {
		  hideErreur();
		  
		  
		  var erreur = '';
		  let data = {
			id_user: this.id_user,
			password: this.password,
	      };
	      
	      if (this.password == '') {
		      erreur = "Please choose a password"
	      }
	      else {
		      if (this.password != this.password_confirm) erreur = "The confirmed password is different from the entered password";
	      }

			if(erreur != '') {
				displayErreur(erreur);
			}
			else {
				disabledActions();
				const timeoutObj = setTimeout(() => {
				  axios.post(this.url_server + "/updatePassword", data)
				   .then(response => {
					   this.id_user = response.data.id_user;
					   if (response.data.message == '') this.$router.push('/login');
					   else {
						   enabledActions();
						   displayErreur(response.data.message)
						}
				   }
				   )
			       .catch(error => {
				       enabledActions();
				       displayErreur("Error updating your password")
				   }
				   )
				}, 1500);
				
			}
	}
	,
    hideErreur: function()
    {
	    enabledActions();
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
