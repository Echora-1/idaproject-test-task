<template>
  <div
    :class="[
      'base-input',
      {
        'base-input--focused': focused,
        'base-input--invalid': !valid,
        'base-input--required': isRequired,
      },
    ]"
  >
    <label :for="id" class="base-input__label">
      {{ label }}
    </label>
    <div class="base-input__wrapper">
      <input
        v-if="!textarea"
        :id="id"
        class="base-input__input"
        v-bind="$attrs"
        :value="modelValue"
        @focus="focusHandler"
        @input="inputHandler"
        @blur="blurHandler"
      />
      <textarea
        v-else
        :id="id"
        class="base-input__textarea"
        v-bind="$attrs"
        :value="modelValue"
        @focus="focusHandler"
        @input="inputHandler"
        @blur="blurHandler"
      />
      <p class="error-text">{{ errorText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  id: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  valid: {
    type: Boolean,
    default: true,
  },

  errors: {
    type: Object,
    default: () => {
      return {}
    },
  },

  textarea: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const focused = ref(false)

function inputHandler(event) {
  emit('update:modelValue', event.target.value)
}

function focusHandler() {
  focused.value = true
}

function blurHandler() {
  focused.value = false
}

const isRequired = computed(() => Object.hasOwn(props.errors, 'required'))

const errorText = computed(() => {
  return Object.keys(props.errors)
    .map((key) => {
      if (props.errors[key].value) {
        return props.errors[key].errorText
      }
      return ''
    })
    .filter((text) => text !== '')[0]
})
</script>

<style lang="scss" scoped>
.base-input {
  &__label {
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.02em;
  }

  &__wrapper {
    background: #fffefb;
    border: 1px solid transparent;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: relative;
    margin: 2px 0 15px;
    transition: all 0.3s;

    &:hover {
      border-color: #3f3f3f4d;
    }
  }

  &__input,
  &__textarea {
    width: 100%;
    margin: 0;
    border: none;
    outline: none;
    padding: 10px 15px;
    background: transparent;
    font-size: 12px;
    line-height: 15px;

    &::placeholder {
      color: #b4b4b4;
    }
  }
  &__input {
    height: 34px;
  }

  &__textarea {
    resize: none;
  }

  &--focused {
    .base-input__wrapper {
      border-color: #3f3f3f;
    }
  }

  &--invalid {
    .base-input__wrapper {
      border-color: #ff8484;
    }

    .error-text {
      display: block;
    }
  }

  &--required {
    .base-input__label {
      position: relative;
      padding-right: 5px;

      &::after {
        content: '';
        top: 0;
        right: 0;
        position: absolute;
        background: #ff8484;
        width: 4px;
        height: 4px;
        border-radius: 4px;
      }
    }
  }
}

.error-text {
  color: #ff8484;
  position: absolute;
  bottom: -24px;
  left: 0;
  font-size: 8px;
  line-height: 10px;
  letter-spacing: -0.02em;
  display: none;
}
</style>
