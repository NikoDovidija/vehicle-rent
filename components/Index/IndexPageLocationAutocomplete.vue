<template>
<v-row>
    <v-col>
        <v-autocomplete
        v-model="model"
        :search-input.sync="search"
        cache-items
        hide-no-data
        hide-details
        flat
        solo        
        outlined
        rounded
        label="Location"
        ></v-autocomplete>   
    </v-col>
</v-row>
</template>

<script>
export default {
    data: function(){ 
        return {
            select:'',descriptionLimit: 60,
            entries: [],
            isLoading: false,
            model: null,
            search: null,
        }
    },
    watch: {
        search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        // fetch('https://api.vehicle-rent.com/get-locations')
        //   .then(res => res.json())
        //   .then(res => {
        //     const { count, entries } = res
        //     this.count = count
        //     this.entries = entries
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        //   .finally(() => (this.isLoading = false))
      },
    }
}
</script>

<style lang="scss">

</style>