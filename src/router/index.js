import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home";
import Episode from "@/pages/episode";
import Character from "@/pages/character";
import Series from "@/pages/series";
import Favorites from "@/pages/favorites";
import Occupations from "@/pages/occupations";
import Search from "@/pages/search";
import ListWinners from "@/pages/listWinners";
import E404 from "@/pages/e404";

let routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },
  {
    name: "episode",
    path: "/episode/:series/:air_date/:id",
    component: Episode,
    props: true
  },
  {
    name: "series",
    path: "/series/:title",
    component: Series
  },
  {
    name: "character",
    path: "/character/:series?:id",
    component: Character,
    props: true
  },
  {
    name: "favorites",
    path: "/favorites",
    component: Favorites
  },
  {
    name: "occupations",
    path: "/occupations",
    component: Occupations
  },
  {
    name: "search",
    path: "/search/:value",
    component: Search
  },
  {
    path: "/:pathMatch(.*)*",
    component: E404
  },
  {
    name: "listWinners",
    path: "/listWinners",
    component: ListWinners
  }
];

export default createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});
