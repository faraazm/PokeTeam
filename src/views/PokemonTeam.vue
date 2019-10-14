<template>
  <div class="team">
    <div v-if="pokemonList.length">
      <h1>Pokemon Team</h1>
      <p>You can have a maximum of up to 6 Pokemon on your team.</p>
      <table class="table">
        <tr>
          <th>Sprite</th>
          <th>#</th>
          <th>Name</th>
          <th>Options</th>
        </tr>
        <tr :key="index" v-for="(pokemon, index) in pokemonList">
          <td>
            <img :src="`${imageURL}/${pokemon.id}.png`" />
          </td>
          <td>{{ pokemon.id }}</td>
          <td>{{ pokemon.name }}</td>
          <td>
            <button type="button" class="deleteBtn" @click="deletePokemon(pokemon.id)">Delete</button>
          </td>
        </tr>
      </table>
      <button type="button" class="addBtn" @click="addPokemon">Add More Pokemon</button>
    </div>
    <div v-else>
      <h1>Looks like you haven't created a team yet.</h1>
      <button type="button" class="addBtn" @click="addPokemon">Add Pokemon</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonTeam",
  data() {
    return {
      pokemonList: [],
      imageURL:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
    };
  },
  mounted() {
    if (localStorage.getItem("team")) {
      try {
        this.pokemonList = JSON.parse(localStorage.getItem("team"));
      } catch (e) {
        localStorage.removeItem("team");
      }
    }
  },
  methods: {
    addPokemon() {
      this.$router.push({
        name: "home"
      });
    },
    deletePokemon(id) {
      this.pokemonList = this.pokemonList.filter(pokemon => pokemon.id !== id);
      const parsed = JSON.stringify(this.pokemonList);
      localStorage.setItem("team", parsed);
    }
  }
};
</script>

<style scoped>
.deleteBtn {
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
  margin: 20px auto;
  display: block;
}
.table {
  width: 100%;
}
.table td {
  border: 1px solid #e4e4e4;
}
.table th {
  padding: 10px;
  border: 1px solid #e4e4e4;
}
</style>
