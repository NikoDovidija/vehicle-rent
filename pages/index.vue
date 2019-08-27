<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
    </v-flex>
  </v-layout>
</template>

<script>

export default {
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
        `}
      ]
    }
  }
}
</script>
