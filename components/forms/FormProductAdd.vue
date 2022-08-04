<template>
  <form class="form-product-add" @submit.prevent="submit">
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
      v-model.trim="form.price.value"
      @blur="form.price.blur"
      :valid="form.price.valid || !form.price.touched"
      :errors="form.price.errors"
    />
    <base-button class="form-product-add__submit" type="submit" :disable="!form.valid">
      Добавить товар
    </base-button>
  </form>
</template>
<script setup>
import BaseInput from '../base/BaseInput'
import { useForm } from '../../use/form'
import { required } from '../../helpers/validators'
import BaseButton from "../base/BaseButton";

const emit = defineEmits(["submit"]);

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

function submit() {
  emit("submit", form);
}
</script>


<style lang="scss" scoped>
.form-product-add {
  &__submit {
    margin-top: 8px;
  }
}
</style>
