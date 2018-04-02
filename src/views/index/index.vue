<style>

</style>

<template>
    <div>
        <v-banner></v-banner>
        <v-service></v-service>
        <v-flow></v-flow>
        <v-question></v-question>
    </div>
</template>

<script>
import vBanner from './sub/banner.vue'
import vService from './sub/service.vue'
import vFlow from './sub/flow.vue'
import vQuestion from './sub/question.vue'

export default {
    components: {
        vBanner,vService, vFlow, vQuestion,
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    },
}
</script>
