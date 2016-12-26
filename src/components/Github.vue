<style type="text/css">
.github_main {
    width: 260px;
    padding: 10px;
    height: 500px;
}
.github_head {
    overflow: hidden;   
    border-bottom: 1px solid #eee;
}
.github_head .github_head_img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.github_head .github_head_content {
    text-align: center;
    height: 100px;
    font-weight: 100;
    font-size: 20px;
    line-height: 1.5;
    box-sizing: border-box;
}
.github_head .github_head_content span {
    display: block;
}
.github_head_left {
    height: 100px;
}
.github_head_left .github_head_img {
    float: left;
}
.github_head_left .github_head_content {
    float: left;
    width: 160px;
    font-size: 20px;
    padding-top: 14px;
}
.github_head_right {
    height: 100px;
}
.github_head_right .github_head_img {
    float: right;
}
.github_head_right .github_head_content {
    float: right;
    width: 160px;
    padding-top: 14px;
}
.github_head_center {
    height: 165px;
    text-align: center;
}
.github_head_center .github_head_img {
    display: inline-block;
}
.github_head_center .github_head_content {
    display: block;
    padding-top: 10px;
}
.github_content {
    padding-top: 20px;
    padding-left: 20px;
}
</style>
<template>

<div class="github_main">
    <div :class="'github_head github_head_' + githubinit.position">
        <img src="../img/feature-arch.jpg" class="github_head_img">
        <div class="github_head_content">
            <span>PLDaily</span>
            <span>HeHe</span>
        </div>
    </div>
    <div class="github_content">
        <div>
            <span>http://PLDaily.github.io</span>
        </div>
        <div>
            <span>506189445@qq.com</span>
        </div>
    </div>
</div>
<!-- <div class="github_main">
    <div class="github_head github_head_left">
        <img :src="data.avatar_url" class="github_head_img">
        <div class="github_head_content">
            <span>{{data.login}}</span>
            <span>{{data.name}}</span>
        </div>
        
    </div>
    <div class="github_content">
        <div>
            <span>博客</span>
            <span>{{data.blog}}</span>
        </div>
        <div>
            <span>邮箱</span>
            <span>{{data.email}}</span>
        </div>
    </div>
    <div class="githun_foot">
        <div>
            <span>{{data.followers}}</span>
            <span>Followers</span>
        </div>
        <div>
            <span>{{data.public_repos}}</span>
            <span>Repos</span>
        </div>
        <div>
            <span>{{data.following}}</span>
            <span>Following</span>
        </div>
    </div>
</div> -->
</template>
<script>
export default {
    props: ['githubinit'],
	data() {
		var data = null;
		return {
			data: data
		}
	},
	ready() {
		var _this = this;
        /*this.$http.jsonp('https://api.github.com/users/' + this.githubinit.username).then(function(data) {
            _this.$set('data', data.data.data);
        });*/
	}
}
</script>