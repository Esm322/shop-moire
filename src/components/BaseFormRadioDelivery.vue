<template>
  <li class="options__item">
    <label class="options__label">
      <input v-model="dataValue" :name="group" :value="typeId" class="options__radio sr-only" type="radio">
      <span class="options__value">
        {{ title }} <b>{{ +price ? remadePrice : 'бесплатно' }}</b>
      </span>
    </label>
  </li>
</template>

<script>
import formRadioMixin from '@/mixins/formRadioMixin';

export default {
  props: ['typeId', 'title', 'price', 'remadePrice', 'group'],
  mixins: [formRadioMixin],
};
</script>
