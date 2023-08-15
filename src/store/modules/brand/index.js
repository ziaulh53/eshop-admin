import { defineStore } from "pinia";
import { api, brand } from "../../../api";

export const useBrandStore = defineStore("brand", {
  state: () => ({
    brands: [],
  }),
  getters: {
    brand: (state) => state.brands,
  },
  actions: {
   
    async saveBrands() {
      try {
        const res = await api.get(brand.getBrands);
        if (res.success) {
          this.brands = res.result;
        }
      } catch (error) {
        console.log(error);
      }
    },
    
  },
});
