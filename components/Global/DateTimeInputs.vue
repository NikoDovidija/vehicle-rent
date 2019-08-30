<template>
     <v-row>
    <v-col>
      <DatePicker :dateRange="dateRange"/>
    </v-col>
    <v-col>
         <v-select
          v-model="selectedValue"
          :items="items"
          outlined
          solo
          rounded
        ></v-select>
      </v-col>
     </v-row>
</template>

<script>
import DatePicker from "./DatePicker";
import { selectValues } from "../../constants/constants";
import { mapGetters,mapActions } from 'vuex'
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
      selectedValue:'',
    }
  },
  mounted(){
    this.selectedValue = this.dateRange.start ? this.getStartTime : 
    this.getEndTime;
  },
  computed:{
        ...mapGetters([
      'getStartTime',
      'getEndTime'
    ]),    
  }
}
</script>

<style>

</style>