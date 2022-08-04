<template>
  <button
    :class="['base-button', { 'base-button--disabled': disable, 'base-button--primary': primary  }]"
    :disabled="disable"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disable: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.base-button {
  background-color: #7bae73;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 10px 15px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #96cf8d;
  }

  &--disabled {
    background-color: #eeeeee;
    color: #b4b4b4;
    box-shadow: none;
    cursor: not-allowed;

    &:hover {
      background-color: #eeeeee;
    }
  }

  &--primary {
    background-color: #7393ae;

    &:hover {
      background-color: #8aafcf;
    }
  }
}
</style>
