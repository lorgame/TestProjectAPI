<template>
  <div>
    <div class="character">
      <img
        :src="loadCharacter.img"
        class="character__img img-thumbnail"
        :alt="loadCharacter.name"
      />
      <div class="character__info">
        <h1>{{ loadCharacter.portrayed }}</h1>
        <div class="character__block">
          <span class="character__title">Персонаж: </span>
          <span class="character__value">{{ loadCharacter.name }}</span>
        </div>
        <div class="character__block">
          <span class="character__title">Псевдоним: </span>
          <span class="character__value">{{ loadCharacter.nickname }}</span>
        </div>
        <div class="character__block">
          <span class="character__title">Дата рождения: </span>
          <span class="character__value">{{ loadCharacter.birthday }}</span>
        </div>
        <div class="character__block">
          <span class="character__title">Деятельность: </span>
          <span>
            <span
              class="character__value"
              v-for="(value, i) of loadCharacter.occupation"
              :key="i"
              >{{ value
              }}<span v-if="i !== loadCharacter.occupation.length - 1"
                >,
              </span></span
            >.
          </span>
        </div>
        <div class="character__block">
          <span class="character__title">Статус: </span>
          <span class="character__value">{{ loadCharacter.status }}</span>
        </div>
        <div class="character__block">
          <span class="character__title">Сезоны: </span>
          <span>
            <span
              class="character__value"
              v-for="(value, i) of loadCharacter.appearance"
              :key="i"
              >{{ value
              }}<span v-if="i !== loadCharacter.appearance.length - 1"
                >,
              </span></span
            >.
          </span>
        </div>
        <div class="character__block">
          <span class="character__title">Cериалы: </span>
          <span>
            <span
              class="character__value"
              v-for="(value, i) of loadCharacter.category"
              :key="i"
              >{{ value }}</span
            >.
          </span>
        </div>
        <share-link :loadFullPath="$route.fullPath"></share-link>
      </div>
    </div>
    <div class="timeLine mt-3">
      <h3>Временная линия событий персонажа:</h3>
      <div class="timeLine__line">
        <div
          class="timeLine__point timeLine__startPointer"
          :class="{
            timeLine__point_active:
              activeTimePoint === loadCharactersTimeLine.startPointer,
          }"
          @click="loadTimeLineInfo(loadCharactersTimeLine.startPointer)"
        ></div>
        <div
          class="timeLine__point timeLine__middlePointer"
          :class="{
            timeLine__point_active:
              value.episode.episode_id === activeTimePointID,
          }"
          v-for="(value, i) of loadCharactersTimeLine.pointers"
          :key="i"
          @click="loadTimeLineInfo(value)"
        ></div>
        <div
          class="timeLine__point timeLine__endPointer"
          :class="{
            timeLine__point_active:
              activeTimePoint === loadCharactersTimeLine.endPointer,
          }"
          @click="loadTimeLineInfo(loadCharactersTimeLine.endPointer)"
        ></div>
      </div>
      <div class="mt-2 timeLine__info" v-if="activeTimePoint !== ''">
        <h4 class="timeLine__title" v-if="typeof activeTimePoint === 'string'">
          Дата рождения: "{{ activeTimePoint }}"
        </h4>
        <div
          class="timeLine__title"
          v-else-if="typeof activeTimePoint === 'boolean'"
        >
          <svg
            v-if="!loadCharactersTimeLine.endPointer"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-emoji-dizzy"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zm-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zM10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-emoji-smile"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
            />
          </svg>
        </div>
        <div v-else>
          <h4 class="timeLine__title">
            Дата событий: "{{ activeTimePoint.episode.air_date }}"
          </h4>
          <div>
            <h4>Список эпизодов выпущенных в этот день:</h4>
            <card-episodes
              :loadEpisodes="[activeTimePoint.episode]"
            ></card-episodes>
          </div>
          <div v-if="activeTimePoint.deathsList.length !== 0">
            <h4>Список смертей произошедших в этот день:</h4>
            <card-deaths :loadDeaths="activeTimePoint.deathsList"></card-deaths>
          </div>
        </div>
      </div>
    </div>
    <h2 class="mt-3">Список эпизодов с участием {{ loadCharacter.name }}:</h2>
    <card-episodes :loadEpisodes="loadEpisode"></card-episodes>
    <h2 class="mt-3">Список смертей связаных с {{ loadCharacter.name }}:</h2>
    <card-deaths :loadDeaths="loadDeaths"></card-deaths>
    <h2 class="mt-3">Список цитат {{ loadCharacter.name }}:</h2>
    <card-quotes :loadQuotes="loadQuotes"></card-quotes>
  </div>
</template>
<script>
import CardEpisodes from "../components/CardEpisodes";
import CardDeaths from "../components/CardDeaths";
import CardQuotes from "../components/CardQuotes";
import ShareLink from "../components/ShareLink";
import { mapGetters } from "vuex";

export default {
  props: ["series"],
  components: {
    CardEpisodes,
    CardDeaths,
    CardQuotes,
    ShareLink,
  },
  data() {
    return {
      activeTimePoint: "",
      activeTimePointID: "",
    };
  },
  computed: {
    ...mapGetters("characters", {
      getCharacter: "character",
      getCharactersTimeLine: "charactersTimeLine",
    }),
    ...mapGetters("episodes", { getEpisodesCharacter: "episodesCharacter" }),
    ...mapGetters("deaths", { getDeathsCharacter: "deathsCharacter" }),
    ...mapGetters("quotes", { getQuotesCharacter: "quotesCharacter" }),
    loadCharacter() {
      return this.getCharacter(this.$route.params.id);
    },
    loadEpisode() {
      return this.getEpisodesCharacter(this.series, this.loadCharacter);
    },
    loadDeaths() {
      return this.getDeathsCharacter(this.loadCharacter);
    },
    loadQuotes() {
      return this.getQuotesCharacter(this.series, this.loadCharacter);
    },
    loadCharactersTimeLine() {
      return this.getCharactersTimeLine(
        this.loadCharacter,
        this.loadEpisode,
        this.loadDeaths
      );
    },
  },
  methods: {
    loadTimeLineInfo(value) {
      this.activeTimePoint = value;
      if (typeof value === "object")
        this.activeTimePointID = value.episode.episode_id;
      else this.activeTimePointID = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.character {
  display: flex;
  .character__img {
    width: 15rem;
    margin-right: 15px;
  }
  .character__info {
    font-size: 18px;
    .character__title {
      font-weight: 700;
    }
  }
}
.timeLine {
  .timeLine__line {
    height: 1px;
    width: 100%;
    background: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .timeLine__point {
      width: 5px;
      height: 5px;
      border: 1px solid black;
      background: rgb(218, 218, 218);
      border-radius: 50%;
      cursor: pointer;
    }
    .timeLine__point_active {
      background: rgb(12, 177, 40);
      border: 1px solid rgb(1, 73, 16);
    }
  }
  .timeLine__info {
    .timeLine__title {
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>