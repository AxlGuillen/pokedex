<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/pokemonStore';
import HeaderDetails from '../components/details/headerDetails.vue';

const route = useRoute();
const pokemonStore = usePokemonStore();

const pokemonId = route.params.id;

onMounted(() => {
    pokemonStore.getPokemonFullDetails(pokemonId);
});
</script>

<template>
    <HeaderDetails />
</template>

<style scoped>

</style>