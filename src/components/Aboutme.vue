<template>
<div><a v-link="'/author'">关于作者</a></div>
</template>
<script>
  //import Sidebar from './Sidebar.vue'

  export default {
    //components: { 'sidebar': Sidebar },
    props: ['is', 'list']
  }
</script>