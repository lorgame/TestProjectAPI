<template>
  <div class="links">
    <span class="links__title">Поделиться:</span>
    <div class="links__buttons">
      <a
        v-for="(value, i) of messangers"
        :key="i"
        :class="value.class"
        :href="value.link"
        target="_blank"
        :title="value.title"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :fill="value.fill"
          :class="value.classImg"
          target="_blank"
          viewBox="0 0 16 16"
        >
          <path :d="value.path" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loadFullPath"],
  data() {
    return {
      messangers: [
        {
          class: "links__facebook links__button",
          link: `https://www.facebook.com/sharer.php?u=https://j8jc5.csb.app${this.loadFullPath}`,
          title: "Поделиться в Facebook",
          fill: "blue",
          classImg: "bi bi-facebook",
          path:
            "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z",
        },
        {
          class: "links__telegram links__button",
          link: `https://telegram.me/share/url?url=https://j8jc5.csb.app${this.loadFullPath}`,
          title: "Поделиться в Телеграм",
          fill: "steelblue",
          classImg: "bi bi-telegram",
          path:
            "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  align-items: center;
  .links__title {
    font-size: 18px;
    font-weight: 700;
  }
  .links__buttons {
    display: flex;
    flex-wrap: wrap;
    margin-left: 5px;
    .links__button {
      width: 30px;
      height: 30px;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
}
</style>