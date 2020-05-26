<template>
  <!-- 省市区三级联动 -->
  <div class="threeLevelLinkage">
    <div class="calendar">
      <div class="textDemo">{{ nowCity.province }}{{ nowCity.city }}{{ nowCity.area }}</div>
      <div class="title">
        <span>取消</span>
        <span>完成</span>
      </div>
      <div class="body">
        <div id="wrapper" class="body-month">
          <ul>
            <li></li>
            <li></li>
            <li v-for="(item, index) in cityData.province" :key="index">{{ item }}</li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div id="wrapper1" class="body-month">
          <ul>
            <li></li>
            <li></li>
            <li v-for="(item, index) in cityData.city" :key="index">{{ item }}</li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div id="wrapper2" class="body-month">
          <ul>
            <li></li>
            <li></li>
            <li v-for="(item, index) in cityData.area" :key="index">{{ item }}</li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="xian"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const city = require('./cityData');
const Iscroll = require('iscroll/build/iscroll');

interface CityDatas {
  province: Array<string>;
  city: Array<string>;
  area: Array<string>;
}
interface CityContent {
  province: string;
  city: string;
  area: string;
}
interface SubScript {
  x: number | null;
  y: number | null;
  z: number | null;
}
@Component
export default class ThreeLevelLinkage extends Vue {
  // 显示的省市区内容
  cityData: CityDatas = {
    province: [],
    city: [],
    area: []
  };

  // 当前选择的省市区
  nowCity: CityContent = {
    province: '安徽省',
    city: '安庆市',
    area: '大观区'
  };

  // 省市区的三个对象
  iscroll: any = null;
  iscroll1: any = null;
  iscroll2: any = null;
  // 当前省市区的下标
  nowSubScript: SubScript = {
    x: 0,
    y: 0,
    z: 0
  };

  // 确定选择省市区的下标
  confirmSubScript: SubScript = {
    x: null,
    y: null,
    z: null
  };

  // 确认选择的省市区
  confirmCity: CityContent = {
    province: '',
    city: '',
    area: ''
  };

  mounted(): void {
    console.log(city.default);
    this.init();
  }

  // 初始化
  init() {
    const self = this;
    this.initContent();
    setTimeout(() => {
      self.bindScroll();
    }, 0);
  }

  // 阻止浏览器的默认行为
  prev(ev: any) {
    ev.preventDefault();
  }

  // 初始化iscroll绑定对应函数和对齐
  bindScroll() {
    const self = this;
    document.addEventListener('touchmove', self.prev, { passive: false });
    self.iscroll = new Iscroll('#wrapper', {
      snap: 'li'
    });
    self.iscroll.scrollTo(0, -30, 500);
    self.iscroll.on('scrollEnd', function() {
      console.log(self.iscroll.y);
    });
  }

  // 根据当前省市区值确定cityData应该显示的内容和下标
  initContent() {
    // a,b,c省市区 xyz对应的下标
    const a = Object.keys(city.default).map(res => {
      return res;
    });
    const x = a.indexOf(this.nowCity.province);
    const b = Object.keys(city.default[a[x]][0]).map(res => {
      return res;
    });
    const y = b.indexOf(this.nowCity.city);
    const c = city.default[a[x]][0][b[y]];
    const z = c.indexOf(this.nowCity.area);
    this.cityData = {
      province: a,
      city: b,
      area: c
    };
    this.nowSubScript = {
      x: x,
      y: y,
      z: z
    };
  }
}
</script>

<style scoped lang="less">
.threeLevelLinkage {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 98;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 4vw;
  top: 0;
  left: 0;
  .calendar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .textDemo {
      background-color: #fff;
      padding: 4vw;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 4vw;
      color: #418fe0;
    }
    .body {
      background-color: #d2d6db;
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;
      height: 50vw;
      li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      .xian {
        height: 10vw;
        width: 100%;
        position: absolute;
        border-top: solid 1px black;
        border-bottom: solid 1px black;
        box-sizing: border-box;
        position: absolute;
        pointer-events: none;
        top: 20vw;
      }
      .body-month {
        width: 100%;
      }
      ul {
        width: 33.3vw;
        padding: 0 2vw;
        box-sizing: border-box;
        display: inline-block;
        margin: 0;
        li {
          height: 10vw;
          line-height: 10vw;
          margin: 0;
        }
      }
    }
  }
}
</style>
