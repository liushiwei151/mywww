<template>
  <div id="Web">
    <headerColumn
      :headerUrl="headerUrl"
      :nowUrl="nowUrl"
      @goWeb="goWeb"
    ></headerColumn>
    <web-bg></web-bg>
    <div class="content">
      <div class="contentCenter"><router-view /></div>
      <div class="information">
        <information :info="info"></information>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import headerColumn from "./components/webComponent/header.vue";
import webBg from "./components/webComponent/webBg.vue";
import information from "./components/webComponent/information.vue";
interface currencyType {
  [key: string]: string;
}
interface infoType {
  [key: string]: string | currencyType[];
}
@Component({
  components: { headerColumn, webBg, information }
})
export default class Web extends Vue {
  //头部标题数据
  headerUrl = [
    { name: "首页", url: "/" },
    { name: "页面", url: "/web" },
    { name: "three", url: "/three" },
    { name: "egret", url: "/egret" }
  ];
  //当前选中头部
  nowUrl = "首页";
  //鼠标在背景中的位置
  mousePosition: number[] = [0, 0];
  //个人信息
  info: infoType = {
    name: "刘试炜",
    img: "../../../icon.jpg",
    Email: "478807601@qq.com",
    signature:
      "前端工程师,擅长HTML5+CSS3+Javascript以及jQuery、Vue等前端框架，对后端Node.js有一定了解",
    classification: this.headerUrl
  };
  //头部的跳转页面
  goWeb(e: currencyType) {
    this.nowUrl = e.name;
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 1200px;
  position: relative;
  top: 95px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .contentCenter {
    width: 900px;
  }
  .information {
    width: 260px;
    box-sizing: border-box;
  }
}

@media screen and (max-width: 900px) {
  .content {
    width: auto;
    .information {
      display: none;
    }
  }
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
