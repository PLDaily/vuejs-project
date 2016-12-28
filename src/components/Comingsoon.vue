<template>
<common  :url="url" :title="title"></common>
</template>
<script>
  import Common from './Common.vue'

  export default {
    components: { 'common': Common },
    data() {
        var title = "即将上映";
        var url = "coming_soon";
        return {
            url: url,
            title: title
        }
    }
  }
</script>