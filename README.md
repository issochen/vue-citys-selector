# vue-citys

> 基于vue2 、better-scroll的城市选择器

## 效果图
![gif](http://www.chenshujin.cn/blog-resources/vueCity/for.gif)

## 用法
### 下载
```bash
npm install --save vue-citys-selector
```
### 使用
```javascript
// main.js
  import Vue from "vue"
  import VueCitys from 'vue-citys-selector'
  Vue.use(VueCitys)
```
> 组件内
```javascript
  <vue-citys
    :curCity="localCity"
    :hotCitys="hotCitys"
    :citys="citys"
    @arrowDown="arrowDown"
    @selectedCity="selectedCity"
  >
  </vue-citys>
```

> api
```javascript
:curCity    // 当前定位城市, 默认 北京
:hotCitys   // 热门城市(可没可无)  
:citys      // 所有城市(必传)
@arrowDown  // 点击返回箭头的事件
@selectedCity   // 为点击城市的事件,  函数第一个参数为点击城市的名称 
```

### 城市数据格式
热门城市数据格式[hotCitys](https://github.com/issochen/vue-city-selector/blob/master/src/assets/hotCitys.js)
所有城市数据格式[citys](https://github.com/issochen/vue-city-selector/blob/master/src/assets/citys.js)

## 与弹出层结合使用
如 vant的popup 需要在van-popup 上加上 :lock-scroll="false" 属性, 才能滚屏

