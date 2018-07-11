import Vue from 'vue'
import App from './App.vue'
import AppMessage from './components/Message.vue'
import AppStartScreeen from './components/StartScreen.vue'
import AppCreateUser from './components/CreateUsersScreen.vue'
import AppQuestion from './components/Question.vue'
import AppResultScreen from './components/ResultScreen.vue'
import AppStatisticScreen from './components/Statistic.vue'
import RadialProgressBar from './components/RadialProgressBar.vue'
Vue.component('AppMessage',AppMessage);
Vue.component('AppStartScreen',AppStartScreeen);
Vue.component('AppQuestion',AppQuestion);
Vue.component('AppResultScreen',AppResultScreen);
Vue.component('AppStatisticScreen',AppStatisticScreen);
Vue.component('RadialProgressBar',RadialProgressBar);
Vue.component('AppCreateUser',AppCreateUser);

new Vue({
  el: '#app',
  render: h => h(App)
})
