<script lang="ts">
import { defineAsyncComponent, defineComponent, provide, ref } from "vue";
import { NMessageProvider } from "naive-ui";

// import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header: defineAsyncComponent(() => import("./components/Header.vue")),
    NMessageProvider,
  },
  setup() {
    provide("sharedToken", ref(""));
    provide("currentUser", ref(""));
  }
});
</script>

<template>
  <n-message-provider>
    <Header />
    <router-view></router-view>
  </n-message-provider>
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
