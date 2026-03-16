<script setup>
import { ref } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore';
import AngleDowm from '../assets/svg/angle-down.vue';
import SearchIcon from '../assets/svg/searchIcon.vue';

const pokemonStore = usePokemonStore();

const pokemonToSearch = ref('')

const handleSearchPokemon = () => {
    pokemonStore.searchPokemonByNameOrId(pokemonToSearch.value);
    pokemonToSearch.value = '';
}

const ripple = (event) => {
  const btn = event.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const circle = document.createElement('span');
  circle.style.cssText = `
    position: absolute;
    border-radius: 50%;
    width: ${size}px;
    height: ${size}px;
    left: ${event.clientX - rect.left - size / 2}px;
    top: ${event.clientY - rect.top - size / 2}px;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.3);
  `;
  btn.querySelector('[data-ripple]')?.remove();
  circle.dataset.ripple = '';
  btn.appendChild(circle);
  circle.animate(
    [{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1)', opacity: 0 }],
    { duration: 600, easing: 'linear', fill: 'forwards' }
  ).onfinish = () => circle.remove();
};
</script>

<template>
    <div class="main-container">
        <div class="header">
            <div class="search-section">
               <h2>Name or Number</h2>
               <div class="search-container">
                    <input v-model="pokemonToSearch" @keydown.enter="handleSearchPokemon" type="text" class="input-search">          
                    <button @click="handleSearchPokemon" @mouseenter="ripple" class="button-search">
                        <SearchIcon />
                    </button>
               </div>
               <p>
                Use the Advanced Search to explore Pokémon by type,
                weakness, Ability and more!
               </p>
            </div>
            <div class="information">
                <p>Search for a Pokemon By name or using its National Pokédex number.</p>
            </div>
        </div>
        <div class="advanced-search">

            <div class="shape-content">
                <span>Show Advanced Search</span><AngleDowm />
            </div>
        </div>
        <div class="shape-container"></div>
    </div>
</template>

<style scoped>

h2 {
  font-weight: normal;
  margin-inline-start: 0px;
}


.main-container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.header{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    gap: 50px;
    padding: 30px;
    background-color: #313131;
    color: #fff;
}

.search-section{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    max-width: 400px;
    gap: 10px;
}

.search-section p {
  font-size: small;
}

.search-container{
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.input-search{
    width: 350px;
    height: 43px;
    border: #616161 solid 2px;
    border-radius: 5px;
    padding: 10px;
}

.button-search{
    padding: 10px;
    background-color: #EE6B2F;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}


.button-search:hover {
  background-color: #da471b;
}

.information{
    background-color: #4DAD5B;
    max-width: 400px;
    height: fit-content;
    padding: 15px 20px;
    border-radius: 5px;
    font-size: larger;
}

.advanced-search{
    display: flex;
    background-color: #616161;
    height: 50px;
    position: relative;
    z-index: 1;
}


.shape-container {
  clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
  background-color: #616161;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 30%;
  height: 20px;
  margin: auto;
}

.shape-content{
    display: flex;
    justify-content: center;
    align-content: center;
    margin: auto;
    color: #fff;
    margin-top: 40px;
    font-size: small;
}

/* Estilos para pantallas de tablet (768px a 1024px) */
@media (max-width: 1024px) {
  
    .header{
        justify-content: left;
    }

    .search-section{
        max-width: 600px;
        margin: auto;
    }

    .search-section p {
        font-size: 17px;
    }

    .shape-container {
        clip-path: polygon(0 0, 100% 0, 94% 100%, 6% 100%);
        width: 90%;
    }

    .input-search{
        width: 500px;
    }

    .button-search{
        padding: 10px 20px;
    }

    .information{
        margin-left: 30px;
    }

}

/* Estilos para pantallas de móvil (menor a 768px) */
@media (max-width: 760px) {

    .header{
        justify-content: left;
        padding: 10px;
    }

    .search-section{
        max-width: 400px;
        margin: auto;
    }

    .search-section h2 {
        font-size: 32px;
    }

    .input-search{
        width: 250px;
    }

    .button-search{
        padding: 10px;
    }

    .information{
        margin-left: -20px;
    }

    .shape-container {
        width: 80%;
    }
}

</style>