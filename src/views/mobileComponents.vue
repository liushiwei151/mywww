<template>
  <div class="mobileComponents">
    <threeLevelLinkage @Cevent="fn" :showVal='isThreeLevelLinkage' ></threeLevelLinkage>
    <button @click="fn1">省市区</button>
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
export default class MobileComponents extends Vue {
  // 是否显示省市区
  isThreeLevelLinkage = false;
  city: any = {
    province: '安徽省',
    city: '',
    area: ''
  };

  fn(e: string) {
    if (e === '取消') {
      this.isThreeLevelLinkage = false;
    } else {
      this.city = e;
      this.isThreeLevelLinkage = false;
    }
  }

  fn1() {
    this.isThreeLevelLinkage = this.city;
  }
}
</script>
<style lang="less" scoped></style>
