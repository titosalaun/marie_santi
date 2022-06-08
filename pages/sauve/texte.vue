<template>
  <div class="container h-full flex items-center min-h-screen">
	  <div class="content h-full">
		<div class="flex justify-center flex-col textTest w-2/3">
			
			<h1 style="font-size:26px" class="mb-9">Virginie Despentes, autrice</h1>
<h2  style="font-size:18px" class="mb-9">«J’aimerais que tous les ­écrivains obtiennent la ­possibilité de dénoncer leur contrat»</h2>

<p  :style="cssFont" class="mb-6">«On ne sait pas encore quelles maisons d’édition vont être rachetées, quelles seront les conséquences sur les lignes éditoriales et les personnes en place. Et on ignore même si Vincent Bolloré aura les mains libres pour aller jusqu’au bout de la constitution de son mastodonte. J’aimerais que tous les écrivains obtiennent la ­possibilité de dénoncer leur contrat dès lors qu’il y a un changement d’actionnaire et le livre est complètement remboursé. Aujour­d’hui, on récupère nos droits soixante-dix ans après notre mort ! C’est ubuesque. On est les seuls en Europe à avoir des contrats qui nous obligent autant.</p>

<p :style="cssFont">«C’est très facile de faire disparaître des auteurs. Si Bolloré place un type d’extrême droite à la tête des maisons d’édition qu’il rachète, tout ce qu’on a écrit précédemment appartient à Vincent Bolloré. Et une partie du catalogue peut être effacée par pure idéologie : les études de genre, les essais féministes, antiracistes, la philo… Voir des livres ­enterrés vivants, c’est une idée insupportable. On a une carte à jouer pour obtenir un changement législatif et que nos contrats soient alignés sur ceux de nos collègues européens.»</p>
			
			
		</div>

	  </div>
	  
	  <div class="tools">
		    <div>
			    <label>Font size : {{font_size}}px</label>
			    <input class="slider" type="range" @input="updateMvt()" id="font_size" min="10" max="200" v-model="font_size" />
		    </div>
	    </div>
	    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	computed: {
    cssFont() {
      return {
        '--style_font_size': this.font_size + 'px',
        '--style_line_height': (parseInt(this.font_size) + 3) + 'px',
      }
    }
  },
	mounted() {   
	 
	},
	data() {
	    return {
		  tito:'',
		  font_size:14,
		  line_height:17,
		  isLoadPage:false,
	    }
	  },
	methods: {
		updateMvt() {
	    }
	}
})
</script>

<style scoped>
	.textTest  p {
	    font-size: var(--style_font_size);
	    line-height: var(--style_line_height);
	}

</style>
