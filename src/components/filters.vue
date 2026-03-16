<script setup>
import { ref } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore';

const pokemonStore = usePokemonStore();
const selectedOption = ref('Sort results by');

const handleSortChange = () => {
  switch (selectedOption.value) {
    case 'Lowest Number (first)':
      pokemonStore.sortPokemonByIdAsc();
      break;
    case 'Highest Number (last)':
      pokemonStore.sortPokemonByIdDesc();
      break;
    case 'A-Z':
      pokemonStore.sortPokemonByNameAsc();
      break;
    case 'Z-A':
      pokemonStore.sortPokemonByNameDesc();
      break;
    default:
      break;
  }
};

const handleRandomPokemons = () => {
    pokemonStore.resetAndShufflePokemons();
};

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
        <div class="container">
            <button class="btn-surprise" @click="handleRandomPokemons" @mouseenter="ripple">
                <img src="../assets/refresh.png" alt="icon" class="icon" />
                Surprise Me!
            </button>
            <div class="select-wrapper">
                <img src="../assets/white-pokeball.png" alt="icon" class="select-icon" />
                <select v-model="selectedOption" class="select-filter" @change="handleSortChange">
                    <option disabled selected>Sort results by</option>
                    <option>Lowest Number (first)</option>
                    <option>Highest Number (last)</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>

.main-container{
    max-width: 850px;
    margin: 40px auto;
}

.container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.btn-surprise{
    width: 40%;
    background-color: #30A7D7;
    border: none;
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}


.btn-surprise:hover{
    background-color: #1B82B1;
}

.select-filter {
    background-color: #313131;
    outline: none;
    width: 100%;
    padding: 10px 10px 10px 40px;
    font-size: 20px;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
}

.select-filter:hover{
    background-color: #282828;
}

.select-wrapper {
    position: relative;
    width: 40%;
}

.select-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    pointer-events: none;
}

/* Estilos para pantallas de tablet (768px a 1024px) */
@media (max-width: 768px) {
  
    .container{
        flex-direction: column;
        gap: 10px;
    }

    .btn-surprise{
        width: 80%;
        margin: auto;
    }

    .select-wrapper{
        width: 80%;
        margin: auto;
    }

}

/* Estilos para pantallas de móvil (menor a 768px) */
@media (max-width: 480px) {
    .btn-surprise{
        width: 90%;
    }

    .select-wrapper{
        width: 90%;
    }
}

</style>