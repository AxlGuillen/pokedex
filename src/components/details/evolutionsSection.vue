<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '../../stores/pokemonStore';

const router = useRouter();
const pokemonStore = usePokemonStore();

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
            <div>
                <h1>imagenes c:</h1>
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

.evolutions-container{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    background-image: url('https://assets.pokemon.com/static2/_ui/img/chrome/body_bg.png');
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 30px;
    clip-path: polygon(100% 0, 100% 100%, 3% 100%, 0 90%, 0 0);
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

@media (max-width: 480px) {
  .main-container{
        max-width: 90%;
   }
}

</style>