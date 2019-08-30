<template>
  <v-app>
    <Header/>
    <v-content>
        <nuxt />
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
export default {
   components: {
    Header,
    Footer,
  }
}
</script>
