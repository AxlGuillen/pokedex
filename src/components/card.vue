<template>
  <div class="pokemon-card">
    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image">
    <div>
      <div class="pokemon-id"># {{ pokemon.id.toString().padStart(3, '0') }}</div>
      <div class="pokemon-name">{{ capitalize(pokemon.name) }}</div>
      <div class="pokemon-types">
        <span v-for="type in pokemon.types" :key="type" class="pokemon-type">{{ type }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<style scoped>
.pokemon-card {
  width: 200px;
  cursor: pointer;
}

.pokemon-card:hover {
  transform: scale(1.03);
}

.pokemon-image {
  width: 100%;
  height: auto;
  background-color: #F2F2F2;
}

.pokemon-id {
  font-size: 0.8em;
  color: #919191;
}

.pokemon-name {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.pokemon-type {
  display: inline-block;
  background-color: #eee;
  border-radius: 5px;
  padding: 3px 5px;
  margin: 2px;
  font-size: 0.8em;
  color: #555;
}
</style>
