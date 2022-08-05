import { defineStore } from 'pinia'
import formattedPrice from "../helpers/formattedPrice";

export const useProductListStore = defineStore('index', {
  state: () => ({
    productList: [],
  }),
  getters: {
    getProductList: (state) => state.productList,
    getProductListMax: (state) => state.productList.sort((first, second) => {
      const priceF = formattedPrice(first.price)
      const priceS = formattedPrice(second.price)
      if(priceF === priceS) {
        return 0
      }
      return  priceF > priceS ? -1 : 1
    }),
    getProductListMin: (state) => state.productList.sort((first, second) => {
      const priceF = formattedPrice(first.price)
      const priceS = formattedPrice(second.price)
      if(priceF === priceS) {
        return 0
      }
      return  priceF > priceS ? 1 : -1
    }),
    getProductListByName: (state) => state.productList.sort((first, second) => {
      const nameF = first.name.toLowerCase()
      const nameS = second.name.toLowerCase()
      if(nameF === nameS) {
        return 0
      }
      return  nameF > nameS ? 1 : -1
    })
  },
  actions: {
    addProduct(product) {
      this.$patch((state) => {
        state.productList.push(product)
      })
    },
    deletedProduct(id) {
      this.$patch((state) => {
        state.productList = state.productList.filter(product => product.id !== id)
      })
    },
    setProductList(list) {
      this.$patch((state) => {
        state.productList = list
      })
    }
  },
})
