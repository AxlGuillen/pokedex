# Pokedex - Axl

A Pokedex web application built with Vue 3, featuring Pokemon browsing, search, filtering by type, and detailed Pokemon stats.

## Live Demo

[https://axl-pokedex.netlify.app](https://axl-pokedex.netlify.app)

## Features

- Browse the full Pokemon list with infinite scroll / load more
- Search Pokemon by name
- Filter Pokemon by type/category
- Detailed view with stats, abilities, moves, and evolutions
- Fully responsive design (mobile to 4K)

## Tech Stack

- **Vue 3** — Composition API
- **Pinia** — State management
- **Vue Router** — Client-side routing
- **Axios** — HTTP requests to the [PokeAPI](https://pokeapi.co/)
- **Vite** — Build tool

## Project Structure

```
src/
├── views/
│   ├── homeView.vue        # Main Pokemon list page
│   └── pokemonDetails.vue  # Pokemon detail page
├── components/
│   ├── header.vue
│   ├── pokemonsSection.vue
│   ├── card.vue
│   ├── filters.vue
│   ├── categories.vue
│   ├── categories-bigVersion.vue
│   ├── SpinnerComponent.vue
│   └── details/            # Detail page sub-components
├── stores/
│   └── pokemonStore.js     # Pinia store
├── router/
└── assets/
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
