<template>
<div>
<v-container>
      <v-row no-gutters class="mt-12">
        <v-col>
           <v-overlay :value="overlay"
           :absolute="absolute">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </v-col >
           <v-col v-if="!overlay"  xl="10" md="8" class="col-12">
             <ResultsListComponent v-bind:items="filteredArray" />
        </v-col>
      </v-row>
</v-container>
</div>
</template>

<script>
import  ResultsFilterComponent  from "../components/Results/ResultsFilterComponent";
import ResultsListComponent from "../components/Results/ResultsListComponent";
import { mapGetters} from 'vuex';
import 'url-search-params-polyfill';
export default {
  data(){
    return {
      loader:null,
      absolute: true,
      overlay: false,
      results:[],
      filteredResults: [],
      sortsArray:[
        {
        type:"Pickup location",
        values:[]
      },
        {
        type:"Vendors",
        values:[]
      },
      ],
      currentlyAppliedFilters:[]
    }
  },
  components: {
    ResultsFilterComponent ,
    ResultsListComponent
  },
  methods:{
    async fetchQuerryFromUrl(){
      this.overlay = true;
      var searchParams = new URLSearchParams(location.search);
      const locationId = searchParams.get('PickUpLocationId');
      const age = Number(searchParams.get('DrvAge'));
      const country = searchParams.get('DrvCountry');
      const dropTime = searchParams.get('DropTime');
      const pickTime = searchParams.get('PickTime');
      const requestResults = await this.$axios.$post('/get-offers',{
        pickupLocationID: locationId,
        dropoffLocationID: locationId,
        driverAge: age,
        residenceCountry:country,
        dropoffAt:dropTime,
        pickupAt:pickTime,
        currency:"EUR"
      });
      this.results = await requestResults.response.data.offers.offers;
      this.filteredResults = [...this.results];
      // this.generateFilters();
      this.overlay = false;
    },
    // generateFilters(){
    //     this.sortsArray.forEach(function (item){
    //         switch(item.type){
    //           case "Pickup location":
    //             this.pickupLocationsValues();
    //             break;
    //           case "Vendors":
    //             this.vendorValues();
    //             break;
    //         }
    //     },this)
    // },

    // pickupLocationsValues(){
    //   this.sortsArray[0].values = [... new Set(this.results.map(x=>x.pickupBranch.location.type.name))];
    // },
    // vendorValues(){
    //   this.sortsArray[1].values = [... new Set(this.results.map(x=>x.pickupBranch.vendor.name))];
    // },
    triggerFilters(vals){
      const keyName = Object.keys(vals)[0]; // add for loop
      if(this.currentlyAppliedFilters.some(val=>val.type===keyName)){
          const itemIndex = this.currentlyAppliedFilters.findIndex(x => x.type ===keyName);
          if(vals[keyName] && vals[keyName].length<1){
              this.currentlyAppliedFilters.splice(itemIndex,1);
                      console.log('should be removed');
          }
          else{
            this.currentlyAppliedFilters.splice(itemIndex, 1, vals[keyName]);
            // this.currentlyAppliedFilters[itemIndex] = vals[keyName];
            console.log(vals[keyName]);
          }
      }
      else{
         this.currentlyAppliedFilters.push({keyName:vals[keyName]});
      }
      this.revaluateShownResults();
    },
    revaluateShownResults(){

    }
  },
  mounted() {
    this.fetchQuerryFromUrl();
  },
  computed:{
    filteredArray:{
      get(){
        return this.results;
      //   if(this.currentlyAppliedFilters.length<1){
      //     return this.results;
      //   }
      //   return this.filteredResults.filter((val)=>{
      //     return val.pickupBranch.vendor.name==="Interrent";
      // });
      }
    }
  }
}
</script>