<template>
  <div class="search-character__form"></div>
</template>

<script>
  export default {
    data: function () {
      return {
        name: ''
      }
    },
    methods: {
      handleSearch () {
        this.$store.dispatch('FETCH_CHARACTERS')
      }
    }
  }
</script>
