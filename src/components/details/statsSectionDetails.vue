<script setup>
import { ref, computed} from 'vue';
import { usePokemonStore } from '../../stores/pokemonStore';
import Categories from '../categories-bigVersion.vue';
import StatsChart from './statsChart.vue';

const pokemonStore = usePokemonStore();
const selectedVersion = ref('blue');
const showModal = ref(false);
const thumbRef = ref(null);

const onEnter = (el, done) => {
  const thumbRect = thumbRef.value.getBoundingClientRect();
  const img = el.querySelector('.modal-img');
  const imgRect = img.getBoundingClientRect();

  const scale = thumbRect.width / imgRect.width;
  const dx = thumbRect.left + thumbRect.width / 2 - (imgRect.left + imgRect.width / 2);
  const dy = thumbRect.top + thumbRect.height / 2 - (imgRect.top + imgRect.height / 2);

  img.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  img.style.transformOrigin = 'center';
  img.style.transition = 'none';
  el.style.backgroundColor = 'rgba(0,0,0,0)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      img.style.transition = 'transform 0.35s ease';
      el.style.transition = 'background-color 0.35s ease';
      img.style.transform = 'translate(0,0) scale(1)';
      el.style.backgroundColor = 'rgba(0,0,0,0.7)';
      img.addEventListener('transitionend', done, { once: true });
    });
  });
};

const onLeave = (el, done) => {
  const thumbRect = thumbRef.value.getBoundingClientRect();
  const img = el.querySelector('.modal-img');
  const imgRect = img.getBoundingClientRect();

  const scale = thumbRect.width / imgRect.width;
  const dx = thumbRect.left + thumbRect.width / 2 - (imgRect.left + imgRect.width / 2);
  const dy = thumbRect.top + thumbRect.height / 2 - (imgRect.top + imgRect.height / 2);

  img.style.transition = 'transform 0.3s ease';
  el.style.transition = 'background-color 0.3s ease';
  img.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  img.style.transformOrigin = 'center';
  el.style.backgroundColor = 'rgba(0,0,0,0)';
  img.addEventListener('transitionend', done, { once: true });
};

// Extrae y reacciona a los cambios en las descripciones
const descriptionText = computed(() => {
  const descriptions = pokemonStore.pokemonSpecies.descriptions || [];
  const versionDescription = descriptions.find(d => d.version === selectedVersion.value);
  return versionDescription ? versionDescription.text : 'No description available.';
});

// Función para cambiar la versión seleccionada
const selectVersion = (version) => {
  selectedVersion.value = version;
};

// Computada para la altura
const pokemonHeight = computed(() => {
  return pokemonStore.pokemonDetails.height ? `${pokemonStore.pokemonDetails.height / 10} m` : 'N/A';
});

// Computada para el peso
const pokemonWeight = computed(() => {
  return pokemonStore.pokemonDetails.weight ? `${pokemonStore.pokemonDetails.weight / 10} kg` : 'N/A';
});

// Computada para la categoría
const pokemonCategory = computed(() => {
  return pokemonStore.pokemonSpecies.category || 'N/A';
});

// Computada para las habilidades
const pokemonAbilities = computed(() => {
  return pokemonStore.pokemonDetails.abilities ? pokemonStore.pokemonDetails.abilities[0] : 'N/A';
});

</script>

<template>
    <div class="main-container">
        <div class="left-section">
            <div>
                <img ref="thumbRef" :src="pokemonStore.pokemonDetails.image" :alt="pokemonStore.pokemonDetails.name" class="pokemon-image" @click="showModal = true">
            </div>

            <Teleport to="body">
                <Transition :css="false" @enter="onEnter" @leave="onLeave">
                    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
                        <img :src="pokemonStore.pokemonDetails.image" :alt="pokemonStore.pokemonDetails.name" class="modal-img" @click.stop />
                    </div>
                </Transition>
            </Teleport>

            <StatsChart class="chart-section" />
        </div>
        <div class="right-section">
            <p>{{ descriptionText }}</p>

            <div class="versions">
                <p>Versiones: </p>
                <img class="icon icon1" 
                     src="../../assets/blue-pokeball.png" 
                     alt="Blue pokeball" 
                     :class="{ 'selected': selectedVersion === 'blue' }"
                     @click="selectVersion('blue')">
                <img class="icon icon2" 
                     src="../../assets/red-pokeball.png" 
                     alt="Red pokeball" 
                     :class="{ 'selected': selectedVersion === 'red' }"
                     @click="selectVersion('red')">
            </div>

            <div class="stats">
                <div>
                    <div>
                        <h4>Height</h4>
                        <h3>{{ pokemonHeight }}</h3>
                    </div>
                    <div>
                        <h4>Weight</h4>
                        <h3>{{ pokemonWeight }}</h3>
                    </div>
                    <div>
                        <h4>Gender</h4>
                        <div>
                            <img class="gender" src="../../assets/female.png" alt="Male gender">
                            <img class="gender2" src="../../assets/male.png" alt="Female gender">
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <h4>Category</h4>
                        <h3>{{ pokemonCategory }}</h3>
                    </div>
                    <div>
                        <h4>Abilities</h4>
                        <h3>{{ pokemonAbilities }}</h3>
                    </div>
                </div>
            </div>

            <div class="">
                <p>Types</p>
                <Categories class="categories" :types="pokemonStore.pokemonDetails.types" />
            </div>

            <div class="">
                <p>Weakness</p>
                <Categories class="categories" :types="pokemonStore.pokemonDetails.weaknesses" />
            </div>
        </div>
    </div>
</template>

<style scoped>

.main-container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    max-width: 80%;
    padding-top: 100px;
    margin: -30px auto;
    background-color: #fff;
}

.main-container > * {
    flex: 1;
}

.left-section{
    display: flex;
    flex-direction: column;
}
.right-section{
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 30px;
    font-size: x-large;
}

.pokemon-image{
    background-color: #F2F2F2;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
}

.modal-overlay{
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
}

.modal-img{
    max-width: 800px;
    width: 80vw;
    max-height: 80vh;
    object-fit: contain;
    background-color: #F2F2F2;
    border-radius: 10px;
    cursor: default;
}


.versions{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    gap: 10px;
}
.icon{
    width: 42px;
    height: 42px;
    padding-top:2px;
    border-radius: 100%;
    cursor: pointer;
}

.icon.selected{
    border: 3px solid; /* Add border when selected */
}

.icon1.selected {
    border-color: #17ADFF; /* Specific color for blue */
}

.icon2.selected {
    border-color: #EB859A; /* Specific color for red */
}

.stats {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    background-color: #30A7D7;
    border-radius: 10px;
    padding: 20px;
}

.stats > * {
    flex: 1;
}

.stats h4{
    color: white;
    font-weight: normal;
}

.stats h3{
    color: #212121;
    font-weight: normal;
}

.gender{
    width: 40px;
}

.gender2{
    padding: 2px;
    width: 40px;
}

.categories{
    margin-top: 10px;
}

@media (min-width: 1280px) { /* Pantallas XL o más grandes */
  
    .main-container{
        align-content: center;
        justify-content: center;
    }
    .left-section{
        max-width: 35%;
    }
    .right-section{
        max-width: 35%;
    }
}

@media (max-width: 769px) {
    .main-container{
        flex-direction: column;
    }
    .left-section, .right-section{
        width: 100%;
    }
}

@media (max-width: 480px) {
  .main-container{
        max-width: 90%;
   }
}


</style>
