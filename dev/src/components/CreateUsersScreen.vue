<template>
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-secondary">
                <h3>Hello {{user}}</h3>
                <div class="form-group">
                    <label for="name">Let's get in touch</label>
                    <input type="text" class="form-control" v-model="userName" placeholder="Enter your name">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your name with anyone else.</small>
                    <button type="button" class="btn btn-success" @click="saveUserName">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
 export default {
   data : ()=>({
   userName:''
  }),
   computed:{
    user(){
      return this.userName==''?'new User':this.userName;
    }
   },
   methods:{
     saveUserName(){
      if (this.userName) {
        this.$emit('newUserName',this.userName);
      }
    }
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
