<template>
  <!-- 省市区三级联动 -->
  <div class="threeLevelLinkage" v-if="!showVal === false">
    <div class="calendar">
      <div class="textDemo">{{ nowCity.province }}{{ nowCity.city }}{{ nowCity.area }}</div>
      <div class="title">
        <span @click="Cevent('取消')">取消</span>
        <span @click="Cevent('完成')">完成</span>
      </div>
      <div class="body" ref="width">
        <div class="body-mask" v-if="isMask"></div>
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
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
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
  @Emit('Cevent') Cevents(e: string | CityContent) {
  }

  @Prop() showVal!: boolean | CityContent;
  // 显示的省市区内容
  cityData: CityDatas = {
    province: [],
    city: [],
    area: []
  };

  // 当前选择的省市区
  nowCity: CityContent | boolean = {
    province: '安徽省',
    city: '',
    area: ''
  };

  // 省市区的三个对象
  iscroll: any = null;
  iscroll1: any = null;
  iscroll2: any = null;
  // 屏幕宽度
  Width = 0;
  // 一层禁止滚动的遮罩层
  isMask = true;
  // 当前省市区的下标
  nowSubScript: SubScript = {
    x: 0,
    y: 0,
    z: 0
  };

  // 确认选择的省市区
  confirmCity: CityContent = {
    province: '',
    city: '',
    area: ''
  };

  @Watch('showVal')
  showWatch(newVal: boolean) {
    const self = this;
    if (newVal) {
      setTimeout(() => {
        self.init();
      }, 0);
    } else {
    }
  }

  // 传父组件
  Cevent(e: string) {
    if (e === '完成') {
      this.confirmCity = {
        province: this.cityData.province[this.nowSubScript.x as number],
        city: this.cityData.city[this.nowSubScript.y as number],
        area: this.cityData.area[this.nowSubScript.z as number]
      };
      this.Cevents(this.confirmCity);
    } else if (e === '取消') {
      this.Cevents(e);
    }
  }

  // 销毁日历
  close() {
    const self = this;
    self.iscroll.destroy();
    self.iscroll1.destroy();
    self.iscroll2.destroy();
    self.isMask = true;
  }

  // 初始化
  init() {
    const self = this;
    self.Width = (self.$refs.width as HTMLDivElement).clientWidth;
    self.nowCity = self.showVal;
    self.initContent();
    setTimeout(() => {
      self.bindScroll(0);
    }, 0);
  }

  // 阻止浏览器的默认行为
  prev(ev: any) {
    ev.preventDefault();
  }

  // 初始化iscroll绑定对应函数和对齐 0是初始化 1是刷新省 2是刷新市
  bindScroll(e: number) {
    const self = this;
    if (e === 0) {
      document.addEventListener('touchmove', self.prev, { passive: false });
      self.iscroll = new Iscroll('#wrapper', {
        snap: 'li'
      });
      self.iscroll1 = new Iscroll('#wrapper1', {
        snap: 'li'
      });
      self.iscroll2 = new Iscroll('#wrapper2', {
        snap: 'li'
      });
      const nowSub: any = self.nowSubScript;
      self.iscroll.scrollTo(0, (-self.Width / 10) * nowSub.x, 500);
      self.iscroll1.scrollTo(0, (-self.Width / 10) * nowSub.y, 500);
      self.iscroll2.scrollTo(0, (-self.Width / 10) * nowSub.z, 500);
      setTimeout(() => {
        self.isMask = false;
        self.iscroll.on('scrollEnd', this.scrollFun);
        self.iscroll1.on('scrollEnd', this.scrollFun1);
        self.iscroll2.on('scrollEnd', this.scrollFun2);
      }, 1600);
    }
    if (e === 1) {
      self.iscroll1.scrollTo(0, 0, 300);
      self.iscroll2.scrollTo(0, 0, 300);
      self.iscroll1.destroy();
      self.iscroll2.destroy();
      self.iscroll1 = new Iscroll('#wrapper1', {
        snap: 'li'
      });
      self.iscroll2 = new Iscroll('#wrapper2', {
        snap: 'li'
      });
      self.iscroll1.on('scrollEnd', this.scrollFun1);
      self.iscroll2.on('scrollEnd', this.scrollFun2);
    }
    if (e === 2) {
      self.iscroll2.scrollTo(0, 0, 300);
      self.iscroll2.destroy();
      self.iscroll2 = new Iscroll('#wrapper2', {
        snap: 'li'
      });
      self.iscroll2.on('scrollEnd', this.scrollFun2);
    }
  }

  // iscroll滚动结束后的三个函数
  scrollFun() {
    const self = this;
    const num = -Math.round(this.iscroll.y / (this.Width / 10));
    this.nowCity = {
      province: this.cityData.province[num],
      city: '',
      area: ''
    };
    this.initContent();
    setTimeout(() => {
      self.bindScroll(1);
    }, 0);
  }

  scrollFun1() {
    const self = this;
    const num = -Math.round(this.iscroll1.y / (this.Width / 10));
    this.$set(this.nowCity as CityContent, 'city', this.cityData.city[num]);
    this.$set(this.nowCity as CityContent, 'area', '');
    this.initContent();
    setTimeout(() => {
      self.bindScroll(2);
    }, 0);
  }

  scrollFun2() {
    const num = -Math.round(this.iscroll2.y / (this.Width / 10));
    this.$set(this.nowCity as CityContent, 'area', this.cityData.area[num]);
    this.initContent();
  }

  // 根据当前省市区值确定cityData应该显示的内容和下标
  initContent() {
    // a,b,c省市区 xyz对应的下标
    let y, z;
    const a = Object.keys(city.default).map(res => {
      return res;
    });
    const nowcity = this.nowCity as CityContent;
    const x = a.indexOf(nowcity.province);
    const b = Object.keys(city.default[a[x]][0]).map(res => {
      return res;
    });
    if (nowcity.city === '') {
      y = 0;
    } else {
      y = b.indexOf(nowcity.city);
    }
    const c = city.default[a[x]][0][b[y]];
    if (nowcity.area === '') {
      z = 0;
    } else {
      z = c.indexOf(nowcity.area);
    }
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
      .body-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
      }
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
