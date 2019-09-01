<template>
  <div class="search-container-holder" >
    <h2>Car rentals made simple</h2>
      <v-form
      ref="form"
      v-on:submit="submited">
        <IndexPageLocationAutocomplete @triggerFormEvaluation="triggerFormEvaluation"/>
        <DateTimeInputs :dateRange ="{ isSingle:false,start:true }"/>
        <DateTimeInputs :dateRange ="{ isSingle:false,start:false }"/>
        <v-row>
          <UserAgeSwitch/>
          <CountrySelectorInput/>
        </v-row>
        <v-row class="vr-submit-section">
          <v-btn type="submit" block large depressed color="secondary"
            :disabled="!disableSubmit"
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
import { mapGetters } from 'vuex'
export default {
    data: function () {
    return {
      disableSubmit: false
    } 
  },
  methods:{
    submited(e){
      e.preventDefault();
      const urlParameters = `?${this.getUrlString()}`;
      this.$router.push(`/results${urlParameters}`);
    },
    triggerFormEvaluation(value){
      value ? this.disableSubmit = true: this.disableSubmit = false;
    },
    ...mapGetters([
      'getUrlString',
    ]),    
  },
  components:{
    IndexPageLocationAutocomplete,
    DateTimeInputs,
    UserAgeSwitch,
    CountrySelectorInput
  },
  mounted(){
    // if(this.$store.getters('getPickupAndDropoffId')) console.log('obstaja');
  },
  computed:{
    valid:{
      get(){
        return false;
      },
      set(val){
        this.validStatus = val;
      }
    }
  }
}
</script>

<style lang="scss" scoped >
  @import "~/assets/scss/index/_index.scss";
</style>