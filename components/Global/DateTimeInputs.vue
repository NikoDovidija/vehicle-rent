<template>
    <v-row>
    <v-col>
      <DatePicker :dateRange="dateRange"/>
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
        ></v-select>
      </v-col>
     </v-row>
</template>

<script>
import DatePicker from "./DatePicker";
import { selectValues } from "../../constants/constants";
import { mapGetters } from 'vuex'
export default {
  components:{
    DatePicker
  },
  props:{
    dateRange:{
      start: Boolean,
      isSingle: Boolean
    }
  },
  data() {
    return {
      items:selectValues,
      selected:null
    }
  },
  computed:{
    selectedValue:{
      get() {
        return this.dateRange.start ? this.getStartTime : this.getEndTime;
      },
      set(value){
        this.selected = value;
      }
    },
    labelSettings(){
      return this.dateRange.start ? 'Start time' : 'End time';
    },
    ...mapGetters([
      'getStartTime',
      'getEndTime'
    ]),    
  },
  watch:{ 
    selected: function(value){
      this.$store.dispatch('setTime',{start:this.dateRange.start,data:value});
    }
  }
}
</script>

<style>

</style>