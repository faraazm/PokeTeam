<template>
    <div>
        <div class="container">
            <SearchPokemon v-on:filter="filter"/>
            <PokemonItem
                v-bind:key="pokemon.name"
                v-for="pokemon in filteredPokemon"
                :pokemon="pokemon"
                :id="getID(pokemon.url)"
            />
        </div>
        <modals-container/>
    </div>
</template>

<script>
import axios from 'axios';
import PokemonItem from './PokemonItem';
import SearchPokemon from './SearchPokemon';

export default {
    name: "PokemonList",
    components: {
        PokemonItem,
        SearchPokemon
    },
    props: ["pokemon", "imageURL"],
    data(){
        return {
            baseURL: 'https://pokeapi.co/api/v2/pokemon/?limit=150',
            pokemons: [],
            filtering: false,
            searchInput: ''
        }
    },
    methods: {
        filter(searchInput){
            this.searchInput = searchInput;
        },
        getID(url){
            var splitted = url.split('pokemon');
            return splitted[splitted.length - 1].replace(/\//g, '');
        }
    },
    computed: {
        filteredPokemon(){
            if(this.searchInput === '') return this.pokemons;

            return this.pokemons.filter(pokemon => {
                return pokemon.name.toLowerCase().includes(this.searchInput.toLowerCase());
            })
        }
    },
    created(){
        axios.get(this.baseURL)
        .then(res => { 
            this.pokemons = res.data.results;
        })
        .catch(err => { 
            console.log(err);
        })
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    margin: 0 auto;
}
</style>