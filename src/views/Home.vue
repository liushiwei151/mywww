<template>
  <div class="home">
    <card-group :cardGroupInfo="cardGroupInfo"></card-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import cardGroup from "../components/webComponent/cardGroup.vue";
interface cardType {
  [key: string]: string;
}
@Component({
  components: {
    cardGroup
  }
})
export default class Home extends Vue {
  cardGroupInfo: cardType[] = [
    { imgUrl: "../static/nx.jpg", title: "测试", desc: "这是一个项目说明" },
    { imgUrl: "../static/nx.jpg", title: "测试2", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试3", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试4", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试5", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试6", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试7", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试8", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试9", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试10", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试11", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试12", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试13", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试14", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试15", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试16", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试17", desc: "这是一个项目说明2" },
    { imgUrl: "../static/nx.jpg", title: "测试18", desc: "这是一个项目说明2" }
  ];
}
</script>
<style lang="less" scoped></style>
