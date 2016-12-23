<template>
<img :src="data.avatar_url" />
<div><span>博客</span>{{data.blog}}</div>
<div><span>邮箱</span>{{data.email}}</div>
<div><span>follwering</span>{{data.following}}</div>
<div><span>start</span>{{data.public_repos}}</div>
<div><span>flowerer</span>{{data.followers}}</div>
</template>
<script>
export default {
	data() {
		var data = null;
		return {
			data: data
		}
	},
	ready() {
		var _this = this;
		$.ajax({
			url: 'https://api.github.com/users/PLDaily',
			async: false,
			dataType: 'jsonp',
			success: function(results){
				if(results && results.meta && results.meta.status == 200){
					_this.data = results.data;
				}else{
					console.log('加载失败');
				}
			}
		});
	}
}
</script>
<!-- <template>
<div>
    <slider :pages="someList" :sliderinit="sliderinit">
    slot
    </slider>
</div>
</template>
<script>
import slider from './Slidertest.vue'
export default {
     el: '#sliderbasicloop',
     data () {
        return {
            someList:[
                {
                    title: 'slide1',
                    src: "http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2390687452.jpg"
                },
                {
                    title: 'slide2',
                    src: "http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2405533771.jpg"
                },
                {
                    title: 'slide3',
                    src: "http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2404720316.jpg"
                }
            ],
            sliderinit: {
                width: 300,
                height: 420,
                imgCount: 3,
                dots: true,//是否显示轮番点
                button: true,//是否显示前进后退按钮
                currentPage: 0,//起始页
                changeTime: 5000,//时间间隔
                animateTime: 1000,
                autoplay:true//自动播放
            }
        }
    },
    components: {
        slider
    }
}
</script> -->