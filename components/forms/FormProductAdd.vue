<template>
  <form class="form-product-add" @submit.prevent="() => submit(form)">
    <base-input
      type="text"
      id="name"
      label="Наименование товара"
      placeholder="Введите наименование товара"
      v-model.trim="form.name.value"
      @blur="form.name.blur"
      :valid="form.name.valid || !form.name.touched"
      :errors="form.name.errors"
    />
    <base-input
      textarea
      rows="5"
      id="description"
      label="Описание товара"
      placeholder="Введите описание товара"
      v-model.trim="form.description.value"
      @blur="form.description.blur"
      :valid="form.description.valid || !form.description.touched"
      :errors="form.description.errors"
    />
    <base-input
      type="text"
      id="image"
      label="Ссылка на изображение товара"
      placeholder="Введите ссылку"
      v-model.trim="form.image.value"
      @blur="form.image.blur"
      :valid="form.image.valid || !form.image.touched"
      :errors="form.image.errors"
    />
    <base-input
      type="text"
      id="price"
      label="Цена товара"
      placeholder="Введите цену"
      v-model="form.price.value"
      @blur="form.price.blur"
      :valid="form.price.valid || !form.price.touched"
      :errors="form.price.errors"
      ref="inputPrice"
    />
    <base-button
      :class="[
        'form-product-add__submit',
        { 'form-product-add__submit--success-add': successAdd },
      ]"
      type="submit"
      :disable="!form.valid"
    >
      Добавить товар
    </base-button>
  </form>
</template>
<script setup>
import BaseInput from '../base/BaseInput'
import BaseButton from '../base/BaseButton'
import { useForm } from '../../use/form'
import { required } from '../../helpers/validators'
import { useCurrencyInput } from 'vue-currency-input'
import { watchDebounced } from '@vueuse/core/index'
import { ref } from 'vue'
const emit = defineEmits(['submit', 'update:modelValue', 'change'])
const successAdd = ref(false)

const optionsPriceInput = {
  currency: 'RUB',
  currencyDisplay: 'hidden',
  hideGroupingSeparatorOnFocus: false,
}

const { inputRef: inputPrice, numberValue } = useCurrencyInput(
  optionsPriceInput,
  false
)

watchDebounced(numberValue, (value) => emit('update:modelValue', value), {
  debounce: 1000,
})

const form = useForm({
  name: {
    value: '',
    validators: { required },
  },
  description: {
    value: '',
  },
  image: {
    value: '',
    validators: { required },
  },
  price: {
    value: '',
    validators: { required },
  },
})

function resetForm(form) {
  Object.keys(form).forEach((key) => {
    if (key !== 'valid') {
      form[key]['touched'] = false
      form[key].value = ''
    }
  })
}

function formattedFormData(form) {
  return Object.keys(form).reduce((formattedForm, key) => {
    if (key === 'valid') {
      return formattedForm
    }
    formattedForm[key] = form[key].value
    return formattedForm
  }, {})
}

function submit(form) {
  emit('submit', formattedFormData(form))
  resetForm(form)
  successAdd.value = true
  setTimeout(() => (successAdd.value = false), 1500)
}
</script>

<style lang="scss" scoped>
.form-product-add {
  &__submit {
    margin-top: 8px;
    position: relative;

    &::after {
      content: 'Товар добавлен';
      position: absolute;
      bottom: -13px;
      left: 0;
      color: #96cf8d;
      font-size: 10px;
      line-height: 13px;
      opacity: 0;
      transition: 0.3s;
    }

    &--success-add {
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
