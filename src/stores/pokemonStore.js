import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePokemonStore = defineStore("pokemonStore", () => {
  // Variables centralizadas
  const pokemons = ref([]);
  const isLoading = ref(false);
  const error = ref("");

  // Método para obtener los primeros 50 Pokémon
  async function get20Pokemons() {
    isLoading.value = true;
    error.value = "";
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 20,
          offset: 0,
        },
      });

      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: details.data.name,
            types: details.data.types.map((typeInfo) => typeInfo.type.name),
            image: details.data.sprites.other["official-artwork"].front_default,
          };
        })
      );

      pokemons.value = pokemonData;
      console.log(pokemons.value);
    } catch (err) {
      error.value = "Error al obtener los Pokémon";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    pokemons,
    isLoading,
    error,
    get20Pokemons,
  };
});
