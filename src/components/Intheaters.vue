<template>
<common :sliderdata="slider_data" :data="data" :title="title"></common>
</template>
<script>
  import Common from './Common.vue'

  export default {
    components: { 'common': Common },
    data() {
        var title = "正在热映";
        var slider_data;
        var data;
        var count;
        return {
            title: title,
            count: count,
            slider_data: slider_data,
            data: data
        }
    },
    events: {
        loadMore() {
            var isshowloadmore;
            var _this = this;
            this.$http.jsonp('http://api.douban.com/v2/movie/in_theaters',{'start':this.count, 'count': 10}).then(function(data) {
                var subjects = data.data.subjects;
                _this.$set('data', _this.data.concat(subjects));
                if(subjects.length < 10) {
                    isshowloadmore = false;
                }else {
                    isshowloadmore = true;
                }
                _this.$broadcast('loadMoreText', isshowloadmore);
            });
            this.count = this.count + 10;
        }
    },
    ready() {
        var _this = this;
        this.count = 11;
        this.$http.jsonp('http://api.douban.com/v2/movie/in_theaters',{'start':0, 'count': 5}).then(function(data) {
            _this.$set('slider_data', data.data);
        });
        this.$http.jsonp('http://api.douban.com/v2/movie/in_theaters',{'start':0, 'count': 11}).then(function(data) {
            _this.$set('data', data.data.subjects);
        });
    }
  }

</script>