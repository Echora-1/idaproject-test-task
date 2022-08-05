<template>
  <div class="product-list">
    <div class="product-list__header">
      <base-dropdown
        class="product-list__sort"
        :list="sortType"
        :default-item="sortType[0]"
        item-key="name"
        id="city"
      />
    </div>
    <transition-group name="list" tag="div" :class="'product-list__main'">
      <product-card
        class="product-list__card"
        v-for="(product, index) in productList"
        :key="`${product.name}${index}`"
        :product="product"
      />
      <p class="product-list__empty-text" v-show="!productList.length">
        Список товаров пуст
      </p>
    </transition-group>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard'
import BaseDropdown from '../base/BaseDropdown'
import { useProductListStore } from '../../store'
import { computed } from 'vue'

const sortType = [
  {
    id: 1,
    name: 'По умолчанию',
  },
  {
    id: 2,
    name: 'По цене min',
  },
  {
    id: 3,
    name: 'По цене max',
  },
  {
    id: 4,
    name: 'По наименованию',
  },
]

const productListStore = useProductListStore()

const productList = computed(() => productListStore.getProductList)
</script>

<style lang="scss" scoped>
.product-list {
  width: 100%;

  &__header {
    display: flex;
  }

  &__sort {
    margin: 32px 0 16px auto;
    max-width: 125px;

    @media (max-width: 767px) {
      margin: 16px 0 16px auto;
    }
  }

  &__main {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  &__card {
    width: calc((100% - 32px) / 3);

    @media (max-width: 1200px) {
      width: calc((100% - 16px) / 2);
    }

    @media (max-width: 375px) {
      width: 100%;
    }
  }

  &__empty-text {
    font-size: 26px;
    line-height: 125%;
    display: inline-block;
    margin: 16px auto;
    text-align: center;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<style>
.product-list__main {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
