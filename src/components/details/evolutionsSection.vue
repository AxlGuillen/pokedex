<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '../../stores/pokemonStore';
import Categories from '../categories.vue';
import AngleRight from '../../assets/svg/angle-right.vue';

const router = useRouter();
const pokemonStore = usePokemonStore();

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const formatNumber = (id) => {
  return id ? id.toString().padStart(4, '0') : '----';
};

const goToDetails = (id) => {
  pokemonStore.getPokemonFullDetails(id);
  router.push({ name: 'details', params: { id: id } });
};

const goToHome = () => {
  router.push({ name: 'Home'});
}

const pokemonsEvolutions = computed(() => {
  return pokemonStore.pokemonEvolution;
});
</script>

<template>
    <div class="main-container">
        <div class="evolutions-container">
            <h1>Evolutions</h1>
            <div class="img-evolutions">
                <div v-for="(evolution, index) in pokemonsEvolutions" :key="evolution.id" class="generator-container" >
                    <div class="evolution-item" @click = "goToDetails(evolution.id)">
                        <img :src="evolution.image" :alt="evolution.name" />
                        <h1>{{ capitalize(evolution.name) }}</h1>
                        <h2>N.° {{ formatNumber(evolution.id) }}</h2>
                        <Categories class="categories" :types="evolution.types" />
                    </div>
                    <div>
                        <AngleRight class="arrow" v-if="index + 1 < pokemonsEvolutions.length"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <button  @click="goToHome" class="back-pokedex">
                Ir a la pokedex
            </button>
        </div>
    </div>
</template>

<style scoped>
.main-container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-width: 80%;
    margin: 0px auto;
    background-color: #fff;
    padding: 10px;
    padding-top: 50px;
}

.generator-container{
    display: flex;
    align-items: center;
}

.evolutions-container{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    background-image: url('https://assets.pokemon.com/static2/_ui/img/chrome/body_bg.png');
    padding: 30px 20px;
    gap: 10px;
    border-radius: 10px;
    margin-bottom: 30px;
    clip-path: polygon(100% 0, 100% 100%, 3% 100%, 0 90%, 0 0);
}

.evolutions-container h1{
    color: #fff;
}

.img-evolutions{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
    align-content: center;
}

.evolution-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.evolution-item h1{
    font-weight: normal;
}

.evolution-item h2{
    color: #A4ACAF;
    font-weight: normal;
}

.img-evolutions img{
    border: #fff solid 5px;
    border-radius: 100%;
    width: 50%;
    padding: 10px;
    box-shadow: 0 10px 10px #000000;
}

.arrow{
    width: 100px;
    height: 100px;
    color: #fff;
    background-color: #00000000;
}

.btn-container{
    display: flex;
    justify-content: end;
}

.back-pokedex {
    padding: 10px;
    background-color: #EE6B2F;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: large;
    font-weight: bolder;
}

.back-pokedex:hover {
  background-color: #da471b;
}

@media (max-width: 769px) {
    .main-container{
        flex-direction: column;
    }

    .evolutions-container{
        clip-path: polygon(100% 0, 100% 100%, 10% 100%, 0 97%, 0 0);
    }

    .img-evolutions{
        flex-direction: column;
    }
    .generator-container{
        flex-direction: column;
    }

    .arrow {
      transform: rotate(90deg); /* Rotar la flecha hacia abajo */
      transition: transform 0.3s ease; /* Suavizar la transición */
  }
}

</style>