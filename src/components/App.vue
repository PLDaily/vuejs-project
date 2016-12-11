<template>
<nav class="navbar navbar-default">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
        <i class="glyphicon glyphicon-time"></i>
        计划板
      </a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a v-link="'/home'">首页</a></li>
        <li><a v-link="'/time-entries'">计划列表</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<div class="container">
  <div class="col-sm-3">
    <div class="col-sm-3">
      <sidebar :time="totalTime"></sidebar>
    </div>
  </div>
  <div class="col-sm-9">
    <router-view></router-view>
  </div>
  
</div>
</template>
<script>
  import Sidebar from './Sidebar.vue'

  export default {
    components: { 'sidebar': Sidebar },
    data () {
      return {
        totalTime: 1.5
      }
    },
    events: {
      timeUpdate (timeEntry) {
        console.log(timeEntry);
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      deleteTime (timeEntry) {
        console.log(timeEntry);
        
        this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }
</script>