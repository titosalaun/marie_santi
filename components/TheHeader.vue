<template>
  <header v-show="isAuthenticated">
	  
	  <nav>
		  <ul>
			  <li><nuxt-link to="/galerie" exact class="nav-link">Galerie</nuxt-link></li>
			  <li>Infos</li>
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


