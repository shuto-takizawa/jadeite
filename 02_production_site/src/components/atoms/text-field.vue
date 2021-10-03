<template>
  <validation-provider
    v-slot='{ errors }'
    :rules='rules'
    :name='name'
  >
    <input
      class="input"
      :type="type"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      @input="updateValue"
    >
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
    type: {
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
    rules: {
      type: String,
    },
  },
  setup (_, { emit }) {
    const updateValue = (event: InputEvent) => {
      const { target } = event
      if (!(target instanceof HTMLInputElement)) return
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
  @apply block w-full px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-site-accent;
}

.error {
  @apply mt-2 text-sm text-red-400 font-semibold;
}
</style>
