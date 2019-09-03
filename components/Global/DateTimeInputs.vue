<template>
  <v-row>
    <v-col>
      <DatePicker :date-range="dateRange" />
    </v-col>
    <v-col>
      <v-select
        v-model="selectedValue"
        :items="items"
        flat
        background-color="white"
        :label="labelSettings"
        outlined
        rounded
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectValues } from '../../constants/constants'
import DatePicker from './DatePicker'
export default {
  components: {
    DatePicker
  },
  props: {
    dateRange: {
      start: Boolean,
      isSingle: Boolean
    }
  },
  data () {
    return {
      items: selectValues,
      selected: null
    }
  },
  computed: {
    selectedValue: {
      get () {
        return this.dateRange.start ? this.getStartTime : this.getEndTime
      },
      set (value) {
        this.selected = value
      }
    },
    labelSettings () {
      return this.dateRange.start ? 'Start time' : 'End time'
    },
    ...mapGetters([
      'getStartTime',
      'getEndTime'
    ])
  },
  watch: {
    selected (value) {
      this.$store.dispatch('setTime', { start: this.dateRange.start, data: value })
    }
  }
}
</script>

<style>

</style>
