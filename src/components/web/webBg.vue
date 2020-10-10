<template>
  <div id="webBg"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";

@Component({})
export default class WebBg extends Vue {}
</script>
<style lang="less" scoped>
#webBg {
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>
