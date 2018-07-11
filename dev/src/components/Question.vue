<template>
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-info question-block">
                <div class="row justify-content-center">
                    <radial-progress-bar :diameter="150" 
                                         :total-steps="totalSteps" 
                                         :completed-steps="completedSteps" 
                                         :animate-speed="1100" 
                                         :stroke-width="10" 
                                         start-color="#bbff42" 
                                         stop-color="#429321" 
                                         inner-stroke-color="#323232" 
                                         timing-func="linear">
                        <div class="countDownText"><span>{{ totalSteps-completedSteps+1 }}</span>
                            <br><span>Left</span></div>
                    </radial-progress-bar>
                </div>
                <div class="row">
                    <div class="question-header col-sm-12">
                        <h3 class="">{{x}} {{operator}} {{y}} = ?</h3>
                    </div>
                    <div class="btn-toolbar col-md-4 offset-md-4 justify-content-around">
                        <button class="btn btn-success answer-btn" 
                                v-for="answer in answers"
                                :key="answer" 
                                @click='onAnswer(answer)'>
                            {{answer}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 export default {
  props:{
    settings:Object
  },
  data : ()=>({
    completedSteps: 0,
    intervalHandle:Object 
  }),
  computed:{
    x(){
      if (this.isDevide) {
        return this.y * Math.abs(
            this.generateRand(
              ((this.settings.to - this.y)-10),
              ((this.settings.to - this.y)+10),
              true));
      }
      else{
        return this.generateRand(this.settings.from,this.settings.to,false);
      }
    },
    y(){
      return this.generateRand(this.settings.from,this.settings.to,false);
    },
    operator(){
      let randomIndex = Math.floor(Math.random() * this.settings.operators.length);
      return this.settings.operators[randomIndex];
    },
    isDevide(){
      return this.operator == '/';
    },
    totalSteps(){
      return this.settings.answerTime-1;
    },
  	 good(){
  	 	return eval(`${this.x} ${this.operator} ${this.y}`);
  	 },
  	 answers(){
      let range = this.isDevide?10:20;
  		let res = [this.good];
  		while(res.length < this.settings.maxQuestions){
  			let num = this.generateRand((this.good-range),(this.good+range), this.isDevide);
  			if (res.indexOf(num) == -1) {
  				res.push(num)
  			}
  		}
  		return res.sort(()=> Math.random() > 0.5);
  	}
  },
  methods:{
  	onAnswer(num){
      clearInterval(this.intervalHandle);
  		if(num == this.good){
  			this.$emit('success');
  		}
  		else{
  			this.$emit('error', `${this.x} ${this.operator} ${this.y} = ${this.good}`)
  		}
  	},
    generateRand(min,max,isAbs){
      const diff = max-min;
      let number = Math.floor(Math.random()*(diff+1)) + min;
      if (isAbs) {
        return Math.abs(number)
      }
      else{
        return number;
      }    
    },
    startCountDown(){
         this.intervalHandle = setInterval(()=>{
           if(this.completedSteps == this.totalSteps){
            clearInterval(this.intervalHandle);
            this.$emit('error', `${this.x} + ${this.y} = ${this.good}`)
            } 
            else{ 
              this.completedSteps++; 
            }
        },1000);
    }  
  },
  mounted(){
    this.startCountDown();
  }
};
  
</script>
    
<style>
 .countDownText{
  font-size: 25px;
 }
 .answer-btn{
  min-width: 43px;
 }
</style>
