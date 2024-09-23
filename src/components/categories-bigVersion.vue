<template>
  <div class="pokemon-types-container">
    <span
      v-for="type in types"
      :key="type"
      :style="typeStyle(type)"
      class="pokemon-type"
    >
      {{ capitalize(type) }}
    </span>
  </div>
</template>

<script setup>
import { typesColors } from '../types/colors';

defineProps({
  types: Array
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function typeStyle(type) {
  const color = typesColors[type];
  if (Array.isArray(color)) {
    // Si es un array, aplicar un gradiente
    return { background: `linear-gradient(to top, ${color[0]} 50%, ${color[1]} 50%)` };
  } else {
    // Color sólido
    return { backgroundColor: color };
  }
}
</script>

<style scoped>
.pokemon-types-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
}


.pokemon-type {
  width: 32.5%;
  font-size: medium;
  padding: 2px;
  border-radius: 5px;
  margin-bottom: 1%;
  color: white;
  display: flex;
  justify-content: center;
}

</style>
