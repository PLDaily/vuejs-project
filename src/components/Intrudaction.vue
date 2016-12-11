<template>
<div>Intrudaction组件</div>
  {{list.name}}
  {{list.age}}
  {{list.sex}}
</template>
<script>
  //import Sidebar from './Sidebar.vue'

  export default {
    //components: { 'sidebar': Sidebar },
    props: ['is', 'list']
  }
</script>