<template>
  <div :class="['base-dropdown', { 'base-dropdown--focused': focused }]">
    <label :for="props.id" class="base-dropdown__label">
      {{ label }}
    </label>
    <div class="base-dropdown__wrapper">
      <input
        type="text"
        :id="id"
        class="base-dropdown__dropdown"
        :placeholder="$attrs.placeholder"
        @focus="focusHandler"
        @input="inputHandler"
        @blur="blurHandler"
        :value="selectedItem[itemKey]"
        readonly
      />
    </div>
    <div
      ref="baseDropdown"
      v-if="isDropdownOpen"
      class="base-dropdown__dropdown-menu"
    >
      <ul>
        <li
          tabindex="0"
          class="base-dropdown__dropdown-item"
          v-for="item in list"
          :key="item.id"
          @click="onItemClick(item)"
          @keyup.enter="onItemClick(item)"
        >
          {{ item[itemKey] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, watch, defineEmits, onMounted } from 'vue'
const props = defineProps({
  defaultItem: {
    type: Object,
  },
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['selected'])
const baseDropdown = ref(null)
let focused = ref(false)
let isDropdownOpen = ref(false)
let selectedItem = ref({
  [props.itemKey]: '',
})
onMounted(() => {
  if (props.defaultItem) {
    selectedItem.value = props.defaultItem
    emit('selected', selectedItem.value)
  }
})
function inputHandler() {
  isDropdownOpen.value = true
}
function focusHandler() {
  focused.value = true
  isDropdownOpen.value = true
}
function blurHandler() {
  focused.value = false
}
function hideDropdown() {
  isDropdownOpen.value = false
}
function onItemClick(item) {
  selectedItem.value = item
  isDropdownOpen.value = false
}
watch(selectedItem, () => emit('selected', selectedItem.value))
onClickOutside(baseDropdown, () => hideDropdown())
</script>

<style lang="scss" scoped>
.base-dropdown {
  position: relative;

  &:hover {
    .base-dropdown__wrapper {
      border-color: #3f3f3f4d;
    }
  }

  &--focused {
    .base-dropdown__wrapper {
      border-color: #3f3f3f4d;
    }
  }

  &__label {
    font-size: 12px;
    line-height: 15px;
  }

  &__wrapper {
    position: relative;
    background: #fffefb;
    border: 1px solid transparent;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
  }

  &__dropdown {
    width: 100%;
    background-image: url('../../assets/images/rectangle.svg');
    background-repeat: no-repeat;
    background-position: center right 16px;
    cursor: pointer;
    font-size: 12px;
    line-height: 15px;
    border: none;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #b4b4b4;
    white-space: nowrap;
    padding: 10px 26px 10px 14px;
    border-radius: 4px;
  }

  &__dropdown-menu {
    width: 100%;
    background: #fffefb;
    overflow-y: auto;
    position: absolute;
    z-index: 1;
    margin-top: 10px;
    border: 1px solid #3f3f3f4d;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &__dropdown-item {
    padding: 10px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    line-height: 15px;

    &:hover {
      background: #b4b4b466;
    }
  }
}
</style>
