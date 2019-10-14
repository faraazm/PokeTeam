<template>
    <div class="pokemon" v-on:click="openDetail">
        <img :src="getSprite(id)" />
        <h3>{{ pokemon.name | capitalize }}</h3>
    </div>
</template>

<script>
import PokemonDetail from './PokemonDetail';

export default {
    name: "PokemonItem",
    props: ['pokemon', 'id'],
    data(){
        return {
            imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
        }
    },
    methods: {
        getSprite(id){
            return `${this.imageURL}/${id}.png`;
        },
        openDetail(){
            this.$modal.show(PokemonDetail, {
                name: this.pokemon.name
            }, {
                height: 'auto'
            });
        }
    },
    filters: {
        capitalize(value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
}
</script>

<style scoped>
.pokemon {
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    margin: 5px;
    text-align: center;
    box-shadow: 1px 5px 13px #f1f1f1;
    width: 25%;
    display: inline-block;
}
.pokemon img {
    background-color: #efefef;
    border-radius: 100%;
    margin: 15px;
}
.pokemon:hover {
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