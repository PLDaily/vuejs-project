<template>
<common  :url="url" :title="title"></common>
</template>
<script>
  import Common from './Common.vue'

  export default {
    components: { 'common': Common },
    data() {
        var title = "TOP250";
        var url = "top250";
        return {
            url: url,
            title: title
        }
    }
  }
</script>