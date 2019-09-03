<template>
  <div class="search-container-holder">
    <h2>Car rentals made simple</h2>
    <v-form
      ref="form"
      @submit="submited"
    >
      <IndexPageLocationAutocomplete @triggerFormEvaluation="triggerFormEvaluation" />
      <DateTimeInputs :date-range="{ isSingle:false,start:true }" />
      <DateTimeInputs :date-range="{ isSingle:false,start:false }" />
      <v-row>
        <UserAgeSwitch />
        <CountrySelectorInput />
      </v-row>
      <v-row class="vr-submit-section">
        <v-btn
          type="submit"
          block
          large
          depressed
          color="secondary"
          :disabled="!disableSubmit"
        >
          Get my car
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DateTimeInputs from '../Global/DateTimeInputs'
import UserAgeSwitch from '../Global/UserAgeSwitch'
import CountrySelectorInput from '../Global/CountrySelectorInput'
import IndexPageLocationAutocomplete from './IndexPageLocationAutocomplete'
export default {
  components: {
    IndexPageLocationAutocomplete,
    DateTimeInputs,
    UserAgeSwitch,
    CountrySelectorInput
  },
  data () {
    return {
      disableSubmit: false
    }
  },
  methods: {
    submited (e) {
      e.preventDefault()
      const urlParameters = `?${this.getUrlString()}`
      this.$router.push(`/results${urlParameters}`)
    },
    triggerFormEvaluation (value) {
      value ? this.disableSubmit = true : this.disableSubmit = false
    },
    ...mapGetters([
      'getUrlString'
    ])
  },
  computed: {
    valid: {
      get () {
        return false
      },
      set (val) {
        this.validStatus = val
      }
    }
  },
  mounted () {
    // if(this.$store.getters('getPickupAndDropoffId')) console.log('obstaja');
  }
}
</script>

<style lang="scss" scoped >
  @import "~/assets/scss/index/_index.scss";
</style>
