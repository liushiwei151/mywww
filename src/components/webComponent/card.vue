<template>
  <div class="card">
    <div class="card_imgBox">
      <div
        class="card_img"
        :style="{ backgroundImage: 'url(' + cardInfo.imgUrl + ')' }"
      ></div>
    </div>
    <div class="title">{{ cardInfo.title }}</div>
    <div class="desc">{{ cardInfo.desc }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
interface cardType {
  [key: string]: string;
}
@Component({})
export default class Card extends Vue {
  @Prop() cardInfo!: cardType;
}
</script>
<style lang="less" scoped>
.card {
  box-shadow: 0 1px 2px #c5c5c5;
  background: #fff;
  border-radius: 0 0 1px 1px;
  width: 280px;
  transition: box-shadow 0.3s;
  margin: 0 20px 20px 0;
  .title {
    text-align: left;
    padding: 10px;
  }
  .title:hover {
    color: #00b33b;
    cursor: pointer;
  }
  .desc {
    text-align: left;
    font-size: 12px;
    color: #b4bbbf;
    text-indent: 10px;
    padding-bottom: 10px;
    cursor: default;
  }
  .card_imgBox {
    width: 100%;
    height: 120px;

    overflow: hidden;
  }
  .card_img {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s;
  }
}
.card:hover {
  box-shadow: 0 2px 8px #bbb;
}
.card:hover .card_img {
  transform: scale(1.1);
}
</style>
