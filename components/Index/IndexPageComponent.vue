<template>
  <div class="search-container-holder" >
    <h2>Car rentals made simple</h2>
      <v-form
      ref="form"
      v-model="valid">
        <v-row no-gutters class="mt-12">
              <v-row no-gutters>
                <IndexPageLocationAutocomplete/>
              </v-row>
              <v-row class="mt-3 d-flex">
                  <v-col class="py-3">
                    <DateTimeInputs :dateRange ="{ isSingle:false,start:true }"/>
                  </v-col>
                  <v-col class="py-3">
                    <DateTimeInputs :dateRange ="{ isSingle:false,start:false }"/>
                  </v-col>
              </v-row>
              <v-row no-gutters class="mt-n10">
                  <v-col >
                    <UserAgeSwitch/>
                  </v-col>
                  <v-col >
                    <CountrySelectorInput/>
                  </v-col>
              </v-row>
          </v-row>
          <v-row no-gutters class="vr-submit-section">
              <v-btn type="submit" block large depressed color="secondary"
                :disabled="valid"
              >Get my car</v-btn>
          </v-row>
      </v-form>
  </div>
</template>

<script>
import IndexPageLocationAutocomplete from "./IndexPageLocationAutocomplete";
import DateTimeInputs from "../Global/DateTimeInputs";
import UserAgeSwitch from "../Global/UserAgeSwitch";
import CountrySelectorInput from "../Global/CountrySelectorInput";

export default {
    data: function () {
    return {
      valid: false
    } 
  },
  components:{
    IndexPageLocationAutocomplete,
    DateTimeInputs,
    UserAgeSwitch,
    CountrySelectorInput
  }
}
</script>

<style lang="scss" scoped >
  @import "~/assets/scss/index/_index.scss";
</style>