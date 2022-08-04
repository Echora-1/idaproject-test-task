<template>
  <button class="base-delete-button"></button>
</template>

<style lang="scss">
.base-delete-button {
  background-color: #FF8484;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 32px;
  width: 32px;
  border: none;
  cursor: pointer;
  background-image: url("../../assets/images/delete.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover,
  &:focus {
    background-color: #ff5353;
  }
}
</style>
