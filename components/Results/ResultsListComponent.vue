<template>
  <div class="container">
    <v-col v-if="resultList && resultList.length>0" xl="12" md="12" class="col-12">
      <ResultsFilterComponent :filters="sortsArray" @triggerFilters="triggerFilters" />
    </v-col>
    <div v-if="resultList && resultList.length>0">
      <div class="d-inline-flex">
        <p>Sort by:</p>
      </div>
      <select v-model="selected" class="d-inline-flex">
        <option>ASC</option>
        <option>DESC</option>
      </select>
    </div>
    <div v-for="item in resultList" :key="item.id">
      <ResultsListItemComponent :item="item" />
    </div>
    <div v-if="resultList && resultList.length<1">
      No results
    </div>
  </div>
</template>

<script>
import ResultsListItemComponent from './ResultsListItemComponent'
import ResultsFilterComponent from './ResultsFilterComponent'
export default {
  components: {
    ResultsListItemComponent,
    ResultsFilterComponent
  },
  props: {
    items: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      selected: 'ASC',
      dataItems: this.items,
      filteredItems: this.items,
      sortByLow: true,
      filters: [],
      sortsArray: [
        {
          type: 'Pickup location',
          values: []
        },
        {
          type: 'Vendors',
          values: []
        }
      ]
    }
  },
  computed: {
    resultList: {
      get () {
        this.sortByPrice()
        return this.switchingArray
      }
    },
    switchingArray: {
      get () {
        return this.filters.length > 0 ? this.filteredItems : this.dataItems
      },
      set (val) {
        this.filteredItems = val
      }
    }
  },

  mounted () {
    this.generateFilters()
  },
  methods: {
    sortByPrice () {
      const val = this.selected
      this.switchingArray.sort((first, second) => {
        if (val === 'ASC') {
          return first.quotes[0].price.offer.total.converted.amount >
                        second.quotes[0].price.offer.total.converted.amount ? 1 : -1
        }
        return first.quotes[0].price.offer.total.converted.amount <
                        second.quotes[0].price.offer.total.converted.amount ? 1 : -1
      })
    },
    triggerFilters (val) {
      this.filters = [...val]
      const toCompare = [...this.filters]
      this.filteredItems = [...this.dataItems]
      this.filteredItems = this.filteredItems.filter(function (item) {
        return toCompare.includes(item.pickupBranch.location.type.name) ||
                toCompare.includes(item.pickupBranch.vendor.name)
      })
    },
    generateFilters () {
      this.sortsArray.forEach(function (item) {
        switch (item.type) {
          case 'Pickup location':
            this.pickupLocationsValues()
            break
          case 'Vendors':
            this.vendorValues()
            break
        }
      }, this)
    },

    pickupLocationsValues () {
      this.sortsArray[0].values = [...new Set(this.dataItems.map(x => x.pickupBranch.location.type.name))]
    },
    vendorValues () {
      this.sortsArray[1].values = [...new Set(this.dataItems.map(x => x.pickupBranch.vendor.name))]
    }
  }
}
</script>

<style>

</style>
