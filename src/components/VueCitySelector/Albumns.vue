<template>
  <ul
    class="albumns"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <li
      v-for="v of albumns"
      :key="v"
      class="albumns-item"
      data-type="albumns"
      :class="{'checked': v === topTitle || (v === 'A' && topTitle === '热门城市')}"
      ref="albumns"
    >
      {{v}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Albumns',
  props: {
    albumns: { type: Array, required: true },
    topTitle: { type: String, default: 'A' },
    offsets: { type: Array, required: true },
    wrapperH: { type: Number, required: true }
  },
  data () {
    return {
      startY: null,
      moveY: null,
      parentOffset: null,
      parentHeight: null,
      flag: null,
      initP: null
    }
  },
  computed: {
    offset () {
      let mH = this.$refs.albumns[0].offsetHeight / 2
      let offset = []
      for (let i = 0; i < this.$refs.albumns.length ; i++) {
        offset.push(this.$refs.albumns[i].offsetTop + mH)
      }
      return offset 
    }
  },
  mounted () {
    this.parentOffset = this.$refs.albumns[0].parentNode.offsetTop
    this.parentHeight = this.$refs.albumns[0].parentNode.offsetHeight
    
  },
  methods: {
    touchStart (e) {
      if (e.touches.length > 1) return
      this.startY = e.touches[0].clientY - this.parentOffset
      let left, right
      for (let i = 0; i < this.offset.length; i++ ) {
        if (this.startY > this.offset[i]) left = this.offset[i]
        if (this.startY < this.offset[i]) {
          right = this.offset[i]
          break
        }
      }
      this.flag = this.startY - left > right - this.startY ? right : left
      this.initP = this.offsets[this.offset.indexOf(this.flag)]  
    },
    touchMove (e) {
      if (e.touches.length > 1) return
      this.moveY = e.touches[0].clientY - this.parentOffset 
      if (this.initP) {
        this.$emit('scrollTo', this.initP)
      }
      //  往下滑动
      if (this.moveY > this.startY) {
        let y = (this.moveY - this.$refs.albumns[0].offsetHeight) / this.parentHeight * this.wrapperH
        if (this.moveY >= this.parentHeight)  y = this.wrapperH
        this.$emit('scrolls', y)
      } else {  // 往上滑
        let y = (this.moveY - this.$refs.albumns[0].offsetHeight) / this.parentHeight * this.wrapperH
        if (this.moveY <= 50)  y = - this.$refs.albumns[0].offsetHeight
        this.$emit('scrolls', y)
      }
      
      
    },
    touchEnd () {
      this.initP = null
      this.startY = null
      this.moveY = null
      this.flag = null
    }
  }
}
</script>

<style scoped>
.albumns{
  position: fixed;
  width: .36rem;
  top: 3.4rem;
  right: .2rem;
  list-style: none;
  text-align: center;
  font-size: .24rem;
  line-height: .36rem;
  color: #666;
}
.albumns > .checked {
  border-radius: 50%;
  background: orange;
}
</style>
