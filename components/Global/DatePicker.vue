<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="selected"
            readonly
            outlined
            :hint="vuetifyFriendlyDate"
            rounded
            solo
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker 
        v-model="selected" 
        no-title 
        scrollable
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
            selectedDate:'',
        }
    },
    props: {
        dateRange:{
            start: Boolean,
            isSingle: Boolean
         }
    },
    mounted(){
      this.selected = this.dateRange.start ? this.getStartDate
          : this.getEndDate;
    },
    watch:{
      // selected: function(value){
      //   this.$store.dispatch('setDate',{start:this.dateRange.start,data:value});
      // }
    },
    computed:{
      vuetifyFriendlyDate () {
        return moment().format('YYYY-MM-DD');
      },
      ...mapGetters([
      'countryList',
      'getInitialCountry',
      'getStartDate',
      'getEndDate'
    ]),    
    },
}
</script>

<style>

</style>