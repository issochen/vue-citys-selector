// 获取 非标准属性

// 页面点击事件
const cityClick = (e, _this) => {
  let t = e.srcElement || e.target
  let type = t.getAttribute('data-type')
  switch (type) {
    case 'clear':         // 派发 输入框清空事件
      _this.searchCon = ''
      break;
    case 'arrow-down':      // 派发 返回事件
      _this.$emit('arrowDown')
      break;
    case 'citys':           // 派发 点击城市事件
      let name = t.innerText
      _this.$emit('selectedCity', name)
      break;
    case 'curCity':
      let index = t.innerText.indexOf(' ') + 1
      let names = t.innerText.substr(index)
      _this.$emit('selectedCity', names)
      break;
    case 'albumns':
      let i = _this.albumns.indexOf(t.innerText)
      let mh = _this.$refs.albumn[0].offsetHeight / 2
      let toY = _this.offsets[i] + mh
      _this.scroll.scrollTo(0, -toY)
      break;
  }
}



// 城市数据格式化函数
const citysFormat = cities => {
  let citysObject = cities
  let albumn = Object.keys(citysObject)
  let citys = Object.values(citysObject)
  citys.map((v, i) => {
    v.unshift(albumn[i])
    return v
  })
  return citys
}




export { cityClick, citysFormat }