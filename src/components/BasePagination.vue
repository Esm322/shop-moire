<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
      :class="{'pagination__link--disabled': page === 1}"
      aria-label="Предыдущая страница"
      @click.prevent="prevPage"
      @keyup.enter="prevPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link"
      :class="{'pagination__link--current': pageNumber === page}"
      @click.prevent="paginate(pageNumber)"
      @keyup.enter="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#"
      :class="{'pagination__link--disabled': page === pages}"
      aria-label="Следующая страница"
      @click.prevent="nextPage"
      @keyup.enter="nextPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['perPage', 'count', 'page'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      return this.$emit('paginate', page);
    },
    prevPage() {
      return this.$emit('paginate', this.page - 1);
    },
    nextPage() {
      return this.$emit('paginate', this.page + 1);
    },
  },
};
</script>
