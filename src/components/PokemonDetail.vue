<template>
    <div>
        <div v-if="pokemon.id" id="modal">
            <img v-if="pokemon.id" :src="`${this.imageURL}/${pokemon.id}.png`" />
            <h3>#{{ pokemon.id }} - {{ pokemon.name }}</h3>
            <div class="details">

                <ul class="stats">
                    <li>Height: {{ pokemon.height }}</li>
                    <li>Weight: {{ pokemon.weight }}</li>
                </ul>

                <ul class="stats">
                    <li :key="index" v-for="(type, index) in pokemon.types">
                        Type #{{ index + 1 }}: {{ type.type }}
                    </li>
                </ul>

                <ul class="stats">
                    <li :key="stat.stat_name" v-for="stat in pokemon.stats">
                        {{ stat.stat_name }} : {{ stat.base_stat }}
                    </li>
                </ul>

                <div v-if="team.length < 6">
                    <button v-on:click="addToTeam" type="button" class="addBtn">Add to Team</button>
                </div>
            </div>
        </div>
        <div v-else>
            <img class="loading" src="../assets/spinner.gif"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "PokemonDetail",
    props: ["name"],
    data(){
        return {
            url: 'https://pokeapi.co/api/v2/pokemon',
            imageURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
            pokemon: {},
            team: []
        }
    },
    methods: {
        modifyData(pokemon){
            function getStats(statistics){
                return statistics.map(stat => {
                    return { base_stat: stat.base_stat, stat_name: capitalize(stat.stat.name) };
                })
            }

            function getTypes(types){
                return types.map(type => {
                    return { type: capitalize(type.type.name) };
                })
            }

            function capitalize(str){
                return str.charAt(0).toUpperCase() + str.slice(1)
            }

            return {
                id: pokemon.id,
                name: capitalize(pokemon.name),
                height: pokemon.height,
                weight: pokemon.weight,
                baseEXP: pokemon.base_experience,
                stats: getStats(pokemon.stats),
                types: getTypes(pokemon.types)
            }
        },
        addToTeam(){
            this.team.push(this.pokemon);
            const parsed = JSON.stringify(this.team);
            localStorage.setItem('team', parsed);
            this.$router.push({
                name: 'team'
            });
        }
    },
    mounted(){
        if(localStorage.getItem('team')){
            try {
                this.team = JSON.parse(localStorage.getItem('team'));
            } catch(e){
                localStorage.removeItem('team');
            }
        }
    },
    created(){
        axios.get(`${this.url}/${this.name}`)
        .then(res => {
            this.pokemon = this.modifyData(res.data);
        })
        .catch(err => console.log(err))
    }
}
</script>

<style scoped>
.stats {
    list-style: none;
    text-align: center;
    padding: 0px;
}
#modal img {
    margin: 20px auto;
    display: block;
    background-color: #efefef;
    border-radius: 100%;
}
#modal h3 {
    text-align: center;
}
.loading {
    margin: 0 auto;
    display: block;
    width: 15%;
    padding: 100px;
}
</style>

<style>
.addBtn {
    background-color: #2ebd67;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    font-size: 18px;
    margin: 20px auto;
    display: block;
}
</style>