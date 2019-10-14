<template>
    <div>
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
.input {
    border-radius: 5px;
    padding: 10px;
    width: 75%;
    border: 1px solid #f3f3f3;
    box-shadow: 1px 3px 5px #dadada;
    margin: 35px;
}
</style>