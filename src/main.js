import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

//链接使用v-link.例: v-link="'/author'"
var Home = Vue.extend({
	template: "<div>首页</div><a v-link='\"/author\"'>关于作者</a>"
});

var Author = Vue.extend({
	template: "<div>作者</div><a v-link='\"/home\"'>回到首页</a>"
})

var App = Vue.extend({
	template: '<div>asasasa</div><div>\
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

//表示所有路由下均有App组件
router.start(App, "app");
