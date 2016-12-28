<style type="text/css">
body {
	background: #f1efe8 url('../img/bg-dark.jpg') repeat-x;
	background: url('../img/bg-dark.jpg') repeat-x top center, url('../img/bg-light.jpg') repeat-x 239px left;
	background-color: #f1efe8;
	font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, sans-serif;
	color: #36332a;
}

a:link, a:active, a:visited {
	color: #af670a;
	text-decoration: none;
}
	
a img {
	border: none;
}	
legend {
	display: none;
}
img {
	display: block; 
}	
#content-wrapper {
	position: relative;
	margin: 0 auto;
	width: 1070px;
	height: 100%;
}	

#header ul {
	margin: 20px 25px 63px;
	}

#header li {
	float: left;
	}

#header ul a {
	float: left;
	margin-right: 25px;
	padding: 0 0 3px;
	color: #f0eee7;
	font-size: 11px;
	text-transform: uppercase;
	}	
	
#header ul a:hover {
	padding-bottom: 2px;
	border-bottom: 1px solid #423b2b;
	}	
	
#header ul a em {
	font-style: normal;
	color: #7f7159;
	}

#header h1 {
	float: left;
	margin-left: 25px;
	width: 266px;
	}

#header h1 a {
	display: block;
	width: 266px;
	height: 27px;
	text-indent: -9999px;
	background: url(../img/logo.png) no-repeat;
	}

#header h2 {
	float: left;
	margin-left: 15px;
	width: 475px;
	padding-top: 12px;
	color: #7f7159;
	font-size: 10px;
	text-transform: uppercase;
	}	

#header .form {
	float: right;
	margin-right: 25px;
	text-align: right;
	width: 249px;
	}

#header .form label {
	position: absolute;
  	left: -9999px;
	}

/* Attribute selector */
#header .form input[type="text"] {
	display: block;
	float: left;
	margin: 0;
	height: 20px;
	padding: 2px 0 0 28px;
	border: 0;
	width: 180px;
	height: 24px;
	color: #333;
	background: url('../img/search-bg.gif') no-repeat;
	}

/* Attribute selector */
#header .form input[type="image"] {
	float: left;
	}	

/* Used when the "watermark" is in place (removed for user entry) */	
#header .form input.watermark { 
	color: #64644d;
	}

#main {
	float: left;
	margin: 36px 10px 40px 0;
	width: 710px;
	}

#secondary {
	float: left;
	margin-top: 150px;
	width: 350px;
}

.clearfix:after {
  content: ".";
  clear: both;
  height: 0;
  visibility: hidden;
  display: block;
}

.clearfix {display: inline-block;}
.clearfix {display: block;}
		
</style>
<template>
<div id="content-wrapper">
	<div id="header" class="clearfix">
		<ul class="clearfix">
			<li><a v-link="'in_theaters'">正在热映</a></li>
			<li><a v-link="'coming_soon'">即将上映</a></li>
			<li><a v-link="'top250'">Top250</a></li>
			<li><a v-link="'weekly'">口碑榜</a></li>
			<li><a v-link="'us-box'">北美票房榜</a></li>
			<li><a v-link="'new-movies'">新片榜</a></li>
		</ul>
		
		<h1><a href="#">Roma Italia</a></h1>
		
		<h2>Your Guide to the Eternal City</h2>
		
		<div class="form">
			<label for="search-input">Search</label>
			<input v-model="message" type="text" id="search-input" name="search" value="" title="Search">
			<a v-link="'search'"><input type="image" name="" src="img/search-go.gif" @click="searchMovies"></a>
		</div>
			
	</div>

	<div id="main">
		<router-view></router-view>
	</div> <!-- end #main -->

	<div id="secondary">
		<github :githubinit="githubinit"></github>
	</div>	<!-- end #secondary -->
</div>
</template>
<script type="text/javascript">
import Github from './Github.vue'

export default {
    components: { 'github': Github },
    data () {
    	var githubinit = {
    		username: "PlDaily",
    		width: 260,
    		position: "right"
    	};
		return {
			githubinit: githubinit
		}
    },
    methods: {
    	searchMovies() {
    		this.$broadcast('searchMovies', this.message);
    	}
    }
}
</script>