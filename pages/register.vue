<template>
  <div class="container flex max-w-full min-h-screen w-full h-full p-6 md:p-0">
    
    <div class="form-login flex items-center justify-center w-full bg-mainBg">
	    
		    <div class="md:w-1/2 lg:w-96 w-full flex items-center justify-center flex-col bg-modalBg rounded-xl p-3 pt-6 pb-6 shadow-inputShadow">
			    <h1>Inscription</h1>
			    
			    
			    <div class="p-3 w-full">
				    <form method="post" @submit.prevent="submit">
					    <div v-show="isConfirmRegister" class="mb-2 bg-buttonBg text-white p-3 rounded-xl">
					    	Afin de valider votre compte, merci de suivre les instructions de l'e-mail que nous venons de vous envoyer.
					    </div>
					    <div v-show="!isConfirmRegister">
						    <div class="mb-2">
							    <div><input class="required_field" placeholder="Nom" name="last_name" id="last_name" v-model="last_name" type="text" @focus="hideErreur()" /></div>
						    </div>
	
							<div class="mb-2">
							    <div><input placeholder="Prénom" name="first_name" id="first_name" v-model="first_name" type="text" @focus="hideErreur()" /></div>
						    </div>
	
	
						    <div class="mb-2">
							    <div><input class="required_field" placeholder="E-mail" name="username" id="email" v-model="email" type="email" @focus="hideErreur()" /></div>
						    </div>
						    
						    <div class="mb-2 relative">
								    <div>
									    <input class="required_field"  :type="showPassword ? 'password' : 'text'" placeholder="Mot de passe"  name="password" id="password" v-model="password" type="password" @focus="hideErreur()" />
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
							    
							    <div class="mb-2 relative">
								    <div><input class="required_field" :type="showPasswordConfirm ? 'password' : 'text'" placeholder="Confirmer le mot de passe"  name="password_confirm" id="password_confirm" v-model="password_confirm" type="password" @focus="hideErreur()" />
									    
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
							    
							<div class="mb-4 relative">
							    <div><input class="required_field" placeholder="Token dropbox"  name="token_dropbox" id="token_dropbox" v-model="token_dropbox" type="text" @focus="hideErreur()" />
									    
								    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
										    <svg xmlns="http://www.w3.org/2000/svg" class="mini" viewBox="0 0 20 20" fill="currentColor">
										  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
										</svg>
									</div>
									    
							    </div>
						    </div>
	
						    <div class="pt-2 mb-4  text-center form-action">
						    	<button type="submit">Valider</button>
						    </div>
						    
						     <div class="mb-2 text-center cx-tools">
						    	<p><NuxtLink to="/login">Connexion</NuxtLink></p>
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
  layout: 'edit',
  mounted() {
  	//this.hideErreur();
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  showPassword:true,
	  showPasswordConfirm:true,
	  submitUrl:'login',
	  last_name: '',
      first_name: '',
	  email:'',
	  password:'',
      password_confirm: '',
      token_dropbox: '',
      isConfirmRegister:false,
    }
  },
  methods: {
    submit() {
	   var message = '';
	   this.hideErreur();
	   clearRequired();

	   let data = {
		last_name: this.last_name,
        first_name: this.first_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
        token_dropbox: this.token_dropbox,
      };

      var elems = document.querySelectorAll(".required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) el.classList.add("required");
		});
		
		if(!checkRequired()) {
			if (this.password != this.password_confirm) {
				message = "Le mot de passe confirmé est différent du mot de passe saisi";
				document.getElementById("password").classList.add("required");
				document.getElementById("password_confirm").classList.add("required");
			}
		}
		else {
			message = "Les champs en rouge sont nécessaires";
		}

		if(message != '') {
			displayErreur(message);
		}
		else {
			disabledActions();
			const timeoutObj = setTimeout(() => {
			  axios.post(this.url_server + "/register", data)
			   .then(response => {
				   this.id_user = response.data.id_user;
				   this.isConfirmRegister = true;
			   })
			   .catch(error => {
					  var message = "Erreur lors de la création du compte";
			       if (error.response) message = error.response.data.message;
			       this.isConfirmRegister = false;
			       enabledActions();
			       displayErreur(message)
				  })
			}, 1500);
			
		}
       
    },
     verifToken: function() {	
		  axios.get(this.url_server + "/verifTokenDropbox?token=fDybKBCEnLoAAAAAAAAAASuY09Tyn_ykB9lCtJWdDBZheUXgB6hC_-xY2_jeoiiI")
	       .then(response => {
		      displayErreur("token OK");
		   })
	       .catch(error => {
		       displayErreur("token KO :  " + error.response.data.message);
	      })
    }
    ,
    hideErreur: function()
    {
	    hideErreur();
    }
    
  }
}
</script> 

<style>

</style>
