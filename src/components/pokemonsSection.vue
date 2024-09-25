<script setup>
import { ref, computed } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore';
import PokemonCard from './card.vue';

const pokemonStore = usePokemonStore();

const limitPokemons = ref(12);

const limitedPokemons = computed(() => {
  return pokemonStore.pokemons.slice(0, limitPokemons.value);
});

const isLoadMoreDisabled = computed(() => {
  return pokemonStore.pokemons.length === 1 || limitPokemons.value >= 1000;
});

const loadMorePokemons = () => {
    limitPokemons.value += 12;
}
</script>

<template>
    <div class="pokemon-grid">
      <PokemonCard v-for="pokemon in limitedPokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div class="btn-container">
        <button @click="loadMorePokemons" 
                :disabled="isLoadMoreDisabled" 
                :class="{ 'disabled-btn': isLoadMoreDisabled }" 
                class="btn-surprise">
            Load more Pokémons
        </button>
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

.btn-container{
    display: flex;
}

.btn-surprise{
    background-color: #30A7D7;
    border: none;
    margin: 40px auto;
    padding: 10px 20px;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.btn-surprise:hover{
    background-color: #1B82B1;
}

.btn-surprise.disabled-btn {
    background-color: #b0b0b0; /* Color opaco */
    cursor: not-allowed;
    opacity: 0.6;
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