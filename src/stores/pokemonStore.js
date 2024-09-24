import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePokemonStore = defineStore("pokemonStore", () => {
  // Variables centralizadas
  const pokemons = ref([]);

  const pokemonDetails = ref({});
  const pokemonSpecies = ref({});
  const pokemonEvolution = ref({});
  const previousPokemon = ref({});
  const nextPokemon = ref({});

  const MAX_POKEMON_ID = 1025;
  const MIN_POKEMON_ID = 1;

  const isLoading = ref(false);
  const error = ref("");

  // Método para obtener los primeros 20 Pokémon
  async function getPokemons() {
    isLoading.value = true;
    error.value = "";
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 1025,
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
    } catch (err) {
      error.value = "Error al obtener los Pokémon";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Método para obtener Pokémon de manera aleatoria ya cargados en la store
  function getRandomPokemons() {
    if (pokemons.value.length > 0) {
      pokemons.value = shuffleArray(pokemons.value);
    } else {
      console.error("No hay Pokémon cargados para desordenar.");
    }
  }

  // Función para desordenar un array (implementación del algoritmo de Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
    return array;
  }

  async function searchPokemonByNameOrId(searchTerm) {
    isLoading.value = true;
    error.value = "";
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      pokemons.value = [
        {
          id: response.data.id,
          name: response.data.name,
          types: response.data.types.map((type) => type.type.name),
          image: response.data.sprites.other["official-artwork"].front_default,
        },
      ];
    } catch (err) {
      error.value = `Error al obtener el Pokémon: ${err.message}`;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Método para obtener los detalles básicos del Pokémon (nombre, id, stats, tipos, altura, peso, habilidades)
  async function getPokemonDetails(id) {
    isLoading.value = true;
    error.value = "";
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      pokemonDetails.value = {
        id: Number(response.data.id),
        name: response.data.name,
        stats: response.data.stats,
        types: response.data.types.map((type) => type.type.name),
        height: response.data.height,
        weight: response.data.weight,
        abilities: response.data.abilities.map(
          (ability) => ability.ability.name
        ),
        image: response.data.sprites.other["official-artwork"].front_default,
      };

      pokemonDetails.value.weaknesses = await getPokemonWeaknesses(
        pokemonDetails.value.types
      );
    } catch (err) {
      error.value = `Error al obtener los detalles del Pokémon: ${err.message}`;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Método para obtener información de la especie (sexo, categoría, y descripciones específicas)
  async function getPokemonSpecies(id) {
    isLoading.value = true;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const descriptions = response.data.flavor_text_entries
        .filter(
          (entry) =>
            entry.language.name === "en" &&
            (entry.version.name === "red" || entry.version.name === "blue")
        )
        .map((entry) => ({
          version: entry.version.name,
          text: entry.flavor_text.replace(/[\n\f]/g, " "),
        }));

      pokemonSpecies.value = {
        gender_rate: response.data.gender_rate,
        category: response.data.genera.find(
          (genus) => genus.language.name === "en"
        ).genus,
        evolution_chain: response.data.evolution_chain.url,
        descriptions: descriptions,
      };
    } catch (err) {
      error.value = `Error al obtener los detalles de la especie: ${err.message}`;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Método para obtener las evoluciones del Pokémon
  async function getPokemonEvolution(chainUrl) {
    try {
      const response = await axios.get(chainUrl);
      let evolutions = [];
      let currentEvolution = response.data.chain;

      // Recorrer toda la cadena de evolución
      do {
        const speciesUrl = currentEvolution.species.url;
        const pokemonId = speciesUrl.split("/").filter(Boolean).pop(); // Extraer el ID del Pokémon de la URL de la especie
        const pokemonDetails = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );

        evolutions.push({
          id: pokemonDetails.data.id,
          name: currentEvolution.species.name,
          types: pokemonDetails.data.types.map((type) => type.type.name),
          image:
            pokemonDetails.data.sprites.other["official-artwork"].front_default,
        });

        currentEvolution = currentEvolution.evolves_to[0];
      } while (currentEvolution);

      pokemonEvolution.value = evolutions;
      console.log(pokemonEvolution.value);
    } catch (err) {
      error.value = `Error al obtener la cadena de evolución: ${err.message}`;
      console.error(err);
    }
  }

  async function getPokemonWeaknesses(types) {
    isLoading.value = true;
    error.value = "";

    try {
      const weaknesses = new Set();

      for (const type of types) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${type}`
        );

        // Agregar todas las debilidades del tipo actual al conjunto de debilidades
        response.data.damage_relations.double_damage_from.forEach(
          (weakness) => {
            weaknesses.add(weakness.name);
          }
        );
      }

      return Array.from(weaknesses); // Convertir el conjunto en un array
    } catch (err) {
      error.value = `Error al obtener las debilidades: ${err.message}`;
      console.error(err);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  // Método para obtener el Pokémon anterior (considerando 1025 Pokémon)
  async function getPreviousPokemon(id) {
    const previousId = id === MIN_POKEMON_ID ? MAX_POKEMON_ID : id - 1; // Si es el 1, va al 1025
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${previousId}`
      );
      previousPokemon.value = {
        id: response.data.id,
        name: response.data.name,
      };
    } catch (err) {
      error.value = `Error al obtener el Pokémon anterior: ${err.message}`;
      console.error(err);
    }
  }

  // Método para obtener el Pokémon siguiente (considerando 1025 Pokémon)
  async function getNextPokemon(id) {
    const nextId = id === MAX_POKEMON_ID ? MIN_POKEMON_ID : id + 1; // Si es el 1025, va al 1
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nextId}`
      );
      nextPokemon.value = {
        id: response.data.id,
        name: response.data.name,
      };
    } catch (err) {
      error.value = `Error al obtener el siguiente Pokémon: ${err.message}`;
      console.error(err);
    }
  }

  // Método principal para obtener todos los detalles
  async function getPokemonFullDetails(id) {
    isLoading.value = true;
    try {
      await getPokemonDetails(id);
      await getPokemonSpecies(id);
      await getPokemonEvolution(pokemonSpecies.value.evolution_chain);
      await getPreviousPokemon(Number(id));
      await getNextPokemon(Number(id));
    } catch (err) {
      error.value = `Error al obtener los detalles completos: ${err.message}`;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Ordenar Pokémon por ID de mayor a menor
  function sortPokemonByIdDesc() {
    pokemons.value.sort((a, b) => b.id - a.id);
  }

  // Ordenar Pokémon por ID de menor a mayor
  function sortPokemonByIdAsc() {
    pokemons.value.sort((a, b) => a.id - b.id);
  }

  // Ordenar Pokémon por nombre de A-Z
  function sortPokemonByNameAsc() {
    pokemons.value.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Ordenar Pokémon por nombre de Z-A
  function sortPokemonByNameDesc() {
    pokemons.value.sort((a, b) => b.name.localeCompare(a.name));
  }

  return {
    pokemons,
    isLoading,
    error,

    getPokemons,
    getRandomPokemons,
    searchPokemonByNameOrId,

    pokemonDetails,
    pokemonSpecies,
    pokemonEvolution,
    getPokemonWeaknesses,
    previousPokemon,
    nextPokemon,
    getPokemonFullDetails,

    sortPokemonByIdDesc,
    sortPokemonByIdAsc,
    sortPokemonByNameAsc,
    sortPokemonByNameDesc,
  };
});
