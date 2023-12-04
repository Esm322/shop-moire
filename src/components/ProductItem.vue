<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id } }">
      <img :src="images[currentColorId].image" :alt="title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ price }}
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colors" :key="color.colorProductId">
        <label class="colors__label" @click.prevent="changeImage(color.colorProductId)"
        @keyup.enter="changeImage(color.colorProductId)">
          <input class="colors__radio sr-only" type="radio" :name="'color-' + color.colorProductId"
          :value="color.colorProductId" :checked="color.colorProductId === activeColorId">
          <span class="colors__value" :style="{'background-color': color.colorCode}" >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {
      currentColorId: 0,
    };
  },
  props: [
    'id',
    'title',
    'price',
    'images',
    'colors',
  ],
  computed: {
    activeColorId() {
      return this.colors[this.currentColorId].colorProductId;
    },
  },
  methods: {
    changeImage(id) {
      const indexId = this.colors.findIndex((item) => item.colorProductId === id);
      this.currentColorId = indexId;
    },
  },
};
</script>
