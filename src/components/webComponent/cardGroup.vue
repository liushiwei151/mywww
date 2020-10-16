<template>
  <div class="cardGroup">
    <card
      v-for="(item, index) in cardGroupInfo"
      :key="index"
      :cardInfo="item"
    ></card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import card from "./card.vue";
interface cardType {
  [key: string]: string;
}
@Component({
  components: {
    card
  }
})
export default class CardGroup extends Vue {
  @Prop() cardGroupInfo!: cardType[];
  mounted(): void {
    console.log(this.cardGroupInfo);
  }
}
</script>
<style lang="less" scoped>
.cardGroup {
  display: flex;
  flex-wrap: wrap;
}
</style>
