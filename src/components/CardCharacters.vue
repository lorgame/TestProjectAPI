<template>
  <div v-if="loadCharacters.length !== 0" class="characters">
    <ul class="characters__list list row">
      <router-link
        :to="{
          name: 'character',
          params: {
            id: value.char_id,
            series: series,
          },
        }"
        v-slot="{ href, navigate }"
        custom
        v-for="(value, i) of loadCharacters"
        :key="i"
      >
        <li
          class="characters__item list__item mt-3 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
        >
          <div class="characters__content">
            <svg
              v-if="!checkCharacterMarked(value)"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bookmark characters__marked"
              viewBox="0 0 16 16"
              @click="saveCharactersMark(value)"
            >
              <path
                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bookmark-fill characters__marked"
              viewBox="0 0 16 16"
              @click="deleteCharactersMarked(value)"
            >
              <path
                d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"
              />
            </svg>
            <div
              :href="href"
              @click="navigate"
              class="characters__card card"
              style="width: 15rem"
            >
              <img :src="value.img" class="card-img-top" alt="..." />
              <div class="characters__cardBody card-body">
                <h3 class="characters__cardTitle card-title">
                  {{ value.name }}
                </h3>
                <h4 class="characters__cardTitle card-title">
                  {{ '"' + value.nickname + '"' }}
                </h4>
              </div>
            </div>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
  <div v-else>
    <span>Персонажи отсутствуют.</span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["loadCharacters", "series"],
  computed: {
    ...mapGetters("characters", {
      checkCharacterLocalstorage: "checkLocalstorage",
    }),
  },
  methods: {
    ...mapActions("characters", {
      saveCharacterLocalstorage: "saveToLocalstorage",
      deleteCharacterLocalstorage: "deleteToLocalstorage",
    }),
    saveCharactersMark(character) {
      this.saveCharacterLocalstorage(character);
    },
    deleteCharactersMarked(character) {
      this.deleteCharacterLocalstorage(character);
    },
    checkCharacterMarked(character) {
      return this.checkCharacterLocalstorage(character);
    },
  },
};
</script>

<style lang="scss" scoped>
.characters__item {
  .characters__content {
    width: max-content;
    position: relative;
    .characters__marked {
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
      width: 1.5rem;
      height: 1.5rem;
      color: yellow;
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        fill: rgba(255, 255, 0, 0.7);
        transition: 0.5s;
      }
    }
    .characters__card {
      z-index: 0;
      cursor: pointer;
    }
  }
}
</style>