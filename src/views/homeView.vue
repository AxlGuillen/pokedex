<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore';

import spinner from '../components/SpinnerComponent.vue'
import searchSection from '../components/header.vue';
import filters from '../components/filters.vue';
import PokemonsSection from '../components/pokemonsSection.vue';

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.get20Pokemons();
  
});
</script>

<template>
    <searchSection />
    <filters />
    <PokemonsSection />
    <spinner :show="pokemonStore.isLoading" />
</template>

<style scoped>
</style>