<template>
  <div>
    <header class="container-fluide">
      <nav class="navbar navbar-light bg-light">
        <div class="navbar__container container-fluid">
          <div class="navbar__list navbar-nav">
            <router-link
              v-for="(value, i) of navbar"
              :key="i"
              class="navbar__item nav-link"
              :to="{ name: value.name }"
              >{{ value.title }}</router-link
            >
          </div>
          <form class="navbar__form d-flex">
            <input
              class="navbar__search form-control me-2"
              type="search"
              placeholder="Search"
              v-model.lazy.trim="searchValue"
            />
            <router-link
              :to="{
                name: 'search',
                params: {
                  value:
                    searchValue.length === 0
                      ? 'Missing information'
                      : searchValue,
                },
              }"
              v-slot="{ href, navigate }"
              custom
            >
              <button
                :href="href"
                @click="navigate"
                class="btn btn-outline-success"
                type="button"
              >
                Поиск
              </button>
            </router-link>
          </form>
        </div>
      </nav>
    </header>
    <body class="container">
      <router-view></router-view>
    </body>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navbar: [
        {
          name: "home",
          title: "Сериалы",
        },
        {
          name: "favorites",
          title: "Избранное",
        },
        {
          name: "occupations",
          title: "Список занятий",
        },
        {
          name: "listWinners",
          title: "Список победителей",
        },
      ],
      searchValue: "",
    };
  },
};
</script>

<style lang="scss">
.navbar {
  .navbar__container {
    .navbar__list {
      padding-left: 0;
      flex-direction: row !important;
      align-items: center;
      .navbar__item {
        list-style-type: none;
        padding-right: 15px;
        &.router-link-exact-active {
          color: black;
          text-decoration: underline;
        }
      }
    }
  }
}
.list {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  .list__item {
    display: flex;
    justify-content: center;
    list-style-type: none;
    text-align: center;
  }
}
</style>
