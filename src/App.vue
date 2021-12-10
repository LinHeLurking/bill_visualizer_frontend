<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

// import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header: defineAsyncComponent(() => import("./components/Header.vue")),
  }
});
</script>

<template>
  <Header />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
