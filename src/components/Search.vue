<style type="text/css">
	
</style>
<template>
	<div v-for="movies in data">
		<span>{{movies.title}}</span>
	</div>
</template>
<script>
	export default {
		
		data() {
			var data;
			return {
				data: data
			}
		},
		events: {
			searchMovies(value) {
				var _this = this;
				this.$http.jsonp('http://api.douban.com/v2/movie/search?q=' + value, {'start':0, 'count': 10}).then(function(data) {
		            _this.$set('data', data.data.subjects);
		        });
			}
		},
	}

</script>