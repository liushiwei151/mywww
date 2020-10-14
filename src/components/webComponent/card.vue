<template>
  <div class="card">
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Card extends Vue {}
</script>
<style lang="less" scoped>
.card {
  box-shadow: 0 1px 2px #c5c5c5;
  background: #fff;
  border-radius: 0 0 1px 1px;
  height: 222px;
  width: 280px;
  transition: box-shadow 0.3s;
}
.card:hover {
  box-shadow: 0 2px 8px #bbb;
}
</style>
