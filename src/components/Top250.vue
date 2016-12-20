<style type="text/css">
.in_theaters_title {
    width: 300px;
    height: 76px;
    float: left;
    border-radius: 4px;
    margin-left: 100px;
    cursor: pointer;
    overflow: hidden;
    font-size: 30px;
    color: white;
    text-align: center;
    line-height: 76px;
    margin-bottom: 8px;
}
.in_theaters_movies {
    width: 300px;
    height: 100px;
    float: left;
    border-radius: 4px;
    border: 1px solid;
    margin-top: 10px;
    cursor: pointer;
    overflow: hidden;
}
.movies_img {
    padding: 5px 0 5px 5px;
    width: 65px;
    box-sizing: border-box;
    height: 100px;
    float: left;
}
.movies_introduction {
    width: 235px;
    float: left;
    font-size: 12px;
    box-sizing: border-box;
    padding-left: 20px;
}
.movies_name {
    margin-top: 5px;
    width: 235px;
    height: 20px;
    color: blue;
    float: left;
    line-height: 20px;
    font-size: 16px;
}
.movies_director {
    width: 235px;
    margin-top: 10px;
    height: 15px;
    line-height: 15px;
    float: left;
}
.movies_actor {
    width: 235px;
    height: 15px;
    margin-top: 5px;
    line-height: 15px;
    float: left;
}
.movies_rating {
    width: 235px;
    height: 15px;
    margin-top: 5px;
    line-height: 15px;
    float: left;
}
</style>
<template>
<slider :data="slider_data" :defaults="slider_defaults"></slider>
<div class="in_theaters_title">
    <p>TOP250</p>
</div>
<div class="in_theaters_movies" v-for="movies in data.subjects" :style="this.$index % 2 == 0 || this.$index < 3 ? 'margin-left: 100px;' : ''">
    <img :src="movies.images.small" class="movies_img">
    <div class="movies_introduction">
        <div class="movies_name">
            <a href="#">{{movies.title}}</a>
        </div>
        <div class="movies_director">
            <span>导演: </span>
            <span v-for="director in movies.directors">
                {{director.name}}
            </span>
        </div>
         <div class="movies_actor">
            <span>主演: </span>
            <span v-for="actor in movies.casts" v-if="this.$index < 2">
                {{actor.name}}
            </span>
        </div>
        <div class="movies_rating">
            <span>评分: </span><span>{{movies.rating.average}}</span>
        </div>
    </div>
</div>
</template>
<script>
  import Slider from './Slider.vue'

  export default {
    components: { 'slider': Slider },
    data() {
        var slider_data;
        var data;
        var slider_defaults = {
            width:300,//设置轮播的宽度
            height:420,//设置轮播的高度
            speed:400,//设置轮播的速度
            delay:5000,//设置轮播的延迟时间
            imgCount:5,//设置轮播的图片数
            dots:true,//设置轮播的序号点
            autoPlay:true//设置轮播是否自动播放
        };
        return {
            slider_data: slider_data,
            slider_defaults: slider_defaults,
            data: data
        }
    },
    ready() {
        var _this = this;
        this.$http.jsonp('http://api.douban.com/v2/movie/top250',{'start':0, 'count': 5}).then(function(data) {
            _this.$set('slider_data', data.data);
        });
        this.$http.jsonp('http://api.douban.com/v2/movie/top250',{'start':0, 'count': 11}).then(function(data) {
            _this.$set('data', data.data);
        });

    }
  }
</script>