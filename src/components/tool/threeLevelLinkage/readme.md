### 省市区三级联动组件
> 必传值showVal: false代表隐藏，传入对象代表显示并跳转到对应省市区，对象必须是如下格式
```
 {
    province:'安徽省',
    city:'',
    area:''
  }
```
> 方法@Cevent 是点击取消和确定的回调 取消返回字符串'取消'需改变showVal的值才会隐藏并销毁 确定返回省市区对象