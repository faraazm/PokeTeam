<template>
  <div>
    <div v-if="pokemon.id" id="modal">
    <div slot="top-right">
      <button class="close-button" @click="$emit('close')">
        <i class="fa fa-close" aria-hidden="true"></i>
      </button>
    </div>      
      <img class="pokemon-image" v-if="pokemon.id" :src="`${this.imageURL}/${pokemon.id}.png`" />
      <div class="pokemon-info">
        <h3>
          <span id="number">No. {{ pokemon.id }}</span>
          {{ pokemon.name }}
        </h3>
        <span id="healthBar"></span>
      </div>
      <div class="details-container">
        <div class="details-item">
          <div style="float: right" class="text-container">
            <h3>Height</h3>
            <p>{{ pokemon.height }} m</p>
          </div>
        </div>
        <div class="details-item">
          <div style="float: left" class="text-container">
            <h3>Weight</h3>
            <p>{{ pokemon.weight }} kg</p>
          </div>
        </div>
        <div class="stats">
          <ul class="stats">
            <li
              :key="index"
              v-for="(type, index) in pokemon.types"
            >Type #{{ index + 1 }}: {{ type.type }}</li>
          </ul>
          <ul class="stats">
            <li :key="stat.stat_name" v-for="stat in pokemon.stats">
              <div class="stat-name">{{ stat.stat_name }}:</div>
              <div class="stat-container">
                <div class="stat" :style="{ width: stat.stat_percent + '%' }">{{ stat.base_stat }}</div>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="team.length < 6 && !viewOnly">
          <button v-on:click="addToTeam" type="button" class="addBtn">Add to Team</button>
        </div>
      </div>
    </div>
    <div v-else>
      <img class="loading" src="../assets/spinner.gif" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PokemonDetail",
  props: ["name", "viewOnly"],
  data() {
    return {
      url: "https://pokeapi.co/api/v2/pokemon",
      imageURL:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      pokemon: {},
      team: []
    };
  },
  methods: {
    modifyData(pokemon) {
      function calculatePercentage(stat) {
        return Math.round((stat * 100) / 255);
      }

      function getStats(statistics) {
        return statistics.map(stat => {
          return {
            base_stat: stat.base_stat,
            stat_name: capitalize(stat.stat.name),
            stat_percent: calculatePercentage(stat.base_stat)
          };
        });
      }

      function getTypes(types) {
        return types.map(type => {
          return { type: capitalize(type.type.name) };
        });
      }

      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      return {
        id: pokemon.id,
        name: capitalize(pokemon.name),
        height: pokemon.height,
        weight: pokemon.weight,
        baseEXP: pokemon.base_experience,
        stats: getStats(pokemon.stats),
        types: getTypes(pokemon.types)
      };
    },
    addToTeam() {
      this.team.push(this.pokemon);
      const parsed = JSON.stringify(this.team);
      localStorage.setItem("team", parsed);
      this.$router.push({
        name: "team"
      });
    }
  },
  mounted() {
    if (localStorage.getItem("team")) {
      try {
        this.team = JSON.parse(localStorage.getItem("team"));
      } catch (e) {
        localStorage.removeItem("team");
      }
    }
  },
  created() {
    axios
      .get(`${this.url}/${this.name}`)
      .then(res => {
        this.pokemon = this.modifyData(res.data);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.close-button {
    margin: 10px;
    background: white;
    border: 1px solid #d0d0d0;
    font-weight: 600;
    color: #d0d0d0;
}
.close-button:hover {
  cursor: pointer;
}
.stat-container {
  display: inline-block;
  width: 25%;
  background-color: #ddd;
  border-radius: 10px;
  margin: 10px;
}
.stat {
  color: #fff;
  border-radius: 10px;
  width: 85%;
  background: #41ccbf; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #41ccbf,
    #40ce9c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #41ccbf, #40ce9c);
}
.stat-name {
  display: inline-block;
}
.details-container h3 {
  font-weight: 400;
}
.details-item {
  width: 50%;
  display: inline-block;
  text-align: center;
}
.text-container {
  margin: 20px;
}
.details-item h3,
.details-item p {
  margin: 0px;
}
.stats {
  list-style: none;
  text-align: center;
  padding: 0px;
}
.loading {
  margin: 0 auto;
  display: block;
  width: 15%;
  padding: 100px;
}
.pokemon-image {
  background-color: #fff;
  border-radius: 100%;
  display: block;
  margin: 15px auto;
  box-shadow: 0px 0px 6px #adadad;
}
.pokemon-info #number {
  font-size: 14px;
  background-color: #292929;
  padding: 3px 12px;
  color: #ffffff;
  position: relative;
  bottom: 5px;
  border-radius: 15px;
}
.pokemon-info h3 {
  font-weight: 400;
  margin: 0px;
  color: #292929;
  font-size: 1.75em;
  text-align: center;
}
.pokemon-info #healthBar {
  display: block;
  width: 10em;
  margin: 10px auto;
  padding: 5px;
  box-shadow: 1px 2px 6px #dedede;
  background: #6ef0b9;
  color: #fff;
  border-radius: 15px;
  text-align: center;
}
.pokemon-info #viewDetailBtn {
  display: block;
  margin: 0 auto;
  padding: 15px;
  border-radius: 10px;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 3px;
  background: #41ccbf; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #41ccbf,
    #40ce9c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #41ccbf, #40ce9c);
}
.pokemon-info #hpInfo {
  margin-top: 0px;
  text-align: center;
}
</style>

<style>
.addBtn {
  display: block;
  margin: 20px auto;
  padding: 15px;
  border-radius: 10px;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 3px;
  background: #41ccbf; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #41ccbf,
    #40ce9c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #41ccbf, #40ce9c);
}
.addBtn:hover {
  cursor: pointer;
}
.v--modal {
  left: 0px !important;
  display: block;
  margin: 0 auto;
}
@media screen and (max-width: 400px) {
  #modal {
    height: 100vh;
    overflow-y: scroll;
  }
  .v--modal {
    top: 0px !important;
  }
}
@media screen and (min-width: 1000px) {
  .v--modal {
    width: 35% !important;
  }
}
@media screen and (max-width: 1000px) {
  .v--modal {
    width: 85% !important;
  }
}
</style>