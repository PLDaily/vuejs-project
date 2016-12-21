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