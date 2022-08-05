<template>
  <div class="default-layout">
    <main class="default-layout__main container">
      <div class="default-layout__sidebar sidebar">
        <h1 class="sidebar__title">Добавление товара</h1>
        <base-button
          class="sidebar__add-product"
          primary
          @click="openSidebarForm"
        >
        </base-button>
        <base-form-wrap
          :class="['sidebar__form', { 'sidebar__form--show': showSidebarForm }]"
          ref="sidebarForm"
        >
          <form-product-add @submit="(product) => addProduct(product)" />
        </base-form-wrap>
      </div>
      <slot> </slot>
    </main>
  </div>
</template>

<script setup>
import BaseFormWrap from '../components/base/BaseFormWrap'
import FormProductAdd from '../components/forms/FormProductAdd'
import BaseButton from '../components/base/BaseButton'
import { ref } from "vue";
import { onClickOutside } from '@vueuse/core/index'
import { useProductListStore } from '../store'
const productListStore = useProductListStore()


let showSidebarForm = ref(false)
const sidebarForm = ref(null)

function openSidebarForm() {
  showSidebarForm.value = true
}

function closeSidebarForm() {
  showSidebarForm.value = false
}

function addProduct(product) {
  productListStore.addProduct(product)
  localStorage.setItem('productList', JSON.stringify(productListStore.getProductList))
}

onClickOutside(sidebarForm, () => closeSidebarForm())

</script>

<style lang="scss" scoped>
.default-layout {
  &__main {
    display: flex;
    gap: 16px;

    @media (max-width: 1000px) {
      flex-direction: column;
      gap: unset;
    }
  }
}

.sidebar {
  max-width: 332px;
  width: 100%;

  @media (max-width: 1200px) {
    max-width: 260px;
  }

  @media (max-width: 1000px) {
    position: relative;
    width: 100%;
  }

  &__add-product {
    display: none;
    position: relative;

    &::before,
    &::after {
      content: '';
      width: 15px;
      height: 2px;
      background: #fffefb;
      position: absolute;
      left: 50%;
      top: 50%;
    }

    &::before {
      transform: translate(-50%, -50%);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    @media (max-width: 1000px) {
      display: block;
      border-radius: unset;
      width: 30px;
      height: 30px;
      position: relative;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    margin: 32px 0 16px;
    letter-spacing: -1.65px;

    @media (max-width: 767px) {
      margin: 16px 0;
    }
  }

  &__form {
    position: sticky;
    top: 24px;

    @media (max-width: 1000px) {
      width: calc(100vw - 32px);
      max-width: 332px;
      position: absolute;
      top: 60px;
      left: 0;
      z-index: 2;
      transform: translateX(-200%);
      transition: all 0.3s;
      height: fit-content;
      box-shadow: 0 20px 30px rgb(0 0 0 / 30%), 0 6px 10px rgb(0 0 0 / 2%);
    }

    &--show {
      @media (max-width: 1000px) {
        transform: translateX(0);
      }
    }
  }
}
</style>
