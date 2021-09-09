<template>
  <div>
    <div v-for="(value, i) of loadOccupations" :key="i">
      <h3>{{ Object.keys(value).toString() }}</h3>
      <br />
      <card-characters
        v-for="(character, i) of value"
        :key="i"
        :loadCharacters="character"
      ></card-characters>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CardCharacters from "../components/CardCharacters";
export default {
  components: {
    CardCharacters,
  },
  computed: {
    ...mapGetters("characters", {
      getCharactersOccupation: "charactersOccupation",
    }),
    loadOccupations() {
      return this.getCharactersOccupation;
    },
  },
};
</script>
<style scoped>
</style>