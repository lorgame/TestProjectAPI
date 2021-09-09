<template>
  <div class="storage">
    <div class="series">
      <img
        :src="series.Poster"
        class="series__img img-thumbnail"
        :alt="series.name"
      />
      <div class="series__info">
        <h1>{{ series.Title }}</h1>
        <div class="series__block">
          <span class="series__title">На экранах: </span>
          <span class="series__value">{{ series.Year }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Премьера: </span>
          <span class="series__value">{{ series.Released }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Категория: </span>
          <span class="series__value">{{ series.Type }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Жанр: </span>
          <span class="series__value">{{ series.Genre }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Режиссер: </span>
          <span class="series__value">{{ series.Director }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Сценарист: </span>
          <span class="series__value">{{ series.Writer }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Актеры: </span>
          <span class="series__value">{{ series.Actors }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Страна: </span>
          <span class="series__value">{{ series.Country }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Награды: </span>
          <span class="series__value">{{ series.Awards }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Время: </span>
          <span class="series__value">{{ series.Runtime }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Сезонов: </span>
          <span class="series__value">{{ series.totalSeasons }}</span>
        </div>
        <div class="series__block">
          <span class="series__title">Язык: </span>
          <span class="series__value">{{ series.Language }}</span>
        </div>
      </div>
    </div>
    <div class="rating mt-2 mb-3">
      <h3 class="rating__title">Рейтинги и статистика:</h3>
      <div class="rating__block">
        <span class="rating__title">Возрастной рейтинг: </span>
        <span class="rating__value">{{ series.Rated }}</span>
      </div>
      <div class="rating__block">
        <span class="rating__title">Порталы: </span>
        <span class="rating__list" v-for="(item, i) of series.Ratings" :key="i">
          <span class="rating__item" v-for="(value, i) of item" :key="i"
            >{{ value }} </span
          >
        </span>
      </div>
      <div class="rating__block">
        <span class="rating__title">METASCORE: </span>
        <span class="rating__value">{{ series.Metascore }}</span>
      </div>
      <div class="rating__block">
        <span class="rating__title">IMDBRating: </span>
        <span class="rating__value">{{ series.imdbRating }}</span>
      </div>
      <div class="rating__block">
        <span class="rating__title">IMDBVotes: </span>
        <span class="rating__value">{{ series.imdbVotes }}</span>
      </div>
      <div class="rating__block">
        <span class="rating__title">IMDBID: </span>
        <span class="rating__value">{{ series.imdbID }}</span>
      </div>
    </div>
    <div class="description">
      <h3 class="description__title">Описание:</h3>
      <span class="description__value">{{ series.Plot }}</span>
    </div>
    <menu-categories
      class="mt-3"
      :loadCategory="loadEpisodes"
      :loadCategories="loadSeasonsSeries"
      :categoryActive="seasonActive"
      :typeCategory="titleCategory"
    ></menu-categories>
    <card-episodes :loadEpisodes="loadEpisodesSeason"></card-episodes>
  </div>
</template>
<script>
import CardEpisodes from "../components/CardEpisodes";
import MenuCategories from "../components/MenuCategories";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    CardEpisodes,
    MenuCategories,
  },
  data() {
    return {
      seasonActive: "1",
      titleCategory: "Сезон",
      serialsHTTP: [
        {
          title: "Breaking Bad",
          IMDb: "0903747",
        },
        {
          title: "Better Call Saul",
          IMDb: "3032476",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("episodes", {
      seasonsSerial: "seasonsOfSeries",
      episodesSeries: "episodesOfSeries",
      episodesSeason: "episodesOfSeason",
      series: "seriesApi",
    }),
    loadEpisodesSeason() {
      return this.episodesSeason;
    },
    loadEpisodesSeries() {
      return this.episodesSeries(this.$route.params.title);
    },
    loadSeasonsSeries() {
      return this.seasonsSerial(this.$route.params.title);
    },
    getSeriesIMDb() {
      return this.serialsHTTP.find(
        (series) => series.title === this.$route.params.title
      ).IMDb;
    },
    loadSeries() {
      return this.series;
    },
  },
  methods: {
    ...mapActions("episodes", {
      getEpisodes: "getAll",
      getEpisodesSeason: "getAllSeason",
      getSeries: "getSeriesAPI",
    }),
    loadEpisodes(season) {
      this.getEpisodesSeason({
        episodes: this.loadEpisodesSeries,
        season: season,
      });
      this.seasonActive = season;
    },
    loadSeriesApi() {
      this.getSeries(this.getSeriesIMDb);
    },
  },
  beforeMount() {
    this.loadEpisodes("1");
    this.loadSeriesApi();
  },
};
</script>
<style lang="scss" scoped>
.storege__season_active {
  background: rgb(122, 122, 194);
  color: white;
}
.storage__episode {
  list-style-type: none;
  cursor: pointer;
  .storage__card {
    color: black;
    .storage__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .storage__titleEpisode {
        text-decoration: none;
      }
    }
  }
}
.series {
  display: flex;
  .series__img {
    width: 15rem;
    margin-right: 15px;
    height: max-content;
  }
  .series__info {
    font-size: 18px;
    .series__title {
      font-weight: 700;
    }
  }
}
.description {
  .description__value {
    display: block;
    font-size: 20px;
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px solid black;
  }
}
.rating,
.description {
  .rating__title,
  .description__title {
    font-weight: 700;
  }
}
.rating {
  font-size: 18px;
  .rating__title {
    font-weight: 700;
  }
  .rating__block {
    border-left: 1px solid black;
    margin-left: 10px;
    padding-left: 10px;
    .rating__list {
      display: flex;
      margin-left: 15px;
    }
  }
}
</style>