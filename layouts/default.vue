<template>
  <v-app>
    <header/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { header } from "../components/Global/Header";

export default {
}
</script>
