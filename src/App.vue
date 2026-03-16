<script setup>
import { RouterView } from 'vue-router';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="app">
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
