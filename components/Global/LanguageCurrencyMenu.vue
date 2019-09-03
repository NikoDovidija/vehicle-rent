<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn text icon>
        <v-icon v-on="on">
          mdi-currency-eur
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn text @click="menu = false">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="menu = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      menu: null
    }
  }
}
</script>

<style>

</style>
