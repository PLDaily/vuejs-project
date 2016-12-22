<style type="text/css">
.introdution_content {
    overflow: hidden;
}
.introdution_movies_img {
    float: left;
    width: 300px;
    height: 420px;
}
.introdution_title {
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
.intrduction_people {
    width: 300px;
    float: left;
    border-radius: 4px;
    margin-left: 70px;
    text-align: left;
}
.intrduction_people div {
    margin-bottom: 25px;
}
</style>
<template>
<div class="introdution_content">
    <div class="introdution_movies_img">
        <img :src="introduction.images.large">
    </div>
    <div class="introdution_title">
        <p>{{introduction.title}}</p>
    </div>
    <div class="intrduction_people">
         <div class="introduction_movies_director">
            <span>导演: </span>
            <span v-for="director in introduction.directors">
                {{director.name}}
            </span>
        </div>
         <div class="introduction_movies_actor">
            <span>主演: </span>
            <span v-for="actor in introduction.casts">
                {{actor.name}}
            </span>
        </div>
         <div class="introduction_movies_type">
            <span>类型: </span>
            <span v-for="type in introduction.genres">
                {{type}}
            </span>
        </div>
        <div class="introduction_movies_rating">
            <span>评分: </span>
            <span>{{introduction.rating.average}}</span>
        </div>
        <div class="introduction_movies_summary">
            <span>简介: </span>
            <span>{{introduction.summary}}</span>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            var introduction;
            return {
                introduction: introduction
            }
        },
        ready() {
            var _this = this;
            var http = 'http://api.douban.com/v2/movie/subject/' + this.$route.params.moviesId;
            this.$http.jsonp(http).then(function(data) {
                if(data.status == 200) {
                    _this.$set('introduction', data.responseText);
                }
            });
        }
    }
</script>