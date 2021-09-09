<template>
  <div v-if="loadEpisodes.length !== 0" class="storage__episodes">
    <ul class="storage__listEpisodes">
      <router-link
        :to="{
          name: 'episode',
          params: {
            id: value.episode_id,
            episode: value.episode,
            characters: value.characters,
            series: value.series,
            air_date: value.air_date,
          },
        }"
        v-slot="{ href, navigate }"
        custom
        v-for="(value, i) of loadEpisodes"
        :key="i"
      >
        <li class="storage__episode mt-3" :href="href" @click="navigate">
          <div class="storage__card card">
            <div class="storage__header card-header">
              <h5 class="storage__titleEpisode">
                {{ value.title }}
              </h5>
              <h6 class="storage__date card-title">{{ value.air_date }}</h6>
            </div>
            <div class="storage__body card-body">
              <p class="storage__characters card-text">
                <span v-for="(character, i) of value.characters" :key="i"
                  >{{ character
                  }}<span v-if="i < value.characters.length - 1">, </span></span
                >
                .
              </p>
            </div>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
  <div v-else>
    <span>Эпизоды отсутствуют.</span>
  </div>
</template>

<script>
export default {
  props: ["loadEpisodes"],
  data() {
    return {
      typeCategory: "episodes",
    };
  },
};
</script>

<style lang="scss" scoped>
.storage__episode {
  list-style-type: none;
  cursor: pointer;
  .storage__card {
    color: black;
    .storage__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>