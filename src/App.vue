<template>
  <div id="app">
    <div class="preloader"
      v-if="load"
    />
    <error-start
      v-if="error"
      @refresh="refresh"
    />
    <table-wrap
      v-if="loaded"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getProducts } from './store/request'
import errorStart from './components/errorStart'
import tableWrap from './components/tableWrap'

export default {
  name: 'App',
  components: {
    errorStart,
    tableWrap
  },
  data () {
    return {
      products: {},
      load: true,
      error: false,
      loaded: false,
    }
  },
  mounted () {
    getProducts().then(this.onResolved, this.onRejected)
  },
  methods: {
    ...mapMutations([
       'setProducts'
    ]),
    onResolved (val) {
      this.setProducts(val)
      this.error = false
      this.load = false
      this.loaded = true
    },
    onRejected () {
      this.error = true
      this.load = false
    },
    refresh (val) {
      this.load = val
      this.error = !val
      getProducts().then(this.onResolved, this.onRejected)
    }
  }
}
</script>
<style lang="sass">
  #app
    display: flex
    width: 100%
    min-height: 100vh
    background: #F2F2F2
    font-family: Source Sans Pro, Arial, sans-serif
  .preloader
    position: relative
    display: flex
    width: 100%
    align-items: center
    justify-content: center
    &:before
      content: ''
      display: flex
      width: 10vw
      height: 10vw
      border-left: 5px solid red
      border-top: 10px solid red
      border-right: 5px solid red
      border-radius: 50%
      animation: rotate360 2s linear infinite
    &:after
      position: absolute
      content: ''
      display: flex
      width: 10vw
      height: 10vw
      border-left: 5px solid blue
      border-top: 10px solid blue
      border-right: 5px solid blue
      border-radius: 50%
      animation: rotate720 5s linear infinite
  @keyframes rotate360
    from
      transform: rotate(0deg)
    to
      transform: rotate(360deg)
  @keyframes rotate720
    from
      transform: rotate(0deg)
    to
      transform: rotate(-360deg)
</style>
