<template>
  <div class="citys" :style="style" @click.stop="cityClick">
    <div class="fixed-top">
      <div class="city-search">
        <i class="iconfont arrow-down-icon" data-type="arrow-down">&#xe638;</i>
        <input
          v-model="searchCon"
          type="text"
          class="search-input"
          placeholder="城市中文名或拼音"
        >
        <i class="iconfont search-icon">&#xe600;</i>
        <i
          data-type="clear"
          class="iconfont clear-icon"
          v-show="isClear"
        >
          &#xe623;
        </i>
      </div>
      <p class="curCity border-bottom" v-show="!searchResult.length" data-type="curCity">
        <i class="iconfont address-icon">&#xe61b;</i>当前定位城市 {{curCity}}
      </p>
      <p class="fix-top-title" v-show="!searchResult.length">{{topTitle}}</p>
    </div>
    <div class="scroll-wrapper" ref="wrapper" v-show="!searchResult.length">
      <div class="scroll-content" ref="scroll">
        <div v-if="hotCitys" class="hot-city">
          <span
            data-type="citys"
            class="hot-city-item"
            v-for="v of hotCitys"
            :key="v.id"
          >
            {{v.name}}
          </span>
        </div>
        <div class="city">
          <dl
            class="city-wrapper"
            v-for="v of citysList"
            :key="v[0]"
          >
            <template v-for="(value, i) of v">
              <dt
                v-if="i === 0"
                class="city-albumn"
                :key="i"
                ref="albumn"
              >
                {{v[i]}}
              </dt>
              <dd
                v-else
                data-type="citys"
                class="city-item border-bottom"
                :key="i"  
              >
                {{v[i].name}}
              </dd>
            </template>
          </dl>
        </div>
      </div>
    </div>
    <search-result v-show="searchResult.length" :results="searchResult"></search-result>
    <albumns
      v-show="!searchResult.length"
      :offsets="offset"
      :albumns="albumns"
      :topTitle="topTitle"
      :wrapperH="wrapperH"
      @scrollTo="scrollTo"
      @scrolls="scrolls"
    >
    </albumns>
  </div>
</template>

<script>
import Albumns from './Albumns'
import SearchResult from './SearchResult'
import BScroll from 'better-scroll'
import { cityClick, citysFormat } from './utils'
export default {
  name: 'VueCitys',
  components: {
    Albumns,
    SearchResult
  },
  props: {
    curCity: { type: String, default: '北京' },
    hotCitys: { type: Array },
    citys: { type: Object, required: true }
  },
  data () {
    return {
      style: {
        height: ''
      },
      topTitle: '热门城市',
      searchCon: '',
      isClear: false,
      offset: [],
      wrapperH: 0,
      searchResult: [],
      timer: null,
      timer1: null
    }
  },
  computed: {
    citysList () {
      let cities = this.citys.data.cities
      return citysFormat(cities)
    },
    offsets () {
      let mH = this.$refs.albumn[0].offsetHeight / 2
      let offsets = []
      for (let i = 0; i < this.citysList.length ; i++) {
        offsets.push(this.$refs.albumn[i].offsetTop + mH)
      }
      return offsets
    },
    albumns () {
      return Object.keys(this.citys.data.cities)
    },
    allCitys () {
      let v = Object.values(this.citys.data.cities)
      let a = []
      for (let i = 0; i < v.length; i++) {
        v[i].shift()
        a = [...a, ...v[i]]
      }
      return a
    }
  },
  watch: {
    searchCon (n ,o) {
      if (n !== '') {
        this.isClear = true
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.searchResult = []
          for (let i = 0; i < this.allCitys.length; i++) {
            let name = this.allCitys[i].name
            let spell = this.allCitys[i].spell
            if ( name.indexOf(n) !== -1 || spell.indexOf(n) === 0) {
              this.searchResult.push(this.allCitys[i])
            }
          }
          if (this.searchResult.length === 0) this.searchResult.push('no')
        }, 300)
      } else {
        this.isClear = false
        if (this.timer1) clearTimeout(this.timer1)
        this.timer1 = setTimeout( () => {
          this.searchResult = []
        },300)
      }
    }
  },
  methods: {
    cityClick (e) {
      cityClick(e, this)
    },
    initScroll () {
      if (!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: 2
      })
      this.scroll.on('scroll', pos => {
        let y = pos.y
        if (y <= 0) this.topTitle = '热门城市'
        for (let i = 0; i < this.offsets.length; i++) {
          if (y <= -this.offsets[i]) this.topTitle = this.albumns[i]
        }
      })
      this.wrapperH = this.scroll.scrollerHeight
    },
    scrollTo (y) {
      y = y + this.$refs.albumn[0].offsetHeight / 2
      this.scroll.scrollTo(0, -y)
    },
    scrolls (y) {
      y = y + this.$refs.albumn[0].offsetHeight / 2
      this.scroll.scrollTo(0,  -y)
    }
  },
  mounted () {
    let h = document.documentElement.clientHeight || document.body.clinetHeight
    this.style.height = h + 'px'
    if (!this.hotCitys) this.topTitle = 'A'
    this.offset = this.offsets
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearTimeout(this.timer1)
  }
}
</script>

<style scoped>
@import '../../assets/iconfont/iconfont.css';
/* search 部分 */
html, body{
  width: 100%;
  height: 100%;
}
.citys{
  height: 100%;
  font-size: .28rem;
  color: #666;
  background: #fff
}
.citys > .fixed-top{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2000;
  background: #fff;
}
.citys > .scroll-wrapper{
  position: absolute;
  overflow: hidden;
  width: 100%;
  top: 2.7rem;
  bottom: 0;
}

.city-search{
  display: flex;
  height: 1rem;
  line-height: 1rem
}
.city-search > .arrow-down-icon{
  width: 1rem;
  font-size: .32rem;
  text-align: center
}    
.city-search > .search-input{
  flex: 1;
  height: .6rem;
  font-size: .28rem;
  line-height: .6rem;
  text-indent: 2em;
  margin-top: .2rem;
  margin-right: .2rem;
  outline: none;
  border: none;
  background: #f8f8f8
}
.city-search > .search-icon {
  position: absolute;
  font-size: .28rem;
  left: 1.16rem;
  color: #999
}
.city-search > .clear-icon {
  position: absolute;
  font-size: .28rem;
  font-weight: bold;
  color: #999;
  right: .4rem
}
/* 当前城市部分 */
.curCity{
  height: .6rem;
  line-height: .6rem;
  padding-bottom: .2rem;
}
.curCity > .address-icon {
  font-size: .28rem;
  margin: 0 .16rem 0 .3rem;
}

/* 热门城市 */
.fix-top-title{
  height: .8rem;
  line-height: .8rem;
  padding-left: .3rem
}
.hot-city{
  padding: 0 .3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}
.hot-city > .hot-city-item{
  width: 1.6rem;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  margin-bottom: .2rem;
  background: #f8f8f8;
}

/* 城市列表 */
.city > .city-wrapper {
  padding: 0 .3rem
}
.city-wrapper > .city-albumn{
  height: .8rem;
  line-height: .8rem;
  font-size: .32rem;
  font-weight: bold;
}
.city-wrapper > .city-item{
  height: .8rem;
  line-height: .9rem;
}
</style>
