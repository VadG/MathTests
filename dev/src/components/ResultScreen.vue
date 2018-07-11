<template>
	<div class="row">
	  <div class="col-md-12">
	     <div class="alert alert-info">
		   	<h4 class="alert-heading">Your results</h4>
		   	<p>Уровень: <strong>{{`${currenLvl} из ${allLvls}`}}</strong></p>
		   	<p>Всего вопросов: <strong>{{results.success+results.error}}</strong></p>
		   	<p>Верных ответов: <strong>{{results.success}}</strong></p>
		   	<p>Ошибки: <strong>{{results.error}}</strong></p>
		   	<button class="btn btn-success" @click = "$emit('onRepeat')">Repeat!</button>
		   	<button class="btn btn-success" @click = "$emit('onNextLvl')" :disabled="isAllCorrect == false">Next Level!</button>
	     </div>
  	 </div>
   </div>
</template>

<script>
 export default {
 	props:{
 		results:Object,
 		isAllCorrect:Boolean,
 		allLvls:Number,
 		currenLvl:Number
 	},
	  data : ()=>({
	   
	  })
};
</script>

<style>
  
</style>
