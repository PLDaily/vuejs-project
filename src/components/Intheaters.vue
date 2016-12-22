<template>
<common  :url="url" :title="title"></common>
</template>
<script>
  import Common from './Common.vue'

  export default {
    components: { 'common': Common },
    data() {
        var title = "正在热映";
        var url = "in_theaters";
        return {
            url: url,
            title: title
        }
    }
  }
</script>