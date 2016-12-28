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
    <slider :pages="slider_data" :sliderinit="sliderinit">
    </slider>

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
                    <span v-for="actor in movies.casts" v-if="this.$index < 2">
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
    props: ['url', 'title'],
    components: { 'slider': Slider },
    data() {
        var count;//加载的影片数
        var data;//影片数据
        var isshowloadmore = true;//是否显示更多加载
        var slider_data;//轮转图影片数据
        var loadMoreText = '加载更多';//底部显示内容
        var isSend = false;//防止多次点击提交
        var sliderinit = {
            width: 300,
            height: 420,
            imgCount: 5,
            dots: true,
            button: true,
            currentPage: 0,
            changeTime: 5000,
            animateTime: 1000,
            autoplay:true
        };
        return {
            data: data,
            isshowloadmore: isshowloadmore,
            loadMoreText: loadMoreText,
            slider_data: slider_data,
            count: count,
            sliderinit: sliderinit
        }
    },
    filters: {
        toFixOne(value) {
            if(!isNaN(value)) {
                return value.toFixed(1);
            }
            return value;
        }
    },
    methods: {
        loadMore() {
            if(!this.isSend) {
                var _this = this;
                this.loadMoreText = '正在加载中...';
                this.isSend = true;
                this.$http.jsonp('http://api.douban.com/v2/movie/' + this.url, {'start':this.count, 'count': 10}).then(function(data) {
                    var subjects = data.data.subjects;
                    _this.$set('data', Array.prototype.concat(_this.data, subjects));
                    if(subjects.length < 10) {
                        _this.isshowloadmore = false;
                    }else {
                        _this.loadMoreText = '加载更多';
                        _this.isshowloadmore = true;
                        _this.isSend = false;
                    }
                });
                this.count = this.count + 10;
            }
        }
    },
    ready() {
        var _this = this;
        this.count = 11;
        this.$http.jsonp('http://api.douban.com/v2/movie/' + this.url,{'start':0, 'count': 5}).then(function(data) {
            _this.$set('slider_data', data.data.subjects);
        });
        this.$http.jsonp('http://api.douban.com/v2/movie/' + this.url,{'start':5, 'count': 6}).then(function(data) {
            _this.$set('data', Array.prototype.concat(_this.slider_data, data.data.subjects));
        });
    }
  }

</script>