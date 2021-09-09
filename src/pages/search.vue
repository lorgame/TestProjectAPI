<template>
  <div>
    <div v-if="$route.params.value === 'Missing information'">
      <h1>Вы не ввели информацию</h1>
    </div>
    <div
      v-else-if="
        loadEpisodes.length === 0 &&
        loadCharacters.length === 0 &&
        loadQuotes.length === 0 &&
        loadDeaths.length === 0
      "
    >
      <h1>Не удалось найти информацию</h1>
    </div>
    <div v-else>
      <menu-categories
        :categoryActive="categoryActive"
        :loadCategories="getSearchCategories"
        :loadCategory="loadCategoryAPI"
      ></menu-categories>
      <div
        v-if="
          loadEpisodes.length !== 0 &&
          (categoryActive === '' || categoryActive === 'episodes')
        "
      >
        <h1>Эпизоды:</h1>
        <card-episodes :loadEpisodes="loadEpisodes"> </card-episodes>
      </div>
      <div
        v-if="
          loadCharacters.length !== 0 &&
          (categoryActive === '' || categoryActive === 'characters')
        "
      >
        <h1>Персонажи:</h1>
        <card-characters :loadCharacters="loadCharacters"> </card-characters>
      </div>
      <div
        v-if="
          loadQuotes.length !== 0 &&
          (categoryActive === '' || categoryActive === 'quotes')
        "
      >
        <h1>Цитаты:</h1>
        <card-quotes :loadQuotes="loadQuotes"> </card-quotes>
      </div>
      <div
        v-if="
          loadDeaths.length !== 0 &&
          (categoryActive === '' || categoryActive === 'deaths')
        "
      >
        <h1>Смерти:</h1>
        <card-deaths :loadDeaths="loadDeaths"> </card-deaths>
      </div>
    </div>
  </div>
</template>

<script>
import CardEpisodes from "../components/CardEpisodes";
import CardCharacters from "../components/CardCharacters";
import CardQuotes from "../components/CardQuotes";
import CardDeaths from "../components/CardDeaths";
import MenuCategories from "../components/MenuCategories";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    CardEpisodes,
    CardCharacters,
    CardQuotes,
    CardDeaths,
    MenuCategories,
  },
  data() {
    return {
      categoryActive: "",
    };
  },
  computed: {
    ...mapGetters("episodes", {
      getEpisodesSearch: "episodesSearch",
      // getCategoryAPI: "categoryAPI",
    }),

    ...mapGetters("characters", { getCharactersSearch: "charactersSearch" }),
    ...mapGetters("quotes", { getQuotesSearch: "quotesSearch" }),
    ...mapGetters("deaths", { getDeathsSearch: "deathsSearch" }),
    ...mapGetters("search", {
      getSearchCategories: "searchCategories",
    }),
    loadEpisodes() {
      return this.getEpisodesSearch(this.$route.params.value);
    },
    loadCharacters() {
      return this.getCharactersSearch(this.$route.params.value);
    },
    loadQuotes() {
      return this.getQuotesSearch(this.$route.params.value);
    },
    loadDeaths() {
      return this.getDeathsSearch(this.$route.params.value);
    },
  },
  methods: {
    ...mapActions("search", { getSearchCategoriesApi: "getSearchCategories" }),
    loadCategoryAPI(categoryTitle) {
      this.categoryActive = categoryTitle;
    },
    loadSearchCategories() {
      this.getSearchCategoriesApi([
        this.loadEpisodes,
        this.loadCharacters,
        this.loadQuotes,
        this.loadDeaths,
      ]);
    },
  },
  created() {
    this.loadSearchCategories();
  },
  beforeUpdate() {
    this.loadSearchCategories();
  },
};
</script>

<style lang="scss" scoped>
</style>