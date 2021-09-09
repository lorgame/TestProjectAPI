import HTTP from "@/api/http";
export default {
  namespaced: true,
  state: {
    categoriesAPI: [],
    searchCategories: []
  },
  getters: {
    categoriesAPI: (state) => state.categoriesAPI,
    searchCategories: (state) =>
      state.searchCategories.filter((category) => category !== undefined),
    searchCategories1: (state) => (searchData) => {
      let searchCategories = [];
      let allCategories = JSON.parse(JSON.stringify(state.categoriesAPI));
      for (let category in allCategories) {
        searchCategories.push(
          HTTP.get(category)
            .then((response) => {
              for (
                let indexItemCategory = 0;
                indexItemCategory < response.data.length;
                indexItemCategory++
              ) {
                for (
                  let indexSearch = 0;
                  indexSearch < searchData.length;
                  indexSearch++
                ) {
                  for (
                    let indexSearchItem = 0;
                    indexSearchItem < searchData[indexSearch].length;
                    indexSearchItem++
                  ) {
                    if (
                      JSON.stringify(response.data[indexItemCategory]) ===
                      JSON.stringify(searchData[indexSearch][indexSearchItem])
                    ) {
                      return category;
                    }
                  }
                }
              }
            })
            .catch((e) => {
              console.error(e);
            })
        );
      }
      return Promise.all(searchCategories).then((response) => {
        return 123;
      });
    }
  },
  mutations: {
    getCategoriesAPI(state, payload) {
      state.categoriesAPI = payload;
    },
    getSearchCategories(state, payload) {
      state.searchCategories = payload;
    }
  },
  actions: {
    getCategoriesAPI({ commit }, payload) {
      HTTP.get("")
        .then((response) => {
          commit("getCategoriesAPI", response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getSearchCategories({ state, commit }, searchData) {
      let searchCategories = [];
      let allCategories = JSON.parse(JSON.stringify(state.categoriesAPI));
      for (let category in allCategories) {
        searchCategories.push(
          HTTP.get(category)
            .then((response) => {
              for (
                let indexItemCategory = 0;
                indexItemCategory < response.data.length;
                indexItemCategory++
              ) {
                for (
                  let indexSearch = 0;
                  indexSearch < searchData.length;
                  indexSearch++
                ) {
                  for (
                    let indexSearchItem = 0;
                    indexSearchItem < searchData[indexSearch].length;
                    indexSearchItem++
                  ) {
                    if (
                      JSON.stringify(response.data[indexItemCategory]) ===
                      JSON.stringify(searchData[indexSearch][indexSearchItem])
                    ) {
                      return category;
                    }
                  }
                }
              }
            })
            .catch((e) => {
              console.error(e);
            })
        );
      }
      Promise.all(searchCategories).then((response) => {
        commit("getSearchCategories", response);
      });
    }
  }
};
