import { createStore } from "vuex";
import episodes from "./episodes";
import deaths from "./deaths";
import characters from "./characters";
import quotes from "./quotes";
import search from "./search";

export default createStore({
  state: {
    data: 0
  },
  modules: {
    episodes,
    deaths,
    characters,
    quotes,
    search
  }
});
