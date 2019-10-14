<template>
  <div class="home">
    <PokemonList />
  </div>
</template>

<script>
import PokemonList from '../components/PokemonList';

export default {
  name: 'home',
  components: {
    PokemonList
  }
}
</script>
