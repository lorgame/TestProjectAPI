import HTTP from "@/api/http";
export default {
  namespaced: true,
  state: {
    characters: [],
    charactersLocalStorage: JSON.parse(localStorage.getItem("charactersMarked"))
  },
  getters: {
    characters: (state) => state.characters,
    charactersEpisode: (state) => (characters) =>
      state.characters.filter((character) => {
        if (
          characters.indexOf(character.name) !== -1 ||
          characters.indexOf(character.nickname) !== -1 ||
          characters.indexOf(character.portrayed) !== -1
        ) {
          return character;
        }
      }),
    character: (state) => (id) =>
      state.characters.find((character) => character.char_id === parseInt(id)),
    charactersSearch: (state, getters) => (searchValue) =>
      getters.characters.filter(
        (character) =>
          character.name === searchValue ||
          character.name === searchValue ||
          character.portrayed === searchValue
      ),
    charactersOccupation: (state) => {
      let occupations = [];
      state.characters.forEach((character) => {
        character.occupation.forEach((occupation) => {
          if (
            !occupations.some(
              (item) => occupation in item === true || occupations.length === 0
            )
          ) {
            occupations.push({ [occupation]: [character] });
          } else if (occupations.some((item) => occupation in item === true)) {
            occupations
              .find((item) => occupation in item === true)
              [occupation].push(character);
          }
        });
      });
      return occupations;
    },
    charactersTimeLine: (state) => (character, episodes, deaths) => {
      let timeLine = {
        startPointer: character.birthday,
        pointers: [],
        endPointer: character.status === "Alive" ? true : false
      };
      episodes.forEach((episode) => {
        deaths.forEach((death) => {
          if (death.episode == episode.episode) {
            if (
              timeLine.pointers.some(
                (item) => item.episode.episode == death.episode
              )
            ) {
              timeLine.pointers
                .find((item) => item.episode.episode == death.episode)
                .deathsList.push(death);
            } else {
              timeLine.pointers.push({
                episode: episode,
                deathsList: [death]
              });
            }
          }
        });
        if (
          !timeLine.pointers.some(
            (item) => item.episode.episode_id === episode.episode_id
          )
        ) {
          timeLine.pointers.push({
            episode: episode,
            deathsList: []
          });
        }
      });
      timeLine.pointers.sort((a, b) => b.episode.air_date - a.episode.air_date);
      return timeLine;
    },
    checkLocalstorage: (state) => (character) => {
      if (state.charactersLocalStorage !== null) {
        return state.charactersLocalStorage.some(
          (item) => item.char_id === character.char_id
        );
      }
    },
    charactersLocalstorage: (state) => state.charactersLocalStorage
  },
  mutations: {
    getAll(state, payload) {
      state.characters = payload;
    },
    getCharactersLocalStorage(state, payload) {
      state.charactersLocalStorage = payload;
    }
  },
  actions: {
    getAll({ commit }, payload) {
      HTTP.get("characters")
        .then((response) => {
          commit("getAll", response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    saveToLocalstorage({ commit }, payload) {
      let existingEntries = JSON.parse(
        localStorage.getItem("charactersMarked")
      );
      if (existingEntries === null) existingEntries = [];
      if (
        !existingEntries.some(
          (characted) => characted.char_id === payload.char_id
        )
      ) {
        existingEntries.push(payload);
        localStorage.setItem(
          "charactersMarked",
          JSON.stringify(existingEntries)
        );
        commit("getCharactersLocalStorage", existingEntries);
      } else {
        console.warn("Characted already add to localstorage");
      }
    },
    deleteToLocalstorage({ commit }, payload) {
      let existingEntries = JSON.parse(
        localStorage.getItem("charactersMarked")
      );
      if (
        existingEntries.some(
          (character) => character.char_id === payload.char_id
        )
      ) {
        let updateExistingEntries = existingEntries.filter(
          (character) => character.char_id !== payload.char_id
        );
        localStorage.setItem(
          "charactersMarked",
          JSON.stringify(updateExistingEntries)
        );
        commit("getCharactersLocalStorage", updateExistingEntries);
      }
    }
  }
};
