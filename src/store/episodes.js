import HTTP from "@/api/http";
export default {
  namespaced: true,
  state: {
    episodes: [],
    series: [],
    episodesOfSeason: [],
    categoryAPI: [],
    seriesApi: [],
    wather: []
  },
  getters: {
    episodesMap(state) {
      let map = {};
      state.episodes.forEach((episode, i) => {
        map[episode.episode_id] = i;
      });
      return map;
    },
    episode: (state, getters) => (id) =>
      state.episodes[getters.episodesMap[id]],
    episodes: (state) => state.episodes,
    episodesOfSeries: (state) => (series) =>
      state.episodes.filter((episode) => episode.series === series),
    episodesOfSeason: (state) => state.episodesOfSeason,
    episodesCharacter: (state, getters) => (series, character) => {
      const gettersElement =
        series === "" ? getters.episodes : getters.episodesOfSeries(series);
      return gettersElement.filter((episode) =>
        episode.characters.some(
          (item) => item === character.name || item === character.nickname
        )
      );
    },
    episodesSearch: (state, getters) => (searchValue) =>
      getters.episodes.filter((episode) => episode.title === searchValue),
    seasonsOfSeries: (state, getters) => (series) =>
      Array.from(
        getters
          .episodesOfSeries(series)
          .reduce((total, field) => total.add(field.season.trim()), new Set())
      ),
    series: (state) =>
      Array.from(
        state.episodes.reduce(
          (total, field) => total.add(field.series),
          new Set()
        )
      ),
    seriesApi: (state) => state.seriesApi,
    categoryAPI: (state) => state.categoryAPI,
    wather: (state) => {
      let watherItemsDay = state.wather.filter(
        (item) => item.applicable_date === item.created.split("T")[0]
      );
      let maxTemp = Math.round(
        watherItemsDay.reduce((total, field) => total + field.max_temp, 0) /
          watherItemsDay.length
      );
      let minTemp = Math.round(
        watherItemsDay.reduce((total, field) => total + field.min_temp, 0) /
          watherItemsDay.length
      );
      return { maxTemp, minTemp };
    }
  },
  mutations: {
    getAll(state, payload) {
      state.episodes = payload;
    },
    getAllSeason(state, { episodes, season = 1 }) {
      state.episodesOfSeason = episodes.filter(
        (episode) => episode.season === season
      );
    },
    getCategoryAPI(state, payload) {
      state.categoryAPI = Object.keys(payload);
    },
    getSeriesAPI(state, payload) {
      state.seriesApi = payload;
    },
    getWeather(state, payload) {
      state.wather = payload;
    }
  },
  actions: {
    getAll({ commit, dispatch }, payload) {
      HTTP.get("episodes")
        .then((response) => {
          commit("getAll", response.data);
        })
        .then(() => {
          dispatch("getAllSeason");
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getCategoryAPI({ commit }, payload) {
      HTTP.get("")
        .then((response) => {
          commit("getCategoryAPI", response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getAllSeason({ commit }, payload) {
      commit("getAllSeason", payload);
    },
    getSeriesAPI({ commit }, payload) {
      let baseURL = "https://www.omdbapi.com/";
      let url = "?i=tt" + payload + "&apikey=88e836ce";
      HTTP({
        url: url,
        baseURL: baseURL
      })
        .then((response) => {
          commit("getSeriesAPI", response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
          console.error(error);
        });
    },
    getWeather({ commit }, payload) {
      let baseURL = "https://65xkg.sse.codesandbox.io";
      HTTP({
        url: "/weather",
        baseURL: baseURL,
        params: { city: payload.city, date: payload.date }
      })
        .then((response) => {
          commit("getWeather", JSON.parse(response.data));
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
          console.error(error);
        });
    }
  }
};
