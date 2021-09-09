<template>
  <div v-if="loadDeaths.length !== 0" class="episodeDeaths">
    <ul class="episodeDeaths__list list row">
      <li
        class="episodeDeaths__item list__item mt-3 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
        v-for="(value, i) of loadDeaths"
        :key="i"
      >
        <div class="episodeDeaths__card card" style="width: 15rem">
          <ul class="episodeDeaths__list list list-group list-group-flush">
            <li class="episodeDeaths__item list__item list-group-item">
              <div class="episodeDeaths__info">
                <div class="episodeDeaths__title list__block">Усопший(е):</div>
                <div class="episodeDeaths__name list__block">
                  {{ value.death }}
                </div>
              </div>
            </li>
            <li class="episodeDeaths__item list__item list-group-item">
              <div class="episodeDeaths__info">
                <div class="episodeDeaths__title list__block">Причина:</div>
                <div class="episodeDeaths__name list__block">
                  {{ value.cause }}
                </div>
              </div>
            </li>
            <li class="episodeDeaths__item list__item list-group-item">
              <div class="episodeDeaths__info">
                <div class="episodeDeaths__title list__block">
                  Ответственный:
                </div>
                <div class="episodeDeaths__name list__block">
                  {{ value.responsible }}
                </div>
              </div>
            </li>
            <li class="episodeDeaths__item list__item list-group-item">
              <div class="episodeDeaths__info">
                <div class="episodeDeaths__title list__block">
                  Последние слова:
                </div>
                <div class="episodeDeaths__name list__block">
                  {{ value.last_words }}
                </div>
              </div>
            </li>
            <li class="episodeDeaths__item list__item list-group-item">
              <div class="episodeDeaths__info">
                <div class="episodeDeaths__title list__block">Умерло:</div>
                <div class="episodeDeaths__name list__block">
                  {{ value.number_of_deaths }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <span>Смерти отсутствуют.</span>
  </div>
</template>

<script>
export default {
  props: ["loadDeaths"],
};
</script>

<style lang="scss" scoped>
.episodeDeaths__item {
  align-items: center;
  .episodeDeaths__info {
    display: flex;
    width: 100%;
    text-align: left;
    .episodeDeaths__title {
      padding-right: 5px;
    }
  }
}
</style>