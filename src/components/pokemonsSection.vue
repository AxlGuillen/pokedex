<script setup>
import { usePokemonStore } from '../stores/pokemonStore';
import PokemonCard from './card.vue';

const pokemonStore = usePokemonStore();
</script>

<template>
    <div class="pokemon-grid">
      <PokemonCard v-for="pokemon in pokemonStore.pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
</template>

<style scoped>
.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  max-width: 850px;
  gap: 10px;
}

@media (max-width: 1024px) { /* Tablets y dispositivos menores */
  .pokemon-grid {
    justify-content: center;
  }

  .pokemon-card {
    width: 32%;
  }
}

@media (max-width: 768px) { /* Para tablets */
  .pokemon-card {
    width: 45%;
  }
}

@media (max-width: 480px) { /* Para móviles */
  .pokemon-card {
    width: 90%;
  }
}
</style>