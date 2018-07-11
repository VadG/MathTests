<template>
    <div class="tests container">
        <div class="row">
            <div class="col-lg-4 offset-lg-4  text-center">
                <h1>My Training</h1>
            </div>
            <div class="col-lg-4">
                <nav class="nav justify-content-center justify-content-lg-end" v-if="gameStatistic.name">
                    <a class="nav-link" href="#" @click.prevent="goToPlay">Play</a>
                    <a class="nav-link" href="#" @click.prevent="goToStatistic">Statistic</a>
                    <a class="nav-link disabled" href="#">{{gameStatistic.name}}</a>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="progressStyles"></div>
                </div>
            </div>
        </div>
        <transition name="flip" mode="out-in">
            <app-create-user v-if="state == 'newUserCreate'" 
                             @newUserName='createNewGameHistory'>
           </app-create-user>
            <app-start-screen v-else-if="state == 'start'" 
                              @onStart="onStart">
            </app-start-screen>
            <app-question v-else-if="state == 'question'" 
                          @success="onQuestionSuccess" 
                          @error="onQuestionError" 
                          :settings="levels[gameStatistic.currentLvl]">
            </app-question>
            <app-message v-else-if="state == 'message'" 
                         :type="messages.type" 
                         :text="messages.text" 
                         @onNext='onNext'>
            </app-message>
            <app-result-screen v-else-if="state == 'results'" 
                               :results="stats" 
                               :currenLvl="gameStatistic.currentLvl+1" 
                               :allLvls='levels.length' 
                               :isAllCorrect='isAllCorrect' 
                               @onRepeat="onStart" 
                               @onNextLvl="onNextLvl">
            </app-result-screen>
            <app-statistic-screen v-else-if="state == 'statistic'" 
                                  :gameStatistic='gameStatistic' 
                                  :allLvls='levels.length' 
                                  @clearStatistic="onClearStatistic" 
                                  @userNameUpdate="onUserNameUpdate">
            </app-statistic-screen>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'app',
  created(){
      if (!this.isGameHistory()) {
        this.state = 'newUserCreate'
      }
      else{
        this.getGameHistory();
      }
  },
  data :() =>({
    state:'start',
    gameStatistic:{},
    messages:{
    	type:'',
    	text:''
    },
    stats:{
    	success:0,
    	error:0
    },
    levels:[
	    { variants:3,
	    	from:10,
	    	to:20,
	    	range:2,
	    	maxQuestions:3,
        answerTime:15,
        operators:['+']
	    },
       { variants:3,
        from:10,
        to:20,
        range:2,
        maxQuestions:3,
        answerTime:15,
        operators:['-']
      },
       { variants:3,
        from:10,
        to:20,
        range:2,
        maxQuestions:3,
        answerTime:12,
        operators:['+','-']
      },
	     {variants:4,
	    	from:20,
	    	to:80,
	    	range:20,
	    	maxQuestions:4,
        answerTime:12,
        operators:['+','-']
	    },
       { variants:3,
        from:1,
        to:10,
        range:2,
        maxQuestions:3,
        answerTime:12,
        operators:['*']
      },
      { variants:3,
        from:1,
        to:20,
        range:2,
        maxQuestions:3,
        answerTime:12,
        operators:['/']
      },
      { variants:3,
        from:1,
        to:20,
        range:2,
        maxQuestions:4,
        answerTime:10,
        operators:['/','*']
      },
	    { variants:5,
	    	from:100,
	    	to:200,
	    	range:25,
	    	maxQuestions:5,
        answerTime:10,
        operators:['+','-']
	    },
      { variants:4,
        from:1,
        to:30,
        range:25,
        maxQuestions:5,
        answerTime:10,
        operators:['/','*']
      },
       { variants:6,
        from:300,
        to:500,
        range:30,
        maxQuestions:6,
        answerTime:10,
        operators:['+','-']
      },
      { variants:5,
        from:10,
        to:50,
        range:25,
        maxQuestions:5,
        answerTime:12,
        operators:['/','*']
      },
      { variants:8,
        from:500,
        to:900,
        range:40,
        maxQuestions:7,
        answerTime:8,
        operators:['+','-']
      },
      { variants:4,
        from:20,
        to:100,
        range:25,
        maxQuestions:8,
        answerTime:8,
        operators:['/','*','+','-']
      }
    ]
      
  }),
  computed:{
    currentLvl(){
      return this.gameStatistic.currentLvl;
    },
  	testsComplete(){
  		return this.stats.success + this.stats.error;
  	},
  	questionsInLvl(){
      try{
    		return this.levels[this.gameStatistic.currentLvl].maxQuestions
      }
      catch(e){

      }
  	},
  	progressStyles(){
  		return {
  			width : `${this.testsComplete/this.questionsInLvl * 100}%`
  		}
  	},
  	isAllCorrect(){
  		return this.stats.error == 0;
  	},
    isAllLvlsComplete(){
      return !(this.gameStatistic.currentLvl < this.levels.length-1);
    }
  },
  methods:{
    isGameHistory(){
      return !!localStorage.getItem('gameHistory')
    },
    updateGameHistory(){
       localStorage.setItem('gameHistory', JSON.stringify(this.gameStatistic));
    },
    getGameHistory(){
      this.gameStatistic = JSON.parse(localStorage.getItem('gameHistory'))
    },
    createNewGameHistory(userName){
      let historyObject = { 
            name: userName, 
            currentLvl: 0, 
            questionsCount: 0,
            wrongAnswers:0
          };
      localStorage.setItem('gameHistory', JSON.stringify(historyObject));
      this.getGameHistory();
      this.state = 'start'
    },
    goToPlay(){
      if (this.state !== 'question' & this.state !== 'message') {
        this.state='start';
      }
    },
    goToStatistic(){
      if (this.state !== 'question' & this.state !== 'message') {
        this.clearProgressBar();
        this.state='statistic';
      }
    },
  	onStart(){
      this.gameStatistic.questionsCount += (this.stats.success + this.stats.error);
      this.gameStatistic.wrongAnswers += this.stats.error;
      this.updateGameHistory();
      this.getGameHistory();
  		this.state = 'question';
      this.resetStats();
  	},
  	onQuestionSuccess(){
  		this.messages.type = 'success';
  		this.messages.text = 'Good Job!';
  		this.state = 'message'
  		this.stats.success++
  	},
  	onQuestionError(errorText){
  		this.messages.type = 'warning';
  		this.messages.text =`Wrong answer! ${errorText}`;
  		this.state = 'message'
  		this.stats.error++
  	},
  	onNext(){
  		if (this.testsComplete < this.questionsInLvl) {
  			 this.state = 'question';
  		}
   		else{
   			this.state = 'results';
   		}
  	},
  	onNextLvl(){
  		if (!this.isAllLvlsComplete) {
        this.gameStatistic.questionsCount += (this.stats.success + this.stats.error);
  			this.gameStatistic.currentLvl++;
        this.updateGameHistory();
        this.getGameHistory();
  			this.onStart();
  		}
      else{
        this.goToStatistic();
      }
  	},
    onClearStatistic(){
       let historyObject = { 
            name: this.gameStatistic.name, 
            currentLvl: 0, 
            questionsCount: 0,
            wrongAnswers:0
          };
      localStorage.setItem('gameHistory', JSON.stringify(historyObject));
      this.getGameHistory();
    },
    onUserNameUpdate(name){
       let historyObject = { ...this.gameStatistic,name};
      localStorage.setItem('gameHistory', JSON.stringify(historyObject));
      this.getGameHistory();

    },
    resetStats(){
      this.stats.success = 0;
      this.stats.error = 0;
    },
    clearProgressBar(){
    this.resetStats();
    }
  }
     
};
</script>

<style >
 .tests{
  perspective: 1000px;
 }
 
 
.progress-bar{
	transition: width 0.5s;
}
 //Animations
 .flip-enter{

 }
 .flip-enter-active{
 	transform-style: preserve-3d;
 	animation: flipInX 0.3s linear;
 }
 .flip-enter-to{
 	
 }
 .flip-leave{
 	
 }
  .flip-leave-active{
  	transform-style: preserve-3d;
 	animation: flipOutX 0.3s linear;
 }
  .flip-leave-to{
 	
 }
 @keyframes flipInX{
 	from{
 		transform: rotateX(90deg);
 	}
 	to{
 		transform: rotateX(0deg);
 	}
 }
 @keyframes flipOutX{
 	from{
 		transform: rotateX(0deg);
 	}
 	to{
 		transform: rotateX(90deg);
 	}
 }
</style>
