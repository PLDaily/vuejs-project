<style type="text/css">
.github_main {
    padding: 10px;
}
.github_head {
    overflow: hidden;   
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    box-sizing: border-box;
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
    width: 100%;
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
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
    line-height: 1.5;
}
.github_foot {
    display: flex;
    cursor: pointer;
}
.github_foot .followers {
    flex: 1;
    text-align: center;
}
.github_foot .repos {
    flex: 1;
    text-align: center;
}
.github_foot .following {
    flex: 1;
    text-align: center;
}
</style>
<template>

<div class="github_main" :style="github_main_style">
    <div :class="'github_head github_head_' + githubinit.position">
        <img :src="data.avatar_url" class="github_head_img">
        <div class="github_head_content">
            <span>{{data.login}}</span>
            <span>{{data.name}}</span>
        </div>
    </div>
    <div class="github_content">
        <div v-if="data.blog">
            <span>{{data.blog}}</span>
        </div>
        <div v-if="data.email">
            <span>{{data.email}}</span>
        </div>
        <div v-if="data.company">
            {{data.company}}
        </div>
        <div v-if="data.location">
            {{data.location}}
        </div>
    </div>
    <div class="github_foot">
        <a :href="'https://github.com/' + data.login + '?tab=followers'" class="followers">
            <div>{{data.followers}}</div>
            <div>Followers</div>
        </a>
        <a :href="'https://github.com/' + data.login + '?tab=repositories'" class="repos">
            <div>{{data.public_repos}}</div>
            <div>Repos</div>
        </a>
        <a :href="'https://github.com/' + data.login + '?tab=following'" class="following">
            <div>{{data.following}}</div>
            <div>Following</div>
        </a>
    </div>
</div>
</template>
<script>
export default {
    props: ['githubinit'],
	data() {
		var data = null;
        var github_main_style = {
            width: this.githubinit.width + 'px'
        }
		return {
			data: data,
            github_main_style: github_main_style
		}
	},
	ready() {
		var _this = this;
        this.$http.jsonp('https://api.github.com/users/' + this.githubinit.username).then(function(data) {
            _this.$set('data', data.data.data);
        });
	}
}
</script>