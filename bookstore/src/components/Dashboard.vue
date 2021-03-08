<template>
    <div class="dashboard-page">
        <App-bar></App-bar>
        <router-view />
        <Footer-bar></Footer-bar>
    </div>
</template>

<script>
import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
export default {
    components: {
        'App-bar': AppBar,
        'Footer-bar': Footer
    }
}
</script>

<style scoped>

</style>