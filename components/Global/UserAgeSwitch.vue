<template>
  <v-col>
    <div class="mb-2">
      <v-switch v-model="switchMe" inset>
        <template v-slot:label input-value="true">
          Driver age between 30 and 69?
        </template>
      </v-switch>
    </div>
    <div v-if="!switchMe" class="mb-2">
      <v-select
        v-model="userAge"
        label="Age"
        :items="ageValues"
        flat
        outlined
        background-color="white"
        rounded
      />
    </div>
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      switchMe: true,
      age: 30
    }
  },
  computed: {
    userAge: {
      get () {
        return this.age !== null ? this.age : 30
      },
      set (value) {
        this.age = value
      }
    },
    ageValues () {
      return [...this.getRange(0, 80)]
    }
  },

  watch: {
    age (value) {
      this.$store.dispatch('setAge', value)
    },
    switchMe (value) {
      if (value) {
        this.$store.dispatch('setAge', 30)
      }
    }
  },
  methods: {
    getRange: function* range (start, end) {
      for (let i = start; i <= end; i++) {
        yield i
      }
    }
  }
}
</script>

<style>

</style>
