<template>
  <div class="row">
    <div class="col-md-12"> 
       <div class="alert alert-secondary">
       	<h3>Are You Ready?</h3>
       	<button class="btn btn-success" @click = "$emit('onStart')">Start !</button>
       </div>
    </div>
  </div>
</template>

<script>
 export default {
   data : ()=>({
   
  }),
   computed:{
    
   }
};
</script>

<style>
  .alert{
  	text-align: center;
  }
  h3, .btn{
  	margin: 20px 0;
  }
</style>
