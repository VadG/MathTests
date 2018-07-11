<template>
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-info">
                <transition name="flip" mode="out-in">
                    <div v-if="state!=='changeUserName'" :key="1">
                        <h4 class="alert-heading">Your statistic</h4>
                        <p>Current level: <strong>{{gameStatistic.currentLvl+1}}/{{allLvls}}</strong></p>
                        <p>Total answers: <strong>{{gameStatistic.questionsCount}}</strong></p>
                        <p>Correct answers: <strong>{{gameStatistic.questionsCount- gameStatistic.wrongAnswers}}</strong></p>
                        <p>Wrong Answers: <strong>{{gameStatistic.wrongAnswers}}</strong></p>
                        <button class="btn btn-success" @click="$emit('clearStatistic')">Reset statistic</button>
                        <button class="btn btn-success" @click="state='changeUserName'">Change UserName</button>
                    </div>
                    <div v-else :key="2">
                        <h4 class="alert-heading">Change your UserName</h4>
                        <div class="form-group">
                            <input type="text" 
                                   class="form-control" 
                                   :value="gameStatistic.name" 
                                   ref="nameInput" 
                                   placeholder="New UserName">
                            <button class="btn btn-success" @click="setUserName">Save</button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
 export default {
  props:{
     gameStatistic:Object,
     allLvls:Number
  },
  data : ()=>({
    state: 'statisticScreen'
  }),
  computed:{

  },
  methods:{
    updatNewUserName({target}){
      this.newUserName = target.value;
    },
    setUserName(){
      this.$emit('userNameUpdate',this.$refs.nameInput.value);
      this.state='statisticScreen';

    }
  },
  mounted(){
   
  }
};
  
</script>
    
<style>
 /*.question-header{
  text-align: center;
 }*/ 
 .answer-btn{
  margin: 0px auto;
  min-width: 43px;
 }
</style>
