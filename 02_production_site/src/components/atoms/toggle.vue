<template>
  <validation-provider
    v-slot='{ errors }'
    :rules='rules'
    :name='name'
  >
    <fieldset>
      <label class="label">
        <input
          type="checkbox"
          :value="value"
          @change='updateValue'
          class="input"
        />
        {{ label }}
      </label>
      <div v-show="errors.length" class="error">{{ errors[0] }}</div>
    </fieldset>
  </validation-provider>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    rules: {
      type: Object,
    },
  },
  setup (_, { emit }) {
    const updateValue = (event: InputEvent) => {
      const { target } = event
      if (!(target instanceof HTMLInputElement)) return
      emit('input', target.checked)
    }
    return {
      updateValue
    }
  }
})
</script>

<style lang='scss' scoped>
.label {
  @apply flex items-center cursor-pointer text-sm sm:text-base;

  .input {
    @apply mr-2 w-5 h-5 cursor-pointer text-blue-400 border-gray-400 rounded focus:ring-blue-500;
  }
}

.error {
  @apply mt-2 text-sm text-red-400 font-semibold;
}
</style>
