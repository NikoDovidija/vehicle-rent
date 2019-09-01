<template>
    <v-col>
        <div class="mb-2">
            <v-switch inset v-model="switchMe">
                <template v-slot:label input-value="true">
                    Driver age between 30 and 69?
                </template>
            </v-switch>
        </div>
        <div v-if="!switchMe" class="mb-2">
            <v-select
                label="Age"
                :items="ageValues"
                v-model="userAge"
                flat
                outlined
                background-color="white"
                rounded
            ></v-select>
        </div>
    </v-col>

</template>

<script>
export default {
data:function(){
    return {
        switchMe:true,
        age:30,
    }
},
computed:{
    userAge:{
      get() {
        return this.age !== null ? this.age : 30;
      },
      set(value){
        this.age = value;
      }
    },
    ageValues(){
        return [...this.getRange(0,80)];
    },
},
 methods:{
     getRange: function* range(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }
    },

    watch:{
         age(value){
            this.$store.dispatch('setAge',value);
         },
         switchMe(value){
             if(value){
             this.$store.dispatch('setAge',30);
             }
         }
    }
}
</script>

<style>

</style>