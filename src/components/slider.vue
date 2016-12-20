<style type="text/css">
body,div,ul,li{
	margin:0;
	padding:0;
}
.slider-lists{
	list-style: none;
}
.list-group li{
	cursor:pointer;
}
.easySlider li{
	float: left;
}
.easySlider{
	position: relative;
	overflow: hidden;
}
.slider-derec{
	position: absolute;
	width:50px;
	height:50px;
	cursor: pointer;
}
.slider-derec.slider-prev{
	background: url(../img/left.png);
}
.slider-derec.slider-next{
	background: url(../img/right.png);
}
.slider-lists{
	position: absolute;
}
.slider-list img{
	width:100%;
	height:auto;
    width: 710px;
    height: 320px;
}
.slider-dots{
	position: absolute;
	bottom:0;
	margin-bottom:20px;
	list-style:none;
}
.slider-dots .slider-dot{
	width:10px;
	height:10px;
	border-radius:10px;
	border:1px solid #fff;
	margin:0 5px;
	cursor: pointer;
}
.slider-dots .slider-dot.active{
	background-color: #ffffff;
}
</style>
<template>
    <div class="easySlider">
            
        <ul class="slider-lists">

            <li class="slider-list" v-for="movies in data.subjects">
                <a href="#">
                    <img :src="movies.images.large" :alt="movies.title">                    
                </a>
            </li>

        </ul>

        <ul class="slider-dots">

            <li class="slider-dot active"></li>
            
            <li class="slider-dot"></li>
            
            <li class="slider-dot"></li>
              
            <li class="slider-dot"></li>
            
            <li class="slider-dot"></li>
            
            <li class="slider-dot"></li>
            
            <li class="slider-dot"></li>
        
        </ul>

        <span class="slider-derec slider-prev"></span>
        
        <span class="slider-derec slider-next"></span>
    
    </div>

</template>
<script>
  //import Sidebar from './Sidebar.vue'
  //import  easySlider from './js/easySlider.js'
  export default {
    //components: { 'sidebar': Sidebar },
    props: ['data'],
    data() {
        var defaults = {
            width:710,//设置轮播的宽度
            height:320,//设置轮播的高度
            speed:400,//设置轮播的速度
            delay:5000,//设置轮播的延迟时间
            imgCount:7,//设置轮播的图片数
            dots:true,//设置轮播的序号点
            autoPlay:true//设置轮播是否自动播放
        },
        count = 0,//轮播计数器
        timer = null;//轮播计时器

        return {
            defaults: defaults
            ,
            count: count,//轮播计数器
            timer: timer//轮播计时器
        }
    },
    methods: {
        init() {
            this.clacSize();
            this.doEvent();
            this.dots();
            this.autoPlay();
        },
        clacSize() {
            var _self = this;
            $('.easySlider').css({
                'width':this.defaults.width,
                'height':this.defaults.height
            })
            $('.slider-list').width(this.defaults.width);

            $('.slider-lists').width(this.defaults.width*this.defaults.imgCount);

            $('.slider-derec').css({
                'top':(this.defaults.height-$('.slider-derec').height())/2
            })

            $('.slider-prev').css({
                'left':20
            })

            $('.slider-next').css({
                'right':20
            })

            $('.slider-dots').css({
                'left':(this.defaults.width-$('.slider-dots').width())/2
            })

            $('.slider-dot').on('click',function(){
                _self.active($(this))
            })
        },
        //触发轮播事件
        doEvent(){
            var _self = this;
            $('.slider-next').click(function(){
                _self.next();
            })

             $('.slider-prev').click(function(){
                _self.prev();
            })
        },
        //下一页
        next(){
            if(!$(".slider-lists").is(":animated"))
            {
                if(this.count>=this.defaults.imgCount-1){
                    $('.slider-lists').animate({
                    'left':0
                    },this.defaults.speed);
                    this.count=0;
                    this.active($('.slider-dot').eq(0))
                }
                else{
                    $('.slider-lists').animate({
                    'left':-this.defaults.width*(this.count+1)
                    },this.defaults.speed)
                    this.count++
                    this.active($('.slider-dot').eq(this.count))
                }

            }
        },
        //上一页
        prev(){
            if(!$(".slider-lists").is(":animated")){
                if(this.count<=0){
                    $('.slider-lists').animate({
                    'left':-this.defaults.width*(this.defaults.imgCount-1)
                    },this.defaults.speed);
                    this.count=this.defaults.imgCount-1;
                    this.active($('.slider-dot').eq(this.count))
                }
                else{
                    $('.slider-lists').animate({
                    'left':-this.defaults.width*(this.count-1)
                    },this.defaults.speed);
                    this.count--;
                    this.active($('.slider-dot').eq(this.count))
                }
            }
        },
        //轮播序号点
        dots(){
            var _self = this;
            if(_self.defaults.dots){
                $('.slider-dots').show()
                $('.slider-dot').each(function(index){
                $(this).click(function(){
                    if(index-1<0){
                        $('.slider-lists').animate({
                            'left':0
                            },_self.defaults.speed);
                    }
                    else{
                        _self.list(index-1);
                        _self.count = index;
                    }
                })
             })
            }
            else{
                $('.slider-dots').hide()
            }
            
        },
        //添加激活状态
        active(elements) {
            elements.addClass('active').siblings().removeClass('active')
        },
        //序号点触发事件
        list(num) {
            var _self = this;
            $('.slider-lists').animate({
                    'left':-_self.defaults.width*(num+1)
           },_self.defaults.speed)
        },
        //自动轮播事件
        autoPlay() {
            var _self = this;
            if(_self.defaults.autoPlay)
            {
                _self.timer=setInterval(function(){
                    _self.next()
                },_self.defaults.delay)
                $(".easySlider").mouseover(function()
                {
                    clearInterval(_self.timer);
                })
                $(".easySlider").mouseout(function()
                {
                    _self.timer=setInterval(function(){
                    _self.next()
                },_self.defaults.delay)
                })
            }
            else{
                clearInterval(_self.timer);
            }
        }
    },
    ready() {
        if(!this.timer) {
            this.init();
        }
        console.log(this.data);
    }
}
</script>