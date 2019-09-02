<template>
<div class="d-flex align-center col-12 col-md-6">
  <div>
    <v-select
          label="Country"
          v-model="model"
          :items="countryList"
          flat
          outlined
          background-color="white"
          rounded
    ></v-select>
  </div>
</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  data(){
    return {
      selectedVal:''
    }
  },
  computed:{
    model:{
      get() {
        return this.getInitialCountry;
      },
      set(value){
        this.selectedVal = value;
      }
    },
    ...mapGetters([
      'countryList',
      'getInitialCountry'
    ]),    
    
  },
  methods:{
    // ...mapActions({
    //   setCountry :'setSelectedCountry' 
    // }),
  },
  watch:{ 
    selectedVal: function(value){
      this.$store.dispatch('setSelectedCountry',value);
    }
  }
}
</script>

<style>

</style>