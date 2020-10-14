<template>
  <div class="informationWeb">
    <div class="box">
      <div class="box_title">个人资料</div>
      <div class="boxContent">
        <ul class="headBox">
          <li
            class="headImg"
            :style="{ backgroundImage: 'url(' + info.img + ') ' }"
          ></li>
          <li class="headName">
            NAME / <span class="red">{{ info.name }}</span>
          </li>
          <li class="info">
            <div class="infoTitle">E-mail:</div>
            <div>{{ info.Email }}</div>
          </li>
          <li class="info">
            <div class="infoTitle">signature:</div>
            <div>
              {{ info.signature }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="box">
      <div class="box_title">分类</div>
      <ul class="category">
        <li
          v-for="(item, index) in info.classification"
          :key="index"
          @click="gotoWeb(item.url)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface infos {
  [key: string]: string | infos[];
}
@Component({})
export default class Information extends Vue {
  @Prop() info!: infos;
  gotoWeb(e: string) {
    this.$router.push(e);
  }
}
</script>
<style lang="less" scoped>
.informationWeb {
  background: #fff;
  width: 100%;
  .red {
    color: rgb(235, 72, 72);
  }
  .box {
    padding: 10px;
    box-sizing: border-box;
    .category {
      li {
        text-align: left;
        font-size: 13px;
        padding: 10px 15px;
      }
      li:hover {
        background: #ccc;
      }
    }
    .box_title {
      border-bottom: solid 1px black;
      padding-bottom: 5px;
      text-align: left;
      margin-bottom: 10px;
    }
    .boxContent {
      .headBox {
        .headImg {
          border-radius: 50%;
          width: 80px;
          height: 80px;
          background-size: 100% 100%;
          margin: 5px auto;
          border: solid 1px #ccc;
        }
        .headName {
          margin-bottom: 25px;
        }
        .info {
          text-align: left;
          font-size: 13px;
          word-break: break-all;
          .infoTitle {
            font-weight: bold;
            margin: 5px 0;
          }
        }
      }
    }
  }
}
</style>
