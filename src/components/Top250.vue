<template>
<slider :data="data"></slider>
</template>
<script>
  import Slider from './Slider.vue'

  export default {
    components: { 'slider': Slider },
    data() {
    	var data;
    	return {
    		data: data
    	}
    },
    ready() {
    	var _this = this;
    	this.$http.jsonp('http://api.douban.com/v2/movie/top250',{'start':0, 'count': 7}).then(function(data) {
        	_this.$set('data', data.data);
        });
    }
  }
</script>