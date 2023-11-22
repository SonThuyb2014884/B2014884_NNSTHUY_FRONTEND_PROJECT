<script>
import AppBar from "./components/AppBar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    AppBar,
    Footer,
  },
};
</script>

<template>
  <div id="app">
    <AppBar />
 
    <router-view />
    
    <Footer></Footer>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
