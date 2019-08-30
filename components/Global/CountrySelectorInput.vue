<template>
<div class="d-flex align-center justify-end">
  <div>
    <p>Country</p>
  </div>
  <div>
    <v-select
          label="Slovenia"
          v-model="model"
          :items="countryList"
          outlined
          solo
          rounded
    ></v-select>
  </div>
</div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
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