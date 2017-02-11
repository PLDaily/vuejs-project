import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Intheaters from './components/Intheaters.vue'
import Comingsoon from './components/Comingsoon.vue'
import Top250 from './components/Top250.vue'
import Weekly from './components/Weekly.vue'
import Usbox from './components/Usbox.vue'
import Newmovies from './components/Newmovies.vue'
import App from './components/App.vue'
import Introduction from './components/Introduction.vue'
import Search from './components/Search.vue'
require('./css/reset.css')


Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  	saveScrollPosition: true
})

//链接使用v-link.例: v-link="'/author'"


router.map({
  	'/in_theaters': {
    	component: Intheaters  
  	},
  	'/coming_soon': {
    	component: Comingsoon  
  	},
  	'/top250': {
    	component: Top250  
  	},
  	'/weekly': {
    	component: Weekly  
  	},
  	'/us-box': {
    	component: Usbox  
  	},
  	'/new-movies': {
    	component: Newmovies  
  	},
    '/:moviesId': {
      name: '/',
      component: Introduction
    },
    '/search': {
      component: Search
    }
})

router.redirect({
  	'*': '/in_theaters'
})

//表示所有路由下均有App组件，在App组件内扩展
router.start(App, "app");
