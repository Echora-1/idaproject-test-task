<template>
  <div class="product-card" tabIndex="0">
    <base-delete-button class="product-card__delete" @click="deleteProduct" />
    <img
      class="product-card__image"
      :src="product?.img"
      alt="product image"
      width="100%"
      height="200"
    />
    <div class="product-card__info">
      <p class="product-card__name">{{ product?.name }}</p>
      <p class="product-card__description">
        {{ product?.description }}
      </p>
      <p class="product-card__price">{{ product?.price }}</p>
    </div>
  </div>
</template>

<script setup>
import BaseDeleteButton from '../base/BaseDeleteButton'

const props = defineProps({
  product: {
    type: Object,
    default: () => {},
  },
})

function deleteProduct() {
  console.log('delete')
}
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: #fffefb;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;

  &:hover,
  &:focus,
  &:focus-within {
    .product-card__delete {
      opacity: 1;
    }
  }

  &__delete {
    position: absolute;
    top: -8px;
    right: -8px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &__image {
    object-fit: contain;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 16px 16px 24px;
  }

  &__name,
  &__description,
  &__price {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    margin: 0 0 16px;
    white-space: nowrap;

    @media (max-width: 767px) {
      font-size: 18px;
      line-height: 125%;
    }
  }

  &__description {
    font-size: 16px;
    line-height: 20px;
    height: 80px;
    margin: 0 0 32px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;

    @media (max-width: 767px) {
      font-size: 14px;
      line-height: 125%;
      height: 72px;
      margin-bottom: 20px;
    }
  }

  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    margin: 0;
    padding-right: 50px;
    position: relative;
    white-space: nowrap;
    align-self: flex-start;
    max-width: 100%;
    letter-spacing: -0.1px;

    @media (max-width: 767px) {
      font-size: 22px;
      line-height: 125%;
      padding-right: 48px;
    }

    &::after {
      content: 'руб.';
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
