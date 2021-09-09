<template>
  <div class="favorites">
    <h1>Список избраных персонажей:</h1>
    <card-characters
      :loadCharacters="
        loadCharactersLocalstorage !== null
          ? loadCharactersLocalstorage
          : Array(0)
      "
    ></card-characters>
  </div>
</template>
<script>
import CardCharacters from "../components/CardCharacters";
import { mapGetters } from "vuex";

export default {
  components: {
    CardCharacters,
  },
  computed: {
    ...mapGetters("characters", {
      getCharactersLocalstorage: "charactersLocalstorage",
    }),
    loadCharactersLocalstorage() {
      return this.getCharactersLocalstorage;
    },
  },
};
</script>
<style scoped>
</style>