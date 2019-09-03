<template>
  <div>
    <v-container>
      <v-row no-gutters class="mt-12">
        <v-col xl="6" md="6" class="col-12 mt-12">
          <IndexPageComponent />
        </v-col>
        <v-col xl="6" md="6" class="col-12 mt-12">
          <IndexPageTestiomonialComponent />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import IndexPageComponent from '../components/Index/IndexPageComponent'
import IndexPageTestiomonialComponent from '../components/Index/IndexPageTestimonialComponent'
export default {
  components: {
    IndexPageComponent,
    IndexPageTestiomonialComponent
  },
  data () {
    return {
      title: 'Vehicle rent'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: `
        Find the best vehicle rent deal in any location 
        for your holiday or business trip with great support 
        in any language. No hidden costs. No worries.
        ` }
      ]
    }
  },
  async asyncData ({ $axios }) {
    const fetchedObject = await $axios.$get(`https://api.vehicle-rent.com/get-residence-countries?format=json`)
    return { data: fetchedObject.response.data.residenceCountries }
  }
}
</script>
<style>
</style>
