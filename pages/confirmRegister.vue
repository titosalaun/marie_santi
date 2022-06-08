<template>
  <div class="container flex max-w-full min-h-screen w-full h-full p-6 md:p-0">
    
    <div class="form-login flex items-center justify-center w-full bg-mainBg">
	    
		    <div class="md:w-1/2 lg:w-96 w-full flex items-center justify-center flex-col bg-modalBg rounded-xl p-3 pt-6 pb-6 shadow-inputShadow">
			    <h1>Inscription</h1>
			    
			    
			    <div class="p-3 w-full">
					    <div  class="mb-4 bg-buttonBg text-white p-3 rounded-xl">
					    	<p v-show="isConfirmRegister">Votre compte est activé !</p>
					    	<p v-show="!isConfirmRegister">Activation du compte...</p>
					    	<p v-show="isConfirmRegisterFailed">Erreur lors de l'activation de votre compte</p>
					    </div>
					    
						    
						     <div class="mb-2 text-center cx-tools">
						    	<p><NuxtLink to="/login">Connexion</NuxtLink></p>
						    </div>
					    </div>
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
  	this.verifconfirmRegister();
  	this.hideErreur();
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  token:this.$route.query.token,
	  isConfirmRegister:false,
	  isConfirmRegisterFailed:false,
	  message_erreur_token:"Le jeton de réinitialisation de la confirmation de votre compte n'est pas valide ou a expiré.",
    }
  },
  methods: {
    verifconfirmRegister: function() {
			axios.get(this.url_server + "/verifConfirmRegister?token=" + this.token)
			.then(response => {
		       this.id_user = response.data.id_user;
		       if (this.id_user == 0) {
			       this.isConfirmRegisterFailed = true;
			       displayErreur(this.message_erreur_token);
		       }
		       else {
			       this.isConfirmRegister = true;
		       }
		   })
	       .catch(error => {
		       this.isConfirmRegisterFailed = true;
			   displayErreur(this.message_erreur_token);
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
