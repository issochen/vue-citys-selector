<template>
  <vue-citys
    curCity="长沙"
    :hotCitys="hotCitys"
    :citys="citys"
    @arrowDown="arrowDown"
    @selectedCity="selectedCity"
  >
  </vue-citys>
</template>

<script>
import VueCitys from './components/VueCitySelector/VueCitySelector'
import citys from './assets/citys'
import hotCitys from './assets/hotCitys'
export default {
  name: 'app',
  components: {
    VueCitys
  },
  data () {
    return {
      hotCitys,
      citys
    }
  },
  methods: {
    arrowDown () {
      console.log('返回')
    },
    selectedCity (city) {
      console.log(city)
    }
  }
}
</script>

<style>

</style>
