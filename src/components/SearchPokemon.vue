<template>
    <div class="search">
        <img class="pokeball-image" src="../assets/pokeball-colored.png" />
        <input v-model="searchInput" v-on:keyup="$emit('filter', searchInput)" type="text" class="input" placeholder="Search for a Pokemon..."/>
    </div>
</template>

<script>
export default {
    name: "SearchPokemon",
    data() {
        return {
            searchInput: ''
        }
    }
}
</script>

<style scoped>
.search {
    margin-bottom: 50px;
}
.pokeball-image {
    position: relative;
    top: 22px;
}
.input {
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #f3f3f3;
    box-shadow: 1px 3px 5px #dadada;
}
</style>