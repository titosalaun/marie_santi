<template>
  <header v-show="isAuthenticated">
	  
	  <nav>
		  <ul>
			  <li><nuxt-link to="/typotheque" exact class="nav-link">Typothèque</nuxt-link></li>
			  <li><nuxt-link to="/galerie" exact class="nav-link">Galerie</nuxt-link></li>
			  <li><nuxt-link to="/information" exact class="nav-link">Informations</nuxt-link></li>
		  </ul>
	  </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
	    isAdmin:'',
	}
  }
  ,
  methods: {
    
  }
}
</script>


