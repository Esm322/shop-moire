<template>
  <li class="options__item">
    <label class="options__label">
      <input v-model="dataValue" :name="group" :value="typeId" class="options__radio sr-only" type="radio">
      <span class="options__value">
        {{ title }}
      </span>
    </label>
  </li>
</template>

<script>
import formRadioMixin from '@/mixins/formRadioMixin';

export default {
  props: ['title', 'group', 'typeId'],
  mixins: [formRadioMixin],
};
</script>
