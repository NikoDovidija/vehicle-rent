<template>
  <v-row>
    <v-col>
      <v-autocomplete
        v-model="select"
        :search-input.sync="search"
        flat
        :items="items"
        :clearable="true"
        solo
        outlined
        :hide-no-data="empty"
        hide-details
        rounded
        label="Location"
      />
    </v-col>
  </v-row>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      items: [],
      empty: true,
      isLoading: false,
      error: false,
      select: null,
      search: null,
      valueSelected: false,
      previousValueLength: 0
    }
  },
  watch: {
    search: _.debounce(function (val) {
      val && val !== this.select && this.fetchData(val)
      if (!val) {
        this.empty = true
        this.previousValueLength = 0
      }
    }, 250),
    select (val) {
      this.$store.dispatch('setPickupAndDropOffLocationId', val)
      this.triggerFormEvaluation()
    }
  },

  methods: {
    triggerFormEvaluation () {
      this.$emit('triggerFormEvaluation', this.select)
    },
    async fetchData (val) {
      if (val && val.length > 2 && !this.isLoading && !this.valueSelected) {
        this.isLoading = true
        const axios = this.$axios
        const result = await this.fetchResults(axios, val)
        this.items = result.map((res) => {
          const rObj = {}
          rObj.text = res.name
          rObj.value = res.id
          return rObj
        })
        this.isLoading = false
        if (this.items.length < 1) { this.empty = false }
        this.previousValueLength = val.length
      } else {
        this.empty = false
      }
    },
    async fetchResults (axios, value) {
      const res = await axios.$post('https://api.vehicle-rent.com/get-locations', {
        query: value })
      return res.response.data.locations
    }
  }
}
</script>

<style lang="scss">

</style>
