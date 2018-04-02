<template>
    <div class="home">
        <img src="~assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App goods"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from 'components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        HelloWorld,
    },
}
</script>
