<script setup>
import { computed} from 'vue';
import { usePokemonStore } from '../../stores/pokemonStore';

const pokemonStore = usePokemonStore();

const maxPoints = 15;
const pointsPerBar = 14;
const stats = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];

const pokemonStats = computed(() => {
  return pokemonStore.pokemonDetails.stats ? pokemonStore.pokemonDetails.stats.map(stat => stat.base_stat) : [];
});


const calculateFilledBars = (statValue) => {
  return Math.floor(statValue / pointsPerBar);
};
</script>

<template>
  <div class="chart-container">
    <h1>Stats</h1>
    <div class="chart-generator">
      <div v-for="(stat, statIndex) in stats" :key="statIndex" class="stat-column">
        <div v-for="point in maxPoints" :key="point"
             class="one-point"
             :class="{ 'filled': maxPoints - point < calculateFilledBars(pokemonStats[statIndex]) }"></div>
        <span class="name-column">{{ stat }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #A4A4A4;
  padding: 10px 20px;
  border-radius: 10px;
}

.chart-generator {
  display: flex;
  flex-direction: row; /* Colocar las columnas en fila */
  gap: 4px;
}

.stat-column {
  display: flex;
  flex-direction: column; /* Las rallitas van hacia abajo */
  align-items: center;
  gap: 2px;
  flex: 1;
}

.name-column {
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
  font-size: clamp(12px, 2vw, 18px);
}

.one-point {
  background-color: #fff;
  height: 10px;
  width: 100%;
}

.one-point.filled {
  background-color: #30A7D7; /* Cambiar el color de las barras llenas */
}

h6 {
  margin-top: 5px;
  color: #000;
}
</style>
