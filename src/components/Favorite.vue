<template>
<div>favorite组件</div>
<div>
  {{list.sport}}
  {{list.game}}
</div>
</template>
<script>
  //import Sidebar from './Sidebar.vue'

  export default {
    //components: { 'sidebar': Sidebar },
    props: ['is', 'list']
  }
</script>