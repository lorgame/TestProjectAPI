<template>
  <div class="deaths">
    <h3>Рейтинг победителей по количеству смертей:</h3>
    <table class="deaths__table">
      <thead class="deaths__head">
        <tr class="deaths__row">
          <td class="deaths__column deaths__indexTitle">№</td>
          <td class="deaths__column deaths__nameTitle">Имя</td>
          <td class="deaths__column deaths__counterTitle">Убито</td>
        </tr>
      </thead>
      <tbody class="deaths__body">
        <tr
          class="deaths__row"
          :class="{
            deaths__row_active:
              activeMurder === ''
                ? i === 0
                : activeMurder === value.responsible,
          }"
          v-for="(value, i) of loadDeathsRating"
          :key="i"
          @click="loadDeathsList(value.responsible)"
        >
          <td class="deaths__index">{{ i + 1 + ". " }}</td>
          <td class="deaths__name">{{ value.responsible }}</td>
          <td class="deaths__counter">{{ value.deathCounter }}</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mt-4">Список убитых:</h3>
    <card-deaths :key="i" :loadDeaths="loadDeathsRatingList"></card-deaths>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CardDeaths from "../components/CardDeaths";
export default {
  components: {
    CardDeaths,
  },
  data() {
    return {
      activeMurder: "",
    };
  },
  computed: {
    ...mapGetters("deaths", {
      getDeathsRating: "deathsRating",
      getDeathsRatingList: "deathsRatingList",
    }),
    loadDeathsRating() {
      return this.getDeathsRating;
    },
    loadDeathsRatingList() {
      return this.getDeathsRatingList(this.activeMurder);
    },
  },
  methods: {
    loadDeathsList(responsible) {
      this.activeMurder = responsible;
    },
  },
};
</script>
<style lang="scss" scoped>
.deaths {
  .deaths__table {
    width: 100%;
    padding-left: 0;
    border: 1px solid rgb(202, 202, 202);
    .deaths__head {
      font-weight: 700;
      font-size: 17px;
      .deaths__row {
        background: rgb(240, 240, 240);
        border: 1px solid rgb(202, 202, 202);
        .deaths__column {
          padding: 0px 3px;
        }
        .deaths__indexTitle,
        .deaths__counterTitle {
          text-align: center;
        }
      }
    }
    .deaths__body {
      .deaths__row {
        cursor: pointer;
        border: 1px solid rgb(202, 202, 202);
        .deaths__index {
          text-align: center;
        }
        .deaths__name {
        }
        .deaths__counter {
          text-align: center;
        }
      }
      .deaths__row_active {
        background: rgb(230, 245, 250);
      }
    }
  }
}
</style>