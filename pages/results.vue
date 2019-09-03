<template>
  <div>
    <v-container>
      <v-row no-gutters class="mt-12">
        <v-col>
          <v-overlay
            :value="overlay"
            :absolute="absolute"
          >
            <v-progress-circular indeterminate size="64" />
          </v-overlay>
        </v-col>
        <v-col v-if="!overlay" xl="10" md="8" class="col-12">
          <ResultsListComponent :items="filteredArray" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ResultsListComponent from '../components/Results/ResultsListComponent'
import 'url-search-params-polyfill'
export default {
  components: {
    ResultsListComponent
  },
  data () {
    return {
      loader: null,
      absolute: true,
      overlay: false,
      results: [],
      filteredResults: [],
      sortsArray: [
        {
          type: 'Pickup location',
          values: []
        },
        {
          type: 'Vendors',
          values: []
        }
      ],
      currentlyAppliedFilters: []
    }
  },
  computed: {
    filteredArray: {
      get () {
        return this.results
      }
    }
  },
  mounted () {
    this.fetchQuerryFromUrl()
  },
  methods: {
    async fetchQuerryFromUrl () {
      this.overlay = true
      const searchParams = new URLSearchParams(location.search)
      const locationId = searchParams.get('PickUpLocationId')
      const age = Number(searchParams.get('DrvAge'))
      const country = searchParams.get('DrvCountry')
      const dropTime = searchParams.get('DropTime')
      const pickTime = searchParams.get('PickTime')
      const requestResults = await this.$axios.$post('/get-offers', {
        pickupLocationID: locationId,
        dropoffLocationID: locationId,
        driverAge: age,
        residenceCountry: country,
        dropoffAt: dropTime,
        pickupAt: pickTime,
        currency: 'EUR'
      })
      this.results = await requestResults.response.data.offers.offers
      this.filteredResults = [...this.results]
      this.overlay = false
    }
  }
}
</script>
