<template>
<div id="div1">作者</div><a v-link="'/home'">回到首页</a>
</template>
<script>
export default {
	data() {

	},
	ready() {
		console.log($("#div1").attr('id'));
	}
	
}
</script>