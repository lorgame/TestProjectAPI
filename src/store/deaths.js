import HTTP from "@/api/http";
export default {
  namespaced: true,
  state: {
    deaths: []
  },
  getters: {
    deaths: (state) => state.deaths,
    deathsEpisode: (state) => (episode) =>
      state.deaths.filter((death) => death.episode === parseInt(episode)),
    deathsCharacter: (state, getter) => (character) =>
      getter.deaths.filter(
        (death) =>
          death.responsible === character.name ||
          death.responsible === character.nickname
      ),
    deathsSearch: (state, getters) => (searchValue) =>
      getters.deaths.filter((death) => death.death === searchValue),
    deathsRating: (state, getters) => {
      let deathsList = [];
      getters.deaths.forEach((death) => {
        if (
          !deathsList.some((item) => item.responsible === death.responsible) ||
          deathsList.length === 0
        ) {
          deathsList.push({
            responsible: death.responsible,
            deathCounter: death.number_of_deaths,
            deathsList: [death]
          });
        } else {
          deathsList.find((item) => {
            if (item.responsible === death.responsible) {
              item.deathCounter += death.number_of_deaths;
              item.deathsList.push(death);
            }
          });
        }
      });
      deathsList.sort((a, b) => b.deathCounter - a.deathCounter);
      return deathsList.slice(0, 5);
    },
    deathsRatingList: (state, getters) => (responsible) => {
      if (responsible === "") return getters.deathsRating[0].deathsList;
      else
        return getters.deathsRating.find(
          (death) => death.responsible === responsible
        ).deathsList;
    }
  },
  mutations: {
    getAll(state, payload) {
      state.deaths = payload;
    }
  },
  actions: {
    getAll({ commit }, payload) {
      HTTP.get("deaths")
        .then((response) => {
          commit("getAll", response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
};
