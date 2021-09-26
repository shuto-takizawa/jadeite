<template>
  <validation-provider
    v-slot='{ errors }'
    :rules='rules'
    :name='name'
  >
    <textarea
      class="input"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      @input="updateValue"
    />
    <div class="error">{{ errors[0] }}</div>
  </validation-provider>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    rows: {
      type: Number,
    },
    cols: {
      type: Number,
    },
    rules: {
      type: String,
      default: '',
    },
  },
  setup (_, { emit }) {
    const updateValue = (e: InputEvent) => {
      const { target } = e
      if (!(target instanceof HTMLTextAreaElement)) return
      emit('input', target.value)
    }
    return {
      updateValue,
    }
  }
})
</script>

<style lang="scss" scoped>
.input {
  @apply border-2;
}

.error {
  @apply text-red-400;
}
</style>
