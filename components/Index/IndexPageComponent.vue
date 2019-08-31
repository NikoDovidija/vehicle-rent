<template>
  <div class="search-container-holder" >
    <h2>Car rentals made simple</h2>
      <v-form
      ref="form"
      v-on:submit="submited"
      v-model="valid">
        <IndexPageLocationAutocomplete/>
        <DateTimeInputs :dateRange ="{ isSingle:false,start:true }"/>
        <DateTimeInputs :dateRange ="{ isSingle:false,start:false }"/>
        <UserAgeSwitch/>
        <CountrySelectorInput/>
        <v-row class="vr-submit-section">
          <v-btn type="submit" block large depressed color="secondary"
            :disabled="!valid"
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
      valid: true
    } 
  },
  methods:{
    submited(e){
      e.preventDefault();
      console.log('aaa');
      this.$router.push('/results');
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