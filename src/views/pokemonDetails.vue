<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/pokemonStore';
import HeaderDetails from '../components/details/headerDetails.vue';
import StatsSectionDetails from '../components/details/statsSectionDetails.vue';

const route = useRoute();
const pokemonStore = usePokemonStore();

const pokemonId = route.params.id;

onMounted(() => {
    pokemonStore.getPokemonFullDetails(pokemonId);
});
</script>

<template>
    <div class="bg">
        <HeaderDetails />
        <StatsSectionDetails />
    </div>
</template>

<style scoped>
.bg{
    background-image: url('https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png');
}
</style>