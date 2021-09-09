<template>
  <div>
    <div class="episodeInfo">
      <h1 class="episodeInfo_series">{{ loadEpisode.series }}</h1>
      <h3 class="episodeInfo__number">
        Сезон {{ loadEpisode.season }} Эпизод
        {{ loadEpisode.episode }}
      </h3>
      <h4 class="episodeInfo__title">Серия: "{{ loadEpisode.title }}"</h4>
      <h4 class="episodeInfo__date">Дата выхода: {{ loadEpisode.air_date }}</h4>
      <h4
        class="episodeInfo__temperature"
        v-if="
          isNaN(loadWeatherEpisode.maxTemp) || isNaN(loadWeatherEpisode.minTemp)
        "
      >
        Погода: отсутствуют данные
      </h4>
      <div v-else class="episodeInfo__weather">
        <h4 class="episodeInfo__temperature">
          Максимальная температура: {{ loadWeatherEpisode.maxTemp + `&#8451;` }}
        </h4>
        <h4 class="episodeInfo__temperature">
          Минимальная температура:
          {{ loadWeatherEpisode.minTemp + `&#8451;` }}
        </h4>
      </div>
      <share-link :loadFullPath="$route.fullPath"></share-link>
    </div>
    <h2 class="mt-3">Список персонажей участвующих в этом эпизоде:</h2>
    <card-characters
      :loadCharacters="loadCharacters"
      :series="loadEpisode.series"
    ></card-characters>
    <h4>Список умерших в этом Эпизоде:</h4>
    <card-deaths :loadDeaths="loadDeaths"></card-deaths>
  </div>
</template>
<script>
import CardDeaths from "../components/CardDeaths";
import CardCharacters from "../components/CardCharacters";
import ShareLink from "../components/ShareLink";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["episode", "characters"],
  components: {
    CardDeaths,
    CardCharacters,
    ShareLink,
  },
  computed: {
    ...mapGetters("episodes", { getEpisode: "episode", getWather: "wather" }),
    ...mapGetters("deaths", { getDeaths: "deathsEpisode" }),
    ...mapGetters("characters", {
      getCharacters: "charactersEpisode",
    }),
    routeCharacters() {
      return this.$route.query.characters;
    },
    loadEpisode() {
      return this.getEpisode(this.$route.params.id);
    },
    loadDeaths() {
      return this.getDeaths(this.episode);
    },
    loadCharacters() {
      return this.getCharacters(this.$route.params.characters);
    },
    getCitySeries() {
      let city = {
        Albuquerque:
          this.$route.params.series === "Breaking Bad" ||
          this.$route.params.series === "Better Call Saul",
      };
      for (let key in city) {
        if (city[key]) return key;
      }
      return "";
    },
    loadWeatherEpisode() {
      return this.getWather;
    },
    loadTemperature() {
      return 1;
    },
  },
  methods: {
    ...mapActions("episodes", { getWeatherAPI: "getWeather" }),
    loadWeather(city, dateEpisode) {
      let date = dateEpisode.split("-");
      date = date[2] + "/" + date[0] + "/" + date[1];
      this.getWeatherAPI({ city, date });
    },
  },
  created() {
    this.loadWeather(this.getCitySeries, this.$route.params.air_date);
  },
};
</script>
<style lang="scss" scoped>
</style>