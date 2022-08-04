<template>
  <div class="form-wrap">
    <slot> </slot>
  </div>
</template>

<style lang="scss" scoped>
.form-wrap {
  background: #fffefb;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding: 24px;
}
</style>
