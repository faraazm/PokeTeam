<template>
  <div class="team">
    <modals-container/>
    <div v-if="pokemonList.length">
      <h1>Pokemon Team</h1>
      <p>You can have a maximum of up to 6 Pokemon on your team.</p>

      <table class="table">
        <tr :key="index" v-for="(pokemon, index) in pokemonList">
          <td>
            <img :src="`${imageURL}/${pokemon.id}.png`" />
          </td>
          <td>No. {{ pokemon.id }} {{ pokemon.name }}</td>
          <td>
            <button type="button" class="viewBtn" @click="openDetail(pokemon.name)">
              <i class="fa fa-search" aria-hidden="true"></i> <span class="btnText">View</span>
            </button>
            <button type="button" class="deleteBtn" @click="deletePokemon(pokemon.id)">
              <i class="fa fa-trash" aria-hidden="true"></i> <span class="btnText">Delete</span>
            </button>
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
import PokemonDetail from '../components/PokemonDetail';

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
    },
    openDetail(name) {
      this.$modal.show(PokemonDetail, 
        {
          name: name.toLowerCase(),
          viewOnly: true
        },
        {
          height: "auto"
        },
        {
          button: [
            { 
              title: 'Cancel',
              handler: () => { this.$modal.close(name.toLowerCase()); }
            }
          ]
        }
      );
    }
  }
};
</script>

<style scoped>
.deleteBtn {
  display: inline-block;
  margin: 10px;
  padding: 9px;
  border-radius: 10px;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 3px;
  background: #ff416c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff4b2b,
    #ff416c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff4b2b,
    #ff416c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.deleteBtn:hover {
  cursor: pointer;
}
.viewBtn {
  display: inline-block;
  margin: 10px;
  padding: 9px;
  border-radius: 10px;
  border: 1px solid #b9b9b9;
  color: #2c3e50;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 3px;
  background: #b1b5c1; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #eaeaea,
    #b1b5c1
  ); /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient( to right, #eaeaea, #b1b5c1 );
}
.viewBtn:hover {
  cursor: pointer;
}
.table {
  width: 50%;
  margin: 0 auto;
}
.table tr {
  box-shadow: 0px 0px 7px #bdbdbd;
  border-radius: 50px;
}
@media screen and (max-width: 700px) {
  .btnText {
    display: none;
  }
  .table {
    width: 100%;
  }
}
</style>
