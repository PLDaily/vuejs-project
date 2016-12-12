import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Intrudaction from './components/Intrudaction.vue'
import Favorite from './components/Favorite.vue'
import Author from './components/Author.vue'
import Aboutme from './components/Aboutme.vue'
require('jquery')


Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

//链接使用v-link.例: v-link="'/author'"
var Home = Vue.extend({
	data() {
		return {
			data: data//全局定义的data写入到vue的data中使用
		}
	},
	template: "<div v-for='item in data.list'>\
					<component :is='item.module' :list='item'></component>\
				</div>",
	components: {
		'intrudaction': Intrudaction,
		'favorite': Favorite,
		"aboutme": Aboutme
	}
});

var App = Vue.extend({
	template: '<div id="main">\
					<router-view></router-view>\
				</div>'
});

router.map({
  	'/home': {
    	component: Home  
  	},
  	'/author': {
  		component: Author
  	}
})

router.redirect({
  	'*': '/home'
})

//表示所有路由下均有App组件，在App组件内扩展
router.start(App, "app");
