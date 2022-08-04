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
    <div class="product-list__main">
      <product-card
        class="product-list__card"
        v-for="(product, index) in products"
        :key="`${product.name}${index}`"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard'
import BaseDropdown from '../base/BaseDropdown'
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
const products = [
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
  {
    img: 'https://cdnstatic.rg.ru/uploads/images/153/10/69/1.jpg',
    name: 'Наименование товара',
    description:
      'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
    price: '10 000',
  },
]
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
}
</style>
