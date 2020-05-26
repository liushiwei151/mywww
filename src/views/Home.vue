<template>
  <div class="home">
    <threeLevelLinkage></threeLevelLinkage>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import threeLevelLinkage from '../components/tool/threeLevelLinkage/threeLevelLinkage.vue';
@Component({
  components: {
    threeLevelLinkage
  }
})
export default class Home extends Vue {}
</script>
<style lang="less" scoped></style>
