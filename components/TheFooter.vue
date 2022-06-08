<template>
 <footer class="fixed left-0 bottom-0 w-full z-50">
 
 <div @click='hideErreur()' class="alertBox w-full text-center inset-x-0 translate-y-full transform transition duration-200 ease-in-out p-4 absolute  left-0 bottom-0 cursor-pointer flex items-center justify-center flex-col" role="alert">
	 			  <div class="progress-alert"></div>
				  <span class="mes block text-sm sm:inline"></span>
				  <span class="absolute top-0 right-0">
				    <div class="flex justify-end">
					    <div @click='hideErreur()' class="cursor-pointer pt-1 pr-1">
						    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
				    </div>
				  </span>
				</div>
		    </div>
  
  
  </footer>
 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    hideErreur: function()
    {
	    hideErreur();
    }
  }
}
</script>

