<template>
  <v-container class="d-flex vr-header-holder justify-space-between">
    <div class="flex-column">
      <nuxt-link to="/">
        <img src="~/assets/images/main_logo.png">
      </nuxt-link>
    </div>
    <div class="flex-column float-xl-right align-self-center d-flex d-sm-none">
      <LanguageCurrencyMenu />
    </div>
  </v-container>
</template>

<script>
import LanguageCurrencyMenu from './LanguageCurrencyMenu'
export default {
  components: {
    LanguageCurrencyMenu
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/header/_appbar.scss";
</style>
