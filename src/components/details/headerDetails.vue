<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '../../stores/pokemonStore';
import AngleLeft from '../../assets/svg/angle-left.vue';
import AngleRight from '../../assets/svg/angle-right.vue';

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

const formatNumber = (id) => {
  return id ? id.toString().padStart(4, '0') : '----';
};

const capitalizeName = (name) => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Unknown';
};
</script>

<template>
    <div class="header-container">
        <div class="left" @click="goToPrevious">
            <AngleLeft />
            <span class="number">N.° {{ formatNumber(previousPokemon.id) || '---' }}</span>
            <span class="name">{{ capitalizeName(previousPokemon.name) || 'Unknown' }}</span>
        </div>
        <div class="rigth" @click="goToNext">
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
}

.left:hover{
    background-color: #30A7D7;
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
}

.rigth:hover{
    background-color: #30A7D7;
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

}

</style>