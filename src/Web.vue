<template>
  <div id="Web">
    <headerColumn
      :headerUrl="headerUrl"
      :nowUrl="nowUrl"
      @goWeb="goWeb"
    ></headerColumn>
    <div class="content">
      <web-bg></web-bg>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import headerColumn from "./components/web/header.vue";
import webBg from "./components/web/webBg.vue";
interface currencyType {
  [key: string]: string;
}
@Component({
  components: { headerColumn, webBg }
})
export default class Web extends Vue {
  //头部标题数据
  headerUrl = [
    { name: "首页", url: "/" },
    { name: "页面", url: "/web" },
    { name: "egret", url: "/egret" }
  ];
  //当前选中头部
  nowUrl = "首页";
  //头部的跳转页面
  goWeb(e: currencyType) {
    this.nowUrl = e.name;
  }
}
</script>
<style lang="less" scoped>
.content {
  background: blue;
}
</style>
<style lang="less">
html,
body,
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
#Web {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
