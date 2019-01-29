<template>
  <div class="search-result" ref="wrapper">
    <ul
      v-show="results[0] !== 'no'" 
    >
      <li
        data-type="citys"
        class="border-bottom search-scroll"
        v-for="(v, i) of results"
        :key="i"
      >
        {{v.name}}
      </li>
    </ul>
    <p class="no-result" v-show="results[0] === 'no'">没有找到相关城市</p>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'SearchResult',
  props: {
    results: { type: Array }
  },
  methods: {
    initScroll () {
      if (!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: 2
      })
    }
  },
  mounted () {
    this.initScroll()
  }
}
</script>

<style scoped>
  .search-result{
    position: absolute;
    overflow: hidden;
    top: 1rem;
    width: 100%;
    bottom: 0;
  }
  .search-result > .no-result{
    line-height: 8rem;
    text-align: center;
  }
  .search-result  .search-scroll {
    padding: 0 .3rem;
    height: .8rem;
    font-size: .32rem;
    line-height: .8rem; 
    list-style: none;
  }
</style>
