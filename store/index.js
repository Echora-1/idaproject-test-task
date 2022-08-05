import { defineStore } from 'pinia'

export const useProductListStore = defineStore('index', {
  state: () => ({
    productList: [],
  }),
  getters: {
    getProductList: (state) => state.productList,
  },
  actions: {
    addProduct(product) {
      this.$patch((state) => {
        state.productList.push(product)
      })
    },
  },
})
