<style type="text/css">
.slider_box {
    overflow: hidden;
    position: relative;
    text-align: center;
    float: left;
}
.slider_list {
    float: left;
}
.slider_list_content {
    width: 100%;
    height: 100%;
}
.slider_dots{
    position: relative;
    top: -25px;
    overflow: hidden;
    list-style:none;
    display: inline-block;
}
.slider_dots .slider_dot{
    width:10px;
    height:10px;
    border-radius:10px;
    border:1px solid #fff;
    margin:0 5px;
    cursor: pointer;
    float: left;
}
.slider_dots .active{
    background-color: #ffffff;
}

.slider_derec{
    position: absolute;
    width:50px;
    height:50px;
    cursor: pointer;
}
.slider_prev{
    background: url(../img/left.png);
}
.slider_next{
    background: url(../img/right.png);
}
</style>
<template>
<div class="slider_box" :style="sliderBoxStyle" @mouseover="mouseover" @mouseout="mouseout">
    <ul class="slider_lists" :style="sliderListsStyle">
        <li  v-for="movies in pages" class="slider_list" :style="sliderListStyle">
            <a v-link="{name: '/', params: {moviesId: movies.id}}">
                <img :src="movies.images.large" :alt="movies.title" :style="sliderImgStyle" class="slider_list_content" />
            </a>
        </li>
    </ul>
    <ul class="slider_dots" v-show="sliderinit.dots">
        <li v-for="list in pages" :class="this.$index == currentPage ? 'slider_dot active' : 'slider_dot'" @click="turnTo(this.$index)"></li>
    </ul>

    <span class="slider_derec slider_prev" :style="sliderPrevStyle" v-show="sliderinit.button" @click="sliderPrev"></span>
    <span class="slider_derec slider_next" :style="sliderNextStyle" v-show="sliderinit.button" @click="sliderNext"></span>

</div>
</template>
<script>
export default {
    props: ['sliderinit', 'pages'],
    data() {
        var timer = null;
        var sliderBoxStyle = {
            width: this.sliderinit.width + 'px',
            height: this.sliderinit.height + 'px'
        };

        var sliderListsStyle = {
            width: this.sliderinit.width*this.sliderinit.imgCount + 'px',
            height: this.sliderinit.height + 'px'
        };

        var sliderListStyle = {
            width: this.sliderinit.width + 'px',
            height: this.sliderinit.height + 'px'
        };

        var sliderPrevStyle = {
            top: (this.sliderinit.height - 50) / 2 + 'px',
            left: 20 + 'px'
        };

        var sliderNextStyle = {
            top: (this.sliderinit.height - 50) / 2 + 'px',
            right: 20 + 'px'
        };

        var sliderImgStyle = {
            transform: "translateX(0)"
        };

        var cunrrentPosition = 0;

        var currentPage = this.sliderinit.currentPage;
        return {
            sliderBoxStyle: sliderBoxStyle,
            sliderListStyle: sliderListStyle,
            sliderListsStyle: sliderListsStyle,
            sliderPrevStyle: sliderPrevStyle,
            sliderNextStyle: sliderNextStyle,
            currentPage: currentPage,
            cunrrentPosition: cunrrentPosition,
            sliderImgStyle: sliderImgStyle,
            timer: timer
        }
    },
    methods: {
        setTimer() {
            var _this = this;
            this.timer = setInterval(function() {
                _this.next();
            }, this.sliderinit.changeTime)
        },
        prev() {
            this.currentCompute(false);
            this.styleCompute();
        },
        next() {
            this.currentCompute(true);
            this.styleCompute();
        },
        currentCompute(next) {//计算当前位置及当前节点
            var maxPage = this.sliderinit.imgCount - 1;
            var sliderWidth = this.sliderinit.width;
            if(next) {
                if(++this.currentPage > maxPage) {
                    this.currentPage = 0;   
                }
                this.cunrrentPosition -= sliderWidth;
            }else {
                if(--this.currentPage < 0) {
                    this.currentPage = maxPage; 
                }
                this.cunrrentPosition += sliderWidth;
            }
            if(this.cunrrentPosition < -sliderWidth*maxPage) {
                this.cunrrentPosition = 0;          
            }
            if(this.cunrrentPosition > 0) {
                this.cunrrentPosition = -sliderWidth*maxPage;
            }
        },
        styleCompute() {//样式变化
            var obj = {
                "transform": `translateX(${this.cunrrentPosition}px)`,
                "transition-duration": this.sliderinit.animateTime/1000 + 's'
            }
            this.sliderImgStyle = Object.assign(this.sliderImgStyle, obj);
        },
        turnTo(num) {
            this.currentPage = num;
            this.cunrrentPosition = -this.sliderinit.width*num;
            this.styleCompute();
        },
        sliderPrev() {
            this.prev();
        },
        sliderNext() {
            this.next();
        },
        mouseover() {
            clearTimeout(this.timer);
        },
        mouseout() {
            if(this.sliderinit.autoplay) {
                this.setTimer();
            }
        }
    },
    ready() {
        if(this.sliderinit.autoplay) {
            this.setTimer();
        }
    }
}
</script>