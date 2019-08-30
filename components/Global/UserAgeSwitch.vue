<template>
    <div class="d-inline-flex align-center">
        <div class="mb-2">
            <v-switch inset v-model="switchMe">
                <template v-slot:label input-value="true">
                    Driver age between 30 and 69?
                </template>
            </v-switch>
        </div>
    </div>

</template>

<script>
export default {
data:function(){
    return {
        switchMe:true
    }
}
}
</script>

<style>

</style>