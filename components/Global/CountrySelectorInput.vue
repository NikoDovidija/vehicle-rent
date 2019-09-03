<template>
  <div class="d-flex align-center col-12 col-md-6">
    <div>
      <v-select
        v-model="model"
        label="Country"
        :items="countryList"
        flat
        outlined
        background-color="white"
        rounded
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      selectedVal: ''
    }
  },
  computed: {
    model: {
      get () {
        return this.getInitialCountry
      },
      set (value) {
        this.selectedVal = value
      }
    },
    ...mapGetters([
      'countryList',
      'getInitialCountry'
    ])

  },
  watch: {
    selectedVal (value) {
      this.$store.dispatch('setSelectedCountry', value)
    }
  }
}
</script>

<style>

</style>
