<template>
  <div class="d-flex pa-2">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Pickup location</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container v-for="value in filterOptions[0].values" :key="value">
            <v-checkbox v-model="selected" :label="value" :value="value" />
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Vendors</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container v-for="value in filterOptions[1].values" :key="value">
            <v-checkbox v-model="selected" :label="value" :value="value" />
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
export default {
  props: ['filters'],
  data () {
    return {
      filterOptions: this.filters,
      selectedLocations: [],
      selectedVendors: [],
      selected: [],
      checkbox2: true
    }
  },
  watch: {
    selected (val) {
      this.$emit('triggerFilters', val)
    }
  }
}
</script>

<style>

</style>
