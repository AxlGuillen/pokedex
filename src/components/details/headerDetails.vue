<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '../../stores/pokemonStore';
import AngleLeft from '../../assets/svg/angle-left.vue';
import AngleRight from '../../assets/svg/angle-right.vue';
import { capitalize, formatNumber } from '../../utils/helpers';

const pokemonStore = usePokemonStore();
const router = useRouter();

const previousPokemon = computed(() => pokemonStore.previousPokemon);
const nextPokemon = computed(() => pokemonStore.nextPokemon);
const pokemonDetails = computed(() => pokemonStore.pokemonDetails);

const goToPrevious = () => {
  if (previousPokemon.value.id) {
    pokemonStore.getPokemonFullDetails(previousPokemon.value.id);
    router.push({ name: 'details', params: { id: previousPokemon.value.id } });
  }
};

const goToNext = () => {
  if (nextPokemon.value.id) {
    pokemonStore.getPokemonFullDetails(nextPokemon.value.id);
    router.push({ name: 'details', params: { id: nextPokemon.value.id } });
  }
};

const capitalizeName = (name) => name ? capitalize(name) : 'Unknown';

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
    <div class="header-container">
        <div class="left" @click="goToPrevious" @mouseenter="ripple">
            <AngleLeft />
            <span class="number">N.° {{ formatNumber(previousPokemon.id) || '---' }}</span>
            <span class="name">{{ capitalizeName(previousPokemon.name) || 'Unknown' }}</span>
        </div>
        <div class="rigth" @click="goToNext" @mouseenter="ripple">
            <span class="name">{{ capitalizeName(nextPokemon.name) || 'Unknown' }}</span>
            <span class="number">N.° {{ formatNumber(nextPokemon.id) || '---' }}</span>
            <AngleRight />
        </div>
    </div>
    <h1 class="title">{{ capitalizeName(pokemonDetails.name) }} <span class="id-name">N.° {{ formatNumber(pokemonDetails.id) }}</span></h1>
</template>

<style scoped>

.header-container{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    height: fit-content;
    gap: 5px;
    background-color: #fff;
}

.left{
    clip-path: polygon(100% 0, 100% 60%, 30% 60%, 20% 100%, 0 100%, 0 0);
    background-color: #A4A4A4;
    display: flex;
    justify-content: center;
    width: 50%;
    height: 100px;
    gap: 15px;
    padding-top: 20px;
    font-weight: bold;
    font-size: 1.5rem;
    position: relative;
    overflow: hidden;
}

.left:hover{
    background-color: #30A7D7;
    cursor: pointer;
}

.rigth{
    clip-path: polygon(100% 0, 100% 100%, 80% 100%, 70% 60%, 0 60%, 0 0);
    background-color: #A4A4A4;
    display: flex;
    justify-content: center;
    width: 50%;
    height: 100px;
    gap: 15px;
    padding-top: 20px;
    font-weight: bold;
    font-size: 1.5rem;
    position: relative;
    overflow: hidden;
}

.rigth:hover{
    background-color: #30A7D7;
    cursor: pointer;
}

.number {
    color: #fff;
}

.name{
    color: #616161;
}

.title{
    margin-top: -30px;
    text-align: center;
    font-weight: normal;
}

.id-name{
    color: #616161;
}


@media (max-width: 768px) {
  
    .left{
        padding-top: 15px;
        padding-left: 20px;
        justify-content: space-between;
    }

    .rigth{
        padding-top: 15px;
        padding-right: 20px;
        justify-content: space-between;
    }

    .name {
        display: none;
    }

    h1{
        font-size: 22px;
    }
}

</style>