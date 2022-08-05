<template>
  <div class="product-list">
    <div class="product-list__header">
      <base-dropdown
        class="product-list__sort"
        :list="sortTypes"
        placeholder="По умолчанию"
        item-key="name"
        id="city"
        @selected="(type) => setSortType(type)"
      />
    </div>
    <base-loader v-if="loading" />
    <transition-group
      name="list"
      tag="div"
      :class="[
        'product-list__main',
        { 'product-list__main--empty': !productList.length && !loading },
      ]"
    >
      <product-card
        class="product-list__card"
        v-for="product in productList"
        :key="product.id"
        :product="product"
        @delete="(id) => deleteProduct(id)"
      />
    </transition-group>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard'
import BaseDropdown from '../base/BaseDropdown'
import { useProductListStore } from '../../store'
import { computed, ref, onMounted } from 'vue'
import BaseLoader from "../base/BaseLoader";

const sortTypes = [
  {
    id: 1,
    type: 'min',
    name: 'По цене min',
  },
  {
    id: 2,
    type: 'max',
    name: 'По цене max',
  },
  {
    id: 3,
    type: 'name',
    name: 'По наименованию',
  },
]
const currentSortType = ref("")
let loading = ref(true)

const productListStore = useProductListStore()

const productList = computed(() => {
  switch (currentSortType.value) {
    case 'min':
      return productListStore.getProductListMin
    case 'max':
      return productListStore.getProductListMax
    case 'name':
      return productListStore.getProductListByName
    default:
      return productListStore.getProductList
  }
})

function deleteProduct(id) {
  productListStore.deletedProduct(id)
  localStorage.setItem(
    'productList',
    JSON.stringify(productListStore.getProductList)
  )
}

function setSortType(type) {
  currentSortType.value = type.type
}

onMounted(() => {
  let localProductList = localStorage.getItem('productList')
  if(localProductList) {
    productListStore.setProductList(JSON.parse(localProductList))
  }
  loading.value = false
})
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

  &__card {
    width: calc((100% - 32px) / 3);

    @media (max-width: 1200px) {
      width: calc((100% - 16px) / 2);
    }

    @media (max-width: 375px) {
      width: 100%;
    }
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

<style lang="scss">
.product-list__main {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  position: relative;

  &::before {
    content: 'Список товаров пуст';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    display: none;
  }

  &--empty {
    &::before {
      display: block;
      font-size: 26px;
    }
  }
}
</style>
