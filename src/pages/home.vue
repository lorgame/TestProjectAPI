<template>
  <div>
    <h1>Сериалы</h1>
    <ul class="series__list">
      <router-link
        :to="{
          name: 'series',
          params: {
            title: value,
          },
        }"
        v-slot="{ href, navigate }"
        custom
        v-for="(value, i) of getSeries"
        :key="i"
      >
        <li class="series__item mt-3" :href="href" @click="navigate">
          <div class="series__card card mt-3 w-75">
            <div class="series__body card-body">
              <h1 class="series__title card-title">{{ value }}</h1>
            </div>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("episodes", {
      getSeries: "series",
    }),
  },
};
</script>
<style lang="scss" scoped>
.series__item {
  list-style-type: none;
  .series__card {
    cursor: pointer;
  }
}
</style>