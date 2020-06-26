<template>
  <div class="errorStart">
    Ощибка :(
    <b-button variant="outline-primary" @click="refresh">Попробовать еще!</b-button>
  </div>
</template>
<script>

export default {
  name: 'errorStart',
  methods: {
    refresh () {
      this.$emit('refresh', true)
    }
  }
}
</script>
<style lang="sass">
  .errorStart
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
</style>
