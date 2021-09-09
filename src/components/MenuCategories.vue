<template>
  <div class="categories">
    <ul class="categories__list list-group list-group-horizontal">
      <li
        v-for="(value, i) of loadCategories"
        :key="i"
        class="categories__item list-group-item"
        :class="{
          categories__item_active: value === categoryActive,
        }"
        @click="loadCategory(value)"
      >
        {{ value }}
        <span class="categories__type">{{ typeCategory }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["loadCategories", "loadCategory", "categoryActive", "typeCategory"],
};
</script>

<style lang="scss" scoped>
.categories {
  cursor: pointer;
}
.categories__item_active {
  background: rgb(122, 122, 194);
  color: white;
}
</style>