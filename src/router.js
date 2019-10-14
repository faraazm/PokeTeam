import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PokemonTeam from './views/PokemonTeam';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/team',
      name: 'team',
      component: PokemonTeam
    }
  ]
})