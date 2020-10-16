<template>
  <div id="webBg" @mousemove="onDocumentMouseMove"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";

@Component({})
export default class WebBg extends Vue {
  //鼠标移动的距离
  mousePosition: number[] = [0, 0];
  //相机
  camera: THREE.PerspectiveCamera | null = null;
  //容器宽高
  width: number | null = null;
  height: number | null = null;
  //背景对象
  scene: THREE.Scene | null = null;
  spheres: THREE.Mesh[] | null = null;
  // 场景
  renderer: THREE.WebGLRenderer | null = null;
  mounted(): void {
    this.init();
    this.animate();
  }
  init() {
    //创建外层div，声明一些属性
    const box = document.getElementById("webBg") as HTMLElement;
    this.width = box.offsetWidth;
    this.height = box.offsetHeight;
    //创建相机
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.width / this.height,
      1,
      100000
    );
    this.camera.position.z = 3200;
    //创建背景
    this.createBg();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    box.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize, false);
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
  }
  //创建背景
  createBg() {
    this.scene = new THREE.Scene();
    this.spheres = [];
    //全景立方设置，设置立方体的6个面的图片，(猜测会把6个面渲染为全景图)必须6张图
    this.scene.background = new THREE.CubeTextureLoader()
      .setPath("../../../static/")
      .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
    //创建固定大小的球形几何
    const geometry = new THREE.SphereBufferGeometry(100, 32, 16);
    //创建全景环境贴图
    const textureCube = new THREE.CubeTextureLoader()
      .setPath("../../../static/")
      .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
    //设置贴图扁平（猜测）
    textureCube.mapping = THREE.CubeRefractionMapping;
    // 把贴图添加进材质，同时设置材质的折射率
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: textureCube,
      refractionRatio: 0.95
    });
    //循环创建500个球体在随机的位置
    for (var i = 0; i < 500; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 10000 - 5000;
      mesh.position.y = Math.random() * 10000 - 5000;
      mesh.position.z = Math.random() * 10000 - 5000;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
      this.scene.add(mesh);

      this.spheres.push(mesh);
    }
  }
  //自适应屏幕
  onWindowResize() {
    if (
      this.camera === null ||
      this.width === null ||
      this.height === null ||
      this.renderer === null
    )
      return;
    const box = document.getElementById("webBg") as HTMLElement;
    this.width = box.offsetWidth;
    this.height = box.offsetHeight;
    console.log(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
  onDocumentMouseMove(event: any) {
    if (this.width === null || this.height === null) return;
    const windowHalfX = this.width / 2;
    const windowHalfY = this.height / 2;
    this.mousePosition[0] = (event.clientX - windowHalfX) * 10;
    this.mousePosition[1] = (event.clientY - windowHalfY) * 10;
  }
  animate() {
    requestAnimationFrame(this.animate);

    this.renders();
  }
  renders() {
    if (
      this.camera === null ||
      this.renderer === null ||
      this.scene === null ||
      this.spheres === null
    )
      return;
    const timer = 0.0001 * Date.now();

    this.camera.position.x +=
      (this.mousePosition[0] - this.camera.position.x) * 0.05;
    this.camera.position.y +=
      (-this.mousePosition[1] - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    for (var i = 0, il = this.spheres.length; i < il; i++) {
      var sphere = this.spheres[i];

      sphere.position.x = 5000 * Math.cos(timer + i);
      sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
    }
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }
}
</script>
<style lang="less" scoped>
#webBg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  overflow: hidden;
  overflow-y: auto;
}
</style>
