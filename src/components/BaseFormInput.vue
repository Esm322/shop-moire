<template>
  <BaseFormField :title="title" :error="error">
    <label>
      <input v-model="dataValue" class="form__input" :type="type"
      :placeholder="placeholder">
    </label>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>
