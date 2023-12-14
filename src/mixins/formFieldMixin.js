import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'placeholder', 'error', 'value'],
  components: {
    BaseFormField,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
