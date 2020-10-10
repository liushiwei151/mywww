<template>
  <div class="header">
    <ul class="nav">
      <li class="logo"></li>
      <li
        class="title"
        v-for="(item, index) in headerUrl"
        :key="index"
        :class="{ activeTitle: item.name === nowUrl }"
        @click="gotoWeb(item)"
      >
        {{ item.name }}
      </li>
      <li class="details" @click="showList">
        <div></div>
        <div></div>
        <div></div>
      </li>
    </ul>
    <div class="borderBottom"></div>
    <!-- 移动端下拉列表 -->
    <ul class="detailsList" :class="{ detailsStyle: detailsList }">
      <li
        v-for="(item, index) in headerUrl"
        :key="index"
        :class="{ activeTitle: item.name === nowUrl }"
        @click="gotoWeb(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
interface HeaderUrlType {
  name: string;
  url: string;
}
@Component({})
export default class Header extends Vue {
  @Prop() headerUrl!: HeaderUrlType[];
  @Prop() nowUrl!: string;
  @Emit("goWeb") goWeb(e: HeaderUrlType[]) {}

  //是否显示移动环境下拉列表
  detailsList = false;
  //跳转页面把值传入父组件
  gotoWeb(e: HeaderUrlType[]) {
    this.goWeb(e);
  }
  //显示移动端下的下拉列表
  showList() {
    this.detailsList = !this.detailsList;
  }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 900px) {
  .nav {
    width: 100% !important;
  }
  .title {
    display: none !important;
  }
  .details {
    display: flex !important;
  }
  .detailsStyle {
    height: 120px !important;
  }
}
.header {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: black;
  .activeTitle {
    background: rgba(255, 255, 255, 0.3);
    color: #fff;
  }
  .borderBottom {
    height: 4px;
    background: url(../../assets/topfixed_bg.png) repeat-x;
    width: 100%;
  }
  .detailsList {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    background: black;
    height: 0;
    transition: height 1s;
    overflow: hidden;
    li {
      color: #fff;
      height: 40px;
      line-height: 40px;
    }
  }

  .nav {
    width: 1200px;
    color: #ccc;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .details {
      height: 60px;
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      right: 0;
      top: 0;
      box-sizing: border-box;
      padding: 10px;
      display: none;
      div {
        height: 5px;
        width: 40px;
        border-radius: 5px;
        background: #fff;
      }
    }

    .logo {
      height: 60px;
      width: 150px;
      background: url(../../assets/logo.png) no-repeat;
      background-size: 140px 32px;
      box-sizing: border-box;
      background-position: center;
      padding: 0;
    }

    .title {
      display: block;
      height: 100%;
      font-size: 17px;
      padding: 0 30px;
      line-height: 60px;
      cursor: pointer;
      transition: all 1s;
    }
    .title:hover {
      background: rgba(255, 255, 255, 0.3);
      color: #fff;
    }
  }
}
</style>
