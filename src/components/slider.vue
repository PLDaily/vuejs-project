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
.easySlider {
    float: left;
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

            <li class="slider-list" v-for="movies in data">
                <a v-link="{name: '/', params: {moviesId: movies.id}}">
                    <img :src="movies.images.large" :alt="movies.title">                    
                </a>
            </li>

        </ul>

        <ul class="slider-dots">
            <li :class="index == 0 ? 'slider-dot active' : 'slider-dot'" v-for="index in defaults.imgCount">
            </li>
        </ul>

        <span class="slider-derec slider-prev"></span>
        
        <span class="slider-derec slider-next"></span>
    
    </div>

</template>
<script>
  export default {
    props: ['data', 'defaults'],
    data() {
        var timerArr = [];
        var count = 0,//轮播计数器
        timer = null;//轮播计时器
        return {
            timerArr: timerArr,
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
                });
                $(".easySlider").mouseout(function()
                {
                    _self.timer=setInterval(function(){
                    _self.next();
                },_self.defaults.delay)
                });
                _self.timerArr.push(_self.timer);
            }
            else{
                clearInterval(_self.timer);
            }
        }
    },
    watch: {

    },
    ready() {
        this.timer = null;
        this.init();
    }
}
</script>