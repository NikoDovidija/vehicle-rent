<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        transition="scale-transition">
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
          ></v-text-field>
        </template>
        <v-date-picker 
        v-model="slt" 
        no-title 
        :min="vuetifyFriendlyDate">
        </v-date-picker>
      </v-menu>
</template>

<script>
import moment from 'moment';
import { mapGetters,mapActions } from 'vuex'
export default {
    data(){
        return {
            menu: false,
            todayDate: moment(),
            selected: null,
            sl:true,
            selectedDate:'',
        }
    },
    props: {
        dateRange:{
            start: Boolean,
            isSingle: Boolean
         }
    },
    watch:{
      selected: function(value){
        //this.$store.dispatch('checkIfDateIsValid',{start:this.dateRange.start,data:value});
        this.$store.dispatch('setDate',{start:this.dateRange.start,data:value});
      }
    },
    computed:{
      slt:{
        get() {
        return this.dateRange.start ? this.getStartDate
          : this.getEndDate;
        },
        set(value){
          this.selected = value;
        }
      },
      vuetifyFriendlyDate () {
        return this.getStartDate;
      },
      ...mapGetters([
      'countryList',
      'getInitialCountry',
      'getStartDate',
      'getEndDate'
    ]),    
    labelSettings(){
      return this.dateRange.start ? 'Start date' : 'End date';
    },
    },
}
</script>

<style>

</style>