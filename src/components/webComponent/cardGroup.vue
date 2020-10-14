<template>
  <div class="cardGroup">
    <card></card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import card from "./card.vue";
@Component({
  components: {
    card
  }
})
export default class CardGroup extends Vue {}
</script>
<style lang="less" scoped></style>
