import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/homeView.vue";
import PokemonDetails from "../views/pokemonDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokedex/details/:id",
    name: "details",
    component: PokemonDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/pokedex"),
  routes,
});

export default router;
