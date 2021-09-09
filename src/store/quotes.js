import HTTP from "@/api/http";
export default {
  namespaced: true,
  state: {
    quotes: []
  },
  getters: {
    quotes: (state) => state.quotes,
    quotesSeries: (state, getters) => (series) =>
      getters.quotes.filter((quote) => quote.series === series),
    quotesCharacter: (state, getters) => (series, character) => {
      const gettersElement =
        series === "" ? getters.quotes : getters.quotesSeries(series);
      return gettersElement.filter(
        (quote) =>
          quote.author === character.name || quote.author === character.nickname
      );
    },
    quotesSearch: (state, getters) => (searchValue) =>
      getters.quotes.filter((quote) => quote.quote.includes(searchValue))
  },
  mutations: {
    getAll(state, payload) {
      state.quotes = payload;
    }
  },
  actions: {
    getAll({ commit }, payload) {
      HTTP.get("quotes")
        .then((response) => {
          commit("getAll", response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
};
