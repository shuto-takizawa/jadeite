<template>
  <validation-provider
    v-slot='{ errors }'
    :rules='rules'
    :name='name'
  >
    <fieldset class="">
      <select :name="name" @change='updateValue' class="select">
        <template v-for="(option, idx) in options">
          <option :value="option.value" :key="idx">
            {{ option.label }}
          </option>
        </template>
      </select>
    </fieldset>
    <div class="error">{{ errors[0] }}</div>
  </validation-provider>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType } from '@nuxtjs/composition-api'
import { SelectOptionType } from '~/types'

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
    options: {
      type: Array as PropType<SelectOptionType[]>,
      required: true,
    },
    rules: {
      type: String,
    }
  },
  setup ({ options }, { emit }) {

    //
    onMounted(() => {
      emit('input', options[0].value)
    })

    const updateValue = (event: InputEvent) => {
      const { target } = event
      if (!(target instanceof HTMLSelectElement)) return
      emit('input', target.value)
    }
    return {
      updateValue,
    }
  }
})
</script>

<style lang="scss" scoped>
.select {
  @apply block w-52 px-3 py-2 text-gray-700 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-site-accent;
}

.error {
  @apply mt-2 text-sm text-red-400 font-semibold;
}
</style>
