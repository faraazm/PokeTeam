<template>
  <div class="pokemon">
    <img :src="getSprite(id)" />
    <div class="pokemon-info">
      <h3><span id="number">No. {{id}}</span> {{ pokemon.name | capitalize }}</h3>
      <span id="healthBar"></span>
      <p id="hpInfo">HP: 80/80</p>
      <button id="viewDetailBtn" type="button" v-on:click="openDetail">View Detail</button>
    </div>
  </div>
</template>

<script>
import PokemonDetail from "./PokemonDetail";

export default {
  name: "PokemonItem",
  props: ["pokemon", "id"],
  data() {
    return {
      imageURL:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    };
  },
  methods: {
    getSprite(id) {
      return `${this.imageURL}/${id}.png`;
    },
    openDetail() {
      this.$modal.show(PokemonDetail, 
        {
          name: this.pokemon.name
        },
        {
          height: "auto"
        },
        {
          button: [
            { 
              title: 'Cancel',
              handler: () => { this.$modal.close(this.pokemon.name); }
            }
          ]
        }
      );
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
.pokemon {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  margin: 20px;
  text-align: center;
  box-shadow: 1px 4px 10px #949494;
  width: 25%;
  display: inline-block;
  margin-bottom: 4em;
}
.pokemon img {
  background-color: #fff;
  border-radius: 100%;
  margin: 15px;
  position: relative;
  bottom: 4em;
  box-shadow: 0px 0px 6px #adadad;
}
.pokemon-info {
    position: relative;
    bottom: 3.5em;
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
}
.pokemon-info #healthBar {
  display: inline-block;
  width: 10em;
  margin: 10px;
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
}
.pokemon button {
  cursor: pointer;
}
@media screen and (min-width: 700px) and (max-width: 900px) {
  .pokemon {
    width: 45%;
  }
}
@media screen and (max-width: 700px) {
  .pokemon {
    width: 75%;
  }
}
</style>