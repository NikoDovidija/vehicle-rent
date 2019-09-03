<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="true"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="slt"
        :label="labelSettings"
        readonly
        flat
        background-color="white"
        outlined
        rounded
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="slt"
      no-title
      :min="vuetifyFriendlyDate"
    />
  </v-menu>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    dateRange: {
      start: {
        type: Boolean,
        default: () => false
      },
      isSingle: {
        type: Boolean,
        default: () => false
      }
    }
  },
  data () {
    return {
      menu: false,
      todayDate: moment(),
      selected: null,
      sl: true,
      selectedDate: ''
    }
  },
  computed: {
    slt: {
      get () {
        return this.dateRange.start ? this.getStartDate
          : this.getEndDate
      },
      set (value) {
        this.selected = value
      }
    },
    vuetifyFriendlyDate () {
      return this.getStartDate
    },
    ...mapGetters([
      'countryList',
      'getInitialCountry',
      'getStartDate',
      'getEndDate'
    ]),
    labelSettings () {
      return this.dateRange.start ? 'Start date' : 'End date'
    }
  },
  watch: {
    selected (value) {
      this.$store.dispatch('setDate', { start: this.dateRange.start, data: value })
    }
  }
}
</script>

<style>

</style>
