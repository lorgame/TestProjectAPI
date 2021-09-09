<template>
  <div v-if="loadQuotes.length !== 0" class="quotes">
    <ul class="quotes__list">
      <li class="quotes_item mt-3" v-for="(value, i) of loadQuotes" :key="i">
        <div class="quotes__card card">
          <div class="quotes__header card-header">
            <h5 class="quotes__author">
              {{ value.author }}
            </h5>
            <h6 class="quotes__series card-title">{{ value.series }}</h6>
          </div>
          <div class="quotes__body card-body">
            <p class="quotes_text card-text">
              {{ value.quote }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <span>Цитаты отсутствуют.</span>
  </div>
</template>

<script>
export default {
  props: ["loadQuotes"],
};
</script>

<style lang="scss" scoped>
.quotes__list {
  list-style-type: none;
  .quotes__card {
    color: black;
    .quotes__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>