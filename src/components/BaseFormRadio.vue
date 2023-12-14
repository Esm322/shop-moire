<template>
  <li class="options__item">
    <label class="options__label">
      <slot/>
      <input v-model="dataValue" :name="group" :value="value" class="options__radio sr-only" type="radio">
    </label>
  </li>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
