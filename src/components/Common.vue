<style type="text/css">
.in_theaters_content {
    overflow: hidden;
}
.in_theaters_title {
    width: 300px;
    height: 76px;
    float: left;
    border-radius: 4px;
    margin-left: 70px;
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
.in_theaters_movies_link {
    width: 100%;
    height: 100%;
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
.loadMore {
    cursor: pointer;
    width: 676px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    font-size: 20px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid;
    text-align: center;
}
.loadMore:hover {
    background-color: #DBD8CB;
}
</style>
<template>
<div class="in_theaters_content">
    <slider :data="sliderdata" :defaults="slider_defaults"></slider>

    <div class="in_theaters_title">
        <p>{{title}}</p>
    </div>
    <div class="in_theaters_movies" v-for="movies in data" :style="this.$index % 2 == 0 || this.$index < 3 ? 'margin-left: 70px;' : ''">
        <a class="in_theaters_movies_link" v-link="{name: '/', params: {moviesId: movies.id}}">
            <img :src="movies.images.small" class="movies_img">
            <div class="movies_introduction">
                <div class="movies_name">
                    <span>{{movies.title}}</span>
                </div>
                <div class="movies_director">
                    <span>导演: </span>
                    <span v-for="director in movies.directors">
                        {{director.name}}
                    </span>
                </div>
                 <div class="movies_actor">
                    <span>主演: </span>
                    <span v-for="actor in movies.casts | limitBy 2">
                        {{actor.name}}
                    </span>
                </div>
                <div class="movies_rating">
                    <span>评分: </span><span>{{movies.rating.average | toFixOne}}</span>
                </div>
            </div>
        </a>
    </div>
</div>

<div class="loadMore" @click="loadMore()" v-show="isshowloadmore">
    <p>{{loadMoreText}}</p>
</div>
</template>
<script>
  import Slider from './Slider.vue'

  export default {
    props: ['sliderdata', 'data', 'title'],
    components: { 'slider': Slider },
    data() {
        var count;
        var isshowloadmore = true;
        var sliderdata;
        var loadMoreText = '加载更多';
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
            isshowloadmore: isshowloadmore,
            loadMoreText: loadMoreText,
            sliderdata: sliderdata,
            count: count,
            slider_defaults: slider_defaults
        }
    },
    filters: {
        toFixOne(value) {
            return value.toFixed(1);
        }
    },
    methods: {
        loadMore(value) {
            this.loadMoreText = '正在加载中...';
            this.$dispatch('loadMore');
        }
    },
    events: {
        loadMoreText(value) {
            this.isshowloadmore = value;
            this.loadMoreText = '加载更多';
        }
    }
  }

</script>